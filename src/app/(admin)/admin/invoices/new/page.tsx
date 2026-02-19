"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

interface OrderOption {
  id: string;
  totalAmount: number;
  service: string | null;
  user: { name: string | null; company: string | null };
  shipment: { trackingNumber: string };
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    orderId: "",
    amount: "",
    dueDate: "",
  });

  useEffect(() => {
    fetch("/api/admin/orders?uninvoiced=true")
      .then((r) => r.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => {});
  }, []);

  function handleOrderSelect(orderId: string) {
    const order = orders.find((o) => o.id === orderId);
    setForm({
      orderId,
      amount: order ? order.totalAmount.toString() : "",
      dueDate: form.dueDate,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: form.orderId,
          amount: parseFloat(form.amount),
          dueDate: form.dueDate,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create invoice");
        setLoading(false);
        return;
      }

      router.push("/admin/invoices");
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <Link
        href="/admin/invoices"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-navy-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Invoices
      </Link>

      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-6">
        Create Invoice
      </h1>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-surface-border p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            Order
          </label>
          <select
            value={form.orderId}
            onChange={(e) => handleOrderSelect(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
          >
            <option value="">Select an order...</option>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                {o.shipment.trackingNumber} — {o.user.company || o.user.name || "Client"} (€{o.totalAmount.toFixed(2)})
              </option>
            ))}
          </select>
          {orders.length === 0 && (
            <p className="text-xs text-text-secondary mt-1">
              No uninvoiced orders available
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            Amount (€)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/admin/invoices"
            className="px-5 py-2.5 rounded-lg border border-surface-border text-sm font-medium text-navy-900 hover:bg-surface-offwhite transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
