import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { videoManager, type VideoManifestEntry } from '../media/videoManager';
import { KRX_TOKENS, type SceneTone } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

export interface VideoCrossfadeTransition {
  id: number;
  fromEntry: VideoManifestEntry | null;
  toEntry: VideoManifestEntry | null;
  toTone: SceneTone;
  variant?: 'default' | 'quick-jump';
}

interface VideoCrossfadeStageProps {
  transition: VideoCrossfadeTransition | null;
  onComplete: (id: number) => void;
}

function CrossfadeMediaLayer({
  entry,
  initialOpacity,
  animateOpacity,
  duration,
  delay = 0,
}: {
  entry: VideoManifestEntry;
  initialOpacity: number;
  animateOpacity: number;
  duration: number;
  delay?: number;
}) {
  const snap = videoManager.getSnapshot(entry.src);
  const mediaSrc = snap.objectUrl ?? entry.src;

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: initialOpacity, scale: 1.015 }}
      animate={{ opacity: animateOpacity, scale: 1 }}
      transition={{ duration, delay, ease: KRX_TOKENS.motion.easeCinema }}
      className="absolute inset-0 h-full w-full overflow-hidden"
    >
      <img
        src={entry.poster}
        alt=""
        className="h-full w-full object-cover"
      />
      <video
        src={mediaSrc}
        poster={entry.poster}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        disablePictureInPicture
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </motion.div>
  );
}

export function VideoCrossfadeStage({ transition, onComplete }: VideoCrossfadeStageProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isQuickJump = transition?.variant === 'quick-jump';

  useEffect(() => {
    if (!transition) return;
    if (reducedMotion) {
      onComplete(transition.id);
      return;
    }

    // Hold during scroll travel & cross-dissolve, then trigger AnimatePresence exit fade-out
    const holdMs = isQuickJump ? 400 : 580;
    const timer = window.setTimeout(() => {
      onComplete(transition.id);
    }, holdMs);

    return () => window.clearTimeout(timer);
  }, [transition, reducedMotion, isQuickJump, onComplete]);

  if (reducedMotion) return null;

  const isLightTarget = transition?.toTone === 'light';

  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          key={transition.id}
          aria-hidden="true"
          data-crossfade-active="true"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isQuickJump ? 0.88 : 0.96,
            transition: {
              duration: isQuickJump ? 0.24 : 0.32,
              ease: KRX_TOKENS.motion.easeCinema,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: isQuickJump ? 0.46 : 0.52,
              ease: KRX_TOKENS.motion.easeCinema,
            },
          }}
          className={`pointer-events-none fixed inset-0 z-30 overflow-hidden ${
            isLightTarget ? 'bg-[#F3F1ED]' : 'bg-[#050505]'
          }`}
        >
          {/* Outgoing atmospheric scene video dissolving out */}
          {transition.fromEntry && (
            <CrossfadeMediaLayer
              entry={transition.fromEntry}
              initialOpacity={isQuickJump ? 0.58 : 0.72}
              animateOpacity={0}
              duration={isQuickJump ? 0.42 : 0.55}
            />
          )}

          {/* Incoming atmospheric scene video dissolving in */}
          {transition.toEntry && (
            <CrossfadeMediaLayer
              entry={transition.toEntry}
              initialOpacity={0}
              animateOpacity={isQuickJump ? 0.64 : 0.76}
              duration={isQuickJump ? 0.44 : 0.55}
              delay={isQuickJump ? 0.04 : 0.06}
            />
          )}

          {/* Measured tonal scrim blending transition edges cleanly */}
          <div
            className={`absolute inset-0 ${
              isLightTarget
                ? 'bg-gradient-to-b from-[#F3F1ED]/55 via-[#F3F1ED]/35 to-[#F3F1ED]/70'
                : 'bg-gradient-to-b from-[#050505]/65 via-[#050505]/45 to-[#050505]/75'
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
