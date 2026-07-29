import Link from "next/link";
import { ArrowRight, Baby, HeartPulse, Brain, Activity, Clock } from "lucide-react";

const programs = [
  {
    slug: "healthy-child",
    title: "Healthy Child",
    description: "Stronger immunity, better growth & happy childhood",
    icon: Baby,
    color: "#2E7D52",
  },
  {
    slug: "confident-woman",
    title: "Confident Woman",
    description: "Hormonal balance, PCOS, Thyroid, Pregnancy & more",
    icon: HeartPulse,
    color: "#C9A84C",
  },
  {
    slug: "peaceful-mind",
    title: "Peaceful Mind",
    description: "Stress, Anxiety, Sleep issues, Emotional well-being",
    icon: Brain,
    color: "#1B2E4B",
  },
  {
    slug: "active-life",
    title: "Active Life",
    description: "Lifestyle disorders, Weight management, Energy & vitality",
    icon: Activity,
    color: "#2E7D52",
  },
  {
    slug: "healthy-ageing",
    title: "Healthy Ageing",
    description: "Healthy ageing, Bone health, Memory & more",
    icon: Clock,
    color: "#C9A84C",
  },
];

export function ProgramsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group flex flex-col items-center rounded-xl border border-border/60 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--color-gold)]/40 hover:-translate-y-1"
            >
              {/* Icon Circle */}
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${program.color}12` }}
              >
                <program.icon
                  className="h-7 w-7"
                  style={{ color: program.color }}
                />
              </div>

              {/* Title */}
              <h3 className="mb-2 font-heading text-lg font-semibold text-[var(--color-navy)]">
                {program.title}
              </h3>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {program.description}
              </p>

              {/* Explore Link */}
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-[var(--color-green)] transition-colors group-hover:text-[var(--color-green-light)]">
                Explore
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
