import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Home, Clock4, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalButton from "@/components/ModalButton";
import AnimateContainer, { AnimateItem } from "@/components/AnimateContainer";
import { OFFICES, CONTACT_NUMBER } from "@/constants";

export const metadata: Metadata = {
  title: "Service Locations | Nurse-Led Home Care | Zento",
  description:
    "Explore Zento nurse-led home care services across Edinburgh, Lothian, and Perthshire. Find local care teams near you.",
  alternates: {
    canonical: "https://zentogroup.co.uk/locations/",
  },
  robots: { index: true, follow: true },
};

const locations = [
  {
    name: "Edinburgh",
    href: "/locations/edinburgh/",
    desc: "Nurse-led home care across all Edinburgh postcodes (EH1–EH17).",
    badge: "Primary Location",
    office: OFFICES[0],
    icon: Home,
    color: "primary",
  },
  {
    name: "Lothian",
    href: "/locations/lothian/",
    desc: "Comprehensive home care coverage for Midlothian, East Lothian & West Lothian.",
    badge: "Regional Hub",
    office: OFFICES[0],
    icon: MapPin,
    color: "primary",
  },
  {
    name: "Perthshire",
    href: "/locations/perthshire/",
    desc: "Caring for Crieff, Comrie, Muthill, Braco & surrounding Perthshire villages.",
    badge: "Regional Hub",
    office: OFFICES[1],
    icon: Clock4,
    color: "secondary",
  },
];

export default function LocationsHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
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
                  <span className="font-semibold text-secondary" aria-current="page">
                    Locations
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-zinc-50 py-16 md:py-24 text-center">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Service Areas
              </span>
              <h1 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl lg:text-6xl mb-6">
                Our Locations &amp; Service Areas
              </h1>
              <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Zento delivers nurse-led home care from local offices in Edinburgh and Crieff. Select your area below to view local team details and coverage.
              </p>
              <div className="flex justify-center">
                <ModalButton
                  type="assessment"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
                >
                  Book a consultation <ArrowRight className="w-5 h-5" />
                </ModalButton>
              </div>
            </AnimateContainer>
          </div>
        </section>

        {/* Location Cards */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="stagger" className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {locations.map((loc) => {
                const IconComp = loc.icon;
                const isSecondary = loc.color === "secondary";
                return (
                  <AnimateItem key={loc.name} className="h-full">
                    <div
                      className="group flex h-full flex-col justify-between rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-8 transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/10"
                    >
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                              isSecondary
                                ? "bg-secondary/10 text-secondary"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {loc.badge}
                          </span>
                        </div>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xs text-primary">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-secondary mb-3">{loc.name}</h2>
                        <p className="text-sm text-zinc-600 leading-relaxed mb-6">{loc.desc}</p>
                      </div>

                      <div className="pt-4 border-t border-zinc-200/60">
                        <Link
                          href={loc.href}
                          className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors"
                        >
                          View {loc.name} care services <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </AnimateItem>
                );
              })}
            </AnimateContainer>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-zinc-50 border-t border-zinc-100 text-center">
          <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
            <AnimateContainer animation="fade-up">
              <h2 className="text-2xl font-black text-secondary mb-4">Unsure if we cover your area?</h2>
              <p className="text-sm text-zinc-600 max-w-xl mx-auto mb-6">
                Give our friendly team a call — we frequently extend coverage to surrounding towns and villages across Lothian and Perthshire.
              </p>
              <a
                href={`tel:${CONTACT_NUMBER.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-secondary px-8 py-3.5 text-base font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
              >
                <Phone className="w-4 h-4 shrink-0" />
                Call us on {CONTACT_NUMBER}
              </a>
            </AnimateContainer>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
