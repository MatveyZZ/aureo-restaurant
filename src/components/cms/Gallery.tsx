import { getContent } from "@/data/site-data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GoldDivider } from "@/components/ui/GoldDivider";

export async function Gallery() {
  const content: any = await getContent();
  const gallery = content.gallery || [];

  return (
    <section id="gallery" className="py-16 md:py-24 lg:py-32 relative bg-[hsl(var(--secondary))]/30">
      <div className="px-4 md:px-6 lg:px-12 xl:px-32">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection>
            <span className="text-[10px] md:text-xs lg:text-sm text-[hsl(var(--primary))] tracking-[0.2em] md:tracking-[0.3em] uppercase block mb-3 md:mb-4">
              Галерея
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[hsl(var(--foreground))] mb-4 md:mb-6">
              Фотографии
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="w-12 md:w-16 h-px bg-linear-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto" />
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {gallery.map((image: any, i: number) => (
            <AnimatedSection key={image.id} delay={0.1 * i} direction="scale">
              <div className={`relative overflow-hidden group ${image.span}`}>
                <div className="aspect-4/3">
                  <img
                    src={image.src}
                    alt={image.altRu || image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="absolute inset-0 bg-[hsl(var(--background))]/0 group-hover:bg-[hsl(var(--background))]/20 transition-colors duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
