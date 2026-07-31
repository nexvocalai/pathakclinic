import type { Metadata } from "next";
import { DoctorProfile } from "@/components/about/doctor-profile";
import { Achievements } from "@/components/about/achievements";

export const metadata: Metadata = {
  title: "About Dr. Rati Pathak | Pathak Homoeopathic Clinic",
  description:
    "Meet Dr. Rati Pathak - An experienced homoeopathic doctor. Learn about her credentials, expertise, and compassionate approach to natural healing.",
};

export default function AboutPage() {
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
            About Dr. Rati Pathak
          </h1>

          <p className="mt-2 text-sm md:text-lg leading-relaxed drop-shadow-md">
            Dedicated to bringing natural healing, holistic wellness, and personalized care to every patient through evidence-based homoeopathy.
          </p>
        </div>
      </div>

      {/* Doctor Profile */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <DoctorProfile />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Philosophy & Approach</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Dr. Rati Pathak's approach to homoeopathic medicine is rooted in the principle that true healing comes from treating the whole person, not just isolated symptoms. She has developed a comprehensive understanding of how to unlock the body's natural healing potential safely and effectively.
              </p>
              <p>
                Her practice is built on three foundational pillars: deep and thorough case-taking, precise constitutional prescribing, and compassionate patient education. Each patient receives a highly personalized treatment plan that addresses their unique health challenges, emotional state, and life circumstances.
              </p>
              <p>
                At Pathak Homoeopathic Clinic, the goal is not just the absence of disease, but the presence of vibrant health. We are committed to guiding you gently and naturally toward a healthier, happier life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Achievements />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-gradient-to-r from-primary/5 to-primary/10 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Experience Dr. Rati Pathak's Expertise
            </h2>
            <p className="text-lg text-muted-foreground">
              Schedule a consultation to discuss your health concerns and start your journey towards
              natural wellness
            </p>
            <a
              href="/appointment"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
