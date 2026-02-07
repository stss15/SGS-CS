import React, { useEffect, useState, useRef } from 'react';

interface CountdownProps {
  onComplete: () => void;
  colorTheme: string;
}

export const Countdown: React.FC<CountdownProps> = ({ onComplete, colorTheme }) => {
  const [count, setCount] = useState(3);
  const [phase, setPhase] = useState<'COUNTDOWN' | 'IGNITION' | 'LAUNCH' | 'FADE'>('COUNTDOWN');
  const [screenShake, setScreenShake] = useState(false);
  const sequenceStarted = useRef(false);

  // Countdown timer
  useEffect(() => {
    if (phase === 'COUNTDOWN' && count > 0) {
      const timer = setTimeout(() => setCount(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, phase]);

  // Full launch sequence - triggered once when countdown reaches zero
  useEffect(() => {
    if (count === 0 && !sequenceStarted.current) {
      sequenceStarted.current = true;
      
      // Start ignition immediately
      setPhase('IGNITION');
      setScreenShake(true);
      
      // Launch after 1.5s
      const launchTimer = setTimeout(() => {
        setPhase('LAUNCH');
      }, 1500);

      // Fade after 3s
      const fadeTimer = setTimeout(() => {
        setPhase('FADE');
      }, 3000);

      // Complete after 4s
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 4000);

      // Only cleanup on unmount
      return () => {
        clearTimeout(launchTimer);
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [count, onComplete]);

  const isOrange = colorTheme === 'orange';
  const accentColor = isOrange ? '#CC5500' : '#4D8B8B';
  const textColorClass = isOrange ? 'text-nasa-orange' : 'text-nasa-teal';

  return (
    <div className={`fixed inset-0 z-[60] overflow-hidden ${screenShake ? 'animate-shake' : ''}`}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2px, -1px) rotate(-0.5deg); }
          20% { transform: translate(2px, -2px) rotate(0.5deg); }
          30% { transform: translate(-3px, 1px) rotate(0deg); }
          40% { transform: translate(3px, 2px) rotate(0.5deg); }
          50% { transform: translate(-2px, -1px) rotate(-0.5deg); }
          60% { transform: translate(2px, 1px) rotate(0deg); }
          70% { transform: translate(-3px, -2px) rotate(-0.5deg); }
          80% { transform: translate(2px, 2px) rotate(0.5deg); }
          90% { transform: translate(-2px, -1px) rotate(0deg); }
        }
        @keyframes flame-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          25% { transform: scaleY(1.1) scaleX(0.95); }
          50% { transform: scaleY(0.95) scaleX(1.05); }
          75% { transform: scaleY(1.05) scaleX(0.98); }
        }
        @keyframes flame-grow {
          0% { transform: scaleY(0.3) scaleX(0.8); opacity: 0.5; }
          50% { transform: scaleY(1.5) scaleX(1.2); opacity: 1; }
          100% { transform: scaleY(2.5) scaleX(1.5); opacity: 1; }
        }
        @keyframes smoke-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          100% { transform: translateY(-200px) scale(3); opacity: 0; }
        }
        @keyframes rocket-launch {
          0% { transform: translateY(0); }
          100% { transform: translateY(-150vh); }
        }
        @keyframes gantry-retract {
          0% { transform: translateX(0) rotate(0deg); }
          100% { transform: translateX(-100px) rotate(-30deg); }
        }
        @keyframes countdown-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes status-blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.4; }
        }
        @keyframes exhaust-spread {
          0% { transform: scaleX(1); }
          100% { transform: scaleX(4); }
        }
        .animate-shake { animation: shake 0.15s linear infinite; }
        .flame-idle { animation: flame-flicker 0.1s linear infinite; }
        .flame-ignition { animation: flame-grow 1.5s ease-out forwards; }
      `}</style>

      {/* Background - Launch pad night sky */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a0a12 0%, #141428 40%, #1a1a30 100%)',
        }}
      />

      {/* Stars (subtle) */}
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Launch Pad Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#2a2a2a] z-10">
        {/* Pad details */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-48 h-8 bg-[#333] rounded-t" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-32 h-4 bg-[#444]" />
      </div>

      {/* Countdown Display - Top Center (Separated from rocket) */}
      {phase === 'COUNTDOWN' && (
        <div className="absolute top-8 left-0 right-0 flex flex-col items-center z-50">
          {/* Retro display frame */}
          <div className="bg-[#0a0a0a] border-4 border-[#333] rounded-lg p-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
            {/* Status light row */}
            <div className="flex justify-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full bg-green-500 ${count <= 3 ? 'animate-pulse' : ''}`} />
              <div className={`w-3 h-3 rounded-full ${count <= 2 ? 'bg-yellow-500 animate-pulse' : 'bg-yellow-900'}`} />
              <div className={`w-3 h-3 rounded-full ${count <= 1 ? 'bg-red-500 animate-pulse' : 'bg-red-900'}`} />
            </div>
            
            {/* Main countdown number */}
            <div 
              className={`font-display font-bold text-[8rem] md:text-[12rem] leading-none tabular-nums ${textColorClass}`}
              style={{
                textShadow: `0 0 30px ${accentColor}40, 0 0 60px ${accentColor}20`,
                animation: 'countdown-pulse 1s ease-in-out infinite',
              }}
            >
              {count}
            </div>
            
            {/* Label */}
            <div className="text-center mt-4">
              <span className="font-mono text-sm md:text-base tracking-[0.5em] text-[#666] uppercase">
                T-Minus
              </span>
            </div>
          </div>

          {/* Status text below */}
          <div className="mt-6 font-mono text-xs tracking-[0.3em] text-[#888] uppercase" style={{ animation: 'status-blink 2s infinite' }}>
            ● Ignition Sequence Active
          </div>
        </div>
      )}

      {/* Ignition text */}
      {phase === 'IGNITION' && (
        <div className="absolute top-8 left-0 right-0 flex flex-col items-center z-50">
          <div className="bg-[#0a0a0a] border-4 border-[#CC5500] rounded-lg px-12 py-6 shadow-[0_0_30px_rgba(204,85,0,0.3)]">
            <div className="font-display font-bold text-4xl md:text-6xl text-nasa-orange tracking-wider uppercase animate-pulse">
              Ignition
            </div>
          </div>
        </div>
      )}

      {/* Launch text */}
      {phase === 'LAUNCH' && (
        <div className="absolute top-8 left-0 right-0 flex flex-col items-center z-50">
          <div className="bg-[#0a0a0a] border-4 border-white rounded-lg px-12 py-6">
            <div className="font-display font-bold text-4xl md:text-6xl text-white tracking-wider uppercase">
              Liftoff!
            </div>
          </div>
        </div>
      )}

      {/* Rocket Assembly */}
      <div 
        className="absolute left-1/2 bottom-16 z-20"
        style={{
          transform: `translateX(-50%) ${phase === 'LAUNCH' ? '' : ''}`,
          animation: phase === 'LAUNCH' ? 'rocket-launch 2s ease-in forwards' : 'none',
        }}
      >
        {/* Saturn V Style Rocket */}
        <svg 
          width="120" 
          height="380" 
          viewBox="0 0 120 380" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Exhaust/Flames - Behind rocket */}
          <g 
            className={`origin-top ${phase === 'COUNTDOWN' ? '' : phase === 'IGNITION' ? 'flame-ignition' : ''}`}
            style={{ transformOrigin: '60px 360px' }}
          >
            {/* Outer flame glow */}
            <ellipse cx="60" cy="420" rx="40" ry="80" fill="url(#flameGradientOuter)" className="blur-md" 
              style={{ opacity: phase === 'COUNTDOWN' ? 0 : 1 }}
            />
            
            {/* Core flames */}
            {phase !== 'COUNTDOWN' && (
              <>
                <path 
                  d="M 35 360 Q 20 420 30 480 Q 60 520 90 480 Q 100 420 85 360" 
                  fill="url(#flameGradient)"
                  className="flame-idle"
                />
                <path 
                  d="M 45 360 Q 35 400 45 450 Q 60 480 75 450 Q 85 400 75 360" 
                  fill="url(#flameGradientInner)"
                  className="flame-idle"
                  style={{ animationDelay: '0.05s' }}
                />
                <path 
                  d="M 52 360 Q 48 390 55 420 Q 60 440 65 420 Q 72 390 68 360" 
                  fill="#fff"
                  className="flame-idle"
                  style={{ animationDelay: '0.02s', opacity: 0.9 }}
                />
              </>
            )}

            {/* Smoke particles */}
            {(phase === 'IGNITION' || phase === 'LAUNCH') && (
              <>
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={i}
                    cx={40 + Math.random() * 40}
                    cy="380"
                    r={15 + Math.random() * 20}
                    fill="#888"
                    style={{
                      animation: `smoke-rise ${1.5 + Math.random()}s ease-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                      opacity: 0.4,
                    }}
                  />
                ))}
              </>
            )}
          </g>

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="flameGradient" x1="60" y1="360" x2="60" y2="500" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF6600" />
              <stop offset="40%" stopColor="#FF3300" />
              <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flameGradientInner" x1="60" y1="360" x2="60" y2="480" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFF00" />
              <stop offset="50%" stopColor="#FF9900" />
              <stop offset="100%" stopColor="#FF3300" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flameGradientOuter" x1="60" y1="380" x2="60" y2="500" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF6600" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="bodyGradient" x1="30" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e8e8e8" />
              <stop offset="30%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d0d0d0" />
            </linearGradient>
            <linearGradient id="stage2Gradient" x1="30" y1="0" x2="90" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f0f0f0" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e0e0e0" />
            </linearGradient>
          </defs>

          {/* ===== ROCKET BODY ===== */}
          
          {/* Stage 1 - First Stage (Bottom, widest) */}
          <rect x="30" y="280" width="60" height="80" fill="url(#bodyGradient)" stroke="#666" strokeWidth="1" />
          {/* Stage 1 black band */}
          <rect x="30" y="280" width="60" height="15" fill="#1a1a1a" />
          {/* USA text */}
          <text x="60" y="340" textAnchor="middle" fill="#1a1a1a" fontSize="8" fontFamily="Arial" fontWeight="bold">USA</text>
          
          {/* Engine bells */}
          <ellipse cx="40" cy="360" rx="8" ry="4" fill="#333" />
          <ellipse cx="60" cy="360" rx="8" ry="4" fill="#333" />
          <ellipse cx="80" cy="360" rx="8" ry="4" fill="#333" />
          <rect x="36" y="355" width="8" height="5" fill="#444" />
          <rect x="56" y="355" width="8" height="5" fill="#444" />
          <rect x="76" y="355" width="8" height="5" fill="#444" />
          
          {/* Stabilizer fins */}
          <path d="M 30 340 L 15 360 L 30 360 Z" fill="#1a1a1a" />
          <path d="M 90 340 L 105 360 L 90 360 Z" fill="#1a1a1a" />
          
          {/* Inter-stage ring */}
          <rect x="28" y="275" width="64" height="8" fill="#333" rx="1" />

          {/* Stage 2 - Second Stage */}
          <rect x="32" y="180" width="56" height="95" fill="url(#stage2Gradient)" stroke="#666" strokeWidth="1" />
          {/* Stage 2 black bands */}
          <rect x="32" y="180" width="56" height="10" fill="#1a1a1a" />
          <rect x="32" y="230" width="56" height="5" fill={accentColor} />
          
          {/* Inter-stage ring 2 */}
          <rect x="30" y="175" width="60" height="8" fill="#444" rx="1" />

          {/* Stage 3 - Service Module */}
          <rect x="35" y="100" width="50" height="75" fill="url(#bodyGradient)" stroke="#666" strokeWidth="1" />
          <rect x="35" y="100" width="50" height="8" fill="#1a1a1a" />
          {/* Flag detail */}
          <rect x="45" y="120" width="30" height="20" fill="none" stroke="#ccc" strokeWidth="0.5" />
          <rect x="45" y="120" width="12" height="10" fill="#1a3c6e" />
          {[...Array(3)].map((_, i) => (
            <rect key={i} x="45" y={130 + i * 3.3} width="30" height="3.3" fill={i % 2 === 0 ? '#b31942' : '#fff'} />
          ))}
          
          {/* Adapter ring */}
          <path d="M 35 100 L 40 90 L 80 90 L 85 100 Z" fill="#555" />

          {/* Command Module */}
          <path d="M 40 90 L 45 60 L 75 60 L 80 90 Z" fill="#fff" stroke="#666" strokeWidth="1" />
          <rect x="45" y="70" width="30" height="5" fill={accentColor} opacity="0.8" />

          {/* Launch Escape System (needle on top) */}
          <path d="M 55 60 L 60 10 L 65 60 Z" fill="#cc0000" stroke="#990000" strokeWidth="0.5" />
          <rect x="50" y="55" width="20" height="8" fill="#333" />
          {/* LES lattice */}
          <line x1="52" y1="55" x2="58" y2="30" stroke="#333" strokeWidth="1" />
          <line x1="68" y1="55" x2="62" y2="30" stroke="#333" strokeWidth="1" />
        </svg>

        {/* Gantry arm (retracts on launch) */}
        <div 
          className="absolute right-[-60px] bottom-[100px] w-[80px] h-[8px] bg-gradient-to-r from-[#444] to-[#666] origin-left"
          style={{
            animation: phase === 'IGNITION' || phase === 'LAUNCH' ? 'gantry-retract 1s ease-in forwards' : 'none',
          }}
        >
          <div className="absolute right-0 top-[-10px] w-[20px] h-[28px] bg-[#555] rounded" />
        </div>
      </div>

      {/* Exhaust cloud spreading on pad */}
      {(phase === 'IGNITION' || phase === 'LAUNCH') && (
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[60px] bg-gradient-to-t from-[#666] to-transparent rounded-full blur-xl z-10"
          style={{
            animation: 'exhaust-spread 2s ease-out forwards',
            opacity: 0.5,
          }}
        />
      )}

      {/* Mission info strip - Bottom */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30">
        <div className="bg-black/60 backdrop-blur border border-[#333] px-6 py-2 flex items-center gap-6 font-mono text-xs text-[#888]">
          <span>MISSION: <span className={textColorClass}>PYTHON-{colorTheme === 'orange' ? 'SL' : 'HL'}</span></span>
          <span className="text-[#444]">|</span>
          <span>VEHICLE: <span className="text-white">SATURN-EDU</span></span>
          <span className="text-[#444]">|</span>
          <span className={`${phase !== 'COUNTDOWN' ? 'text-green-500' : 'text-yellow-500'}`}>
            ● {phase === 'COUNTDOWN' ? 'STANDBY' : phase === 'IGNITION' ? 'IGNITION' : phase === 'LAUNCH' ? 'ASCENT' : 'TRANSIT'}
          </span>
        </div>
      </div>

      {/* Fade to black */}
      <div 
        className={`absolute inset-0 bg-black pointer-events-none z-[100] transition-opacity duration-1000 ${phase === 'FADE' ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
