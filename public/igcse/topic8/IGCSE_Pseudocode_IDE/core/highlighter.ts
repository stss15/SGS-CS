
import { Token, TokenType } from './types';

const KEYWORDS = new Set([
  'DECLARE', 'CONSTANT', 'ARRAY', 'OF', 'INPUT', 'OUTPUT', 'IF', 'THEN', 'ELSE', 
  'ENDIF', 'CASE', 'OF', 'OTHERWISE', 'ENDCASE', 'FOR', 'TO', 'STEP', 'NEXT', 
  'REPEAT', 'UNTIL', 'WHILE', 'DO', 'ENDWHILE', 'PROCEDURE', 'ENDPROCEDURE', 
  'CALL', 'FUNCTION', 'RETURNS', 'ENDFUNCTION', 'RETURN'
]);

const DATA_TYPES = new Set(['INTEGER', 'REAL', 'STRING', 'CHAR', 'BOOLEAN']);
const OPERATORS = new Set(['AND', 'OR', 'NOT', 'MOD', 'DIV']);
const BOOLEANS = new Set(['TRUE', 'FALSE']);

function getTokenType(word: string): { type: string, className: string } {
    const upperWord = word.toUpperCase();
    if (KEYWORDS.has(upperWord)) return { type: 'keyword', className: 'text-blue-500 dark:text-sky-400 font-bold' };
    if (DATA_TYPES.has(upperWord)) return { type: 'datatype', className: 'text-teal-600 dark:text-teal-400' };
    if (OPERATORS.has(upperWord)) return { type: 'operator', className: 'text-purple-600 dark:text-purple-400 font-bold' };
    if (BOOLEANS.has(upperWord)) return { type: 'boolean', className: 'text-purple-600 dark:text-purple-400' };
    return { type: 'identifier', className: 'text-gray-800 dark:text-gray-200' };
}

export function getHighlightedTokens(code: string): Token[] {
    const tokens: Token[] = [];
    let current = 0;

    while (current < code.length) {
        let char = code[current];

        // Whitespace
        if (/\s/.test(char)) {
            let value = '';
            while (/\s/.test(char) && current < code.length) {
                value += char;
                char = code[++current];
            }
            tokens.push({ type: TokenType.Punctuation, value, line: 0, className: '' });
            continue;
        }

        // Comments
        if (char === '/' && code[current + 1] === '/') {
            let value = '//';
            current += 2;
            while (code[current] !== '\n' && current < code.length) {
                value += code[current++];
            }
            tokens.push({ type: TokenType.Comment, value, line: 0, className: 'text-gray-400 dark:text-gray-500 italic' });
            continue;
        }

        // Strings
        if (char === '"') {
            let value = char;
            current++;
            while (code[current] !== '"' && current < code.length) {
                value += code[current++];
            }
            if (current < code.length) {
                value += code[current++];
            }
            tokens.push({ type: TokenType.StringLiteral, value, line: 0, className: 'text-green-600 dark:text-green-400' });
            continue;
        }

         // Chars
        if (char === "'") {
            let value = char;
            current++;
            if (code[current] && code[current+1] === "'") {
                value += code[current];
                value += code[current+1];
                current += 2;
            }
            tokens.push({ type: TokenType.CharLiteral, value, line: 0, className: 'text-green-600 dark:text-green-400' });
            continue;
        }

        // Numbers (Integer or Real)
        if (/\d/.test(char)) {
            let value = '';
            while (/\d/.test(char) || (char === '.' && /\d/.test(code[current+1]))) {
                value += char;
                char = code[++current];
            }
            tokens.push({ type: TokenType.IntegerLiteral, value, line: 0, className: 'text-amber-600 dark:text-amber-400' });
            continue;
        }

        // Identifiers and Keywords
        if (/[a-zA-Z]/.test(char)) {
            let value = '';
            while (/[a-zA-Z0-9]/.test(char) && current < code.length) {
                value += char;
                char = code[++current];
            }
            const { className } = getTokenType(value);
            tokens.push({ type: TokenType.Identifier, value, line: 0, className });
            continue;
        }

        // Operators & Punctuation
        let opValue = '';
        if (char === '<' && (code[current+1] === '-' || code[current+1] === '=' || code[current+1] === '>')) {
            opValue = char + code[current+1];
            current += 2;
        } else if (char === '>' && code[current+1] === '=') {
            opValue = char + code[current+1];
            current += 2;
        }
        else {
            opValue = char;
            current++;
        }
        tokens.push({ type: TokenType.Operator, value: opValue, line: 0, className: 'text-purple-600 dark:text-purple-400' });
    }

    return tokens;
}
