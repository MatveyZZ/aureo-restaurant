import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

const intlMiddleware = createMiddleware({
  locales: ["it", "en", "ru"],
  defaultLocale: "it",
  localePrefix: "always",
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip intl middleware for admin and API routes — they don't have locales
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/")) {
    // Protect admin pages (not login)
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      const authenticated = await verifySession();
      if (!authenticated) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
    return NextResponse.next();
  }

  // All other routes: use next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico)).*)",
  ],
};
