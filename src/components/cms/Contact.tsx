import { getContent } from "@/data/site-data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GoldDivider } from "@/components/ui/GoldDivider";

export async function Contact() {
  const content: any = await getContent();
  const contact = content.contact;
  const settings = content.settings;

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 relative">
      <div className="px-4 md:px-6 lg:px-12 xl:px-32">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection>
            <span className="text-[10px] md:text-xs lg:text-sm text-[hsl(var(--primary))] tracking-[0.2em] md:tracking-[0.3em] uppercase block mb-3 md:mb-4">
              Контакты
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[hsl(var(--foreground))] mb-4 md:mb-6">
              Связаться с нами
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="w-12 md:w-16 h-px bg-linear-to-r from-transparent via-[hsl(var(--primary))] to-transparent mx-auto" />
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
          <div>
            <AnimatedSection delay={0.3}>
              <div className="flex items-start gap-3 md:gap-4 mb-8 md:mb-10">
                <span className="text-[hsl(var(--primary))] mt-1">📍</span>
                <p className="text-[hsl(var(--foreground))] text-sm md:text-base font-light">
                  {contact?.addressRu || contact?.address}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="flex items-start gap-3 md:gap-4 mb-8 md:mb-10">
                <span className="text-[hsl(var(--primary))] mt-1">📞</span>
                <a
                  href={`tel:${contact?.phone?.replace(/\s/g, "")}`}
                  className="text-[hsl(var(--foreground))] text-sm md:text-base font-light hover:text-[hsl(var(--primary))] transition-colors duration-300"
                >
                  {contact?.phone}
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="flex items-start gap-3 md:gap-4 mb-8 md:mb-10">
                <span className="text-[hsl(var(--primary))] mt-1">✉</span>
                <a
                  href={`mailto:${contact?.email}`}
                  className="text-[hsl(var(--foreground))] text-sm md:text-base font-light hover:text-[hsl(var(--primary))] transition-colors duration-300"
                >
                  {contact?.email}
                </a>
              </div>
            </AnimatedSection>

            {contact?.hours && (
              <AnimatedSection delay={0.6}>
                <div className="mb-8 md:mb-10">
                  <h3 className="text-[hsl(var(--foreground))] font-light text-base md:text-lg mb-4">
                    Часы работы
                  </h3>
                  <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-[hsl(var(--muted-foreground))]">Вт — Чт</span>
                      <span className="text-[hsl(var(--foreground))] font-light">
                        {contact.hours.lunchStart}–{contact.hours.lunchEnd} / {contact.hours.dinnerStart}–{contact.hours.dinnerEnd}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[hsl(var(--muted-foreground))]">Пт — Сб</span>
                      <span className="text-[hsl(var(--foreground))] font-light">
                        {contact.hours.lunchStart}–{contact.hours.lunchEnd} / {contact.hours.dinnerStart}–{contact.hours.dinnerEnd}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[hsl(var(--muted-foreground))])">Воскресенье</span>
                      <span className="text-[hsl(var(--foreground))] font-light">
                        {contact.hours.lunchStart}–{contact.hours.lunchEnd} / {contact.hours.dinnerStart}–{contact.hours.dinnerEndSun}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[hsl(var(--muted-foreground))]">{contact.hours.closedDay || "Понедельник"}</span>
                      <span className="text-red-400 font-light">Закрыто</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection delay={0.7}>
              <p className="text-[hsl(var(--muted-foreground))] text-xs md:text-sm font-light italic border-l-2 border-[hsl(var(--primary))] pl-3 md:pl-4">
                {contact?.reservationTextRu || contact?.reservationText}
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="right" delay={0.4}>
            <div className="relative h-full min-h-[250px] md:min-h-[350px] lg:min-h-[400px] border border-[hsl(var(--border))] overflow-hidden">
              {contact?.mapEmbedUrl && (
                <iframe
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) brightness(0.8) contrast(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              )}
              <div className="absolute inset-0 pointer-events-none border border-[hsl(var(--border))]" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
