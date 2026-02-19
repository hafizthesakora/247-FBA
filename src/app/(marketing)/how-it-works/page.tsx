import type { Metadata } from "next";
import Link from "next/link";
import {
  PackageOpen,
  Search,
  Tags,
  CheckCircle,
  Truck,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { processSteps } from "@/data/process-steps";
import { Accordion } from "@/components/ui/accordion";

const iconMap: Record<string, React.ElementType> = {
  PackageOpen,
  Search,
  Tags,
  CheckCircle,
  Truck,
};

const faqs = [
  {
    title: "How do I ship my inventory to you?",
    content:
      "Simply create a shipment in your client portal (or email us) with the details of your inventory. We'll provide you with our warehouse address and receiving instructions. We accept shipments from any carrier worldwide.",
  },
  {
    title: "What is your turnaround time?",
    content:
      "Standard turnaround is 24-48 hours from receiving your inventory. Priority processing is available on Growth and Pro plans for same-day turnaround on orders received before 12:00 PM.",
  },
  {
    title: "Do you handle hazmat or oversized items?",
    content:
      "Yes, we can handle most hazmat categories and oversized items. Please contact us before shipping hazmat items so we can ensure proper handling and compliance with Amazon's requirements.",
  },
  {
    title: "Can I track my inventory in real-time?",
    content:
      "Yes! All clients receive access to our client portal where you can track inventory levels, shipment status, and prep progress in real-time. Notifications are sent at each stage.",
  },
  {
    title: "What if Amazon rejects a shipment you prepared?",
    content:
      "Our 99.8% accuracy rate means rejections are extremely rare. In the unlikely event of a rejection due to our prep error, we'll re-prep and re-ship the inventory at no additional cost.",
  },
];

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "5 simple steps: Receive, Inspect, Prep, Quality Check, and Inject. See how our FBA prep process works.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-navy-900">
        <Container>
          <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
            Our Process
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h1>
          <p className="text-xl text-navy-300 max-w-2xl">
            Getting your inventory Amazon-ready is simple. Here&apos;s our
            proven 5-step process.
          </p>
        </Container>
      </section>

      {/* Process Steps */}
      <Section bg="white">
        <Container size="narrow">
          <div className="relative">
            {/* Vertical line connector */}
            <div className="absolute left-7 top-7 bottom-7 w-px bg-orange/20 hidden md:block" />

            <div className="space-y-8 md:space-y-10">
              {processSteps.map((step) => {
                const Icon = iconMap[step.icon] || PackageOpen;
                return (
                  <div key={step.step} className="flex gap-5 md:gap-8 relative group">
                    <div className="shrink-0 relative z-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange text-white shadow-sm group-hover:shadow-md transition-shadow">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-xs font-bold text-orange uppercase tracking-widest bg-orange/10 px-2 py-1 rounded">
                          Step {step.step}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-text-dark">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 text-base font-semibold rounded-lg bg-orange text-white hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              Start Your First Shipment
            </Link>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg="offwhite" id="faq">
        <Container size="narrow">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
              FAQ
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion items={faqs} />
        </Container>
      </Section>
    </>
  );
}
