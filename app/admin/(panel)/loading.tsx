export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading workspace"
      className="space-y-6 animate-pulse"
    >
      <div className="space-y-3">
        <div className="h-2 w-40 rounded-full bg-[#e4eaf3]" />
        <div className="h-8 w-72 max-w-full rounded-lg bg-[#e4eaf3]" />
        <div className="h-3 w-80 max-w-full rounded-full bg-[#edf1f7]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="admin-card h-40">
            <div className="h-3 w-24 rounded bg-[#edf1f7]" />
            <div className="mt-7 h-7 w-16 rounded bg-[#e4eaf3]" />
            <div className="mt-4 h-2 w-32 rounded bg-[#f1f4f8]" />
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="admin-card h-80 lg:col-span-2" />
        <div className="admin-card h-80" />
      </div>
      <span className="sr-only">Loading your workspace…</span>
    </div>
  );
}
