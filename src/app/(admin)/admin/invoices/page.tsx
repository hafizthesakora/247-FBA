"use client";

import { useEffect, useState } from "react";
import { FileText, Plus } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import Link from "next/link";

interface Invoice {
  id: string;
  amount: number;
  status: string;
  dueDate: string;
  paidAt: string | null;
  createdAt: string;
  user: { name: string | null; company: string | null };
  order: { shipment: { trackingNumber: string } };
}

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/invoices")
      .then((r) => r.json())
      .then((data) => {
        setInvoices(data.invoices || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/admin/invoices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const data = await res.json();
      setInvoices(
        invoices.map((inv) => (inv.id === id ? { ...inv, ...data.invoice } : inv))
      );
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-900">
            Invoices
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage client invoices
          </p>
        </div>
        <Link
          href="/admin/invoices/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No invoices"
          description="Create invoices for client orders."
          actionLabel="Create Invoice"
          actionHref="/admin/invoices/new"
        />
      ) : (
        <div className="bg-white rounded-xl border border-surface-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Invoice</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Client</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Shipment</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Due Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-surface-border last:border-0">
                  <td className="py-3 px-4 font-medium text-navy-900">
                    INV-{inv.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {inv.user.company || inv.user.name || "—"}
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {inv.order.shipment.trackingNumber}
                  </td>
                  <td className="py-3 px-4 font-semibold text-navy-900">
                    €{inv.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4"><StatusBadge status={inv.status} /></td>
                  <td className="py-3 px-4 text-text-secondary">
                    {new Date(inv.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={inv.status}
                      onChange={(e) => updateStatus(inv.id, e.target.value)}
                      className="px-2 py-1 rounded border border-surface-border text-xs focus:outline-none focus:ring-1 focus:ring-orange"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="SENT">Sent</option>
                      <option value="PAID">Paid</option>
                      <option value="OVERDUE">Overdue</option>
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
