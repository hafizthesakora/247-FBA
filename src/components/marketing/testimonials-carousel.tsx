"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TestimonialCard } from "./testimonial-card";
import { testimonials } from "@/data/testimonials";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/animate-in";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  // Auto-advance on mobile
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <Section bg="offwhite">
      <Container>
        <AnimateIn className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-orange uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Our Client Experiences
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Hear from Amazon sellers who trust us with their inventory.
          </p>
        </AnimateIn>

        {/* Desktop: Show all 3 */}
        <StaggerContainer className="hidden md:grid grid-cols-3 gap-6" staggerDelay={0.15}>
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <TestimonialCard testimonial={t} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile: Animated Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -100 : 100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <TestimonialCard testimonial={testimonials[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-surface-border hover:bg-white hover:border-orange transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-navy-900" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    i === activeIndex
                      ? "w-8 bg-orange"
                      : "w-2.5 bg-navy-200 hover:bg-navy-300"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-surface-border hover:bg-white hover:border-orange transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-navy-900" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
