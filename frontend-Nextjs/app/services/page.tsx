import type { Metadata } from "next";
import { ServicesOverview } from "@/components/services/services-overview";
import { TreatmentApproach } from "@/components/services/treatment-approach";
import { FAQSection } from "@/components/services/faq-section";
import { CTASection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Our Services | Pathak Homoeopathic",
  description:
    "Comprehensive homoeopathic treatment for chronic diseases, skin disorders, allergies, women&apos;s health, child care, and stress-related conditions. Learn about our holistic healing approach.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      {/* <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-20"> */}
        {/* <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Discover our range of homoeopathic treatments designed to address
              your health concerns naturally and effectively.
            </p>
          </div>
        </div> */}
        <div
      className="relative w-full h-[300px] md:h-[220px] flex items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/testimonials-header.jpg')", // ✅ replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      >
      {/* ✅ Blur + Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* ✅ Content */}
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
          Our Services
        </h1>

        <p className="mt-2 text-sm md:text-lg leading-relaxed drop-shadow-md">
          Discover our range of homoeopathic treatments designed to address
              your health concerns naturally and effectively.
        </p>
      </div>
    </div>

      {/* </section> */}

      <ServicesOverview />
      <TreatmentApproach />
      <FAQSection />
      <CTASection />
    </>
  );
}
