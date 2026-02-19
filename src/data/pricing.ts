import type { PricingTier, AddOn } from "@/types/services";

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for new Amazon sellers getting started with FBA.",
    price: "€1.50",
    priceUnit: "per unit",
    features: [
      "FNSKU labeling",
      "Poly-bagging",
      "Quality inspection",
      "Carton packing",
      "Shipment plan creation",
      "Email support",
      "3-day turnaround",
    ],
    cta: "Get Started",
  },
  {
    id: "growth",
    name: "Growth",
    description: "For growing sellers who need faster turnaround and more services.",
    price: "€1.20",
    priceUnit: "per unit",
    features: [
      "Everything in Starter",
      "Bundling & multi-packs",
      "Shrink-wrapping",
      "Priority processing",
      "24-48hr turnaround",
      "Dedicated support",
      "Monthly reporting",
    ],
    highlighted: true,
    cta: "Choose Growth",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For high-volume sellers who need maximum speed and custom solutions.",
    price: "Custom",
    priceUnit: "volume pricing",
    features: [
      "Everything in Growth",
      "Dedicated prep team",
      "Same-day processing",
      "Custom packaging",
      "API access (coming soon)",
      "Account manager",
      "Volume discounts",
    ],
    cta: "Contact Sales",
  },
];

export const addOns: AddOn[] = [
  {
    name: "Bubble Wrap",
    price: "€0.30",
    description: "Per unit, for fragile items",
  },
  {
    name: "Suffocation Warning Labels",
    price: "€0.10",
    description: "Per unit, required for poly-bagged items",
  },
  {
    name: "Bundling / Multi-Pack",
    price: "€0.50",
    description: "Per bundle created",
  },
  {
    name: "Removal / Disposal",
    price: "€0.40",
    description: "Per unit removed or disposed",
  },
  {
    name: "Photography",
    price: "€5.00",
    description: "Per product, for condition documentation",
  },
  {
    name: "Storage",
    price: "€15.00",
    description: "Per pallet per month",
  },
];

export const storageNote =
  "Free storage for the first 30 days on all prepped inventory. After 30 days, standard storage rates apply. Long-term storage (90+ days) available at discounted rates — contact us for a custom quote.";
