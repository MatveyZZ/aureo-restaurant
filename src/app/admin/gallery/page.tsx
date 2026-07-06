"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  altEn: string;
  altRu: string;
  span: string;
}

interface SiteContent {
  gallery: GalleryImage[];
  lastUpdated: string;
}

const SPAN_OPTIONS = [
  { value: "", label: "Обычный (1×1)" },
  { value: "md:col-span-2", label: "Широкий (2×1)" },
  { value: "md:row-span-2", label: "Высокий (1×2)" },
  { value: "md:col-span-2 md:row-span-2", label: "Большой (2×2)" },
];

export default function GalleryEditorPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
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

  const handleAddImage = (image: Omit<GalleryImage, "id">) => {
    if (!content) return;
    const maxId = content.gallery.length > 0 ? Math.max(...content.gallery.map((i) => i.id)) : 0;
    setContent({ ...content, gallery: [...content.gallery, { ...image, id: maxId + 1 }] });
    setShowAddForm(false);
  };

  const handleUpdateImage = (image: GalleryImage) => {
    if (!content) return;
    setContent({ ...content, gallery: content.gallery.map((img) => (img.id === image.id ? image : img)) });
    setEditingImage(null);
  };

  const handleDeleteImage = (id: number) => {
    if (!content) return;
    setContent({ ...content, gallery: content.gallery.filter((img) => img.id !== id) });
    setDeleteConfirm(null);
    if (editingImage?.id === id) setEditingImage(null);
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (!content) return;
    const gallery = [...content.gallery];
    const [moved] = gallery.splice(fromIndex, 1);
    gallery.splice(toIndex, 0, moved);
    setContent({ ...content, gallery });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="text-[hsl(var(--primary))] text-xs tracking-[0.3em] animate-pulse">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <header className="border-b border-[hsl(var(--border))] px-8 py-5 flex items-center justify-between sticky top-0 bg-[hsl(var(--background))]/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4">
          <a href="/admin" className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300">← Назад</a>
          <div className="w-[1px] h-4 bg-[hsl(var(--border))]" />
          <h1 className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--foreground))]">Редактор галереи</h1>
        </div>
        <div className="flex items-center gap-4">
          {saved && <span className="text-xs text-[hsl(var(--primary))] tracking-[0.2em] animate-pulse">Сохранено</span>}
          {error && <span className="text-xs text-red-400 tracking-wider">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 text-[10px] tracking-[0.3em] uppercase border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-500 disabled:opacity-30">
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </header>

      <main className="p-8 lg:p-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs text-[hsl(var(--muted-foreground))] tracking-[0.2em]">{content?.gallery.length || 0} фотографий</p>
          <button onClick={() => setShowAddForm(true)} className="px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-500">+ Добавить</button>
        </div>

        {showAddForm && (
          <div className="mb-8 border border-[hsl(var(--primary))] p-6 bg-[hsl(var(--primary))]/5">
            <h3 className="text-sm tracking-[0.15em] uppercase text-[hsl(var(--primary))] mb-4">Новое фото</h3>
            <AddImageForm onCancel={() => setShowAddForm(false)} onAdd={handleAddImage} />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {content?.gallery.map((img, index) => (
            <GalleryThumbnail
              key={img.id}
              image={img}
              isEditing={editingImage?.id === img.id}
              onEdit={() => setEditingImage(img)}
              onSave={handleUpdateImage}
              onCancel={() => setEditingImage(null)}
              onDelete={() => setDeleteConfirm(img.id)}
              onMoveUp={index > 0 ? () => handleMoveImage(index, index - 1) : undefined}
              onMoveDown={index < (content.gallery.length - 1) ? () => handleMoveImage(index, index + 1) : undefined}
            />
          ))}
        </div>

        {(!content?.gallery || content.gallery.length === 0) && (
          <div className="text-center py-16 text-[hsl(var(--muted-foreground))] text-xs tracking-[0.2em]">Галерея пуста. Добавьте первое фото!</div>
        )}

        {deleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[hsl(var(--background))] border border-[hsl(var(--border))] p-6 max-w-sm w-full mx-4">
              <h3 className="text-sm tracking-[0.15em] uppercase text-[hsl(var(--foreground))] mb-2">Удалить фото?</h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-6">Это действие нельзя отменить.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-xs tracking-[0.2em] uppercase border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Отмена</button>
                <button onClick={() => handleDeleteImage(deleteConfirm)} className="px-4 py-2 text-xs tracking-[0.2em] uppercase bg-red-600 text-white hover:bg-red-500 transition-colors">Удалить</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function GalleryThumbnail({ image, isEditing, onEdit, onSave, onCancel, onDelete, onMoveUp, onMoveDown }: {
  image: GalleryImage;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (image: GalleryImage) => void;
  onCancel: () => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const [editForm, setEditForm] = useState<GalleryImage>(image);
  useEffect(() => { setEditForm(image); }, [image]);

  if (isEditing) {
    return (
      <div className={`border border-[hsl(var(--primary))] p-4 bg-[hsl(var(--primary))]/5 ${image.span}`}>
        <div className="space-y-3">
          <FormField label="Путь к фото" value={editForm.src} onChange={(v: string) => setEditForm({ ...editForm, src: v })} />
          <FormField label="Описание (IT)" value={editForm.alt} onChange={(v: string) => setEditForm({ ...editForm, alt: v })} />
          <FormField label="Описание (EN)" value={editForm.altEn} onChange={(v: string) => setEditForm({ ...editForm, altEn: v })} />
          <FormField label="Описание (RU)" value={editForm.altRu} onChange={(v: string) => setEditForm({ ...editForm, altRu: v })} />
          <div>
            <label className="block text-[hsl(var(--muted-foreground))] text-[10px] tracking-[0.2em] uppercase mb-1.5">Размер</label>
            <select value={editForm.span} onChange={(e) => setEditForm({ ...editForm, span: e.target.value })} className="w-full px-3 py-2 bg-transparent border-0 border-b border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm font-light focus:outline-none focus:border-[hsl(var(--primary))] transition-colors duration-500">
              {SPAN_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={onCancel} className="px-3 py-1.5 text-xs tracking-[0.2em] uppercase border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Отмена</button>
            <button onClick={() => onSave(editForm)} className="px-3 py-1.5 text-xs tracking-[0.2em] uppercase bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition-opacity">Сохранить</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative border border-[hsl(var(--border))] overflow-hidden hover:border-[hsl(var(--primary))]/50 transition-all duration-300 ${image.span}`}>
      <div className="aspect-square bg-[hsl(var(--muted))] flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl mb-2 opacity-30">🖼</div>
          <p className="text-[10px] text-[hsl(var(--muted-foreground))] tracking-[0.2em] uppercase">{image.src}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="flex gap-2 mb-2">
          <button onClick={onEdit} className="p-2 text-white hover:text-[hsl(var(--primary))] transition-colors" title="Редактировать">✎</button>
          <button onClick={onDelete} className="p-2 text-white hover:text-red-400 transition-colors" title="Удалить">✕</button>
        </div>
        <div className="flex gap-2">
          <button onClick={onMoveUp} disabled={!onMoveUp} className="p-2 text-white hover:text-[hsl(var(--primary))] transition-colors disabled:opacity-30" title="Вверх">↑</button>
          <button onClick={onMoveDown} disabled={!onMoveDown} className="p-2 text-white hover:text-[hsl(var(--primary))] transition-colors disabled:opacity-30" title="Вниз">↓</button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-[10px] text-white/80 truncate">{image.alt}</p>
      </div>
      <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5">#{image.id}</div>
    </div>
  );
}

function AddImageForm({ onCancel, onAdd }: { onCancel: () => void; onAdd: (image: Omit<GalleryImage, "id">) => void }) {
  const [form, setForm] = useState({ src: "/images/gallery-new.jpg", alt: "Описание", altEn: "Description", altRu: "Описание", span: "" });
  return (
    <div className="space-y-4">
      <FormField label="Путь к фото" value={form.src} onChange={(v: string) => setForm({ ...form, src: v })} />
      <FormField label="Описание (IT)" value={form.alt} onChange={(v: string) => setForm({ ...form, alt: v })} />
      <FormField label="Описание (EN)" value={form.altEn} onChange={(v: string) => setForm({ ...form, altEn: v })} />
      <FormField label="Описание (RU)" value={form.altRu} onChange={(v: string) => setForm({ ...form, altRu: v })} />
      <div>
        <label className="block text-[hsl(var(--muted-foreground))] text-[10px] tracking-[0.2em] uppercase mb-1.5">Размер</label>
        <select value={form.span} onChange={(e) => setForm({ ...form, span: e.target.value })} className="w-full px-4 py-2.5 bg-transparent border-0 border-b border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm font-light focus:outline-none focus:border-[hsl(var(--primary))] transition-colors duration-500">
          {SPAN_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div className="flex gap-3 justify-end">
        <button onClick={onCancel} className="px-4 py-2 text-xs tracking-[0.2em] uppercase border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Отмена</button>
        <button onClick={() => onAdd(form)} disabled={!form.src} className="px-4 py-2 text-xs tracking-[0.2em] uppercase bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition-opacity disabled:opacity-50">Добавить</button>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[hsl(var(--muted-foreground))] text-[10px] tracking-[0.2em] uppercase mb-2">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm font-light focus:outline-none focus:border-[hsl(var(--primary))] transition-colors duration-500" />
    </div>
  );
}
