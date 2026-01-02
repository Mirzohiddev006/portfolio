import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import { create } from 'zustand';

// Simple store for mouse position
interface MouseStore {
  x: number;
  y: number;
  setPosition: (x: number, y: number) => void;
}

const useMouseStore = create<MouseStore>((set) => ({
  x: 0,
  y: 0,
  setPosition: (x, y) => set({ x, y }),
}));

// Floating Icosahedron Component
const FloatingGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const { x, y } = useMouseStore();

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  const innerMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#00ff41'),
    transparent: true,
    opacity: 0.05,
    side: THREE.DoubleSide,
  }), []);

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color('#00ff41'),
    transparent: true,
    opacity: 0.7,
  }), []);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;
    const time = state.clock.getElapsedTime();
    
    meshRef.current.rotation.x = time * 0.1 + y * 0.5;
    meshRef.current.rotation.y = time * 0.15 + x * 0.5;
    wireframeRef.current.rotation.x = time * 0.1 + y * 0.5;
    wireframeRef.current.rotation.y = time * 0.15 + x * 0.5;

    const floatY = Math.sin(time * 0.5) * 0.2;
    meshRef.current.position.y = floatY;
    wireframeRef.current.position.y = floatY;

    const pulseScale = 1.5 + Math.sin(time * 2) * 0.05;
    meshRef.current.scale.setScalar(pulseScale);
    wireframeRef.current.scale.setScalar(pulseScale);
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} material={innerMaterial} />
      <lineSegments ref={wireframeRef} geometry={edges} material={lineMaterial} />
    </group>
  );
};

// Particle Field Component
const ParticleField = ({ count = 300 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { x, y } = useMouseStore();

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const spread = 20;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions, velocities };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color('#00ff41'),
    size: 0.03,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const array = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      array[i3] += velocities[i3] + Math.sin(time * 0.5 + i) * 0.001;
      array[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i) * 0.001;
      array[i3 + 2] += velocities[i3 + 2];

      if (Math.abs(array[i3]) > 10) array[i3] *= -0.9;
      if (Math.abs(array[i3 + 1]) > 10) array[i3 + 1] *= -0.9;
      if (Math.abs(array[i3 + 2]) > 10) array[i3 + 2] *= -0.9;
    }
    positionAttribute.needsUpdate = true;
    pointsRef.current.rotation.x = y * 0.1;
    pointsRef.current.rotation.y = x * 0.1;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

// Grid Floor Component
const GridFloor = () => {
  const { lines, glowLines } = useMemo(() => {
    const size = 100;
    const divisions = 100;
    const halfSize = size / 2;
    const step = size / divisions;
    
    const positions: number[] = [];
    const glowPositions: number[] = [];

    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step;
      positions.push(-halfSize, 0, pos, halfSize, 0, pos);
      positions.push(pos, 0, -halfSize, pos, 0, halfSize);
      if (i % 5 === 0) {
        glowPositions.push(-halfSize, 0, pos, halfSize, 0, pos);
        glowPositions.push(pos, 0, -halfSize, pos, 0, halfSize);
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const glowGeometry = new THREE.BufferGeometry();
    glowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(glowPositions, 3));

    return { lines: lineGeometry, glowLines: glowGeometry };
  }, []);

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: '#00ff41', transparent: true, opacity: 0.08 }), []);
  const glowMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: '#00ff41', transparent: true, opacity: 0.2 }), []);

  return (
    <group position={[0, -8, -20]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <lineSegments geometry={lines} material={lineMaterial} />
      <lineSegments geometry={glowLines} material={glowMaterial} />
    </group>
  );
};

// Main Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff41" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ffff" />
      <FloatingGeometry />
      <ParticleField count={300} />
      <GridFloor />
    </>
  );
};

// Scene Container with mouse tracking
const SceneContainer = () => {
  const setPosition = useMouseStore((state) => state.setPosition);

  const handleMouseMove = (event: React.MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setPosition(x, y);
  };

  return (
    <div className="fixed inset-0 z-0" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0a0a0a']} />
        <Suspense fallback={null}>
          <Scene />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneContainer;
