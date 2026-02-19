"use client";

import { useEffect, useState } from "react";
import { Warehouse, Search } from "lucide-react";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";

interface InventoryItem {
  id: string;
  productName: string;
  sku: string | null;
  quantity: number;
  prepType: string;
  shipmentTrackingNumber: string;
  shipmentStatus: string;
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/portal/inventory")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = items.filter(
    (item) =>
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      (item.sku && item.sku.toLowerCase().includes(search.toLowerCase()))
  );

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
          Inventory
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Current items at the warehouse
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Warehouse}
          title="No inventory items"
          description="Items from your shipments will appear here once received at the warehouse."
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
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    SKU
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Qty
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Prep Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Shipment
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-surface-border last:border-0"
                  >
                    <td className="py-3 px-4 text-navy-900 font-medium">
                      {item.productName}
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      {item.sku || "—"}
                    </td>
                    <td className="py-3 px-4 text-navy-900">{item.quantity}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.prepType} />
                    </td>
                    <td className="py-3 px-4 text-text-secondary text-xs">
                      {item.shipmentTrackingNumber}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.shipmentStatus} />
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
