"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package, Plus, Search, Clock,
  MapPin, Boxes, ChevronRight, Filter,
} from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import Link from "next/link";

interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  itemCount: number;
  createdAt: string;
}

const STATUS_STEPS = [
  "DRAFT", "RECEIVED", "INSPECTING", "PREPPING",
  "QUALITY_CHECK", "READY_TO_SHIP", "SHIPPED", "DELIVERED",
];

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  DRAFT:         { label: "Draft",        color: "text-gray-600",   bg: "bg-gray-100" },
  RECEIVED:      { label: "Received",     color: "text-blue-600",   bg: "bg-blue-100" },
  INSPECTING:    { label: "Inspecting",   color: "text-yellow-600", bg: "bg-yellow-100" },
  PREPPING:      { label: "Prepping",     color: "text-purple-600", bg: "bg-purple-100" },
  QUALITY_CHECK: { label: "QC",          color: "text-indigo-600", bg: "bg-indigo-100" },
  READY_TO_SHIP: { label: "Ready",        color: "text-cyan-600",   bg: "bg-cyan-100" },
  SHIPPED:       { label: "Shipped",      color: "text-orange-600", bg: "bg-orange-100" },
  DELIVERED:     { label: "Delivered",    color: "text-green-600",  bg: "bg-green-100" },
};

function ProgressBar({ status }: { status: string }) {
  const step = STATUS_STEPS.indexOf(status);
  const pct = step < 0 ? 0 : Math.round((step / (STATUS_STEPS.length - 1)) * 100);
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-orange to-orange-600 rounded-full transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function ShipmentsPage() {
  const router = useRouter();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch("/api/portal/shipments")
      .then((r) => r.json())
      .then((data) => { setShipments(data.shipments || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = shipments.filter((s) => {
    const matchSearch =
      s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.destination.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Status counts for filter pills
  const counts = STATUS_STEPS.reduce<Record<string, number>>((acc, s) => {
    acc[s] = shipments.filter((sh) => sh.status === s).length;
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
          <h1 className="font-heading text-2xl font-bold text-navy-900">My Shipments</h1>
          <p className="text-text-secondary text-sm mt-0.5">
            {shipments.length} shipment{shipments.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/portal/shipments/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-all hover:scale-[1.02] shadow-sm hover:shadow-md shadow-orange/20"
        >
          <Plus className="h-4 w-4" />
          New Shipment
        </Link>
      </div>

      {shipments.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No shipments yet"
          description="Create your first shipment to get started with FBA prep services."
          actionLabel="Create Shipment"
          actionHref="/portal/shipments/new"
        />
      ) : (
        <>
          {/* ─── Status Pipeline Pills ─── */}
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
              {STATUS_STEPS.filter((s) => counts[s] > 0).map((s) => {
                const meta = STATUS_META[s];
                return (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === s
                        ? `${meta.bg} ${meta.color}`
                        : "bg-surface-offwhite text-text-secondary hover:bg-gray-100"
                    }`}
                  >
                    {meta.label}
                    <span className={`px-1 rounded ${statusFilter === s ? "bg-black/10" : "bg-gray-200"}`}>
                      {counts[s]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Search ─── */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by tracking number or destination..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all"
            />
          </div>

          {/* ─── Shipment Cards ─── */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-surface-border p-10 text-center">
              <Search className="h-8 w-8 text-text-secondary/30 mx-auto mb-2" />
              <p className="text-sm text-text-secondary">No shipments match your search.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((s) => (
                <div
                  key={s.id}
                  onClick={() => router.push(`/portal/shipments/${s.id}`)}
                  className="bg-white rounded-2xl border border-surface-border p-5 hover:border-orange/30 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0 group-hover:bg-orange group-hover:text-white transition-all">
                        <Package className="h-5 w-5 text-orange group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-navy-900 group-hover:text-orange transition-colors">
                          {s.trackingNumber}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1 text-xs text-text-secondary">
                            <MapPin className="h-3 w-3" /> {s.destination}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-text-secondary">
                            <Boxes className="h-3 w-3" /> {s.itemCount} items
                          </span>
                          <span className="flex items-center gap-1 text-xs text-text-secondary">
                            <Clock className="h-3 w-3" /> {new Date(s.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={s.status} />
                      <ChevronRight className="h-4 w-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <ProgressBar status={s.status} />
                  <div className="flex justify-between mt-1.5 px-0.5">
                    <span className="text-xs text-text-secondary/50">Draft</span>
                    <span className="text-xs text-text-secondary/50">Delivered</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <p className="text-center text-xs text-text-secondary py-2">
              Showing {filtered.length} of {shipments.length} shipments
            </p>
          )}
        </>
      )}
    </div>
  );
}
