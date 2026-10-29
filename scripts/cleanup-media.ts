import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";
import connectDB from "../lib/db";
import Media from "../models/Media";
import { cleanupMedia } from "../lib/media";

loadEnvConfig(process.cwd());
async function main() {
  await connectDB();
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const candidates = Media.find({
    references: 0,
    state: { $ne: "deleted" },
    updatedAt: { $lt: cutoff },
  })
    .select("public_id")
    .cursor();
  let removed = 0;
  let failed = 0;
  for await (const media of candidates) {
    try {
      if (await cleanupMedia(media.public_id)) removed++;
    } catch {
      failed++;
    }
  }
  console.log(
    `Removed ${removed} unused uploads. ${failed} cleanup attempts need a retry.`,
  );
  if (failed) process.exitCode = 1;
}
main()
  .catch(() => {
    console.error(
      "Media cleanup failed. Check MongoDB and Cloudinary configuration.",
    );
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
