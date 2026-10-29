import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { apiError, checkOrigin, readJSON } from "@/lib/api";
import { importCareers } from "@/lib/career-import";

export const runtime = "nodejs";
const requestInput = z
  .object({
    source: z.string().max(1000000),
    commit: z.boolean().default(false),
    open: z.boolean().default(false),
  })
  .strict();
export async function POST(request: Request) {
  try {
    await requireAdmin();
    checkOrigin(request);
    const input = requestInput.parse(await readJSON(request, 2100000));
    const results = await importCareers(input.source, input.commit, input.open);
    if (results.some((result) => result.status === "imported")) {
      for (const path of [
        "/admin/careers",
        "/careers",
        "/careers/apply",
        "/sitemap.xml",
      ])
        revalidatePath(path);
    }
    return NextResponse.json({ results });
  } catch (error) {
    return apiError(error);
  }
}
