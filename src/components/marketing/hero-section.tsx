"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { STATS } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with next/image */}
      <Image
        src="/images/hero-bg.png"
        alt="Shipping containers at port"
        fill
        className="object-cover object-center"
        priority
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/50 to-navy-950/20" />

      <Container className="relative z-10 pt-24 pb-12">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6"
          >
            Your Inventory.{" "}
            <span className="text-orange">Amazon ready.</span>{" "}
            Delivered fast.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl leading-relaxed"
          >
            Professional FBA Prep &amp; Fulfillment from Nürtingen, Germany.
            Fast turnaround, zero hassle.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg bg-orange text-white hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Get a Free Quote
            </Link>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-16 md:mt-24 flex flex-wrap items-center gap-8 md:gap-16 pb-8"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
            >
              <div className="text-2xl md:text-3xl font-heading font-bold">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </motion.div>
          ))}

          {/* Amazon Partner Badge */}
          <motion.div
            className="ml-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5">
              <span className="text-xs uppercase tracking-wider text-white/70">
                Amazon FBA Partner
              </span>
              <svg
                className="h-7 w-auto text-white"
                viewBox="0 0 100 30"
                fill="currentColor"
              >
                <text x="0" y="22" fontSize="18" fontWeight="bold" fontFamily="Arial">
                  amazon
                </text>
                <path
                  d="M60 24 Q70 28 80 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
