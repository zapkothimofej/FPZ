import { prisma } from "@/lib/db/client";
import { LeadListClient } from "@/components/leads/LeadListClient";
import { AddLeadDialog } from "@/components/leads/AddLeadDialog";
import type { PaginatedResponse } from "@/types";
import type { LeadRow } from "@/components/leads/columns";

interface LeadsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = { title: "Leads — LeadFinder" };

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page ?? 1));
  const limit = Math.min(100, Math.max(1, Number(params.limit ?? 25)));
  const sort = (params.sort as string) ?? "createdAt";
  const order = params.order === "asc" ? ("asc" as const) : ("desc" as const);
  const city = params.city as string | undefined;
  const category = params.category as string | undefined;
  const status = params.status as string | undefined;
  const minScore = params.minScore as string | undefined;
  const maxScore = params.maxScore as string | undefined;
  const search = params.search as string | undefined;

  const allowedSortFields = ["name", "city", "category", "overallScore", "status", "createdAt"];
  const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";

  const where: Record<string, unknown> = {};

  if (city) {
    const cities = city.split(",").filter(Boolean);
    if (cities.length > 0) where.city = { in: cities };
  }

  if (category) {
    const categories = category.split(",").filter(Boolean);
    if (categories.length > 0) where.category = { in: categories };
  }

  if (status) {
    const statuses = status.split(",").filter(Boolean);
    if (statuses.length > 0) where.status = { in: statuses };
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

  const initialData: PaginatedResponse<LeadRow> = {
    data: data as LeadRow[],
    total,
    page,
    totalPages,
    limit,
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Leads</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {total} Lead{total !== 1 ? "s" : ""} gefunden
          </p>
        </div>
        <AddLeadDialog />
      </div>

      <LeadListClient initialData={initialData} />
    </div>
  );
}
