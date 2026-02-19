import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types/services";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block rounded-xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/10 transition-colors" />
        {service.isComingSoon && (
          <div className="absolute top-4 right-4">
            <Badge variant="orange">Coming Soon</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-text-dark mb-2 group-hover:text-orange transition-colors">
          {service.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {service.shortDescription}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange group-hover:gap-2 transition-all">
          Learn More <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
