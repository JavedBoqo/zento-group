import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";
import ModalButton from "@/components/ModalButton";
import CookiePreferences from "@/components/CookiePreferences";
import {
  OFFICES,
  CONTACT_EMAIL,
  SERVICE_AREAS,
  SOCIAL_LINKS,
} from "@/constants";

const featuredServices = [
  { name: "Home Care", href: "/home-care" },
  { name: "Live-in Care", href: "/live-in-care" },
  { name: "Personal Care", href: "/home-care/personal-care" },
  { name: "Dementia Care", href: "/home-care/dementia-care" },
  // { name: "Medication Support", href: "/home-care/medication-support" },
  // { name: "Respite Care", href: "/home-care/respite-care" },
];

const featuredLocations = [
  { name: "Edinburgh", href: "/locations/edinburgh" },
  { name: "Lothian", href: "/locations/lothian" },
  { name: "Perthshire", href: "/locations/perthshire" },
  { name: "Crieff", href: "/locations/perthshire/crieff" },
  // { name: "Comrie", href: "/locations/perthshire/comrie" },
];

const exploreLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Our Services", href: "/services" },
  { name: "Careers / Vacancies", href: "/careers" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Modern Slavery", href: "/modern-slavery-statement" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 pt-16 pb-10 text-zinc-600 min-[400px]:pt-20 md:pt-24">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 items-start gap-10 text-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-8 lg:text-left xl:gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center space-y-5 lg:items-start">
            <div className="relative h-18 w-44 min-[400px]:w-52">
              <Link
                href="/"
                aria-label="Zento Care home"
                className="relative block h-full w-full"
              >
                <Image
                  src="/logo.svg"
                  alt="Zento Logo"
                  fill
                  sizes="(max-width: 400px) 160px, 192px"
                  className="object-contain object-center lg:object-left"
                />
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500">
              Nurse-led care in Perthshire and dedicated home support in
              Edinburgh and the Lothians. Registered with the Care Inspectorate.
            </p>
            <div className="flex justify-center gap-3 lg:justify-start">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-400 shadow-md transition-all hover:-translate-y-1 hover:bg-primary hover:text-white"
                >
                  {social.iconName === "facebook" && <FacebookIcon />}
                  {social.iconName === "instagram" && <InstagramIcon />}
                  {social.iconName === "linkedin" && <LinkedinIcon />}
                </a>
              ))}
            </div>

            {/* Accreditation Logos & Widget */}
            <div className="flex items-center justify-center gap-4 pt-12 lg:justify-start flex-nowrap">
              <div className="relative flex h-12 w-20 shrink-0 items-center justify-center transition-all duration-300 hover:scale-105">
                <Image
                  src="/trustedby/disability-confident-clean.png"
                  alt="Disability Confident Committed Employer Badge"
                  width={110}
                  height={52}
                  className="max-h-8 w-auto object-contain"
                />
              </div>
              <div className="relative flex h-12 w-24 shrink-0 items-center justify-center transition-all duration-300 hover:scale-105">
                <Image
                  src="/trustedby/disclosure-scotland-clean.png"
                  alt="Disclosure Scotland PVG Scheme Logo"
                  width={130}
                  height={42}
                  className="max-h-7 w-auto object-contain"
                />
              </div>
              <a
                href="https://www.careinspectorate.scot/find-care/search-for-care/care-services/CS2026000326/zento"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Zento Care Inspectorate Registration"
                className="group/ci relative block h-[62px] w-[60px] shrink-0 overflow-hidden rounded-md transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="pointer-events-none absolute top-0 left-0 origin-top-left scale-[0.49]">
                  <iframe
                    title="Care Inspectorate Registration Widget"
                    src="https://www.careinspectorate.scot/ciWidget/4/Q1MyMDI2MDAwMzI2X1NISGJRazJwTDNZSDhMMlU%3D"
                    width="120"
                    height="126"
                    scrolling="no"
                    style={{ border: 0 }}
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">
              Explore
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">
              Services
            </p>
            <nav aria-label="Footer services">
              <ul className="space-y-2.5">
                {featuredServices.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-secondary"
              >
                View all services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>

          {/* Locations */}
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">
              Locations
            </p>
            <nav aria-label="Footer locations">
              <ul className="space-y-2.5">
                {featuredLocations.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/locations"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-secondary"
              >
                View all locations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>

          {/* Get in Touch */}
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">
              Get in Touch
            </p>
            <div className="space-y-3.5">
              {OFFICES.map((office) => (
                <div key={office.id || office.name} className="space-y-1.5">
                  <p className="text-sm font-bold text-secondary">
                    {office.name}
                  </p>
                  {office.address ? (
                    <p className="flex items-start justify-center gap-2 text-sm text-zinc-600 lg:justify-start">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {office.address}
                    </p>
                  ) : null}
                  <div>
                    <a
                      href={office.phoneHref}
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-primary lg:justify-start"
                    >
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      {office.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-primary lg:justify-start"
              >
                <Mail className="h-4 w-4 text-primary" />
                {CONTACT_EMAIL}
              </a>
            </div>
            <ModalButton
              type="general"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 cursor-pointer"
            >
              Send us a Message
            </ModalButton>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 border-t border-zinc-200 pt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left text-xs text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} Zento Group Limited. All rights
            reserved. Registered in Scotland (SC875709).
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 font-medium">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
            <span className="text-zinc-300 hidden sm:inline" aria-hidden="true">
              &bull;
            </span>
            <Link
              href="/modern-slavery-statement"
              className="transition-colors hover:text-primary"
            >
              Modern Slavery Statement
            </Link>
            <CookiePreferences />
          </div>
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-zinc-400">
          Serving {SERVICE_AREAS}
        </p>
      </div>
    </footer>
  );
}
