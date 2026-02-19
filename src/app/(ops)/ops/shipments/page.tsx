"use client";

import { useEffect, useState } from "react";
import { Package, ScanLine } from "lucide-react";
import { DataTable } from "@/components/portal/data-table";
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

export default function OpsShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanLoading, setScanLoading] = useState<string | null>(null);

  function fetchShipments() {
    fetch("/api/ops/shipments")
      .then((r) => r.json())
      .then((d) => {
        setShipments(d.shipments || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    fetchShipments();
  }, []);

  async function handleScan(shipmentId: string) {
    setScanLoading(shipmentId);
    try {
      await fetch(`/api/ops/shipments/${shipmentId}/scan`, {
        method: "PUT",
      });
      fetchShipments();
    } finally {
      setScanLoading(null);
    }
  }

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
    {
      key: "actions",
      label: "",
      render: (item: Shipment) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleScan(item.id);
          }}
          disabled={scanLoading === item.id || item.status === "DELIVERED"}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-orange/10 text-orange text-xs font-medium hover:bg-orange/20 transition-colors disabled:opacity-50"
        >
          <ScanLine className="h-3 w-3" />
          {scanLoading === item.id ? "..." : "Scan"}
        </button>
      ),
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
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          Shipments
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Shipments at your station
        </p>
      </div>

      {shipments.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No shipments"
          description="No shipments are currently assigned to your station."
        />
      ) : (
        <div className="bg-white rounded-xl border border-surface-border">
          <DataTable
            columns={columns}
            data={shipments}
            keyField="id"
          />
        </div>
      )}
    </div>
  );
}
