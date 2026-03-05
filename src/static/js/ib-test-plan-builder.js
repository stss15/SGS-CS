(function () {
  const DEFAULT_STORAGE_KEY = 'ib-test-plan-builder-v1';

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getStorageKey(root) {
    return root.getAttribute('data-test-plan-key') || DEFAULT_STORAGE_KEY + ':' + window.location.pathname;
  }

  function createDefaultState() {
    return {
      rows: [],
      nextRowId: 1
    };
  }

  function loadState(storageKey) {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        return createDefaultState();
      }

      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.rows)) {
        return createDefaultState();
      }

      return parsed;
    } catch (_error) {
      return createDefaultState();
    }
  }

  function sanitizeState(state) {
    const rows = Array.isArray(state.rows) ? state.rows : [];

    state.rows = rows.map(function (row) {
      return {
        id: Number(row.id),
        feature: String(row.feature || '').trim(),
        setup: String(row.setup || '').trim(),
        expected: String(row.expected || '').trim(),
        actual: String(row.actual || '').trim(),
        status: String(row.status || 'Pending')
      };
    });

    const maxId = state.rows.reduce(function (highest, row) {
      return Math.max(highest, Number(row.id) || 0);
    }, 0);

    state.nextRowId = Math.max(1, Number(state.nextRowId) || 1, maxId + 1);
  }

  function saveState(storageKey, state) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (_error) {
      // Ignore storage failures.
    }
  }

  function buildRowMarkup(row) {
    return (
      '<tr data-test-row="' +
      row.id +
      '">' +
      '<td><input type="text" data-test-field="feature" value="' +
      escapeHtml(row.feature) +
      '" placeholder="Feature or scenario" /></td>' +
      '<td><textarea rows="4" data-test-field="setup" placeholder="Setup or input">' +
      escapeHtml(row.setup) +
      '</textarea></td>' +
      '<td><textarea rows="4" data-test-field="expected" placeholder="Expected result">' +
      escapeHtml(row.expected) +
      '</textarea></td>' +
      '<td><textarea rows="4" data-test-field="actual" placeholder="Actual result">' +
      escapeHtml(row.actual) +
      '</textarea></td>' +
      '<td>' +
      '<select data-test-field="status">' +
      '<option value="Pending"' +
      (row.status === 'Pending' ? ' selected' : '') +
      '>Pending</option>' +
      '<option value="Pass"' +
      (row.status === 'Pass' ? ' selected' : '') +
      '>Pass</option>' +
      '<option value="Fail"' +
      (row.status === 'Fail' ? ' selected' : '') +
      '>Fail</option>' +
      '</select>' +
      '</td>' +
      '<td><button type="button" class="ib-test-plan-row-remove" data-test-remove-row="' +
      row.id +
      '">Remove</button></td>' +
      '</tr>'
    );
  }

  function initBuilder(root) {
    const storageKey = getStorageKey(root);
    const addRowForm = root.querySelector('[data-test-add-row]');
    const rowsWrap = root.querySelector('[data-test-rows]');
    const resetButton = root.querySelector('[data-test-reset]');

    if (!addRowForm || !rowsWrap || !resetButton) {
      return;
    }

    const state = loadState(storageKey);
    sanitizeState(state);

    function renderRows() {
      if (!state.rows.length) {
        rowsWrap.innerHTML =
          '<tr class="ib-test-plan-empty"><td colspan="6">No tests drafted yet. Add the first row above.</td></tr>';
        saveState(storageKey, state);
        return;
      }

      rowsWrap.innerHTML = state.rows
        .map(function (row) {
          return buildRowMarkup(row);
        })
        .join('');

      saveState(storageKey, state);
    }

    addRowForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(addRowForm);
      const feature = String(formData.get('feature') || '').trim();
      const setup = String(formData.get('setup') || '').trim();
      const expected = String(formData.get('expected') || '').trim();

      if (!feature || !expected) {
        return;
      }

      state.rows.push({
        id: state.nextRowId++,
        feature: feature,
        setup: setup,
        expected: expected,
        actual: '',
        status: 'Pending'
      });

      addRowForm.reset();
      renderRows();
    });

    rowsWrap.addEventListener('input', function (event) {
      const field = event.target.closest('[data-test-field]');
      const rowElement = event.target.closest('[data-test-row]');

      if (!field || !rowElement) {
        return;
      }

      const rowId = Number(rowElement.getAttribute('data-test-row'));
      const row = state.rows.find(function (item) {
        return item.id === rowId;
      });

      if (!row) {
        return;
      }

      const fieldName = field.getAttribute('data-test-field');
      if (!fieldName) {
        return;
      }

      row[fieldName] = String(field.value || '').trim();
      saveState(storageKey, state);
    });

    rowsWrap.addEventListener('change', function (event) {
      const field = event.target.closest('[data-test-field]');
      const rowElement = event.target.closest('[data-test-row]');

      if (!field || !rowElement) {
        return;
      }

      const rowId = Number(rowElement.getAttribute('data-test-row'));
      const row = state.rows.find(function (item) {
        return item.id === rowId;
      });

      if (!row) {
        return;
      }

      const fieldName = field.getAttribute('data-test-field');
      if (!fieldName) {
        return;
      }

      row[fieldName] = String(field.value || '').trim();
      saveState(storageKey, state);
    });

    rowsWrap.addEventListener('click', function (event) {
      const button = event.target.closest('[data-test-remove-row]');
      if (!button) {
        return;
      }

      const rowId = Number(button.getAttribute('data-test-remove-row'));
      state.rows = state.rows.filter(function (row) {
        return row.id !== rowId;
      });
      renderRows();
    });

    resetButton.addEventListener('click', function () {
      state.rows = [];
      state.nextRowId = 1;

      try {
        localStorage.removeItem(storageKey);
      } catch (_error) {
        // Ignore storage failures.
      }

      renderRows();
    });

    renderRows();
  }

  function bootstrap() {
    document.querySelectorAll('[data-test-plan-builder]').forEach(function (root) {
      initBuilder(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
