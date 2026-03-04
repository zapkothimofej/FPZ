# US-010: Lead-Liste DataTable

## Exakte Datei: src/app/api/leads/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import type { PaginatedResponse } from "@/types";
import type { Lead } from "@prisma/client";

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

  return NextResponse.json(response);
}
```

## Exakte Datei: src/components/leads/columns.tsx

```tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Lead, WebsiteAnalysis } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowUpDown } from "lucide-react";
import { cn, formatDate, getScoreColorClass, getScoreBgClass } from "@/lib/utils";
import { STATUS_CONFIG } from "@/lib/constants";
import type { LeadStatus } from "@/types";
import { Button } from "@/components/ui/button";

export type LeadRow = Lead & {
  analysis: Pick<WebsiteAnalysis, "overallScore"> | null;
};

export const columns: ColumnDef<LeadRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-zinc-100 truncate max-w-[200px] block">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stadt
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-zinc-400">{row.getValue("city")}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Branche",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => {
      const website = row.getValue("website") as string | null;
      if (!website) return <span className="text-zinc-600">--</span>;
      return (
        <a
          href={website.startsWith("http") ? website : `https://${website}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "overallScore",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Score
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const score = row.original.overallScore;
      if (score == null) return <span className="text-zinc-600">--</span>;
      return (
        <div className="flex items-center gap-2">
          <div className={cn("h-2.5 w-2.5 rounded-full", getScoreBgClass(score))} />
          <span className={cn("font-mono text-sm", getScoreColorClass(score))}>
            {score}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as LeadStatus;
      const config = STATUS_CONFIG[status];
      return (
        <Badge className={cn(config.bgColor, config.textColor, "border-0 text-xs")}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Erstellt
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-zinc-500 text-sm">
        {formatDate(row.getValue("createdAt"))}
      </span>
    ),
  },
];
```

## Exakte Datei: src/components/leads/LeadTable.tsx

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { columns, type LeadRow } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeadTableProps {
  data: LeadRow[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  onPaginationChange: (page: number) => void;
  onSortingChange: (sorting: SortingState) => void;
  sorting: SortingState;
}

export function LeadTable({
  data,
  total,
  page,
  totalPages,
  limit,
  onPaginationChange,
  onSortingChange,
  sorting,
}: LeadTableProps) {
  const router = useRouter();

  const pagination: PaginationState = {
    pageIndex: page - 1,
    pageSize: limit,
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(next);
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-zinc-800 hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-zinc-400">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-zinc-800 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                  onClick={() => router.push(`/leads/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500">
                  Keine Leads gefunden.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-zinc-500">
          {total} Lead{total !== 1 ? "s" : ""} gesamt
        </p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-zinc-400">
            Seite {page} von {totalPages}
          </p>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPaginationChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPaginationChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## Exakte Datei: src/components/leads/LeadTableSkeleton.tsx

```tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function LeadTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Stadt</TableHead>
              <TableHead>Branche</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Erstellt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i} className="border-zinc-800">
                <TableCell><Skeleton className="h-4 w-[140px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[90px] rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[40px]" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[70px] rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-4 w-[100px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
```

## Exakte Datei: src/app/leads/page.tsx

```tsx
import { prisma } from "@/lib/db/client";
import { LeadListClient } from "@/components/leads/LeadListClient";
import type { PaginatedResponse } from "@/types";
import type { LeadRow } from "@/components/leads/columns";

interface LeadsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page ?? 1));
  const limit = Math.min(100, Math.max(1, Number(params.limit ?? 25)));
  const sort = (params.sort as string) ?? "createdAt";
  const order = params.order === "asc" ? "asc" as const : "desc" as const;
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
      </div>

      <LeadListClient initialData={initialData} />
    </div>
  );
}
```

## Exakte Datei: src/components/leads/LeadListClient.tsx

```tsx
"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { SortingState } from "@tanstack/react-table";
import { LeadTable } from "./LeadTable";
import { LeadFilters } from "./LeadFilters";
import { LeadTableSkeleton } from "./LeadTableSkeleton";
import type { PaginatedResponse } from "@/types";
import type { LeadRow } from "./columns";

interface LeadListClientProps {
  initialData: PaginatedResponse<LeadRow>;
}

export function LeadListClient({ initialData }: LeadListClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const sortField = searchParams.get("sort") ?? "createdAt";
  const sortOrder = searchParams.get("order") ?? "desc";

  const sorting: SortingState = sortField
    ? [{ id: sortField, desc: sortOrder === "desc" }]
    : [];

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, pathname, router]
  );

  const handlePaginationChange = useCallback(
    (page: number) => {
      updateParams({ page: String(page) });
    },
    [updateParams]
  );

  const handleSortingChange = useCallback(
    (newSorting: SortingState) => {
      if (newSorting.length > 0) {
        const firstSort = newSorting[0];
        if (firstSort) {
          updateParams({
            sort: firstSort.id,
            order: firstSort.desc ? "desc" : "asc",
            page: "1",
          });
        }
      } else {
        updateParams({ sort: null, order: null, page: "1" });
      }
    },
    [updateParams]
  );

  return (
    <div className="space-y-4">
      <LeadFilters />
      {isPending ? (
        <LeadTableSkeleton />
      ) : (
        <LeadTable
          data={initialData.data}
          total={initialData.total}
          page={initialData.page}
          totalPages={initialData.totalPages}
          limit={initialData.limit}
          onPaginationChange={handlePaginationChange}
          onSortingChange={handleSortingChange}
          sorting={sorting}
        />
      )}
    </div>
  );
}
```

## Verifikation

```bash
npx tsc --noEmit  # 0 Fehler
```
