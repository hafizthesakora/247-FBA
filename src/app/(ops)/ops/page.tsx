"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Package, CheckCircle, Clock } from "lucide-react";
import { StatCard } from "@/components/portal/stat-card";
import { TaskCard } from "@/components/ops/task-card";
import { LiveFeed } from "@/components/ops/live-feed";

interface DashboardData {
  stats: {
    pendingTasks: number;
    inProgressTasks: number;
    completedToday: number;
    shipmentsAtStation: number;
  };
  activeTasks: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    type: string;
    dueDate: string | null;
    shipment: { trackingNumber: string } | null;
    station: { name: string } | null;
  }[];
}

export default function OpsDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/ops/dashboard")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleTaskAction(taskId: string, action: string) {
    setActionLoading(taskId);
    const statusMap: Record<string, string> = {
      claim: "IN_PROGRESS",
      complete: "COMPLETED",
    };
    try {
      await fetch(`/api/ops/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusMap[action] }),
      });
      // Refresh dashboard
      const res = await fetch("/api/ops/dashboard");
      const d = await res.json();
      setData(d);
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          Operations Dashboard
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Your tasks and warehouse activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Pending Tasks"
          value={data?.stats.pendingTasks ?? 0}
          icon={Clock}
        />
        <StatCard
          title="In Progress"
          value={data?.stats.inProgressTasks ?? 0}
          icon={ClipboardList}
        />
        <StatCard
          title="Completed Today"
          value={data?.stats.completedToday ?? 0}
          icon={CheckCircle}
        />
        <StatCard
          title="Shipments at Station"
          value={data?.stats.shipmentsAtStation ?? 0}
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-heading text-lg font-semibold text-navy-900 mb-3">
            Active Tasks
          </h2>
          <div className="space-y-3">
            {data?.activeTasks && data.activeTasks.length > 0 ? (
              data.activeTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAction={handleTaskAction}
                  loading={actionLoading === task.id}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl border border-surface-border p-8 text-center text-text-secondary text-sm">
                No active tasks
              </div>
            )}
          </div>
        </div>
        <LiveFeed />
      </div>
    </div>
  );
}
