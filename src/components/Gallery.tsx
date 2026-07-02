"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "./ui/AnimatedSection";
import { GoldDivider } from "./ui/GoldDivider";

const galleryImages = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Plated dish",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Restaurant interior",
    span: "",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Dining room",
    span: "",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Food art",
    span: "",
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Plating detail",
    span: "",
  },
];

export function Gallery() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="py-24 md:py-32 relative bg-[hsl(var(--secondary))]/30">
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
            <GoldDivider width="60px" className="mx-auto" />
          </AnimatedSection>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, i) => (
            <AnimatedSection
              key={i}
              delay={0.1 * i}
              direction="scale"
              className={`${image.span} ${!image.span ? "md:col-span-1" : ""}`}
            >
              <div className="relative overflow-hidden group aspect-[4/3]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-[hsl(var(--background))]/0 group-hover:bg-[hsl(var(--background))]/20 transition-colors duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
