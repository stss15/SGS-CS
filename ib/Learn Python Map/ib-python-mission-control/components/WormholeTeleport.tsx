import React, { useState, useEffect } from 'react';
import { Phase, Level } from '../data/roadmap';
import { Radio, Rocket, X, Zap, Star } from 'lucide-react';

interface WormholeProps {
  isOpen: boolean;
  onClose: () => void;
  phases: Phase[];
  onTeleport: (levelId: number) => void;
  colorTheme: string;
}

export const WormholeTeleport: React.FC<WormholeProps> = ({
  isOpen,
  onClose,
  phases,
  onTeleport,
  colorTheme
}) => {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [isTeleporting, setIsTeleporting] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const isOrange = colorTheme === 'orange';
  const accentColor = isOrange ? '#CC5500' : '#4D8B8B';
  const accentClass = isOrange ? 'text-nasa-orange' : 'text-nasa-teal';
  const borderClass = isOrange ? 'border-nasa-orange' : 'border-nasa-teal';
  const bgGlow = isOrange ? 'shadow-[0_0_60px_rgba(204,85,0,0.3)]' : 'shadow-[0_0_60px_rgba(77,139,139,0.3)]';

  // Generate particles for wormhole effect
  useEffect(() => {
    if (isOpen) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  const handleSelectLevel = (level: Level) => {
    setSelectedLevel(level);
  };

  const handleTeleport = () => {
    if (!selectedLevel) return;
    
    setIsTeleporting(true);
    
    // Trigger teleport after animation
    setTimeout(() => {
      onTeleport(selectedLevel.id);
      setIsTeleporting(false);
      setSelectedLevel(null);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center ${isTeleporting ? 'teleporting' : ''}`}>
      {/* Backdrop with stars being pulled in */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Particle effect - stars being pulled toward center */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `particle-pull 3s ease-in infinite ${particle.delay}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      {/* Wormhole Vortex Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div 
          className="w-[150vmax] h-[150vmax] rounded-full opacity-30"
          style={{
            background: `conic-gradient(from 0deg, ${accentColor}, #1A2B4C, ${accentColor}, #0B0D17, ${accentColor})`,
            animation: 'wormhole-spin 8s linear infinite'
          }}
        />
      </div>
      
      {/* Secondary vortex ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[800px] h-[800px] rounded-full border-4 opacity-20"
          style={{
            borderColor: accentColor,
            animation: 'wormhole-spin 6s linear infinite reverse'
          }}
        />
      </div>

      {/* Inner glow ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className={`w-[600px] h-[600px] rounded-full ${bgGlow}`}
          style={{
            background: `radial-gradient(circle, transparent 40%, ${accentColor}22 60%, transparent 70%)`,
            animation: 'wormhole-pulse 2s ease-in-out infinite'
          }}
        />
      </div>

      {/* Modal Content */}
      <div className={`
        relative z-10 w-full max-w-2xl max-h-[80vh] mx-4
        bg-[#0B0D17]/95 backdrop-blur-md
        border-2 ${borderClass} rounded-lg overflow-hidden
        ${bgGlow}
      `}>
        {/* Header */}
        <div className={`p-4 border-b ${borderClass} bg-[#1A2B4C]/50`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-black/50 ${accentClass}`}>
                <Radio size={20} className="animate-pulse" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg uppercase tracking-widest text-nasa-cream">
                  Contact Base
                </h2>
                <p className="text-xs text-nasa-grey font-mono">
                  /// WORMHOLE TRANSIT SYSTEM ///
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-nasa-grey hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Transmission Header */}
        <div className={`px-4 py-3 bg-black/30 border-b border-white/10 flex items-center gap-2`}>
          <Zap size={14} className={`${accentClass} animate-pulse`} />
          <span className="font-mono text-xs text-nasa-grey uppercase tracking-wider">
            Transmission Received — Select Destination Coordinates
          </span>
        </div>

        {/* Phases & Levels List */}
        <div className="overflow-y-auto max-h-[50vh] p-4 space-y-4 custom-scrollbar">
          {phases.map(phase => (
            <div key={phase.id} className="space-y-2">
              {/* Phase Header */}
              <div className={`flex items-center gap-2 py-2 border-b border-white/10`}>
                <Star size={12} className={accentClass} />
                <span className={`font-mono text-xs uppercase tracking-widest ${accentClass}`}>
                  {phase.title}
                </span>
                {phase.isHLOnly && (
                  <span className="ml-2 px-2 py-0.5 bg-nasa-teal/20 text-nasa-teal text-[10px] font-mono rounded">
                    HL
                  </span>
                )}
              </div>
              
              {/* Levels */}
              <div className="space-y-1 pl-4">
                {phase.levels.map(level => (
                  <button
                    key={level.id}
                    onClick={() => handleSelectLevel(level)}
                    className={`
                      w-full text-left p-3 rounded transition-all duration-200
                      ${selectedLevel?.id === level.id 
                        ? `bg-white/10 border ${borderClass}` 
                        : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`font-mono text-xs ${accentClass} mr-2`}>
                          [{level.syllabus}]
                        </span>
                        <span className="font-bold text-sm text-nasa-cream">
                          {level.title}
                        </span>
                      </div>
                      {selectedLevel?.id === level.id && (
                        <div className={`w-2 h-2 rounded-full bg-current ${accentClass} animate-pulse`} />
                      )}
                    </div>
                    <p className="text-xs text-nasa-grey mt-1 line-clamp-1">
                      {level.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Teleport Button */}
        <div className={`p-4 border-t ${borderClass} bg-[#1A2B4C]/30`}>
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-nasa-grey">
              {selectedLevel ? (
                <span>
                  Target: <span className={accentClass}>{selectedLevel.title}</span>
                </span>
              ) : (
                <span>Select a destination to initiate wormhole transit</span>
              )}
            </div>
            <button
              onClick={handleTeleport}
              disabled={!selectedLevel || isTeleporting}
              className={`
                flex items-center gap-2 px-6 py-2 rounded
                font-mono text-sm uppercase tracking-wider
                transition-all duration-300
                ${selectedLevel 
                  ? `${isOrange ? 'bg-nasa-orange hover:bg-nasa-orange/80' : 'bg-nasa-teal hover:bg-nasa-teal/80'} text-white` 
                  : 'bg-white/10 text-nasa-grey cursor-not-allowed'
                }
                ${isTeleporting ? 'animate-pulse' : ''}
              `}
            >
              <Rocket size={16} className={isTeleporting ? 'animate-spin' : ''} />
              {isTeleporting ? 'Teleporting...' : 'Initiate Transit'}
            </button>
          </div>
        </div>
      </div>

      {/* Teleport Flash Effect */}
      {isTeleporting && (
        <div 
          className="fixed inset-0 z-[300] pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`,
            animation: 'teleport-flash 0.8s ease-out forwards'
          }}
        />
      )}
    </div>
  );
};

