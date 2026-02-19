import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [activeShipments, pendingOrders, unpaidInvoices, totalShipments, recentShipments, recentOrders] =
    await Promise.all([
      prisma.shipment.count({
        where: { userId, status: { notIn: ["DELIVERED", "DRAFT"] } },
      }),
      prisma.order.count({
        where: { userId, status: "PENDING" },
      }),
      prisma.invoice.count({
        where: { userId, status: { in: ["SENT", "OVERDUE"] } },
      }),
      prisma.shipment.count({ where: { userId } }),
      prisma.shipment.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, trackingNumber: true, status: true, destination: true, createdAt: true },
      }),
      prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, status: true, totalAmount: true, service: true, createdAt: true },
      }),
    ]);

  return NextResponse.json({
    stats: { activeShipments, pendingOrders, unpaidInvoices, totalShipments },
    recentShipments,
    recentOrders,
  });
}
