import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activity-logger";
import { TaskType, TaskPriority } from "@/generated/prisma/enums";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, type, priority, assignedToId, shipmentId, stationId, dueDate } =
    await request.json();

  if (!title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      description: description || null,
      type: (type as TaskType) || "CUSTOM",
      priority: (priority as TaskPriority) || "MEDIUM",
      assignedToId: assignedToId || null,
      shipmentId: shipmentId || null,
      stationId: stationId || null,
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  await logActivity({
    userId: session.user.id,
    action: `created task "${title}"`,
    entityType: "Task",
    entityId: task.id,
  });

  // Notify operator if assigned
  if (assignedToId) {
    await prisma.notification.create({
      data: {
        userId: assignedToId,
        title: "New Task Assigned",
        message: `You have been assigned a new task: ${title}`,
        type: "SYSTEM",
      },
    });
  }

  return NextResponse.json({ task }, { status: 201 });
}
