import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const shipments = await prisma.shipment.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      trackingNumber: true,
      status: true,
      origin: true,
      destination: true,
      itemCount: true,
      createdAt: true,
      user: { select: { name: true, company: true } },
    },
  });

  return NextResponse.json({ shipments });
}
