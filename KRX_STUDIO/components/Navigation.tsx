import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu } from 'lucide-react';
import {
  KRX_SCENES,
  KRX_TOKENS,
  type SceneMeta,
} from '../tokens/designTokens';
import { KRX_CONTENT } from '../data/krxContent';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';
import { ControlRoomMenu } from './ControlRoomMenu';
import { ToolsOrbitalTrigger } from './ToolsOrbitalTrigger';

interface NavigationProps {
  activeScene: SceneMeta;
  scrollProgress: number;
  onNavigate: (
    sceneId: string,
    options?: { mode?: 'default' | 'quick-jump' }
  ) => void;
  onEnterToolkit: () => void;
}

interface SceneThumbnailSpec {
  classification: string;
  poster: string | null;
  objectPosition: string;
  layout:
    | 'hero-bottom-left'
    | 'alabaster-split'
    | 'obsidian-split'
    | 'blackbox-chamber'
    | 'charcoal-substrate'
    | 'alabaster-frontier'
    | 'horizon-band'
    | 'closing-monolith';
}

const SCENE_THUMBNAILS: Record<string, SceneThumbnailSpec> = {
  opening: {
    classification: 'OPENING · ARCHITECTURE',
    poster: KRX_CONTENT.opening.heroImage,
    objectPosition: 'center center',
    layout: 'hero-bottom-left',
  },
  identity: {
    classification: 'FOUNDATION · ALABASTER',
    poster: KRX_CONTENT.foundation.imageSrc,
    objectPosition: 'center center',
    layout: 'alabaster-split',
  },
  philosophy: {
    classification: 'PHILOSOPHY · MECHANISM',
    poster: KRX_CONTENT.philosophy.imageSrc,
    objectPosition: 'center center',
    layout: 'obsidian-split',
  },
  blackbox: {
    classification: 'BLACKBOX / 001',
    poster: KRX_CONTENT.blackbox.imageSrc,
    objectPosition: '62% center',
    layout: 'blackbox-chamber',
  },
  engineering: {
    classification: 'ENGINEERING · HARDWARE',
    poster: KRX_CONTENT.engineering.imageSrc,
    objectPosition: 'center center',
    layout: 'charcoal-substrate',
  },
  capabilities: {
    classification: 'EXPLORATION · ALABASTER',
    poster: KRX_CONTENT.exploration.imageSrc,
    objectPosition: 'center center',
    layout: 'alabaster-frontier',
  },
  horizon: {
    classification: 'HORIZON · DAWN',
    poster: KRX_CONTENT.horizon.imageSrc,
    objectPosition: 'center center',
    layout: 'horizon-band',
  },
  closing: {
    classification: 'CONTACT · MONOLITH',
    poster: null,
    objectPosition: 'center center',
    layout: 'closing-monolith',
  },
};

function SceneThumbnailPreview({
  scene,
  isHighlighted,
  reducedMotion,
}: {
  scene: SceneMeta;
  isHighlighted: boolean;
  reducedMotion: boolean;
}) {
  const spec = SCENE_THUMBNAILS[scene.id] ?? SCENE_THUMBNAILS.opening;
  const scaleClass =
    !reducedMotion && isHighlighted ? 'scale-[1.06]' : 'scale-100';

  if (spec.layout === 'alabaster-split') {
    return (
      <div
        aria-hidden="true"
        className="relative h-14 w-full overflow-hidden border border-[#0A0A0A]/12 bg-[#F3F1ED] p-1.5 flex items-center gap-2"
      >
        <div className="relative h-full w-[40%] shrink-0 overflow-hidden bg-[#E9E4DC]">
          {spec.poster && (
            <img
              src={spec.poster}
              alt=""
              loading="eager"
              style={{ objectPosition: spec.objectPosition }}
              className={`h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scaleClass}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/25 via-transparent to-transparent" />
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          <span className="block h-[2px] w-5 bg-[#D98A43]" />
          <span className="block h-[3px] w-full bg-[#0A0A0A]/80" />
          <span className="block h-[2px] w-3/4 bg-[#0A0A0A]/30" />
        </div>
      </div>
    );
  }

  if (spec.layout === 'obsidian-split') {
    return (
      <div
        aria-hidden="true"
        className="relative h-14 w-full overflow-hidden border border-[#F3F1ED]/12 bg-[#0A0A0A] p-1.5 flex items-center gap-2"
      >
        <div className="flex-1 min-w-0 space-y-1.5 pl-0.5">
          <span className="block h-[1px] w-4 bg-[#D8B879]/75" />
          <span className="block h-[3px] w-full bg-[#F3F1ED]/80" />
          <span className="block h-[2px] w-2/3 bg-[#F3F1ED]/30" />
        </div>
        <div className="relative h-full w-[48%] shrink-0 overflow-hidden bg-[#141414]">
          {spec.poster && (
            <img
              src={spec.poster}
              alt=""
              loading="eager"
              style={{ objectPosition: spec.objectPosition }}
              className={`h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scaleClass}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/45 via-transparent to-transparent" />
        </div>
      </div>
    );
  }

  if (spec.layout === 'alabaster-frontier') {
    return (
      <div
        aria-hidden="true"
        className="relative h-14 w-full overflow-hidden border border-[#0A0A0A]/12 bg-[#F3F1ED]"
      >
        {spec.poster && (
          <img
            src={spec.poster}
            alt=""
            loading="eager"
            style={{ objectPosition: spec.objectPosition }}
            className={`absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scaleClass}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3F1ED]/90 via-[#F3F1ED]/70 to-[#F3F1ED]/92" />
        <div className="relative h-full w-full p-2 flex items-center justify-between gap-2">
          <div className="space-y-1.5 w-[44%]">
            <span className="block h-[2px] w-5 bg-[#D98A43]" />
            <span className="block h-[3px] w-full bg-[#0A0A0A]/80" />
          </div>
          <div className="w-[46%] space-y-1 border-t border-b border-[#0A0A0A]/15 py-1">
            <div className="flex items-center gap-1">
              <span className="h-[3px] w-[3px] bg-[#FF5A1F]" />
              <span className="h-[2px] flex-1 bg-[#0A0A0A]/75" />
            </div>
            <span className="block h-[1.5px] w-4/5 bg-[#0A0A0A]/28" />
          </div>
        </div>
      </div>
    );
  }

  if (spec.layout === 'horizon-band') {
    return (
      <div
        aria-hidden="true"
        className="relative h-14 w-full overflow-hidden border border-[#F3F1ED]/12 bg-[#0A0A0A]"
      >
        <div className="relative h-[68%] w-full overflow-hidden">
          {spec.poster && (
            <img
              src={spec.poster}
              alt=""
              loading="eager"
              style={{ objectPosition: spec.objectPosition }}
              className={`h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scaleClass}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/45 via-transparent to-[#0A0A0A]" />
        </div>
        <div className="px-2 pb-1.5 flex items-center justify-between">
          <span className="h-[2px] w-8 bg-[#D8B879]/85" />
          <span className="h-[2px] w-5 bg-[#F3F1ED]/35" />
        </div>
      </div>
    );
  }

  if (spec.layout === 'closing-monolith') {
    return (
      <div
        aria-hidden="true"
        className="relative h-14 w-full overflow-hidden border border-[#F3F1ED]/14 bg-[#050505] p-2 flex flex-col justify-between"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(216,184,121,0.12),transparent_60%)]" />
        <div className="relative flex items-center justify-between">
          <span className="h-[2px] w-5 bg-[#D8B879]" />
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              isHighlighted ? 'bg-[#FF5A1F]' : 'bg-[#F3F1ED]/30'
            }`}
          />
        </div>
        <div className="relative space-y-1.5">
          <span className="block h-[3px] w-3/4 bg-[#F3F1ED]/85" />
          <span className="block h-[2px] w-1/2 bg-[#F3F1ED]/32" />
        </div>
      </div>
    );
  }

  // Hero, Blackbox, and Engineering dark atmospheric full-bleed thumbnails
  const isCharcoal = spec.layout === 'charcoal-substrate';
  const isBlackbox = spec.layout === 'blackbox-chamber';

  return (
    <div
      aria-hidden="true"
      className={`relative h-14 w-full overflow-hidden border border-[#F3F1ED]/12 ${
        isCharcoal ? 'bg-[#141414]' : 'bg-[#050505]'
      }`}
    >
      {spec.poster && (
        <img
          src={spec.poster}
          alt=""
          loading="eager"
          style={{ objectPosition: spec.objectPosition }}
          className={`h-full w-full object-cover transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scaleClass} ${
            isCharcoal ? 'opacity-45' : isHighlighted ? 'opacity-95' : 'opacity-80'
          }`}
        />
      )}
      <div
        className={`absolute inset-0 ${
          isCharcoal
            ? 'bg-gradient-to-r from-[#141414]/88 via-[#141414]/50 to-[#141414]/85'
            : 'bg-gradient-to-t from-[#050505]/92 via-[#050505]/35 to-[#050505]/25'
        }`}
      />
      <div className="absolute inset-x-2 bottom-1.5 flex items-end justify-between gap-2">
        <div className="space-y-1 min-w-0 flex-1">
          <span
            className={`block h-[1.5px] w-4 ${
              isBlackbox && isHighlighted ? 'bg-[#FF5A1F]' : 'bg-[#D8B879]'
            }`}
          />
          <span className="block h-[2.5px] w-2/3 bg-[#F3F1ED]/82" />
        </div>
        {isCharcoal && (
          <div className="w-5 space-y-1 border-t border-b border-[#F3F1ED]/25 py-0.5 shrink-0">
            <span className="block h-[1px] w-full bg-[#F3F1ED]/45" />
          </div>
        )}
      </div>
    </div>
  );
}

const TOP_NAV_SCENES = KRX_SCENES.filter((s) =>
  ['identity', 'philosophy', 'blackbox', 'engineering', 'capabilities'].includes(s.id)
);

export function Navigation({
  activeScene,
  scrollProgress,
  onNavigate,
  onEnterToolkit,
}: NavigationProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickJumpOpen, setQuickJumpOpen] = useState(false);
  const [hoveredSceneId, setHoveredSceneId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const savedScrollYRef = useRef<number>(0);
  const quickJumpRef = useRef<HTMLDivElement | null>(null);
  const quickJumpCloseTimerRef = useRef<number | null>(null);
  const isLight = activeScene.tone === 'light';
  const useLightQuickJump = scrolled && isLight;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const clearQuickJumpTimer = useCallback(() => {
    if (quickJumpCloseTimerRef.current !== null) {
      window.clearTimeout(quickJumpCloseTimerRef.current);
      quickJumpCloseTimerRef.current = null;
    }
  }, []);

  const openQuickJump = useCallback(() => {
    if (menuOpen) return;
    clearQuickJumpTimer();
    setQuickJumpOpen(true);
  }, [clearQuickJumpTimer, menuOpen]);

  const scheduleCloseQuickJump = useCallback(() => {
    clearQuickJumpTimer();
    quickJumpCloseTimerRef.current = window.setTimeout(() => {
      setQuickJumpOpen(false);
      setHoveredSceneId(null);
      quickJumpCloseTimerRef.current = null;
    }, 140);
  }, [clearQuickJumpTimer]);

  useEffect(() => {
    return () => clearQuickJumpTimer();
  }, [clearQuickJumpTimer]);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);

  const openMenu = useCallback(() => {
    clearQuickJumpTimer();
    setQuickJumpOpen(false);
    setHoveredSceneId(null);
    savedScrollYRef.current = window.scrollY;
    setMenuOpen(true);
  }, [clearQuickJumpTimer]);

  const closeMenuAndRestorePosition = useCallback(() => {
    const targetScrollY = savedScrollYRef.current;
    unlockScroll();
    setMenuOpen(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: targetScrollY, behavior: 'auto' });
      menuTriggerRef.current?.focus({ preventScroll: true });
    });
  }, [unlockScroll]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuOpen) {
          e.preventDefault();
          closeMenuAndRestorePosition();
        } else if (quickJumpOpen) {
          clearQuickJumpTimer();
          setQuickJumpOpen(false);
          setHoveredSceneId(null);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [clearQuickJumpTimer, closeMenuAndRestorePosition, menuOpen, quickJumpOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      unlockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [menuOpen, unlockScroll]);

  const handleSelectScene = (
    sceneId: string,
    options?: { mode?: 'default' | 'quick-jump' }
  ) => {
    clearQuickJumpTimer();
    setQuickJumpOpen(false);
    setHoveredSceneId(null);
    const wasOpen = menuOpen;
    unlockScroll();
    setMenuOpen(false);
    if (wasOpen) {
      requestAnimationFrame(() => onNavigate(sceneId, options));
    } else {
      onNavigate(sceneId, options);
    }
  };

  const handleQuickJumpBlur = (e: FocusEvent<HTMLDivElement>) => {
    const nextTarget = e.relatedTarget as Node | null;
    if (!nextTarget || !quickJumpRef.current?.contains(nextTarget)) {
      clearQuickJumpTimer();
      setQuickJumpOpen(false);
      setHoveredSceneId(null);
    }
  };

  const handleQuickJumpLinkClick = (
    e: MouseEvent<HTMLAnchorElement>,
    sceneId: string
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    handleSelectScene(sceneId, { mode: 'quick-jump' });
  };

  const activeSceneIndex = Math.max(
    0,
    KRX_SCENES.findIndex((s) => s.id === activeScene.id)
  );
  const progressPercent = Math.round(
    Math.min(1, Math.max(0, scrollProgress)) * 100
  );
  const inspectedScene =
    KRX_SCENES.find((s) => s.id === hoveredSceneId) ?? activeScene;
  const inspectedIndex = Math.max(
    0,
    KRX_SCENES.findIndex((s) => s.id === inspectedScene.id)
  );
  const inspectedMeta =
    SCENE_THUMBNAILS[inspectedScene.id] ?? SCENE_THUMBNAILS.opening;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          !scrolled
            ? 'bg-gradient-to-b from-[#050505]/70 to-transparent text-[#F3F1ED]'
            : isLight
              ? 'bg-[#F3F1ED]/90 text-[#0A0A0A] backdrop-blur-md'
              : 'bg-[#050505]/85 text-[#F3F1ED] backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-14 md:h-16 max-w-[1440px] items-center justify-between gap-8 px-6 md:px-12">
          {/* Zone 1: KRX brand mark */}
          <button
            type="button"
            onClick={() => handleSelectScene('opening')}
            className="font-sans-krx text-sm md:text-base font-medium tracking-[0.26em] uppercase whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 p-0 text-current"
            aria-label="KRX Home"
          >
            {KRX_CONTENT.brandMark}
          </button>

          {/* Zone 2: Minimal single-line navigation */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-8">
            {TOP_NAV_SCENES.map((scene) => {
              const isActive = activeScene.id === scene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleSelectScene(scene.id)}
                  className={`relative py-1 text-xs tracking-[0.06em] whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 transition-opacity duration-200 ${
                    isActive
                      ? 'opacity-100 font-medium'
                      : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  {scene.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FF5A1F]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Contact + Menu + TOOLS Mechanism */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={() => handleSelectScene('closing')}
              className="hidden sm:inline-flex items-center mr-1 sm:mr-1.5 py-2 text-xs tracking-[0.06em] whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 opacity-80 hover:opacity-100 transition-opacity text-current"
            >
              Contact
            </button>

            <button
              ref={menuTriggerRef}
              type="button"
              onClick={openMenu}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="inline-flex items-center justify-center min-h-[40px] min-w-[40px] cursor-pointer bg-transparent border-0 text-current opacity-85 hover:opacity-100 transition-opacity"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <ToolsOrbitalTrigger
              onEnterToolkit={onEnterToolkit}
              isLightHeader={isLight}
            />
          </div>
        </div>

        {/* Hairline scroll progress bar & hover-activated quick-jump menu */}
        <div
          ref={quickJumpRef}
          data-testid="progress-quick-jump-region"
          onMouseEnter={openQuickJump}
          onMouseLeave={scheduleCloseQuickJump}
          onBlur={handleQuickJumpBlur}
          className="relative w-full"
        >
          <button
            type="button"
            aria-label="Scene progress bar — hover or focus to quick-jump between scenes"
            aria-expanded={quickJumpOpen}
            aria-controls="krx-scene-quick-jump-menu"
            onFocus={openQuickJump}
            onClick={() => setQuickJumpOpen((prev) => !prev)}
            className="relative block w-full bg-transparent border-0 p-0 cursor-pointer"
          >
            {/* Expanded invisible hit area around the 1px track for reliable hover */}
            <span
              aria-hidden="true"
              className="absolute -top-2.5 -bottom-2.5 inset-x-0 z-10"
            />
            <div
              className={`w-full overflow-hidden transition-[height,background-color] duration-200 ${
                quickJumpOpen
                  ? useLightQuickJump
                    ? 'h-[2px] bg-[#0A0A0A]/14'
                    : 'h-[2px] bg-[#F3F1ED]/14'
                  : 'h-[1px] bg-transparent'
              }`}
            >
              <div
                className={`h-full origin-left transition-[transform,background-color] duration-150 ${
                  quickJumpOpen ? 'bg-[#FF5A1F]' : 'bg-[#D98A43]'
                }`}
                style={{ transform: `scaleX(${scrollProgress})` }}
              />
            </div>
          </button>

          <AnimatePresence>
            {quickJumpOpen && (
              <motion.nav
                id="krx-scene-quick-jump-menu"
                data-testid="progress-quick-jump-menu"
                aria-label="Scene quick-jump navigation"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{
                  duration: reducedMotion ? 0.12 : 0.24,
                  ease: KRX_TOKENS.motion.easeCinema,
                }}
                className={`absolute top-full left-0 right-0 z-30 max-h-[calc(100svh-4rem)] overflow-y-auto border-b backdrop-blur-xl ${
                  useLightQuickJump
                    ? 'bg-[#F3F1ED]/95 border-[#0A0A0A]/12 text-[#0A0A0A] shadow-[0_22px_54px_rgba(10,10,10,0.12)]'
                    : 'bg-[#080808]/94 border-[#F3F1ED]/12 text-[#F3F1ED] shadow-[0_24px_64px_rgba(0,0,0,0.68)]'
                }`}
              >
                <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-current/10">
                    <div className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase">
                      <span
                        className={
                          useLightQuickJump ? 'text-[#8E6F3E]' : 'text-[#D8B879]'
                        }
                      >
                        Quick-Jump
                      </span>
                      <span aria-hidden="true" className="opacity-30">
                        ·
                      </span>
                      <span className="opacity-85 tabular-nums">
                        {String(inspectedIndex + 1).padStart(2, '0')} /{' '}
                        {String(KRX_SCENES.length).padStart(2, '0')} —{' '}
                        {inspectedScene.id}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden md:inline opacity-25"
                      >
                        ·
                      </span>
                      <span className="hidden md:inline opacity-55">
                        {inspectedMeta.classification}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] tracking-[0.18em] uppercase opacity-60 tabular-nums">
                      <span className="hidden sm:inline">
                        Scene {String(activeSceneIndex + 1).padStart(2, '0')} active
                      </span>
                      <span>{progressPercent}%</span>
                    </div>
                  </div>

                  <ul
                    onMouseLeave={() => setHoveredSceneId(null)}
                    className="mt-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 list-none p-0 m-0"
                  >
                    {KRX_SCENES.map((scene, idx) => {
                      const isActive = scene.id === activeScene.id;
                      const isHovered = scene.id === hoveredSceneId;
                      const isHighlighted = isActive || isHovered;
                      const sceneNumber = String(idx + 1).padStart(2, '0');

                      return (
                        <li key={scene.id}>
                          <a
                            href={`#${scene.id}`}
                            onMouseEnter={() => setHoveredSceneId(scene.id)}
                            onFocus={() => setHoveredSceneId(scene.id)}
                            onClick={(e) => handleQuickJumpLinkClick(e, scene.id)}
                            aria-current={isActive ? 'location' : undefined}
                            className={`group relative flex flex-col gap-2 p-2 text-left border transition-colors duration-200 no-underline text-current ${
                              isActive
                                ? useLightQuickJump
                                  ? 'border-[#FF5A1F]/70 bg-[#0A0A0A]/[0.05]'
                                  : 'border-[#FF5A1F]/70 bg-[#F3F1ED]/[0.06]'
                                : useLightQuickJump
                                  ? 'border-[#0A0A0A]/12 hover:border-[#987846]/70 hover:bg-[#0A0A0A]/[0.03]'
                                  : 'border-[#F3F1ED]/10 hover:border-[#D98A43]/65 hover:bg-[#F3F1ED]/[0.04]'
                            }`}
                          >
                            {isActive && (
                              <span
                                aria-hidden="true"
                                className="absolute top-0 left-0 right-0 h-[2px] z-10 bg-[#FF5A1F]"
                              />
                            )}

                            {/* Miniature scene visual preview matching each scene's identity */}
                            <SceneThumbnailPreview
                              scene={scene}
                              isHighlighted={isHighlighted}
                              reducedMotion={reducedMotion}
                            />

                            <div className="flex items-center justify-between gap-1.5 pt-0.5">
                              <span
                                className={`text-[10px] tracking-[0.18em] tabular-nums ${
                                  isActive
                                    ? 'text-[#FF5A1F] font-medium'
                                    : useLightQuickJump
                                      ? 'text-[#8E6F3E]/85'
                                      : 'text-[#D8B879]/75'
                                }`}
                              >
                                {sceneNumber}
                              </span>
                              <ArrowUpRight
                                className={`h-3 w-3 transition-transform duration-200 ${
                                  isActive
                                    ? 'text-[#FF5A1F] opacity-100'
                                    : 'opacity-0 group-hover:opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                                }`}
                                aria-hidden="true"
                              />
                            </div>

                            <div className="min-w-0">
                              <span className="block text-[11px] font-medium tracking-[0.12em] uppercase truncate">
                                {scene.id}
                              </span>
                              <span className="block font-display text-sm leading-tight font-light opacity-65 group-hover:opacity-95 truncate">
                                {scene.title}
                              </span>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* THE KRX CONTROL ROOM — Full-Screen Command Center Menu */}
      <AnimatePresence>
        {menuOpen && (
          <ControlRoomMenu
            activeScene={activeScene}
            onSelectScene={handleSelectScene}
            onClose={closeMenuAndRestorePosition}
          />
        )}
      </AnimatePresence>
    </>
  );
}
