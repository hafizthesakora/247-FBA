import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Direct Injection",
  description:
    "Ship directly to Amazon fulfillment centers with optimized routing and carrier selection for fastest delivery.",
};

export default function DirectInjectionPage() {
  const service = services.find((s) => s.id === "direct-injection")!;
  return <ServicePageTemplate service={service} />;
}
