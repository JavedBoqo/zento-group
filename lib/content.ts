import "server-only";
import { cache } from "react";
import connectDB from "./db";
import Blog from "@/models/Blog";
import Career from "@/models/Career";
import { blogInput, careerInput } from "./admin-validation";
import type { Article } from "./blog";
import type { JobListing } from "./jobs";
import articlesJSON from "@/mock/blogs.json";
import jobsJSON from "@/mock/jobs.json";
import { resolveArticlePeople } from "./article-people";

export const getAllArticles = cache(async (): Promise<Article[]> => {
  if (process.env.CONTENT_SOURCE !== "mongodb")
    return resolveArticlePeople(articlesJSON as Article[]);
  await connectDB();
  const records = await Blog.find({ status: "published" })
    .sort({ createdAt: -1 })
    .lean();
  return resolveArticlePeople(
    records.map((record) => ({
      ...blogInput.parse(record),
      reviewedAt: record.reviewedAt?.toISOString(),
      updatedAt: record.updatedAt?.toISOString(),
    })),
  );
});
export const getArticleBySlug = cache(async (slug: string) =>
  (await getAllArticles()).find((article) => article.slug === slug),
);
export async function getRelatedArticles(slug: string, count = 3) {
  return (await getAllArticles())
    .filter((article) => article.slug !== slug)
    .slice(0, count);
}
export const getAllJobs = cache(async (): Promise<JobListing[]> => {
  if (process.env.CONTENT_SOURCE !== "mongodb") return jobsJSON as JobListing[];
  await connectDB();
  const records = await Career.find({ isOpen: true })
    .sort({ createdAt: -1 })
    .lean();
  return records.map((record) => careerInput.parse(record));
});
export const getJobBySlug = cache(async (slug: string) =>
  (await getAllJobs()).find((job) => job.slug === slug),
);
