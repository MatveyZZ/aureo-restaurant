"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AnimatedSection } from "./ui/AnimatedSection";
import { GoldDivider } from "./ui/GoldDivider";

const navItems = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "menu", href: "#menu" },
  { key: "chef", href: "#chef" },
  { key: "gallery", href: "#gallery" },
  { key: "contact", href: "#contact" },
];

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isClient) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-[hsl(var(--border))]"
          : "bg-transparent"
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex flex-col items-center">
            <span className="heading-sm text-[hsl(var(--primary))] letter-spacing-wider font-light">
              AUREO
            </span>
            <GoldDivider width="40px" className="mt-1" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, i) => (
              <AnimatedSection key={item.key} delay={i * 0.05}>
                <a
                  href={item.href}
                  className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
                >
                  {t(item.key as keyof typeof t)}
                </a>
              </AnimatedSection>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="hidden md:inline-block px-6 py-2.5 text-xs tracking-[0.2em] uppercase border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-300"
            >
              {t("contact")}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-[1px] bg-[hsl(var(--primary))] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
              <span className={`block w-6 h-[1px] bg-[hsl(var(--primary))] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-[1px] bg-[hsl(var(--primary))] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden glass border-t border-[hsl(var(--border))] transition-all duration-500 overflow-hidden ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="section-padding py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
            >
              {t(item.key as keyof typeof t)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
