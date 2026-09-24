"use client";

import { Building2, MapPin, Phone, Mail, ExternalLink, ShieldCheck } from "lucide-react";
import { OFFICES } from "@/constants";

interface OfficeMapSwitcherProps {
  onOfficeChange?: (officeName: string) => void;
}

export default function OfficeMapSwitcher({ onOfficeChange }: OfficeMapSwitcherProps) {
  const crieffOffice = OFFICES.find((o) => o.id === "crieff") ?? OFFICES[0];

  return (
    <div className="lg:col-span-7 flex flex-col space-y-6 lg:h-full">
      {/* Section Header */}
      <div className="h-14 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-secondary">Our Head Office</h2>
        <p className="text-xs text-zinc-500 mt-1">
          East High Street, Crieff &mdash; delivering nurse-led care across Perthshire and Lothian.
        </p>
      </div>

      {/* Crieff Office Card */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-secondary text-base sm:text-lg">{crieffOffice.name}</h3>
              <p className="text-xs font-semibold text-primary">Main Head Office</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-secondary shadow-xs border border-zinc-200">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Care Inspectorate Registered
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-primary/10">
          <div className="flex items-start gap-2 text-zinc-600">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-secondary block">Address</span>
              <span>{crieffOffice.address}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-zinc-600">
            <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-secondary block">Telephone</span>
              <a
                href={crieffOffice.phoneHref}
                className="font-bold text-secondary hover:text-primary transition-colors"
              >
                {crieffOffice.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2 text-zinc-600">
            <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-secondary block">Email</span>
              <a
                href={`mailto:${crieffOffice.email}`}
                className="font-medium text-secondary hover:text-primary transition-colors truncate block"
              >
                {crieffOffice.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map Display Box — Crieff mapEmbedUrl & googleMapsUrl */}
      <div className="flex-1 min-h-[350px] flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-xl">
        <div className="flex items-center justify-between bg-secondary px-5 py-3 text-white text-xs font-semibold shrink-0">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Map: {crieffOffice.name} ({crieffOffice.address})
          </span>
          <a
            href={crieffOffice.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            Google Maps <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="relative flex-1 min-h-[300px] w-full">
          <iframe
            key={crieffOffice.id}
            title={`Map of ${crieffOffice.name}`}
            src={crieffOffice.mapEmbedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
