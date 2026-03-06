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

const flowStrip = `
  <div class="ib-project-flow">
    <span>HTML</span>
    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    <span>JavaScript</span>
    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    <span>Flask</span>
    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    <span>Storage</span>
    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    <span>Response</span>
  </div>
`;

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
}): ProjectStep => ({
  slug: options.slug,
  stageId: options.stageId,
  title: `Feature ${options.featureNumber}: ${options.navLabel}`,
  navLabel: `Feature ${options.featureNumber}: ${options.navLabel}`,
  intro: options.intro,
  sidebarSummary: options.concept,
  headerNote: `This page covers one feature only. Keep the implementation sequence strict and finish this feature cleanly before moving on.`,
  paceLabel: `Feature ${options.featureNumber} of 11`,
  deliverable: options.deliverable,
  learningGoals: [
    `Understand what ${options.navLabel.toLowerCase()} adds to the system`,
    'Identify the files involved and the role of each one',
    'Use the generic references without turning them into a copy-paste solution'
  ],
  contentHtml:
    section(
      'What you are building on this page',
      paragraph(
        options.intro,
        `The core idea here is <strong>${options.concept}</strong>. The class should be able to describe that purpose clearly before touching the real project code.`
      ),
      'lead'
    ) +
    keywordTable(featureVocabulary[options.featureNumber] || []) +
    referenceList('Reference notes', getFeatureReferences(options.featureNumber, options.track || 'sql')) +
    callout('System flow', flowStrip, 'soft') +
    codeBlock(options.snippetTitle, options.snippetCode, 'text') +
    section(
      'Work by file',
      dataTable(
        ['File or area', 'Why this file matters', 'What belongs in this feature'],
        options.files.map((row) => row as string[])
      ),
      'table'
    ) +
    completionBlock(options.buildChecklist)
});

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
    intro: `${options.intro} This is the JSON-track equivalent of the SQL build, so the interface behaviour stays aligned while the storage model changes.`,
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
    title: 'Implementation Foundations',
    summary: 'Understand the project structure and the roles of HTML, JavaScript, Flask, and SQL.'
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
    intro: 'Turn the brief into visible planning decisions before touching tables or code. This page is about interface intent, not implementation.',
    sidebarSummary: 'Wireframes, screen planning, field mapping, and planning decisions.',
    deliverable: 'Annotated wireframes',
    learningGoals: [
      'Read wireframes as design decisions rather than decoration',
      'Map inputs and outputs from the brief onto a screen layout',
      'Decide what needs to appear on the first version of the interface'
    ],
    contentHtml:
      section(
        'What this planning page is for',
        paragraph(
          'This page turns the brief into visible planning decisions before any real implementation begins.',
          'The wireframes are not final UI designs. They are planning documents used to decide what the first version of the system actually needs.'
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
    intro: 'Before you build tables, start with messy data and improve it. The goal is to see why relational design exists at all.',
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
    intro: 'Now sketch the actual tables. This page is for naming fields, choosing data types, and checking whether example values make sense.',
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
        'What this page is for',
        paragraph(
          'This page is where the first proper table definitions are drafted. Name fields carefully, choose sensible data types, and test your thinking with example values before drawing the ERD.',
          'The aim is not to produce the final schema instantly. The aim is to make the database ideas explicit and easy to review.'
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
          'Reference notes',
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
        'What this page is for',
        paragraph(
          'The ERD turns separate table ideas into one coherent data model. Each relationship should represent a real business rule from the task-tracking system.',
          'At this stage the class should be able to explain the relationships aloud before drawing them formally.'
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
        'What this page is for',
        paragraph(
          'The test table is created before feature work so that evaluation is built into the project rather than added afterwards.',
          'Every important behaviour in the final system should be traceable back to a clear test row.'
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
    title: 'Implementation Foundations',
    navLabel: 'Implementation foundations',
    intro: 'Before feature work starts, understand the overall architecture. Students should know what each technology is doing and why the files are separated.',
    sidebarSummary: 'Directory structure, technology roles, request flow, and coding expectations.',
    deliverable: 'Annotated project structure',
    learningGoals: [
      'Explain the role of HTML, JavaScript, Flask, and SQL in the project',
      'Understand why the project is split into folders',
      'Read the full-stack request flow in sequence'
    ],
    contentHtml:
      section(
        'What this page is for',
        paragraph(
          'Before any feature implementation begins, the class needs a clear picture of the project architecture and the purpose of each file.',
          'This page is not about writing code. It is about understanding how HTML, JavaScript, Flask, and SQL cooperate in one application.'
        ),
        'lead'
      ) +
      keywordTable([
        ['Template', 'An HTML page rendered for the browser.'],
        ['Static JavaScript', 'Client-side code that runs in the browser.'],
        ['Route', 'A backend endpoint that handles a request.'],
        ['Request cycle', 'The path from browser action to stored response and back again.']
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
      callout('System flow', flowStrip, 'soft') +
      codeBlock(
        'Generic structure sketch',
        `project/\n  app.py\n  schema.sql\n  templates/\n    index.html\n  static/\n    js/\n      app.js`,
        'text'
      ) +
      completionBlock([
        'The class can explain the role of each major folder and file.',
        'Everyone can describe the request cycle from browser action to database response.',
        'The separation between interface, behaviour, backend logic, and storage is understood before feature work starts.'
      ], 'What should be secure before Feature 1')
  },
  featureStep({
    slug: 'feature-1-structure',
    stageId: 'sql-stage-4',
    featureNumber: 1,
    navLabel: 'Project directory structure',
    intro: 'Create the file and folder skeleton so the project has a stable shape before you write behaviours.',
    concept: 'Separation of concerns and predictable naming.',
    snippetTitle: 'Generic pattern',
    snippetCode: `app.py -> application entry point\ntemplates/index.html -> page structure\nstatic/js/app.js -> browser logic\nschema.sql -> database definition`,
    files: [
      ['Project root', 'Holds the main app entry and setup files', 'Create only the folders you can explain'],
      ['templates/', 'Stores browser-facing structure', 'Add the initial page template'],
      ['static/js/', 'Stores client-side behaviour', 'Prepare a single main script file'],
      ['schema.sql', 'Describes the database structure conceptually', 'Keep it separate from app logic']
    ],
    buildChecklist: [
      'Folder names are clear and consistent.',
      'Each file has one obvious purpose.',
      'The structure matches the full-stack flow explained on the previous page.'
    ],
    prompts: [
      'Which folder would change if you redesign the layout but not the database?',
      'Which file would change if you add a new button click handler?',
      'Why is a good directory structure really a readability feature?'
    ],
    deliverable: 'Folder skeleton'
  }),
  featureStep({
    slug: 'feature-2-html-shell',
    stageId: 'sql-stage-4',
    featureNumber: 2,
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
    deliverable: 'Page shell'
  }),
  featureStep({
    slug: 'feature-3-task-list',
    stageId: 'sql-stage-4',
    featureNumber: 3,
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
    deliverable: 'Render container'
  }),
  featureStep({
    slug: 'feature-4-modal',
    stageId: 'sql-stage-4',
    featureNumber: 4,
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
    deliverable: 'Modal interface'
  }),
  featureStep({
    slug: 'feature-5-form-inputs',
    stageId: 'sql-stage-4',
    featureNumber: 5,
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
    deliverable: 'Complete input form'
  }),
  featureStep({
    slug: 'feature-6-read-render',
    stageId: 'sql-stage-4',
    featureNumber: 6,
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
    deliverable: 'Readable list view'
  }),
  featureStep({
    slug: 'feature-7-create-record',
    stageId: 'sql-stage-4',
    featureNumber: 7,
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
    deliverable: 'Working create flow'
  }),
  featureStep({
    slug: 'feature-8-delete-record',
    stageId: 'sql-stage-4',
    featureNumber: 8,
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
    deliverable: 'Working delete action'
  }),
  featureStep({
    slug: 'feature-9-update-status',
    stageId: 'sql-stage-4',
    featureNumber: 9,
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
    deliverable: 'Persisted status update'
  }),
  featureStep({
    slug: 'feature-10-filter-sort',
    stageId: 'sql-stage-4',
    featureNumber: 10,
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
    deliverable: 'Searchable task list'
  }),
  featureStep({
    slug: 'feature-11-evaluation-check',
    stageId: 'sql-stage-4',
    featureNumber: 11,
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
    deliverable: 'Evidence-based evaluation'
  }),
  {
    slug: 'tagging-algorithm',
    stageId: 'sql-stage-5',
    title: 'Tagging Algorithm Design',
    navLabel: 'Tagging algorithm',
    intro: 'Only add the non-standard algorithm after the core app works. This page is about logic first, code second.',
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
        'What this extension is for',
        paragraph(
          'The original SQL model was deliberately kept simple. Once tagging is introduced, the database must grow in a controlled way rather than collapsing tags into one repeated text field.',
          'This extension is where many-to-many thinking and junction tables become essential.'
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
    intro: 'Use small, generic Python examples to understand how JSON is loaded, changed, and saved. This page is intentionally separate from the real project code.',
    sidebarSummary: 'Read, update, append, and save JSON in controlled examples.',
    deliverable: 'JSON experiment notes',
    learningGoals: [
      'Read a JSON file into a Python structure',
      'Update nested values safely',
      'Understand why file write logic needs care'
    ],
    contentHtml:
      section(
        'What this page is for',
        paragraph(
          'This page uses small generic examples so the class can focus on how Python reads, edits, and rewrites JSON data.',
          'It is intentionally separate from the real project code. The point is to understand the storage model first.'
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
    intro: 'Compare the same task system in two shapes: a relational model and a document model. The goal is not preference; the goal is reasoning.',
    sidebarSummary: 'Model A vs Model B for the same task-tracking problem.',
    deliverable: 'Model comparison notes',
    learningGoals: [
      'Describe the same system using two storage models',
      'Recognise where nesting helps and where it hurts',
      'Explain trade-offs instead of reciting buzzwords'
    ],
    contentHtml:
      section(
        'What this comparison is for',
        paragraph(
          'The same task-tracking system can be represented in more than one storage model. This page compares those representations so the design trade-offs stay explicit.',
          'This is the one place where the HL modelling comparison is explored directly before the parallel build begins.'
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
    intro: 'The UI stays familiar, but the storage model changes. This page makes that boundary explicit before feature work starts.',
    sidebarSummary: 'How the JSON-backed track differs from the SQL-backed track.',
    deliverable: 'Annotated JSON-track structure',
    learningGoals: [
      'Keep the user experience aligned with the SQL version',
      'Understand where the storage model changes the backend logic',
      'Explain the role of `data/*.json` in the project structure'
    ],
    contentHtml:
      section(
        'What this page is for',
        paragraph(
          'The frontend should remain recognisably the same while the storage model changes from SQL to JSON. That makes the comparison between tracks honest and useful.',
          'This page defines the architectural boundary before the JSON feature sequence begins.'
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
