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
        setError(data.error || "Неверный пароль");
      }
    } catch {
      setError("Ошибка подключения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <div className="w-px h-full bg-linear-to-b from-transparent via-[hsl(var(--primary))] to-transparent" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <span className="text-4xl md:text-5xl gold-gradient tracking-[0.4em] uppercase font-light block mb-4">
            AUREO
          </span>
          <div className="w-24 h-px bg-linear-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto mb-4" />
          <p className="text-[hsl(var(--muted-foreground))] text-xs tracking-[0.3em] uppercase">
            Панель управления
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-[hsl(var(--muted-foreground))] text-[10px] tracking-[0.2em] uppercase mb-3">
              Пароль доступа
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm font-light focus:outline-none focus:border-[hsl(var(--primary))] transition-colors duration-500 placeholder:text-[hsl(var(--muted-foreground))]/50"
              placeholder="Введите пароль"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-[hsl(var(--primary))] text-xs text-center tracking-wider">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 text-[10px] tracking-[0.3em] uppercase border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-500 disabled:opacity-30"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Вход...
              </span>
            ) : (
              "Войти"
            )}
          </button>
        </form>

        <p className="text-[hsl(var(--muted-foreground))] text-[10px] text-center mt-12 tracking-[0.2em]">
          © 2025 AUREO
        </p>
      </div>
    </div>
  );
}
