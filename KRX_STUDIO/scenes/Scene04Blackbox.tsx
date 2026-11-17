import { useState } from 'react';
import { motion } from 'motion/react';
import { AtmosphericVideo } from '../components/AtmosphericVideo';
import { TextReveal } from '../components/TextReveal';
import { KRX_CONTENT } from '../data/krxContent';
import { KRX_TOKENS } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

export function Scene04Blackbox() {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const reducedMotion = usePrefersReducedMotion();
  const { eyebrow, headlineLines, description, videoSrc, imageSrc, imageAlt, domains } =
    KRX_CONTENT.blackbox;

  return (
    <section
      id="blackbox"
      aria-label="BLACKBOX"
      className="relative w-full bg-[#050505] text-[#F3F1ED] border-t border-[#F3F1ED]/10 overflow-x-clip"
    >
      {/* Upper Atmospheric Facility Chamber with Real Dark Infrastructure Video */}
      <div className="relative w-full min-h-[64vh] flex items-end pt-28 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <AtmosphericVideo
          src={videoSrc}
          poster={imageSrc}
          alt={imageAlt}
          objectPosition="62% center"
          className="!absolute inset-0 h-full w-full"
        />

        {/* Deep obsidian scrims preserving architectural visibility while ensuring AA/AAA legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/45 to-[#050505]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/74 to-[#050505]/30"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl space-y-6">
            <TextReveal delay={0} duration={750} variant="glide">
              <p className="text-xs tracking-[0.2em] uppercase text-[#D8B879]">
                {eyebrow}
              </p>
            </TextReveal>

            <TextReveal delay={90} duration={950} variant="mask">
              <h2 className="font-display font-light leading-[0.98] tracking-[-0.02em] text-[clamp(2.65rem,5.2vw,4.9rem)] text-[#F3F1ED] text-balance pb-1">
                {headlineLines.map((line, idx) => (
                  <span key={line} className="block">
                    {idx === 1 ? <span className="italic text-[#F3F1ED]/92">{line}</span> : line}
                  </span>
                ))}
              </h2>
            </TextReveal>

            <TextReveal delay={180} duration={850} variant="glide">
              <p className="max-w-xl text-sm md:text-base leading-[1.8] text-[#F3F1ED]/78 font-light">
                {description}
              </p>
            </TextReveal>
          </div>
        </div>
      </div>

      {/* Lower Architectural Archive Ledger — 4 Exploration Domains */}
      <div className="relative z-10 bg-[#050505] pb-24 md:pb-36 pt-4 md:pt-8">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 lg:gap-x-20 border-b border-[#F3F1ED]/12">
            {domains.map((domain, idx) => {
              const isSelected = idx === focusedIndex;
              return (
                <motion.article
                  key={domain.index}
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.08,
                    ease: KRX_TOKENS.motion.easeCinema,
                  }}
                  onMouseEnter={() => setFocusedIndex(idx)}
                  onFocus={() => setFocusedIndex(idx)}
                  className="group relative border-t border-[#F3F1ED]/12 py-10 md:py-12 transition-colors duration-300"
                >
                  {/* Restrained hairline top amber highlight */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-[-1px] left-0 h-[1px] transition-all duration-500 ${
                      isSelected
                        ? 'w-16 bg-[#FF5A1F]'
                        : 'w-8 bg-[#D98A43]/40 group-hover:w-16 group-hover:bg-[#D98A43]'
                    }`}
                  />

                  <div className="space-y-4">
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`text-xs tracking-[0.16em] tabular-nums transition-colors duration-300 ${
                          isSelected ? 'text-[#FF5A1F]' : 'text-[#D8B879]/70'
                        }`}
                      >
                        {domain.index}
                      </span>
                      <span aria-hidden="true" className="text-xs text-[#F3F1ED]/25">
                        —
                      </span>
                      <h3 className="font-display text-2xl md:text-[2rem] font-light tracking-[0.04em] text-[#F3F1ED]">
                        {domain.title}
                      </h3>
                    </div>

                    <p className="max-w-lg text-sm md:text-[15px] leading-[1.78] text-[#F3F1ED]/72 font-light pl-0 md:pl-10">
                      {domain.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
