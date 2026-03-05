import { Skeleton } from "@/components/ui/skeleton";

export default function LeadsLoading() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-10 flex-1 min-w-[200px] bg-zinc-800" />
        <Skeleton className="h-10 w-32 bg-zinc-800" />
        <Skeleton className="h-10 w-32 bg-zinc-800" />
        <Skeleton className="h-10 w-32 bg-zinc-800" />
      </div>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border-b border-zinc-800/50"
          >
            <Skeleton className="h-4 w-[200px] bg-zinc-800" />
            <Skeleton className="h-4 w-[100px] bg-zinc-800" />
            <Skeleton className="h-4 w-[80px] bg-zinc-800" />
            <Skeleton className="h-4 w-[40px] bg-zinc-800" />
            <Skeleton className="h-4 w-[60px] bg-zinc-800" />
            <Skeleton className="h-4 w-[80px] bg-zinc-800" />
            <Skeleton className="h-4 w-[70px] bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
