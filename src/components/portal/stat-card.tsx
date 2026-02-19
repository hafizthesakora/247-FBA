import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-surface-border p-6",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary">{title}</p>
          <p className="mt-1 text-2xl font-bold text-navy-900">{value}</p>
          {trend && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                trendUp ? "text-green-600" : "text-red-500"
              )}
            >
              {trend}
            </p>
          )}
        </div>
        <div className="h-10 w-10 rounded-lg bg-orange/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-orange" />
        </div>
      </div>
    </div>
  );
}
