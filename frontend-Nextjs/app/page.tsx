import { HeroSection } from "@/components/home/hero-section";
import { ProgramsSection } from "@/components/home/programs-section";
import { StatsBar } from "@/components/home/stats-bar";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { BookAppointmentCTA } from "@/components/home/book-appointment-cta";
import { TrustedBy } from "@/components/home/trusted-by";
import { DoctorEventsSlider } from "@/components/home/doctor-events-slider";
import { UniqueFeatures } from "@/components/home/unique-features";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProgramsSection />
      <StatsBar />
      <WhyChooseUs />
      <BookAppointmentCTA />
      <TrustedBy />
      <DoctorEventsSlider />
      {/* <UniqueFeatures /> */}
    </>
  );
}
