"use client";

import { useEffect, useState } from "react";
import {
  Ship, Search, ChevronDown, X, MapPin, Phone, Package,
  User, Weight, Clock, CheckCircle2, Circle, Save,
} from "lucide-react";

interface GhanaShipment {
  id: string;
  bookingRef: string;
  status: string;
  senderName: string;
  senderPhone: string | null;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  description: string;
  weight: number | null;
  volume: number | null;
  containerRef: string | null;
  vesselName: string | null;
  estimatedArrival: string | null;
  adminNotes: string | null;
  createdAt: string;
  user: { name: string | null; email: string; company: string | null };
}

const ALL_STATUSES = [
  "BOOKING_RECEIVED", "GOODS_COLLECTED", "AT_WAREHOUSE_DE", "CUSTOMS_EXPORT",
  "ON_VESSEL", "IN_TRANSIT", "AT_PORT_GH", "CUSTOMS_IMPORT", "OUT_FOR_DELIVERY", "DELIVERED",
];

const STATUS_STEPS = [
  { key: "BOOKING_RECEIVED",  label: "Booking Received" },
  { key: "GOODS_COLLECTED",   label: "Goods Collected" },
  { key: "AT_WAREHOUSE_DE",   label: "At Warehouse DE" },
  { key: "CUSTOMS_EXPORT",    label: "Export Customs" },
  { key: "ON_VESSEL",         label: "On Vessel" },
  { key: "IN_TRANSIT",        label: "In Transit" },
  { key: "AT_PORT_GH",        label: "At Port Ghana" },
  { key: "CUSTOMS_IMPORT",    label: "Import Customs" },
  { key: "OUT_FOR_DELIVERY",  label: "Out for Delivery" },
  { key: "DELIVERED",         label: "Delivered" },
];

const STATUS_COLOR: Record<string, string> = {
  BOOKING_RECEIVED: "bg-gray-100 text-gray-700",
  GOODS_COLLECTED:  "bg-blue-100 text-blue-700",
  AT_WAREHOUSE_DE:  "bg-indigo-100 text-indigo-700",
  CUSTOMS_EXPORT:   "bg-violet-100 text-violet-700",
  ON_VESSEL:        "bg-orange-100 text-orange-700",
  IN_TRANSIT:       "bg-amber-100 text-amber-700",
  AT_PORT_GH:       "bg-yellow-100 text-yellow-800",
  CUSTOMS_IMPORT:   "bg-lime-100 text-lime-700",
  OUT_FOR_DELIVERY: "bg-teal-100 text-teal-700",
  DELIVERED:        "bg-green-100 text-green-700",
};

function formatStatus(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function TrackingTimeline({ status }: { status: string }) {
  const currentIdx = STATUS_STEPS.findIndex((s) => s.key === status);
  return (
    <div className="flex items-center gap-0 overflow-x-auto pb-1">
      {STATUS_STEPS.map((step, i) => {
        const done = i <= currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.key} className="flex items-center shrink-0">
            <div className="flex flex-col items-center gap-1">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center
                ${active ? "bg-orange ring-2 ring-orange/30" : done ? "bg-green-500" : "bg-gray-200"}`}>
                {done && !active
                  ? <CheckCircle2 className="h-3 w-3 text-white" />
                  : <Circle className={`h-2.5 w-2.5 ${active ? "text-white" : "text-gray-400"}`} />
                }
              </div>
              <span className={`text-[8px] font-medium text-center leading-tight max-w-[44px]
                ${active ? "text-orange" : done ? "text-green-600" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div className={`h-0.5 w-4 shrink-0 mx-0.5 -mt-4 ${i < currentIdx ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AdminGhanaLinePage() {
  const [shipments, setShipments] = useState<GhanaShipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selected, setSelected] = useState<GhanaShipment | null>(null);
  const [editing, setEditing] = useState<{
    status: string; containerRef: string; vesselName: string;
    estimatedArrival: string; adminNotes: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    fetch("/api/admin/ghana-line")
      .then((r) => r.json())
      .then((d) => { setShipments(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openDetail(s: GhanaShipment) {
    setSelected(s);
    setEditing({
      status: s.status,
      containerRef: s.containerRef || "",
      vesselName: s.vesselName || "",
      estimatedArrival: s.estimatedArrival ? s.estimatedArrival.split("T")[0] : "",
      adminNotes: s.adminNotes || "",
    });
  }

  async function handleSave() {
    if (!selected || !editing) return;
    setSaving(true);
    const res = await fetch(`/api/admin/ghana-line/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: editing.status,
        containerRef: editing.containerRef || null,
        vesselName: editing.vesselName || null,
        estimatedArrival: editing.estimatedArrival || null,
        adminNotes: editing.adminNotes || null,
      }),
    });
    if (res.ok) {
      load();
      setSelected(null);
      setEditing(null);
    }
    setSaving(false);
  }

  const filtered = shipments.filter((s) => {
    const matchStatus = filterStatus === "ALL" || s.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q || s.bookingRef.toLowerCase().includes(q)
      || s.receiverName.toLowerCase().includes(q)
      || (s.user.company || "").toLowerCase().includes(q)
      || (s.user.name || "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  // Stats
  const total = shipments.length;
  const inTransit = shipments.filter(s => ["ON_VESSEL","IN_TRANSIT"].includes(s.status)).length;
  const delivered = shipments.filter(s => s.status === "DELIVERED").length;
  const pending = shipments.filter(s => ["BOOKING_RECEIVED","GOODS_COLLECTED","AT_WAREHOUSE_DE"].includes(s.status)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-xl bg-orange flex items-center justify-center">
              <Ship className="h-4 w-4 text-white" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-navy-900">Ghana Line</h1>
          </div>
          <p className="text-text-secondary text-sm">Manage Germany → Ghana cargo shipments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Bookings", value: total, color: "text-navy-900", bg: "bg-navy-900/5" },
          { label: "Pending Pickup", value: pending, color: "text-amber-700", bg: "bg-amber-50" },
          { label: "In Transit", value: inTransit, color: "text-blue-700", bg: "bg-blue-50" },
          { label: "Delivered", value: delivered, color: "text-green-700", bg: "bg-green-50" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl ${stat.bg} p-4`}>
            <p className={`font-heading text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs font-semibold text-text-secondary mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
            placeholder="Search booking ref, client, receiver…"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="appearance-none pl-4 pr-8 py-2.5 text-sm border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange bg-white"
          >
            <option value="ALL">All Statuses</option>
            {ALL_STATUSES.map(s => (
              <option key={s} value={s}>{formatStatus(s)}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Update Modal */}
      {selected && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border sticky top-0 bg-white">
              <div>
                <h2 className="font-heading text-lg font-bold text-navy-900">Update Shipment</h2>
                <p className="text-xs text-text-secondary font-mono">{selected.bookingRef}</p>
              </div>
              <button onClick={() => { setSelected(null); setEditing(null); }}
                className="p-1.5 rounded-lg hover:bg-surface-offwhite transition-colors">
                <X className="h-4 w-4 text-text-secondary" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Timeline */}
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Current Progress</p>
                <TrackingTimeline status={editing.status} />
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-offwhite rounded-xl p-4">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1 flex items-center gap-1">
                    <User className="h-3 w-3" /> Client
                  </p>
                  <p className="text-sm font-semibold text-navy-900">{selected.user.company || selected.user.name}</p>
                  <p className="text-xs text-text-secondary">{selected.user.email}</p>
                </div>
                <div className="bg-surface-offwhite rounded-xl p-4">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Receiver
                  </p>
                  <p className="text-sm font-semibold text-navy-900">{selected.receiverName}</p>
                  <p className="text-xs text-text-secondary flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {selected.receiverPhone}
                  </p>
                </div>
                <div className="bg-surface-offwhite rounded-xl p-4 col-span-2">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Package className="h-3 w-3" /> Cargo
                  </p>
                  <p className="text-sm text-navy-900">{selected.description}</p>
                  {selected.weight && (
                    <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                      <Weight className="h-3 w-3" /> {selected.weight} kg
                    </p>
                  )}
                </div>
              </div>

              {/* Editable Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Status</label>
                  <select value={editing.status} onChange={e => setEditing({...editing, status: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange">
                    {ALL_STATUSES.map(s => (
                      <option key={s} value={s}>{formatStatus(s)}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Container Ref</label>
                    <input value={editing.containerRef} onChange={e => setEditing({...editing, containerRef: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      placeholder="ABCU1234567" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Vessel Name</label>
                    <input value={editing.vesselName} onChange={e => setEditing({...editing, vesselName: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      placeholder="MSC Accra" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Estimated Arrival</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-secondary pointer-events-none" />
                    <input type="date" value={editing.estimatedArrival} onChange={e => setEditing({...editing, estimatedArrival: e.target.value})}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Admin Notes</label>
                  <textarea rows={3} value={editing.adminNotes} onChange={e => setEditing({...editing, adminNotes: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                    placeholder="Internal notes (not visible to client)" />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button onClick={() => { setSelected(null); setEditing(null); }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-surface-border text-sm font-semibold text-navy-900 hover:bg-surface-offwhite transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange text-white text-sm font-semibold hover:bg-orange-hover transition-all disabled:opacity-60">
                  <Save className="h-4 w-4" />
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-surface-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border bg-surface-offwhite/50">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-orange/10 flex items-center justify-center">
              <Ship className="h-3.5 w-3.5 text-orange" />
            </div>
            <h2 className="font-heading text-sm font-bold text-navy-900">All Ghana Line Shipments</h2>
          </div>
          <span className="text-xs text-text-secondary">{filtered.length} of {total}</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin h-7 w-7 border-2 border-orange border-t-transparent rounded-full" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Ship className="h-12 w-12 text-surface-border mx-auto mb-3" />
            <p className="text-sm font-semibold text-navy-900">No shipments found</p>
            <p className="text-xs text-text-secondary mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-surface-offwhite/30">
                  <th className="px-5 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Booking Ref</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Client</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Receiver</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">ETA</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3 text-right text-xs font-bold text-text-secondary uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-offwhite/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-mono text-xs font-semibold text-navy-900">{s.bookingRef.slice(0, 14)}…</p>
                      {s.containerRef && <p className="text-[10px] text-text-secondary font-mono mt-0.5">{s.containerRef}</p>}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-navy-900 text-xs">{s.user.company || s.user.name || "—"}</p>
                      <p className="text-[10px] text-text-secondary">{s.user.email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-navy-900 text-xs">{s.receiverName}</p>
                      <p className="text-[10px] text-text-secondary truncate max-w-[120px]">{s.receiverAddress.split(",")[0]}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_COLOR[s.status] || "bg-gray-100 text-gray-700"}`}>
                        {formatStatus(s.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text-secondary">
                      {s.estimatedArrival ? formatDate(s.estimatedArrival) : "—"}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text-secondary">{formatDate(s.createdAt)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button onClick={() => openDetail(s)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange/10 text-orange text-xs font-semibold hover:bg-orange hover:text-white transition-colors">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
