import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || (session.user.role !== "OPERATOR" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [pendingTasks, inProgressTasks, completedToday, shipmentsAtStation, activeTasks] =
    await Promise.all([
      prisma.task.count({
        where: { assignedToId: userId, status: "PENDING" },
      }),
      prisma.task.count({
        where: { assignedToId: userId, status: "IN_PROGRESS" },
      }),
      prisma.task.count({
        where: {
          assignedToId: userId,
          status: "COMPLETED",
          completedAt: { gte: today },
        },
      }),
      prisma.task.count({
        where: {
          assignedToId: userId,
          shipmentId: { not: null },
          status: { in: ["PENDING", "IN_PROGRESS"] },
        },
      }),
      prisma.task.findMany({
        where: {
          assignedToId: userId,
          status: { in: ["PENDING", "IN_PROGRESS"] },
        },
        include: {
          shipment: { select: { trackingNumber: true } },
          station: { select: { name: true } },
        },
        orderBy: [
          { priority: "desc" },
          { createdAt: "desc" },
        ],
        take: 10,
      }),
    ]);

  return NextResponse.json({
    stats: {
      pendingTasks,
      inProgressTasks,
      completedToday,
      shipmentsAtStation,
    },
    activeTasks,
  });
}
