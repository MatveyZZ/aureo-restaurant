"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "it", label: "IT", name: "Italiano" },
  { code: "en", label: "EN", name: "English" },
  { code: "ru", label: "RU", name: "Русский" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    router.push(`/${newLocale}/`);
    setIsOpen(false);
  };

  const currentLang = languages.find((l) => l.code === locale);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs tracking-widest uppercase">{currentLang?.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 glass border border-[hsl(var(--border))] py-2 min-w-[140px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm tracking-wider hover:bg-[hsl(var(--muted))] transition-colors duration-200 ${
                locale === lang.code ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
