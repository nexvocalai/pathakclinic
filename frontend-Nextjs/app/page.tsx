import { HeroSection } from "@/components/home/hero-section";
import { AboutDoctor } from "@/components/home/about-doctor";
import { WhyHomoeopathy } from "@/components/home/why-homoeopathy";
import { DoctorEventsSlider } from "@/components/home/doctor-events-slider";
import { AreasSpecialization } from "@/components/home/areas-specialization";
import { FeaturedBlog } from "@/components/home/featured-blog";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutDoctor />
      <WhyHomoeopathy />
      <DoctorEventsSlider />
      <AreasSpecialization />
      <FeaturedBlog />
      <CTASection />
    </>
  );
}
