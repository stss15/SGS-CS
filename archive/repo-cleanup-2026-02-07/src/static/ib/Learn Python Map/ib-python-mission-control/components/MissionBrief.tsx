import React from 'react';
import { Level } from '../data/roadmap';
import { Terminal, Crosshair, FileText, AlertTriangle, Rocket, X } from 'lucide-react';

interface MissionBriefProps {
  level: Level;
  onAccept: () => void;
  onCancel: () => void;
  colorTheme: string;
}

export const MissionBrief: React.FC<MissionBriefProps> = ({ level, onAccept, onCancel, colorTheme }) => {
  const isOrange = colorTheme === 'orange';
  const accentColor = isOrange ? '#CC5500' : '#4D8B8B';
  const accentColorClass = isOrange ? 'text-nasa-orange' : 'text-nasa-teal';
  const borderColorClass = isOrange ? 'border-nasa-orange' : 'border-nasa-teal';
  const bgAccentClass = isOrange ? 'bg-nasa-orange' : 'bg-nasa-teal';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <style>{`
        @keyframes modal-in {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes scanline-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes status-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes corner-blink {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-lg bg-[#0a0a0a] border-2 overflow-hidden"
        style={{ 
          borderColor: accentColor,
          animation: 'modal-in 0.3s ease-out',
          boxShadow: `0 0 60px ${accentColor}30, inset 0 0 30px rgba(0,0,0,0.5)`
        }}
      >
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div 
            className="absolute left-0 right-0 h-[2px] bg-white"
            style={{ animation: 'scanline-move 4s linear infinite' }}
          />
        </div>

        {/* Corner decorations */}
        <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${borderColorClass}`} style={{ animation: 'corner-blink 2s infinite' }} />
        <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${borderColorClass}`} style={{ animation: 'corner-blink 2s infinite', animationDelay: '0.5s' }} />
        <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${borderColorClass}`} style={{ animation: 'corner-blink 2s infinite', animationDelay: '1s' }} />
        <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${borderColorClass}`} style={{ animation: 'corner-blink 2s infinite', animationDelay: '1.5s' }} />

        {/* Header */}
        <div className={`relative p-4 border-b ${borderColorClass}/30 bg-gradient-to-r from-black via-transparent to-black`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${bgAccentClass}/20 rounded`}>
                <FileText size={18} className={accentColorClass} />
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#666] tracking-widest uppercase">
                  Classification: Training
                </div>
                <div className="font-mono text-sm tracking-wider text-white">
                  MISSION BRIEF
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-mono text-xs text-[#555]">
                DOC-{String(level.id).padStart(3, '0')}
              </div>
              <button 
                onClick={onCancel}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X size={18} className="text-[#666] hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Mission designation */}
          <div className="mb-6">
            <div className="font-mono text-[10px] text-[#555] tracking-widest uppercase mb-2">
              Mission Designation
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white uppercase tracking-wide leading-tight">
              {level.title}
            </h2>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#111] border border-[#222] rounded p-3">
              <div className="font-mono text-[10px] text-[#555] uppercase tracking-wider mb-1">
                Syllabus Ref
              </div>
              <div className={`font-mono text-sm ${accentColorClass}`}>
                {level.syllabus}
              </div>
            </div>
            <div className="bg-[#111] border border-[#222] rounded p-3">
              <div className="font-mono text-[10px] text-[#555] uppercase tracking-wider mb-1">
                Mission ID
              </div>
              <div className="font-mono text-sm text-white">
                PY-{new Date().getFullYear()}-{String(level.id).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Objective */}
          <div className={`bg-[#0d0d0d] border-l-4 ${borderColorClass} p-4 mb-6`}>
            <div className="font-mono text-[10px] text-[#555] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Terminal size={12} />
              Mission Objective
            </div>
            <p className="font-mono text-sm text-[#AAA] leading-relaxed">
              "{level.description}"
            </p>
          </div>

          {/* Tasks preview */}
          {level.tasks && level.tasks.length > 0 && (
            <div className="mb-6">
              <div className="font-mono text-[10px] text-[#555] uppercase tracking-wider mb-3">
                Primary Objectives ({level.tasks.length})
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                {level.tasks.slice(0, 4).map((task, idx) => (
                  <div 
                    key={task.id}
                    className="flex items-start gap-3 text-xs font-mono"
                  >
                    <div className={`w-5 h-5 rounded border ${borderColorClass}/50 flex items-center justify-center shrink-0 mt-0.5`}>
                      <span className={`${accentColorClass} text-[10px]`}>{idx + 1}</span>
                    </div>
                    <span className="text-[#888]">{task.text}</span>
                  </div>
                ))}
                {level.tasks.length > 4 && (
                  <div className="text-[#555] text-xs font-mono pl-8">
                    + {level.tasks.length - 4} more objectives...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Warning notice */}
          <div className="bg-[#1a1500] border border-[#332200] rounded p-3 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-yellow-600 shrink-0 mt-0.5" />
              <div className="font-mono text-xs text-yellow-600/80">
                Ensure all prerequisites are complete before initiating this mission sequence.
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button 
              onClick={onAccept}
              className={`
                w-full py-4 ${bgAccentClass} text-white font-display font-bold text-lg 
                tracking-widest uppercase transition-all duration-300
                hover:brightness-110 hover:shadow-lg
                flex items-center justify-center gap-3
              `}
              style={{ boxShadow: `0 0 20px ${accentColor}40` }}
            >
              <Rocket size={20} />
              Initiate Launch Sequence
            </button>
            
            <button 
              onClick={onCancel}
              className="w-full py-2 text-[#666] font-mono text-xs hover:text-white transition-colors uppercase tracking-wider"
            >
              Return to Mission Control
            </button>
          </div>
        </div>

        {/* Footer status bar */}
        <div className={`px-4 py-2 border-t ${borderColorClass}/20 bg-black/50`}>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" style={{ animation: 'status-pulse 2s infinite' }} />
              <span className="text-green-500">SYSTEM READY</span>
            </div>
            <div className="text-[#444]">
              v2.7.1 // SECURE CHANNEL
            </div>
          </div>
        </div>

        {/* Crosshair decorations */}
        <Crosshair className={`absolute top-12 right-3 opacity-20 ${accentColorClass}`} size={14} />
        <Crosshair className={`absolute bottom-12 left-3 opacity-20 ${accentColorClass}`} size={14} />
      </div>
    </div>
  );
};
