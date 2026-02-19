import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Returns Management",
  description:
    "Efficient Amazon returns handling — inspection, repackaging, restocking, and disposal services.",
};

export default function ReturnsPage() {
  const service = services.find((s) => s.id === "returns")!;
  return <ServicePageTemplate service={service} />;
}
