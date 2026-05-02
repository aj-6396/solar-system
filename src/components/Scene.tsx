import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS, RINGS_DATA, PlanetData } from '../data/planets';

interface SceneProps {
  scaleMode: 'visual' | 'true';
  selectedPlanetId: string | null;
  onSelectPlanet: (id: string) => void;
}

// Global speed multiplier for rotations/orbits
const TIME_SCALE = 0.5;

function PlanetMesh({ 
  planet, scaleMode, isSelected, onClick, rings 
}: { 
  planet: PlanetData; scaleMode: 'visual' | 'true'; isSelected: boolean; onClick: () => void; rings?: { innerRadius: number; outerRadius: number; color: string }
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const hoverRef = useRef<THREE.Mesh>(null);
  
  const [hovered, setHovered] = useState(false);

  // Random starting position for orbit
  const randomStartAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  const timeRef = useRef(randomStartAngle);

  // Constants
  const radius = scaleMode === 'true' ? planet.trueRadius : planet.visualRadius;
  const distance = scaleMode === 'true' ? planet.trueDistance * 100 : planet.visualDistance; // True distance needs a larger multiplier so they don't overlap with sun
  const orbitalSpeed = planet.orbitalPeriod === 0 ? 0 : (1 / planet.orbitalPeriod) * TIME_SCALE;
  const rotationSpeed = planet.rotationPeriod === 0 ? 0 : (1 / planet.rotationPeriod) * TIME_SCALE;

  // Orbit path visualization
  const orbitPoints = useMemo(() => {
    const points = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * distance, 0, Math.sin(theta) * distance));
    }
    return points;
  }, [distance]);

  useFrame((_, delta) => {
    // Orbital movement
    timeRef.current += delta * orbitalSpeed;
    if (orbitGroupRef.current) {
      orbitGroupRef.current.position.x = Math.cos(timeRef.current) * distance;
      orbitGroupRef.current.position.z = Math.sin(timeRef.current) * distance;
    }
    
    // Axial rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }

    // Hover effect rotation
    if (hoverRef.current) {
      hoverRef.current.rotation.y += delta;
      hoverRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <group>
      {/* Orbit path */}
      {distance > 0 && (
         <Line 
           points={orbitPoints} 
           color={isSelected || hovered ? planet.color : '#ffffff'} 
           opacity={isSelected || hovered ? 0.6 : 0.15} 
           transparent 
           lineWidth={1} 
         />
      )}
      
      {/* Moving Group */}
      <group ref={orbitGroupRef}>
        <mesh 
          ref={meshRef} 
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
          name={planet.id}
        >
          <sphereGeometry args={[radius, 64, 64]} />
          {/*
            NOTE ON TEXTURES:
            To use texture placeholders (like Solar System Scope), you can load them via 'useTexture':
            const texture = useTexture(planet.textureUrl || '/placeholder.jpg');
            And replace 'color={planet.color}' with 'map={texture}' in the materials below.
          */}
          {planet.id === 'sun' ? (
            <meshBasicMaterial color={planet.color} />
          ) : (
            <meshStandardMaterial color={planet.color} roughness={0.7} metalness={0.1} />
          )}
        </mesh>

        {/* Planet Rings */}
        {rings && (
          <mesh rotation={[-Math.PI / 2 + 0.3, 0, 0]}> {/* slight tilt */}
            <ringGeometry args={[rings.innerRadius * (scaleMode === 'visual' ? 1 : 0.5), rings.outerRadius * (scaleMode === 'visual' ? 1 : 0.5), 64]} />
            <meshStandardMaterial color={rings.color} side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
        )}

        {/* Selection/Hover Highlight */}
        {(isSelected || hovered) && (
          <mesh ref={hoverRef}>
            <sphereGeometry args={[radius * 1.15, 32, 32]} />
            <meshBasicMaterial color={planet.color} wireframe transparent opacity={0.3} />
          </mesh>
        )}
      </group>
    </group>
  );
}

// Custom component to handle camera transitions smoothly
function CameraController({ selectedPlanetId, scaleMode }: { selectedPlanetId: string | null; scaleMode: 'visual' | 'true' }) {
  const { camera, scene } = useFrame((state) => {
      // Find the selected planet's group in the scene
      if (selectedPlanetId) {
          const selectedMesh = scene.getObjectByName(selectedPlanetId) as THREE.Mesh;
          if (selectedMesh) {
              const targetPosition = new THREE.Vector3();
              selectedMesh.getWorldPosition(targetPosition);
              
              // Determine distance offset based on planet size
              const planetRadius = selectedMesh.geometry.boundingBox?.max.x || 5; 
              // Add offset for the camera to look at the planet
              const cameraOffset = new THREE.Vector3(planetRadius * 4, planetRadius * 2, planetRadius * 4);
              const desiredCameraPos = targetPosition.clone().add(cameraOffset);

              // Smoothly interpolate camera position and lookAt
              state.camera.position.lerp(desiredCameraPos, 0.05);
              
              // We need to smoothly lerp the OrbitControls target as well, 
              // but since we are handling camera directly when selected, 
              // we can just lookAt directly to ensure strict locking.
              state.camera.lookAt(targetPosition);
          }
      }
  });

  return null;
}

export function SolarSystemScene({ scaleMode, selectedPlanetId, onSelectPlanet }: SceneProps) {
  return (
    <>
      <color attach="background" args={['#020408']} />
      <ambientLight intensity={selectedPlanetId ? 0.8 : 0.1} /> {/* Brighter ambient when focusing to see dark sides */}
      
      {/* Sun Light Source */}
      <pointLight position={[0, 0, 0]} intensity={2000} distance={1000} decay={2} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={500} distance={200} decay={1} color="#ffcc00" /> {/* Inner Warm glow */}

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Controller to take over camera on selection */}
      <CameraController selectedPlanetId={selectedPlanetId} scaleMode={scaleMode} />

      {/* Base controls for manual navigation */}
      <OrbitControls 
        enablePan={!selectedPlanetId}
        enableZoom={!selectedPlanetId} 
        enableRotate={!selectedPlanetId}
        maxDistance={500}
        minDistance={2}
        autoRotate={!selectedPlanetId}
        autoRotateSpeed={0.5}
      />

      <group>
        {PLANETS.map((planet) => (
          <PlanetMesh 
            key={planet.id} 
            planet={planet} 
            scaleMode={scaleMode} 
            isSelected={selectedPlanetId === planet.id}
            onClick={() => onSelectPlanet(planet.id)}
            rings={planet.id === 'saturn' ? RINGS_DATA.saturn : planet.id === 'uranus' ? RINGS_DATA.uranus : undefined}
          />
        ))}
      </group>
    </>
  );
}
