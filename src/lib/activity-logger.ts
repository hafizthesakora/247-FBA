import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

interface LogActivityParams {
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
}

export async function logActivity({
  userId,
  action,
  entityType,
  entityId,
  metadata,
}: LogActivityParams) {
  return prisma.activityLog.create({
    data: {
      userId,
      action,
      entityType,
      entityId,
      metadata: metadata ?? Prisma.JsonNull,
    },
  });
}
