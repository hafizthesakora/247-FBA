import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  // Shipment statuses
  DRAFT: "bg-gray-100 text-gray-700",
  RECEIVED: "bg-blue-100 text-blue-700",
  INSPECTING: "bg-yellow-100 text-yellow-700",
  PREPPING: "bg-purple-100 text-purple-700",
  QUALITY_CHECK: "bg-indigo-100 text-indigo-700",
  READY_TO_SHIP: "bg-cyan-100 text-cyan-700",
  SHIPPED: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  // Order statuses
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  // Invoice statuses
  SENT: "bg-blue-100 text-blue-700",
  PAID: "bg-green-100 text-green-700",
  OVERDUE: "bg-red-100 text-red-700",
  // Task statuses
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  // Station statuses
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-gray-100 text-gray-700",
  // Task priorities
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

function formatStatus(status: string) {
  return status.replace(/_/g, " ");
}

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize",
        statusStyles[status] || "bg-gray-100 text-gray-700",
        className
      )}
    >
      {formatStatus(status).toLowerCase()}
    </span>
  );
}
