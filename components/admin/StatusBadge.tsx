export default function StatusBadge({ status }: { status: string }) {
  const tone = ["published", "open", "Hired"].includes(status)
    ? "border-[#dceacb] bg-[#f1f7e9] text-[#5b7537]"
    : ["New", "Reviewing"].includes(status)
      ? "border-[#dce7f0] bg-[#f0f5fa] text-[#556c85]"
      : status === "Shortlisted"
        ? "border-[#e3e4cd] bg-[#f7f7eb] text-[#6d6d3c]"
        : "border-[#e6eadf] bg-[#f7f9f3] text-[#67705f]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium capitalize ${tone}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {status}
    </span>
  );
}
