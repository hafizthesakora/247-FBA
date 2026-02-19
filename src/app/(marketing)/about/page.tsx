import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Users, Package, Truck, Shield, Zap, Target } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about 24/7 FBA Prep & Fulfillment — a Nürtingen-based Amazon FBA Prep Center serving sellers across Europe.",
};

const stats = [
  { icon: Users, value: "5+", label: "Years Experience" },
  { icon: Package, value: "10,000+", label: "Orders Fulfilled" },
  { icon: Truck, value: "50+", label: "Daily Shipments" },
  { icon: MapPin, value: "1", label: "Strategic Hub" },
];

const values = [
  {
    icon: Shield,
    title: "Reliability",
    desc: "Consistent, dependable service you can count on — every shipment, every time.",
  },
  {
    icon: Zap,
    title: "Speed",
    desc: "24-48 hour turnaround keeps your inventory flowing and your business growing.",
  },
  {
    icon: Target,
    title: "Precision",
    desc: "99.8% accuracy rate. We get it right the first time, so Amazon doesn't send it back.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-navy-900">
        <Container>
          <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
            Our Story
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-xl text-navy-300 max-w-2xl">
            Your trusted Amazon FBA prep partner in the heart of Baden-Württemberg.
          </p>
        </Container>
      </section>

      {/* Story */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
                Built for Amazon Sellers
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Founded in Nürtingen, just outside Stuttgart, 24/7 FBA Prep &amp;
                  Fulfillment was born from a simple idea: Amazon sellers deserve a
                  prep center that works as hard as they do.
                </p>
                <p>
                  With years of experience in e-commerce logistics, our team understands
                  the challenges sellers face — from Amazon&apos;s ever-changing
                  requirements to tight turnaround deadlines. We built our operation to
                  solve these problems head-on.
                </p>
                <p>
                  Our strategic location in Baden-Württemberg provides excellent access
                  to major German and European Amazon fulfillment centers, ensuring your
                  inventory reaches Amazon quickly and cost-effectively.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/about-warehouse.jpg"
                alt="24/7 FBA warehouse in Nürtingen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section bg="navy">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 mx-auto mb-4 group-hover:bg-orange/20 transition-colors">
                  <stat.icon className="h-7 w-7 text-orange" />
                </div>
                <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-navy-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section bg="offwhite">
        <Container>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4 text-center">
            What Drives Us
          </h2>
          <p className="text-text-secondary text-center max-w-xl mx-auto mb-12">
            Our core values guide every package we prep and every shipment we deliver.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange/10 mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-orange" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
