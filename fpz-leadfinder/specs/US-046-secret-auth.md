# US-046: Secret URL Auth Gate

## Datei: src/app/secret/page.tsx

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SecretPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4"
      >
        <h1 className="text-xl font-bold text-zinc-100 text-center">
          FPZ LeadFinder
        </h1>
        <p className="text-sm text-zinc-400 text-center">
          Passwort eingeben um fortzufahren
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort"
          autoFocus
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
        />
        {error && (
          <p className="text-sm text-red-400 text-center">
            Falsches Passwort
          </p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg py-3 transition-colors"
        >
          {loading ? "..." : "Zugang"}
        </button>
      </form>
    </div>
  );
}
```

## Datei: src/app/api/auth/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";

const SECRET_PASSWORD = process.env.APP_PASSWORD ?? "fpz123";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { password?: string };

  if (body.password !== SECRET_PASSWORD) {
    return NextResponse.json({ error: "wrong" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("fpz-auth", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 Tage
  });
  return res;
}
```

## Datei: src/middleware.ts

```typescript
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /secret und /api/auth immer erlauben
  if (pathname === "/secret" || pathname === "/api/auth") {
    return NextResponse.next();
  }

  // Auth-Cookie pruefen
  const auth = req.cookies.get("fpz-auth");
  if (auth?.value === "authenticated") {
    return NextResponse.next();
  }

  // Nicht eingeloggt -> redirect zu /secret
  const url = req.nextUrl.clone();
  url.pathname = "/secret";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Alle Routen ausser:
     * - _next (static files)
     * - favicon.ico, icons, images
     */
    "/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

## .env.example Ergaenzung

```env
# Auth (optional, default: fpz123)
APP_PASSWORD="fpz123"
```
