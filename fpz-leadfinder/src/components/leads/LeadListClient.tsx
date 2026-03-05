"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { SortingState, RowSelectionState } from "@tanstack/react-table";
import { LeadTable } from "./LeadTable";
import { LeadFilters } from "./LeadFilters";
import { LeadTableSkeleton } from "./LeadTableSkeleton";
import { BulkActions } from "./BulkActions";
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
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

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

  const selectedIds = Object.keys(rowSelection);

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
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      )}
      <BulkActions
        selectedIds={selectedIds}
        onClear={() => setRowSelection({})}
      />
    </div>
  );
}
