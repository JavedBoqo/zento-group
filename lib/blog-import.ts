import "server-only";
import { ZodError } from "zod";
import Blog from "@/models/Blog";
import connectDB from "./db";
import { HttpError } from "./api";
import { validateArticlePeople } from "./article-people";
import { createBlog } from "./blog-write";
import {
  normalizeImportedArticle,
  parseBlogImport,
} from "./blog-import-contract";

export interface BlogImportResult {
  index: number;
  title: string;
  slug: string;
  status: "ready" | "imported" | "error" | "conflict";
  messages: string[];
  id?: string;
  sections?: number;
  faqs?: number;
}

function message(error: unknown): string {
  if (error instanceof ZodError)
    return error.issues
      .slice(0, 8)
      .map((issue) => `${issue.path.join(".") || "Article"}: ${issue.message}`)
      .join("; ");
  if (
    error instanceof HttpError ||
    (error instanceof Error && error.name === "Error")
  )
    return error.message;
  return "Import failed. Check the article and try again.";
}

/** Bounded, create-only batch. Every row is revalidated before any insert. */
export async function importBlogs(
  source: string,
  commit: boolean,
  publish: boolean,
  adminId: string,
) {
  let rows: unknown[];
  try {
    rows = parseBlogImport(source);
  } catch (error) {
    throw new HttpError(400, message(error));
  }
  await connectDB();
  const prepared: ReturnType<typeof normalizeImportedArticle>[] = [];
  const results: BlogImportResult[] = [];
  const seen = new Set<string>();
  for (const [index, row] of rows.entries()) {
    let title = `Article ${index + 1}`,
      slug = "";
    try {
      const input = normalizeImportedArticle(row, publish);
      title = input.title || title;
      slug = input.slug;
      if (seen.has(slug))
        throw new HttpError(
          409,
          "This slug appears more than once in this import. Use a unique slug.",
        );
      seen.add(slug);
      const existing = await Blog.findOne({ slug }).select("_id").lean();
      if (existing) {
        results.push({
          index,
          title,
          slug,
          status: "conflict",
          id: String(existing._id),
          messages: [
            "This slug already exists. Open the existing article to make an explicit update, or change the imported slug.",
          ],
        });
        continue;
      }
      await validateArticlePeople(input, undefined, adminId);
      prepared[index] = input;
      results.push({
        index,
        title,
        slug,
        status: "ready",
        sections: input.content?.sections.length,
        faqs: input.content?.faqs.length,
        messages: [
          publish
            ? "Ready to publish."
            : "Ready to import as a draft. Select an author and review in the visual editor before publishing.",
        ],
      });
    } catch (error) {
      results.push({
        index,
        title,
        slug,
        status:
          error instanceof HttpError && error.status === 409
            ? "conflict"
            : "error",
        messages: [message(error)],
      });
    }
  }
  if (commit)
    for (const result of results) {
      if (result.status !== "ready") continue;
      try {
        const record = await createBlog(prepared[result.index], adminId);
        result.status = "imported";
        result.id = String(record._id);
        result.messages = [
          publish
            ? "Published successfully."
            : "Imported as a draft. Open the visual editor to review it.",
        ];
      } catch (error) {
        result.status =
          (error as { code?: number })?.code === 11000 ? "conflict" : "error";
        result.messages = [
          result.status === "conflict"
            ? "This slug was created since validation. No existing article was overwritten."
            : message(error),
        ];
      }
    }
  return results;
}
