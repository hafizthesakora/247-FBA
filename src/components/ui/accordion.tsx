"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "rounded-xl border transition-all duration-200",
            openIndex === index
              ? "border-orange/30 bg-white shadow-sm"
              : "border-surface-border bg-white hover:border-navy-200"
          )}
        >
          <button
            className="flex w-full items-center justify-between p-5 text-left font-medium text-text-dark hover:text-orange transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="pr-4">{item.title}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 transition-transform duration-300",
                openIndex === index && "rotate-180 text-orange"
              )}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5">
                  <p className="text-text-secondary leading-relaxed">{item.content}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
