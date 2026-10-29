import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";
import connectDB from "../lib/db";
import Blog from "../models/Blog";
import Career from "../models/Career";
import { blogInput, careerInput } from "../lib/admin-validation";
import blogsJSON from "../mock/blogs.json";
import jobsJSON from "../mock/jobs.json";

loadEnvConfig(process.cwd());

async function main() {
  // Validate everything before making any writes. Existing records are never overwritten.
  const blogs = blogsJSON.map((value) =>
    blogInput.parse({ ...value, status: "published" }),
  );
  const jobs = jobsJSON.map((value) =>
    careerInput.parse({ ...value, isOpen: true }),
  );
  if (
    new Set(blogs.map((blog) => blog.slug)).size !== blogs.length ||
    new Set(jobs.map((job) => job.slug)).size !== jobs.length
  )
    throw new Error("Duplicate source slugs");
  await connectDB();
  await Promise.all([Blog.init(), Career.init()]);
  let inserted = 0;
  for (const blog of blogs) {
    const result = await Blog.updateOne(
      { slug: blog.slug },
      { $setOnInsert: blog },
      { upsert: true, runValidators: true },
    );
    inserted += result.upsertedCount;
  }
  for (const job of jobs) {
    const result = await Career.updateOne(
      { slug: job.slug },
      { $setOnInsert: job },
      { upsert: true, runValidators: true },
    );
    inserted += result.upsertedCount;
  }
  console.log(
    `Validated ${blogs.length} articles and ${jobs.length} jobs. Inserted ${inserted} new records. Existing records and JSON files were preserved.`,
  );
}

main()
  .catch(() => {
    console.error(
      "Migration failed. Check source data and MongoDB configuration. It is safe to rerun.",
    );
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
