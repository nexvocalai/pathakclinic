import { Award, Users, Sparkles, ShieldCheck, Heart } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "5+",
    label: "Years of Experience",
  },
  {
    icon: Users,
    value: "800+",
    label: "Happy Families",
  },
  {
    icon: Sparkles,
    value: "100%",
    label: "Personalized Holistic Care",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Safe & Side-Effect Free",
  },
  {
    icon: Heart,
    value: "360°",
    label: "Long-Term Wellness Focus",
  },
];

export function StatsBar() {
  return (
    <section className="bg-[var(--color-navy)] py-8 md:py-10 border-y border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 items-stretch">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center justify-between text-center p-3 rounded-xl transition-all duration-300 hover:bg-white/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--color-gold)]/20 mb-2">
                <stat.icon className="h-6 w-6 text-[var(--color-gold)]" />
              </div>
              
              <div className="flex flex-col items-center justify-center flex-1 min-h-[4rem]">
                {stat.value ? (
                  <span className="text-2xl md:text-3xl font-bold text-white font-heading tracking-tight mb-1">
                    {stat.value}
                  </span>
                ) : null}
                <span className="text-xs md:text-sm font-medium leading-snug text-white/80 max-w-[160px]">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
