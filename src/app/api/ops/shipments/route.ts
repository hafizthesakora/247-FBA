import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || (session.user.role !== "OPERATOR" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get shipments linked to this operator's tasks
  const tasks = await prisma.task.findMany({
    where: {
      assignedToId: session.user.id,
      shipmentId: { not: null },
    },
    select: { shipmentId: true },
  });

  const shipmentIds = tasks
    .map((t) => t.shipmentId)
    .filter((id): id is string => id !== null);

  const shipments = await prisma.shipment.findMany({
    where: { id: { in: shipmentIds } },
    select: {
      id: true,
      trackingNumber: true,
      status: true,
      origin: true,
      destination: true,
      itemCount: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ shipments });
}
