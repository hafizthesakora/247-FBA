import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { StationType } from "@/generated/prisma/enums";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, type, capacity, assignedOperatorId } = await request.json();

  if (!name || !type) {
    return NextResponse.json(
      { error: "Name and type are required" },
      { status: 400 }
    );
  }

  const station = await prisma.station.create({
    data: {
      name,
      type: type as StationType,
      capacity: capacity || 10,
      assignedOperatorId: assignedOperatorId || null,
    },
  });

  return NextResponse.json({ station }, { status: 201 });
}
