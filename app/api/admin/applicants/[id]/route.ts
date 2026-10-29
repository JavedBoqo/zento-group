import { NextResponse } from "next/server";
import { isObjectIdOrHexString } from "mongoose";
import { z } from "zod";
import Applicant from "@/models/Applicant";
import { requireAdmin } from "@/lib/auth";
import { apiError, checkOrigin, HttpError, readJSON } from "@/lib/api";
import { applicantStatuses } from "@/lib/admin-validation";
import { deleteCV } from "@/lib/cv";

export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };
export async function GET(_request: Request, context: Context) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    if (!isObjectIdOrHexString(id))
      throw new HttpError(404, "Application not found");
    const applicant = await Applicant.findById(id)
      .select("-submissionKey -notificationSent -cvSecureUrl -cvPublicId")
      .lean();
    if (!applicant) throw new HttpError(404, "Application not found");
    return NextResponse.json(applicant);
  } catch (error) {
    return apiError(error);
  }
}
export async function PATCH(request: Request, context: Context) {
  try {
    await requireAdmin();
    checkOrigin(request);
    const { id } = await context.params;
    if (!isObjectIdOrHexString(id))
      throw new HttpError(404, "Application not found");
    const input = z
      .object({ status: z.enum(applicantStatuses) })
      .strict()
      .parse(await readJSON(request, 1024));
    const result = await Applicant.updateOne(
      { _id: id },
      { $set: input },
      { runValidators: true },
    );
    if (!result.matchedCount) throw new HttpError(404, "Application not found");
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
export async function DELETE(request: Request, context: Context) {
  try {
    await requireAdmin();
    checkOrigin(request);
    const { id } = await context.params;
    if (!isObjectIdOrHexString(id))
      throw new HttpError(404, "Application not found");
    const applicant = await Applicant.findById(id);
    if (!applicant) throw new HttpError(404, "Application not found");
    if (applicant.cvId) await deleteCV(applicant.cvId);
    await applicant.deleteOne();
    if (applicant.cvPublicId)
      await deleteCV(applicant.cvPublicId).catch(() =>
        console.error("CV cleanup pending"),
      );
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
