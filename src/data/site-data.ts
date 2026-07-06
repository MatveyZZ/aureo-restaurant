/**
 * Central data store for the site.
 * All content is managed through the CRM admin panel.
 * Data is persisted to a JSON file on disk.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "src", "data", "site-content.json");

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MenuItem {
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

export interface MenuCategories {
  antipasti: MenuItem[];
  primi: MenuItem[];
  secondi: MenuItem[];
  dolci: MenuItem[];
}

export interface AboutContent {
  title: string;
  titleEn: string;
  titleRu: string;
  subtitle: string;
  subtitleEn: string;
  subtitleRu: string;
  paragraph1: string;
  paragraph1En: string;
  paragraph1Ru: string;
  paragraph2: string;
  paragraph2En: string;
  paragraph2Ru: string;
  paragraph3: string;
  paragraph3En: string;
  paragraph3Ru: string;
  stats: {
    value: string;
    label: string;
    labelEn: string;
    labelRu: string;
  }[];
}

export interface ChefContent {
  name: string;
  nameEn: string;
  nameRu: string;
  subtitle: string;
  subtitleEn: string;
  subtitleRu: string;
  paragraph1: string;
  paragraph1En: string;
  paragraph1Ru: string;
  paragraph2: string;
  paragraph2En: string;
  paragraph2Ru: string;
  quote: string;
  quoteEn: string;
  quoteRu: string;
  image: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  altEn: string;
  altRu: string;
  span: string;
}

export interface ContactInfo {
  address: string;
  addressEn: string;
  addressRu: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  hours: {
    lunchStart: string;
    lunchEnd: string;
    dinnerStart: string;
    dinnerEnd: string;
    dinnerEndSun: string;
    closedDay: string;
  };
  reservationText: string;
  reservationTextEn: string;
  reservationTextRu: string;
}

export interface SiteSettings {
  restaurantName: string;
  restaurantNameEn: string;
  restaurantNameRu: string;
  heroSubtitle: string;
  heroSubtitleEn: string;
  heroSubtitleRu: string;
  heroDescription: string;
  heroDescriptionEn: string;
  heroDescriptionRu: string;
  heroImage: string;
  aboutImage: string;
  chefImage: string;
  tagline: string;
  taglineEn: string;
  taglineRu: string;
  copyrightText: string;
  copyrightTextEn: string;
  copyrightTextRu: string;
  tastingMenuText: string;
  tastingMenuTextEn: string;
  tastingMenuTextRu: string;
  tastingMenuPrice: string;
  tastingMenuDesc: string;
  tastingMenuDescEn: string;
  tastingMenuDescRu: string;
  winePairingText: string;
  winePairingTextEn: string;
  winePairingTextRu: string;
}

export interface SiteContent {
  menu: MenuCategories;
  about: AboutContent;
  chef: ChefContent;
  gallery: GalleryImage[];
  contact: ContactInfo;
  settings: SiteSettings;
  lastUpdated: string;
}

// ─── Default Data ────────────────────────────────────────────────────────────

export function getDefaultContent(): SiteContent {
  return {
    menu: {
      antipasti: [
        {
          id: 1,
          name: "Tartare di Tonno Rosso",
          nameEn: "Bluefin Tuna Tartare",
          nameRu: "Тартар из голубого тунца",
          description: "Tonno rosso di Favignana, agrumi di Sicilia, olio evo del Cilento, caviale di storione",
          descriptionEn: "Bluefin tuna from Favignana, Sicilian citrus, Cilento olive oil, sturgeon caviar",
          descriptionRu: "Голубой тунец с Фавиньяны, сицилийские цитрусовые, масло из Кьенто, осетровая икра",
          price: "€42",
          image: "/images/dish-1.jpg",
          available: true,
        },
        {
          id: 2,
          name: "Burrata Pugliese",
          nameEn: "Pugliese Burrata",
          nameRu: "Буррата из Пулии",
          description: "Burrata fresca, pomodorini del Piennolo, basilico, alici di Cetara, sale di Trapani",
          descriptionEn: "Fresh burrata, Piennolo cherry tomatoes, basil, Cetara anchovies, Trapani salt",
          descriptionRu: "Свежая буррата, томаты Пьенолло, базилик, анчоусы из Четары, соль из Трапани",
          price: "€36",
          image: "/images/dish-2.jpg",
          available: true,
        },
        {
          id: 3,
          name: "Carpaccio di Wagyu",
          nameEn: "Wagyu Carpaccio",
          nameRu: "Карпаччо из вагю",
          description: "Wagyu A5 giapponese, rucola selvatica, tartufo nero, parmigiano 36 mesi",
          descriptionEn: "Japanese Wagyu A5, wild arugula, black truffle, 36-month Parmigiano",
          descriptionRu: "Вагю A5, дикий руккола, чёрный трюфель, пармиджано 36 месяцев",
          price: "€58",
          image: "/images/dish-3.jpg",
          available: true,
        },
      ],
      primi: [
        {
          id: 4,
          name: "Tagliatelle al Ragù di Aragosta",
          nameEn: "Lobster Ragù Tagliatelle",
          nameRu: "Тальятелле с рагу из лобстера",
          description: "Pasta all'uovo fatta in casa, astice del Gargano, pomodorini, zafferano dell'Aquila",
          descriptionEn: "Homemade egg pasta, Gargano lobster, cherry tomatoes, L'Aquila saffron",
          descriptionRu: "Домашняя яичная паста, лобстер из Гаргано, томаты, шафран из Л'Акуила",
          price: "€48",
          image: "/images/dish-4.jpg",
          available: true,
        },
        {
          id: 5,
          name: "Risotto al Black Truffle",
          nameEn: "Black Truffle Risotto",
          nameRu: "Ризотто с чёрным трюфелем",
          description: "Riso Carnaroli, tartufo nero pregiato, osso di seppia, burro di Franciacorta",
          descriptionEn: "Carnaroli rice, premium black truffle, cuttlefish ink, Franciacorta butter",
          descriptionRu: "Рис Карнароли, ценный чёрный трюфель, чернилка кальмара, масло из Франчакорты",
          price: "€44",
          image: "/images/dish-5.jpg",
          available: true,
        },
        {
          id: 6,
          name: "Ravioli di Ricotta e Prosciutto",
          nameEn: "Ricotta & Ham Ravioli",
          nameRu: "Равиоли с рикоттой и прошутто",
          description: "Pasta ripiena, ricotta di bufala, prosciutto di San Daniele 24 mesi, salvia, burro tostato",
          descriptionEn: "Stuffed pasta, buffalo ricotta, 24-month San Daniele ham, sage, brown butter",
          descriptionRu: "Начинная паста, буйвола рикотта, прошутто ди Сан-Даниэле 24 месяца, шалфей, томлёное масло",
          price: "€38",
          image: "/images/dish-6.jpg",
          available: true,
        },
      ],
      secondi: [
        {
          id: 7,
          name: "Branzino in Crosta di Sale",
          nameEn: "Salt-Crusted Sea Bass",
          nameRu: "Сибас в соляной корочке",
          description: "Orata del Mediterraneo, crosta di sale marino, verdure di stagione, salsa al limone",
          descriptionEn: "Mediterranean sea bass, sea salt crust, seasonal vegetables, lemon sauce",
          descriptionRu: "Сибас со Средиземноморья, морская соль, сезонные овощи, лимонный соус",
          price: "€52",
          image: "/images/dish-7.jpg",
          available: true,
        },
        {
          id: 8,
          name: "Agnello alle Erbe",
          nameEn: "Herb-Crusted Lamb",
          nameRu: "Ягнёнок в травяной корочке",
          description: "Agnello del Molise, erbe aromatiche mediterranee, patate al tartufo, riduzione di Montepulciano",
          descriptionEn: "Molise lamb, Mediterranean herbs, truffle potatoes, Montepulciano reduction",
          descriptionRu: "Ягнёнок из Молизе, средиземноморские травы, картофель с трюфелем, соус из Монтепульчано",
          price: "€56",
          image: "/images/dish-8.jpg",
          available: true,
        },
        {
          id: 9,
          name: "Ossobuco alla Milanese",
          nameEn: "Ossobuco Milanese",
          nameRu: "Оссобуко по-милански",
          description: "Stinco di vitello, gremolata, risotto allo zafferano, reduction di Barbera",
          descriptionEn: "Veal shank, gremolata, saffron risotto, Barbera reduction",
          descriptionRu: "Телячья голень, гремолата, шафрановое ризотто, соус из Барберы",
          price: "€54",
          image: "/images/dish-9.jpg",
          available: true,
        },
      ],
      dolci: [
        {
          id: 10,
          name: "Sfogliatella AUREO",
          nameEn: "AUREO Sfogliatella",
          nameRu: "Сфоглиателла AUREO",
          description: "Ricotta di bufala, pasta sfoglia, arancia confit, pistacchio di Bronte, gelato alla vaniglia",
          descriptionEn: "Buffalo ricotta, puff pastry, confit orange, Bronte pistachio, vanilla gelato",
          descriptionRu: "Буйвола рикотта, слоёное тесто, конфи из апельсина, пистаchio из Бронте, ванильное джелато",
          price: "€22",
          image: "/images/dish-10.jpg",
          available: true,
        },
        {
          id: 11,
          name: "Cioccolato e Mare",
          nameEn: "Chocolate and Sea",
          nameRu: "Шоколад и море",
          description: "Fondente al 70%, sale marino, alghe, gelato al burro di mare, caramella di limoni di Sorrento",
          descriptionEn: "70% dark chocolate, sea salt, seaweed, sea butter gelato, Sorrento lemon caramel",
          descriptionRu: "Тёмный шоколад 70%, морская соль, водоросли, джелато с морским маслом, карамель из соррентинских лимонов",
          price: "€24",
          image: "/images/dish-11.jpg",
          available: true,
        },
        {
          id: 12,
          name: "Tiramisù Rivisitato",
          nameEn: "Reimagined Tiramisù",
          nameRu: "Тирамису заново",
          description: "Mascarpone, caffè di Ethiopia, savoiardi al cacao, marsala, polvere di pistacchio",
          descriptionEn: "Mascarpone, Ethiopian coffee, cocoa savoiardi, marsala, pistachio powder",
          descriptionRu: "Маскарпоне, эфиопский кофе, савоярди с какао, марсала, пудра из пистаchio",
          price: "€20",
          image: "/images/dish-12.jpg",
          available: true,
        },
      ],
    },
    about: {
      title: "La Nostra Storia",
      titleEn: "Our Story",
      titleRu: "Наша история",
      subtitle: "Dal 1987",
      subtitleEn: "Since 1987",
      subtitleRu: "С 1987 года",
      paragraph1: "AUREO nasce dalla passione di due anime — lo Chef Marco Bellini e la Sommelier Elena Rossi. In un palazzo d'epoca nel centro storico hanno creato un luogo dove la tradizione culinaria italiana si incontra con la più audace innovazione.",
      paragraph1En: "AUREO was born from the passion of two souls — Chef Marco Bellini and Sommelier Elena Rossi. In an ancient palace in the historic center, they created a place where Italian culinary traditions meet the boldest innovative thinking.",
      paragraph1Ru: "AUREO родился из страсти двух душ — шеф-повара Марко Беллини и сомелье Елены Росси. В древнем дворце в историческом центре они создали место, где итальянские кулинарные традиции встречаются с самой смелой новаторской мыслью.",
      paragraph2: "La nostra filosofia è semplice: ingredienti incredibili, trattati con rispetto e maestria. Ogni piatto racconta una storia — la storia delle terre italiane, dei produttori che selezioniamo con cura, e della pazienza che va in ogni creazione.",
      paragraph2En: "Our philosophy is simple: incredible ingredients, handled with respect and skill. Every dish tells a story — the story of Italian lands, the producers we carefully select, and the patience put into every creation.",
      paragraph2Ru: "Наша философия проста: невероятные ингредиенты, обработанные с уважением и мастерством. Каждое блюдо рассказывает историю — историю итальянских земель, производителей, которых мы тщательно отбираем, и терпения, вложенного в каждое создание.",
      paragraph3: "Nel 2019 questo estremo perseguimento della qualità ha ricevuto il massimo riconoscimento — la Stella Michelin. Per noi è un onore e una responsabilità che ci spinge ogni giorno a superare i nostri stessi standard.",
      paragraph3En: "In 2019, this extreme pursuit of quality received the highest recognition — the Michelin Star. For us, it's an honor and a responsibility that drives us every day to surpass our own standards.",
      paragraph3Ru: "В 2019 году это предельное стремление к качеству получило высшее признание — Звезду Мишлен. Для нас это честь и ответственность, которая каждый день двигает нас вперёд, чтобы превзойти собственные стандарты.",
      stats: [
        { value: "1", label: "Stelle Michelin", labelEn: "Michelin Stars", labelRu: "Звёзд Мишлен" },
        { value: "37", label: "Anni di Eccellenza", labelEn: "Years of Excellence", labelRu: "Лет совершенства" },
        { value: "42", label: "Prodotti Selezionati", labelEn: "Selected Products", labelRu: "Избранных производителей" },
        { value: "850", label: "Etichette in Cantina", labelEn: "Wine List Labels", labelRu: "Напитков в винной карте" },
      ],
    },
    chef: {
      name: "Marco Bellini",
      nameEn: "Marco Bellini",
      nameRu: "Марко Беллини",
      subtitle: "Chef",
      subtitleEn: "Chef",
      subtitleRu: "Шеф-повар",
      paragraph1: "Formato nelle cucine più prestigiose d'Italia e di Francia, lo Chef Bellini ha sviluppato un linguaggio culinario unico che onora la tradizione italiana attraverso la lente della contemporaneità.",
      paragraph1En: "Trained in the most prestigious kitchens in Italy and France, Chef Bellini has developed a unique culinary language that honors Italian tradition through the lens of modernity.",
      paragraph1Ru: "Прошедший обучение на самых престижных кухнях Италии и Франции, шеф Беллини разработал уникальный кулинарный язык, который чтит итальянскую традицию через призму современности.",
      paragraph2: "La sua filosofia si fonda su tre pilastri: rispetto per il prodotto, tecnica impeccabile e profonda empatia per chi siede al nostro tavolo. Ogni piatto è un invito a scoprire qualcosa di nuovo, restando nel comfort di sapori che sanno di casa.",
      paragraph2En: "His philosophy is built on three pillars: respect for the ingredient, impeccable technique, and deep empathy for those who sit at our table. Every dish is an invitation to discover something new, while staying in the comfort of flavors that taste like home.",
      paragraph2Ru: "Его философия опирается на три столпа: уважение к продукту, безупречную технику и глубокую эмпатию к тем, кто сидит за нашим столом. Каждое блюдо — это приглашение открыть что-то новое, оставаясь в комфорте вкусов, которые пахнут домом.",
      quote: "La cucina è l'arte di trasformare il semplice in incredibile. Non spreco mai nulla, perché ogni ingrediente ha la sua storia.",
      quoteEn: "Cooking is the art of turning the simple into the incredible. I never waste anything, because every ingredient has its own story.",
      quoteRu: "Кулинария — это искусство превращать простое в невероятное. Я никогда ничего не трачу зря, ведь каждый ингредиент имеет свою историю.",
      image: "/images/chef.jpg",
    },
    gallery: [
      { id: 1, src: "/images/gallery-1.jpg", alt: "Piatto firmato", altEn: "Plated dish", altRu: "Авторское блюдо", span: "md:col-span-2 md:row-span-2" },
      { id: 2, src: "/images/gallery-2.jpg", alt: "Interno del ristorante", altEn: "Restaurant interior", altRu: "Интерьер ресторана", span: "" },
      { id: 3, src: "/images/gallery-3.jpg", alt: "Sala da pranzo", altEn: "Dining room", altRu: "Зал ресторана", span: "" },
      { id: 4, src: "/images/gallery-4.jpg", alt: "Arte culinaria", altEn: "Food art", altRu: "Кулинарное искусство", span: "" },
      { id: 5, src: "/images/gallery-5.jpg", alt: "Dettaglio di plating", altEn: "Plating detail", altRu: "Деталь подачи", span: "" },
    ],
    contact: {
      address: "Via del Corso 42, 00186 Roma, Italia",
      addressEn: "42 Via del Corso, 00186 Rome, Italy",
      addressRu: "Виа дель Корсо 42, 00186, Рим, Италия",
      phone: "+39 06 678 9012",
      email: "info@aureo-roma.it",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.817!2d12.4765!3d41.9045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU0JzE2LjIiTiAxMsKwMjgnMzUuNCJF!5e0!3m2!1sit!2sit!4v1234567890",
      hours: {
        lunchStart: "12:30",
        lunchEnd: "14:30",
        dinnerStart: "19:00",
        dinnerEnd: "23:00",
        dinnerEndSun: "22:30",
        closedDay: "Lunedì",
      },
      reservationText: "Prenotazione consigliata con almeno 48 ore di anticipo",
      reservationTextEn: "Reservation recommended at least 48 hours in advance",
      reservationTextRu: "Рекомендуется бронирование минимум за 48 часов",
    },
    settings: {
      restaurantName: "AUREO",
      restaurantNameEn: "AUREO",
      restaurantNameRu: "AUREO",
      heroSubtitle: "Ristorante con Stella Michelin",
      heroSubtitleEn: "Michelin Star Restaurant",
      heroSubtitleRu: "Ресторан со звездой Мишлен",
      heroDescription: "L'arte della cucina italiana nella sua forma più pura e raffinata",
      heroDescriptionEn: "The art of Italian cuisine in its purest and most refined form",
      heroDescriptionRu: "Искусство итальянской кухни в её чистейшей и самой утончённой форме",
      heroImage: "/images/hero-bg.jpg",
      aboutImage: "/images/about.jpg",
      chefImage: "/images/chef.jpg",
      tagline: "L'arte della perfezione",
      taglineEn: "The art of perfection",
      taglineRu: "Искусство совершенства",
      copyrightText: "© 2024 AUREO. Tutti i diritti riservati.",
      copyrightTextEn: "© 2024 AUREO. All rights reserved.",
      copyrightTextRu: "© 2024 AUREO. Все права защищены.",
      tastingMenuText: "Menu Degustazione",
      tastingMenuTextEn: "Tasting Menu",
      tastingMenuTextRu: "Дегустационное меню",
      tastingMenuPrice: "€185",
      tastingMenuDesc: "7 portate",
      tastingMenuDescEn: "7 courses",
      tastingMenuDescRu: "7 подач",
      winePairingText: "Abbinamento Vini",
      winePairingTextEn: "Wine Pairing",
      winePairingTextRu: "Винное сопровождение",
    },
    lastUpdated: new Date().toISOString(),
  };
}

// ─── Read / Write ────────────────────────────────────────────────────────────

function readContent(): SiteContent {
  if (existsSync(DATA_FILE)) {
    try {
      const raw = readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.menu && parsed.about) return parsed;
    } catch {
      // corrupted file, fall through to defaults
    }
  }
  // File missing or corrupted — return defaults (do NOT write on Netlify, ephemeral FS)
  return getDefaultContent();
}

function writeContent(content: SiteContent): void {
  const dir = join(DATA_FILE, "..");
  // ensure directory exists
  writeFileSync(DATA_FILE, JSON.stringify(content, null, 2), "utf-8");
}

// ─── API-compatible helpers (also usable server-side) ───────────────────────

export async function getContent(): Promise<SiteContent> {
  return readContent();
}

export async function updateContent(content: Partial<SiteContent>): Promise<SiteContent> {
  const existing = readContent();
  const merged: SiteContent = {
    ...existing,
    ...content,
    menu: { ...existing.menu, ...(content.menu ?? {}) },
    about: { ...existing.about, ...(content.about ?? {}) },
    chef: { ...existing.chef, ...(content.chef ?? {}) },
    gallery: content.gallery ?? existing.gallery,
    contact: { ...existing.contact, ...(content.contact ?? {}) },
    settings: { ...existing.settings, ...(content.settings ?? {}) },
    lastUpdated: new Date().toISOString(),
  };
  // Try to persist, but don't fail on ephemeral FS (Netlify)
  try {
    writeContent(merged);
  } catch {
    // Read-only filesystem — changes work in memory but won't persist across deployments
  }
  return merged;
}

export async function getNextMenuId(category: keyof MenuCategories): Promise<number> {
  const content = readContent();
  const items = content.menu[category];
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}
