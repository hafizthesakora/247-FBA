"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList, Package, CheckCircle2, Clock,
  Zap, AlertTriangle, ChevronRight, Activity,
  Flame, TrendingUp, Circle,
} from "lucide-react";
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

const PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string; ring: string }> = {
  URGENT: { label: "Urgent", color: "text-red-600",    bg: "bg-red-500",    ring: "ring-red-200" },
  HIGH:   { label: "High",   color: "text-orange-600", bg: "bg-orange-500", ring: "ring-orange-200" },
  MEDIUM: { label: "Medium", color: "text-yellow-600", bg: "bg-yellow-400", ring: "ring-yellow-200" },
  LOW:    { label: "Low",    color: "text-green-600",  bg: "bg-green-400",  ring: "ring-green-200" },
};

export default function OpsDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/ops/dashboard")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
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
        <div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const tasks = data?.activeTasks ?? [];
  const urgentCount  = tasks.filter((t) => t.priority === "URGENT").length;
  const highCount    = tasks.filter((t) => t.priority === "HIGH").length;
  const mediumCount  = tasks.filter((t) => t.priority === "MEDIUM").length;
  const lowCount     = tasks.filter((t) => t.priority === "LOW").length;
  const totalTasks   = tasks.length;

  const completed    = data?.stats.completedToday ?? 0;
  const totalDone    = completed + totalTasks;
  const progressPct  = totalDone > 0 ? Math.round((completed / totalDone) * 100) : 0;
  const circumference = 2 * Math.PI * 36; // r=36

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="space-y-5">

      {/* ─── Shift Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-600 text-xs font-semibold uppercase tracking-wide">Station Active</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-navy-900">Operations Dashboard</h1>
          <p className="text-text-secondary text-sm">{today}</p>
        </div>
        {urgentCount > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-500/30 animate-pulse">
            <Flame className="h-4 w-4" />
            {urgentCount} URGENT {urgentCount === 1 ? "TASK" : "TASKS"}
          </div>
        )}
      </div>

      {/* ─── Stats Row ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Shift Progress — visual card */}
        <div className="col-span-2 lg:col-span-1 bg-white rounded-2xl border border-surface-border p-5 flex items-center gap-4">
          {/* SVG Ring */}
          <div className="relative shrink-0">
            <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
              <circle cx="44" cy="44" r="36" fill="none" stroke="#f3f4f6" strokeWidth="8" />
              <circle
                cx="44" cy="44" r="36" fill="none"
                stroke="#f59e0b"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (circumference * progressPct) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-lg font-bold text-navy-900">{progressPct}%</span>
            </div>
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-navy-900">{completed}</p>
            <p className="text-sm font-medium text-text-secondary">Done today</p>
            <p className="text-xs text-text-secondary/60 mt-0.5">{totalTasks} remaining</p>
          </div>
        </div>

        {[
          {
            label: "Pending",
            value: data?.stats.pendingTasks ?? 0,
            icon: Clock,
            iconBg: "bg-amber-500",
            desc: "Awaiting claim",
            warn: (data?.stats.pendingTasks ?? 0) > 5,
          },
          {
            label: "In Progress",
            value: data?.stats.inProgressTasks ?? 0,
            icon: Zap,
            iconBg: "bg-blue-500",
            desc: "Active now",
            warn: false,
          },
          {
            label: "At Station",
            value: data?.stats.shipmentsAtStation ?? 0,
            icon: Package,
            iconBg: "bg-indigo-500",
            desc: "Shipments ready",
            warn: false,
          },
        ].map((card) => (
          <div
            key={card.label}
            className={`bg-white rounded-2xl border p-5 hover:shadow-md transition-all ${
              card.warn ? "border-amber-200 bg-amber-50/30" : "border-surface-border"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`h-9 w-9 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                <card.icon className="h-4 w-4 text-white" />
              </div>
              {card.warn && <AlertTriangle className="h-4 w-4 text-amber-500" />}
            </div>
            <p className="font-heading text-3xl font-bold text-navy-900 mb-0.5">{card.value}</p>
            <p className="text-sm font-medium text-text-secondary">{card.label}</p>
            <p className="text-xs text-text-secondary/60">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* ─── Priority Breakdown ─── */}
      {totalTasks > 0 && (
        <div className="bg-white rounded-2xl border border-surface-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-sm font-bold text-navy-900">Priority Breakdown</h2>
            <span className="text-xs text-text-secondary">{totalTasks} active tasks</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Bar */}
            <div className="flex-1 h-3 rounded-full overflow-hidden flex bg-surface-offwhite">
              {urgentCount > 0 && (
                <div className="bg-red-500 h-full transition-all" style={{ width: `${(urgentCount / totalTasks) * 100}%` }} />
              )}
              {highCount > 0 && (
                <div className="bg-orange-500 h-full transition-all" style={{ width: `${(highCount / totalTasks) * 100}%` }} />
              )}
              {mediumCount > 0 && (
                <div className="bg-yellow-400 h-full transition-all" style={{ width: `${(mediumCount / totalTasks) * 100}%` }} />
              )}
              {lowCount > 0 && (
                <div className="bg-green-400 h-full transition-all" style={{ width: `${(lowCount / totalTasks) * 100}%` }} />
              )}
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 shrink-0">
              {Object.entries(PRIORITY_CONFIG).map(([key, cfg]) => {
                const count = tasks.filter((t) => t.priority === key).length;
                if (count === 0) return null;
                return (
                  <div key={key} className="flex items-center gap-1.5 text-xs">
                    <Circle className={`h-2.5 w-2.5 fill-current ${cfg.color}`} />
                    <span className="text-text-secondary font-medium">{count} {cfg.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── Tasks + Live Feed ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Task Queue */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <ClipboardList className="h-4 w-4 text-amber-600" />
              </div>
              <h2 className="font-heading text-sm font-bold text-navy-900">Active Task Queue</h2>
              {totalTasks > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                  {totalTasks}
                </span>
              )}
            </div>
            <a href="/ops/tasks" className="text-xs text-amber-600 font-medium hover:text-amber-700 flex items-center gap-1">
              All tasks <ChevronRight className="h-3 w-3" />
            </a>
          </div>
          <div className="space-y-3">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAction={handleTaskAction}
                  loading={actionLoading === task.id}
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-surface-border p-12 text-center">
                <div className="h-16 w-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-400" />
                </div>
                <p className="font-heading font-semibold text-navy-900 mb-1">All clear!</p>
                <p className="text-sm text-text-secondary">No active tasks right now.</p>
                {completed > 0 && (
                  <p className="text-xs text-green-600 font-semibold mt-2 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" /> {completed} completed today
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Live Feed */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Activity className="h-4 w-4 text-indigo-600" />
            </div>
            <h2 className="font-heading text-sm font-bold text-navy-900">Live Activity</h2>
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          <LiveFeed />
        </div>
      </div>
    </div>
  );
}
