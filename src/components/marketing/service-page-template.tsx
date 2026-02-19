"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/animate-in";
import type { Service } from "@/types/services";

interface ServicePageTemplateProps {
  service: Service;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 min-h-[50vh] flex items-end">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/70 to-navy-950/40" />
        <Container className="relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
              {service.title}
            </h1>
            {service.isComingSoon && <Badge variant="orange">Coming Soon</Badge>}
          </div>
          <p className="text-xl text-white/80 max-w-2xl">{service.description}</p>
        </Container>
      </section>

      {/* Features & Benefits */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimateIn direction="left">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-6">
                What&apos;s Included
              </h2>
              <StaggerContainer className="space-y-4" staggerDelay={0.08}>
                {service.features.map((feature) => (
                  <StaggerItem key={feature}>
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-offwhite transition-colors">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange/10 shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-orange" />
                      </div>
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.2}>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-6">
                Why Choose Us
              </h2>
              <StaggerContainer className="space-y-4" staggerDelay={0.08}>
                {service.benefits.map((benefit) => (
                  <StaggerItem key={benefit}>
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-offwhite transition-colors">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <span className="text-text-secondary">{benefit}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section bg="offwhite">
        <Container className="text-center">
          <AnimateIn>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4">
              Ready to get started?
            </h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto">
              {service.isComingSoon
                ? "Join our waitlist to be notified when this service launches."
                : "Request a free quote and let us handle your Amazon FBA prep."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 text-base font-semibold rounded-lg bg-orange text-white hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              {service.isComingSoon ? "Join Waitlist" : "Get a Quote"}
            </Link>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
