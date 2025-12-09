import React, { useEffect, useState } from 'react';
import { Rocket, Box, BrainCircuit, Radio, Gauge, Cpu, ArrowLeft } from 'lucide-react';

interface HomeScreenProps {
  onSelectPathway: (pathway: 'SL' | 'HL') => void;
  onBackToIB?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectPathway, onBackToIB }) => {
  const [bootSequence, setBootSequence] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Boot sequence animation
  useEffect(() => {
    const timers = [
      setTimeout(() => setBootSequence(1), 300),
      setTimeout(() => setBootSequence(2), 600),
      setTimeout(() => setBootSequence(3), 900),
      setTimeout(() => setBootSequence(4), 1200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // Clock update
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <style>{`
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          97% { opacity: 0.9; }
          98% { opacity: 1; }
        }
        @keyframes type-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(204, 85, 0, 0.3), inset 0 0 20px rgba(0,0,0,0.5); }
          50% { box-shadow: 0 0 40px rgba(204, 85, 0, 0.5), inset 0 0 20px rgba(0,0,0,0.5); }
        }
        @keyframes status-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes boot-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .crt-screen {
          animation: flicker 5s infinite;
        }
        .boot-line {
          animation: boot-in 0.3s ease-out forwards;
        }
      `}</style>

      {/* CRT Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
        <div 
          className="absolute left-0 right-0 h-[2px] bg-white"
          style={{ animation: 'scan-line 8s linear infinite' }}
        />
      </div>

      {/* Main Terminal Container */}
      <div className="w-full max-w-5xl mx-auto relative">
        
        {/* Terminal Header Bar */}
        <div className="bg-[#1a1a1a] border-2 border-b-0 border-[#333] rounded-t-lg px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-xs text-[#666] hidden sm:block">MISSION_CONTROL_v2.7.1</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="text-[#666]">{formatDate(currentTime)}</span>
            <span className="text-nasa-orange tabular-nums">{formatTime(currentTime)} UTC</span>
          </div>
        </div>

        {/* Main Screen */}
        <div className="bg-[#0a0c10] border-2 border-[#333] rounded-b-lg crt-screen relative overflow-hidden">
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#CC5500]/5 to-transparent pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 p-6 md:p-10">
            
            {/* Top Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#222]">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Radio size={14} className="text-green-500" style={{ animation: 'status-blink 1s infinite' }} />
                  <span className="font-mono text-xs text-green-500">LINK ESTABLISHED</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge size={14} className="text-nasa-orange" />
                  <span className="font-mono text-xs text-[#666]">SYS: <span className="text-white">NOMINAL</span></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-nasa-teal" />
                <span className="font-mono text-xs text-[#666]">EDU-CORE: <span className="text-nasa-teal">ACTIVE</span></span>
              </div>
            </div>

            {/* Hero Section */}
            <div className={`mb-12 ${bootSequence >= 1 ? 'boot-line' : 'opacity-0'}`}>
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Logo/Icon */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-nasa-orange/50 bg-[#111] flex items-center justify-center relative" style={{ animation: 'glow-pulse 3s infinite' }}>
                    <Rocket size={48} className="text-nasa-orange md:w-16 md:h-16" />
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-nasa-orange" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-nasa-orange" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-nasa-orange" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-nasa-orange" />
                  </div>
                </div>

                {/* Title Block */}
                <div className="flex-1">
                  <div className="font-mono text-xs text-[#555] mb-2 tracking-widest">
                    {'>'} INITIALIZING MISSION PARAMETERS...
                  </div>
                  <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-none mb-3">
                    PYTHON<br/>
                    <span className="text-nasa-orange">MISSION</span>
                  </h1>
                  <div className="h-px w-full bg-gradient-to-r from-nasa-orange via-nasa-orange/50 to-transparent mb-4" />
                  <p className="font-mono text-sm md:text-base text-[#888] tracking-wide">
                    IB COMPUTER SCIENCE <span className="text-nasa-orange mx-2">//</span> CURRICULUM 2027
                  </p>
                </div>
              </div>
            </div>

            {/* Boot messages */}
            <div className={`mb-8 font-mono text-xs space-y-1 ${bootSequence >= 2 ? 'boot-line' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
              <div className="text-green-500">✓ Syllabus mapping loaded (B2, B3, B4)</div>
              <div className="text-green-500">✓ Challenge protocols initialized</div>
              <div className="text-[#666]">{'>'} Select mission profile to continue<span className="inline-block w-2 h-4 bg-nasa-orange ml-1" style={{ animation: 'type-cursor 1s infinite' }} /></div>
            </div>

            {/* Mission Selection Cards */}
            <div className={`grid md:grid-cols-2 gap-6 ${bootSequence >= 3 ? 'boot-line' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              
              {/* SL Card */}
              <button 
                onClick={() => onSelectPathway('SL')}
                className="group relative bg-[#0d0d0d] border border-[#333] hover:border-nasa-orange p-6 text-left transition-all duration-300 hover:bg-[#111] overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-nasa-orange/0 to-nasa-orange/0 group-hover:from-nasa-orange/10 group-hover:to-transparent transition-all duration-300" />
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-nasa-orange border-l-[40px] border-l-transparent" />
                
                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-nasa-orange/20 border border-nasa-orange/50 px-3 py-1 mb-4">
                    <Box size={14} className="text-nasa-orange" />
                    <span className="font-mono text-xs text-nasa-orange tracking-wider">STANDARD PAYLOAD</span>
                  </div>

                  <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2 group-hover:text-nasa-orange transition-colors">
                    Standard Level
                  </h2>
                  
                  <p className="font-mono text-xs text-[#777] mb-6 leading-relaxed">
                    Core mastery of procedural programming, data structures, algorithms, and OOP fundamentals.
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-nasa-orange" />
                      <span className="text-[#666]">PHASES: <span className="text-white">1-4</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-nasa-orange" />
                      <span className="text-[#666]">LEVELS: <span className="text-white">1-13</span></span>
                    </div>
                  </div>

                  {/* Launch indicator */}
                  <div className="mt-6 pt-4 border-t border-[#222] flex items-center justify-between">
                    <span className="font-mono text-xs text-[#555]">READY FOR LAUNCH</span>
                    <div className="flex items-center gap-2 text-nasa-orange group-hover:translate-x-2 transition-transform">
                      <span className="font-mono text-xs">INITIATE</span>
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </div>
              </button>

              {/* HL Card */}
              <button 
                onClick={() => onSelectPathway('HL')}
                className="group relative bg-[#0d0d0d] border border-[#333] hover:border-nasa-teal p-6 text-left transition-all duration-300 hover:bg-[#111] overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-nasa-teal/0 to-nasa-teal/0 group-hover:from-nasa-teal/10 group-hover:to-transparent transition-all duration-300" />
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-nasa-teal border-l-[40px] border-l-transparent" />
                
                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-nasa-teal/20 border border-nasa-teal/50 px-3 py-1 mb-4">
                    <BrainCircuit size={14} className="text-nasa-teal" />
                    <span className="font-mono text-xs text-nasa-teal tracking-wider">HEAVY LIFT</span>
                  </div>

                  <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2 group-hover:text-nasa-teal transition-colors">
                    Higher Level
                  </h2>
                  
                  <p className="font-mono text-xs text-[#777] mb-6 leading-relaxed">
                    Advanced mission: recursive algorithms, inheritance, abstract data types, and complex structures.
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-nasa-teal" />
                      <span className="text-[#666]">PHASES: <span className="text-white">5-7</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-nasa-teal" />
                      <span className="text-[#666]">LEVELS: <span className="text-white">14-18</span></span>
                    </div>
                  </div>

                  {/* Launch indicator */}
                  <div className="mt-6 pt-4 border-t border-[#222] flex items-center justify-between">
                    <span className="font-mono text-xs text-[#555]">READY FOR LAUNCH</span>
                    <div className="flex items-center gap-2 text-nasa-teal group-hover:translate-x-2 transition-transform">
                      <span className="font-mono text-xs">INITIATE</span>
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className={`mt-10 pt-6 border-t border-[#222] flex flex-wrap items-center justify-between gap-4 ${bootSequence >= 4 ? 'boot-line' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="font-mono text-xs text-[#444]">
                {'>'} SGS COMPUTER SCIENCE DEPARTMENT
              </div>
              <div className="flex items-center gap-4">
                {onBackToIB && (
                  <button 
                    onClick={onBackToIB}
                    className="flex items-center gap-2 px-4 py-2 border border-[#333] hover:border-nasa-orange text-[#666] hover:text-nasa-orange font-mono text-xs transition-all duration-200 group"
                  >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    <span>END MISSION</span>
                  </button>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-xs text-[#666]">ALL SYSTEMS GO</span>
                </div>
              </div>
            </div>
          </div>

          {/* CRT edge shadow */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
        </div>

        {/* Monitor stand effect */}
        <div className="mx-auto w-32 h-4 bg-gradient-to-b from-[#222] to-[#111] rounded-b-lg" />
        <div className="mx-auto w-48 h-2 bg-[#1a1a1a] rounded-b" />
      </div>
    </div>
  );
};
