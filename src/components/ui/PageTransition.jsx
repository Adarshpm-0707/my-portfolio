import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

// Dynamic transition colors for each target route
const routeColors = {
  '/': {
    stroke1: 'var(--transition-stroke-1)',
    stroke2: 'var(--accent-blue)',
  },
  '/skills': {
    stroke1: 'var(--transition-stroke-1)',
    stroke2: 'var(--accent-neon)',
  },
  '/experience': {
    stroke1: 'var(--transition-stroke-1)',
    stroke2: 'var(--accent-purple)',
  },
  '/projects': {
    stroke1: 'var(--transition-stroke-1)',
    stroke2: 'var(--accent-pink)',
  },
  '/contact': {
    stroke1: 'var(--transition-stroke-1)',
    stroke2: 'var(--accent-blue)',
  },
};

const defaultColors = {
  stroke1: 'var(--transition-stroke-1)',
  stroke2: 'var(--accent-blue)',
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPath = useRef(location.pathname);
  const svgRef = useRef(null);

  // Initialize path lengths on mount to set strokeDasharray/strokeDashoffset
  useEffect(() => {
    if (!svgRef.current) return;
    const paths = Array.from(svgRef.current.querySelectorAll('path'));
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });
  }, []);

  // Prevent interactions during transitions
  useEffect(() => {
    if (isTransitioning) {
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.pointerEvents = '';
    }
    return () => {
      document.body.style.pointerEvents = '';
    };
  }, [isTransitioning]);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === prevPath.current) {
      // Just update children if path is same (e.g. initial mount or minor query change)
      setDisplayChildren(children);
      return;
    }

    // Path changed! Start SVG drawing transition
    setIsTransitioning(true);

    const paths = Array.from(svgRef.current.querySelectorAll('path'));

    // Dynamically apply colors depending on the target page route
    const colors = routeColors[currentPath] || defaultColors;
    if (paths[0]) paths[0].setAttribute('stroke', colors.stroke1);
    if (paths[1]) paths[1].setAttribute('stroke', colors.stroke2);

    // 1. Leave Timeline: Draw strokes to cover the screen

    const leaveTimeline = gsap.timeline({
      onComplete: () => {
        // Once screen is fully covered:
        // Update the rendered page content
        setDisplayChildren(children);
        
        // Instantly scroll window to top
        window.scrollTo(0, 0);

        // 2. Enter Timeline: Retract strokes to reveal new page
        const enterTimeline = gsap.timeline({
          onComplete: () => {
            setIsTransitioning(false);
            prevPath.current = currentPath;
          }
        });

        paths.forEach((path) => {
          const length = path.getTotalLength();
          // Ensure we start from fully drawn / filled state
          gsap.set(path, { strokeDashoffset: 0, attr: { 'stroke-width': 700 } });

          // Retract path from 0 to -length
          enterTimeline.to(
            path,
            {
              strokeDashoffset: -length,
              attr: { 'stroke-width': 200 },
              duration: 1,
              ease: 'power2.inOut',
              onComplete: () => {
                // Reset to default (hidden) state for next transition
                gsap.set(path, { strokeDashoffset: length });
              }
            },
            0
          );
        });
      }
    });

    // Draw path from length to 0
    paths.forEach((path) => {
      const length = path.getTotalLength();
      // Start from clean hidden state
      gsap.set(path, { strokeDashoffset: length, attr: { 'stroke-width': 200 } });

      leaveTimeline.to(
        path,
        {
          strokeDashoffset: 0,
          attr: { 'stroke-width': 700 },
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      );
    });

  }, [location.pathname, children]);

  return (
    <>
      {/* Page Content Container */}
      <div className={isTransitioning ? 'pointer-events-none select-none' : ''}>
        {displayChildren}
      </div>

      {/* SVG Transition Wipe Overlay */}
      <div className="transition-svg" aria-hidden="true" ref={svgRef}>
        <svg
          viewBox="0 0 2453 2535"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
            stroke="var(--transition-stroke-1)"
            strokeWidth="200"
            strokeLinecap="round"
          />
          <path
            d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
            stroke="var(--transition-stroke-2)"
            strokeWidth="200"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
};

export default PageTransition;
