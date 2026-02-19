"use client";

import { useEffect, useState } from "react";
import { FloorMap } from "@/components/ops/floor-map";

interface Station {
  id: string;
  name: string;
  type: string;
  status: string;
  capacity: number;
  currentLoad: number;
  assignedOperator: { name: string | null } | null;
  _count: { tasks: number };
}

export default function OpsFloorPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ops/floor")
      .then((r) => r.json())
      .then((d) => {
        setStations(d.stations || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
          Warehouse Floor
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Real-time view of all stations
        </p>
      </div>

      <FloorMap stations={stations} />
    </div>
  );
}
