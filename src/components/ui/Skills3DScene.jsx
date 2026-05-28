import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';

function FloatingShape({ color }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.y = time * 0.25;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.3, 64, 64]} scale={1.1}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.45}
        speed={2.2}
        roughness={0.15}
        metalness={0.85}
      />
    </Sphere>
  );
}

function ParticleGlobe({ color }) {
  const pointsRef = useRef();

  // Generate random points on a sphere shell
  const spherePoints = useMemo(() => {
    const arr = new Float32Array(1200);
    for (let i = 0; i < 400; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.1 + Math.random() * 0.7; // random distance between 2.1 and 2.8
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.12;
      pointsRef.current.rotation.x = time * 0.04;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={spherePoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.065}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Skills3DScene({ color }) {
  return (
    <div className="w-full h-full min-h-[350px] relative">
      {/* Light Overlay effect for standard tech look */}
      <div className="absolute inset-0 bg-radial from-transparent to-black/30 pointer-events-none z-10" />
      <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <pointLight position={[-8, -8, -8]} color={color} intensity={1.2} />
        <FloatingShape color={color} />
        <ParticleGlobe color={color} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
