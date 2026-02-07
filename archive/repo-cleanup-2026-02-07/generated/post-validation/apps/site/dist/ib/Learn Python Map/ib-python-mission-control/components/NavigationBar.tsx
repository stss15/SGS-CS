import React from 'react';
import { Radio, Home, ArrowLeft, Rocket } from 'lucide-react';

interface NavigationBarProps {
  onSpeakWithBase: () => void;
  onFinishExploration: () => void;
  onReturnToShip?: () => void;
  showReturnToShip?: boolean;
  colorTheme: string;
  position?: 'left' | 'top';
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onSpeakWithBase,
  onFinishExploration,
  onReturnToShip,
  showReturnToShip = false,
  colorTheme,
  position = 'left'
}) => {
  const isOrange = colorTheme === 'orange';
  const accentClass = isOrange ? 'text-nasa-orange border-nasa-orange hover:bg-nasa-orange/20' : 'text-nasa-teal border-nasa-teal hover:bg-nasa-teal/20';
  const glowClass = isOrange ? 'hover:shadow-[0_0_15px_rgba(204,85,0,0.3)]' : 'hover:shadow-[0_0_15px_rgba(77,139,139,0.3)]';

  if (position === 'top') {
    return (
      <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left side - Speak with Base */}
          <button
            onClick={onSpeakWithBase}
            className={`
              pointer-events-auto flex items-center gap-2 px-4 py-2
              bg-[#0B0D17]/90 backdrop-blur-sm border rounded
              font-mono text-xs uppercase tracking-wider
              transition-all duration-300 ${accentClass} ${glowClass}
            `}
          >
            <Radio size={14} className="animate-pulse" />
            <span className="hidden sm:inline">Speak with Base</span>
          </button>

          {/* Right side - Return & Finish */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {showReturnToShip && onReturnToShip && (
              <button
                onClick={onReturnToShip}
                className={`
                  flex items-center gap-2 px-4 py-2
                  bg-[#0B0D17]/90 backdrop-blur-sm border rounded
                  font-mono text-xs uppercase tracking-wider
                  transition-all duration-300 text-nasa-grey border-nasa-grey/50
                  hover:text-white hover:border-white/50
                `}
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">Return to Ship</span>
              </button>
            )}
            
            <button
              onClick={onFinishExploration}
              className={`
                flex items-center gap-2 px-4 py-2
                bg-[#0B0D17]/90 backdrop-blur-sm border rounded
                font-mono text-xs uppercase tracking-wider
                transition-all duration-300 text-nasa-cream border-nasa-cream/30
                hover:text-white hover:border-white/50 hover:bg-white/10
              `}
            >
              <Home size={14} />
              <span className="hidden sm:inline">Finish Exploration</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Left sidebar position
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] pointer-events-none">
      <div className="flex flex-col gap-3 p-3 pointer-events-auto">
        {/* Speak with Base - Main teleport button */}
        <button
          onClick={onSpeakWithBase}
          className={`
            group relative flex flex-col items-center gap-1 p-3
            bg-[#0B0D17]/95 backdrop-blur-sm border-2 rounded-lg
            transition-all duration-300 ${accentClass} ${glowClass}
          `}
        >
          <div className="relative">
            <Radio size={24} className="animate-pulse" />
            {/* Ping effect */}
            <div 
              className={`absolute inset-0 rounded-full animate-ping opacity-30 ${isOrange ? 'bg-nasa-orange' : 'bg-nasa-teal'}`}
              style={{ animationDuration: '2s' }}
            />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-center leading-tight">
            Contact<br/>Base
          </span>
          
          {/* Tooltip */}
          <div className={`
            absolute left-full ml-2 px-3 py-2 
            bg-black/95 border ${isOrange ? 'border-nasa-orange' : 'border-nasa-teal'} rounded
            opacity-0 group-hover:opacity-100 pointer-events-none
            transition-opacity duration-200 whitespace-nowrap
          `}>
            <span className="text-xs font-mono">Quick Jump to any Level</span>
          </div>
        </button>

        {/* Return to Ship (conditional) */}
        {showReturnToShip && onReturnToShip && (
          <button
            onClick={onReturnToShip}
            className={`
              group relative flex flex-col items-center gap-1 p-3
              bg-[#0B0D17]/95 backdrop-blur-sm border-2 rounded-lg
              transition-all duration-300 text-nasa-grey border-nasa-grey/50
              hover:text-white hover:border-white/50 hover:bg-white/10
            `}
          >
            <Rocket size={24} className="rotate-[-45deg]" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-center leading-tight">
              Return<br/>to Ship
            </span>
          </button>
        )}

        {/* Finish Exploration */}
        <button
          onClick={onFinishExploration}
          className={`
            group relative flex flex-col items-center gap-1 p-3
            bg-[#0B0D17]/95 backdrop-blur-sm border-2 rounded-lg
            transition-all duration-300 text-nasa-cream border-nasa-cream/30
            hover:text-white hover:border-white/50 hover:bg-white/10
          `}
        >
          <Home size={24} />
          <span className="text-[10px] font-mono uppercase tracking-wider text-center leading-tight">
            End<br/>Mission
          </span>
          
          {/* Tooltip */}
          <div className={`
            absolute left-full ml-2 px-3 py-2 
            bg-black/95 border border-nasa-cream/30 rounded
            opacity-0 group-hover:opacity-100 pointer-events-none
            transition-opacity duration-200 whitespace-nowrap
          `}>
            <span className="text-xs font-mono">Return to IB Portal</span>
          </div>
        </button>
      </div>
    </div>
  );
};

