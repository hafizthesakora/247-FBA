import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Monthly revenue (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const invoices = await prisma.invoice.findMany({
    where: { status: "PAID", paidAt: { gte: sixMonthsAgo } },
    select: { amount: true, paidAt: true },
  });

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const revenueByMonth: Record<string, number> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    revenueByMonth[key] = 0;
  }
  invoices.forEach((inv) => {
    if (inv.paidAt) {
      const key = `${monthNames[inv.paidAt.getMonth()]} ${inv.paidAt.getFullYear()}`;
      if (key in revenueByMonth) revenueByMonth[key] += inv.amount;
    }
  });
  const revenueData = Object.entries(revenueByMonth).map(([name, revenue]) => ({
    name,
    revenue,
  }));

  // Weekly throughput (last 4 weeks)
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

  const shipments = await prisma.shipment.findMany({
    where: { createdAt: { gte: fourWeeksAgo } },
    select: { status: true, createdAt: true },
  });

  const throughputData = [];
  for (let w = 3; w >= 0; w--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (w + 1) * 7);
    const weekEnd = new Date();
    weekEnd.setDate(weekEnd.getDate() - w * 7);
    const weekShipments = shipments.filter(
      (s) => s.createdAt >= weekStart && s.createdAt < weekEnd
    );
    throughputData.push({
      name: `Week ${4 - w}`,
      shipments: weekShipments.length,
      completed: weekShipments.filter((s) => s.status === "DELIVERED").length,
    });
  }

  // Status distribution
  const statusCounts = await prisma.shipment.groupBy({
    by: ["status"],
    _count: true,
  });
  const statusData = statusCounts.map((s) => ({
    name: s.status.replace(/_/g, " "),
    value: s._count,
  }));

  // Order trends (last 6 months)
  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { status: true, createdAt: true },
  });

  const ordersByMonth: Record<string, { orders: number; completed: number }> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${monthNames[d.getMonth()]}`;
    ordersByMonth[key] = { orders: 0, completed: 0 };
  }
  orders.forEach((o) => {
    const key = monthNames[o.createdAt.getMonth()];
    if (key in ordersByMonth) {
      ordersByMonth[key].orders++;
      if (o.status === "COMPLETED") ordersByMonth[key].completed++;
    }
  });
  const orderTrendsData = Object.entries(ordersByMonth).map(([name, data]) => ({
    name,
    ...data,
  }));

  // Summary stats
  const [totalRevenue, totalShipments, totalOrders, activeOperators] =
    await Promise.all([
      prisma.invoice.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
      }),
      prisma.shipment.count(),
      prisma.order.count(),
      prisma.user.count({ where: { role: "OPERATOR" } }),
    ]);

  return NextResponse.json({
    stats: {
      totalRevenue: totalRevenue._sum.amount || 0,
      totalShipments,
      totalOrders,
      activeOperators,
    },
    revenueData,
    throughputData,
    statusData,
    orderTrendsData,
  });
}
