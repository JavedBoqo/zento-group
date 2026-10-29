import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import { getSession, requireAdmin } from "@/lib/auth";
import { apiError, checkOrigin } from "@/lib/api";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const admin = await requireAdmin();
    await Admin.updateOne({ _id: admin.id }, { $inc: { sessionVersion: 1 } });
    (await getSession()).destroy();
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
