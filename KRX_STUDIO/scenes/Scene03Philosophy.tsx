import { motion, type Variants } from 'motion/react';
import { AtmosphericVideo } from '../components/AtmosphericVideo';
import { KRX_CONTENT, type PhilosophyPrinciple } from '../data/krxContent';
import { KRX_TOKENS } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

const headerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: KRX_TOKENS.motion.easeCinema,
    },
  },
};

const maskedRiseVariants: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.9,
      ease: KRX_TOKENS.motion.easeCinema,
    },
  },
};

const principleRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const hairlineVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.75,
      ease: KRX_TOKENS.motion.easeCinema,
    },
  },
};

function PrincipleItem({
  principle,
  reducedMotion,
}: {
  principle: PhilosophyPrinciple;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      variants={principleRowVariants}
      initial={reducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="space-y-4"
    >
      <motion.div
        aria-hidden="true"
        variants={hairlineVariants}
        className="h-[1px] w-10 origin-left bg-[#D8B879]/65"
      />

      <div className="overflow-hidden">
        <motion.div
          variants={maskedRiseVariants}
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
        >
          <span className="text-xs tracking-[0.14em] text-[#D98A43] tabular-nums">
            {principle.index}
          </span>
          <h3 className="font-display text-2xl md:text-4xl font-light text-[#F3F1ED]">
            {principle.title}
          </h3>
        </motion.div>
      </div>

      <motion.p
        variants={fadeUpVariants}
        className="max-w-lg text-sm md:text-base leading-[1.75] text-[#F3F1ED]/72"
      >
        {principle.statement}
      </motion.p>
    </motion.div>
  );
}

export function Scene03Philosophy() {
  const reducedMotion = usePrefersReducedMotion();
  const {
    eyebrow,
    headline,
    closingStatement,
    microcopy,
    videoSrc,
    imageSrc,
    imageAlt,
    principles,
  } = KRX_CONTENT.philosophy;

  const initialState = reducedMotion ? 'visible' : 'hidden';

  return (
    <section
      id="philosophy"
      aria-label="Philosophy"
      className="relative w-full bg-[#0A0A0A] text-[#F3F1ED] py-24 md:py-40 overflow-x-clip"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 space-y-20 md:space-y-28">
        {/* Editorial Opening Statement */}
        <motion.div
          variants={headerContainerVariants}
          initial={initialState}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-3xl space-y-4"
        >
          <motion.p
            variants={fadeUpVariants}
            className="text-xs tracking-[0.16em] uppercase text-[#D8B879]"
          >
            {eyebrow}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              variants={maskedRiseVariants}
              className="font-display text-[clamp(2.75rem,5vw,4.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-balance pb-1"
            >
              {headline}
            </motion.h2>
          </div>
        </motion.div>

        {/* Asymmetric Split: Six Engineering Principles + Tactile Material Craftsmanship */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-6 space-y-12 md:space-y-14">
            {principles.map((principle) => (
              <PrincipleItem
                key={principle.index}
                principle={principle}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          <motion.div
            variants={headerContainerVariants}
            initial={initialState}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6 lg:sticky lg:top-28 space-y-4"
          >
            <motion.div variants={fadeUpVariants}>
              <AtmosphericVideo
                src={videoSrc}
                poster={imageSrc}
                alt={imageAlt}
                crossfade="framed"
                className="aspect-[4/3] w-full"
                overlayClassName="bg-gradient-to-t from-[#0A0A0A]/45 via-transparent to-transparent"
              />
            </motion.div>
            <motion.p
              variants={fadeUpVariants}
              className="font-display italic text-base text-[#F3F1ED]/55"
            >
              {microcopy}
            </motion.p>
          </motion.div>
        </div>

        {/* Closing Maxim */}
        <motion.div
          variants={fadeUpVariants}
          initial={initialState}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="border-t border-[#F3F1ED]/12 pt-10 max-w-3xl"
        >
          <p className="font-display text-[clamp(1.6rem,2.8vw,2.5rem)] font-light leading-[1.2] text-[#D8B879] text-balance">
            {closingStatement}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
