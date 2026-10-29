import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Analytics from "@/models/Analytics";
import { analyticsInput } from "@/lib/admin-validation";
import {
  apiError,
  checkOrigin,
  HttpError,
  rateLimit,
  readJSON,
} from "@/lib/api";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    if ((await cookies()).get("zento-analytics")?.value !== "accepted")
      throw new HttpError(403, "Analytics consent required");
    const input = analyticsInput.parse(await readJSON(request, 2048));
    if (input.page.startsWith("/admin") || input.page.startsWith("/api"))
      throw new HttpError(400, "Invalid analytics page");
    await rateLimit(request, "analytics", 600);
    await Analytics.create({
      event: input.event,
      button: input.button,
      page: input.page,
      action: input.action,
      job: input.job,
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return apiError(error);
  }
}
