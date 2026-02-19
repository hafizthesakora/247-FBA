import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activity-logger";
import { TaskStatus } from "@/generated/prisma/enums";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id || (session.user.role !== "OPERATOR" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const data: { status: TaskStatus; assignedToId?: string; completedAt?: Date | null } = {
    status: status as TaskStatus,
  };

  if (status === "IN_PROGRESS") {
    data.assignedToId = session.user.id;
  }

  if (status === "COMPLETED") {
    data.completedAt = new Date();
  }

  const task = await prisma.task.update({
    where: { id },
    data,
  });

  await logActivity({
    userId: session.user.id,
    action: `${status === "IN_PROGRESS" ? "claimed" : status === "COMPLETED" ? "completed" : "updated"} task "${task.title}"`,
    entityType: "Task",
    entityId: task.id,
  });

  return NextResponse.json({ task });
}
