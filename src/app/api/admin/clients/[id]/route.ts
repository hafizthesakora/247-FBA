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

  const client = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
      phone: true,
      createdAt: true,
      shipments: {
        orderBy: { createdAt: "desc" },
        select: { id: true, trackingNumber: true, status: true, destination: true, createdAt: true },
      },
      orders: {
        orderBy: { createdAt: "desc" },
        select: { id: true, status: true, totalAmount: true, service: true, createdAt: true },
      },
      invoices: {
        orderBy: { createdAt: "desc" },
        select: { id: true, amount: true, status: true, dueDate: true },
      },
    },
  });

  if (!client) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ client });
}
