import createMiddleware from "next-intl/middleware";
import { locales } from "./src/i18n/request";

export default createMiddleware({
  locales,
  defaultLocale: "it",
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
