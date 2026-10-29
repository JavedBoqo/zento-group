import type { Metadata } from "next";
import { createHash } from "node:crypto";
import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/auth";
import { blogInput } from "@/lib/admin-validation";
import { resolveArticlePeople } from "@/lib/article-people";
import { getRelatedArticles } from "@/lib/content";
import ArticlePreview from "@/models/ArticlePreview";
import ArticleTemplate from "@/components/blog/ArticleTemplate";
import { ModalProvider } from "@/components/ModalContext";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Private article preview | Zento",
  robots: { index: false, follow: false },
};

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const admin = await requireAdminPage();
  const { token } = await searchParams;
  if (!token)
    return (
      <main className="mx-auto max-w-xl p-10">
        <h1 className="text-2xl font-bold text-secondary">
          Private article preview
        </h1>
        <p className="mt-4 text-zinc-600">
          Use Preview in the blog editor to open an unsaved article. Preview
          links expire after 15 minutes.
        </p>
      </main>
    );
  if (!/^[a-f0-9]{48}$/.test(token)) notFound();
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const snapshot = await ArticlePreview.findOne({
    tokenHash,
    adminId: admin.id,
    expiresAt: { $gt: new Date() },
  }).lean();
  if (!snapshot) notFound();
  const stored = snapshot.article as { reviewedAt?: string | Date | null };
  const [article] = await resolveArticlePeople([
    {
      ...blogInput.parse(stored),
      reviewedAt: stored.reviewedAt
        ? new Date(stored.reviewedAt).toISOString()
        : null,
    },
  ]);
  const relatedArticles = await getRelatedArticles(article.slug, 3);
  return (
    <ModalProvider>
      <ArticleTemplate article={article} relatedArticles={relatedArticles} />
    </ModalProvider>
  );
}
