import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    totalClients,
    totalShipments,
    activeShipments,
    totalOrders,
    revenueResult,
    unpaidInvoices,
    recentShipments,
    recentClients,
    shipmentsByStatus,
    totalOperators,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.shipment.count(),
    prisma.shipment.count({
      where: { status: { notIn: ["DELIVERED", "DRAFT"] } },
    }),
    prisma.order.count(),
    prisma.invoice.aggregate({
      where: { status: "PAID" },
      _sum: { amount: true },
    }),
    prisma.invoice.count({
      where: { status: { in: ["SENT", "OVERDUE"] } },
    }),
    prisma.shipment.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        trackingNumber: true,
        status: true,
        createdAt: true,
        user: { select: { name: true, company: true } },
      },
    }),
    prisma.user.findMany({
      where: { role: "CLIENT" },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, company: true, createdAt: true },
    }),
    prisma.shipment.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.user.count({ where: { role: "OPERATOR" } }),
  ]);

  const pipeline = Object.fromEntries(
    shipmentsByStatus.map((s) => [s.status, s._count.status])
  );

  return NextResponse.json({
    totalClients,
    totalShipments,
    activeShipments,
    totalOrders,
    totalRevenue: revenueResult._sum.amount || 0,
    unpaidInvoices,
    recentShipments,
    recentClients,
    pipeline,
    totalOperators,
  });
}
