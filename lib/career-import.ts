import "server-only";
import { ZodError } from "zod";
import Career from "@/models/Career";
import connectDB from "./db";
import { HttpError } from "./api";
import { createCareer } from "./career-write";
import {
  normalizeImportedCareer,
  parseCareerImport,
} from "./career-import-contract";
import type { BlogImportResult as ImportResult } from "./blog-import";

function message(error: unknown) {
  if (error instanceof ZodError)
    return error.issues
      .slice(0, 8)
      .map((issue) => `${issue.path.join(".") || "Position"}: ${issue.message}`)
      .join("; ");
  if (
    error instanceof HttpError ||
    (error instanceof Error && error.name === "Error")
  )
    return error.message;
  return "Could not import this position. Please try again.";
}

export async function importCareers(
  source: string,
  commit: boolean,
  open: boolean,
) {
  let rows: unknown[];
  try {
    rows = parseCareerImport(source);
  } catch (error) {
    throw new HttpError(400, message(error));
  }
  await connectDB();
  const prepared: ReturnType<typeof normalizeImportedCareer>[] = [];
  const results: ImportResult[] = [];
  const slugs = new Set<string>(),
    ids = new Set<string>();
  for (const [index, row] of rows.entries()) {
    let title = `Position ${index + 1}`,
      slug = "";
    try {
      const input = normalizeImportedCareer(row, open);
      title = input.title;
      slug = input.slug;
      if (slugs.has(slug) || ids.has(input.id))
        throw new HttpError(
          409,
          "This import repeats a position ID or slug. Use distinct values for each position.",
        );
      slugs.add(slug);
      ids.add(input.id);
      const existing = await Career.findOne({
        $or: [{ slug }, { id: input.id }],
      })
        .select("_id")
        .lean();
      if (existing) {
        results.push({
          index,
          title,
          slug,
          status: "conflict",
          id: String(existing._id),
          messages: [
            "A position with this ID or slug already exists. Open it to make an explicit update, or change the imported ID/slug.",
          ],
        });
        continue;
      }
      prepared[index] = input;
      results.push({
        index,
        title,
        slug,
        status: "ready",
        messages: [
          open
            ? "Ready to open this position."
            : "Ready to import as a closed position. Review it in the career editor before opening it.",
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
        const input = prepared[result.index];
        if (
          await Career.exists({ $or: [{ slug: input.slug }, { id: input.id }] })
        )
          throw new HttpError(
            409,
            "This position was created since validation. Nothing was overwritten.",
          );
        const record = await createCareer(input);
        result.status = "imported";
        result.id = String(record._id);
        result.messages = [
          open
            ? "Imported and opened successfully."
            : "Imported as a closed position. Open the career editor to review it.",
        ];
      } catch (error) {
        result.status =
          (error instanceof HttpError && error.status === 409) ||
          (error as { code?: number })?.code === 11000
            ? "conflict"
            : "error";
        result.messages = [
          result.status === "conflict"
            ? "This position already exists. No existing position was overwritten."
            : message(error),
        ];
      }
    }
  return results;
}
