import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["it", "en", "ru"],
  defaultLocale: "it",
  localePrefix: "as-needed",
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico)).*)",
  ],
};
