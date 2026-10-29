"use client";
import { useRouter } from "next/navigation";
import ConfirmDelete from "./ConfirmDelete";
export default function DeleteRecord({
  url,
  label,
}: {
  url: string;
  label: string;
}) {
  const router = useRouter();
  return (
    <ConfirmDelete url={url} label={label} onDeleted={() => router.refresh()} />
  );
}
