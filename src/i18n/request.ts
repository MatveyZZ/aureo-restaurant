import { getRequestConfig } from "next-intl/server";

export const locales = ["it", "en", "ru"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  const validLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "it";

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
