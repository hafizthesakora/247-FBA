import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Truck, MapPin, Clock, BarChart3, Route, Package } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/animate-in";

export const metadata: Metadata = {
  title: "Cargo Handling & Direct Injection — 24/7 FBA Prep",
  description:
    "Ship directly to Amazon fulfillment centers with optimised routing and carrier selection. Fastest delivery timelines, lowest costs.",
};

const whatYouGet = [
  { icon: Route, title: "Optimised Routing", desc: "We analyse Amazon FC assignments and select the most efficient route for your shipment." },
  { icon: Truck, title: "Carrier Selection", desc: "Access to multiple carriers — we pick the best balance of speed and cost." },
  { icon: MapPin, title: "Direct FC Injection", desc: "Shipments delivered directly to Amazon fulfillment centers across Germany and Europe." },
  { icon: Package, title: "Bulk Shipments", desc: "Handle large-volume shipments efficiently with pallet and LTL/FTL options." },
  { icon: Clock, title: "Fast Processing", desc: "Prepped and dispatched within 24–48 hours of receiving your inventory." },
  { icon: BarChart3, title: "Shipment Tracking", desc: "Real-time tracking updates via the client portal from pickup to FC check-in." },
];

const schedule = [
  { center: "FRA1 / FRA3 — Frankfurt", transit: "Same day", frequency: "Daily" },
  { center: "LEJ1 / LEJ4 — Leipzig", transit: "Next day", frequency: "Mon–Sat" },
  { center: "MUC3 — Munich", transit: "Next day", frequency: "Mon–Fri" },
  { center: "HAM2 — Hamburg", transit: "Next day", frequency: "Mon–Fri" },
  { center: "DUS2 — Düsseldorf", transit: "Next day", frequency: "Mon–Sat" },
];

const whyChooseUs = [
  "Faster inbound check-in at Amazon FCs",
  "Reduced stranded inventory & delays",
  "Lower per-unit shipping cost at volume",
  "No minimum shipment size",
  "Combined prep + injection in one workflow",
  "Full documentation and compliance",
];

export default function DirectInjectionPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <Image
          src="/images/fbd89e47-f2fe-43db-baaf-b4b2e60b6d2b.jpg"
          alt="Direct injection service"
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
              Cargo Handling & Direct Injection
            </h1>
            <p className="text-xl text-white/75 max-w-2xl leading-relaxed mb-8">
              Skip the delays. We ship your prepped inventory directly to Amazon
              fulfillment centers with optimised routing and carrier selection.
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
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                About This Service
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Get to Amazon FCs Faster
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Direct injection means your prepped products go straight from our
                  warehouse to Amazon&apos;s fulfillment centers — no intermediate
                  stops, no wasted time, no added costs.
                </p>
                <p>
                  We have established carrier relationships and daily dispatch runs to
                  major German and European Amazon FCs. Combined with our FBA prep
                  service, this is the fastest way to get your inventory live on Amazon.
                </p>
                <p>
                  Whether you have a single pallet or a full truckload, we handle the
                  logistics so you don&apos;t have to.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/2d0f29ed-5202-48ad-853f-8a0b305e2c72.jpg"
                  alt="Direct injection service"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
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

      {/* ─── Daily Injection Schedule ─── */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateIn direction="left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/images/1e7b57a7-3062-425c-9a17-0d9cafe0795c.jpg"
                  alt="Daily injection schedule"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
                Daily Schedule
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Daily Injection to Amazon FCs
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                We run daily dispatch routes to the most important Amazon fulfillment
                centers in Germany. Your inventory stays moving.
              </p>
              <div className="overflow-hidden rounded-xl border border-gray-100 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy-900 text-white">
                      <th className="text-left px-4 py-3 font-semibold">Fulfillment Center</th>
                      <th className="text-left px-4 py-3 font-semibold">Transit</th>
                      <th className="text-left px-4 py-3 font-semibold">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row, i) => (
                      <tr key={row.center} className={i % 2 === 0 ? "bg-white" : "bg-surface-offwhite"}>
                        <td className="px-4 py-3 text-navy-900 font-medium">{row.center}</td>
                        <td className="px-4 py-3 text-text-secondary">{row.transit}</td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-0.5 rounded bg-orange/10 text-orange text-xs font-semibold">
                            {row.frequency}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <StaggerContainer className="space-y-2">
                {whyChooseUs.map((point) => (
                  <StaggerItem key={point}>
                    <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange/10 shrink-0">
                        <Check className="h-3 w-3 text-orange" />
                      </div>
                      {point}
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
          src="/images/9a556702-4b18-46b3-8ae2-c30a3311a010.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/80" />
        <Container className="relative z-10 text-center">
          <AnimateIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to inject directly to Amazon?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
              Tell us your volume and destination FCs — we&apos;ll put together a
              competitive shipping quote.
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
