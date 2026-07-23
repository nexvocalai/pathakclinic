import type { Metadata } from "next";
import { DiseasesGrid } from "@/components/diseases/diseases-grid";
import { getDiseases } from "@/app/actions/diseases";

export const metadata: Metadata = {
  title: "Diseases & Conditions Treated | Pathak Homoeopathic",
  description:
    "Comprehensive list of diseases and health conditions treated with homoeopathy. Search and learn about various diseases and their homoeopathic treatment approach.",
};

export default async function DiseasesPage() {
  const diseases = await getDiseases();
  
  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Diseases & Conditions Treated
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive range of homoeopathic treatments. Search for your condition
              or browse by category to learn more about our treatment approaches.
            </p>
          </div>
        </div>
      </section>

      {/* Diseases Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <DiseasesGrid initialDiseases={diseases} />
        </div>
      </section>
    </>
  );
}
