"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { AnimateIn } from "@/components/shared/animate-in";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="font-heading text-5xl md:text-6xl font-bold text-orange"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {isInView ? `${target}${suffix}` : `0${suffix}`}
    </motion.span>
  );
}

export function FullSpectrumSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/cargo-bg.jpg"
        alt="Cargo operations background"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy-950/85" />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <AnimateIn direction="left">
            <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
              Full Service
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Delivering a full spectrum of cargo solutions
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              From Amazon FBA prep to international cargo shipping, we handle the
              complete logistics chain with precision and reliability.
            </p>
          </AnimateIn>

          {/* 98% Stat */}
          <AnimateIn direction="up" delay={0.3}>
            <div className="flex items-baseline gap-3 mb-8">
              <AnimatedCounter target={98} suffix="%" />
              <span className="text-white/80 text-lg">
                Client satisfaction rate
              </span>
            </div>
          </AnimateIn>

          <AnimateIn direction="up" delay={0.4}>
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-lg bg-orange text-white hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Our Services
            </Link>
          </AnimateIn>
        </div>
      </Container>
    </section>
  );
}
