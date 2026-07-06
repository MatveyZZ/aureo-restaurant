"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardStats {
  menuItems: number;
  galleryImages: number;
  lastUpdated: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/verify");
      if (!res.ok) {
        router.push("/admin/login");
        return;
      }
      const content = await fetch("/api/content").then((r) => r.json());
      
      const totalMenuItems =
        (content.menu?.antipasti?.length || 0) +
        (content.menu?.primi?.length || 0) +
        (content.menu?.secondi?.length || 0) +
        (content.menu?.dolci?.length || 0);

      setStats({
        menuItems: totalMenuItems,
        galleryImages: content.gallery?.length || 0,
        lastUpdated: content.lastUpdated,
      });
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="text-[hsl(var(--primary))] text-xs tracking-[0.3em] animate-pulse">Загрузка...</div>
      </div>
    );
  }

  const cards = [
    { href: "/admin/menu", title: "Меню", subtitle: `${stats?.menuItems || 0} блюд`, icon: "🍽" },
    { href: "/admin/content", title: "Контент", subtitle: "4 раздела", icon: "📝" },
    { href: "/admin/gallery", title: "Галерея", subtitle: `${stats?.galleryImages || 0} фото`, icon: "🖼" },
    { href: "/admin/settings", title: "Настройки", subtitle: "Общие", icon: "⚙" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <header className="border-b border-[hsl(var(--border))] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl gold-gradient tracking-[0.3em] uppercase font-light">AUREO</span>
          <div className="w-px h-4 bg-[hsl(var(--border))]" />
          <span className="text-[hsl(var(--muted-foreground))] text-xs tracking-[0.3em] uppercase">CMS</span>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300">
            Выйти
          </button>
        </form>
      </header>

      {/* Main */}
      <main className="p-8 max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.15em] uppercase text-[hsl(var(--foreground))] mb-3">
            Панель управления
          </h1>
          <div className="w-24 h-px bg-linear-to-r from-transparent via-[hsl(var(--primary))] to-transparent mb-4" />
          {stats?.lastUpdated && (
            <p className="text-[hsl(var(--muted-foreground))] text-sm tracking-wider">
              Последнее обновление: {new Date(stats.lastUpdated).toLocaleString("ru-RU")}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block border border-[hsl(var(--border))] p-6 hover:border-[hsl(var(--primary))] transition-all duration-500"
            >
              <div className="text-2xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">{card.icon}</div>
              <h3 className="text-base tracking-[0.15em] uppercase text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors duration-500">
                {card.title}
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2 font-light">{card.subtitle}</p>
            </Link>
          ))}
        </div>

        {/* Quick Start */}
        <div className="border border-[hsl(var(--border))] p-8">
          <h2 className="text-base tracking-[0.2em] uppercase text-[hsl(var(--foreground))] mb-6">
            Быстрый старт
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[hsl(var(--muted-foreground))] font-light">
            <div className="flex gap-3">
              <span className="text-[hsl(var(--primary))]">01</span>
              <span>Отредактируйте меню блюд</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[hsl(var(--primary))]">02</span>
              <span>Обновите тексты о ресторане и шеф-поваре</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[hsl(var(--primary))]">03</span>
              <span>Загрузите фотографии в галерею</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[hsl(var(--primary))]">04</span>
              <span>Проверьте контакты и часы работы</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
