import { StationCard } from "./station-card";

interface Station {
  id: string;
  name: string;
  type: string;
  status: string;
  capacity: number;
  currentLoad: number;
  assignedOperator?: { name: string | null } | null;
  _count?: { tasks: number };
}

interface FloorMapProps {
  stations: Station[];
}

export function FloorMap({ stations }: FloorMapProps) {
  if (stations.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary text-sm">
        No stations configured yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stations.map((station) => (
        <StationCard key={station.id} station={station} />
      ))}
    </div>
  );
}
