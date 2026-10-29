import { NextResponse } from "next/server";
import Applicant from "@/models/Applicant";
import { requireAdmin } from "@/lib/auth";
import { apiError, pagination } from "@/lib/api";
import { applicantStatuses } from "@/lib/admin-validation";

export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { params, page, skip, search } = pagination(request);
    const status = applicantStatuses.find(
      (value) => value === params.get("status"),
    );
    const job = (params.get("job") || "").slice(0, 180);
    const filter = {
      ...(search
        ? {
            $or: [
              { fullName: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          }
        : {}),
      ...(status ? { status } : {}),
      ...(job ? { jobSlug: job } : {}),
    };
    const [items, total] = await Promise.all([
      Applicant.find(filter)
        .select("fullName email role status createdAt jobSlug")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(20)
        .lean(),
      Applicant.countDocuments(filter),
    ]);
    return NextResponse.json({ items, total, page });
  } catch (error) {
    return apiError(error);
  }
}
