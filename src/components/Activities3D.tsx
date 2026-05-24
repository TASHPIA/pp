import { useEffect, useRef, useState } from 'react';

interface ConstellationNode {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
}

export default function Activities3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Focus coordinate pull
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const nY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = nX * 0.8;
      mouseRef.current.targetY = nY * 0.8;
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

    // Create connected nodes floating in 3D
    const nodes: ConstellationNode[] = [];
    const nodeCount = 18;
    const colors = ['#C084FC', '#F472B6', '#60A5FA'];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 60 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      // Spherical coordinates mapped to 3D Cartesian space
      const xVal = radius * Math.sin(phi) * Math.cos(theta);
      const yVal = radius * Math.sin(phi) * Math.sin(theta);
      const zVal = radius * Math.cos(phi);

      nodes.push({
        x: xVal,
        y: yVal,
        z: zVal,
        baseX: xVal,
        baseY: yVal,
        baseZ: zVal,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        vz: (Math.random() - 0.5) * 0.05,
        color: colors[i % colors.length]
      });
    }

    let angleY = 0.003;
    let angleX = 0.002;

    const tick = () => {
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw boundary visual indicators
      ctx.strokeStyle = document.documentElement.classList.contains('dark')
        ? 'rgba(244, 114, 182, 0.04)'
        : 'rgba(244, 114, 182, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(centerX - 80, centerY - 80, 160, 160);

      const cameraZ = 340;

      // Project all flowing nodes
      const projected = nodes.map((node) => {
        // Continuous organic orbit drifts
        node.baseX += node.vx;
        node.baseY += node.vy;
        node.baseZ += node.vz;

        // Bounce nodes inside logical bounds
        const d = Math.sqrt(node.baseX*node.baseX + node.baseY*node.baseY + node.baseZ*node.baseZ);
        if (d > 100) {
          node.vx *= -1;
          node.vy *= -1;
          node.vz *= -1;
        }

        // Apply mouse-driven speed offsets
        const curAngleY = angleY + mouse.x * 0.015;
        const curAngleX = angleX + mouse.y * 0.015;

        // Rotate Y Axis
        let x1 = node.baseX * Math.cos(curAngleY) - node.baseZ * Math.sin(curAngleY);
        let z1 = node.baseX * Math.sin(curAngleY) + node.baseZ * Math.cos(curAngleY);

        // Rotate X Axis
        let y2 = node.baseY * Math.cos(curAngleX) - z1 * Math.sin(curAngleX);
        let z2 = node.baseY * Math.sin(curAngleX) + z1 * Math.cos(curAngleX);

        const sf = cameraZ / (cameraZ + z2);

        return {
          px: centerX + x1 * sf,
          py: centerY + y2 * sf,
          scale: sf,
          depth: z2,
          color: node.color
        };
      });

      // Draw connection vectors (neural line bonds)
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const u = projected[i];
          const v = projected[j];

          // Compute Euclidean distance in projected coordinates
          const dx = u.px - v.px;
          const dy = u.py - v.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isHovered ? 65 : 45;

          if (dist < maxDist) {
            const rawDistZ = Math.abs(u.depth - v.depth);
            const opacity = (1 - (dist / maxDist)) * 0.25 * (1 - Math.min(1.0, rawDistZ / 150));
            ctx.strokeStyle = document.documentElement.classList.contains('dark')
              ? `rgba(147, 197, 253, ${opacity * 1.5})`
              : `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(u.px, u.py);
            ctx.lineTo(v.px, v.py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes themselves with high performance blur glows
      projected.forEach((p) => {
        const nodeSize = (3 + Math.sin(Date.now() * 0.005 + p.px) * 0.5) * p.scale;
        
        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = isHovered ? 12 : 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Shiny coordinate node centers
        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      angleY += 0.003;
      angleX = Math.cos(Date.now() * 0.0002) * 0.1;

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
      className="relative w-full h-full min-h-[180px] flex items-center justify-center cursor-pointer group"
      id="activities-3d-connected-wrapper"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full max-w-[240px] max-h-[240px] z-10 transition-all duration-500 group-hover:scale-95"
        id="activities-3d-canvas"
      />
      <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-blue-500/5 blur-xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500" />
    </div>
  );
}
