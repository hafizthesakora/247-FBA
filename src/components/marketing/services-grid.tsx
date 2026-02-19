"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ServiceCard } from "./service-card";
import { services } from "@/data/services";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/animate-in";

export function ServicesGrid() {
  return (
    <Section bg="offwhite">
      <Container>
        <AnimateIn className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
            What We Do
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Services We Offer
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            End-to-end Amazon FBA preparation and fulfillment services designed
            to scale with your business.
          </p>
        </AnimateIn>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          staggerDelay={0.1}
        >
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
