import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stations = await prisma.station.findMany({
    include: {
      assignedOperator: { select: { id: true, name: true, email: true } },
      _count: {
        select: {
          tasks: {
            where: { status: { in: ["PENDING", "IN_PROGRESS"] } },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ stations });
}
