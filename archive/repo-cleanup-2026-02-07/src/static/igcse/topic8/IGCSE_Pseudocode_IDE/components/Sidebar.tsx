import React from 'react';
import { SyllabusSection } from '../core/syllabusExamples';
import { DescribableItem } from '../App';
import { CollapsibleSection } from './CollapsibleSection';
import { SidebarSection } from './SidebarSection';

interface SidebarProps {
  topics: SyllabusSection[];
  standardMethods: DescribableItem[];
  validationMethods: DescribableItem[];
  onExampleSelect: (code: string) => void;
  onMethodSelect: (method: DescribableItem) => void;
  onGoToPlayground: () => void;
}

const SidebarButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="w-full text-left px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
    >
        {children}
    </button>
);


export const Sidebar: React.FC<SidebarProps> = ({ topics, standardMethods, validationMethods, onExampleSelect, onMethodSelect, onGoToPlayground }) => {
  return (
    <aside className="w-72 bg-gray-50 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-700/50 flex-shrink-0 overflow-y-auto p-4 flex flex-col space-y-2">
      <button
        onClick={onGoToPlayground}
        className="w-full text-left px-3 py-2 font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors flex items-center mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 01-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Playground
      </button>

      <SidebarSection title="Pseudocode Tutorial">
        <ul className="space-y-1">
          {topics.map((section, index) => (
            <li key={index}>
              <CollapsibleSection title={section.title}>
                <ul className="space-y-1 mt-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                       <SidebarButton onClick={() => onExampleSelect(item.code)}>
                         {item.title}
                       </SidebarButton>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            </li>
          ))}
        </ul>
      </SidebarSection>
      
      <SidebarSection title="Standard Methods of Solution">
        <ul className="space-y-1">
          {standardMethods.map((method, index) => (
             <li key={index}>
              <SidebarButton onClick={() => onMethodSelect(method)}>
                {method.title}
              </SidebarButton>
            </li>
          ))}
        </ul>
      </SidebarSection>

      <SidebarSection title="Validation & Verification">
        <ul className="space-y-1">
          {validationMethods.map((method, index) => (
             <li key={index}>
               <SidebarButton onClick={() => onMethodSelect(method)}>
                {method.title}
              </SidebarButton>
            </li>
          ))}
        </ul>
      </SidebarSection>
    </aside>
  );
};