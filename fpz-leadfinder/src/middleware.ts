import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/secret" || pathname === "/api/auth") {
    return NextResponse.next();
  }

  const auth = req.cookies.get("fpz-auth");
  if (auth?.value === "authenticated") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/secret";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
