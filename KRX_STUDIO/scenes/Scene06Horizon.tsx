import { motion } from 'motion/react';
import { AtmosphericVideo } from '../components/AtmosphericVideo';
import { TextReveal } from '../components/TextReveal';
import { KRX_CONTENT } from '../data/krxContent';
import { KRX_TOKENS } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

export function Scene06Horizon() {
  const reducedMotion = usePrefersReducedMotion();
  const { eyebrow, headline, intro, closingLine, microcopy, videoSrc, imageSrc, imageAlt, areas } =
    KRX_CONTENT.horizon;

  return (
    <section
      id="horizon"
      aria-label="Horizon"
      className="relative w-full bg-[#0A0A0A] text-[#F3F1ED] overflow-x-clip"
    >
      {/* Full-bleed atmospheric dawn video band */}
      <div className="relative h-[56vh] min-h-[380px] max-h-[640px] w-full overflow-hidden">
        <AtmosphericVideo
          src={videoSrc}
          poster={imageSrc}
          alt={imageAlt}
          className="h-full w-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"
        />
      </div>

      {/* Editorial Horizon Content */}
      <div className="relative z-10 bg-[#0A0A0A] pb-24 md:pb-36 -mt-20 md:-mt-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 space-y-16 md:space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <TextReveal delay={0} duration={750} variant="glide">
                <p className="text-xs tracking-[0.16em] uppercase text-[#D8B879]">
                  {eyebrow}
                </p>
              </TextReveal>
              <TextReveal delay={90} duration={950} variant="mask">
                <h2 className="font-display text-[clamp(2.6rem,4.8vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-balance pb-1">
                  {headline}
                </h2>
              </TextReveal>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <TextReveal delay={180} duration={850} variant="glide">
                <p className="text-sm md:text-base leading-relaxed text-[#F3F1ED]/74">
                  {intro}
                </p>
              </TextReveal>
              <TextReveal delay={240} duration={850} variant="glide">
                <p className="font-display italic text-base text-[#F3F1ED]/52">
                  {microcopy}
                </p>
              </TextReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-t border-b border-[#F3F1ED]/12 py-12 md:py-16">
            {areas.map((area, idx) => (
              <motion.div
                key={area.title}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: idx * 0.08, ease: KRX_TOKENS.motion.easeCinema }}
                className="space-y-3"
              >
                <h3 className="font-display text-3xl md:text-4xl font-light text-[#F3F1ED]">
                  {area.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-[#F3F1ED]/70">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>

          <TextReveal delay={80} duration={900} variant="glide">
            <p className="font-display text-[clamp(1.6rem,2.6vw,2.35rem)] font-light text-[#D8B879]">
              {closingLine}
            </p>
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
