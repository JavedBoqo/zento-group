import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center py-24 px-6 text-center">
        <span className="text-6xl font-black text-primary">404</span>
        <h1 className="mt-4 text-3xl font-black text-secondary sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-zinc-600 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-primary/20 hover:scale-105 hover:bg-primary/90 transition-all"
        >
          Return to Homepage
        </Link>
      </main>

      <Footer />
    </div>
  );
}
