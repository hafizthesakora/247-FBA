"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, Loader2, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { AnimateIn } from "@/components/shared/animate-in";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Toast } from "@/components/shared/toast";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const serviceOptions = [
  { value: "fba-prep", label: "FBA Prep" },
  { value: "direct-injection", label: "Direct Injection" },
  { value: "volume-prep", label: "Volume Prep" },
  { value: "returns", label: "Returns Management" },
  { value: "storage", label: "Storage Solutions" },
  { value: "ghana-line", label: "Ghana Line Shipping" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [formType, setFormType] = useState<"contact" | "quote">("quote");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  const closeToast = useCallback(() => setToast((prev) => ({ ...prev, show: false })), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const endpoint = formType === "quote" ? "/api/quote" : "/api/contact";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        setToast({ show: true, message: "Your message has been sent successfully!", type: "success" });
      } else {
        const errorData = await res.json();
        setToast({
          show: true,
          message: errorData.error || "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch {
      setToast({
        show: true,
        message: "Network error. Please check your connection and try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <Image
          src="/images/f24df04b-8b00-47d3-a9c8-ec4d4a70d645.jpg"
          alt="Contact 24/7 FBA Prep"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-900/75" />
        <Container className="relative z-10">
          <AnimateIn direction="up">
            <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-4">
              Contact Us
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5 max-w-2xl">
              Get in Touch
            </h1>
            <p className="text-xl text-white/75 max-w-2xl leading-relaxed">
              Ready to streamline your Amazon FBA operations? Request a free quote or
              send us a message — we respond within 24 hours.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ─── Contact Section ─── */}
      <section className="py-20 bg-surface-offwhite">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* ── Form ── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-card">
                {/* Tabs */}
                <div className="flex gap-2 mb-8 p-1 bg-surface-offwhite rounded-xl">
                  <button
                    onClick={() => { setFormType("quote"); setSubmitted(false); }}
                    className={cn(
                      "flex-1 px-4 sm:px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200",
                      formType === "quote"
                        ? "bg-orange text-white shadow-sm"
                        : "text-text-secondary hover:text-text-dark"
                    )}
                  >
                    Request a Quote
                  </button>
                  <button
                    onClick={() => { setFormType("contact"); setSubmitted(false); }}
                    className={cn(
                      "flex-1 px-4 sm:px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200",
                      formType === "contact"
                        ? "bg-orange text-white shadow-sm"
                        : "text-text-secondary hover:text-text-dark"
                    )}
                  >
                    General Inquiry
                  </button>
                </div>

                {submitted ? (
                  <div className="text-center py-16">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mx-auto mb-5">
                      <Send className="h-9 w-9 text-green-600" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-navy-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-text-secondary mb-6">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-sm font-semibold text-orange hover:text-orange-600 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="name" required>Full Name</Label>
                        <Input id="name" name="name" placeholder="John Doe" required />
                      </div>
                      <div>
                        <Label htmlFor="email" required>Email</Label>
                        <Input id="email" name="email" type="email" placeholder="john@company.com" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" name="company" placeholder="Company name" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" placeholder="+49..." />
                      </div>
                    </div>

                    {formType === "quote" && (
                      <>
                        <div>
                          <Label htmlFor="service" required>Service</Label>
                          <Select id="service" name="service" options={serviceOptions} placeholder="Select a service" required />
                        </div>
                        <div>
                          <Label htmlFor="monthlyUnits">Estimated Monthly Units</Label>
                          <Input id="monthlyUnits" name="monthlyUnits" placeholder="e.g. 500" />
                        </div>
                      </>
                    )}

                    {formType === "contact" && (
                      <div>
                        <Label htmlFor="subject" required>Subject</Label>
                        <Input id="subject" name="subject" placeholder="How can we help?" required />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="message" required>
                        {formType === "quote" ? "Details" : "Message"}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={
                          formType === "quote"
                            ? "Tell us about your products, prep requirements, etc."
                            : "Your message..."
                        }
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 hover:shadow-md active:scale-[0.99]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : formType === "quote" ? (
                        <>Request Quote <ArrowRight className="h-4 w-4" /></>
                      ) : (
                        <>Send Message <ArrowRight className="h-4 w-4" /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-heading text-lg font-bold text-navy-900 mb-5">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="flex items-center gap-3 text-sm text-text-secondary hover:text-orange transition-colors group"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 group-hover:bg-orange/20 transition-colors shrink-0">
                      <Mail className="h-4 w-4 text-orange" />
                    </div>
                    {SITE_CONFIG.contact.email}
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-sm text-text-secondary hover:text-orange transition-colors group"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 group-hover:bg-orange/20 transition-colors shrink-0">
                      <Phone className="h-4 w-4 text-orange" />
                    </div>
                    {SITE_CONFIG.contact.phone}
                  </a>
                  <div className="flex items-start gap-3 text-sm text-text-secondary">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 shrink-0">
                      <MapPin className="h-4 w-4 text-orange" />
                    </div>
                    <span className="pt-1.5">
                      {SITE_CONFIG.address.street}
                      <br />
                      {SITE_CONFIG.address.zip} {SITE_CONFIG.address.city}
                      <br />
                      {SITE_CONFIG.address.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-5">
                  <Clock className="h-5 w-5 text-orange" />
                  <h3 className="font-heading text-lg font-bold text-navy-900">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="flex justify-between items-center">
                    <span>Monday — Friday</span>
                    <span className="font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs">
                      08:00 — 18:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Saturday</span>
                    <span className="font-medium bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-xs">
                      09:00 — 14:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sunday</span>
                    <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs font-medium">
                      Closed
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Call */}
              <div className="bg-navy-900 rounded-2xl p-6 text-white">
                <h3 className="font-heading text-lg font-bold mb-2">
                  Need a quick response?
                </h3>
                <p className="text-sm text-navy-300 mb-4">
                  For urgent inquiries, call us directly during business hours.
                </p>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange hover:text-orange-400 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Toast message={toast.message} type={toast.type} show={toast.show} onClose={closeToast} />
    </>
  );
}
