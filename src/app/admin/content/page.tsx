"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SectionKey = "about" | "chef" | "contact" | "settings";

const SECTIONS: { key: SectionKey; label: string; icon: string }[] = [
  { key: "about", label: "О ресторане", icon: "📖" },
  { key: "chef", label: "Шеф-повар", icon: "👨‍🍳" },
  { key: "contact", label: "Контакты", icon: "📞" },
  { key: "settings", label: "Настройки", icon: "⚙" },
];

export default function ContentEditorPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("about");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/auth/verify");
      if (!res.ok) { router.push("/admin/login"); return; }
      setContent(await fetch("/api/content").then((r) => r.json()));
      setLoading(false);
    };
    load();
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

  const updateField = (field: string, value: any) => {
    if (!content) return;
    setContent({ ...content, [activeSection]: { ...content[activeSection], [field]: value } });
  };

  const updateNested = (nested: string, field: string, value: string) => {
    if (!content) return;
    const current = content[activeSection][nested] || {};
    setContent({ ...content, [activeSection]: { ...content[activeSection], [nested]: { ...current, [field]: value } } });
  };

  const updateStat = (index: number, field: string, value: string) => {
    if (!content?.about) return;
    const stats = [...content.about.stats];
    stats[index] = { ...stats[index], [field]: value };
    setContent({ ...content, about: { ...content.about, stats } });
  };

  const addStat = () => {
    if (!content?.about) return;
    setContent({ ...content, about: { ...content.about, stats: [...content.about.stats, { value: "", label: "", labelEn: "", labelRu: "" }] } });
  };

  const removeStat = (index: number) => {
    if (!content?.about) return;
    setContent({ ...content, about: { ...content.about, stats: content.about.stats.filter((_: any, i: number) => i !== index) } });
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
          <h1 className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--foreground))]">Редактор контента</h1>
        </div>
        <div className="flex items-center gap-4">
          {saved && <span className="text-xs text-[hsl(var(--primary))] tracking-[0.2em] animate-pulse">Сохранено</span>}
          {error && <span className="text-xs text-red-400 tracking-wider">{error}</span>}
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 text-[10px] tracking-[0.3em] uppercase border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-500 disabled:opacity-30">
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[hsl(var(--border))] p-6 flex-shrink-0">
          <nav className="space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`w-full text-left px-4 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeSection === s.key
                    ? "text-[hsl(var(--primary))] border-l-2 border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                <span className="mr-2">{s.icon}</span>{s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 lg:p-12 overflow-auto">
          {activeSection === "about" && <AboutEditor content={content?.about} updateField={updateField} updateStat={updateStat} addStat={addStat} removeStat={removeStat} />}
          {activeSection === "chef" && <ChefEditor content={content?.chef} updateField={updateField} />}
          {activeSection === "contact" && <ContactEditor content={content?.contact} updateField={updateField} updateNested={updateNested} />}
          {activeSection === "settings" && <SettingsEditor content={content?.settings} updateField={updateField} />}
        </main>
      </div>
    </div>
  );
}

/* ─── About Editor ─── */
function AboutEditor({ content, updateField, updateStat, addStat, removeStat }: { content: any; updateField: any; updateStat: any; addStat: any; removeStat: any }) {
  if (!content) return null;
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-lg tracking-[0.15em] uppercase text-[hsl(var(--foreground))] mb-1">О ресторане</h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Заголовки</h3>
        <FormField label="Заголовок (IT)" value={content.title} onChange={(v: string) => updateField("title", v)} />
        <FormField label="Заголовок (EN)" value={content.titleEn} onChange={(v: string) => updateField("titleEn", v)} />
        <FormField label="Заголовок (RU)" value={content.titleRu} onChange={(v: string) => updateField("titleRu", v)} />
        <FormField label="Подзаголовок (IT)" value={content.subtitle} onChange={(v: string) => updateField("subtitle", v)} />
        <FormField label="Подзаголовок (EN)" value={content.subtitleEn} onChange={(v: string) => updateField("subtitleEn", v)} />
        <FormField label="Подзаголовок (RU)" value={content.subtitleRu} onChange={(v: string) => updateField("subtitleRu", v)} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Тексты</h3>
        <TextAreaField label="Текст 1 (IT)" value={content.paragraph1} onChange={(v: string) => updateField("paragraph1", v)} rows={4} />
        <TextAreaField label="Текст 1 (EN)" value={content.paragraph1En} onChange={(v: string) => updateField("paragraph1En", v)} rows={4} />
        <TextAreaField label="Текст 1 (RU)" value={content.paragraph1Ru} onChange={(v: string) => updateField("paragraph1Ru", v)} rows={4} />
        <TextAreaField label="Текст 2 (IT)" value={content.paragraph2} onChange={(v: string) => updateField("paragraph2", v)} rows={4} />
        <TextAreaField label="Текст 2 (EN)" value={content.paragraph2En} onChange={(v: string) => updateField("paragraph2En", v)} rows={4} />
        <TextAreaField label="Текст 2 (RU)" value={content.paragraph2Ru} onChange={(v: string) => updateField("paragraph2Ru", v)} rows={4} />
        <TextAreaField label="Текст 3 (IT)" value={content.paragraph3} onChange={(v: string) => updateField("paragraph3", v)} rows={4} />
        <TextAreaField label="Текст 3 (EN)" value={content.paragraph3En} onChange={(v: string) => updateField("paragraph3En", v)} rows={4} />
        <TextAreaField label="Текст 3 (RU)" value={content.paragraph3Ru} onChange={(v: string) => updateField("paragraph3Ru", v)} rows={4} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Статистика</h3>
        <div className="flex items-center justify-between">
          <span />
          <button onClick={addStat} className="text-xs text-[hsl(var(--primary))] tracking-[0.2em] uppercase hover:underline">+ Добавить</button>
        </div>
        {content.stats.map((stat: any, i: number) => (
          <div key={i} className="flex items-start gap-2 p-4 border border-[hsl(var(--border))]">
            <FormFieldSmall label="Значение" value={stat.value} onChange={(v: string) => updateStat(i, "value", v)} />
            <FormFieldSmall label="Текст (IT)" value={stat.label} onChange={(v: string) => updateStat(i, "label", v)} />
            <FormFieldSmall label="Текст (EN)" value={stat.labelEn} onChange={(v: string) => updateStat(i, "labelEn", v)} />
            <FormFieldSmall label="Текст (RU)" value={stat.labelRu} onChange={(v: string) => updateStat(i, "labelRu", v)} />
            <button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-300 mt-6 ml-2">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Chef Editor ─── */
function ChefEditor({ content, updateField }: { content: any; updateField: any }) {
  if (!content) return null;
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-lg tracking-[0.15em] uppercase text-[hsl(var(--foreground))] mb-1">Шеф-повар</h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Имя и должность</h3>
        <FormField label="Имя (IT)" value={content.name} onChange={(v: string) => updateField("name", v)} />
        <FormField label="Имя (EN)" value={content.nameEn} onChange={(v: string) => updateField("nameEn", v)} />
        <FormField label="Имя (RU)" value={content.nameRu} onChange={(v: string) => updateField("nameRu", v)} />
        <FormField label="Должность (IT)" value={content.subtitle} onChange={(v: string) => updateField("subtitle", v)} />
        <FormField label="Должность (EN)" value={content.subtitleEn} onChange={(v: string) => updateField("subtitleEn", v)} />
        <FormField label="Должность (RU)" value={content.subtitleRu} onChange={(v: string) => updateField("subtitleRu", v)} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Тексты</h3>
        <TextAreaField label="Текст 1 (IT)" value={content.paragraph1} onChange={(v: string) => updateField("paragraph1", v)} rows={4} />
        <TextAreaField label="Текст 1 (EN)" value={content.paragraph1En} onChange={(v: string) => updateField("paragraph1En", v)} rows={4} />
        <TextAreaField label="Текст 1 (RU)" value={content.paragraph1Ru} onChange={(v: string) => updateField("paragraph1Ru", v)} rows={4} />
        <TextAreaField label="Текст 2 (IT)" value={content.paragraph2} onChange={(v: string) => updateField("paragraph2", v)} rows={4} />
        <TextAreaField label="Текст 2 (EN)" value={content.paragraph2En} onChange={(v: string) => updateField("paragraph2En", v)} rows={4} />
        <TextAreaField label="Текст 2 (RU)" value={content.paragraph2Ru} onChange={(v: string) => updateField("paragraph2Ru", v)} rows={4} />
        <TextAreaField label="Цитата (IT)" value={content.quote} onChange={(v: string) => updateField("quote", v)} rows={3} />
        <TextAreaField label="Цитата (EN)" value={content.quoteEn} onChange={(v: string) => updateField("quoteEn", v)} rows={3} />
        <TextAreaField label="Цитата (RU)" value={content.quoteRu} onChange={(v: string) => updateField("quoteRu", v)} rows={3} />
      </div>
    </div>
  );
}

/* ─── Contact Editor ─── */
function ContactEditor({ content, updateField, updateNested }: { content: any; updateField: any; updateNested: any }) {
  if (!content) return null;
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-lg tracking-[0.15em] uppercase text-[hsl(var(--foreground))] mb-1">Контакты</h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Контактная информация</h3>
        <FormField label="Адрес (IT)" value={content.address} onChange={(v: string) => updateField("address", v)} />
        <FormField label="Адрес (EN)" value={content.addressEn} onChange={(v: string) => updateField("addressEn", v)} />
        <FormField label="Адрес (RU)" value={content.addressRu} onChange={(v: string) => updateField("addressRu", v)} />
        <FormField label="Телефон" value={content.phone} onChange={(v: string) => updateField("phone", v)} />
        <FormField label="Email" value={content.email} onChange={(v: string) => updateField("email", v)} />
        <FormField label="URL карты (embed)" value={content.mapEmbedUrl} onChange={(v: string) => updateField("mapEmbedUrl", v)} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Часы работы</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <FormFieldSmall label="Обед начало" value={content.hours.lunchStart} onChange={(v: string) => updateNested("hours", "lunchStart", v)} />
          <FormFieldSmall label="Обед конец" value={content.hours.lunchEnd} onChange={(v: string) => updateNested("hours", "lunchEnd", v)} />
          <FormFieldSmall label="Ужин начало" value={content.hours.dinnerStart} onChange={(v: string) => updateNested("hours", "dinnerStart", v)} />
          <FormFieldSmall label="Ужин конец" value={content.hours.dinnerEnd} onChange={(v: string) => updateNested("hours", "dinnerEnd", v)} />
          <FormFieldSmall label="Ужин вс (конец)" value={content.hours.dinnerEndSun} onChange={(v: string) => updateNested("hours", "dinnerEndSun", v)} />
          <FormFieldSmall label="День отдыха" value={content.hours.closedDay} onChange={(v: string) => updateNested("hours", "closedDay", v)} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Бронирование</h3>
        <FormField label="Текст (IT)" value={content.reservationText} onChange={(v: string) => updateField("reservationText", v)} />
        <FormField label="Текст (EN)" value={content.reservationTextEn} onChange={(v: string) => updateField("reservationTextEn", v)} />
        <FormField label="Текст (RU)" value={content.reservationTextRu} onChange={(v: string) => updateField("reservationTextRu", v)} />
      </div>
    </div>
  );
}

/* ─── Settings Editor ─── */
function SettingsEditor({ content, updateField }: { content: any; updateField: any }) {
  if (!content) return null;
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-lg tracking-[0.15em] uppercase text-[hsl(var(--foreground))] mb-1">Настройки сайта</h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Общие</h3>
        <FormField label="Название (IT)" value={content.restaurantName} onChange={(v: string) => updateField("restaurantName", v)} />
        <FormField label="Название (EN)" value={content.restaurantNameEn} onChange={(v: string) => updateField("restaurantNameEn", v)} />
        <FormField label="Название (RU)" value={content.restaurantNameRu} onChange={(v: string) => updateField("restaurantNameRu", v)} />
        <FormField label="Теглайн (IT)" value={content.tagline} onChange={(v: string) => updateField("tagline", v)} />
        <FormField label="Теглайн (EN)" value={content.taglineEn} onChange={(v: string) => updateField("taglineEn", v)} />
        <FormField label="Теглайн (RU)" value={content.taglineRu} onChange={(v: string) => updateField("taglineRu", v)} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Hero секция</h3>
        <FormField label="Подзаголовок (IT)" value={content.heroSubtitle} onChange={(v: string) => updateField("heroSubtitle", v)} />
        <FormField label="Подзаголовок (EN)" value={content.heroSubtitleEn} onChange={(v: string) => updateField("heroSubtitleEn", v)} />
        <FormField label="Подзаголовок (RU)" value={content.heroSubtitleRu} onChange={(v: string) => updateField("heroSubtitleRu", v)} />
        <TextAreaField label="Описание (IT)" value={content.heroDescription} onChange={(v: string) => updateField("heroDescription", v)} rows={3} />
        <TextAreaField label="Описание (EN)" value={content.heroDescriptionEn} onChange={(v: string) => updateField("heroDescriptionEn", v)} rows={3} />
        <TextAreaField label="Описание (RU)" value={content.heroDescriptionRu} onChange={(v: string) => updateField("heroDescriptionRu", v)} rows={3} />
        <FormField label="Изображение (путь)" value={content.heroImage} onChange={(v: string) => updateField("heroImage", v)} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Дегустационное меню</h3>
        <FormField label="Название (IT)" value={content.tastingMenuText} onChange={(v: string) => updateField("tastingMenuText", v)} />
        <FormField label="Название (EN)" value={content.tastingMenuTextEn} onChange={(v: string) => updateField("tastingMenuTextEn", v)} />
        <FormField label="Название (RU)" value={content.tastingMenuTextRu} onChange={(v: string) => updateField("tastingMenuTextRu", v)} />
        <FormField label="Цена" value={content.tastingMenuPrice} onChange={(v: string) => updateField("tastingMenuPrice", v)} />
        <FormField label="Описание (IT)" value={content.tastingMenuDesc} onChange={(v: string) => updateField("tastingMenuDesc", v)} />
        <FormField label="Описание (EN)" value={content.tastingMenuDescEn} onChange={(v: string) => updateField("tastingMenuDescEn", v)} />
        <FormField label="Описание (RU)" value={content.tastingMenuDescRu} onChange={(v: string) => updateField("tastingMenuDescRu", v)} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Винное сопровождение</h3>
        <FormField label="Текст (IT)" value={content.winePairingText} onChange={(v: string) => updateField("winePairingText", v)} />
        <FormField label="Текст (EN)" value={content.winePairingTextEn} onChange={(v: string) => updateField("winePairingTextEn", v)} />
        <FormField label="Текст (RU)" value={content.winePairingTextRu} onChange={(v: string) => updateField("winePairingTextRu", v)} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">Футер</h3>
        <FormField label="Копирайт (IT)" value={content.copyrightText} onChange={(v: string) => updateField("copyrightText", v)} />
        <FormField label="Копирайт (EN)" value={content.copyrightTextEn} onChange={(v: string) => updateField("copyrightTextEn", v)} />
        <FormField label="Копирайт (RU)" value={content.copyrightTextRu} onChange={(v: string) => updateField("copyrightTextRu", v)} />
      </div>
    </div>
  );
}

/* ─── Form Components ─── */
function FormField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[hsl(var(--muted-foreground))] text-[10px] tracking-[0.2em] uppercase mb-2">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm font-light focus:outline-none focus:border-[hsl(var(--primary))] transition-colors duration-500" />
    </div>
  );
}

function TextAreaField({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-[hsl(var(--muted-foreground))] text-[10px] tracking-[0.2em] uppercase mb-2">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm font-light focus:outline-none focus:border-[hsl(var(--primary))] transition-colors duration-500 resize-y" />
    </div>
  );
}

function FormFieldSmall({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex-1 min-w-0">
      <label className="block text-[hsl(var(--muted-foreground))] text-[10px] tracking-[0.15em] uppercase mb-1.5">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-0 py-1.5 bg-transparent border-0 border-b border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-xs font-light focus:outline-none focus:border-[hsl(var(--primary))] transition-colors duration-500" />
    </div>
  );
}
