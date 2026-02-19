import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { InvoiceStatus } from "@/generated/prisma/enums";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const data: { status: InvoiceStatus; paidAt?: Date | null } = {
    status: status as InvoiceStatus,
  };

  if (status === "PAID") {
    data.paidAt = new Date();
  } else {
    data.paidAt = null;
  }

  const invoice = await prisma.invoice.update({
    where: { id },
    data,
  });

  // Notify client about payment status
  if (status === "PAID") {
    await prisma.notification.create({
      data: {
        userId: invoice.userId,
        title: "Invoice Paid",
        message: `Your invoice INV-${invoice.id.slice(-6).toUpperCase()} has been marked as paid.`,
        type: "INVOICE",
      },
    });
  }

  return NextResponse.json({ invoice });
}
