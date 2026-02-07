import React, { useState, useEffect, useRef } from 'react';
import { Play, Trash2 } from 'lucide-react';

interface PythonIDEProps {
  initialCode: string;
  onRun?: (output: string) => void;
}

export const PythonIDE: React.FC<PythonIDEProps> = ({ initialCode, onRun }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update local state when initialCode prop changes
  useEffect(() => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
  }, [initialCode]);

  // --- 1. KEYBOARD HANDLING (Tab & Auto-indent) ---
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      // Insert 4 spaces
      const newValue = code.substring(0, start) + "    " + code.substring(end);
      setCode(newValue);
      
      // Move cursor forward
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 4;
          textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    } 
    else if (e.key === 'Enter') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      // Find current line context
      const lastNewLine = code.lastIndexOf('\n', start - 1);
      const currentLineStart = lastNewLine === -1 ? 0 : lastNewLine + 1;
      const currentLine = code.substring(currentLineStart, start);
      
      // Calculate indentation of current line
      const match = currentLine.match(/^(\s*)/);
      let indent = match ? match[1] : "";
      
      // If line ends with ':', increase indentation
      if (currentLine.trim().endsWith(':')) {
        indent += "    ";
      }

      const newValue = code.substring(0, start) + "\n" + indent + code.substring(end);
      setCode(newValue);

      // Move cursor to end of new indentation
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 1 + indent.length;
          textareaRef.current.selectionEnd = start + 1 + indent.length;
        }
      }, 0);
    }
  };

  // --- 2. IMPROVED MOCK TRANSPILER ---
  const transpilePythonToJs = (pyCode: string): string => {
    const lines = pyCode.split('\n');
    let jsLines: string[] = [];
    let indentStack: number[] = []; // Start empty! Only push when a block opens.
    
    const closeBlocks = (currentIndent: number) => {
      while (indentStack.length > 0 && indentStack[indentStack.length - 1] > currentIndent) {
        indentStack.pop();
        jsLines.push('}');
      }
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      // Preserve comments and empty lines
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        jsLines.push(trimmedLine.startsWith('#') ? `// ${trimmedLine.substring(1)}` : '');
        return;
      }

      // Calculate Indentation
      const indentMatch = line.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1].length : 0;

      // Close blocks if indentation decreased
      if (currentIndent < (indentStack.length > 0 ? indentStack[indentStack.length - 1] : -1)) {
        closeBlocks(currentIndent);
      }

      // --- Line Translation ---
      let processedLine = trimmedLine;

      // 1. Handle 'pass'
      if (processedLine === 'pass') {
          processedLine = '/* pass */ null;';
      }
      
      // 2. Function Definition
      // def my_func(): -> function my_func() {
      else if (processedLine.startsWith('def ')) {
        indentStack.push(currentIndent + 4); 
        processedLine = processedLine.replace(/def\s+(.+?):/, 'function $1 {');
      } 
      
      // 3. Loops (For-Of strategy handles ranges and lists)
      // for i in range(5): -> for (let i of range(5)) {
      else if (processedLine.startsWith('for ')) {
        indentStack.push(currentIndent + 4);
        processedLine = processedLine.replace(/for\s+(.+?)\s+in\s+(.+?):/, 'for (let $1 of $2) {');
      }
      
      // 4. While Loop
      else if (processedLine.startsWith('while ')) {
        indentStack.push(currentIndent + 4);
        processedLine = processedLine.replace(/while\s+(.+?):/, 'while ($1) {');
      }

      // 5. Conditionals
      else if (processedLine.startsWith('if ')) {
        indentStack.push(currentIndent + 4);
        processedLine = processedLine.replace(/if\s+(.+?):/, 'if ($1) {');
      }
      else if (processedLine.startsWith('elif ')) {
        // elif is dedented relative to previous block, so closeBlocks() has already run.
        // We just start a new 'else if' block and push indent.
        indentStack.push(currentIndent + 4);
        processedLine = processedLine.replace(/elif\s+(.+?):/, 'else if ($1) {');
      }
      else if (processedLine.startsWith('else:')) {
        // else is dedented relative to previous block, closeBlocks() has run.
        indentStack.push(currentIndent + 4);
        processedLine = 'else {';
      }
      // 6. Context Managers (Basic Support)
      // with open(...) as f: -> let f = mockOpen(...); {
      else if (processedLine.startsWith('with ')) {
          indentStack.push(currentIndent + 4);
          processedLine = processedLine.replace(/with\s+(.+?)\s+as\s+(.+?):/, 'let $2 = $1; {');
      }

      // 7. Keywords & Built-ins
      processedLine = processedLine
        .replace(/\bprint\s*\(/g, 'mockPrint(')
        .replace(/\binput\s*\(/g, 'mockInput(')
        .replace(/\bopen\s*\(/g, 'mockOpen(')
        .replace(/\bint\s*\(/g, 'parseInt(')
        .replace(/\bfloat\s*\(/g, 'parseFloat(')
        .replace(/\bstr\s*\(/g, 'String(')
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false')
        .replace(/\bNone\b/g, 'null')
        .replace(/\sand\s/g, ' && ')
        .replace(/\sor\s/g, ' || ')
        .replace(/\snot\s/g, ' ! ');

      jsLines.push(processedLine);
    });

    closeBlocks(-1);
    return jsLines.join('\n');
  };

  const handleRun = () => {
    setError(null);
    setOutput([]);
    
    let jsCode = "";
    try {
      const logs: string[] = [];
      const mockPrint = (...args: any[]) => logs.push(args.join(' '));
      const mockInput = (promptText?: string) => prompt(promptText || "") || "";
      
      // MOCK FILE SYSTEM
      // Pre-seed some files for reading challenges
      const fileSystem: Record<string, string> = {
          "msg.txt": "SOS Signal Detected",
          "data.txt": "Line 1\nLine 2\nLine 3",
          "notes.txt": "Confidential Mission Brief",
          "source.txt": "Backup data content",
          "dirty.txt": "  Clean me please  ",
          "batch.csv": "10\n20\n30"
      };

      const mockOpen = (filename: string, mode: string = 'r') => {
          return {
              read: () => {
                  if (mode === 'w') return ""; // Can't read in write mode
                  return fileSystem[filename] || ""; 
              },
              write: (content: string) => {
                  if (mode === 'r') {
                      logs.push(`[Error] Cannot write to read-only file '${filename}'`);
                      return;
                  }
                  if (mode === 'w') {
                      fileSystem[filename] = content;
                  } else if (mode === 'a') {
                      fileSystem[filename] = (fileSystem[filename] || "") + content;
                  }
                  logs.push(`[FILE ${mode.toUpperCase()}] '${filename}': ${JSON.stringify(content)}`);
              },
              readlines: () => {
                   const content = fileSystem[filename] || "";
                   // Split by newline but keep newline logic similar to python? 
                   // Simplified: just split by newline
                   return content.split('\n').filter(l => l.length > 0).map(l => l + (l.endsWith('\n') ? '' : '')); 
                   // Actually python readlines keeps the \n, but for this simpler mock let's just split
                   // For challenge 10 we need strings.
                   return content.split('\n');
              },
              close: () => {
                  // logs.push(`[FILE] Closed '${filename}'`);
              }
          };
      };
      
      // Python-like range function
      const range = (start: number, stop?: number, step: number = 1) => {
        if (stop === undefined) {
            stop = start;
            start = 0;
        }
        const arr = [];
        if (step > 0) {
            for (let i = start; i < stop; i += step) arr.push(i);
        } else {
            for (let i = start; i > stop; i += step) arr.push(i);
        }
        return arr;
      };

      jsCode = transpilePythonToJs(code);
      // console.log("Transpiled:", jsCode); // Keep for debug if needed

      // Run in function scope with helpers
      const runFunction = new Function('mockPrint', 'range', 'mockInput', 'mockOpen', 'parseInt', 'parseFloat', 'String', jsCode);
      runFunction(mockPrint, range, mockInput, mockOpen, parseInt, parseFloat, String);

      setOutput(logs);
      if (onRun) onRun(logs.join('\n'));

    } catch (err: any) {
      // Show exact error
      let msg = err.message;
      if (err instanceof SyntaxError) {
         msg = `Syntax Error: ${err.message}`;
      }
      setError(msg);
      // Log for developer
      console.error("Transpilation/Runtime Error:", err);
      console.error("Generated JS:", jsCode);
    }
  };

  // --- 3. SYNTAX HIGHLIGHTING ---
  const highlightCode = (source: string) => {
    const tokens = source.split(/((?:#[^\n]*)|(?:"(?:[^"\\]|\\.)*")|(?:'(?:[^'\\]|\\.)*')|(?:\b\d+\b)|(?:\w+)|(?:[^\w\s"']+)|\s+)/g);

    return tokens.map((token, i) => {
        if (!token) return null;
        if (token.startsWith('#')) return <span key={i} className="text-green-600 italic">{token}</span>;
        if (token.startsWith('"') || token.startsWith("'")) return <span key={i} className="text-orange-300">{token}</span>;
        if (/^\d+$/.test(token)) return <span key={i} className="text-blue-300">{token}</span>;
        
        const keywords = ['def', 'return', 'pass', 'if', 'else', 'elif', 'while', 'for', 'in', 'import', 'from', 'class', 'try', 'except', 'with', 'as'];
        if (keywords.includes(token)) return <span key={i} className="text-pink-500 font-bold">{token}</span>;

        const builtins = ['print', 'input', 'open', 'int', 'str', 'float', 'bool', 'len', 'range'];
        if (builtins.includes(token)) return <span key={i} className="text-yellow-400">{token}</span>;

        if (['True', 'False', 'None'].includes(token)) return <span key={i} className="text-purple-400">{token}</span>;
        if (/^[^\w\s]+$/.test(token)) return <span key={i} className="text-nasa-grey">{token}</span>;

        return <span key={i} className="text-gray-200">{token}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l-2 border-nasa-grey/30 font-mono text-sm">
      
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-[#252526] border-b border-nasa-grey/20">
        <div className="flex items-center gap-2">
           <div className="text-nasa-grey text-xs tracking-widest uppercase">Mission.py</div>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => { setOutput([]); setError(null); }}
             className="p-1 hover:bg-white/10 rounded text-nasa-grey transition-colors"
             title="Clear Output"
           >
              <Trash2 size={16} />
           </button>
           <button 
             onClick={handleRun}
             className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-green-900/50"
           >
              <Play size={14} fill="currentColor" /> Run Code
           </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative overflow-hidden group bg-[#1e1e1e]">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white resize-none focus:outline-none z-10 font-mono leading-relaxed font-medium"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
        {/* Highlight Layer */}
        <pre className="absolute inset-0 w-full h-full p-4 m-0 pointer-events-none font-mono leading-relaxed whitespace-pre-wrap break-words z-0">
           {highlightCode(code)}
        </pre>
      </div>

      {/* Console */}
      <div className="h-1/3 bg-[#0B0D17] border-t border-nasa-grey/30 flex flex-col">
        <div className="p-2 bg-black/20 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs text-nasa-grey uppercase tracking-widest select-none">/// CONSOLE OUTPUT ///</span>
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 font-mono text-sm">
            {error ? (
            <div className="text-red-400 font-bold bg-red-900/20 p-2 rounded border-l-2 border-red-500 break-all whitespace-pre-wrap">
                {error}
            </div>
            ) : (
            output.map((line, i) => (
                <div key={i} className="text-green-400 mb-1 break-all">
                    <span className="text-green-700 mr-2 select-none">{'>'}</span>{line}
                </div>
            ))
            )}
            {output.length === 0 && !error && (
                <div className="text-nasa-grey/30 italic">Ready for input...</div>
            )}
        </div>
      </div>

    </div>
  );
};
