import { getContent } from "@/data/site-data";

export async function Footer() {
  const content: any = await getContent();
  const settings = content.settings;

  return (
    <footer className="py-12 md:py-16 border-t border-[hsl(var(--border))]">
      <div className="px-4 md:px-6 lg:px-12 xl:px-32">
        <div className="text-center">
          <span className="text-base md:text-lg lg:text-xl gold-gradient tracking-[0.2em] md:tracking-[0.3em] uppercase font-light block mb-3 md:mb-4">
            {settings?.restaurantNameRu || settings?.restaurantName || "AUREO"}
          </span>

          <div className="w-12 md:w-16 h-px bg-linear-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto mb-4 md:mb-6" />

          <p className="text-[hsl(var(--muted-foreground))] text-sm md:text-base font-light italic mb-6 md:mb-8">
            {settings?.taglineRu || settings?.tagline}
          </p>

          <p className="text-[hsl(var(--muted-foreground))] text-[10px] md:text-xs tracking-wider">
            {settings?.copyrightTextRu || settings?.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
