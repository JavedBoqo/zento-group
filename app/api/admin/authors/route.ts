import { NextResponse } from "next/server";
import Author from "@/models/Author";
import { requireAdmin } from "@/lib/auth";
import { getAuthors } from "@/lib/article-people";
import { authorInput } from "@/lib/authors";
import { apiError, checkOrigin, readJSON } from "@/lib/api";
import { releaseImages, reserveImages } from "@/lib/media";

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(await getAuthors());
  } catch (error) {
    return apiError(error);
  }
}
export async function POST(request: Request) {
  try {
    await requireAdmin();
    checkOrigin(request);
    const input = authorInput.parse(await readJSON(request, 20000));
    const media = await reserveImages(input);
    try {
      const author = await Author.create(input);
      return NextResponse.json({ id: String(author._id) }, { status: 201 });
    } catch (error) {
      await releaseImages(media.added, false);
      throw error;
    }
  } catch (error) {
    return apiError(error);
  }
}
