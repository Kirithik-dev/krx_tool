import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';
import { KRX_CONTENT } from '../data/krxContent';

interface Scene07ClosingProps {
  onBackToTop: () => void;
}

export function Scene07Closing({ onBackToTop }: Scene07ClosingProps) {
  const {
    eyebrow,
    headline,
    invitation,
    channels,
    closingStatement,
    philosophySignoff,
    signature,
  } = KRX_CONTENT.closing;

  const configuredChannels = channels.filter(
    (channel): channel is typeof channel & { href: string } => Boolean(channel.href)
  );

  return (
    <section
      id="closing"
      aria-label="Contact"
      className="relative w-full bg-[#050505] text-[#F3F1ED] pt-24 pb-14 md:pt-40 md:pb-20 overflow-x-clip border-t border-[#F3F1ED]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 space-y-20 md:space-y-28">
        {/* Main Contact & Closing Lockup */}
        <div className="max-w-4xl space-y-6">
          <TextReveal delay={0} duration={750} variant="glide">
            <p className="text-xs tracking-[0.16em] uppercase text-[#D8B879]">
              {eyebrow}
            </p>
          </TextReveal>

          <TextReveal delay={90} duration={950} variant="mask">
            <h2 className="font-display text-[clamp(2.85rem,6vw,5.75rem)] font-light leading-[0.98] tracking-[-0.02em] text-balance pb-1">
              {headline}
            </h2>
          </TextReveal>

          <TextReveal delay={180} duration={900} variant="glide">
            <p className="max-w-xl text-sm md:text-base leading-relaxed text-[#F3F1ED]/72">
              {invitation}
            </p>
          </TextReveal>
        </div>

        {/* Configured Contact Destinations (Unavailable links stay hidden until configured) */}
        {configuredChannels.length > 0 && (
          <nav
            aria-label="Contact channels"
            className="flex flex-wrap items-center gap-8 md:gap-12 border-t border-[#F3F1ED]/12 pt-10"
          >
            {configuredChannels.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.id === 'email' ? undefined : '_blank'}
                rel={channel.id === 'email' ? undefined : 'noopener noreferrer'}
                className="group inline-flex items-center gap-2 min-h-[44px] text-sm tracking-[0.1em] uppercase text-[#F3F1ED] hover:text-[#FF5A1F] transition-colors"
              >
                <span>{channel.displayLabel ?? channel.label}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </nav>
        )}

        {/* Final Closing Statement */}
        <div className="border-t border-[#F3F1ED]/12 pt-12 space-y-3 max-w-3xl">
          <p className="font-display text-[clamp(1.65rem,2.8vw,2.5rem)] font-light leading-[1.2] text-[#F3F1ED]">
            {closingStatement}
          </p>
          <p className="font-display italic text-base text-[#D8B879]/85">
            {philosophySignoff}
          </p>
        </div>

        {/* Minimal KRX Footer */}
        <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
          <p className="font-sans-krx text-sm font-medium tracking-[0.26em] uppercase text-[#F3F1ED]/70">
            {signature}
          </p>

          <button
            type="button"
            onClick={onBackToTop}
            className="inline-flex items-center gap-2.5 min-h-[44px] py-2 text-xs tracking-[0.12em] uppercase text-[#F3F1ED]/75 hover:text-[#FF5A1F] cursor-pointer bg-transparent border-0 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </section>
  );
}
