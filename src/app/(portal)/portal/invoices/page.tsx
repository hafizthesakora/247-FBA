"use client";

import { useEffect, useState } from "react";
import { FileText, Download } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";

interface Invoice {
  id: string;
  amount: number;
  status: string;
  dueDate: string;
  paidAt: string | null;
  createdAt: string;
  order: {
    id: string;
    service: string | null;
    shipment: {
      trackingNumber: string;
    };
  };
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/invoices")
      .then((r) => r.json())
      .then((data) => {
        setInvoices(data.invoices || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
          Invoices
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          View and manage your invoices
        </p>
      </div>

      {invoices.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No invoices yet"
          description="Invoices will appear here once created by our team for your orders."
        />
      ) : (
        <div className="bg-white rounded-xl border border-surface-border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Invoice
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Shipment
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Due Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-surface-border last:border-0"
                  >
                    <td className="py-3 px-4 font-medium text-navy-900">
                      INV-{inv.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      {inv.order.shipment.trackingNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-navy-900">
                      €{inv.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      {new Date(inv.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button className="inline-flex items-center gap-1 text-xs text-orange hover:text-orange-600 font-medium">
                        <Download className="h-3 w-3" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
