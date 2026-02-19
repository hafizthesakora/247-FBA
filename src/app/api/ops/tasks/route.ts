import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id || (session.user.role !== "OPERATOR" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  const where: Record<string, unknown> = {
    assignedToId: session.user.id,
  };
  if (status) where.status = status;
  if (priority) where.priority = priority;

  const tasks = await prisma.task.findMany({
    where,
    include: {
      shipment: { select: { trackingNumber: true } },
      station: { select: { name: true } },
    },
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ tasks });
}
