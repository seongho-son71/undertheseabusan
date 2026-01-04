
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Use React.FC to properly type the component and allow standard props like 'key' in JSX
const Bubble: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
  const ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const speed = useMemo(() => 0.2 + Math.random() * 0.5, []);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Floating up animation
      ref.current.position.y = initialY + ((t * speed) % 10);
      ref.current.position.x = position[0] + Math.sin(t + position[1]) * 0.3;
      ref.current.rotation.x = t * 0.2;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={0.8}
        thickness={0.5}
        roughness={0}
        transparent
        opacity={0.6}
        metalness={0.1}
      />
    </Sphere>
  );
};

const WaterWave = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
       ref.current.rotation.z = Math.cos(t * 0.1) * 0.1;
    }
  });

  return (
    <Torus ref={ref} args={[6, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} transparent opacity={0.3} wireframe />
    </Torus>
  );
}

export const OceanHeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={3.0} color="#ffffff" />
        <pointLight position={[-10, -5, 5]} intensity={1.5} color="#B9E9FF" />
        
        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group>
            {[...Array(20)].map((_, i) => (
              <Bubble 
                key={i} 
                position={[
                  (Math.random() - 0.5) * 12, 
                  (Math.random() - 0.5) * 12, 
                  (Math.random() - 0.5) * 5
                ]} 
                scale={Math.random() * 0.12 + 0.06}
              />
            ))}
          </group>
          <WaterWave />
        </Float>
        
        <Environment preset="city" />
        <Stars radius={50} depth={50} count={200} factor={2} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export const DiverScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        
        <Float rotationIntensity={0.6} floatIntensity={0.4} speed={1.5}>
            <Sphere args={[1.5, 64, 64]}>
                <MeshDistortMaterial
                    color="#E0F7FF"
                    speed={2}
                    distort={0.4}
                    radius={1}
                />
            </Sphere>
            {/* Simple silhouette-like representation of deep water */}
            <Torus args={[2.5, 0.02, 16, 100]} rotation={[Math.PI/2.1, 0, 0]}>
                <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
            </Torus>
        </Float>
      </Canvas>
    </div>
  );
}
