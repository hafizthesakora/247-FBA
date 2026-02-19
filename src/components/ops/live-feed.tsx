"use client";

import { useEffect, useState, useRef } from "react";
import { Activity } from "lucide-react";

interface ActivityEntry {
  id: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  createdAt: string;
  user?: { name: string | null } | null;
}

export function LiveFeed() {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [connected, setConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    function connect() {
      const es = new EventSource("/api/ops/activity-stream");
      eventSourceRef.current = es;

      es.onopen = () => setConnected(true);

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (Array.isArray(data)) {
            setActivities((prev) => {
              const existingIds = new Set(prev.map((a) => a.id));
              const newItems = data.filter(
                (a: ActivityEntry) => !existingIds.has(a.id)
              );
              return [...newItems, ...prev].slice(0, 50);
            });
          }
        } catch {
          // ignore parse errors
        }
      };

      es.onerror = () => {
        setConnected(false);
        es.close();
        // Reconnect after 5s
        setTimeout(connect, 5000);
      };
    }

    connect();

    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-surface-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-navy-900" />
          <h3 className="font-medium text-navy-900 text-sm">Live Activity</h3>
        </div>
        <span
          className={`h-2 w-2 rounded-full ${
            connected ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-surface-border">
        {activities.length === 0 ? (
          <div className="px-4 py-8 text-center text-text-secondary text-sm">
            No recent activity
          </div>
        ) : (
          activities.map((entry) => (
            <div key={entry.id} className="px-4 py-3">
              <p className="text-sm text-navy-900">
                <span className="font-medium">
                  {entry.user?.name || "System"}
                </span>{" "}
                {entry.action}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                {entry.entityType}
                {entry.entityId ? ` · ${entry.entityId.slice(-6)}` : ""} ·{" "}
                {new Date(entry.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
