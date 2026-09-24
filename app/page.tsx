import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import NurseLedDifference from "@/components/NurseLedDifference";
import About from "@/components/About";
import TrustedBySection from "@/components/TrustedBySection";
import Process from "@/components/Process";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nurse-Led Care & Home Support | Edinburgh & Perthshire | Zento",
  description:
    "Compassionate care provider based in Edinburgh and Crieff, delivering nurse-led care in Perthshire and dedicated home support in Edinburgh & Lothian.",
  alternates: {
    canonical: "https://zentogroup.co.uk",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Nurse-Led Care & Home Support | Edinburgh & Perthshire | Zento Care",
    description:
      "Compassionate care provider based in Edinburgh and Crieff, delivering nurse-led care in Perthshire and dedicated home support in Edinburgh & Lothian.",
    url: "https://zentogroup.co.uk",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Care Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nurse-Led Care & Home Support | Edinburgh & Perthshire | Zento Care",
    description:
      "Compassionate care provider delivering nurse-led care in Perthshire and dedicated home support in Edinburgh & Lothian.",
    images: ["/brand-image.png"],
  },
};

export default function Home() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Zento Care - Nurse-Led Care & Home Support",
    description:
      "Zento provides high-quality nurse-led care in Perthshire and dedicated companionship and meal support in Edinburgh and the Lothians.",
    url: "https://zentogroup.co.uk",
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Navbar />

      <main>
        <Hero />
        <Services />
        <NurseLedDifference />
        <About />
        <TrustedBySection />
        <Process />
        <ContactSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
