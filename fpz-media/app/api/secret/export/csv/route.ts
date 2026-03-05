import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";
import { generateLeadCSV } from "@/lib/export/csv";
import { formatDate } from "@/lib/utils";
import type { Prisma } from "@/generated/prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const city = searchParams.get("city");
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const minScore = searchParams.get("minScore");
  const maxScore = searchParams.get("maxScore");
  const search = searchParams.get("search");
  const ids = searchParams.get("ids");

  const where: Prisma.LeadWhereInput = {
    AND: [
      ids
        ? { id: { in: ids.split(",") } }
        : {},
      city ? { city: { in: city.split(",") } } : {},
      category ? { category: { in: category.split(",") } } : {},
      status ? { status: { in: status.split(",") } } : {},
      minScore ? { overallScore: { gte: Number(minScore) } } : {},
      maxScore ? { overallScore: { lte: Number(maxScore) } } : {},
      search
        ? {
            OR: [
              { name: { contains: search } },
              { address: { contains: search } },
            ],
          }
        : {},
    ],
  };

  const leads = await prisma.lead.findMany({ where, orderBy: { createdAt: "desc" } });
  const csv = generateLeadCSV(leads);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="FPZ-Leads-${formatDate(new Date())}.csv"`,
    },
  });
}
