import React, { useState } from 'react';
import { roadmapData, Level } from './data/roadmap';
import { LevelNode } from './components/LevelNode';
import { HomeScreen } from './components/HomeScreen';
import { MissionBrief } from './components/MissionBrief';
import { Countdown } from './components/Countdown';
import { ActiveLevel } from './components/ActiveLevel';
import { StarField } from './components/StarField';
import { WormholeTeleport } from './components/WormholeTeleport';
import { NavigationBar } from './components/NavigationBar';
import { Rocket, ChevronLeft } from 'lucide-react';

type Screen = 'HOME' | 'MAP' | 'BRIEF' | 'COUNTDOWN' | 'LEVEL';
type Pathway = 'SL' | 'HL';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [pathway, setPathway] = useState<Pathway | null>(null);
  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [showWormhole, setShowWormhole] = useState(false);

  // Derived state
  const colorTheme = pathway === 'SL' ? 'orange' : 'teal';

  // Filter levels
  // SL = Phases 1-4 (Core)
  // HL = Phase 5 (Extension) - Short view
  const filteredPhases = roadmapData.filter(phase => {
    if (pathway === 'SL') return !phase.isHLOnly;
    if (pathway === 'HL') return phase.isHLOnly;
    return true;
  });

  const allLevels = filteredPhases.flatMap(p => p.levels);

  // Handlers
  const handleSelectPathway = (p: Pathway) => {
    setPathway(p);
    setCurrentScreen('MAP');
    
    // Set initial active level based on pathway selection
    if (p === 'HL') {
      // Find the first level ID for HL content (usually 14)
      const firstHLPhase = roadmapData.find(ph => ph.isHLOnly);
      if (firstHLPhase && firstHLPhase.levels.length > 0) {
        setActiveLevelId(firstHLPhase.levels[0].id);
      }
    } else {
      setActiveLevelId(1);
    }
  };

  const handleLevelClick = (level: Level) => {
    if (level.id > activeLevelId) return;
    setSelectedLevel(level);
    setCurrentScreen('BRIEF');
  };

  const handleMissionAccept = () => {
    setCurrentScreen('COUNTDOWN');
  };

  const handleCountdownComplete = () => {
    setCurrentScreen('LEVEL');
  };

  const handleReturnToMap = () => {
    setCurrentScreen('MAP');
    if (selectedLevel && selectedLevel.id === activeLevelId) {
       // Find current index in the filtered list of levels
       const currentIndex = allLevels.findIndex(l => l.id === activeLevelId);
       
       // If there is a next level in this pathway, unlock it
       if (currentIndex >= 0 && currentIndex < allLevels.length - 1) {
           const nextLevel = allLevels[currentIndex + 1];
           setActiveLevelId(nextLevel.id);
       }
    }
  };

  const handleBackToHome = () => {
      setPathway(null);
      setCurrentScreen('HOME');
      setActiveLevelId(1); 
  };

  // Teleport handler - jump directly to any level
  const handleTeleport = (levelId: number) => {
    const level = allLevels.find(l => l.id === levelId);
    if (level) {
      setSelectedLevel(level);
      // Unlock up to this level for easy access
      if (levelId > activeLevelId) {
        setActiveLevelId(levelId);
      }
      setShowWormhole(false);
      // Go through countdown for dramatic effect
      setCurrentScreen('COUNTDOWN');
    }
  };

  // Finish exploration - return to IB index page
  const handleFinishExploration = () => {
    // Navigate to the IB index page (from dist folder, go up 4 levels)
    window.location.href = '../../../../index.html';
  };

  // --- PERSISTENT BACKGROUND RENDER ---
  return (
    <div className="relative w-full min-h-screen bg-[#0B0D17] font-sans text-nasa-cream selection:bg-nasa-orange selection:text-white overflow-x-hidden">
      
      {/* LAYER 1: Background (StarField) - Absolute to cover full scroll height */}
      <StarField />

      {/* LAYER 2: Grid Texture - Absolute to scroll with world */}
      <div className="absolute inset-0 opacity-10 bg-blueprint bg-[length:40px_40px] pointer-events-none z-10" />

      {/* LAYER 3: Content */}
      <div className="relative z-20 w-full">
        
        {/* SCREEN: HOME */}
        {currentScreen === 'HOME' && (
          <div className="h-screen">
             <HomeScreen onSelectPathway={handleSelectPathway} onBackToIB={handleFinishExploration} />
          </div>
        )}

        {/* SCREEN: COUNTDOWN (Overlay) */}
        {currentScreen === 'COUNTDOWN' && (
          <Countdown onComplete={handleCountdownComplete} colorTheme={colorTheme} />
        )}

        {/* SCREEN: ACTIVE LEVEL (Takes over full view) */}
        {currentScreen === 'LEVEL' && selectedLevel && (
           <ActiveLevel 
             level={selectedLevel} 
             onBack={handleReturnToMap} 
             colorTheme={colorTheme}
             onSpeakWithBase={() => setShowWormhole(true)}
             onFinishExploration={handleFinishExploration}
           />
        )}

        {/* SCREEN: MAP & BRIEF */}
        {(currentScreen === 'MAP' || currentScreen === 'BRIEF') && (
          <>
            {/* Navigation Bar - Left side */}
            <NavigationBar
              onSpeakWithBase={() => setShowWormhole(true)}
              onFinishExploration={handleFinishExploration}
              colorTheme={colorTheme}
              position="left"
            />

            <div className="max-w-4xl mx-auto px-6 py-12 relative">
              
              {/* Map Header - Centered Title, Left Abort */}
              <header className="mb-32 relative flex flex-col md:flex-row items-center justify-center z-50">
                <button 
                    onClick={handleBackToHome}
                    className="md:absolute md:left-0 text-nasa-orange hover:text-white flex items-center gap-2 uppercase text-xs font-mono tracking-widest bg-nasa-black/50 p-2 rounded backdrop-blur-sm border border-nasa-orange/50 transition-colors mb-6 md:mb-0"
                >
                    <ChevronLeft size={16} /> Abort Mission
                </button>

                <div className={`inline-flex items-center gap-6 border-l-4 border-nasa-cream pl-6 py-2 backdrop-blur-md ${colorTheme === 'orange' ? 'shadow-[-1px_0px_0px_0px_#CC5500]' : 'shadow-[-1px_0px_0px_0px_#4D8B8B]'}`}>
                    <Rocket size={56} className={colorTheme === 'orange' ? 'text-nasa-orange' : 'text-nasa-teal'} />
                    <div className="text-left">
                        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-widest uppercase leading-none mb-1">
                            Python {pathway}
                        </h1>
                        <span className="font-mono text-sm md:text-base text-nasa-grey tracking-[0.4em] block">
                            MISSION ROADMAP 2027
                        </span>
                    </div>
                </div>
              </header>

              {/* Map Phases */}
              <div className="space-y-48 pb-64">
                {filteredPhases.map((phase) => (
                  <div key={phase.id} className="relative">
                    {/* Phase Pill - Bigger & More Spaced */}
                    <div className="sticky top-8 z-40 flex justify-center mb-32 pointer-events-none">
                        <div className={`
                          bg-nasa-blue/90 backdrop-blur-md border-2 
                          ${colorTheme === 'orange' ? 'border-nasa-orange text-nasa-orange' : 'border-nasa-teal text-nasa-teal'} 
                          px-10 py-3 rounded-full font-display font-bold text-base md:text-lg shadow-2xl uppercase tracking-[0.2em]
                        `}>
                            {phase.title}
                        </div>
                    </div>

                    <div>
                      {phase.levels.map((level) => {
                        const globalIndex = allLevels.findIndex(l => l.id === level.id);
                        return (
                            <div key={level.id} className="relative">
                              <LevelNode 
                                  level={level}
                                  index={globalIndex}
                                  isCurrent={activeLevelId === level.id}
                                  isCompleted={level.id < activeLevelId}
                                  isLocked={level.id > activeLevelId}
                                  onClick={() => handleLevelClick(level)}
                                  colorTheme={colorTheme}
                              />
                            </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-32 flex items-center justify-center text-nasa-grey/30 font-mono text-xs tracking-widest">
                  /// END OF TRANSMISSION ///
              </div>

              {/* Brief Modal Overlay */}
              {currentScreen === 'BRIEF' && selectedLevel && (
                <MissionBrief 
                  level={selectedLevel} 
                  onAccept={handleMissionAccept}
                  onCancel={() => setCurrentScreen('MAP')}
                  colorTheme={colorTheme}
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* Wormhole Teleport Modal - Renders above everything */}
      <WormholeTeleport
        isOpen={showWormhole}
        onClose={() => setShowWormhole(false)}
        phases={filteredPhases}
        onTeleport={handleTeleport}
        colorTheme={colorTheme}
      />
    </div>
  );
}
