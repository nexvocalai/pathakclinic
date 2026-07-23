import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-32">

      {/* ✅ BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-homeopathy.jpg"
          alt="Homoeopathic healing background"
          fill
          priority
          className="object-cover blur-[1px] scale-105"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Soft gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* ✅ CONTENT */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur px-4 py-1.5">
            <span className="text-sm font-medium text-white">
              Natural Healing | Personalized Homoeopathic Care
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
            Pathak Homoeopathic
          </h1>

          {/* Description */}
          <p className="mb-8 text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
            Experience the gentle power of homoeopathy. We provide safe,
            natural, and personalized treatment that addresses the root cause
            of your health concerns.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Button asChild size="lg" className="w-full sm:w-auto gap-2 shadow-lg">
              <Link href="/appointment">
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/40 text-black hover:bg-white/10"
            >
              <a
                href="https://wa.me/916394951471"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>

          </div>

        </div>
      </div>
    </section>
  );
}
