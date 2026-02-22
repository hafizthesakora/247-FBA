"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Ship, Package, Truck, Box, RotateCcw, Warehouse, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavItems } from "@/data/navigation";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { AnimatePresence, motion } from "framer-motion";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "/services/fba-prep":         Package,
  "/services/direct-injection": Truck,
  "/services/volume-prep":      Zap,
  "/services/returns":          RotateCcw,
  "/services/storage":          Warehouse,
  "/services/fulfillment":      Box,
};

const SERVICE_DESCS: Record<string, string> = {
  "/services/fba-prep":         "Amazon-compliant labelling & prep",
  "/services/direct-injection": "Direct shipping to Amazon FCs",
  "/services/volume-prep":      "High-volume bulk processing",
  "/services/returns":          "Inspect, repackage & restock",
  "/services/storage":          "Flexible warehousing solutions",
  "/services/fulfillment":      "End-to-end fulfilment service",
};

export function MarketingNavbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white shadow-[0_1px_12px_0_rgb(0,0,0,0.08)] border-b border-surface-border"
            : "bg-white/95 border-b border-surface-border"
        )}
      >
        <Container>
          <nav className="flex h-[68px] items-center justify-between gap-4">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white font-heading text-[11px] font-bold transition-all duration-200 group-hover:bg-orange leading-tight">
                24/7
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-heading text-[15px] font-bold text-navy-900 leading-tight">
                  FBA Prep
                </span>
                <span className="text-[10px] text-text-secondary leading-tight font-medium">
                  Nürtingen, Germany
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center max-w-2xl mx-auto">
              {mainNavItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                        "text-navy-900 hover:bg-navy-50 hover:text-navy-900"
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        "h-3.5 w-3.5 text-text-secondary transition-transform duration-200",
                        servicesOpen && "rotate-180"
                      )} />
                    </button>

                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute top-full left-0 mt-1.5 w-72 rounded-2xl bg-white shadow-xl ring-1 ring-black/[0.07] p-2"
                        >
                          <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                            Amazon FBA Services
                          </p>
                          {item.children!.map((child) => {
                            const Icon = SERVICE_ICONS[child.href] ?? Package;
                            const desc = SERVICE_DESCS[child.href] ?? "";
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-orange/5 group/svc transition-colors"
                              >
                                <div className="h-8 w-8 rounded-lg bg-orange/10 flex items-center justify-center shrink-0 group-hover/svc:bg-orange/20 transition-colors">
                                  <Icon className="h-4 w-4 text-orange" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-navy-900 group-hover/svc:text-orange transition-colors leading-tight">
                                    {child.label}
                                  </p>
                                  <p className="text-[11px] text-text-secondary leading-tight mt-0.5">{desc}</p>
                                </div>
                              </Link>
                            );
                          })}
                          <div className="mx-2 mt-2 pt-2 border-t border-surface-border">
                            <Link
                              href="/services"
                              className="flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-orange hover:text-orange-600 transition-colors"
                            >
                              All services <ChevronDown className="h-3 w-3 -rotate-90" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                      pathname === item.href
                        ? "text-orange font-semibold bg-orange/5"
                        : "text-navy-900 hover:bg-navy-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Ghana Line — special pill */}
              <Link
                href="/ghana-line"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ml-1",
                  pathname === "/ghana-line"
                    ? "bg-orange text-white"
                    : "text-orange border border-orange/30 hover:bg-orange hover:text-white hover:border-orange"
                )}
              >
                <Ship className="h-3.5 w-3.5" />
                Ghana Line
              </Link>
            </div>

            {/* ── Right CTAs ── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-navy-900 rounded-lg hover:bg-navy-50 transition-colors duration-150"
              >
                Login
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-orange text-white hover:bg-orange-600 transition-colors duration-150 shadow-sm"
              >
                Get a Quote
              </Link>
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              className="lg:hidden p-2 rounded-lg text-navy-900 hover:bg-navy-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
