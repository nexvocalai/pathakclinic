import { Leaf, Users, Clock, Shield } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Natural & Side-Effect-Free",
    description:
      "Homoeopathic remedies are derived from natural substances and are gentle on your body without harmful side effects.",
  },
  {
    icon: Users,
    title: "Individualized Care",
    description:
      "Every patient receives a personalized treatment plan based on their unique symptoms, constitution, and health history.",
  },
  {
    icon: Clock,
    title: "Long-Term Results",
    description:
      "By addressing the root cause of illness, homoeopathy provides lasting health improvements, not just temporary relief.",
  },
  {
    icon: Shield,
    title: "Safe for All Ages",
    description:
      "From infants to elderly, homoeopathic treatment is safe and effective for patients of all age groups.",
  },
];

export function WhyHomoeopathy() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-sm font-medium text-primary">
              Why Choose Us
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Why Choose Homoeopathy?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Discover the benefits of natural healing that has helped millions
            worldwide achieve better health.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
