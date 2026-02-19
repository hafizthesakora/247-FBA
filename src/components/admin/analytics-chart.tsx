"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#1e2d3d", "#e8842c", "#2a3f54", "#f5a623", "#6b7280"];

interface ChartProps {
  data: Record<string, unknown>[];
  title: string;
}

export function RevenueChart({ data, title }: ChartProps) {
  return (
    <div className="bg-white rounded-xl border border-surface-border p-4">
      <h3 className="font-medium text-navy-900 text-sm mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
          <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#e8842c"
            strokeWidth={2}
            dot={{ fill: "#e8842c", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ThroughputChart({ data, title }: ChartProps) {
  return (
    <div className="bg-white rounded-xl border border-surface-border p-4">
      <h3 className="font-medium text-navy-900 text-sm mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
          <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
          <Tooltip />
          <Bar dataKey="shipments" fill="#1e2d3d" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" fill="#e8842c" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ShipmentVolumeChart({ data, title }: ChartProps) {
  return (
    <div className="bg-white rounded-xl border border-surface-border p-4">
      <h3 className="font-medium text-navy-900 text-sm mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OrderTrendsChart({ data, title }: ChartProps) {
  return (
    <div className="bg-white rounded-xl border border-surface-border p-4">
      <h3 className="font-medium text-navy-900 text-sm mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#6b7280" />
          <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#1e2d3d"
            fill="#1e2d3d"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#e8842c"
            fill="#e8842c"
            fillOpacity={0.1}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
