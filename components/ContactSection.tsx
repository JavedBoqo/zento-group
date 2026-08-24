"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import ModalButton from "@/components/ModalButton";
import AnimateContainer from "@/components/AnimateContainer";
import {
  OFFICES,
  SERVICE_AREAS,
  PERTHSHIRE_TAGLINE,
} from "@/constants";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
          <AnimateContainer
            animation="fade-right"
            className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-3xl bg-zinc-100 shadow-2xl lg:aspect-square lg:w-1/2"
          >
            <Image
              src="/brand-image.webp"
              alt="Zento care team in Edinburgh and Perthshire"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover"
            />
          </AnimateContainer>

          <AnimateContainer
            animation="fade-left"
            delay={0.1}
            className="w-full space-y-8 text-center lg:w-1/2 lg:text-left"
          >
            <div>
              <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
                Contact Us
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600">{PERTHSHIRE_TAGLINE}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {OFFICES.map((office) => (
                <div key={office.name} className="space-y-2">
                  <h3 className="text-base font-bold text-secondary">{office.name}</h3>
                  <ul className="space-y-1.5">
                    <li className="flex items-start justify-center gap-2 lg:justify-start">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <a
                      href={office.mapEmbedHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-primary"
                      >{office.address}</a>
                    </li>
                    <li>
                      <a
                        href={office.phoneHref}
                        className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-primary"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-primary" />
                        {office.phone}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${office.email}`}
                        className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-primary"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-zinc-400" />
                        {office.email}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            <p className="text-sm leading-relaxed text-zinc-500">Serving {SERVICE_AREAS}</p>

            <ModalButton
              type="general"
              className="rounded-full bg-primary px-10 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 cursor-pointer"
            >
              Send us a Message
            </ModalButton>
          </AnimateContainer>
        </div>
      </div>
    </section>
  );
}
