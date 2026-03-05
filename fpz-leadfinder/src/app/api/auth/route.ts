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
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
