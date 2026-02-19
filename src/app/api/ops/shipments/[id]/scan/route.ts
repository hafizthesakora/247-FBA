import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activity-logger";
import { ShipmentStatus } from "@/generated/prisma/enums";

const statusFlow: ShipmentStatus[] = [
  "DRAFT",
  "RECEIVED",
  "INSPECTING",
  "PREPPING",
  "QUALITY_CHECK",
  "READY_TO_SHIP",
  "SHIPPED",
  "DELIVERED",
];

export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || (session.user.role !== "OPERATOR" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const shipment = await prisma.shipment.findUnique({ where: { id } });
  if (!shipment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const currentIdx = statusFlow.indexOf(shipment.status);
  if (currentIdx >= statusFlow.length - 1) {
    return NextResponse.json({ error: "Shipment already delivered" }, { status: 400 });
  }

  const nextStatus = statusFlow[currentIdx + 1];

  const updated = await prisma.shipment.update({
    where: { id },
    data: { status: nextStatus },
  });

  await logActivity({
    userId: session.user.id,
    action: `advanced shipment ${shipment.trackingNumber} to ${nextStatus}`,
    entityType: "Shipment",
    entityId: shipment.id,
  });

  // Notify client
  await prisma.notification.create({
    data: {
      userId: shipment.userId,
      title: "Shipment Update",
      message: `Your shipment ${shipment.trackingNumber} status is now ${nextStatus.replace(/_/g, " ")}.`,
      type: "SHIPMENT",
    },
  });

  return NextResponse.json({ shipment: updated });
}
