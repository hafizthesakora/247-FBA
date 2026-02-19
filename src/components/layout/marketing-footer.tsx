import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { footerNavItems } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";

export function MarketingFooter() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* CTA Strip */}
      <div className="border-b border-navy-800">
        <Container>
          <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">
                Ready to get started?
              </h3>
              <p className="text-navy-300 text-sm">
                Get your free quote today and streamline your FBA operations.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              Get a Free Quote <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange font-heading text-sm font-bold text-white group-hover:scale-105 transition-transform">
                  24/7
                </div>
                <span className="font-heading text-lg font-bold text-white">
                  FBA Prep
                </span>
              </Link>
              <p className="text-sm text-navy-300 mb-6 leading-relaxed">
                Professional Amazon FBA Prep Center in Nürtingen, Germany. Fast,
                reliable, and Amazon-compliant.
              </p>
              <div className="flex flex-col gap-3 text-sm text-navy-300">
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-2.5 hover:text-orange transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {SITE_CONFIG.contact.email}
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 hover:text-orange transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {SITE_CONFIG.contact.phone}
                </a>
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    {SITE_CONFIG.address.street}, {SITE_CONFIG.address.zip}{" "}
                    {SITE_CONFIG.address.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-5">
                Company
              </h3>
              <ul className="flex flex-col gap-3">
                {footerNavItems.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-navy-300 hover:text-orange hover:translate-x-0.5 transition-all inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-5">
                Services
              </h3>
              <ul className="flex flex-col gap-3">
                {footerNavItems.services.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-navy-300 hover:text-orange hover:translate-x-0.5 transition-all inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-5">
                Resources
              </h3>
              <ul className="flex flex-col gap-3">
                {footerNavItems.resources.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-navy-300 hover:text-orange hover:translate-x-0.5 transition-all inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-navy-400">
              &copy; {new Date().getFullYear()} 24/7 FBA Prep &amp; Fulfillment.
              All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerNavItems.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-navy-400 hover:text-orange transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
