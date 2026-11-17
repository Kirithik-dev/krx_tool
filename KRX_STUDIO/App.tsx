import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navigation } from './components/Navigation';
import {
  VideoCrossfadeStage,
  type VideoCrossfadeTransition,
} from './components/VideoCrossfadeStage';
import { getVideoEntryForScene, videoManager } from './media/videoManager';
import { useActiveScene, usePrefersReducedMotion } from './motion/useScrollChoreography';
import { ToolsPage } from './pages/ToolsPage';
import { useKrxRouter } from './routing/router';
import { KRX_SCENES } from './tokens/designTokens';
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

  useEffect(() => {
    videoManager.boot(reducedMotion);
  }, [reducedMotion]);

  const handleNavigate = useCallback(
    (sceneId: string) => {
      videoManager.prioritizeScene(sceneId);

      if (!reducedMotion && sceneId !== activeScene.id) {
        const fromEntry = getVideoEntryForScene(activeScene.id);
        const toEntry = getVideoEntryForScene(sceneId);
        const targetMeta = KRX_SCENES.find((s) => s.id === sceneId);

        if (fromEntry || toEntry) {
          setCrossfade({
            id: Date.now(),
            fromEntry,
            toEntry,
            toTone: targetMeta?.tone ?? 'dark',
          });
        }
      }

      scrollToScene(sceneId);
    },
    [activeScene.id, reducedMotion, scrollToScene]
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

      <main>
        <Scene01Opening onNavigate={handleNavigate} onEnterToolkit={onEnterToolkit} />
        <Scene02Identity />
        <Scene03Philosophy />
        <Scene04Blackbox />
        <Scene05Engineering />
        <Scene05Capabilities />
        <Scene06Horizon />
        <Scene07Closing onBackToTop={() => handleNavigate('opening')} />
      </main>
    </div>
  );
}

export default function KRXApp() {
  const { route, navigate } = useKrxRouter();

  return (
    <MotionConfig reducedMotion="user">
      {route.view === 'tools' ? (
        <ToolsPage
          toolSlug={route.toolSlug}
          onNavigateHome={() => navigate('/')}
        />
      ) : (
        <HomeExperience onEnterToolkit={() => navigate('/tools')} />
      )}
    </MotionConfig>
  );
}
