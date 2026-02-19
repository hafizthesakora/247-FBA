"use client";

import { useEffect, useState } from "react";
import { Map, Plus, Loader2 } from "lucide-react";
import { FloorMap } from "@/components/ops/floor-map";
import { EmptyState } from "@/components/portal/empty-state";

interface Operator {
  id: string;
  name: string | null;
  email: string;
}

interface Station {
  id: string;
  name: string;
  type: string;
  status: string;
  capacity: number;
  currentLoad: number;
  assignedOperator: { id: string; name: string | null; email: string } | null;
  _count: { tasks: number };
}

export default function FloorManagementPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "RECEIVING",
    capacity: "10",
    assignedOperatorId: "",
  });

  function fetchData() {
    Promise.all([
      fetch("/api/admin/floor").then((r) => r.json()),
      fetch("/api/admin/operators").then((r) => r.json()),
    ])
      .then(([floorData, opsData]) => {
        setStations(floorData.stations || []);
        setOperators(opsData.operators || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);

    try {
      const res = await fetch("/api/admin/floor/stations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          capacity: parseInt(form.capacity),
          assignedOperatorId: form.assignedOperatorId || null,
        }),
      });

      if (res.ok) {
        setShowForm(false);
        setForm({ name: "", type: "RECEIVING", capacity: "10", assignedOperatorId: "" });
        fetchData();
      }
    } catch {
      // ignore
    }
    setFormLoading(false);
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
            Floor Management
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage warehouse stations
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Station
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-surface-border p-6 mb-6">
          <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
            New Station
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Station Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
                placeholder="e.g., Receiving Bay A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              >
                <option value="RECEIVING">Receiving</option>
                <option value="INSPECTION">Inspection</option>
                <option value="PREP">Prep</option>
                <option value="QC">QC</option>
                <option value="SHIPPING">Shipping</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Capacity
              </label>
              <input
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                min="1"
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Assigned Operator
              </label>
              <select
                value={form.assignedOperatorId}
                onChange={(e) =>
                  setForm({ ...form, assignedOperatorId: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              >
                <option value="">Unassigned</option>
                {operators.map((op) => (
                  <option key={op.id} value={op.id}>
                    {op.name || op.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={formLoading}
                className="px-5 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {formLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Station
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-lg border border-surface-border text-sm font-medium hover:bg-surface-offwhite transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {stations.length === 0 ? (
        <EmptyState
          icon={Map}
          title="No stations yet"
          description="Create stations to organize your warehouse floor."
          actionLabel="Add Station"
        />
      ) : (
        <FloorMap stations={stations} />
      )}
    </div>
  );
}
