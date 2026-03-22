document.addEventListener('DOMContentLoaded', () => {
  if (window.hljs) {
    document
      .querySelectorAll('.sql-syntax-body pre code, .sql-answer-body pre code')
      .forEach((block) => {
        block.classList.add('language-sql');
        window.hljs.highlightElement(block);
      });
  }

  document.querySelectorAll('[data-answer-gate]').forEach((gate) => {
    const encodedPassword = gate.getAttribute('data-answer-gate') || 'dGVhY2hlcjE=';
    const input = gate.querySelector('[data-answer-input]');
    const button = gate.querySelector('[data-answer-button]');
    const error = gate.querySelector('[data-answer-error]');
    const lock = gate.querySelector('[data-answer-lock]');
    const content = gate.querySelector('[data-answer-content]');

    if (!input || !button || !lock || !content) {
      return;
    }

    const unlock = () => {
      if (input.value === atob(encodedPassword)) {
        content.hidden = false;
        lock.hidden = true;
        if (error) {
          error.textContent = '';
        }
        return;
      }

      if (error) {
        error.textContent = 'Incorrect password. Try again.';
      }
      input.value = '';
      input.focus();
    };

    button.addEventListener('click', unlock);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        unlock();
      }
    });
  });
});
