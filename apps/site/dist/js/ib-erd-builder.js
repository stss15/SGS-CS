(function () {
  const DEFAULT_STORAGE_KEY = 'ib-erd-builder-v2';

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

  function getStorageKey(root) {
    return root.getAttribute('data-erd-storage-key') || DEFAULT_STORAGE_KEY + ':' + window.location.pathname;
  }

  function buildSelectOptions(items, selectedValue) {
    if (!items.length) {
      return '<option value="">No options</option>';
    }

    return items
      .map(function (item) {
        const isSelected = String(item.value) === String(selectedValue) ? ' selected' : '';
        return '<option value="' + escapeHtml(item.value) + '"' + isSelected + '>' + escapeHtml(item.label) + '</option>';
      })
      .join('');
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

  function loadState(storageKey) {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        return createDefaultState();
      }

      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.tables) || !Array.isArray(parsed.relationships)) {
        return createDefaultState();
      }

      return parsed;
    } catch (_error) {
      return createDefaultState();
    }
  }

  function sanitizeState(state) {
    state.tables = (Array.isArray(state.tables) ? state.tables : [])
      .map(function (table) {
        return {
          id: Number(table.id),
          name: String(table.name || '').trim(),
          fields: (Array.isArray(table.fields) ? table.fields : [])
            .map(function (field) {
              return {
                id: Number(field.id),
                name: String(field.name || '').trim(),
                type: String(field.type || 'TEXT').toUpperCase(),
                key: String(field.key || 'none'),
                example: String(field.example || '').trim()
              };
            })
            .filter(function (field) {
              return field.name.length > 0;
            })
        };
      })
      .filter(function (table) {
        return table.name.length > 0;
      });

    state.relationships = (Array.isArray(state.relationships) ? state.relationships : []).map(function (relationship) {
      return {
        id: Number(relationship.id),
        fromTableId: Number(relationship.fromTableId),
        fromFieldId: Number(relationship.fromFieldId),
        toTableId: Number(relationship.toTableId),
        toFieldId: Number(relationship.toFieldId),
        relationshipType: String(relationship.relationshipType || '1:many')
      };
    });

    const maxTableId = state.tables.reduce(function (highest, table) {
      return Math.max(highest, Number(table.id) || 0);
    }, 0);
    const maxFieldId = state.tables.reduce(function (highest, table) {
      return Math.max(
        highest,
        table.fields.reduce(function (fieldHighest, field) {
          return Math.max(fieldHighest, Number(field.id) || 0);
        }, 0)
      );
    }, 0);
    const maxRelationshipId = state.relationships.reduce(function (highest, relationship) {
      return Math.max(highest, Number(relationship.id) || 0);
    }, 0);

    state.nextTableId = Math.max(1, Number(state.nextTableId) || 1, maxTableId + 1);
    state.nextFieldId = Math.max(1, Number(state.nextFieldId) || 1, maxFieldId + 1);
    state.nextRelationshipId = Math.max(1, Number(state.nextRelationshipId) || 1, maxRelationshipId + 1);
  }

  function saveState(storageKey, state) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (_error) {
      // Ignore storage failures.
    }
  }

  function initBuilder(root) {
    const storageKey = getStorageKey(root);
    const mode = root.getAttribute('data-erd-mode') === 'tables' ? 'tables' : 'erd';
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

    if (!addTableForm || !entitiesWrap || !schemaOutput || !resetButton) {
      return;
    }

    const state = loadState(storageKey);
    sanitizeState(state);

    function findTable(tableId) {
      return state.tables.find(function (table) {
        return table.id === Number(tableId);
      });
    }

    function findField(table, fieldId) {
      if (!table) {
        return null;
      }

      return table.fields.find(function (field) {
        return field.id === Number(fieldId);
      }) || null;
    }

    function removeInvalidRelationships() {
      state.relationships = state.relationships.filter(function (relationship) {
        const fromTable = findTable(relationship.fromTableId);
        const toTable = findTable(relationship.toTableId);
        const fromField = findField(fromTable, relationship.fromFieldId);
        const toField = findField(toTable, relationship.toFieldId);

        return !!fromTable && !!toTable && !!fromField && !!toField;
      });
    }

    function buildReferenceMap() {
      const refMap = {};

      state.relationships.forEach(function (relationship) {
        refMap[relationship.fromTableId + ':' + relationship.fromFieldId] = {
          toTableId: relationship.toTableId,
          toFieldId: relationship.toFieldId,
          relationshipType: relationship.relationshipType
        };
      });

      return refMap;
    }

    function renderRelationshipSelectors() {
      if (!addRelationshipForm || !fromTableSelect || !toTableSelect || !fromFieldSelect || !toFieldSelect) {
        return;
      }

      const tableOptions = state.tables.map(function (table) {
        return {
          value: table.id,
          label: table.name
        };
      });

      const previousFromTable = fromTableSelect.value;
      const previousToTable = toTableSelect.value;
      const defaultFromTable = previousFromTable || (tableOptions[0] && tableOptions[0].value) || '';
      const defaultToTable = previousToTable || (tableOptions[1] && tableOptions[1].value) || defaultFromTable;

      fromTableSelect.innerHTML = buildSelectOptions(tableOptions, defaultFromTable);
      toTableSelect.innerHTML = buildSelectOptions(tableOptions, defaultToTable);

      function renderFieldOptions(tableSelect, fieldSelect) {
        const selectedTable = findTable(tableSelect.value);
        const fieldOptions = selectedTable
          ? selectedTable.fields.map(function (field) {
              return {
                value: field.id,
                label: field.name + ' (' + field.type + ')'
              };
            })
          : [];

        fieldSelect.innerHTML = buildSelectOptions(fieldOptions, fieldSelect.value || (fieldOptions[0] && fieldOptions[0].value));
        fieldSelect.disabled = fieldOptions.length === 0;
      }

      renderFieldOptions(fromTableSelect, fromFieldSelect);
      renderFieldOptions(toTableSelect, toFieldSelect);

      const canLink =
        state.tables.length >= 2 &&
        fromFieldSelect.options.length > 0 &&
        toFieldSelect.options.length > 0 &&
        fromFieldSelect.value &&
        toFieldSelect.value;

      [fromTableSelect, toTableSelect].forEach(function (select) {
        select.disabled = state.tables.length < 2;
      });

      const submitButton = addRelationshipForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = !canLink;
      }
    }

    function renderSchemaDraft() {
      const referenceMap = buildReferenceMap();

      if (!state.tables.length) {
        schemaOutput.textContent = mode === 'tables'
          ? 'Add tables and fields to build your data dictionary.'
          : 'Add tables, fields, and links to build your ERD draft.';
        return;
      }

      const blocks = state.tables.map(function (table) {
        const lines = table.fields.length
          ? table.fields.map(function (field) {
              const labels = [];
              if (field.key === 'pk') {
                labels.push('PK');
              }
              if (field.key === 'fk') {
                labels.push('FK');
              }

              const reference = referenceMap[table.id + ':' + field.id];
              const referenceText = reference
                ? (function () {
                    const targetTable = findTable(reference.toTableId);
                    const targetField = findField(targetTable, reference.toFieldId);
                    if (!targetTable || !targetField) {
                      return '';
                    }
                    return ' -> ' + targetTable.name + '.' + targetField.name + ' (' + reference.relationshipType + ')';
                  })()
                : '';

              const exampleText = field.example ? ' | example: ' + field.example : '';

              return '- ' + field.name + ' | ' + field.type + (labels.length ? ' | ' + labels.join(', ') : '') + exampleText + referenceText;
            })
          : ['- add fields here'];

        return 'TABLE ' + table.name + '\n' + lines.join('\n');
      });

      schemaOutput.textContent = blocks.join('\n\n');
    }

    function renderRelationshipList() {
      if (!relationshipsList) {
        return;
      }

      if (!state.relationships.length) {
        relationshipsList.innerHTML = '<li class="ib-erd-empty">No relationships linked yet.</li>';
        return;
      }

      relationshipsList.innerHTML = state.relationships
        .map(function (relationship) {
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
    }

    function renderGraph() {
      if (!graphSvg) {
        return;
      }

      const width = 1080;
      const columns = Math.max(1, Math.min(3, Math.ceil(Math.sqrt(state.tables.length || 1))));
      const cellWidth = width / columns;
      const rowGap = 46;
      const boxWidth = 250;
      const baseHeight = 74;
      const rowHeight = 20;
      let totalHeight = 200;
      const positions = {};
      let currentHeight = 32;

      if (!state.tables.length) {
        graphSvg.setAttribute('viewBox', '0 0 1080 260');
        graphSvg.innerHTML =
          '<text x="28" y="44" fill="#5a6687" font-size="16" font-family="Arial">Add tables to begin drawing the ER diagram.</text>';
        return;
      }

      state.tables.forEach(function (table, index) {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const fieldCount = Math.max(1, table.fields.length);
        const boxHeight = baseHeight + fieldCount * rowHeight;
        const rowStart = row * (boxHeight + rowGap);
        const x = column * cellWidth + (cellWidth - boxWidth) / 2;
        const y = 30 + rowStart;

        positions[table.id] = {
          x: x,
          y: y,
          boxHeight: boxHeight,
          centerX: x + boxWidth / 2,
          centerY: y + boxHeight / 2
        };

        currentHeight = Math.max(currentHeight, y + boxHeight + 40);
      });

      totalHeight = currentHeight;
      graphSvg.setAttribute('viewBox', '0 0 ' + width + ' ' + totalHeight);

      const markers =
        '<defs>' +
        '<marker id="erdArrow" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">' +
        '<polygon points="0 0, 10 3.5, 0 7" fill="#7f8fb8"></polygon>' +
        '</marker>' +
        '</defs>';

      const edges = state.relationships
        .map(function (relationship) {
          const fromPos = positions[relationship.fromTableId];
          const toPos = positions[relationship.toTableId];

          if (!fromPos || !toPos) {
            return '';
          }

          const labelX = (fromPos.centerX + toPos.centerX) / 2;
          const labelY = (fromPos.centerY + toPos.centerY) / 2 - 10;

          return (
            '<g>' +
            '<line x1="' + fromPos.centerX + '" y1="' + fromPos.centerY + '" x2="' + toPos.centerX + '" y2="' + toPos.centerY + '" stroke="#8d9bc2" stroke-width="2.4" marker-end="url(#erdArrow)"></line>' +
            '<rect x="' + (labelX - 34) + '" y="' + (labelY - 12) + '" width="68" height="20" rx="7" fill="#ffffff" stroke="#d7dff0"></rect>' +
            '<text x="' + labelX + '" y="' + (labelY + 2) + '" text-anchor="middle" fill="#1a3066" font-size="11" font-family="Arial">' +
            escapeHtml(relationship.relationshipType) +
            '</text>' +
            '</g>'
          );
        })
        .join('');

      const nodes = state.tables
        .map(function (table) {
          const position = positions[table.id];

          if (!position) {
            return '';
          }

          const fieldMarkup = (table.fields.length ? table.fields : [{ name: 'add_field', type: 'TYPE', key: 'none', example: '' }])
            .map(function (field, index) {
              const y = position.y + 58 + index * rowHeight;
              const keyLabel = field.key !== 'none' ? ' [' + field.key.toUpperCase() + ']' : '';

              return (
                '<text x="' + (position.x + 16) + '" y="' + y + '" fill="#415377" font-size="12" font-family="Arial">' +
                escapeHtml(field.name + ' : ' + field.type + keyLabel) +
                '</text>'
              );
            })
            .join('');

          return (
            '<g>' +
            '<rect x="' + position.x + '" y="' + position.y + '" width="' + boxWidth + '" height="' + position.boxHeight + '" rx="14" fill="#ffffff" stroke="#bcc9e6" stroke-width="2"></rect>' +
            '<rect x="' + position.x + '" y="' + position.y + '" width="' + boxWidth + '" height="38" rx="14" fill="#0E214B"></rect>' +
            '<text x="' + (position.x + 16) + '" y="' + (position.y + 24) + '" fill="#ffffff" font-size="13" font-weight="700" font-family="Arial">' +
            escapeHtml(table.name) +
            '</text>' +
            fieldMarkup +
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
        .map(function (table) {
          const fieldRows = table.fields.length
            ? table.fields
                .map(function (field) {
                  return (
                    '<li>' +
                    '<span>' +
                    '<strong>' + escapeHtml(field.name) + '</strong>' +
                    '<em>' + escapeHtml(field.type) + (field.key !== 'none' ? ' · ' + escapeHtml(field.key.toUpperCase()) : '') + '</em>' +
                    (field.example ? '<small class="ib-erd-field-example">Example: ' + escapeHtml(field.example) + '</small>' : '') +
                    '</span>' +
                    '<button type="button" data-erd-remove-field="' + table.id + ':' + field.id + '">Remove</button>' +
                    '</li>'
                  );
                })
                .join('')
            : '<li class="ib-erd-empty">No fields added yet.</li>';

          return (
            '<article class="ib-erd-table" data-erd-table-id="' + table.id + '">' +
            '<header>' +
            '<input type="text" value="' + escapeHtml(table.name) + '" data-erd-table-name="' + table.id + '" aria-label="Table name" />' +
            '<button type="button" data-erd-remove-table="' + table.id + '">Remove</button>' +
            '</header>' +
            '<form class="ib-erd-field-form" data-erd-add-field="' + table.id + '">' +
            '<input type="text" name="fieldName" placeholder="field_name" required />' +
            '<select name="fieldType">' +
            '<option value="INTEGER">INTEGER</option>' +
            '<option value="TEXT">TEXT</option>' +
            '<option value="DATE">DATE</option>' +
            '<option value="BOOLEAN">BOOLEAN</option>' +
            '<option value="REAL">REAL</option>' +
            '</select>' +
            '<select name="fieldKey">' +
            '<option value="none">No key</option>' +
            '<option value="pk">PK</option>' +
            '<option value="fk">FK</option>' +
            '</select>' +
            '<input type="text" name="fieldExample" placeholder="Example value" />' +
            '<button type="submit">Add field</button>' +
            '</form>' +
            '<ul class="ib-erd-field-list">' + fieldRows + '</ul>' +
            '</article>'
          );
        })
        .join('');
    }

    function renderAll() {
      sanitizeState(state);
      removeInvalidRelationships();
      renderTables();
      renderRelationshipSelectors();
      renderRelationshipList();
      renderSchemaDraft();
      renderGraph();
      saveState(storageKey, state);
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

      const formData = new FormData(form);
      const fieldName = slugify(formData.get('fieldName'));
      const fieldType = String(formData.get('fieldType') || 'TEXT').toUpperCase();
      const fieldKey = String(formData.get('fieldKey') || 'none');
      const fieldExample = String(formData.get('fieldExample') || '').trim();

      if (!fieldName) {
        return;
      }

      table.fields.push({
        id: state.nextFieldId++,
        name: fieldName,
        type: fieldType,
        key: fieldKey,
        example: fieldExample
      });

      form.reset();
      renderAll();
    });

    entitiesWrap.addEventListener('click', function (event) {
      const removeTableButton = event.target.closest('[data-erd-remove-table]');
      if (removeTableButton) {
        const tableId = Number(removeTableButton.getAttribute('data-erd-remove-table'));
        state.tables = state.tables.filter(function (table) {
          return table.id !== tableId;
        });
        state.relationships = state.relationships.filter(function (relationship) {
          return relationship.fromTableId !== tableId && relationship.toTableId !== tableId;
        });
        renderAll();
        return;
      }

      const removeFieldButton = event.target.closest('[data-erd-remove-field]');
      if (!removeFieldButton) {
        return;
      }

      const pair = String(removeFieldButton.getAttribute('data-erd-remove-field') || '').split(':');
      const tableId = Number(pair[0]);
      const fieldId = Number(pair[1]);
      const table = findTable(tableId);

      if (!table) {
        return;
      }

      table.fields = table.fields.filter(function (field) {
        return field.id !== fieldId;
      });
      state.relationships = state.relationships.filter(function (relationship) {
        return !(
          (relationship.fromTableId === tableId && relationship.fromFieldId === fieldId) ||
          (relationship.toTableId === tableId && relationship.toFieldId === fieldId)
        );
      });
      renderAll();
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

    if (addRelationshipForm) {
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
    }

    if (relationshipsList) {
      relationshipsList.addEventListener('click', function (event) {
        const button = event.target.closest('[data-erd-remove-relationship]');
        if (!button) {
          return;
        }

        const relationshipId = Number(button.getAttribute('data-erd-remove-relationship'));
        state.relationships = state.relationships.filter(function (relationship) {
          return relationship.id !== relationshipId;
        });
        renderAll();
      });
    }

    if (fromTableSelect) {
      fromTableSelect.addEventListener('change', function () {
        renderRelationshipSelectors();
      });
    }

    if (toTableSelect) {
      toTableSelect.addEventListener('change', function () {
        renderRelationshipSelectors();
      });
    }

    resetButton.addEventListener('click', function () {
      state.tables = [];
      state.relationships = [];
      state.nextTableId = 1;
      state.nextFieldId = 1;
      state.nextRelationshipId = 1;

      try {
        localStorage.removeItem(storageKey);
      } catch (_error) {
        // Ignore storage failures.
      }

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
