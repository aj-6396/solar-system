import React from 'react';
import { PlanetData } from '../data/planets';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Activity, Info, Lightbulb } from 'lucide-react';
import { cn } from '../lib/utils';

interface UIProps {
  selectedPlanet: PlanetData | null;
  onClose: () => void;
  scaleMode: 'visual' | 'true';
  onScaleModeChange: (mode: 'visual' | 'true') => void;
}

export const OverlayUI: React.FC<UIProps> = ({ selectedPlanet, onClose, scaleMode, onScaleModeChange }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
      {/* Header */}
      <header className="p-6 flex justify-between items-start pointer-events-auto">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight neon-text">Solar System Odyssey</h1>
          <p className="text-gray-400 mt-2 font-medium tracking-wide">Interactive Cosmic Explorer</p>
        </div>
      </header>

      {/* Scale Mode Toggle */}
      <div className="absolute bottom-8 left-8 pointer-events-auto glass-panel rounded-full p-1 flex shadow-lg">
        <button
          onClick={() => onScaleModeChange('visual')}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
            scaleMode === 'visual' ? "bg-blue-600/80 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]" : "text-gray-400 hover:text-white"
          )}
        >
          Visual Scale
        </button>
        <button
          onClick={() => onScaleModeChange('true')}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
            scaleMode === 'true' ? "bg-purple-600/80 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]" : "text-gray-400 hover:text-white"
          )}
          title="Warning: True scale makes planet sizes very small compared to distances."
        >
          True Scale
        </button>
      </div>

      {/* Side Panel for Selected Planet */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full max-w-md glass-panel border-l border-white/10 p-6 pointer-events-auto overflow-y-auto scrollbar-hide shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-display font-bold" style={{ color: selectedPlanet.color, textShadow: `0 0 20px ${selectedPlanet.color}80` }}>
                  {selectedPlanet.name}
                </h2>
                <span className="inline-block px-3 py-1 mt-2 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  {selectedPlanet.type}
                </span>
              </div>
              <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 text-lg font-light">
              {selectedPlanet.description}
            </p>

            <div className="space-y-8">
              {/* Did You Know? */}
              {selectedPlanet.didYouKnow && (
                <section>
                  <div className="p-4 rounded-xl relative overflow-hidden group border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 rounded-l-xl"></div>
                    <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" /> Did You Know?
                    </h3>
                    <p className="text-amber-100 text-sm leading-relaxed">
                      {selectedPlanet.didYouKnow}
                    </p>
                  </div>
                </section>
              )}

              {/* Quick Facts */}
              <section>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Quick Facts
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FactCard label="Mass" value={selectedPlanet.facts.mass} />
                  <FactCard label="Known Moons" value={selectedPlanet.facts.moons.toString()} />
                  <FactCard label="Avg Temp" value={selectedPlanet.facts.avgTemp} />
                  <FactCard label="Orbital Period" value={`${selectedPlanet.orbitalPeriod} Years`} />
                </div>
              </section>

              {/* Compare to Earth */}
              <section>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Compare to Earth
                </h3>
                <div className="space-y-4">
                  <CompareBar label="Size (Radius)" ratio={selectedPlanet.compareEarth.sizeRatio} format={v => `${v}x`} />
                  <CompareBar label="Gravity" ratio={selectedPlanet.compareEarth.gravityRatio} format={v => `${v} G`} />
                  <CompareBar label="Day Length" ratio={selectedPlanet.compareEarth.dayLengthRatio} format={v => `${v} Days`} />
                </div>
              </section>

              {/* Timeline */}
              {selectedPlanet.timeline.length > 0 && (
                <section className="pb-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Major Missions
                  </h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                    {selectedPlanet.timeline.map((item, idx) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-[#0f141e] group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:shadow-[0_0_10px_2px_rgba(59,130,246,0.6)] transition-all ml-[2px] md:mx-auto shadow shrink-0 z-10" />
                        <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                          <div className="text-xs font-bold text-blue-400 mb-1">{item.year}</div>
                          <div className="text-sm text-gray-300">{item.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

const FactCard = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
    <div className="text-xs text-gray-400 font-medium mb-1">{label}</div>
    <div className="text-lg font-semibold text-white">{value}</div>
  </div>
);

const CompareBar = ({ label, ratio, format }: { label: string; ratio: number; format: (n: number) => string }) => {
  // Normalize ratio for visual display (logarithmic-ish so huge/tiny values are readable)
  const displayPercentage = Math.min(Math.max((Math.log10(ratio) + 2) / 4 * 100, 5), 100);
  
  return (
    <div>
      <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
        <span>{label}</span>
        <span className="text-white">{format(ratio)}</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${displayPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
        />
      </div>
    </div>
  )
};
