import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const conditions = [
  {
    title: "Skin Disorders",
    description: "Eczema, psoriasis, acne, and other skin conditions",
  },
  {
    title: "Allergies",
    description: "Seasonal allergies, food sensitivities, and hay fever",
  },
  {
    title: "Digestive Issues",
    description: "IBS, acid reflux, constipation, and gastric problems",
  },
  {
    title: "Chronic Pain",
    description: "Arthritis, migraines, back pain, and joint disorders",
  },
  {
    title: "Pediatric Care",
    description: "Child health issues, growth problems, and immunity",
  },
  {
    title: "Lifestyle Diseases",
    description: "Diabetes management, hypertension, and stress-related issues",
  },
];

export function ConditionsTreated() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="text-sm font-medium text-primary">
              Conditions We Treat
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Common Conditions Treated
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We provide effective homoeopathic treatment for a wide range of
            acute and chronic health conditions.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {condition.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {condition.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/services">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
