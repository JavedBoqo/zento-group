"use client";

import { useState } from "react";
import { CheckCircle2, Building2, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { OFFICES } from "@/constants";

interface OfficeMapSwitcherProps {
  onOfficeChange?: (officeName: string) => void;
}

export default function OfficeMapSwitcher({ onOfficeChange }: OfficeMapSwitcherProps) {
  const [activeOfficeId, setActiveOfficeId] = useState<string>(OFFICES[0].id);

  const handleSelectOffice = (id: string, name: string) => {
    setActiveOfficeId(id);
    onOfficeChange?.(name);
  };

  const activeOfficeData = OFFICES.find((o) => o.id === activeOfficeId) ?? OFFICES[0];

  return (
    <div className="lg:col-span-7 flex flex-col space-y-6 lg:h-full">
      {/* Section Header */}
      <div className="h-14 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-secondary">Our Office Locations</h2>
        <p className="text-xs text-zinc-500 mt-1">
          Select an office below to view contact details and map location.
        </p>
      </div>

      {/* Office Cards Switcher — driven entirely from OFFICES constant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OFFICES.map((office) => {
          const isSelected = activeOfficeId === office.id;

          return (
            <div
              key={office.id}
              onClick={() => handleSelectOffice(office.id, office.name)}
              className={`relative cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              {isSelected && (
                <CheckCircle2 className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 h-4 w-4 text-primary shrink-0" />
              )}

              <div className="flex items-center gap-2.5 pr-6">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-zinc-100 text-secondary"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-secondary text-base">{office.name}</h3>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-zinc-600">
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                  <a
                    href={office.phoneHref}
                    className="font-semibold text-secondary hover:text-primary transition-colors"
                  >
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                  <a
                    href={`mailto:${office.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {office.email}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Display Box — mapEmbedUrl & googleMapsUrl from constants */}
      <div className="flex-1 min-h-[350px] flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-xl">
        <div className="flex items-center justify-between bg-secondary px-5 py-3 text-white text-xs font-semibold shrink-0">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Map: {activeOfficeData.name} ({activeOfficeData.address})
          </span>
          <a
            href={activeOfficeData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            Google Maps <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="relative flex-1 min-h-[300px] w-full">
          <iframe
            key={activeOfficeData.id}
            title={`Map of ${activeOfficeData.name}`}
            src={activeOfficeData.mapEmbedUrl}
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
