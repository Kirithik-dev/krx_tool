import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { CERES_ASSETS } from '../assets';
import { CERES_METADATA } from '../logic/ceresConfig';
import '../styles/ceres.css';

export interface CeresCardProps {
  href?: string;
  onSelect?: () => void;
  className?: string;
}

function DiagonalHoverArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5.25 14.75L14.75 5.25M14.75 5.25H7.25M14.75 5.25V12.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Official CERES Showcase Card (`src/tools/ceres/card.mp4`).
 * Large, image/video-dominant feature card with sharp architectural edges (`rounded-[8px]`),
 * muted autoplaying looping tomato-on-the-vine footage, subtle golden scanning lines,
 * and all typography + hover-revealed diagonal arrow (↗) strictly inside the visual frame.
 */
export function CeresCard({
  href = CERES_METADATA.route,
  onSelect,
  className = '',
}: CeresCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Autoplay blocked by browser policy; poster remains visible cleanly
      });
    }
  }, [videoFailed]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onSelect) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onSelect();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label={`${CERES_METADATA.name} — ${CERES_METADATA.tagline}`}
      data-testid="toolkit-card-ceres"
      className={`group relative block w-full min-h-[430px] sm:min-h-[480px] lg:min-h-[520px] aspect-[10/11] overflow-hidden rounded-[8px] bg-[#17120E] shadow-[0_26px_64px_rgba(42,35,26,0.18),0_6px_18px_rgba(42,35,26,0.09)] ring-1 ring-[#987846]/32 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_34px_80px_rgba(36,29,20,0.26),0_10px_26px_rgba(36,29,20,0.13)] hover:ring-[#C8A464]/65 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#987846] ${className}`}
    >
      {/* Muted, Autoplaying, Looping Tomato-on-the-Vine Video Background */}
      {!videoFailed ? (
        <video
          ref={videoRef}
          src={CERES_ASSETS.cardVideo}
          poster={CERES_ASSETS.cardPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onError={() => setVideoFailed(true)}
          data-testid="ceres-card-video"
          style={{ objectPosition: '50% 44%' }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      ) : (
        <img
          src={CERES_ASSETS.cardPoster}
          alt={`${CERES_METADATA.name} — ${CERES_METADATA.tagline}`}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}

      {/* Soft, Restrained Warm Sunlight & Botanical Depth Lighting Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(68% 58% at 52% 36%, rgba(232, 194, 122, 0.14) 0%, rgba(28, 22, 16, 0.08) 56%, rgba(14, 11, 8, 0.42) 100%), linear-gradient(180deg, rgba(16, 12, 9, 0.22) 0%, rgba(16, 12, 9, 0.04) 38%, rgba(14, 11, 8, 0.46) 72%, rgba(12, 9, 7, 0.88) 100%)',
        }}
      />

      {/* Subtle Golden Optical Scanning Lines & Minimal Gold Reticle Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Ultra-fine static horizontal golden micro-scan grid */}
        <div
          className="absolute inset-0 opacity-[0.14] group-hover:opacity-[0.22] transition-opacity duration-500"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, rgba(226, 192, 126, 0.42) 0px, rgba(226, 192, 126, 0.42) 1px, transparent 1px, transparent 18px)',
          }}
        />

        {/* Animated subtle golden optical scan beam */}
        <div className="ceres-scan-sweep absolute inset-x-0 top-0 h-28 pointer-events-none">
          <div
            className="h-[1px] w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 4%, rgba(228, 194, 126, 0.58) 28%, rgba(255, 246, 220, 0.88) 50%, rgba(228, 194, 126, 0.58) 72%, transparent 96%)',
              boxShadow: '0 0 16px rgba(216, 184, 121, 0.45)',
            }}
          />
          <div
            className="h-14 w-full"
            style={{
              background:
                'linear-gradient(180deg, rgba(216, 184, 121, 0.12) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* Minimal precision gold corner fiducial ticks */}
        <span className="absolute top-4 left-4 h-3 w-3 border-t border-l border-[#E2C285]/45" />
        <span className="absolute top-4 right-4 h-3 w-3 border-t border-r border-[#E2C285]/45" />
        <span className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-[#E2C285]/35" />
        <span className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-[#E2C285]/35" />
      </div>

      {/* Crisp inner metallic champagne rim bevel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[#FFF8EB]/18"
      />

      {/* All card text positioned strictly inside the visual frame */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-7 md:p-8">
        {/* Top category label inside image */}
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-[4px] border border-[#E8CFA0]/32 bg-[#14100C]/48 px-3 py-1.5 font-sans-krx text-[10px] font-medium tracking-[0.24em] uppercase text-[#FAF3E6]/95 backdrop-blur-md">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#D8B879] shadow-[0_0_8px_rgba(216,184,121,0.9)]"
            />
            <span>{CERES_METADATA.category}</span>
          </span>
        </div>

        {/* Bottom lockup: CERES title + tagline + bottom-right hover arrow (↗) */}
        <div className="flex items-end justify-between gap-5">
          <div className="max-w-[84%] space-y-2">
            <h2 className="font-display text-3xl sm:text-[2.1rem] font-light leading-[1.02] tracking-[0.09em] uppercase text-[#FFFDF9] drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
              {CERES_METADATA.name}
            </h2>
            <p className="font-sans-krx text-xs sm:text-[13.5px] font-normal leading-relaxed tracking-[0.025em] text-[#F3ECE0]/92 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              {CERES_METADATA.tagline}
            </p>
          </div>

          {/* Bottom-right diagonal arrow icon (↗): hidden by default, appears smoothly on hover */}
          <span
            aria-hidden="true"
            data-testid="toolkit-card-ceres-arrow"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-[#E8CFA0]/42 bg-[#14100C]/62 text-[#FAF6EE] backdrop-blur-md opacity-0 translate-y-2 -translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:translate-x-0"
          >
            <DiagonalHoverArrow className="h-4 w-4 text-[#E8CFA0]" />
          </span>
        </div>
      </div>
    </a>
  );
}
