"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MenuItem {
  id: number;
  name: string;
  nameEn: string;
  nameRu: string;
  description: string;
  descriptionEn: string;
  descriptionRu: string;
  price: string;
  image: string;
  available: boolean;
}

interface MenuCategories {
  antipasti: MenuItem[];
  primi: MenuItem[];
  secondi: MenuItem[];
  dolci: MenuItem[];
}

interface SiteContent {
  menu: MenuCategories;
  lastUpdated: string;
}

const CATEGORIES = [
  { key: "antipasti", label: "Антипасти", icon: "🥗" },
  { key: "primi", label: "Первое", icon: "🍝" },
  { key: "secondi", label: "Второе", icon: "🥩" },
  { key: "dolci", label: "Десерты", icon: "🍰" },
];

export default function MenuEditorPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("antipasti");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const authRes = await fetch("/api/auth/verify");
      if (!authRes.ok) { router.push("/admin/login"); return; }
      setContent(await fetch("/api/content").then((r) => r.json()));
      setLoading(false);
    };
    loadData();
  }, [router]);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
      else setError("Ошибка сохранения");
    } catch { setError("Ошибка подключения"); }
    setSaving(false);
  };

  const handleAddItem = async (item: Omit<MenuItem, "id">) => {
    if (!content) return;
    try {
      const res = await fetch(`/api/menu?action=add&category=${activeCategory}`);
      const { id } = await res.json();
      const newItem = { ...item, id };
      const catKey = activeCategory as keyof MenuCategories;
      setContent({
        ...content,
        menu: { ...content.menu, [catKey]: [...content.menu[catKey], newItem] },
      });
      setShowAddForm(false);
    } catch { setError("Ошибка добавления"); }
  };

  const handleUpdateItem = async (item: MenuItem) => {
    if (!content) return;
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", category: activeCategory, item }),
      });
      if (res.ok) {
        const catKey = activeCategory as keyof MenuCategories;
        setContent({
          ...content,
          menu: { ...content.menu, [catKey]: content.menu[catKey].map((i) => (i.id === item.id ? item : i)) },
        });
        setEditingItem(null);
      }
    } catch { setError("Ошибка обновления"); }
  };

  const handleDeleteItem = async (id: number) => {
    if (!content) return;
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", category: activeCategory, item: { id } }),
      });
      if (res.ok) {
        const catKey = activeCategory as keyof MenuCategories;
        setContent({
          ...content,
          menu: { ...content.menu, [catKey]: content.menu[catKey].filter((i) => i.id !== id) },
        });
        setDeleteConfirm(null);
        if (editingItem?.id === id) setEditingItem(null);
      }
    } catch { setError("Ошибка удаления"); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="text-[hsl(var(--primary))] text-xs tracking-[0.3em] animate-pulse">Загрузка...</div>
      </div>
    );
  }

  const items = content?.menu?.[activeCategory as keyof MenuCategories] || [];
  const category = CATEGORIES.find((c) => c.key === activeCategory);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <header className="border-b border-[hsl(var(--border))] px-8 py-5 flex items-center justify-between sticky top-0 bg-[hsl(var(--background))]/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300">← Назад</Link>
          <div className="w-px h-4 bg-[hsl(var(--border))]" />
          <h1 className="text-base tracking-[0.2em] uppercase text-[hsl(var(--foreground))]">Редактор меню</h1>
        </div>
        <div className="flex items-center gap-4">
          {saved && <span className="text-sm text-[hsl(var(--primary))] tracking-[0.2em] animate-pulse">Сохранено</span>}
          {error && <span className="text-sm text-red-400 tracking-wider">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 text-sm tracking-[0.3em] uppercase border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-500 disabled:opacity-30">
            {saving ? "Сохранение..." : "Сохранить всё"}
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[hsl(var(--border))] p-6 shrink-0">
          <nav className="space-y-1">
            {CATEGORIES.map((cat) => {
              const catKey = cat.key as keyof MenuCategories;
              const count = content?.menu?.[catKey]?.length || 0;
              return (
                <button
                  key={cat.key}
                  onClick={() => { setActiveCategory(cat.key); setEditingItem(null); setShowAddForm(false); }}
                  className={`w-full text-left px-4 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "text-[hsl(var(--primary))] border-l-2 border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>{cat.label} <span className="opacity-50">({count})</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 lg:p-12 overflow-auto">
          {category && (
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg tracking-[0.15em] uppercase text-[hsl(var(--foreground))]">{category.icon} {category.label}</h2>
                <div className="w-16 h-px bg-linear-to-r from-transparent via-[hsl(var(--primary))] to-transparent mt-2" />
              </div>
              <button onClick={() => setShowAddForm(true)} className="px-4 py-2.5 text-sm tracking-[0.2em] uppercase border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-500">
                + Добавить
              </button>
            </div>
          )}

          {showAddForm && (
            <div className="mb-8 border border-[hsl(var(--primary))] p-6 bg-[hsl(var(--primary))]/5">
              <h3 className="text-sm tracking-[0.15em] uppercase text-[hsl(var(--primary))] mb-4">Новое блюдо</h3>
              <AddItemForm onCancel={() => setShowAddForm(false)} onAdd={handleAddItem} />
            </div>
          )}

          {items.length === 0 ? (
            <div className="text-center py-16 text-[hsl(var(--muted-foreground))] text-sm tracking-[0.2em]">Нет блюд. Добавьте первое!</div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  isEditing={editingItem?.id === item.id}
                  onEdit={() => setEditingItem(item)}
                  onSave={handleUpdateItem}
                  onCancel={() => setEditingItem(null)}
                  onDelete={() => setDeleteConfirm(item.id)}
                  onToggleAvailable={() => handleUpdateItem({ ...item, available: !item.available })}
                />
              ))}
            </div>
          )}

          {deleteConfirm !== null && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-[hsl(var(--background))] border border-[hsl(var(--border))] p-6 max-w-sm w-full mx-4">
                <h3 className="text-sm tracking-[0.15em] uppercase text-[hsl(var(--foreground))] mb-2">Удалить блюдо?</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">Это действие нельзя отменить.</p>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm tracking-[0.2em] uppercase border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Отмена</button>
                  <button onClick={() => handleDeleteItem(deleteConfirm)} className="px-4 py-2 text-sm tracking-[0.2em] uppercase bg-red-600 text-white hover:bg-red-500 transition-colors">Удалить</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function MenuItemCard({ item, isEditing, onEdit, onSave, onCancel, onDelete, onToggleAvailable }: {
  item: MenuItem;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (item: MenuItem) => void;
  onCancel: () => void;
  onDelete: () => void;
  onToggleAvailable: () => void;
}) {
  const prevItemRef = useRef<MenuItem>(item);
  const [editForm, setEditForm] = useState<MenuItem>(item);
  useEffect(() => {
    if (prevItemRef.current.id !== item.id) {
      setEditForm(item);
      prevItemRef.current = item;
    }
  }, [item]);

  if (isEditing) {
    return (
      <div className="border border-[hsl(var(--primary))] p-6 bg-[hsl(var(--primary))]/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField label="Название (IT)" value={editForm.name} onChange={(v) => setEditForm({ ...editForm, name: v })} />
          <FormField label="Название (EN)" value={editForm.nameEn} onChange={(v) => setEditForm({ ...editForm, nameEn: v })} />
          <FormField label="Название (RU)" value={editForm.nameRu} onChange={(v) => setEditForm({ ...editForm, nameRu: v })} />
          <FormField label="Цена" value={editForm.price} onChange={(v) => setEditForm({ ...editForm, price: v })} />
          <FormField label="Изображение" value={editForm.image} onChange={(v) => setEditForm({ ...editForm, image: v })} />
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] cursor-pointer">
              <input type="checkbox" checked={editForm.available} onChange={(e) => setEditForm({ ...editForm, available: e.target.checked })} className="accent-[hsl(var(--primary))]" />
              Доступно
            </label>
          </div>
        </div>
        <TextAreaField label="Описание (IT)" value={editForm.description} onChange={(v) => setEditForm({ ...editForm, description: v })} rows={2} />
        <TextAreaField label="Описание (EN)" value={editForm.descriptionEn} onChange={(v) => setEditForm({ ...editForm, descriptionEn: v })} rows={2} />
        <TextAreaField label="Описание (RU)" value={editForm.descriptionRu} onChange={(v) => setEditForm({ ...editForm, descriptionRu: v })} rows={2} />
        <div className="flex gap-3 mt-4 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-sm tracking-[0.2em] uppercase border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Отмена</button>
          <button onClick={() => onSave(editForm)} className="px-4 py-2 text-sm tracking-[0.2em] uppercase bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition-opacity">Сохранить</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`border border-[hsl(var(--border))] p-5 transition-all duration-300 ${!item.available ? "opacity-50" : "hover:border-[hsl(var(--primary))]/50"}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-sm tracking-widest uppercase text-[hsl(var(--foreground))]">{item.name}</h3>
            {!item.available && <span className="text-xs tracking-[0.2em] uppercase text-red-400 border border-red-400/50 px-2 py-0.5">Недоступно</span>}
          </div>
          <div className="flex gap-3 mt-1">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.nameEn}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.nameRu}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-light text-[hsl(var(--primary))]" style={{ letterSpacing: "0.1em" }}>{item.price}</span>
          <div className="flex gap-1">
            <button onClick={onToggleAvailable} className="p-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" title="Доступно">{item.available ? "✓" : "○"}</button>
            <button onClick={onEdit} className="p-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors" title="Редактировать">✎</button>
            <button onClick={onDelete} className="p-1.5 text-[hsl(var(--muted-foreground))] hover:text-red-400 transition-colors" title="Удалить">✕</button>
          </div>
        </div>
      </div>
      <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{item.description}</p>
      <div className="flex gap-3 mt-2">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.descriptionEn}</p>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.descriptionRu}</p>
      </div>
    </div>
  );
}

function AddItemForm({ onCancel, onAdd }: { onCancel: () => void; onAdd: (item: Omit<MenuItem, "id">) => void }) {
  const [form, setForm] = useState({ name: "", nameEn: "", nameRu: "", description: "", descriptionEn: "", descriptionRu: "", price: "", image: "/images/dish-new.jpg", available: true });
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField label="Название (IT)" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <FormField label="Название (EN)" value={form.nameEn} onChange={(v) => setForm({ ...form, nameEn: v })} />
        <FormField label="Название (RU)" value={form.nameRu} onChange={(v) => setForm({ ...form, nameRu: v })} />
        <FormField label="Цена" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
        <FormField label="Изображение" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] cursor-pointer">
            <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="accent-[hsl(var(--primary))]" />
            Доступно
          </label>
        </div>
      </div>
      <TextAreaField label="Описание (IT)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={2} />
      <TextAreaField label="Описание (EN)" value={form.descriptionEn} onChange={(v) => setForm({ ...form, descriptionEn: v })} rows={2} />
      <TextAreaField label="Описание (RU)" value={form.descriptionRu} onChange={(v) => setForm({ ...form, descriptionRu: v })} rows={2} />
      <div className="flex gap-3 mt-4 justify-end">
        <button onClick={onCancel} className="px-4 py-2 text-sm tracking-[0.2em] uppercase border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Отмена</button>
        <button onClick={() => onAdd(form)} disabled={!form.name || !form.price} className="px-4 py-2 text-sm tracking-[0.2em] uppercase bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition-opacity disabled:opacity-50">Добавить</button>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[hsl(var(--muted-foreground))] text-xs tracking-[0.2em] uppercase mb-2">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-0 py-3 bg-transparent border-0 border-b border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-base font-light focus:outline-none focus:border-[hsl(var(--primary))] transition-colors duration-500" />
    </div>
  );
}

function TextAreaField({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-[hsl(var(--muted-foreground))] text-xs tracking-[0.2em] uppercase mb-2">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full px-0 py-3 bg-transparent border-0 border-b border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-base font-light focus:outline-none focus:border-[hsl(var(--primary))] transition-colors duration-500 resize-y" />
    </div>
  );
}
