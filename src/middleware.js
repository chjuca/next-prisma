import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedPaths = [
    "/tasks/edit",
    "/about",
    "/new",
  ];
  const path = req.nextUrl.pathname;

  if (protectedPaths.some((route) => path.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/edit/:path*", "/about", "/new"],
};