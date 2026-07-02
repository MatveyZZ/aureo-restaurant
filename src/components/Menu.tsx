"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { menuData } from "@/data/menu";
import { AnimatedSection } from "./ui/AnimatedSection";
import { GoldDivider } from "./ui/GoldDivider";

type Category = "antipasti" | "primi" | "secondi" | "dolci";

const categories: { key: Category; label: string }[] = [
  { key: "antipasti", label: "antipasti" },
  { key: "primi", label: "primi" },
  { key: "secondi", label: "secondi" },
  { key: "dolci", label: "dolci" },
];

export function Menu() {
  const t = useTranslations("menu");
  const [activeCategory, setActiveCategory] = useState<Category>("antipasti");

  const currentItems = menuData[activeCategory];

  return (
    <section id="menu" className="py-16 md:py-24 lg:py-32 relative bg-[hsl(var(--secondary))]/30">
      <div className="px-4 md:px-6 lg:px-12 xl:px-32">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection>
            <span className="text-[10px] md:text-xs lg:text-sm text-[hsl(var(--primary))] tracking-[0.2em] md:tracking-[0.3em] uppercase block mb-3 md:mb-4">
              {t("subtitle")}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[hsl(var(--foreground))] mb-4 md:mb-6">
              {t("title")}
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto mb-4 md:mb-6" />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-[hsl(var(--muted-foreground))] text-sm md:text-base max-w-xl md:max-w-2xl mx-auto font-light">
              {t("description")}
            </p>
          </AnimatedSection>
        </div>

        {/* Category Tabs */}
        <AnimatedSection delay={0.4}>
          <div className="flex justify-center gap-3 md:gap-4 lg:gap-8 mb-12 md:mb-16 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase pb-2 border-b transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat.key
                    ? "text-[hsl(var(--primary))] border-[hsl(var(--primary))]"
                    : "text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {t(`categories.${cat.label}` as keyof typeof t)}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Menu Items */}
        <div className="max-w-3xl md:max-w-4xl mx-auto">
          {currentItems.map((item, i) => (
            <AnimatedSection key={item.id} delay={0.1 * i}>
              <div className="group flex gap-4 md:gap-6 lg:gap-10 py-6 md:py-8 border-b border-[hsl(var(--border))] last:border-0">
                {/* Image */}
                <div className="hidden md:block w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4 mb-1 md:mb-2">
                    <h3 className="text-base md:text-lg lg:text-xl font-light text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="text-[hsl(var(--primary))] text-base md:text-lg font-light menu-item-price sm:ml-4">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[hsl(var(--muted-foreground))] text-xs md:text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Tasting Menu */}
        <AnimatedSection delay={0.6}>
          <div className="mt-16 md:mt-20 text-center max-w-xl md:max-w-2xl mx-auto p-6 md:p-8 lg:p-10 border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/5">
            <span className="text-[10px] md:text-xs lg:text-sm text-[hsl(var(--primary))] tracking-[0.2em] md:tracking-[0.3em] uppercase block mb-3 md:mb-4">
              {t("tasting")}
            </span>
            <p className="text-[hsl(var(--foreground))] text-base md:text-lg mb-2">
              {t("tastingDesc")}
            </p>
            <p className="text-[hsl(var(--muted-foreground))] text-xs md:text-sm font-light mb-4 md:mb-6">
              {t("description")}
            </p>
            <p className="text-[hsl(var(--primary))] text-xs md:text-sm">
              {t("winePairing")}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
