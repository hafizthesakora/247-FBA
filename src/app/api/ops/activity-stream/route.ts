import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || (session.user.role !== "OPERATOR" && session.user.role !== "ADMIN")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();
  let lastId: string | null = null;

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial batch
      const initial = await prisma.activityLog.findMany({
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 20,
      });

      if (initial.length > 0) {
        lastId = initial[0].id;
      }

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(initial)}\n\n`)
      );

      // Poll every 3 seconds
      const interval = setInterval(async () => {
        try {
          const where = lastId
            ? {
                createdAt: {
                  gt: (
                    await prisma.activityLog.findUnique({
                      where: { id: lastId },
                    })
                  )?.createdAt ?? new Date(),
                },
              }
            : {};

          const newEntries = await prisma.activityLog.findMany({
            where,
            include: { user: { select: { name: true } } },
            orderBy: { createdAt: "desc" },
            take: 10,
          });

          if (newEntries.length > 0) {
            lastId = newEntries[0].id;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(newEntries)}\n\n`)
            );
          }
        } catch {
          clearInterval(interval);
          controller.close();
        }
      }, 3000);

      // Cleanup on abort
      const cleanup = () => {
        clearInterval(interval);
        try {
          controller.close();
        } catch {
          // already closed
        }
      };

      // Close after 5 minutes to prevent zombie connections
      setTimeout(cleanup, 5 * 60 * 1000);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
