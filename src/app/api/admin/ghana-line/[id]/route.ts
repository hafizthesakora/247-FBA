import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { GhanaLineStatus } from "@/generated/prisma/enums";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { status, containerRef, vesselName, estimatedArrival, adminNotes } = body;

  const updated = await prisma.ghanaLineShipment.update({
    where: { id: params.id },
    data: {
      ...(status && { status: status as GhanaLineStatus }),
      ...(containerRef !== undefined && { containerRef }),
      ...(vesselName !== undefined && { vesselName }),
      ...(estimatedArrival !== undefined && { estimatedArrival: estimatedArrival ? new Date(estimatedArrival) : null }),
      ...(adminNotes !== undefined && { adminNotes }),
    },
  });

  return NextResponse.json(updated);
}
