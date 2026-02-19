import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/marketing/service-page-template";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "FBA Prep",
  description:
    "Complete Amazon FBA preparation services — FNSKU labeling, poly-bagging, bundling, quality inspection, and carton packing.",
};

export default function FbaPrepPage() {
  const service = services.find((s) => s.id === "fba-prep")!;
  return <ServicePageTemplate service={service} />;
}
