import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const shipments = await prisma.shipment.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      trackingNumber: true,
      status: true,
      origin: true,
      destination: true,
      itemCount: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ shipments });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { origin, destination, weight, notes, items } = await request.json();

    if (!origin || !destination || !items?.length) {
      return NextResponse.json(
        { error: "Origin, destination, and at least one item are required" },
        { status: 400 }
      );
    }

    const totalItems = items.reduce(
      (sum: number, item: { quantity: number }) => sum + (item.quantity || 1),
      0
    );

    const shipment = await prisma.shipment.create({
      data: {
        userId: session.user.id,
        origin,
        destination,
        weight: weight || null,
        notes: notes || null,
        itemCount: totalItems,
        items: {
          create: items.map(
            (item: {
              productName: string;
              sku?: string;
              quantity?: number;
              prepType?: string;
            }) => ({
              productName: item.productName,
              sku: item.sku || null,
              quantity: item.quantity || 1,
              prepType: item.prepType || "LABELING",
            })
          ),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ shipment });
  } catch {
    return NextResponse.json(
      { error: "Failed to create shipment" },
      { status: 500 }
    );
  }
}
