import {
  useState,
  type MouseEvent,
  type PointerEvent,
} from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ToolkitCardProps } from '../../data/toolkitRegistry';
import { usePrefersReducedMotion } from '../../motion/useScrollChoreography';
import { DrakHoverVisual } from './DrakHoverVisual';

export interface DrakCardProps extends ToolkitCardProps {
  videoSrc?: string | null;
}

export function DrakCard({ href = '/drak', onSelect, videoSrc = null }: DrakCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [parallax, setParallax] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handlePointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({
      x: Math.round(nx * -10 * 10) / 10,
      y: Math.round(ny * -10 * 10) / 10,
    });
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onSelect();
  };

  return (
    <a
      href={href}
      data-testid="drak-tool-card"
      aria-label="DRAK AI — Autonomous Research and Evolution Engine"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setParallax({ x: 0, y: 0 });
      }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => {
        setIsHovered(false);
        setParallax({ x: 0, y: 0 });
      }}
      onPointerMove={handlePointerMove}
      className={`group relative flex w-full aspect-[4/5] min-h-[420px] sm:min-h-[450px] flex-col justify-between overflow-hidden rounded-[16px] bg-[#040406] text-[#F3F1ED] no-underline select-none transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-[#D8B879] ${
        reducedMotion ? '' : 'hover:-translate-y-0.5'
      }`}
      style={{
        boxShadow: isHovered
          ? '0 28px 68px rgba(0, 0, 0, 0.45), 0 0 38px rgba(216, 184, 121, 0.14)'
          : '0 18px 44px rgba(0, 0, 0, 0.24)',
      }}
    >
      {/* Deep black & dark metallic base substrate */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg, #0D0E12 0%, #050507 48%, #070708 100%)',
        }}
      />

      {/* Dormant circular energy ring & particles -> awakened sphere animation on hover */}
      <DrakHoverVisual
        active={isHovered}
        reducedMotion={reducedMotion}
        videoSrc={videoSrc}
        parallaxOffset={parallax}
      />

      {/* Champagne-gold ambient illumination intensifying smoothly on hover */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[16px] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(78% 52% at 50% 0%, rgba(216, 184, 121, 0.16) 0%, transparent 62%), radial-gradient(75% 45% at 50% 100%, rgba(216, 184, 121, 0.12) 0%, transparent 65%)',
        }}
      />

      {/* Understated metallic / champagne-gold hairline border */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[16px] border transition-colors duration-500 ${
          isHovered ? 'border-[#D8B879]/48' : 'border-[#E6E8EC]/12'
        }`}
      />

      {/* Top-right hover-revealed ivory square diagonal arrow indicator (↗) */}
      <div className="relative z-20 flex justify-end p-6">
        <span
          aria-hidden="true"
          data-testid="drak-hover-arrow"
          className={`inline-flex h-9 w-9 items-center justify-center bg-[#F3F1ED] text-[#0A0A0A] shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered
              ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
              : 'opacity-0 -translate-x-1 translate-y-1 scale-95'
          }`}
        >
          <ArrowUpRight
            className={`h-4 w-4 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered && !reducedMotion ? 'translate-x-[0.5px] -translate-y-[0.5px]' : ''
            }`}
            strokeWidth={1.75}
          />
        </span>
      </div>

      {/* Bottom DRAK AI branding */}
      <div className="relative z-10 px-7 pb-7 pt-4 space-y-2">
        <h2
          className={`font-sans-krx text-2xl sm:text-[1.7rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${
            isHovered ? 'text-[#F8F7F4]' : 'text-[#EAECEF]'
          }`}
        >
          DRAK AI
        </h2>
        <p
          className={`text-[10.5px] font-normal tracking-[0.2em] uppercase leading-relaxed transition-colors duration-300 ${
            isHovered ? 'text-[#D8B879]' : 'text-[#AEB3BC]/72'
          }`}
        >
          AUTONOMOUS RESEARCH &amp; EVOLUTION ENGINE
        </p>
      </div>
    </a>
  );
}
