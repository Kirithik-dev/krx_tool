import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useVideoAsset, videoManager } from '../media/videoManager';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

export type VideoCrossfadeMode = 'ambient' | 'framed' | 'none';

interface AtmosphericVideoProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  mediaClassName?: string;
  objectPosition?: string;
  overlayClassName?: string;
  /** Set true for above-the-fold hero or modal video so source attaches immediately */
  eager?: boolean;
  /** Controls smooth scroll & viewport cross-fade behavior */
  crossfade?: VideoCrossfadeMode;
  /** Defaults to true since atmospheric backgrounds are non-essential decoration */
  decorative?: boolean;
}

export function AtmosphericVideo({
  src,
  poster,
  alt,
  className = '',
  mediaClassName = '',
  objectPosition = 'center center',
  overlayClassName = '',
  eager = false,
  crossfade = 'ambient',
  decorative = true,
}: AtmosphericVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const asset = useVideoAsset(src, poster);

  const [isNearViewport, setIsNearViewport] = useState<boolean>(eager);
  const [isInViewport, setIsInViewport] = useState<boolean>(eager);
  const [attachedSrc, setAttachedSrc] = useState<string | undefined>(() => {
    if (reducedMotion) return undefined;
    if (eager) return asset.objectUrl ?? src;
    if (asset.objectUrl) return asset.objectUrl;
    return undefined;
  });
  const [isReady, setIsReady] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Smooth scroll-linked cross-fade curve for full-bleed ambient section backgrounds
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const ambientScrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1],
    eager ? [1, 1, 1, 0.18] : [0.18, 1, 1, 0.18]
  );

  // Reset transient media state cleanly when src or motion preference switches
  useEffect(() => {
    setIsReady(false);
    setHasError(false);
    if (reducedMotion) {
      setAttachedSrc(undefined);
      return;
    }
    const latest = videoManager.getSnapshot(src);
    if (eager) {
      setAttachedSrc(latest.objectUrl ?? src);
    } else if (latest.objectUrl) {
      setAttachedSrc(latest.objectUrl);
    } else {
      setAttachedSrc(undefined);
    }
  }, [src, eager, reducedMotion]);

  // 1. Proximity observer: boosts manager queue priority & allows direct streaming fallback if user scrolls ahead of preloader
  useEffect(() => {
    if (reducedMotion || eager || isNearViewport) return;

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      videoManager.prioritize(src);
      return;
    }

    const loadObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsNearViewport(true);
            videoManager.prioritize(src);
            loadObserver.disconnect();
            break;
          }
        }
      },
      { rootMargin: '550px 0px', threshold: 0.01 }
    );

    loadObserver.observe(node);
    return () => loadObserver.disconnect();
  }, [reducedMotion, eager, isNearViewport, src]);

  // 2. Lock video source once either global preload finishes (cached blob URL) OR section nears viewport
  useEffect(() => {
    if (reducedMotion || attachedSrc) return;
    if (eager) {
      setAttachedSrc(asset.objectUrl ?? src);
      return;
    }
    if (asset.objectUrl) {
      setAttachedSrc(asset.objectUrl);
      return;
    }
    if (isNearViewport && asset.status !== 'error') {
      setAttachedSrc(src);
    }
  }, [reducedMotion, attachedSrc, eager, asset.objectUrl, asset.status, isNearViewport, src]);

  // 3. Viewport playback observer: play inside viewport, pause cleanly outside viewport
  useEffect(() => {
    if (reducedMotion) return;

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInViewport(true);
      return;
    }

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsInViewport(entry.isIntersecting);
        }
      },
      { threshold: 0.04 }
    );

    visibilityObserver.observe(node);
    return () => visibilityObserver.disconnect();
  }, [reducedMotion]);

  // 4. Sync cached/buffered readiness immediately if frame already decoded before React listener fired
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !attachedSrc) return;
    if (video.readyState >= 2) {
      setIsReady(true);
      setHasError(false);
      videoManager.markStreamReady(src);
    }
  }, [attachedSrc, src]);

  // 5. Enforce play / pause state & muted safety cleanly
  useEffect(() => {
    if (reducedMotion || !attachedSrc || hasError) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    if (isInViewport) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Graceful no-op if browser defers autoplay until interaction
        });
      }
    } else if (!video.paused) {
      video.pause();
    }
  }, [isInViewport, attachedSrc, hasError, reducedMotion, src]);

  const handleVideoReady = () => {
    const video = videoRef.current;
    if (video && video.videoWidth === 0) return;
    setHasError(false);
    setIsReady(true);
    videoManager.markStreamReady(src);
  };

  const handleVideoError = () => {
    setIsReady(false);
    setHasError(true);
    videoManager.markStreamError(src);
  };

  const showVideoLayer = !reducedMotion && !hasError;
  const videoVisible = isReady && (isInViewport || crossfade === 'none');
  const applyScrollOpacity = !reducedMotion && crossfade === 'ambient';

  return (
    <div
      ref={containerRef}
      aria-hidden={decorative ? 'true' : undefined}
      data-video-status={asset.status}
      data-video-ready={isReady ? 'true' : 'false'}
      className={`relative overflow-hidden bg-[#141414] ${className}`}
    >
      <motion.div
        style={applyScrollOpacity ? { opacity: ambientScrollOpacity } : undefined}
        className="relative h-full w-full"
      >
        {/* Preloaded first-frame poster fallback underneath — prevents any blank flash or visual gap */}
        <img
          src={poster}
          alt={decorative ? '' : alt}
          loading="eager"
          decoding="async"
          style={{ objectPosition }}
          className={`h-full w-full object-cover ${mediaClassName}`}
        />

        {showVideoLayer && (
          <video
            ref={videoRef}
            src={attachedSrc}
            poster={poster}
            autoPlay={isInViewport}
            muted
            loop
            playsInline
            controls={false}
            disablePictureInPicture
            preload={eager ? 'auto' : attachedSrc ? 'metadata' : 'none'}
            aria-label={decorative ? undefined : alt}
            onLoadedData={handleVideoReady}
            onCanPlay={handleVideoReady}
            onPlaying={handleVideoReady}
            onError={handleVideoError}
            style={{ objectPosition }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
              videoVisible ? 'opacity-100' : 'opacity-0'
            } ${mediaClassName}`}
          />
        )}
      </motion.div>

      {overlayClassName && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${overlayClassName}`}
        />
      )}
    </div>
  );
}
