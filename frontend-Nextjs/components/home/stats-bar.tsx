import { Award, Users, Sparkles, ShieldCheck, Heart } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "5+",
    label: "Years of Experience",
  },
  {
    icon: Users,
    value: "5000+",
    label: "Happy Families",
  },
  {
    icon: Sparkles,
    label: "Personalized Holistic Care",
  },
  {
    icon: ShieldCheck,
    label: "Safe, Natural & Side Effect Free",
  },
  {
    icon: Heart,
    label: "Long Term Wellness Focus",
  },
];

export function StatsBar() {
  return (
    <section className="bg-[var(--color-navy)] py-8 md:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <stat.icon className="h-6 w-6 text-[var(--color-gold)]" />
              </div>
              {stat.value && (
                <span className="text-2xl font-bold text-white font-heading">
                  {stat.value}
                </span>
              )}
              <span className="text-sm font-medium leading-tight text-white/80">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
