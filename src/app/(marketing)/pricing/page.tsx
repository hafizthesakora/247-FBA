import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { pricingTiers, addOns, storageNote } from "@/data/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent FBA prep pricing. Choose from Starter, Growth, or Pro plans with volume discounts available.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-navy-900">
        <Container>
          <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
            Plans & Pricing
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-navy-300 max-w-2xl">
            No hidden fees. Choose the plan that fits your business, or get a
            custom quote for high-volume needs.
          </p>
        </Container>
      </section>

      {/* Pricing Tiers */}
      <Section bg="offwhite">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  "rounded-2xl p-8 flex flex-col relative transition-all duration-300 hover:-translate-y-1",
                  tier.highlighted
                    ? "bg-navy-900 text-white ring-4 ring-orange shadow-xl md:scale-105 z-10"
                    : "bg-white shadow-card hover:shadow-card-hover"
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-orange text-white text-xs font-bold uppercase tracking-wider">
                      <Star className="h-3 w-3 fill-white" /> Most Popular
                    </span>
                  </div>
                )}

                <h3
                  className={cn(
                    "font-heading text-xl font-bold mb-2",
                    tier.highlighted ? "text-white" : "text-text-dark"
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={cn(
                    "text-sm mb-6",
                    tier.highlighted ? "text-navy-300" : "text-text-secondary"
                  )}
                >
                  {tier.description}
                </p>

                <div className="mb-6">
                  <span
                    className={cn(
                      "font-heading text-4xl font-bold",
                      tier.highlighted ? "text-orange" : "text-text-dark"
                    )}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={cn(
                      "text-sm ml-1",
                      tier.highlighted ? "text-navy-300" : "text-text-secondary"
                    )}
                  >
                    {tier.priceUnit}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        className={cn(
                          "h-5 w-5 shrink-0 mt-0.5",
                          tier.highlighted ? "text-orange" : "text-green-500"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm",
                          tier.highlighted ? "text-navy-200" : "text-text-secondary"
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={cn(
                    "block w-full text-center py-3.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-md",
                    tier.highlighted
                      ? "bg-orange text-white hover:bg-orange-600"
                      : "bg-navy-900 text-white hover:bg-navy-800"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Add-Ons */}
      <Section bg="white">
        <Container size="narrow">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3 text-center">
            Add-On Services
          </h2>
          <p className="text-text-secondary text-center mb-8">
            Customize your plan with these optional services.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between p-4 rounded-xl bg-surface-offwhite hover:bg-navy-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-text-dark">{addon.name}</p>
                  <p className="text-sm text-text-secondary">
                    {addon.description}
                  </p>
                </div>
                <span className="font-heading font-bold text-orange ml-4 shrink-0 text-lg">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-xl bg-navy-50 border border-navy-100">
            <h3 className="font-heading font-bold text-text-dark mb-2">
              Storage Policy
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {storageNote}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
