import React, { useState, useRef, useCallback } from 'react';
import { Editor } from './components/Editor';
import { Console, ConsoleHandle } from './components/Console';
import { Toolbar } from './components/Toolbar';
import { Interpreter } from './core/interpreter';
import { RuntimeValue } from './core/types';
import { Sidebar } from './components/Sidebar';
import { syllabusTopics } from './core/syllabusExamples';
import { standardMethods } from './core/standardMethods';
import { validationMethods } from './core/validationMethods';
import { DescriptionView } from './components/DescriptionView';

export interface DescribableItem {
  title: string;
  description: string;
  code?: string;
}

const initialCode = `// Welcome to the IGCSE Pseudocode Interpreter!
// Use the sidebar on the left to load examples for different topics.
// Or, write your own code here and click "Run".

OUTPUT "Hello, world!"
`;

export default function App() {
  const [code, setCode] = useState<string>(initialCode);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'editor' | 'description'>('editor');
  const [selectedMethod, setSelectedMethod] = useState<DescribableItem | null>(null);
  const [editorHeight, setEditorHeight] = useState(70); // Editor height in percentage

  const consoleRef = useRef<ConsoleHandle>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);

  const handleExampleSelect = (exampleCode: string) => {
    setCode(exampleCode);
    setCurrentView('editor');
  };

  const handleGoToPlayground = () => {
    setCode(initialCode);
    setCurrentView('editor');
  };

  const handleMethodSelect = (method: DescribableItem) => {
    setSelectedMethod(method);
    setCurrentView('description');
  };

  const handleShowCode = () => {
    if (selectedMethod && selectedMethod.code) {
      setCode(selectedMethod.code);
      setCurrentView('editor');
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current || !mainRef.current) return;

    const containerRect = mainRef.current.getBoundingClientRect();
    const newHeight = e.clientY - containerRect.top;
    let newHeightPercent = (newHeight / containerRect.height) * 100;

    // Constrain the resize between 20% and 80%
    if (newHeightPercent < 20) newHeightPercent = 20;
    if (newHeightPercent > 80) newHeightPercent = 80;

    setEditorHeight(newHeightPercent);
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizingRef.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  }, [handleMouseMove, handleMouseUp]);


  const handleRun = useCallback(async () => {
    if (isRunning || !consoleRef.current) return;

    setIsRunning(true);
    consoleRef.current.clear();

    const interpreter = new Interpreter({
      output: (...args: RuntimeValue[]) => {
        const message = args.map(arg => arg !== null ? String(arg.value) : 'NULL').join('');
        consoleRef.current?.print(message);
      },
      outputLine: (...args: RuntimeValue[]) => {
        const message = args.map(arg => arg !== null ? String(arg.value) : 'NULL').join('');
        consoleRef.current?.printLine(message);
      },
      input: async () => {
        const value = await consoleRef.current?.getInput();
        return value || "";
      },
    });

    try {
      await interpreter.run(code);
    } catch (error) {
      console.log(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      consoleRef.current.printError(`Error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning]);

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <header className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-3">
          <a
            href="../../index.html"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Back to Topic 8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </a>
          <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">IGCSE Pseudocode IDE</h1>
        </div>
        <Toolbar onRun={handleRun} isRunning={isRunning} />
      </header>
      <div className="flex-grow flex flex-row overflow-hidden">
        <Sidebar
          topics={syllabusTopics}
          standardMethods={standardMethods}
          validationMethods={validationMethods}
          onExampleSelect={handleExampleSelect}
          onMethodSelect={handleMethodSelect}
          onGoToPlayground={handleGoToPlayground}
        />
        {currentView === 'editor' ? (
          <main ref={mainRef} className="flex-grow flex flex-col overflow-hidden">
            <div className="w-full flex flex-col" style={{ height: `${editorHeight}%` }}>
              <div className="bg-gray-50 dark:bg-gray-900 p-2 border-b border-gray-200 dark:border-gray-700 text-sm font-medium flex-shrink-0">
                editor.psc
              </div>
              <Editor value={code} onChange={setCode} />
            </div>
            <div
              className="w-full h-2 bg-gray-300 dark:bg-gray-700 cursor-row-resize hover:bg-blue-500 transition-colors duration-200 flex-shrink-0"
              onMouseDown={handleMouseDown}
              aria-label="Resize editor and console"
            />
            <div className="w-full flex flex-col flex-grow" style={{ height: `calc(${100 - editorHeight}% - 8px)` }}>
              <div className="bg-gray-50 dark:bg-gray-900 p-2 border-b border-gray-200 dark:border-gray-700 text-sm font-medium flex-shrink-0">
                Shell
              </div>
              <Console ref={consoleRef} />
            </div>
          </main>
        ) : (
          <DescriptionView method={selectedMethod} onShowCode={handleShowCode} />
        )}
      </div>
    </div>
  );
}