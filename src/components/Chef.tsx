"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { AnimatedSection } from "./ui/AnimatedSection";
import { GoldDivider } from "./ui/GoldDivider";

export function Chef() {
  const t = useTranslations("chef");

  return (
    <section id="chef" className="py-16 md:py-24 lg:py-32 relative">
      <div className="px-4 md:px-6 lg:px-12 xl:px-32">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          {/* Left - Image */}
          <div className="order-1 lg:order-1">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-2 md:-inset-4 border border-[hsl(var(--primary))]/20" />
                <img
                  src="/images/chef.jpg"
                  alt="Chef Marco Bellini"
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[650px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))]/40 to-transparent" />
              </div>
            </AnimatedSection>
          </div>

          {/* Right - Text */}
          <div className="order-2 lg:order-2">
            <AnimatedSection>
              <span className="text-[10px] md:text-xs lg:text-sm text-[hsl(var(--primary))] tracking-[0.2em] md:tracking-[0.3em] uppercase block mb-3 md:mb-4">
                {t("subtitle")}
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[hsl(var(--foreground))] mb-6 md:mb-8">
                {t("title")}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent mb-6 md:mb-8" />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-[hsl(var(--muted-foreground))] text-sm md:text-base leading-relaxed mb-4 md:mb-6 font-light">
                {t("paragraph1")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <p className="text-[hsl(var(--muted-foreground))] text-sm md:text-base leading-relaxed mb-8 md:mb-10 font-light">
                {t("paragraph2")}
              </p>
            </AnimatedSection>

            {/* Quote */}
            <AnimatedSection delay={0.5}>
              <blockquote className="relative pl-6 md:pl-8 border-l-2 border-[hsl(var(--primary))]">
                <svg className="absolute -top-2 -left-2 w-5 h-5 md:w-6 md:h-6 text-[hsl(var(--primary))]/30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-[hsl(var(--foreground))] text-sm md:text-base font-light italic leading-relaxed">
                  {t("quote")}
                </p>
              </blockquote>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
