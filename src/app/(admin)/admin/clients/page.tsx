"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Search } from "lucide-react";
import { EmptyState } from "@/components/portal/empty-state";

interface Client {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  phone: string | null;
  createdAt: string;
  _count: {
    shipments: number;
    orders: number;
  };
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((r) => r.json())
      .then((data) => {
        setClients(data.clients || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = clients.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company || "").toLowerCase().includes(search.toLowerCase())
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
          Clients
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Manage your client accounts
        </p>
      </div>

      {clients.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No clients yet"
          description="Clients will appear here once they register."
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
                placeholder="Search clients..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-surface-border text-sm focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Shipments
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Orders
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => router.push(`/admin/clients/${client.id}`)}
                    className="border-b border-surface-border last:border-0 cursor-pointer hover:bg-surface-offwhite transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-navy-900">
                      {client.name || "—"}
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      {client.email}
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      {client.company || "—"}
                    </td>
                    <td className="py-3 px-4 text-navy-900">
                      {client._count.shipments}
                    </td>
                    <td className="py-3 px-4 text-navy-900">
                      {client._count.orders}
                    </td>
                    <td className="py-3 px-4 text-text-secondary">
                      {new Date(client.createdAt).toLocaleDateString()}
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
