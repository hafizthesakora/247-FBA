import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const shipment = await prisma.shipment.findFirst({
    where: { id, userId: session.user.id },
    include: {
      items: true,
      order: {
        select: { id: true, status: true, totalAmount: true, service: true },
      },
    },
  });

  if (!shipment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ shipment });
}
