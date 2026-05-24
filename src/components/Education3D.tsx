import { useEffect, useRef, useState } from 'react';

interface NetworkNode {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  label: string;
  color: string;
}

export default function Education3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate tracker for gravity pull
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const nY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = nX * 0.6;
      mouseRef.current.targetY = nY * 0.6;
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

    // Set of knowledge coordinates in 3D
    const topics = [
      { label: 'OOD (Java)', x: -50, y: -50, z: -50, color: '#C084FC' },
      { label: 'Requirements', x: 50, y: -50, z: -50, color: '#F472B6' },
      { label: 'DBMS', x: 50, y: 50, z: -50, color: '#60A5FA' },
      { label: 'DSA', x: -50, y: 50, z: -50, color: '#34D399' },
      { label: 'QA / Testing', x: -50, y: -50, z: 50, color: '#FBBF24' },
      { label: 'Web SWE', x: 50, y: -50, z: 50, color: '#818CF8' },
      { label: 'Math Foundations', x: 50, y: 50, z: 50, color: '#EC4899' },
      { label: 'Clean Code', x: -50, y: 50, z: 50, color: '#C084FC' }
    ];

    const nodes: NetworkNode[] = topics.map(t => ({
      label: t.label,
      x: t.x,
      y: t.y,
      z: t.z,
      baseX: t.x,
      baseY: t.y,
      baseZ: t.z,
      color: t.color
    }));

    // Define 3D edge connections between vertices for structural cage look
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Front face
      [4, 5], [5, 6], [6, 7], [7, 4], // Back face
      [0, 4], [1, 5], [2, 6], [3, 7]  // Pillars
    ];

    let rotY = 0.004;
    let rotX = 0.003;

    const tick = () => {
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle orbital rings for depth guidance
      ctx.strokeStyle = document.documentElement.classList.contains('dark')
        ? 'rgba(124, 58, 237, 0.04)'
        : 'rgba(124, 58, 237, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Dynamic rotation updates
      const currentRotY = rotY + mouse.x * 0.015;
      const currentRotX = rotX + mouse.y * 0.015;

      const cameraZ = 350;

      // Project all nodes
      const projected = nodes.map((node) => {
        // Rotate continuous around Y
        let x1 = node.baseX * Math.cos(currentRotY) - node.baseZ * Math.sin(currentRotY);
        let z1 = node.baseX * Math.sin(currentRotY) + node.baseZ * Math.cos(currentRotY);

        // Rotate continuous around X
        let y2 = node.baseY * Math.cos(currentRotX) - z1 * Math.sin(currentRotX);
        let z2 = node.baseY * Math.sin(currentRotX) + z1 * Math.cos(currentRotX);

        const sf = cameraZ / (cameraZ + z2);

        return {
          px: centerX + x1 * sf,
          py: centerY + y2 * sf,
          scale: sf,
          depth: z2,
          color: node.color,
          label: node.label
        };
      });

      // Draw Edges (wires in the 3D grid cage)
      edges.forEach(([uIdx, vIdx]) => {
        const u = projected[uIdx];
        const v = projected[vIdx];

        // Shading lines based on average depth
        const avgZ = (u.depth + v.depth) / 2;
        const opacity = Math.max(0.05, Math.min(0.4, 0.3 - (avgZ / 150)));

        ctx.strokeStyle = document.documentElement.classList.contains('dark')
          ? `rgba(168, 85, 247, ${opacity * 1.5})`
          : `rgba(99, 102, 241, ${opacity})`;

        ctx.lineWidth = isHovered ? 1.5 : 1.0;
        ctx.beginPath();
        ctx.moveTo(u.px, u.py);
        ctx.lineTo(v.px, v.py);
        ctx.stroke();
      });

      // Draw glowing concepts text tags & node points
      projected.forEach((p) => {
        const nodeSize = (4 + Math.sin(Date.now() * 0.003) * 0.5) * p.scale;
        
        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = isHovered ? 12 : 5;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw labeling text
        ctx.font = 'bold 8px monospace';
        ctx.fillStyle = document.documentElement.classList.contains('dark')
          ? 'rgba(255, 255, 255, 0.7)'
          : 'rgba(15, 23, 42, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText(p.label, p.px, p.py - nodeSize - 5);
      });

      rotY += 0.004;
      rotX += 0.003;

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
      id="education-cube-mesh-visualizer"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full max-w-[240px] max-h-[240px] z-10 transition-transform duration-500 group-hover:rotate-6"
        id="education-3d-canvas"
      />
      {/* Absolute pulse backdrop */}
      <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-pink-500/5 blur-xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
    </div>
  );
}
