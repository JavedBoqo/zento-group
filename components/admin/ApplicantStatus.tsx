"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { applicantStatuses } from "@/lib/admin-validation";
import { useToast } from "@/components/ToastProvider";

export default function ApplicantStatus({
  id,
  initial,
}: {
  id: string;
  initial: string;
}) {
  const [status, setStatus] = useState(initial);
  const [busy, setBusy] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  async function save() {
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      showToast({
        type: "success",
        title: "Application status updated",
        message: "Your changes have been saved.",
      });
      router.refresh();
    } catch (error) {
      showToast({
        type: "error",
        title: "Could not update",
        message: (error as Error).message,
      });
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="flex flex-col gap-3">
      <select
        aria-label="Application status"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        {applicantStatuses.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
      <button
        className="admin-primary whitespace-nowrap"
        onClick={save}
        disabled={busy}
        style={{ width: "100%" }}
      >
        {busy ? "Saving…" : "Update status"}
      </button>
    </div>
  );
}
