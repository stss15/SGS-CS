import React, { useState, ReactNode } from 'react';

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 text-left"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 text-gray-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};
