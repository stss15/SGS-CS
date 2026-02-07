(() => {
  const isPrintableTrigger = (element) => element?.closest?.('[data-export-pdf]');

  document.addEventListener('click', (event) => {
    const trigger = isPrintableTrigger(event.target);
    if (!trigger) return;

    event.preventDefault();
    window.print();
  });
})();

