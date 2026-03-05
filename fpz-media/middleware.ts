import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page and auth API through
  if (pathname === "/secret" || pathname === "/api/secret/auth") {
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
    "/secret/:path*",
    "/api/secret/:path*",
  ],
};
