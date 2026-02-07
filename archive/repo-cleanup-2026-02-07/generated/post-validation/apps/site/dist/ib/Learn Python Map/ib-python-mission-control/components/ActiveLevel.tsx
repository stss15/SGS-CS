import React, { useState, useEffect } from 'react';
import { Level } from '../data/roadmap';
import { PlanetMap } from './PlanetMap';
import { MissionWorkspace } from './MissionWorkspace';
import { NavigationBar } from './NavigationBar';
import { Radio, Home, Rocket } from 'lucide-react';

// Import challenge counts from each level
import { level1Challenges } from '../data/level1_content';
import { level2Challenges } from '../data/level2_content';
import { level3Challenges } from '../data/level3_content';
import { level4Challenges } from '../data/level4_content';
import { level5Challenges } from '../data/level5_content';
import { level6Challenges } from '../data/level6_content';
import { level7Challenges } from '../data/level7_content';
import { level8Challenges } from '../data/level8_content';
import { level9Challenges } from '../data/level9_content';
import { level10Challenges } from '../data/level10_content';
import { level11Challenges } from '../data/level11_content';
import { level12Challenges } from '../data/level12_content';
import { level13Challenges } from '../data/level13_content';
import { level14Challenges } from '../data/level14_content';
import { level15Challenges } from '../data/level15_content';
import { level16Challenges } from '../data/level16_content';
import { level17Challenges } from '../data/level17_content';
import { level18Challenges } from '../data/level18_content';
import { level19Challenges } from '../data/level19_content';
import { level20Challenges } from '../data/level20_content';

// Helper to get challenge count for a level
const getChallengeCount = (levelId: number): number => {
  const challengeMap: Record<number, { length: number }> = {
    1: level1Challenges,
    2: level2Challenges,
    3: level3Challenges,
    4: level4Challenges,
    5: level5Challenges,
    6: level6Challenges,
    7: level7Challenges,
    8: level8Challenges,
    9: level9Challenges,
    10: level10Challenges,
    11: level11Challenges,
    12: level12Challenges,
    13: level13Challenges,
    14: level14Challenges,
    15: level15Challenges,
    16: level16Challenges,
    17: level17Challenges,
    18: level18Challenges,
    19: level19Challenges,
    20: level20Challenges,
  };
  return challengeMap[levelId]?.length || 10;
};

interface ActiveLevelProps {
  level: Level;
  onBack: () => void;
  colorTheme: string;
  onSpeakWithBase?: () => void;
  onFinishExploration?: () => void;
}

export const ActiveLevel: React.FC<ActiveLevelProps> = ({ 
  level, 
  onBack, 
  colorTheme,
  onSpeakWithBase,
  onFinishExploration
}) => {
  const [view, setView] = useState<'MAP' | 'WORKSPACE'>('MAP');
  const [currentNode, setCurrentNode] = useState(0); // 0 = Base, 1+ = Challenges
  const [completedNodes, setCompletedNodes] = useState<number[]>([0]); // Base unlocked by default
  const [isMounting, setIsMounting] = useState(true);

  const isOrange = colorTheme === 'orange';
  const accentClass = isOrange ? 'text-nasa-orange border-nasa-orange' : 'text-nasa-teal border-nasa-teal';
  const glowClass = isOrange ? 'hover:shadow-[0_0_15px_rgba(204,85,0,0.3)]' : 'hover:shadow-[0_0_15px_rgba(77,139,139,0.3)]';

  // Get the dynamic challenge count for this level
  const challengeCount = getChallengeCount(level.id);
  const totalNodes = challengeCount + 2; // Base (0) + Challenges (1 to N) + Extraction (N+1)

  useEffect(() => {
    // Fade in effect
    const t = setTimeout(() => setIsMounting(false), 500);
    return () => clearTimeout(t);
  }, []);

  const handleNodeClick = (index: number) => {
    // Only allow clicking if completed or is the next available one
    // Simple logic: Can go to any previous node or the immediate next one
    if (index > Math.max(...completedNodes) + 1) return;

    setCurrentNode(index);
    
    // If it's the extraction node (last one), maybe show a victory modal? For now, just allow moving there.
    if (index === totalNodes - 1) {
        // Victory logic here
        return;
    }

    // Delay opening workspace to allow astronaut to "walk" there
    setTimeout(() => {
        setView('WORKSPACE');
    }, 1000);
  };

  const handleWorkspaceBack = () => {
     // When coming back from workspace, mark as complete for the demo feel
     if (!completedNodes.includes(currentNode)) {
         setCompletedNodes([...completedNodes, currentNode]);
     }
     setView('MAP');
  };

  // Navigate to next challenge
  const handleNextChallenge = () => {
    const nextNode = currentNode + 1;
    if (nextNode <= challengeCount) {
      // Mark current as complete
      if (!completedNodes.includes(currentNode)) {
        setCompletedNodes([...completedNodes, currentNode]);
      }
      setCurrentNode(nextNode);
    }
  };

  // Navigate to previous challenge
  const handlePrevChallenge = () => {
    const prevNode = currentNode - 1;
    if (prevNode >= 1) {
      setCurrentNode(prevNode);
    }
  };

  // Go back to base (node 0)
  const handleBackToBase = () => {
    // Mark current as complete
    if (!completedNodes.includes(currentNode)) {
      setCompletedNodes([...completedNodes, currentNode]);
    }
    setCurrentNode(0);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
        {/* Black curtain for transitions */}
        <div className={`absolute inset-0 bg-black z-[100] pointer-events-none transition-opacity duration-1000 ${isMounting ? 'opacity-100' : 'opacity-0'}`} />

        {view === 'MAP' ? (
            <>
                {/* Top Navigation Bar for Planet Map */}
                <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
                    {/* Left side - Return to Ship */}
                    <button 
                      onClick={onBack}
                      className="flex items-center gap-2 text-nasa-grey hover:text-white uppercase font-mono text-xs tracking-widest border border-nasa-grey/50 px-4 py-2 rounded bg-black/50 backdrop-blur transition-colors"
                    >
                       <Rocket size={14} className="rotate-[-45deg]" />
                       Return to Ship
                    </button>

                    {/* Right side - Speak with Base & Finish */}
                    <div className="flex items-center gap-2">
                        {onSpeakWithBase && (
                          <button 
                            onClick={onSpeakWithBase}
                            className={`flex items-center gap-2 px-4 py-2 rounded bg-black/50 backdrop-blur border font-mono text-xs uppercase tracking-widest transition-all ${accentClass} ${glowClass}`}
                          >
                            <Radio size={14} className="animate-pulse" />
                            Contact Base
                          </button>
                        )}
                        {onFinishExploration && (
                          <button 
                            onClick={onFinishExploration}
                            className="flex items-center gap-2 text-nasa-cream hover:text-white uppercase font-mono text-xs tracking-widest border border-nasa-cream/30 px-4 py-2 rounded bg-black/50 backdrop-blur transition-colors hover:border-white/50"
                          >
                            <Home size={14} />
                            End Mission
                          </button>
                        )}
                    </div>
                </div>

                <PlanetMap 
                    onNodeClick={handleNodeClick}
                    currentNode={currentNode}
                    completedNodes={completedNodes}
                    colorTheme={colorTheme}
                    totalNodes={totalNodes}
                    challengeCount={challengeCount}
                />
            </>
        ) : (
            <MissionWorkspace 
                mode={currentNode === 0 ? 'BASE' : 'CHALLENGE'}
                challengeId={currentNode === 0 ? undefined : currentNode}
                levelId={level.id}
                onBack={handleWorkspaceBack}
                colorTheme={colorTheme}
                totalChallenges={challengeCount}
                onNextChallenge={handleNextChallenge}
                onPrevChallenge={handlePrevChallenge}
                onBackToBase={handleBackToBase}
                onSpeakWithBase={onSpeakWithBase}
                onFinishExploration={onFinishExploration}
            />
        )}
    </div>
  );
};
