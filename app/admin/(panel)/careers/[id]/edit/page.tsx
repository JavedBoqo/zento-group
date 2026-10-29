import { notFound } from "next/navigation";
import { isObjectIdOrHexString } from "mongoose";
import Career from "@/models/Career";
import { requireAdminPage } from "@/lib/auth";
import { careerInput } from "@/lib/admin-validation";
import CareerEditor from "@/components/admin/CareerEditor";
export default async function EditCareerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;
  if (!isObjectIdOrHexString(id)) notFound();
  const career = await Career.findById(id).lean();
  if (!career) notFound();
  return <CareerEditor id={id} initial={careerInput.parse(career)} />;
}
