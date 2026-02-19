"use client";

import { Clock, Package, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string | null;
    status: string;
    priority: string;
    type: string;
    dueDate?: string | null;
    shipment?: { trackingNumber: string } | null;
    station?: { name: string } | null;
  };
  onAction?: (taskId: string, action: string) => void;
  loading?: boolean;
}

export function TaskCard({ task, onAction, loading }: TaskCardProps) {
  const actionButton = () => {
    switch (task.status) {
      case "PENDING":
        return (
          <button
            onClick={() => onAction?.(task.id, "claim")}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg bg-orange text-white text-xs font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            Claim
          </button>
        );
      case "IN_PROGRESS":
        return (
          <button
            onClick={() => onAction?.(task.id, "complete")}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Complete
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-surface-border p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-navy-900 text-sm truncate">
              {task.title}
            </h3>
            <StatusBadge status={task.priority} />
          </div>
          {task.description && (
            <p className="text-xs text-text-secondary line-clamp-2 mb-2">
              {task.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
            <StatusBadge status={task.status} />
            <span className="inline-flex items-center gap-1">
              <Package className="h-3 w-3" />
              {task.type}
            </span>
            {task.shipment && (
              <span className="inline-flex items-center gap-1">
                <Package className="h-3 w-3" />
                {task.shipment.trackingNumber}
              </span>
            )}
            {task.station && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {task.station.name}
              </span>
            )}
            {task.dueDate && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        {actionButton()}
      </div>
    </div>
  );
}
