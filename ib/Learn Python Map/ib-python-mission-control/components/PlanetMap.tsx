import React, { useRef, useEffect, useState } from 'react';
import { RetroAstronautFull } from './RetroAstronautFull';
import { Flag, Book, Star, Lock, ChevronRight, Satellite, Radio } from 'lucide-react';

interface PlanetMapProps {
  onNodeClick: (nodeIndex: number) => void;
  currentNode: number;
  completedNodes: number[];
  colorTheme: string;
  totalNodes: number;      // Dynamic total: Base + Challenges + Extraction
  challengeCount: number;  // Number of actual challenges
}

export const PlanetMap: React.FC<PlanetMapProps> = ({ onNodeClick, currentNode, completedNodes, colorTheme, totalNodes, challengeCount }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isOrange = colorTheme === 'orange';
  const nodes = Array.from({ length: totalNodes });
  const [isWalking, setIsWalking] = useState(false);
  const [astronautX, setAstronautX] = useState(currentNode * 220 + 100);
  const [targetX, setTargetX] = useState(currentNode * 220 + 100);
  const [facingRight, setFacingRight] = useState(true);
  
  const astronautVariant = isOrange ? 'orange' : 'white';
  const accentColor = isOrange ? '#CC5500' : '#4D8B8B';
  const accentColorClass = isOrange ? 'text-nasa-orange' : 'text-nasa-teal';
  const bgAccentClass = isOrange ? 'bg-nasa-orange' : 'bg-nasa-teal';
  const borderAccentClass = isOrange ? 'border-nasa-orange' : 'border-nasa-teal';

  // Smooth astronaut movement
  useEffect(() => {
    const newTargetX = currentNode * 220 + 100;
    setTargetX(newTargetX);
    setFacingRight(newTargetX > astronautX);
    setIsWalking(true);
    
    // Animate astronaut position
    const startX = astronautX;
    const distance = newTargetX - startX;
    const duration = Math.abs(distance) * 2; // 2ms per pixel
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentX = startX + distance * eased;
      setAstronautX(currentX);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsWalking(false);
      }
    };
    
    if (distance !== 0) {
      requestAnimationFrame(animate);
    } else {
      setIsWalking(false);
    }

    // Auto-scroll to astronaut position
    if (containerRef.current) {
      const targetScroll = (currentNode * 220) - (window.innerWidth / 2) + 100;
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [currentNode]);

  const getNodeLabel = (index: number) => {
    if (index === 0) return 'MISSION BASE';
    if (index === totalNodes - 1) return 'EXTRACTION';
    return `CHALLENGE ${index}`;
  };

  const getNodeDescription = (index: number) => {
    if (index === 0) return 'Review mission briefing';
    if (index === totalNodes - 1) return 'Mission complete';
    // Generate descriptions dynamically based on position in challenge list
    const progress = index / challengeCount;
    if (progress <= 0.25) return 'Foundation concepts';
    if (progress <= 0.5) return 'Building skills';
    if (progress <= 0.75) return 'Advanced application';
    return 'Mission synthesis';
  };

  const isNodeAccessible = (index: number) => {
    return completedNodes.includes(index) || index === Math.max(...completedNodes) + 1 || index <= Math.max(...completedNodes);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-x-auto overflow-y-hidden"
      style={{ 
        scrollBehavior: 'smooth',
        background: 'linear-gradient(180deg, #0a0a12 0%, #0d0d18 50%, #111118 100%)'
      }}
    >
      <style>{`
        @keyframes beacon-pulse {
          0%, 100% { box-shadow: 0 0 10px ${accentColor}40, 0 0 20px ${accentColor}20; }
          50% { box-shadow: 0 0 20px ${accentColor}60, 0 0 40px ${accentColor}30; }
        }
        @keyframes flag-wave {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes dust-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-5px) translateX(3px); opacity: 0.5; }
        }
        @keyframes satellite-orbit {
          0% { transform: translateX(-50px) translateY(0); }
          50% { transform: translateX(50px) translateY(-20px); }
          100% { transform: translateX(-50px) translateY(0); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Deep space background with stars */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `star-twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Earth on horizon (distant) */}
      <div 
        className="fixed bottom-[25%] right-[5%] w-48 h-48 rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #4a90d9 0%, #1e3a5f 50%, #0a1628 100%)',
          boxShadow: '0 0 60px rgba(74, 144, 217, 0.3), inset -20px -20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Clouds/atmosphere effect */}
        <div className="absolute inset-0 rounded-full opacity-40" style={{
          background: 'radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.3) 0%, transparent 50%)'
        }} />
      </div>

      {/* Orbiting satellite */}
      <div 
        className="fixed top-[15%] right-[20%] pointer-events-none"
        style={{ animation: 'satellite-orbit 20s ease-in-out infinite' }}
      >
        <Satellite size={24} className="text-[#444]" />
      </div>

      {/* Lunar Surface */}
      <div className="absolute bottom-0 left-0 h-[280px] w-[3200px] z-0">
        {/* Base lunar ground */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[200px]"
          style={{
            background: 'linear-gradient(180deg, #2a2a30 0%, #1a1a20 50%, #151518 100%)',
          }}
        />
        
        {/* Horizon glow */}
        <div 
          className="absolute bottom-[180px] left-0 right-0 h-[100px]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(77, 139, 139, 0.05) 100%)',
          }}
        />

        {/* Surface texture line */}
        <div className="absolute bottom-[180px] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#3a3a40] to-transparent" />

        {/* Craters - Various sizes */}
        {[
          { left: 50, size: 80, depth: 0.3 },
          { left: 300, size: 120, depth: 0.4 },
          { left: 600, size: 60, depth: 0.25 },
          { left: 950, size: 200, depth: 0.35 },
          { left: 1300, size: 90, depth: 0.3 },
          { left: 1600, size: 150, depth: 0.4 },
          { left: 2000, size: 70, depth: 0.25 },
          { left: 2300, size: 180, depth: 0.35 },
          { left: 2700, size: 100, depth: 0.3 },
        ].map((crater, i) => (
          <div
            key={i}
            className="absolute rounded-[50%]"
            style={{
              left: `${crater.left}px`,
              bottom: `${20 + Math.random() * 40}px`,
              width: `${crater.size}px`,
              height: `${crater.size * 0.3}px`,
              background: `radial-gradient(ellipse at center, rgba(0,0,0,${crater.depth}) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)`,
            }}
          />
        ))}

        {/* Small rocks and debris */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded bg-[#333]"
            style={{
              left: `${Math.random() * 3000}px`,
              bottom: `${180 + Math.random() * 15}px`,
              width: `${4 + Math.random() * 8}px`,
              height: `${3 + Math.random() * 5}px`,
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
              opacity: 0.6,
            }}
          />
        ))}

        {/* Floating dust particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#555]"
            style={{
              left: `${Math.random() * 3000}px`,
              bottom: `${200 + Math.random() * 80}px`,
              animation: `dust-float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Path connection line */}
      <div className="absolute bottom-[200px] left-[100px] h-[2px] z-10" style={{ width: `${(totalNodes - 1) * 220}px` }}>
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#333] to-transparent" />
        {/* Dashed overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${accentColor}40 0px, ${accentColor}40 20px, transparent 20px, transparent 40px)`,
          }}
        />
      </div>

      {/* Challenge Nodes */}
      <div className="absolute bottom-[160px] left-0 z-20" style={{ width: `${totalNodes * 220 + 200}px` }}>
        {nodes.map((_, index) => {
          const isBase = index === 0;
          const isFlag = index === totalNodes - 1;
          const isCurrent = index === currentNode;
          const isCompleted = completedNodes.includes(index);
          const accessible = isNodeAccessible(index);
          const isFuture = !isCompleted && !isCurrent && !accessible;
          
          const leftPos = index * 220 + 100;

          return (
            <button
              key={index}
              onClick={() => accessible && onNodeClick(index)}
              disabled={!accessible}
              className="absolute transform -translate-x-1/2 group"
              style={{ left: leftPos }}
            >
              {/* Vertical connector */}
              <div className={`absolute left-1/2 -translate-x-1/2 bottom-full h-[30px] w-[2px] ${isCompleted ? bgAccentClass : 'bg-[#333]'}`} />
              
              {/* Node platform */}
              <div className={`
                relative flex flex-col items-center transition-all duration-300
                ${accessible ? 'cursor-pointer' : 'cursor-not-allowed'}
                ${isCurrent ? 'scale-110' : accessible ? 'hover:scale-105' : ''}
              `}>
                {/* Floating label - positioned higher when astronaut is present */}
                <div className={`
                  absolute bottom-full px-3 py-2 rounded bg-[#111]/95 backdrop-blur
                  border transition-all duration-300 whitespace-nowrap z-40
                  ${isCurrent ? `${borderAccentClass} border-2 mb-44` : 'mb-16 border-[#333]'}
                  ${accessible && !isCurrent ? 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0' : 'opacity-100'}
                  ${isFuture ? 'opacity-50' : ''}
                `}>
                  <div className={`font-mono text-xs tracking-wider ${isCurrent ? accentColorClass : 'text-[#888]'}`}>
                    {getNodeLabel(index)}
                  </div>
                  <div className="font-mono text-[10px] text-[#555] mt-1">
                    {getNodeDescription(index)}
                  </div>
                  {/* Arrow pointing down */}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 
                    border-l-[6px] border-r-[6px] border-t-[6px] 
                    border-l-transparent border-r-transparent 
                    ${isCurrent ? 'border-t-nasa-orange' : 'border-t-[#333]'}
                  `} />
                </div>

                {/* Main node circle */}
                <div className={`
                  relative w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-300 border-2
                  ${isCurrent ? `${bgAccentClass} border-white shadow-lg` : ''}
                  ${isCompleted && !isCurrent ? `bg-[#1a1a20] ${borderAccentClass}` : ''}
                  ${isFuture ? 'bg-[#151518] border-[#333] opacity-50' : ''}
                  ${accessible && !isCompleted && !isCurrent ? 'bg-[#1a1a20] border-[#444]' : ''}
                `}
                style={isCurrent ? { animation: 'beacon-pulse 2s infinite' } : {}}
                >
                  {/* Inner ring */}
                  <div className={`
                    absolute inset-2 rounded-full border
                    ${isCurrent ? 'border-white/30' : 'border-[#333]'}
                  `} />

                  {/* Icon */}
                  {isBase ? (
                    <Book size={24} className={isCurrent ? 'text-white' : isCompleted ? accentColorClass : 'text-[#666]'} />
                  ) : isFlag ? (
                    <div style={isCompleted ? { animation: 'flag-wave 2s ease-in-out infinite' } : {}}>
                      <Flag size={24} className={isCurrent ? 'text-white' : isCompleted ? accentColorClass : 'text-[#666]'} />
                    </div>
                  ) : isCompleted ? (
                    <Star size={20} className={`${accentColorClass} fill-current`} />
                  ) : accessible ? (
                    <span className={`font-display font-bold text-lg ${isCurrent ? 'text-white' : 'text-[#888]'}`}>{index}</span>
                  ) : (
                    <Lock size={18} className="text-[#444]" />
                  )}
                </div>

                {/* Status indicator */}
                <div className={`
                  mt-3 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider
                  ${isCurrent ? `${bgAccentClass} text-white` : ''}
                  ${isCompleted && !isCurrent ? `bg-[#222] ${accentColorClass}` : ''}
                  ${isFuture ? 'bg-[#111] text-[#444]' : ''}
                  ${accessible && !isCompleted && !isCurrent ? 'bg-[#1a1a1a] text-[#666]' : ''}
                `}>
                  {isCurrent ? (
                    <span className="flex items-center gap-1">
                      <ChevronRight size={10} className="animate-pulse" /> Active
                    </span>
                  ) : isCompleted ? 'Complete' : accessible ? 'Ready' : 'Locked'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Astronaut */}
      <div 
        className="absolute z-30 pointer-events-none"
        style={{ 
          left: astronautX - 40,
          bottom: '220px',
          transition: 'none', // We handle animation manually
        }}
      >
        <div className={`w-20 h-32 ${!facingRight ? '-scale-x-100' : ''}`}>
          <RetroAstronautFull isWalking={isWalking} variant={astronautVariant} />
        </div>
        
        {/* Astronaut shadow */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-black/40 blur-sm"
        />
      </div>

      {/* HUD Overlay */}
      <div className="fixed top-4 left-4 z-50 bg-[#0a0a0a]/90 backdrop-blur border border-[#333] rounded px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Radio size={12} className="text-green-500 animate-pulse" />
            <span className="font-mono text-xs text-[#666]">EVA ACTIVE</span>
          </div>
          <div className="w-px h-4 bg-[#333]" />
          <div className="font-mono text-xs">
            <span className="text-[#666]">PROGRESS: </span>
            <span className={accentColorClass}>{Math.max(0, completedNodes.length - 1)}/{challengeCount}</span>
          </div>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0a]/80 backdrop-blur border border-[#333] rounded-full px-4 py-2">
        <span className="font-mono text-xs text-[#555]">← Scroll to explore →</span>
      </div>
    </div>
  );
};
