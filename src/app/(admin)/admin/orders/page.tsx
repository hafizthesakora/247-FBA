"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  service: string | null;
  createdAt: string;
  user: { name: string | null; company: string | null };
  shipment: { trackingNumber: string };
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-orange border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          All Orders
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Manage client orders
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="No orders"
          description="Orders will appear here once shipments are processed."
        />
      ) : (
        <div className="bg-white rounded-xl border border-surface-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Shipment</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Client</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Service</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-surface-border last:border-0">
                  <td className="py-3 px-4 font-medium text-navy-900">{o.shipment.trackingNumber}</td>
                  <td className="py-3 px-4 text-text-secondary">{o.user.company || o.user.name || "—"}</td>
                  <td className="py-3 px-4 text-text-secondary">{o.service || "FBA Prep"}</td>
                  <td className="py-3 px-4 font-semibold text-navy-900">€{o.totalAmount.toFixed(2)}</td>
                  <td className="py-3 px-4"><StatusBadge status={o.status} /></td>
                  <td className="py-3 px-4 text-text-secondary">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="px-2 py-1 rounded border border-surface-border text-xs focus:outline-none focus:ring-1 focus:ring-orange"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
