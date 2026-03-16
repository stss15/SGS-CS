const CUSTOM_DATASET_VALUE = '__blank_workspace__';
const IMPORTED_DATASET_VALUE = '__imported_workspace__';
const EXPORT_FORMAT = 'sgs-sql-playground/v1';
const DEFAULT_BLANK_NAME = 'Blank Workspace';
const STORAGE_KEYS = {
  sidebarWidth: 'sgs-sql-playground/sidebar-width',
  inspectorHeight: 'sgs-sql-playground/inspector-height'
};

const SQL_KEYWORDS = [
  'SELECT',
  'FROM',
  'WHERE',
  'ORDER BY',
  'GROUP BY',
  'HAVING',
  'JOIN',
  'INNER JOIN',
  'LEFT JOIN',
  'RIGHT JOIN',
  'ON',
  'COUNT',
  'SUM',
  'AVG',
  'MAX',
  'MIN',
  'ROUND',
  'AS',
  'DISTINCT',
  'LIMIT',
  'AND',
  'OR',
  'NOT',
  'IN',
  'LIKE',
  'BETWEEN',
  'INSERT INTO',
  'UPDATE',
  'DELETE',
  'CREATE TABLE',
  'ALTER TABLE',
  'DROP TABLE',
  'VALUES',
  'SET',
  'PRIMARY KEY',
  'FOREIGN KEY',
  'REFERENCES'
];

const state = {
  sqlEngine: null,
  catalog: null,
  datasetCatalogEntry: null,
  dataset: null,
  db: null,
  mode: 'hl',
  workspaceSource: 'sample',
  inspectorView: 'results',
  schema: [],
  selectedTable: '',
  query: '',
  result: null,
  error: '',
  executionTime: null,
  statusMessage: 'Loading SQL playground...',
  isLoading: true,
  importedFileName: '',
  resetWorkspaceDefinition: null,
  suggestions: {
    visible: false,
    items: [],
    activeIndex: 0,
    wordStart: 0,
    coords: { left: 18, top: 18 }
  },
  layout: {
    sidebarWidth: 296,
    inspectorHeight: 280
  },
  datasetCache: new Map()
};

const elements = {};

const SVG_TABLE_WIDTH = 220;
const SVG_HEADER_HEIGHT = 36;
const SVG_COLUMN_HEIGHT = 24;
const SVG_CARD_PADDING = 18;
const ERD_GRID_GAP_X = 300;
const ERD_GRID_GAP_Y = 260;
const ERD_GRID_PADDING = 24;

document.addEventListener('DOMContentLoaded', () => {
  void init();
});

async function init() {
  cacheElements();
  bindEvents();
  renderLoading('Loading SQL engine and sample databases...');

  try {
    await waitForLibraries();
    state.catalog = await fetchJson('/data/sql-playground/catalog.json');
    state.sqlEngine = await window.initSqlJs({
      locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });

    const initialPreferences = resolveInitialPreferences();

    if (initialPreferences.datasetId === CUSTOM_DATASET_VALUE) {
      await loadBlankWorkspace();
      return;
    }

    await loadSampleDataset(initialPreferences.datasetId);
  } catch (error) {
    renderFatalError(error instanceof Error ? error.message : 'Unable to load the SQL playground.');
  }
}

function cacheElements() {
  elements.page = document.getElementById('sql-playground-page');
  elements.playgroundShell = document.getElementById('playground-shell');
  elements.workspacePanel = document.getElementById('workspace-panel');
  elements.workspacePill = document.getElementById('workspace-pill');
  elements.datasetSelect = document.getElementById('dataset-select');
  elements.importJsonButton = document.getElementById('import-json-button');
  elements.exportJsonButton = document.getElementById('export-json-button');
  elements.importJsonInput = document.getElementById('import-json-input');
  elements.tableCount = document.getElementById('table-count');
  elements.tableList = document.getElementById('table-list');
  elements.schemaTableList = document.getElementById('schema-table-list');
  elements.erdStage = document.getElementById('erd-stage');
  elements.relationshipList = document.getElementById('relationship-list');
  elements.sidebarSplitter = document.getElementById('sidebar-splitter');
  elements.resultsSplitter = document.getElementById('results-splitter');
  elements.inspectorTabs = Array.from(document.querySelectorAll('[data-inspector-view]'));
  elements.inspectorViews = {
    results: document.getElementById('inspector-view-results'),
    schema: document.getElementById('inspector-view-schema'),
    erd: document.getElementById('inspector-view-erd')
  };
  elements.runQueryButton = document.getElementById('run-query-button');
  elements.editorShell = document.getElementById('editor-shell');
  elements.queryInput = document.getElementById('query-input');
  elements.editorHighlight = document.getElementById('editor-highlight');
  elements.editorHighlightCode = document.getElementById('editor-highlight-code');
  elements.querySuggestions = document.getElementById('query-suggestions');
  elements.editorStatus = document.getElementById('editor-status');
  elements.resultsMeta = document.getElementById('results-meta');
  elements.resultsOutput = document.getElementById('results-output');
}

function bindEvents() {
  loadLayoutPreferences();
  applyLayout();

  elements.datasetSelect.addEventListener('change', async (event) => {
    const selectedValue = event.target.value;

    await runWorkspaceAction('Loading workspace...', async () => {
      if (selectedValue === CUSTOM_DATASET_VALUE) {
        await loadBlankWorkspace();
        return;
      }

      if (selectedValue === IMPORTED_DATASET_VALUE) {
        return;
      }

      await loadSampleDataset(selectedValue);
    });
  });

  elements.importJsonButton.addEventListener('click', () => {
    elements.importJsonInput.click();
  });

  elements.importJsonInput.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    await runWorkspaceAction(`Importing ${file.name}...`, async () => {
      await importWorkspaceFile(file);
    });
  });

  elements.exportJsonButton.addEventListener('click', () => {
    try {
      exportWorkspaceJson();
    } catch (error) {
      reportActionError(error instanceof Error ? error.message : 'The workspace could not be exported.');
    }
  });

  elements.tableList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-table]');
    if (!button) return;
    previewTable(button.dataset.table);
  });

  elements.schemaTableList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-table]');
    if (!button) return;
    previewTable(button.dataset.table);
  });

  elements.erdStage.addEventListener('click', (event) => {
    const node = event.target.closest('[data-table-node]');
    if (!node) return;
    previewTable(node.getAttribute('data-table-node'));
  });

  elements.erdStage.addEventListener('keydown', (event) => {
    const node = event.target.closest('[data-table-node]');
    if (!node) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      previewTable(node.getAttribute('data-table-node'));
    }
  });

  elements.inspectorTabs.forEach((button) => {
    button.addEventListener('click', () => {
      setInspectorView(button.dataset.inspectorView || 'results');
    });
  });

  elements.runQueryButton.addEventListener('click', () => {
    runQuery();
  });

  elements.queryInput.addEventListener('input', handleQueryInput);
  elements.queryInput.addEventListener('scroll', syncEditorScroll);
  elements.queryInput.addEventListener('keydown', handleEditorKeyDown);
  elements.queryInput.addEventListener('click', () => {
    hideSuggestions();
  });

  elements.querySuggestions.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-suggestion]');
    if (!button) return;
    applySuggestion(button.dataset.suggestion);
  });

  document.addEventListener('click', (event) => {
    if (!elements.editorShell.contains(event.target)) {
      hideSuggestions();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.suggestions.visible) {
      hideSuggestions();
    }
  });

  bindPaneResize();
  window.addEventListener('resize', () => {
    applyLayout();
  });
}

function loadLayoutPreferences() {
  state.layout.sidebarWidth = parseStoredNumber(STORAGE_KEYS.sidebarWidth, state.layout.sidebarWidth);
  state.layout.inspectorHeight = parseStoredNumber(
    STORAGE_KEYS.inspectorHeight,
    state.layout.inspectorHeight
  );
}

function parseStoredNumber(key, fallback) {
  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return fallback;

    const parsed = Number.parseInt(rawValue, 10);
    return Number.isFinite(parsed) ? parsed : fallback;
  } catch (_error) {
    return fallback;
  }
}

function applyLayout() {
  if (!elements.playgroundShell || !elements.workspacePanel) return;

  const shellWidth = elements.playgroundShell.clientWidth || 1200;
  const workspaceHeight = elements.workspacePanel.clientHeight || 720;
  const sidebarWidth = clamp(state.layout.sidebarWidth, 220, Math.max(260, shellWidth - 560));
  const inspectorHeight = clamp(
    state.layout.inspectorHeight,
    190,
    Math.max(220, workspaceHeight - 220)
  );

  state.layout.sidebarWidth = sidebarWidth;
  state.layout.inspectorHeight = inspectorHeight;

  elements.playgroundShell.style.setProperty('--sidebar-width', `${sidebarWidth}px`);
  elements.workspacePanel.style.setProperty('--inspector-height', `${inspectorHeight}px`);
}

function bindPaneResize() {
  bindHorizontalResize(elements.sidebarSplitter, (startWidth, deltaX) => {
    state.layout.sidebarWidth = startWidth + deltaX;
    applyLayout();
    persistLayout(STORAGE_KEYS.sidebarWidth, state.layout.sidebarWidth);
  }, () => state.layout.sidebarWidth);

  bindVerticalResize(elements.resultsSplitter, (startHeight, deltaY) => {
    state.layout.inspectorHeight = startHeight - deltaY;
    applyLayout();
    persistLayout(STORAGE_KEYS.inspectorHeight, state.layout.inspectorHeight);
  }, () => state.layout.inspectorHeight);
}

function bindHorizontalResize(handle, onDrag, getStartValue) {
  if (!handle) return;

  handle.addEventListener('pointerdown', (event) => {
    if (window.matchMedia('(max-width: 960px)').matches) return;

    event.preventDefault();
    const startX = event.clientX;
    const startValue = getStartValue();
    handle.setPointerCapture(event.pointerId);

    const handlePointerMove = (moveEvent) => {
      onDrag(startValue, moveEvent.clientX - startX);
    };

    const stopDragging = (endEvent) => {
      handle.releasePointerCapture(endEvent.pointerId);
      handle.removeEventListener('pointermove', handlePointerMove);
      handle.removeEventListener('pointerup', stopDragging);
      handle.removeEventListener('pointercancel', stopDragging);
    };

    handle.addEventListener('pointermove', handlePointerMove);
    handle.addEventListener('pointerup', stopDragging);
    handle.addEventListener('pointercancel', stopDragging);
  });
}

function bindVerticalResize(handle, onDrag, getStartValue) {
  if (!handle) return;

  handle.addEventListener('pointerdown', (event) => {
    if (window.matchMedia('(max-width: 960px)').matches) return;

    event.preventDefault();
    const startY = event.clientY;
    const startValue = getStartValue();
    handle.setPointerCapture(event.pointerId);

    const handlePointerMove = (moveEvent) => {
      onDrag(startValue, moveEvent.clientY - startY);
    };

    const stopDragging = (endEvent) => {
      handle.releasePointerCapture(endEvent.pointerId);
      handle.removeEventListener('pointermove', handlePointerMove);
      handle.removeEventListener('pointerup', stopDragging);
      handle.removeEventListener('pointercancel', stopDragging);
    };

    handle.addEventListener('pointermove', handlePointerMove);
    handle.addEventListener('pointerup', stopDragging);
    handle.addEventListener('pointercancel', stopDragging);
  });
}

function persistLayout(key, value) {
  try {
    window.localStorage.setItem(key, String(Math.round(value)));
  } catch (_error) {
    // Ignore storage issues. Layout can still work for this session.
  }
}

async function runWorkspaceAction(message, action) {
  if (!state.sqlEngine) return;

  try {
    state.isLoading = true;
    state.statusMessage = message;
    renderEditorStatus();
    updateControlStates();
    await action();
  } catch (error) {
    state.isLoading = false;
    reportActionError(
      error instanceof Error ? error.message : 'The playground could not complete that action.'
    );
    updateControlStates();
  } finally {
    if (state.isLoading) {
      state.isLoading = false;
      renderEditorStatus();
      updateControlStates();
    }
  }
}

function reportActionError(message) {
  if (!state.dataset) {
    renderFatalError(message);
    return;
  }

  state.statusMessage = message;
  renderEditorStatus(true);
}

function resolveInitialPreferences() {
  const params = new URLSearchParams(window.location.search);
  const requestedDatasetId = params.get('dataset');
  return { datasetId: requestedDatasetId || CUSTOM_DATASET_VALUE };
}

function updateUrlState() {
  const url = new URL(window.location.href);

  if (state.workspaceSource === 'sample' && state.datasetCatalogEntry?.id) {
    url.searchParams.set('dataset', state.datasetCatalogEntry.id);
  } else if (state.workspaceSource === 'blank') {
    url.searchParams.set('dataset', CUSTOM_DATASET_VALUE);
  } else {
    url.searchParams.delete('dataset');
  }

  window.history.replaceState({}, '', url.toString());
}

function getSampleDatasetsForMode() {
  if (!state.catalog) return [];
  return Array.isArray(state.catalog.datasets) ? state.catalog.datasets : [];
}

async function loadSampleDataset(requestedDatasetId) {
  const availableDatasets = getSampleDatasetsForMode();
  const nextEntry =
    availableDatasets.find((dataset) => dataset.id === requestedDatasetId) ||
    availableDatasets[0] ||
    null;

  if (!nextEntry) {
    throw new Error('No sample datasets are available right now.');
  }

  const dataset = await getDatasetDefinition(nextEntry);
  await loadWorkspaceDefinition(dataset, {
    workspaceSource: 'sample',
    catalogEntry: nextEntry,
    importedFileName: '',
    resetSource: dataset,
    statusMessage: `${dataset.name} loaded from the sample JSON.`
  });
}

async function loadBlankWorkspace(options = {}) {
  const blankWorkspace = createBlankWorkspaceDefinition(state.mode);
  await loadWorkspaceDefinition(blankWorkspace, {
    workspaceSource: 'blank',
    catalogEntry: null,
    importedFileName: '',
    resetSource: blankWorkspace,
    statusMessage: 'Blank workspace ready. Start with CREATE TABLE.'
  });
}

async function importWorkspaceFile(file) {
  let parsed;

  try {
    parsed = JSON.parse(await file.text());
  } catch (error) {
    throw new Error(`${file.name} is not valid JSON.`);
  }

  const importedWorkspace = normalizeWorkspaceDefinition(parsed, {
    fallbackName: stripFileExtension(file.name),
    mode: isValidMode(parsed?.difficulty) ? parsed.difficulty : state.mode,
    workspaceSource: 'imported'
  });

  state.mode = importedWorkspace.difficulty;
  await loadWorkspaceDefinition(importedWorkspace, {
    workspaceSource: 'imported',
    catalogEntry: null,
    importedFileName: file.name,
    resetSource: importedWorkspace,
    statusMessage: `${importedWorkspace.name} imported from ${file.name}.`
  });
}

async function loadWorkspaceDefinition(definition, options) {
  const normalizedWorkspace = normalizeWorkspaceDefinition(definition, {
    fallbackName: definition?.name || DEFAULT_BLANK_NAME,
    mode: state.mode,
    workspaceSource: options.workspaceSource
  });
  const db = buildDatabaseFromDataset(normalizedWorkspace);

  state.mode = normalizedWorkspace.difficulty;
  state.datasetCatalogEntry = options.catalogEntry || null;
  state.workspaceSource = options.workspaceSource;
  state.importedFileName = options.importedFileName || '';
  state.resetWorkspaceDefinition = cloneJson(options.resetSource || normalizedWorkspace);
  state.dataset = normalizedWorkspace;
  state.db = db;
  state.error = '';
  state.result = null;
  state.executionTime = null;
  state.schema = getLiveSchema(db, normalizedWorkspace);
  state.selectedTable = state.schema[0]?.name || '';
  state.inspectorView = 'results';
  state.isLoading = false;
  state.statusMessage = options.statusMessage || `${normalizedWorkspace.name} loaded.`;

  const nextQuery =
    normalizedWorkspace.defaultQuery ||
    (state.selectedTable ? buildPreviewQuery(state.selectedTable) : buildBlankPrompt());

  setQuery(nextQuery, { preserveStatus: true });
  updateUrlState();
  renderAll();
}

async function getDatasetDefinition(entry) {
  if (state.datasetCache.has(entry.id)) {
    return cloneJson(state.datasetCache.get(entry.id));
  }

  const dataset = await fetchJson(entry.file);
  state.datasetCache.set(entry.id, dataset);
  return cloneJson(dataset);
}

function normalizeWorkspaceDefinition(definition, context) {
  const difficulty = isValidMode(definition?.difficulty) ? definition.difficulty : context.mode;
  const tables = Array.isArray(definition?.tables)
    ? definition.tables.map(normalizeTableDefinition).filter(Boolean)
    : [];

  const normalized = {
    format: typeof definition?.format === 'string' ? definition.format : EXPORT_FORMAT,
    id:
      typeof definition?.id === 'string' && definition.id.trim()
        ? definition.id.trim()
        : `workspace-${Date.now()}`,
    name:
      typeof definition?.name === 'string' && definition.name.trim()
        ? definition.name.trim()
        : context.fallbackName || DEFAULT_BLANK_NAME,
    difficulty,
    summary:
      typeof definition?.summary === 'string' && definition.summary.trim()
        ? definition.summary.trim()
        : buildWorkspaceSummary(context.workspaceSource, tables.length),
    focus:
      Array.isArray(definition?.focus) && definition.focus.length
        ? definition.focus.map(String)
        : buildDefaultWorkspaceFocus(),
    relationshipHighlights:
      Array.isArray(definition?.relationshipHighlights) && definition.relationshipHighlights.length
        ? definition.relationshipHighlights.map(String)
        : [],
    defaultQuery:
      typeof definition?.defaultQuery === 'string' && definition.defaultQuery.trim()
        ? definition.defaultQuery
        : tables.length
          ? buildPreviewQuery(tables[0].name)
          : buildBlankPrompt(),
    notes:
      Array.isArray(definition?.notes) && definition.notes.length
        ? definition.notes.map(String)
        : [buildWorkspaceNote(tables.length)],
    tables,
    relationships:
      Array.isArray(definition?.relationships) && definition.relationships.length
        ? definition.relationships
            .map(normalizeRelationshipDefinition)
            .filter(Boolean)
        : []
  };

  return normalized;
}

function normalizeTableDefinition(table) {
  if (!table || typeof table !== 'object') return null;
  if (typeof table.name !== 'string' || !table.name.trim()) return null;

  return {
    name: table.name.trim(),
    description: typeof table.description === 'string' ? table.description.trim() : '',
    kind: isValidTableKind(table.kind) ? table.kind : '',
    diagram: isValidDiagram(table.diagram) ? { x: Number(table.diagram.x), y: Number(table.diagram.y) } : null,
    createStatement:
      typeof table.createStatement === 'string'
        ? table.createStatement
        : typeof table.sql === 'string'
          ? table.sql
          : '',
    columns:
      Array.isArray(table.columns) && table.columns.length
        ? table.columns.map(normalizeColumnDefinition).filter(Boolean)
        : [],
    primaryKey: Array.isArray(table.primaryKey) ? table.primaryKey.map(String) : [],
    foreignKeys:
      Array.isArray(table.foreignKeys) && table.foreignKeys.length
        ? table.foreignKeys.map(normalizeForeignKeyDefinition).filter(Boolean)
        : [],
    rows: Array.isArray(table.rows) ? table.rows.map(normalizeRowObject) : []
  };
}

function normalizeColumnDefinition(column) {
  if (!column || typeof column !== 'object') return null;
  if (typeof column.name !== 'string' || !column.name.trim()) return null;

  const normalized = {
    name: column.name.trim(),
    type: typeof column.type === 'string' && column.type.trim() ? column.type.trim() : 'TEXT'
  };

  if (column.notNull) normalized.notNull = true;
  if (column.unique) normalized.unique = true;
  if (column.autoIncrement) normalized.autoIncrement = true;
  if (Object.prototype.hasOwnProperty.call(column, 'default')) normalized.default = column.default;

  return normalized;
}

function normalizeForeignKeyDefinition(foreignKey) {
  if (!foreignKey || typeof foreignKey !== 'object') return null;
  if (!Array.isArray(foreignKey.columns) || !foreignKey.columns.length) return null;
  if (!foreignKey.references || typeof foreignKey.references !== 'object') return null;
  if (typeof foreignKey.references.table !== 'string' || !foreignKey.references.table.trim()) return null;
  if (!Array.isArray(foreignKey.references.columns) || !foreignKey.references.columns.length) return null;

  const normalized = {
    columns: foreignKey.columns.map(String),
    references: {
      table: foreignKey.references.table.trim(),
      columns: foreignKey.references.columns.map(String)
    }
  };

  if (typeof foreignKey.onDelete === 'string' && foreignKey.onDelete.trim()) {
    normalized.onDelete = foreignKey.onDelete.trim();
  }

  if (typeof foreignKey.onUpdate === 'string' && foreignKey.onUpdate.trim()) {
    normalized.onUpdate = foreignKey.onUpdate.trim();
  }

  return normalized;
}

function normalizeRelationshipDefinition(relationship) {
  if (!relationship || typeof relationship !== 'object') return null;
  if (typeof relationship.fromTable !== 'string' || typeof relationship.toTable !== 'string') return null;

  return {
    fromTable: relationship.fromTable.trim(),
    toTable: relationship.toTable.trim(),
    fromColumns: Array.isArray(relationship.fromColumns) ? relationship.fromColumns.map(String) : [],
    toColumns: Array.isArray(relationship.toColumns) ? relationship.toColumns.map(String) : [],
    fromCardinality: relationship.fromCardinality === 'one' ? 'one' : 'many',
    toCardinality: relationship.toCardinality === 'many' ? 'many' : 'one',
    label:
      typeof relationship.label === 'string' && relationship.label.trim()
        ? relationship.label.trim()
        : ''
  };
}

function normalizeRowObject(row) {
  if (!row || typeof row !== 'object' || Array.isArray(row)) return {};
  return { ...row };
}

function buildDatabaseFromDataset(dataset) {
  if (!state.sqlEngine) {
    throw new Error('The SQL engine is not ready yet.');
  }

  const db = new state.sqlEngine.Database();
  db.run('PRAGMA foreign_keys = ON;');

  (dataset.tables || []).forEach((table) => {
    const createStatement = table.createStatement?.trim() || buildCreateTableStatement(table);
    if (!createStatement) {
      throw new Error(`Table ${table.name} has no structure definition.`);
    }
    db.run(createStatement);
  });

  db.run('BEGIN TRANSACTION;');

  try {
    getTableInsertOrder(dataset.tables || []).forEach((table) => {
      if (!Array.isArray(table.rows) || !table.rows.length) return;

      const columnNames = getInsertColumnNames(db, table);
      if (!columnNames.length) return;

      const placeholders = columnNames.map(() => '?').join(', ');
      const statement = db.prepare(
        `INSERT INTO ${quoteIdentifier(table.name)} (${columnNames
          .map(quoteIdentifier)
          .join(', ')}) VALUES (${placeholders});`
      );

      table.rows.forEach((row) => {
        statement.run(columnNames.map((columnName) => row[columnName]));
      });

      statement.free();
    });

    db.run('COMMIT;');
  } catch (error) {
    try {
      db.run('ROLLBACK;');
    } catch (_rollbackError) {
      // Ignore rollback errors. The original failure is more useful.
    }
    throw error;
  }

  return db;
}

function getTableInsertOrder(tables) {
  const tableList = Array.isArray(tables) ? tables : [];
  const tableMap = new Map(tableList.map((table) => [table.name, table]));
  const dependents = new Map();
  const indegree = new Map();

  tableList.forEach((table) => {
    dependents.set(table.name, new Set());
    indegree.set(table.name, 0);
  });

  tableList.forEach((table) => {
    (table.foreignKeys || []).forEach((foreignKey) => {
      const parentTable = foreignKey?.references?.table;
      if (!parentTable || parentTable === table.name || !tableMap.has(parentTable)) return;

      const parentDependents = dependents.get(parentTable);
      if (parentDependents.has(table.name)) return;

      parentDependents.add(table.name);
      indegree.set(table.name, (indegree.get(table.name) || 0) + 1);
    });
  });

  const queue = tableList.filter((table) => (indegree.get(table.name) || 0) === 0);
  const ordered = [];
  const seen = new Set();

  while (queue.length) {
    const nextTable = queue.shift();
    if (!nextTable || seen.has(nextTable.name)) continue;

    seen.add(nextTable.name);
    ordered.push(nextTable);

    (dependents.get(nextTable.name) || []).forEach((childName) => {
      const nextDegree = (indegree.get(childName) || 0) - 1;
      indegree.set(childName, nextDegree);

      if (nextDegree === 0 && tableMap.has(childName)) {
        queue.push(tableMap.get(childName));
      }
    });
  }

  tableList.forEach((table) => {
    if (!seen.has(table.name)) {
      ordered.push(table);
    }
  });

  return ordered;
}

function getInsertColumnNames(db, table) {
  if (Array.isArray(table.columns) && table.columns.length) {
    return table.columns.map((column) => column.name);
  }

  const pragmaRows = db.exec(`PRAGMA table_info(${quoteIdentifier(table.name)});`)[0]?.values || [];
  return pragmaRows.map((row) => row[1]);
}

function buildCreateTableStatement(table) {
  if (!Array.isArray(table.columns) || !table.columns.length) {
    return '';
  }

  const singlePrimaryKey =
    Array.isArray(table.primaryKey) && table.primaryKey.length === 1 ? table.primaryKey[0] : null;

  const columnDefinitions = table.columns.map((column) => {
    const parts = [quoteIdentifier(column.name), column.type || 'TEXT'];

    if (singlePrimaryKey === column.name) {
      parts.push('PRIMARY KEY');
      if (column.autoIncrement) {
        parts.push('AUTOINCREMENT');
      }
    }

    if (column.notNull) {
      parts.push('NOT NULL');
    }

    if (column.unique) {
      parts.push('UNIQUE');
    }

    if (Object.prototype.hasOwnProperty.call(column, 'default')) {
      parts.push(`DEFAULT ${sqlLiteral(column.default)}`);
    }

    return parts.join(' ');
  });

  if (Array.isArray(table.primaryKey) && table.primaryKey.length > 1) {
    columnDefinitions.push(`PRIMARY KEY (${table.primaryKey.map(quoteIdentifier).join(', ')})`);
  }

  if (Array.isArray(table.foreignKeys)) {
    table.foreignKeys.forEach((foreignKey) => {
      let clause = `FOREIGN KEY (${foreignKey.columns.map(quoteIdentifier).join(', ')}) REFERENCES ${quoteIdentifier(
        foreignKey.references.table
      )} (${foreignKey.references.columns.map(quoteIdentifier).join(', ')})`;

      if (foreignKey.onDelete) {
        clause += ` ON DELETE ${foreignKey.onDelete}`;
      }

      if (foreignKey.onUpdate) {
        clause += ` ON UPDATE ${foreignKey.onUpdate}`;
      }

      columnDefinitions.push(clause);
    });
  }

  return `CREATE TABLE ${quoteIdentifier(table.name)} (${columnDefinitions.join(', ')});`;
}

function getLiveSchema(db, dataset) {
  const metadataMap = new Map((dataset?.tables || []).map((table) => [table.name, table]));
  const tableEntries =
    db.exec(
      "SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY rowid;"
    )[0]?.values || [];

  return tableEntries.map((entry) => {
    const tableName = entry[0];
    const metadata = metadataMap.get(tableName) || {};
    const tableInfoRows = db.exec(`PRAGMA table_info(${quoteIdentifier(tableName)});`)[0]?.values || [];
    const uniqueSets = getUniqueColumnSets(db, tableName);
    const foreignKeys = getForeignKeyDefinitions(db, tableName);
    const foreignKeyColumnMap = buildForeignKeyColumnMap(foreignKeys);

    const columns = tableInfoRows.map((infoRow, index) => {
      const columnName = infoRow[1];
      return {
        name: columnName,
        type: infoRow[2] || 'TEXT',
        notNull: Boolean(infoRow[3]),
        defaultValue: infoRow[4],
        primaryKeyOrder: Number(infoRow[5]),
        isPrimaryKey: Number(infoRow[5]) > 0,
        isForeignKey: foreignKeyColumnMap.has(columnName),
        isUnique: uniqueSets.some((columnSet) => columnSet.length === 1 && columnSet[0] === columnName),
        references: foreignKeyColumnMap.get(columnName) || [],
        ordinal: index
      };
    });

    const primaryKey = columns
      .filter((column) => column.isPrimaryKey)
      .sort((left, right) => left.primaryKeyOrder - right.primaryKeyOrder)
      .map((column) => column.name);

    const rowCountResult = db.exec(
      `SELECT COUNT(*) AS row_count FROM ${quoteIdentifier(tableName)};`
    )[0];
    const rowCount = Number(rowCountResult?.values?.[0]?.[0] || 0);
    const inferredKind = inferTableKind({ columns, primaryKey, foreignKeys, uniqueSets });

    return {
      name: tableName,
      createStatement: typeof entry[1] === 'string' ? entry[1] : '',
      description: typeof metadata.description === 'string' ? metadata.description : '',
      kind: isValidTableKind(metadata.kind) ? metadata.kind : inferredKind,
      diagram: isValidDiagram(metadata.diagram) ? metadata.diagram : null,
      columns,
      rowCount,
      primaryKey,
      foreignKeys,
      uniqueSets
    };
  });
}

function getUniqueColumnSets(db, tableName) {
  const indexRows = db.exec(`PRAGMA index_list(${quoteIdentifier(tableName)});`)[0]?.values || [];
  const uniqueSets = [];

  indexRows.forEach((row) => {
    const indexName = row[1];
    const isUnique = Boolean(row[2]);
    const origin = row[3];
    if (!isUnique || origin === 'pk') return;

    const indexInfoRows = db.exec(`PRAGMA index_info(${quoteIdentifier(indexName)});`)[0]?.values || [];
    const columns = indexInfoRows
      .sort((left, right) => Number(left[0]) - Number(right[0]))
      .map((infoRow) => infoRow[2])
      .filter(Boolean);

    if (columns.length) {
      uniqueSets.push(columns);
    }
  });

  return uniqueSets;
}

function getForeignKeyDefinitions(db, tableName) {
  const rows = db.exec(`PRAGMA foreign_key_list(${quoteIdentifier(tableName)});`)[0]?.values || [];
  const grouped = new Map();

  rows.forEach((row) => {
    const key = String(row[0]);
    if (!grouped.has(key)) {
      grouped.set(key, {
        columns: [],
        references: {
          table: row[2],
          columns: []
        },
        onUpdate: row[5],
        onDelete: row[6]
      });
    }

    const definition = grouped.get(key);
    definition.columns.push(row[3]);
    definition.references.columns.push(row[4]);
  });

  return Array.from(grouped.values());
}

function buildForeignKeyColumnMap(foreignKeys) {
  const map = new Map();

  foreignKeys.forEach((foreignKey) => {
    foreignKey.columns.forEach((columnName, index) => {
      if (!map.has(columnName)) {
        map.set(columnName, []);
      }

      map.get(columnName).push({
        table: foreignKey.references.table,
        column: foreignKey.references.columns[index] || foreignKey.references.columns[0] || ''
      });
    });
  });

  return map;
}

function inferTableKind(table) {
  const primaryKeySet = table.primaryKey || [];
  const foreignKeyColumns = new Set(table.columns.filter((column) => column.isForeignKey).map((column) => column.name));

  if (
    primaryKeySet.length > 1 &&
    primaryKeySet.every((columnName) => foreignKeyColumns.has(columnName))
  ) {
    return 'junction';
  }

  const hasOneToOneForeignKey = (table.foreignKeys || []).some(
    (foreignKey) =>
      areSameColumnSets(foreignKey.columns, primaryKeySet) &&
      isColumnSetUnique(table, foreignKey.columns)
  );

  if (hasOneToOneForeignKey) {
    return 'extension';
  }

  return 'entity';
}

function getRelationshipsForCurrentSchema() {
  const providedRelationships = new Map(
    (state.dataset?.relationships || []).map((relationship) => [
      buildRelationshipKey(
        relationship.fromTable,
        relationship.toTable,
        relationship.fromColumns || []
      ),
      relationship
    ])
  );

  return state.schema.flatMap((table) =>
    table.foreignKeys.map((foreignKey) => {
      const key = buildRelationshipKey(table.name, foreignKey.references.table, foreignKey.columns);
      const provided =
        providedRelationships.get(key) ||
        providedRelationships.get(buildRelationshipKey(table.name, foreignKey.references.table, [])) ||
        null;
      const fromCardinality = provided?.fromCardinality || (isColumnSetUnique(table, foreignKey.columns) ? 'one' : 'many');
      const toCardinality = provided?.toCardinality || 'one';

      return {
        fromTable: table.name,
        toTable: foreignKey.references.table,
        fromColumns: [...foreignKey.columns],
        toColumns: [...foreignKey.references.columns],
        fromCardinality,
        toCardinality,
        label: provided?.label || buildRelationshipLabel(table.name, foreignKey.references.table, fromCardinality)
      };
    })
  );
}

function buildRelationshipKey(fromTable, toTable, fromColumns) {
  return `${fromTable}|${toTable}|${(fromColumns || []).join(',')}`;
}

function buildRelationshipLabel(fromTable, toTable, fromCardinality) {
  if (fromCardinality === 'one') {
    return `Each ${fromTable} row matches one ${toTable} row.`;
  }

  return `Many ${fromTable} rows can reference one ${toTable} row.`;
}

function buildRelationshipHighlights(schema, relationships) {
  if (!schema.length) {
    return ['Create tables with SQL'];
  }

  const highlights = [];

  if (relationships.some((relationship) => relationship.fromCardinality === 'one')) {
    highlights.push('One-to-one');
  }

  if (relationships.some((relationship) => relationship.fromCardinality === 'many')) {
    highlights.push('One-to-many');
  }

  if (schema.some((table) => table.kind === 'junction')) {
    highlights.push('Many-to-many');
  }

  if (schema.some((table) => table.primaryKey.length > 1)) {
    highlights.push('Composite key');
  }

  if (schema.some((table) => table.columns.some((column) => column.isForeignKey))) {
    highlights.push('Foreign keys');
  }

  return highlights.slice(0, 4);
}

function getTableLayoutMap(schema, dataset) {
  const metadataMap = new Map((dataset?.tables || []).map((table) => [table.name, table]));
  const hasStoredLayout =
    schema.length > 0 &&
    schema.every((table) => isValidDiagram(metadataMap.get(table.name)?.diagram));
  const layoutMap = new Map();

  schema.forEach((table, index) => {
    const height = SVG_HEADER_HEIGHT + table.columns.length * SVG_COLUMN_HEIGHT + SVG_CARD_PADDING;

    if (hasStoredLayout) {
      const diagram = metadataMap.get(table.name).diagram;
      layoutMap.set(table.name, {
        x: Number(diagram.x),
        y: Number(diagram.y),
        width: SVG_TABLE_WIDTH,
        height
      });
      return;
    }

    const columnCount = schema.length <= 1 ? 1 : schema.length <= 4 ? 2 : 3;
    const columnIndex = index % columnCount;
    const rowIndex = Math.floor(index / columnCount);

    layoutMap.set(table.name, {
      x: ERD_GRID_PADDING + columnIndex * ERD_GRID_GAP_X,
      y: ERD_GRID_PADDING + rowIndex * ERD_GRID_GAP_Y,
      width: SVG_TABLE_WIDTH,
      height
    });
  });

  return layoutMap;
}

function exportWorkspaceJson() {
  if (!state.db || !state.dataset) return;

  const payload = serializeCurrentWorkspace();
  const fileName = `${sanitizeFileName(payload.name || DEFAULT_BLANK_NAME)}.json`;
  downloadTextFile(fileName, JSON.stringify(payload, null, 2), 'application/json');
  state.statusMessage = `${fileName} downloaded. Import it later to continue this workspace.`;
  renderEditorStatus();
}

function serializeCurrentWorkspace() {
  const liveSchema = getLiveSchema(state.db, state.dataset);
  const relationships = getRelationshipsFromSchema(liveSchema, state.dataset);
  const layoutMap = getTableLayoutMap(liveSchema, state.dataset);
  const metadataMap = new Map((state.dataset?.tables || []).map((table) => [table.name, table]));

  return {
    format: EXPORT_FORMAT,
    id: state.dataset.id || `workspace-${Date.now()}`,
    name: state.dataset.name || DEFAULT_BLANK_NAME,
    difficulty: state.mode,
    summary:
      typeof state.dataset.summary === 'string' && state.dataset.summary.trim()
        ? state.dataset.summary
        : buildWorkspaceSummary(state.workspaceSource, liveSchema.length),
    focus:
      Array.isArray(state.dataset.focus) && state.dataset.focus.length
        ? state.dataset.focus
        : buildDefaultWorkspaceFocus(),
    relationshipHighlights: buildRelationshipHighlights(liveSchema, relationships),
    defaultQuery:
      state.query.trim() ||
      (liveSchema[0] ? buildPreviewQuery(liveSchema[0].name) : buildBlankPrompt()),
    notes:
      Array.isArray(state.dataset.notes) && state.dataset.notes.length
        ? state.dataset.notes
        : [buildWorkspaceNote(liveSchema.length)],
    tables: liveSchema.map((table) => ({
      name: table.name,
      description: metadataMap.get(table.name)?.description || table.description || '',
      kind: table.kind,
      diagram: layoutMap.has(table.name)
        ? {
            x: layoutMap.get(table.name).x,
            y: layoutMap.get(table.name).y
          }
        : null,
      createStatement: table.createStatement,
      columns: table.columns.map((column) => {
        const normalized = {
          name: column.name,
          type: column.type
        };

        if (column.notNull) normalized.notNull = true;
        if (column.isUnique) normalized.unique = true;
        return normalized;
      }),
      primaryKey: [...table.primaryKey],
      foreignKeys: table.foreignKeys.map((foreignKey) => ({
        columns: [...foreignKey.columns],
        references: {
          table: foreignKey.references.table,
          columns: [...foreignKey.references.columns]
        },
        ...(foreignKey.onDelete ? { onDelete: foreignKey.onDelete } : {}),
        ...(foreignKey.onUpdate ? { onUpdate: foreignKey.onUpdate } : {})
      })),
      rows: getRowsAsObjects(state.db, table.name)
    })),
    relationships,
    meta: {
      exportedAt: new Date().toISOString(),
      source: state.workspaceSource,
      ...(state.importedFileName ? { importedFileName: state.importedFileName } : {})
    }
  };
}

function getRowsAsObjects(db, tableName) {
  const resultSet = db.exec(`SELECT * FROM ${quoteIdentifier(tableName)};`)[0];
  if (!resultSet) return [];

  return resultSet.values.map((row) =>
    Object.fromEntries(resultSet.columns.map((columnName, index) => [columnName, row[index]]))
  );
}

function getRelationshipsFromSchema(schema, dataset) {
  const previousSchema = state.schema;
  const previousDataset = state.dataset;
  state.schema = schema;
  state.dataset = dataset;
  const relationships = getRelationshipsForCurrentSchema();
  state.schema = previousSchema;
  state.dataset = previousDataset;
  return relationships;
}

function renderAll() {
  applyLayout();
  renderWorkspaceSummary();
  renderDatasetSelector();
  renderTables();
  renderSchemaPanel();
  renderInspectorView();
  renderErd();
  renderHighlight();
  renderResults();
  renderEditorStatus();
  syncEditorScroll();
  updateControlStates();
}

function renderWorkspaceSummary() {
  if (elements.workspacePill) {
    elements.workspacePill.textContent = buildWorkspacePillText();
  }

  if (elements.tableCount) {
    if (!state.dataset) {
      elements.tableCount.textContent = '';
    } else if (!state.schema.length) {
      elements.tableCount.textContent = 'No tables';
    } else {
      elements.tableCount.textContent = `${state.schema.length} table${state.schema.length === 1 ? '' : 's'}`;
    }
  }
}

function buildWorkspacePillText() {
  if (!state.dataset) {
    return '';
  }

  const sourceLabel =
    state.workspaceSource === 'sample'
      ? 'Sample'
      : state.workspaceSource === 'imported'
        ? 'Imported'
        : 'Blank';
  const tableLabel = state.schema.length
    ? `${state.schema.length} table${state.schema.length === 1 ? '' : 's'}`
    : 'No tables';

  return `${sourceLabel} · ${state.dataset.name} · ${tableLabel}`;
}

function renderDatasetSelector() {
  const options = [
    {
      value: CUSTOM_DATASET_VALUE,
      label: 'Create new database',
      selected: state.workspaceSource === 'blank'
    }
  ];

  if (state.workspaceSource === 'imported' && state.dataset) {
    options.push({
      value: IMPORTED_DATASET_VALUE,
      label: `Imported: ${state.dataset.name}`,
      selected: true
    });
  }

  getSampleDatasetsForMode().forEach((dataset) => {
    options.push({
      value: dataset.id,
      label: dataset.name,
      selected: state.workspaceSource === 'sample' && dataset.id === state.datasetCatalogEntry?.id
    });
  });

  elements.datasetSelect.innerHTML = options
    .map(
      (option) =>
        `<option value="${escapeHtmlAttribute(option.value)}"${option.selected ? ' selected' : ''}>${escapeHtml(
          option.label
        )}</option>`
    )
    .join('');
}

function renderSchemaPanel() {
  elements.schemaTableList.innerHTML = buildTableListMarkup({ variant: 'schema' });
}

function renderTables() {
  elements.tableList.innerHTML = buildTableListMarkup({ variant: 'sidebar' });
}

function buildTableListMarkup(options = {}) {
  if (!state.schema.length) {
    return `
      <div class="empty-state compact">
        <p>Create a table to start building this database.</p>
      </div>
    `;
  }

  return state.schema
    .map((table) => buildTableMarkup(table, options))
    .join('');
}

function buildTableMarkup(table, options = {}) {
  const isSidebar = options.variant !== 'schema';
  const isSelected = table.name === state.selectedTable;
  const detailsExpanded = !isSidebar || isSelected;
  const tableRole = isSidebar ? 'sidebar' : 'schema';
  const tableBadge = getTableBadge(table);

  return `
    <article class="table-block ${isSelected ? 'is-selected' : ''} ${isSidebar ? 'is-sidebar' : 'is-schema'}">
      <button type="button" class="table-block-button" data-table="${escapeHtmlAttribute(table.name)}" data-context="${tableRole}">
        <div class="table-block-head">
          <div class="table-block-title">
            <h3>${escapeHtml(table.name)}</h3>
            <span>${table.rowCount} row${table.rowCount === 1 ? '' : 's'}</span>
          </div>
          <span class="table-block-badge">${escapeHtml(tableBadge)}</span>
        </div>
      </button>
      <div class="table-block-body" ${detailsExpanded ? '' : 'hidden'}>
        <div class="table-column-grid">
          ${table.columns
            .map(
              (column) => `
                <span class="table-column-name">
                  <span>${escapeHtml(column.name)}</span>
                  ${buildColumnBadges(column)}
                </span>
                <span class="table-column-type">${escapeHtml(column.type)}</span>
              `
            )
            .join('')}
        </div>
      </div>
    </article>
  `;
}

function getTableBadge(table) {
  if (table.kind === 'junction') return 'Junction';
  if (table.kind === 'extension') return '1:1';
  return 'Table';
}

function buildColumnBadges(column) {
  const badges = []
    .concat(column.isPrimaryKey ? ['PK'] : [])
    .concat(column.isForeignKey ? ['FK'] : [])
    .concat(column.isUnique ? ['UQ'] : []);

  if (!badges.length) {
    return '';
  }

  return `<span class="column-badge-list">${badges
    .map((badge) => `<span class="column-badge">${escapeHtml(badge)}</span>`)
    .join('')}</span>`;
}

function renderInspectorView() {
  const relationships = getRelationshipsForCurrentSchema();

  elements.inspectorTabs.forEach((button) => {
    const isSelected = button.dataset.inspectorView === state.inspectorView;
    button.setAttribute('aria-selected', String(isSelected));
    button.classList.toggle('is-selected', isSelected);
  });

  Object.entries(elements.inspectorViews).forEach(([view, panel]) => {
    panel.hidden = view !== state.inspectorView;
  });

  if (state.inspectorView === 'schema') {
    elements.resultsMeta.textContent = state.schema.length
      ? `${state.schema.length} table${state.schema.length === 1 ? '' : 's'} in the current workspace`
      : 'No tables yet';
    return;
  }

  if (state.inspectorView === 'erd') {
    elements.resultsMeta.textContent = relationships.length
      ? `${relationships.length} relationship${relationships.length === 1 ? '' : 's'}`
      : 'No relationships yet';
    return;
  }

  elements.resultsMeta.textContent = buildResultsMetaText();
}

function setInspectorView(nextView) {
  const normalizedView =
    nextView === 'schema' || nextView === 'erd' || nextView === 'results' ? nextView : 'results';
  state.inspectorView = normalizedView;
  renderInspectorView();
  if (normalizedView === 'erd') {
    renderErd();
  }
}

function renderErd() {
  if (!state.schema.length) {
    elements.erdStage.innerHTML = `
      <div class="empty-state compact">
        <p>No ERD yet. Add tables and foreign keys to visualise the schema.</p>
      </div>
    `;
    elements.relationshipList.innerHTML = `
      <div class="empty-state compact">
        <p>No relationships yet. Foreign keys will appear here.</p>
      </div>
    `;
    return;
  }

  const relationships = getRelationshipsForCurrentSchema();
  const layoutMap = getTableLayoutMap(state.schema, state.dataset);
  const layoutEntries = Array.from(layoutMap.values());
  const maxWidth = Math.max(...layoutEntries.map((entry) => entry.x + entry.width)) + 48;
  const maxHeight = Math.max(...layoutEntries.map((entry) => entry.y + entry.height)) + 48;

  const relationMarkup = relationships
    .filter((relationship) => layoutMap.has(relationship.fromTable) && layoutMap.has(relationship.toTable))
    .map((relationship) => {
      const fromLayout = layoutMap.get(relationship.fromTable);
      const toLayout = layoutMap.get(relationship.toTable);
      const fromPoint = getAnchorPoint(fromLayout, toLayout);
      const toPoint = getAnchorPoint(toLayout, fromLayout);
      const path = buildConnectorPath(fromPoint, toPoint);
      const isActive =
        relationship.fromTable === state.selectedTable || relationship.toTable === state.selectedTable;

      return `
        <g class="erd-relationship ${isActive ? 'is-active' : ''}">
          <path d="${path}" />
          <text class="cardinality start" x="${fromPoint.labelX}" y="${fromPoint.labelY}">${cardinalityLabel(
            relationship.fromCardinality
          )}</text>
          <text class="cardinality end" x="${toPoint.labelX}" y="${toPoint.labelY}">${cardinalityLabel(
            relationship.toCardinality
          )}</text>
        </g>
      `;
    })
    .join('');

  const tableMarkup = state.schema
    .filter((table) => layoutMap.has(table.name))
    .map((table) => {
      const layout = layoutMap.get(table.name);
      const isSelected = table.name === state.selectedTable;

      return `
        <g
          class="erd-table-node ${isSelected ? 'is-selected' : ''}"
          data-table-node="${escapeHtmlAttribute(table.name)}"
          tabindex="0"
          role="button"
          aria-label="Preview ${escapeHtmlAttribute(table.name)}"
        >
          <rect x="${layout.x}" y="${layout.y}" width="${layout.width}" height="${layout.height}" rx="18" ry="18" />
          <rect class="erd-table-header" x="${layout.x}" y="${layout.y}" width="${layout.width}" height="${SVG_HEADER_HEIGHT}" rx="18" ry="18" />
          <text class="erd-table-title" x="${layout.x + 16}" y="${layout.y + 24}">${escapeHtml(table.name)}</text>
          ${table.columns
            .map((column, index) => {
              const y = layout.y + SVG_HEADER_HEIGHT + index * SVG_COLUMN_HEIGHT + 18;
              const badges = []
                .concat(column.isPrimaryKey ? ['PK'] : [])
                .concat(column.isForeignKey ? ['FK'] : [])
                .concat(column.isUnique ? ['UQ'] : [])
                .join(' / ');

              return `
                <text class="erd-column-name" x="${layout.x + 16}" y="${y}">${escapeHtml(column.name)}</text>
                <text class="erd-column-type" x="${layout.x + layout.width - 16}" y="${y}">${escapeHtml(
                  badges || column.type
                )}</text>
              `;
            })
            .join('')}
        </g>
      `;
    })
    .join('');

  elements.erdStage.innerHTML = `
    <svg
      class="erd-svg"
      viewBox="0 0 ${maxWidth} ${maxHeight}"
      aria-labelledby="erd-diagram-title"
      role="img"
      preserveAspectRatio="xMinYMin meet"
    >
      <title id="erd-diagram-title">${escapeHtml(state.dataset.name)} entity relationship diagram</title>
      ${relationMarkup}
      ${tableMarkup}
    </svg>
  `;

  elements.relationshipList.innerHTML = relationships.length
    ? relationships
        .map(
          (relationship) => `
            <article class="relationship-item ${
              relationship.fromTable === state.selectedTable || relationship.toTable === state.selectedTable
                ? 'is-active'
                : ''
            }">
              <h3>${escapeHtml(relationship.fromTable)} to ${escapeHtml(relationship.toTable)}</h3>
              <p>${escapeHtml(relationship.label)}</p>
            </article>
          `
        )
        .join('')
    : `
        <div class="empty-state compact">
          <p>No relationships yet. Add foreign keys to connect tables.</p>
        </div>
      `;
}

function renderHighlight() {
  const source = state.query || '';
  const highlighted =
    window.Prism && window.Prism.languages && window.Prism.languages.sql
      ? window.Prism.highlight(source, window.Prism.languages.sql, 'sql')
      : escapeHtml(source);

  elements.editorHighlightCode.innerHTML = source.endsWith('\n') ? `${highlighted}<br />` : highlighted || ' ';
}

function renderResults() {
  if (state.isLoading && !state.result && !state.error) {
    if (state.inspectorView === 'results') {
      elements.resultsMeta.textContent = '';
    }
    elements.resultsOutput.innerHTML = `
      <div class="empty-state">
        <div class="loader-line"></div>
        <p>Loading workspace...</p>
      </div>
    `;
    return;
  }

  if (state.error) {
    if (state.inspectorView === 'results') {
      elements.resultsMeta.textContent = 'Execution error';
    }
    elements.resultsOutput.innerHTML = `
      <div class="message-box error">
        <h3>Execution error</h3>
        <p>${escapeHtml(state.error)}</p>
      </div>
    `;
    return;
  }

  if (!state.result) {
    if (state.inspectorView === 'results') {
      elements.resultsMeta.textContent = '';
    }
    elements.resultsOutput.innerHTML = `
      <div class="empty-state">
        <p>Run a query to see results here.</p>
      </div>
    `;
    return;
  }

  if (!state.result.columns.length) {
    if (state.inspectorView === 'results') {
      elements.resultsMeta.textContent = buildResultsMetaText();
    }
    elements.resultsOutput.innerHTML = `
      <div class="message-box success">
        <h3>Statement complete</h3>
        <p>${escapeHtml(state.statusMessage)}</p>
      </div>
    `;
    return;
  }

  if (!state.result.rows.length) {
    if (state.inspectorView === 'results') {
      elements.resultsMeta.textContent = buildResultsMetaText();
    }
    elements.resultsOutput.innerHTML = `
      <div class="message-box info">
        <h3>No rows returned</h3>
        <p>${escapeHtml(state.statusMessage || 'The query ran successfully, but it did not match any rows.')}</p>
      </div>
    `;
    return;
  }

  if (state.inspectorView === 'results') {
    elements.resultsMeta.textContent = buildResultsMetaText();
  }
  elements.resultsOutput.innerHTML = `
    <div class="results-table-wrap">
      <table class="results-table">
        <thead>
          <tr>
            ${state.result.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${state.result.rows
            .map(
              (row) => `
                <tr>
                  ${row.map((cell) => `<td>${formatCellValue(cell)}</td>`).join('')}
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderEditorStatus(isError = false) {
  elements.editorStatus.textContent = state.statusMessage;
  elements.editorStatus.classList.toggle('is-error', isError);
}

function updateControlStates() {
  const hasQuery = Boolean(state.query.trim());
  const disabled = state.isLoading || !state.dataset;

  elements.datasetSelect.disabled = state.isLoading;
  elements.importJsonButton.disabled = state.isLoading;
  elements.exportJsonButton.disabled = disabled;
  elements.runQueryButton.disabled = disabled || !hasQuery;
  elements.queryInput.disabled = disabled;
  elements.inspectorTabs.forEach((button) => {
    button.disabled = disabled;
  });
}

function renderLoading(message) {
  state.isLoading = true;
  state.statusMessage = message;
  renderWorkspaceSummary();
  renderEditorStatus();
  renderResults();
  renderInspectorView();
  updateControlStates();
}

function renderFatalError(message) {
  state.error = message;
  state.isLoading = false;
  state.statusMessage = message;
  elements.tableList.innerHTML = `
    <div class="empty-state compact">
      <p>${escapeHtml(message)}</p>
    </div>
  `;
  elements.schemaTableList.innerHTML = elements.tableList.innerHTML;
  elements.erdStage.innerHTML = `
    <div class="empty-state compact">
      <p>${escapeHtml(message)}</p>
    </div>
  `;
  elements.relationshipList.innerHTML = '';
  renderWorkspaceSummary();
  renderInspectorView();
  renderResults();
  renderEditorStatus(true);
  updateControlStates();
}

function buildResultsMetaText() {
  if (state.executionTime == null) return '';
  if (state.result?.kind === 'query') {
    return `${state.result.rows.length} row${state.result.rows.length === 1 ? '' : 's'} in ${state.executionTime.toFixed(1)}ms`;
  }
  return `${state.executionTime.toFixed(1)}ms`;
}

function previewTable(tableName) {
  if (!tableName) return;
  state.selectedTable = tableName;
  state.inspectorView = 'results';
  setQuery(buildPreviewQuery(tableName), { preserveStatus: true });
  state.statusMessage = `${tableName} loaded into the editor.`;
  renderTables();
  renderSchemaPanel();
  renderErd();
  renderInspectorView();
  renderEditorStatus();
  runQuery();
}

function buildPreviewQuery(tableName) {
  return `SELECT * FROM ${quoteIdentifier(tableName)} LIMIT 10;`;
}

function buildBlankPrompt() {
  const exampleTable = 'Student';
  return `-- Blank workspace\n-- Create your own tables, then add rows with INSERT INTO.\n\nCREATE TABLE ${exampleTable} (\n  ${exampleTable}ID INTEGER PRIMARY KEY,\n  Name TEXT NOT NULL\n);`;
}

function handleQueryInput(event) {
  setQuery(event.target.value, { preserveStatus: true, skipInputSync: true });
  updateSuggestions();
}

function setQuery(nextQuery, options = {}) {
  state.query = nextQuery;

  if (!options.skipInputSync) {
    elements.queryInput.value = nextQuery;
  }

  if (!options.preserveStatus) {
    state.statusMessage = 'Query updated.';
  }

  renderHighlight();
  updateControlStates();
}

function syncEditorScroll() {
  elements.editorHighlight.scrollTop = elements.queryInput.scrollTop;
  elements.editorHighlight.scrollLeft = elements.queryInput.scrollLeft;
}

function handleEditorKeyDown(event) {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    runQuery();
    return;
  }

  if (!state.suggestions.visible || !state.suggestions.items.length) {
    return;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    state.suggestions.activeIndex =
      (state.suggestions.activeIndex + 1) % state.suggestions.items.length;
    renderSuggestions();
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    state.suggestions.activeIndex =
      (state.suggestions.activeIndex - 1 + state.suggestions.items.length) %
      state.suggestions.items.length;
    renderSuggestions();
    return;
  }

  if ((event.key === 'Tab' || event.key === 'Enter') && !event.shiftKey) {
    event.preventDefault();
    applySuggestion(state.suggestions.items[state.suggestions.activeIndex]);
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    hideSuggestions();
  }
}

function updateSuggestions() {
  const cursorPosition = elements.queryInput.selectionStart || 0;
  const text = state.query;
  let wordStart = cursorPosition - 1;

  while (wordStart >= 0 && /[\w\d_]/.test(text[wordStart])) {
    wordStart -= 1;
  }

  wordStart += 1;
  const currentWord = text.slice(wordStart, cursorPosition);

  if (!currentWord) {
    hideSuggestions();
    return;
  }

  const matches = getAvailableKeywords()
    .filter((keyword) => keyword.toLowerCase().startsWith(currentWord.toLowerCase()))
    .slice(0, 8);

  if (!matches.length) {
    hideSuggestions();
    return;
  }

  const coords = getCaretCoordinates(elements.queryInput, cursorPosition);
  const left = Math.min(coords.left + 20, Math.max(24, elements.editorShell.clientWidth - 240));
  const top = Math.max(24, coords.top + coords.height + 8 - elements.queryInput.scrollTop);

  state.suggestions = {
    visible: true,
    items: matches,
    activeIndex: 0,
    wordStart,
    coords: { left, top }
  };

  renderSuggestions();
}

function applySuggestion(suggestion) {
  if (!suggestion) return;

  const cursorPosition = elements.queryInput.selectionStart || state.suggestions.wordStart;
  const before = state.query.slice(0, state.suggestions.wordStart);
  const after = state.query.slice(cursorPosition);
  const nextQuery = `${before}${suggestion}${after}`;

  setQuery(nextQuery, { preserveStatus: true });
  hideSuggestions();

  requestAnimationFrame(() => {
    const nextCursorPosition = before.length + suggestion.length;
    elements.queryInput.focus();
    elements.queryInput.setSelectionRange(nextCursorPosition, nextCursorPosition);
  });
}

function renderSuggestions() {
  if (!state.suggestions.visible) {
    hideSuggestions();
    return;
  }

  elements.querySuggestions.hidden = false;
  elements.querySuggestions.style.left = `${state.suggestions.coords.left}px`;
  elements.querySuggestions.style.top = `${state.suggestions.coords.top}px`;
  elements.querySuggestions.innerHTML = state.suggestions.items
    .map(
      (item, index) => `
        <button
          type="button"
          data-suggestion="${escapeHtmlAttribute(item)}"
          class="${index === state.suggestions.activeIndex ? 'is-active' : ''}"
        >
          ${escapeHtml(item)}
        </button>
      `
    )
    .join('');
}

function hideSuggestions() {
  state.suggestions.visible = false;
  state.suggestions.items = [];
  elements.querySuggestions.hidden = true;
  elements.querySuggestions.innerHTML = '';
}

function getAvailableKeywords() {
  const schemaKeywords = state.schema.flatMap((table) => [
    table.name,
    ...table.columns.map((column) => column.name)
  ]);

  return Array.from(new Set([...SQL_KEYWORDS, ...schemaKeywords]));
}

function runQuery() {
  if (!state.db || !state.query.trim()) return;

  hideSuggestions();
  state.inspectorView = 'results';
  state.error = '';

  try {
    const startedAt = performance.now();
    const resultSets = state.db.exec(state.query);
    state.executionTime = performance.now() - startedAt;
    state.schema = getLiveSchema(state.db, state.dataset);

    const displayResult = pickDisplayResult(resultSets);
    const preparedColumns = displayResult ? [] : getPreparedColumnNames(state.db, state.query);
    const rowsModified = typeof state.db.getRowsModified === 'function' ? state.db.getRowsModified() : 0;

    if (displayResult) {
      state.result = {
        columns: displayResult.columns || [],
        rows: displayResult.values || [],
        kind: 'query'
      };
      state.statusMessage = `${state.result.rows.length} row${state.result.rows.length === 1 ? '' : 's'} returned.`;
    } else if (preparedColumns.length) {
      state.result = {
        columns: preparedColumns,
        rows: [],
        kind: 'query'
      };
      state.statusMessage = '0 rows returned.';
    } else {
      state.result = { columns: [], rows: [], kind: 'statement' };
      state.statusMessage =
        rowsModified > 0
          ? `Statement executed successfully. ${rowsModified} row${rowsModified === 1 ? '' : 's'} changed.`
          : 'Statement executed successfully.';
    }

    if (!state.selectedTable && state.schema.length) {
      state.selectedTable = state.schema[0].name;
    }

    if (state.selectedTable && !state.schema.some((table) => table.name === state.selectedTable)) {
      state.selectedTable = state.schema[0]?.name || '';
    }

    renderAll();
  } catch (error) {
    state.error = error instanceof Error ? error.message : 'SQL execution failed.';
    state.result = null;
    state.executionTime = null;
    state.statusMessage = 'The query could not be executed.';
    renderResults();
    renderEditorStatus(true);
  }
}

function pickDisplayResult(resultSets) {
  if (!Array.isArray(resultSets) || !resultSets.length) return null;

  for (let index = resultSets.length - 1; index >= 0; index -= 1) {
    const resultSet = resultSets[index];
    if (Array.isArray(resultSet.columns)) {
      return resultSet;
    }
  }

  return null;
}

function getPreparedColumnNames(db, query) {
  if (!db || !query.trim()) return [];

  let statement;

  try {
    statement = db.prepare(query);
    const columnNames =
      typeof statement.getColumnNames === 'function' ? statement.getColumnNames() : [];
    return Array.isArray(columnNames) ? columnNames : [];
  } catch (_error) {
    return [];
  } finally {
    if (statement) {
      statement.free();
    }
  }
}

async function fetchJson(url) {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(`Could not load ${url}.`);
  }
  return response.json();
}

function downloadTextFile(fileName, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(url);
}

function quoteIdentifier(identifier) {
  return `"${String(identifier).replace(/"/g, '""')}"`;
}

function sqlLiteral(value) {
  if (value === null) return 'NULL';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? '1' : '0';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function formatCellValue(value) {
  if (value === null) {
    return '<span class="cell-null">NULL</span>';
  }

  return escapeHtml(String(value));
}

function cardinalityLabel(cardinality) {
  if (cardinality === 'one') return '1';
  if (cardinality === 'many') return 'N';
  return '?';
}

function getAnchorPoint(sourceLayout, targetLayout) {
  const sourceCenter = {
    x: sourceLayout.x + sourceLayout.width / 2,
    y: sourceLayout.y + sourceLayout.height / 2
  };
  const targetCenter = {
    x: targetLayout.x + targetLayout.width / 2,
    y: targetLayout.y + targetLayout.height / 2
  };
  const deltaX = targetCenter.x - sourceCenter.x;
  const deltaY = targetCenter.y - sourceCenter.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    const isRight = deltaX > 0;
    const x = isRight ? sourceLayout.x + sourceLayout.width : sourceLayout.x;
    const y = sourceCenter.y;
    return {
      x,
      y,
      labelX: isRight ? x + 10 : x - 14,
      labelY: y - 8
    };
  }

  const isBelow = deltaY > 0;
  const x = sourceCenter.x;
  const y = isBelow ? sourceLayout.y + sourceLayout.height : sourceLayout.y;
  return {
    x,
    y,
    labelX: x + 8,
    labelY: isBelow ? y + 16 : y - 10
  };
}

function buildConnectorPath(fromPoint, toPoint) {
  if (Math.abs(toPoint.x - fromPoint.x) > Math.abs(toPoint.y - fromPoint.y)) {
    const midX = Math.round((fromPoint.x + toPoint.x) / 2);
    return `M ${fromPoint.x} ${fromPoint.y} L ${midX} ${fromPoint.y} L ${midX} ${toPoint.y} L ${toPoint.x} ${toPoint.y}`;
  }

  const midY = Math.round((fromPoint.y + toPoint.y) / 2);
  return `M ${fromPoint.x} ${fromPoint.y} L ${fromPoint.x} ${midY} L ${toPoint.x} ${midY} L ${toPoint.x} ${toPoint.y}`;
}

function getCaretCoordinates(element, position) {
  const mirror = document.createElement('div');
  const style = window.getComputedStyle(element);
  const properties = [
    'boxSizing',
    'width',
    'height',
    'overflowX',
    'overflowY',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'lineHeight',
    'fontFamily',
    'letterSpacing',
    'textAlign',
    'textTransform',
    'textIndent',
    'whiteSpace',
    'wordSpacing'
  ];

  properties.forEach((property) => {
    mirror.style[property] = style[property];
  });

  mirror.style.position = 'absolute';
  mirror.style.visibility = 'hidden';
  mirror.style.top = '0';
  mirror.style.left = '-9999px';
  mirror.style.whiteSpace = 'pre-wrap';
  mirror.style.wordWrap = 'break-word';

  mirror.textContent = element.value.slice(0, position);
  const marker = document.createElement('span');
  marker.textContent = element.value.slice(position) || '.';
  mirror.appendChild(marker);
  document.body.appendChild(mirror);

  const coordinates = {
    left: marker.offsetLeft,
    top: marker.offsetTop,
    height: Number.parseFloat(style.lineHeight || '24')
  };

  document.body.removeChild(mirror);
  return coordinates;
}

async function waitForLibraries() {
  const timeoutAt = Date.now() + 8000;

  while (Date.now() < timeoutAt) {
    if (window.initSqlJs && window.sqlFormatter && window.Prism) {
      return;
    }

    await new Promise((resolve) => {
      window.setTimeout(resolve, 50);
    });
  }

  throw new Error('The SQL engine libraries did not finish loading.');
}

function isColumnSetUnique(table, columns) {
  return (
    areSameColumnSets(table.primaryKey || [], columns) ||
    (table.uniqueSets || []).some((columnSet) => areSameColumnSets(columnSet, columns))
  );
}

function areSameColumnSets(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
    return false;
  }

  const leftSorted = [...left].sort();
  const rightSorted = [...right].sort();
  return leftSorted.every((value, index) => value === rightSorted[index]);
}

function createBlankWorkspaceDefinition(mode) {
  return {
    format: EXPORT_FORMAT,
    id: `blank-${mode}`,
    name: DEFAULT_BLANK_NAME,
    difficulty: mode,
    summary:
      'Start with an empty in-browser SQLite database, create tables with SQL, and export the workspace as JSON when you want to continue later.',
    focus: buildDefaultWorkspaceFocus(),
    relationshipHighlights: [],
    defaultQuery: buildBlankPrompt(),
    notes: [buildWorkspaceNote(0)],
    tables: [],
    relationships: []
  };
}

function buildDefaultWorkspaceFocus() {
  return ['CREATE TABLE', 'INSERT INTO', 'SELECT', 'JOIN'];
}

function buildWorkspaceSummary(source, tableCount) {
  if (source === 'imported') {
    return tableCount
      ? 'Imported JSON workspace. Continue editing it in the browser and export a fresh JSON when you are finished.'
      : 'Imported JSON workspace with no tables yet.';
  }

  if (source === 'blank') {
    return tableCount
      ? 'Custom browser-built database. Keep creating tables, inserting rows, and exporting JSON snapshots when needed.'
      : 'Start with an empty browser-built database, then create your own schema with SQL.';
  }

  return 'Sample teaching database loaded from JSON.';
}

function buildWorkspaceNote(tableCount) {
  if (tableCount === 0) {
    return 'Use CREATE TABLE to build a schema from scratch, then INSERT INTO to add data.';
  }

  return 'Export the current workspace as JSON when you want to continue this exact database later.';
}

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function sanitizeFileName(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'sql-workspace';
}

function stripFileExtension(fileName) {
  return String(fileName).replace(/\.[^.]+$/, '') || DEFAULT_BLANK_NAME;
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function isValidMode(candidate) {
  return candidate === 'igcse' || candidate === 'sl' || candidate === 'hl';
}

function isValidTableKind(candidate) {
  return candidate === 'entity' || candidate === 'junction' || candidate === 'extension';
}

function isValidDiagram(candidate) {
  return (
    candidate &&
    typeof candidate === 'object' &&
    Number.isFinite(Number(candidate.x)) &&
    Number.isFinite(Number(candidate.y))
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeHtmlAttribute(value) {
  return escapeHtml(value);
}
