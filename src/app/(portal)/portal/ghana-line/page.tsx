"use client";

import { useEffect, useState } from "react";
import {
  Ship, Plus, X, ChevronRight, Package, MapPin,
  Phone, User, Weight, Clock, CheckCircle2, Circle,
} from "lucide-react";

interface GhanaShipment {
  id: string;
  bookingRef: string;
  status: string;
  senderName: string;
  receiverName: string;
  receiverAddress: string;
  description: string;
  weight: number | null;
  containerRef: string | null;
  vesselName: string | null;
  estimatedArrival: string | null;
  createdAt: string;
}

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
    <div className="mt-4 px-1">
      <div className="flex items-center gap-0 overflow-x-auto pb-2">
        {STATUS_STEPS.map((step, i) => {
          const done = i <= currentIdx;
          const active = i === currentIdx;
          return (
            <div key={step.key} className="flex items-center shrink-0">
              <div className="flex flex-col items-center gap-1">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors
                  ${active ? "bg-orange ring-2 ring-orange/30" : done ? "bg-green-500" : "bg-gray-200"}`}>
                  {done && !active
                    ? <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                    : <Circle className={`h-3 w-3 ${active ? "text-white" : "text-gray-400"}`} />
                  }
                </div>
                <span className={`text-[9px] font-medium text-center leading-tight max-w-[52px]
                  ${active ? "text-orange" : done ? "text-green-600" : "text-gray-400"}`}>
                  {step.label}
                </span>
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div className={`h-0.5 w-6 shrink-0 mx-0.5 -mt-4 ${i < currentIdx ? "bg-green-400" : "bg-gray-200"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function GhanaLinePage() {
  const [shipments, setShipments] = useState<GhanaShipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<GhanaShipment | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    senderName: "", senderPhone: "",
    receiverName: "", receiverPhone: "", receiverAddress: "",
    description: "", weight: "", volume: "",
  });

  function load() {
    fetch("/api/portal/ghana-line")
      .then((r) => r.json())
      .then((d) => { setShipments(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/portal/ghana-line", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowForm(false);
      setForm({ senderName: "", senderPhone: "", receiverName: "", receiverPhone: "", receiverAddress: "", description: "", weight: "", volume: "" });
      load();
    }
    setSubmitting(false);
  }

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
          <p className="text-text-secondary text-sm">Germany → Ghana cargo shipping. Book and track your shipments.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange text-white text-sm font-semibold hover:bg-orange-hover transition-all shadow-md shadow-orange/20"
        >
          <Plus className="h-4 w-4" /> Book Shipment
        </button>
      </div>

      {/* How It Works strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { n: "1", title: "Book Online", desc: "Submit cargo details and receiver info" },
          { n: "2", title: "We Collect", desc: "Goods picked up from your location in Germany" },
          { n: "3", title: "Sea Freight", desc: "Consolidated container shipping to Accra" },
          { n: "4", title: "Delivery GH", desc: "Customs clearance and doorstep delivery" },
        ].map((step) => (
          <div key={step.n} className="bg-white rounded-xl border border-surface-border p-4">
            <div className="h-7 w-7 rounded-lg bg-orange/10 text-orange text-xs font-bold flex items-center justify-center mb-2">{step.n}</div>
            <p className="text-sm font-semibold text-navy-900">{step.title}</p>
            <p className="text-xs text-text-secondary mt-0.5">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-orange" />
                <h2 className="font-heading text-lg font-bold text-navy-900">Book Ghana Line Shipment</h2>
              </div>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-surface-offwhite transition-colors">
                <X className="h-4 w-4 text-text-secondary" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Sender */}
              <div>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Sender (Germany)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Full Name *</label>
                    <input required value={form.senderName} onChange={e => setForm({...form, senderName: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Phone</label>
                    <input value={form.senderPhone} onChange={e => setForm({...form, senderPhone: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      placeholder="+49..." />
                  </div>
                </div>
              </div>

              {/* Receiver */}
              <div>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Receiver (Ghana)</h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Full Name *</label>
                    <input required value={form.receiverName} onChange={e => setForm({...form, receiverName: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      placeholder="Receiver name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Phone *</label>
                    <input required value={form.receiverPhone} onChange={e => setForm({...form, receiverPhone: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      placeholder="+233..." />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Delivery Address *</label>
                  <textarea required rows={2} value={form.receiverAddress} onChange={e => setForm({...form, receiverAddress: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                    placeholder="Street, City, Region, Ghana" />
                </div>
              </div>

              {/* Cargo */}
              <div>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Cargo Details</h3>
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-navy-900 mb-1">Description *</label>
                  <textarea required rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange resize-none"
                    placeholder="e.g. 2x TVs, 1 refrigerator, clothing items..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Weight (kg)</label>
                    <input type="number" min="0" step="0.1" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      placeholder="0.0" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-900 mb-1">Volume (m³)</label>
                    <input type="number" min="0" step="0.01" value={form.volume} onChange={e => setForm({...form, volume: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                      placeholder="0.00" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-surface-border text-sm font-semibold text-navy-900 hover:bg-surface-offwhite transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-orange text-white text-sm font-semibold hover:bg-orange-hover transition-all disabled:opacity-60">
                  {submitting ? "Booking…" : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border sticky top-0 bg-white z-10">
              <div>
                <h2 className="font-heading text-lg font-bold text-navy-900">Shipment Detail</h2>
                <p className="text-xs text-text-secondary font-mono">{selected.bookingRef}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-surface-offwhite transition-colors">
                <X className="h-4 w-4 text-text-secondary" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* Status */}
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Shipment Status</p>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${STATUS_COLOR[selected.status] || "bg-gray-100 text-gray-700"}`}>
                  <Ship className="h-3 w-3" />
                  {formatStatus(selected.status)}
                </span>
                <TrackingTimeline status={selected.status} />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-offwhite rounded-xl p-4">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1">
                    <User className="h-3 w-3" /> Sender
                  </p>
                  <p className="text-sm font-semibold text-navy-900">{selected.senderName}</p>
                </div>
                <div className="bg-surface-offwhite rounded-xl p-4">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1">
                    <User className="h-3 w-3" /> Receiver
                  </p>
                  <p className="text-sm font-semibold text-navy-900">{selected.receiverName}</p>
                  <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {selected.receiverName}
                  </p>
                </div>
                <div className="bg-surface-offwhite rounded-xl p-4 col-span-2">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Delivery Address
                  </p>
                  <p className="text-sm text-navy-900">{selected.receiverAddress}</p>
                </div>
                <div className="bg-surface-offwhite rounded-xl p-4">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Package className="h-3 w-3" /> Cargo
                  </p>
                  <p className="text-sm text-navy-900">{selected.description}</p>
                  {selected.weight && (
                    <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                      <Weight className="h-3 w-3" /> {selected.weight} kg
                    </p>
                  )}
                </div>
                <div className="bg-surface-offwhite rounded-xl p-4">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Ship className="h-3 w-3" /> Vessel Info
                  </p>
                  {selected.vesselName
                    ? <p className="text-sm font-semibold text-navy-900">{selected.vesselName}</p>
                    : <p className="text-sm text-text-secondary italic">Not assigned yet</p>
                  }
                  {selected.containerRef && (
                    <p className="text-xs text-text-secondary mt-1 font-mono">{selected.containerRef}</p>
                  )}
                  {selected.estimatedArrival && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> ETA {formatDate(selected.estimatedArrival)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shipments List */}
      <div className="bg-white rounded-2xl border border-surface-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border bg-surface-offwhite/50">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-orange/10 flex items-center justify-center">
              <Ship className="h-3.5 w-3.5 text-orange" />
            </div>
            <h2 className="font-heading text-sm font-bold text-navy-900">My Ghana Line Shipments</h2>
          </div>
          <span className="text-xs text-text-secondary">{shipments.length} booking{shipments.length !== 1 ? "s" : ""}</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin h-7 w-7 border-2 border-orange border-t-transparent rounded-full" />
          </div>
        ) : shipments.length === 0 ? (
          <div className="py-16 text-center">
            <Ship className="h-12 w-12 text-surface-border mx-auto mb-3" />
            <p className="text-sm font-semibold text-navy-900">No shipments yet</p>
            <p className="text-xs text-text-secondary mt-1 mb-4">Book your first Germany → Ghana shipment</p>
            <button onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange text-white text-sm font-semibold hover:bg-orange-hover transition-all">
              <Plus className="h-4 w-4" /> Book Shipment
            </button>
          </div>
        ) : (
          <div className="divide-y divide-surface-border">
            {shipments.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-offwhite transition-colors text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                    <Ship className="h-5 w-5 text-orange" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900 font-mono truncate">{s.bookingRef.slice(0, 12)}…</p>
                    <p className="text-xs text-text-secondary truncate">
                      To: {s.receiverName} · {s.receiverAddress.split(",")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUS_COLOR[s.status] || "bg-gray-100 text-gray-700"}`}>
                    {formatStatus(s.status)}
                  </span>
                  <span className="text-xs text-text-secondary">{formatDate(s.createdAt)}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
