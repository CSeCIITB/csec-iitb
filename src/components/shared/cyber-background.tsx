"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  isNode: boolean;

  constructor(x: number, y: number, isNode: boolean = false) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = isNode ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 0.5;
    this.color = isNode ? "rgba(0, 207, 255, 0.5)" : "rgba(59, 127, 255, 0.3)";
    this.isNode = isNode;
  }

  update(mouse: { x: number; y: number; active: boolean }, width: number, height: number) {
    // Basic floating movement
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Mouse interaction (Magnetic/Distortion)
    if (mouse.active) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;

      if (distance < maxDistance) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        
        // Gentle attraction towards cursor
        const force = (maxDistance - distance) / maxDistance;
        const pull = this.isNode ? 0.05 : 0.02;
        
        this.vx += forceDirectionX * force * pull;
        this.vy += forceDirectionY * force * pull;
      }
    }

    // Friction and return to base
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Gently drift back towards base position if too fast
    if (Math.abs(this.vx) > 2) this.vx *= 0.9;
    if (Math.abs(this.vy) > 2) this.vy *= 0.9;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    
    if (this.isNode) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(0, 207, 255, 0.5)";
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
      speedX: 0,
      speedY: 0,
      lastX: -1000,
      lastY: -1000
    };

    const trails: {x: number, y: number, alpha: number}[] = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Adjust particle count based on screen size (mobile friendly)
      const isMobile = width < 768;
      const particleCount = isMobile ? 40 : 120;
      const nodeCount = isMobile ? 5 : 20;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height, false));
      }
      for (let i = 0; i < nodeCount; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height, true));
      }
    };

    const drawNetwork = () => {
      // Connect nodes to other close particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]!;
        
        // Connect to mouse if close
        if (mouse.active) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `rgba(0, 207, 255, ${opacity})`;
            ctx.lineWidth = p1.isNode ? 1 : 0.5;
            ctx.stroke();
          }
        }

        // Only nodes connect to everything else to save performance
        if (!p1.isNode) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]!;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 100) * 0.2;
            ctx.strokeStyle = `rgba(59, 127, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const drawTrails = () => {
      if (mouse.active) {
        // Calculate speed
        mouse.speedX = mouse.x - mouse.lastX;
        mouse.speedY = mouse.y - mouse.lastY;
        const speed = Math.sqrt(mouse.speedX ** 2 + mouse.speedY ** 2);
        
        if (speed > 10) {
          trails.push({ x: mouse.x, y: mouse.y, alpha: 0.5 });
        }
        
        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
      }

      for (let i = trails.length - 1; i >= 0; i--) {
        const trail = trails[i]!;
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 207, 255, ${trail.alpha})`;
        ctx.fill();
        
        trail.alpha -= 0.02;
        if (trail.alpha <= 0) {
          trails.splice(i, 1);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse radial glow
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
        gradient.addColorStop(0, "rgba(0, 207, 255, 0.03)");
        gradient.addColorStop(0.5, "rgba(59, 127, 255, 0.01)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      for (const particle of particles) {
        particle.update(mouse, width, height);
        particle.draw(ctx);
      }

      drawNetwork();
      drawTrails();

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouse.active) {
        mouse.lastX = e.clientX;
        mouse.lastY = e.clientY;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pathname]); // Re-init occasionally if route changes significantly if needed

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[-1]"
      aria-hidden="true"
    />
  );
}
