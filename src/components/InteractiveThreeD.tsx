import { useEffect, useRef, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color?: string;
  size?: number;
}

interface Edge {
  u: number;
  v: number;
}

export default function InteractiveThreeD() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Position offset variables tracked via mouse movement
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize coordinate offsets from -1 to 1
      const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      mouseRef.current.targetX = normalizedX * 0.8;
      mouseRef.current.targetY = normalizedY * 0.8;
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

    let animationFrameId: number;
    let width = canvas.width = 320;
    let height = canvas.height = 320;

    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Define Golden Ratio for pristine 3D Icosahedron symmetry coordinates
    const phi = (1 + Math.sqrt(5)) / 2;
    const scale = 75; // Scale size of the core polyhedron

    // 12 Vertices of an Icosahedron
    const vertices: Point3D[] = [
      { x: -1, y: phi, z: 0, baseX: -1, baseY: phi, baseZ: 0 },
      { x: 1, y: phi, z: 0, baseX: 1, baseY: phi, baseZ: 0 },
      { x: -1, y: -phi, z: 0, baseX: -1, baseY: -phi, baseZ: 0 },
      { x: 1, y: -phi, z: 0, baseX: 1, baseY: -phi, baseZ: 0 },

      { x: 0, y: -1, z: phi, baseX: 0, baseY: -1, baseZ: phi },
      { x: 0, y: 1, z: phi, baseX: 0, baseY: 1, baseZ: phi },
      { x: 0, y: -1, z: -phi, baseX: 0, baseY: -1, baseZ: -phi },
      { x: 0, y: 1, z: -phi, baseX: 0, baseY: 1, baseZ: -phi },

      { x: phi, y: 0, z: -1, baseX: phi, baseY: 0, baseZ: -1 },
      { x: phi, y: 0, z: 1, baseX: phi, baseY: 0, baseZ: 1 },
      { x: -phi, y: 0, z: -1, baseX: -phi, baseY: 0, baseZ: -1 },
      { x: -phi, y: 0, z: 1, baseX: -phi, baseY: 0, baseZ: 1 },
    ].map(v => ({
      x: v.x * scale,
      y: v.y * scale,
      z: v.z * scale,
      baseX: v.x * scale,
      baseY: v.y * scale,
      baseZ: v.z * scale,
    }));

    // 30 Edges connecting standard Icosahedron points
    const edges: Edge[] = [
      { u: 0, v: 1 }, { u: 0, v: 5 }, { u: 0, v: 7 }, { u: 0, v: 10 }, { u: 0, v: 11 },
      { u: 1, v: 5 }, { u: 1, v: 7 }, { u: 1, v: 8 }, { u: 1, v: 9 },
      { u: 2, v: 3 }, { u: 2, v: 4 }, { u: 2, v: 6 }, { u: 2, v: 10 }, { u: 2, v: 11 },
      { u: 3, v: 4 }, { u: 3, v: 6 }, { u: 3, v: 8 }, { u: 3, v: 9 },
      { u: 4, v: 5 }, { u: 4, v: 9 }, { u: 4, v: 11 },
      { u: 5, v: 9 }, { u: 5, v: 11 },
      { u: 6, v: 7 }, { u: 6, v: 8 }, { u: 6, v: 10 },
      { u: 7, v: 8 }, { u: 7, v: 10 },
      { u: 8, v: 9 }, { u: 10, v: 11 }
    ];

    // Constellation cloud particles in 3D outer space
    const particlesCount = 35;
    const particles: Point3D[] = [];
    const particleColors = ['#A78BFA', '#F472B6', '#60A5FA', '#FBBF24'];

    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 110 + Math.random() * 80;
      const yVal = (Math.random() - 0.5) * 180;
      const xVal = r * Math.sin(theta);
      const zVal = r * Math.cos(theta);

      particles.push({
        x: xVal,
        y: yVal,
        z: zVal,
        baseX: xVal,
        baseY: yVal,
        baseZ: zVal,
        color: particleColors[i % particleColors.length],
        size: 1.5 + Math.random() * 2.5
      });
    }

    let angleX = 0.006;
    let angleY = 0.008;
    let angleZ = 0.004;

    // Projection calculation parameters
    const cameraZ = 300;

    // Render loop
    const tick = () => {
      // Ease mouse values to prevent jagged jumping
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Update basic spin parameters with mouse reaction offsets
      const currentAngleX = angleX + mouse.y * 0.02;
      const currentAngleY = angleY + mouse.x * 0.02;
      const currentAngleZ = angleZ;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Render 3D Background Grid/Radar effect
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.07)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Render outer floating particles
      particles.forEach((p) => {
        // Continuous organic orbit around base coordinates
        const speed = 0.001;
        const radius = Math.sqrt(p.baseX * p.baseX + p.baseZ * p.baseZ);
        let currTheta = Math.atan2(p.baseZ, p.baseX) + speed;
        p.baseX = radius * Math.cos(currTheta);
        p.baseZ = radius * Math.sin(currTheta);

        // Apply continuous 3D rotation
        let rx1 = p.baseX * Math.cos(currentAngleY) - p.baseZ * Math.sin(currentAngleY);
        let rz1 = p.baseX * Math.sin(currentAngleY) + p.baseZ * Math.cos(currentAngleY);

        let ry2 = p.baseY * Math.cos(currentAngleX) - rz1 * Math.sin(currentAngleX);
        let rz2 = p.baseY * Math.sin(currentAngleX) + rz1 * Math.cos(currentAngleX);

        let rx3 = rx1 * Math.cos(currentAngleZ) - ry2 * Math.sin(currentAngleZ);
        let ry3 = rx1 * Math.sin(currentAngleZ) + ry2 * Math.cos(currentAngleZ);

        // Perspective Divide
        const scaleFactor = cameraZ / (cameraZ + rz2);
        const screenX = centerX + rx3 * scaleFactor;
        const screenY = centerY + ry3 * scaleFactor;

        // Render point
        if (rz2 + cameraZ > 0) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, (p.size || 2) * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = p.color || '#C084FC';
          // Make points closer appear brighter
          const opacity = Math.max(0.1, Math.min(1, scaleFactor * 0.8));
          ctx.globalAlpha = opacity;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // Continuous icosahedron spinner accumulator
      angleX += 0.003;
      angleY += 0.005;
      angleZ += 0.002;

      // Project Icosahedron vertices which will rotate
      const projectedVertices = vertices.map((v) => {
        // Rotate around Y
        let x1 = v.baseX * Math.cos(currentAngleY) - v.baseZ * Math.sin(currentAngleY);
        let z1 = v.baseX * Math.sin(currentAngleY) + v.baseZ * Math.cos(currentAngleY);

        // Rotate around X
        let y2 = v.baseY * Math.cos(currentAngleX) - z1 * Math.sin(currentAngleX);
        let z2 = v.baseY * Math.sin(currentAngleX) + z1 * Math.cos(currentAngleX);

        // Rotate around Z
        let x3 = x1 * Math.cos(currentAngleZ) - y2 * Math.sin(currentAngleZ);
        let y3 = x1 * Math.sin(currentAngleZ) + y2 * Math.cos(currentAngleZ);

        // Projection
        const scaleFactor = cameraZ / (cameraZ + z2);
        return {
          px: centerX + x3 * scaleFactor,
          py: centerY + y3 * scaleFactor,
          depth: z2,
          scale: scaleFactor,
        };
      });

      // Sort and Draw Edges with gorgeous purple/pink mesh visual feel
      edges.forEach((edge) => {
        const u = projectedVertices[edge.u];
        const v = projectedVertices[edge.v];

        // Do not render if behind camera
        if (u.depth + cameraZ <= 0 || v.depth + cameraZ <= 0) return;

        // Visual depth fadeout
        const avgDepth = (u.depth + v.depth) / 2;
        const maxDepth = scale * phi;
        const depthRatio = (avgDepth + maxDepth) / (maxDepth * 2);

        // Gradient line connecting points
        const gradient = ctx.createLinearGradient(u.px, u.py, v.px, v.py);
        
        const isDark = document.documentElement.classList.contains('dark');
        const startColor = isDark 
          ? `rgba(167, 139, 250, ${Math.max(0.08, 0.55 - depthRatio * 0.4)})`  // Purple
          : `rgba(124, 58, 237, ${Math.max(0.12, 0.65 - depthRatio * 0.4)})`;
        const endColor = isDark
          ? `rgba(244, 114, 182, ${Math.max(0.08, 0.55 - depthRatio * 0.4)})`   // Pink
          : `rgba(236, 72, 153, ${Math.max(0.12, 0.65 - depthRatio * 0.4)})`;

        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);

        ctx.beginPath();
        ctx.moveTo(u.px, u.py);
        ctx.lineTo(v.px, v.py);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isHovered ? 1.5 : 1.0;
        ctx.stroke();
      });

      // Draw vertices nodes
      projectedVertices.forEach((v) => {
        if (v.depth + cameraZ <= 0) return;

        // Pulse node size slightly
        const pulse = Math.sin(Date.now() * 0.005) * 0.5 + 1;
        const nodeSize = (4 + pulse) * v.scale;

        // Draw core node
        ctx.beginPath();
        ctx.arc(v.px, v.py, nodeSize, 0, Math.PI * 2);
        
        const isDark = document.documentElement.classList.contains('dark');
        // Node fill color
        ctx.fillStyle = isDark ? '#F472B6' : '#EC4899'; // Lavender / hot pink
        ctx.shadowBlur = isHovered ? 12 : 6;
        ctx.shadowColor = '#EC4899';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Add soft white core glare inside the nodes
        ctx.beginPath();
        ctx.arc(v.px, v.py, nodeSize / 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      // Clean professional aesthetic: no cheesy telemetry overlays or tech-larp logs.
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] flex items-center justify-center cursor-crosshair group preserve-3d"
      id="interactive-3d-node-canvas-wrapper"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full max-w-[340px] max-h-[340px] relative z-10 transition-all duration-300 transform group-hover:scale-105"
        id="futuristic-math-3d-canvas"
      />
      {/* Absolute glow background inside canvas wrapper */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-purple-500/10 dark:bg-pink-500/5 blur-2xl pointer-events-none group-hover:bg-purple-500/15 transition-colors duration-500" />
    </div>
  );
}
