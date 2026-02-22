import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const shipments = await prisma.ghanaLineShipment.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(shipments);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { senderName, senderPhone, receiverName, receiverPhone, receiverAddress, description, weight, volume } = body;

  if (!senderName || !receiverName || !receiverPhone || !receiverAddress || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const shipment = await prisma.ghanaLineShipment.create({
    data: {
      userId: session.user.id,
      senderName,
      senderPhone: senderPhone || null,
      receiverName,
      receiverPhone,
      receiverAddress,
      description,
      weight: weight ? parseFloat(weight) : null,
      volume: volume ? parseFloat(volume) : null,
    },
  });

  return NextResponse.json(shipment, { status: 201 });
}
