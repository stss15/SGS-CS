export interface ProjectStage {
  id: string;
  label: string;
  title: string;
  summary: string;
}

export interface ProjectStep {
  slug: string;
  stageId: string;
  title: string;
  navLabel: string;
  intro: string;
  sidebarSummary?: string;
  headerNote?: string;
  paceLabel?: string;
  deliverable?: string;
  learningGoals?: string[];
  contentHtml: string;
  scripts?: string[];
}

export interface ProjectSequence {
  key: string;
  kicker: string;
  rootPath: string;
  unitHref: string;
  unitLabel: string;
  projectTitle: string;
  projectSummary: string;
  stages: ProjectStage[];
  steps: ProjectStep[];
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const paragraph = (...items: string[]): string => items.map((item) => `<p>${item}</p>`).join('');

const unordered = (items: string[], className = ''): string =>
  `<ul${className ? ` class="${className}"` : ''}>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;

const ordered = (items: string[], className = ''): string =>
  `<ol${className ? ` class="${className}"` : ''}>${items.map((item) => `<li>${item}</li>`).join('')}</ol>`;

const section = (title: string, body: string, tone = 'default'): string => `
  <section class="ib-project-section ib-project-section--${tone}">
    <h3>${title}</h3>
    ${body}
  </section>
`;

const split = (...columns: string[]): string =>
  `<div class="ib-project-split">${columns.map((column) => `<div>${column}</div>`).join('')}</div>`;

const callout = (title: string, body: string, tone = 'note'): string => `
  <aside class="ib-project-callout ib-project-callout--${tone}">
    <h3>${title}</h3>
    ${body}
  </aside>
`;

const keywordTable = (items: Array<[string, string]>): string =>
  section('Key words and definitions', dataTable(['Term', 'Meaning'], items), 'table');

const referenceList = (title: string, items: string[]): string =>
  section(title, unordered(items, 'ib-project-reference-list'), 'reference');

const completionBlock = (items: string[], title = 'What must be in place before moving on'): string =>
  section(title, unordered(items, 'ib-project-checklist'), 'checks');

const featureVocabulary: Record<number, Array<[string, string]>> = {
  1: [
    ['Entry point', 'The main file that starts the application.'],
    ['Template', 'An HTML file the server sends to the browser.'],
    ['Static file', 'A browser asset such as JavaScript or CSS.'],
    ['Separation of concerns', 'Keeping structure, behaviour, and storage responsibilities distinct.']
  ],
  2: [
    ['Semantic HTML', 'Markup whose elements describe their purpose clearly.'],
    ['Container', 'A layout region that groups related content.'],
    ['Section', 'A meaningful block of page content.'],
    ['Bootstrap layout', 'A consistent way to organise the page visually.']
  ],
  3: [
    ['DOM target', 'An element JavaScript can find and update later.'],
    ['Identifier', 'An `id` or selector used to target a specific element.'],
    ['Empty state', 'What the interface shows when no records exist yet.'],
    ['Render area', 'The part of the page where records appear.']
  ],
  4: [
    ['Modal', 'A temporary interface layer for one focused action.'],
    ['Trigger', 'The control that opens the modal.'],
    ['Dismiss action', 'A safe way to close the modal without saving.'],
    ['Focused interaction', 'Keeping one task visible without cluttering the whole page.']
  ],
  5: [
    ['Input control', 'A form element used to collect data.'],
    ['Validation', 'Checking that the submitted data is sensible.'],
    ['Required field', 'A field that must be completed before submission.'],
    ['Data mapping', 'Matching each input to the correct stored value.']
  ],
  6: [
    ['GET request', 'A request used to retrieve existing data.'],
    ['JSON response', 'Structured data returned to the browser.'],
    ['Render function', 'A function that turns returned data into visible output.'],
    ['Request cycle', 'The path from browser action to response and redraw.']
  ],
  7: [
    ['POST request', 'A request used to create a new record.'],
    ['Payload', 'The data sent with the request.'],
    ['Insert', 'Adding a new record to storage.'],
    ['Refresh', 'Updating the interface so the new record is visible.']
  ],
  8: [
    ['Identifier', 'A stable value used to target the correct record.'],
    ['Delete action', 'A request that removes one stored record.'],
    ['Confirmation', 'A deliberate check before a destructive action.'],
    ['Record removal', 'Deleting data cleanly and predictably.']
  ],
  9: [
    ['Update', 'Changing an existing stored record.'],
    ['Status field', 'The value that shows whether work is complete.'],
    ['Persistence', 'A change that stays after refresh.'],
    ['UI feedback', 'Visible evidence that the new state was applied.']
  ],
  10: [
    ['Filter', 'A rule that narrows the records shown.'],
    ['Sort', 'An ordering rule applied to the returned records.'],
    ['Query parameter', 'A value sent with a request to control the result set.'],
    ['Conditional retrieval', 'Returning only records that match the chosen conditions.']
  ],
  11: [
    ['Test case', 'One measurable check of the system.'],
    ['Expected result', 'What should happen if the feature works.'],
    ['Actual result', 'What really happened during testing.'],
    ['Evaluation evidence', 'Proof used to judge whether the app meets the brief.']
  ]
};

const featureReferenceNotes: Record<number, string[]> = {
  1: [
    'A good project structure makes later debugging easier because each responsibility has a clear home.',
    'Folder names should describe purpose, not personal preference.',
    'Students should be able to explain why a file exists before they start filling it.'
  ],
  2: [
    'The first HTML page is a layout document, not a finished interface.',
    'Leave room for controls, outputs, and later dynamic content.',
    'Use clear section boundaries so JavaScript targets stay obvious later.'
  ],
  3: [
    'The task list area must exist before any data can be displayed.',
    'Plan what the user sees when there are no tasks yet as carefully as the populated state.',
    'Stable IDs and containers reduce confusion when the rendering logic is added.'
  ],
  4: [
    'A modal works well here because task creation is a focused action, not a separate application area.',
    'The open and close controls should feel deliberate and predictable.',
    'The form inside the modal should map cleanly to the data fields planned earlier.'
  ],
  5: [
    'Each form field should exist because it serves the brief, not because it seems common in apps.',
    'Labels should be written for non-technical users, not for the developer.',
    'Controlled options often produce cleaner data than free text.'
  ],
  6: [
    'The browser needs structured data back from the server before it can draw the list.',
    'Keep the rendering logic in one place so the display stays consistent.',
    'A good empty state is part of the feature, not an afterthought.'
  ],
  7: [
    'A create flow starts in the form, passes through the backend, and ends with refreshed evidence on screen.',
    'Front-end validation improves usability, but back-end validation still matters.',
    'The class should be able to trace where every submitted value goes.'
  ],
  8: [
    'Delete actions must target a stable identifier, not visible text.',
    'The interface should make it clear which record is about to be removed.',
    'After deletion, the visible list and stored data must agree.'
  ],
  9: [
    'A status change is only complete when the stored value and the visible state both update.',
    'The design should make completed work readable without making the interface noisy.',
    'Use this feature to reinforce the idea that UI state should reflect stored data.'
  ],
  10: [
    'Filtering and sorting exist to solve retrieval problems named in the original brief.',
    'Only add controls the user can justify from the problem specification.',
    'The result set should change in a way the class can predict and test.'
  ],
  11: [
    'Evaluation is strongest when each criterion points to a specific test and result.',
    'Testing should record evidence, not assumptions.',
    'A good final review includes limitations as well as successes.'
  ]
};

const jsonFeatureAdditions: Partial<Record<number, string[]>> = {
  1: ['In the JSON track, the storage difference should appear in the `data/` area, not in a completely different UI structure.'],
  5: ['When values are written into a JSON document, field naming consistency matters because there is no table schema enforcing it for you.'],
  6: ['Reading JSON-backed data often means loading a document structure and then preparing a browser-friendly response.'],
  7: ['When creating a record in JSON storage, identifier management and file integrity need explicit care.'],
  10: ['Some filtering decisions can still happen in the backend even when the source is a JSON document rather than SQL rows.']
};

const getFeatureReferences = (featureNumber: number, track: 'sql' | 'json'): string[] => {
  const base = featureReferenceNotes[featureNumber] || [];
  const additions = track === 'json' ? jsonFeatureAdditions[featureNumber] || [] : [];
  return [...base, ...additions];
};

const dataTable = (headers: string[], rows: string[][]): string => `
  <div class="ib-project-table-wrap">
    <table class="ib-project-table">
      <thead>
        <tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
          .join('')}
      </tbody>
    </table>
  </div>
`;

const codeBlock = (title: string, code: string, language = 'text'): string => `
  <section class="ib-project-section ib-project-section--code">
    <h3>${title}</h3>
    <pre><code class="language-${language}">${escapeHtml(code)}</code></pre>
  </section>
`;

const memo = (title: string, body: string): string => `
  <section class="ib-project-memo">
    <div class="ib-project-memo-head">
      <span>Client Document</span>
      <span>${title}</span>
    </div>
    <div class="ib-project-memo-body">
      ${body}
    </div>
  </section>
`;

const wireframeMarkup = `
  <div class="ib-project-wireframes">
    <figure class="ib-project-diagram">
      <figcaption>Main task screen wireframe</figcaption>
      <svg viewBox="0 0 720 260" role="img" aria-label="Task screen wireframe">
        <rect x="16" y="16" width="688" height="228" rx="18" fill="#ffffff" stroke="#c7d3ea" stroke-width="2"></rect>
        <rect x="40" y="36" width="190" height="34" rx="10" fill="#eef3ff" stroke="#bcc9e6"></rect>
        <text x="54" y="58" fill="#1a3066" font-size="14" font-family="Arial">Filter by assignee</text>
        <rect x="246" y="36" width="190" height="34" rx="10" fill="#eef3ff" stroke="#bcc9e6"></rect>
        <text x="260" y="58" fill="#1a3066" font-size="14" font-family="Arial">Filter by priority</text>
        <rect x="452" y="36" width="126" height="34" rx="10" fill="#eef3ff" stroke="#bcc9e6"></rect>
        <text x="466" y="58" fill="#1a3066" font-size="14" font-family="Arial">Sort by date</text>
        <rect x="592" y="36" width="92" height="34" rx="10" fill="#0E214B"></rect>
        <text x="615" y="58" fill="#ffffff" font-size="14" font-family="Arial">Add task</text>
        <rect x="40" y="88" width="644" height="42" rx="10" fill="#f8fbff" stroke="#d4deef"></rect>
        <rect x="40" y="140" width="644" height="42" rx="10" fill="#f8fbff" stroke="#d4deef"></rect>
        <rect x="40" y="192" width="644" height="42" rx="10" fill="#f8fbff" stroke="#d4deef"></rect>
      </svg>
    </figure>
    <figure class="ib-project-diagram">
      <figcaption>Add task modal wireframe</figcaption>
      <svg viewBox="0 0 720 280" role="img" aria-label="Task modal wireframe">
        <rect x="166" y="20" width="388" height="236" rx="18" fill="#ffffff" stroke="#c7d3ea" stroke-width="2"></rect>
        <rect x="186" y="42" width="348" height="28" rx="8" fill="#f4f7ff" stroke="#d3dcef"></rect>
        <text x="200" y="61" fill="#1a3066" font-size="14" font-family="Arial">Task title</text>
        <rect x="186" y="86" width="166" height="28" rx="8" fill="#f4f7ff" stroke="#d3dcef"></rect>
        <text x="200" y="105" fill="#1a3066" font-size="14" font-family="Arial">Assignee</text>
        <rect x="368" y="86" width="166" height="28" rx="8" fill="#f4f7ff" stroke="#d3dcef"></rect>
        <text x="382" y="105" fill="#1a3066" font-size="14" font-family="Arial">Priority</text>
        <rect x="186" y="130" width="166" height="28" rx="8" fill="#f4f7ff" stroke="#d3dcef"></rect>
        <text x="200" y="149" fill="#1a3066" font-size="14" font-family="Arial">Due date</text>
        <rect x="186" y="174" width="348" height="30" rx="8" fill="#f4f7ff" stroke="#d3dcef"></rect>
        <text x="200" y="194" fill="#1a3066" font-size="14" font-family="Arial">Additional notes / category</text>
        <rect x="394" y="218" width="140" height="24" rx="8" fill="#0E214B"></rect>
        <text x="437" y="235" fill="#ffffff" font-size="13" font-family="Arial">Save task</text>
      </svg>
    </figure>
  </div>
`;

const builderMarkup = (mode: 'tables' | 'erd'): string => `
  <div class="ib-project-workspace">
    <div class="ib-erd-builder" data-erd-builder data-erd-mode="${mode}" data-erd-storage-key="ib-sql-project-erd-v2">
      <div class="ib-erd-grid">
        <article class="ib-erd-card">
          <h6>Add a table</h6>
          <p class="ib-erd-note">Add one table at a time and keep naming consistent across the whole draft.</p>
          <form class="ib-erd-form" data-erd-add-table>
            <label>
              Table name
              <input type="text" name="tableName" placeholder="tasks" required />
            </label>
            <button type="submit">Add table</button>
          </form>
        </article>
        ${
          mode === 'erd'
            ? `
              <article class="ib-erd-card">
                <h6>Link a relationship</h6>
                <p class="ib-erd-note">Use this after the tables and fields exist. Link each relationship to a clear business rule.</p>
                <form class="ib-erd-form" data-erd-add-relationship>
                  <label>
                    From table
                    <select name="fromTable" data-erd-from-table></select>
                  </label>
                  <label>
                    From field
                    <select name="fromField" data-erd-from-field></select>
                  </label>
                  <label>
                    Relationship type
                    <select name="relationshipType">
                      <option value="1:1">1 : 1</option>
                      <option value="1:many" selected>1 : many</option>
                      <option value="many:many">many : many</option>
                    </select>
                  </label>
                  <label>
                    To table
                    <select name="toTable" data-erd-to-table></select>
                  </label>
                  <label>
                    To field
                    <select name="toField" data-erd-to-field></select>
                  </label>
                  <button type="submit">Add relationship</button>
                </form>
              </article>
            `
            : ''
        }
      </div>

      <div class="ib-erd-builder-body">
        <article class="ib-erd-card">
          <h6>${mode === 'tables' ? 'Table planner' : 'Table and field editor'}</h6>
          <p class="ib-erd-note">${mode === 'tables' ? 'Draft the fields, types, keys, and example values before moving on to relationships.' : 'Refine the tables and fields first, then connect them with explicit relationships.'}</p>
          <div class="ib-erd-entities" data-erd-entities></div>
          <button type="button" class="ib-erd-reset" data-erd-reset>Reset planner</button>
        </article>

        <div class="ib-erd-grid ib-erd-grid-bottom">
          <article class="ib-erd-card">
            <h6>${mode === 'tables' ? 'Data dictionary draft' : 'Schema draft'}</h6>
            <p class="ib-erd-note">${mode === 'tables' ? 'Use this draft to check whether the field names, types, and example values make sense together.' : 'Use this draft to check whether the relationships and keys are coherent.'}</p>
            <pre data-erd-schema></pre>
          </article>
          ${
            mode === 'erd'
              ? `
                <article class="ib-erd-card">
                  <h6>Relationship list</h6>
                  <p class="ib-erd-note">Each line should match a relationship the class can explain aloud.</p>
                  <ul class="ib-erd-rel-list" data-erd-rel-list></ul>
                </article>
              `
              : ''
          }
        </div>
      </div>

      ${
        mode === 'erd'
          ? `
            <article class="ib-erd-card">
              <h6>ER diagram map</h6>
              <p class="ib-erd-note">Use this workspace to organise the ERD before redrawing it neatly in final documentation.</p>
              <svg class="ib-erd-graph" data-erd-graph></svg>
            </article>
          `
          : ''
      }
    </div>
  </div>
`;

const testPlanBuilderMarkup = `
  <div class="ib-project-workspace">
    <div class="ib-test-plan" data-test-plan-builder data-test-plan-key="ib-sql-project-test-plan-v1">
      <div class="ib-test-plan-grid">
        <article class="ib-test-plan-card">
          <h6>Add a test row</h6>
          <p class="ib-erd-note">Write one measurable scenario at a time so the result can later be marked pass or fail.</p>
          <form class="ib-test-plan-form" data-test-add-row>
            <label>
              Feature or scenario
              <input type="text" name="feature" placeholder="Create a new task" required />
            </label>
            <label>
              Setup / input
              <textarea name="setup" rows="3" placeholder="Valid title, assignee, date"></textarea>
            </label>
            <label>
              Expected result
              <textarea name="expected" rows="3" placeholder="Task appears in the list and is stored"></textarea>
            </label>
            <button type="submit">Add test row</button>
          </form>
        </article>
        <article class="ib-test-plan-card">
          <h6>Test planning notes</h6>
          <p class="ib-erd-note">Aim for a balanced set of tests: normal use, boundary cases, invalid input, and a small number of usability checks.</p>
          ${unordered([
            'One test row should answer one specific question.',
            'Expected results must be observable.',
            'Do not write “works” as an expected result.',
            'Use the final columns only after implementation.'
          ])}
          <button type="button" class="ib-erd-reset" data-test-reset>Reset test plan</button>
        </article>
      </div>
      <article class="ib-test-plan-card">
        <h6>Project test table</h6>
        <div class="ib-project-table-wrap">
          <table class="ib-project-table ib-test-plan-table">
            <thead>
              <tr>
                <th>Feature / scenario</th>
                <th>Setup / input</th>
                <th>Expected result</th>
                <th>Actual result</th>
                <th>Pass / fail</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody data-test-rows></tbody>
          </table>
        </div>
      </article>
    </div>
  </div>
`;

const flowStrip = (
  labels: string[] = ['HTML', 'JavaScript', 'Flask', 'Storage', 'Response']
): string => `
  <div class="ib-project-flow">
    ${labels
      .map(
        (label, index) =>
          `${index > 0 ? '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>' : ''}<span>${label}</span>`
      )
      .join('')}
  </div>
`;

const boxModelFigure = `
  <svg class="ib-project-doc-svg" viewBox="0 0 520 260" role="img" aria-label="HTML box model">
    <rect x="24" y="24" width="472" height="212" rx="24" fill="#f7e9cb" stroke="#c49c58" stroke-width="2"></rect>
    <rect x="72" y="64" width="376" height="132" rx="20" fill="#dfe9ff" stroke="#90acd9" stroke-width="2"></rect>
    <rect x="120" y="102" width="280" height="56" rx="16" fill="#ffffff" stroke="#c8d5f1" stroke-width="2"></rect>
    <text x="260" y="50" text-anchor="middle" fill="#7d5b21" font-size="18" font-family="Arial" font-weight="700">margin</text>
    <text x="260" y="92" text-anchor="middle" fill="#25457b" font-size="18" font-family="Arial" font-weight="700">padding</text>
    <text x="260" y="136" text-anchor="middle" fill="#0e214b" font-size="18" font-family="Arial" font-weight="700">content</text>
    <text x="260" y="162" text-anchor="middle" fill="#51627f" font-size="14" font-family="Arial">This is where the text or button actually sits.</text>
  </svg>
`;

const validationLayersFigure = `
  <svg class="ib-project-doc-svg" viewBox="0 0 640 220" role="img" aria-label="Validation layers">
    <rect x="18" y="48" width="130" height="110" rx="18" fill="#eef3ff" stroke="#9db4df" stroke-width="2"></rect>
    <rect x="176" y="48" width="130" height="110" rx="18" fill="#eef3ff" stroke="#9db4df" stroke-width="2"></rect>
    <rect x="334" y="48" width="130" height="110" rx="18" fill="#eef3ff" stroke="#9db4df" stroke-width="2"></rect>
    <rect x="492" y="48" width="130" height="110" rx="18" fill="#f7e9cb" stroke="#c49c58" stroke-width="2"></rect>
    <text x="83" y="84" text-anchor="middle" fill="#0e214b" font-size="18" font-family="Arial" font-weight="700">HTML</text>
    <text x="83" y="108" text-anchor="middle" fill="#51627f" font-size="13" font-family="Arial">required</text>
    <text x="241" y="84" text-anchor="middle" fill="#0e214b" font-size="18" font-family="Arial" font-weight="700">JavaScript</text>
    <text x="241" y="108" text-anchor="middle" fill="#51627f" font-size="13" font-family="Arial">presence checks</text>
    <text x="399" y="84" text-anchor="middle" fill="#0e214b" font-size="18" font-family="Arial" font-weight="700">Flask</text>
    <text x="399" y="108" text-anchor="middle" fill="#51627f" font-size="13" font-family="Arial">backend rules</text>
    <text x="557" y="84" text-anchor="middle" fill="#7d5b21" font-size="18" font-family="Arial" font-weight="700">Storage</text>
    <text x="557" y="108" text-anchor="middle" fill="#7d5b21" font-size="13" font-family="Arial">final integrity</text>
    <path d="M148 102 L176 102" stroke="#0e214b" stroke-width="3" marker-end="url(#arrowhead)"></path>
    <path d="M306 102 L334 102" stroke="#0e214b" stroke-width="3" marker-end="url(#arrowhead)"></path>
    <path d="M464 102 L492 102" stroke="#0e214b" stroke-width="3" marker-end="url(#arrowhead)"></path>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0e214b"></polygon>
      </marker>
    </defs>
  </svg>
`;

const sqlTableFigure = `
  <svg class="ib-project-doc-svg" viewBox="0 0 620 260" role="img" aria-label="Users and tasks table relationship">
    <rect x="54" y="42" width="180" height="152" rx="18" fill="#ffffff" stroke="#c7d3ea" stroke-width="2"></rect>
    <rect x="386" y="42" width="180" height="152" rx="18" fill="#ffffff" stroke="#c7d3ea" stroke-width="2"></rect>
    <text x="144" y="72" text-anchor="middle" fill="#0e214b" font-size="20" font-family="Arial" font-weight="700">users</text>
    <text x="476" y="72" text-anchor="middle" fill="#0e214b" font-size="20" font-family="Arial" font-weight="700">tasks</text>
    <text x="84" y="104" fill="#25457b" font-size="15" font-family="Arial">user_id (PK)</text>
    <text x="84" y="132" fill="#51627f" font-size="15" font-family="Arial">username</text>
    <text x="416" y="104" fill="#25457b" font-size="15" font-family="Arial">task_id (PK)</text>
    <text x="416" y="132" fill="#51627f" font-size="15" font-family="Arial">title</text>
    <text x="416" y="160" fill="#c49c58" font-size="15" font-family="Arial">user_id (FK)</text>
    <text x="416" y="188" fill="#51627f" font-size="15" font-family="Arial">priority / due_date / status</text>
    <path d="M234 108 C294 108, 326 108, 386 108" stroke="#0e214b" stroke-width="3" fill="none"></path>
    <circle cx="234" cy="108" r="5" fill="#0e214b"></circle>
    <circle cx="386" cy="108" r="5" fill="#0e214b"></circle>
    <text x="310" y="92" text-anchor="middle" fill="#7d5b21" font-size="16" font-family="Arial" font-weight="700">1 : many</text>
  </svg>
`;

const docGrid = (...columns: string[]): string => `<div class="ib-project-doc-grid">${columns.join('')}</div>`;

const docPanel = (title: string, body: string): string => `
  <section class="ib-project-doc-panel">
    <h4>${title}</h4>
    ${body}
  </section>
`;

const codeNotes = (notes: Array<[string, string]>): string =>
  `<div class="ib-project-code-notes">${notes
    .map(
      ([label, text]) => `
        <div class="ib-project-code-note">
          <strong>${label}</strong>
          <p>${text}</p>
        </div>
      `
    )
    .join('')}</div>`;

const docCode = (
  title: string,
  code: string,
  language: string,
  notes: Array<[string, string]>
): string => `
  <section class="ib-project-doc-code">
    <h4>${title}</h4>
    <pre><code class="language-${language}">${escapeHtml(code)}</code></pre>
    ${notes.length ? codeNotes(notes) : ''}
  </section>
`;

const taskBox = (title: string, intro: string, steps: string[], prompts: string[]): string => `
  <section class="ib-project-taskbox">
    <h4>${title}</h4>
    <p>${intro}</p>
    ${ordered(steps)}
    ${
      prompts.length
        ? `
          <div>
            <p><strong>Be ready to explain:</strong></p>
            ${unordered(prompts)}
          </div>
        `
        : ''
    }
  </section>
`;

interface StudentJourneyStep {
  file: string;
  title: string;
  body: string[];
  prompts?: string[];
}

const buildJourneyCard = (step: StudentJourneyStep, index: number): string => `
  <section class="ib-project-build-card">
    <div class="ib-project-build-card-head">
      <span class="ib-project-build-card-index">Step ${index + 1}</span>
      <span class="ib-project-build-card-file">${step.file}</span>
    </div>
    <h4>${step.title}</h4>
    ${unordered(step.body)}
    ${
      step.prompts?.length
        ? `
          <div class="ib-project-build-card-prompts">
            <p><strong>Ask yourself</strong></p>
            ${unordered(step.prompts)}
          </div>
        `
        : ''
    }
  </section>
`;

const buildJourney = (title: string, intro: string, steps: StudentJourneyStep[]): string =>
  section(
    title,
    `<p>${intro}</p><div class="ib-project-build-grid">${steps
      .map((step, index) => buildJourneyCard(step, index))
      .join('')}</div>`,
    'default'
  );

const docTablePanel = (title: string, headers: string[], rows: string[][]): string =>
  docPanel(title, dataTable(headers, rows));

const figurePanel = (title: string, intro: string, svg: string): string => `
  <section class="ib-project-figure-panel">
    <h4>${title}</h4>
    <p>${intro}</p>
    ${svg}
  </section>
`;

const figureGrid = (...items: string[]): string => `<div class="ib-project-figure-grid">${items.join('')}</div>`;

const validationFlowBlock = (title: string, steps: Array<[string, string]>): string =>
  section(
    title,
    `<div class="ib-project-validation-flow">${steps
      .map(
        ([label, text]) => `
          <div class="ib-project-validation-step">
            <strong>${label}</strong>
            <p>${text}</p>
          </div>
        `
      )
      .join('')}</div>`,
    'default'
  );

const miniUi = (title: string, note: string, body: string): string => `
  <section class="ib-project-mini-ui">
    <h4>${title}</h4>
    <p>${note}</p>
    <div class="ib-project-mini-ui-window">
      ${body}
    </div>
  </section>
`;

const featureSnippetLanguage: Record<number, string> = {
  1: 'text',
  2: 'html',
  3: 'javascript',
  4: 'html',
  5: 'html',
  6: 'javascript',
  7: 'javascript',
  8: 'javascript',
  9: 'javascript',
  10: 'javascript',
  11: 'text'
};

const featureBoilerplate = (
  featureNumber: number,
  track: 'sql' | 'json'
): { title: string; code: string; notes: Array<[string, string]> } => {
  switch (featureNumber) {
    case 1:
      return {
        title: 'Starter project skeleton',
        code: `project/
  app.py
  templates/
    index.html
  static/
    js/
      app.js
${track === 'sql' ? '  schema.sql\n  init_db.py' : '  data/\n    tasks.json\n    users.json'}`,
        notes: [
          ['app.py', 'This is the server entry point. It starts Flask and holds the route logic.'],
          ['templates/', 'Browser-facing HTML lives here so layout is kept separate from Python.'],
          ['static/js/', 'Client-side JavaScript sits here because it runs in the browser, not on the server.'],
          [track === 'sql' ? 'schema.sql' : 'data/', track === 'sql' ? 'Database definition belongs outside the route file so the schema stays readable.' : 'The storage difference is made explicit in a dedicated data folder rather than hidden in the UI code.']
        ]
      };
    case 2:
      return {
        title: 'Generic HTML boilerplate',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example App</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet">
</head>
<body>
  <main class="container py-5">
    <h1 class="mb-4">Example heading</h1>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`,
        notes: [
          ['<!DOCTYPE html>', 'Tells the browser to use modern HTML rules instead of quirks mode.'],
          ['lang="en"', 'Helps accessibility tools and browsers understand the document language.'],
          ['meta charset', 'Keeps text encoding predictable so symbols and punctuation display correctly.'],
          ['container py-5', 'Bootstrap uses `container` for width and `py-5` for vertical padding on the y-axis.'],
          ['mb-4', 'Bootstrap spacing classes use `m` for margin and `b` for bottom.']
        ]
      };
    case 3:
      return {
        title: 'Generic render target pattern',
        code: `const listArea = document.getElementById("listArea");
listArea.innerHTML = "<p>No records yet.</p>";`,
        notes: [
          ['const', 'Use `const` when the variable should always point at the same element.'],
          ['getElementById', 'Finds one specific DOM node by the `id` you gave it in HTML.'],
          ['innerHTML', 'Replaces the contents of the chosen element with new markup.'],
          ['"listArea"', 'The string must match the HTML `id` exactly or the script will not find the target.']
        ]
      };
    case 4:
      return {
        title: 'Generic Bootstrap modal pattern',
        code: `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add item
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Create item</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">Form goes here</div>
    </div>
  </div>
</div>`,
        notes: [
          ['btn btn-primary', 'Bootstrap classes style the trigger as a primary action button.'],
          ['data-bs-toggle', 'This tells Bootstrap which component behaviour to attach.'],
          ['data-bs-target', 'The button points at the modal `id` it should open.'],
          ['modal-header / modal-body', 'Bootstrap splits the modal into named regions so structure stays predictable.']
        ]
      };
    case 5:
      return {
        title: 'Generic form field pattern',
        code: `<label class="form-label" for="itemTitle">Item title</label>
<input id="itemTitle" class="form-control" type="text" required>

<label class="form-label" for="itemPriority">Priority</label>
<select id="itemPriority" class="form-select" required>
  <option value="">Choose one</option>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>`,
        notes: [
          ['label', 'A visible label tells the user what the control is for and improves accessibility.'],
          ['required', 'HTML can stop an empty submission, but it is only the first validation layer.'],
          ['form-control / form-select', 'Bootstrap classes give inputs a consistent, readable appearance.'],
          ['value=""', 'An empty first option forces the user to make an intentional choice.']
        ]
      };
    case 6:
      return {
        title: 'Generic fetch pattern',
        code: `function loadItems() {
  fetch("/api/items")
    .then((response) => response.json())
    .then((items) => renderItems(items));
}`,
        notes: [
          ['fetch()', 'Starts an HTTP request from the browser to the backend.'],
          ['response', 'This variable holds the raw HTTP response object before the JSON is extracted.'],
          ['response.json()', 'Turns the JSON response body into usable JavaScript data.'],
          ['=>', 'An arrow function is a short way to write a function you pass into `.then()`.']
        ]
      };
    case 7:
      return {
        title: 'Generic create-request pattern',
        code: `const payload = { title, priority };

fetch("/api/items", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
}).then(() => loadItems());`,
        notes: [
          ['payload', 'This is the JavaScript object you want to send to the backend.'],
          ['method: "POST"', 'POST is the HTTP method commonly used when creating a new record.'],
          ['Content-Type', 'This header tells the server the request body contains JSON.'],
          ['JSON.stringify', 'Turns the JavaScript object into JSON text for the request body.']
        ]
      };
    case 8:
      return {
        title: 'Generic delete-request pattern',
        code: `function deleteItem(id) {
  return fetch(\`/api/items/\${id}\`, {
    method: "DELETE"
  });
}`,
        notes: [
          ['id', 'The identifier must belong to the record, not just to the visual row.'],
          ['template literal', 'Backticks let you insert the id into the URL with `${...}`.'],
          ['DELETE', 'DELETE tells the backend this request is meant to remove one record.'],
          ['return', 'Returning the fetch promise makes it easier to chain a refresh or message afterwards.']
        ]
      };
    case 9:
      return {
        title: 'Generic update-request pattern',
        code: `fetch(\`/api/items/\${id}\`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ status: "complete" })
});`,
        notes: [
          ['PATCH', 'PATCH is used when you are changing part of an existing record.'],
          ['status', 'Send only the value the backend actually needs to update.'],
          ['JSON body', 'Even a small update still needs the data packaged clearly.'],
          ['persistence', 'A true update survives refresh because the stored data changed, not just the styling.']
        ]
      };
    case 10:
      return {
        title: 'Generic filter and sort request',
        code: `const query = new URLSearchParams({
  user: selectedUser,
  priority: selectedPriority,
  sort: "due_date"
});

fetch(\`/api/items?\${query.toString()}\`);`,
        notes: [
          ['URLSearchParams', 'Builds a clean query string instead of hand-writing `?` and `&` each time.'],
          ['selectedUser', 'These values usually come from form controls the user has changed.'],
          ['query.toString()', 'Converts the parameters into URL text the browser can send.'],
          ['sort', 'Sorting is a rule about order, not a second copy of the data.']
        ]
      };
    default:
      return {
        title: 'Evaluation mapping',
        code: `Criterion
  -> test
  -> evidence
  -> pass / fail
  -> improvement note`,
        notes: [
          ['Criterion', 'What the client needed.'],
          ['Evidence', 'The screenshot, output, or observed behaviour that proves the feature works.'],
          ['Pass / fail', 'This judgement should come from evidence rather than confidence.']
        ]
      };
  }
};

const featurePreview = (featureNumber: number, track: 'sql' | 'json'): string => {
  switch (featureNumber) {
    case 2:
      return miniUi(
        'What the page should roughly look like',
        'At this stage the screen only needs a heading, a place for the add button, and a clear output region.',
        `
          <div class="ib-project-mini-ui-toolbar">
            <span class="ib-project-mini-ui-button">Add task</span>
          </div>
          <div class="ib-project-mini-ui-list">
            <div class="ib-project-mini-ui-row">
              <span>Main list area</span>
              <span class="ib-project-mini-ui-pill">Empty for now</span>
            </div>
          </div>
        `
      );
    case 3:
      return miniUi(
        'Empty-state preview',
        'Give the render area a calm, obvious starting state before any data is loaded.',
        `
          <div class="ib-project-mini-ui-list">
            <div class="ib-project-mini-ui-row">
              <span>No tasks yet. Use the button above to add one.</span>
            </div>
          </div>
        `
      );
    case 4:
      return miniUi(
        'Modal preview',
        'The main page stays clean while the create form appears in a focused layer.',
        `
          <div class="ib-project-mini-ui-toolbar">
            <span class="ib-project-mini-ui-button">Add task</span>
          </div>
          <div class="ib-project-mini-ui-fieldset">
            <div class="ib-project-mini-ui-field">
              <span class="ib-project-mini-ui-label">Modal title</span>
              <div class="ib-project-mini-ui-input"></div>
            </div>
            <div class="ib-project-mini-ui-actions">
              <span class="ib-project-mini-ui-chip">Cancel</span>
              <span class="ib-project-mini-ui-button">Save</span>
            </div>
          </div>
        `
      );
    case 5:
      return miniUi(
        'Input checklist preview',
        'Students should be able to point at each control and say which field it maps to in storage.',
        `
          <div class="ib-project-mini-ui-fieldset">
            <div class="ib-project-mini-ui-field">
              <span class="ib-project-mini-ui-label">Task title</span>
              <div class="ib-project-mini-ui-input"></div>
            </div>
            <div class="ib-project-mini-ui-field">
              <span class="ib-project-mini-ui-label">Assign user</span>
              <div class="ib-project-mini-ui-input"></div>
            </div>
            <div class="ib-project-mini-ui-field">
              <span class="ib-project-mini-ui-label">Priority</span>
              <div class="ib-project-mini-ui-input"></div>
            </div>
          </div>
        `
      );
    case 6:
      return miniUi(
        'Rendered task list preview',
        'After the read request succeeds, the user should see a list that looks deliberate rather than raw.',
        `
          <div class="ib-project-mini-ui-list">
            <div class="ib-project-mini-ui-row">
              <span>Prepare report | Alice | High | 2026-03-10 | open</span>
              <span class="ib-project-mini-ui-chip">Complete</span>
              <span class="ib-project-mini-ui-chip">Delete</span>
            </div>
            <div class="ib-project-mini-ui-row">
              <span>Order toner | Bob | Low | 2026-03-14 | open</span>
              <span class="ib-project-mini-ui-chip">Complete</span>
              <span class="ib-project-mini-ui-chip">Delete</span>
            </div>
          </div>
        `
      );
    case 7:
      return miniUi(
        'Create flow outcome',
        'The important moment is not the click. It is the new record appearing back in the list after storage succeeds.',
        `
          <div class="ib-project-mini-ui-toolbar">
            <span class="ib-project-mini-ui-button">Save task</span>
            <span class="ib-project-mini-ui-pill">${track === 'sql' ? 'Writes to SQL' : 'Writes to JSON'}</span>
          </div>
          <div class="ib-project-mini-ui-list">
            <div class="ib-project-mini-ui-row">
              <span>New task now visible in the list</span>
            </div>
          </div>
        `
      );
    case 8:
      return miniUi(
        'Delete action preview',
        'Delete needs to target one specific record, not whichever line happens to look right.',
        `
          <div class="ib-project-mini-ui-list">
            <div class="ib-project-mini-ui-row">
              <span>Prepare report</span>
              <span class="ib-project-mini-ui-pill">task_id = 8</span>
              <span class="ib-project-mini-ui-button">Delete</span>
            </div>
          </div>
        `
      );
    case 9:
      return miniUi(
        'Completion state preview',
        'A good completion feature changes both the stored data and the visible status.',
        `
          <div class="ib-project-mini-ui-list">
            <div class="ib-project-mini-ui-row">
              <span>Prepare report</span>
              <span class="ib-project-mini-ui-pill">completed</span>
              <span class="ib-project-mini-ui-chip">Saved</span>
            </div>
          </div>
        `
      );
    case 10:
      return miniUi(
        'Filter bar preview',
        'The toolbar should help the user retrieve the right tasks quickly, not overload the screen.',
        `
          <div class="ib-project-mini-ui-toolbar">
            <span class="ib-project-mini-ui-chip">User</span>
            <span class="ib-project-mini-ui-chip">Priority</span>
            <span class="ib-project-mini-ui-chip">Due date</span>
            <span class="ib-project-mini-ui-button">Apply</span>
          </div>
          <div class="ib-project-mini-ui-list">
            <div class="ib-project-mini-ui-row">
              <span>Filtered results appear here</span>
            </div>
          </div>
        `
      );
    case 11:
      return docPanel(
        'What counts as evidence',
        unordered([
          'A visible task appearing after create.',
          'A task disappearing after delete.',
          'A status change still present after refresh.',
          'A filtered list showing only the chosen records.'
        ])
      );
    default:
      return docPanel(
        'Project shape',
        paragraph(
          'Keep the build narrow. The goal is to finish one clean feature, test it, and then move to the next change.'
        )
      );
  }
};

const featureBuildSteps = (featureNumber: number, track: 'sql' | 'json'): string[] => {
  switch (featureNumber) {
    case 1:
      return [
        'Create the project root files and folders in the exact order agreed with the class.',
        `Make the storage layer visible from the start by adding ${track === 'sql' ? '<code>schema.sql</code> and <code>init_db.py</code>' : 'a <code>data/</code> folder with the JSON files'}.`,
        'Open each file and leave a tiny placeholder so nothing is mysterious later.',
        'Check that everyone can explain which files run in the browser and which run on the server.'
      ];
    case 2:
      return [
        'Build the HTML boilerplate and page title first so the browser loads a clean document.',
        'Link Bootstrap correctly before adding your own interface regions.',
        'Add one main container, a heading, and a visible place where the main app will live.',
        'Run the page and confirm the structure loads before you add any dynamic behaviour.'
      ];
    case 3:
      return [
        'Add a dedicated render target for the task list inside the main page shell.',
        'Give that target a stable <code>id</code> that JavaScript can look up later.',
        'Decide what the empty state should say before any tasks exist.',
        'Make sure the list area and the modal area are not mixed together.'
      ];
    case 4:
      return [
        'Place the Add Task trigger where the user would naturally expect to find it.',
        'Add the Bootstrap modal structure with header, body, and footer regions.',
        'Include a safe close action as well as the main action button.',
        'Open and close the modal in the browser before you place any real inputs into it.'
      ];
    case 5:
      return [
        'Add the four agreed controls: title, assignee, priority, and due date.',
        'Choose the control type deliberately so each field guides good data entry.',
        'Use labels and <code>required</code> rules where they make sense for usability.',
        `Match every input to a future ${track === 'sql' ? 'database field' : 'JSON property'} before you move on.`
      ];
    case 6:
      return [
        `Create a backend GET route that reads ${track === 'sql' ? 'stored records' : 'the JSON document'} and returns JSON to the browser.`,
        'Write one JavaScript load function that fetches that data.',
        'Clear the render area before drawing the fresh list.',
        'Render each returned record into a readable row and keep a sensible empty state.'
      ];
    case 7:
      return [
        'Read the current form values from the modal controls.',
        'Build a payload object and send it with a POST request.',
        `Validate and store the new record in ${track === 'sql' ? 'the database' : 'the JSON file'} on the backend.`,
        'Refresh the task list so the create action produces visible evidence immediately.'
      ];
    case 8:
      return [
        'Attach a delete control to every rendered row.',
        'Pass the record identifier, not the title text, into the delete request.',
        `Remove the chosen record safely from ${track === 'sql' ? 'storage' : 'the JSON structure'}.`,
        'Refresh the list and confirm the correct item disappeared.'
      ];
    case 9:
      return [
        'Add a completion control to each task row.',
        'Send an update request that carries the identifier of the chosen record.',
        `Change the stored status in ${track === 'sql' ? 'the database' : 'the JSON file'} rather than faking it in the DOM.`,
        'Redraw the list so completed work looks visibly different after the update.'
      ];
    case 10:
      return [
        'Add only the filter and sort controls the original brief genuinely needs.',
        'Read the chosen values and package them into one request.',
        `Apply the filtering or ordering rules in ${track === 'sql' ? 'the backend query' : 'the backend document-processing logic'}.`,
        'Give the user a predictable result and a clear way to change or reset the controls.'
      ];
    default:
      return [
        'Open the test table and work through the project feature by feature.',
        'Record the actual result you observed, not the result you hoped for.',
        'Judge each test row as pass or fail with evidence.',
        'Finish with one honest limitation or improvement note for the app.'
      ];
  }
};

const featureDocs = (featureNumber: number, track: 'sql' | 'json'): string => {
  switch (featureNumber) {
    case 1:
      return docGrid(
        docPanel(
          'Why this feature matters',
          paragraph(
            'Students who can explain the folder split usually debug faster later because they know where a problem probably lives.'
          )
        ),
        docPanel(
          'Names to keep straight',
          unordered([
            '<strong>template</strong>: HTML rendered for the browser',
            '<strong>static file</strong>: browser asset such as JavaScript or CSS',
            '<strong>entry point</strong>: the file that starts the application'
          ])
        )
      );
    case 2:
      return docGrid(
        docPanel(
          'HTML tags you will use',
          unordered([
            '<code>&lt;head&gt;</code> stores document metadata and linked assets.',
            '<code>&lt;body&gt;</code> holds the visible page content.',
            '<code>&lt;main&gt;</code> marks the main content region.',
            '<code>&lt;script&gt;</code> loads JavaScript after the page structure exists.'
          ])
        ),
        featurePreview(featureNumber, track)
      );
    case 3:
      return docGrid(
        docPanel(
          'JavaScript words to know',
          unordered([
            '<code>const</code> creates a variable that should not be reassigned.',
            '<code>getElementById()</code> finds a single named DOM node.',
            '<code>innerHTML</code> swaps out what appears inside the target element.'
          ])
        ),
        featurePreview(featureNumber, track)
      );
    case 4:
      return docGrid(
        docPanel(
          'Bootstrap modal words',
          unordered([
            '<code>data-bs-toggle</code> switches on component behaviour.',
            '<code>data-bs-target</code> points at the modal to open.',
            '<code>modal-header</code>, <code>modal-body</code>, and <code>modal-footer</code> create a predictable layout.'
          ])
        ),
        featurePreview(featureNumber, track)
      );
    case 5:
      return docGrid(
        docPanel(
          'Validation principle',
          paragraph(
            'A good user interface catches mistakes early, but the browser is not a security boundary. A curl command or custom request can skip UI checks completely.'
          ) +
            unordered([
              'Use HTML validation for immediate user feedback.',
              'Use JavaScript to improve clarity before the request is sent.',
              `Use ${track === 'sql' ? 'Flask and SQL' : 'Flask and JSON-write rules'} to enforce the real data rules.`
            ])
        ),
        featurePreview(featureNumber, track)
      );
    case 6:
      return docGrid(
        docPanel(
          'Backend terms to notice',
          unordered([
            '<code>@app.route()</code> tells Flask which URL a function responds to.',
            '<code>methods=["GET"]</code> says the route is for reading data.',
            '<code>jsonify()</code> returns structured JSON to the browser.'
          ])
        ),
        featurePreview(featureNumber, track)
      );
    case 7:
      return docGrid(
        docPanel(
          'POST request terms',
          unordered([
            '<code>request.get_json()</code> reads the JSON body Flask received.',
            '<code>Content-Type: application/json</code> tells the server how to interpret the body.',
            'After a create action, the UI should prove success by reloading the list.'
          ])
        ),
        featurePreview(featureNumber, track)
      );
    case 8:
      return docGrid(
        docPanel(
          'Delete design habit',
          paragraph(
            'Destructive actions should always be tied to a stable identifier. If two tasks have the same title, the title is not safe enough to delete by.'
          )
        ),
        featurePreview(featureNumber, track)
      );
    case 9:
      return docGrid(
        docPanel(
          'State-change habit',
          unordered([
            'A style change in the DOM is not enough.',
            'The backend must store the new status.',
            'Refreshing the page is the simplest proof that the update persisted.'
          ])
        ),
        featurePreview(featureNumber, track)
      );
    case 10:
      return docGrid(
        docPanel(
          'Query-string terms',
          unordered([
            '<code>?</code> starts the query string.',
            '<code>&amp;</code> separates multiple parameters.',
            '<code>URLSearchParams</code> helps build clean filter requests without manual string mistakes.'
          ])
        ),
        featurePreview(featureNumber, track)
      );
    default:
      return docGrid(
        docPanel(
          'How to treat the test table',
          unordered([
            'One row should answer one question about the app.',
            'Expected results must be observable.',
            'A failed test is useful because it tells you what to repair next.'
          ])
        ),
        featurePreview(featureNumber, track)
      );
  }
};

const featureValidation = (featureNumber: number, track: 'sql' | 'json'): string => {
  if (![5, 7, 8, 9, 10].includes(featureNumber)) {
    return '';
  }

  const storageLabel = track === 'sql' ? 'SQL / SQLite' : 'JSON write step';

  return validationFlowBlock('Where the checks happen', [
    ['HTML', 'The interface can require fields, constrain control types, and guide the user before submit.'],
    ['JavaScript', 'The browser can check presence, shape, and request timing before sending data.'],
    ['Flask', 'The backend must re-check the request because outside tools can bypass the browser entirely.'],
    [storageLabel, track === 'sql' ? 'Database rules keep the stored record sensible and consistent.' : 'The document write logic must reject or repair bad structures before saving.']
  ]);
};

const sqlFeatureContext = (referenceIndex: number): string => {
  const map: Record<number, { brief: string[]; reuse: string[] }> = {
    2: {
      brief: [
        'The client asked for a simple internal system. A clean page shell keeps the interface readable for non-technical staff.',
        'A stable layout is the base for later success criteria such as easy task viewing and reliable task creation.'
      ],
      reuse: [
        'Return to the task-list wireframe and make sure the page regions match what you planned.',
        'Use your success criteria list to decide what must be visible on version one of the page.'
      ]
    },
    3: {
      brief: [
        'Managers need a clear place to see current work. The list area is where that promise becomes visible.',
        'An empty state matters because the system should still make sense before any real data exists.'
      ],
      reuse: [
        'Check your planning documents to see where the task list was placed.',
        'Check the test plan: one early test should prove the page loads sensibly with no tasks.'
      ]
    },
    4: {
      brief: [
        'The client wants easy task creation without cluttering the main screen.',
        'A modal keeps the list readable while still giving staff a focused place to enter data.'
      ],
      reuse: [
        'Use the add-task wireframe rather than inventing new controls.',
        'Check whether your planned modal regions still match the success criteria.'
      ]
    },
    5: {
      brief: [
        'The brief named title, assignee, due date, and priority as important task information.',
        'The form must collect exactly the data the database design expects.'
      ],
      reuse: [
        'Use your field mapping and table planner before adding any control.',
        'Ask which fields must be required to stop weak data entering the system.'
      ]
    },
    6: {
      brief: [
        'The client asked to retrieve and review work clearly. Reading and rendering tasks is where that starts to happen.',
        'This feature also prepares the assignee dropdown so task creation uses real stored data.'
      ],
      reuse: [
        'Use the test plan row for “view task list” as a check on what the page must display.',
        'Use the ERD to explain why the task route needs both task data and username data.'
      ]
    },
    7: {
      brief: [
        'The system must let staff create tasks reliably, not just see an empty interface.',
        'This feature turns the modal from a layout into a working client action.'
      ],
      reuse: [
        'Check the schema before you write the payload so the names match the stored fields.',
        'Use your validation notes to decide which checks happen in HTML, JavaScript, and Flask.'
      ]
    },
    8: {
      brief: [
        'The client wants one clear record of work. Deletion only works if the correct record is removed every time.',
        'This is a good place to reinforce why stable identifiers matter more than visible text.'
      ],
      reuse: [
        'Use the task list render from the previous feature so each row can carry the right id.',
        'Add a test case that proves only the intended task disappears.'
      ]
    },
    9: {
      brief: [
        'Managers need to see whether work has been completed. This feature makes that status change real.',
        'A visible completed state must match stored data, not just temporary styling.'
      ],
      reuse: [
        'Return to the success criteria about reliable status changes.',
        'Update the test plan with a check that still passes after refresh.'
      ]
    },
    10: {
      brief: [
        'The brief specifically asked for retrieval by user, urgency, and due date.',
        'Filtering and sorting are only justified because the client already named those needs.'
      ],
      reuse: [
        'Use the original wireframe so you only add controls that were actually planned.',
        'Check the evaluation table and write tests for each filter and sort rule.'
      ]
    },
    11: {
      brief: [
        'This is where you prove the app meets the client brief rather than simply feeling finished.',
        'Evidence matters more than confidence.'
      ],
      reuse: [
        'Open the success criteria and test plan side by side.',
        'Make sure every major feature has observable proof, not just a vague claim.'
      ]
    }
  };

  const entry = map[referenceIndex];
  if (!entry) return '';

  return docGrid(
    docPanel('Why the client needs this', unordered(entry.brief)),
    docPanel('Bring this forward from earlier pages', unordered(entry.reuse))
  );
};

const sqlFeatureJourney = (referenceIndex: number): string => {
  switch (referenceIndex) {
    case 2:
      return buildJourney('Build it in this order', 'Work in one file only on this page. The goal is a clean browser shell, not a finished interface.', [
        {
          file: 'templates/index.html',
          title: 'Write the document skeleton first',
          body: [
            'Start with `<!DOCTYPE html>`, then add the `html`, `head`, and `body` tags in the correct nesting order.',
            'Put the document language and character set in place before you think about layout.',
            'Write a meaningful page title so the browser tab already reflects the client system.'
          ],
          prompts: [
            'Which tags are metadata and which tags are visible content?',
            'Why should the page load correctly before any task controls exist?'
          ]
        },
        {
          file: 'templates/index.html',
          title: 'Link Bootstrap and create the main page container',
          body: [
            'Add the Bootstrap stylesheet in the head and the Bootstrap bundle script at the end of the body.',
            'Create one main container for the app rather than scattering unrelated blocks across the page.',
            'Add the heading and the high-level space where the task system will live.'
          ],
          prompts: [
            'What does `container` control?',
            'What is the difference between padding inside an element and margin outside it?'
          ]
        },
        {
          file: 'Browser check',
          title: 'Run the page before moving on',
          body: [
            'Open the page and confirm there is no broken markup, no missing stylesheet link, and no accidental duplicate regions.',
            'If the page does not load cleanly now, later JavaScript work becomes harder to debug.'
          ]
        }
      ]);
    case 3:
      return buildJourney('Build it in this order', 'Keep the list region separate from the form. You are preparing a reliable target for later rendering.', [
        {
          file: 'templates/index.html',
          title: 'Add the task-list region inside the main page',
          body: [
            'Create one obvious container where tasks will later appear.',
            'Give that region a stable id so JavaScript can find it later.',
            'Keep it inside the main layout, not inside the modal.'
          ],
          prompts: [
            'What should the page show before the first task exists?',
            'Which id name will still make sense once the app grows?'
          ]
        },
        {
          file: 'templates/index.html',
          title: 'Decide on the empty state now',
          body: [
            'Write a short empty-state message that sounds helpful rather than broken.',
            'Make sure a user can still understand what the page is for before data exists.'
          ]
        },
        {
          file: 'static/js/app.js',
          title: 'Reserve the matching JavaScript target name',
          body: [
            'Record the exact id or selector you plan to use later in JavaScript.',
            'Do not write the full render logic yet; just make sure your naming is consistent.'
          ]
        }
      ]);
    case 4:
      return buildJourney('Build it in this order', 'The modal is just the shell on this page. Keep the structure clean so the inputs can drop in later without rework.', [
        {
          file: 'templates/index.html',
          title: 'Place the Add Task trigger in the obvious location',
          body: [
            'Add one primary button in the page shell where the user would expect the create action to live.',
            'Use Bootstrap button classes rather than hand-made styling.'
          ]
        },
        {
          file: 'templates/index.html',
          title: 'Write the Bootstrap modal structure',
          body: [
            'Add the outer modal wrapper, then the dialog, then the content region.',
            'Split the content into header, body, and footer so later form controls have a clean home.',
            'Add a dismiss control and a primary action button even before the real form exists.'
          ],
          prompts: [
            'Which part of the modal should hold the labels and controls later?',
            'Why is it useful to test open/close behaviour before the form is complete?'
          ]
        },
        {
          file: 'Browser check',
          title: 'Test the trigger and close actions',
          body: [
            'Open and close the modal several times.',
            'If the shell works now, later form and JavaScript issues are easier to isolate.'
          ]
        }
      ]);
    case 5:
      return buildJourney('Build it in this order', 'Every control on this page should exist because the brief or schema demanded it.', [
        {
          file: 'templates/index.html',
          title: 'Add the four agreed form controls',
          body: [
            'Create controls for title, assignee, priority, and due date.',
            'Use labels so each input explains itself to the user.',
            'Choose the control type deliberately: free text, select list, or date input.'
          ]
        },
        {
          file: 'templates/index.html',
          title: 'Name each control so JavaScript and storage can recognise it later',
          body: [
            'Use ids that match the meaning of the field, not random short names.',
            'Check those names against the field mapping and planned table structure.'
          ]
        },
        {
          file: 'templates/index.html',
          title: 'Apply the first validation layer',
          body: [
            'Use `required` where a blank value would create a weak or useless record.',
            'Remember that HTML validation is helpful but never the only protection.'
          ],
          prompts: [
            'Which field could realistically be optional?',
            'How would a curl request ignore the browser layer completely?'
          ]
        }
      ]);
    case 6:
      return buildJourney('Build it in this order', 'This is the first true full-stack page. Move one route at a time, then connect the browser code to it.', [
        {
          file: 'app.py',
          title: 'Write the simple read route first',
          body: [
            'Create the route that returns the user list before the more complex task route.',
            'Open a database connection, run the read query, close the connection, then return JSON.',
            'Make sure you can explain what `jsonify()` is doing.'
          ]
        },
        {
          file: 'app.py',
          title: 'Write the task-list route with the relationship in mind',
          body: [
            'Read the task data the client actually needs on screen.',
            'Use the database design to explain why usernames come from a related table rather than being repeated everywhere.',
            'Return a clean JSON shape that the browser can work with.'
          ],
          prompts: [
            'Why is this a good place for a `JOIN`?',
            'Which columns does the frontend actually need back?'
          ]
        },
        {
          file: 'static/js/app.js',
          title: 'Write one load function per dataset',
          body: [
            'Create one function to load users and another to load tasks.',
            'Use `fetch()`, then read the response as JSON, then pass the result into rendering logic.',
            'Keep the list-clearing and list-building code together so the page redraw stays predictable.'
          ]
        },
        {
          file: 'Browser check',
          title: 'Prove the read loop works',
          body: [
            'The assignee control should fill from stored data.',
            'The task list should either render records or show a sensible empty state.'
          ]
        }
      ]);
    case 7:
      return buildJourney('Build it in this order', 'A create feature is a chain: read values, package them, send them, store them, then redraw evidence on screen.', [
        {
          file: 'static/js/app.js',
          title: 'Read the current form values',
          body: [
            'Use the control ids you created earlier to read the latest modal values.',
            'Store those values in clearly named variables before building the request.'
          ]
        },
        {
          file: 'static/js/app.js',
          title: 'Build the payload and send the POST request',
          body: [
            'Create one JavaScript object that holds the submitted values.',
            'Send it as JSON with the correct HTTP method and headers.',
            'After the request succeeds, refresh the task list so the user sees evidence.'
          ]
        },
        {
          file: 'app.py',
          title: 'Receive the JSON and insert the new record',
          body: [
            'Read the request body in Flask.',
            'Validate the values again because the browser cannot be trusted on its own.',
            'Insert the new record into storage and return a clear success response.'
          ],
          prompts: [
            'Why do the backend checks still matter if the form already had `required`?',
            'How will you know whether the problem is in the payload or the insert?'
          ]
        }
      ]);
    case 8:
      return buildJourney('Build it in this order', 'Delete must target one specific record. Treat it as an identifier lesson, not a button lesson.', [
        {
          file: 'static/js/app.js',
          title: 'Attach delete controls to rendered rows',
          body: [
            'Make sure each delete action is linked to the task identifier, not the title text.',
            'Pass that identifier into the delete request.'
          ]
        },
        {
          file: 'app.py',
          title: 'Write the delete route',
          body: [
            'Receive the task id from the URL path.',
            'Delete by identifier so duplicate titles cannot remove the wrong record.',
            'Return a response the browser can use to trigger a redraw.'
          ]
        },
        {
          file: 'Browser check',
          title: 'Test a deliberate removal',
          body: [
            'Delete one known task and confirm the correct row disappears.',
            'Refresh and prove the stored data matches what the screen now shows.'
          ]
        }
      ]);
    case 9:
      return buildJourney('Build it in this order', 'The completed state should be visible and persistent. If either part is missing, the feature is unfinished.', [
        {
          file: 'static/js/app.js',
          title: 'Attach the completion action to each task row',
          body: [
            'Give every row a control that targets the correct task id.',
            'Send an update request rather than faking the status in the DOM.'
          ]
        },
        {
          file: 'app.py',
          title: 'Update the stored status',
          body: [
            'Receive the identifier and change only the intended record.',
            'Persist the new status value in storage.'
          ]
        },
        {
          file: 'Browser check',
          title: 'Redraw the list and prove persistence',
          body: [
            'Make the completed state easy to spot on screen.',
            'Refresh and confirm the state survives because storage changed, not because of temporary styling.'
          ]
        }
      ]);
    case 10:
      return buildJourney('Build it in this order', 'Only add retrieval controls that the original brief justified. This page is about useful retrieval, not feature creep.', [
        {
          file: 'templates/index.html',
          title: 'Add the planned filter and sort controls',
          body: [
            'Use the original wireframe and success criteria to decide which controls belong on the page.',
            'Keep the toolbar readable rather than adding every possible option.'
          ]
        },
        {
          file: 'static/js/app.js',
          title: 'Read the selected values and build the request',
          body: [
            'Package the current filter and sort choices into one clear request.',
            'Use query-string tools rather than hand-built URL mistakes.'
          ]
        },
        {
          file: 'app.py',
          title: 'Apply the retrieval rules on the backend',
          body: [
            'Translate the chosen values into predictable filtering and ordering rules.',
            'Return only the records that match the current request.'
          ],
          prompts: [
            'Why is the backend the reliable place for the final filtering rule?',
            'What test case would prove due-date sorting is correct?'
          ]
        }
      ]);
    case 11:
      return buildJourney('Work through the evidence carefully', 'This page is about proof. Put the brief, the test plan, and the working system together.', [
        {
          file: 'Test plan',
          title: 'Turn each criterion into an observed result',
          body: [
            'Run the feature, record the actual result, and decide pass or fail from evidence.',
            'Do not write “works” without showing what actually happened.'
          ]
        },
        {
          file: 'Project app',
          title: 'Capture evidence from the real build',
          body: [
            'Use the working system to prove create, delete, update, and retrieval behaviours.',
            'Notice where the app still feels weak or unfinished.'
          ]
        },
        {
          file: 'Evaluation notes',
          title: 'Finish with one honest improvement point',
          body: [
            'A real evaluation includes a limitation, not just celebration.',
            'Tie that improvement back to the client brief or the testing evidence.'
          ]
        }
      ]);
    default:
      return '';
  }
};

const featureStep = (options: {
  slug: string;
  stageId: string;
  featureNumber: number;
  navLabel: string;
  intro: string;
  concept: string;
  snippetTitle: string;
  snippetCode: string;
  files: Array<[string, string, string]>;
  buildChecklist: string[];
  prompts: string[];
  deliverable: string;
  track?: 'sql' | 'json';
  referenceIndex?: number;
  featureTotal?: number;
  extraSectionsHtml?: string;
  buildJourneyHtml?: string;
}): ProjectStep => {
  const track = options.track || 'sql';
  const referenceIndex = options.referenceIndex || options.featureNumber;
  const featureTotal = options.featureTotal || 10;
  const boilerplate = featureBoilerplate(referenceIndex, track);

  return {
  slug: options.slug,
  stageId: options.stageId,
  title: `Feature ${options.featureNumber}: ${options.navLabel}`,
  navLabel: `Feature ${options.featureNumber}: ${options.navLabel}`,
  intro: options.intro,
  sidebarSummary: options.concept,
  headerNote: `Build only this feature on this page. Get it working, test it, and then move on.`,
  paceLabel: `Feature ${options.featureNumber} of ${featureTotal}`,
  deliverable: options.deliverable,
  learningGoals: [
    `Understand what ${options.navLabel.toLowerCase()} adds to the system`,
    'Identify the files involved and the role of each one',
    'Use the generic references without turning them into a copy-paste solution'
  ],
  contentHtml:
    section(
      'What you are building',
      paragraph(
        options.intro,
        `The key idea for this feature is <strong>${options.concept}</strong>. Before you write anything, make sure you can describe what the user should see or what the request should do when this feature is finished.`
      ),
      'lead'
    ) +
    keywordTable(featureVocabulary[referenceIndex] || []) +
    (options.extraSectionsHtml || '') +
    featureDocs(referenceIndex, track) +
    callout('How this feature moves through the stack', flowStrip(), 'soft') +
    section(
      'Useful reference before you code',
      unordered(getFeatureReferences(referenceIndex, track), 'ib-project-reference-list'),
      'reference'
    ) +
    docGrid(
      docCode(
        boilerplate.title,
        boilerplate.code,
        featureSnippetLanguage[referenceIndex] || 'text',
        boilerplate.notes
      ),
      options.buildJourneyHtml ||
        taskBox(
          'Build this now',
          `Use the reference code above to understand the syntax and shape. Then write the real project version yourself in the codebase.`,
          featureBuildSteps(referenceIndex, track),
          options.prompts
        )
    ) +
    featureValidation(referenceIndex, track) +
    section(
      'Where your work goes',
      dataTable(
        ['File or area', 'Why this file matters', 'What belongs in this feature'],
        options.files.map((row) => row as string[])
      ),
      'table'
    ) +
    completionBlock(options.buildChecklist, 'When this feature is ready to sign off')
  };
};

const jsonFeatureStep = (options: {
  slug: string;
  stageId: string;
  featureNumber: number;
  navLabel: string;
  intro: string;
  concept: string;
  snippetTitle: string;
  snippetCode: string;
  files: Array<[string, string, string]>;
  buildChecklist: string[];
  prompts: string[];
  deliverable: string;
}): ProjectStep =>
  featureStep({
    ...options,
    intro: `${options.intro} You are rebuilding the same feature with JSON storage, so keep the user experience aligned while the persistence model changes.`,
    track: 'json'
  });

const sqlStages: ProjectStage[] = [
  {
    id: 'sql-stage-1',
    label: 'Stage 1',
    title: 'Problem Specification',
    summary: 'Read the client problem as a real brief and turn it into a set of success criteria.'
  },
  {
    id: 'sql-stage-2',
    label: 'Stage 2',
    title: 'Planning and Database Design',
    summary: 'Move from interface planning into tables, fields, normalisation, relationships, and testing.'
  },
  {
    id: 'sql-stage-3',
    label: 'Stage 3',
    title: 'Build Foundations',
    summary: 'Set up the stack, learn the syntax families, and write schema.sql and init_db.py before the live features begin.'
  },
  {
    id: 'sql-stage-4',
    label: 'Stage 4',
    title: 'Feature Build Sequence',
    summary: 'Implement the project in a strict feature order, one controlled change at a time.'
  },
  {
    id: 'sql-stage-5',
    label: 'Stage 5',
    title: 'Non-Standard Algorithm',
    summary: 'Design the tagging logic in plain English before you attempt any code.'
  },
  {
    id: 'sql-stage-6',
    label: 'Stage 6',
    title: 'Database Extension',
    summary: 'Extend the data model for many-to-many tagging and verify that the design still holds.'
  }
];

const sqlSteps: ProjectStep[] = [
  {
    slug: '',
    stageId: 'sql-stage-1',
    title: 'Client Problem Specification',
    navLabel: 'Problem specification',
    intro: 'Start with the client voice. This first page should feel like a real brief that has landed on your desk before any technical planning begins.',
    sidebarSummary: 'Client document, system need, constraints, and first success criteria.',
    headerNote: 'Read this page like a project analyst. You are not solving it yet; you are understanding what must be solved.',
    paceLabel: 'Opening brief',
    deliverable: 'Draft success criteria list',
    learningGoals: [
      'Identify the client problem in plain language',
      'Separate objectives, constraints, inputs, and outputs',
      'Draft measurable criteria that could later be tested'
    ],
    contentHtml:
      memo(
        'Operations request: task tracking system',
        `
          <p><strong>From:</strong> Maya Patel, Operations Lead, Northbridge Studio</p>
          <p><strong>To:</strong> Student development team</p>
          <p><strong>Subject:</strong> Request for a clearer internal task system</p>
          <p>We currently manage daily work using a mixture of spreadsheets, message threads, and verbal updates. This means tasks are often duplicated, assigned informally, or forgotten entirely when staff change shift. Managers have no quick way to see which tasks are overdue, who is responsible for them, or whether priority work has been completed.</p>
          <p>We would like a small internal web application that allows us to create tasks, assign them to staff, give them a deadline, set a priority, and mark them as completed. The system should be simple enough for non-technical staff to use without training, but clear enough that managers can trust it as the main record of work in progress.</p>
          <p>Because this system will become our main source of task information, we need reliable data entry, clear status changes, and easy retrieval of tasks by user, urgency, and due date. The application does not need to be public-facing and does not need complex user accounts for this first version.</p>
        `
      ) +
      keywordTable([
        ['Problem statement', 'The operational issue the client needs solved.'],
        ['Constraint', 'A limit or condition the system must respect.'],
        ['Input', 'Data the user enters into the system.'],
        ['Output', 'Information the system must show back to the user.']
      ]) +
      referenceList('What this brief tells us', [
        'The client wants one internal system instead of spreadsheets, messages, and verbal updates.',
        'Version one is about reliable task tracking, not complex accounts or public access.',
        'The app must support creation, status updates, filtering, and clear overview of work in progress.'
      ]) +
      section(
        'Problem specification map',
        dataTable(
          ['Section', 'What must be understood from the brief'],
          [
            ['Problem statement', 'Tasks are currently hard to track, assign, and review accurately.'],
            ['Inputs', 'Task title, assignee, due date, priority, and later completion or update actions.'],
            ['Outputs', 'A visible task list, clear status, filter results, and due-date awareness.'],
            ['Evaluation criteria', 'The system must be simple to use, reliable, and easy to check against measurable tests.'],
            ['Constraints', 'Keep the system small, internal, and realistic enough to test fully in class.']
          ]
        ),
        'table'
      ) +
      completionBlock([
        'The class can state the problem, constraints, inputs, outputs, and evaluation needs in plain language.',
        'A first draft of six to ten measurable success criteria exists before planning begins.',
        'Everyone understands which features belong in version one and which stay out of scope for now.'
      ], 'What should be clear before planning starts')
  },
  {
    slug: 'planning-documents',
    stageId: 'sql-stage-2',
    title: 'Planning Documents and Wireframes',
    navLabel: 'Planning documents',
    intro: 'Turn the brief into a visible plan before you touch tables or code. Decide what the user needs to see and use in version one.',
    sidebarSummary: 'Wireframes, screen planning, field mapping, and planning decisions.',
    deliverable: 'Annotated wireframes',
    learningGoals: [
      'Read wireframes as design decisions rather than decoration',
      'Map inputs and outputs from the brief onto a screen layout',
      'Decide what needs to appear on the first version of the interface'
    ],
    contentHtml:
      section(
        'Start seeing the app before you build it',
        paragraph(
          'Use the wireframes to decide what belongs on screen, what belongs in the modal, and what can wait until later.',
          'You are not decorating the app here. You are deciding what the first version must let the user see, click, and type.'
        ),
        'lead'
      ) +
      keywordTable([
        ['Wireframe', 'A simple planning sketch of the interface.'],
        ['Modal', 'A temporary form area used for focused input.'],
        ['Filter', 'A control that narrows which tasks are shown.'],
        ['Field mapping', 'Matching a screen control to a stored data value.']
      ]) +
      section('Wireframes', wireframeMarkup, 'diagram') +
      split(
        section(
          'Planning notes',
          unordered([
            'Decide where the user sees all current tasks.',
            'Separate always-visible controls from controls that belong inside the add-task modal.',
            'Agree how completed work will look different from active work.',
            'Keep only the filters the brief can justify in version one.'
          ]),
          'reference'
        ),
        section(
          'Field mapping from the brief',
          dataTable(
            ['Field', 'Why it exists', 'Where it appears'],
            [
              ['Title', 'Identifies the work item', 'Task card and add-task form'],
              ['Assignee', 'Shows responsibility', 'Task card, filter, add-task form'],
              ['Due date', 'Supports urgency and planning', 'Task card, sort/filter, add-task form'],
              ['Priority', 'Distinguishes critical tasks', 'Task card, filter, add-task form'],
              ['Status', 'Shows whether work is done', 'Task card and update action']
            ]
          ),
          'table'
        )
      ) +
      completionBlock([
        'The class has agreed which controls belong on the main page and which belong in the modal.',
        'Every visible input in the wireframe maps to an identifiable data field.',
        'The first version of the interface is clear enough to support database design.'
      ], 'What should be agreed before database design')
  },
  {
    slug: 'normalisation-workshop',
    stageId: 'sql-stage-2',
    title: 'Normalisation and Data Thinking',
    navLabel: 'Normalisation workshop',
    intro: 'Start with messy task data and improve it. This is where you see why relational database design exists in the first place.',
    sidebarSummary: 'Raw task data, 1NF, 2NF, 3NF, and field decisions.',
    deliverable: 'Normalized field plan',
    learningGoals: [
      'Identify repeating groups and non-atomic values',
      'Explain 1NF, 2NF, and 3NF using your own task system',
      'Separate entity ideas before building the tables'
    ],
    contentHtml:
      section(
        'Start with the messy version',
        dataTable(
          ['Task ID', 'Task title', 'Assigned staff', 'Priority', 'Due date', 'Tags'],
          [
            ['1', 'Prepare Monday report', 'Aisha, Marcus', 'High', '2026-03-18', 'report, weekly, finance'],
            ['2', 'Order toner', 'Marcus', 'Low', '2026-03-20', 'supplies, office'],
            ['3', 'Update noticeboard', 'Aisha', 'Medium', '2026-03-19', 'office, communication']
          ]
        ) +
          paragraph(
            'This draft looks convenient, but it hides several design problems. Multi-value cells, repeated text, and future extension issues all appear immediately.'
        ),
        'table'
      ) +
      keywordTable([
        ['Table', 'A named collection of related records.'],
        ['Field', 'One attribute stored for each record.'],
        ['Primary key', 'The field that uniquely identifies one record.'],
        ['Foreign key', 'A field that links one table to another.'],
        ['1NF / 2NF / 3NF', 'Stages of reducing repetition and dependency problems.']
      ]) +
      split(
        section(
          'Normalisation reference',
          unordered([
            '<strong>1NF:</strong> every field should hold one atomic value.',
            '<strong>2NF:</strong> non-key fields should depend on the whole key.',
            '<strong>3NF:</strong> non-key fields should not depend on other non-key fields.'
          ]),
          'reference'
        ),
        section(
          'What this means for the task system',
          unordered([
            'A list of multiple staff in one cell is a warning sign.',
            'Assignee information and task information should be considered separately.',
            'Planning for future tags now shows why repeated values become a design problem.'
          ]),
          'default'
        )
      ) +
      completionBlock([
        'The class can explain why repeated groups and multi-value cells cause problems.',
        'Core entities for version one have been separated before table building begins.',
        'Everyone can justify why tags are not part of the first SQL model yet.'
      ], 'What should be settled before table design')
  },
  {
    slug: 'table-planner',
    stageId: 'sql-stage-2',
    title: 'Table Planner: Fields, Types, and Example Data',
    navLabel: 'Table planner',
    intro: 'Sketch the actual tables now. Name the fields, choose the data types, and test your ideas with realistic example values.',
    sidebarSummary: 'Interactive table builder for fields, data types, keys, and example values.',
    deliverable: 'Draft table set with field definitions',
    learningGoals: [
      'Choose sensible field names and types',
      'Identify primary keys and candidate foreign keys',
      'Test your thinking with realistic example data'
    ],
    scripts: ['/js/ib-erd-builder.js'],
    contentHtml:
      section(
        'Build your first proper table draft',
        paragraph(
          'This is where the database stops being abstract and starts becoming real. Name fields carefully, choose sensible data types, and check your ideas with example values before you move into the ERD.',
          'You are aiming for a reviewable draft, not instant perfection. If the class can explain each field aloud, the page is doing its job.'
        ),
        'lead'
      ) +
      keywordTable([
        ['Data type', 'The kind of value a field is meant to store.'],
        ['Primary key', 'The unique identifier for a table.'],
        ['Candidate foreign key', 'A field likely to link to another table later.'],
        ['Example value', 'A realistic sample used to test whether the field definition makes sense.']
      ]) +
      split(
        section(
          'Field-naming habits that help later',
          unordered([
            'Use integer-like types for identifiers.',
            'Use date types for deadlines rather than plain text.',
            'Use boolean-style values only when the state is truly yes/no.',
            'Avoid vague “misc” fields that collect unrelated data.'
          ]),
          'reference'
        ),
        section(
          'What a strong draft should show',
          unordered([
            'Every table has a clear primary key.',
            'Field names are short, specific, and consistent.',
            'Example values make the meaning of each field obvious.',
            'The draft still reflects version one, not future extras.'
          ]),
          'default'
        )
      ) +
      section('Interactive table planner', builderMarkup('tables'), 'workspace')
  },
  {
    slug: 'erd-studio',
    stageId: 'sql-stage-2',
    title: 'ERD Studio: Relationships and Structure',
    navLabel: 'ERD studio',
    intro: 'Use the tables you planned on the previous page and connect them with clear relationships. This is where the schema becomes a system rather than a list of columns.',
    sidebarSummary: 'Interactive ERD builder with relationship mapping and diagram output.',
    deliverable: 'Working ERD draft',
    learningGoals: [
      'Explain one-to-one, one-to-many, and many-to-many relationships',
      'Connect foreign keys to the correct target fields',
      'Read the diagram as a set of business rules'
    ],
    scripts: ['/js/ib-erd-builder.js'],
    contentHtml:
      section(
        'Turn separate tables into one model',
        paragraph(
          'The ERD is where the class proves the tables actually belong together. Every line on the diagram should match a relationship you could explain as a sentence about the client system.',
          'If a relationship cannot be justified from the brief, it probably does not belong in version one.'
        ),
        'lead'
      ) +
      keywordTable([
        ['One-to-one', 'One record in a table links to one record in another.'],
        ['One-to-many', 'One parent record can link to many child records.'],
        ['Many-to-many', 'Both sides can link to multiple records, so a linking table is needed.'],
        ['Referential integrity', 'Linked records remain valid and consistent.']
      ]) +
      referenceList('Relationship rules', [
        'A foreign key should point to a real parent key you can identify clearly.',
        'If you cannot express the relationship as a sentence, the ERD is not ready yet.',
        'The original SQL model should include only the core entities. Tagging comes later.'
      ]) +
      section('Interactive ERD builder', builderMarkup('erd'), 'workspace') +
      completionBlock([
        'Every foreign key in the draft can be explained as a clear relationship sentence.',
        'The class can identify which relationships are currently one-to-many and where many-to-many will appear later.',
        'The ERD is clear enough to redraw without relying on the builder.'
      ], 'What should be true before the test table and implementation phase')
  },
  {
    slug: 'test-plan',
    stageId: 'sql-stage-2',
    title: 'Test Plan and Evaluation Table',
    navLabel: 'Test plan',
    intro: 'Testing begins before implementation. Build the table now so every later feature has a place in the final evaluation.',
    sidebarSummary: 'Create a project test table before coding begins.',
    deliverable: 'Initial project test plan',
    learningGoals: [
      'Turn success criteria into measurable tests',
      'Distinguish setup, expected result, and actual result',
      'Plan for normal, boundary, and invalid cases'
    ],
    scripts: ['/js/ib-test-plan-builder.js'],
    contentHtml:
      section(
        'Write the tests before the code',
        paragraph(
          'Create the test table now so every important behaviour has somewhere to land once the app is working.',
          'A good test row should read like a clear promise about what the final system must do.'
        ),
        'lead'
      ) +
      keywordTable([
        ['Test case', 'One measurable check of system behaviour.'],
        ['Expected output', 'What should happen if the system works correctly.'],
        ['Actual output', 'What really happened during the test.'],
        ['Pass / Fail', 'The final judgement based on evidence, not assumption.']
      ]) +
      section(
        'What a strong test row looks like',
        dataTable(
          ['Weak version', 'Better version'],
          [
            ['“Check add task works.”', '“Submit a valid task and confirm it appears in the list after refresh.”'],
            ['“Try invalid data.”', '“Leave the title blank and confirm the system refuses submission.”'],
            ['“Filtering okay.”', '“Select one assignee and confirm only that user’s tasks remain visible.”']
          ]
        ),
        'table'
      ) +
      referenceList('Test coverage to include', [
        'Normal use cases',
        'Boundary cases',
        'Invalid input',
        'Update and delete actions',
        'Usability or clarity checks'
      ]) +
      section('Interactive test table', testPlanBuilderMarkup, 'workspace')
  },
  {
    slug: 'implementation-foundations',
    stageId: 'sql-stage-3',
    title: 'Build Foundations and Project Map',
    navLabel: 'Implementation foundations',
    intro: 'Before you code anything, build a mental map of the stack. This is the page that explains how the client brief becomes HTML, JavaScript, Flask, and SQL.',
    sidebarSummary: 'Project map, technology roles, client criteria links, and real build order.',
    deliverable: 'Annotated project structure',
    learningGoals: [
      'Explain the role of HTML, JavaScript, Flask, and SQL in the project',
      'Understand why the build order starts with planning, schema, and setup before the live features',
      'Read the full-stack request flow in sequence'
    ],
    contentHtml:
      section(
        'How this project grows from the client brief',
        paragraph(
          'You are not building “a Flask app” in the abstract. You are building a solution to a client problem: track tasks clearly, assign responsibility, store reliable dates and priorities, and make status easy to review.',
          'That means the build order matters. Plan the interface, design the database, create the database, and only then start live features in the web app.'
        ),
        'lead'
      ) +
      docGrid(
        docPanel(
          'What success criteria this build has to support',
          unordered([
            'Staff can create tasks with the agreed data fields.',
            'Managers can see current work and whether it is complete.',
            'Tasks can be retrieved by user, urgency, and due date.',
            'The system is simple enough for non-technical users to trust.'
          ])
        ),
        docPanel(
          'Why the build order looks like this',
          unordered([
            'The schema has to exist before the app can read from a database.',
            'The page structure has to exist before JavaScript can target it.',
            'The test plan starts early so every later feature has evidence.'
          ])
        )
      ) +
      keywordTable([
        ['Template', 'An HTML page rendered for the browser.'],
        ['Static JavaScript', 'Client-side code that runs in the browser.'],
        ['Route', 'A backend endpoint that handles a request.'],
        ['Request cycle', 'The path from browser action to stored response and back again.'],
        ['Schema', 'The SQL definition of the tables and relationships.']
      ]) +
      section(
        'Directory structure and responsibilities',
        dataTable(
          ['Area', 'What lives here', 'Why it is separated'],
          [
            ['templates/', 'HTML files rendered for the browser', 'Keeps structure separate from behavior and storage'],
            ['static/js/', 'Client-side JavaScript', 'Handles user interaction and requests from the browser'],
            ['app.py', 'Flask routes and application logic', 'Receives requests and coordinates responses'],
            ['schema.sql / init_db.py', 'Database setup', 'Separates data structure from runtime UI code']
          ]
        ),
        'table'
      ) +
      referenceList('Technology roles in plain English', [
        '<strong>HTML</strong> decides what the user can see and interact with.',
        '<strong>JavaScript</strong> reacts to clicks, forms, and requests in the browser.',
        '<strong>Flask</strong> listens for requests and decides what happens next.',
        '<strong>SQL</strong> stores and retrieves structured records.'
      ]) +
      callout('System flow', flowStrip(['Client brief', 'Planning', 'HTML', 'JavaScript', 'Flask', 'SQL', 'Evidence']), 'soft') +
      codeBlock(
        'Generic structure sketch',
        `project/\n  app.py\n  schema.sql\n  templates/\n    index.html\n  static/\n    js/\n      app.js`,
        'text'
      ) +
      buildJourney('Work through Stage 3 in this order', 'These pages are the setup run before the live features start.', [
        {
          file: 'Project root',
          title: 'Create the project folders and empty files',
          body: [
            'Make the folders visible first so you know which work belongs in which file.',
            'Do not start writing routes and HTML in the same place.'
          ]
        },
        {
          file: 'HTML / Bootstrap toolkit',
          title: 'Learn the page-building vocabulary',
          body: [
            'Get clear on the HTML tags and Bootstrap classes before the first feature page.',
            'You should be able to explain `div`, `main`, `class`, `id`, `container`, margin, and padding.'
          ]
        },
        {
          file: 'schema.sql then init_db.py',
          title: 'Write the database setup before the live web features',
          body: [
            'The schema defines what can be stored.',
            'The setup script creates the database file and inserts seed users.'
          ]
        }
      ]) +
      completionBlock([
        'The class can explain the role of each major folder and file.',
        'Everyone can describe the request cycle from browser action to database response.',
        'The separation between interface, behaviour, backend logic, and storage is understood before feature work starts.'
      ], 'What should be secure before the live feature pages')
  },
  {
    slug: 'html-bootstrap-toolkit',
    stageId: 'sql-stage-3',
    title: 'HTML and Bootstrap Toolkit',
    navLabel: 'HTML and Bootstrap toolkit',
    intro: 'Use this page like a beginner-friendly docs sheet. It introduces the tags, classes, spacing rules, and layout ideas that the feature pages expect you to recognise.',
    sidebarSummary: 'HTML tags, class vs id, Bootstrap layout, and box-model visuals.',
    deliverable: 'Annotated HTML / Bootstrap notes',
    learningGoals: [
      'Recognise the HTML tags used in the project shell',
      'Understand what classes and ids do',
      'Read Bootstrap spacing and layout classes with confidence'
    ],
    contentHtml:
      section(
        'Learn the page-building vocabulary first',
        paragraph(
          'This is the point where you stop seeing HTML as a wall of angle brackets and start reading it as a set of clear structural decisions.',
          'You are not trying to memorise the whole web platform. You are learning the small set of tags and Bootstrap classes that this project genuinely needs.'
        ),
        'lead'
      ) +
      docGrid(
        docTablePanel(
          'Core HTML tags you will meet in this project',
          ['Tag / attribute', 'What it does', 'How to think about it'],
          [
            ['<code>&lt;!DOCTYPE html&gt;</code>', 'Tells the browser to use modern HTML rules.', 'This belongs right at the top of the file.'],
            ['<code>&lt;html lang="en"&gt;</code>', 'Wraps the whole page and sets the document language.', 'Accessibility tools use this.'],
            ['<code>&lt;head&gt;</code>', 'Stores metadata and linked assets.', 'The user does not see this part directly.'],
            ['<code>&lt;body&gt;</code>', 'Holds the visible page content.', 'Everything the user sees sits somewhere inside it.'],
            ['<code>&lt;main&gt;</code>', 'Marks the main content region.', 'Use it for the central part of the app.'],
            ['<code>class</code>', 'Groups elements for styling or behaviour.', 'Many elements can share the same class.'],
            ['<code>id</code>', 'Names one specific element uniquely.', 'JavaScript often uses ids to find a single target.']
          ]
        ),
        docTablePanel(
          'Bootstrap classes you will use early',
          ['Class', 'What it does', 'What the letters mean'],
          [
            ['<code>container</code>', 'Keeps content within a readable page width.', 'Think of it as the main page wrapper.'],
            ['<code>py-5</code>', 'Adds padding on the y-axis.', '<code>p</code> = padding, <code>y</code> = top and bottom.'],
            ['<code>mb-4</code>', 'Adds margin below the element.', '<code>m</code> = margin, <code>b</code> = bottom.'],
            ['<code>btn btn-primary</code>', 'Styles an element as a primary action button.', 'Bootstrap ships the styling for you.'],
            ['<code>form-control</code>', 'Styles a text input.', 'Use it for consistent readable inputs.'],
            ['<code>form-select</code>', 'Styles a select element.', 'Use it for controlled choices like priority.']
          ]
        )
      ) +
      figureGrid(
        figurePanel(
          'Margin, padding, and content',
          'Read this before you start using spacing classes. Margin creates space outside the element. Padding creates space inside it.',
          boxModelFigure
        ),
        docPanel(
          'How to read a Bootstrap spacing class',
          unordered([
            '<code>m</code> means margin. <code>p</code> means padding.',
            '<code>t</code>, <code>b</code>, <code>x</code>, and <code>y</code> describe direction.',
            'The number is the size scale, not a number of pixels you memorise directly.',
            'A class like <code>py-5</code> means “add padding on top and bottom using size 5”.'
          ])
        )
      ) +
      docGrid(
        docCode(
          'Generic page shell',
          `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example App</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <main class="container py-5">
    <h1 class="mb-4">Example heading</h1>
  </main>
</body>
</html>`,
          'html',
          [
            ['head', 'Metadata, page title, and stylesheet links live here.'],
            ['main', 'This is the visible app region.'],
            ['container py-5', 'Readable width plus vertical padding.']
          ]
        ),
        buildJourney('Use this page before Feature 1', 'This is a docs page, not a feature page. Use it to prepare for the real build.', [
          {
            file: 'templates/index.html',
            title: 'Practise reading structure before writing project code',
            body: [
              'Point to each tag and say whether it is metadata, structure, or visible content.',
              'Explain what each Bootstrap class is changing on the page.'
            ]
          },
          {
            file: 'Planning notes',
            title: 'Link the code vocabulary back to the wireframe',
            body: [
              'Decide which parts of the wireframe will become headings, containers, buttons, and form regions.',
              'Keep the wireframe decisions in mind so the page structure is purposeful.'
            ]
          }
        ])
      ) +
      completionBlock([
        'You can explain `class` and `id` clearly.',
        'You can read a Bootstrap spacing class without guessing.',
        'You can identify which tags belong in the head and which belong in the visible page.'
      ], 'What should be secure before the first HTML feature')
  },
  {
    slug: 'sql-schema-build',
    stageId: 'sql-stage-3',
    title: 'Build the SQL Schema',
    navLabel: 'SQL schema build',
    intro: 'This is where the planned tables become real SQL. Use the table planner and ERD to decide what each table must store and what each constraint must protect.',
    sidebarSummary: 'SQL commands, constraints, table decisions, and the first real schema build.',
    deliverable: 'Working `schema.sql` draft',
    learningGoals: [
      'Write a table definition using SQL structure and constraint words',
      'Explain why `NOT NULL`, `AUTOINCREMENT`, and foreign keys exist',
      'Translate the ERD into real SQL tables'
    ],
    contentHtml:
      section(
        'Build the database the brief actually needs',
        paragraph(
          'At this point the client brief, field mapping, table planner, and ERD all come together. The schema should not be invented from scratch on this page; it should be the written version of decisions you already made.',
          'Keep the first version narrow: `users` and `tasks` first. The tagging extension comes later.'
        ),
        'lead'
      ) +
      docGrid(
        docTablePanel(
          'SQL words you need for this page',
          ['Command / keyword', 'What it does', 'How to use it here'],
          [
            ['<code>CREATE TABLE</code>', 'Starts a table definition.', 'You will use it once for `users` and once for `tasks`.'],
            ['<code>INTEGER PRIMARY KEY AUTOINCREMENT</code>', 'Creates a numeric id that grows automatically.', 'Use it for the main table identifiers.'],
            ['<code>TEXT</code>', 'Stores text values.', 'Suitable for fields like names and titles.'],
            ['<code>NOT NULL</code>', 'Prevents blanks for fields that must always exist.', 'Use it where missing data would break the task system.'],
            ['<code>DEFAULT</code>', 'Supplies a value when none is given.', 'Useful for status on new tasks.'],
            ['<code>FOREIGN KEY</code>', 'Connects one table to another.', 'Use it to link tasks back to users.']
          ]
        ),
        docTablePanel(
          'Questions to ask while writing the schema',
          ['Question', 'Why it matters'],
          [
            ['Which field uniquely identifies each user?', 'That field will become the primary key.'],
            ['Which task fields must never be empty?', 'Those fields likely need `NOT NULL`.'],
            ['Which task field points back to `users`?', 'That becomes the foreign key.'],
            ['Which value should appear automatically on new tasks?', 'That is a candidate for `DEFAULT`.']
          ]
        )
      ) +
      figureGrid(
        figurePanel(
          'Read the relationship before you write the SQL',
          'The SQL should match this relationship picture exactly: one user can be linked to many tasks.',
          sqlTableFigure
        ),
        docPanel(
          'Constraints are part of the teaching, not just decoration',
          unordered([
            '<code>AUTOINCREMENT</code> matters because the app needs stable identifiers for update and delete actions.',
            '<code>NOT NULL</code> matters because blank titles or missing assignees would weaken the client system.',
            '<code>FOREIGN KEY</code> matters because a task must point to a real user.'
          ])
        )
      ) +
      docCode(
        'Generic SQL table pattern',
        `CREATE TABLE example_items (
  item_id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_name TEXT NOT NULL,
  owner_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  FOREIGN KEY (owner_id) REFERENCES owners(owner_id)
);`,
        'sql',
        [
          ['PRIMARY KEY', 'The unique identifier for one row.'],
          ['AUTOINCREMENT', 'The database creates the next id for you.'],
          ['FOREIGN KEY', 'This links one table to another.']
        ]
      ) +
      buildJourney('Write `schema.sql` in this order', 'Move from the simpler table to the linked table, then review the constraints against the brief.', [
        {
          file: 'schema.sql',
          title: 'Write the users table first',
          body: [
            'Start with the table that does not depend on any other table.',
            'Decide the primary key and the minimum fields needed for version one.'
          ],
          prompts: [
            'Why is `username` a better field than a vague field like `details`?',
            'Which part of the brief proves the user table is needed?'
          ]
        },
        {
          file: 'schema.sql',
          title: 'Write the tasks table from the field mapping',
          body: [
            'Use the planning documents to decide the task fields.',
            'Choose data types and `NOT NULL` rules deliberately.',
            'Add a default for status because every new task needs an initial state.'
          ]
        },
        {
          file: 'schema.sql',
          title: 'Add the relationship and review the whole file',
          body: [
            'Write the foreign key so tasks point to real users.',
            'Check that the final schema still matches the ERD and the client brief.'
          ]
        }
      ]) +
      completionBlock([
        'The schema defines `users` and `tasks` clearly.',
        'You can explain why the key constraints exist.',
        'The schema still matches the table planner and ERD.'
      ], 'What should be true before the database setup script')
  },
  {
    slug: 'init-db-build',
    stageId: 'sql-stage-3',
    title: 'Build `init_db.py`',
    navLabel: 'Database setup script',
    intro: 'The schema defines the structure, but it does not create the live database file on its own. This page teaches the Python and SQLite syntax needed to turn the schema into a real database.',
    sidebarSummary: 'Python + SQLite setup, placeholders, tuples, trailing comma, and seed data.',
    deliverable: 'Working `init_db.py` plan',
    learningGoals: [
      'Explain what the connection object does',
      'Understand placeholders, tuples, and `executemany()`',
      'Create the database file and seed the starting users'
    ],
    contentHtml:
      section(
        'Turn the written schema into a live database',
        paragraph(
          'This is the first Python file students write for the data layer, so nothing should be assumed. Learn what the connection object is, what the placeholders do, and why the seed users are inserted here before the web app begins.',
          'The goal is not to memorise SQLite. The goal is to understand the handful of commands this project genuinely needs.'
        ),
        'lead'
      ) +
      docGrid(
        docTablePanel(
          'Python and SQLite words you need',
          ['Code', 'What it means', 'Why it matters here'],
          [
            ['<code>conn</code>', 'The live database connection object.', 'All SQL execution in this file goes through it.'],
            ['<code>sqlite3.connect("tasks.db")</code>', 'Open or create the SQLite database file.', 'This is how Python starts talking to SQLite.'],
            ['<code>executescript()</code>', 'Run a full block of SQL statements.', 'Useful because the schema file contains more than one command.'],
            ['<code>executemany()</code>', 'Run one SQL statement repeatedly with many values.', 'Ideal for seeding several users at once.'],
            ['<code>?</code>', 'A placeholder for a value supplied separately.', 'Safer than building SQL with string concatenation.'],
            ['<code>commit()</code>', 'Save the changes permanently.', 'Without it, your inserted rows may disappear.']
          ]
        ),
        docTablePanel(
          'Tiny Python syntax details that matter',
          ['Detail', 'What to notice'],
          [
            ['Single-item tuple', '<code>("Alice",)</code> needs the trailing comma so Python reads it as one tuple item instead of just a bracketed string.'],
            ['<code>with open(...)</code>', 'This opens the file safely and closes it when the block ends.'],
            ['Function block indentation', 'Python uses indentation to decide what belongs inside the function or loop.'],
            ['<code>if __name__ == "__main__"</code>', 'This makes the setup run when the file itself is executed.']
          ]
        )
      ) +
      callout(
        'Why the trailing comma matters',
        paragraph(
          'A single-item tuple in Python needs a comma. Without it, `("Alice")` is just a string in brackets, not a tuple.',
          'That matters because `executemany()` expects a sequence of row tuples. If each row is not structured correctly, your placeholders will not line up with the values you intended to insert.'
        ),
        'soft'
      ) +
      docCode(
        'Generic setup-script pattern',
        `import sqlite3

def build_database():
  conn = sqlite3.connect("example.db")

  with open("schema.sql") as file:
    conn.executescript(file.read())

  rows = [
    ("Alpha",),
    ("Beta",)
  ]

  conn.executemany(
    "INSERT INTO examples (name) VALUES (?)",
    rows
  )

  conn.commit()
  conn.close()`,
        'python',
        [
          ['rows', 'This list holds one tuple per row to insert.'],
          ['?', 'The placeholder is replaced by one value from each tuple.'],
          ['commit()', 'The database saves the changes permanently at this point.']
        ]
      ) +
      buildJourney('Write `init_db.py` in this order', 'Work through the file top to bottom and explain the meaning of each line before moving on.', [
        {
          file: 'init_db.py',
          title: 'Import SQLite and create the connection',
          body: [
            'Import the sqlite3 module.',
            'Inside a function, create the connection object that points at the database file.'
          ]
        },
        {
          file: 'init_db.py',
          title: 'Open `schema.sql` and run the whole script',
          body: [
            'Read the schema file into Python.',
            'Use the connection object to execute the full SQL script.'
          ],
          prompts: [
            'Why is `executescript()` more suitable here than a single `execute()` call?',
            'Why does the setup script belong in its own file instead of `app.py`?'
          ]
        },
        {
          file: 'init_db.py',
          title: 'Prepare the seed users and insert them safely',
          body: [
            'Create one tuple per user.',
            'Use placeholders with `executemany()` to insert them.',
            'Commit and close the connection once the work is done.'
          ]
        }
      ]) +
      completionBlock([
        'You can explain what `conn`, `executescript()`, `executemany()`, and `?` do.',
        'You understand why the seed users are inserted before the app is used.',
        'You can explain why the trailing comma matters in a one-item tuple.'
      ], 'What should be secure before the JavaScript and Flask pages')
  },
  {
    slug: 'js-flask-toolkit',
    stageId: 'sql-stage-3',
    title: 'JavaScript and Flask Toolkit',
    navLabel: 'JavaScript and Flask toolkit',
    intro: 'This is the final docs page before the live feature build starts. Use it to understand the browser-to-server request cycle, the JavaScript methods you will rely on, and the Flask route syntax that makes the backend work.',
    sidebarSummary: 'DOM methods, fetch, Flask routes, request/response flow, and validation layers.',
    deliverable: 'Annotated JS / Flask notes',
    learningGoals: [
      'Recognise the JavaScript and Flask syntax used in the feature pages',
      'Follow a request from browser action to server response',
      'Understand that browser validation improves UX but does not replace backend checks'
    ],
    contentHtml:
      section(
        'Learn the request cycle before the live features begin',
        paragraph(
          'Once the build reaches fetch, POST, update, and delete, you need to be able to say what happens in the browser and what happens in Flask.',
          'This page is where the vocabulary becomes concrete before you use it in the task features.'
        ),
        'lead'
      ) +
      docGrid(
        docTablePanel(
          'JavaScript terms you will use',
          ['Code', 'What it does', 'How to think about it'],
          [
            ['<code>const</code>', 'Creates a variable that should not be reassigned.', 'Useful for DOM targets and response data references.'],
            ['<code>let</code>', 'Creates a variable that can change later.', 'Useful for counters or values that update.'],
            ['<code>document.getElementById()</code>', 'Find one named element in the DOM.', 'This is why stable ids matter.'],
            ['<code>fetch()</code>', 'Start an HTTP request from the browser.', 'The browser is asking the server for something.'],
            ['<code>response.json()</code>', 'Read the response body as JSON.', 'Turns the raw response into usable data.'],
            ['<code>=></code>', 'Short arrow-function syntax.', 'Common in `.then()` chains.']
          ]
        ),
        docTablePanel(
          'Flask and backend terms you will use',
          ['Code', 'What it does', 'How to think about it'],
          [
            ['<code>@app.route()</code>', 'Connect a URL to a Python function.', 'This is how Flask knows which function handles which path.'],
            ['<code>methods=["GET"]</code>', 'Marks a route as a read route.', 'GET is for retrieval.'],
            ['<code>request.get_json()</code>', 'Reads the JSON body Flask received.', 'Used in create and update actions.'],
            ['<code>jsonify()</code>', 'Returns JSON to the browser.', 'The server sends structured data back.'],
            ['<code>SELECT</code>', 'Read data from SQL.', 'Used for list views and dropdown values.'],
            ['<code>INSERT / UPDATE / DELETE</code>', 'Change stored data.', 'These power create, complete, and delete actions.']
          ]
        )
      ) +
      callout('Request cycle to keep in your head', flowStrip(['Click', 'JavaScript', 'HTTP request', 'Flask route', 'SQL', 'JSON response', 'Redraw']), 'soft') +
      figureGrid(
        figurePanel(
          'Validation happens in layers',
          'HTML helps the user, JavaScript improves clarity, Flask re-checks the request, and the database rules protect final integrity.',
          validationLayersFigure
        ),
        docPanel(
          'Important truth about validation',
          unordered([
            'HTML validation is for user experience, not security.',
            'JavaScript can improve messages and prevent obvious mistakes.',
            'A custom request can still bypass the browser completely.',
            'That is why Flask and storage rules must always re-check the data.'
          ])
        )
      ) +
      docGrid(
        docCode(
          'Generic browser request pattern',
          `fetch("/api/items")
  .then((response) => response.json())
  .then((items) => {
    console.log(items)
  })`,
          'javascript',
          [
            ['fetch()', 'Starts the request.'],
            ['response.json()', 'Converts the response body into JavaScript data.'],
            ['.then()', 'Runs the next step after the current async step finishes.']
          ]
        ),
        docCode(
          'Generic Flask route pattern',
          `@app.route("/api/items", methods=["GET"])
def get_items():
    return jsonify([])`,
          'python',
          [
            ['@app.route', 'Connects the URL path to the function below it.'],
            ['methods=["GET"]', 'Tells Flask this route reads data.'],
            ['jsonify', 'Returns JSON in a browser-friendly response.']
          ]
        )
      ) +
      completionBlock([
        'You can describe what `fetch()` and `jsonify()` do.',
        'You can follow the request cycle from click to redraw.',
        'You understand why HTML validation is useful but never enough on its own.'
      ], 'What should be secure before the first full-stack feature')
  },
  featureStep({
    slug: 'feature-1-html-shell',
    stageId: 'sql-stage-4',
    featureNumber: 1,
    navLabel: 'Base HTML shell',
    intro: 'Build the main page shell that will later hold task cards, filters, and modal controls.',
    concept: 'Semantic layout and stable containers.',
    snippetTitle: 'Generic HTML shell pattern',
    snippetCode: `<main>\n  <header>...</header>\n  <section id="controls">...</section>\n  <section id="list-area">...</section>\n</main>`,
    files: [
      ['templates/index.html', 'Provides the page layout', 'Create logical regions for controls and output']
    ],
    buildChecklist: [
      'The page loads without broken regions.',
      'There is a dedicated place for controls.',
      'There is a dedicated place for rendered tasks.'
    ],
    prompts: [
      'Which elements should exist before any data is loaded?',
      'What makes an HTML container easy for JavaScript to target later?',
      'Why is semantic structure useful even before styling?'
    ],
    deliverable: 'Page shell',
    referenceIndex: 2,
    featureTotal: 10,
    extraSectionsHtml: sqlFeatureContext(2),
    buildJourneyHtml: sqlFeatureJourney(2)
  }),
  featureStep({
    slug: 'feature-2-task-list',
    stageId: 'sql-stage-4',
    featureNumber: 2,
    navLabel: 'Task list display area',
    intro: 'Define the task list region and decide how empty, loading, and populated states should look.',
    concept: 'Stable DOM targets and render states.',
    snippetTitle: 'Generic render target pattern',
    snippetCode: `const listArea = document.querySelector('#list-area');\nlistArea.innerHTML = '<p>No records yet.</p>';`,
    files: [
      ['templates/index.html', 'Adds the render target', 'Create a clear list container with an identifier'],
      ['static/js/app.js', 'Will later inject content into that area', 'Prepare to clear and refill the container']
    ],
    buildChecklist: [
      'The render target is obvious and named clearly.',
      'An empty-state message has been considered.',
      'The list area is separate from the form area.'
    ],
    prompts: [
      'What should the page show before the first task exists?',
      'How will you know whether the list area is being updated correctly later?',
      'Why should the modal not be mixed inside each task card?'
    ],
    deliverable: 'Render container',
    referenceIndex: 3,
    featureTotal: 10,
    extraSectionsHtml: sqlFeatureContext(3),
    buildJourneyHtml: sqlFeatureJourney(3)
  }),
  featureStep({
    slug: 'feature-3-modal',
    stageId: 'sql-stage-4',
    featureNumber: 3,
    navLabel: 'Add-task modal',
    intro: 'Introduce the UI pattern that allows new task creation without cluttering the main list screen.',
    concept: 'Modal interaction and controlled visibility.',
    snippetTitle: 'Generic modal pattern',
    snippetCode: `openButton -> show modal\ncloseButton -> hide modal\ncancelAction -> reset or close safely`,
    files: [
      ['templates/index.html', 'Holds the modal structure', 'Create the trigger button and hidden modal'],
      ['static/js/app.js', 'Will later control modal visibility', 'Plan open and close behaviour']
    ],
    buildChecklist: [
      'A clear Add Task trigger exists.',
      'The modal can close safely.',
      'The form area is visually separate from the main list.'
    ],
    prompts: [
      'Why is a modal appropriate here instead of a full second page?',
      'What should happen if the user closes the modal halfway through?',
      'How will you prevent the modal from feeling disconnected from the main page?'
    ],
    deliverable: 'Modal interface',
    referenceIndex: 4,
    featureTotal: 10,
    extraSectionsHtml: sqlFeatureContext(4),
    buildJourneyHtml: sqlFeatureJourney(4)
  }),
  featureStep({
    slug: 'feature-4-form-inputs',
    stageId: 'sql-stage-4',
    featureNumber: 4,
    navLabel: 'Form inputs and validation',
    intro: 'Build the form fields that collect the data the database will eventually store.',
    concept: 'Field mapping and validation expectations.',
    snippetTitle: 'Generic form data pattern',
    snippetCode: `title -> required text\nassignee -> required selection or text\ndueDate -> date input\npriority -> fixed options`,
    files: [
      ['templates/index.html', 'Defines the form controls', 'Add the required inputs and labels'],
      ['static/js/app.js', 'Will later read these values', 'Plan how values will be collected']
    ],
    buildChecklist: [
      'All required inputs are visible.',
      'Labels make the purpose of each field obvious.',
      'Required vs optional choices are deliberate.'
    ],
    prompts: [
      'Which field should be mandatory to avoid useless records?',
      'Should priority be free text or controlled options?',
      'How can the form guide better data quality before submission?'
    ],
    deliverable: 'Complete input form',
    referenceIndex: 5,
    featureTotal: 10,
    extraSectionsHtml: sqlFeatureContext(5),
    buildJourneyHtml: sqlFeatureJourney(5)
  }),
  featureStep({
    slug: 'feature-5-fetch-render',
    stageId: 'sql-stage-4',
    featureNumber: 5,
    navLabel: 'Fetch and render tasks',
    intro: 'This is the first full data loop: retrieve records from storage and display them on the page.',
    concept: 'GET requests, JSON responses, and rendering.',
    snippetTitle: 'Generic fetch pattern',
    snippetCode: `fetch('/api/records')\n  .then(response => response.json())\n  .then(data => renderRecords(data));`,
    files: [
      ['static/js/app.js', 'Requests and renders data', 'Create the read flow and render function'],
      ['app.py', 'Supplies record data', 'Prepare the route that returns data']
    ],
    buildChecklist: [
      'The page can request a list of records.',
      'Returned data appears in the correct container.',
      'An empty response still produces a sensible screen.'
    ],
    prompts: [
      'What format does the browser expect back from the server?',
      'Why should rendering be handled in one dedicated function?',
      'How will you know whether the bug is in the route or the rendering logic?'
    ],
    deliverable: 'Readable list view',
    referenceIndex: 6,
    featureTotal: 10,
    extraSectionsHtml: sqlFeatureContext(6),
    buildJourneyHtml: sqlFeatureJourney(6)
  }),
  featureStep({
    slug: 'feature-6-create-record',
    stageId: 'sql-stage-4',
    featureNumber: 6,
    navLabel: 'Create a task',
    intro: 'Turn the modal form into a working create flow that stores a new record and refreshes the list.',
    concept: 'POST requests and record insertion.',
    snippetTitle: 'Generic create pattern',
    snippetCode: `const payload = { ...formValues };\nfetch('/api/records', { method: 'POST', body: JSON.stringify(payload) });`,
    files: [
      ['templates/index.html', 'Captures the input values', 'Confirm field names match the data meaning'],
      ['static/js/app.js', 'Sends the create request', 'Read form values and submit structured data'],
      ['app.py', 'Receives and validates create requests', 'Persist the new record safely']
    ],
    buildChecklist: [
      'The form submits structured data.',
      'Required fields are checked before submission.',
      'The new task appears after a successful create action.'
    ],
    prompts: [
      'What should happen if the server rejects the request?',
      'Why is it useful to refresh the list immediately after create?',
      'Which validation should happen in the browser, and which must still happen on the server?'
    ],
    deliverable: 'Working create flow',
    referenceIndex: 7,
    featureTotal: 10,
    extraSectionsHtml: sqlFeatureContext(7),
    buildJourneyHtml: sqlFeatureJourney(7)
  }),
  featureStep({
    slug: 'feature-7-delete-record',
    stageId: 'sql-stage-4',
    featureNumber: 7,
    navLabel: 'Delete a task',
    intro: 'Allow the user to remove the correct record using a stable identifier rather than visible text.',
    concept: 'Identifier-based delete actions.',
    snippetTitle: 'Generic delete pattern',
    snippetCode: `fetch('/api/records/<id>', { method: 'DELETE' });`,
    files: [
      ['static/js/app.js', 'Connects the delete button to the correct id', 'Attach delete controls to each rendered record'],
      ['app.py', 'Performs the delete action', 'Delete by identifier, not by display text']
    ],
    buildChecklist: [
      'Each rendered record exposes a reliable id for actions.',
      'The correct row is removed from storage.',
      'The list updates after deletion.'
    ],
    prompts: [
      'Why is deleting by title dangerous?',
      'Should the UI ask for confirmation before delete?',
      'How can you test that the intended record was removed?'
    ],
    deliverable: 'Working delete action',
    referenceIndex: 8,
    featureTotal: 10,
    extraSectionsHtml: sqlFeatureContext(8),
    buildJourneyHtml: sqlFeatureJourney(8)
  }),
  featureStep({
    slug: 'feature-8-update-status',
    stageId: 'sql-stage-4',
    featureNumber: 8,
    navLabel: 'Mark a task complete',
    intro: 'Update an existing record and reflect the new state visibly in the interface.',
    concept: 'Record updates and state feedback.',
    snippetTitle: 'Generic update pattern',
    snippetCode: `fetch('/api/records/<id>', {\n  method: 'PATCH',\n  body: JSON.stringify({ status: 'complete' })\n});`,
    files: [
      ['static/js/app.js', 'Triggers the update action', 'Add a completion control to each task'],
      ['app.py', 'Applies the status change', 'Update the stored record and return a clear result']
    ],
    buildChecklist: [
      'The status change targets the correct record.',
      'The UI visibly distinguishes completed work.',
      'The new state persists after refresh.'
    ],
    prompts: [
      'How should completed tasks look different from active ones?',
      'What evidence proves the update is stored rather than just styled on screen?',
      'Would you hide completed tasks or keep them visible? Why?'
    ],
    deliverable: 'Persisted status update',
    referenceIndex: 9,
    featureTotal: 10,
    extraSectionsHtml: sqlFeatureContext(9),
    buildJourneyHtml: sqlFeatureJourney(9)
  }),
  featureStep({
    slug: 'feature-9-filter-sort',
    stageId: 'sql-stage-4',
    featureNumber: 9,
    navLabel: 'Filtering and sorting',
    intro: 'Make the task list genuinely useful by helping users retrieve the right records quickly.',
    concept: 'Conditional retrieval and ordered outputs.',
    snippetTitle: 'Generic query-string pattern',
    snippetCode: `fetch('/api/records?assignee=Aisha&priority=high&sort=due_date');`,
    files: [
      ['templates/index.html', 'Provides filter controls', 'Add only the controls the brief actually needs'],
      ['static/js/app.js', 'Sends selected filters to the server', 'Read control values and build the request'],
      ['app.py', 'Returns filtered and ordered results', 'Translate user choices into predictable output']
    ],
    buildChecklist: [
      'Users can apply one or more filters intentionally.',
      'Sorting rules are clear and predictable.',
      'Filters can be reset or changed without confusion.'
    ],
    prompts: [
      'Which filters are worth adding in version one?',
      'Should filtering happen in the browser, the server, or both? Why?',
      'What test would prove the sorting logic is correct?'
    ],
    deliverable: 'Searchable task list',
    referenceIndex: 10,
    featureTotal: 10,
    extraSectionsHtml: sqlFeatureContext(10),
    buildJourneyHtml: sqlFeatureJourney(10)
  }),
  featureStep({
    slug: 'feature-10-evaluation-check',
    stageId: 'sql-stage-4',
    featureNumber: 10,
    navLabel: 'Evaluation and evidence check',
    intro: 'Use this page to connect the implementation back to the criteria you drafted at the beginning.',
    concept: 'Traceability between specification and evidence.',
    snippetTitle: 'Generic evidence log pattern',
    snippetCode: `Criterion -> Test -> Evidence -> Pass / Fail -> Improvement note`,
    files: [
      ['Test plan', 'Holds your measurable checks', 'Complete actual results and pass/fail decisions'],
      ['Project app', 'Provides the evidence', 'Capture the behaviours that prove each criterion'],
      ['Written evaluation', 'Explains limitations and next steps', 'Note any unresolved weaknesses honestly']
    ],
    buildChecklist: [
      'Each important feature maps back to a criterion.',
      'Actual results are recorded rather than assumed.',
      'Any gaps are identified honestly.'
    ],
    prompts: [
      'Which criterion is hardest to prove with evidence?',
      'What failed or felt weaker than expected during testing?',
      'How would you prioritise the next iteration if this were a real client job?'
    ],
    deliverable: 'Evidence-based evaluation',
    referenceIndex: 11,
    featureTotal: 10,
    extraSectionsHtml: sqlFeatureContext(11),
    buildJourneyHtml: sqlFeatureJourney(11)
  }),
  {
    slug: 'tagging-algorithm',
    stageId: 'sql-stage-5',
    title: 'Tagging Algorithm Design',
    navLabel: 'Tagging algorithm',
    intro: 'Add the non-standard algorithm only after the core app works. Start with the logic in plain English, then worry about code later.',
    sidebarSummary: 'Plain-English tagging steps and integration logic.',
    deliverable: 'Plain-English algorithm and flowchart',
    learningGoals: [
      'Explain the tagging logic in ordered steps',
      'Separate algorithm design from implementation details',
      'Identify where the algorithm joins the existing workflow'
    ],
    contentHtml:
      section(
        'What this stage adds',
        paragraph(
          'The non-standard algorithm is introduced only after the core task system works. At this point the class adds a second way of organising tasks by deriving short tags from the task text itself.',
          'This is an algorithm design page, not an implementation page. The goal is to make the logic precise in plain English before anyone writes code.'
        ),
        'lead'
      ) +
      keywordTable([
        ['Token', 'One word or fragment taken from a longer text.'],
        ['Stop word', 'A very common word removed because it adds little meaning.'],
        ['Unique word', 'A distinct word worth considering as a tag.'],
        ['Limit rule', 'A fixed maximum number of tags returned by the algorithm.']
      ]) +
      section(
        'Plain-English algorithm',
        ordered([
          'Read the task title or task text provided by the user.',
          'Convert the text to one consistent format so comparisons are reliable.',
          'Split the text into individual words.',
          'Remove common stop words that do not help describe the task.',
          'Keep the useful unique words that remain.',
          'Limit the final list to a small number of meaningful tags.',
          'Pass those tags into the storage layer so they can be linked to the task.'
        ]),
        'default'
      ) +
      referenceList('Where this connects to the system', [
        'The algorithm sits after task text is received and before the tag links are stored.',
        'The algorithm does not replace the database design; it depends on the later `tags` and `task_tags` structure.',
        'The output of the algorithm should be easy to test and explain.'
      ]) +
      codeBlock(
        'Flow sketch',
        `Read task text\n-> convert to one format\n-> split into words\n-> remove stop words\n-> keep useful unique words\n-> limit tag count\n-> store links`,
        'text'
      ) +
      completionBlock([
        'The class can state the algorithm in ordered plain English without code.',
        'The flowchart and the written steps describe the same process.',
        'Everyone understands where the algorithm connects to later storage changes.'
      ], 'What should be complete before the database extension')
  },
  {
    slug: 'database-extension',
    stageId: 'sql-stage-6',
    title: 'Database Extension for Tags',
    navLabel: 'Database extension',
    intro: 'Extend the original design carefully. The database now needs a many-to-many structure that still keeps the system readable and testable.',
    sidebarSummary: 'Introduce tags, task_tags, and composite-key thinking.',
    deliverable: 'Extended ERD and schema notes',
    learningGoals: [
      'Recognise why tagging requires a linking table',
      'Explain composite keys in context',
      'Check that the extension still fits the project criteria'
    ],
    contentHtml:
      section(
        'Now extend the database without breaking it',
        paragraph(
          'The original SQL model was deliberately simple so the core build stayed teachable. Once tagging arrives, the structure needs to grow carefully instead of stuffing repeated tag text into the task table.',
          'This is the point where many-to-many thinking, junction tables, and composite keys stop being vocabulary and become real design choices.'
        ),
        'lead'
      ) +
      keywordTable([
        ['Many-to-many', 'A relationship where both sides can connect to many records.'],
        ['Junction table', 'A linking table used to resolve many-to-many relationships.'],
        ['Composite key', 'A key made from more than one column.'],
        ['Referential integrity', 'The guarantee that linked records remain valid.']
      ]) +
      section(
        'What changes in the schema?',
        dataTable(
          ['Entity', 'Purpose in the extension'],
          [
            ['tags', 'Stores the available labels once rather than repeating them inside task records'],
            ['task_tags', 'Links tasks to tags and resolves the many-to-many relationship'],
            ['tasks', 'Still stores the main task data, but no longer tries to hold multiple tag values directly']
          ]
        ),
        'table'
      ) +
      referenceList('Why the linking table matters', [
        'One task can have many tags, and one tag can describe many tasks.',
        'Storing repeated tag text directly in the task table would damage normalisation.',
        'The updated ERD should now show `tags` and `task_tags` explicitly.'
      ]) +
      completionBlock([
        'The updated ERD shows `tasks`, `tags`, and `task_tags` clearly.',
        'The class can explain why the junction table needs a composite key or equivalent uniqueness rule.',
        'Everyone can describe how the algorithm output reaches the extended data model.'
      ], 'What should be secure before the SQL journey ends')
  }
];

export const sqlProjectSequence: ProjectSequence = {
  key: 'sql-project',
  kicker: 'SQL Project',
  rootPath: '/ib-2027/sl/unit-6/sql-project',
  unitHref: '/ib-2027/sl/unit-6/index.html',
  unitLabel: 'Back to SL Unit 6',
  projectTitle: 'Full-Stack SQL Project',
  projectSummary: 'Work through the SQL project as a genuine sequence of planning, design, modelling, and implementation pages.',
  stages: sqlStages,
  steps: sqlSteps
};

const nosqlStages: ProjectStage[] = [
  {
    id: 'nosql-stage-1',
    label: 'Stage 1',
    title: 'JSON and NoSQL Theory',
    summary: 'Build the theory first so the JSON approach is chosen deliberately rather than copied blindly.'
  },
  {
    id: 'nosql-stage-2',
    label: 'Stage 2',
    title: 'Python JSON Exploration',
    summary: 'Use small Python experiments to understand how document data is read, updated, and saved.'
  },
  {
    id: 'nosql-stage-3',
    label: 'Stage 3',
    title: 'SQL vs NoSQL Modelling',
    summary: 'Compare how the same task system looks as a relational design and as a document model.'
  },
  {
    id: 'nosql-stage-4',
    label: 'Stage 4',
    title: 'Parallel JSON Build',
    summary: 'Rebuild the feature sequence with JSON storage while keeping the student-facing behaviour aligned.'
  }
];

const nosqlSteps: ProjectStep[] = [
  {
    slug: '',
    stageId: 'nosql-stage-1',
    title: 'JSON and NoSQL Brief',
    navLabel: 'Theory brief',
    intro: 'This opening page sets the theory. JSON and NoSQL are not “better SQL”; they are alternative ways of structuring and scaling data.',
    sidebarSummary: 'Theory brief, core concepts, and the main JSON/NoSQL framing ideas.',
    deliverable: 'Short comparison notes',
    learningGoals: [
      'Understand JSON as a structured data format',
      'Explain what “NoSQL” really means in context',
      'Recognise why different storage models suit different problems'
    ],
    contentHtml:
      memo(
        'Technical extension brief',
        `
          <p><strong>Scenario:</strong> The original task system now needs an HL extension. You are exploring whether the same application could be backed by JSON documents instead of a relational database.</p>
          <p>The purpose of this extension is not to declare one model “best”. The purpose is to compare trade-offs: schema flexibility, data integrity, update complexity, and how easy it is to model relationships.</p>
          <p>Your job is to understand when a document model is useful, what it simplifies, and what it complicates.</p>
        `
      ) +
      keywordTable([
        ['JSON object', 'A collection of key-value pairs inside braces.'],
        ['Array', 'An ordered list of values inside brackets.'],
        ['Document model', 'A storage approach centred on structured documents rather than rows.'],
        ['Schema flexibility', 'The ability to change structure more easily, with different trade-offs.']
      ]) +
      split(
        section(
          'JSON fundamentals',
          unordered([
            'JSON stores data as key-value pairs and nested structures.',
            'Objects, arrays, strings, numbers, booleans, and null are the core value forms.',
            'The structure is flexible, but it still needs discipline.'
          ]),
          'reference'
        ),
        section(
          'NoSQL reality check',
          unordered([
            'NoSQL means “not only SQL”, not “no structure”.',
            'Document databases are one NoSQL model, not the only one.',
            'Flexibility usually comes with different integrity trade-offs.'
          ]),
          'default'
        )
      ) +
      completionBlock([
        'The class can define JSON, NoSQL, and document storage clearly.',
        'Everyone understands that flexibility does not remove the need for structure.',
        'SQL and NoSQL are being compared as design choices, not ranked by slogan.'
      ], 'What should be understood before the Python JSON work')
  },
  {
    slug: 'python-json-lab',
    stageId: 'nosql-stage-2',
    title: 'Python JSON Exploration',
    navLabel: 'Python JSON lab',
    intro: 'Use small Python examples to practise how JSON is loaded, changed, and saved. Keep it separate from the real project until the storage model feels familiar.',
    sidebarSummary: 'Read, update, append, and save JSON in controlled examples.',
    deliverable: 'JSON experiment notes',
    learningGoals: [
      'Read a JSON file into a Python structure',
      'Update nested values safely',
      'Understand why file write logic needs care'
    ],
    contentHtml:
      section(
        'Try JSON with tiny Python examples',
        paragraph(
          'Use these small examples to get comfortable with the read-edit-write cycle before you bring JSON anywhere near the real app.',
          'This is a practice page. The goal is to understand the storage model clearly enough that the later build feels deliberate.'
        ),
        'lead'
      ) +
      keywordTable([
        ['json.load', 'Reads JSON text into a Python structure.'],
        ['json.dump', 'Writes a Python structure back to JSON text.'],
        ['Dictionary', 'A Python key-value structure often used after loading JSON.'],
        ['File rewrite', 'Saving the updated document back to storage.']
      ]) +
      codeBlock(
        'Generic Python pattern',
        `import json\n\nwith open('records.json', 'r') as file:\n    data = json.load(file)\n\ndata.append({'id': 3, 'label': 'Example'})\n\nwith open('records.json', 'w') as file:\n    json.dump(data, file, indent=2)`,
        'python'
      ) +
      split(
        referenceList('Reference notes', [
          'The entire document may be read before it is updated.',
          'The structure in memory is usually a Python list/dictionary combination.',
          'When saving, the whole document may be rewritten.'
        ]),
        section(
          'What needs care',
          unordered([
            'Duplicate ids if identifier management is weak.',
            'Broken files if writes are interrupted or structured poorly.',
            'Inconsistent nested data if validation rules are unclear.'
          ]),
          'default'
        )
      ) +
      completionBlock([
        'The class can describe the read-edit-write cycle for a JSON file.',
        'Everyone understands why identifiers and validation still matter in a flexible document structure.',
        'The difference between updating JSON and updating SQL rows is clear before modelling comparison begins.'
      ], 'What should be secure before the modelling comparison')
  },
  {
    slug: 'modelling-comparison',
    stageId: 'nosql-stage-3',
    title: 'SQL vs NoSQL Modelling Comparison',
    navLabel: 'Modelling comparison',
    intro: 'Compare the same task system in two shapes: a relational model and a document model. You are not picking favourites here; you are learning to justify trade-offs.',
    sidebarSummary: 'Model A vs Model B for the same task-tracking problem.',
    deliverable: 'Model comparison notes',
    learningGoals: [
      'Describe the same system using two storage models',
      'Recognise where nesting helps and where it hurts',
      'Explain trade-offs instead of reciting buzzwords'
    ],
    contentHtml:
      section(
        'Compare the same app in two data models',
        paragraph(
          'The task system has not changed. What changes here is the way the data is shaped and maintained.',
          'Use this page to decide what each model makes easier, what it makes harder, and why the trade-offs matter.'
        ),
        'lead'
      ) +
      keywordTable([
        ['Redundancy', 'The same data being stored in multiple places.'],
        ['Embedded data', 'Related information stored directly inside one document.'],
        ['Reference by ID', 'Linking one structure to another using identifiers.'],
        ['Update difficulty', 'How awkward it is to keep related data consistent over time.']
      ]) +
      section(
        'Model A: relational view',
        paragraph(
          'A relational model separates entities into tables and uses keys to link them. It is strong when you need integrity, clear joins, and well-controlled updates.'
        ) +
          dataTable(
            ['Likely structure', 'Why it works'],
            [
              ['tasks table', 'Core task record stays atomic and queryable'],
              ['users table', 'Assignees can be reused and updated consistently'],
              ['task_tags link table', 'Many-to-many tagging stays explicit']
            ]
          ),
        'table'
      ) +
      section(
        'Model B: document view',
        paragraph(
          'A document model may keep more related data together inside one record. This can simplify some reads, but it also changes how updates and relationships feel.'
        ) +
          dataTable(
            ['Possible document idea', 'Why it helps / why it hurts'],
            [
              ['One document per task', 'Easy to read a whole task at once, but nested updates need care'],
              ['Embedded assignee summary', 'Fast display, but duplicated user data can drift'],
              ['Embedded tag array', 'Simple for one task, harder when tags need global management']
            ]
        ),
        'table'
      ) +
      completionBlock([
        'The class can compare separate-ID models with embedded-document models using real trade-offs.',
        'Redundancy and update difficulty are both visible in the comparison.',
        'The move into the JSON implementation track is now based on reasoning rather than guesswork.'
      ], 'What should be clear before the parallel JSON build')
  },
  {
    slug: 'implementation-foundations',
    stageId: 'nosql-stage-4',
    title: 'JSON Track Foundations',
    navLabel: 'Implementation foundations',
    intro: 'Keep the UI familiar while the storage model changes. This page marks the boundary between the shared frontend and the new JSON persistence layer.',
    sidebarSummary: 'How the JSON-backed track differs from the SQL-backed track.',
    deliverable: 'Annotated JSON-track structure',
    learningGoals: [
      'Keep the user experience aligned with the SQL version',
      'Understand where the storage model changes the backend logic',
      'Explain the role of `data/*.json` in the project structure'
    ],
    contentHtml:
      section(
        'Same frontend, different storage',
        paragraph(
          'The screen the user sees should stay familiar while the persistence layer changes from SQL to JSON. That is what makes the comparison between tracks honest.',
          'By the end of this page, you should know exactly which parts of the app stay the same and which parts need new backend thinking.'
        ),
        'lead'
      ) +
      keywordTable([
        ['Document store', 'The JSON files that now hold the application data.'],
        ['Backend parity', 'Keeping the purpose of routes aligned across both tracks.'],
        ['Frontend parity', 'Keeping the user-facing interface aligned across both tracks.'],
        ['Storage layer', 'The part of the system responsible for persistence.']
      ]) +
      section(
        'What stays the same and what changes',
        dataTable(
          ['Area', 'SQL track', 'JSON track'],
          [
            ['HTML shell', 'Same user-facing layout', 'Same user-facing layout'],
            ['JavaScript behaviour', 'Same interaction goals', 'Same interaction goals'],
            ['Backend route purpose', 'Read/write database records', 'Read/write JSON document data'],
            ['Storage layer', 'Relational database', 'Structured JSON files']
          ]
        ),
        'table'
      ) +
      referenceList('Keep the comparison fair', [
        'Do not redesign the interface just because the storage model changed.',
        'Let the storage difference appear mainly in backend logic and data design.',
        'If behaviour differs, be able to explain why the model caused it.'
      ]) +
      codeBlock(
        'Generic JSON-track structure sketch',
        `project/\n  app.py\n  data/\n    tasks.json\n  templates/\n    index.html\n  static/\n    js/\n      app.js`,
        'text'
      ) +
      completionBlock([
        'The class understands which parts of the app stay the same across both tracks.',
        'The role of `data/*.json` is clear before feature implementation starts.',
        'The JSON track is positioned as a storage-model variation, not as a completely different app.'
      ], 'What should be secure before Feature 1 in HL')
  },
  jsonFeatureStep({
    slug: 'feature-1-structure',
    stageId: 'nosql-stage-4',
    featureNumber: 1,
    navLabel: 'Project directory structure',
    intro: 'Set up the JSON-backed directory structure so the storage model is explicit from day one.',
    concept: 'Structure parity with SQL, storage difference in `data/`.',
    snippetTitle: 'Generic pattern',
    snippetCode: `app.py -> application logic\ndata/records.json -> stored document data\ntemplates/index.html -> page structure\nstatic/js/app.js -> browser logic`,
    files: [
      ['Project root', 'Still contains the app entry point', 'Keep names aligned with the SQL version'],
      ['data/', 'Stores JSON documents', 'Create a clearly named data file location'],
      ['templates/', 'Keeps the UI shell', 'Match the interface layout of the SQL version'],
      ['static/js/', 'Keeps client-side interaction logic', 'Reuse the same interaction goals']
    ],
    buildChecklist: [
      'The JSON storage area is explicit.',
      'The UI-related folders still mirror the SQL version.',
      'The structure remains readable rather than experimental.'
    ],
    prompts: [
      'What is the equivalent of `schema.sql` in this track, if any?',
      'Why should the JSON file not be mixed into the templates folder?',
      'Which folders should be identical between SQL and JSON tracks?'
    ],
    deliverable: 'JSON project skeleton'
  }),
  jsonFeatureStep({
    slug: 'feature-2-html-shell',
    stageId: 'nosql-stage-4',
    featureNumber: 2,
    navLabel: 'Base HTML shell',
    intro: 'Reuse the same interface shape so the storage comparison stays honest.',
    concept: 'Interface parity across storage models.',
    snippetTitle: 'Generic HTML shell pattern',
    snippetCode: `<main>\n  <header>...</header>\n  <section id="controls">...</section>\n  <section id="list-area">...</section>\n</main>`,
    files: [['templates/index.html', 'Keeps the UI stable', 'Use the same layout regions as the SQL version']],
    buildChecklist: [
      'The interface structure matches the SQL track.',
      'The page is ready for dynamic rendering.',
      'Storage details do not leak into the UI copy.'
    ],
    prompts: [
      'Why does keeping the UI the same make the comparison stronger?',
      'Which UI changes would make the experiment unfair?'
    ],
    deliverable: 'Shared UI shell'
  }),
  jsonFeatureStep({
    slug: 'feature-3-task-list',
    stageId: 'nosql-stage-4',
    featureNumber: 3,
    navLabel: 'Task list display area',
    intro: 'Define the list area exactly as in the SQL build so the frontend remains portable.',
    concept: 'Portable frontend structure.',
    snippetTitle: 'Generic render target pattern',
    snippetCode: `const listArea = document.querySelector('#list-area');\nlistArea.innerHTML = '<p>No records yet.</p>';`,
    files: [
      ['templates/index.html', 'Provides the render target', 'Use the same target naming as the SQL track'],
      ['static/js/app.js', 'Will later populate the list', 'Prepare one clear render function']
    ],
    buildChecklist: [
      'The list container is clear and stable.',
      'Empty-state logic is considered.',
      'The render target can be reused no matter how data is stored.'
    ],
    prompts: [
      'What is gained by keeping the render logic storage-agnostic?',
      'Which part of the app should not care whether data came from SQL or JSON?'
    ],
    deliverable: 'Reusable list container'
  }),
  jsonFeatureStep({
    slug: 'feature-4-modal',
    stageId: 'nosql-stage-4',
    featureNumber: 4,
    navLabel: 'Add-task modal',
    intro: 'Keep the create-task interaction the same while preparing for JSON-backed storage.',
    concept: 'Consistent interaction, different persistence.',
    snippetTitle: 'Generic modal pattern',
    snippetCode: `openButton -> show modal\ncloseButton -> hide modal\nsubmitButton -> collect form data`,
    files: [
      ['templates/index.html', 'Holds the modal structure', 'Reuse the same form layout approach'],
      ['static/js/app.js', 'Will later handle modal behaviour', 'Keep the behaviour aligned with the SQL track']
    ],
    buildChecklist: [
      'The modal behaves predictably.',
      'The form layout remains aligned with the SQL version.',
      'The student can compare both tracks easily.'
    ],
    prompts: [
      'Why is this feature mostly unchanged between tracks?',
      'Which later file changes will actually reveal the storage-model difference?'
    ],
    deliverable: 'Consistent modal UI'
  }),
  jsonFeatureStep({
    slug: 'feature-5-form-inputs',
    stageId: 'nosql-stage-4',
    featureNumber: 5,
    navLabel: 'Form inputs and validation',
    intro: 'Capture the same task data, but think carefully about how those values will be written into a JSON document.',
    concept: 'Document properties and validation.',
    snippetTitle: 'Generic field map',
    snippetCode: `{\n  "id": 4,\n  "title": "Example",\n  "assignee": "Aisha",\n  "priority": "high"\n}`,
    files: [
      ['templates/index.html', 'Defines the inputs', 'Keep data collection aligned with the SQL track'],
      ['static/js/app.js', 'Will later build the JSON payload', 'Map form fields to document properties']
    ],
    buildChecklist: [
      'The required input set is complete.',
      'Form values could be turned into a coherent document.',
      'Validation expectations are written down.'
    ],
    prompts: [
      'Which values should be stored directly in one task document?',
      'Which input values might become awkward if they later need to be normalised?'
    ],
    deliverable: 'Document-ready form'
  }),
  jsonFeatureStep({
    slug: 'feature-6-read-render',
    stageId: 'nosql-stage-4',
    featureNumber: 6,
    navLabel: 'Fetch and render tasks',
    intro: 'Read JSON-backed records and render them into the same list interface.',
    concept: 'Read pipeline and response consistency.',
    snippetTitle: 'Generic fetch pattern',
    snippetCode: `fetch('/api/records')\n  .then(response => response.json())\n  .then(data => renderRecords(data));`,
    files: [
      ['static/js/app.js', 'Renders the returned data', 'Reuse the same output expectations as SQL'],
      ['app.py', 'Reads from JSON storage', 'Return a clean JSON response for the browser'],
      ['data/*.json', 'Stores the records', 'Maintain a valid structure at all times']
    ],
    buildChecklist: [
      'The read flow returns predictable data.',
      'The UI still renders without a full page refresh.',
      'The list view behaves like the SQL track from the student perspective.'
    ],
    prompts: [
      'How is reading a whole JSON document different from querying specific SQL rows?',
      'What problems appear if the stored document becomes inconsistent?'
    ],
    deliverable: 'JSON read flow'
  }),
  jsonFeatureStep({
    slug: 'feature-7-create-record',
    stageId: 'nosql-stage-4',
    featureNumber: 7,
    navLabel: 'Create a task',
    intro: 'Append a new record to the JSON-backed storage flow without breaking the existing structure.',
    concept: 'Document append and identifier control.',
    snippetTitle: 'Generic create pattern',
    snippetCode: `const payload = { ...formValues };\nfetch('/api/records', { method: 'POST', body: JSON.stringify(payload) });`,
    files: [
      ['static/js/app.js', 'Submits create requests', 'Build the payload cleanly'],
      ['app.py', 'Validates and writes the new record', 'Manage identifiers carefully'],
      ['data/*.json', 'Receives the appended record', 'Keep the document valid after each write']
    ],
    buildChecklist: [
      'New records are appended safely.',
      'Identifiers remain unique.',
      'The list refresh confirms the new record exists.'
    ],
    prompts: [
      'How will you generate the next identifier safely?',
      'Why is “just append to the file” not enough as an explanation?'
    ],
    deliverable: 'JSON create flow'
  }),
  jsonFeatureStep({
    slug: 'feature-8-delete-record',
    stageId: 'nosql-stage-4',
    featureNumber: 8,
    navLabel: 'Delete a task',
    intro: 'Remove a record from JSON storage without damaging the overall document structure.',
    concept: 'Document filtering and safe rewrite.',
    snippetTitle: 'Generic delete pattern',
    snippetCode: `remainingRecords = records.filter(record => record.id !== targetId)`,
    files: [
      ['static/js/app.js', 'Sends the delete request', 'Pass the correct identifier from the UI'],
      ['app.py', 'Removes the chosen record and rewrites storage', 'Protect the file structure during update'],
      ['data/*.json', 'Stores the remaining data', 'Confirm valid JSON remains after deletion']
    ],
    buildChecklist: [
      'Delete targets the correct record.',
      'The document remains valid after the update.',
      'The interface stays in sync after delete.'
    ],
    prompts: [
      'Why is deleting one JSON record usually a rewrite rather than a row removal?',
      'How could you prove the correct record was removed?'
    ],
    deliverable: 'JSON delete flow'
  }),
  jsonFeatureStep({
    slug: 'feature-9-update-status',
    stageId: 'nosql-stage-4',
    featureNumber: 9,
    navLabel: 'Mark a task complete',
    intro: 'Update one property inside the JSON record and confirm the change appears persistently in the UI.',
    concept: 'Document updates and persistence.',
    snippetTitle: 'Generic update pattern',
    snippetCode: `record.status = 'complete'`,
    files: [
      ['static/js/app.js', 'Triggers the status update', 'Reuse the same control pattern as the SQL version'],
      ['app.py', 'Finds and updates the target record', 'Change only the intended field'],
      ['data/*.json', 'Persists the changed record', 'Verify the update survives reload']
    ],
    buildChecklist: [
      'The correct record is updated.',
      'The completed state is visible in the interface.',
      'The change persists after refresh.'
    ],
    prompts: [
      'How do you know only one record changed?',
      'Why should UI styling follow the persisted data rather than guess it?'
    ],
    deliverable: 'JSON status update'
  }),
  jsonFeatureStep({
    slug: 'feature-10-filter-sort',
    stageId: 'nosql-stage-4',
    featureNumber: 10,
    navLabel: 'Filtering and sorting',
    intro: 'Apply the same retrieval goals as the SQL version while deciding how the JSON-backed route should produce ordered results.',
    concept: 'Filtered responses from document data.',
    snippetTitle: 'Generic filter pattern',
    snippetCode: `filtered = records.filter(record => record.assignee === selectedAssignee)`,
    files: [
      ['templates/index.html', 'Defines the controls', 'Keep them aligned with the SQL version'],
      ['static/js/app.js', 'Collects filter choices', 'Build a predictable request flow'],
      ['app.py', 'Applies filtering and sorting rules', 'Return only the needed subset or order']
    ],
    buildChecklist: [
      'Filters return the expected subset.',
      'Sorting behaviour is predictable.',
      'The feature remains comparable to the SQL track.'
    ],
    prompts: [
      'Where should the sorting logic live?',
      'What makes a filter feature testable rather than impressionistic?'
    ],
    deliverable: 'JSON retrieval controls'
  }),
  jsonFeatureStep({
    slug: 'feature-11-evaluation-check',
    stageId: 'nosql-stage-4',
    featureNumber: 11,
    navLabel: 'Evaluation and evidence check',
    intro: 'Judge the JSON-backed build against the same functional expectations as the SQL version, then reflect on the modelling trade-offs.',
    concept: 'Evidence and comparison.',
    snippetTitle: 'Generic evidence log pattern',
    snippetCode: `Feature -> Evidence -> Pass / Fail -> Model insight`,
    files: [
      ['Test evidence', 'Shows whether the feature worked', 'Record actual behaviour rather than assumptions'],
      ['Comparison notes', 'Captures SQL vs JSON trade-offs', 'Explain where one model felt stronger or weaker']
    ],
    buildChecklist: [
      'The same core behaviours are evaluated.',
      'Trade-offs are explained clearly.',
      'Conclusions are based on evidence.'
    ],
    prompts: [
      'Which feature felt easier in JSON?',
      'Which feature felt safer or clearer in SQL?',
      'How would you justify the final model choice to a client?'
    ],
    deliverable: 'Model comparison evaluation'
  })
];

export const nosqlProjectSequence: ProjectSequence = {
  key: 'nosql-project',
  kicker: 'NoSQL Project',
  rootPath: '/ib-2027/hl/unit-5/nosql-project',
  unitHref: '/ib-2027/hl/unit-5/index.html',
  unitLabel: 'Back to HL Unit 5',
  projectTitle: 'Parallel JSON Project',
  projectSummary: 'Move through the HL extension as a sequence of theory, comparison, and JSON-backed implementation pages.',
  stages: nosqlStages,
  steps: nosqlSteps
};

export const getProjectStep = (sequence: ProjectSequence, slug = ''): ProjectStep =>
  sequence.steps.find((step) => step.slug === slug) || sequence.steps[0];

export const getProjectStaticSlugs = (sequence: ProjectSequence): string[] =>
  sequence.steps.filter((step) => step.slug).map((step) => step.slug);
