"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { AnimateIn } from "@/components/shared/animate-in";

export function CtaBanner() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/cta-bg.png"
        alt="Amazon packages background"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/60 to-navy-950/50" />

      <Container className="relative z-10 text-center">
        <AnimateIn>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Let&apos;s handle your next{" "}
            <span className="relative inline-block">
              shipment!
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange rounded-full" />
            </span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <p className="text-white/90 text-lg max-w-xl mx-auto mb-8">
            Get started with a free quote and see how we can streamline your Amazon
            FBA operations.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.3}>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg bg-white text-navy-900 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Request a Free Quote
          </Link>
        </AnimateIn>
      </Container>
    </section>
  );
}
