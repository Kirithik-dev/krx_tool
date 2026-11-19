import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { Navigation } from './components/Navigation';
import {
  VideoCrossfadeStage,
  type VideoCrossfadeTransition,
} from './components/VideoCrossfadeStage';
import { getVideoEntryForScene, videoManager } from './media/videoManager';
import { useActiveScene, usePrefersReducedMotion } from './motion/useScrollChoreography';
import { DrakPage } from './pages/DrakPage';
import { ToolsPage } from './pages/ToolsPage';
import { useKrxRouter } from './routing/router';
import { KRX_SCENES, KRX_TOKENS } from './tokens/designTokens';
import { Scene01Opening } from './scenes/Scene01Opening';
import { Scene02Identity } from './scenes/Scene02Identity';
import { Scene03Philosophy } from './scenes/Scene03Philosophy';
import { Scene04Blackbox } from './scenes/Scene04Blackbox';
import { Scene05Engineering } from './scenes/Scene05Engineering';
import { Scene05Capabilities } from './scenes/Scene05Capabilities';
import { Scene06Horizon } from './scenes/Scene06Horizon';
import { Scene07Closing } from './scenes/Scene07Closing';

function HomeExperience({ onEnterToolkit }: { onEnterToolkit: () => void }) {
  const { activeScene, scrollProgress, scrollToScene } = useActiveScene();
  const reducedMotion = usePrefersReducedMotion();
  const [crossfade, setCrossfade] = useState<VideoCrossfadeTransition | null>(null);
  const [isSceneCrossfading, setIsSceneCrossfading] = useState(false);
  const quickJumpTimerRef = useRef<number | null>(null);
  const quickJumpRevealTimerRef = useRef<number | null>(null);

  useEffect(() => {
    videoManager.boot(reducedMotion);
  }, [reducedMotion]);

  const clearQuickJumpTimers = useCallback(() => {
    if (quickJumpTimerRef.current !== null) {
      window.clearTimeout(quickJumpTimerRef.current);
      quickJumpTimerRef.current = null;
    }
    if (quickJumpRevealTimerRef.current !== null) {
      window.clearTimeout(quickJumpRevealTimerRef.current);
      quickJumpRevealTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearQuickJumpTimers();
  }, [clearQuickJumpTimers]);

  const handleNavigate = useCallback(
    (sceneId: string, options?: { mode?: 'default' | 'quick-jump' }) => {
      videoManager.prioritizeScene(sceneId);
      clearQuickJumpTimers();

      const isQuickJump = options?.mode === 'quick-jump';
      const isDifferentScene = sceneId !== activeScene.id;

      if (!reducedMotion && isDifferentScene) {
        const fromEntry = getVideoEntryForScene(activeScene.id);
        const toEntry = getVideoEntryForScene(sceneId);
        const targetMeta = KRX_SCENES.find((s) => s.id === sceneId);

        if (isQuickJump) {
          setIsSceneCrossfading(true);
          setCrossfade({
            id: Date.now(),
            fromEntry,
            toEntry,
            toTone: targetMeta?.tone ?? 'dark',
            variant: 'quick-jump',
          });

          // At the cross-fade midpoint, snap cleanly to target scene then dissolve back in
          quickJumpTimerRef.current = window.setTimeout(() => {
            scrollToScene(sceneId, { behavior: 'auto' });
            quickJumpTimerRef.current = null;
            quickJumpRevealTimerRef.current = window.setTimeout(() => {
              setIsSceneCrossfading(false);
              quickJumpRevealTimerRef.current = null;
            }, 40);
          }, 190);
          return;
        }

        if (fromEntry || toEntry) {
          setCrossfade({
            id: Date.now(),
            fromEntry,
            toEntry,
            toTone: targetMeta?.tone ?? 'dark',
          });
        }
      }

      setIsSceneCrossfading(false);
      scrollToScene(sceneId);
    },
    [activeScene.id, clearQuickJumpTimers, reducedMotion, scrollToScene]
  );

  const handleCrossfadeComplete = useCallback((id: number) => {
    setCrossfade((current) => (current?.id === id ? null : current));
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#F3F1ED] selection:bg-[#FF5A1F]/30">
      <a
        href="#opening"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#F3F1ED] focus:text-[#050505] focus:px-4 focus:py-2 focus:text-xs"
      >
        Skip to content
      </a>

      <Navigation
        activeScene={activeScene}
        scrollProgress={scrollProgress}
        onNavigate={handleNavigate}
        onEnterToolkit={onEnterToolkit}
      />

      <VideoCrossfadeStage
        transition={crossfade}
        onComplete={handleCrossfadeComplete}
      />

      <motion.main
        animate={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: isSceneCrossfading ? 0.16 : 1 }
        }
        transition={{
          duration: reducedMotion ? 0 : isSceneCrossfading ? 0.19 : 0.42,
          ease: KRX_TOKENS.motion.easeCinema,
        }}
      >
        <Scene01Opening onNavigate={handleNavigate} onEnterToolkit={onEnterToolkit} />
        <Scene02Identity />
        <Scene03Philosophy />
        <Scene04Blackbox />
        <Scene05Engineering />
        <Scene05Capabilities />
        <Scene06Horizon />
        <Scene07Closing onBackToTop={() => handleNavigate('opening')} />
      </motion.main>
    </div>
  );
}

export default function KRXApp() {
  const { route, navigate } = useKrxRouter();

  return (
    <MotionConfig reducedMotion="user">
      {route.view === 'drak' ? (
        <DrakPage />
      ) : route.view === 'tools' ? (
        <ToolsPage
          toolSlug={route.toolSlug}
          onNavigateHome={() => navigate('/')}
          onNavigateTool={(slug) =>
            navigate(slug ? `/tools/${slug}` : '/tools')
          }
          onNavigateRoute={navigate}
        />
      ) : (
        <HomeExperience onEnterToolkit={() => navigate('/tools')} />
      )}
    </MotionConfig>
  );
}
