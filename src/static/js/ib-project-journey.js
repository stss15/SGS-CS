(function () {
  const HASH_PATTERN = /^#s(\d+)-p(\d+)(?:-b(\d+))?$/;

  function parseHash(hashValue) {
    const match = HASH_PATTERN.exec(hashValue || '');
    if (!match) {
      return null;
    }

    return {
      stage: Number(match[1]),
      part: Number(match[2]),
      block: match[3] ? Number(match[3]) : 1
    };
  }

  function buildFlatMap(stagePanels, partPanels) {
    const flat = [];

    stagePanels.forEach((stagePanel) => {
      const stageIndex = Number(stagePanel.dataset.stageIndex || '0');
      const stageParts = partPanels
        .filter((panel) => Number(panel.dataset.stageIndex || '0') === stageIndex)
        .sort((left, right) => Number(left.dataset.partIndex || '0') - Number(right.dataset.partIndex || '0'));

      stageParts.forEach((partPanel) => {
        const partIndex = Number(partPanel.dataset.partIndex || '0');
        const blockCount = Number(partPanel.dataset.blockCount || '1');

        for (let blockIndex = 1; blockIndex <= blockCount; blockIndex += 1) {
          flat.push({ stage: stageIndex, part: partIndex, block: blockIndex });
        }
      });
    });

    return flat;
  }

  function getText(element) {
    return element ? (element.textContent || '').replace(/\s+/g, ' ').trim() : '';
  }

  function truncateText(text, limit) {
    if (text.length <= limit) {
      return text;
    }

    return text.slice(0, limit - 1).trimEnd() + '…';
  }

  function classifyBlock(title) {
    const lower = title.toLowerCase();

    if (lower.includes('task')) {
      return 'task';
    }

    if (lower.includes('criteria') || lower.includes('evaluation') || lower.includes('test')) {
      return 'criteria';
    }

    if (
      lower.includes('wireframe') ||
      lower.includes('diagram') ||
      lower.includes('flowchart') ||
      lower.includes('erd')
    ) {
      return 'visual';
    }

    if (lower.includes('builder') || lower.includes('template')) {
      return 'tool';
    }

    if (lower.includes('reference') || lower.includes('concept') || lower.includes('theory')) {
      return 'reference';
    }

    if (lower.includes('problem') || lower.includes('brief') || lower.includes('requirements')) {
      return 'brief';
    }

    if (lower.includes('files')) {
      return 'files';
    }

    return 'core';
  }

  function enhanceBlocks(partPanels) {
    partPanels.forEach((panel) => {
      const stageIndex = Number(panel.dataset.stageIndex || '0');
      const partIndex = Number(panel.dataset.partIndex || '0');
      const partHeader = panel.querySelector('.ib-journey-part-header');
      const partBody = panel.querySelector('.ib-journey-part-body');

      if (!partHeader || !partBody) {
        return;
      }

      const blocks = Array.from(partBody.querySelectorAll(':scope > .journey-block'));

      if (!blocks.length) {
        panel.dataset.blockCount = '1';
        return;
      }

      panel.dataset.blockCount = String(blocks.length);

      const blockTabs = document.createElement('div');
      blockTabs.className = 'ib-journey-block-tabs';
      blockTabs.setAttribute('role', 'tablist');
      blockTabs.setAttribute('aria-label', 'Focus cards');

      blocks.forEach((block, blockOffset) => {
        const blockIndex = blockOffset + 1;
        const heading = block.querySelector('h5, h6');
        const firstParagraph = block.querySelector('p');
        const title = getText(heading) || `Focus card ${blockIndex}`;
        const teaser = truncateText(getText(firstParagraph), 96);

        block.setAttribute('data-block-panel', '');
        block.dataset.stageIndex = String(stageIndex);
        block.dataset.partIndex = String(partIndex);
        block.dataset.blockIndex = String(blockIndex);
        block.dataset.blockTitle = title;
        block.dataset.blockTone = classifyBlock(title);
        block.id = `journey-block-panel-${stageIndex}-${partIndex}-${blockIndex}`;
        block.setAttribute('role', 'tabpanel');
        block.setAttribute('aria-labelledby', `journey-block-tab-${stageIndex}-${partIndex}-${blockIndex}`);
        block.hidden = blockIndex !== 1;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'ib-journey-block-btn' + (blockIndex === 1 ? ' is-active' : '');
        button.setAttribute('data-block-target', '');
        button.dataset.stageIndex = String(stageIndex);
        button.dataset.partIndex = String(partIndex);
        button.dataset.blockIndex = String(blockIndex);
        button.id = `journey-block-tab-${stageIndex}-${partIndex}-${blockIndex}`;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', blockIndex === 1 ? 'true' : 'false');
        button.setAttribute('aria-controls', block.id);
        button.innerHTML =
          '<span class="ib-journey-block-number">' +
          blockIndex +
          '</span>' +
          '<span class="ib-journey-block-copy">' +
          '<strong>' +
          title +
          '</strong>' +
          (teaser ? '<small>' + teaser + '</small>' : '') +
          '</span>';

        blockTabs.appendChild(button);
      });

      if (blocks.length > 1) {
        const blockRail = document.createElement('section');
        blockRail.className = 'ib-journey-block-rail';
        blockRail.innerHTML =
          '<div class="ib-journey-block-rail-head">' +
          '<div>' +
          '<p class="ib-journey-block-label">Focus cards</p>' +
          '<p class="ib-journey-block-intro">Work through one subtopic at a time before moving on.</p>' +
          '</div>' +
          '<p class="ib-journey-block-count">' +
          blocks.length +
          ' cards</p>' +
          '</div>';
        blockRail.appendChild(blockTabs);
        partHeader.insertAdjacentElement('afterend', blockRail);
        return;
      }

      panel.classList.add('ib-journey-part--single-block');
    });
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
    const blockProgressLabel = root.querySelector('[data-journey-block-progress]');

    if (!stageButtons.length || !stagePanels.length || !partButtons.length || !partPanels.length) {
      return;
    }

    enhanceBlocks(partPanels);

    const blockButtons = Array.from(root.querySelectorAll('[data-block-target]'));
    const blockPanels = Array.from(root.querySelectorAll('[data-block-panel]'));
    const stageTotal = stagePanels.length;
    const flatMap = buildFlatMap(stagePanels, partPanels);

    let activeStage = 1;
    let activePart = 1;
    let activeBlock = 1;

    function getStagePanel(stage) {
      return stagePanels.find((panel) => Number(panel.dataset.stageIndex || '0') === stage) || null;
    }

    function getStagePartPanels(stage) {
      return partPanels
        .filter((panel) => Number(panel.dataset.stageIndex || '0') === stage)
        .sort((left, right) => Number(left.dataset.partIndex || '0') - Number(right.dataset.partIndex || '0'));
    }

    function getPartPanel(stage, part) {
      return (
        partPanels.find(
          (panel) =>
            Number(panel.dataset.stageIndex || '0') === stage &&
            Number(panel.dataset.partIndex || '0') === part
        ) || null
      );
    }

    function getBlockPanel(stage, part, block) {
      return (
        blockPanels.find(
          (panel) =>
            Number(panel.dataset.stageIndex || '0') === stage &&
            Number(panel.dataset.partIndex || '0') === part &&
            Number(panel.dataset.blockIndex || '0') === block
        ) || null
      );
    }

    function findFlatIndex(stage, part, block) {
      return flatMap.findIndex(
        (entry) => entry.stage === stage && entry.part === part && entry.block === block
      );
    }

    function clampState(stage, part, block) {
      const stageIndex = Math.min(Math.max(1, stage), stageTotal);
      const stagePartPanels = getStagePartPanels(stageIndex);
      const partCount = stagePartPanels.length || 1;
      const partIndex = Math.min(Math.max(1, part), partCount);
      const partPanel = getPartPanel(stageIndex, partIndex);
      const blockCount = Number(partPanel && partPanel.dataset.blockCount ? partPanel.dataset.blockCount : '1');
      const blockIndex = Math.min(Math.max(1, block), Math.max(1, blockCount));

      return { stage: stageIndex, part: partIndex, block: blockIndex };
    }

    function updateHash(stage, part, block) {
      const hashValue = `#s${stage}-p${part}-b${block}`;
      if (window.location.hash !== hashValue) {
        window.history.replaceState(null, '', hashValue);
      }
    }

    function scrollToActivePart(stage, part) {
      const partPanel = getPartPanel(stage, part);
      if (!partPanel) {
        return;
      }

      const targetY = partPanel.getBoundingClientRect().top + window.scrollY - 110;
      if (Math.abs(window.scrollY - targetY) > 36) {
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }

    function updatePartStatuses() {
      partPanels.forEach((panel) => {
        const statusLabel = panel.querySelector('[data-part-focus-status]');
        if (!statusLabel) {
          return;
        }

        const blockCount = Number(panel.dataset.blockCount || '1');
        const stageIndex = Number(panel.dataset.stageIndex || '0');
        const partIndex = Number(panel.dataset.partIndex || '0');

        if (stageIndex === activeStage && partIndex === activePart) {
          statusLabel.textContent = blockCount > 1 ? `Card ${activeBlock} of ${blockCount}` : 'Single focus card';
          return;
        }

        statusLabel.textContent = blockCount > 1 ? `${blockCount} focus cards` : 'Single focus card';
      });
    }

    function updateControls() {
      const flatIndex = findFlatIndex(activeStage, activePart, activeBlock);
      const totalSteps = flatMap.length;
      const humanIndex = flatIndex + 1;
      const stagePanel = getStagePanel(activeStage);
      const stageLabel = stagePanel && stagePanel.dataset.stageLabel ? stagePanel.dataset.stageLabel : `Stage ${activeStage}`;
      const stageTitle = stagePanel && stagePanel.dataset.stageTitle ? stagePanel.dataset.stageTitle : '';
      const stagePartPanels = getStagePartPanels(activeStage);
      const partCount = stagePartPanels.length || 1;
      const partPanel = getPartPanel(activeStage, activePart);
      const blockCount = Number(partPanel && partPanel.dataset.blockCount ? partPanel.dataset.blockCount : '1');
      const blockPanel = getBlockPanel(activeStage, activePart, activeBlock);
      const blockTitle = blockPanel && blockPanel.dataset.blockTitle ? blockPanel.dataset.blockTitle : `Focus card ${activeBlock}`;

      if (currentLabel) {
        currentLabel.textContent = `${stageLabel}: ${stageTitle}`;
      }

      if (progressLabel) {
        progressLabel.textContent = `Part ${activePart} of ${partCount} · Step ${humanIndex} of ${totalSteps}`;
      }

      if (blockProgressLabel) {
        if (blockCount > 1) {
          blockProgressLabel.hidden = false;
          blockProgressLabel.textContent = `Focus card ${activeBlock} of ${blockCount}: ${blockTitle}`;
        } else {
          blockProgressLabel.hidden = true;
          blockProgressLabel.textContent = '';
        }
      }

      if (prevButton) {
        prevButton.disabled = flatIndex <= 0;
      }

      if (nextButton) {
        nextButton.disabled = flatIndex >= totalSteps - 1;
      }

      updatePartStatuses();
    }

    function applyState(stage, part, block, shouldWriteHash, shouldScroll) {
      const clamped = clampState(stage, part, block);
      activeStage = clamped.stage;
      activePart = clamped.part;
      activeBlock = clamped.block;

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

      blockButtons.forEach((button) => {
        const stageIndex = Number(button.dataset.stageIndex || '0');
        const partIndex = Number(button.dataset.partIndex || '0');
        const blockIndex = Number(button.dataset.blockIndex || '0');
        const isActive =
          stageIndex === activeStage &&
          partIndex === activePart &&
          blockIndex === activeBlock;

        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      blockPanels.forEach((panel) => {
        const stageIndex = Number(panel.dataset.stageIndex || '0');
        const partIndex = Number(panel.dataset.partIndex || '0');
        const blockIndex = Number(panel.dataset.blockIndex || '0');
        const isActive =
          stageIndex === activeStage &&
          partIndex === activePart &&
          blockIndex === activeBlock;

        panel.hidden = !isActive;
      });

      updateControls();

      if (shouldWriteHash) {
        updateHash(activeStage, activePart, activeBlock);
      }

      if (shouldScroll) {
        scrollToActivePart(activeStage, activePart);
      }
    }

    stageButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const stageIndex = Number(button.dataset.stageIndex || '1');
        applyState(stageIndex, 1, 1, true, true);
      });
    });

    partButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const stageIndex = Number(button.dataset.stageIndex || '1');
        const partIndex = Number(button.dataset.partIndex || '1');
        applyState(stageIndex, partIndex, 1, true, true);
      });
    });

    blockButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const stageIndex = Number(button.dataset.stageIndex || '1');
        const partIndex = Number(button.dataset.partIndex || '1');
        const blockIndex = Number(button.dataset.blockIndex || '1');
        applyState(stageIndex, partIndex, blockIndex, true, false);
      });
    });

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        const flatIndex = findFlatIndex(activeStage, activePart, activeBlock);
        if (flatIndex <= 0) {
          return;
        }

        const previous = flatMap[flatIndex - 1];
        applyState(previous.stage, previous.part, previous.block, true, true);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const flatIndex = findFlatIndex(activeStage, activePart, activeBlock);
        if (flatIndex >= flatMap.length - 1) {
          return;
        }

        const next = flatMap[flatIndex + 1];
        applyState(next.stage, next.part, next.block, true, true);
      });
    }

    window.addEventListener('hashchange', () => {
      const hashState = parseHash(window.location.hash);
      if (!hashState) {
        return;
      }

      applyState(hashState.stage, hashState.part, hashState.block, false, false);
    });

    const initialHashState = parseHash(window.location.hash);
    if (initialHashState) {
      applyState(initialHashState.stage, initialHashState.part, initialHashState.block, false, false);
      updateHash(activeStage, activePart, activeBlock);
      return;
    }

    applyState(1, 1, 1, true, false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-ib-journey]').forEach((root) => initJourney(root));
    });
    return;
  }

  document.querySelectorAll('[data-ib-journey]').forEach((root) => initJourney(root));
})();
