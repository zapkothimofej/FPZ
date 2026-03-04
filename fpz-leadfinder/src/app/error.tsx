"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-zinc-100">
        Etwas ist schiefgelaufen
      </h2>
      {process.env.NODE_ENV === "development" && (
        <pre className="text-xs text-red-400 mt-2 max-w-lg overflow-auto">
          {error.message}
        </pre>
      )}
      <div className="flex gap-3 mt-4">
        <Button onClick={reset}>Erneut versuchen</Button>
        <Button variant="outline" asChild>
          <Link href="/">Zum Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
