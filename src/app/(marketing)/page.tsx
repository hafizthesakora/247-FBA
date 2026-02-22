import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/animate-in";

export const metadata: Metadata = {
  title: "24/7 FBA Prep & Fulfillment — Amazon FBA Prep Center Germany",
  description:
    "Professional Amazon FBA prep center in Nürtingen, Germany. FNSKU labeling, poly-bagging, direct injection, returns management, and cargo shipping to Ghana.",
};

const testimonials = [
  {
    name: "Marcus Weber",
    role: "FBA Seller",
    avatar: "/images/b5a7a45a-f178-4a85-966b-6b1bcb597b46.jpg",
    quote: "Exceptional service and turnaround time. My inventory is always ready for Amazon on time.",
    stars: 5,
  },
  {
    name: "Sarah Klein",
    role: "E-Commerce Director",
    avatar: "/images/a4ea3554-6abc-43a3-9489-44d49c5a0dc1.jpg",
    quote: "The best prep center I've worked with in Europe. Accurate, fast, and professional.",
    stars: 5,
  },
  {
    name: "Thomas Richter",
    role: "Amazon Seller",
    avatar: "/images/8acf8d29-a761-44c2-87c8-b815439f7308.jpg",
    quote: "24/7 FBA Prep has transformed how we handle our logistics. Highly recommended.",
    stars: 5,
  },
  {
    name: "Anna Müller",
    role: "Supply Chain Manager",
    avatar: "/images/ebce4589-75cd-4c79-9a9a-2d2b41288071.jpg",
    quote: "Zero errors in 6 months. Their quality control is simply outstanding.",
    stars: 5,
  },
  {
    name: "David Schulz",
    role: "Private Label Seller",
    avatar: "/images/cf956263-d3f9-40bb-be4e-9bc59137fe34.jpg",
    quote: "Fast, reliable, and always Amazon-compliant. I wouldn't trust anyone else.",
    stars: 5,
  },
  {
    name: "Lisa Bauer",
    role: "Brand Owner",
    avatar: "/images/062b30ab-a083-4a87-b24e-621469ea808c.jpg",
    quote: "Their Ghana shipping service opened new doors for our international operations.",
    stars: 5,
  },
];

const serviceCards = [
  {
    title: "FBA Prep & Fulfillment",
    description:
      "Complete Amazon-compliant prep — FNSKU labeling, poly-bagging, bundling, and quality checks. 24–48 hour turnaround.",
    href: "/services/fba-prep",
    image: "/images/44a23272-0408-4576-ae0d-34d0d907e6ca.jpg",
  },
  {
    title: "Cargo Handling & Direct Injection",
    description:
      "Ship directly to Amazon FCs with optimised routing and carrier selection for the fastest delivery timelines.",
    href: "/services/direct-injection",
    image: "/images/9eb6fb36-d2a8-4aa7-b20b-396aad41c7d7.jpg",
  },
  {
    title: "Returns & Inventory Control",
    description:
      "Efficient returns handling — inspection, repackaging, restocking, and disposal, keeping your metrics clean.",
    href: "/services/returns",
    image: "/images/f38a05d6-2953-4cab-8af0-77f81ed1e03b.jpg",
  },
];

const fullSpectrumFeatures = [
  "Amazon-compliant labeling & packaging",
  "24–48 hour prep turnaround",
  "Direct injection to Amazon FCs",
  "Returns processing & restocking",
  "Volume prep for large shipments",
  "Germany–Ghana cargo shipping",
];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "10,000+", label: "Orders Fulfilled" },
  { value: "99.8%", label: "Accuracy Rate" },
  { value: "24–48h", label: "Turnaround" },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Image
          src="/images/c088b8fe-789b-4e77-80cc-0c5130fe8715.jpg"
          alt="FBA warehouse operations"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/70" />
        <Container className="relative z-10 py-40">
          <div className="max-w-3xl">
            <AnimateIn direction="none" delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange/50 bg-orange/10 text-orange text-sm font-semibold mb-6 tracking-widest">
                TRUST · SPEED · EXCELLENCE
              </div>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.1}>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Your Amazon FBA Partner in Germany
              </h1>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.2}>
              <p className="text-xl text-white/75 mb-10 max-w-xl leading-relaxed">
                Professional FBA prep center in Nürtingen — FNSKU labeling, poly-bagging,
                direct injection, and cargo shipping to Ghana.
              </p>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  Get Started <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white/80 text-white font-semibold hover:bg-white hover:text-navy-900 transition-all duration-300"
                >
                  Our Services
                </Link>
              </div>
            </AnimateIn>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── Mission ─── */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/2f93a3f2-8081-481a-8993-a986fab73a0e.jpg"
                  alt="Our warehouse operations"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Our Commitment
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Built Around Your Business
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Founded in Nürtingen, just outside Stuttgart, we were built from the
                ground up to give Amazon sellers a prep center that works as hard as
                they do. We understand Amazon&apos;s ever-changing requirements and
                tight deadlines.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Our strategic location in Baden-Württemberg gives you fast,
                cost-effective access to major European Amazon fulfillment centers.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-2">
                {stats.map((stat, i) => (
                  <AnimateIn key={stat.label} direction="up" delay={0.3 + i * 0.1}>
                    <div className="font-heading text-3xl font-bold text-orange mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-text-secondary">{stat.label}</div>
                  </AnimateIn>
                ))}
              </div>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ─── Services Grid ─── */}
      <Section bg="offwhite">
        <Container>
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Our Services
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900">
                Everything Your Amazon Business Needs
              </h2>
            </div>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((service) => (
              <StaggerItem key={service.href}>
                <Link
                  href={service.href}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/10 transition-colors" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-navy-900 mb-2 group-hover:text-orange transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimateIn delay={0.4}>
            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-navy-900 text-navy-900 font-semibold hover:bg-navy-900 hover:text-white transition-all duration-300"
              >
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </Section>

      {/* ─── Full Spectrum ─── */}
      <Section bg="navy">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Full Spectrum
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Full Spectrum FBA Services
              </h2>
              <p className="text-navy-300 leading-relaxed mb-8">
                From the moment your inventory arrives at our warehouse to the day it
                reaches Amazon&apos;s fulfillment centers — we handle every step with
                precision and care.
              </p>
              <StaggerContainer className="space-y-3 mb-8">
                {fullSpectrumFeatures.map((feature) => (
                  <StaggerItem key={feature}>
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange/20 shrink-0">
                        <Check className="h-3.5 w-3.5 text-orange" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02]"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/94740b19-5b06-4589-99fd-631c67e11dc5.jpg"
                  alt="Full spectrum FBA services"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ─── Testimonials ─── */}
      <Section bg="white">
        <Container>
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Trusted By Sellers
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900">
                What Our Clients Say
              </h2>
            </div>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="bg-surface-offwhite rounded-xl p-6 hover:shadow-card transition-shadow duration-300 h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange text-orange" />
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm text-navy-900">{t.name}</div>
                      <div className="text-xs text-text-secondary">{t.role}</div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ─── CTA Banner ─── */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/420fdb99-8a9e-4919-b109-a8c6727e5f5b.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container className="relative z-10 text-center">
          <AnimateIn>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Scale Your Amazon Business?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-xl text-white/75 max-w-xl mx-auto mb-10">
              Get a free quote today and let us handle your FBA prep so you can focus
              on growing your brand.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
            >
              Get a Free Quote <ArrowRight className="h-5 w-5" />
            </Link>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
