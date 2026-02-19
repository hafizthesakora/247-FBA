import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Fulfillment",
  description:
    "Coming soon — direct-to-customer fulfillment for your own webshop orders. Shopify, WooCommerce, and more.",
};

export default function FulfillmentPage() {
  const service = services.find((s) => s.id === "fulfillment")!;
  return <ServicePageTemplate service={service} />;
}
