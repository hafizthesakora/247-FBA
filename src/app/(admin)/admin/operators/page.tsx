"use client";

import { useEffect, useState } from "react";
import { HardHat, Plus, Loader2 } from "lucide-react";
import { DataTable } from "@/components/portal/data-table";
import { EmptyState } from "@/components/portal/empty-state";

interface Operator {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  createdAt: string;
  _count: {
    assignedTasks: number;
    assignedStations: number;
  };
}

export default function OperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  function fetchOperators() {
    fetch("/api/admin/operators")
      .then((r) => r.json())
      .then((d) => {
        setOperators(d.operators || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    fetchOperators();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const res = await fetch("/api/admin/operators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error || "Failed to create operator");
      } else {
        setShowForm(false);
        setForm({ name: "", email: "", password: "", phone: "" });
        fetchOperators();
      }
    } catch {
      setFormError("Something went wrong");
    }
    setFormLoading(false);
  }

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (item: Operator) => (
        <span className="font-medium text-navy-900">
          {item.name || "—"}
        </span>
      ),
    },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", render: (item: Operator) => item.phone || "—" },
    {
      key: "tasks",
      label: "Tasks",
      render: (item: Operator) => item._count.assignedTasks,
    },
    {
      key: "stations",
      label: "Stations",
      render: (item: Operator) => item._count.assignedStations,
    },
    {
      key: "createdAt",
      label: "Joined",
      sortable: true,
      render: (item: Operator) =>
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
            Operators
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage warehouse operators
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Operator
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-surface-border p-6 mb-6">
          <h2 className="font-heading text-base font-semibold text-navy-900 mb-4">
            New Operator
          </h2>
          {formError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={8}
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={formLoading}
                className="px-5 py-2.5 rounded-lg bg-orange text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {formLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Operator
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

      {operators.length === 0 ? (
        <EmptyState
          icon={HardHat}
          title="No operators yet"
          description="Add operators to manage warehouse operations."
          actionLabel="Add Operator"
        />
      ) : (
        <div className="bg-white rounded-xl border border-surface-border">
          <DataTable columns={columns} data={operators} keyField="id" />
        </div>
      )}
    </div>
  );
}
