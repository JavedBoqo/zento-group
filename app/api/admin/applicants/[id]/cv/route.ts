import { NextResponse } from "next/server";
import { isObjectIdOrHexString } from "mongoose";
import Applicant from "@/models/Applicant";
import { requireAdmin } from "@/lib/auth";
import { apiError, HttpError } from "@/lib/api";
import { cvBucket, readPrivateCV } from "@/lib/cv";

export const runtime = "nodejs";
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    if (!isObjectIdOrHexString(id)) throw new HttpError(404, "CV not found");
    const applicant = await Applicant.findById(id)
      .select("cvId cvName cvPublicId")
      .lean();
    if (!applicant?.cvId && !applicant?.cvPublicId)
      throw new HttpError(404, "CV not found");
    const chunks: Buffer[] = [];
    if (applicant.cvPublicId)
      chunks.push(await readPrivateCV(applicant.cvPublicId));
    else {
      const bucket = await cvBucket();
      for await (const chunk of bucket.openDownloadStream(applicant.cvId!))
        chunks.push(Buffer.from(chunk));
    }
    return new NextResponse(new Uint8Array(Buffer.concat(chunks)), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${applicant.cvName}"`,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return apiError(error);
  }
}
