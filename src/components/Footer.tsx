"use client";

import { useTranslations } from "next-intl";
import { GoldDivider } from "./ui/GoldDivider";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-12 md:py-16 border-t border-[hsl(var(--border))]">
      <div className="px-4 md:px-6 lg:px-12 xl:px-32">
        <div className="text-center">
          {/* Logo */}
          <span className="text-base md:text-lg lg:text-xl gold-gradient tracking-[0.2em] md:tracking-[0.3em] uppercase font-light block mb-3 md:mb-4">
            AUREO
          </span>

          <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto mb-4 md:mb-6" />

          {/* Tagline */}
          <p className="text-[hsl(var(--muted-foreground))] text-sm md:text-base font-light italic mb-6 md:mb-8">
            {t("tagline")}
          </p>

          {/* Copyright */}
          <p className="text-[hsl(var(--muted-foreground))] text-[10px] md:text-xs tracking-wider">
            {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
