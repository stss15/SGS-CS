
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';

interface ConsoleLine {
  id: number;
  type: 'output' | 'error' | 'input';
  text: string;
}

export interface ConsoleHandle {
  print: (message: string) => void;
  printLine: (message: string) => void;
  printError: (message: string) => void;
  clear: () => void;
  getInput: () => Promise<string>;
}

export const Console = forwardRef<ConsoleHandle>((props, ref) => {
  const [lines, setLines] = useState<ConsoleLine[]>([]);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  
  const endOfConsoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const inputPromiseResolve = useRef<(value: string) => void>();

  useEffect(() => {
    endOfConsoleRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, isWaitingForInput]);

  useEffect(() => {
    if (isWaitingForInput) {
      inputRef.current?.focus();
    }
  }, [isWaitingForInput]);
  
  useImperativeHandle(ref, () => ({
    print: (message) => {
      setLines(prev => {
        const lastLine = prev[prev.length - 1];
        if (lastLine && lastLine.type === 'output' && !lastLine.text.endsWith('\n')) {
          return [...prev.slice(0, -1), { ...lastLine, text: lastLine.text + message }];
        }
        return [...prev, { id: Date.now() + Math.random(), type: 'output', text: message }];
      });
    },
    printLine: (message) => {
       setLines(prev => [...prev, { id: Date.now() + Math.random(), type: 'output', text: message + '\n' }]);
    },
    printError: (message) => {
      setLines(prev => [...prev, { id: Date.now() + Math.random(), type: 'error', text: message + '\n' }]);
    },
    clear: () => {
      setLines([]);
    },
    getInput: () => {
      setIsWaitingForInput(true);
      return new Promise<string>((resolve) => {
        inputPromiseResolve.current = resolve;
      });
    },
  }));

  const handleInputSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isWaitingForInput && inputPromiseResolve.current) {
        setLines(prev => [...prev, { id: Date.now(), type: 'input', text: currentInput + '\n' }]);
        inputPromiseResolve.current(currentInput);
        setCurrentInput('');
        setIsWaitingForInput(false);
        inputPromiseResolve.current = undefined;
    }
  }, [currentInput, isWaitingForInput]);

  return (
    <div className="flex-grow bg-gray-100 dark:bg-gray-800 font-mono text-sm p-2 overflow-auto text-gray-900 dark:text-gray-100">
      {lines.map((line) => (
        <span
          key={line.id}
          className={
            line.type === 'error' ? 'text-red-500' : 
            line.type === 'input' ? 'text-blue-400' : ''
          }
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {line.text}
        </span>
      ))}
      {isWaitingForInput && (
        <form onSubmit={handleInputSubmit} className="flex items-center">
          <span className="text-gray-500 dark:text-gray-400">&gt;&gt;&gt; </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="flex-grow bg-transparent border-none outline-none pl-2"
            autoFocus
          />
        </form>
      )}
      <div ref={endOfConsoleRef} />
    </div>
  );
});
