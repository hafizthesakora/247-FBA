"use client";

import { useEffect, useState } from "react";
import { Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";

interface ActivityEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  createdAt: string;
  user: { name: string | null; email: string } | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [entityFilter, setEntityFilter] = useState("ALL");

  function fetchActivity(page = 1) {
    const params = new URLSearchParams({ page: String(page) });
    if (entityFilter !== "ALL") params.set("entityType", entityFilter);
    fetch(`/api/admin/activity?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setActivities(d.activities || []);
        setPagination(d.pagination);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    fetchActivity(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityFilter]);

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
          Activity Log
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Platform-wide activity history
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        <select
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
        >
          <option value="ALL">All Types</option>
          <option value="Task">Tasks</option>
          <option value="Shipment">Shipments</option>
          <option value="Station">Stations</option>
        </select>
      </div>

      {activities.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="No activity yet"
          description="Activity will appear here as operators work on tasks and shipments."
        />
      ) : (
        <>
          <div className="bg-white rounded-xl border border-surface-border divide-y divide-surface-border">
            {activities.map((entry) => (
              <div key={entry.id} className="px-4 py-3 flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Activity className="h-4 w-4 text-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-navy-900">
                    <span className="font-medium">
                      {entry.user?.name || entry.user?.email || "System"}
                    </span>{" "}
                    {entry.action}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {entry.entityType}
                    {entry.entityId
                      ? ` · ${entry.entityId.slice(-8)}`
                      : ""}{" "}
                    · {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-text-secondary">
                Page {pagination.page} of {pagination.totalPages} ({pagination.total} entries)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchActivity(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="p-2 rounded-lg border border-surface-border hover:bg-surface-offwhite transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => fetchActivity(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                  className="p-2 rounded-lg border border-surface-border hover:bg-surface-offwhite transition-colors disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
