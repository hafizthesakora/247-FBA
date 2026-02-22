import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const shipments = await prisma.ghanaLineShipment.findMany({
    include: { user: { select: { name: true, email: true, company: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(shipments);
}
