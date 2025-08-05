import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Allow always accessible public paths
  const publicPaths = ["/", "/login", "/register", "/cart", "/_next", "/favicon.ico", "/images"];
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(path + "/"));

  // Allow all public API routes
  if (pathname.startsWith("/api/public")) {
    return NextResponse.next();
  }

  // Block access if no token and not in public path
  if (!token) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Decode token and validate role
  let decoded;
  try {
    decoded = jwt.decode(token);
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const role = decoded?.role;

  if (!role) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (role === "user") {
    // Block admin access and login/register
    if (pathname.includes("/admin") || pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (role === "admin") {
    // Block access to guest/user-only routes
    if (pathname === "/" || pathname === "/login" || pathname === "/register" || pathname === "/cart") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Fallback
  return NextResponse.redirect(new URL("/", request.url));
}
