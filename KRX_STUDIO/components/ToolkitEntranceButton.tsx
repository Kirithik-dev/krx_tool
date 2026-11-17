import { motion } from 'motion/react';
import type { MouseEvent } from 'react';
import { KRX_TOKENS } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

interface ToolkitEntranceButtonProps {
  label: string;
  href?: string;
  onEnter: () => void;
}

function PrecisionArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.25 12.75L12.75 3.25M12.75 3.25H5.5M12.75 3.25V10.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function ToolkitEntranceButton({
  label,
  href = '/tools',
  onEnter,
}: ToolkitEntranceButtonProps) {
  const reducedMotion = usePrefersReducedMotion();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Preserve native modifier-key open-in-new-tab behavior
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onEnter();
  };

  if (reducedMotion) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className="group relative inline-flex items-center justify-between gap-6 min-h-[52px] px-8 py-3.5 bg-[#F3F1ED] text-[#0A0A0A] border border-[#F3F1ED] hover:bg-[#0A0A0A] hover:text-[#F3F1ED] hover:border-[#D8B879] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
      >
        <span className="font-sans-krx text-xs font-medium tracking-[0.18em] uppercase">
          {label}
        </span>
        <PrecisionArrowUpRight className="h-3.5 w-3.5 text-current" />
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      aria-label={label}
      onClick={handleClick}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.14, ease: KRX_TOKENS.motion.easeCinema }}
      className="group relative inline-flex items-center justify-between gap-7 min-h-[52px] px-8 md:px-10 py-4 bg-[#F3F1ED] text-[#0A0A0A] border border-[#F3F1ED]/90 hover:border-[#D8B879]/85 overflow-hidden transition-[border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap shrink-0 cursor-pointer select-none"
    >
      {/* Directional obsidian sliding fill wipe */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#0A0A0A] origin-left -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      />

      {/* Precision horizontal top & bottom hairline sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-[#D8B879]/80 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)]"
      />

      {/* Dual-track vertical typography shift */}
      <span className="relative z-10 inline-flex flex-col overflow-hidden h-[1.15em] leading-[1.15em] font-sans-krx text-xs font-medium tracking-[0.18em] uppercase">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-[#0A0A0A]">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-[#F3F1ED]"
        >
          {label}
        </span>
      </span>

      {/* Subtle architectural divider tick */}
      <span
        aria-hidden="true"
        className="relative z-10 h-3.5 w-[1px] bg-[#0A0A0A]/20 group-hover:bg-[#D8B879]/45 transition-colors duration-400"
      />

      {/* Custom diagonal upper-right arrow reveal */}
      <span className="relative z-10 inline-flex items-center justify-center h-4 w-4 overflow-hidden">
        <PrecisionArrowUpRight className="h-3.5 w-3.5 text-[#0A0A0A] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5 group-hover:-translate-y-5" />
        <PrecisionArrowUpRight className="absolute h-3.5 w-3.5 text-[#D8B879] -translate-x-5 translate-y-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </motion.a>
  );
}
