"use client";

import { useTranslations } from "next-intl";
import { GoldDivider } from "./ui/GoldDivider";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-16 border-t border-[hsl(var(--border))]">
      <div className="section-padding">
        <div className="text-center">
          {/* Logo */}
          <span className="heading-sm gold-gradient letter-spacing-wider font-light block mb-4">
            AUREO
          </span>

          <GoldDivider width="60px" className="mx-auto mb-6" />

          {/* Tagline */}
          <p className="text-[hsl(var(--muted-foreground))] font-light italic mb-8">
            {t("tagline")}
          </p>

          {/* Copyright */}
          <p className="text-[hsl(var(--muted-foreground))] text-xs tracking-wider">
            {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
