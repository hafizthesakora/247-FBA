import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, company: true, phone: true },
  });

  return NextResponse.json({ user });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, company, phone } = await request.json();

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: name || null,
      company: company || null,
      phone: phone || null,
    },
    select: { name: true, email: true, company: true, phone: true },
  });

  return NextResponse.json({ user });
}
