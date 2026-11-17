import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { motion } from 'motion/react';
import { KRX_TOKENS } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

interface GlassflowSearchBarProps {
  value: string;
  onChange: (nextQuery: string) => void;
  onSubmitQuery?: (query: string) => void;
  placeholder?: string;
  isSearching?: boolean;
}

function GlassSearchIcon({
  active,
  searching = false,
}: {
  active: boolean;
  searching?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-[18px] w-[18px] sm:h-[19px] sm:w-[19px] shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        active
          ? 'text-[#1D1B18] scale-[1.06]'
          : 'text-[#3A352E]/85 group-hover:text-[#1D1B18] group-hover:scale-[1.03]'
      }`}
    >
      {searching && (
        <circle
          cx="10.75"
          cy="10.75"
          r="9"
          stroke="#987846"
          strokeWidth="1.1"
          strokeDasharray="14 10"
          className="origin-[10.75px_10.75px] animate-spin"
          style={{ animationDuration: '2.4s' }}
        />
      )}
      <circle
        cx="10.75"
        cy="10.75"
        r="6.75"
        stroke="currentColor"
        strokeWidth="1.55"
      />
      <path
        d="M15.65 15.65L20.25 20.25"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GlassflowSearchBar({
  value,
  onChange,
  onSubmitQuery,
  placeholder = 'SEARCH THE KRX TOOLKIT...',
  isSearching = false,
}: GlassflowSearchBarProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [isFocused, setIsFocused] = useState(false);

  // Global Cmd+K / Ctrl+K shortcut focusing the Glassflow input
  useEffect(() => {
    const onGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', onGlobalKeyDown);
    return () => window.removeEventListener('keydown', onGlobalKeyDown);
  }, []);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (value.length > 0) {
        onChange('');
      } else {
        inputRef.current?.blur();
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitQuery?.(value.trim());
  };

  return (
    <motion.form
      role="search"
      aria-label="Search the KRX Toolkit"
      aria-busy={isSearching}
      onSubmit={handleSubmit}
      initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.08, ease: KRX_TOKENS.motion.easeCinema }}
      className="relative w-full max-w-[740px] mx-auto"
    >
      {/* Subtle warm champagne architectural plinth reflection beneath the frosted chassis */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-x-6 -bottom-3 h-10 rounded-full blur-2xl transition-opacity duration-500 ${
          isFocused || isSearching ? 'opacity-85' : 'opacity-50'
        }`}
        style={{
          background:
            'radial-gradient(62% 100% at 54% 40%, rgba(196, 166, 118, 0.24) 0%, rgba(140, 128, 112, 0.12) 52%, transparent 100%)',
        }}
      />

      {/* Main Frosted Champagne-Glass Shell */}
      <div
        onClick={handleContainerClick}
        className={`group relative flex h-[56px] sm:h-[62px] md:h-[66px] w-full items-center gap-3 sm:gap-4 rounded-[18px] sm:rounded-[20px] px-4 sm:px-6 cursor-text transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFocused || isSearching
            ? 'scale-[1.006] shadow-[0_24px_56px_rgba(62,54,44,0.18),0_6px_18px_rgba(62,54,44,0.1)]'
            : 'shadow-[0_16px_44px_rgba(68,60,49,0.13),0_4px_12px_rgba(68,60,49,0.07)] hover:scale-[1.002] hover:shadow-[0_20px_52px_rgba(64,56,46,0.16),0_5px_14px_rgba(64,56,46,0.09)]'
        }`}
        style={{
          background:
            isFocused || isSearching
              ? 'linear-gradient(125deg, rgba(255, 253, 249, 0.86) 0%, rgba(244, 238, 228, 0.74) 48%, rgba(248, 241, 229, 0.82) 100%)'
              : 'linear-gradient(125deg, rgba(252, 249, 243, 0.74) 0%, rgba(239, 232, 220, 0.6) 50%, rgba(244, 236, 222, 0.7) 100%)',
          backdropFilter: 'blur(22px) saturate(135%)',
          WebkitBackdropFilter: 'blur(22px) saturate(135%)',
        }}
      >
        {/* Uneven Brushed Pearl-Silver to Champagne-Gold Metallic Rim Bevel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] p-[1px] transition-opacity duration-300"
          style={{
            background:
              isFocused || isSearching
                ? 'linear-gradient(155deg, rgba(255, 255, 255, 0.98) 0%, rgba(196, 190, 180, 0.62) 32%, rgba(138, 130, 118, 0.36) 64%, rgba(176, 144, 92, 0.72) 100%)'
                : 'linear-gradient(155deg, rgba(255, 255, 255, 0.92) 0%, rgba(188, 181, 171, 0.52) 30%, rgba(132, 124, 112, 0.28) 64%, rgba(174, 144, 96, 0.56) 100%)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Top Pearl Specular Highlight + Bottom Brushed Titanium Catchlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1px] rounded-[inherit]"
          style={{
            boxShadow:
              isFocused || isSearching
                ? 'inset 0 1px 1.5px rgba(255, 255, 255, 0.92), inset 0 -1px 2px rgba(146, 128, 102, 0.24)'
                : 'inset 0 1px 1.5px rgba(255, 255, 255, 0.82), inset 0 -1px 2px rgba(134, 124, 110, 0.18)',
          }}
        />

        {/* Cinematic Champagne-Gold & Pearl-Silver Bottom Rim Scan when Query Submitted */}
        {isSearching && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 bottom-0 h-[1.5px] overflow-hidden rounded-full"
          >
            <motion.div
              initial={reducedMotion ? { opacity: 0.75 } : { x: '-100%' }}
              animate={reducedMotion ? { opacity: 0.75 } : { x: '100%' }}
              transition={
                reducedMotion
                  ? { duration: 0.2 }
                  : { duration: 1.15, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }
              }
              className="h-full w-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(164, 132, 82, 0.65) 32%, rgba(255, 252, 244, 0.98) 50%, rgba(164, 132, 82, 0.65) 68%, transparent 100%)',
              }}
            />
          </div>
        )}

        {/* Delicate Optical Reflections & Frosted Champagne Veils */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        >
          {/* Upper-left pearl specular sheen */}
          <div
            className="absolute inset-0 opacity-85"
            style={{
              background:
                'radial-gradient(44% 95% at 10% 8%, rgba(255, 255, 255, 0.52) 0%, transparent 72%)',
            }}
          />
          {/* Subtle mid-glass frosted satin diffusion */}
          <div
            className="absolute inset-0 opacity-75"
            style={{
              background:
                'radial-gradient(30% 85% at 40% 36%, rgba(255, 252, 246, 0.28) 0%, transparent 72%), radial-gradient(36% 90% at 68% 76%, rgba(214, 188, 146, 0.18) 0%, transparent 76%)',
            }}
          />
          {/* Faint diagonal architectural optical glass veils */}
          <div
            className="absolute -inset-y-8 left-[22%] w-[44%] -skew-x-12 opacity-[0.22]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.72) 48%, transparent 100%)',
            }}
          />
          <div
            className="absolute -inset-y-8 left-[56%] w-[26%] skew-x-12 opacity-[0.14]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(224, 198, 156, 0.65) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* Left Magnifying Glass Icon */}
        <div className="relative z-10 flex items-center justify-center pl-0.5 sm:pl-1">
          <GlassSearchIcon
            active={isFocused || value.length > 0}
            searching={isSearching}
          />
        </div>

        {/* Dark Charcoal Letter-Spaced Input */}
        <label htmlFor={inputId} className="sr-only">
          Search the KRX Toolkit
        </label>
        <input
          id={inputId}
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="relative z-10 flex-1 min-w-0 bg-transparent border-0 outline-none focus-visible:outline-none font-sans-krx text-[10px] sm:text-[11.5px] md:text-[12px] font-normal tracking-[0.12em] sm:tracking-[0.25em] text-[#1D1B18] placeholder:text-[#4F4A42]/76 placeholder:tracking-[0.12em] sm:placeholder:tracking-[0.25em] caret-[#9B7B4A] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        />

        {/* Vertical Brushed-Titanium Hairline Divider + Shortcut Keycap */}
        <div className="relative z-10 flex items-center gap-2.5 sm:gap-4 shrink-0">
          <span
            aria-hidden="true"
            className="h-5 sm:h-6 w-[1px] bg-gradient-to-b from-transparent via-[#5E574E]/28 to-transparent"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
            aria-label="Focus search input (Command K)"
            className={`inline-flex items-center justify-center min-w-[38px] sm:min-w-[48px] h-[26px] sm:h-[29px] px-2 sm:px-2.5 rounded-[7px] border text-[10.5px] sm:text-[12px] font-medium tracking-[0.06em] tabular-nums transition-all duration-300 cursor-pointer select-none ${
              isFocused
                ? 'bg-[#FAF6EE]/95 border-[#A68450]/58 text-[#1D1B18] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_3px_rgba(62,54,44,0.1)]'
                : 'bg-[#F3EDE2]/78 border-[#7E766B]/28 text-[#2F2B26]/88 hover:border-[#7E766B]/45 hover:bg-[#FAF6EE]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_1px_2px_rgba(62,54,44,0.07)]'
            }`}
          >
            ⌘ K
          </button>
        </div>
      </div>
    </motion.form>
  );
}
