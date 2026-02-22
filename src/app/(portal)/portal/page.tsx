"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Package, ShoppingCart, FileText, Boxes,
  Plus, ArrowRight, Clock, CheckCircle2,
  ChevronRight, TrendingUp, AlertCircle,
} from "lucide-react";
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

const PIPELINE = [
  { key: "RECEIVED",      label: "Received",  color: "bg-blue-400",   dot: "bg-blue-400" },
  { key: "INSPECTING",    label: "Inspecting",color: "bg-yellow-400", dot: "bg-yellow-400" },
  { key: "PREPPING",      label: "Prepping",  color: "bg-purple-400", dot: "bg-purple-400" },
  { key: "QUALITY_CHECK", label: "QC",        color: "bg-indigo-400", dot: "bg-indigo-400" },
  { key: "READY_TO_SHIP", label: "Ready",     color: "bg-cyan-400",   dot: "bg-cyan-400" },
  { key: "SHIPPED",       label: "Shipped",   color: "bg-orange-400", dot: "bg-orange-400" },
  { key: "DELIVERED",     label: "Delivered", color: "bg-green-400",  dot: "bg-green-400" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function PortalDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/dashboard")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const pipelineCounts = PIPELINE.reduce<Record<string, number>>((acc, s) => {
    acc[s.key] = (data?.recentShipments ?? []).filter((sh) => sh.status === s.key).length;
    return acc;
  }, {});

  const totalActive = data?.stats.activeShipments ?? 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ─── Welcome + CTA ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-text-secondary text-sm mb-0.5">{greeting()}, {firstName}</p>
          <h1 className="font-heading text-2xl font-bold text-navy-900">Your Dashboard</h1>
        </div>
        <Link
          href="/portal/shipments/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange text-white font-semibold text-sm hover:bg-orange-600 transition-all hover:scale-[1.02] shadow-md shadow-orange/20 shrink-0"
        >
          <Plus className="h-4 w-4" />
          New Shipment
        </Link>
      </div>

      {/* ─── KPI Strip ─── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Active Shipments — hero card */}
        <div className="col-span-2 xl:col-span-1 relative overflow-hidden rounded-2xl bg-orange p-5 text-white shadow-lg shadow-orange/20">
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10" />
          <div className="absolute top-0 right-0 h-16 w-16 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 text-orange-200" />
            </div>
            <p className="font-heading text-4xl font-bold">{totalActive}</p>
            <p className="text-orange-100 text-sm font-medium mt-0.5">Active Shipments</p>
            <p className="text-orange-200 text-xs mt-1">In prep or transit</p>
          </div>
        </div>

        {[
          {
            title: "Pending Orders",
            value: data?.stats.pendingOrders ?? 0,
            icon: ShoppingCart,
            href: "/portal/orders",
            alert: (data?.stats.pendingOrders ?? 0) > 0,
          },
          {
            title: "Unpaid Invoices",
            value: data?.stats.unpaidInvoices ?? 0,
            icon: FileText,
            href: "/portal/invoices",
            alert: (data?.stats.unpaidInvoices ?? 0) > 0,
          },
          {
            title: "Total Shipments",
            value: data?.stats.totalShipments ?? 0,
            icon: Boxes,
            href: "/portal/shipments",
            alert: false,
          },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`relative rounded-2xl bg-white border p-5 hover:shadow-md transition-all group ${
              card.alert ? "border-amber-200 ring-1 ring-amber-100" : "border-surface-border"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                card.alert ? "bg-amber-100" : "bg-surface-offwhite"
              }`}>
                <card.icon className={`h-4 w-4 ${card.alert ? "text-amber-600" : "text-text-secondary"}`} />
              </div>
              {card.alert && <AlertCircle className="h-4 w-4 text-amber-500" />}
            </div>
            <p className="font-heading text-3xl font-bold text-navy-900">{card.value}</p>
            <p className="text-sm text-text-secondary mt-0.5 group-hover:text-orange transition-colors">
              {card.title} <ChevronRight className="inline h-3 w-3" />
            </p>
          </Link>
        ))}
      </div>

      {/* ─── Shipment Pipeline ─── */}
      <div className="bg-white rounded-2xl border border-surface-border p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-sm font-bold text-navy-900">Shipment Pipeline</h2>
          <Link href="/portal/shipments" className="text-xs text-orange font-medium hover:text-orange-600 flex items-center gap-1">
            All shipments <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-surface-border hidden md:block" />
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2 relative z-10">
            {PIPELINE.map((stage, i) => {
              const count = pipelineCounts[stage.key] ?? 0;
              const active = count > 0;
              return (
                <div key={stage.key} className="flex flex-col items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    active
                      ? `${stage.color} text-white shadow-sm`
                      : "bg-surface-offwhite text-text-secondary/40"
                  }`}>
                    {active ? count : <span className="text-[10px]">{i + 1}</span>}
                  </div>
                  <p className={`text-xs font-medium text-center ${active ? "text-navy-900" : "text-text-secondary/50"}`}>
                    {stage.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Recent Activity + Quick Actions ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent Shipments */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-surface-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
            <h2 className="font-heading text-sm font-bold text-navy-900">Recent Shipments</h2>
            <Link href="/portal/shipments" className="text-xs text-orange hover:text-orange-600 font-medium flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-surface-border">
            {data?.recentShipments?.length ? (
              data.recentShipments.slice(0, 5).map((s) => (
                <Link
                  key={s.id}
                  href={`/portal/shipments/${s.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-offwhite transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                      <Package className="h-3.5 w-3.5 text-orange" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900 group-hover:text-orange transition-colors font-mono">
                        {s.trackingNumber}
                      </p>
                      <p className="text-xs text-text-secondary flex items-center gap-1">
                        <Clock className="h-3 w-3 shrink-0" />
                        {formatDate(s.createdAt)}
                        {s.destination && <span className="ml-1 truncate">· {s.destination}</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={s.status} />
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <Package className="h-10 w-10 text-surface-border mx-auto mb-3" />
                <p className="text-sm font-medium text-navy-900 mb-1">No shipments yet</p>
                <p className="text-xs text-text-secondary mb-4">Create your first shipment to get started.</p>
                <Link
                  href="/portal/shipments/new"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange hover:text-orange-600 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Create shipment
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-surface-border p-4">
            <h2 className="font-heading text-sm font-bold text-navy-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "New Shipment", href: "/portal/shipments/new", icon: Plus, primary: true },
                { label: "My Invoices", href: "/portal/invoices", icon: FileText, primary: false },
                { label: "Inventory", href: "/portal/inventory", icon: Boxes, primary: false },
                { label: "All Orders", href: "/portal/orders", icon: ShoppingCart, primary: false },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all group text-sm font-semibold ${
                    link.primary
                      ? "bg-orange text-white hover:bg-orange-600"
                      : "text-navy-900 hover:bg-surface-offwhite"
                  }`}
                >
                  <link.icon className="h-4 w-4 shrink-0" />
                  {link.label}
                  <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-surface-border overflow-hidden flex-1">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-surface-border">
              <h2 className="font-heading text-sm font-bold text-navy-900">Recent Orders</h2>
              <Link href="/portal/orders" className="text-xs text-orange hover:text-orange-600 font-medium">
                View all
              </Link>
            </div>
            <div className="divide-y divide-surface-border">
              {data?.recentOrders?.length ? (
                data.recentOrders.slice(0, 3).map((o) => (
                  <div key={o.id} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-navy-900 truncate">{o.service || "FBA Prep"}</p>
                        <p className="text-xs text-text-secondary">€{o.totalAmount.toFixed(2)}</p>
                      </div>
                    </div>
                    <StatusBadge status={o.status} />
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-xs text-text-secondary">No orders yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
