import { Skeleton } from "@/components/ui/skeleton";

export default function ScanLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48 bg-zinc-800" />
      <Skeleton className="h-[300px] bg-zinc-900 rounded-xl" />
      <Skeleton className="h-[200px] bg-zinc-900 rounded-xl" />
    </div>
  );
}
