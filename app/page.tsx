import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import NurseLedDifference from "@/components/NurseLedDifference";
import About from "@/components/About";
import Process from "@/components/Process";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nurse-Led Home Care in Edinburgh & Perthshire",
  description:
    "Compassionate, nurse-led home care provider based in Edinburgh and Crieff, delivering safe, person-centred home care across Edinburgh, Lothian, and Perthshire.",
  alternates: {
    canonical: "https://zentogroup.co.uk",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Nurse-Led Home Care in Edinburgh & Perthshire | Zento Care",
    description:
      "Compassionate, nurse-led home care provider based in Edinburgh and Crieff, delivering safe, person-centred home care across Edinburgh, Lothian, and Perthshire.",
    url: "https://zentogroup.co.uk",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Zento Nurse-Led Care Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nurse-Led Home Care in Edinburgh & Perthshire | Zento Care",
    description:
      "Compassionate, nurse-led home care provider delivering safe, person-centred home care across Edinburgh, Lothian, and Perthshire.",
    images: ["/brand-image.png"],
  },
};

export default function Home() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Zento Care - Nurse-Led Home Care",
    description:
      "Zento provides high-quality home care combining clinical oversight with compassionate, relationship-led support in Edinburgh, Lothian, and Perthshire.",
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
        <Process />
        <ContactSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
