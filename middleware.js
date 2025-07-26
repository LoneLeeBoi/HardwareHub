import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Define role-based allowed routes
  const userRoutes = ["/", "/profile", "/shop", "/orders"];
  const adminRoutes = ["/admin", "/admin/users", "/admin/settings"];

  // Allow public routes
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  try {
    const decoded = jwt.decode(token);
    const role = decoded?.role;

    if (!role) throw new Error("Invalid token");

    if (role === "admin") {
      const isAllowed = adminRoutes.some(route => pathname.startsWith(route));
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }

    if (role === "user") {
      const isAllowed = userRoutes.some(route => pathname.startsWith(route));
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}
