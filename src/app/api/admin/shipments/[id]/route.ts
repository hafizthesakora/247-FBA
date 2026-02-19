import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: {
      items: true,
      user: { select: { id: true, name: true, email: true, company: true } },
      order: { select: { id: true, status: true, totalAmount: true, service: true } },
    },
  });

  if (!shipment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ shipment });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const shipment = await prisma.shipment.update({
    where: { id },
    data: { status },
    include: {
      items: true,
      user: { select: { id: true, name: true, email: true, company: true } },
      order: { select: { id: true, status: true, totalAmount: true, service: true } },
    },
  });

  // Create notification for the client
  await prisma.notification.create({
    data: {
      userId: shipment.user.id,
      title: "Shipment Status Updated",
      message: `Your shipment ${shipment.trackingNumber} status has been updated to ${status.replace(/_/g, " ").toLowerCase()}.`,
      type: "SHIPMENT",
    },
  });

  return NextResponse.json({ shipment });
}
