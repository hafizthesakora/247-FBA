"use client";

import { useEffect, useState } from "react";
import {
  Users, Package, ShoppingCart, FileText,
  DollarSign, AlertCircle, Activity, HardHat,
  ArrowUpRight, ChevronRight, ArrowRight,
  TrendingUp, Boxes, Ship,
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
  totalOperators: number;
  pipeline: Record<string, number>;
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

const PIPELINE_STAGES = [
  { key: "RECEIVED",      label: "Received",  color: "bg-sky-500"     },
  { key: "INSPECTING",    label: "Inspect",   color: "bg-violet-500"  },
  { key: "PREPPING",      label: "Prep",      color: "bg-amber-500"   },
  { key: "QUALITY_CHECK", label: "QC",        color: "bg-blue-500"    },
  { key: "READY_TO_SHIP", label: "Ready",     color: "bg-teal-500"    },
  { key: "SHIPPED",       label: "Shipped",   color: "bg-orange"      },
  { key: "DELIVERED",     label: "Delivered", color: "bg-green-500"   },
];

function initials(name: string | null, company: string | null) {
  const src = company || name || "?";
  return src.slice(0, 2).toUpperCase();
}

function avatarHue(str: string) {
  const palette = [
    "bg-blue-500", "bg-violet-500", "bg-indigo-500",
    "bg-cyan-500",  "bg-teal-500",  "bg-rose-500", "bg-amber-500",
  ];
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function SparkLine() {
  const pts = [18, 22, 19, 31, 28, 35, 42, 38, 45, 52, 48, 58];
  const max = Math.max(...pts);
  const w = 80, h = 28;
  const d = pts
    .map((v, i) => `${(i / (pts.length - 1)) * w},${h - (v / max) * h}`)
    .join(" L ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline
        points={d.replace(/,/g, ",")}
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={(11 / 11) * w} cy={h - (pts[11] / max) * h} r="2.5" fill="white" />
    </svg>
  );
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

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long",
  });

  const pipelineTotal = stats
    ? PIPELINE_STAGES.reduce((s, st) => s + (stats.pipeline[st.key] || 0), 0)
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-[3px] border-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-600">All systems operational</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-navy-900">Overview</h1>
          <p className="text-text-secondary text-sm">{today}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/analytics"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-surface-border bg-white text-navy-900 text-sm font-semibold hover:shadow-md hover:border-orange/30 transition-all">
            <Activity className="h-3.5 w-3.5 text-orange" /> Analytics
          </Link>
          <Link href="/admin/shipments"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-all shadow-sm">
            <Package className="h-3.5 w-3.5" /> Shipments
          </Link>
        </div>
      </div>

      {/* ── Hero: Revenue + 4 KPIs ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Revenue Hero */}
        <div className="col-span-2 relative overflow-hidden rounded-2xl bg-navy-900 p-5 text-white">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 opacity-30 pointer-events-none pr-4 pb-3">
            <SparkLine />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-xl bg-orange/20 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-orange" />
              </div>
              <div className="flex items-center gap-1.5 ml-auto text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" /> ALL TIME
              </div>
            </div>
            <p className="text-white/50 text-xs font-semibold tracking-wide uppercase mb-0.5">Total Revenue</p>
            <p className="font-heading font-bold leading-none">
              <span className="text-4xl text-white">€{stats ? Math.floor(stats.totalRevenue / 1000) : "—"}</span>
              <span className="text-xl text-white/40">.{stats ? Math.round((stats.totalRevenue % 1000) / 10).toString().padStart(2, "0") : "00"}k</span>
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-white/40 text-xs">{stats?.totalOrders ?? 0} orders processed</p>
              </div>
              <Link href="/admin/invoices" className="flex items-center gap-1 text-orange text-xs font-semibold hover:text-orange/80 transition-colors">
                View invoices <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Clients */}
        <Link href="/admin/clients"
          className="group rounded-2xl bg-white border border-surface-border p-5 hover:border-orange/30 hover:shadow-lg hover:shadow-orange/5 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="h-4.5 w-4.5 text-blue-600" />
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="font-heading text-3xl font-bold text-navy-900">{stats?.totalClients ?? "—"}</p>
          <p className="text-xs font-semibold text-navy-900 mt-0.5">Clients</p>
          <p className="text-[11px] text-text-secondary mt-0.5">Registered sellers</p>
        </Link>

        {/* Active Shipments */}
        <Link href="/admin/shipments"
          className="group rounded-2xl bg-white border border-surface-border p-5 hover:border-orange/30 hover:shadow-lg hover:shadow-orange/5 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Boxes className="h-4.5 w-4.5 text-amber-600" />
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="font-heading text-3xl font-bold text-navy-900">{stats?.activeShipments ?? "—"}</p>
          <p className="text-xs font-semibold text-navy-900 mt-0.5">Active</p>
          <p className="text-[11px] text-text-secondary mt-0.5">In prep or transit</p>
        </Link>
      </div>

      {/* ── Secondary KPIs ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { title: "Operators",    value: stats?.totalOperators ?? "—", icon: HardHat,     href: "/admin/operators", accent: "text-violet-600",  bg: "bg-violet-50"  },
          { title: "All Shipments",value: stats?.totalShipments  ?? "—", icon: Package,     href: "/admin/shipments", accent: "text-indigo-600",  bg: "bg-indigo-50"  },
          { title: "Orders",       value: stats?.totalOrders     ?? "—", icon: ShoppingCart,href: "/admin/orders",    accent: "text-cyan-600",    bg: "bg-cyan-50"    },
          {
            title: "Unpaid",
            value: stats?.unpaidInvoices ?? "—",
            icon: AlertCircle,
            href: "/admin/invoices",
            accent: (stats?.unpaidInvoices ?? 0) > 0 ? "text-red-600" : "text-teal-600",
            bg: (stats?.unpaidInvoices ?? 0) > 0 ? "bg-red-50" : "bg-teal-50",
            alert: (stats?.unpaidInvoices ?? 0) > 0,
          },
        ].map((c) => (
          <Link key={c.title} href={c.href}
            className={`group rounded-2xl bg-white p-4 border transition-all hover:shadow-md ${c.alert ? "border-red-200 ring-1 ring-red-100" : "border-surface-border hover:border-orange/25"}`}>
            <div className={`h-8 w-8 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
              <c.icon className={`h-4 w-4 ${c.accent}`} />
            </div>
            <p className="font-heading text-2xl font-bold text-navy-900">{c.value}</p>
            <p className="text-xs font-semibold text-navy-900 mt-0.5 group-hover:text-orange transition-colors">{c.title}</p>
          </Link>
        ))}
      </div>

      {/* ── Shipment Pipeline ── */}
      {stats && pipelineTotal > 0 && (
        <div className="bg-white rounded-2xl border border-surface-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-orange/10 flex items-center justify-center">
                <Activity className="h-3.5 w-3.5 text-orange" />
              </div>
              <h2 className="font-heading text-sm font-bold text-navy-900">Shipment Pipeline</h2>
            </div>
            <span className="text-xs text-text-secondary">{pipelineTotal} total in pipeline</span>
          </div>
          {/* Bar */}
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-4">
            {PIPELINE_STAGES.map((stage) => {
              const count = stats.pipeline[stage.key] || 0;
              const pct = pipelineTotal > 0 ? (count / pipelineTotal) * 100 : 0;
              if (!count) return null;
              return (
                <div
                  key={stage.key}
                  title={`${stage.label}: ${count}`}
                  className={`${stage.color} transition-all rounded-full`}
                  style={{ width: `${pct}%`, minWidth: count ? "12px" : "0" }}
                />
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {PIPELINE_STAGES.map((stage) => {
              const count = stats.pipeline[stage.key] || 0;
              if (!count) return null;
              return (
                <div key={stage.key} className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${stage.color}`} />
                  <span className="text-[11px] text-text-secondary">{stage.label}</span>
                  <span className="text-[11px] font-bold text-navy-900">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Two-column activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent Shipments */}
        <div className="bg-white rounded-2xl border border-surface-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-orange/10 flex items-center justify-center">
                <Package className="h-3 w-3 text-orange" />
              </div>
              <h2 className="font-heading text-sm font-bold text-navy-900">Recent Shipments</h2>
            </div>
            <Link href="/admin/shipments" className="text-[11px] font-semibold text-orange hover:text-orange/80 flex items-center gap-0.5 transition-colors">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-surface-border">
            {stats?.recentShipments?.length ? (
              stats.recentShipments.map((s) => (
                <Link key={s.id} href={`/admin/shipments/${s.id}`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-surface-offwhite/60 transition-colors group">
                  <div className={`h-8 w-8 rounded-xl flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${avatarHue(s.user.company || s.user.name || "?")}`}>
                    {initials(s.user.name, s.user.company)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-navy-900 font-mono truncate group-hover:text-orange transition-colors">
                      {s.trackingNumber.slice(0, 16)}
                    </p>
                    <p className="text-[11px] text-text-secondary truncate">
                      {s.user.company || s.user.name || "—"} · {fmt(s.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={s.status} />
                    <ArrowRight className="h-3 w-3 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-5 py-10 text-center">
                <Package className="h-7 w-7 text-surface-border mx-auto mb-2" />
                <p className="text-xs text-text-secondary">No shipments yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Clients */}
        <div className="bg-white rounded-2xl border border-surface-border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="h-3 w-3 text-blue-600" />
              </div>
              <h2 className="font-heading text-sm font-bold text-navy-900">Recent Clients</h2>
            </div>
            <Link href="/admin/clients" className="text-[11px] font-semibold text-orange hover:text-orange/80 flex items-center gap-0.5 transition-colors">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-surface-border">
            {stats?.recentClients?.length ? (
              stats.recentClients.map((c) => (
                <Link key={c.id} href={`/admin/clients/${c.id}`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-surface-offwhite/60 transition-colors group">
                  <div className={`h-8 w-8 rounded-xl flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${avatarHue(c.company || c.name || "?")}`}>
                    {initials(c.name, c.company)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-navy-900 truncate group-hover:text-orange transition-colors">
                      {c.name || "Unnamed"}
                    </p>
                    <p className="text-[11px] text-text-secondary truncate">{c.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {c.company && (
                      <span className="text-[10px] font-medium text-text-secondary bg-surface-offwhite px-2 py-0.5 rounded-full max-w-[80px] truncate">
                        {c.company}
                      </span>
                    )}
                    <span className="text-[10px] text-text-secondary">{fmt(c.createdAt)}</span>
                    <ArrowRight className="h-3 w-3 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-5 py-10 text-center">
                <Users className="h-7 w-7 text-surface-border mx-auto mb-2" />
                <p className="text-xs text-text-secondary">No clients yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Quick Access ── */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {[
          { label: "Clients",    href: "/admin/clients",    icon: Users,        color: "text-blue-600",   bg: "bg-blue-50"   },
          { label: "Orders",     href: "/admin/orders",     icon: ShoppingCart, color: "text-cyan-600",   bg: "bg-cyan-50"   },
          { label: "Invoices",   href: "/admin/invoices",   icon: FileText,     color: "text-teal-600",   bg: "bg-teal-50"   },
          { label: "Operators",  href: "/admin/operators",  icon: HardHat,      color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Ghana Line", href: "/admin/ghana-line", icon: Ship,         color: "text-orange",     bg: "bg-orange/10" },
          { label: "Activity",   href: "/admin/activity",   icon: Activity,     color: "text-rose-600",   bg: "bg-rose-50"   },
        ].map((item) => (
          <Link key={item.href} href={item.href}
            className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-surface-border hover:border-orange/30 hover:shadow-md hover:shadow-orange/5 transition-all text-center">
            <div className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
            <span className="text-[11px] font-semibold text-navy-900 group-hover:text-orange transition-colors leading-tight">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

    </div>
  );
}
