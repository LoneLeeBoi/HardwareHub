import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Public paths that don't need protection
  const publicPaths = ["/","/auth", "/api", "/_next", "/favicon.ico", "/images"];
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (isPublic) {
    if (pathname.startsWith("/auth") && token) {
      try {
        const decoded = jwt.decode(token);
        const role = decoded?.role;

        if (role === "admin") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }

        if (role === "user") {
          return NextResponse.redirect(new URL("/", request.url));
        }
      } catch {
        return NextResponse.next(); // Invalid token, allow access to /auth
      }
    }

    return NextResponse.next(); // Allow access to public
  }

  // If not logged in, redirect to /auth
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decoded = jwt.decode(token);
    const role = decoded?.role;

    if (!role) throw new Error("Invalid token");

    // Admin can access all /admin routes
    if (role === "admin" && pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    // User routes
    const userRoutes = ["/", "/profile", "/shop", "/orders"];
    if (role === "user") {
      const isAllowed = userRoutes.some((route) => pathname.startsWith(route));
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next(); // If all checks pass
  } catch {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}
