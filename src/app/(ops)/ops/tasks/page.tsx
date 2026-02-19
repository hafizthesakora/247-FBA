"use client";

import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { TaskCard } from "@/components/ops/task-card";
import { EmptyState } from "@/components/portal/empty-state";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  type: string;
  dueDate: string | null;
  shipment: { trackingNumber: string } | null;
  station: { name: string } | null;
}

export default function OpsTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  function fetchTasks() {
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (priorityFilter !== "ALL") params.set("priority", priorityFilter);
    fetch(`/api/ops/tasks?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setTasks(d.tasks || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, priorityFilter]);

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
      fetchTasks();
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
          My Tasks
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          View and manage your assigned tasks
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
        >
          <option value="ALL">All Priorities</option>
          <option value="URGENT">Urgent</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No tasks found"
          description="No tasks match your current filters."
        />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onAction={handleTaskAction}
              loading={actionLoading === task.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
