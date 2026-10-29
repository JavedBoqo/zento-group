"use client";
import { useId, useRef, useState } from "react";
import { Trash2, X } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function ConfirmDelete({
  url,
  label,
  onDeleted,
}: {
  url: string;
  label: string;
  onDeleted: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [busy, setBusy] = useState(false);
  const { showToast } = useToast();
  async function remove() {
    setBusy(true);
    try {
      const response = await fetch(url, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      dialog.current?.close();
      showToast({
        type: "success",
        title: "Deleted successfully",
        message: "Your changes have been saved.",
      });
      onDeleted();
    } catch (error) {
      showToast({
        type: "error",
        title: "Could not delete",
        message: (error as Error).message,
      });
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="inline-flex items-center gap-2 text-[12px] font-medium text-[#996055]"
      >
        <Trash2 size={12} />
        Delete
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        className="m-auto w-[calc(100%_-_2rem)] max-w-md rounded-3xl border border-[#e5ebdc] bg-white p-7 text-[#3c5132] shadow-xl backdrop:bg-[#1d372b]/40 backdrop:backdrop-blur-sm"
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fbf1ed] text-[#996055]">
            <Trash2 size={20} strokeWidth={1.5} />
          </span>
          <button
            type="button"
            aria-label="Close confirmation"
            disabled={busy}
            onClick={() => dialog.current?.close()}
            className="rounded-lg p-2 text-[#656c5c]"
          >
            <X size={17} />
          </button>
        </div>
        <h2 id={titleId} className="text-xl font-semibold">
          Delete {label}?
        </h2>
        <p className="mb-7 mt-3 text-xs leading-6 text-[#67715f]">
          This permanently removes the record. This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="admin-secondary"
            disabled={busy}
            onClick={() => dialog.current?.close()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#b96a5b] px-5 py-2 text-xs font-medium text-white hover:bg-[#a75c4e]"
            disabled={busy}
            onClick={remove}
          >
            <Trash2 size={13} />
            {busy ? "Deleting…" : "Delete permanently"}
          </button>
        </div>
      </dialog>
    </>
  );
}
