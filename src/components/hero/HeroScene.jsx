import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/* ══════════════════════════════════════════════════
   MOUSE TRACKER
══════════════════════════════════════════════════ */
const useMouseRef = () => {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onTouch = (e) => {
      if (!e.touches[0]) return;
      mouse.current.x = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);
  return mouse;
};

/* ══════════════════════════════════════════════════
   RESPONSIVE CAMERA — adjusts FOV by screen width
══════════════════════════════════════════════════ */
const ResponsiveCamera = () => {
  const { camera, size } = useThree();
  useEffect(() => {
    if (size.width < 640) {
      camera.position.set(0, 1.95, 7.0);
      camera.fov = 54;
    } else if (size.width < 1024) {
      camera.position.set(0, 2.1, 7.0);
      camera.fov = 50;
    } else {
      camera.position.set(0, 2.1, 5.6);
      camera.fov = 46;
    }
    camera.updateProjectionMatrix();
  }, [camera, size.width]);
  return null;
};

/* ══════════════════════════════════════════════════
   MATERIALS
══════════════════════════════════════════════════ */
// Skin tone — warm dark
const SkinMat   = () => <meshStandardMaterial color="#c68642" roughness={0.6} metalness={0.0} />;
// Clothing — dark navy hoodie
const ClothMat  = () => <meshStandardMaterial color="#0d1528" roughness={0.7} metalness={0.1} />;
// Dark clothing detail
const ClothDark = () => <meshStandardMaterial color="#080f1e" roughness={0.7} metalness={0.1} />;
// Hair — dark
const HairMat   = () => <meshStandardMaterial color="#0a0804" roughness={0.8} metalness={0.0} />;
// Metal chrome
const ChromeMat = () => <meshStandardMaterial color="#0f1520" roughness={0.1} metalness={1.0} />;
// Neon glow
const NeonMat   = ({ color = '#00d2ff', intensity = 4 }) => (
  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} roughness={0} metalness={0.2} />
);

/* ══════════════════════════════════════════════════
   DESK
══════════════════════════════════════════════════ */
const Desk = () => (
  <group>
    {/* Tabletop */}
    <mesh position={[0, 0.90, 0]} receiveShadow>
      <boxGeometry args={[2.8, 0.055, 1.1]} />
      <meshStandardMaterial color="#090d18" roughness={0.2} metalness={0.9} />
    </mesh>
    {/* Neon front edge */}
    <mesh position={[0, 0.876, 0.553]}>
      <boxGeometry args={[2.78, 0.016, 0.01]} />
      <NeonMat color="#00d2ff" intensity={3} />
    </mesh>
    {/* Neon side edges */}
    {[-1, 1].map(s => (
      <mesh key={s} position={[s * 1.395, 0.876, 0]}>
        <boxGeometry args={[0.01, 0.016, 1.1]} />
        <NeonMat color="#9d50bb" intensity={2} />
      </mesh>
    ))}
    {/* Desk mat */}
    <mesh position={[0, 0.928, 0.1]}>
      <boxGeometry args={[2.2, 0.007, 0.92]} />
      <meshStandardMaterial color="#050810" roughness={0.9} metalness={0.0} />
    </mesh>
    {/* Legs — 4 corners */}
    {[[-1.2, -0.46], [1.2, -0.46], [-1.2, 0.46], [1.2, 0.46]].map(([x, z], i) => (
      <mesh key={i} position={[x, 0.44, z]}>
        <boxGeometry args={[0.065, 0.88, 0.065]} />
        <ChromeMat />
      </mesh>
    ))}
    {/* Crossbar */}
    <mesh position={[0, 0.09, -0.02]}>
      <boxGeometry args={[2.32, 0.045, 0.055]} />
      <ChromeMat />
    </mesh>
  </group>
);

/* ══════════════════════════════════════════════════
   LAPTOP
══════════════════════════════════════════════════ */
const CodeLine = ({ y, width, color }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.emissiveIntensity = 1.5 + 1.2 * Math.abs(Math.sin(clock.getElapsedTime() * (1.1 + y * 2) + y * 8));
  });
  return (
    <mesh ref={ref} position={[-0.19 + width * 0.15, y, 0.001]}>
      <boxGeometry args={[width, 0.013, 0.001]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} roughness={0} metalness={0} />
    </mesh>
  );
};

const Laptop = () => {
  const screenRef = useRef();
  const blinkRef  = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (screenRef.current)
      screenRef.current.material.emissiveIntensity = 0.9 + 0.25 * Math.sin(t * 8);
    if (blinkRef.current)
      blinkRef.current.material.opacity = Math.floor(t * 2) % 2 === 0 ? 1 : 0;
  });

  const codeLines = [
    { y: 0.155, width: 0.46, color: '#9d50bb' },
    { y: 0.128, width: 0.30, color: '#00d2ff' },
    { y: 0.101, width: 0.38, color: '#39ff14' },
    { y: 0.074, width: 0.22, color: '#00d2ff' },
    { y: 0.047, width: 0.40, color: '#ff007f' },
    { y: 0.020, width: 0.34, color: '#9d50bb' },
    { y: -0.007, width: 0.44, color: '#00d2ff' },
    { y: -0.034, width: 0.26, color: '#39ff14' },
    { y: -0.061, width: 0.18, color: '#00d2ff' },
  ];

  return (
    <group position={[-0.15, 0.952, -0.10]}>
      {/* Base / Keyboard */}
      <mesh>
        <boxGeometry args={[0.90, 0.020, 0.60]} />
        <ChromeMat />
      </mesh>
      {/* Touchpad */}
      <mesh position={[0.02, 0.014, 0.12]}>
        <boxGeometry args={[0.21, 0.004, 0.13]} />
        <meshStandardMaterial color="#070c18" roughness={0.5} metalness={0.7} />
      </mesh>
      {/* Key rows */}
      {[0, 1, 2, 3].map(row =>
        [...Array(11)].map((_, col) => (
          <mesh key={`${row}-${col}`} position={[-0.38 + col * 0.075, 0.016, -0.16 + row * 0.072]}>
            <boxGeometry args={[0.062, 0.005, 0.060]} />
            <meshStandardMaterial color="#060c1c" roughness={0.6} metalness={0.5} />
          </mesh>
        ))
      )}
      {/* Lit keys */}
      {[[1,2,'#00d2ff'],[1,3,'#00d2ff'],[1,4,'#9d50bb'],[2,3,'#9d50bb'],[0,5,'#00d2ff']].map(([r,c,col], i) => (
        <mesh key={i} position={[-0.38 + c * 0.075, 0.019, -0.16 + r * 0.072]}>
          <boxGeometry args={[0.054, 0.002, 0.050]} />
          <NeonMat color={col} intensity={3} />
        </mesh>
      ))}
      {/* Hinge */}
      <mesh position={[0, 0.012, -0.30]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.014, 0.014, 0.84, 12]} />
        <NeonMat color="#00d2ff" intensity={2} />
      </mesh>
      {/* Screen lid — angle back */}
      <group position={[0, 0.012, -0.30]} rotation={[-1.15, 0, 0]}>
        {/* Lid outer shell */}
        <mesh position={[0, 0.285, 0.005]}>
          <boxGeometry args={[0.88, 0.56, 0.014]} />
          <ChromeMat />
        </mesh>
        {/* Screen face */}
        <mesh position={[0, 0.285, 0.013]}>
          <boxGeometry args={[0.84, 0.52, 0.006]} />
          <meshStandardMaterial color="#000d1a" roughness={0} metalness={0} />
        </mesh>
        {/* Display */}
        <mesh ref={screenRef} position={[0, 0.285, 0.017]}>
          <boxGeometry args={[0.80, 0.48, 0.001]} />
          <meshStandardMaterial color="#001830" emissive="#002a4a" emissiveIntensity={0.9} roughness={0} metalness={0} />
        </mesh>
        {/* Code lines on screen */}
        <group position={[0, 0.285, 0.019]}>
          {codeLines.map((l, i) => <CodeLine key={i} {...l} />)}
          {/* Blinking cursor */}
          <mesh ref={blinkRef} position={[-0.02, -0.061, 0.001]}>
            <boxGeometry args={[0.014, 0.016, 0.001]} />
            <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={6} transparent opacity={1} />
          </mesh>
        </group>
        {/* Screen border glow */}
        {[
          [0, 0.545, 0, 0.86, 0.008],
          [0, 0.025, 0, 0.86, 0.008],
          [-0.435, 0.285, 0, 0.008, 0.52],
          [0.435, 0.285, 0, 0.008, 0.52],
        ].map(([x, y, z, w, h], i) => (
          <mesh key={i} position={[x, y, 0.018]}>
            <boxGeometry args={[w, 0.006, h]} />
            <NeonMat color="#00d2ff" intensity={3} />
          </mesh>
        ))}
        {/* Screen front glow plane */}
        <mesh position={[0, 0.285, 0.55]}>
          <planeGeometry args={[1.0, 0.65]} />
          <meshStandardMaterial color="#0066cc" emissive="#0066cc" emissiveIntensity={0.4}
            transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
};

/* ══════════════════════════════════════════════════
   COFFEE MUG
══════════════════════════════════════════════════ */
const Mug = () => {
  const steamRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (steamRef.current) {
      steamRef.current.position.y = 0.10 + 0.015 * Math.sin(t * 2.2);
      steamRef.current.material.opacity = 0.28 + 0.18 * Math.sin(t * 1.8);
    }
  });
  return (
    <group position={[1.0, 0.952, 0.26]}>
      <mesh>
        <cylinderGeometry args={[0.068, 0.058, 0.13, 20]} />
        <meshStandardMaterial color="#090d1a" roughness={0.3} metalness={0.75} />
      </mesh>
      <mesh position={[0, 0.070, 0]}>
        <torusGeometry args={[0.070, 0.006, 8, 28]} rotation={[Math.PI / 2, 0, 0]} />
        <NeonMat color="#9d50bb" intensity={3} />
      </mesh>
      <mesh position={[0.082, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.036, 0.010, 8, 18, Math.PI]} />
        <meshStandardMaterial color="#0b1120" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh ref={steamRef} position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshStandardMaterial color="#8ab4cc" roughness={1} transparent opacity={0.28} />
      </mesh>
    </group>
  );
};

/* ══════════════════════════════════════════════════
   OFFICE CHAIR
══════════════════════════════════════════════════ */
const Chair = () => (
  <group position={[0, 0, 1.02]}>
    {/* Seat */}
    <mesh position={[0, 0.52, 0]}>
      <boxGeometry args={[0.80, 0.085, 0.74]} />
      <meshStandardMaterial color="#08111e" roughness={0.5} metalness={0.5} />
    </mesh>
    {/* Seat neon edge */}
    <mesh position={[0, 0.565, 0.372]}>
      <boxGeometry args={[0.78, 0.008, 0.008]} />
      <NeonMat color="#9d50bb" intensity={2.5} />
    </mesh>
    {/* Back rest */}
    <mesh position={[0, 1.04, 0.38]}>
      <boxGeometry args={[0.74, 0.90, 0.076]} />
      <meshStandardMaterial color="#07101c" roughness={0.5} metalness={0.5} />
    </mesh>
    {/* Back neon strips */}
    {[-0.30, 0.30].map((x, i) => (
      <mesh key={i} position={[x, 1.04, 0.418]}>
        <boxGeometry args={[0.016, 0.84, 0.008]} />
        <NeonMat color="#00d2ff" intensity={2} />
      </mesh>
    ))}
    {/* Horizontal back bar */}
    <mesh position={[0, 1.48, 0.418]}>
      <boxGeometry args={[0.70, 0.010, 0.008]} />
      <NeonMat color="#00d2ff" intensity={2} />
    </mesh>
    {/* Armrests */}
    {[-0.42, 0.42].map((x, i) => (
      <group key={i} position={[x, 0.72, 0.04]}>
        <mesh>
          <boxGeometry args={[0.068, 0.055, 0.54]} />
          <meshStandardMaterial color="#07101c" roughness={0.5} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.034, 0]}>
          <boxGeometry args={[0.076, 0.020, 0.44]} />
          <meshStandardMaterial color="#050c18" roughness={0.6} metalness={0.4} />
        </mesh>
      </group>
    ))}
    {/* Central column */}
    <mesh position={[0, 0.265, 0.04]}>
      <cylinderGeometry args={[0.040, 0.052, 0.53, 16]} />
      <ChromeMat />
    </mesh>
    {/* 5-star base */}
    {[...Array(5)].map((_, i) => {
      const a = (i / 5) * Math.PI * 2;
      return (
        <group key={i} rotation={[0, a, 0]}>
          <mesh position={[0.30, 0.028, 0.04]} rotation={[0, 0, -0.10]}>
            <boxGeometry args={[0.56, 0.038, 0.055]} />
            <ChromeMat />
          </mesh>
          <mesh position={[0.58, 0.014, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.034, 0.034, 0.050, 10]} />
            <meshStandardMaterial color="#090a14" roughness={0.7} metalness={0.4} />
          </mesh>
        </group>
      );
    })}
  </group>
);

/* ══════════════════════════════════════════════════
   MALE CHARACTER — realistic proportions
══════════════════════════════════════════════════ */

/* Blinking eye */
const Eye = ({ x }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const blink = Math.abs(Math.sin(t * 0.38 + x * 15)) > 0.96 ? 0.12 : 1;
    ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, blink, 0.15);
  });
  return (
    <mesh ref={ref} position={[x, 0, 0]}>
      <sphereGeometry args={[0.028, 14, 14]} />
      <meshStandardMaterial color="#1a1a2a" roughness={0.3} metalness={0} />
    </mesh>
  );
};

/* Pupil */
const Pupil = ({ x }) => (
  <mesh position={[x, 0, 0]}>
    <sphereGeometry args={[0.014, 10, 10]} />
    <meshStandardMaterial color="#000" roughness={0} metalness={0} />
  </mesh>
);

/* Head */
const Head = ({ mouseRef }) => {
  const headRef = useRef();
  useFrame(() => {
    if (!headRef.current) return;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mx * 0.40, 0.07);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -my * 0.18 - 0.12, 0.07);
  });

  return (
    <group ref={headRef}>
      {/* Skull — slightly taller than wide */}
      <mesh position={[0, 0.10, 0]}>
        <sphereGeometry args={[0.185, 32, 28]} />
        <SkinMat />
      </mesh>
      {/* Chin / jaw */}
      <mesh position={[0, -0.06, 0.06]}>
        <boxGeometry args={[0.24, 0.14, 0.26]} />
        <SkinMat />
      </mesh>
      {/* Forehead brow area */}
      <mesh position={[0, 0.18, 0.14]}>
        <boxGeometry args={[0.30, 0.06, 0.10]} />
        <SkinMat />
      </mesh>
      {/* Nose bridge + tip */}
      <mesh position={[0, 0.06, 0.19]}>
        <boxGeometry args={[0.045, 0.07, 0.07]} />
        <SkinMat />
      </mesh>
      <mesh position={[0, 0.01, 0.215]}>
        <sphereGeometry args={[0.030, 12, 12]} />
        <SkinMat />
      </mesh>
      {/* Eye area recess */}
      {[-0.09, 0.09].map((x, i) => (
        <group key={i} position={[x, 0.12, 0.17]}>
          {/* White of eye */}
          <mesh>
            <sphereGeometry args={[0.033, 14, 14]} />
            <meshStandardMaterial color="#e8e8e0" roughness={0.4} metalness={0} />
          </mesh>
          <Eye x={0} />
          <Pupil x={0} />
          {/* Eyelid */}
          <mesh position={[0, 0.020, 0.022]}>
            <boxGeometry args={[0.066, 0.018, 0.008]} />
            <SkinMat />
          </mesh>
        </group>
      ))}
      {/* Eyebrows */}
      {[-0.09, 0.09].map((x, i) => (
        <mesh key={i} position={[x, 0.165, 0.17]} rotation={[0, 0, i === 0 ? 0.12 : -0.12]}>
          <boxGeometry args={[0.072, 0.012, 0.008]} />
          <HairMat />
        </mesh>
      ))}
      {/* Mouth */}
      <mesh position={[0, -0.06, 0.18]}>
        <boxGeometry args={[0.072, 0.012, 0.008]} />
        <meshStandardMaterial color="#8b4040" roughness={0.6} metalness={0} />
      </mesh>
      {/* Lips */}
      <mesh position={[0, -0.048, 0.188]}>
        <boxGeometry args={[0.068, 0.009, 0.005]} />
        <meshStandardMaterial color="#a05050" roughness={0.5} metalness={0} />
      </mesh>
      {/* Ears */}
      {[-1, 1].map(s => (
        <mesh key={s} position={[s * 0.192, 0.08, 0.01]}>
          <sphereGeometry args={[0.042, 12, 12]} />
          <SkinMat />
        </mesh>
      ))}
      {/* Hair — top */}
      <mesh position={[0, 0.225, -0.02]}>
        <sphereGeometry args={[0.188, 28, 20]} />
        <HairMat />
      </mesh>
      {/* Hair sides */}
      {[-1, 1].map(s => (
        <mesh key={s} position={[s * 0.155, 0.15, -0.04]}>
          <boxGeometry args={[0.08, 0.20, 0.24]} />
          <HairMat />
        </mesh>
      ))}
      {/* Hair front */}
      <mesh position={[0, 0.255, 0.12]} rotation={[0.30, 0, 0]}>
        <boxGeometry args={[0.28, 0.07, 0.10]} />
        <HairMat />
      </mesh>
      {/* Headphones */}
      <mesh position={[0, 0.28, 0.00]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.21, 0.016, 8, 32, Math.PI]} />
        <ChromeMat />
      </mesh>
      {[-1, 1].map(s => (
        <group key={s} position={[s * 0.215, 0.08, 0.01]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.060, 0.060, 0.048, 18]} />
            <meshStandardMaterial color="#08111e" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[s * 0.028, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.036, 0.036, 0.008, 16]} />
            <NeonMat color="#9d50bb" intensity={3} />
          </mesh>
        </group>
      ))}
      {/* Neck */}
      <mesh position={[0, -0.22, 0.02]}>
        <cylinderGeometry args={[0.072, 0.085, 0.18, 18]} />
        <SkinMat />
      </mesh>
    </group>
  );
};

/* Typing hands */
const TypingHand = ({ side, zOff = 0 }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const phase = side > 0 ? 0 : 1.5;
    ref.current.position.y = 0.945 + 0.010 * Math.abs(Math.sin(t * 5.5 + phase));
  });
  const s = side;
  return (
    <group ref={ref} position={[s * 0.22, 0.945, 0.20 + zOff]}>
      {/* Palm */}
      <mesh rotation={[0.30, s * 0.08, 0]}>
        <boxGeometry args={[0.14, 0.048, 0.10]} />
        <SkinMat />
      </mesh>
      {/* Fingers */}
      {[-0.045, -0.015, 0.015, 0.045].map((dx, i) => (
        <mesh key={i} position={[dx, 0.012, -0.062]} rotation={[0.38, 0, 0]}>
          <boxGeometry args={[0.024, 0.038, 0.068]} />
          <SkinMat />
        </mesh>
      ))}
      {/* Thumb */}
      <mesh position={[s * -0.074, 0.008, 0.012]} rotation={[0.2, 0, s * 0.5]}>
        <boxGeometry args={[0.028, 0.035, 0.055]} />
        <SkinMat />
      </mesh>
    </group>
  );
};

/* Full character */
const Character = ({ mouseRef }) => {
  const bodyRef    = useRef();
  const lArmRef    = useRef();
  const rArmRef    = useRef();
  const lForeRef   = useRef();
  const rForeRef   = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Breathing
    if (bodyRef.current) bodyRef.current.position.y = 0.86 + 0.007 * Math.sin(t * 1.0);
    // Subtle arm sway
    if (lArmRef.current) lArmRef.current.rotation.z = THREE.MathUtils.lerp(lArmRef.current.rotation.z, 0.22 + 0.015 * Math.sin(t * 1.2), 0.05);
    if (rArmRef.current) rArmRef.current.rotation.z = THREE.MathUtils.lerp(rArmRef.current.rotation.z, -0.22 - 0.015 * Math.sin(t * 1.2), 0.05);
    if (lForeRef.current) lForeRef.current.rotation.x = THREE.MathUtils.lerp(lForeRef.current.rotation.x, 0.72, 0.05);
    if (rForeRef.current) rForeRef.current.rotation.x = THREE.MathUtils.lerp(rForeRef.current.rotation.x, 0.72, 0.05);
  });

  return (
    <group position={[0, 0, 0.95]}>
      {/* ─ LOWER BODY: legs ─ */}
      {/* Left thigh (horizontal forward) */}
      <mesh position={[-0.19, 0.50, 0.20]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.095, 0.085, 0.52, 16]} />
        <ClothMat />
      </mesh>
      {/* Left shin (downward) */}
      <mesh position={[-0.19, 0.20, 0.48]}>
        <cylinderGeometry args={[0.080, 0.068, 0.56, 16]} />
        <ClothMat />
      </mesh>
      {/* Left shoe */}
      <mesh position={[-0.19, -0.08, 0.40]} rotation={[0.28, 0, 0]}>
        <boxGeometry args={[0.13, 0.085, 0.28]} />
        <meshStandardMaterial color="#06090f" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Right thigh */}
      <mesh position={[0.19, 0.50, 0.20]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.095, 0.085, 0.52, 16]} />
        <ClothMat />
      </mesh>
      {/* Right shin */}
      <mesh position={[0.19, 0.20, 0.48]}>
        <cylinderGeometry args={[0.080, 0.068, 0.56, 16]} />
        <ClothMat />
      </mesh>
      {/* Right shoe */}
      <mesh position={[0.19, -0.08, 0.40]} rotation={[0.28, 0, 0]}>
        <boxGeometry args={[0.13, 0.085, 0.28]} />
        <meshStandardMaterial color="#06090f" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* ─ TORSO ─ */}
      <group ref={bodyRef} position={[0, 0.86, 0.05]} rotation={[-0.10, 0, 0]}>
        {/* Main chest/abdomen */}
        <mesh>
          <boxGeometry args={[0.50, 0.68, 0.28]} />
          <ClothMat />
        </mesh>
        {/* Hoodie front panel */}
        <mesh position={[0, 0.06, 0.143]}>
          <boxGeometry args={[0.46, 0.52, 0.016]} />
          <ClothDark />
        </mesh>
        {/* Logo on chest */}
        <mesh position={[0, 0.12, 0.153]}>
          <boxGeometry args={[0.10, 0.10, 0.008]} />
          <NeonMat color="#00d2ff" intensity={2} />
        </mesh>
        <mesh position={[0, 0.12, 0.156]}>
          <boxGeometry args={[0.052, 0.052, 0.005]} />
          <NeonMat color="#9d50bb" intensity={4} />
        </mesh>
        {/* Hood collar */}
        <mesh position={[0, 0.34, 0.04]}>
          <boxGeometry args={[0.30, 0.058, 0.22]} />
          <ClothDark />
        </mesh>
        {/* Belt line */}
        <mesh position={[0, -0.32, 0.143]}>
          <boxGeometry args={[0.48, 0.018, 0.012]} />
          <NeonMat color="#9d50bb" intensity={2} />
        </mesh>
        {/* Wrist bands */}
        {[-1, 1].map(s => (
          <mesh key={s} position={[s * 0.26, -0.51, 0.22]}>
            <torusGeometry args={[0.058, 0.010, 8, 24]} rotation={[Math.PI / 2, 0, 0]} />
            <NeonMat color="#00d2ff" intensity={3} />
          </mesh>
        ))}

        {/* ─ LEFT ARM ─ */}
        <group ref={lArmRef} position={[-0.285, 0.24, 0]}>
          {/* Shoulder */}
          <mesh>
            <sphereGeometry args={[0.090, 18, 18]} />
            <ClothMat />
          </mesh>
          {/* Upper arm */}
          <mesh position={[-0.032, -0.21, 0.06]} rotation={[0.45, -0.14, 0.25]}>
            <cylinderGeometry args={[0.075, 0.065, 0.42, 16]} />
            <ClothMat />
          </mesh>
          {/* Elbow */}
          <mesh position={[-0.055, -0.40, 0.18]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <ClothMat />
          </mesh>
          {/* Forearm */}
          <group ref={lForeRef} position={[-0.055, -0.40, 0.18]}>
            <mesh position={[0, -0.22, 0.12]} rotation={[0.72, -0.08, 0.18]}>
              <cylinderGeometry args={[0.060, 0.050, 0.40, 16]} />
              <SkinMat />
            </mesh>
          </group>
        </group>

        {/* ─ RIGHT ARM ─ */}
        <group ref={rArmRef} position={[0.285, 0.24, 0]}>
          <mesh>
            <sphereGeometry args={[0.090, 18, 18]} />
            <ClothMat />
          </mesh>
          <mesh position={[0.032, -0.21, 0.06]} rotation={[0.45, 0.14, -0.25]}>
            <cylinderGeometry args={[0.075, 0.065, 0.42, 16]} />
            <ClothMat />
          </mesh>
          <mesh position={[0.055, -0.40, 0.18]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <ClothMat />
          </mesh>
          <group ref={rForeRef} position={[0.055, -0.40, 0.18]}>
            <mesh position={[0, -0.22, 0.12]} rotation={[0.72, 0.08, -0.18]}>
              <cylinderGeometry args={[0.060, 0.050, 0.40, 16]} />
              <SkinMat />
            </mesh>
          </group>
        </group>

        {/* ─ HEAD ─ */}
        <group position={[0, 0.46, 0.01]}>
          <Head mouseRef={mouseRef} />
        </group>
      </group>
    </group>
  );
};

/* ══════════════════════════════════════════════════
   MONITOR (extra screen on desk)
══════════════════════════════════════════════════ */
const Monitor = () => {
  const screenRef = useRef();
  useFrame(({ clock }) => {
    if (screenRef.current)
      screenRef.current.material.emissiveIntensity = 0.7 + 0.2 * Math.sin(clock.getElapsedTime() * 5);
  });
  return (
    <group position={[0.85, 0.955, -0.35]}>
      {/* Stand base */}
      <mesh position={[0, -0.02, 0.12]}>
        <boxGeometry args={[0.22, 0.016, 0.18]} />
        <ChromeMat />
      </mesh>
      {/* Stand pole */}
      <mesh position={[0, 0.14, 0.06]}>
        <boxGeometry args={[0.025, 0.30, 0.025]} />
        <ChromeMat />
      </mesh>
      {/* Monitor body */}
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[0.62, 0.38, 0.032]} />
        <meshStandardMaterial color="#070c18" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0.38, 0.018]}>
        <boxGeometry args={[0.58, 0.34, 0.002]} />
        <meshStandardMaterial color="#000e1a" emissive="#001428" emissiveIntensity={0.7} roughness={0} metalness={0} />
      </mesh>
      {/* Monitor neon base strip */}
      <mesh position={[0, 0.196, 0.018]}>
        <boxGeometry args={[0.60, 0.008, 0.008]} />
        <NeonMat color="#9d50bb" intensity={3} />
      </mesh>
    </group>
  );
};

/* ══════════════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════════════ */
const Particles = ({ count = 1600 }) => {
  const ref = useRef();
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cA = new THREE.Color('#00d2ff');
    const cB = new THREE.Color('#9d50bb');
    const cC = new THREE.Color('#ffffff');
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3]     = r * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = r * Math.sin(theta) - 1.5;
      const rn = Math.random();
      const c = rn < 0.5 ? cA : rn < 0.82 ? cB : cC;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.016} vertexColors transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
};

/* ══════════════════════════════════════════════════
   FLOOR GLOW
══════════════════════════════════════════════════ */
const FloorGlow = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = 0.16 + 0.06 * Math.sin(clock.getElapsedTime() * 1.1);
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0.6]}>
      <ringGeometry args={[0.3, 2.5, 64]} />
      <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={2}
        transparent opacity={0.16} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
};

/* ══════════════════════════════════════════════════
   LIGHTS
══════════════════════════════════════════════════ */
const Lights = ({ mouseRef }) => {
  const blueRef   = useRef();
  const purpRef   = useRef();
  const screenLit = useRef();

  useFrame(({ clock }) => {
    const mx = mouseRef.current.x * 4;
    const my = -mouseRef.current.y * 3;
    if (blueRef.current) {
      blueRef.current.position.x = THREE.MathUtils.lerp(blueRef.current.position.x, mx + 2, 0.06);
      blueRef.current.position.y = THREE.MathUtils.lerp(blueRef.current.position.y, my + 4.5, 0.06);
    }
    if (purpRef.current) {
      purpRef.current.position.x = THREE.MathUtils.lerp(purpRef.current.position.x, -mx - 2, 0.06);
    }
    if (screenLit.current) {
      screenLit.current.intensity = 3 + 0.6 * Math.sin(clock.getElapsedTime() * 7);
    }
  });
  return (
    <>
      <ambientLight intensity={0.22} />
      <pointLight ref={blueRef}   position={[2, 5, 4]}    intensity={5.5} color="#00d2ff" />
      <pointLight ref={purpRef}   position={[-2, 3.5, 3]} intensity={4.5} color="#9d50bb" />
      <pointLight                 position={[0, 0.5, 4]}  intensity={2.5} color="#9d50bb" />
      <pointLight ref={screenLit} position={[-0.2, 1.5, 0.2]} color="#00aaff" intensity={3} distance={3.5} decay={2} />
      <spotLight position={[0, 8, 2]} angle={0.28} penumbra={0.9} intensity={8} color="#00d2ff" />
    </>
  );
};

/* ══════════════════════════════════════════════════
   SCENE CONTENT
══════════════════════════════════════════════════ */
const SceneContent = ({ mouseRef }) => {
  const rootRef = useRef();
  useFrame(({ clock }) => {
    if (rootRef.current)
      rootRef.current.position.y = 0.038 * Math.sin(clock.getElapsedTime() * 0.75);
  });
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2.1, 5.6]} fov={46} />
      <ResponsiveCamera />
      <Lights mouseRef={mouseRef} />
      <group ref={rootRef} position={[0, -0.32, -0.4]} scale={[1.08, 1.08, 1.08]}>
        <Desk />
        <Laptop />
        <Monitor />
        <Mug />
        <Chair />
        <Character mouseRef={mouseRef} />
        <TypingHand side={-1} />
        <TypingHand side={1} />
        <FloorGlow />
      </group>
      <Particles count={1600} />
    </>
  );
};

/* ══════════════════════════════════════════════════
   EXPORT
══════════════════════════════════════════════════ */
const HeroScene = () => {
  const mouseRef = useMouseRef();
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <SceneContent mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
