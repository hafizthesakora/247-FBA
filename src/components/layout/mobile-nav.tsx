"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] z-40 bg-white shadow-xl overflow-y-auto lg:hidden"
          >
            <div className="pt-24 px-6 pb-6">
              <nav className="flex flex-col gap-1">
                {mainNavItems.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        className="flex w-full items-center justify-between py-3 px-4 text-base font-medium text-navy-900 rounded-lg hover:bg-surface-offwhite transition-colors"
                        onClick={() => setServicesOpen(!servicesOpen)}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform duration-200",
                            servicesOpen && "rotate-180"
                          )}
                        />
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
                            <div className="ml-4 flex flex-col gap-1 pb-2">
                              <Link
                                href="/services"
                                className="py-2 px-4 text-sm font-medium text-navy-900 rounded-lg hover:bg-surface-offwhite transition-colors"
                                onClick={onClose}
                              >
                                All Services
                              </Link>
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="py-2 px-4 text-sm text-text-secondary rounded-lg hover:bg-surface-offwhite hover:text-navy-900 transition-colors"
                                  onClick={onClose}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-3 px-4 text-base font-medium text-navy-900 rounded-lg hover:bg-surface-offwhite transition-colors"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="w-full py-3 text-center text-sm font-semibold rounded-lg border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all duration-300"
                  onClick={onClose}
                >
                  Client Login
                </Link>
                <Link
                  href="/contact"
                  className="w-full py-3 text-center text-sm font-semibold rounded-lg bg-orange text-white hover:bg-orange-600 transition-all duration-300"
                  onClick={onClose}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
