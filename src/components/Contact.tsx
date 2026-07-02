"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { AnimatedSection } from "./ui/AnimatedSection";
import { GoldDivider } from "./ui/GoldDivider";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 relative">
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
            <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto" />
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
          {/* Left - Info */}
          <div>
            {/* Address */}
            <AnimatedSection delay={0.3}>
              <div className="flex items-start gap-3 md:gap-4 mb-8 md:mb-10">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-[hsl(var(--foreground))] text-sm md:text-base font-light">{t("address")}</h3>
                </div>
              </div>
            </AnimatedSection>

            {/* Phone */}
            <AnimatedSection delay={0.4}>
              <div className="flex items-start gap-3 md:gap-4 mb-8 md:mb-10">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+39066789012"
                    className="text-[hsl(var(--foreground))] text-sm md:text-base font-light hover:text-[hsl(var(--primary))] transition-colors duration-300"
                  >
                    {t("phone")}
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Email */}
            <AnimatedSection delay={0.5}>
              <div className="flex items-start gap-3 md:gap-4 mb-8 md:mb-10">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:info@aureo-roma.it"
                    className="text-[hsl(var(--foreground))] text-sm md:text-base font-light hover:text-[hsl(var(--primary))] transition-colors duration-300"
                  >
                    {t("email")}
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Hours */}
            <AnimatedSection delay={0.6}>
              <div className="mb-8 md:mb-10">
                <div className="flex items-start gap-3 md:gap-4 mb-4">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
                  <h3 className="text-[hsl(var(--foreground))] font-light text-base md:text-lg">
                    {t("hours.title")}
                  </h3>
                </div>
                <div className="pl-7 md:pl-9 space-y-2 md:space-y-3">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-[hsl(var(--muted-foreground))]">{t("hours.lun")}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-[hsl(var(--muted-foreground))]">{t("hours.mar")}</span>
                    <span className="text-[hsl(var(--foreground))] font-light">{t("hours.cena")}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-[hsl(var(--muted-foreground))]">{t("hours.dom")}</span>
                    <span className="text-[hsl(var(--foreground))] font-light">{t("hours.domCena")}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Reservation note */}
            <AnimatedSection delay={0.7}>
              <p className="text-[hsl(var(--muted-foreground))] text-xs md:text-sm font-light italic border-l-2 border-[hsl(var(--primary))] pl-3 md:pl-4">
                {t("reservation")}
              </p>
            </AnimatedSection>
          </div>

          {/* Right - Map placeholder */}
          <AnimatedSection direction="right" delay={0.4}>
            <div className="relative h-full min-h-[250px] md:min-h-[350px] lg:min-h-[400px] border border-[hsl(var(--border))] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.817!2d12.4765!3d41.9045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU0JzE2LjIiTiAxMsKwMjgnMzUuNCJF!5e0!3m2!1sit!2sit!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) brightness(0.8) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 pointer-events-none border border-[hsl(var(--border))]" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
