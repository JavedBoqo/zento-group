import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyPageClient from "@/components/careers/ApplyPageClient";

export const metadata: Metadata = {
  title: "Apply Online | Care Worker Careers | Zento Care",
  description:
    "Apply online in 2 minutes to join Zento Group's nurse-led care team in Edinburgh, Lothian, and Perthshire. Full paid training, flexible shifts, £14.50-£16.50/hr.",
  alternates: {
    canonical: "https://zentogroup.co.uk/careers/apply",
  },
  robots: { index: true, follow: true },
};

export default function CareersApplyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-800">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-zinc-100 bg-zinc-50">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-zinc-500">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors font-medium">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <Link href="/careers" className="hover:text-primary transition-colors font-medium">
                    Careers
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300">/</li>
                <li>
                  <span className="font-semibold text-secondary" aria-current="page">
                    Apply Online
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Application Canvas */}
        <section className="py-10 sm:py-14 md:py-20 bg-zinc-50/60">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
            <ApplyPageClient />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
