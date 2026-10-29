import { z } from "zod";
import { blogInput } from "./admin-validation";
import {
  convertSection,
  emptyContent,
  textToRich,
  visualCopy,
} from "./article-content";
import { DEFAULT_BLOG_CTA } from "./article-editor";

export const IMPORT_MAX_BYTES = 1000000;
export const IMPORT_MAX_ARTICLES = 20;

export function parseBlogImport(source: string): unknown[] {
  if (new TextEncoder().encode(source).length > IMPORT_MAX_BYTES)
    throw new Error("Use a JSON file smaller than 1 MB.");
  let data: unknown;
  try {
    data = JSON.parse(source);
  } catch {
    throw new Error(
      "Invalid JSON. Check quotation marks, commas and brackets; remove Markdown code fences.",
    );
  }
  const items = Array.isArray(data)
    ? data
    : data && typeof data === "object" && "articles" in data
      ? Object.keys(data).length === 1 && Array.isArray(data.articles)
        ? data.articles
        : null
      : data && typeof data === "object"
        ? [data]
        : null;
  if (!items || !items.length || items.length > IMPORT_MAX_ARTICLES)
    throw new Error(
      'Provide one article, an array, or {"articles":[...]}, with 1–20 articles.',
    );
  return items;
}

/** Defaults are adapter values, not another persisted article schema. */
export function normalizeImportedArticle(value: unknown, publish = false) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Each article must be a JSON object.");
  if (JSON.stringify(value).length > 200000)
    throw new Error("This article exceeds the 200,000 character limit.");
  const article = blogInput.strict().parse({
    seoTitle: "",
    metaDescription: "",
    heroImage: { src: "", alt: "" },
    intro: [],
    sections: [],
    faqs: [],
    closingCta: DEFAULT_BLOG_CTA,
    ...value,
    status: publish ? "published" : "draft",
    verificationStatus: "unverified",
  });
  if (!article.content) {
    const content = visualCopy(article);
    content.sections = content.sections.map((section, index) =>
      article.sections[index]?.type === "cta_section"
        ? convertSection(section, "cta")
        : section,
    );
    article.content = content;
  }
  return blogInput.strict().parse(article);
}

// Parse the example with the same contract used for actual imports.
export const blogImportExample = blogInput.parse({
  title: "Planning care at home in Scotland",
  slug: "planning-care-at-home-scotland",
  excerpt: "A practical starting point for families.",
  featured: false,
  seoTitle: "Planning care at home in Scotland | Zento",
  metaDescription:
    "A reassuring guide to discussing care needs, exploring options and planning support at home in Scotland.",
  canonicalUrl: "",
  heroImage: { src: "", alt: "" },
  intro: [],
  sections: [],
  faqs: [],
  closingCta: DEFAULT_BLOG_CTA,
  status: "draft",
  content: {
    ...emptyContent(),
    summary: textToRich(
      "Start with your family's preferences and the support that matters most.",
    ),
    introduction: textToRich(
      "Planning care starts with a conversation about daily routines and personal preferences.",
    ),
    sections: [
      {
        id: "everyday-support",
        type: "content",
        title: "Understanding everyday support",
        layout: "standard",
        blocks: [
          {
            id: "support-body",
            type: "richText",
            content: [
              {
                type: "heading",
                level: 3,
                content: [{ text: "Talk about daily routines" }],
              },
              ...textToRich(
                "Discuss what is working well and where a little help would be welcome.",
              ),
              {
                type: "bulletList",
                items: [
                  [{ text: "Listen to the person's preferences." }],
                  [{ text: "Involve family with their permission." }],
                ],
              },
            ],
          },
          {
            id: "support-note",
            type: "callout",
            style: "info",
            content: textToRich(
              "For concerns about health, speak with an appropriate healthcare professional.",
            ),
          },
        ],
      },
      {
        id: "planning-checklist",
        type: "checklist",
        title: "Your planning checklist",
        layout: "standard",
        blocks: [],
        items: [
          {
            id: "planning-one",
            content: [
              { text: "Write down the support you would like to discuss." },
            ],
          },
        ],
      },
      {
        id: "zento-help",
        type: "cta",
        title: "How Zento Can Help",
        variant: "blue",
        layout: "standard",
        blocks: [
          {
            id: "zento-description",
            type: "richText",
            content: textToRich(
              "Talk with our team about the support that may suit your family.",
            ),
          },
        ],
        primaryAction: {
          type: "consultation",
          label: "Book a Free Consultation",
        },
        secondaryAction: {
          type: "phone",
          label: "Call 0176 479 0095",
          destination: "tel:01764790095",
        },
      },
    ],
    faqs: [
      {
        id: "getting-started",
        question: "How do we get started?",
        answer: textToRich(
          "Contact our team to discuss your preferences and care needs.",
        ),
      },
    ],
    cta: "consultation",
  },
});

// One fixed conversion prompt. Schema and example are sourced from the importer's real contract.
const conversionSchema = z.toJSONSchema(blogInput.strict(), {
  io: "input",
  unrepresentable: "any",
  reused: "ref",
});
export const BLOG_JSON_CONVERSION_PROMPT = `Convert the existing blog content I supply separately into valid Zento article import JSON.

I am an administrator using ChatGPT, Claude or Gemini. After this prompt, I will supply the existing content for one or more blogs. Wait for that content before producing article JSON. This is a conversion task, not a request to write new articles.

Preserve the original meaning, factual claims, caveats, section structure, section order, headings, paragraphs, lists, links, FAQs and CTA wording. Do not invent information, clinical claims, statistics, credentials, testimonials, citations, author identities, verification status or image URLs. Do not copy the example's article text into my articles. If a quick summary, excerpt or SEO description is missing, summarize only the supplied content without adding facts. If no FAQs are supplied, use an empty FAQ array. Preserve supplied destinations and image references; leave an absent featured image as {"src":"","alt":""}.

Return ONLY valid JSON: no Markdown fences, commentary or unsupported properties. For one blog, return one article object. For multiple blogs, return an object containing an articles array: {"articles":[...]}.

SUPPORTED ARTICLE CONTRACT
The exact application JSON Schema is included below. Required fields are listed in each required array; fields not listed there are optional. Use the complete example as a structural guide. The importer supplies defaults for omitted legacy/draft fields, but use the full supported structure for reliable visual editing.

Use content.version=1. Put opening paragraphs in content.introduction and the quick summary in content.summary. Keep top-level legacy intro, sections and faqs as empty arrays when using structured content. Keep excerpt separate as the optional fallback card description. Include title, a unique lowercase hyphenated slug, seoTitle, metaDescription, heroImage, closingCta and status. Set status to draft. Optional top-level fields include featured, canonicalUrl, excerpt, authorId, reviewerId, verificationStatus and legacy editorSource; omit author/reviewer IDs unless an existing database reference was supplied. Never invent IDs for author profiles or claim a clinical review occurred. The administrator selects a real author and confirms any review in Zento. Do not include MongoDB _id, timestamps or other properties outside the schema.

RICH TEXT AND SECTIONS
Every section has a stable unique id and title, layout (normally standard) and blocks. Keep IDs stable when converting revisions; otherwise create unique section, block, checklist-item and FAQ IDs within each article. IDs may contain letters, numbers, underscores and hyphens.
Rich text is an array of paragraph, heading, bulletList or orderedList nodes. Paragraphs and headings use content arrays of inline objects with text and optional bold, italic and safe href. Headings use level 3 or 4. Lists use items containing arrays of inline text objects. Images use src and descriptive alt text; use only supplied local paths or HTTPS image URLs.
Supported section types:
- content: standard content with richText, subheading, list, image or callout blocks. Callouts use style info or quote and rich-text content. Separate subheading blocks use text and optionally number or icon. Separate list blocks use ordered and inline items.
- cta: the existing blue Zento panel. Include variant blue, description blocks and primaryAction, with optional secondaryAction. Actions have type and label. consultation and contact open existing Zento forms; phone requires a tel: destination; link requires a local path or HTTPS destination. Preserve CTA content/actions supplied with the article; do not fabricate promotional claims.
- checklist: include items with stable id and inline content. Optional introduction text goes in richText blocks. Preserve item order.
content.faqs contains id, question and a rich-text answer for each supplied FAQ. Do not repeat extracted FAQs as ordinary article sections.
content.cta controls the single final green template CTA: consultation or support for predefined variants, original to use the supplied closingCta heading/body, or none to hide it. Do not duplicate this final template banner as a content section. Preserve a supplied closing CTA's wording in closingCta; use only the known predefined template when no article-specific closing CTA is supplied.

VALIDATION RULES
Preserve supplied SEO metadata. If missing, derive seoTitle/metaDescription only from the supplied content. canonicalUrl is optional and must be a complete HTTPS URL when provided. Keep an absent canonicalUrl empty or omit it. Do not invent image URLs or author identities. Links must use safe destinations; do not use executable URLs, protocol-relative URLs or HTTP CTA destinations. Article slugs must be unique; imports are create-only. The importer defaults to drafts unless the administrator explicitly chooses immediate publication. Publication requires a valid existing author and complete publishing fields. Imported clinical-review status is always reset to unverified.
Maximum ${IMPORT_MAX_ARTICLES} articles, 1 MB total and 200,000 characters per article. JSON Schema describes structure; safe URL refinements, unique content IDs and publication rules are also enforced by the backend.

MANDATORY FINAL SELF-CHECK — complete silently before returning JSON:
1. Parse the proposed output as JSON: double-quoted keys/strings, escaped embedded quotes and newlines, no trailing commas, comments, undefined, NaN, Markdown or JSON encoded inside a string. Return only the article object, or {"articles":[...]} for multiple blogs; no extra wrapper keys.
2. Check every property against the exact schema, including nested arrays and objects. Include all required properties with their actual types. Use numbers/booleans as JSON values, not strings. Do not invent aliases such as description, imageUrl, body, heading or buttonUrl where the schema requires a different field name.
3. Use content.version as the number 1. Set top-level intro, sections and faqs to []. Put all actual article sections and FAQs inside content. Omit editorSource for this visual-editor workflow. Always set status to "draft" and omit verificationStatus or set it to "unverified".
4. Supply a nonempty title and slug. Slugs must match ^[a-z0-9]+(?:-[a-z0-9]+)*$ and be at most 180 characters; use distinct slugs for multiple articles. title, excerpt, seoTitle, metaDescription, section titles and FAQ questions must be at most 300 characters. Keep each inline text value at most 20,000 characters, splitting long material into paragraphs without deleting content.
5. Check section, block, checklist-item and FAQ IDs together: all must be unique within each article, 1–100 characters and match ^[a-zA-Z0-9_-]+$. Use separate IDs for the section and its blocks. Do not use MongoDB IDs for content IDs or invent author/reviewer IDs; omit authorId/reviewerId unless an existing 24-character hexadecimal profile ID was supplied.
6. Each richText block must have id, type "richText", and a content array of nodes. Each paragraph must have type "paragraph" and content as an array of inline {"text":"..."} objects. A heading node must have type "heading", numeric level 3 or 4, and the same inline content array. Do not put a plain string where an array or inline object is required. Never put raw HTML or Markdown formatting inside text to simulate rich text; use bold, italic and href properties.
7. A bulletList/orderedList node must have items as an array of inline arrays, for example [[{"text":"First item"}],[{"text":"Second item"}]]. A separate list block also needs id, type "list", ordered as a boolean, and items in that same inline-array format. Preserve list item order.
8. A CTA section must have type "cta", variant "blue", blocks, primaryAction and optional secondaryAction. Consultation/contact actions contain ONLY type and label. Phone/link actions contain ONLY type, label and destination. Button labels must be nonempty and at most 100 characters. Phone destinations must match ^tel:\\+?\\d[\\d ()-]*$; for example tel:01764790095. Link destinations must be a local path beginning with one slash or a complete HTTPS URL, without whitespace, backslashes or embedded credentials. Never use javascript:, protocol-relative // URLs, HTTP CTA URLs or empty destinations. Omit secondaryAction entirely when absent; do not use null or empty objects.
9. A checklist section must contain items as objects with id and content, where content is an array of inline text objects. Use blocks: [] if no introduction is supplied. A callout block must have id, type "callout", style "info" or "quote", and rich-text content. Do not add unsupported section variants. Keep all section titles and included checklist items meaningful and nonempty.
10. Each content.faqs entry must have id, question and answer as a rich-text array. Do not put answers in a string or duplicate FAQs in content.sections. Use [] if none were supplied. Preserve existing headings and section boundaries; do not merge or drop source content to simplify the JSON.
11. Include seoTitle and metaDescription derived solely from the supplied article, heroImage with src/alt strings, featured as a boolean when supplied, and closingCta with heading/body strings. Use an empty heroImage when no genuine image reference is supplied. For supplied images, provide descriptive alt text. Use canonicalUrl only as an empty string or a complete HTTPS URL. Do not add createdAt, updatedAt, publishedAt, _id, author objects or qualifications fields to article JSON.
12. Check the article-count and size limits above. Review the full supplied content against the converted result for missing sections, changed factual claims and duplicated final CTAs. Only then return the final JSON, with no explanation of this checklist. Do not claim to have run Zento's backend validator.

ACTUAL APPLICATION JSON SCHEMA:
${JSON.stringify(conversionSchema, null, 2)}

COMPLETE VALID EXAMPLE ARTICLE (structure only; replace its content with the supplied blog):
${JSON.stringify(blogImportExample, null, 2)}`;
