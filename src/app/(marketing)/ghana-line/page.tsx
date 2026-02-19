import type { Metadata } from "next";
import Link from "next/link";
import { Ship, Plane, Car, Home, Clock, MapPin, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ghanaLineServices, ghanaRouteInfo } from "@/data/ghana-line";

const iconMap: Record<string, React.ElementType> = {
  "Sea Freight": Ship,
  "Air Freight": Plane,
  "Vehicle Shipping": Car,
  "Personal Effects": Home,
};

export const metadata: Metadata = {
  title: "Ghana Line — Germany to Ghana Shipping",
  description:
    "Cargo shipping from Germany to Ghana. Sea freight, air freight, vehicle shipping, and personal effects. Door-to-door service.",
};

export default function GhanaLinePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-navy-900">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/20 text-orange text-sm font-semibold mb-6">
              <Ship className="h-4 w-4" />
              Germany → Ghana
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Ghana Line Cargo Shipping
            </h1>
            <p className="text-xl text-navy-300 mb-8">
              Reliable cargo shipping from Germany to Ghana. Sea freight, air
              freight, vehicle shipping, and personal effects — all handled by
              our experienced logistics team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              Get a Shipping Quote <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Route Info */}
      <Section bg="white" padding="sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-6">
            {[
              { icon: MapPin, label: "Origin", value: ghanaRouteInfo.origin },
              { icon: MapPin, label: "Destination", value: ghanaRouteInfo.destination },
              { icon: Clock, label: "Sea Transit", value: ghanaRouteInfo.seaTransitTime },
              { icon: Clock, label: "Air Transit", value: ghanaRouteInfo.airTransitTime },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-surface-offwhite">
                <div className="flex items-center gap-2 text-sm text-text-secondary mb-1.5">
                  <item.icon className="h-4 w-4 text-orange" /> {item.label}
                </div>
                <p className="font-semibold text-text-dark text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section bg="offwhite">
        <Container>
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
              What We Ship
            </span>
            <h2 className="font-heading text-3xl font-bold text-text-dark">
              Shipping Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ghanaLineServices.map((service) => {
              const Icon = iconMap[service.title] || Ship;
              return (
                <div
                  key={service.title}
                  className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10">
                      <Icon className="h-6 w-6 text-orange" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-text-dark">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-orange shrink-0" />
                        <span className="text-text-secondary">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section bg="navy">
        <Container className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to ship to Ghana?
          </h2>
          <p className="text-navy-300 text-lg max-w-xl mx-auto mb-8">
            Get a competitive quote for your cargo. We handle customs,
            documentation, and delivery.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
          >
            Request a Quote
          </Link>
        </Container>
      </Section>
    </>
  );
}
