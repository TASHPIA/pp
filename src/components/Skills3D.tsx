import { useEffect, useRef, useState } from 'react';

interface OrbitNode {
  name: string;
  angle: number;
  speed: number;
  radius: number;
  orbitTiltX: number; // 3D tilt of the orbit
  orbitTiltY: number;
  color: string;
  size: number;
}

export default function Skills3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse track
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

    // List of skills to rotate in orbit paths
    const skillList = [
      { name: 'JavaScript', color: '#F7DF1E', radius: 45, speed: 0.015, tiltX: 0.4, tiltY: 0.2 },
      { name: 'Java', color: '#ED8B00', radius: 70, speed: 0.012, tiltX: -0.3, tiltY: 0.4 },
      { name: 'C++', color: '#00599C', radius: 95, speed: 0.009, tiltX: 0.5, tiltY: -0.3 },
      { name: 'HTML5', color: '#E34F26', radius: 55, speed: -0.014, tiltX: -0.2, tiltY: -0.4 },
      { name: 'CSS3', color: '#1572B6', radius: 80, speed: -0.010, tiltX: 0.2, tiltY: 0.5 },
      { name: 'C Language', color: '#A8B9CC', radius: 105, speed: 0.007, tiltX: -0.4, tiltY: 0.3 }
    ];

    const orbits: OrbitNode[] = skillList.map((sk) => ({
      name: sk.name,
      angle: Math.random() * Math.PI * 2,
      speed: sk.speed,
      radius: sk.radius,
      orbitTiltX: sk.tiltX,
      orbitTiltY: sk.tiltY,
      color: sk.color,
      size: 4
    }));

    let globalRotation = 0;

    const tick = () => {
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw central software atomic node core
      const pulse = Math.sin(Date.now() * 0.003) * 2;
      const coreSize = (16 + pulse) * (isHovered ? 1.15 : 1.0);

      const isDark = document.documentElement.classList.contains('dark');

      // Draw outer glowing halo for core
      const coreGridGrad = ctx.createRadialGradient(centerX, centerY, 1, centerX, centerY, coreSize * 1.8);
      coreGridGrad.addColorStop(0, isDark ? 'rgba(124, 58, 237, 0.45)' : 'rgba(124, 58, 237, 0.3)');
      coreGridGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = coreGridGrad;
      ctx.fill();

      // Main core
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#7C3AED' : '#6366F1';
      ctx.shadowBlur = isHovered ? 18 : 8;
      ctx.shadowColor = '#C084FC';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner white star glaze
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Rotate and Project Orbit paths in 3D perspective
      globalRotation += 0.003;

      orbits.forEach((node) => {
        // Increment orbital position
        node.angle += node.speed;

        // Base 3D coordinate of the orbiting satellite relative to core
        const rawX = node.radius * Math.cos(node.angle);
        const rawY = 0;
        const rawZ = node.radius * Math.sin(node.angle);

        // Apply orbital 3D tilt transformation
        const tx = node.orbitTiltX;
        const ty = node.orbitTiltY + mouse.x * 0.2;
        const tz = mouse.y * 0.2;

        // Y-rotation
        let x1 = rawX * Math.cos(ty) - rawZ * Math.sin(ty);
        let z1 = rawX * Math.sin(ty) + rawZ * Math.cos(ty);

        // X-rotation
        let y2 = rawY * Math.cos(tx) - z1 * Math.sin(tx);
        let z2 = rawY * Math.sin(tx) + z1 * Math.cos(tx);

        // Z-rotation
        let x3 = x1 * Math.cos(tz) - y2 * Math.sin(tz);
        let y3 = x1 * Math.sin(tz) + y2 * Math.cos(tz);

        const cameraDistance = 320;
        const sf = cameraDistance / (cameraDistance + z2);

        const screenX = centerX + x3 * sf;
        const screenY = centerY + y3 * sf;

        // Render entire ellipse pathway ring
        ctx.strokeStyle = isDark ? 'rgba(139, 92, 246, 0.05)' : 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const ox = node.radius * Math.cos(a);
          const oz = node.radius * Math.sin(a);
          
          let rx1 = ox * Math.cos(ty) - oz * Math.sin(ty);
          let rz1 = ox * Math.sin(ty) + oz * Math.cos(ty);
          let ry2 = 0 * Math.cos(tx) - rz1 * Math.sin(tx);
          let rz2 = 0 * Math.sin(tx) + rz1 * Math.cos(tx);
          let rx3 = rx1 * Math.cos(tz) - ry2 * Math.sin(tz);
          let ry3 = rx1 * Math.sin(tz) + ry2 * Math.cos(tz);

          const osf = cameraDistance / (cameraDistance + rz2);
          const px = centerX + rx3 * osf;
          const py = centerY + ry3 * osf;

          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Render node satellite point closer are larger/brighter
        const satelliteSize = (node.size + pulse * 0.2) * sf * (isHovered ? 1.25 : 1.0);
        ctx.beginPath();
        ctx.arc(screenX, screenY, satelliteSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        
        ctx.shadowBlur = isHovered ? 12 : 5;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Elegant minimal skill indicator labeling tags hovering next to satellites
        if (satelliteSize > 1.8) {
          ctx.font = 'bold 9px font-mono, monospace';
          ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(15, 23, 42, 0.75)';
          ctx.textAlign = 'center';
          ctx.fillText(node.name, screenX, screenY - satelliteSize - 4);
        }
      });

      // Clean professional aesthetic: no cheesy telemetry overlays or tech-larp logs.
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
      className="relative w-full h-full min-h-[240px] flex items-center justify-center cursor-pointer group"
      id="skills-3d-orbit-wrapper"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full max-w-[280px] max-h-[280px] z-10 transition-transform duration-500 group-hover:scale-[1.04]"
        id="skills-3d-canvas"
      />
      {/* Background radial glow */}
      <div className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-purple-500/5 dark:bg-purple-500/1 blur-2xl pointer-events-none group-hover:bg-pink-500/10 transition-colors duration-500" />
    </div>
  );
}
