import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      order: {
        select: {
          id: true,
          service: true,
          shipment: { select: { trackingNumber: true } },
        },
      },
    },
  });

  return NextResponse.json({ invoices });
}
