import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, RotateCcw, Search, PackageCheck, Trash2, RefreshCw, BarChart3 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/animate-in";

export const metadata: Metadata = {
  title: "Smart Returns & Inventory Control — 24/7 FBA Prep",
  description:
    "Efficient Amazon returns handling — inspection, repackaging, restocking, and disposal services. Keep your inventory accurate and your metrics clean.",
};

const benefits = [
  { icon: Search, title: "Returns Inspection", desc: "Every returned unit is inspected for damage, functionality, and resale condition." },
  { icon: PackageCheck, title: "Repackaging", desc: "Products that pass inspection are repackaged to Amazon-compliant standards." },
  { icon: RefreshCw, title: "Restocking", desc: "Resalable units are relabelled, reprepped, and added back to your inventory." },
  { icon: Trash2, title: "Disposal & Liquidation", desc: "Unsalvageable units are responsibly disposed of or liquidated on your behalf." },
  { icon: BarChart3, title: "Inventory Reports", desc: "Detailed reports for every return batch — condition, decision, and quantities." },
  { icon: RotateCcw, title: "Ongoing Cycle", desc: "Set up a continuous returns flow — we handle every batch as it arrives." },
];

const whyItMatters = [
  "Stop losing money on unprocessed returns",
  "Recover sellable inventory instead of writing it off",
  "Keep your Amazon IPI score healthy",
  "Avoid long-term storage fees from dead stock",
  "Full transparency with detailed reporting",
  "Integrated with your FBA prep workflow",
];

const stats = [
  { value: "72h", label: "Max Processing" },
  { value: "95%+", label: "Recovery Rate" },
  { value: "100%", label: "Reported" },
];

export default function ReturnsPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <Image
          src="/images/394f826d-58b2-4e72-820c-810001f4f57a.jpg"
          alt="Returns management service"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/75" />
        <Container className="relative z-10">
          <AnimateIn direction="up">
            <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-4">
              Our Services
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5 max-w-2xl">
              Smart Returns & Inventory Control
            </h1>
            <p className="text-xl text-white/75 max-w-2xl leading-relaxed mb-8">
              Turn returned products into recovered revenue. We inspect, repackage, and
              restock your Amazon returns so nothing goes to waste.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Get a Quote <ArrowRight className="h-5 w-5" />
            </Link>
          </AnimateIn>
        </Container>
      </section>

      {/* ─── Clear Control ─── */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/4db0d2d0-5f48-417f-80b5-a1a8a8d13be0.jpg"
                  alt="Returns control"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Clear Control
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Full Control Over Every Return
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Amazon returns are inevitable — but lost revenue from mishandled
                  returns isn&apos;t. Our returns management service gives you complete
                  visibility and control over what happens to every unit that comes back.
                </p>
                <p>
                  We receive your returns directly from Amazon, carry out a thorough
                  inspection, and triage each unit: restock, repackage, or dispose. You
                  get a full report for every batch.
                </p>
                <p>
                  The result: more recovered inventory, fewer write-offs, and cleaner
                  Amazon metrics.
                </p>
              </div>
              <StaggerContainer className="mt-8 grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <StaggerItem key={stat.label}>
                    <div className="text-center p-4 rounded-xl bg-surface-offwhite">
                      <div className="font-heading text-2xl font-bold text-orange mb-1">{stat.value}</div>
                      <div className="text-xs text-text-secondary">{stat.label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ─── Benefits ─── */}
      <Section bg="offwhite">
        <Container>
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                What We Do
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900">
                Returns Handled End-to-End
              </h2>
            </div>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item) => (
              <StaggerItem key={item.title}>
                <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 mb-4">
                    <item.icon className="h-6 w-6 text-orange" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ─── Why It Matters ─── */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Why It Matters
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Stop Losing Money on Returns
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                Most sellers underestimate how much revenue they can recover from
                returns. With the right process, a significant portion of returned
                units can be restocked and sold again.
              </p>
              <StaggerContainer className="space-y-3">
                {whyItMatters.map((point) => (
                  <StaggerItem key={point}>
                    <div className="flex items-center gap-3 text-text-secondary">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange/10 shrink-0">
                        <Check className="h-3.5 w-3.5 text-orange" />
                      </div>
                      <span className="text-sm">{point}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/970aa8c1-9b66-4da7-9cac-3fdd1cee82f6.jpg"
                  alt="Returns benefits"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ─── CTA Banner ─── */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/8746d646-30d2-4a40-87a1-1e972674511f.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container className="relative z-10 text-center">
          <AnimateIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to take control of your returns?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
              Get a custom quote for returns management and start recovering inventory
              you&apos;d otherwise write off.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              Request a Quote <ArrowRight className="h-5 w-5" />
            </Link>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
