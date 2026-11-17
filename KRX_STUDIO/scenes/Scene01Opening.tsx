import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { AtmosphericVideo } from '../components/AtmosphericVideo';
import { ToolkitEntranceButton } from '../components/ToolkitEntranceButton';
import { KRX_CONTENT } from '../data/krxContent';
import { KRX_TOKENS } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

interface Scene01OpeningProps {
  onNavigate: (sceneId: string) => void;
  onEnterToolkit: () => void;
}

export function Scene01Opening({ onNavigate, onEnterToolkit }: Scene01OpeningProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const {
    eyebrow,
    headlineLines,
    statement,
    description,
    toolkitAction,
    heroVideo,
    heroImage,
    heroImageAlt,
  } = KRX_CONTENT.opening;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="opening"
      aria-label="Opening"
      className="relative min-h-[100svh] w-full bg-[#050505] text-[#F3F1ED] overflow-clip flex flex-col justify-end pt-20 pb-8 md:pb-14"
    >
      {/* Full-bleed atmospheric architectural video */}
      <AtmosphericVideo
        src={heroVideo}
        poster={heroImage}
        alt={heroImageAlt}
        eager
        className="!absolute inset-0 h-full w-full"
        mediaClassName="brightness-[1.12] contrast-[1.02]"
      />

      {/* Measured cinematic scrims */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/42 to-[#050505]/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/86 via-[#050505]/36 to-transparent"
      />

      {/* Asymmetric Editorial Lockup */}
      <motion.div
        style={reducedMotion ? undefined : { opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4 md:space-y-5">
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: KRX_TOKENS.motion.easeCinema }}
              className="text-xs md:text-sm tracking-[0.22em] uppercase text-[#D8B879]"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.06, ease: KRX_TOKENS.motion.easeCinema }}
              className="font-display font-light tracking-[-0.02em] text-[#F3F1ED] leading-[0.95] text-[clamp(2.65rem,min(6.1vw,9.2vh),5.75rem)]"
            >
              {headlineLines.map((line, i) => (
                <span key={line} className="block">
                  {i === 1 ? <span className="italic">{line}</span> : line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.14, ease: KRX_TOKENS.motion.easeCinema }}
              className="max-w-xl text-sm md:text-base font-medium tracking-[0.01em] text-[#F3F1ED]/92"
            >
              {statement}
            </motion.p>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: KRX_TOKENS.motion.easeCinema }}
              className="max-w-xl text-sm md:text-[15px] leading-relaxed text-[#F3F1ED]/74 font-light"
            >
              {description}
            </motion.p>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.26, ease: KRX_TOKENS.motion.easeCinema }}
              className="flex flex-wrap items-center pt-3"
            >
              <ToolkitEntranceButton label={toolkitAction} onEnter={onEnterToolkit} />
            </motion.div>
          </div>

          {/* Subtle Cinematic Scroll Indicator */}
          <button
            type="button"
            onClick={() => onNavigate('identity')}
            aria-label="Scroll to The Foundation"
            className="hidden md:inline-flex items-center gap-3 min-h-[44px] text-xs tracking-[0.14em] uppercase text-[#F3F1ED]/65 hover:text-[#F3F1ED] cursor-pointer bg-transparent border-0 transition-colors shrink-0"
          >
            <span>Scroll</span>
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
