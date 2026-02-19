import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ServiceCard } from "@/components/marketing/service-card";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive Amazon FBA prep and fulfillment services including labeling, poly-bagging, direct injection, volume prep, returns, and storage.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-navy-900">
        <Container>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-navy-300 max-w-2xl">
            End-to-end Amazon FBA preparation and fulfillment services designed
            to scale with your business.
          </p>
        </Container>
      </section>

      <Section bg="offwhite">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
