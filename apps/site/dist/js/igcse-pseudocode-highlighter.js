(() => {
  const KEYWORDS = [
    'DECLARE',
    'CONSTANT',
    'IF',
    'THEN',
    'ELSE',
    'ENDIF',
    'CASE',
    'OF',
    'ENDCASE',
    'FOR',
    'TO',
    'STEP',
    'NEXT',
    'REPEAT',
    'UNTIL',
    'WHILE',
    'DO',
    'ENDWHILE',
    'PROCEDURE',
    'ENDPROCEDURE',
    'FUNCTION',
    'RETURNS',
    'ENDFUNCTION',
    'CALL',
    'INPUT',
    'OUTPUT',
    'OPENFILE',
    'READFILE',
    'WRITEFILE',
    'CLOSEFILE',
    'RETURN',
    'AND',
    'OR',
    'NOT',
    'TRUE',
    'FALSE',
    'ARRAY'
  ];

  const BUILTINS = ['MOD', 'DIV', 'RANDOM', 'ROUND', 'LENGTH', 'LCASE', 'UCASE', 'SUBSTRING'];

  const keywordRe = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g');
  const builtinsRe = new RegExp(`\\b(${BUILTINS.join('|')})\\b`, 'g');
  const numberRe = /\b\d+(?:\.\d+)?\b/g;
  const operatorRe = /(&lt;=|&gt;=|&lt;&gt;|&lt;|&gt;|=|←|\+|-|\*|\/|\^|:)/g;
  const stringRe = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g;

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const normalizeAssignments = (value) => String(value).replace(/¨|<-/g, '←');

  const splitComment = (line) => {
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < line.length - 1; i += 1) {
      const ch = line[i];
      const next = line[i + 1];
      const prev = i > 0 ? line[i - 1] : '';

      if (ch === '"' && !inSingle && prev !== '\\') {
        inDouble = !inDouble;
      } else if (ch === "'" && !inDouble && prev !== '\\') {
        inSingle = !inSingle;
      }

      if (!inSingle && !inDouble && ch === '/' && next === '/') {
        return {
          codePart: line.slice(0, i),
          commentPart: line.slice(i)
        };
      }
    }

    return {
      codePart: line,
      commentPart: ''
    };
  };

  const highlightCodePart = (source) => {
    const strings = [];
    const normalized = normalizeAssignments(source);

    const withPlaceholders = normalized.replace(stringRe, (match) => {
      const token = `@@PSC_STRING_${strings.length}@@`;
      strings.push(`<span class="psc-string">${escapeHtml(match)}</span>`);
      return token;
    });

    let html = escapeHtml(withPlaceholders)
      .replace(operatorRe, '<span class="psc-operator">$1</span>')
      .replace(numberRe, '<span class="psc-number">$&</span>')
      .replace(builtinsRe, '<span class="psc-builtin">$1</span>')
      .replace(keywordRe, '<span class="psc-keyword">$1</span>');

    strings.forEach((tokenHtml, index) => {
      const placeholder = `@@PSC_STRING_${index}@@`;
      html = html.replace(placeholder, tokenHtml);
    });

    return html;
  };

  const highlightLine = (line) => {
    const { codePart, commentPart } = splitComment(line);
    const codeHtml = highlightCodePart(codePart);
    if (!commentPart) return codeHtml;

    const commentHtml = `<span class="psc-comment">${escapeHtml(normalizeAssignments(commentPart))}</span>`;
    return `${codeHtml}${commentHtml}`;
  };

  const highlightBlock = (codeEl) => {
    if (!(codeEl instanceof HTMLElement)) return;
    if (codeEl.dataset.pscHighlighted === 'true') return;

    const pre = codeEl.closest('pre');
    if (pre instanceof HTMLElement && !pre.dataset.language) {
      pre.dataset.language = 'IGCSE pseudocode';
    }

    const source = codeEl.textContent || '';
    const lines = source.split(/\r?\n/);
    codeEl.innerHTML = lines.map(highlightLine).join('\n');
    codeEl.dataset.pscHighlighted = 'true';
  };

  const run = () => {
    const blocks = document.querySelectorAll('pre code.language-igcse-pseudocode');
    blocks.forEach((block) => highlightBlock(block));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();
