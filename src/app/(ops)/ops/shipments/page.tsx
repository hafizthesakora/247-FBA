"use client";

import { useEffect, useState } from "react";
import {
  Package, ScanLine, MapPin, Boxes, Clock,
  CheckCircle2, AlertTriangle, Zap,
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
}

const STATUS_ORDER = [
  "DRAFT", "RECEIVED", "INSPECTING", "PREPPING",
  "QUALITY_CHECK", "READY_TO_SHIP", "SHIPPED", "DELIVERED",
];

function StepIndicator({ status }: { status: string }) {
  const step = STATUS_ORDER.indexOf(status);
  return (
    <div className="flex items-center gap-1">
      {STATUS_ORDER.map((s, i) => (
        <div
          key={s}
          className={`h-1.5 flex-1 rounded-full transition-all ${
            i <= step ? "bg-orange" : "bg-gray-100"
          }`}
        />
      ))}
    </div>
  );
}

const PRIORITY_STATUSES = ["RECEIVED", "INSPECTING", "PREPPING", "QUALITY_CHECK"];

export default function OpsShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanLoading, setScanLoading] = useState<string | null>(null);
  const [justScanned, setJustScanned] = useState<string | null>(null);

  function fetchShipments() {
    fetch("/api/ops/shipments")
      .then((r) => r.json())
      .then((d) => { setShipments(d.shipments || []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { fetchShipments(); }, []);

  async function handleScan(shipmentId: string) {
    setScanLoading(shipmentId);
    try {
      await fetch(`/api/ops/shipments/${shipmentId}/scan`, { method: "PUT" });
      setJustScanned(shipmentId);
      setTimeout(() => setJustScanned(null), 2000);
      fetchShipments();
    } finally {
      setScanLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  const active = shipments.filter((s) => PRIORITY_STATUSES.includes(s.status));
  const done = shipments.filter((s) => !PRIORITY_STATUSES.includes(s.status));

  return (
    <div className="space-y-5">
      {/* ─── Header ─── */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-navy-900 to-[#22343f] p-5 md:p-6">
        <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-orange/10 blur-xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl md:text-2xl font-bold text-white">Station Shipments</h1>
            <p className="text-navy-300 text-sm mt-0.5">
              {active.length} active · {done.length} complete
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-orange/20 flex items-center justify-center">
            <ScanLine className="h-6 w-6 text-orange" />
          </div>
        </div>
      </div>

      {/* ─── Stats Strip ─── */}
      {shipments.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "At Station", value: shipments.length, icon: Package, color: "text-orange", bg: "bg-orange/10" },
            { label: "In Progress", value: active.length, icon: Zap, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Delivered", value: shipments.filter((s) => s.status === "DELIVERED").length, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-surface-border p-4 flex items-center gap-3">
              <div className={`h-9 w-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-navy-900">{stat.value}</p>
                <p className="text-xs text-text-secondary">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {shipments.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No shipments"
          description="No shipments are currently assigned to your station."
        />
      ) : (
        <div className="space-y-6">
          {/* ─── Active / Needs Attention ─── */}
          {active.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <h2 className="font-heading text-sm font-bold text-navy-900">Needs Action</h2>
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                  {active.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {active.map((s) => (
                  <div
                    key={s.id}
                    className={`bg-white rounded-2xl border p-5 transition-all ${
                      justScanned === s.id
                        ? "border-green-400 bg-green-50"
                        : "border-surface-border hover:border-orange/30 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                          {justScanned === s.id
                            ? <CheckCircle2 className="h-5 w-5 text-green-500" />
                            : <Package className="h-5 w-5 text-orange" />
                          }
                        </div>
                        <div>
                          <p className="font-heading font-bold text-navy-900 text-sm">{s.trackingNumber}</p>
                          <StatusBadge status={s.status} />
                        </div>
                      </div>
                      <button
                        onClick={() => handleScan(s.id)}
                        disabled={scanLoading === s.id || s.status === "DELIVERED" || justScanned === s.id}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                          justScanned === s.id
                            ? "bg-green-100 text-green-600"
                            : "bg-orange text-white hover:bg-orange-600 hover:scale-[1.02] shadow-sm shadow-orange/20 disabled:opacity-50"
                        }`}
                      >
                        <ScanLine className="h-4 w-4" />
                        {scanLoading === s.id ? "Scanning..." : justScanned === s.id ? "Done!" : "Scan"}
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {s.destination}
                      </span>
                      <span className="flex items-center gap-1">
                        <Boxes className="h-3 w-3" /> {s.itemCount} items
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <StepIndicator status={s.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Completed / Other ─── */}
          {done.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <h2 className="font-heading text-sm font-bold text-navy-900">Ready / Complete</h2>
              </div>
              <div className="bg-white rounded-2xl border border-surface-border overflow-hidden">
                <div className="divide-y divide-surface-border">
                  {done.map((s) => (
                    <div key={s.id} className="flex items-center justify-between px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-900">{s.trackingNumber}</p>
                          <p className="text-xs text-text-secondary">→ {s.destination} · {s.itemCount} items</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={s.status} />
                        {s.status !== "DELIVERED" && (
                          <button
                            onClick={() => handleScan(s.id)}
                            disabled={scanLoading === s.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange/10 text-orange text-xs font-medium hover:bg-orange/20 transition-colors"
                          >
                            <ScanLine className="h-3 w-3" />
                            {scanLoading === s.id ? "..." : "Advance"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
