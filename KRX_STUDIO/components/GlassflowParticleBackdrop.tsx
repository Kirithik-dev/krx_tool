import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../motion/useScrollChoreography';

interface ParticleSpec {
  u: number;
  v: number;
  ribbon: number;
  size: number;
  alpha: number;
  hueShift: number;
  phase: number;
}

function seededUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

function createParticleField(count: number): ParticleSpec[] {
  const particles: ParticleSpec[] = [];
  for (let i = 0; i < count; i++) {
    const ribbon = i % 3;
    const u = seededUnit(i * 1.13 + 0.7);
    const vUni = seededUnit(i * 2.71 + 1.9);
    // Bias density sharply toward the top crest ridge of each flowing wave sheet (0 = ridge spine, >0 = trailing slope below)
    const v = Math.pow(vUni, 2.2) * (seededUnit(i * 9.11) > 0.18 ? 1 : -0.18);
    const size = 0.7 + Math.pow(seededUnit(i * 4.91), 2.2) * 1.6;
    const alpha = 0.16 + Math.pow(seededUnit(i * 5.77), 1.45) * 0.72;
    const hueShift = seededUnit(i * 6.43);
    const phase = seededUnit(i * 7.89) * Math.PI * 2;
    particles.push({ u, v, ribbon, size, alpha, hueShift, phase });
  }
  return particles;
}

const PARTICLE_FIELD = createParticleField(1900);

export function GlassflowParticleBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let time = 0.65;
    let nebulaCanvas: HTMLCanvasElement | null = null;

    const rebuildNebulaCache = () => {
      nebulaCanvas = document.createElement('canvas');
      nebulaCanvas.width = Math.max(1, width);
      nebulaCanvas.height = Math.max(1, height);
      const nCtx = nebulaCanvas.getContext('2d');
      if (!nCtx) return;

      // Upper-right golden dune ambient warmth behind right half of search bar
      const glowA = nCtx.createRadialGradient(
        width * 0.76,
        height * 0.34,
        width * 0.01,
        width * 0.76,
        height * 0.34,
        width * 0.42
      );
      glowA.addColorStop(0, 'rgba(202, 142, 70, 0.2)');
      glowA.addColorStop(0.45, 'rgba(135, 88, 38, 0.08)');
      glowA.addColorStop(1, 'rgba(5, 5, 5, 0)');
      nCtx.fillStyle = glowA;
      nCtx.fillRect(0, 0, width, height);

      // Lower-left warm amber crest glow passing beneath left shoulder of bar
      const glowB = nCtx.createRadialGradient(
        width * 0.2,
        height * 0.48,
        width * 0.01,
        width * 0.2,
        height * 0.48,
        width * 0.38
      );
      glowB.addColorStop(0, 'rgba(196, 140, 74, 0.16)');
      glowB.addColorStop(0.5, 'rgba(116, 74, 32, 0.06)');
      glowB.addColorStop(1, 'rgba(5, 5, 5, 0)');
      nCtx.fillStyle = glowB;
      nCtx.fillRect(0, 0, width, height);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildNebulaCache();
    };

    const drawWaveFrame = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      if (nebulaCanvas) {
        ctx.drawImage(nebulaCanvas, 0, 0, width, height);
      }

      // Three sculptural golden particle dunes sweeping across the upper-middle and mid-lower planes
      for (let i = 0; i < PARTICLE_FIELD.length; i++) {
        const p = PARTICLE_FIELD[i];
        const x = p.u * (width + 60) - 30;
        const nx = p.u;

        let ridgeY = 0;
        let spread = 0;

        if (p.ribbon === 0) {
          // Primary upper-right crest sweeping cleanly behind the search bar center & right edge
          ridgeY =
            height * (0.41 - nx * 0.17) +
            Math.sin(nx * 4.6 - t * 0.36 + 0.5) * height * 0.085 +
            Math.cos(nx * 8.2 + t * 0.22) * height * 0.028;
          spread = height * 0.26;
        } else if (p.ribbon === 1) {
          // Secondary lower-left dune rising up across bottom-center of the search bar
          ridgeY =
            height * (0.37 + nx * 0.14) +
            Math.sin(nx * 4.1 + t * 0.3 + 1.8) * height * 0.095 +
            Math.sin(nx * 9.0 - t * 0.2) * height * 0.025;
          spread = height * 0.24;
        } else {
          // Broad lower horizon particle swell grounding the composition
          ridgeY =
            height * (0.64 - nx * 0.12) +
            Math.cos(nx * 3.7 + t * 0.26 + 0.9) * height * 0.08 +
            Math.sin(nx * 7.6 + t * 0.18) * height * 0.024;
          spread = height * 0.28;
        }

        const y =
          ridgeY +
          p.v * spread +
          Math.sin(p.phase + t * 0.5 + nx * 4.5) * 4.5;

        if (y < -12 || y > height + 12) continue;

        // Sharp luminous ridge crest fading smoothly down the shadowed slope
        const distFromRidge = Math.abs(p.v);
        const ridgeGlow = Math.max(0, 1 - distFromRidge * 1.45);
        const twinkle = 0.8 + 0.2 * Math.sin(t * 1.05 + p.phase * 2.0);
        const finalAlpha = p.alpha * (0.14 + 0.86 * Math.pow(ridgeGlow, 1.35)) * twinkle;

        if (finalAlpha < 0.03) continue;

        const r = Math.round(204 + p.hueShift * 46);
        const g = Math.round(150 + p.hueShift * 58);
        const b = Math.round(80 + p.hueShift * 68);

        const grainSize = p.size * (0.72 + ridgeGlow * 0.65);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha.toFixed(3)})`;
        ctx.fillRect(x, y, grainSize, grainSize);
      }
    };

    resize();
    drawWaveFrame(time);

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            resize();
            drawWaveFrame(time);
          })
        : null;
    observer?.observe(canvas);

    if (!reducedMotion) {
      let lastTimestamp = performance.now();
      const tick = (now: number) => {
        if (!document.hidden && now - lastTimestamp >= 28) {
          const deltaSec = Math.min(0.05, Math.max(0, (now - lastTimestamp) / 1000));
          lastTimestamp = now;
          time += deltaSec * 0.42;
          drawWaveFrame(time);
        }
        rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden bg-[#050505]"
    >
      {/* Subtle architectural vignette anchoring pitch obsidian corners */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 65% at 50% 42%, rgba(26, 20, 14, 0.42) 0%, rgba(7, 6, 5, 0.92) 72%, #040404 100%)',
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-95"
      />

      {/* Soft top & bottom obsidian feathering so header & footer breathe cleanly */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505]/80" />
    </div>
  );
}
