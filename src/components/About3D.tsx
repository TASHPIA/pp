import { useEffect, useRef, useState } from 'react';

interface MatrixNode {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  alpha: number;
  color: string;
}

export default function About3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse reaction tracking
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const nY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = nX * 0.7;
      mouseRef.current.targetY = nY * 0.7;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = 300;
    let height = canvas.height = 300;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Create a beautiful double helix structure in 3D
    const nodes: MatrixNode[] = [];
    const strandsCount = 2;
    const nodesPerStrand = 16;
    const helixLength = 160;

    const colors = ['#C084FC', '#F472B6'];

    for (let s = 0; s < strandsCount; s++) {
      const angleOffset = s * Math.PI;

      for (let i = 0; i < nodesPerStrand; i++) {
        const progress = i / (nodesPerStrand - 1);
        // Map from linear helix spine
        const yVal = -helixLength / 2 + progress * helixLength;
        const radian = progress * Math.PI * 3 + angleOffset;
        
        // Circular spiral
        const radius = 45;
        const xVal = radius * Math.cos(radian);
        const zVal = radius * Math.sin(radian);

        nodes.push({
          x: xVal,
          y: yVal,
          z: zVal,
          baseX: xVal,
          baseY: yVal,
          baseZ: zVal,
          alpha: 1,
          color: colors[s % colors.length]
        });
      }
    }

    let angleX = 0.005;
    let angleY = 0.007;

    const tick = () => {
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Adjust rotation speed organics plus user hover inputs
      const currentAngleY = angleY + mouse.x * 0.015;
      const currentAngleX = angleX + mouse.y * 0.015;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle futuristic outer measurement ticks
      ctx.strokeStyle = document.documentElement.classList.contains('dark')
        ? 'rgba(236, 72, 153, 0.04)'
        : 'rgba(236, 72, 153, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
      ctx.stroke();

      const cameraZ = 350;

      // Project all nodes
      const projected = nodes.map((node) => {
        // Rotate around Y
        let x1 = node.baseX * Math.cos(currentAngleY) - node.baseZ * Math.sin(currentAngleY);
        let z1 = node.baseX * Math.sin(currentAngleY) + node.baseZ * Math.cos(currentAngleY);

        // Rotate around X
        let y2 = node.baseY * Math.cos(currentAngleX) - z1 * Math.sin(currentAngleX);
        let z2 = node.baseY * Math.sin(currentAngleX) + z1 * Math.cos(currentAngleX);

        const sf = cameraZ / (cameraZ + z2);
        
        return {
          px: centerX + x1 * sf,
          py: centerY + y2 * sf,
          depth: z2,
          scale: sf,
          color: node.color
        };
      });

      // Render strand lines connecting adjacent spiral nodes
      const nodesPerStrandCount = nodesPerStrand;
      for (let s = 0; s < strandsCount; s++) {
        const offset = s * nodesPerStrandCount;
        ctx.beginPath();
        for (let i = 0; i < nodesPerStrandCount - 1; i++) {
          const uIdx = offset + i;
          const vIdx = offset + i + 1;
          const u = projected[uIdx];
          const v = projected[vIdx];

          if (i === 0) {
            ctx.moveTo(u.px, u.py);
          }
          ctx.lineTo(v.px, v.py);
        }
        
        ctx.strokeStyle = s === 0 ? 'rgba(192, 132, 252, 0.15)' : 'rgba(244, 114, 182, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Render structural logic cross-bars connecting both strands (base-pair rungs)
      for (let i = 0; i < nodesPerStrandCount; i++) {
        const u = projected[i]; // Strand 0
        const v = projected[nodesPerStrandCount + i]; // Strand 1

        const avgDepth = (u.depth + v.depth) / 2;
        const depthRatio = (avgDepth + 60) / 120; // normalize
        const opacity = Math.max(0.06, Math.min(0.5, 0.45 - depthRatio * 0.3));

        ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(u.px, u.py);
        ctx.lineTo(v.px, v.py);
        ctx.stroke();
      }

      // Render actual double helix nodes
      projected.forEach((p) => {
        const nodeSize = (isHovered ? 4.5 : 3.5) * p.scale;
        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeSize, 0, Math.PI * 2);
        
        ctx.fillStyle = p.color;
        ctx.shadowBlur = isHovered ? 8 : 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // micro-white glowing center
        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeSize / 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      // Increment rotation accumulation organically
      angleY += 0.006;
      angleX = Math.sin(Date.now() * 0.0003) * 0.15; // Slow micro tilt oscillation

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [isHovered]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[220px] flex items-center justify-center cursor-pointer group"
      id="about-3d-visualizer-container"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full max-w-[280px] max-h-[280px] z-10 transition-transform duration-300 group-hover:scale-[1.03]"
        id="about-helix-3d-canvas"
      />
      {/* Background neon pulse inside canvas */}
      <div className="absolute inset-0 m-auto w-36 h-36 rounded-full bg-pink-500/5 dark:bg-pink-500/1 blur-xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500" />
    </div>
  );
}
