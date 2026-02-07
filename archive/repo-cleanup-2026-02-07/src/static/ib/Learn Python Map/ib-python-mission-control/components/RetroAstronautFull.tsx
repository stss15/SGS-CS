import React from 'react';

interface RetroAstronautFullProps {
  className?: string;
  isWalking?: boolean;
  direction?: 'left' | 'right';
  variant?: 'orange' | 'white';
}

export const RetroAstronautFull: React.FC<RetroAstronautFullProps> = ({ 
  className, 
  isWalking = false, 
  direction = 'right',
  variant = 'orange'
}) => {
  // Color schemes for different variants
  const colors = {
    orange: {
      suit: '#CC5500',
      suitLight: '#E86A1C',
      suitDark: '#993300',
      accent: '#F0EAD6',
      visor: '#1A2B4C',
      backpack: '#E8E8E8',
      boots: '#444444',
    },
    white: {
      suit: '#E8E8E8',
      suitLight: '#FFFFFF',
      suitDark: '#CCCCCC',
      accent: '#4D8B8B',
      visor: '#1A2B4C',
      backpack: '#D0D0D0',
      boots: '#333333',
    }
  };
  
  const c = colors[variant];
  
  return (
    <div className={`${className || ''} ${direction === 'left' ? '-scale-x-100' : ''}`}>
      <svg 
        viewBox="0 0 100 140" 
        className="w-full h-full overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* CSS Animations - Lunar bounce walk style */}
        <style>{`
          /* Lunar walk - bouncy, low gravity feel */
          @keyframes lunar-bounce {
            0%, 100% { transform: translateY(0); }
            30% { transform: translateY(-8px); }
            60% { transform: translateY(-3px); }
          }
          @keyframes lunar-leg-left {
            0%, 100% { transform: rotate(0deg) translateY(0); }
            25% { transform: rotate(25deg) translateY(-4px); }
            50% { transform: rotate(0deg) translateY(0); }
            75% { transform: rotate(-20deg) translateY(-2px); }
          }
          @keyframes lunar-leg-right {
            0%, 100% { transform: rotate(0deg) translateY(0); }
            25% { transform: rotate(-20deg) translateY(-2px); }
            50% { transform: rotate(0deg) translateY(0); }
            75% { transform: rotate(25deg) translateY(-4px); }
          }
          @keyframes lunar-arm-left {
            0%, 100% { transform: rotate(10deg); }
            50% { transform: rotate(-15deg); }
          }
          @keyframes lunar-arm-right {
            0%, 100% { transform: rotate(-10deg); }
            50% { transform: rotate(15deg); }
          }
          @keyframes helmet-bob {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            30% { transform: translateY(-3px) rotate(-2deg); }
            60% { transform: translateY(-1px) rotate(1deg); }
          }
          @keyframes visor-glint {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.7; }
          }
          @keyframes backpack-sway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(2deg); }
          }
          
          .walking .body-main { animation: lunar-bounce 0.8s ease-in-out infinite; }
          .walking .leg-left { animation: lunar-leg-left 0.8s ease-in-out infinite; transform-origin: 40px 85px; }
          .walking .leg-right { animation: lunar-leg-right 0.8s ease-in-out infinite; transform-origin: 60px 85px; }
          .walking .arm-left { animation: lunar-arm-left 0.8s ease-in-out infinite; transform-origin: 35px 55px; }
          .walking .arm-right { animation: lunar-arm-right 0.8s ease-in-out infinite; transform-origin: 65px 55px; }
          .walking .helmet { animation: helmet-bob 0.8s ease-in-out infinite; }
          .walking .backpack { animation: backpack-sway 0.8s ease-in-out infinite; transform-origin: 50px 60px; }
          .walking .visor-glint { animation: visor-glint 0.8s ease-in-out infinite; }
          
          /* Idle breathing animation */
          @keyframes idle-breathe {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(1.02); }
          }
          .idle .body-main { animation: idle-breathe 3s ease-in-out infinite; transform-origin: 50px 70px; }
        `}</style>

        <defs>
          {/* Gradients for depth */}
          <linearGradient id={`suitGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.suitLight} />
            <stop offset="50%" stopColor={c.suit} />
            <stop offset="100%" stopColor={c.suitDark} />
          </linearGradient>
          <linearGradient id={`helmetGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor={c.accent} />
            <stop offset="100%" stopColor="#CCCCCC" />
          </linearGradient>
          <linearGradient id={`visorGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a3f5f" />
            <stop offset="50%" stopColor={c.visor} />
            <stop offset="100%" stopColor="#0d1520" />
          </linearGradient>
          <radialGradient id={`visorReflect-${variant}`} cx="30%" cy="30%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3"/>
          </filter>
        </defs>

        <g className={isWalking ? 'walking' : 'idle'}>
          
          {/* === BACK LAYERS === */}
          
          {/* Back arm */}
          <g className="arm-left">
            {/* Upper arm */}
            <rect x="22" y="52" width="14" height="22" rx="7" fill={c.suit} stroke="#333" strokeWidth="1.5" />
            {/* Elbow joint */}
            <circle cx="29" cy="72" r="5" fill={c.suitDark} stroke="#333" strokeWidth="1" />
            {/* Lower arm */}
            <rect x="24" y="70" width="10" height="18" rx="5" fill={c.suit} stroke="#333" strokeWidth="1.5" />
            {/* Glove */}
            <ellipse cx="29" cy="90" rx="7" ry="6" fill="#FFF" stroke="#333" strokeWidth="1.5" />
            {/* Glove detail */}
            <path d="M 25 88 Q 29 92 33 88" stroke="#DDD" strokeWidth="1" fill="none" />
          </g>

          {/* Back leg */}
          <g className="leg-left">
            {/* Thigh */}
            <rect x="32" y="82" width="14" height="24" rx="5" fill={c.suit} stroke="#333" strokeWidth="1.5" />
            {/* Knee joint */}
            <ellipse cx="39" cy="104" rx="6" ry="5" fill={c.suitDark} stroke="#333" strokeWidth="1" />
            {/* Lower leg */}
            <rect x="33" y="102" width="12" height="22" rx="4" fill={c.suit} stroke="#333" strokeWidth="1.5" />
            {/* Boot */}
            <path d="M 30 122 L 30 132 Q 30 136 34 136 L 48 136 Q 52 136 52 132 L 52 126 L 45 124 L 45 122 Z" 
                  fill={c.boots} stroke="#222" strokeWidth="1.5" />
            {/* Boot tread */}
            <rect x="32" y="134" width="18" height="2" fill="#222" />
          </g>

          {/* === MAIN BODY GROUP === */}
          <g className="body-main">
            
            {/* Backpack (PLSS) */}
            <g className="backpack">
              <rect x="20" y="48" width="18" height="38" rx="3" fill={c.backpack} stroke="#666" strokeWidth="1.5" />
              {/* Backpack details */}
              <rect x="22" y="52" width="14" height="8" rx="1" fill="#CCC" stroke="#999" strokeWidth="0.5" />
              <rect x="22" y="62" width="14" height="3" fill="#999" />
              <rect x="22" y="68" width="14" height="3" fill="#999" />
              <rect x="22" y="74" width="14" height="3" fill="#999" />
              {/* Oxygen hose connection */}
              <circle cx="38" cy="55" r="3" fill="#666" stroke="#444" strokeWidth="1" />
              {/* Control unit */}
              <rect x="24" y="80" width="10" height="4" rx="1" fill="#444" />
            </g>

            {/* Torso */}
            <path 
              d="M 35 50 Q 35 45 50 45 Q 65 45 65 50 L 68 85 Q 68 95 50 95 Q 32 95 32 85 Z" 
              fill={`url(#suitGradient-${variant})`} 
              stroke="#333" 
              strokeWidth="1.5" 
            />
            
            {/* Chest control panel */}
            <rect x="40" y="55" width="20" height="18" rx="2" fill="#E8E8E8" stroke="#666" strokeWidth="1" />
            {/* Panel details */}
            <rect x="42" y="57" width="16" height="3" fill="#222" />
            <circle cx="45" cy="64" r="2" fill="#CC0000" />
            <circle cx="51" cy="64" r="2" fill="#00AA00" />
            <circle cx="57" cy="64" r="2" fill="#0066CC" />
            <rect x="42" y="68" width="16" height="2" fill="#333" />

            {/* Neck ring */}
            <ellipse cx="50" cy="45" rx="12" ry="4" fill="#888" stroke="#666" strokeWidth="1" />

            {/* === HELMET === */}
            <g className="helmet">
              {/* Helmet base */}
              <ellipse cx="50" cy="30" rx="22" ry="20" fill={`url(#helmetGradient-${variant})`} stroke="#888" strokeWidth="2" />
              
              {/* Helmet ring detail */}
              <ellipse cx="50" cy="42" rx="18" ry="5" fill="none" stroke="#999" strokeWidth="1.5" />
              
              {/* Visor frame */}
              <path 
                d="M 35 25 Q 35 15 50 12 Q 65 15 65 25 Q 65 40 50 44 Q 35 40 35 25 Z" 
                fill="#333" 
                stroke="#222" 
                strokeWidth="1.5" 
              />
              
              {/* Visor glass */}
              <path 
                d="M 37 26 Q 37 18 50 15 Q 63 18 63 26 Q 63 38 50 41 Q 37 38 37 26 Z" 
                fill={`url(#visorGradient-${variant})`} 
              />
              
              {/* Visor reflection */}
              <path 
                d="M 40 22 Q 42 18 50 17 Q 52 18 52 22" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round"
                opacity="0.5"
                className="visor-glint"
              />
              
              {/* Sun visor (gold) */}
              <path 
                d="M 35 20 Q 35 12 50 10 Q 56 11 58 14" 
                fill="none" 
                stroke="#DAA520" 
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
              
              {/* Communication equipment */}
              <rect x="65" y="25" width="5" height="10" rx="2" fill="#444" stroke="#333" strokeWidth="0.5" />
              <circle cx="68" cy="22" r="2" fill="#666" />
            </g>

            {/* Belt */}
            <rect x="34" y="82" width="32" height="6" rx="1" fill="#666" stroke="#444" strokeWidth="1" />
            {/* Belt buckle */}
            <rect x="46" y="82" width="8" height="6" fill="#888" stroke="#666" strokeWidth="0.5" />

          </g>

          {/* === FRONT LAYERS === */}
          
          {/* Front leg */}
          <g className="leg-right">
            {/* Thigh */}
            <rect x="54" y="82" width="14" height="24" rx="5" fill={`url(#suitGradient-${variant})`} stroke="#333" strokeWidth="1.5" />
            {/* Knee joint */}
            <ellipse cx="61" cy="104" rx="6" ry="5" fill={c.suitDark} stroke="#333" strokeWidth="1" />
            {/* Lower leg */}
            <rect x="55" y="102" width="12" height="22" rx="4" fill={`url(#suitGradient-${variant})`} stroke="#333" strokeWidth="1.5" />
            {/* Boot */}
            <path d="M 48 122 L 48 132 Q 48 136 52 136 L 66 136 Q 70 136 70 132 L 70 126 L 67 124 L 67 122 Z" 
                  fill={c.boots} stroke="#222" strokeWidth="1.5" />
            {/* Boot tread */}
            <rect x="50" y="134" width="18" height="2" fill="#222" />
            {/* Boot detail */}
            <rect x="50" y="128" width="16" height="2" fill="#555" />
          </g>

          {/* Front arm */}
          <g className="arm-right">
            {/* Upper arm */}
            <rect x="64" y="52" width="14" height="22" rx="7" fill={`url(#suitGradient-${variant})`} stroke="#333" strokeWidth="1.5" />
            {/* Suit stripe */}
            <rect x="66" y="55" width="2" height="16" fill={c.accent} />
            {/* Elbow joint */}
            <circle cx="71" cy="72" r="5" fill={c.suitDark} stroke="#333" strokeWidth="1" />
            {/* Lower arm */}
            <rect x="66" y="70" width="10" height="18" rx="5" fill={`url(#suitGradient-${variant})`} stroke="#333" strokeWidth="1.5" />
            {/* Glove */}
            <ellipse cx="71" cy="90" rx="7" ry="6" fill="#FFF" stroke="#333" strokeWidth="1.5" />
            {/* Glove wrist band */}
            <rect x="65" y="85" width="12" height="3" rx="1" fill="#888" stroke="#666" strokeWidth="0.5" />
          </g>

        </g>
      </svg>
    </div>
  );
};
