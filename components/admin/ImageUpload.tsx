"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { Field } from "./FormFields";
import { useToast } from "@/components/ToastProvider";

export default function ImageUpload({
  label,
  value,
  onChange,
  alt = "Image preview",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  alt?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();
  async function upload(file?: File) {
    if (!file) return;
    if (
      !file.size ||
      file.size > 5 * 1024 * 1024 ||
      !["image/png", "image/jpeg", "image/webp"].includes(file.type)
    ) {
      setError("Choose a JPEG, PNG or WebP image up to 5MB.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.set("file", file);
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: form,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");
      onChange(result.secure_url);
      showToast({
        type: "success",
        title: "Image uploaded",
        message: "Save the article or job to apply this image.",
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  const previewable =
    !!value && (/^\/(?!\/)/.test(value) || /^https:\/\//.test(value));
  return (
    <fieldset
      data-uploading={busy || undefined}
      disabled={busy}
      className="admin-upload space-y-3"
    >
      <legend className="px-1 text-xs font-semibold">{label}</legend>
      {previewable && (
        <Image
          src={value}
          alt={alt || "Image preview"}
          width={600}
          height={400}
          unoptimized
          className="max-h-48 w-full rounded-lg bg-slate-50 object-contain"
        />
      )}
      {!previewable && (
        <div className="flex flex-col items-center py-5 text-center">
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4e1] text-[#63744e]">
            <ImagePlus size={20} strokeWidth={1.4} />
          </span>
          <p className="text-[12px] font-medium text-[#5f6f4d]">
            A picture makes it personal.
          </p>
          <p className="mt-1 text-[10px] text-[#666f5c]">
            JPEG, PNG or WebP · up to 5MB
          </p>
        </div>
      )}
      <label className="block space-y-2 text-xs font-medium">
        <span>
          {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            void upload(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </label>
      <Field
        label="Existing path or HTTPS URL"
        value={value}
        onChange={onChange}
        hint="JPEG, PNG or WebP, up to 5MB. Changes apply when you save."
      />
      {value && (
        <button
          type="button"
          className="text-xs text-red-600"
          onClick={() => onChange("")}
        >
          Remove image
        </button>
      )}
      {error && (
        <p role="alert" className="text-xs text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}
