import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";

export async function GET() {
  const scanLog = await prisma.scanLog.findFirst({
    orderBy: { startedAt: "desc" },
  });

  if (!scanLog) {
    return NextResponse.json({
      status: "idle",
      message: "Kein Scan durchgefuehrt",
    });
  }

  return NextResponse.json(scanLog);
}
