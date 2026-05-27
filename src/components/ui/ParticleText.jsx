import { useEffect, useRef } from 'react';

const hexToRgb = (hex) => {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean.length === 3
    ? clean.split('').map((char) => char + char).join('')
    : clean, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

const ParticleText = ({
  text,
  color = '#2dd4bf',
  accentColor = '#fb7185',
  height = 150,
  fontSize = 110,
  fontFamily = 'Orbitron, sans-serif',
  fontWeight = 900,
  gap = 4,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const host = canvas.parentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let dpr = 1;

    const createParticles = () => {
      width = Math.max(220, host?.clientWidth || canvas.clientWidth || 320);
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const offscreen = document.createElement('canvas');
      const offscreenCtx = offscreen.getContext('2d', { willReadFrequently: true });
      offscreen.width = width;
      offscreen.height = height;
      offscreenCtx.clearRect(0, 0, width, height);
      let effectiveFontSize = fontSize;
      offscreenCtx.font = `${fontWeight} ${effectiveFontSize}px ${fontFamily}`;
      const maxTextWidth = width * 0.94;
      const measuredWidth = offscreenCtx.measureText(text).width;
      if (measuredWidth > maxTextWidth) {
        effectiveFontSize = Math.max(18, effectiveFontSize * (maxTextWidth / measuredWidth));
        offscreenCtx.font = `${fontWeight} ${effectiveFontSize}px ${fontFamily}`;
      }
      offscreenCtx.textAlign = 'center';
      offscreenCtx.textBaseline = 'middle';
      offscreenCtx.fillStyle = '#ffffff';
      offscreenCtx.fillText(text, width / 2, height / 2 + effectiveFontSize * 0.04);

      const imageData = offscreenCtx.getImageData(0, 0, width, height).data;
      const nextParticles = [];
      const primary = hexToRgb(color);
      const accent = hexToRgb(accentColor);

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha > 40) {
            const mix = width > 0 ? x / width : 0;
            nextParticles.push({
              x,
              y,
              baseX: x,
              baseY: y,
              vx: 0,
              vy: 0,
              alpha: alpha / 255,
              color: `rgba(${Math.round(primary.r + (accent.r - primary.r) * mix)}, ${Math.round(primary.g + (accent.g - primary.g) * mix)}, ${Math.round(primary.b + (accent.b - primary.b) * mix)}, ${alpha / 255})`,
            });
          }
        }
      }

      particlesRef.current = nextParticles;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      const radius = Math.min(120, width * 0.28);

      for (const particle of particlesRef.current) {
        if (!reducedMotion && mouse.active > 0) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;

          if (distance < radius) {
            const force = (radius - distance) / radius;
            particle.vx += (dx / distance) * force * 3.2;
            particle.vy += (dy / distance) * force * 3.2;
          }
        }

        particle.vx += (particle.baseX - particle.x) * 0.045;
        particle.vy += (particle.baseY - particle.y) * 0.045;
        particle.vx *= 0.82;
        particle.vy *= 0.82;
        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Math.max(1.2, gap * 0.32), 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse.active > 0) mouse.active -= 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    const updateMouse = (event) => {
      const rect = canvas.getBoundingClientRect();
      const point = event.touches?.[0] || event;
      mouseRef.current = {
        x: point.clientX - rect.left,
        y: point.clientY - rect.top,
        active: 120,
      };
    };

    const leaveMouse = () => {
      mouseRef.current.active = 0;
    };

    const resizeObserver = new ResizeObserver(createParticles);
    if (host) resizeObserver.observe(host);
    createParticles();
    draw();

    canvas.addEventListener('mousemove', updateMouse);
    canvas.addEventListener('touchmove', updateMouse, { passive: true });
    canvas.addEventListener('mouseleave', leaveMouse);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener('mousemove', updateMouse);
      canvas.removeEventListener('touchmove', updateMouse);
      canvas.removeEventListener('mouseleave', leaveMouse);
    };
  }, [accentColor, color, fontFamily, fontSize, fontWeight, gap, height, text]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default ParticleText;
