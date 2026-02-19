import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const uninvoiced = searchParams.get("uninvoiced");

  const orders = await prisma.order.findMany({
    where: uninvoiced === "true" ? { invoice: null } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, company: true } },
      shipment: { select: { trackingNumber: true } },
    },
  });

  return NextResponse.json({ orders });
}
