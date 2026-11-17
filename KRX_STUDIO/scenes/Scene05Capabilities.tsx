import { useState } from 'react';
import { motion } from 'motion/react';
import { AtmosphericVideo } from '../components/AtmosphericVideo';
import { TextReveal } from '../components/TextReveal';
import { KRX_CONTENT } from '../data/krxContent';
import { KRX_TOKENS } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

export function Scene05Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const { eyebrow, headline, microcopy, videoSrc, imageSrc, imageAlt, domains } =
    KRX_CONTENT.exploration;

  return (
    <section
      id="capabilities"
      aria-label="The Experimental Frontier"
      className="relative w-full bg-[#F3F1ED] text-[#0A0A0A] py-24 md:py-40 overflow-x-clip"
    >
      {/* Atmospheric frontier landscape backdrop blended subtly into Soft Alabaster */}
      <AtmosphericVideo
        src={videoSrc}
        poster={imageSrc}
        alt={imageAlt}
        className="!absolute inset-0 h-full w-full opacity-22"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F3F1ED] via-[#F3F1ED]/78 to-[#F3F1ED]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F3F1ED]/88 via-[#F3F1ED]/76 to-[#F3F1ED]/90"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left Sticky Editorial Lead */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-5">
            <TextReveal delay={0} duration={750} variant="glide">
              <p className="text-xs tracking-[0.16em] uppercase text-[#D98A43]">
                {eyebrow}
              </p>
            </TextReveal>

            <TextReveal delay={90} duration={950} variant="mask">
              <h2 className="font-display text-[clamp(2.6rem,4.8vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-balance pb-1">
                {headline}
              </h2>
            </TextReveal>

            <TextReveal delay={180} duration={850} variant="glide">
              <p className="font-display italic text-lg text-[#0A0A0A]/55">
                {microcopy}
              </p>
            </TextReveal>
          </div>

          {/* Right: Interactive Typographic Frontier Index */}
          <ul className="lg:col-span-6 lg:col-start-7 divide-y divide-[#0A0A0A]/12 border-t border-b border-[#0A0A0A]/12">
            {domains.map((domain, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <li key={domain.index} className="py-6 md:py-7">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    aria-expanded={isSelected}
                    className="group w-full text-left cursor-pointer bg-transparent border-0 p-0 space-y-3"
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`text-xs tracking-[0.14em] tabular-nums transition-colors ${
                          isSelected ? 'text-[#FF5A1F]' : 'text-[#0A0A0A]/40'
                        }`}
                      >
                        {domain.index}
                      </span>
                      <h3
                        className={`font-display text-3xl sm:text-4xl font-light tracking-[-0.01em] transition-colors duration-200 ${
                          isSelected
                            ? 'text-[#0A0A0A]'
                            : 'text-[#0A0A0A]/48 group-hover:text-[#0A0A0A]'
                        }`}
                      >
                        {domain.title}
                      </h3>
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: KRX_TOKENS.motion.easeCinema }}
                        className="pl-9 max-w-lg space-y-2.5"
                      >
                        <p className="text-sm md:text-base leading-relaxed text-[#0A0A0A]/78">
                          {domain.description}
                        </p>
                        <p className="text-xs tracking-[0.04em] text-[#D98A43]">
                          {domain.interests.join(' · ')}
                        </p>
                      </motion.div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
