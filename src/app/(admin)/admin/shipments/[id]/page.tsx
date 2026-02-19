"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";

interface ShipmentDetail {
  id: string;
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  itemCount: number;
  weight: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  user: { id: string; name: string | null; email: string; company: string | null };
  items: Array<{
    id: string;
    productName: string;
    sku: string | null;
    quantity: number;
    prepType: string;
  }>;
  order: {
    id: string;
    status: string;
    totalAmount: number;
    service: string | null;
  } | null;
}

const allStatuses = [
  "DRAFT",
  "RECEIVED",
  "INSPECTING",
  "PREPPING",
  "QUALITY_CHECK",
  "READY_TO_SHIP",
  "SHIPPED",
  "DELIVERED",
];

export default function AdminShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [shipment, setShipment] = useState<ShipmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetch(`/api/admin/shipments/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setShipment(data.shipment);
        setNewStatus(data.shipment?.status || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  async function handleStatusUpdate() {
    if (!newStatus || newStatus === shipment?.status) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/shipments/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        setShipment(data.shipment);
      }
    } catch {
      // ignore
    }

    setUpdating(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary">Shipment not found</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/shipments"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-navy-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shipments
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-900">
            {shipment.trackingNumber}
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Client: {shipment.user.company || shipment.user.name || shipment.user.email}
          </p>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      {/* Status Update */}
      <div className="bg-white rounded-xl border border-surface-border p-6 mb-6">
        <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
          Update Status
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="flex-1 max-w-xs px-4 py-2.5 rounded-lg border border-surface-border text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
          >
            {allStatuses.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={updating || newStatus === shipment.status}
            className="px-5 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {updating && <Loader2 className="h-4 w-4 animate-spin" />}
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipment Info */}
          <div className="bg-white rounded-xl border border-surface-border p-6">
            <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
              Shipment Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary text-xs">Origin</p>
                <p className="text-navy-900">{shipment.origin}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs">Destination</p>
                <p className="text-navy-900">{shipment.destination}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs">Items</p>
                <p className="text-navy-900">{shipment.itemCount}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs">Weight</p>
                <p className="text-navy-900">
                  {shipment.weight ? `${shipment.weight} kg` : "—"}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-xs">Created</p>
                <p className="text-navy-900">
                  {new Date(shipment.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-xs">Updated</p>
                <p className="text-navy-900">
                  {new Date(shipment.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            {shipment.notes && (
              <div className="mt-4 pt-4 border-t border-surface-border">
                <p className="text-text-secondary text-xs mb-1">Notes</p>
                <p className="text-sm text-navy-900">{shipment.notes}</p>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="bg-white rounded-xl border border-surface-border p-6">
            <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
              Items ({shipment.items.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-text-secondary uppercase">Product</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-text-secondary uppercase">SKU</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-text-secondary uppercase">Qty</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-text-secondary uppercase">Prep</th>
                  </tr>
                </thead>
                <tbody>
                  {shipment.items.map((item) => (
                    <tr key={item.id} className="border-b border-surface-border last:border-0">
                      <td className="py-2 px-3 text-navy-900">{item.productName}</td>
                      <td className="py-2 px-3 text-text-secondary">{item.sku || "—"}</td>
                      <td className="py-2 px-3 text-navy-900">{item.quantity}</td>
                      <td className="py-2 px-3"><StatusBadge status={item.prepType} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client */}
          <div className="bg-white rounded-xl border border-surface-border p-6">
            <h2 className="font-heading text-base font-semibold text-navy-900 mb-3">
              Client
            </h2>
            <p className="text-sm font-medium text-navy-900">{shipment.user.name || "—"}</p>
            <p className="text-xs text-text-secondary">{shipment.user.email}</p>
            {shipment.user.company && (
              <p className="text-xs text-text-secondary mt-1">{shipment.user.company}</p>
            )}
            <Link
              href={`/admin/clients/${shipment.user.id}`}
              className="text-xs text-orange hover:text-orange-600 font-medium mt-2 inline-block"
            >
              View Client
            </Link>
          </div>

          {/* Order */}
          {shipment.order && (
            <div className="bg-white rounded-xl border border-surface-border p-6">
              <h2 className="font-heading text-base font-semibold text-navy-900 mb-3">
                Order
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-text-secondary">Status</p>
                  <StatusBadge status={shipment.order.status} />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Amount</p>
                  <p className="text-lg font-bold text-navy-900">
                    €{shipment.order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
