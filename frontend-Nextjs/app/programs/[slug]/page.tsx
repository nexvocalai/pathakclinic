import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  TrendingUp,
  Brain,
  Heart,
  Activity,
  Sparkles,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Baby,
  CheckCircle,
  Quote,
  Apple,
  Moon,
  BedDouble,
  UtensilsCrossed,
  BookOpen,
  Cloud,
  Ear,
} from "lucide-react";
import { programs, getProgramBySlug, getAllProgramSlugs } from "@/lib/programs-data";

// Icon mapping for dynamic rendering
const iconComponents: Record<string, React.ElementType> = {
  Shield,
  TrendingUp,
  Brain,
  Heart,
  Activity,
  Sparkles,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Baby,
  Apple,
  Moon,
  BedDouble,
  UtensilsCrossed,
  BookOpen,
  Cloud,
  Ear,
};

function getIcon(iconName: string): React.ElementType {
  return iconComponents[iconName] || Heart;
}

export async function generateStaticParams() {
  return getAllProgramSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: "Program Not Found" };
  return {
    title: `${program.title} | Pathak Homoeopathic Clinic`,
    description: program.description,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <>
      {/* Back Navigation + Hero */}
      <section className="bg-[var(--color-cream)]">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back link */}
          <div className="pt-6">
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-[var(--color-navy)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Programs
            </Link>
          </div>

          {/* Hero Content */}
          <div className="grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
            <div>
              <h1 className="font-heading text-3xl font-bold leading-tight text-[var(--color-navy)] md:text-4xl lg:text-5xl">
                {program.title}
              </h1>
              <p className="mt-3 text-lg font-medium text-[var(--color-green)]">
                {program.subtitle}
              </p>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                {program.description}
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-[420px] aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={program.heroImage}
                  alt={program.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="border-b border-border/40 bg-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {program.benefits.map((benefit) => {
              const IconComp = getIcon(benefit.icon);
              return (
                <div key={benefit.label} className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-sage)]">
                    <IconComp className="h-5 w-5 text-[var(--color-green)]" />
                  </div>
                  <span className="text-xs font-medium text-[var(--color-navy)] md:text-sm">
                    {benefit.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Is It For + Our Approach */}
      <section className="py-14 md:py-18 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Who Is It For */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[var(--color-navy)] md:text-3xl">
                Who is it for?
              </h2>
              <ul className="mt-6 space-y-3">
                {program.whoIsItFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-navy)]" />
                    <span className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Approach */}
            <div className="rounded-xl border border-[var(--color-green)]/20 bg-[var(--color-sage)]/40 p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-[var(--color-navy)] md:text-3xl">
                Our Approach
              </h2>
              <ul className="mt-6 space-y-3">
                {program.approach.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-green)]" />
                    <span className="text-sm leading-relaxed text-foreground md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="bg-[var(--color-cream)] py-14 md:py-18">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold text-[var(--color-navy)] md:text-3xl">
            How We Help
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {program.howWeHelp.map((item) => {
              const IconComp = getIcon(item.icon);
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-navy)]/10">
                    <IconComp className="h-6 w-6 text-[var(--color-navy)]" />
                  </div>
                  <span className="max-w-[120px] text-sm font-medium leading-tight text-[var(--color-navy)]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Holistic Care Section */}
      <section className="py-14 md:py-18 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-[var(--color-green)] shadow-xl">
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 md:h-auto">
                <Image
                  src={program.holisticCare.image}
                  alt={program.holisticCare.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-green)]/30 md:bg-gradient-to-r" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-10">
                <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                  {program.holisticCare.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">
                  {program.holisticCare.description}
                </p>
                <Link
                  href="/appointment"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border-2 border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Concerns */}
      <section className="bg-[var(--color-cream)] py-14 md:py-18">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold text-[var(--color-navy)] md:text-3xl">
            Common Concerns We Address
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {program.commonConcerns.map((concern) => {
              const IconComp = getIcon(concern.icon);
              return (
                <div
                  key={concern.label}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                    <IconComp className="h-7 w-7 text-[var(--color-navy)]" />
                  </div>
                  <span className="max-w-[100px] text-xs font-medium leading-tight text-[var(--color-navy)] md:text-sm">
                    {concern.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Quote className="mx-auto mb-4 h-10 w-10 text-[var(--color-gold)]" />
            <blockquote className="font-heading text-lg leading-relaxed text-[var(--color-navy)] italic md:text-xl">
              {program.testimonial.quote}
            </blockquote>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              {program.testimonial.author}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[var(--color-green)] py-10 md:py-14">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left md:px-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
              {program.ctaTitle}
            </h2>
            <p className="mt-2 text-white/80">
              {program.ctaDescription}
            </p>
          </div>
          <Link
            href="/appointment"
            className="shrink-0 rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[var(--color-green)] shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-105"
          >
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
