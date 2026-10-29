import { z } from "zod";
import type { Article } from "./blog";

const short = z.string().trim().max(200);
export const authorInput = z
  .object({
    fullName: short.min(1, "Enter the author's full name"),
    role: short,
    photo: z.object({
      src: z
        .string()
        .max(2000)
        .refine(
          (value) =>
            !value || /^\/(?!\/)/.test(value) || /^https:\/\//.test(value),
          "Use a local image or HTTPS URL",
        ),
      alt: short,
    }),
    biography: z.string().trim().max(2000),
    qualifications: z.array(short.min(1)).max(20),
    active: z.boolean(),
    clinicalReviewer: z.boolean().default(false),
  })
  .superRefine((author, context) => {
    if (author.clinicalReviewer && !author.qualifications.length)
      context.addIssue({
        code: "custom",
        path: ["qualifications"],
        message: "Add the credentials supplied by this reviewer",
      });
    if (author.photo.src && !author.photo.alt)
      context.addIssue({
        code: "custom",
        path: ["photo", "alt"],
        message: "Describe the profile photograph",
      });
  });
export type AuthorProfile = z.infer<typeof authorInput> & { id: string };
export function confirmedReview(article: Article): boolean {
  return (
    article.verificationStatus === "verified" &&
    !!article.reviewedAt &&
    !!article.reviewer?.clinicalReviewer &&
    !!article.reviewer.qualifications.length &&
    article.author?.id !== article.reviewer.id
  );
}
