import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Search className="h-12 w-12 text-zinc-600 mb-4" />
      <h2 className="text-xl font-semibold text-zinc-100">
        Seite nicht gefunden
      </h2>
      <p className="text-zinc-400 mt-1">
        Die angeforderte Seite existiert nicht.
      </p>
      <Button variant="outline" className="mt-4" asChild>
        <Link href="/">Zum Dashboard</Link>
      </Button>
    </div>
  );
}
