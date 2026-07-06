import { getContent } from "@/data/site-data";

export async function Hero() {
  const content: any = await getContent();
  const locale = "ru"; // will be passed from parent
  
  return (
    <section
      id="home"
      className="relative h-screen min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src={content.settings?.heroImage || "/images/hero-bg.jpg"}
          alt="AUREO restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))]/80 via-[hsl(var(--background))]/50 to-[hsl(var(--background))]" />
        <div className="absolute inset-0 bg-[hsl(var(--background))]/40" />
      </div>

      <div className="relative z-10 text-center px-4 md:px-6 py-20 md:py-0">
        <div className="mb-4 md:mb-6">
          <div className="w-16 md:w-20 lg:w-24 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto mb-6 md:mb-8" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl gold-gradient font-light tracking-wider mb-6 md:mb-8">
          AUREO
        </h1>

        <p className="text-[hsl(var(--muted-foreground))] text-sm md:text-base lg:text-lg font-light max-w-xl md:max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12">
          {content.settings?.heroDescriptionRu || content.settings?.heroDescription || "L'arte della cucina italiana nella sua forma più pura e raffinata"}
        </p>

        <a
          href="#contact"
          className="inline-block px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-500"
        >
          Забронировать
        </a>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3">
        <span className="text-[hsl(var(--muted-foreground))] text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-6 md:h-8 bg-gradient-to-b from-[hsl(var(--primary))] to-transparent" />
      </div>
    </section>
  );
}
