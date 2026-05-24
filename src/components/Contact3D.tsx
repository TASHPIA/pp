import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  angle: number;
  speed: number;
  radius: number;
}

export default function Contact3D() {
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
    let width = canvas.width = 180;
    let height = canvas.height = 180;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Generate orbiting particles for globe look
    const particles: Particle[] = [];
    const pCount = 35;

    for (let i = 0; i < pCount; i++) {
      const radius = 40 + Math.random() * 32;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.005 + Math.random() * 0.012;
      const inclination = (Math.random() - 0.5) * Math.PI;

      // 3D polar conversion
      const xVal = radius * Math.cos(angle);
      const yVal = radius * Math.sin(angle) * Math.cos(inclination);
      const zVal = radius * Math.sin(angle) * Math.sin(inclination);

      particles.push({
        x: xVal,
        y: yVal,
        z: zVal,
        baseX: xVal,
        baseY: yVal,
        baseZ: zVal,
        size: 1.5 + Math.random() * 1.5,
        angle: angle,
        speed: speed,
        radius: radius
      });
    }

    let rotY = 0.006;
    let rotX = 0.002;

    const tick = () => {
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle orbital boundary lines
      ctx.strokeStyle = document.documentElement.classList.contains('dark')
        ? 'rgba(168, 85, 247, 0.03)'
        : 'rgba(99, 102, 241, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 55, 0, Math.PI * 2);
      ctx.stroke();

      const cameraZ = 280;

      // Update and project orbiting rings
      const projected = particles.map((p) => {
        // Orbit update
        p.angle += p.speed;
        
        // Push slightly in direction of mouse attraction
        const pull = isHovered ? 1.4 : 1.0;
        const curYRot = rotY + mouse.x * 0.02 * pull;
        const curXRot = rotX + mouse.y * 0.02 * pull;

        // Polar rotation around axes
        let x1 = p.radius * Math.cos(p.angle);
        let z1 = p.radius * Math.sin(p.angle);
        let y2 = p.baseY;

        // Apply global pitch and yaw rotation matrices
        let rx1 = x1 * Math.cos(curYRot) - z1 * Math.sin(curYRot);
        let rz1 = x1 * Math.sin(curYRot) + z1 * Math.cos(curYRot);

        let ry2 = y2 * Math.cos(curXRot) - rz1 * Math.sin(curXRot);
        let rz2 = y2 * Math.sin(curXRot) + rz1 * Math.cos(curXRot);

        const sf = cameraZ / (cameraZ + rz2);

        return {
          px: centerX + rx1 * sf,
          py: centerY + ry2 * sf,
          scale: sf,
          depth: rz2,
          size: p.size * sf,
        };
      });

      // Sort projected by depth to render back-to-front layer
      projected.sort((a, b) => b.depth - a.depth);

      // Render links to nearby constellation points
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const u = projected[i];
          const v = projected[j];

          const dx = u.px - v.px;
          const dy = u.py - v.py;
          const d = Math.sqrt(dx * dx + dy * dy);

          const maxLink = isHovered ? 40 : 25;
          if (d < maxLink) {
            const opacity = (1 - (d / maxLink)) * 0.15;
            ctx.strokeStyle = document.documentElement.classList.contains('dark')
              ? `rgba(244, 114, 182, ${opacity * 1.5})`
              : `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(u.px, u.py);
            ctx.lineTo(v.px, v.py);
            ctx.stroke();
          }
        }
      }

      // Render projected particles
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        
        // Shade depending on camera depth (fog)
        const alpha = Math.max(0.2, Math.min(1.0, 0.75 - (p.depth / 100)));
        ctx.fillStyle = document.documentElement.classList.contains('dark')
          ? `rgba(168, 85, 247, ${alpha})`
          : `rgba(99, 102, 241, ${alpha})`;
        
        ctx.shadowBlur = isHovered ? 8 : 2;
        ctx.shadowColor = '#F472B6';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      rotY += 0.005;
      rotX += 0.001;

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
      className="relative w-full h-full min-h-[160px] flex items-center justify-center cursor-pointer group"
      id="contact-3d-sparks-wrapper"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full max-w-[170px] max-h-[170px] z-10 transition-transform duration-500"
        id="contact-3d-canvas"
      />
      <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-purple-500/5 blur-lg pointer-events-none group-hover:scale-125 transition-transform duration-700" />
    </div>
  );
}
