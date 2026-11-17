import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { KRX_CONTENT } from '../data/krxContent';
import { videoManager } from '../media/videoManager';
import { KRX_TOKENS, type SceneMeta } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

interface ControlRoomItem {
  index: string;
  title: string;
  subtitle: string;
  sceneId: string;
  classification: string;
  videoSrc: string;
  posterSrc: string;
  objectPosition: string;
}

const CONTROL_ROOM_ITEMS: ControlRoomItem[] = [
  {
    index: '01',
    title: 'THE ORIGIN',
    subtitle: 'First principles, curiosity, and architectural discipline.',
    sceneId: 'identity',
    classification: 'FOUNDATION · CORRIDOR',
    videoSrc: KRX_CONTENT.foundation.videoSrc,
    posterSrc: KRX_CONTENT.foundation.imageSrc,
    objectPosition: 'center center',
  },
  {
    index: '02',
    title: 'THE MIND',
    subtitle: 'Intentional design, precision, and coherence over convention.',
    sceneId: 'philosophy',
    classification: 'PHILOSOPHY · MECHANISM',
    videoSrc: KRX_CONTENT.philosophy.videoSrc,
    posterSrc: KRX_CONTENT.philosophy.imageSrc,
    objectPosition: 'center center',
  },
  {
    index: '03',
    title: 'BLACKBOX',
    subtitle: 'Private archive of intelligence, systems, and experimentation.',
    sceneId: 'blackbox',
    classification: 'BLACKBOX / 001 · INFRASTRUCTURE',
    videoSrc: KRX_CONTENT.blackbox.videoSrc,
    posterSrc: KRX_CONTENT.blackbox.imageSrc,
    objectPosition: '60% center',
  },
  {
    index: '04',
    title: 'THE WORKSHOP',
    subtitle: 'Software architecture, AI workflows, and full-stack execution.',
    sceneId: 'engineering',
    classification: 'ENGINEERING · SUBSTRATE',
    videoSrc: KRX_CONTENT.engineering.videoSrc,
    posterSrc: KRX_CONTENT.engineering.imageSrc,
    objectPosition: 'center center',
  },
  {
    index: '05',
    title: 'THE UNKNOWN',
    subtitle: 'Open questions pursued beyond familiar technical boundaries.',
    sceneId: 'capabilities',
    classification: 'EXPLORATION · FRONTIER',
    videoSrc: KRX_CONTENT.exploration.videoSrc,
    posterSrc: KRX_CONTENT.exploration.imageSrc,
    objectPosition: 'center center',
  },
  {
    index: '06',
    title: 'THE HORIZON',
    subtitle: 'Evolving systems, emerging computation, and what comes next.',
    sceneId: 'horizon',
    classification: 'HORIZON · ELEVATION',
    videoSrc: KRX_CONTENT.horizon.videoSrc,
    posterSrc: KRX_CONTENT.horizon.imageSrc,
    objectPosition: 'center center',
  },
  {
    index: '07',
    title: 'ESTABLISH CONTACT',
    subtitle: 'Direct correspondence for technical inquiry and collaboration.',
    sceneId: 'closing',
    classification: 'SIGNAL · MONOLITH',
    videoSrc: KRX_CONTENT.opening.heroVideo,
    posterSrc: KRX_CONTENT.opening.heroImage,
    objectPosition: '65% center',
  },
];

interface ControlRoomMenuProps {
  activeScene: SceneMeta;
  onSelectScene: (sceneId: string) => void;
  onClose: () => void;
}

export function ControlRoomMenu({
  activeScene,
  onSelectScene,
  onClose,
}: ControlRoomMenuProps) {
  const reducedMotion = usePrefersReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const initialPreviewIdx = useMemo(() => {
    const matchIdx = CONTROL_ROOM_ITEMS.findIndex((item) => item.sceneId === activeScene.id);
    return matchIdx >= 0 ? matchIdx : 0;
  }, [activeScene.id]);

  const [focusedIndex, setFocusedIndex] = useState<number>(initialPreviewIdx);
  const activePreview = CONTROL_ROOM_ITEMS[focusedIndex] ?? CONTROL_ROOM_ITEMS[0];

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    // Prioritize active preview video asset if not already cached
    videoManager.prioritize(activePreview.videoSrc);
  }, [activePreview.videoSrc]);

  const handleListKeyDown = (e: ReactKeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (focusedIndex + 1) % CONTROL_ROOM_ITEMS.length;
      setFocusedIndex(next);
      itemRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev =
        (focusedIndex - 1 + CONTROL_ROOM_ITEMS.length) % CONTROL_ROOM_ITEMS.length;
      setFocusedIndex(prev);
      itemRefs.current[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocusedIndex(0);
      itemRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = CONTROL_ROOM_ITEMS.length - 1;
      setFocusedIndex(last);
      itemRefs.current[last]?.focus();
    }
  };

  const cachedUrl = videoManager.getSnapshot(activePreview.videoSrc).objectUrl;
  const resolvedVideoSrc = cachedUrl ?? activePreview.videoSrc;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="THE KRX CONTROL ROOM"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.36, ease: KRX_TOKENS.motion.easeCinema }}
      className="fixed inset-0 z-50 bg-[#050505] text-[#F3F1ED] flex flex-col justify-between overflow-y-auto selection:bg-[#FF5A1F]/30"
    >
      {/* Subtle Architectural Hairline Grid Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#050505] to-[#0A0A0A] opacity-90"
      />

      {/* TOP BAR — Control Room Identity & Sophisticated Close Control */}
      <motion.header
        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.04, ease: KRX_TOKENS.motion.easeCinema }}
        className="relative z-10 w-full border-b border-[#F3F1ED]/10"
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-[1440px] items-center justify-between gap-6 px-6 md:px-12">
          <div className="flex items-center gap-4 md:gap-6 min-w-0">
            <span className="font-sans-krx text-sm md:text-base font-medium tracking-[0.26em] uppercase text-[#F3F1ED] shrink-0">
              {KRX_CONTENT.brandMark}
            </span>
            <span aria-hidden="true" className="hidden sm:inline-block h-3.5 w-[1px] bg-[#F3F1ED]/18" />
            <span className="hidden sm:inline-block text-[11px] tracking-[0.22em] uppercase text-[#D8B879] truncate">
              THE KRX CONTROL ROOM
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close control room menu"
            className="group inline-flex items-center gap-3 min-h-[44px] px-4 py-2 border border-[#F3F1ED]/16 hover:border-[#D8B879]/70 bg-[#0A0A0A] text-xs tracking-[0.16em] uppercase text-[#F3F1ED]/85 hover:text-[#F3F1ED] cursor-pointer transition-colors duration-300 shrink-0"
          >
            <span>Close</span>
            <X
              className="h-4 w-4 text-[#D8B879] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90"
              aria-hidden="true"
            />
          </button>
        </div>
      </motion.header>

      {/* CENTER STAGE — LEFT NAVIGATION INDEX + RIGHT VISUAL INTELLIGENCE PANEL */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] flex-1 flex items-center px-6 md:px-12 py-8 md:py-12">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* MOBILE / TABLET CONDENSED VISUAL PREVIEW */}
          <div className="lg:hidden">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#F3F1ED]/12 bg-[#0A0A0A]">
              <img
                src={activePreview.posterSrc}
                alt=""
                style={{ objectPosition: activePreview.objectPosition }}
                className="h-full w-full object-cover opacity-85"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-[#050505]/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-3.5 flex items-baseline justify-between gap-3">
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#D8B879] whitespace-nowrap shrink-0">
                  {activePreview.index} — {activePreview.title}
                </span>
                <span className="text-[10px] tracking-[0.14em] uppercase text-[#F3F1ED]/60 truncate">
                  {activePreview.classification}
                </span>
              </div>
            </div>
          </div>

          {/* LEFT — OVERSIZED EDITORIAL NAVIGATION INDEX */}
          <nav aria-label="Control room sections" className="lg:col-span-7">
            <p className="lg:hidden mb-4 text-[11px] tracking-[0.22em] uppercase text-[#D8B879]">
              THE KRX CONTROL ROOM
            </p>
            <ul
              onKeyDown={handleListKeyDown}
              className="divide-y divide-[#F3F1ED]/10 border-t border-b border-[#F3F1ED]/10"
            >
              {CONTROL_ROOM_ITEMS.map((item, idx) => {
                const isHighlighted = idx === focusedIndex;
                const isCurrentSection = activeScene.id === item.sceneId;

                return (
                  <motion.li
                    key={item.sceneId}
                    initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.06 + idx * 0.045,
                      ease: KRX_TOKENS.motion.easeCinema,
                    }}
                  >
                    <button
                      ref={(el) => {
                        itemRefs.current[idx] = el;
                      }}
                      type="button"
                      onClick={() => onSelectScene(item.sceneId)}
                      onMouseEnter={() => setFocusedIndex(idx)}
                      onFocus={() => setFocusedIndex(idx)}
                      aria-current={isCurrentSection ? 'location' : undefined}
                      className="group relative w-full py-3.5 md:py-4 text-left cursor-pointer bg-transparent border-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-6 transition-colors duration-300"
                    >
                      {/* Active left amber hairline accent */}
                      <span
                        aria-hidden="true"
                        className={`hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#D98A43] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isHighlighted ? 'w-5 opacity-100' : 'w-0 opacity-0'
                        }`}
                      />

                      <div
                        className={`flex items-baseline gap-3.5 md:gap-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${
                          isHighlighted ? 'md:translate-x-8' : 'md:translate-x-0'
                        }`}
                      >
                        <span
                          className={`text-xs tracking-[0.16em] tabular-nums transition-colors duration-300 shrink-0 ${
                            isHighlighted ? 'text-[#FF5A1F]' : 'text-[#D8B879]/55'
                          }`}
                        >
                          {item.index}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`text-xs transition-colors duration-300 shrink-0 ${
                            isHighlighted ? 'text-[#D8B879]/80' : 'text-[#F3F1ED]/22'
                          }`}
                        >
                          —
                        </span>
                        <span
                          className={`font-display text-2xl sm:text-3xl xl:text-[2.2rem] font-light leading-[1.08] tracking-[-0.015em] sm:whitespace-nowrap transition-colors duration-300 ${
                            isHighlighted
                              ? 'text-[#F3F1ED]'
                              : 'text-[#F3F1ED]/62 group-hover:text-[#F3F1ED]'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>

                      <span
                        className={`text-xs leading-relaxed sm:text-right max-w-[270px] transition-colors duration-300 ${
                          isHighlighted ? 'text-[#F3F1ED]/78' : 'text-[#F3F1ED]/42'
                        }`}
                      >
                        {item.subtitle}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT — VISUAL INTELLIGENCE PANEL (DESKTOP) */}
          <motion.aside
            aria-label="Section visual preview"
            initial={reducedMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease: KRX_TOKENS.motion.easeCinema }}
            className="hidden lg:flex lg:col-span-5 flex-col gap-4"
          >
            <div className="flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-[#F3F1ED]/55">
              <span>Visual Intelligence</span>
              <span className="text-[#D8B879] tabular-nums">{activePreview.index} / 07</span>
            </div>

            <div className="relative aspect-[4/4.3] w-full overflow-hidden border border-[#F3F1ED]/12 bg-[#0A0A0A]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={activePreview.sceneId}
                  initial={reducedMotion ? false : { opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.55, ease: KRX_TOKENS.motion.easeCinema }}
                  className="absolute inset-0 h-full w-full"
                >
                  <img
                    src={activePreview.posterSrc}
                    alt=""
                    style={{ objectPosition: activePreview.objectPosition }}
                    className="h-full w-full object-cover"
                  />

                  {!reducedMotion && (
                    <video
                      key={resolvedVideoSrc}
                      src={resolvedVideoSrc}
                      poster={activePreview.posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls={false}
                      disablePictureInPicture
                      preload="auto"
                      style={{ objectPosition: activePreview.objectPosition }}
                      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Measured luxury architectural vignette scrims */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/92 via-[#050505]/25 to-[#050505]/35"
              />

              {/* Panel Caption Lockup */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-7 space-y-2.5">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#D8B879]">
                  {activePreview.classification}
                </p>
                <p className="font-display text-3xl font-light text-[#F3F1ED]">
                  {activePreview.title}
                </p>
                <p className="text-xs leading-relaxed text-[#F3F1ED]/74 max-w-sm">
                  {activePreview.subtitle}
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* BOTTOM — KRX SIGNATURE & OPERATIONAL STATUS */}
      <motion.footer
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease: KRX_TOKENS.motion.easeCinema }}
        className="relative z-10 w-full border-t border-[#F3F1ED]/10 bg-[#050505]"
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] tracking-[0.18em] uppercase">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#F3F1ED]/72">
            <span className="text-[#F3F1ED] font-medium">KRX / INDEPENDENT ENGINEERING</span>
            <span aria-hidden="true" className="hidden sm:inline text-[#F3F1ED]/25">·</span>
            <span className="text-[#F3F1ED]/52">LESS NOISE. MORE SUBSTANCE.</span>
          </div>

          <div className="text-[#D8B879] tracking-[0.2em] shrink-0">
            SYSTEM STATUS — OPERATIONAL
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}
