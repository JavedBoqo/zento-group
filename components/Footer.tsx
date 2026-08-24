import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";
import ModalButton from "@/components/ModalButton";
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
  // { name: "How It Works", href: "/#how-it-works" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 pt-16 pb-10 text-zinc-600 min-[400px]:pt-20 md:pt-24">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 items-start gap-10 text-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-8 lg:text-left xl:gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center space-y-5 lg:items-start">
            <div className="relative h-18 w-44 min-[400px]:w-52">
              <Link href="/" aria-label="Zento Care home" className="relative block h-full w-full">
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
              Nurse-led home care across Edinburgh, Lothian, and Perthshire. Registered with the Care Inspectorate.
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
          </div>

          {/* Explore */}
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Explore</p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Services</p>
            <nav aria-label="Footer services">
              <ul className="space-y-2.5">
                {featuredServices.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
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
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Locations</p>
            <nav aria-label="Footer locations">
              <ul className="space-y-2.5">
                {featuredLocations.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
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
          <div className="space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Get in Touch</p>
            <div className="space-y-4">
              {OFFICES.map((office) => (
                <div key={office.name} className="space-y-1">
                  <p className="text-sm font-bold text-secondary">{office.name}</p>
                  <p className="flex items-start justify-center gap-2 text-sm text-zinc-600 lg:justify-start">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {office.address}
                  </p>
                  <a
                    href={office.phoneHref}
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-primary lg:justify-start"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    {office.phone}
                  </a>
                </div>
              ))}
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-primary lg:justify-start"
            >
              <Mail className="h-4 w-4 text-primary" />
              {CONTACT_EMAIL}
            </a>
            <ModalButton
              type="general"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 cursor-pointer"
            >
              Send us a Message
            </ModalButton>
          </div>
        </div>

        <p className="mt-12 border-t border-zinc-200 pt-8 text-center text-xs leading-relaxed text-zinc-400">
          Serving {SERVICE_AREAS}
        </p>
      </div>
    </footer>
  );
}
