import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Users, Package, Truck, MapPin, Shield, Zap, Target } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/animate-in";

export const metadata: Metadata = {
  title: "About Us — 24/7 FBA Prep & Fulfillment",
  description:
    "Learn about 24/7 FBA Prep & Fulfillment — a Nürtingen-based Amazon FBA Prep Center serving sellers across Europe with fast, reliable, Amazon-compliant services.",
};

const stats = [
  { icon: Users, value: "5+", label: "Years Experience" },
  { icon: Package, value: "10,000+", label: "Orders Fulfilled" },
  { icon: Truck, value: "50+", label: "Daily Shipments" },
  { icon: MapPin, value: "1", label: "Strategic Hub" },
];

const values = [
  { icon: Shield, title: "Reliability", desc: "Consistent, dependable service you can count on — every shipment, every time." },
  { icon: Zap, title: "Speed", desc: "24–48 hour turnaround keeps your inventory flowing and your business growing." },
  { icon: Target, title: "Precision", desc: "99.8% accuracy rate. We get it right the first time, so Amazon doesn't send it back." },
];

const operationsHighlights = [
  "Dedicated receiving and inspection zones",
  "Barcode scanning at every stage",
  "Climate-controlled storage areas",
  "Multiple prep stations for high throughput",
  "Direct carrier access for daily dispatch",
  "Secure CCTV-monitored warehouse",
];

const facilityFeatures = [
  "Located in Nürtingen, Baden-Württemberg",
  "30 min from Stuttgart Amazon FCs",
  "Modern warehouse with 1,000+ m² floor space",
  "Flexible expansion capacity",
  "Electric vehicle charging on-site",
  "Easy motorway access — A8 & B27",
];

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <Image
          src="/images/50e3f300-5b33-40cf-b0eb-70386a87efc9.jpg"
          alt="About 24/7 FBA Prep"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/75" />
        <Container className="relative z-10">
          <AnimateIn direction="up">
            <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-4">
              Our Story
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5 max-w-2xl">
              About Us
            </h1>
            <p className="text-xl text-white/75 max-w-2xl leading-relaxed">
              Your trusted Amazon FBA prep partner in the heart of Baden-Württemberg —
              built for sellers who demand precision, speed, and reliability.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ─── Our Story ─── */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Our Story
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Built for Amazon Sellers
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Founded in Nürtingen, just outside Stuttgart, 24/7 FBA Prep &amp;
                  Fulfillment was born from a simple idea: Amazon sellers deserve a
                  prep center that works as hard as they do.
                </p>
                <p>
                  With years of experience in e-commerce logistics, our team understands
                  the challenges sellers face — from Amazon&apos;s ever-changing
                  requirements to tight turnaround deadlines. We built our operation to
                  solve these problems head-on.
                </p>
                <p>
                  Our strategic location in Baden-Württemberg provides excellent access
                  to major German and European Amazon fulfillment centers, ensuring your
                  inventory reaches Amazon quickly and cost-effectively.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/d5fa7bce-6e8a-4a13-9c7e-17d0a476016d.jpg"
                  alt="Our team and story"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ─── Stats ─── */}
      <Section bg="navy">
        <Container>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 mx-auto mb-4 group-hover:bg-orange/20 transition-colors">
                    <stat.icon className="h-7 w-7 text-orange" />
                  </div>
                  <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-navy-300">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ─── Operations ─── */}
      <Section bg="offwhite">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/58ec41d8-c695-4815-a126-b89c70dee930.jpg"
                  alt="Our operations"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Our Operations
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                A Warehouse Built for Speed
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                Every square metre of our warehouse is optimised for throughput. From
                the receiving dock to the final packing station, we&apos;ve designed
                our operation to move your inventory as fast as possible without
                compromising quality.
              </p>
              <StaggerContainer className="space-y-3">
                {operationsHighlights.map((point) => (
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
          </div>
        </Container>
      </Section>

      {/* ─── Values ─── */}
      <Section bg="white">
        <Container>
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                What Drives Us
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                Our core values guide every package we prep and every shipment we deliver.
              </p>
            </div>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="text-center bg-surface-offwhite rounded-xl p-8 hover:shadow-card transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange/10 mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-orange" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy-900 mb-3">{value.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{value.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ─── Facility ─── */}
      <Section bg="offwhite">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Our Facility
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Strategically Located in Nürtingen
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                Our warehouse in Nürtingen is positioned perfectly for serving Amazon
                sellers across Germany and Europe. Close to Stuttgart and major
                motorways, we deliver to Amazon FCs faster than most prep centers.
              </p>
              <StaggerContainer className="space-y-3">
                {facilityFeatures.map((point) => (
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
                  src="/images/65c95bcb-73b3-44a4-b55d-d20eee7f4d6e.jpg"
                  alt="Our facility in Nürtingen"
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
          src="/images/22eedd05-50ed-4a6a-bbb7-f5c25aeb7ae6.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container className="relative z-10 text-center">
          <AnimateIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to work with us?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
              Get in touch today and discover why Amazon sellers across Europe trust
              24/7 FBA Prep &amp; Fulfillment.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              Get in Touch <ArrowRight className="h-5 w-5" />
            </Link>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
