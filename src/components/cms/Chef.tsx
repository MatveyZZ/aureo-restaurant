import { getContent } from "@/data/site-data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GoldDivider } from "@/components/ui/GoldDivider";

export async function Chef() {
  const content: any = await getContent();
  const chef = content.chef;

  return (
    <section id="chef" className="py-16 md:py-24 lg:py-32 relative bg-[hsl(var(--secondary))]/30">
      <div className="px-4 md:px-6 lg:px-12 xl:px-32">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection>
            <span className="text-[10px] md:text-xs lg:text-sm text-[hsl(var(--primary))] tracking-[0.2em] md:tracking-[0.3em] uppercase block mb-3 md:mb-4">
              {chef?.subtitleRu || chef?.subtitle}
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[hsl(var(--foreground))] mb-4 md:mb-6">
              {chef?.nameRu || chef?.name}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto" />
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto items-center">
          <AnimatedSection direction="right" delay={0.4}>
            <div className="relative aspect-[3/4] overflow-hidden border border-[hsl(var(--border))]">
              <img
                src={chef?.image || content.settings?.chefImage || "/images/chef.jpg"}
                alt={chef?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>

          <div>
            <AnimatedSection delay={0.3}>
              <p className="text-[hsl(var(--foreground))] text-sm md:text-base font-light leading-relaxed mb-6 md:mb-8">
                {chef?.paragraph1Ru || chef?.paragraph1}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <p className="text-[hsl(var(--foreground))] text-sm md:text-base font-light leading-relaxed mb-8 md:mb-10">
                {chef?.paragraph2Ru || chef?.paragraph2}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <blockquote className="border-l-2 border-[hsl(var(--primary))] pl-4 md:pl-6 italic text-[hsl(var(--foreground))] text-sm md:text-base font-light">
                &ldquo;{chef?.quoteRu || chef?.quote}&rdquo;
              </blockquote>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
