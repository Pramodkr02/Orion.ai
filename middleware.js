import { NextResponse } from "next/server";
import { updateSession, decrypt } from "@/lib/auth";

export async function middleware(request) {
  const cookie = request.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  
  const { pathname } = request.nextUrl;

  // Protected Routes Logic
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Auth Routes Logic (Prevent logged-in users from accessing login/signup)
  if (pathname === "/login" || pathname === "/register") {
    if (session) {
        return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
