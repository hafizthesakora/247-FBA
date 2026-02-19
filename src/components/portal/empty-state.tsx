import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-16 w-16 rounded-2xl bg-navy-50 flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-navy-400" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-navy-900 mb-1">
        {title}
      </h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-orange text-white hover:bg-orange-600 transition-all duration-300"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
