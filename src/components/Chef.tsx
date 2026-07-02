"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { AnimatedSection } from "./ui/AnimatedSection";
import { GoldDivider } from "./ui/GoldDivider";

export function Chef() {
  const t = useTranslations("chef");

  return (
    <section id="chef" className="py-24 md:py-32 relative">
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Image */}
          <div className="relative">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 border border-[hsl(var(--primary))]/20" />
                <img
                  src="/images/chef.jpg"
                  alt="Chef Marco Bellini"
                  className="w-full h-[500px] md:h-[650px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))]/40 to-transparent" />
              </div>
            </AnimatedSection>
          </div>

          {/* Right - Text */}
          <div>
            <AnimatedSection>
              <span className="heading-sm text-[hsl(var(--primary))] tracking-[0.3em] uppercase block mb-4">
                {t("subtitle")}
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="heading-lg text-[hsl(var(--foreground))] mb-8">
                {t("title")}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <GoldDivider width="60px" className="mb-8" />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-6 font-light">
                {t("paragraph1")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-10 font-light">
                {t("paragraph2")}
              </p>
            </AnimatedSection>

            {/* Quote */}
            <AnimatedSection delay={0.5}>
              <blockquote className="relative pl-8 border-l-2 border-[hsl(var(--primary))]">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-[hsl(var(--primary))]/30" />
                <p className="text-[hsl(var(--foreground))] font-light italic leading-relaxed">
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
