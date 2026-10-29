"use client";
import { useId } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export interface ChartPoint {
  date: string;
  views: number;
  clicks: number;
  applications: number;
}

export default function TrafficChart({
  data,
  applications = false,
}: {
  data: ChartPoint[];
  applications?: boolean;
}) {
  const id = useId().replaceAll(":", "");
  const total = data.reduce(
    (sum, day) => sum + day.views + day.clicks + day.applications,
    0,
  );
  return (
    <div className="relative">
      <div
        className="admin-chart"
        role="img"
        aria-label={
          applications
            ? "Applications over time"
            : "Page views and button clicks over time"
        }
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart
            data={data}
            margin={{ top: 15, right: 8, bottom: 0, left: -25 }}
          >
            <defs>
              <linearGradient id={`green-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#79b22f" stopOpacity={0.16} />
                <stop offset="100%" stopColor="#79b22f" stopOpacity={0} />
              </linearGradient>
              <linearGradient id={`blue-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2e5aa5" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#2e5aa5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#edf1e8"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value + "T00:00:00Z").toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  timeZone: "UTC",
                })
              }
              axisLine={false}
              tickLine={false}
              minTickGap={35}
              tick={{ fontSize: 11, fill: "#64785b" }}
              dy={10}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64785b" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e4ebdc",
                fontSize: 11,
                boxShadow: "0 4px 20px #243a3610",
              }}
              labelStyle={{ fontWeight: 650, marginBottom: 6 }}
            />
            {applications ? (
              <Area
                type="monotone"
                dataKey="applications"
                name="Applications"
                stroke="#79b22f"
                strokeWidth={2.5}
                fill={`url(#green-${id})`}
                isAnimationActive={false}
              />
            ) : (
              <>
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Page views"
                  stroke="#79b22f"
                  strokeWidth={2.5}
                  fill={`url(#green-${id})`}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  name="Button clicks"
                  stroke="#2e5aa5"
                  strokeWidth={2}
                  fill={`url(#blue-${id})`}
                  isAnimationActive={false}
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {total === 0 && (
        <p className="mt-3 text-center text-[12px] text-[#65705f]">
          No activity recorded in this period. New events will appear here.
        </p>
      )}
    </div>
  );
}
