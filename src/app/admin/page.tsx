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
        <div className="text-[hsl(var(--primary))] text-sm tracking-wider">Загрузка...</div>
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
      <header className="border-b border-[hsl(var(--border))] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl gold-gradient tracking-[0.3em] uppercase font-light">AUREO</span>
          <span className="text-[hsl(var(--muted-foreground))] text-xs tracking-wider">CMS</span>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="text-xs tracking-wider uppercase text-[hsl(var(--muted-foreground))] hover:text-red-400 transition-colors">
            Выйти
          </button>
        </form>
      </header>

      <main className="p-8 max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-light tracking-[0.15em] uppercase text-[hsl(var(--foreground))] mb-2">
            Панель управления
          </h1>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent mb-3" />
          {stats?.lastUpdated && (
            <p className="text-[hsl(var(--muted-foreground))] text-xs">
              Последнее обновление: {new Date(stats.lastUpdated).toLocaleString("ru-RU")}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="block border border-[hsl(var(--border))] p-6 hover:border-[hsl(var(--primary))] transition-colors duration-300 group"
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="text-sm tracking-[0.1em] uppercase text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{card.subtitle}</p>
            </Link>
          ))}
        </div>

        <div className="border border-[hsl(var(--border))] p-6">
          <h2 className="text-sm tracking-[0.15em] uppercase text-[hsl(var(--foreground))] mb-4">
            Быстрый старт
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[hsl(var(--muted-foreground))]">
            <div className="flex gap-2"><span className="text-[hsl(var(--primary))]">1.</span><span>Отредактируйте меню блюд</span></div>
            <div className="flex gap-2"><span className="text-[hsl(var(--primary))]">2.</span><span>Обновите тексты о ресторане и шеф-поваре</span></div>
            <div className="flex gap-2"><span className="text-[hsl(var(--primary))]">3.</span><span>Загрузите фотографии в галерею</span></div>
            <div className="flex gap-2"><span className="text-[hsl(var(--primary))]">4.</span><span>Проверьте контакты и часы работы</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}
