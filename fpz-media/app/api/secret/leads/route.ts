import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import type { PaginatedResponse } from "@/types";
import type { Lead } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 25)));
  const sort = searchParams.get("sort") ?? "createdAt";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";
  const city = searchParams.get("city");
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const minScore = searchParams.get("minScore");
  const maxScore = searchParams.get("maxScore");
  const search = searchParams.get("search");

  const allowedSortFields = [
    "name",
    "city",
    "category",
    "overallScore",
    "status",
    "createdAt",
  ];
  const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";

  const where: Record<string, unknown> = {};

  if (city) {
    const cities = city.split(",").filter(Boolean);
    if (cities.length > 0) {
      where.city = { in: cities };
    }
  }

  if (category) {
    const categories = category.split(",").filter(Boolean);
    if (categories.length > 0) {
      where.category = { in: categories };
    }
  }

  if (status) {
    const statuses = status.split(",").filter(Boolean);
    if (statuses.length > 0) {
      where.status = { in: statuses };
    }
  }

  if (minScore || maxScore) {
    const scoreFilter: Record<string, number> = {};
    if (minScore) scoreFilter.gte = Number(minScore);
    if (maxScore) scoreFilter.lte = Number(maxScore);
    where.overallScore = scoreFilter;
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { address: { contains: search } },
      { city: { contains: search } },
      { category: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { [sortField]: order },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        analysis: {
          select: { overallScore: true },
        },
      },
    }),
    prisma.lead.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  const response: PaginatedResponse<Lead & { analysis: { overallScore: number } | null }> = {
    data,
    total,
    page,
    totalPages,
    limit,
  };

  return NextResponse.json(response, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
