"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Plus, Search } from "lucide-react";
import { DataTable } from "@/components/portal/data-table";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import Link from "next/link";

interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  itemCount: number;
  createdAt: string;
}

export default function ShipmentsPage() {
  const router = useRouter();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/portal/shipments")
      .then((r) => r.json())
      .then((data) => {
        setShipments(data.shipments || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = shipments.filter(
    (s) =>
      s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.destination.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "trackingNumber", label: "Tracking #", sortable: true },
    {
      key: "status",
      label: "Status",
      render: (item: Shipment) => <StatusBadge status={item.status} />,
    },
    { key: "origin", label: "Origin", sortable: true },
    { key: "destination", label: "Destination", sortable: true },
    { key: "itemCount", label: "Items", sortable: true },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (item: Shipment) =>
        new Date(item.createdAt).toLocaleDateString(),
    },
  ];

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
            Shipments
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage and track your shipments
          </p>
        </div>
        <Link
          href="/portal/shipments/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Shipment
        </Link>
      </div>

      {shipments.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No shipments yet"
          description="Create your first shipment to get started with FBA prep services."
          actionLabel="Create Shipment"
          actionHref="/portal/shipments/new"
        />
      ) : (
        <div className="bg-white rounded-xl border border-surface-border">
          <div className="p-4 border-b border-surface-border">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search shipments..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              />
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filtered}
            keyField="id"
            onRowClick={(item) =>
              router.push(`/portal/shipments/${item.id}`)
            }
          />
        </div>
      )}
    </div>
  );
}
