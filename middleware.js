import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Public paths that don't need protection
  const publicPaths = [
    "/",
    "/login",
    "/products",
    "/register",
    "/cart",
    "/_next",
    "/favicon.ico",
    "/images",
    "/uploads",
  ];
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (isPublicPath) {
    return NextResponse.next();
  }

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
    if (
      pathname.includes("/admin") ||
      pathname === "/login" ||
      pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (role === "admin") {
    if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/cart"
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}
