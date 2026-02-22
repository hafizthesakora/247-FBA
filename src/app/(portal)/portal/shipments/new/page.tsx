"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

interface ShipmentItem {
  productName: string;
  sku: string;
  quantity: number;
  prepType: string;
}

export default function NewShipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    weight: "",
    notes: "",
  });
  const [items, setItems] = useState<ShipmentItem[]>([
    { productName: "", sku: "", quantity: 1, prepType: "LABELING" },
  ]);

  function addItem() {
    setItems([
      ...items,
      { productName: "", sku: "", quantity: 1, prepType: "LABELING" },
    ]);
  }

  function removeItem(index: number) {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof ShipmentItem, value: string | number) {
    setItems(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/portal/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: form.origin,
          destination: form.destination,
          weight: form.weight ? parseFloat(form.weight) : null,
          notes: form.notes || null,
          items,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create shipment");
        setLoading(false);
        return;
      }

      const data = await res.json();
      router.push(`/portal/shipments/${data.shipment.id}`);
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/portal/shipments"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-navy-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shipments
      </Link>

      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-6">
        Create New Shipment
      </h1>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shipment details */}
        <div className="bg-white rounded-xl border border-surface-border p-6">
          <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
            Shipment Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Origin
              </label>
              <input
                type="text"
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
                placeholder="e.g. Your warehouse"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Destination
              </label>
              <input
                type="text"
                value={form.destination}
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
                required
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
                placeholder="e.g. Amazon FBA Warehouse"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
                placeholder="Optional"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-navy-900 mb-1.5">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange resize-none"
              placeholder="Special instructions..."
            />
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl border border-surface-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-base font-semibold text-navy-900">
              Items
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1 text-sm text-orange hover:text-orange-600 font-medium"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </button>
          </div>
          <div className="space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-end p-4 rounded-lg bg-surface-offwhite"
              >
                <div>
                  <label className="block text-xs font-medium text-navy-900 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={item.productName}
                    onChange={(e) =>
                      updateItem(i, "productName", e.target.value)
                    }
                    required
                    className="w-full px-3 py-2 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
                    placeholder="Product name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-900 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={item.sku}
                    onChange={(e) => updateItem(i, "sku", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
                    placeholder="SKU"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-900 mb-1">
                    Qty
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(i, "quantity", parseInt(e.target.value) || 1)
                    }
                    className="w-20 px-3 py-2 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-900 mb-1">
                    Prep Type
                  </label>
                  <select
                    value={item.prepType}
                    onChange={(e) => updateItem(i, "prepType", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-border text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
                  >
                    <option value="LABELING">Labeling</option>
                    <option value="POLY_BAG">Poly Bag</option>
                    <option value="BUBBLE_WRAP">Bubble Wrap</option>
                    <option value="BUNDLING">Bundling</option>
                    <option value="INSPECTION">Inspection</option>
                    <option value="CUSTOM">Custom</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  disabled={items.length === 1}
                  className="p-2 text-text-secondary hover:text-red-500 disabled:opacity-30 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/portal/shipments"
            className="px-5 py-2.5 rounded-lg border border-surface-border text-sm font-medium text-navy-900 hover:bg-surface-offwhite transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Shipment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
