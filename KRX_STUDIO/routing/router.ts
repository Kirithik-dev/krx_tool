import { useCallback, useEffect, useState } from 'react';

export type KrxRoute =
  | { view: 'home' }
  | { view: 'tools'; toolSlug: string | null }
  | { view: 'drak' };

export function parseKrxRoute(pathname: string): KrxRoute {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized === '/drak') {
    return { view: 'drak' };
  }

  if (normalized === '/tools') {
    return { view: 'tools', toolSlug: null };
  }

  if (normalized.startsWith('/tools/')) {
    const slug = decodeURIComponent(normalized.slice('/tools/'.length)).trim();
    return { view: 'tools', toolSlug: slug || null };
  }

  return { view: 'home' };
}

export function useKrxRouter(): {
  route: KrxRoute;
  navigate: (to: string) => void;
} {
  const [route, setRoute] = useState<KrxRoute>(() => {
    if (typeof window === 'undefined') return { view: 'home' };
    return parseKrxRoute(window.location.pathname);
  });

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseKrxRoute(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;
    const targetPath = to.startsWith('/') ? to : `/${to}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    setRoute(parseKrxRoute(targetPath));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return { route, navigate };
}
