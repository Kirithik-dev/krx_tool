import { useId, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

interface ToolsOrbitalTriggerProps {
  onEnterToolkit: () => void;
  isLightHeader?: boolean;
}

/**
 * Custom 3D metallic celestial mechanism navigation trigger for `/tools`.
 * Uses layered CSS 3D gimbal planes + brushed SVG metallic gradients +
 * pointer-reactive depth tilt and an editorial `TOOLS` reveal on hover/focus.
 */
export function ToolsOrbitalTrigger({
  onEnterToolkit,
  isLightHeader = false,
}: ToolsOrbitalTriggerProps) {
  const uid = useId().replace(/:/g, '');
  const reducedMotion = usePrefersReducedMotion();
  const triggerRef = useRef<HTMLAnchorElement | null>(null);

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  const isActive = hovered || focused;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onEnterToolkit();
  };

  const handlePointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || e.pointerType !== 'mouse') return;
    const node = triggerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({
      rx: Number((-ny * 16).toFixed(2)),
      ry: Number((nx * 16).toFixed(2)),
    });
  };

  const handlePointerEnter = () => {
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const silverRingId = `${uid}-silver`;
  const graphiteRingId = `${uid}-graphite`;
  const goldRingId = `${uid}-gold`;
  const housingId = `${uid}-housing`;
  const coreId = `${uid}-core`;
  const goldNodeId = `${uid}-gold-node`;
  const silverNodeId = `${uid}-silver-node`;

  return (
    <div className="relative flex items-center shrink-0">
      <a
        ref={triggerRef}
        href="/tools"
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label="Tools — Open KRX Toolkit"
        className="group relative inline-flex h-[42px] w-[42px] items-center justify-center rounded-sm cursor-pointer select-none focus-visible:outline-1 focus-visible:outline-[#D8B879]"
      >
        {/* Subtle ambient radial aura under the mechanism on hover */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-1 rounded-full transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-40'
          }`}
          style={{
            background: isLightHeader
              ? 'radial-gradient(circle, rgba(168, 128, 62, 0.16) 0%, rgba(18, 18, 20, 0.08) 56%, transparent 75%)'
              : 'radial-gradient(circle, rgba(216, 184, 121, 0.22) 0%, rgba(216, 184, 121, 0.05) 54%, transparent 74%)',
          }}
        />

        {/* True 3D Perspective Celestial Mechanism Stage (no overflow-hidden to preserve 3D planes) */}
        <span
          aria-hidden="true"
          className="relative flex h-[34px] w-[34px] items-center justify-center"
          style={{ perspective: '240px' }}
        >
          {/* Interactive Pointer-Reactive 3D Assembly */}
          <span
            className="relative block h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transformStyle: 'preserve-3d',
              transform: reducedMotion
                ? 'none'
                : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${isActive ? 1.09 : 1})`,
            }}
          >
            {/* Layer 1: Dark Graphite Instrument Housing + Precision Vernier Dial */}
            <span
              className="absolute inset-0 block"
              style={{ transform: 'translateZ(-5px)' }}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                <defs>
                  <radialGradient id={housingId} cx="36%" cy="32%" r="72%">
                    <stop offset="0%" stopColor="#2E3036" stopOpacity="0.92" />
                    <stop offset="48%" stopColor="#16171B" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#09090B" stopOpacity="0.98" />
                  </radialGradient>
                </defs>
                {/* Recessed obsidian/graphite plate */}
                <circle
                  cx="50"
                  cy="50"
                  r="43"
                  fill={`url(#${housingId})`}
                  stroke={isLightHeader ? 'rgba(20,20,22,0.42)' : 'rgba(220,224,230,0.22)'}
                  strokeWidth="1.2"
                />
                {/* Fine silver micro-index ticks */}
                <g
                  stroke={isActive ? 'rgba(216,184,121,0.58)' : 'rgba(228,230,235,0.28)'}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                >
                  <line x1="50" y1="10.5" x2="50" y2="14.5" />
                  <line x1="50" y1="85.5" x2="50" y2="89.5" />
                  <line x1="10.5" y1="50" x2="14.5" y2="50" />
                  <line x1="85.5" y1="50" x2="89.5" y2="50" />
                </g>
              </svg>
            </span>

            {/* Layer 2: Outer Brushed-Silver Inclined Gimbal Ring + Champagne-Gold Satellite */}
            <span
              className="absolute inset-0 block"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(60deg) rotateY(-20deg)',
              }}
            >
              <span
                className={`block h-full w-full ${reducedMotion ? '' : 'krx-orbit-outer'}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                  <defs>
                    <linearGradient id={silverRingId} x1="8%" y1="8%" x2="92%" y2="92%">
                      <stop offset="0%" stopColor="#F5F3EE" />
                      <stop offset="28%" stopColor="#A9AEB8" />
                      <stop offset="56%" stopColor="#353840" />
                      <stop offset="80%" stopColor="#D6D3CC" />
                      <stop offset="100%" stopColor="#7C808A" />
                    </linearGradient>
                    <radialGradient id={goldNodeId} cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFF3D4" />
                      <stop offset="42%" stopColor="#D8B879" />
                      <stop offset="100%" stopColor="#6B5022" />
                    </radialGradient>
                  </defs>
                  {/* Primary machined silver gimbal */}
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke={`url(#${silverRingId})`}
                    strokeWidth="2.8"
                  />
                  {/* Secondary specular catchlight inside bevel */}
                  <circle
                    cx="50"
                    cy="50"
                    r="41.5"
                    fill="none"
                    stroke="rgba(255,255,255,0.28)"
                    strokeWidth="0.65"
                    strokeDasharray="34 26"
                  />
                  {/* Champagne-gold orbital node */}
                  <circle
                    cx="94"
                    cy="50"
                    r="4.2"
                    fill={`url(#${goldNodeId})`}
                    stroke="rgba(255,248,232,0.55)"
                    strokeWidth="0.7"
                  />
                </svg>
              </span>
            </span>

            {/* Layer 3: Counter-Tilted Dark Graphite & Silver Equatorial Ring */}
            <span
              className="absolute inset-0 block"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(-54deg) rotateY(34deg)',
              }}
            >
              <span
                className={`block h-full w-full ${reducedMotion ? '' : 'krx-orbit-mid'}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                  <defs>
                    <linearGradient id={graphiteRingId} x1="0%" y1="15%" x2="100%" y2="85%">
                      <stop offset="0%" stopColor="#D7DADF" />
                      <stop offset="25%" stopColor="#464A54" />
                      <stop offset="55%" stopColor="#1D1E23" />
                      <stop offset="82%" stopColor="#8E939E" />
                      <stop offset="100%" stopColor="#E4E1DA" />
                    </linearGradient>
                    <radialGradient id={silverNodeId} cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="48%" stopColor="#AEB4BE" />
                      <stop offset="100%" stopColor="#2D3038" />
                    </radialGradient>
                  </defs>
                  {/* Graphite metallic ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke={`url(#${graphiteRingId})`}
                    strokeWidth="2.5"
                  />
                  {/* Restrained champagne-gold arc segments */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#D8B879"
                    strokeOpacity="0.75"
                    strokeWidth="1.2"
                    strokeDasharray="18 102"
                  />
                  {/* Silver counterweight satellite */}
                  <circle
                    cx="12"
                    cy="50"
                    r="3.2"
                    fill={`url(#${silverNodeId})`}
                  />
                </svg>
              </span>
            </span>

            {/* Layer 4: Inner Champagne-Gold Meridian Ring */}
            <span
              className="absolute inset-0 block"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(26deg) rotateY(-52deg)',
              }}
            >
              <span
                className={`block h-full w-full ${reducedMotion ? '' : 'krx-orbit-inner'}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                  <defs>
                    <linearGradient id={goldRingId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FAF0D7" />
                      <stop offset="32%" stopColor="#D8B879" />
                      <stop offset="68%" stopColor="#6D5327" />
                      <stop offset="100%" stopColor="#EBD2A0" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="28"
                    fill="none"
                    stroke={`url(#${goldRingId})`}
                    strokeWidth="2.1"
                  />
                </svg>
              </span>
            </span>

            {/* Layer 5: Sculptural 3D Metallic Celestial Core */}
            <span
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: 'translateZ(7px)' }}
            >
              <svg viewBox="0 0 40 40" className="h-[14px] w-[14px] overflow-visible">
                <defs>
                  <radialGradient id={coreId} cx="34%" cy="30%" r="68%">
                    <stop offset="0%" stopColor="#FFF9EC" />
                    <stop offset="22%" stopColor="#DECAA6" />
                    <stop offset="52%" stopColor="#686C75" />
                    <stop offset="84%" stopColor="#1D1E22" />
                    <stop offset="100%" stopColor="#090A0C" />
                  </radialGradient>
                </defs>
                <circle
                  cx="20"
                  cy="20"
                  r="13.5"
                  fill={`url(#${coreId})`}
                  stroke={isActive ? 'rgba(235,204,146,0.75)' : 'rgba(216,184,121,0.38)'}
                  strokeWidth="1.2"
                />
                {/* Crisp metallic pin highlight */}
                <circle cx="15.5" cy="15" r="2.3" fill="rgba(255,252,244,0.78)" />
              </svg>
            </span>

            {/* Layer 6: Subtle Diagonal Anisotropic Reflection Glint */}
            <span
              className={`pointer-events-none absolute inset-[3px] rounded-full transition-opacity duration-300 ${
                isActive ? 'opacity-85' : 'opacity-45'
              }`}
              style={{
                transform: 'translateZ(10px)',
                background:
                  'linear-gradient(132deg, rgba(255,252,245,0.22) 0%, rgba(255,255,255,0.03) 36%, transparent 56%)',
              }}
            />
          </span>
        </span>

        {/* Elegant Hover / Focus-Visible Architectural Label Reveal */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 top-[calc(100%+7px)] inline-flex items-center border px-2.5 py-1 font-sans-krx text-[10px] font-medium tracking-[0.26em] uppercase whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isActive
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-1.5'
          } ${
            isLightHeader
              ? 'bg-[#0A0A0C]/92 border-[#D8B879]/35 text-[#F3F1ED] shadow-[0_10px_28px_rgba(0,0,0,0.22)]'
              : 'bg-[#0D0C0B]/88 border-[#D8B879]/32 text-[#F3F1ED] shadow-[0_12px_30px_rgba(0,0,0,0.68)] backdrop-blur-md'
          }`}
        >
          <span>TOOLS</span>
        </span>
      </a>
    </div>
  );
}
