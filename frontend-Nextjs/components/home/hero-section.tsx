import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

const programTags = [
  "Healthy Child",
  "Confident Woman",
  "Peaceful Mind",
  "Active Life",
  "Healthy Ageing",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-cream)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 py-12 md:grid-cols-2 md:py-20 lg:py-24">
          {/* Left Content */}
          <div className="order-2 md:order-1">
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-[var(--color-navy)] sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              Helping Every
              <br />
              Family Live Healthier
            </h1>

            {/* Program Tags */}
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {programTags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--color-green)] md:text-base">
                    {tag}
                  </span>
                  {i < programTags.length - 1 && (
                    <span className="text-muted-foreground/40">•</span>
                  )}
                </span>
              ))}
            </div>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Personalized homoeopathic care, lifestyle guidance
              and ongoing support for lifelong wellness.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[var(--color-navy-light)] hover:shadow-lg"
              >
                Book Appointment
              </Link>
              <a
                href="https://wa.me/916394951471?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Pathak%20Homoeopathic."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#20bd5a] hover:shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Now
              </a>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--color-navy)]/30 px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-all hover:bg-[var(--color-navy)]/5"
              >
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Video */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover object-right"
                aria-hidden="true"
              >
                <source src="/background-video.mp4" type="video/mp4" />
              </video>
              {/* Subtle gradient overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
