import { motion } from 'motion/react';
import type { ToolkitRegistryEntry } from '../data/toolkitRegistry';
import { KRX_TOKENS } from '../tokens/designTokens';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

interface ToolkitCardGridProps {
  tools: readonly ToolkitRegistryEntry[];
  onSelectTool: (slug: string) => void;
}

/**
 * Responsive 3-column creative-agency showcase grid for the `/tools` page.
 * Renders large, full-bleed tool cards with sharp architectural corners and
 * all typography + hover-revealed diagonal arrow (↗) contained strictly inside the card frame.
 */
export function ToolkitCardGrid({ tools, onSelectTool }: ToolkitCardGridProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (tools.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="KRX Toolkit Showcase"
      data-testid="toolkit-card-grid"
      className="relative z-10 mt-14 sm:mt-16 md:mt-20 w-full max-w-[1380px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 lg:gap-10 items-stretch">
        {tools.map((tool, idx) => {
          const { CardComponent } = tool;
          return (
            <motion.div
              key={tool.slug}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.14 + idx * 0.08,
                ease: KRX_TOKENS.motion.easeCinema,
              }}
              className="w-full flex"
            >
              <CardComponent
                href={tool.route}
                onSelect={() => onSelectTool(tool.slug)}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
