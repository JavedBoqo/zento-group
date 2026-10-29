import "server-only";
import type { z } from "zod";
import type { blogInput } from "./admin-validation";
import Blog from "@/models/Blog";
import { validateArticlePeople } from "./article-people";
import { reserveImages, releaseImages } from "./media";

/** Shared create path for the visual editor and create-only JSON imports. */
export async function createBlog(
  input: z.infer<typeof blogInput>,
  adminId: string,
) {
  const review = await validateArticlePeople(input, undefined, adminId);
  const changes = await reserveImages(input);
  try {
    return await Blog.create({
      ...input,
      ...review,
      draftSlugEditable: !!input.content && input.status === "draft",
    });
  } catch (error) {
    await releaseImages(changes.added, false);
    throw error;
  }
}
