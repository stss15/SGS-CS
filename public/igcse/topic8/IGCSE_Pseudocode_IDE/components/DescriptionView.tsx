import React from 'react';
import { DescribableItem } from '../App';

interface DescriptionViewProps {
  method: DescribableItem | null;
  onShowCode: () => void;
}

export const DescriptionView: React.FC<DescriptionViewProps> = ({ method, onShowCode }) => {
  if (!method) {
    return (
      <main className="flex-grow flex items-center justify-center bg-white dark:bg-gray-800">
        <p className="text-gray-500">Select a method from the sidebar to learn more.</p>
      </main>
    );
  }

  return (
    <main className="flex-grow flex flex-col bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 overflow-y-auto">
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{method.title}</h1>
            <p className="text-base leading-relaxed mb-6 whitespace-pre-wrap">{method.description}</p>
            {method.code && (
                <button
                    onClick={onShowCode}
                    className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 01-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Show Code</span>
                </button>
            )}
        </div>
    </main>
  );
};