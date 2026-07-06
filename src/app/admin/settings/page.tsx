"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsRedirectPage() {
  const router = useRouter();
  useEffect(() => { router.push("/admin/content"); }, [router]);
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
      <div className="text-[hsl(var(--primary))] text-sm tracking-wider">Перенаправление...</div>
    </div>
  );
}
