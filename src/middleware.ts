import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sajib_portfolio_super_secret_jwt_key_2026_x987123"
);

const COOKIE_NAME = "admin_session_token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Unprotected admin routes
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/api/admin/auth/login" ||
    pathname === "/api/admin/auth/forgot-password"
  ) {
    return NextResponse.next();
  }

  // Protected Admin Page & API routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
