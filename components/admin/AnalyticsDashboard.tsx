"use client";

import { useEffect, useState } from "react";
import {
  MousePointer2,
  Users,
  Mail,
  Phone,
  CalendarDays,
  ArrowUpRight,
  Send,
  HandHeart,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EmptyState, MetricCard, PageHeader, SectionHeader } from "./AdminUI";
import TrafficChart from "./TrafficChart";

interface AnalyticsData {
  totals: { _id: { event: string; action?: string }; count: number }[];
  pages: { _id: string; count: number }[];
  buttons: {
    _id: { button: string; action: string; page: string };
    count: number;
  }[];
  daily: { _id: { date: string; event: string }; count: number }[];
  recent: {
    _id: string;
    event: string;
    button?: string;
    page: string;
    job?: string;
    timestamp: string;
  }[];
  days: number;
}

export default function AnalyticsDashboard() {
  const [range, setRange] = useState("7");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/admin/analytics?range=${range}`, { signal: controller.signal })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setData(result);
        setError("");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setError(error.message);
      });
    return () => controller.abort();
  }, [range, retry]);

  const total = (event: string, action?: string) =>
    data?.totals
      .filter(
        (item) =>
          item._id.event === event && (!action || item._id.action === action),
      )
      .reduce((sum, item) => sum + item.count, 0) || 0;

  const series = Array.from({ length: data?.days || 7 }, (_, index) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - (data?.days || 7) + 1 + index);
    const key = date.toISOString().slice(0, 10);
    const count = (event: string) =>
      data?.daily.find(
        (item) => item._id.date === key && item._id.event === event,
      )?.count || 0;
    return {
      date: key,
      views: count("page_view"),
      clicks: count("button_click"),
      applications: count("job_application_submitted"),
    };
  });
  const intentions = [
    { label: "Email", count: total("button_click", "email") },
    { label: "Phone", count: total("button_click", "phone") },
    { label: "Consultation", count: total("button_click", "consultation") },
    { label: "Apply", count: total("button_click", "job_application") },
  ];

  function changeRange(value: string) {
    setRange(value);
    setData(null);
    setError("");
  }

  return (
    <>
      <PageHeader
        eyebrow="Website performance"
        title="Website analytics"
        description="See which pages people visit and how they contact your team."
        actions={
          <div className="flex items-center gap-1 rounded-full border border-[#e2e9da] bg-white p-1">
            <CalendarDays size={14} className="ml-3 mr-1 text-[#657056]" />
            {[
              ["today", "Today"],
              ["7", "7 days"],
              ["30", "30 days"],
            ].map(([value, label]) => (
              <button
                key={value}
                aria-pressed={range === value}
                className={`rounded-full px-4 py-2 text-[12px] font-medium ${range === value ? "bg-[#edf5df] text-[#557233]" : "text-[#656e5b] hover:bg-[#f8faf5]"}`}
                onClick={() => changeRange(value)}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />
      {error ? (
        <div className="admin-card">
          <p role="alert" className="mb-4 text-sm text-red-700">
            {error}
          </p>
          <button
            onClick={() => setRetry((value) => value + 1)}
            className="admin-secondary"
          >
            Try again
          </button>
        </div>
      ) : !data ? (
        <div
          role="status"
          aria-label="Loading analytics"
          className="space-y-5 animate-pulse"
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-36 rounded-2xl bg-white" />
            ))}
          </div>
          <div className="h-80 rounded-2xl bg-white" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Page views"
              value={total("page_view")}
              detail="Visits with analytics consent"
              icon={<MousePointer2 size={18} />}
              featured
            />
            <MetricCard
              label="Button clicks"
              value={total("button_click")}
              detail="People taking the next step"
              icon={<HandHeart size={18} />}
            />
            <MetricCard
              label="Application clicks"
              value={total("button_click", "job_application")}
              detail="Interest in joining your team"
              icon={<Users size={18} />}
            />
            <MetricCard
              label="Confirmed applications"
              value={total("job_application_submitted")}
              detail="Successfully saved submissions"
              icon={<Send size={18} />}
            />
          </div>
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
            <section className="admin-card">
              <SectionHeader
                title="Traffic & engagement"
                description="Page views alongside meaningful button activity"
                action={<span className="admin-tag">UTC reporting</span>}
              />
              <div className="mb-5 flex gap-5 text-[11px] text-[#65705b]">
                <span className="flex items-center gap-2">
                  <i className="h-2 w-2 rounded-full bg-primary" />
                  Page views
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-2 w-2 rounded-full bg-secondary" />
                  Button clicks
                </span>
              </div>
              <TrafficChart data={series} />
            </section>
            <section className="admin-card">
              <SectionHeader
                title="Ways people connect"
                description="Clicks by their configured purpose"
              />
              {intentions.some((item) => item.count) ? (
                <div
                  className="admin-chart"
                  role="img"
                  aria-label="Contact and application clicks by purpose"
                >
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <BarChart
                      data={intentions}
                      layout="vertical"
                      margin={{ left: 0, right: 15 }}
                    >
                      <CartesianGrid
                        horizontal={false}
                        stroke="#edf1e7"
                        strokeDasharray="4 4"
                      />
                      <XAxis
                        type="number"
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#64785b" }}
                      />
                      <YAxis
                        type="category"
                        dataKey="label"
                        width={82}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#64785b" }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #e4ebdc",
                          fontSize: 11,
                        }}
                      />
                      <Bar
                        dataKey="count"
                        name="Clicks"
                        fill="#2e5aa5"
                        radius={[0, 5, 5, 0]}
                        barSize={18}
                        isAnimationActive={false}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <EmptyState
                  title="Connections start with a click"
                  description="Email, phone, consultation and application clicks will appear here."
                />
              )}
            </section>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "Email link clicks",
                value: total("button_click", "email"),
                icon: Mail,
              },
              {
                label: "Phone link clicks",
                value: total("button_click", "phone"),
                icon: Phone,
              },
              {
                label: "Consultation clicks",
                value: total("button_click", "consultation"),
                icon: CalendarDays,
              },
            ].map((item) => (
              <div
                className="admin-card flex items-center gap-4 !py-5"
                key={item.label}
              >
                <span className="admin-stat-icon">
                  <item.icon size={18} />
                </span>
                <div>
                  <p className="text-[11px] text-[#656d5b]">{item.label}</p>
                  <p className="mt-1 text-xl font-bold">{item.value}</p>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-[#666e5d]" />
              </div>
            ))}
          </div>
          <div className="grid items-start gap-5 xl:grid-cols-2">
            <section className="admin-card">
              <SectionHeader
                title="Most visited pages"
                description="Ranked by recorded page views"
              />
              {data.pages.length ? (
                data.pages.map((page, index) => (
                  <div
                    key={page._id}
                    className="flex items-center gap-4 border-t border-[#edf1e5] py-4"
                  >
                    <span className="text-[11px] text-[#676d5f]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-xs text-[#627156]">
                      {page._id}
                    </span>
                    <span className="text-xs font-semibold">{page.count}</span>
                    <div className="hidden h-1 w-20 rounded-full bg-[#eff4e7] sm:block">
                      <div
                        className="h-full rounded-full bg-[#a2c477]"
                        style={{
                          width: `${(page.count / Math.max(1, data.pages[0].count)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="No page views yet"
                  description="New consented page visits will appear here."
                />
              )}
            </section>
            <section className="admin-card">
              <SectionHeader
                title="Most clicked buttons"
                description="Useful context behind every interaction"
              />
              {data.buttons.length ? (
                data.buttons.map((button, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-t border-[#edf1e5] py-4"
                  >
                    <span className="admin-stat-icon !h-8 !w-8">
                      <MousePointer2 size={14} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold">
                        {button._id.button}
                      </p>
                      <p className="mt-1 truncate text-[10px] text-[#67705e]">
                        {button._id.page} ·{" "}
                        {button._id.action.replaceAll("_", " ")}
                      </p>
                    </div>
                    <span className="admin-tag">{button.count} clicks</span>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="No button activity yet"
                  description="Meaningful visitor actions will appear here."
                />
              )}
            </section>
          </div>
          <section className="admin-card !p-0 overflow-hidden">
            <div className="px-6 pt-6">
              <SectionHeader
                title="Recent event activity"
                description="The latest interactions across your website"
                action={
                  <span className="admin-tag">
                    {data.recent.length} recent events
                  </span>
                }
              />
            </div>
            {data.recent.length ? (
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Page</th>
                      <th>Context</th>
                      <th>Recorded · UTC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recent.map((event) => (
                      <tr key={event._id}>
                        <td>
                          <span className="inline-flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#a4bf83]" />
                            {event.event.replaceAll("_", " ")}
                          </span>
                        </td>
                        <td>{event.page}</td>
                        <td className="text-[#67715f]">
                          {event.button || event.job || "—"}
                        </td>
                        <td className="text-[11px]">
                          {new Date(event.timestamp).toLocaleString("en-GB", {
                            timeZone: "UTC",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                title="A little quiet here"
                description="Events appear after visitors opt in to analytics."
              />
            )}
          </section>
          <p className="text-[10px] leading-5 text-[#656d5b]">
            All dates use UTC. Counts include consented events, not unique
            visitors. Email and phone clicks indicate interest, not a completed
            call or message. Raw events are retained for 90 days.
          </p>
        </>
      )}
    </>
  );
}
