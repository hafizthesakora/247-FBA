"use client";

import { useEffect, useState } from "react";
import {
  Users, Package, ShoppingCart, FileText,
  ArrowRight, DollarSign, AlertCircle,
  ChevronRight, Activity, Building2, BarChart3,
  TrendingUp, Layers, ClipboardList,
} from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import Link from "next/link";

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

function initials(name: string | null, company: string | null) {
  const src = company || name || "?";
  return src.slice(0, 2).toUpperCase();
}

function avatarColor(str: string) {
  const colors = [
    "bg-blue-500", "bg-purple-500", "bg-indigo-500",
    "bg-cyan-500", "bg-teal-500", "bg-sky-500",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="space-y-6">

      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-600 text-xs font-semibold">All systems operational</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-navy-900">Admin Dashboard</h1>
          <p className="text-text-secondary text-sm">{today}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/analytics"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-border bg-white text-navy-900 text-sm font-semibold hover:shadow-md transition-all"
          >
            <BarChart3 className="h-4 w-4" /> Analytics
          </Link>
          <Link
            href="/admin/shipments"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
          >
            <Package className="h-4 w-4" /> Shipments
          </Link>
        </div>
      </div>

      {/* ─── Revenue + KPIs ─── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Revenue Feature Card */}
        <div className="md:col-span-2 relative overflow-hidden rounded-2xl bg-navy-900 p-6 text-white">
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/20 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-300" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-green-400 font-semibold bg-green-400/10 px-2 py-1 rounded-lg">
                <TrendingUp className="h-3 w-3" /> All time
              </div>
            </div>
            <p className="text-navy-300 text-sm font-medium mb-1">Total Revenue</p>
            <p className="font-heading text-5xl font-bold text-white">
              €{stats ? (stats.totalRevenue / 1000).toFixed(1) : "—"}
              <span className="text-2xl text-navy-300 font-medium">k</span>
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-navy-300">{stats?.totalOrders ?? 0} orders processed</span>
              <Link href="/admin/invoices" className="text-blue-300 hover:text-blue-200 font-medium flex items-center gap-1">
                Invoices <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* KPI Tiles */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            {
              title: "Clients",
              value: stats?.totalClients ?? "—",
              icon: Users,
              href: "/admin/clients",
              sub: "Registered sellers",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              title: "Active",
              value: stats?.activeShipments ?? "—",
              icon: Layers,
              href: "/admin/shipments",
              sub: "In prep / transit",
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              title: "Shipments",
              value: stats?.totalShipments ?? "—",
              icon: Package,
              href: "/admin/shipments",
              sub: "All time",
              color: "text-indigo-600",
              bg: "bg-indigo-50",
            },
            {
              title: "Orders",
              value: stats?.totalOrders ?? "—",
              icon: ShoppingCart,
              href: "/admin/orders",
              sub: "All time",
              color: "text-cyan-600",
              bg: "bg-cyan-50",
            },
            {
              title: "Unpaid",
              value: stats?.unpaidInvoices ?? "—",
              icon: AlertCircle,
              href: "/admin/invoices",
              sub: "Need attention",
              color: "text-red-600",
              bg: "bg-red-50",
              alert: (stats?.unpaidInvoices ?? 0) > 0,
            },
            {
              title: "Analytics",
              value: "→",
              icon: Activity,
              href: "/admin/analytics",
              sub: "View reports",
              color: "text-teal-600",
              bg: "bg-teal-50",
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`rounded-xl bg-white border p-4 hover:shadow-md transition-all group ${
                card.alert ? "border-red-200 ring-1 ring-red-100" : "border-surface-border"
              }`}
            >
              <div className={`h-8 w-8 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
              <p className={`font-heading text-2xl font-bold text-navy-900 ${card.value === "→" ? "text-lg" : ""}`}>
                {card.value}
              </p>
              <p className="text-xs font-semibold text-navy-900 mt-0.5 group-hover:text-blue-600 transition-colors">
                {card.title}
              </p>
              <p className="text-xs text-text-secondary">{card.sub}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── Recent Activity ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Shipments */}
        <div className="bg-white rounded-2xl border border-surface-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border bg-surface-offwhite/50">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-100 flex items-center justify-center">
                <Package className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <h2 className="font-heading text-sm font-bold text-navy-900">Recent Shipments</h2>
            </div>
            <Link href="/admin/shipments" className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-surface-border">
            {stats?.recentShipments?.length ? (
              stats.recentShipments.map((s) => (
                <Link
                  key={s.id}
                  href={`/admin/shipments/${s.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-offwhite transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 ${avatarColor(s.user.company || s.user.name || "?")}`}>
                      {initials(s.user.name, s.user.company)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900 group-hover:text-blue-600 transition-colors font-mono truncate">
                        {s.trackingNumber}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {s.user.company || s.user.name || "Unknown"} · {formatDate(s.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={s.status} />
                    <ArrowRight className="h-3.5 w-3.5 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <Package className="h-8 w-8 text-surface-border mx-auto mb-2" />
                <p className="text-sm text-text-secondary">No shipments yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Clients */}
        <div className="bg-white rounded-2xl border border-surface-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border bg-surface-offwhite/50">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <h2 className="font-heading text-sm font-bold text-navy-900">Recent Clients</h2>
            </div>
            <Link href="/admin/clients" className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-surface-border">
            {stats?.recentClients?.length ? (
              stats.recentClients.map((c) => (
                <Link
                  key={c.id}
                  href={`/admin/clients/${c.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-offwhite transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 ${avatarColor(c.company || c.name || "?")}`}>
                      {initials(c.name, c.company)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900 group-hover:text-blue-600 transition-colors truncate">
                        {c.name || "Unnamed"}
                      </p>
                      <p className="text-xs text-text-secondary truncate">{c.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {c.company && (
                      <div className="flex items-center gap-1 text-xs text-text-secondary bg-surface-offwhite px-2 py-0.5 rounded-full">
                        <Building2 className="h-3 w-3" />
                        <span className="truncate max-w-[80px]">{c.company}</span>
                      </div>
                    )}
                    <ArrowRight className="h-3.5 w-3.5 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <Users className="h-8 w-8 text-surface-border mx-auto mb-2" />
                <p className="text-sm text-text-secondary">No clients yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Management Links ─── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Clients", href: "/admin/clients", icon: Users },
          { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
          { label: "Invoices", href: "/admin/invoices", icon: FileText },
          { label: "Operators", href: "/admin/operators", icon: ClipboardList },
          { label: "Floor Map", href: "/admin/floor", icon: Layers },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-surface-border hover:border-blue-200 hover:shadow-md transition-all group"
          >
            <div className="h-8 w-8 rounded-lg bg-surface-offwhite group-hover:bg-blue-50 flex items-center justify-center shrink-0 transition-colors">
              <link.icon className="h-4 w-4 text-text-secondary group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="text-sm font-semibold text-navy-900 group-hover:text-blue-600 transition-colors">
              {link.label}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-text-secondary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}
