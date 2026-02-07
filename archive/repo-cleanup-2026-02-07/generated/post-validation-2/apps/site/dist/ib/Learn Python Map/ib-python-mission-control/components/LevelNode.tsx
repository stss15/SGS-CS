import React from 'react';
import { Level } from '../data/roadmap';
import { RetroAstronaut } from './RetroAstronaut';
import { Star, Lock, ChevronRight, Rocket, Zap } from 'lucide-react';

interface LevelNodeProps {
  level: Level;
  isCurrent: boolean;
  isLocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
  index: number;
  colorTheme: 'orange' | 'teal';
}

export const LevelNode: React.FC<LevelNodeProps> = ({ 
  level, 
  isCurrent,
  isLocked, 
  isCompleted, 
  onClick,
  index,
  colorTheme
}) => {
  // Create winding path layout
  const positionCycle = index % 4;
  
  let containerJustify = 'justify-center';
  let labelSide: 'left' | 'right' = 'left';
  
  if (positionCycle === 1) {
    containerJustify = 'justify-end md:pr-24';
    labelSide = 'left';
  } else if (positionCycle === 3) {
    containerJustify = 'justify-start md:pl-24';
    labelSide = 'right';
  }
  if (positionCycle === 0) labelSide = 'right';
  if (positionCycle === 2) labelSide = 'left';

  const isOrange = colorTheme === 'orange';
  const accentColor = isOrange ? '#CC5500' : '#4D8B8B';
  const accentColorClass = isOrange ? 'text-nasa-orange' : 'text-nasa-teal';
  const borderColorClass = isOrange ? 'border-nasa-orange' : 'border-nasa-teal';
  const bgAccentClass = isOrange ? 'bg-nasa-orange' : 'bg-nasa-teal';
  const astronautVariant = isOrange ? 'orange' : 'white';

  return (
    <div className={`relative flex items-center w-full mb-24 md:mb-32 ${containerJustify}`}>
      <style>{`
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 20px ${accentColor}40, 0 0 40px ${accentColor}20, inset 0 0 20px rgba(0,0,0,0.3); }
          50% { box-shadow: 0 0 30px ${accentColor}60, 0 0 60px ${accentColor}30, inset 0 0 20px rgba(0,0,0,0.3); }
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes ring-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes astronaut-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      {/* Vertical connector line */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-24 md:h-32 -top-24 md:-top-32 ${index === 0 ? 'hidden' : ''}`}
        style={{
          background: isCompleted || isCurrent 
            ? `linear-gradient(180deg, ${accentColor}60 0%, ${accentColor} 100%)`
            : 'linear-gradient(180deg, #333 0%, #444 100%)'
        }}
      />

      <button 
        onClick={onClick}
        disabled={isLocked}
        className={`
          group relative flex items-center gap-4 md:gap-6 p-3 md:p-4 transition-all duration-300
          ${isCurrent ? 'scale-105 md:scale-110' : isLocked ? '' : 'hover:scale-105'}
          focus:outline-none disabled:cursor-not-allowed
          ${labelSide === 'left' ? 'flex-row-reverse' : 'flex-row'}
        `}
      >
        {/* Label Card */}
        {!isLocked && (
          <div className={`
            hidden md:block absolute top-1/2 -translate-y-1/2 w-56 lg:w-64
            ${labelSide === 'left' ? 'right-full mr-6' : 'left-full ml-6'}
          `}>
            <div className={`
              relative bg-[#0a0a0a]/95 backdrop-blur border rounded-lg p-4 
              transition-all duration-300
              ${isCurrent ? `${borderColorClass} border-2 shadow-lg` : 'border-[#333] group-hover:border-[#555]'}
            `}>
              {/* Corner accents */}
              <div className={`absolute top-0 ${labelSide === 'left' ? 'right-0 rounded-tr-lg' : 'left-0 rounded-tl-lg'} w-8 h-1 ${isCompleted ? bgAccentClass : 'bg-[#333]'}`} />
              
              {/* Status badge */}
              <div className={`
                inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider mb-2
                ${isCurrent ? `${bgAccentClass} text-white` : isCompleted ? `bg-[#222] ${accentColorClass}` : 'bg-[#1a1a1a] text-[#666]'}
              `}>
                {isCurrent ? (
                  <>
                    <Zap size={10} />
                    Active Mission
                  </>
                ) : isCompleted ? (
                  <>
                    <Star size={10} className="fill-current" />
                    Complete
                  </>
                ) : 'Ready'}
              </div>

              {/* Title */}
              <h3 className={`
                font-display font-bold text-lg uppercase tracking-wide leading-tight mb-1
                ${isCurrent ? 'text-white' : isCompleted ? accentColorClass : 'text-[#AAA]'}
                transition-colors group-hover:text-white
              `}>
                {level.title}
              </h3>

              {/* Syllabus reference */}
              <div className="font-mono text-xs text-[#666] mb-2">
                {level.syllabus}
              </div>

              {/* Description */}
              <p className="font-mono text-xs text-[#888] leading-relaxed line-clamp-2">
                {level.description}
              </p>

              {/* Arrow indicator */}
              {isCurrent && (
                <div className={`
                  absolute top-1/2 -translate-y-1/2 
                  ${labelSide === 'left' ? '-right-6 rotate-180' : '-left-6'}
                `}>
                  <ChevronRight size={20} className={accentColorClass} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* === MISSION BADGE === */}
        <div className="relative">
          {/* Outer rotating ring (for current level) */}
          {isCurrent && (
            <div 
              className="absolute -inset-3 rounded-full border border-dashed opacity-50"
              style={{ 
                borderColor: accentColor,
                animation: 'ring-rotate 20s linear infinite'
              }}
            />
          )}

          {/* Main badge */}
          <div 
            className={`
              relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden
              transition-all duration-500
              ${isLocked ? 'opacity-40 grayscale' : ''}
            `}
            style={isCurrent ? { 
              animation: 'badge-glow 3s ease-in-out infinite, badge-float 4s ease-in-out infinite'
            } : {}}
          >
            {/* Background layers */}
            <div className={`
              absolute inset-0 rounded-full
              ${isCurrent ? '' : isCompleted ? 'bg-[#0a0a0a]' : 'bg-[#111]'}
            `}
            style={isCurrent ? {
              background: `radial-gradient(circle at 30% 30%, ${accentColor}40 0%, #0a0a0a 70%)`
            } : {}}
            />

            {/* Border ring */}
            <div className={`
              absolute inset-0 rounded-full border-4
              ${isCurrent ? `${borderColorClass}` : isCompleted ? `${borderColorClass} opacity-60` : 'border-[#333]'}
            `} />

            {/* Inner ring */}
            <div className={`
              absolute inset-2 rounded-full border-2
              ${isCurrent ? 'border-white/30' : isCompleted ? 'border-white/10' : 'border-[#222]'}
            `} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Mission number */}
              <span className={`
                font-display font-bold text-2xl md:text-3xl
                ${isCurrent ? 'text-white' : isCompleted ? accentColorClass : 'text-[#555]'}
              `}>
                {String(level.id).padStart(2, '0')}
              </span>

              {/* Mini icon */}
              <div className="mt-0.5">
                {isCompleted ? (
                  <Star size={12} className={`${accentColorClass} fill-current`} />
                ) : isCurrent ? (
                  <Rocket size={12} className="text-white" />
                ) : (
                  <Lock size={10} className="text-[#444]" />
                )}
              </div>
            </div>

            {/* Highlight arc */}
            <div 
              className="absolute top-1 left-1/4 w-1/2 h-1/4 rounded-full opacity-20"
              style={{
                background: 'linear-gradient(180deg, white 0%, transparent 100%)'
              }}
            />
          </div>

          {/* Astronaut indicator - Only on current level */}
          {isCurrent && (
            <div 
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-14 h-14 z-30"
              style={{ animation: 'astronaut-bounce 2s ease-in-out infinite' }}
            >
              <RetroAstronaut variant={astronautVariant} />
            </div>
          )}

          {/* Status pip */}
          <div className={`
            absolute -bottom-1 left-1/2 -translate-x-1/2 
            px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider
            border
            ${isCurrent ? `${bgAccentClass} text-white border-white/20` : ''}
            ${isCompleted && !isCurrent ? `bg-[#0a0a0a] ${accentColorClass} ${borderColorClass}` : ''}
            ${isLocked ? 'bg-[#111] text-[#444] border-[#333]' : ''}
            ${!isCompleted && !isCurrent && !isLocked ? 'bg-[#0a0a0a] text-[#666] border-[#333]' : ''}
          `}>
            {isCurrent ? 'GO' : isCompleted ? '✓' : isLocked ? '—' : 'RDY'}
          </div>
        </div>

        {/* Mobile label */}
        {!isLocked && (
          <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-8 w-48">
            <div className={`
              text-center bg-[#0a0a0a]/95 backdrop-blur p-3 rounded-lg border
              ${isCurrent ? `${borderColorClass}` : 'border-[#333]'}
            `}>
              <div className={`font-display font-bold text-sm uppercase ${isCurrent ? 'text-white' : accentColorClass}`}>
                {level.title}
              </div>
              <div className="font-mono text-xs text-[#666] mt-1">
                {level.syllabus}
              </div>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};
