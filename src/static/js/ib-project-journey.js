(function () {
  const HASH_PATTERN = /^#s(\d+)-p(\d+)$/;

  function parseHash(hashValue) {
    const match = HASH_PATTERN.exec(hashValue || '');
    if (!match) {
      return null;
    }

    return {
      stage: Number(match[1]),
      part: Number(match[2])
    };
  }

  function buildFlatMap(stagePanels) {
    const flat = [];
    stagePanels.forEach((panel) => {
      const stageIndex = Number(panel.dataset.stageIndex || '0');
      const partCount = Number(panel.dataset.partCount || '0');
      for (let partIndex = 1; partIndex <= partCount; partIndex += 1) {
        flat.push({ stage: stageIndex, part: partIndex });
      }
    });
    return flat;
  }

  function initJourney(root) {
    const stageButtons = Array.from(root.querySelectorAll('[data-stage-target]'));
    const stagePanels = Array.from(root.querySelectorAll('[data-stage-panel]'));
    const partButtons = Array.from(root.querySelectorAll('[data-part-target]'));
    const partPanels = Array.from(root.querySelectorAll('[data-part-panel]'));
    const prevButton = root.querySelector('[data-journey-action="prev"]');
    const nextButton = root.querySelector('[data-journey-action="next"]');
    const currentLabel = root.querySelector('[data-journey-current]');
    const progressLabel = root.querySelector('[data-journey-progress]');

    if (!stageButtons.length || !stagePanels.length || !partButtons.length || !partPanels.length) {
      return;
    }

    const flatMap = buildFlatMap(stagePanels);
    const stageTotal = stagePanels.length;
    let activeStage = 1;
    let activePart = 1;

    function findFlatIndex(stage, part) {
      return flatMap.findIndex((entry) => entry.stage === stage && entry.part === part);
    }

    function clampState(stage, part) {
      const stageIndex = Math.min(Math.max(1, stage), stageTotal);
      const stagePanel = stagePanels.find((panel) => Number(panel.dataset.stageIndex || '0') === stageIndex);
      const partCount = Number(stagePanel && stagePanel.dataset.partCount ? stagePanel.dataset.partCount : 1);
      const partIndex = Math.min(Math.max(1, part), Math.max(1, partCount));

      return { stage: stageIndex, part: partIndex };
    }

    function updateHash(stage, part) {
      const hashValue = `#s${stage}-p${part}`;
      if (window.location.hash !== hashValue) {
        window.history.replaceState(null, '', hashValue);
      }
    }

    function updateControls() {
      const flatIndex = findFlatIndex(activeStage, activePart);
      const totalSteps = flatMap.length;
      const humanIndex = flatIndex + 1;

      const stagePanel = stagePanels.find((panel) => Number(panel.dataset.stageIndex || '0') === activeStage);
      const stageLabel = stagePanel && stagePanel.dataset.stageLabel ? stagePanel.dataset.stageLabel : `Stage ${activeStage}`;
      const stageTitle = stagePanel && stagePanel.dataset.stageTitle ? stagePanel.dataset.stageTitle : '';
      const partCount = Number(stagePanel && stagePanel.dataset.partCount ? stagePanel.dataset.partCount : 1);

      if (currentLabel) {
        currentLabel.textContent = `${stageLabel}: ${stageTitle} - Part ${activePart} of ${partCount}`;
      }

      if (progressLabel) {
        progressLabel.textContent = `Step ${humanIndex} of ${totalSteps}`;
      }

      if (prevButton) {
        prevButton.disabled = flatIndex <= 0;
      }

      if (nextButton) {
        nextButton.disabled = flatIndex >= totalSteps - 1;
      }
    }

    function applyState(stage, part, shouldWriteHash) {
      const clamped = clampState(stage, part);
      activeStage = clamped.stage;
      activePart = clamped.part;

      stageButtons.forEach((button) => {
        const isActive = Number(button.dataset.stageIndex || '0') === activeStage;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      stagePanels.forEach((panel) => {
        const isActive = Number(panel.dataset.stageIndex || '0') === activeStage;
        panel.hidden = !isActive;
      });

      partButtons.forEach((button) => {
        const stageIndex = Number(button.dataset.stageIndex || '0');
        const partIndex = Number(button.dataset.partIndex || '0');
        const isActive = stageIndex === activeStage && partIndex === activePart;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      partPanels.forEach((panel) => {
        const stageIndex = Number(panel.dataset.stageIndex || '0');
        const partIndex = Number(panel.dataset.partIndex || '0');
        const isActive = stageIndex === activeStage && partIndex === activePart;
        panel.hidden = !isActive;
      });

      updateControls();

      if (shouldWriteHash) {
        updateHash(activeStage, activePart);
      }
    }

    stageButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const stageIndex = Number(button.dataset.stageIndex || '1');
        applyState(stageIndex, 1, true);
      });
    });

    partButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const stageIndex = Number(button.dataset.stageIndex || '1');
        const partIndex = Number(button.dataset.partIndex || '1');
        applyState(stageIndex, partIndex, true);
      });
    });

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        const flatIndex = findFlatIndex(activeStage, activePart);
        if (flatIndex <= 0) {
          return;
        }
        const previous = flatMap[flatIndex - 1];
        applyState(previous.stage, previous.part, true);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const flatIndex = findFlatIndex(activeStage, activePart);
        if (flatIndex >= flatMap.length - 1) {
          return;
        }
        const next = flatMap[flatIndex + 1];
        applyState(next.stage, next.part, true);
      });
    }

    window.addEventListener('hashchange', () => {
      const hashState = parseHash(window.location.hash);
      if (!hashState) {
        return;
      }
      applyState(hashState.stage, hashState.part, false);
    });

    const initialHashState = parseHash(window.location.hash);
    if (initialHashState) {
      applyState(initialHashState.stage, initialHashState.part, false);
      updateHash(activeStage, activePart);
      return;
    }

    applyState(1, 1, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-ib-journey]').forEach((root) => initJourney(root));
    });
    return;
  }

  document.querySelectorAll('[data-ib-journey]').forEach((root) => initJourney(root));
})();
