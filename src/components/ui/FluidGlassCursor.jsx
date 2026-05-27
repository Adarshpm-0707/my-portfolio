import { useRef, useState, useEffect, useMemo, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';
import * as THREE from 'three';

/* ══════════════════════════════════════════════════
   PORTAL CONTENT — elements rendered in FBO scene
   These are refracted and distorted by the lens in real-time.
   ══════════════════════════════════════════════════ */
const CursorPortalContent = memo(function CursorPortalContent() {
  const [particles] = useState(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 10,
        z: Math.random() * 2 - 1,
        size: Math.random() * 0.05 + 0.02,
        color: Math.random() > 0.5 ? '#2dd4bf' : '#f4b860',
      });
    }
    return temp;
  });

  return (
    <group>

      {/* Drifting Neon Stars */}
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
});

/* ══════════════════════════════════════════════════
   GLASS LENS — 3D refraction lens following mouse
   Uses FBO to capture and refract the portal scene.
   ══════════════════════════════════════════════════ */
const GlassLens = memo(function GlassLens({ mouseRef }) {
  const lensRef = useRef();
  const dotRef = useRef();
  const buffer = useFBO(1024, 1024);
  const scene = useMemo(() => {
    const s = new THREE.Scene();
    s.background = null;
    return s;
  }, []);
  const { viewport, camera } = useThree();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleHoverStart = () => {
      setHovered(true);
    };

    const handleHoverEnd = () => {
      setHovered(false);
    };

    const attachListeners = () => {
      const selectors = 'a, button, input, textarea, [role="button"], .interactive-card, .skills-pill, .skill-badge, .nav-link, .project-card, .footer-icon';
      document.querySelectorAll(selectors).forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useFrame((state, delta) => {
    if (!lensRef.current || !dotRef.current) return;

    // Position the glass lens at z = 12
    const zDepth = 12;
    const v = viewport.getCurrentViewport(camera, [0, 0, zDepth]);

    // Calculate target world coordinates
    const destX = (mouseRef.current.x * v.width) / 2;
    const destY = (mouseRef.current.y * v.height) / 2;

    // 1. Center pointer dot is instantaneous for zero input/pointing lag
    dotRef.current.position.set(destX, destY, zDepth);

    // 2. Glass lens has smooth fluid lag
    easing.damp3(lensRef.current.position, [destX, destY, zDepth], 0.12, delta);

    // Subtle 3D tilt based on mouse position
    const tiltX = -mouseRef.current.y * 0.15;
    const tiltY = mouseRef.current.x * 0.15;
    
    // Scale up slightly when hovering over links/buttons
    const targetScale = hovered ? 0.32 : 0.24;
    easing.damp3(lensRef.current.scale, [targetScale, targetScale, targetScale], 0.15, delta);
    easing.damp3(dotRef.current.scale, [targetScale, targetScale, targetScale], 0.15, delta);

    // Update rotation and tilt for the lens
    easing.damp3(
      lensRef.current.rotation,
      [Math.PI / 2 + tiltX, tiltY, state.clock.getElapsedTime() * 0.25],
      0.12,
      delta
    );

    // Render portal scene to the FBO buffer with explicit clear color/alpha to transparent
    const prevClearColor = new THREE.Color();
    state.gl.getClearColor(prevClearColor);
    const prevClearAlpha = state.gl.getClearAlpha();

    state.gl.setClearColor(0x000000, 0);
    state.gl.setRenderTarget(buffer);
    state.gl.clear();
    state.gl.render(scene, camera);
    state.gl.setRenderTarget(null);

    state.gl.setClearColor(prevClearColor, prevClearAlpha);
  });

  return (
    <>
      {/* Portal scene children */}
      {createPortal(<CursorPortalContent />, scene)}

      {/* Background plane mapping the FBO texture */}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={0.9} />
      </mesh>

      {/* The 3D Glass Lens refracting the FBO texture */}
      <mesh ref={lensRef} position={[0, 0, 12]} rotation-x={Math.PI / 2} scale={0.24}>
        <cylinderGeometry args={[1, 1, 0.25, 64]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          transmission={1.0}
          roughness={0.0}                // Crystal clear glass, no blur
          thickness={2.0}                // Refraction thickness
          ior={1.15}                     // Index of refraction
          chromaticAberration={0.05}     // Color splitting
          anisotropy={0.01}
          distortion={0.0}
          distortionScale={0.0}
          temporalDistortion={0.0}
          color="#ffffff"
          clearcoat={1.0}
          clearcoatRoughness={0.0}
          transparent
        />

        {/* Outer Ring nested inside (automatically inherits position/rotation/tilt) */}
        <mesh>
          <torusGeometry args={[1.0, 0.02, 16, 64]} />
          <meshBasicMaterial color={hovered ? "#f4b860" : "#2dd4bf"} transparent opacity={0.65} />
        </mesh>

        {/* Inner Glow Halo nested inside */}
        <mesh>
          <torusGeometry args={[1.02, 0.04, 8, 64]} />
          <meshBasicMaterial color={hovered ? "#f4b860" : "#2dd4bf"} transparent opacity={0.3} />
        </mesh>
      </mesh>

      {/* Center Pointer Dot (instantaneous follow) */}
      <mesh ref={dotRef} position={[0, 0, 12]} scale={0.24}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#fb7185" : "#2dd4bf"} />
      </mesh>
    </>
  );
});

/* ══════════════════════════════════════════════════
   FLUID GLASS CURSOR — Canvas overlay
   ══════════════════════════════════════════════════ */
const FluidGlassCursor = () => {
  const [visible, setVisible] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Convert screen coordinates to NDC (-1 to 1)
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Make cursor visible on the first mouse move (automatically disables on touch-only mobile devices)
      if (!visible) {
        setVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        {/* Lights required for PBR/MeshTransmissionMaterial reflections */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 15, 10]} intensity={3.0} />
        {/* Blue and Purple rim lights for cyber aesthetic highlights */}
        <directionalLight position={[-10, -15, -10]} intensity={1.5} color="#2dd4bf" />
        <pointLight position={[0, 0, 15]} intensity={2.0} color="#f4b860" />
        
        <GlassLens mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
};

export default FluidGlassCursor;
