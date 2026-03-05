(function () {
  const STORAGE_KEY = 'ib-erd-builder-v1';

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_\s-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/-+/g, '_');
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildSelectOptions(items, selectedValue) {
    if (!items.length) {
      return '<option value="">No options</option>';
    }

    return items
      .map((item) => {
        const isSelected = String(item.value) === String(selectedValue) ? ' selected' : '';
        return '<option value="' + escapeHtml(item.value) + '"' + isSelected + '>' + escapeHtml(item.label) + '</option>';
      })
      .join('');
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.tables) || !Array.isArray(parsed.relationships)) {
        return null;
      }
      return parsed;
    } catch (_error) {
      return null;
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_error) {
      // ignore storage errors
    }
  }

  function createDefaultState() {
    return {
      tables: [],
      relationships: [],
      nextTableId: 1,
      nextFieldId: 1,
      nextRelationshipId: 1
    };
  }

  function initBuilder(root) {
    const addTableForm = root.querySelector('[data-erd-add-table]');
    const addRelationshipForm = root.querySelector('[data-erd-add-relationship]');
    const fromTableSelect = root.querySelector('[data-erd-from-table]');
    const toTableSelect = root.querySelector('[data-erd-to-table]');
    const fromFieldSelect = root.querySelector('[data-erd-from-field]');
    const toFieldSelect = root.querySelector('[data-erd-to-field]');
    const entitiesWrap = root.querySelector('[data-erd-entities]');
    const schemaOutput = root.querySelector('[data-erd-schema]');
    const relationshipsList = root.querySelector('[data-erd-rel-list]');
    const graphSvg = root.querySelector('[data-erd-graph]');
    const resetButton = root.querySelector('[data-erd-reset]');

    if (
      !addTableForm ||
      !addRelationshipForm ||
      !fromTableSelect ||
      !toTableSelect ||
      !fromFieldSelect ||
      !toFieldSelect ||
      !entitiesWrap ||
      !schemaOutput ||
      !relationshipsList ||
      !graphSvg ||
      !resetButton
    ) {
      return;
    }

    const loadedState = loadState();
    const state = loadedState || createDefaultState();

    function findTable(tableId) {
      return state.tables.find((table) => table.id === Number(tableId));
    }

    function findField(table, fieldId) {
      if (!table) {
        return null;
      }
      return table.fields.find((field) => field.id === Number(fieldId));
    }

    function ensureCounters() {
      const tableIds = state.tables.map((table) => table.id);
      const fieldIds = state.tables.flatMap((table) => table.fields.map((field) => field.id));
      const relationshipIds = state.relationships.map((relationship) => relationship.id);

      state.nextTableId = Math.max(1, (Math.max.apply(null, tableIds.concat([0])) || 0) + 1);
      state.nextFieldId = Math.max(1, (Math.max.apply(null, fieldIds.concat([0])) || 0) + 1);
      state.nextRelationshipId = Math.max(1, (Math.max.apply(null, relationshipIds.concat([0])) || 0) + 1);
    }

    ensureCounters();

    function sanitizeState() {
      state.tables = state.tables.map((table) => ({
        id: Number(table.id),
        name: String(table.name || '').trim(),
        fields: (Array.isArray(table.fields) ? table.fields : []).map((field) => ({
          id: Number(field.id),
          name: String(field.name || '').trim(),
          type: String(field.type || 'TEXT').toUpperCase(),
          key: String(field.key || 'none')
        }))
      })).filter((table) => table.name.length > 0);

      state.relationships = state.relationships
        .map((relationship) => ({
          id: Number(relationship.id),
          fromTableId: Number(relationship.fromTableId),
          fromFieldId: Number(relationship.fromFieldId),
          toTableId: Number(relationship.toTableId),
          toFieldId: Number(relationship.toFieldId),
          relationshipType: String(relationship.relationshipType || '1:many')
        }))
        .filter((relationship) => {
          const fromTable = findTable(relationship.fromTableId);
          const toTable = findTable(relationship.toTableId);
          return !!fromTable && !!toTable;
        });
    }

    function renderRelationshipSelectors() {
      const tableOptions = state.tables.map((table) => ({
        value: table.id,
        label: table.name
      }));

      const previousFromTable = fromTableSelect.value;
      const previousToTable = toTableSelect.value;

      fromTableSelect.innerHTML = buildSelectOptions(tableOptions, previousFromTable || (tableOptions[0] && tableOptions[0].value));
      toTableSelect.innerHTML = buildSelectOptions(tableOptions, previousToTable || (tableOptions[1] && tableOptions[1].value) || (tableOptions[0] && tableOptions[0].value));

      function setFieldOptions(tableSelect, fieldSelect, fallbackValue) {
        const selectedTable = findTable(tableSelect.value);
        const fields = selectedTable
          ? selectedTable.fields.map((field) => ({ value: field.id, label: field.name + ' (' + field.type + ')' }))
          : [];
        fieldSelect.innerHTML = buildSelectOptions(fields, fallbackValue || (fields[0] && fields[0].value));
      }

      setFieldOptions(fromTableSelect, fromFieldSelect, fromFieldSelect.value);
      setFieldOptions(toTableSelect, toFieldSelect, toFieldSelect.value);

      const canLink = state.tables.length >= 2;
      [fromTableSelect, toTableSelect, fromFieldSelect, toFieldSelect].forEach((select) => {
        select.disabled = !canLink;
      });
      const submitButton = addRelationshipForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = !canLink;
      }
    }

    function buildReferenceMap() {
      const refMap = {};
      state.relationships.forEach((relationship) => {
        refMap[relationship.fromTableId + ':' + relationship.fromFieldId] = {
          toTableId: relationship.toTableId,
          toFieldId: relationship.toFieldId,
          relationshipType: relationship.relationshipType
        };
      });
      return refMap;
    }

    function renderSchemaDraft() {
      const referenceMap = buildReferenceMap();

      if (!state.tables.length) {
        schemaOutput.textContent = '-- Add tables and fields to generate a schema draft.';
        return;
      }

      const statements = state.tables.map((table) => {
        const header = '-- Table: ' + table.name + '\nTABLE ' + table.name + ' (';
        if (!table.fields.length) {
          return header + '\n  -- add fields here\n);';
        }

        const lines = table.fields.map((field) => {
          const chunks = [field.name, field.type];

          if (field.key === 'pk') {
            chunks.push('PRIMARY KEY');
          }

          if (field.key === 'fk') {
            const reference = referenceMap[table.id + ':' + field.id];
            if (reference) {
              const targetTable = findTable(reference.toTableId);
              const targetField = findField(targetTable, reference.toFieldId);
              if (targetTable && targetField) {
                chunks.push('REFERENCES ' + targetTable.name + '(' + targetField.name + ')');
              }
            }
          }

          return '  ' + chunks.join(' ');
        });

        return header + '\n' + lines.join(',\n') + '\n);';
      });

      schemaOutput.textContent = statements.join('\n\n');
    }

    function renderRelationshipList() {
      if (!state.relationships.length) {
        relationshipsList.innerHTML = '<li class="ib-erd-empty">No relationships linked yet.</li>';
        return;
      }

      const html = state.relationships
        .map((relationship) => {
          const fromTable = findTable(relationship.fromTableId);
          const toTable = findTable(relationship.toTableId);
          const fromField = findField(fromTable, relationship.fromFieldId);
          const toField = findField(toTable, relationship.toFieldId);

          if (!fromTable || !toTable || !fromField || !toField) {
            return '';
          }

          return (
            '<li>' +
            '<span>' +
            escapeHtml(fromTable.name + '.' + fromField.name) +
            ' ' +
            escapeHtml(relationship.relationshipType) +
            ' ' +
            escapeHtml(toTable.name + '.' + toField.name) +
            '</span>' +
            '<button type="button" data-erd-remove-relationship="' + relationship.id + '">Remove</button>' +
            '</li>'
          );
        })
        .join('');

      relationshipsList.innerHTML = html;
    }

    function renderGraph() {
      const width = 900;
      const height = 460;
      graphSvg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);

      if (!state.tables.length) {
        graphSvg.innerHTML = '<text x="24" y="40" fill="#5a5a5a" font-size="15" font-family="Arial">Add tables to draw your ER map.</text>';
        return;
      }

      const cols = Math.max(1, Math.ceil(Math.sqrt(state.tables.length)));
      const cellWidth = width / cols;
      const rows = Math.ceil(state.tables.length / cols);
      const cellHeight = height / rows;
      const boxWidth = 190;
      const boxHeight = 90;

      const tablePositions = {};
      state.tables.forEach((table, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const x = col * cellWidth + (cellWidth - boxWidth) / 2;
        const y = row * cellHeight + (cellHeight - boxHeight) / 2;
        tablePositions[table.id] = {
          x: x,
          y: y,
          centerX: x + boxWidth / 2,
          centerY: y + boxHeight / 2
        };
      });

      const markers = '<defs><marker id="erdArrow" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#7f8fb8"></polygon></marker></defs>';

      const edges = state.relationships
        .map((relationship) => {
          const fromPos = tablePositions[relationship.fromTableId];
          const toPos = tablePositions[relationship.toTableId];
          if (!fromPos || !toPos) {
            return '';
          }

          const labelX = (fromPos.centerX + toPos.centerX) / 2;
          const labelY = (fromPos.centerY + toPos.centerY) / 2 - 6;

          return (
            '<g>' +
            '<line x1="' + fromPos.centerX + '" y1="' + fromPos.centerY + '" x2="' + toPos.centerX + '" y2="' + toPos.centerY + '" stroke="#8d9bc2" stroke-width="2" marker-end="url(#erdArrow)"></line>' +
            '<rect x="' + (labelX - 28) + '" y="' + (labelY - 12) + '" width="56" height="18" rx="6" fill="#ffffff" stroke="#d7dff0"></rect>' +
            '<text x="' + labelX + '" y="' + (labelY + 1) + '" text-anchor="middle" fill="#1a3066" font-size="11" font-family="Arial">' + escapeHtml(relationship.relationshipType) + '</text>' +
            '</g>'
          );
        })
        .join('');

      const nodes = state.tables
        .map((table) => {
          const position = tablePositions[table.id];
          if (!position) {
            return '';
          }

          return (
            '<g>' +
            '<rect x="' + position.x + '" y="' + position.y + '" width="' + boxWidth + '" height="' + boxHeight + '" rx="10" fill="#f9fbff" stroke="#bcc9e6" stroke-width="2"></rect>' +
            '<text x="' + (position.x + 12) + '" y="' + (position.y + 24) + '" fill="#1a3066" font-size="13" font-weight="700" font-family="Arial">' + escapeHtml(table.name) + '</text>' +
            '<text x="' + (position.x + 12) + '" y="' + (position.y + 44) + '" fill="#5a5a5a" font-size="11" font-family="Arial">Fields: ' + table.fields.length + '</text>' +
            '</g>'
          );
        })
        .join('');

      graphSvg.innerHTML = markers + edges + nodes;
    }

    function renderTables() {
      if (!state.tables.length) {
        entitiesWrap.innerHTML = '<p class="ib-erd-empty">No tables yet. Add your first table above.</p>';
        return;
      }

      entitiesWrap.innerHTML = state.tables
        .map((table) => {
          const fieldRows = table.fields.length
            ? table.fields
                .map(
                  (field) =>
                    '<li>' +
                    '<span><strong>' + escapeHtml(field.name) + '</strong> <em>' + escapeHtml(field.type) + '</em>' +
                    (field.key !== 'none' ? ' <b>' + escapeHtml(field.key.toUpperCase()) + '</b>' : '') +
                    '</span>' +
                    '<button type="button" data-erd-remove-field="' + table.id + ':' + field.id + '">x</button>' +
                    '</li>'
                )
                .join('')
            : '<li class="ib-erd-empty">No fields added yet.</li>';

          return (
            '<article class="ib-erd-table" data-erd-table-id="' + table.id + '">' +
            '<header>' +
            '<input type="text" value="' + escapeHtml(table.name) + '" data-erd-table-name="' + table.id + '" />' +
            '<button type="button" data-erd-remove-table="' + table.id + '">Remove</button>' +
            '</header>' +
            '<form class="ib-erd-field-form" data-erd-add-field="' + table.id + '">' +
            '<input type="text" name="fieldName" placeholder="field_name" required />' +
            '<select name="fieldType">' +
            '<option value="INTEGER">INTEGER</option>' +
            '<option value="TEXT">TEXT</option>' +
            '<option value="DATE">DATE</option>' +
            '<option value="BOOLEAN">BOOLEAN</option>' +
            '<option value="FLOAT">FLOAT</option>' +
            '</select>' +
            '<select name="fieldKey">' +
            '<option value="none">No key</option>' +
            '<option value="pk">PK</option>' +
            '<option value="fk">FK</option>' +
            '</select>' +
            '<button type="submit">Add field</button>' +
            '</form>' +
            '<ul class="ib-erd-field-list">' + fieldRows + '</ul>' +
            '</article>'
          );
        })
        .join('');
    }

    function renderAll() {
      sanitizeState();
      ensureCounters();
      renderTables();
      renderRelationshipSelectors();
      renderRelationshipList();
      renderSchemaDraft();
      renderGraph();
      saveState(state);
    }

    addTableForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(addTableForm);
      const rawName = String(formData.get('tableName') || '').trim();
      const normalized = slugify(rawName);
      if (!normalized) {
        return;
      }

      state.tables.push({
        id: state.nextTableId++,
        name: normalized,
        fields: []
      });

      addTableForm.reset();
      renderAll();
    });

    entitiesWrap.addEventListener('submit', function (event) {
      const form = event.target.closest('[data-erd-add-field]');
      if (!form) {
        return;
      }
      event.preventDefault();

      const tableId = Number(form.getAttribute('data-erd-add-field'));
      const table = findTable(tableId);
      if (!table) {
        return;
      }

      const fieldNameInput = form.querySelector('input[name="fieldName"]');
      const fieldTypeSelect = form.querySelector('select[name="fieldType"]');
      const fieldKeySelect = form.querySelector('select[name="fieldKey"]');

      const fieldName = slugify(fieldNameInput && fieldNameInput.value ? fieldNameInput.value : '');
      const fieldType = fieldTypeSelect && fieldTypeSelect.value ? fieldTypeSelect.value : 'TEXT';
      const fieldKey = fieldKeySelect && fieldKeySelect.value ? fieldKeySelect.value : 'none';

      if (!fieldName) {
        return;
      }

      table.fields.push({
        id: state.nextFieldId++,
        name: fieldName,
        type: String(fieldType).toUpperCase(),
        key: fieldKey
      });

      form.reset();
      renderAll();
    });

    entitiesWrap.addEventListener('click', function (event) {
      const removeTableButton = event.target.closest('[data-erd-remove-table]');
      if (removeTableButton) {
        const tableId = Number(removeTableButton.getAttribute('data-erd-remove-table'));
        state.tables = state.tables.filter((table) => table.id !== tableId);
        state.relationships = state.relationships.filter(
          (relationship) => relationship.fromTableId !== tableId && relationship.toTableId !== tableId
        );
        renderAll();
        return;
      }

      const removeFieldButton = event.target.closest('[data-erd-remove-field]');
      if (removeFieldButton) {
        const pair = String(removeFieldButton.getAttribute('data-erd-remove-field') || '').split(':');
        const tableId = Number(pair[0]);
        const fieldId = Number(pair[1]);
        const table = findTable(tableId);
        if (table) {
          table.fields = table.fields.filter((field) => field.id !== fieldId);
          state.relationships = state.relationships.filter(
            (relationship) =>
              !(relationship.fromTableId === tableId && relationship.fromFieldId === fieldId) &&
              !(relationship.toTableId === tableId && relationship.toFieldId === fieldId)
          );
          renderAll();
        }
      }
    });

    entitiesWrap.addEventListener('change', function (event) {
      const nameInput = event.target.closest('[data-erd-table-name]');
      if (!nameInput) {
        return;
      }

      const tableId = Number(nameInput.getAttribute('data-erd-table-name'));
      const table = findTable(tableId);
      if (!table) {
        return;
      }

      const normalized = slugify(nameInput.value);
      if (!normalized) {
        nameInput.value = table.name;
        return;
      }

      table.name = normalized;
      renderAll();
    });

    addRelationshipForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(addRelationshipForm);
      const fromTableId = Number(formData.get('fromTable'));
      const fromFieldId = Number(formData.get('fromField'));
      const toTableId = Number(formData.get('toTable'));
      const toFieldId = Number(formData.get('toField'));
      const relationshipType = String(formData.get('relationshipType') || '1:many');

      if (!fromTableId || !fromFieldId || !toTableId || !toFieldId) {
        return;
      }

      if (fromTableId === toTableId && fromFieldId === toFieldId) {
        return;
      }

      state.relationships.push({
        id: state.nextRelationshipId++,
        fromTableId: fromTableId,
        fromFieldId: fromFieldId,
        toTableId: toTableId,
        toFieldId: toFieldId,
        relationshipType: relationshipType
      });

      renderAll();
    });

    relationshipsList.addEventListener('click', function (event) {
      const button = event.target.closest('[data-erd-remove-relationship]');
      if (!button) {
        return;
      }
      const relationshipId = Number(button.getAttribute('data-erd-remove-relationship'));
      state.relationships = state.relationships.filter((relationship) => relationship.id !== relationshipId);
      renderAll();
    });

    fromTableSelect.addEventListener('change', function () {
      renderRelationshipSelectors();
    });

    toTableSelect.addEventListener('change', function () {
      renderRelationshipSelectors();
    });

    resetButton.addEventListener('click', function () {
      state.tables = [];
      state.relationships = [];
      state.nextTableId = 1;
      state.nextFieldId = 1;
      state.nextRelationshipId = 1;
      renderAll();
    });

    renderAll();
  }

  function bootstrap() {
    document.querySelectorAll('[data-erd-builder]').forEach(function (root) {
      initBuilder(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
