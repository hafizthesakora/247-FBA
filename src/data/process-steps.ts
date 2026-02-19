import type { ProcessStep } from "@/types/services";

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Receive",
    description:
      "Ship your inventory to our Nürtingen warehouse. We accept shipments from anywhere in the world and provide you with a unique receiving address.",
    icon: "PackageOpen",
  },
  {
    step: 2,
    title: "Inspect",
    description:
      "Every item is carefully inspected for damage, quantity accuracy, and compliance with Amazon's requirements. Issues are flagged immediately.",
    icon: "Search",
  },
  {
    step: 3,
    title: "Prep",
    description:
      "FNSKU labeling, poly-bagging, bundling, and all required prep work is completed to Amazon's exact specifications.",
    icon: "Tags",
  },
  {
    step: 4,
    title: "Quality Check",
    description:
      "Final quality control ensures every unit meets Amazon's standards before shipping. Our 99.8% accuracy rate speaks for itself.",
    icon: "CheckCircle",
  },
  {
    step: 5,
    title: "Inject",
    description:
      "Prepped inventory is shipped directly to Amazon fulfillment centers via optimized carrier routes for fastest check-in.",
    icon: "Truck",
  },
];
