import type { Metadata } from "next";
import { DiseasesGrid } from "@/components/diseases/diseases-grid";
import { getDiseases } from "@/app/actions/diseases";

export const dynamic = 'force-dynamic';

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
      <div
        className="relative w-full h-[300px] md:h-[220px] flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/testimonials-header.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Blur + Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
            Diseases & Conditions Treated
          </h1>

          <p className="mt-2 text-sm md:text-lg leading-relaxed drop-shadow-md">
            Explore our comprehensive range of homoeopathic treatments. Search for your condition
            or browse by category to learn more about our treatment approaches.
          </p>
        </div>
      </div>

      {/* Diseases Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <DiseasesGrid initialDiseases={diseases} />
        </div>
      </section>
    </>
  );
}
