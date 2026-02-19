"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavItems } from "@/data/navigation";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { motion, AnimatePresence } from "framer-motion";

export function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isDark = !scrolled && isHome;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isDark
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-nav"
        )}
      >
        <Container>
          <nav className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg font-heading text-sm font-bold transition-all duration-300 group-hover:scale-105",
                  isDark
                    ? "bg-white text-navy-900"
                    : "bg-navy-900 text-white"
                )}
              >
                24/7
              </div>
              <span
                className={cn(
                  "hidden sm:block font-heading text-lg font-bold transition-colors duration-300",
                  isDark ? "text-white" : "text-navy-900"
                )}
              >
                FBA Prep
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
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
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        isDark
                          ? "text-white/90 hover:text-white"
                          : "text-navy-900 hover:bg-navy-50"
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-lg px-4 py-2.5 text-sm text-navy-900 hover:bg-surface-offwhite hover:text-orange transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-orange"
                        : isDark
                        ? "text-white/90 hover:text-white"
                        : "text-navy-900 hover:bg-navy-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className={cn(
                  "px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all duration-300",
                  isDark
                    ? "border-white text-white hover:bg-white hover:text-navy-900"
                    : "border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white"
                )}
              >
                Client Login
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-orange text-white hover:bg-orange-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className={cn("h-6 w-6", isDark ? "text-white" : "text-navy-900")} />
              ) : (
                <Menu className={cn("h-6 w-6", isDark ? "text-white" : "text-navy-900")} />
              )}
            </button>
          </nav>
        </Container>
      </motion.header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
