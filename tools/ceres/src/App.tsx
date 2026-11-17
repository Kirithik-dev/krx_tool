import type { MouseEvent } from 'react';
import { CERES_ASSETS } from './assets';
import { CERES_METADATA } from './logic/ceresConfig';
import './styles/ceres.css';

export interface CeresAppProps {
  onBackToTools?: () => void;
}

function BackArrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M13.25 8H2.75M2.75 8L7.25 3.5M2.75 8L7.25 12.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/**
 * Dedicated CERES Tool Interface (`tools/ceres/src/App.tsx`).
 * Remains independent inside `tools/ceres` and renders when CERES is opened.
 */
export function CeresApp({ onBackToTools }: CeresAppProps) {
  const handleBack = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onBackToTools) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onBackToTools();
  };

  return (
    <div
      data-testid="ceres-tool-interface"
      className="ceres-shell relative min-h-[100svh] w-full flex flex-col justify-between text-[#181613]"
    >
      {/* CERES Header */}
      <header className="w-full border-b border-[#464038]/12 bg-[#F4EFE6]/72 backdrop-blur-md">
        <div className="mx-auto flex h-14 md:h-16 max-w-[1440px] items-center justify-between gap-8 px-6 md:px-12">
          <div className="flex items-center gap-3">
            <span className="font-sans-krx text-sm md:text-base font-medium tracking-[0.26em] uppercase text-[#181613]">
              {CERES_METADATA.name}
            </span>
            <span aria-hidden="true" className="h-3.5 w-[1px] bg-[#181613]/20" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8E6F3E]">
              {CERES_METADATA.category}
            </span>
          </div>

          <a
            href="/tools"
            onClick={handleBack}
            className="group inline-flex items-center gap-2.5 min-h-[44px] py-2 text-xs tracking-[0.12em] uppercase text-[#3E3A34]/85 hover:text-[#181613] transition-colors"
          >
            <BackArrow className="h-3.5 w-3.5 text-[#987846] transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Toolkit</span>
          </a>
        </div>
      </header>

      {/* CERES Dedicated Interface Workspace */}
      <main className="mx-auto flex-1 w-full max-w-[1440px] px-6 md:px-12 py-12 md:py-20 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">
          <div className="lg:col-span-6 relative overflow-hidden rounded-[8px] shadow-[0_26px_64px_rgba(38,32,24,0.18)] ring-1 ring-[#987846]/30 bg-[#17120E]">
            <video
              src={CERES_ASSETS.cardVideo}
              poster={CERES_ASSETS.cardPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ objectPosition: '50% 44%' }}
              className="w-full aspect-[10/9] object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <p className="text-[11px] font-medium tracking-[0.32em] uppercase text-[#8E6F3E]">
                KRX ECOSYSTEM · INDEPENDENT TOOL
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-light tracking-[0.06em] uppercase text-[#181613]">
                {CERES_METADATA.name}
              </h1>
              <p className="font-display italic text-xl text-[#6D5838]">
                {CERES_METADATA.tagline}
              </p>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-[#2F2B25]/85">
              {CERES_METADATA.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {CERES_METADATA.capabilities.map((cap) => (
                <div
                  key={cap.id}
                  className="ceres-card-frame rounded-[8px] p-4 space-y-1"
                >
                  <h2 className="text-xs font-medium tracking-[0.14em] uppercase text-[#181613]">
                    {cap.title}
                  </h2>
                  <p className="text-xs leading-relaxed text-[#2F2B25]/75">
                    {cap.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-[#464038]/12 bg-[#DFD7C9]/48">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-5 flex items-center justify-between text-xs tracking-[0.22em] uppercase text-[#423D36]/65">
          <span>KRX · {CERES_METADATA.name}</span>
          <span>{CERES_METADATA.route}</span>
        </div>
      </footer>
    </div>
  );
}

export default CeresApp;
