import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Package, Tag, Shield, Zap, Box, ClipboardCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/animate-in";

export const metadata: Metadata = {
  title: "Amazon FBA Prep & Fulfillment — 24/7 FBA Prep",
  description:
    "Complete Amazon FBA preparation services — FNSKU labeling, poly-bagging, bundling, quality inspection, and carton packing. 24–48 hour turnaround.",
};

const whatYouGet = [
  { icon: Tag, title: "FNSKU Labeling", desc: "Accurate, Amazon-compliant FNSKU labels printed and applied to every unit." },
  { icon: Package, title: "Poly-bagging", desc: "Protective poly bags applied to clothing, accessories, and fragile items." },
  { icon: Shield, title: "Bubble Wrap", desc: "Extra protection for glass, ceramics, and high-value fragile products." },
  { icon: Box, title: "Bundling", desc: "Multi-pack bundles assembled and labelled as a single ASIN for Amazon." },
  { icon: ClipboardCheck, title: "Quality Inspection", desc: "Every unit checked for damage, defects, and Amazon compliance before shipping." },
  { icon: Zap, title: "24–48h Turnaround", desc: "Fast processing so your inventory gets to Amazon FCs without delay." },
];

const whyChooseUs = [
  "Amazon Seller Central compliant in every step",
  "Experienced team with 5+ years of FBA prep",
  "99.8% accuracy rate — no costly returns",
  "Flexible volume — from 50 to 50,000 units",
  "Real-time updates via the client portal",
  "Strategic Nürtingen location near key FCs",
];

export default function FbaPrepPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <Image
          src="/images/814605d8-3fa1-45f8-8645-d185304b2353.jpg"
          alt="FBA Prep service"
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
              Amazon FBA Prep & Fulfillment
            </h1>
            <p className="text-xl text-white/75 max-w-2xl leading-relaxed mb-8">
              Everything Amazon needs — done right, done fast. We handle every prep step
              so your inventory hits FCs without delays or rejections.
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

      {/* ─── About This Service ─── */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/f51fda17-5338-44bd-a9ed-cda3a49a5866.jpg"
                  alt="FBA Prep service"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                About This Service
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Prep That Keeps Amazon Happy
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Amazon has strict requirements for how products are labelled,
                  packaged, and shipped to its fulfillment centers. A single mistake
                  can mean rejected shipments, costly returns, or suspended listings.
                </p>
                <p>
                  Our team knows every Amazon guideline inside and out. We handle
                  FNSKU labeling, poly-bagging, bubble wrap, bundling, and carton
                  packing with 99.8% accuracy — so your products get received without
                  issues, every time.
                </p>
                <p>
                  With a 24–48 hour turnaround on most orders, your inventory keeps
                  moving and your Amazon metrics stay strong.
                </p>
              </div>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ─── What You Get ─── */}
      <Section bg="offwhite">
        <Container>
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Included Services
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900">
                What You Get
              </h2>
            </div>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatYouGet.map((item) => (
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

      {/* ─── Why Choose Us ─── */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Why Choose Us
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                The Prep Center That Delivers
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                We&apos;ve built our operation around one goal: getting your inventory
                into Amazon&apos;s fulfillment centers without delays, errors, or rejections.
              </p>
              <StaggerContainer className="space-y-3">
                {whyChooseUs.map((point) => (
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
                  src="/images/e257e024-f629-4d59-ba3a-c3d580a7c918.jpg"
                  alt="Why choose 24/7 FBA Prep"
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
          src="/images/dc065da2-7e7e-42f6-add1-7ec8d7aef7d8.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container className="relative z-10 text-center">
          <AnimateIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to streamline your FBA prep?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
              Send us your product details and we&apos;ll get back to you with a custom
              quote within 24 hours.
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
