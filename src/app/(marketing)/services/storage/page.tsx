import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Storage Solutions",
  description:
    "Flexible short and long-term storage in our secure Nürtingen warehouse. Avoid Amazon's long-term storage fees.",
};

export default function StoragePage() {
  const service = services.find((s) => s.id === "storage")!;
  return <ServicePageTemplate service={service} />;
}
