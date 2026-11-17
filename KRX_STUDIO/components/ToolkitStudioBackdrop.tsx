import { useId } from 'react';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

/**
 * Architectural Champagne Titanium laboratory backdrop for `/tools`.
 * Composes sunlit soft-ivory & warm-champagne surfaces, brushed titanium monolith
 * bays, translucent frosted baffles, precision optical rings, and slow daylight reflections.
 */
export function ToolkitStudioBackdrop() {
  const uid = useId().replace(/:/g, '');
  const reducedMotion = usePrefersReducedMotion();
  const grainId = `${uid}-titanium-grain`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden bg-[#E7E0D5]"
    >
      {/* 1. Primary Warm Champagne & Soft Ivory Architectural Canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(115% 88% at 50% 38%, #FAF7F1 0%, #EFE9DF 38%, #E1D8CA 74%, #D3C9B8 100%)',
        }}
      />

      {/* 2. Diffused Overhead Skylight Wash (pearl silver & soft ivory daylight) */}
      <div
        className="absolute inset-x-0 top-0 h-[58vh]"
        style={{
          background:
            'radial-gradient(54% 88% at 50% 0%, rgba(255, 253, 249, 0.85) 0%, rgba(244, 236, 224, 0.35) 52%, transparent 82%)',
        }}
      />

      {/* 3. Brushed Titanium Flanking Architectural Wall Bays (Desktop & Tablet) */}
      <div
        className="hidden sm:block absolute inset-y-0 left-0 w-[14.5vw] max-w-[235px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(182, 174, 163, 0.44) 0%, rgba(212, 206, 196, 0.32) 66%, rgba(239, 233, 224, 0.14) 100%)',
          borderRight: '1px solid rgba(255, 252, 246, 0.72)',
          boxShadow: 'inset -1px 0 0 rgba(102, 95, 86, 0.12)',
        }}
      />
      <div
        className="hidden sm:block absolute inset-y-0 right-0 w-[14.5vw] max-w-[235px]"
        style={{
          background:
            'linear-gradient(270deg, rgba(182, 174, 163, 0.44) 0%, rgba(212, 206, 196, 0.32) 66%, rgba(239, 233, 224, 0.14) 100%)',
          borderLeft: '1px solid rgba(255, 252, 246, 0.72)',
          boxShadow: 'inset 1px 0 0 rgba(102, 95, 86, 0.12)',
        }}
      />

      {/* Inner Stepped Frosted Glass & Pearl-Silver Architectural Louvers */}
      <div
        className="hidden lg:block absolute inset-y-0 left-[14.5vw] w-[5.5vw] max-w-[92px] backdrop-blur-[4px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(245, 241, 234, 0.42) 0%, rgba(232, 224, 212, 0.12) 100%)',
          borderRight: '1px solid rgba(154, 134, 102, 0.18)',
        }}
      />
      <div
        className="hidden lg:block absolute inset-y-0 right-[14.5vw] w-[5.5vw] max-w-[92px] backdrop-blur-[4px]"
        style={{
          background:
            'linear-gradient(270deg, rgba(245, 241, 234, 0.42) 0%, rgba(232, 224, 212, 0.12) 100%)',
          borderLeft: '1px solid rgba(154, 134, 102, 0.18)',
        }}
      />

      {/* 4. Perspective Brushed-Titanium Studio Floor Plane */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(214, 206, 193, 0.42) 28%, rgba(196, 187, 173, 0.65) 100%)',
          }}
        />
        <svg
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id={`${uid}-floor-horizon`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(116,108,96,0)" />
              <stop offset="22%" stopColor="rgba(116,108,96,0.14)" />
              <stop offset="50%" stopColor="rgba(164,134,86,0.28)" />
              <stop offset="78%" stopColor="rgba(116,108,96,0.14)" />
              <stop offset="100%" stopColor="rgba(116,108,96,0)" />
            </linearGradient>
            <linearGradient id={`${uid}-floor-seam`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(112,104,94,0.04)" />
              <stop offset="45%" stopColor="rgba(112,104,94,0.15)" />
              <stop offset="100%" stopColor="rgba(112,104,94,0)" />
            </linearGradient>
          </defs>

          {/* Horizon architectural datum line + pearl specular edge */}
          <line x1="0" y1="68" x2="1440" y2="68" stroke={`url(#${uid}-floor-horizon)`} strokeWidth="1" />
          <line x1="80" y1="69" x2="1360" y2="69" stroke="rgba(255,253,248,0.45)" strokeWidth="1" />
          <line x1="160" y1="138" x2="1280" y2="138" stroke="rgba(104,96,86,0.08)" strokeWidth="1" />
          <line x1="40" y1="232" x2="1400" y2="232" stroke="rgba(104,96,86,0.06)" strokeWidth="1" />

          {/* Perspective titanium floor joint lines */}
          <line x1="430" y1="68" x2="120" y2="360" stroke={`url(#${uid}-floor-seam)`} strokeWidth="1" />
          <line x1="585" y1="68" x2="430" y2="360" stroke={`url(#${uid}-floor-seam)`} strokeWidth="1" />
          <line x1="855" y1="68" x2="1010" y2="360" stroke={`url(#${uid}-floor-seam)`} strokeWidth="1" />
          <line x1="1010" y1="68" x2="1320" y2="360" stroke={`url(#${uid}-floor-seam)`} strokeWidth="1" />
        </svg>
      </div>

      {/* 5. Slow Sunlit Champagne Caustic & Architectural Light Reflection */}
      <div
        className={`absolute -inset-x-[15%] top-[8%] h-[60vh] ${
          reducedMotion ? '' : 'krx-studio-drift'
        }`}
        style={{
          background:
            'radial-gradient(48% 64% at 54% 46%, rgba(255, 250, 238, 0.56) 0%, rgba(212, 186, 146, 0.16) 48%, transparent 76%)',
        }}
      />

      {/* 6. Precision Optical Calibration Datum Centered Behind Search Focal Axis */}
      <div className="absolute left-1/2 top-[43.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[min(92vw,760px)] h-[min(92vw,760px)]">
        {/* Horizontal & Vertical Architectural Sightline Axes */}
        <div
          className="absolute left-[-28vw] right-[-28vw] top-1/2 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(108,100,90,0.12) 22%, rgba(164,134,88,0.28) 50%, rgba(108,100,90,0.12) 78%, transparent 100%)',
          }}
        />
        <div
          className="absolute top-[-22vh] bottom-[-22vh] left-1/2 w-[1px]"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(108,100,90,0.12) 28%, rgba(164,134,88,0.24) 50%, rgba(108,100,90,0.1) 75%, transparent 100%)',
          }}
        />

        {/* Restrained Soft Ivory-Champagne Focal Halo Behind Search Bar */}
        <div
          className={`absolute h-[180px] w-[min(86vw,780px)] rounded-full blur-3xl ${
            reducedMotion ? 'opacity-80' : 'krx-studio-breathe'
          }`}
          style={{
            background:
              'radial-gradient(58% 68% at 50% 50%, rgba(255, 252, 246, 0.72) 0%, rgba(214, 188, 144, 0.18) 56%, transparent 82%)',
          }}
        />

        {/* Machined Concentric Architectural Calibration Rings */}
        <svg viewBox="0 0 640 640" className="h-full w-full">
          {/* Outer brushed titanium ring with delicate pearl catchlight */}
          <circle
            cx="320"
            cy="320"
            r="298"
            fill="none"
            stroke="rgba(104, 96, 86, 0.14)"
            strokeWidth="0.9"
          />
          <circle
            cx="320"
            cy="320"
            r="296.5"
            fill="none"
            stroke="rgba(255, 253, 248, 0.55)"
            strokeWidth="0.7"
            strokeDasharray="160 120"
          />
          {/* Segmented muted champagne-gold calibration arc */}
          <circle
            cx="320"
            cy="320"
            r="264"
            fill="none"
            stroke="rgba(166, 134, 84, 0.24)"
            strokeWidth="0.95"
            strokeDasharray="110 78 24 78"
            transform="rotate(-24 320 320)"
          />
          {/* Inner structural silver ring */}
          <circle
            cx="320"
            cy="320"
            r="204"
            fill="none"
            stroke="rgba(116, 108, 98, 0.12)"
            strokeWidth="0.8"
          />
          {/* Cardinal brushed-gold calibration notches */}
          <g stroke="rgba(158, 126, 76, 0.42)" strokeWidth="1">
            <line x1="320" y1="16" x2="320" y2="28" />
            <line x1="320" y1="612" x2="320" y2="624" />
            <line x1="16" y1="320" x2="28" y2="320" />
            <line x1="612" y1="320" x2="624" y2="320" />
          </g>
        </svg>
      </div>

      {/* 7. Fine Brushed Titanium Surface Micro-Grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.032] mix-blend-multiply">
        <filter id={grainId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.78"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>

      {/* 8. Subtle Perimeter Titanium Depth Vignette (no dark black edges) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(96% 94% at 50% 42%, transparent 52%, rgba(164, 155, 142, 0.28) 100%)',
        }}
      />
    </div>
  );
}
