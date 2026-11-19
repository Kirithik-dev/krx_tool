import { useEffect, useRef } from 'react';

interface DrakHoverVisualProps {
  active: boolean;
  reducedMotion: boolean;
  videoSrc?: string | null;
  parallaxOffset: { x: number; y: number };
}

interface OrbitParticle {
  theta: number;
  phi: number;
  radius: number;
  speed: number;
  drift: number;
  size: number;
  alpha: number;
  gold: boolean;
}

interface BranchNode {
  theta: number;
  phi: number;
  radius: number;
  parent: number | null;
  depth: number;
}

function createParticles(count: number): OrbitParticle[] {
  const particles: OrbitParticle[] = [];
  for (let i = 0; i < count; i += 1) {
    const u = (i + 0.5) / count;
    const phi = Math.acos(1 - 2 * u) + Math.sin(i * 12.9898) * 0.25;
    const theta = i * 2.39996323;
    const shellBand = i % 5 === 0 ? 1.38 : i % 3 === 0 ? 1.16 : 1.02;
    const radius = shellBand + ((i * 73) % 100) * 0.0042;
    particles.push({
      theta,
      phi,
      radius,
      speed: 0.08 + ((i * 19) % 40) * 0.0032,
      drift: (i % 2 === 0 ? 1 : -1) * (0.015 + ((i * 31) % 25) * 0.001),
      size: i % 11 === 0 ? 1.65 : i % 3 === 0 ? 1.15 : 0.72,
      alpha: 0.28 + ((i * 47) % 65) * 0.0095,
      gold: i % 7 === 0 || i % 17 === 0,
    });
  }
  return particles;
}

function createKnowledgeBranches(): BranchNode[] {
  const nodes: BranchNode[] = [];
  const rootCount = 12;

  for (let r = 0; r < rootCount; r += 1) {
    const rootTheta = (r / rootCount) * Math.PI * 2 + (r % 2) * 0.22;
    const rootPhi = Math.PI * (0.28 + ((r * 37) % 44) / 100);
    const rootIdx = nodes.length;
    nodes.push({
      theta: rootTheta,
      phi: rootPhi,
      radius: 1.02,
      parent: null,
      depth: 0,
    });

    const branchCount = 2 + (r % 2);
    for (let b = 0; b < branchCount; b += 1) {
      const bTheta = rootTheta + (b === 0 ? -0.26 : b === 1 ? 0.24 : 0.04);
      const bPhi = rootPhi + (b === 1 ? -0.22 : 0.2);
      const midIdx = nodes.length;
      nodes.push({
        theta: bTheta,
        phi: bPhi,
        radius: 1.24 + b * 0.04,
        parent: rootIdx,
        depth: 1,
      });

      const leafCount = 2;
      for (let l = 0; l < leafCount; l += 1) {
        nodes.push({
          theta: bTheta + (l === 0 ? -0.18 : 0.19),
          phi: bPhi + (l === 0 ? 0.16 : -0.15),
          radius: 1.44 + (l % 2) * 0.08,
          parent: midIdx,
          depth: 2,
        });
      }
    }
  }

  return nodes;
}

const PARTICLES = createParticles(2200);
const BRANCH_NODES = createKnowledgeBranches();

/**
 * Dormant-to-awakened cosmic energy core & circular energy ring in the upper-middle void,
 * with a drop-in `<video>` slot for future rendered MP4 replacement.
 */
export function DrakHoverVisual({
  active,
  reducedMotion,
  videoSrc = null,
  parallaxOffset,
}: DrakHoverVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeRef = useRef(active);
  const energyMixRef = useRef(active ? 1 : 0);
  const timeRef = useRef(0);

  activeRef.current = active;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    if (active && !reducedMotion) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, reducedMotion, videoSrc]);

  useEffect(() => {
    if (videoSrc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number | null = null;
    let lastTimestamp = performance.now();

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextW = Math.max(1, Math.round(rect.width * dpr));
      const nextH = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== nextW || canvas.height !== nextH) {
        canvas.width = nextW;
        canvas.height = nextH;
      }
    };

    const drawFrame = (now: number) => {
      syncSize();
      const dt = Math.min(0.05, (now - lastTimestamp) / 1000);
      lastTimestamp = now;

      const isActive = activeRef.current;
      const targetMix = isActive ? 1 : 0;
      energyMixRef.current +=
        (targetMix - energyMixRef.current) * (reducedMotion ? 1 : 0.08);

      const mix = energyMixRef.current;
      if (!reducedMotion) {
        timeRef.current += dt * (0.14 + 0.86 * mix);
      }

      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w * 0.5;
      // Upper-middle energy ring placement
      const cy = h * 0.41;
      const sphereRadius = Math.min(w, h) * 0.31;
      const focal = sphereRadius * 3.4;

      ctx.clearRect(0, 0, w, h);

      // Dormant vs awakened luminance curve
      const particleIntensity = 0.2 + 0.8 * mix;
      const ringIntensity = 0.16 + 0.84 * mix;

      // 1. Volumetric golden/silver corona around the central energy ring
      const corona = ctx.createRadialGradient(
        cx,
        cy,
        sphereRadius * 0.58,
        cx,
        cy,
        sphereRadius * 1.9
      );
      corona.addColorStop(0, `rgba(216, 184, 121, ${0.24 * mix + 0.025})`);
      corona.addColorStop(0.38, `rgba(232, 236, 244, ${0.11 * mix + 0.02})`);
      corona.addColorStop(0.74, `rgba(180, 145, 84, ${0.06 * mix})`);
      corona.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 1.9, 0, Math.PI * 2);
      ctx.fill();

      // 2. Interconnected knowledge-branch filaments emerging on hover
      if (mix > 0.04) {
        const projectedNodes = BRANCH_NODES.map((node) => {
          const rotTheta = node.theta + t * 0.09;
          const rotPhi = node.phi + Math.sin(t * 0.25 + node.theta) * 0.05;
          const r = sphereRadius * node.radius;
          const sinPhi = Math.sin(rotPhi);
          const x = r * sinPhi * Math.cos(rotTheta);
          const y = r * Math.cos(rotPhi);
          const z = r * sinPhi * Math.sin(rotTheta);
          const scale = focal / (focal - z);
          return {
            x: cx + x * scale,
            y: cy + y * scale,
            z,
            depth: node.depth,
            parent: node.parent,
          };
        });

        ctx.save();
        ctx.lineCap = 'round';
        for (let i = 0; i < projectedNodes.length; i += 1) {
          const node = projectedNodes[i];
          if (node.parent === null) continue;
          const parent = projectedNodes[node.parent];
          const depthGate =
            node.depth === 1
              ? Math.min(1, mix * 1.35)
              : Math.max(0, (mix - 0.3) / 0.7);
          if (depthGate <= 0.02) continue;

          const frontFactor = node.z > -sphereRadius * 0.25 ? 1 : 0.3;
          const lineAlpha = 0.34 * depthGate * mix * frontFactor;

          ctx.strokeStyle =
            node.depth === 1
              ? `rgba(216, 184, 121, ${lineAlpha})`
              : `rgba(226, 232, 240, ${lineAlpha * 0.85})`;
          ctx.lineWidth = Math.max(0.6, (w / 420) * (node.depth === 1 ? 1.15 : 0.8));

          ctx.beginPath();
          ctx.moveTo(parent.x, parent.y);
          ctx.lineTo(
            parent.x + (node.x - parent.x) * depthGate,
            parent.y + (node.y - parent.y) * depthGate
          );
          ctx.stroke();

          if (depthGate > 0.45 && node.z > -sphereRadius * 0.2) {
            ctx.fillStyle =
              node.depth === 2
                ? `rgba(248, 224, 166, ${0.72 * depthGate * mix})`
                : `rgba(244, 246, 250, ${0.55 * depthGate * mix})`;
            ctx.beginPath();
            ctx.arc(
              node.x,
              node.y,
              Math.max(1.1, (w / 420) * 1.45),
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
        ctx.restore();
      }

      // 3. Back & front orbiting silver-white and champagne-gold particles
      const backParticles: Array<{
        x: number;
        y: number;
        r: number;
        a: number;
        gold: boolean;
      }> = [];
      const frontParticles: Array<{
        x: number;
        y: number;
        r: number;
        a: number;
        gold: boolean;
      }> = [];

      const tilt = 0.32;
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      for (let i = 0; i < PARTICLES.length; i += 1) {
        const p = PARTICLES[i];
        const theta = p.theta + t * p.speed;
        const phi = p.phi + Math.sin(t * 0.4 + i * 0.1) * p.drift;
        const rad = sphereRadius * p.radius;

        const sinPhi = Math.sin(phi);
        const rawX = rad * sinPhi * Math.cos(theta);
        const rawY = rad * Math.cos(phi);
        const rawZ = rad * sinPhi * Math.sin(theta);

        const y = rawY * cosTilt - rawZ * sinTilt;
        const z = rawY * sinTilt + rawZ * cosTilt;
        const scale = focal / (focal - z);

        const sx = cx + rawX * scale;
        const sy = cy + y * scale;
        const pSize = Math.max(0.5, p.size * scale * (w / 470));
        const depthFade = Math.max(
          0.16,
          Math.min(1, (z + sphereRadius * 1.4) / (sphereRadius * 2.2))
        );
        const pAlpha = p.alpha * depthFade * particleIntensity;

        const bucket = z < 0 ? backParticles : frontParticles;
        bucket.push({ x: sx, y: sy, r: pSize, a: pAlpha, gold: p.gold });
      }

      for (let i = 0; i < backParticles.length; i += 1) {
        const pt = backParticles[i];
        ctx.fillStyle = pt.gold
          ? `rgba(222, 188, 122, ${pt.a * (0.28 + 0.5 * mix)})`
          : `rgba(225, 230, 238, ${pt.a * 0.65})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Dormant deep-void core sphere & circular energy ring
      const coreGrad = ctx.createRadialGradient(
        cx - sphereRadius * 0.2,
        cy - sphereRadius * 0.22,
        sphereRadius * 0.08,
        cx,
        cy,
        sphereRadius
      );
      coreGrad.addColorStop(0, `rgba(18, 20, 25, ${0.96})`);
      coreGrad.addColorStop(0.62, 'rgba(5, 6, 8, 0.99)');
      coreGrad.addColorStop(0.92, 'rgba(11, 11, 13, 0.99)');
      coreGrad.addColorStop(
        1,
        `rgba(216, 184, 121, ${0.08 + 0.38 * mix})`
      );

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Circular energy ring (dimly visible in idle, bright & golden-silver when hovered)
      const ringRadius = sphereRadius * 1.015;
      ctx.save();
      ctx.shadowColor = `rgba(216, 184, 121, ${0.55 * mix})`;
      ctx.shadowBlur = Math.max(4, (w / 32) * (0.25 + 0.75 * mix));

      ctx.strokeStyle = `rgba(232, 236, 244, ${0.14 + 0.32 * ringIntensity})`;
      ctx.lineWidth = Math.max(0.9, (w / 440) * (0.9 + 0.7 * mix));
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Golden crescent energy highlight along the ring
      ctx.strokeStyle = `rgba(224, 190, 124, ${0.12 + 0.68 * mix})`;
      ctx.lineWidth = Math.max(1, (w / 380) * (0.8 + 0.9 * mix));
      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        ringRadius * 1.01,
        Math.PI * 0.08 + t * 0.12,
        Math.PI * 0.78 + t * 0.12
      );
      ctx.stroke();

      ctx.strokeStyle = `rgba(246, 247, 250, ${0.08 + 0.45 * mix})`;
      ctx.lineWidth = Math.max(0.8, w / 440);
      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        ringRadius * 0.99,
        Math.PI * 1.12 - t * 0.08,
        Math.PI * 1.68 - t * 0.08
      );
      ctx.stroke();
      ctx.restore();

      // 5. Front-hemisphere particles
      for (let i = 0; i < frontParticles.length; i += 1) {
        const pt = frontParticles[i];
        ctx.fillStyle = pt.gold
          ? `rgba(244, 212, 146, ${pt.a * (0.28 + 0.85 * mix)})`
          : `rgba(242, 245, 250, ${pt.a})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const stillSettling = Math.abs(targetMix - mix) > 0.008;
      if ((isActive || stillSettling) && !reducedMotion) {
        rafId = window.requestAnimationFrame(drawFrame);
      } else {
        rafId = null;
      }
    };

    drawFrame(performance.now());
    if ((active || Math.abs((active ? 1 : 0) - energyMixRef.current) > 0.008) && !reducedMotion) {
      rafId = window.requestAnimationFrame(drawFrame);
    }

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [active, reducedMotion, videoSrc]);

  const parallaxStyle =
    !reducedMotion && active
      ? {
          transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0) scale(1.03)`,
        }
      : {
          transform: 'translate3d(0px, 0px, 0) scale(1)',
        };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#030305]"
    >
      {/* Subtle deep-void volumetric nebula lighting */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active ? 'opacity-100' : 'opacity-20'
        }`}
        style={{
          background:
            'radial-gradient(58% 52% at 50% 41%, rgba(216, 184, 121, 0.18) 0%, rgba(168, 178, 196, 0.06) 44%, rgba(5, 6, 8, 0.96) 78%, #030305 100%)',
        }}
      />

      {/* Parallax media stage: real looping video if supplied, otherwise lightweight 3D sphere + particle canvas */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={parallaxStyle}
      >
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            controls={false}
            disablePictureInPicture
            preload="metadata"
            className={`h-full w-full object-cover transition-opacity duration-700 ${
              active ? 'opacity-100' : 'opacity-25'
            }`}
          />
        ) : (
          <canvas
            ref={canvasRef}
            className="h-full w-full block"
          />
        )}
      </div>

      {/* Measured dark legibility scrim preserving dormant mood and crisp bottom typography */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,4,6,0.38) 0%, rgba(4,4,6,0.04) 38%, rgba(4,4,6,0.74) 76%, rgba(3,3,5,0.96) 100%)',
        }}
      />
    </div>
  );
}
