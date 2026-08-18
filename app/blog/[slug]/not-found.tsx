import Link from "next/link";
import { BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogArticleNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>

        <span className="text-6xl font-black text-primary">404</span>

        <h1 className="mt-4 text-3xl font-black text-secondary sm:text-4xl">
          Article Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base text-zinc-600">
          Sorry, this article doesn&apos;t exist or may have been moved. Browse
          all our care guides below.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/blog"
            className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
          >
            Browse all articles
          </Link>
          <Link
            href="/"
            className="rounded-full border-2 border-secondary px-8 py-3.5 text-sm font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
          >
            Return to homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
