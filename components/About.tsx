"use client";

import Image from "next/image";
import AnimateContainer from "@/components/AnimateContainer";

export default function About() {
  return (
    <section id="about-us" className="py-24">
      <div className="container mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center gap-12 lg:flex-row">

          <AnimateContainer
            animation="fade-right"
            className="relative aspect-square w-full max-w-md flex-1 overflow-hidden rounded-3xl bg-zinc-100"
          >
            <Image
              src="/about-image.png"
              alt="Elderly client enjoying happy independent life at home"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
          </AnimateContainer>

          <AnimateContainer
            animation="fade-left"
            delay={0.1}
            className="flex-1 space-y-6 text-center lg:text-left"
          >
            <h2 className="text-3xl font-black text-secondary min-[400px]:text-4xl sm:text-5xl">
              Nurse-Led, Person-Centred Home Care
            </h2>
            <p className="text-lg leading-relaxed text-zinc-600">
              Zento is founded and led by qualified nurses with extensive clinical experience. We provide compassionate support to adults who require assistance to live safely and independently within their own homes across Edinburgh and the Lothians.
            </p>
            <p className="text-lg leading-relaxed text-zinc-600">
              Operated in line with Scotland&apos;s Health and Social Care Standards, we believe care should be professional, reassuring, and deeply human.
            </p>
          </AnimateContainer>

        </div>
      </div>
    </section>
  );
}
