import type { ReactNode } from 'react';
import { useInViewReveal, usePrefersReducedMotion } from '../motion/useScrollChoreography';

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  variant?: 'glide' | 'mask';
  className?: string;
}

export function TextReveal({
  children,
  delay = 0,
  duration = 850,
  variant = 'glide',
  className = '',
}: TextRevealProps) {
  const { ref, isVisible } = useInViewReveal<HTMLDivElement>({
    threshold: 0.16,
    rootMargin: '0px 0px -8% 0px',
  });
  const reducedMotion = usePrefersReducedMotion();

  if (variant === 'mask') {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <div
          style={
            reducedMotion
              ? undefined
              : {
                  transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 105%, 0)',
                  opacity: isVisible ? 1 : 0,
                  transitionProperty: 'transform, opacity',
                  transitionDuration: `${duration}ms`,
                  transitionDelay: `${delay}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform, opacity',
                }
          }
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={
        reducedMotion
          ? undefined
          : {
              transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
              opacity: isVisible ? 1 : 0,
              transitionProperty: 'transform, opacity',
              transitionDuration: `${duration}ms`,
              transitionDelay: `${delay}ms`,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, opacity',
            }
      }
    >
      {children}
    </div>
  );
}
