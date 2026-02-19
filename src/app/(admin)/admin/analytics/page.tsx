"use client";

import { useEffect, useState } from "react";
import { DollarSign, Package, ShoppingCart, HardHat } from "lucide-react";
import { StatCard } from "@/components/portal/stat-card";
import {
  RevenueChart,
  ThroughputChart,
  ShipmentVolumeChart,
  OrderTrendsChart,
} from "@/components/admin/analytics-chart";

interface AnalyticsData {
  stats: {
    totalRevenue: number;
    totalShipments: number;
    totalOrders: number;
    activeOperators: number;
  };
  revenueData: { name: string; revenue: number }[];
  throughputData: { name: string; shipments: number; completed: number }[];
  statusData: { name: string; value: number }[];
  orderTrendsData: { name: string; orders: number; completed: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
          Analytics
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Platform performance and insights
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value={`€${(data?.stats.totalRevenue ?? 0).toLocaleString("de-DE", { minimumFractionDigits: 2 })}`}
          icon={DollarSign}
        />
        <StatCard
          title="Total Shipments"
          value={data?.stats.totalShipments ?? 0}
          icon={Package}
        />
        <StatCard
          title="Total Orders"
          value={data?.stats.totalOrders ?? 0}
          icon={ShoppingCart}
        />
        <StatCard
          title="Active Operators"
          value={data?.stats.activeOperators ?? 0}
          icon={HardHat}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart
          data={data?.revenueData ?? []}
          title="Monthly Revenue"
        />
        <ThroughputChart
          data={data?.throughputData ?? []}
          title="Weekly Throughput"
        />
        <ShipmentVolumeChart
          data={data?.statusData ?? []}
          title="Shipment Status Distribution"
        />
        <OrderTrendsChart
          data={data?.orderTrendsData ?? []}
          title="Order Trends"
        />
      </div>
    </div>
  );
}
