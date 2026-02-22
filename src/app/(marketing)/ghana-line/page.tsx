import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Ship, Plane, Car, Home, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/animate-in";

export const metadata: Metadata = {
  title: "Germany to Ghana Cargo Shipping — 24/7 FBA Prep",
  description:
    "Reliable cargo shipping from Germany to Ghana. Sea freight, air freight, vehicle shipping, and personal effects. Door-to-door service with full documentation.",
};

const shippingOptions = [
  {
    icon: Ship,
    title: "Sea Freight",
    transit: "20–30 days",
    desc: "Cost-effective shipping for large volumes. Full container (FCL) or shared container (LCL) options available.",
    features: ["FCL & LCL options", "Port-to-port or door-to-door", "Best for large shipments", "Temà & Takoradi port"],
  },
  {
    icon: Plane,
    title: "Air Freight",
    transit: "3–7 days",
    desc: "Fast and reliable for time-sensitive cargo. Direct flights from Frankfurt to Accra with minimal handling.",
    features: ["Express & standard options", "Kotoka International Airport", "Ideal for high-value goods", "Full tracking"],
  },
  {
    icon: Car,
    title: "Vehicle Shipping",
    transit: "25–35 days",
    desc: "Safe and insured transport of cars, motorcycles, and commercial vehicles from Germany to Ghana.",
    features: ["Container or RoRo shipping", "Full insurance coverage", "All vehicle types", "Import documentation"],
  },
  {
    icon: Home,
    title: "Personal Effects",
    transit: "20–35 days",
    desc: "Moving back home? We consolidate and ship your personal belongings safely from Germany to Ghana.",
    features: ["Household goods", "Electronics & appliances", "Flexible pickup", "Customs support"],
  },
];

const whatsIncluded = [
  "Pickup from your address in Germany",
  "Warehouse consolidation in Nürtingen",
  "Export customs documentation",
  "Port handling and loading",
  "Sea/air freight to Ghana",
  "Import customs clearance support",
  "Final delivery to destination",
  "Real-time shipment tracking",
];

const routeStats = [
  { icon: MapPin, label: "Origin", value: "Germany (Nürtingen)" },
  { icon: MapPin, label: "Destination", value: "Ghana (Accra / Tema)" },
  { icon: Clock, label: "Sea Transit", value: "20–30 days" },
  { icon: Clock, label: "Air Transit", value: "3–7 days" },
];

export default function GhanaLinePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <Image
          src="/images/64986da5-4f74-4efa-b8ff-70967542456d.jpg"
          alt="Ghana Line cargo shipping"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/75" />
        <Container className="relative z-10">
          <AnimateIn direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/20 text-orange text-sm font-semibold mb-5">
              <Ship className="h-4 w-4" />
              Germany → Ghana
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5 max-w-2xl">
              Ghana Line Cargo Shipping
            </h1>
            <p className="text-xl text-white/75 max-w-2xl leading-relaxed mb-8">
              Reliable, affordable cargo shipping from Germany to Ghana. Sea freight,
              air freight, vehicle shipping, and personal effects — fully handled by our
              experienced logistics team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Get a Shipping Quote <ArrowRight className="h-5 w-5" />
            </Link>
          </AnimateIn>
        </Container>
      </section>

      {/* ─── Route Info ─── */}
      <section className="py-8 bg-white border-b border-gray-100">
        <Container>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {routeStats.map((item) => (
              <StaggerItem key={item.label}>
                <div className="p-4 rounded-xl bg-surface-offwhite">
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-1.5">
                    <item.icon className="h-4 w-4 text-orange" />
                    {item.label}
                  </div>
                  <p className="font-semibold text-navy-900 text-sm">{item.value}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ─── About This Service ─── */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                About This Service
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Germany to Ghana, Done Right
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  The Ghana Line is our dedicated cargo shipping service connecting
                  Germany to Ghana. Whether you&apos;re a business shipping commercial
                  goods or an individual sending personal effects home, we have the
                  right solution.
                </p>
                <p>
                  We handle everything from pickup in Germany to delivery in Ghana —
                  export documentation, customs clearance, port handling, and last-mile
                  delivery. You focus on your business; we handle the logistics.
                </p>
                <p>
                  With years of experience on the Germany–Ghana corridor, our team
                  knows the regulations, the ports, and the fastest routes.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/5c3a837e-dc25-4ae6-903f-ceb66f8e1cf2.jpg"
                  alt="Germany to Ghana shipping"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ─── What We Ship ─── */}
      <Section bg="offwhite">
        <Container>
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Shipping Options
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900">
                What We Ship
              </h2>
            </div>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shippingOptions.map((option) => (
              <StaggerItem key={option.title}>
                <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 shrink-0">
                      <option.icon className="h-6 w-6 text-orange" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-navy-900 mb-0.5">{option.title}</h3>
                      <span className="inline-block text-xs font-semibold text-orange bg-orange/10 px-2 py-0.5 rounded">
                        {option.transit}
                      </span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">{option.desc}</p>
                  <ul className="space-y-1.5">
                    {option.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check className="h-3.5 w-3.5 text-orange shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ─── What's Included ─── */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/cc83751d-7455-47ad-b6f5-1b1db88b218b.jpg"
                  alt="What's included in Ghana shipping"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Full Service
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Everything Is Included
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                We manage every step of the journey so you don&apos;t have to
                coordinate between multiple agents, carriers, and customs brokers.
              </p>
              <StaggerContainer className="space-y-3">
                {whatsIncluded.map((item) => (
                  <StaggerItem key={item}>
                    <div className="flex items-center gap-3 text-text-secondary">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange/10 shrink-0">
                        <Check className="h-3.5 w-3.5 text-orange" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimateIn>
          </div>
        </Container>
      </Section>

      {/* ─── CTA Banner ─── */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/036d3e14-f843-4394-9794-bfb58880fffe.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container className="relative z-10 text-center">
          <AnimateIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to ship to Ghana?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
              Get a competitive shipping quote today. We handle customs, documentation,
              and delivery — door to door.
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
