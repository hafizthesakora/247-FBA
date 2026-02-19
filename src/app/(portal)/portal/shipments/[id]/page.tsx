"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, Clock, Weight } from "lucide-react";
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

const statusTimeline = [
  "DRAFT",
  "RECEIVED",
  "INSPECTING",
  "PREPPING",
  "QUALITY_CHECK",
  "READY_TO_SHIP",
  "SHIPPED",
  "DELIVERED",
];

export default function ShipmentDetailPage() {
  const params = useParams();
  const [shipment, setShipment] = useState<ShipmentDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/portal/shipments/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setShipment(data.shipment);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

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
        <Link href="/portal/shipments" className="text-orange text-sm mt-2 inline-block">
          Back to shipments
        </Link>
      </div>
    );
  }

  const currentIdx = statusTimeline.indexOf(shipment.status);

  return (
    <div>
      <Link
        href="/portal/shipments"
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
            Created {new Date(shipment.createdAt).toLocaleDateString()}
          </p>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-xl border border-surface-border p-6 mb-6">
        <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
          Shipment Progress
        </h2>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {statusTimeline.map((status, idx) => (
            <div key={status} className="flex items-center">
              <div className="flex flex-col items-center min-w-[80px]">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx <= currentIdx
                      ? "bg-orange text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`text-[10px] mt-1 text-center ${
                    idx <= currentIdx ? "text-navy-900 font-medium" : "text-text-secondary"
                  }`}
                >
                  {status.replace(/_/g, " ")}
                </span>
              </div>
              {idx < statusTimeline.length - 1 && (
                <div
                  className={`h-0.5 w-4 ${
                    idx < currentIdx ? "bg-orange" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info */}
          <div className="bg-white rounded-xl border border-surface-border p-6">
            <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
              Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-text-secondary">Origin</p>
                  <p className="text-sm text-navy-900">{shipment.origin}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-text-secondary">Destination</p>
                  <p className="text-sm text-navy-900">{shipment.destination}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-text-secondary">Items</p>
                  <p className="text-sm text-navy-900">{shipment.itemCount} items</p>
                </div>
              </div>
              {shipment.weight && (
                <div className="flex items-start gap-3">
                  <Weight className="h-5 w-5 text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-xs text-text-secondary">Weight</p>
                    <p className="text-sm text-navy-900">{shipment.weight} kg</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-text-secondary">Last Updated</p>
                  <p className="text-sm text-navy-900">
                    {new Date(shipment.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            {shipment.notes && (
              <div className="mt-4 pt-4 border-t border-surface-border">
                <p className="text-xs text-text-secondary mb-1">Notes</p>
                <p className="text-sm text-navy-900">{shipment.notes}</p>
              </div>
            )}
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-xl border border-surface-border p-6">
            <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
              Shipment Items
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-text-secondary uppercase">
                      Product
                    </th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-text-secondary uppercase">
                      SKU
                    </th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-text-secondary uppercase">
                      Qty
                    </th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-text-secondary uppercase">
                      Prep
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shipment.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-surface-border last:border-0"
                    >
                      <td className="py-2 px-3 text-navy-900">
                        {item.productName}
                      </td>
                      <td className="py-2 px-3 text-text-secondary">
                        {item.sku || "—"}
                      </td>
                      <td className="py-2 px-3 text-navy-900">
                        {item.quantity}
                      </td>
                      <td className="py-2 px-3">
                        <StatusBadge status={item.prepType} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order info sidebar */}
        <div>
          {shipment.order && (
            <div className="bg-white rounded-xl border border-surface-border p-6">
              <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
                Order
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-text-secondary">Status</p>
                  <StatusBadge status={shipment.order.status} />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Service</p>
                  <p className="text-sm text-navy-900">
                    {shipment.order.service || "FBA Prep"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Total</p>
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
