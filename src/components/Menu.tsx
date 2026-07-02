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
    <section id="menu" className="py-24 md:py-32 relative bg-[hsl(var(--secondary))]/30">
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="heading-sm text-[hsl(var(--primary))] tracking-[0.3em] uppercase block mb-4">
              {t("subtitle")}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="heading-lg text-[hsl(var(--foreground))] mb-6">
              {t("title")}
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <GoldDivider width="60px" className="mx-auto mb-6" />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto font-light">
              {t("description")}
            </p>
          </AnimatedSection>
        </div>

        {/* Category Tabs */}
        <AnimatedSection delay={0.4}>
          <div className="flex justify-center gap-4 md:gap-8 mb-16 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`text-xs tracking-[0.25em] uppercase pb-2 border-b transition-all duration-300 ${
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
        <div className="max-w-4xl mx-auto">
          {currentItems.map((item, i) => (
            <AnimatedSection key={item.id} delay={0.1 * i}>
              <div className="group flex gap-6 md:gap-10 py-8 border-b border-[hsl(var(--border))] last:border-0">
                {/* Image */}
                <div className="hidden md:block w-24 h-24 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg md:text-xl font-light text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="text-[hsl(var(--primary))] text-lg font-light menu-item-price ml-4">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Tasting Menu */}
        <AnimatedSection delay={0.6}>
          <div className="mt-20 text-center max-w-2xl mx-auto p-10 border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/5">
            <span className="heading-sm text-[hsl(var(--primary))] tracking-[0.3em] uppercase block mb-4">
              {t("tasting")}
            </span>
            <p className="text-[hsl(var(--foreground))] text-lg mb-2">
              {t("tastingDesc")}
            </p>
            <p className="text-[hsl(var(--muted-foreground))] text-sm font-light mb-6">
              {t("description")}
            </p>
            <p className="text-[hsl(var(--primary))] text-sm">
              {t("winePairing")}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
