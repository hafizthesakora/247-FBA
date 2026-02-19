"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Search } from "lucide-react";
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
  user: { name: string | null; company: string | null };
}

export default function AdminShipmentsPage() {
  const router = useRouter();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch("/api/admin/shipments")
      .then((r) => r.json())
      .then((data) => {
        setShipments(data.shipments || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = shipments.filter((s) => {
    const matchesSearch =
      s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      (s.user.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.user.company || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          All Shipments
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          View and manage all client shipments
        </p>
      </div>

      {shipments.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No shipments"
          description="Shipments will appear here once clients create them."
        />
      ) : (
        <div className="bg-white rounded-xl border border-surface-border">
          <div className="p-4 border-b border-surface-border flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search shipments or clients..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
            >
              <option value="">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="RECEIVED">Received</option>
              <option value="INSPECTING">Inspecting</option>
              <option value="PREPPING">Prepping</option>
              <option value="QUALITY_CHECK">Quality Check</option>
              <option value="READY_TO_SHIP">Ready to Ship</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Tracking #
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Client
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Destination
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Items
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => router.push(`/admin/shipments/${s.id}`)}
                    className="border-b border-surface-border last:border-0 cursor-pointer hover:bg-surface-offwhite transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-navy-900">
                      {s.trackingNumber}
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      {s.user.company || s.user.name || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      {s.destination}
                    </td>
                    <td className="py-3 px-4 text-navy-900">{s.itemCount}</td>
                    <td className="py-3 px-4 text-text-secondary">
                      {new Date(s.createdAt).toLocaleDateString()}
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
