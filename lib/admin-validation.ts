import { z } from "zod";
import { articleContentSchema, richTextPlainText } from "./article-content";

const text = z.string().trim().max(20000);
const short = z.string().trim().max(300);
const imagePath = z
  .string()
  .max(2000)
  .refine(
    (value) => !value || /^\/(?!\/)/.test(value) || /^https:\/\//.test(value),
    "Use a local path or HTTPS URL",
  );
const image = z.object({ src: imagePath, alt: short });
const lines = z.array(text).max(100);
const sectionBase = { heading: short, image: image.optional() };
const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(180);

export const blogInput = z
  .object({
    authorId: z
      .string()
      .regex(/^(?:[a-f\d]{24})?$/i)
      .optional(),
    reviewerId: z
      .string()
      .regex(/^(?:[a-f\d]{24})?$/i)
      .optional(),
    verificationStatus: z.enum(["unverified", "verified"]).optional(),
    content: articleContentSchema.optional(),
    excerpt: short.optional(),
    canonicalUrl: z
      .string()
      .max(2000)
      .refine((value) => {
        try {
          return !value || new URL(value).protocol === "https:";
        } catch {
          return false;
        }
      }, "Use a complete HTTPS canonical URL")
      .optional(),
    editorSource: z.string().max(200000).optional(),
    slug,
    title: short,
    featured: z.boolean().default(false),
    seoTitle: short,
    metaDescription: short,
    heroImage: image,
    intro: lines,
    sections: z
      .array(
        z.discriminatedUnion("type", [
          z.object({ ...sectionBase, type: z.literal("text"), body: lines }),
          z.object({
            ...sectionBase,
            type: z.literal("cta_section"),
            body: lines,
          }),
          z.object({
            ...sectionBase,
            type: z.literal("text_with_list"),
            intro: text,
            list: lines,
            outro: text.optional(),
          }),
          z.object({
            ...sectionBase,
            type: z.literal("signs"),
            items: z
              .array(
                z.object({
                  number: z.number(),
                  title: short,
                  body: text,
                  icon: image.optional(),
                }),
              )
              .max(100),
          }),
        ]),
      )
      .max(100),
    faqs: z.array(z.object({ question: short, answer: text })).max(100),
    closingCta: z.object({
      heading: short,
      body: text,
      image: image.optional(),
    }),
    status: z.enum(["draft", "published"]).default("draft"),
  })
  .superRefine((article, context) => {
    if (article.status !== "published") return;
    const required = (
      valid: boolean,
      path: (string | number)[],
      message: string,
    ) => {
      if (!valid) context.addIssue({ code: "custom", path, message });
    };
    required(
      !!article.title.trim(),
      ["title"],
      "Add an article title before publishing",
    );
    required(
      !!article.seoTitle.trim(),
      ["seoTitle"],
      "Add a meta title before publishing",
    );
    required(
      !!article.metaDescription.trim(),
      ["metaDescription"],
      "Add a search description before publishing",
    );
    if (!article.content) return;
    const meaningfulBlock = (
      block: z.infer<
        typeof articleContentSchema
      >["sections"][number]["blocks"][number],
    ) =>
      block.type === "richText" || block.type === "callout"
        ? !!richTextPlainText(block.content).trim()
        : block.type === "image"
          ? !!block.src
          : block.type === "list"
            ? block.items.some((item) => item.some((part) => part.text.trim()))
            : false;
    required(
      !!richTextPlainText(article.content.introduction).trim() ||
        !!richTextPlainText(article.content.summary).trim() ||
        article.content.sections.some(
          (section) =>
            section.blocks.some(meaningfulBlock) ||
            (section.type === "checklist" &&
              section.items.some((item) =>
                item.content.some((part) => part.text.trim()),
              )),
        ) ||
        article.content.faqs.some((faq) =>
          richTextPlainText(faq.answer).trim(),
        ),
      ["content"],
      "Add article content before publishing",
    );
    required(
      !article.heroImage.src || !!article.heroImage.alt.trim(),
      ["heroImage", "alt"],
      "Describe the featured image",
    );
    article.content.sections.forEach((section, index) => {
      required(
        section.blocks.some(meaningfulBlock) ||
          (section.type === "checklist" &&
            section.items.some((item) =>
              item.content.some((part) => part.text.trim()),
            )),
        ["content", "sections", index],
        "Add content to this section or remove it",
      );
      required(
        !!section.title.trim(),
        ["content", "sections", index, "title"],
        "Give each section a title",
      );
      if (section.type === "cta") {
        for (const key of ["primaryAction", "secondaryAction"] as const) {
          const action = section[key];
          if (action)
            required(
              !!action.label.trim(),
              ["content", "sections", index, key, "label"],
              "Add a CTA button label",
            );
        }
      }
      if (section.type === "checklist") {
        required(
          section.items.length > 0,
          ["content", "sections", index, "items"],
          "Add a checklist item",
        );
        section.items.forEach((item, itemIndex) =>
          required(
            item.content.some((part) => !!part.text.trim()),
            ["content", "sections", index, "items", itemIndex],
            "Complete or remove this checklist item",
          ),
        );
      }
      section.blocks.forEach((block, blockIndex) => {
        const path = ["content", "sections", index, "blocks", blockIndex];
        if (block.type === "image")
          required(
            !!block.src && !!block.alt.trim(),
            [...path, "alt"],
            "Choose an image and add its description",
          );
        if (block.type === "subheading")
          required(
            !!block.text.trim(),
            [...path, "text"],
            "Add the subheading text",
          );
      });
    });
    article.content.faqs.forEach((faq, index) =>
      required(
        !!faq.question.trim() && !!richTextPlainText(faq.answer).trim(),
        ["content", "faqs", index],
        "Complete both the question and answer",
      ),
    );
  });
export const careerInput = z
  .object({
    id: short.min(1),
    slug,
    title: short.min(1),
    location: short.min(1),
    region: short,
    salary: short,
    salaryMin: z.number().nonnegative(),
    salaryMax: z.number().nonnegative(),
    contractTypes: lines,
    office: short,
    phone: short,
    phoneHref: z.string().regex(/^tel:[+\d\s()-]+$/),
    email: z.email(),
    image: imagePath,
    referralBonus: short,
    highlights: lines,
    overview: text,
    responsibilities: lines,
    whatWeOffer: lines,
    requirements: lines,
    isOpen: z.boolean().default(true),
  })
  .refine((value) => value.salaryMax >= value.salaryMin, {
    message: "Maximum salary must be at least the minimum",
    path: ["salaryMax"],
  });
export const applicantStatuses = [
  "New",
  "Reviewing",
  "Shortlisted",
  "Rejected",
  "Hired",
] as const;
export const applicantInput = z.object({
  fullName: short.min(1),
  email: z.email().max(254),
  phone: short.min(1),
  role: short.min(1),
  jobSlug: slug,
  location: short.default(""),
  address: short.default(""),
  preferredPattern: short.default(""),
  rightToWork: short.min(1),
  drivingLicence: short.default(""),
  careExperience: short.default(""),
  message: text.default(""),
});
export const analyticsInput = z
  .object({
    event: z.enum(["page_view", "button_click"]),
    button: z
      .enum([
        "Contact",
        "Email",
        "Phone",
        "Book Consultation",
        "Request Callback",
        "Get Quote",
        "Service Inquiry",
        "Apply Now",
      ])
      .optional(),
    action: z
      .enum([
        "contact",
        "email",
        "phone",
        "consultation",
        "callback_request",
        "quote_request",
        "service_inquiry",
        "job_application",
      ])
      .optional(),
    page: z
      .string()
      .max(250)
      .regex(/^\/[a-zA-Z0-9/_-]*$/),
    job: slug.optional(),
    consent: z.literal(true),
  })
  .strict()
  .refine(
    (value) => value.event !== "button_click" || (value.button && value.action),
    "Button clicks require a button and action",
  );
