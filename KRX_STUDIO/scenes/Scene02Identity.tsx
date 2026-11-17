import { motion, type Variants } from 'motion/react';
import { AtmosphericVideo } from '../components/AtmosphericVideo';
import { KRX_CONTENT } from '../data/krxContent';
import { KRX_TOKENS } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

const columnContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const glideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: KRX_TOKENS.motion.easeCinema,
    },
  },
};

const headlineMaskVariants: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.95,
      ease: KRX_TOKENS.motion.easeCinema,
    },
  },
};

const disciplinesListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const disciplineItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: KRX_TOKENS.motion.easeCinema,
    },
  },
};

export function Scene02Identity() {
  const reducedMotion = usePrefersReducedMotion();
  const {
    eyebrow,
    headline,
    lead,
    paragraph,
    disciplinesLabel,
    disciplines,
    microcopy,
    videoSrc,
    imageSrc,
    imageAlt,
  } = KRX_CONTENT.foundation;

  const initialState = reducedMotion ? 'visible' : 'hidden';

  return (
    <section
      id="identity"
      aria-label="The Foundation"
      className="relative w-full bg-[#F3F1ED] text-[#0A0A0A] py-24 md:py-40 overflow-x-clip"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Tall Editorial Colonnade Video + Editorial Caption */}
          <motion.div
            variants={columnContainerVariants}
            initial={initialState}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            <motion.div variants={glideUpVariants}>
              <AtmosphericVideo
                src={videoSrc}
                poster={imageSrc}
                alt={imageAlt}
                crossfade="framed"
                className="aspect-[3/4] w-full"
                overlayClassName="bg-gradient-to-t from-[#0A0A0A]/22 via-transparent to-transparent"
              />
            </motion.div>
            <motion.p
              variants={glideUpVariants}
              className="font-display italic text-base text-[#0A0A0A]/55 tracking-[0.04em]"
            >
              {microcopy}
            </motion.p>
          </motion.div>

          {/* Right: Framer Motion Staggered Editorial Reveal */}
          <motion.div
            variants={columnContainerVariants}
            initial={initialState}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6 lg:col-start-7 lg:pt-6 space-y-10"
          >
            <div className="space-y-4">
              <motion.p
                variants={glideUpVariants}
                className="text-xs tracking-[0.16em] uppercase text-[#D98A43]"
              >
                {eyebrow}
              </motion.p>

              <div className="overflow-hidden">
                <motion.h2
                  variants={headlineMaskVariants}
                  className="font-display text-[clamp(2.5rem,4.6vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em] pb-1 text-balance"
                >
                  {headline}
                </motion.h2>
              </div>
            </div>

            <motion.p
              variants={glideUpVariants}
              className="font-display text-[clamp(1.4rem,2.2vw,1.95rem)] font-light leading-[1.35] text-[#0A0A0A] text-balance"
            >
              {lead}
            </motion.p>

            <motion.p
              variants={glideUpVariants}
              className="max-w-xl text-sm md:text-base leading-[1.8] text-[#0A0A0A]/76"
            >
              {paragraph}
            </motion.p>

            {/* Compact Unboxed Disciplines Ledger */}
            <motion.div
              variants={glideUpVariants}
              className="pt-6 border-t border-[#0A0A0A]/12 space-y-4"
            >
              <p className="text-xs tracking-[0.16em] uppercase text-[#0A0A0A]/55">
                {disciplinesLabel}
              </p>
              <motion.ul
                variants={disciplinesListVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5"
              >
                {disciplines.map((item) => (
                  <motion.li
                    key={item}
                    variants={disciplineItemVariants}
                    className="text-sm text-[#0A0A0A]/86"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
