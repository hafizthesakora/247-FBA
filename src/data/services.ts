import type { Service } from "@/types/services";

export const services: Service[] = [
  {
    id: "fba-prep",
    title: "FBA Prep",
    shortDescription:
      "Complete Amazon FBA preparation services — labeling, poly-bagging, bundling, and compliance checks.",
    description:
      "Our comprehensive FBA Prep service handles every step of preparing your inventory for Amazon's fulfillment centers. From FNSKU labeling and poly-bagging to bundling and quality inspection, we ensure your products meet Amazon's strict requirements every time.",
    slug: "fba-prep",
    image: "/images/fba-prep.jpg",
    features: [
      "FNSKU labeling & barcoding",
      "Poly-bagging & shrink-wrapping",
      "Bundling & multi-pack creation",
      "Quality inspection & compliance checks",
      "Carton packing to Amazon specs",
      "Shipment plan creation & coordination",
    ],
    benefits: [
      "24-48 hour turnaround time",
      "99.8% accuracy rate",
      "Amazon-compliant every time",
      "Real-time inventory tracking",
    ],
  },
  {
    id: "direct-injection",
    title: "Direct Injection",
    shortDescription:
      "Ship directly to Amazon fulfillment centers with optimized routing and carrier selection.",
    description:
      "Skip the middleman. Our Direct Injection service sends your prepped inventory straight to Amazon's fulfillment centers using optimized carrier partnerships and smart routing for fastest delivery at lowest cost.",
    slug: "direct-injection",
    image: "/images/direct-injection.jpg",
    features: [
      "Optimized carrier selection",
      "Smart routing to nearest FC",
      "Partnered carrier program support",
      "SPD & LTL shipment handling",
      "Tracking & delivery confirmation",
      "Cost-optimized shipping rates",
    ],
    benefits: [
      "Reduced shipping costs",
      "Faster FC check-in times",
      "End-to-end tracking",
      "Automated shipment planning",
    ],
  },
  {
    id: "volume-prep",
    title: "Volume Prep",
    shortDescription:
      "High-volume preparation for large shipments with dedicated team and priority processing.",
    description:
      "For sellers moving serious volume. Our Volume Prep service provides dedicated prep teams, priority processing, and bulk pricing for large-scale Amazon FBA operations. Perfect for wholesale and private label sellers.",
    slug: "volume-prep",
    image: "/images/volume-prep.jpg",
    features: [
      "Dedicated prep team",
      "Priority processing queue",
      "Bulk pricing discounts",
      "Custom packaging solutions",
      "Wholesale receiving & sorting",
      "Private label preparation",
    ],
    benefits: [
      "Up to 30% cost savings on bulk",
      "Same-day processing available",
      "Dedicated account manager",
      "Scalable capacity",
    ],
  },
  {
    id: "returns",
    title: "Returns Management",
    shortDescription:
      "Handle Amazon returns efficiently — inspect, repackage, and restock or dispose.",
    description:
      "Don't let returns eat into your profits. We receive, inspect, and process your Amazon returns — restocking sellable items back to FBA, repackaging when needed, and disposing of unsellable inventory per your instructions.",
    slug: "returns",
    image: "/images/returns.jpg",
    features: [
      "Return receiving & logging",
      "Condition inspection & grading",
      "Repackaging & relabeling",
      "FBA restocking",
      "Disposal & recycling",
      "Detailed return reports",
    ],
    benefits: [
      "Recover up to 60% of return value",
      "Detailed condition reports",
      "Fast turnaround on restocking",
      "Reduced storage fees",
    ],
  },
  {
    id: "storage",
    title: "Storage Solutions",
    shortDescription:
      "Flexible short and long-term storage in our secure Nürtingen warehouse.",
    description:
      "Avoid Amazon's expensive long-term storage fees. Store your inventory in our secure, climate-appropriate Nürtingen warehouse with flexible terms and competitive rates. Ship to Amazon on demand.",
    slug: "storage",
    image: "/images/storage.jpg",
    features: [
      "Flexible storage terms",
      "Climate-appropriate facilities",
      "Real-time inventory management",
      "On-demand FBA replenishment",
      "Secure, insured warehouse",
      "Competitive monthly rates",
    ],
    benefits: [
      "Save vs. Amazon long-term storage fees",
      "No minimum storage period",
      "24/7 inventory visibility",
      "Strategic replenishment planning",
    ],
  },
  {
    id: "fulfillment",
    title: "Fulfillment",
    shortDescription:
      "Coming soon — direct-to-customer fulfillment for your own webshop orders.",
    description:
      "Expand beyond Amazon. Our upcoming Fulfillment service will handle direct-to-customer shipping for your Shopify, WooCommerce, or other webshop orders. Same reliability, new channels.",
    slug: "fulfillment",
    image: "/images/fulfillment.jpg",
    features: [
      "Multi-channel order processing",
      "Custom branded packaging",
      "Same-day dispatch",
      "Returns handling",
      "Real-time order tracking",
      "API integrations",
    ],
    benefits: [
      "Expand beyond Amazon",
      "Branded unboxing experience",
      "Scalable fulfillment",
      "Single dashboard for all channels",
    ],
    isComingSoon: true,
  },
];
