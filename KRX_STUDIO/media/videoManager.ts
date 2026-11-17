import { useEffect, useSyncExternalStore } from 'react';
import { KRX_CONTENT } from '../data/krxContent';

export type VideoLoadStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface VideoManifestEntry {
  id: string;
  sceneId: string;
  src: string;
  poster: string;
  priority: number;
  eager?: boolean;
}

export interface VideoAssetSnapshot {
  status: VideoLoadStatus;
  objectUrl: string | null;
  posterReady: boolean;
  videoReady: boolean;
}

const DEFAULT_SNAPSHOT: VideoAssetSnapshot = {
  status: 'idle',
  objectUrl: null,
  posterReady: false,
  videoReady: false,
};

export const KRX_VIDEO_MANIFEST: VideoManifestEntry[] = [
  {
    id: 'opening',
    sceneId: 'opening',
    src: KRX_CONTENT.opening.heroVideo,
    poster: KRX_CONTENT.opening.heroImage,
    priority: 0,
    eager: true,
  },
  {
    id: 'foundation',
    sceneId: 'identity',
    src: KRX_CONTENT.foundation.videoSrc,
    poster: KRX_CONTENT.foundation.imageSrc,
    priority: 1,
  },
  {
    id: 'philosophy',
    sceneId: 'philosophy',
    src: KRX_CONTENT.philosophy.videoSrc,
    poster: KRX_CONTENT.philosophy.imageSrc,
    priority: 2,
  },
  {
    id: 'blackbox',
    sceneId: 'blackbox',
    src: KRX_CONTENT.blackbox.videoSrc,
    poster: KRX_CONTENT.blackbox.imageSrc,
    priority: 3,
  },
  {
    id: 'engineering',
    sceneId: 'engineering',
    src: KRX_CONTENT.engineering.videoSrc,
    poster: KRX_CONTENT.engineering.imageSrc,
    priority: 4,
  },
  {
    id: 'exploration',
    sceneId: 'capabilities',
    src: KRX_CONTENT.exploration.videoSrc,
    poster: KRX_CONTENT.exploration.imageSrc,
    priority: 5,
  },
  {
    id: 'horizon',
    sceneId: 'horizon',
    src: KRX_CONTENT.horizon.videoSrc,
    poster: KRX_CONTENT.horizon.imageSrc,
    priority: 6,
  },
];

interface NetworkInformationLike {
  saveData?: boolean;
}

function isSaveDataEnabled(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & { connection?: NetworkInformationLike };
  return Boolean(nav.connection?.saveData);
}

class GlobalVideoLoadingManager {
  private snapshots = new Map<string, VideoAssetSnapshot>();
  private listeners = new Set<() => void>();
  private dynamicPriorityBoost = new Map<string, number>();
  private activeDownloads = new Set<string>();
  private posterPreloaded = new Set<string>();
  private heroGateReleased = false;
  private heroGateTimer: number | null = null;
  private isBooted = false;
  private isReducedMotion = false;
  private readonly maxConcurrent = 2;

  constructor() {
    for (const entry of KRX_VIDEO_MANIFEST) {
      this.snapshots.set(entry.src, { ...DEFAULT_SNAPSHOT });
    }
  }

  public boot(reducedMotion: boolean): void {
    this.isReducedMotion = reducedMotion;
    if (typeof window === 'undefined') return;

    // Always preload lightweight first-frame posters across every scene immediately
    // so zero blank gaps can occur even on instant jump-scrolling or fallback.
    for (const entry of KRX_VIDEO_MANIFEST) {
      this.preloadPoster(entry.src, entry.poster);
    }

    if (reducedMotion) {
      return;
    }

    if (!this.isBooted) {
      this.isBooted = true;
      // Release background preload gate once Hero is ready OR after a short deadline
      // so initial Hero streaming gets full uncontended bandwidth first.
      this.heroGateTimer = window.setTimeout(() => {
        this.releaseHeroGate();
      }, 900);
    }

    if (!isSaveDataEnabled()) {
      this.pumpQueue();
    }
  }

  public setReducedMotion(reducedMotion: boolean): void {
    const wasReduced = this.isReducedMotion;
    this.isReducedMotion = reducedMotion;
    if (wasReduced && !reducedMotion) {
      this.boot(false);
    }
  }

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  public getSnapshot(src: string): VideoAssetSnapshot {
    return this.snapshots.get(src) ?? DEFAULT_SNAPSHOT;
  }

  public registerPoster(src: string, poster: string): void {
    if (!this.snapshots.has(src)) {
      this.snapshots.set(src, { ...DEFAULT_SNAPSHOT });
    }
    this.preloadPoster(src, poster);
  }

  public markStreamReady(src: string): void {
    const prev = this.snapshots.get(src) ?? DEFAULT_SNAPSHOT;
    if (!prev.videoReady) {
      this.updateSnapshot(src, {
        videoReady: true,
        status: prev.status === 'idle' ? 'ready' : prev.status,
      });
    }

    if (src === KRX_CONTENT.opening.heroVideo) {
      this.releaseHeroGate();
    }
  }

  public markStreamError(src: string): void {
    const prev = this.snapshots.get(src) ?? DEFAULT_SNAPSHOT;
    if (prev.status !== 'error') {
      this.updateSnapshot(src, {
        status: 'error',
        videoReady: false,
      });
    }
    if (src === KRX_CONTENT.opening.heroVideo) {
      this.releaseHeroGate();
    }
  }

  /**
   * Moves an asset to the front of the preload queue and triggers loading immediately
   * (e.g., when a user scrolls rapidly toward it or opens its dossier modal).
   */
  public prioritize(src: string): void {
    if (this.isReducedMotion || typeof window === 'undefined') return;
    if (!this.snapshots.has(src)) {
      this.snapshots.set(src, { ...DEFAULT_SNAPSHOT });
    }
    this.dynamicPriorityBoost.set(src, Date.now());
    this.releaseHeroGate();
    this.pumpQueue();
  }

  public prioritizeScene(sceneId: string): void {
    if (this.isReducedMotion || typeof window === 'undefined') return;
    const matches = KRX_VIDEO_MANIFEST.filter((entry) => entry.sceneId === sceneId);
    if (matches.length === 0) return;

    const now = Date.now();
    matches.forEach((entry, idx) => {
      this.dynamicPriorityBoost.set(entry.src, now - idx);
    });
    this.releaseHeroGate();
    this.pumpQueue();
  }

  public getPreloadSummary(): {
    total: number;
    ready: number;
    postersReady: number;
    errors: number;
  } {
    let ready = 0;
    let postersReady = 0;
    let errors = 0;
    for (const entry of KRX_VIDEO_MANIFEST) {
      const snap = this.getSnapshot(entry.src);
      if (snap.objectUrl || snap.videoReady || snap.status === 'ready') ready += 1;
      if (snap.posterReady) postersReady += 1;
      if (snap.status === 'error') errors += 1;
    }
    return {
      total: KRX_VIDEO_MANIFEST.length,
      ready,
      postersReady,
      errors,
    };
  }

  private releaseHeroGate(): void {
    if (this.heroGateReleased) return;
    this.heroGateReleased = true;
    if (this.heroGateTimer !== null && typeof window !== 'undefined') {
      window.clearTimeout(this.heroGateTimer);
      this.heroGateTimer = null;
    }
    this.pumpQueue();
  }

  private preloadPoster(src: string, poster: string): void {
    if (typeof window === 'undefined' || !poster || this.posterPreloaded.has(poster)) {
      return;
    }
    this.posterPreloaded.add(poster);

    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      this.updateSnapshot(src, { posterReady: true });
    };
    img.onerror = () => {
      this.updateSnapshot(src, { posterReady: false });
    };
    img.src = poster;
    if (img.complete && img.naturalWidth > 0) {
      this.updateSnapshot(src, { posterReady: true });
    }
  }

  private pumpQueue(): void {
    if (this.isReducedMotion || typeof window === 'undefined') return;
    if (!this.heroGateReleased) return;
    if (isSaveDataEnabled() && this.dynamicPriorityBoost.size === 0) return;

    while (this.activeDownloads.size < this.maxConcurrent) {
      const next = this.pickNextCandidate();
      if (!next) break;
      void this.preloadVideo(next.src);
    }
  }

  private pickNextCandidate(): VideoManifestEntry | null {
    const candidates = KRX_VIDEO_MANIFEST.filter((entry) => {
      // Hero streams progressively on mount directly; cache remaining scenes first,
      // and avoid redundant Hero fetch while Hero is actively streaming unless complete.
      if (entry.eager) return false;
      const snap = this.getSnapshot(entry.src);
      if (snap.objectUrl || snap.status === 'loading' || snap.status === 'error') {
        return false;
      }
      if (isSaveDataEnabled() && !this.dynamicPriorityBoost.has(entry.src)) {
        return false;
      }
      return true;
    });

    if (candidates.length === 0) return null;

    candidates.sort((a, b) => {
      const boostA = this.dynamicPriorityBoost.get(a.src) ?? 0;
      const boostB = this.dynamicPriorityBoost.get(b.src) ?? 0;
      if (boostA !== boostB) return boostB - boostA;
      return a.priority - b.priority;
    });

    return candidates[0];
  }

  private async preloadVideo(src: string): Promise<void> {
    if (this.activeDownloads.has(src)) return;
    this.activeDownloads.add(src);
    this.updateSnapshot(src, { status: 'loading' });

    try {
      const response = await fetch(src, { credentials: 'same-origin' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const blob = await response.blob();
      if (!blob || blob.size === 0) {
        throw new Error('Empty video payload');
      }
      const objectUrl = URL.createObjectURL(blob);
      this.updateSnapshot(src, {
        status: 'ready',
        objectUrl,
      });
    } catch {
      this.updateSnapshot(src, {
        status: 'error',
      });
    } finally {
      this.activeDownloads.delete(src);
      this.pumpQueue();
    }
  }

  private updateSnapshot(src: string, patch: Partial<VideoAssetSnapshot>): void {
    const prev = this.snapshots.get(src) ?? DEFAULT_SNAPSHOT;
    const next: VideoAssetSnapshot = {
      ...prev,
      ...patch,
    };
    this.snapshots.set(src, next);
    for (const listener of this.listeners) {
      listener();
    }
  }
}

export const videoManager = new GlobalVideoLoadingManager();

export function getVideoEntryForScene(sceneId: string): VideoManifestEntry | null {
  return KRX_VIDEO_MANIFEST.find((entry) => entry.sceneId === sceneId) ?? null;
}

export function useVideoAsset(src: string, poster: string): VideoAssetSnapshot {
  useEffect(() => {
    videoManager.registerPoster(src, poster);
  }, [src, poster]);

  return useSyncExternalStore(
    videoManager.subscribe,
    () => videoManager.getSnapshot(src),
    () => DEFAULT_SNAPSHOT
  );
}
