"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Building, Calendar } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";

interface ClientDetail {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  phone: string | null;
  createdAt: string;
  shipments: Array<{
    id: string;
    trackingNumber: string;
    status: string;
    destination: string;
    createdAt: string;
  }>;
  orders: Array<{
    id: string;
    status: string;
    totalAmount: number;
    service: string | null;
    createdAt: string;
  }>;
  invoices: Array<{
    id: string;
    amount: number;
    status: string;
    dueDate: string;
  }>;
}

export default function ClientDetailPage() {
  const params = useParams();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/clients/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setClient(data.client);
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

  if (!client) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary">Client not found</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/clients"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-navy-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Clients
      </Link>

      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          {client.name || "Unnamed Client"}
        </h1>
      </div>

      {/* Client Info */}
      <div className="bg-white rounded-xl border border-surface-border p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-text-secondary" />
            <div>
              <p className="text-xs text-text-secondary">Email</p>
              <p className="text-sm text-navy-900">{client.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-text-secondary" />
            <div>
              <p className="text-xs text-text-secondary">Company</p>
              <p className="text-sm text-navy-900">{client.company || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-text-secondary" />
            <div>
              <p className="text-xs text-text-secondary">Phone</p>
              <p className="text-sm text-navy-900">{client.phone || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-text-secondary" />
            <div>
              <p className="text-xs text-text-secondary">Joined</p>
              <p className="text-sm text-navy-900">
                {new Date(client.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipments */}
        <div className="bg-white rounded-xl border border-surface-border">
          <div className="p-4 border-b border-surface-border">
            <h2 className="font-heading text-base font-semibold text-navy-900">
              Shipments ({client.shipments.length})
            </h2>
          </div>
          <div className="divide-y divide-surface-border max-h-80 overflow-y-auto">
            {client.shipments.length > 0 ? (
              client.shipments.map((s) => (
                <Link
                  key={s.id}
                  href={`/admin/shipments/${s.id}`}
                  className="flex items-center justify-between p-4 hover:bg-surface-offwhite transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-navy-900">
                      {s.trackingNumber}
                    </p>
                    <p className="text-xs text-text-secondary">{s.destination}</p>
                  </div>
                  <StatusBadge status={s.status} />
                </Link>
              ))
            ) : (
              <p className="p-4 text-sm text-text-secondary text-center">
                No shipments
              </p>
            )}
          </div>
        </div>

        {/* Orders & Invoices */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-surface-border">
            <div className="p-4 border-b border-surface-border">
              <h2 className="font-heading text-base font-semibold text-navy-900">
                Orders ({client.orders.length})
              </h2>
            </div>
            <div className="divide-y divide-surface-border max-h-40 overflow-y-auto">
              {client.orders.length > 0 ? (
                client.orders.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-navy-900">
                        {o.service || "FBA Prep"} — €{o.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    <StatusBadge status={o.status} />
                  </div>
                ))
              ) : (
                <p className="p-4 text-sm text-text-secondary text-center">
                  No orders
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-surface-border">
            <div className="p-4 border-b border-surface-border">
              <h2 className="font-heading text-base font-semibold text-navy-900">
                Invoices ({client.invoices.length})
              </h2>
            </div>
            <div className="divide-y divide-surface-border max-h-40 overflow-y-auto">
              {client.invoices.length > 0 ? (
                client.invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-navy-900">
                        €{inv.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-text-secondary">
                        Due {new Date(inv.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <StatusBadge status={inv.status} />
                  </div>
                ))
              ) : (
                <p className="p-4 text-sm text-text-secondary text-center">
                  No invoices
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
