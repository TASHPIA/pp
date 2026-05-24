import { useEffect, useRef, useState } from 'react';

interface DNANode {
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
  color1: string;
  color2: string;
  baseLabel1: string;
  baseLabel2: string;
}

interface MoleculeParticle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
}

export default function Research3D() {
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

    // Bioinformatics colors: Neon Blue, Soft Purple, Indigo, Pink
    const colors = ['#60A5FA', '#C084FC', '#818CF8', '#F472B6'];
    const nitrogenBases = ['A', 'U', 'C', 'G']; // RNA bases! (Adenine, Uracil, Cytosine, Guanine)

    // Build static structural DNA/RNA Helix nodes
    const nodeCount = 15;
    const helixRadius = 45;
    const verticalSpacing = 12;

    const dnaNodes: DNANode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      // Helix spiral offset: distribute evenly in height and phase angle
      const angleOffset = (i * Math.PI) / 4.5;
      
      dnaNodes.push({
        x1: 0, // dynamic
        y1: (i - nodeCount / 2) * verticalSpacing,
        z1: 0, // dynamic
        x2: 0, // dynamic
        y2: (i - nodeCount / 2) * verticalSpacing,
        z2: 0, // dynamic
        color1: colors[i % colors.length],
        color2: colors[(i + 2) % colors.length],
        baseLabel1: nitrogenBases[i % 4],
        baseLabel2: nitrogenBases[(i + 2) % 4],
      });
    }

    // Build orbiting molecular cloud dust particles
    const molecularCloud: MoleculeParticle[] = [];
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const radius = 60 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.003 + Math.random() * 0.008;
      
      molecularCloud.push({
        x: 0,
        y: (Math.random() - 0.5) * 160,
        z: 0,
        baseX: 0,
        baseY: (Math.random() - 0.5) * 160,
        baseZ: 0,
        size: 1.5 + Math.random() * 2,
        color: colors[i % colors.length],
        speed: speed,
        angle: angle,
      });
    }

    let globalRotationAngle = 0;
    const cameraZ = 300;

    const tick = () => {
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw modern scientific coordinate grids
      ctx.strokeStyle = document.documentElement.classList.contains('dark')
        ? 'rgba(96, 165, 250, 0.03)'
        : 'rgba(99, 102, 241, 0.06)';
      ctx.lineWidth = 1;

      // Vertical background spine line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 120);
      ctx.lineTo(centerX, centerY + 120);
      ctx.stroke();

      // Horizon measurement ticks
      for (let y = -100; y <= 100; y += 50) {
        ctx.beginPath();
        ctx.moveTo(centerX - 40, centerY + y);
        ctx.lineTo(centerX + 40, centerY + y);
        ctx.stroke();
      }

      // 1. PROJECT AND UPDATE MOLECULAR CLOUD PARTICLES
      const projectedCloud = molecularCloud.map((p) => {
        p.angle += p.speed;
        
        // Spin equations
        const xRot = p.angle + mouse.x * 0.8;
        const x1 = Math.cos(xRot) * (60 + Math.sin(p.angle * 2) * 10);
        const z1 = Math.sin(xRot) * (60 + Math.sin(p.angle * 2) * 10);
        
        // Tilt via pitch axis
        const yRot = mouse.y * 0.5;
        const y2 = p.baseY * Math.cos(yRot) - z1 * Math.sin(yRot);
        const z2 = p.baseY * Math.sin(yRot) + z1 * Math.cos(yRot);

        const sf = cameraZ / (cameraZ + z2);

        return {
          px: centerX + x1 * sf,
          py: centerY + y2 * sf,
          scale: sf,
          depth: z2,
          size: p.size * sf,
          color: p.color
        };
      });

      // 2. PROJECT AND UPDATE HELIX NODES
      const projectedHelix = dnaNodes.map((node, i) => {
        const helicalAngle = globalRotationAngle + (i * Math.PI) / 4.5;
        
        // Phase angle for first strand
        const x1_raw = helixRadius * Math.cos(helicalAngle);
        const z1_raw = helixRadius * Math.sin(helicalAngle);
        
        // Opposite phase angle for second strand (+ PI)
        const x2_raw = helixRadius * Math.cos(helicalAngle + Math.PI);
        const z2_raw = helixRadius * Math.sin(helicalAngle + Math.PI);

        // Rotation matrix under mouse displacement pitch/yaw controls
        const rotY = mouse.x * 0.9;
        const rotX = mouse.y * 0.6;

        // Apply matrix rotation on Strand 1
        const rx1 = x1_raw * Math.cos(rotY) - z1_raw * Math.sin(rotY);
        const rz1 = x1_raw * Math.sin(rotY) + z1_raw * Math.cos(rotY);
        const ry1 = node.y1 * Math.cos(rotX) - rz1 * Math.sin(rotX);
        const finalZ1 = node.y1 * Math.sin(rotX) + rz1 * Math.cos(rotX);

        // Apply matrix rotation on Strand 2
        const rx2 = x2_raw * Math.cos(rotY) - z2_raw * Math.sin(rotY);
        const rz2 = x2_raw * Math.sin(rotY) + z2_raw * Math.cos(rotY);
        const ry2 = node.y2 * Math.cos(rotX) - rz2 * Math.sin(rotX);
        const finalZ2 = node.y2 * Math.sin(rotX) + rz2 * Math.cos(rotX);

        const sf1 = cameraZ / (cameraZ + finalZ1);
        const sf2 = cameraZ / (cameraZ + finalZ2);

        return {
          p1x: centerX + rx1 * sf1,
          p1y: centerY + ry1 * sf1,
          scale1: sf1,
          depth1: finalZ1,
          p2x: centerX + rx2 * sf2,
          p2y: centerY + ry2 * sf2,
          scale2: sf2,
          depth2: finalZ2,
          color1: node.color1,
          color2: node.color2,
          baseLabel1: node.baseLabel1,
          baseLabel2: node.baseLabel2,
        };
      });

      // 3. COMBINE ALL DRAWABLE ELEMENTS & SORT BACK-TO-FRONT FOR SCIENTIFIC DEPTH ORTHOGONALITY
      interface DrawableItem {
        type: 'cloud' | 'helix-rung' | 'helix-node1' | 'helix-node2';
        depth: number;
        index: number;
        ref?: any;
      }

      const drawOrder: DrawableItem[] = [];

      projectedCloud.forEach((item, index) => {
        drawOrder.push({ type: 'cloud', depth: item.depth, index, ref: item });
      });

      projectedHelix.forEach((item, index) => {
        // Average depth for the link line rung
        const avgSpacingDepth = (item.depth1 + item.depth2) / 2;
        drawOrder.push({ type: 'helix-rung', depth: avgSpacingDepth, index, ref: item });
        drawOrder.push({ type: 'helix-node1', depth: item.depth1, index, ref: item });
        drawOrder.push({ type: 'helix-node2', depth: item.depth2, index, ref: item });
      });

      // Sort items by depth (descending, meaning items with higher depth (further away) are drawn first)
      drawOrder.sort((a, b) => b.depth - a.depth);

      // 4. DRAW ELEMENTS IN ORTHOGONAL RENDER STACK
      drawOrder.forEach((element) => {
        if (element.type === 'cloud') {
          const cloud = element.ref;
          ctx.beginPath();
          ctx.arc(cloud.px, cloud.py, cloud.size, 0, Math.PI * 2);
          ctx.fillStyle = cloud.color;
          const farAlpha = Math.max(0.15, Math.min(0.9, 0.7 - cloud.depth / 150));
          ctx.shadowBlur = isHovered ? 6 : 2;
          ctx.shadowColor = cloud.color;
          ctx.globalAlpha = farAlpha;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1.0;
        } 
        
        else if (element.type === 'helix-rung') {
          const run = element.ref;
          // Node connection bridge vector
          ctx.beginPath();
          ctx.moveTo(run.p1x, run.p1y);
          ctx.lineTo(run.p2x, run.p2y);
          
          const maxAlpha = Math.max(0.1, Math.min(0.7, 0.45 - (run.depth1 + run.depth2) / 360));
          
          // Gradient bridge
          const rungGrad = ctx.createLinearGradient(run.p1x, run.p1y, run.p2x, run.p2y);
          rungGrad.addColorStop(0, run.color1);
          rungGrad.addColorStop(1, run.color2);
          
          ctx.strokeStyle = rungGrad;
          ctx.globalAlpha = maxAlpha;
          ctx.lineWidth = isHovered ? 1.5 : 1.0;
          ctx.stroke();
          ctx.globalAlpha = 1.0;

          // Draw complementary horizontal nucleotide base pairing tick dots
          const midX = (run.p1x + run.p2x) / 2;
          const midY = (run.p1y + run.p2y) / 2;

          ctx.beginPath();
          ctx.arc(midX, midY, 1.5 * ((run.scale1 + run.scale2) / 2), 0, Math.PI * 2);
          ctx.fillStyle = document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.8)';
          ctx.fill();
        } 
        
        else if (element.type === 'helix-node1') {
          const node = element.ref;
          const nodeSize = (4 + Math.sin(Date.now() * 0.003 + element.index) * 0.5) * node.scale1;
          
          ctx.beginPath();
          ctx.arc(node.p1x, node.p1y, nodeSize, 0, Math.PI * 2);
          ctx.fillStyle = node.color1;
          ctx.shadowBlur = isHovered ? 10 : 3;
          ctx.shadowColor = node.color1;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Core shiny reflection dot
          ctx.beginPath();
          ctx.arc(node.p1x, node.p1y, nodeSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // Small text tag for bio-sequence chemical base annotation
          if (isHovered && node.scale1 > 0.9) {
            ctx.font = '7px monospace';
            ctx.fillStyle = document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.8)' : 'rgba(15,23,42,0.8)';
            ctx.textAlign = 'center';
            ctx.fillText(node.baseLabel1, node.p1x + 10, node.p1y - 3);
          }
        } 
        
        else if (element.type === 'helix-node2') {
          const node = element.ref;
          const nodeSize = (4 + Math.sin(Date.now() * 0.003 + element.index + 5) * 0.5) * node.scale2;
          
          ctx.beginPath();
          ctx.arc(node.p2x, node.p2y, nodeSize, 0, Math.PI * 2);
          ctx.fillStyle = node.color2;
          ctx.shadowBlur = isHovered ? 10 : 3;
          ctx.shadowColor = node.color2;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Core shiny reflection dot
          ctx.beginPath();
          ctx.arc(node.p2x, node.p2y, nodeSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // Small text tag for complementary bio-sequence base
          if (isHovered && node.scale2 > 0.9) {
            ctx.font = '7px monospace';
            ctx.fillStyle = document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.8)' : 'rgba(15,23,42,0.8)';
            ctx.textAlign = 'center';
            ctx.fillText(node.baseLabel2, node.p2x - 10, node.p2y - 3);
          }
        }
      });

      // Regular auto rotation of helix
      globalRotationAngle += isHovered ? 0.012 : 0.007;

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
      className="relative w-full h-full min-h-[190px] flex items-center justify-center cursor-pointer group"
      id="research-3d-molecule-container"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full max-w-[240px] max-h-[240px] z-10 transition-transform duration-500 hover:scale-105"
        id="research-3d-canvas"
      />
      {/* Soft chemical aura backdrop gradient */}
      <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-xl pointer-events-none group-hover:scale-110 transition-all duration-700" />
    </div>
  );
}
