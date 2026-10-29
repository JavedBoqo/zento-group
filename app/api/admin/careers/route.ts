import { createCareer } from "@/lib/career-write";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import Career from "@/models/Career";
import { requireAdmin } from "@/lib/auth";
import { apiError, checkOrigin, pagination, readJSON } from "@/lib/api";
import { careerInput } from "@/lib/admin-validation";

export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { params, page, skip, search } = pagination(request);
    const status = params.get("status");
    const filter = {
      ...(search ? { title: { $regex: search, $options: "i" } } : {}),
      ...(["open", "closed"].includes(status || "")
        ? { isOpen: status === "open" }
        : {}),
    };
    const [items, total] = await Promise.all([
      Career.find(filter)
        .select("title slug location isOpen updatedAt")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(20)
        .lean(),
      Career.countDocuments(filter),
    ]);
    return NextResponse.json({ items, total, page });
  } catch (error) {
    return apiError(error);
  }
}
export async function POST(request: Request) {
  try {
    await requireAdmin();
    checkOrigin(request);
    const input = careerInput.parse(await readJSON(request));
    const career = await createCareer(input);
    revalidatePath("/careers");
    revalidatePath("/careers/apply");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ id: String(career._id) }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
