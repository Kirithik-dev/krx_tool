import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { GlassflowSearchBar } from '../components/GlassflowSearchBar';
import { ToolkitCardGrid } from '../components/ToolkitCardGrid';
import { ToolkitStudioBackdrop } from '../components/ToolkitStudioBackdrop';
import { KRX_CONTENT } from '../data/krxContent';
import { KRX_TOOLKIT_REGISTRY } from '../data/toolkitRegistry';
import { KRX_TOKENS } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

interface ToolsPageProps {
  toolSlug: string | null;
  onNavigateHome: () => void;
  onNavigateTool?: (slug: string | null) => void;
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
 * Minimal, cinematic Champagne Titanium loading assembly triggered on query submission.
 * Features a precision counter-rotating titanium & champagne-gold optical ring and
 * a razor-thin pearl/champagne aperture sweep.
 */
function ChampagneTitaniumSearchLoader({
  query,
  reducedMotion,
}: {
  query: string;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      data-testid="toolkit-search-loader"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
      transition={{ duration: 0.45, ease: KRX_TOKENS.motion.easeCinema }}
      className="mt-7 flex flex-col items-center gap-3 select-none"
    >
      <div className="flex items-center gap-3">
        {/* Dual-Ring Brushed Titanium & Champagne-Gold Optical Mechanism */}
        <span
          aria-hidden="true"
          className="relative inline-flex h-[22px] w-[22px] items-center justify-center"
        >
          <svg viewBox="0 0 32 32" className="h-full w-full overflow-visible">
            {/* Outer static brushed-titanium dial */}
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="rgba(116, 108, 96, 0.22)"
              strokeWidth="1"
            />
            {/* Outer clockwise champagne-gold arc */}
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="#987846"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeDasharray="24 64"
              className={reducedMotion ? '' : 'krx-orbit-inner'}
              style={{ transformOrigin: '16px 16px' }}
            />
            {/* Inner counter-rotating pearl-silver & warm-grey gimbal */}
            <circle
              cx="16"
              cy="16"
              r="9.2"
              fill="none"
              stroke="#5A534A"
              strokeOpacity="0.55"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray="14 44"
              className={reducedMotion ? '' : 'krx-orbit-mid'}
              style={{ transformOrigin: '16px 16px' }}
            />
            {/* Center champagne-gold pinpoint */}
            <circle cx="16" cy="16" r="1.8" fill="#987846" />
          </svg>
        </span>

        <span className="font-sans-krx text-[10.5px] sm:text-[11px] font-medium tracking-[0.24em] uppercase text-[#2F2B26]/88">
          Searching Toolkit
          {query ? (
            <span className="font-normal text-[#6D5838]/90"> · {query}</span>
          ) : null}
        </span>
      </div>

      {/* Razor-Thin Champagne Titanium Linear Aperture Sweep */}
      <div
        aria-hidden="true"
        className="relative h-[1px] w-48 sm:w-60 overflow-hidden bg-[#7E766B]/22"
      >
        <motion.div
          initial={reducedMotion ? { x: '0%' } : { x: '-100%' }}
          animate={reducedMotion ? { x: '0%' } : { x: '100%' }}
          transition={
            reducedMotion
              ? { duration: 0.2 }
              : { duration: 1.15, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }
          }
          className="h-full w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(152, 120, 70, 0.75) 35%, rgba(255, 253, 248, 0.98) 50%, rgba(152, 120, 70, 0.75) 65%, transparent 100%)',
          }}
        />
      </div>
    </motion.div>
  );
}

/**
 * Architectural Champagne Titanium route container for `/tools` (and `/tools/:toolSlug`).
 * Integrates the frosted champagne Glassflow search console and the 3-column
 * creative-agency toolkit showcase grid inside a sunlit titanium studio bay.
 */
export function ToolsPage({
  toolSlug,
  onNavigateHome,
  onNavigateTool,
}: ToolsPageProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [activeSubmittedQuery, setActiveSubmittedQuery] = useState<string>('');
  const searchTimerRef = useRef<number | null>(null);

  const activeTool = useMemo(() => {
    if (!toolSlug) return null;
    const normalized = toolSlug.trim().toLowerCase();
    return (
      KRX_TOOLKIT_REGISTRY.find((t) => t.slug.toLowerCase() === normalized) ??
      null
    );
  }, [toolSlug]);

  const visibleTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return KRX_TOOLKIT_REGISTRY;
    return KRX_TOOLKIT_REGISTRY.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    return () => {
      if (searchTimerRef.current !== null) {
        window.clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  const handleSelectTool = (slug: string | null) => {
    if (onNavigateTool) {
      onNavigateTool(slug);
      return;
    }
    const targetPath = slug ? `/tools/${slug}` : '/tools';
    if (
      typeof window !== 'undefined' &&
      window.location.pathname !== targetPath
    ) {
      window.history.pushState(null, '', targetPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleQueryChange = (nextQuery: string) => {
    setSearchQuery(nextQuery);
    if (nextQuery.trim().length === 0 && isSearching) {
      if (searchTimerRef.current !== null) {
        window.clearTimeout(searchTimerRef.current);
        searchTimerRef.current = null;
      }
      setIsSearching(false);
    }
  };

  const handleSubmitSearch = (submitted: string) => {
    setSearchQuery(submitted);
    const trimmed = submitted.trim();
    if (searchTimerRef.current !== null) {
      window.clearTimeout(searchTimerRef.current);
      searchTimerRef.current = null;
    }

    setActiveSubmittedQuery(trimmed);
    setIsSearching(true);

    searchTimerRef.current = window.setTimeout(() => {
      setIsSearching(false);
      searchTimerRef.current = null;
    }, 1800);
  };

  const handleHomeLink = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onNavigateHome();
  };

  // When a dedicated tool slug is active (e.g. /tools/ceres), render its independent interface
  if (activeTool) {
    const { ToolAppComponent } = activeTool;
    return <ToolAppComponent onBackToTools={() => handleSelectTool(null)} />;
  }

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.65, ease: KRX_TOKENS.motion.easeCinema }}
      className="relative min-h-[100svh] w-full bg-[#E7E0D5] text-[#1D1B18] flex flex-col justify-between overflow-x-clip selection:bg-[#B89867]/25 selection:text-[#1D1B18]"
    >
      {/* Champagne Titanium architectural studio environment */}
      <ToolkitStudioBackdrop />

      {/* Minimal KRX Architecture Header */}
      <header className="relative z-10 w-full border-b border-[#464038]/12 bg-[#F4EFE6]/62 backdrop-blur-md">
        <div className="mx-auto flex h-14 md:h-16 max-w-[1440px] items-center justify-between gap-8 px-6 md:px-12">
          <a
            href="/"
            onClick={handleHomeLink}
            aria-label="KRX Home"
            className="font-sans-krx text-sm md:text-base font-medium tracking-[0.26em] uppercase text-[#1D1B18] hover:text-[#8E6F3E] transition-colors whitespace-nowrap shrink-0"
          >
            {KRX_CONTENT.brandMark}
          </a>

          <a
            href="/"
            onClick={handleHomeLink}
            className="group inline-flex items-center gap-2.5 min-h-[44px] py-2 text-xs tracking-[0.12em] uppercase text-[#3E3A34]/82 hover:text-[#1D1B18] transition-colors whitespace-nowrap shrink-0"
          >
            <BackArrow className="h-3.5 w-3.5 text-[#987846] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </a>
        </div>
      </header>

      {/* Primary Architectural Search Bay + 3-Column Creative Agency Showcase Grid */}
      <main
        aria-label="KRX Toolkit"
        className="relative z-10 flex-1 flex flex-col items-center justify-start mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-12 pt-[clamp(64px,calc(32vh-120px),180px)] md:pt-[clamp(80px,calc(32vh-134px),220px)] pb-28"
      >
        {/* Restrained Architectural Eyebrow */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: KRX_TOKENS.motion.easeCinema }}
          className="mb-5 text-[11px] font-medium tracking-[0.34em] uppercase text-[#6D5838]/88 select-none"
        >
          KRX TOOLKIT
        </motion.p>

        {/* Sticky Search Bar Container (sticks at 50px from top of viewport, centered in main container) */}
        <div
          data-testid="toolkit-sticky-search-shell"
          className="sticky top-[50px] z-30 w-full flex flex-col items-center py-2"
        >
          <div className="relative w-full md:w-[50vw] max-w-[740px] flex items-center">
            <span
              aria-hidden="true"
              className="hidden md:block pointer-events-none absolute right-[calc(100%+18px)] top-1/2 h-[1px] w-14 bg-gradient-to-l from-[#967A4F]/42 to-transparent"
            />
            <span
              aria-hidden="true"
              className="hidden md:block pointer-events-none absolute left-[calc(100%+18px)] top-1/2 h-[1px] w-14 bg-gradient-to-r from-[#967A4F]/42 to-transparent"
            />

            <GlassflowSearchBar
              value={searchQuery}
              onChange={handleQueryChange}
              onSubmitQuery={handleSubmitSearch}
              isSearching={isSearching}
            />
          </div>

          {/* Minimal Cinematic Champagne Titanium Search Loading Animation */}
          <AnimatePresence>
            {isSearching && (
              <ChampagneTitaniumSearchLoader
                query={activeSubmittedQuery}
                reducedMotion={reducedMotion}
              />
            )}
          </AnimatePresence>
        </div>

        {/* 3-Column Agency Portfolio Card Grid — CERES First */}
        <ToolkitCardGrid
          tools={visibleTools}
          onSelectTool={(slug) => handleSelectTool(slug)}
        />
      </main>

      {/* Quiet KRX Structural Footer Rule */}
      <footer className="relative z-10 w-full border-t border-[#464038]/12 bg-[#DFD7C9]/48 backdrop-blur-xs">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-5 flex items-center justify-between text-xs tracking-[0.22em] uppercase text-[#423D36]/65">
          <span>{KRX_CONTENT.brandMark}</span>
          <span>{toolSlug ? `/tools/${toolSlug}` : '/tools'}</span>
        </div>
      </footer>
    </motion.div>
  );
}
