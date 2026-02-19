import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Volume Prep",
  description:
    "High-volume Amazon FBA preparation with dedicated teams, priority processing, and bulk pricing discounts.",
};

export default function VolumePrepPage() {
  const service = services.find((s) => s.id === "volume-prep")!;
  return <ServicePageTemplate service={service} />;
}
