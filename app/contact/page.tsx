import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import OfficeMapSwitcher from "@/components/OfficeMapSwitcher";
import AnimateContainer from "@/components/AnimateContainer";
import { FacebookIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";
import {
  SERVICE_AREAS,
  PERTHSHIRE_TAGLINE,
  SOCIAL_LINKS,
} from "@/constants";

export const metadata: Metadata = {
  title: "Contact Zento Care | Head Office in Crieff | Zento",
  description:
    "Get in touch with Zento Care. Head office in Crieff (PH7). Call 0176 479 0095 or send a message for nurse-led home care inquiries.",
  alternates: {
    canonical: "https://zentogroup.co.uk/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Zento Care | Head Office in Crieff",
    description:
      "Get in touch with Zento Care. Head office in Crieff (PH7). Call 0176 479 0095 or send a message for nurse-led home care inquiries.",
    url: "https://zentogroup.co.uk/contact",
    siteName: "Zento Care",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Zento Care Offices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Zento Care | Head Office in Crieff",
    description:
      "Get in touch with Zento Care. Head office in Crieff (PH7). Call 0176 479 0095 or send a message.",
    images: ["/brand-image.png"],
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Zento Care",
    description: "Contact details and inquiry form for Zento Care nurse-led home care services.",
    url: "https://zentogroup.co.uk/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Zento Care",
      telephone: "0176 479 0095",
      email: "info@zentogroup.co.uk",
      address: [
        {
          "@type": "PostalAddress",
          name: "Crieff Head Office",
          streetAddress: "East High Street",
          addressLocality: "Crieff",
          postalCode: "PH7",
          addressCountry: "GB",
        },
      ],
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* COMPACT HERO */}
        <section className="border-b border-zinc-100 bg-gradient-to-b from-zinc-50 to-white py-10 md:py-14">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24 text-center">
            <AnimateContainer animation="fade-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Nurse-Led Care Head Office in Perthshire
              </span>
              <h1 className="mt-3 text-3xl font-black text-secondary sm:text-4xl">
                Contact Zento Care
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto">
                {PERTHSHIRE_TAGLINE}
              </p>
              <p className="mt-1 text-xs text-zinc-500 max-w-xl mx-auto">
                Reach us by phone, email, or social media &mdash; we&apos;re here to help.
              </p>
            </AnimateContainer>
          </div>
        </section>

        {/* MAIN CONTENT GRID */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
              
              {/* LEFT COLUMN: INTERACTIVE OFFICE SWITCHER & MAP */}
              <AnimateContainer animation="fade-right" className="lg:col-span-7">
                <OfficeMapSwitcher />
              </AnimateContainer>

              {/* RIGHT COLUMN: FORM & SOCIAL */}
              <AnimateContainer animation="fade-left" delay={0.1} className="lg:col-span-5 space-y-6">
                {/* Section Header */}
                <div className="h-14 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-secondary">
                    Send Us a Message
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Fill out the form below and our care team will get back to you.
                  </p>
                </div>

                {/* Form Card Component */}
                <ContactForm activeOfficeName="Crieff Head Office" />

                {/* Social Media Card */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl">
                  <p className="text-xs text-zinc-500 mb-3">Also reach us on social media:</p>
                  <div className="flex items-center gap-2">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-primary hover:text-white"
                      >
                        {social.iconName === "facebook" && <FacebookIcon />}
                        {social.iconName === "instagram" && <InstagramIcon />}
                        {social.iconName === "linkedin" && <LinkedinIcon />}
                      </a>
                    ))}
                  </div>
                </div>
              </AnimateContainer>

            </div>
          </div>
        </section>

        {/* BOTTOM SERVICE AREAS */}
        <section className="border-t border-zinc-100 bg-zinc-50 py-8 text-center text-xs text-zinc-500">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            Serving {SERVICE_AREAS}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
