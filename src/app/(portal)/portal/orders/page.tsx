"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { DataTable } from "@/components/portal/data-table";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  service: string | null;
  createdAt: string;
  shipment: {
    trackingNumber: string;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const columns = [
    {
      key: "shipment",
      label: "Shipment",
      render: (item: Order) => (
        <span className="font-medium text-navy-900">
          {item.shipment.trackingNumber}
        </span>
      ),
    },
    {
      key: "service",
      label: "Service",
      render: (item: Order) => item.service || "FBA Prep",
    },
    {
      key: "totalAmount",
      label: "Amount",
      sortable: true,
      render: (item: Order) => `€${item.totalAmount.toFixed(2)}`,
    },
    {
      key: "status",
      label: "Status",
      render: (item: Order) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (item: Order) => new Date(item.createdAt).toLocaleDateString(),
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
          Orders
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Your order history and status
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="No orders yet"
          description="Orders are automatically created when your shipments are processed."
        />
      ) : (
        <div className="bg-white rounded-xl border border-surface-border">
          <DataTable
            columns={columns}
            data={orders}
            keyField="id"
          />
        </div>
      )}
    </div>
  );
}
