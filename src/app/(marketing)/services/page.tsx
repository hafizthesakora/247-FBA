import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimateIn } from "@/components/shared/animate-in";

export const metadata: Metadata = {
  title: "Our Services — 24/7 FBA Prep & Fulfillment",
  description:
    "Comprehensive Amazon FBA prep and fulfillment services including labeling, poly-bagging, direct injection, volume prep, returns, and cargo shipping to Ghana.",
};

const services = [
  {
    title: "Amazon FBA Prep & Fulfillment",
    description:
      "End-to-end prep for Amazon FBA — FNSKU labeling, poly-bagging, bubble wrap, bundling, and quality inspection. 24–48 hour turnaround guaranteed.",
    href: "/services/fba-prep",
    image: "/images/4630491b-033f-4fff-8d8b-62a5f5065d0b.jpg",
    features: ["FNSKU Labeling", "Poly-bagging & Bubble Wrap", "Bundling", "Quality Inspection", "Carton Packing"],
  },
  {
    title: "Smart Returns & Inventory Control",
    description:
      "Efficient Amazon returns handling — inspect, repackage, restock, or dispose. Keep your metrics clean and your inventory accurate.",
    href: "/services/returns",
    image: "/images/f767f900-1cb5-4919-8b25-2e0614541da4.jpg",
    features: ["Returns Inspection", "Repackaging", "Restocking", "Disposal & Liquidation", "Inventory Reports"],
  },
  {
    title: "Cargo Handling & Direct Injection",
    description:
      "Ship directly to Amazon fulfillment centers with optimised routing. We select the best carrier for fastest delivery at the lowest cost.",
    href: "/services/direct-injection",
    image: "/images/5beaf175-5645-40ba-a906-af56fe914c3b.jpg",
    features: ["Direct FC Injection", "Carrier Optimisation", "Routing Strategy", "Bulk Shipments", "Tracking Updates"],
  },
  {
    title: "Germany to Ghana Cargo Shipping",
    description:
      "Reliable sea freight, air freight, vehicle shipping, and personal effects from Germany to Ghana. Door-to-door service with full documentation.",
    href: "/ghana-line",
    image: "/images/e9b937a6-4794-4883-a044-d8e24eea0c61.jpg",
    features: ["Sea Freight", "Air Freight", "Vehicle Shipping", "Personal Effects", "Customs Documentation"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <Image
          src="/images/7d5e9d47-8209-4350-9a14-e8efc213529f.jpg"
          alt="Our services"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/75" />
        <Container className="relative z-10">
          <AnimateIn direction="up">
            <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-4">
              What We Do
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5 max-w-2xl">
              Our Services
            </h1>
            <p className="text-xl text-white/75 max-w-2xl leading-relaxed">
              End-to-end Amazon FBA preparation and fulfillment services designed to
              scale with your business — from a single SKU to thousands of units.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ─── Service Cards ─── */}
      <Section bg="offwhite">
        <Container>
          <div className="space-y-8">
            {services.map((service, index) => (
              <AnimateIn key={service.href} direction={index % 2 === 0 ? "left" : "right"} delay={0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 !== 0 ? "lg:grid-flow-col-dense" : ""}`}>
                    <div className={`relative aspect-[16/9] lg:aspect-auto overflow-hidden ${index % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-navy-900/5 transition-colors" />
                    </div>
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-900 mb-4 group-hover:text-orange transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-text-secondary leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-8">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2.5 text-sm text-text-secondary">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange/10 shrink-0">
                              <Check className="h-3 w-3 text-orange" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] self-start"
                      >
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── CTA ─── */}
      <Section bg="navy">
        <Container className="text-center">
          <AnimateIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Not sure which service you need?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-navy-300 text-lg max-w-xl mx-auto mb-8">
              Tell us about your products and we&apos;ll recommend the right prep
              solution for your business.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get a Free Consultation <ArrowRight className="h-5 w-5" />
            </Link>
          </AnimateIn>
        </Container>
      </Section>
    </>
  );
}
