import React from 'react';

interface SpaceObstacleProps {
  index: number;
  variant: 'planet' | 'alien' | 'asteroid' | 'ufo';
  side: 'left' | 'right';
}

export const SpaceObstacle: React.FC<SpaceObstacleProps> = ({ index, variant, side }) => {
  // Deterministic "random" logic
  const rotation = (index * 45) % 30 - 15; // -15 to 15 deg tilt
  const scale = 0.8 + ((index * 3) % 5) / 10; // 0.8 to 1.3
  
  // Position slightly off-center to sit in the "void" left by the winding path
  // If side is left, we want it on the left (approx 10-20%), if right approx 80-90%
  const horizontalPos = side === 'left' ? '15%' : '85%';
  
  const style: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: side === 'left' ? '10%' : 'auto',
    right: side === 'right' ? '10%' : 'auto',
    transform: `translateY(-50%) rotate(${rotation}deg) scale(${scale})`,
    zIndex: 0, // Behind the UI nodes but visible
    pointerEvents: 'none',
  };

  const renderShape = () => {
    switch (variant) {
      case 'planet':
        return (
          <div className="animate-pulse duration-[4000ms]">
            <svg width="140" height="140" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" className="fill-nasa-blue/20 stroke-nasa-teal stroke-[3]" />
              <path d="M 10 50 Q 50 85 90 50" className="stroke-nasa-orange stroke-[3] fill-none" />
              <path d="M 15 45 Q 50 80 85 45" className="stroke-nasa-orange stroke-[3] opacity-50 fill-none" />
              <circle cx="75" cy="35" r="6" className="fill-nasa-cream" />
              <circle cx="25" cy="65" r="4" className="fill-nasa-teal" />
            </svg>
          </div>
        );
      case 'alien':
        return (
          <div className="animate-bounce duration-[3000ms]">
             <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
               {/* Body */}
               <path d="M 20 80 Q 50 100 80 80 L 70 30 Q 50 10 30 30 Z" className="fill-nasa-teal/20 stroke-nasa-teal stroke-[3]" />
               {/* Eyes */}
               <circle cx="35" cy="50" r="8" className="fill-white" />
               <circle cx="65" cy="50" r="8" className="fill-white" />
               <circle cx="35" cy="50" r="3" className="fill-nasa-black" />
               <circle cx="65" cy="50" r="3" className="fill-nasa-black" />
               {/* Antenna */}
               <line x1="50" y1="20" x2="50" y2="5" className="stroke-nasa-teal stroke-[3]" />
               <circle cx="50" cy="5" r="4" className="fill-nasa-orange" />
             </svg>
          </div>
        );
      case 'asteroid':
        return (
          <div className="animate-pulse duration-[5000ms]">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <path d="M 20 30 L 40 10 L 80 20 L 90 60 L 60 90 L 10 70 Z" className="fill-nasa-grey/20 stroke-nasa-grey stroke-[3]" />
              <circle cx="30" cy="40" r="5" className="fill-nasa-black/30" />
              <circle cx="60" cy="60" r="8" className="fill-nasa-black/30" />
              <circle cx="70" cy="30" r="4" className="fill-nasa-black/30" />
            </svg>
          </div>
        );
      case 'ufo':
        return (
           <div className="animate-pulse duration-[2000ms]">
             <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
               {/* Dome */}
               <path d="M 40 40 Q 60 10 80 40" className="fill-nasa-blue/30 stroke-nasa-blue stroke-[3]" />
               {/* Saucer */}
               <ellipse cx="60" cy="40" rx="50" ry="15" className="fill-nasa-orange/20 stroke-nasa-orange stroke-[3]" />
               {/* Lights */}
               <circle cx="25" cy="40" r="3" className="fill-white animate-ping" />
               <circle cx="60" cy="45" r="3" className="fill-white animate-ping" style={{ animationDelay: '0.5s'}} />
               <circle cx="95" cy="40" r="3" className="fill-white animate-ping" style={{ animationDelay: '1s'}} />
             </svg>
           </div>
        );
    }
  };

  return <div style={style}>{renderShape()}</div>;
};