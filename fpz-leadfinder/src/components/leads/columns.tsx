"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Lead, WebsiteAnalysis } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
  },
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
