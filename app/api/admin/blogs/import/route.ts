import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { apiError, checkOrigin, readJSON } from "@/lib/api";
import { importBlogs } from "@/lib/blog-import";

export const runtime = "nodejs";
const requestInput = z
  .object({
    source: z.string().max(1000000),
    commit: z.boolean().default(false),
    publish: z.boolean().default(false),
  })
  .strict();
export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    checkOrigin(request);
    const input = requestInput.parse(await readJSON(request, 2100000));
    const results = await importBlogs(
      input.source,
      input.commit,
      input.publish,
      admin.id,
    );
    if (results.some((result) => result.status === "imported")) {
      revalidatePath("/admin/blogs");
      revalidatePath("/blog");
      revalidatePath("/sitemap.xml");
    }
    return NextResponse.json({ results });
  } catch (error) {
    return apiError(error);
  }
}
