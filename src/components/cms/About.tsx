import { getContent } from "@/data/site-data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GoldDivider } from "@/components/ui/GoldDivider";

export async function About() {
  const content: any = await getContent();
  const about = content.about;

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 relative">
      <div className="px-4 md:px-6 lg:px-12 xl:px-32">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection>
            <span className="text-[10px] md:text-xs lg:text-sm text-[hsl(var(--primary))] tracking-[0.2em] md:tracking-[0.3em] uppercase block mb-3 md:mb-4">
              {about?.subtitleRu || about?.subtitle}
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[hsl(var(--foreground))] mb-4 md:mb-6">
              {about?.titleRu || about?.title}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="w-12 md:w-16 h-px bg-linear-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto" />
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto items-center">
          <div>
            <AnimatedSection delay={0.3}>
              <p className="text-[hsl(var(--foreground))] text-sm md:text-base font-light leading-relaxed mb-6 md:mb-8">
                {about?.paragraph1Ru || about?.paragraph1}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <p className="text-[hsl(var(--foreground))] text-sm md:text-base font-light leading-relaxed mb-6 md:mb-8">
                {about?.paragraph2Ru || about?.paragraph2}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <p className="text-[hsl(var(--foreground))] text-sm md:text-base font-light leading-relaxed">
                {about?.paragraph3Ru || about?.paragraph3}
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="right" delay={0.4}>
            <div className="relative aspect-square overflow-hidden border border-[hsl(var(--border))]">
              <img
                src={about?.aboutImage || "/images/about.jpg"}
                alt="О ресторане"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>

        {about?.stats && about.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20 max-w-4xl mx-auto">
            {about.stats.map((stat: { value: string; label: string; labelEn: string; labelRu: string }, i: number) => (
              <AnimatedSection key={i} delay={0.1 * i}>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl text-[hsl(var(--primary))] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[hsl(var(--muted-foreground))] text-xs md:text-sm font-light">
                    {stat.labelRu || stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
