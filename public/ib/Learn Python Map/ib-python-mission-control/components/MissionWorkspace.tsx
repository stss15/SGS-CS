import React, { useState } from 'react';
import { PythonIDE } from './PythonIDE';
import { level1BaseContent, level1Challenges } from '../data/level1_content';
import { level2BaseContent, level2Challenges } from '../data/level2_content';
import { level3BaseContent, level3Challenges } from '../data/level3_content';
import { level4BaseContent, level4Challenges } from '../data/level4_content';
import { level5BaseContent, level5Challenges } from '../data/level5_content';
import { level6BaseContent, level6Challenges } from '../data/level6_content';
import { level7BaseContent, level7Challenges } from '../data/level7_content';
import { level8BaseContent, level8Challenges } from '../data/level8_content';
import { level9BaseContent, level9Challenges } from '../data/level9_content';
import { level10BaseContent, level10Challenges } from '../data/level10_content';
import { level11BaseContent, level11Challenges } from '../data/level11_content';
import { level12BaseContent, level12Challenges } from '../data/level12_content';
import { level13BaseContent, level13Challenges } from '../data/level13_content';
import { level14BaseContent, level14Challenges } from '../data/level14_content';
import { level15BaseContent, level15Challenges } from '../data/level15_content';
import { level16BaseContent, level16Challenges } from '../data/level16_content';
import { level17BaseContent, level17Challenges } from '../data/level17_content';
import { level18BaseContent, level18Challenges } from '../data/level18_content';
import { level19BaseContent, level19Challenges } from '../data/level19_content';
import { level20BaseContent, level20Challenges } from '../data/level20_content';
import { 
  BookOpen, 
  Code, 
  ArrowLeft, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  Radio,
  Home,
  MapPin,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface MissionWorkspaceProps {
  mode: 'BASE' | 'CHALLENGE';
  challengeId?: number;
  levelId: number;
  onBack: () => void;
  colorTheme: string;
  totalChallenges?: number;
  onNextChallenge?: () => void;
  onPrevChallenge?: () => void;
  onBackToBase?: () => void;
  onSpeakWithBase?: () => void;
  onFinishExploration?: () => void;
}

export const MissionWorkspace: React.FC<MissionWorkspaceProps> = ({ 
  mode, 
  challengeId, 
  levelId, 
  onBack, 
  colorTheme,
  totalChallenges = 10,
  onNextChallenge,
  onPrevChallenge,
  onBackToBase,
  onSpeakWithBase,
  onFinishExploration
}) => {
  const isOrange = colorTheme === 'orange';
  const accentColor = isOrange ? 'text-nasa-orange' : 'text-nasa-teal';
  const borderClass = isOrange ? 'border-nasa-orange' : 'border-nasa-teal';
  const bgAccent = isOrange ? 'bg-nasa-orange' : 'bg-nasa-teal';
  const hoverAccent = isOrange ? 'hover:bg-nasa-orange/80' : 'hover:bg-nasa-teal/80';
  
  // Accordion state for manual sections
  const [openSection, setOpenSection] = useState<number | null>(0);
  
  // Toggle state for showing manual while in challenge mode
  const [showManualInChallenge, setShowManualInChallenge] = useState(false);

  // Determine Content based on Level ID
  let baseContent = level1BaseContent;
  let challenges = level1Challenges;

  if (levelId === 2) {
      baseContent = level2BaseContent;
      challenges = level2Challenges;
  } else if (levelId === 3) {
      baseContent = level3BaseContent;
      challenges = level3Challenges;
  } else if (levelId === 4) {
      baseContent = level4BaseContent;
      challenges = level4Challenges;
  } else if (levelId === 5) {
      baseContent = level5BaseContent;
      challenges = level5Challenges;
  } else if (levelId === 6) {
      baseContent = level6BaseContent;
      challenges = level6Challenges;
  } else if (levelId === 7) {
      baseContent = level7BaseContent;
      challenges = level7Challenges;
  } else if (levelId === 8) {
      baseContent = level8BaseContent;
      challenges = level8Challenges;
  } else if (levelId === 9) {
      baseContent = level9BaseContent;
      challenges = level9Challenges;
  } else if (levelId === 10) {
      baseContent = level10BaseContent;
      challenges = level10Challenges;
  } else if (levelId === 11) {
      baseContent = level11BaseContent;
      challenges = level11Challenges;
  } else if (levelId === 12) {
      baseContent = level12BaseContent;
      challenges = level12Challenges;
  } else if (levelId === 13) {
      baseContent = level13BaseContent;
      challenges = level13Challenges;
  } else if (levelId === 14) {
      baseContent = level14BaseContent;
      challenges = level14Challenges;
  } else if (levelId === 15) {
      baseContent = level15BaseContent;
      challenges = level15Challenges;
  } else if (levelId === 16) {
      baseContent = level16BaseContent;
      challenges = level16Challenges;
  } else if (levelId === 17) {
      baseContent = level17BaseContent;
      challenges = level17Challenges;
  } else if (levelId === 18) {
      baseContent = level18BaseContent;
      challenges = level18Challenges;
  } else if (levelId === 19) {
      baseContent = level19BaseContent;
      challenges = level19Challenges;
  } else if (levelId === 20) {
      baseContent = level20BaseContent;
      challenges = level20Challenges;
  }
  
  // Get Specific Challenge
  const challenge = challengeId ? challenges.find(c => c.id === challengeId) : null;
  const initialCode = mode === 'CHALLENGE' && challenge 
    ? challenge.starterCode 
    : `# Mission Control Playground\n# Level ${levelId}: ${mode === 'BASE' ? 'Manual' : 'Challenge'}\n\nprint("System Ready")`;

  const toggleSection = (idx: number) => {
    setOpenSection(openSection === idx ? null : idx);
  };

  const getLevelTitle = (id: number) => {
    switch(id) {
        case 1: return 'Variables & I/O';
        case 2: return 'Seq. & Selection';
        case 3: return 'Loops & Iteration';
        case 4: return 'String Ops';
        case 5: return 'Lists (Arrays)';
        case 6: return 'Stacks & Queues';
        case 7: return 'Modular Programming';
        case 8: return 'File Processing';
        case 9: return 'Robustness & Debugging';
        case 10: return 'Searching Algorithms';
        case 11: return 'Sorting Algorithms';
        case 12: return 'OOP Fundamentals';
        case 13: return 'Encapsulation';
        case 14: return 'Recursive Algorithms';
        case 15: return 'Inheritance & Poly';
        case 16: return 'Linked Lists';
        case 17: return 'Trees (BST)';
        case 18: return 'Sets';
        case 19: return 'Design Patterns';
        case 20: return 'Hashing & Dicts';
        default: return `Level ${id}`;
    }
  };

  const canGoPrev = challengeId !== undefined && challengeId > 1;
  const canGoNext = challengeId !== undefined && challengeId < totalChallenges;

  // Determine what content to show in the left panel
  const showManualContent = mode === 'BASE' || (mode === 'CHALLENGE' && showManualInChallenge);

  // Render manual content (reusable between BASE mode and challenge manual toggle)
  const renderManualContent = () => (
    <div className="space-y-4">
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl uppercase mb-2">
            {getLevelTitle(levelId)}
        </h1>
        <p className="text-nasa-grey text-sm">Base Knowledge Database</p>
      </div>
      
      {baseContent.map((section, idx) => {
        const isOpen = openSection === idx;
        return (
          <div key={idx} className={`bg-white/5 rounded border transition-all duration-300 ${isOpen ? 'border-white/20' : 'border-transparent hover:border-white/10'}`}>
            <button 
              onClick={() => toggleSection(idx)}
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
            >
              <h3 className={`font-bold text-lg ${isOpen ? accentColor : 'text-gray-300'}`}>
                {section.title}
              </h3>
              {isOpen ? <ChevronDown size={20} className={accentColor} /> : <ChevronRight size={20} className="text-gray-500" />}
            </button>
            
            {isOpen && (
              <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                <div className="h-px w-full bg-white/10 mb-4" />
                <p className="text-sm leading-relaxed mb-4 text-gray-300 whitespace-pre-wrap">{section.content}</p>
                
                {/* TABLE RENDERING */}
                {section.tableData && (
                    <div className="mb-4 overflow-hidden rounded border border-white/10">
                        <table className="w-full text-sm">
                            <thead className="bg-white/10 text-nasa-cream font-bold">
                                <tr>
                                    {section.tableData.headers.map((header, hIdx) => (
                                        <th key={hIdx} className="p-2 text-left border-b border-white/10 font-mono text-xs uppercase tracking-wider">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="font-mono text-xs">
                                {section.tableData.rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="border-b border-white/5 last:border-none hover:bg-white/5 transition-colors">
                                        {row.map((cell, cIdx) => (
                                            <td key={cIdx} className="p-2 text-gray-400 border-r border-white/5 last:border-none">
                                                <code className={cIdx === 0 ? `font-bold ${accentColor}` : ""}>{cell}</code>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {section.codeExample && (
                  <div className="bg-black/50 p-3 rounded border-l-2 border-nasa-grey/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-green-400">{section.codeExample}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // Render challenge content
  const renderChallengeContent = () => (
    <div className="space-y-6">
       {challenge && (
         <>
            <div>
                <h1 className="font-display font-bold text-2xl uppercase mb-4 text-white leading-tight">
                    {challenge.title}
                </h1>
                <div className={`inline-block px-2 py-1 border ${borderClass} text-xs font-bold mb-4 ${accentColor}`}>
                    ACTIVE TASK
                </div>
            </div>

            <div className={`bg-white/5 p-4 rounded border-l-4 ${borderClass}`}>
                <h3 className="text-xs uppercase text-nasa-grey mb-2 tracking-widest">Description</h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{challenge.description}</p>
            </div>

            <div className="bg-nasa-blue/20 p-4 rounded border border-nasa-blue/30">
                <h3 className="text-xs uppercase text-nasa-blue mb-2 tracking-widest font-bold">Hint</h3>
                <p className="text-xs text-nasa-blue/80 italic">"{challenge.hint}"</p>
            </div>
         </>
       )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0D17] flex flex-col font-mono text-nasa-cream animate-in fade-in duration-300">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0a0c14] border-b border-nasa-grey/20">
        {/* Left - Back to Map */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 text-nasa-grey hover:text-white text-xs uppercase tracking-wider border border-nasa-grey/30 rounded hover:border-white/30 transition-colors"
        >
          <MapPin size={14} />
          <span className="hidden sm:inline">Back to Map</span>
        </button>

        {/* Center - Current Position */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-nasa-grey">L{levelId}</span>
          <span className={accentColor}>•</span>
          <span className="text-nasa-cream">
            {mode === 'BASE' ? 'Mission Manual' : (
              showManualInChallenge ? `Manual (Challenge ${challengeId})` : `Challenge ${challengeId}/${totalChallenges}`
            )}
          </span>
        </div>

        {/* Right - Quick Actions */}
        <div className="flex items-center gap-2">
          {onSpeakWithBase && (
            <button 
              onClick={onSpeakWithBase}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs uppercase tracking-wider border rounded transition-colors ${accentColor} ${borderClass} hover:bg-white/5`}
            >
              <Radio size={12} className="animate-pulse" />
              <span className="hidden sm:inline">Contact Base</span>
            </button>
          )}
          {onFinishExploration && (
            <button 
              onClick={onFinishExploration}
              className="flex items-center gap-1 px-3 py-1.5 text-nasa-cream/70 hover:text-white text-xs uppercase tracking-wider border border-nasa-cream/20 rounded hover:border-white/30 transition-colors"
            >
              <Home size={12} />
              <span className="hidden sm:inline">End</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT PANEL: Content (33%) */}
        <div className="w-full md:w-1/3 flex flex-col border-r border-nasa-grey/30 bg-[#12141d] h-full overflow-hidden">
          
          {/* Panel Header */}
          <div className="p-4 border-b border-nasa-grey/30 flex items-center justify-between bg-nasa-black">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className={`hover:text-white text-nasa-grey transition-colors`}>
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                 {showManualContent ? <BookOpen size={18} className={accentColor} /> : <Code size={18} className={accentColor} />}
                 <span className="font-bold uppercase tracking-wider text-sm">
                    {showManualContent ? `Level ${levelId} Manual` : `L${levelId}: Task #${challengeId}`}
                 </span>
              </div>
            </div>
            
            {/* Toggle button for challenge mode */}
            {mode === 'CHALLENGE' && (
              <button
                onClick={() => setShowManualInChallenge(!showManualInChallenge)}
                className={`flex items-center gap-2 px-2 py-1 rounded text-xs transition-all ${
                  showManualInChallenge 
                    ? `${bgAccent} text-white` 
                    : `border ${borderClass} ${accentColor} hover:bg-white/5`
                }`}
                title={showManualInChallenge ? "Show Challenge" : "Show Manual"}
              >
                {showManualInChallenge ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                <span className="hidden sm:inline">{showManualInChallenge ? 'Task' : 'Ref'}</span>
              </button>
            )}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {showManualContent ? renderManualContent() : renderChallengeContent()}
          </div>

          {/* Challenge Navigation Footer - Only show in CHALLENGE mode */}
          {mode === 'CHALLENGE' && (
            <div className="p-3 border-t border-nasa-grey/30 bg-[#0a0c14]">
              <div className="flex items-center justify-between gap-2">
                {/* Previous Challenge */}
                <button
                  onClick={onPrevChallenge}
                  disabled={!canGoPrev}
                  className={`
                    flex items-center gap-1 px-3 py-2 rounded text-xs uppercase tracking-wider
                    border transition-all duration-200
                    ${canGoPrev 
                      ? 'border-nasa-grey/50 text-nasa-grey hover:text-white hover:border-white/50 hover:bg-white/5' 
                      : 'border-nasa-grey/20 text-nasa-grey/30 cursor-not-allowed'
                    }
                  `}
                >
                  <ChevronLeft size={14} />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Toggle Manual/Challenge View */}
                <button
                  onClick={() => setShowManualInChallenge(!showManualInChallenge)}
                  className={`
                    flex items-center gap-1 px-4 py-2 rounded text-xs uppercase tracking-wider
                    border transition-all duration-200
                    ${showManualInChallenge 
                      ? `${bgAccent} ${hoverAccent} text-white border-transparent` 
                      : `${borderClass} ${accentColor} hover:bg-white/5`
                    }
                  `}
                >
                  {showManualInChallenge ? <Code size={14} /> : <BookOpen size={14} />}
                  <span>{showManualInChallenge ? 'Task' : 'Manual'}</span>
                </button>

                {/* Next Challenge */}
                <button
                  onClick={onNextChallenge}
                  disabled={!canGoNext}
                  className={`
                    flex items-center gap-1 px-3 py-2 rounded text-xs uppercase tracking-wider
                    transition-all duration-200
                    ${canGoNext 
                      ? `${bgAccent} ${hoverAccent} text-white` 
                      : 'bg-nasa-grey/20 text-nasa-grey/30 cursor-not-allowed'
                    }
                  `}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* Progress indicator */}
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: totalChallenges }, (_, i) => (
                  <div 
                    key={i}
                    className={`
                      flex-1 h-1 rounded-full transition-colors
                      ${i + 1 < (challengeId || 0) ? bgAccent : i + 1 === challengeId ? `${bgAccent} animate-pulse` : 'bg-white/10'}
                    `}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: IDE (66%) */}
        <div className="w-full md:w-2/3 h-full">
           <PythonIDE initialCode={initialCode} />
        </div>
      </div>
    </div>
  );
};
