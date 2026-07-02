"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GoldDivider } from "./ui/GoldDivider";
import { useEffect, useState } from "react";

export function Hero() {
  const t = useTranslations("hero");
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setSeed(Math.random());
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/hero-bg.jpg"
          alt="AUREO restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))]/80 via-[hsl(var(--background))]/50 to-[hsl(var(--background))]" />
        <div className="absolute inset-0 bg-[hsl(var(--background))]/40" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const left = 20 + ((seed * (i + 1) * 137) % 60);
          const bottom = 10 + ((seed * (i + 1) * 89) % 20);
          const delay = seed * (i + 1) * 4;

          return (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] bg-[hsl(var(--primary))] rounded-full opacity-30"
              animate={{
                y: [0, -100],
                x: [0, ((seed * (i + 1) * 251) % 50) - 25],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4 + ((seed * (i + 1) * 17) % 4),
                repeat: Infinity,
                delay: delay % 4,
                ease: "easeInOut",
              }}
              style={{
                left: `${left}%`,
                bottom: `${bottom}%`,
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 py-20 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-[10px] md:text-xs lg:text-sm text-[hsl(var(--muted-foreground))] tracking-[0.2em] md:tracking-[0.3em] uppercase block mb-4 md:mb-6">
            {t("subtitle")}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-4 md:mb-6"
        >
          <div className="w-16 md:w-20 lg:w-24 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto mb-6 md:mb-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl gold-gradient font-light tracking-wider mb-6 md:mb-8"
        >
          AUREO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-[hsl(var(--muted-foreground))] text-sm md:text-base lg:text-lg font-light max-w-xl md:max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <a
            href="#contact"
            className="inline-block px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-500"
          >
            {t("cta")}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3"
      >
        <span className="text-[hsl(var(--muted-foreground))] text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-6 md:h-8 bg-gradient-to-b from-[hsl(var(--primary))] to-transparent"
        />
      </motion.div>
    </section>
  );
}
