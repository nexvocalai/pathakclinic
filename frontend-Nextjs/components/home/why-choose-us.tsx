import { Search, UserCheck, Leaf, ShieldPlus, LifeBuoy } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Comprehensive Case Taking",
    description: "We understand the root cause, not just the symptoms.",
  },
  {
    icon: UserCheck,
    title: "Personalized Treatment",
    description: "Tailored medicines, diet & lifestyle for each individual.",
  },
  {
    icon: Leaf,
    title: "Holistic Approach",
    description: "We treat the person as a whole – body, mind & emotions.",
  },
  {
    icon: ShieldPlus,
    title: "Preventive Care",
    description: "Focus on prevention and long-term health & well-being.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support",
    description: "Regular follow-ups and continuous guidance.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
            Why Families Choose Us
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-stretch">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col items-center text-center p-3 rounded-xl transition-all duration-300 hover:bg-slate-50"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-sage)] transition-all duration-300 group-hover:bg-[var(--color-green)]/20 group-hover:scale-110 shrink-0">
                <feature.icon className="h-6 w-6 text-[var(--color-green)]" />
              </div>

              {/* Fixed title container height ensures aligned descriptions across all cards */}
              <div className="mb-2 flex min-h-[2.75rem] items-center justify-center">
                <h3 className="text-base font-semibold text-[var(--color-navy)] leading-snug">
                  {feature.title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
