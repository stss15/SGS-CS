document.addEventListener('DOMContentLoaded', () => {
  if (!window.hljs) {
    return;
  }

  document.querySelectorAll('.ib-project-sequence pre code').forEach((block) => {
    window.hljs.highlightElement(block);
  });
});
