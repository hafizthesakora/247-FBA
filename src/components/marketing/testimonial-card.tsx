import { Star } from "lucide-react";
import type { Testimonial } from "@/types/services";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full flex flex-col">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-orange text-orange" />
        ))}
      </div>

      {/* Orange Quote Mark */}
      <div className="text-orange text-5xl font-serif leading-none mb-3">
        &ldquo;
      </div>

      <blockquote className="text-text-secondary text-base leading-relaxed flex-1 mb-6">
        {testimonial.quote}
      </blockquote>

      <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/10 font-heading text-sm font-bold text-orange">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-text-dark text-sm">{testimonial.name}</p>
          <p className="text-xs text-text-secondary">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}
