import { Search, Stethoscope, FlaskConical, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Detailed Case Study",
    description:
      "We begin with a comprehensive evaluation of your health history, symptoms, lifestyle, and emotional state to understand your unique constitution.",
  },
  {
    icon: Stethoscope,
    title: "Root Cause Analysis",
    description:
      "Rather than suppressing symptoms, we identify and address the underlying cause of your health issues for lasting healing.",
  },
  {
    icon: FlaskConical,
    title: "Personalized Remedy",
    description:
      "Based on the analysis, we select the most suitable homoeopathic remedy that matches your individual symptom picture.",
  },
  {
    icon: HeartPulse,
    title: "Holistic Healing",
    description:
      "Our approach treats you as a whole person - body, mind, and spirit - leading to comprehensive health improvement.",
  },
];

export function TreatmentApproach() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
              <span className="text-sm font-medium text-primary">
                Our Approach
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              How We Treat You
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              Our treatment philosophy is rooted in classical homoeopathic
              principles, focusing on individualized care and natural healing.
              We believe in treating the person, not just the disease, leading
              to deep and lasting health improvements.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every patient is unique, and so is their treatment. We take the
              time to understand your complete health picture before prescribing
              the most suitable remedy.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
