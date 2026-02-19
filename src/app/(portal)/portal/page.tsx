"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Package, ShoppingCart, FileText, Clock } from "lucide-react";
import { StatCard } from "@/components/portal/stat-card";
import { StatusBadge } from "@/components/portal/status-badge";
import Link from "next/link";

interface DashboardData {
  stats: {
    activeShipments: number;
    pendingOrders: number;
    unpaidInvoices: number;
    totalShipments: number;
  };
  recentShipments: Array<{
    id: string;
    trackingNumber: string;
    status: string;
    destination: string;
    createdAt: string;
  }>;
  recentOrders: Array<{
    id: string;
    status: string;
    totalAmount: number;
    service: string | null;
    createdAt: string;
  }>;
}

export default function PortalDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/portal/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          Welcome back, {session?.user?.name?.split(" ")[0] || "there"}
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Here&apos;s an overview of your account
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Active Shipments"
          value={data?.stats.activeShipments ?? "—"}
          icon={Package}
        />
        <StatCard
          title="Pending Orders"
          value={data?.stats.pendingOrders ?? "—"}
          icon={ShoppingCart}
        />
        <StatCard
          title="Unpaid Invoices"
          value={data?.stats.unpaidInvoices ?? "—"}
          icon={FileText}
        />
        <StatCard
          title="Total Shipments"
          value={data?.stats.totalShipments ?? "—"}
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <div className="bg-white rounded-xl border border-surface-border">
          <div className="flex items-center justify-between p-4 border-b border-surface-border">
            <h2 className="font-heading text-base font-semibold text-navy-900">
              Recent Shipments
            </h2>
            <Link
              href="/portal/shipments"
              className="text-xs text-orange hover:text-orange-600 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-surface-border">
            {data?.recentShipments?.length ? (
              data.recentShipments.map((s) => (
                <Link
                  key={s.id}
                  href={`/portal/shipments/${s.id}`}
                  className="flex items-center justify-between p-4 hover:bg-surface-offwhite transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-navy-900">
                      {s.trackingNumber}
                    </p>
                    <p className="text-xs text-text-secondary">{s.destination}</p>
                  </div>
                  <StatusBadge status={s.status} />
                </Link>
              ))
            ) : (
              <p className="p-4 text-sm text-text-secondary text-center">
                No recent shipments
              </p>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-surface-border">
          <div className="flex items-center justify-between p-4 border-b border-surface-border">
            <h2 className="font-heading text-base font-semibold text-navy-900">
              Recent Orders
            </h2>
            <Link
              href="/portal/orders"
              className="text-xs text-orange hover:text-orange-600 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-surface-border">
            {data?.recentOrders?.length ? (
              data.recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-navy-900">
                      {o.service || "FBA Prep"}
                    </p>
                    <p className="text-xs text-text-secondary">
                      €{o.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-text-secondary text-center">
                No recent orders
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
