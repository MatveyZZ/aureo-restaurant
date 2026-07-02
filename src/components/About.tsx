"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "./ui/AnimatedSection";
import { GoldDivider } from "./ui/GoldDivider";

export function About() {
  const t = useTranslations("about");

  const stats = [
    { value: "1", label: t("stats.stars") as string },
    { value: "37", label: t("stats.years") as string },
    { value: "42", label: t("stats.products") as string },
    { value: "850", label: t("stats.wines") as string },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Text */}
          <div className="order-2 lg:order-1">
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
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-6 font-light">
                {t("paragraph2")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-10 font-light">
                {t("paragraph3")}
              </p>
            </AnimatedSection>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <AnimatedSection key={stat.label} delay={0.6 + i * 0.1}>
                  <div className="text-center">
                    <span className="heading-md gold-gradient block mb-2">{stat.value}</span>
                    <span className="text-[hsl(var(--muted-foreground))] text-xs tracking-[0.15em] uppercase">
                      {stat.label}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="order-1 lg:order-2 relative">
            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 border border-[hsl(var(--primary))]/20" />
                <img
                  src="/images/about.jpg"
                  alt="AUREO restaurant dining room"
                  className="w-full h-[500px] md:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))]/30 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
