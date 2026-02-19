"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimateIn } from "@/components/shared/animate-in";

export function MissionSection() {
  return (
    <Section bg="white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <AnimateIn direction="left">
            <div>
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Who We Are
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-6 leading-tight">
                Our Mission
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-4">
                At 24/7 FBA, we believe that every Amazon seller deserves access to
                fast, reliable, and professional prep services — without the
                overhead of managing it all in-house.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                Based in Nürtingen, Germany, we serve sellers across Europe with
                precision prep, quality inspection, and direct injection to Amazon
                fulfillment centers. Our mission is simple: get your products
                Amazon-ready and delivered fast, so you can focus on growing your
                business.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-lg bg-orange text-white hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Learn More About Us
              </Link>
            </div>
          </AnimateIn>

          {/* Image */}
          <AnimateIn direction="right" delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/warehouse.jpg"
                alt="24/7 FBA warehouse operations"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-navy-950/10" />
            </div>
          </AnimateIn>
        </div>
      </Container>
    </Section>
  );
}
