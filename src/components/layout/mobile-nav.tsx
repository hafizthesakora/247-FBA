"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavItems } from "@/data/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] z-40 bg-white shadow-xl overflow-y-auto lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-5 pt-5 pb-4 border-b border-surface-border">
              <div className="h-8 w-8 rounded-lg bg-navy-900 flex items-center justify-center">
                <span className="font-heading text-[10px] font-bold text-white">24/7</span>
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-navy-900 leading-tight">FBA Prep</p>
                <p className="text-[10px] text-text-secondary leading-tight">Nürtingen, Germany</p>
              </div>
            </div>

            <div className="flex-1 px-4 py-4">
              <nav className="flex flex-col gap-0.5">
                {mainNavItems.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        className="flex w-full items-center justify-between py-2.5 px-3 text-sm font-semibold text-navy-900 rounded-xl hover:bg-surface-offwhite transition-colors"
                        onClick={() => setServicesOpen(!servicesOpen)}
                      >
                        {item.label}
                        <ChevronDown className={cn("h-4 w-4 text-text-secondary transition-transform duration-200", servicesOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-3 pl-3 border-l-2 border-orange/20 flex flex-col gap-0.5 py-1 mb-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="py-2 px-3 text-sm text-text-secondary rounded-lg hover:bg-surface-offwhite hover:text-navy-900 transition-colors"
                                  onClick={onClose}
                                >
                                  {child.label}
                                </Link>
                              ))}
                              <Link
                                href="/services"
                                className="py-2 px-3 text-xs font-semibold text-orange hover:text-orange-600 transition-colors"
                                onClick={onClose}
                              >
                                View all →
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
                      className="py-2.5 px-3 text-sm font-semibold text-navy-900 rounded-xl hover:bg-surface-offwhite transition-colors"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  )
                )}

                {/* Ghana Line highlight */}
                <Link
                  href="/ghana-line"
                  className="flex items-center gap-2 py-2.5 px-3 text-sm font-semibold text-orange rounded-xl bg-orange/8 hover:bg-orange/15 transition-colors mt-1"
                  onClick={onClose}
                >
                  <Ship className="h-4 w-4" />
                  Ghana Line Shipping
                </Link>
              </nav>
            </div>

            {/* Bottom CTAs */}
            <div className="px-4 pb-6 pt-4 border-t border-surface-border flex flex-col gap-2.5">
              <Link
                href="/login"
                className="w-full py-2.5 text-center text-sm font-semibold rounded-xl border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all duration-200"
                onClick={onClose}
              >
                Login
              </Link>
              <Link
                href="/contact"
                className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-orange text-white hover:bg-orange-600 transition-all duration-200 shadow-sm"
                onClick={onClose}
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
