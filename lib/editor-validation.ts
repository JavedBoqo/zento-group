import type { ZodError } from "zod";

const labels: Record<string, string> = {
  title: "Title",
  slug: "Page address",
  id: "Job reference",
  heroImage: "Featured image",
  alt: "Image description",
  authorId: "Author",
  reviewerId: "Reviewer",
  metaDescription: "Search description",
  seoTitle: "Search title",
  canonicalUrl: "Preferred page address",
  content: "Article",
  sections: "Sections",
  blocks: "Content",
  faqs: "Questions and answers",
  introduction: "Introduction",
  summary: "Quick summary",
  phoneHref: "Phone number",
  phone: "Phone number",
  email: "Contact email",
  location: "Location",
  salaryMin: "Minimum pay",
  salaryMax: "Maximum pay",
  src: "Image address",
  question: "Question",
  answer: "Answer",
};

export function editorValidationMessage(error: ZodError): string {
  return error.issues
    .slice(0, 4)
    .map((issue) => {
      const field = issue.path
        .filter((part): part is string => typeof part === "string")
        .map((part) => labels[part])
        .filter(Boolean)
        .join(" · ");
      const message =
        issue.code === "too_small"
          ? "Please add a value."
          : issue.code === "invalid_format"
            ? "Please check this value and try again."
            : issue.message;
      return field ? `${field}: ${message}` : message;
    })
    .join(" ");
}
