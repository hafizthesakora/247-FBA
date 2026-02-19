import { User } from "lucide-react";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  RECEIVING: "bg-blue-100 text-blue-700",
  INSPECTION: "bg-yellow-100 text-yellow-700",
  PREP: "bg-purple-100 text-purple-700",
  QC: "bg-indigo-100 text-indigo-700",
  SHIPPING: "bg-cyan-100 text-cyan-700",
};

interface StationCardProps {
  station: {
    id: string;
    name: string;
    type: string;
    status: string;
    capacity: number;
    currentLoad: number;
    assignedOperator?: { name: string | null } | null;
    _count?: { tasks: number };
  };
}

export function StationCard({ station }: StationCardProps) {
  const loadPercent = Math.min(
    (station.currentLoad / station.capacity) * 100,
    100
  );
  const isActive = station.status === "ACTIVE";

  return (
    <div
      className={cn(
        "bg-white rounded-xl border p-4 transition-shadow hover:shadow-sm",
        isActive ? "border-surface-border" : "border-gray-200 opacity-60"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-navy-900 text-sm">{station.name}</h3>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
              typeColors[station.type] || "bg-gray-100 text-gray-700"
            )}
          >
            {station.type}
          </span>
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              isActive ? "bg-green-500" : "bg-gray-400"
            )}
          />
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
          <span>Capacity</span>
          <span>
            {station.currentLoad}/{station.capacity}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              loadPercent > 80
                ? "bg-red-500"
                : loadPercent > 50
                ? "bg-orange"
                : "bg-green-500"
            )}
            style={{ width: `${loadPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <User className="h-3 w-3" />
          {station.assignedOperator?.name || "Unassigned"}
        </span>
        {station._count && (
          <span>{station._count.tasks} active tasks</span>
        )}
      </div>
    </div>
  );
}
