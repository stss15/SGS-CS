import React, { useMemo, useEffect, useState } from 'react';

export const StarField: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  
  // Track scroll for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Layer 1: Distant stars (slow parallax)
  const distantStars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 300}%`,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      twinkleDelay: `${Math.random() * 8}s`,
      twinkleDuration: `${Math.random() * 3 + 4}s`,
    }));
  }, []);

  // Layer 2: Mid-field stars
  const midStars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 300}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleDelay: `${Math.random() * 5}s`,
      twinkleDuration: `${Math.random() * 2 + 2}s`,
    }));
  }, []);

  // Layer 3: Nearby bright stars with glow
  const nearStars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 300}%`,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.3 + 0.6,
      hue: Math.random() > 0.7 ? (Math.random() > 0.5 ? 30 : 180) : 0, // Some warm, some cool
      twinkleDelay: `${Math.random() * 3}s`,
    }));
  }, []);

  // Shooting stars data
  const shootingStars = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 50,
      delay: i * 8 + Math.random() * 5,
      duration: Math.random() * 0.5 + 0.5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Inline Styles */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--base-opacity); transform: scale(1); }
          50% { opacity: calc(var(--base-opacity) * 0.3); transform: scale(0.8); }
        }
        @keyframes twinkle-bright {
          0%, 100% { opacity: var(--base-opacity); filter: blur(0px); }
          50% { opacity: calc(var(--base-opacity) * 1.3); filter: blur(1px); }
        }
        @keyframes nebula-drift {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(20px, -10px) rotate(2deg) scale(1.02); }
          66% { transform: translate(-10px, 15px) rotate(-1deg) scale(0.98); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }
        @keyframes nebula-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(200px) translateY(200px); opacity: 0; }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .star-distant { animation: twinkle var(--twinkle-duration) ease-in-out infinite; }
        .star-mid { animation: twinkle var(--twinkle-duration) ease-in-out infinite; }
        .star-near { animation: twinkle-bright 3s ease-in-out infinite; }
      `}</style>

      {/* Base gradient - Deep space void */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `
            radial-gradient(ellipse 150% 100% at 20% 100%, #0d1b2a 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 80% 0%, #1b263b 0%, transparent 40%),
            linear-gradient(180deg, #0a0a0f 0%, #0d1117 50%, #0f1419 100%)
          `
        }}
      />

      {/* Nebula Layer 1 - Deep blue cloud */}
      <div 
        className="fixed top-[-20%] left-[-10%] w-[80vw] h-[80vh] opacity-30 pointer-events-none"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(26, 43, 76, 0.8) 0%, rgba(26, 43, 76, 0.2) 40%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'nebula-drift 45s ease-in-out infinite',
          transform: `translateY(${scrollY * 0.02}px)`,
        }}
      />

      {/* Nebula Layer 2 - Warm orange/amber glow (NASA accent) */}
      <div 
        className="fixed top-[30%] right-[-15%] w-[70vw] h-[70vh] pointer-events-none"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(204, 85, 0, 0.15) 0%, rgba(180, 70, 0, 0.05) 30%, transparent 60%)',
          filter: 'blur(80px)',
          animation: 'nebula-pulse 20s ease-in-out infinite, nebula-drift 50s ease-in-out infinite reverse',
          transform: `translateY(${scrollY * 0.03}px)`,
        }}
      />

      {/* Nebula Layer 3 - Teal accent (instrument panel color) */}
      <div 
        className="fixed bottom-[-10%] left-[20%] w-[60vw] h-[60vh] pointer-events-none"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(77, 139, 139, 0.2) 0%, rgba(77, 139, 139, 0.05) 35%, transparent 60%)',
          filter: 'blur(70px)',
          animation: 'nebula-drift 40s ease-in-out infinite',
          animationDelay: '-20s',
          transform: `translateY(${scrollY * 0.015}px)`,
        }}
      />

      {/* Distant Stars Layer (slowest parallax) */}
      <div 
        className="absolute inset-0 w-full"
        style={{ 
          height: '300%',
          transform: `translateY(${scrollY * -0.05}px)` 
        }}
      >
        {distantStars.map(star => (
          <div 
            key={`distant-${star.id}`}
            className="absolute rounded-full star-distant"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '--base-opacity': star.opacity,
              '--twinkle-duration': star.twinkleDuration,
              animationDelay: star.twinkleDelay,
              opacity: star.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Mid Stars Layer */}
      <div 
        className="absolute inset-0 w-full"
        style={{ 
          height: '300%',
          transform: `translateY(${scrollY * -0.1}px)` 
        }}
      >
        {midStars.map(star => (
          <div 
            key={`mid-${star.id}`}
            className="absolute rounded-full star-mid"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: '#fff',
              '--base-opacity': star.opacity,
              '--twinkle-duration': star.twinkleDuration,
              animationDelay: star.twinkleDelay,
              opacity: star.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Near Stars Layer (with glow, fastest parallax) */}
      <div 
        className="absolute inset-0 w-full"
        style={{ 
          height: '300%',
          transform: `translateY(${scrollY * -0.15}px)` 
        }}
      >
        {nearStars.map(star => (
          <div 
            key={`near-${star.id}`}
            className="absolute rounded-full star-near"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.hue === 0 ? '#fff' : `hsl(${star.hue}, 60%, 85%)`,
              boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.3)`,
              '--base-opacity': star.opacity,
              animationDelay: star.twinkleDelay,
              opacity: star.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      {shootingStars.map(star => (
        <div
          key={`shooting-${star.id}`}
          className="fixed w-[2px] h-[80px] pointer-events-none"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(45deg)',
            animation: `shooting-star ${star.duration}s ease-out infinite`,
            animationDelay: `${star.delay}s`,
            opacity: 0,
          }}
        />
      ))}

      {/* Vignette overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />

      {/* Film Grain Overlay - Authentic 1960s NASA footage feel */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          animation: 'grain 0.5s steps(10) infinite',
        }}
      />

      {/* Subtle scanline effect (CRT feel) */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
        }}
      />
    </div>
  );
};
