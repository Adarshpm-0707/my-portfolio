import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

/* Trail dot — individual fading particle */
const TrailDot = ({ x, y, age, maxAge }) => {
  const progress = age / maxAge;
  const size = 6 * (1 - progress);
  const opacity = 0.7 * (1 - progress);
  const isBlue = Math.floor(age) % 2 === 0;
  return (
    <div
      style={{
        position: 'fixed',
        left: x - size / 2,
        top:  y - size / 2,
        width:  size,
        height: size,
        borderRadius: '50%',
        background: isBlue ? '#2dd4bf' : '#f4b860',
        boxShadow: `0 0 ${size * 2}px ${isBlue ? '#2dd4bf' : '#f4b860'}`,
        opacity,
        pointerEvents: 'none',
        zIndex: 9997,
        transform: 'translate3d(0,0,0)',
      }}
    />
  );
};

const TRAIL_LENGTH = 18;
const MAX_AGE      = TRAIL_LENGTH;

const CustomCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: coarse)').matches;
    }
    return true;
  });
  const [isHovering, setIsHovering]       = useState(false);
  const [trail, setTrail]                 = useState([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailRef = useRef([]);
  const rafId    = useRef(null);

  const springConfig = { damping: 22, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const touchQuery = window.matchMedia('(pointer: coarse)');
    const listener = (e) => setIsTouchDevice(e.matches);
    touchQuery.addEventListener('change', listener);
    if (touchQuery.matches) return;

    const animateTrail = () => {
      trailRef.current = trailRef.current
        .map(dot => ({ ...dot, age: dot.age + 1 }))
        .filter(dot => dot.age < MAX_AGE);
      setTrail([...trailRef.current]);
      rafId.current = requestAnimationFrame(animateTrail);
    };

    rafId.current = requestAnimationFrame(animateTrail);

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mousePos.current = { x, y };

      cursorX.set(x - 16);
      cursorY.set(y - 16);

      // add new trail point
      trailRef.current.unshift({ x, y, age: 0, id: Date.now() + Math.random() });
      if (trailRef.current.length > TRAIL_LENGTH) trailRef.current.length = TRAIL_LENGTH;
    };

    const handleHover   = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    window.addEventListener('mousemove', onMove);

    const attachListeners = () => {
      document.querySelectorAll('a, button, input, textarea, [role="button"], .interactive-card')
        .forEach(el => {
          el.addEventListener('mouseenter', handleHover);
          el.addEventListener('mouseleave', handleUnhover);
        });
    };
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      touchQuery.removeEventListener('change', listener);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Trail particles */}
      {trail.map((dot, i) => (
        <TrailDot key={dot.id ?? i} x={dot.x} y={dot.y} age={dot.age} maxAge={MAX_AGE} />
      ))}

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          zIndex: 9999,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `2px solid ${isHovering ? '#f4b860' : '#2dd4bf'}`,
          backgroundColor: isHovering ? 'rgba(45, 212, 191,0.1)' : 'transparent',
          boxShadow: isHovering
            ? '0 0 18px rgba(244, 184, 96,0.6), inset 0 0 8px rgba(244, 184, 96,0.3)'
            : '0 0 10px rgba(45, 212, 191,0.4)',
          scale: isHovering ? 1.6 : 1,
          transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 12,
          translateY: 12,
          zIndex: 9999,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isHovering ? '#f4b860' : '#2dd4bf',
          boxShadow: `0 0 8px ${isHovering ? '#f4b860' : '#2dd4bf'}`,
          scale: isHovering ? 0 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
