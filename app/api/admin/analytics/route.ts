import { NextResponse } from "next/server";
import Analytics from "@/models/Analytics";
import { requireAdmin } from "@/lib/auth";
import { apiError } from "@/lib/api";

export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    await requireAdmin();
    const range = new URL(request.url).searchParams.get("range");
    const days = range === "today" ? 1 : range === "7" ? 7 : 30;
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    start.setUTCDate(start.getUTCDate() - days + 1);
    const match = { timestamp: { $gte: start, $lte: new Date() } };
    const [totals, pages, buttons, daily, recent] = await Promise.all([
      Analytics.aggregate([
        { $match: match },
        {
          $group: {
            _id: { event: "$event", action: "$action" },
            count: { $sum: 1 },
          },
        },
      ]),
      Analytics.aggregate([
        { $match: { ...match, event: "page_view" } },
        { $group: { _id: "$page", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Analytics.aggregate([
        { $match: { ...match, event: "button_click" } },
        {
          $group: {
            _id: { button: "$button", page: "$page", action: "$action" },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Analytics.aggregate([
        { $match: match },
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$timestamp",
                  timezone: "UTC",
                },
              },
              event: "$event",
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.date": 1 } },
      ]),
      Analytics.find(match)
        .select("event button page action job timestamp")
        .sort({ timestamp: -1 })
        .limit(30)
        .lean(),
    ]);
    return NextResponse.json({
      totals,
      pages,
      buttons,
      daily,
      recent,
      timezone: "UTC",
      days,
    });
  } catch (error) {
    return apiError(error);
  }
}
