import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const shipmentItems = await prisma.shipmentItem.findMany({
    where: {
      shipment: {
        userId: session.user.id,
        status: { in: ["RECEIVED", "INSPECTING", "PREPPING", "QUALITY_CHECK", "READY_TO_SHIP"] },
      },
    },
    include: {
      shipment: {
        select: { trackingNumber: true, status: true },
      },
    },
    orderBy: { shipment: { createdAt: "desc" } },
  });

  const items = shipmentItems.map((item) => ({
    id: item.id,
    productName: item.productName,
    sku: item.sku,
    quantity: item.quantity,
    prepType: item.prepType,
    shipmentTrackingNumber: item.shipment.trackingNumber,
    shipmentStatus: item.shipment.status,
  }));

  return NextResponse.json({ items });
}
