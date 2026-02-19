"use client";

import { useEffect, useState } from "react";
import { Bell, Check, Package, ShoppingCart, FileText, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/portal/empty-state";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: string;
  createdAt: string;
}

const typeIcons: Record<string, typeof Bell> = {
  SHIPMENT: Package,
  ORDER: ShoppingCart,
  INVOICE: FileText,
  SYSTEM: Info,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/notifications")
      .then((r) => r.json())
      .then((data) => {
        setNotifications(data.notifications || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function markAsRead(id: string) {
    await fetch(`/api/portal/notifications/${id}`, { method: "PUT" });
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  async function markAllRead() {
    await fetch("/api/portal/notifications/read-all", { method: "PUT" });
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-900">
            Notifications
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-orange hover:text-orange-600 font-medium flex items-center gap-1"
          >
            <Check className="h-4 w-4" />
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You'll receive notifications about shipment updates, order status, and invoices here."
        />
      ) : (
        <div className="bg-white rounded-xl border border-surface-border divide-y divide-surface-border">
          {notifications.map((n) => {
            const Icon = typeIcons[n.type] || Bell;
            return (
              <div
                key={n.id}
                className={cn(
                  "flex gap-4 p-4 transition-colors",
                  !n.read && "bg-orange-50/50"
                )}
              >
                <div
                  className={cn(
                    "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                    !n.read ? "bg-orange/10" : "bg-gray-100"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      !n.read ? "text-orange" : "text-text-secondary"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={cn(
                        "text-sm",
                        !n.read
                          ? "font-semibold text-navy-900"
                          : "font-medium text-navy-900"
                      )}
                    >
                      {n.title}
                    </p>
                    <span className="text-xs text-text-secondary whitespace-nowrap">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {n.message}
                  </p>
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-xs text-orange hover:text-orange-600 font-medium mt-1"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
