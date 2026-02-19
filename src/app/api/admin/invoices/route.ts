import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, company: true } },
      order: {
        select: { shipment: { select: { trackingNumber: true } } },
      },
    },
  });

  return NextResponse.json({ invoices });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { orderId, amount, dueDate } = await request.json();

    if (!orderId || !amount || !dueDate) {
      return NextResponse.json(
        { error: "Order, amount, and due date are required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { invoice: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.invoice) {
      return NextResponse.json(
        { error: "This order already has an invoice" },
        { status: 409 }
      );
    }

    const invoice = await prisma.invoice.create({
      data: {
        userId: order.userId,
        orderId,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
        status: "SENT",
      },
    });

    // Notify the client
    await prisma.notification.create({
      data: {
        userId: order.userId,
        title: "New Invoice",
        message: `A new invoice for €${parseFloat(amount).toFixed(2)} has been created. Due date: ${new Date(dueDate).toLocaleDateString()}.`,
        type: "INVOICE",
      },
    });

    return NextResponse.json({ invoice });
  } catch {
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
