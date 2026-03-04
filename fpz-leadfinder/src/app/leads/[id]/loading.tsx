import { Skeleton } from "@/components/ui/skeleton";

export default function LeadDetailLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-32 bg-zinc-800" />
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 bg-zinc-800" />
          <Skeleton className="h-4 w-48 bg-zinc-800" />
        </div>
        <Skeleton className="h-10 w-44 bg-zinc-800" />
      </div>
      <Skeleton className="h-[200px] bg-zinc-900 rounded-xl" />
      <Skeleton className="h-10 w-full bg-zinc-800 rounded-lg" />
      <Skeleton className="h-[300px] bg-zinc-900 rounded-xl" />
    </div>
  );
}
