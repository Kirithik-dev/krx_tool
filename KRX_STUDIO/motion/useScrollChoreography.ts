import { useEffect, useRef, useState, type RefObject } from 'react';
import { KRX_SCENES, type SceneMeta } from '../tokens/designTokens';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export function useInViewReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}): { ref: RefObject<T | null>; isVisible: boolean } {
  const ref = useRef<T | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  const threshold = options?.threshold ?? 0.18;
  const rootMargin = options?.rootMargin ?? '0px 0px -8% 0px';

  useEffect(() => {
    if (reducedMotion) {
      setHasEntered(true);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            setHasEntered(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, threshold, rootMargin]);

  return { ref, isVisible: reducedMotion || hasEntered };
}

export function useActiveScene(): {
  activeScene: SceneMeta;
  scrollProgress: number;
  scrollToScene: (id: string, options?: { behavior?: ScrollBehavior }) => void;
} {
  const [activeId, setActiveId] = useState<string>(KRX_SCENES[0].id);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const elements = KRX_SCENES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const updateActiveAndProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      setScrollProgress(ratio);

      // Determine active scene using viewport probe line (32% from top)
      const probeY = window.innerHeight * 0.32;
      let current = KRX_SCENES[0].id;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY * 0.5) {
          current = el.id;
        }
      }
      setActiveId(current);
    };

    updateActiveAndProgress();
    window.addEventListener('scroll', updateActiveAndProgress, { passive: true });
    window.addEventListener('resize', updateActiveAndProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveAndProgress);
      window.removeEventListener('resize', updateActiveAndProgress);
    };
  }, []);

  const activeScene = KRX_SCENES.find((s) => s.id === activeId) ?? KRX_SCENES[0];

  const scrollToScene = (id: string, options?: { behavior?: ScrollBehavior }) => {
    const target = document.getElementById(id);
    if (!target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = reduced ? 'auto' : (options?.behavior ?? 'smooth');
    target.scrollIntoView({ behavior, block: 'start' });
  };

  return { activeScene, scrollProgress, scrollToScene };
}
