import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PLANETS, PlanetData } from './data/planets';
import { OverlayUI } from './components/OverlayUI';
import { SolarSystemScene } from './components/Scene';

export default function App() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);
  const [scaleMode, setScaleMode] = useState<'visual' | 'true'>('visual');

  const selectedPlanet = PLANETS.find(p => p.id === selectedPlanetId) || null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans selection:bg-blue-500/30">
      {/* UI Overlay */}
      <OverlayUI 
        selectedPlanet={selectedPlanet} 
        onClose={() => setSelectedPlanetId(null)} 
        scaleMode={scaleMode}
        onScaleModeChange={setScaleMode}
      />

      {/* 3D Canvas Context */}
      <Canvas 
        camera={{ position: [0, 80, 150], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]} // Support high-DPI displays safely
      >
        <SolarSystemScene 
          scaleMode={scaleMode} 
          selectedPlanetId={selectedPlanetId} 
          onSelectPlanet={setSelectedPlanetId} 
        />
      </Canvas>
    </div>
  );
}
