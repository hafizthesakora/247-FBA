import { HeroSection } from "@/components/marketing/hero-section";
import { MissionSection } from "@/components/marketing/mission-section";
import { ServicesGrid } from "@/components/marketing/services-grid";
import { FullSpectrumSection } from "@/components/marketing/full-spectrum-section";
import { TestimonialsCarousel } from "@/components/marketing/testimonials-carousel";
import { CtaBanner } from "@/components/marketing/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <ServicesGrid />
      <FullSpectrumSection />
      <TestimonialsCarousel />
      <CtaBanner />
    </>
  );
}
