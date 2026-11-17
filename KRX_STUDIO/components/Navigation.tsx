import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';
import { KRX_SCENES, type SceneMeta } from '../tokens/designTokens';
import { KRX_CONTENT } from '../data/krxContent';
import { ControlRoomMenu } from './ControlRoomMenu';
import { ToolsOrbitalTrigger } from './ToolsOrbitalTrigger';

interface NavigationProps {
  activeScene: SceneMeta;
  scrollProgress: number;
  onNavigate: (sceneId: string) => void;
  onEnterToolkit: () => void;
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const savedScrollYRef = useRef<number>(0);
  const isLight = activeScene.tone === 'light';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);

  const openMenu = useCallback(() => {
    savedScrollYRef.current = window.scrollY;
    setMenuOpen(true);
  }, []);

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
      if (e.key === 'Escape' && menuOpen) {
        e.preventDefault();
        closeMenuAndRestorePosition();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenuAndRestorePosition]);

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

  const handleSelectScene = (sceneId: string) => {
    const wasOpen = menuOpen;
    unlockScroll();
    setMenuOpen(false);
    if (wasOpen) {
      requestAnimationFrame(() => onNavigate(sceneId));
    } else {
      onNavigate(sceneId);
    }
  };

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

        {/* Hairline scroll indicator */}
        <div className="h-[1px] w-full bg-transparent overflow-hidden" aria-hidden="true">
          <div
            className="h-full bg-[#D98A43] origin-left transition-transform duration-150"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
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
