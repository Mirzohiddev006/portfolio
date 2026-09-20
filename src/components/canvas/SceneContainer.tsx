import { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

// A subtle orbit of code symbols replaces the generic 3D shape.
const CodingOrbit = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { x, y } = useMouseStore();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.z = time * 0.08 + x * 0.1;
    groupRef.current.rotation.y = time * 0.12 + y * 0.1;
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.25;
  });

  return (
    <group ref={groupRef} scale={1.35}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.012, 8, 96]} />
        <meshBasicMaterial color="#00ff41" transparent opacity={0.45} />
      </mesh>
      {[[-1.4, 0.8, -0.3], [1.35, -0.65, -0.2], [0.1, 1.25, -0.4]].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} rotation={[index * 0.7, index * 0.5, index * 0.3]}>
          <boxGeometry args={[0.45 + index * 0.12, 0.45 + index * 0.12, 0.45 + index * 0.12]} />
          <meshBasicMaterial color={index === 1 ? "#00ffff" : "#00ff41"} wireframe transparent opacity={0.38} />
        </mesh>
      ))}
    </group>
  );
};

const codeSnippets = [
  "const app = createApp();", "npm run build", "<Component />", "git push origin main",
  "interface Project {}", "if (isReady) deploy();", "display: grid;", "await fetch('/api')",
  "docker compose up", "useEffect(() => {})", "SELECT * FROM projects", "010101",
  "HTTP 200 OK", "pnpm dev", "export default App", "ssh production",
];

const CodeStreams = () => (
  <div className="code-streams" aria-hidden="true">
    {codeSnippets.map((snippet, index) => (
      <span key={`${snippet}-${index}`} className={`code-stream code-stream-${index % 8}`}>
        {snippet}
      </span>
    ))}
  </div>
);

// Particle Field Component
const ParticleField = ({ count = 120 }: { count?: number }) => {
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
      <CodingOrbit />
      <ParticleField count={120} />
      <GridFloor />
    </>
  );
};

// Scene Container with mouse tracking
const SceneContainer = () => {
  const setPosition = useMouseStore((state) => state.setPosition);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)');
    const update = () => setIsLowPower(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setPosition(x, y);
  };

  return (
    <div className="fixed inset-0 z-0" onMouseMove={handleMouseMove}>
      <CodeStreams />
      {!isLowPower && <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.25]}
      >
        <color attach="background" args={['#0a0a0a']} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>}
    </div>
  );
};

export default SceneContainer;
