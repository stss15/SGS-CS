import React from 'react';

interface RetroAstronautProps {
  className?: string;
  variant?: 'orange' | 'white';
}

export const RetroAstronaut: React.FC<RetroAstronautProps> = ({ className, variant = 'orange' }) => {
  // Color schemes
  const colors = {
    orange: {
      suit: '#CC5500',
      suitLight: '#E86A1C',
      suitDark: '#993300',
      accent: '#F0EAD6',
      visor: '#1A2B4C',
    },
    white: {
      suit: '#E8E8E8',
      suitLight: '#FFFFFF',
      suitDark: '#CCCCCC',
      accent: '#4D8B8B',
      visor: '#1A2B4C',
    }
  };

  const c = colors[variant];

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`miniSuitGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.suitLight} />
          <stop offset="50%" stopColor={c.suit} />
          <stop offset="100%" stopColor={c.suitDark} />
        </linearGradient>
        <linearGradient id={`miniVisorGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a3f5f" />
          <stop offset="100%" stopColor={c.visor} />
        </linearGradient>
        <radialGradient id={`miniGlow-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c.suit} stopOpacity="0.3" />
          <stop offset="100%" stopColor={c.suit} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <circle cx="50" cy="50" r="45" fill={`url(#miniGlow-${variant})`} />
      
      {/* Backpack */}
      <rect x="22" y="50" width="12" height="30" rx="3" fill="#D0D0D0" stroke="#888" strokeWidth="1.5" />
      <rect x="24" y="54" width="8" height="4" fill="#999" />
      <rect x="24" y="60" width="8" height="2" fill="#888" />
      <rect x="24" y="64" width="8" height="2" fill="#888" />

      {/* Suit body */}
      <path 
        d="M 35 52 Q 35 48 50 48 Q 65 48 65 52 L 68 78 Q 68 88 50 88 Q 32 88 32 78 Z" 
        fill={`url(#miniSuitGrad-${variant})`} 
        stroke="#333" 
        strokeWidth="1.5" 
      />
      
      {/* Chest panel */}
      <rect x="42" y="56" width="16" height="14" rx="2" fill="#E8E8E8" stroke="#666" strokeWidth="1" />
      <circle cx="46" cy="63" r="2" fill="#CC0000" />
      <circle cx="54" cy="63" r="2" fill="#00AA00" />
      
      {/* Neck ring */}
      <ellipse cx="50" cy="48" rx="10" ry="3" fill="#888" stroke="#666" strokeWidth="1" />

      {/* Helmet */}
      <ellipse cx="50" cy="32" rx="20" ry="18" fill={c.accent} stroke="#888" strokeWidth="2" />
      
      {/* Visor frame */}
      <path 
        d="M 37 28 Q 37 18 50 15 Q 63 18 63 28 Q 63 40 50 43 Q 37 40 37 28 Z" 
        fill="#333" 
        stroke="#222" 
        strokeWidth="1.5" 
      />
      
      {/* Visor glass */}
      <path 
        d="M 39 28 Q 39 20 50 17 Q 61 20 61 28 Q 61 38 50 41 Q 39 38 39 28 Z" 
        fill={`url(#miniVisorGrad-${variant})`} 
      />
      
      {/* Visor reflection */}
      <path 
        d="M 42 24 Q 44 20 50 19" 
        fill="none" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Arms */}
      <ellipse cx="28" cy="65" rx="6" ry="10" fill={`url(#miniSuitGrad-${variant})`} stroke="#333" strokeWidth="1.5" />
      <ellipse cx="72" cy="65" rx="6" ry="10" fill={`url(#miniSuitGrad-${variant})`} stroke="#333" strokeWidth="1.5" />
      
      {/* Gloves */}
      <circle cx="28" cy="76" r="5" fill="#FFF" stroke="#333" strokeWidth="1" />
      <circle cx="72" cy="76" r="5" fill="#FFF" stroke="#333" strokeWidth="1" />

      {/* Belt */}
      <rect x="36" y="76" width="28" height="4" rx="1" fill="#666" stroke="#444" strokeWidth="0.5" />
    </svg>
  );
};
