"use client";

import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, FileText, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/portal/stat-card";
import { StatusBadge } from "@/components/portal/status-badge";

interface AdminStats {
  totalClients: number;
  totalShipments: number;
  activeShipments: number;
  totalOrders: number;
  totalRevenue: number;
  unpaidInvoices: number;
  recentShipments: Array<{
    id: string;
    trackingNumber: string;
    status: string;
    user: { name: string | null; company: string | null };
    createdAt: string;
  }>;
  recentClients: Array<{
    id: string;
    name: string | null;
    email: string;
    company: string | null;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          Admin Dashboard
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Platform overview and statistics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard
          title="Total Clients"
          value={stats?.totalClients ?? "—"}
          icon={Users}
        />
        <StatCard
          title="Active Shipments"
          value={stats?.activeShipments ?? "—"}
          icon={Package}
        />
        <StatCard
          title="Total Shipments"
          value={stats?.totalShipments ?? "—"}
          icon={Package}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders ?? "—"}
          icon={ShoppingCart}
        />
        <StatCard
          title="Revenue"
          value={stats ? `€${stats.totalRevenue.toFixed(0)}` : "—"}
          icon={TrendingUp}
        />
        <StatCard
          title="Unpaid Invoices"
          value={stats?.unpaidInvoices ?? "—"}
          icon={FileText}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <div className="bg-white rounded-xl border border-surface-border">
          <div className="p-4 border-b border-surface-border">
            <h2 className="font-heading text-base font-semibold text-navy-900">
              Recent Shipments
            </h2>
          </div>
          <div className="divide-y divide-surface-border">
            {stats?.recentShipments?.length ? (
              stats.recentShipments.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-navy-900">
                      {s.trackingNumber}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {s.user.company || s.user.name || "Unknown"}
                    </p>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-text-secondary text-center">
                No shipments yet
              </p>
            )}
          </div>
        </div>

        {/* Recent Clients */}
        <div className="bg-white rounded-xl border border-surface-border">
          <div className="p-4 border-b border-surface-border">
            <h2 className="font-heading text-base font-semibold text-navy-900">
              Recent Clients
            </h2>
          </div>
          <div className="divide-y divide-surface-border">
            {stats?.recentClients?.length ? (
              stats.recentClients.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-navy-900">
                      {c.name || "Unnamed"}
                    </p>
                    <p className="text-xs text-text-secondary">{c.email}</p>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {c.company || "—"}
                  </span>
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-text-secondary text-center">
                No clients yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
