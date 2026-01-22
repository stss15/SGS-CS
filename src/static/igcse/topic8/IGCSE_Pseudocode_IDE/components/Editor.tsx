
import React, { useRef, useEffect, useState } from 'react';
import { getHighlightedTokens } from '../core/highlighter';
import { Token } from '../core/types';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const LineNumbers: React.FC<{ lineCount: number }> = ({ lineCount }) => {
  return (
    <div className="h-full text-right pr-3 text-gray-400 dark:text-gray-500 select-none font-mono text-sm pt-2" aria-hidden>
      {Array.from({ length: lineCount }, (_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
};

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    setTokens(getHighlightedTokens(value));
  }, [value]);

  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const lineCount = value.split('\n').length;
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      onChange(newValue);
      
      // Move cursor after tab
      setTimeout(() => {
        if(textareaRef.current) {
           textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="relative flex-grow font-mono text-sm bg-white dark:bg-gray-800 w-full h-full overflow-hidden flex">
      <LineNumbers lineCount={lineCount} />
      <div className="relative flex-grow h-full">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          className="absolute top-0 left-0 w-full h-full p-2 bg-transparent text-transparent caret-gray-800 dark:caret-gray-200 resize-none border-none outline-none leading-normal tracking-wide z-10"
        />
        <pre
          ref={highlightRef}
          className="absolute top-0 left-0 w-full h-full p-2 bg-transparent text-gray-800 dark:text-gray-200 leading-normal tracking-wide pointer-events-none overflow-auto"
          aria-hidden="true"
        >
          {tokens.map((token, i) => (
            <span key={i} className={token.className}>
              {token.value}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
};
