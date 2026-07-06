import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

const intlMiddleware = createMiddleware({
  locales: ["it", "en", "ru"],
  defaultLocale: "it",
  localePrefix: "as-needed",
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin auth check
  if (pathname.startsWith("/admin")) {
    // Allow login page
    if (pathname === "/admin/login") {
      return intlMiddleware(request);
    }

    // Allow API routes
    if (pathname.startsWith("/api/")) {
      return intlMiddleware(request);
    }

    // Check authentication
    const authenticated = await verifySession();
    if (!authenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
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
