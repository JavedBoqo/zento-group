import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import Preview from "@/models/ArticlePreview";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/auth";
import { blogInput } from "@/lib/admin-validation";
import { apiError, checkOrigin, HttpError, readJSON } from "@/lib/api";
import { validateArticlePeople } from "@/lib/article-people";

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    checkOrigin(request);
    const body = z
      .object({
        article: z.record(z.string(), z.unknown()),
        blogId: z
          .string()
          .regex(/^[a-f\d]{24}$/i)
          .optional(),
      })
      .parse(await readJSON(request));
    const article = blogInput.parse({ ...body.article, status: "draft" });
    if (body.blogId && !/^[a-f\d]{24}$/i.test(body.blogId))
      throw new HttpError(400, "Invalid article ID");
    const previous = body.blogId
      ? await Blog.findById(body.blogId).lean()
      : undefined;
    if (body.blogId && !previous) throw new HttpError(404, "Article not found");
    const review = await validateArticlePeople(
      article,
      previous || undefined,
      admin.id,
    );
    const token = randomBytes(24).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    await Preview.findOneAndUpdate(
      { adminId: admin.id },
      {
        $set: {
          tokenHash,
          adminId: admin.id,
          article: { ...article, ...review },
          expiresAt: new Date(Date.now() + 15 * 60000),
        },
      },
      { upsert: true, runValidators: true },
    );
    return NextResponse.json(
      { url: `/admin-preview/blog?token=${token}` },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return apiError(error);
  }
}
