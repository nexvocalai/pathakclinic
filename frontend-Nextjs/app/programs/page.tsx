import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Baby, HeartPulse, Brain, Activity, Clock } from "lucide-react";
import { programs } from "@/lib/programs-data";

export const metadata: Metadata = {
  title: "Our Programs | Pathak Homoeopathic Clinic",
  description:
    "Explore our specialized wellness programs — Healthy Child, Confident Woman, Peaceful Mind, Active Life, and Healthy Ageing. Personalized homoeopathic care for every stage of life.",
};

const iconMap: Record<string, React.ElementType> = {
  "healthy-child": Baby,
  "confident-woman": HeartPulse,
  "peaceful-mind": Brain,
  "active-life": Activity,
  "healthy-ageing": Clock,
};

const colorMap: Record<string, string> = {
  "healthy-child": "#2E7D52",
  "confident-woman": "#C9A84C",
  "peaceful-mind": "#1B2E4B",
  "active-life": "#2E7D52",
  "healthy-ageing": "#C9A84C",
};

export default function ProgramsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-cream)] py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-[var(--color-navy)] md:text-5xl">
              Our Programs
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Specialized wellness programs designed for every stage of life.
              Choose the program that fits your needs and start your healing
              journey.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => {
              const IconComponent = iconMap[program.slug] || Activity;
              const color = colorMap[program.slug] || "#2E7D52";

              return (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[var(--color-gold)]/40 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={program.heroImage}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <IconComponent
                          className="h-5 w-5"
                          style={{ color }}
                        />
                      </div>
                      <h2 className="font-heading text-xl font-bold text-[var(--color-navy)]">
                        {program.title.replace(" Program", "")}
                      </h2>
                    </div>

                    <p className="mb-2 text-sm font-medium text-[var(--color-green)]">
                      {program.subtitle}
                    </p>

                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {program.description}
                    </p>

                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-navy)] transition-colors group-hover:text-[var(--color-green)]">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[var(--color-navy)] py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Not Sure Which Program is Right for You?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/75">
            Book a free consultation and our doctor will help you find the
            perfect wellness program for you and your family.
          </p>
          <Link
            href="/appointment"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[var(--color-gold)] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-[var(--color-gold-light)] hover:shadow-xl"
          >
            Book Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
