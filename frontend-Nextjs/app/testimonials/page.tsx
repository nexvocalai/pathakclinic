import type { Metadata } from "next";
import Image from "next/image";
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid";

export const metadata: Metadata = {
  title: "Patient Testimonials | Pathak Homoeopathic",
  description:
    "Read success stories and reviews from our satisfied patients. See how homoeopathic treatment has transformed lives.",
};

export default function TestimonialsHeader() {
  return (
    <>
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
          Patient Success Stories
        </h1>

        <p className="mt-2 text-sm md:text-lg leading-relaxed drop-shadow-md">
          Real results from real patients who have transformed their health
          through homoeopathic treatment
        </p>
      </div>
    </div>

      {/* Testimonials Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <TestimonialsGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-gradient-to-r from-primary/5 to-primary/10 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of patients who have found lasting wellness through homoeopathic treatment
            </p>
            <a
              href="/appointment"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Book Your Consultation
            </a>
          </div>
        </div>
      </section>
              </>
  );
}
