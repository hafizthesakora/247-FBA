"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package, Search, Clock, Boxes, Building2,
  ChevronRight, Filter, TrendingUp,
} from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";

interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  itemCount: number;
  createdAt: string;
  user: { name: string | null; company: string | null };
}

const STATUSES = [
  { key: "DRAFT",         label: "Draft",         color: "bg-gray-100 text-gray-600" },
  { key: "RECEIVED",      label: "Received",      color: "bg-blue-100 text-blue-600" },
  { key: "INSPECTING",    label: "Inspecting",    color: "bg-yellow-100 text-yellow-600" },
  { key: "PREPPING",      label: "Prepping",      color: "bg-purple-100 text-purple-600" },
  { key: "QUALITY_CHECK", label: "Quality Check", color: "bg-indigo-100 text-indigo-600" },
  { key: "READY_TO_SHIP", label: "Ready to Ship", color: "bg-cyan-100 text-cyan-600" },
  { key: "SHIPPED",       label: "Shipped",       color: "bg-orange-100 text-orange-600" },
  { key: "DELIVERED",     label: "Delivered",     color: "bg-green-100 text-green-600" },
];

function avatarColor(str: string) {
  const colors = [
    "bg-orange-500", "bg-blue-500", "bg-purple-500",
    "bg-green-500", "bg-pink-500", "bg-indigo-500",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function initials(name: string | null, company: string | null) {
  const src = company || name || "?";
  return src.slice(0, 2).toUpperCase();
}

export default function AdminShipmentsPage() {
  const router = useRouter();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch("/api/admin/shipments")
      .then((r) => r.json())
      .then((data) => { setShipments(data.shipments || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = shipments.filter((s) => {
    const matchesSearch =
      s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      (s.user.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.user.company || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s.key] = shipments.filter((sh) => sh.status === s.key).length;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-900">All Shipments</h1>
          <p className="text-text-secondary text-sm mt-0.5">
            {shipments.length} total · {counts["DELIVERED"] ?? 0} delivered
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary bg-white border border-surface-border rounded-xl px-3 py-2">
          <TrendingUp className="h-4 w-4 text-orange" />
          <span className="font-medium">{counts["SHIPPED"] ?? 0}</span> in transit
        </div>
      </div>

      {shipments.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No shipments"
          description="Shipments will appear here once clients create them."
        />
      ) : (
        <>
          {/* ─── Status Filter Pills ─── */}
          <div className="bg-white rounded-2xl border border-surface-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-text-secondary" />
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Filter by Status</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter("")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !statusFilter ? "bg-navy-900 text-white" : "bg-surface-offwhite text-text-secondary hover:bg-gray-100"
                }`}
              >
                All <span className="bg-white/20 px-1 rounded">{shipments.length}</span>
              </button>
              {STATUSES.filter((s) => counts[s.key] > 0).map((s) => (
                <button
                  key={s.key}
                  onClick={() => setStatusFilter(statusFilter === s.key ? "" : s.key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === s.key ? s.color : "bg-surface-offwhite text-text-secondary hover:bg-gray-100"
                  }`}
                >
                  {s.label}
                  <span className={`px-1 rounded ${statusFilter === s.key ? "bg-black/10" : "bg-gray-200"}`}>
                    {counts[s.key]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ─── Search ─── */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by tracking number, client name or company..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all"
            />
          </div>

          {/* ─── Table ─── */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-surface-border p-10 text-center">
              <Search className="h-8 w-8 text-text-secondary/30 mx-auto mb-2" />
              <p className="text-sm text-text-secondary">No shipments match your search.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-surface-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-offwhite border-b border-surface-border">
                      <th className="text-left py-3 px-5 text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Shipment
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Client
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider hidden md:table-cell">
                        Destination
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider hidden sm:table-cell">
                        Items
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-text-secondary uppercase tracking-wider hidden lg:table-cell">
                        Date
                      </th>
                      <th className="py-3 px-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s, i) => (
                      <tr
                        key={s.id}
                        onClick={() => router.push(`/admin/shipments/${s.id}`)}
                        className={`border-b border-surface-border last:border-0 cursor-pointer hover:bg-surface-offwhite transition-colors group ${
                          i % 2 === 0 ? "bg-white" : "bg-surface-offwhite/40"
                        }`}
                      >
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                              <Package className="h-3.5 w-3.5 text-orange" />
                            </div>
                            <span className="font-semibold text-sm text-navy-900 group-hover:text-orange transition-colors">
                              {s.trackingNumber}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${avatarColor(s.user.company || s.user.name || "?")}`}>
                              {initials(s.user.name, s.user.company)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-navy-900">
                                {s.user.company || s.user.name || "—"}
                              </p>
                              {s.user.company && s.user.name && (
                                <p className="text-xs text-text-secondary">{s.user.name}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={s.status} />
                        </td>
                        <td className="py-3.5 px-4 hidden md:table-cell">
                          <span className="flex items-center gap-1 text-sm text-text-secondary">
                            <Building2 className="h-3.5 w-3.5 shrink-0" />
                            {s.destination}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 hidden sm:table-cell">
                          <span className="flex items-center gap-1 text-sm text-navy-900 font-medium">
                            <Boxes className="h-3.5 w-3.5 text-text-secondary" />
                            {s.itemCount}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-sm text-text-secondary hidden lg:table-cell">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {new Date(s.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <ChevronRight className="h-4 w-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-surface-border bg-surface-offwhite/50 flex items-center justify-between">
                <p className="text-xs text-text-secondary">
                  Showing <span className="font-semibold text-navy-900">{filtered.length}</span> of <span className="font-semibold text-navy-900">{shipments.length}</span> shipments
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
