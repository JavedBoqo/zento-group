import "server-only";
import Author from "@/models/Author";
import connectDB from "./db";
import { authorInput, type AuthorProfile } from "./authors";
import type { Article } from "./blog";
import { HttpError } from "./api";

export async function getAuthors(): Promise<AuthorProfile[]> {
  await connectDB();
  const records = await Author.find().sort({ fullName: 1 }).lean();
  return records.map((record) => ({
    ...authorInput.parse(record),
    id: String(record._id),
  }));
}

export async function resolveArticlePeople(
  articles: Article[],
): Promise<Article[]> {
  const ids = [
    ...new Set(
      articles
        .flatMap((article) => [article.authorId, article.reviewerId])
        .filter((id): id is string => !!id),
    ),
  ];
  if (!ids.length) return articles;
  await connectDB();
  const records = await Author.find({ _id: { $in: ids } }).lean();
  const profiles = new Map(
    records.map((record) => [
      String(record._id),
      { ...authorInput.parse(record), id: String(record._id) },
    ]),
  );
  return articles.map((article) => ({
    ...article,
    author: profiles.get(article.authorId || ""),
    reviewer: profiles.get(article.reviewerId || ""),
  }));
}

/** Relationships and confirmation timestamps are checked on the server, never trusted from editor payloads. */
export async function validateArticlePeople(
  input: Article & { status: "draft" | "published" },
  previous?: {
    authorId?: string | null;
    reviewerId?: string | null;
    verificationStatus?: string | null;
    reviewedAt?: Date | null;
    verifiedBy?: string | null;
  },
  adminId?: string,
) {
  const ids = [input.authorId, input.reviewerId].filter(
    (id): id is string => !!id,
  );
  const records = ids.length
    ? await Author.find({ _id: { $in: ids } }).lean()
    : [];
  const author = records.find(
    (record) => String(record._id) === input.authorId,
  );
  const reviewer = records.find(
    (record) => String(record._id) === input.reviewerId,
  );
  if (
    input.authorId &&
    (!author || (!author.active && previous?.authorId !== input.authorId))
  )
    throw new HttpError(400, "Choose an active author profile");
  if (input.status === "published" && !author)
    throw new HttpError(400, "Select an author before publishing");
  if (
    input.reviewerId &&
    (!reviewer ||
      (!reviewer.active && previous?.reviewerId !== input.reviewerId))
  )
    throw new HttpError(400, "Choose an active reviewer profile");
  if (input.verificationStatus === "verified") {
    if (
      !author ||
      !reviewer?.clinicalReviewer ||
      !reviewer.qualifications.length ||
      input.authorId === input.reviewerId
    )
      throw new HttpError(
        400,
        "A confirmed clinical review needs a separate reviewer with supplied credentials",
      );
    const unchanged =
      previous?.reviewerId === input.reviewerId &&
      previous?.verificationStatus === "verified";
    return {
      reviewedAt:
        unchanged && previous?.reviewedAt ? previous.reviewedAt : new Date(),
      verifiedBy:
        unchanged && previous?.verifiedBy ? previous.verifiedBy : adminId,
    };
  }
  return { reviewedAt: null, verifiedBy: null };
}
