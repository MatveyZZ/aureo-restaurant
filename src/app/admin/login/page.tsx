"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

        if (res.ok) {
          router.push("/admin");
          router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Ошибка авторизации");
      }
    } catch {
      setError("Ошибка подключения к серверу");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="text-3xl gold-gradient tracking-[0.3em] uppercase font-light block mb-2">
            AUREO
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto mb-3" />
          <p className="text-[hsl(var(--muted-foreground))] text-sm tracking-wider">
            Панель управления
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[hsl(var(--muted-foreground))] text-xs tracking-wider uppercase mb-2">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm focus:outline-none focus:border-[hsl(var(--primary))] transition-colors duration-300"
              placeholder="Введите пароль"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-xs tracking-[0.2em] uppercase border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className="text-[hsl(var(--muted-foreground))] text-[10px] text-center mt-8 tracking-wider">
          По умолчанию: admin123
        </p>
      </div>
    </div>
  );
}
