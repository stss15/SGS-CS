(() => {
    let assessmentData = null;
    let questions = [];
    let testName = 'Assessment';
    let runtimeReady = false;
    let runtimeError = null;

    let startTime;
    let timerInterval;
    let timeTakenStr = '';
    let teacherName = '';
    let totalAttempts = 0;
    let assessmentFinished = false;

    const mistakeCounts = {};
    const completed = {};
    const selections = {};
    const matchedPairs = {};
    const selectedDef = {};
    const selectedTerm = {};
    const tfSelections = {};

    function initRuntime(data) {
        assessmentData = data;
        questions = Array.isArray(data.questions) ? data.questions : [];
        testName = data.title || 'Assessment';

        Object.keys(mistakeCounts).forEach((key) => delete mistakeCounts[key]);
        Object.keys(completed).forEach((key) => delete completed[key]);
        Object.keys(selections).forEach((key) => delete selections[key]);
        Object.keys(matchedPairs).forEach((key) => delete matchedPairs[key]);
        Object.keys(selectedDef).forEach((key) => delete selectedDef[key]);
        Object.keys(selectedTerm).forEach((key) => delete selectedTerm[key]);
        Object.keys(tfSelections).forEach((key) => delete tfSelections[key]);

        questions.forEach((question) => {
            mistakeCounts[question.id] = 0;
            completed[question.id] = false;
        });

        runtimeReady = true;
    }

    function ensureReady() {
        if (runtimeError) {
            alert('Assessment data failed to load.');
            return false;
        }
        if (!runtimeReady) {
            alert('Assessment data is loading. Please try again.');
            return false;
        }
        return true;
    }

    function loadAssessmentData() {
        const dataTag = document.getElementById('assessment-data');
        if (dataTag) {
            try {
                initRuntime(JSON.parse(dataTag.textContent));
            } catch (error) {
                runtimeError = error;
                console.error('Assessment runtime: invalid assessment data.', error);
            }
            return;
        }

        const dataUrl = document.body ? document.body.dataset.assessmentJson : '';
        if (!dataUrl) {
            console.warn('Assessment runtime: missing assessment data source.');
            runtimeError = new Error('Missing assessment data source.');
            return;
        }

        fetch(dataUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load assessment data (${response.status})`);
                }
                return response.json();
            })
            .then((data) => initRuntime(data))
            .catch((error) => {
                runtimeError = error;
                console.error('Assessment runtime: failed to load data.', error);
            });
    }

    function shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function normalizeType(type) {
        return (type || '').toLowerCase();
    }

    function initQuestions() {
        questions.forEach((question) => {
            const type = normalizeType(question.type);
            if (type === 'match') {
                initMatch(question);
            } else if (type === 'drag') {
                initDrag(question);
            } else if (type === 'order' || type === 'sortable') {
                initOrder(question);
            } else if (type === 'mcq') {
                initMCQ(question);
            } else if (type === 'dropdown' || type === 'select') {
                initDropdown(question);
            } else if (type === 'truefalse' || type === 'true-false' || type === 'tf') {
                initTrueFalse(question);
            }
        });
    }

    function initMatch(question) {
        const defs = question.defs || [];
        const terms = question.terms || [];
        const defsContainerId = question.defsContainerId || `col-defs-${question.id}`;
        const termsContainerId = question.termsContainerId || `col-terms-${question.id}`;
        const defsContainer =
            document.getElementById(defsContainerId) ||
            (!question.defsContainerId ? document.getElementById('col-defs') : null);
        const termsContainer =
            document.getElementById(termsContainerId) ||
            (!question.termsContainerId ? document.getElementById('col-terms') : null);
        if (!defsContainer || !termsContainer) return;

        defsContainer.innerHTML = '';
        termsContainer.innerHTML = '';
        shuffle(defs).forEach((item) => {
            const div = document.createElement('div');
            div.className = 'match-def';
            div.dataset.id = item.id;
            div.textContent = item.text;
            div.onclick = () => selectDef(div, question.id);
            defsContainer.appendChild(div);
        });

        shuffle(terms).forEach((item) => {
            const div = document.createElement('div');
            div.className = 'match-term';
            div.dataset.id = item.id;
            div.textContent = item.text;
            div.onclick = () => selectTerm(div, question.id);
            termsContainer.appendChild(div);
        });
    }

    function initDrag(question) {
        const items = question.items || [];
        const source = document.getElementById(`${question.id}-source`);
        if (!source) return;

        shuffle(items).forEach((item) => {
            const div = document.createElement('div');
            div.className = 'drag-item';
            div.draggable = true;
            div.id = item.id;
            div.textContent = item.text;
            div.dataset.correct = item.correct;
            div.ondragstart = drag;
            source.appendChild(div);
        });
    }

    function normalizeSteps(steps) {
        return (steps || []).map((step) => {
            if (typeof step === 'string') {
                return { id: step, text: step };
            }
            return step;
        });
    }

    function initOrder(question) {
        const steps = normalizeSteps(question.steps || []);
        const listId = question.listId || `${question.id}-list`;
        const list = document.getElementById(listId);
        if (!list) return;

        list.innerHTML = '';
        const iconClass = question.iconClass || 'fa-solid fa-bars';
        const iconPosition = question.iconPosition || 'before';
        const ordered = question.shuffle === false ? [...steps] : shuffle(steps);

        ordered.forEach((step) => {
            const li = document.createElement('li');
            li.className = 'sortable-item';
            li.draggable = true;
            li.dataset.id = step.id;
            const iconHtml = `<i class="${iconClass}"></i>`;
            const textHtml = `<span>${step.text}</span>`;
            li.innerHTML = iconPosition === 'after' ? `${textHtml} ${iconHtml}` : `${iconHtml} ${textHtml}`;
            li.ondragstart = dragList;
            li.ondragover = allowDropList;
            li.ondrop = dropList;
            list.appendChild(li);
        });
    }

    function initMCQ(question) {
        const options = (question.options || []).map((opt) =>
            typeof opt === 'string' ? { value: opt, correct: false } : opt
        );
        const container = document.getElementById(`${question.id}-options`);
        if (!container) return;

        container.innerHTML = '';
        shuffle(options).forEach((option) => {
            const div = document.createElement('div');
            div.className = 'mcq-option';
            div.dataset.value = option.value;
            div.dataset.correct = option.correct;
            div.innerHTML = `<div class="mcq-radio"></div><span>${option.value}</span>`;
            div.onclick = () => selectMCQ(question.id, option.value);
            container.appendChild(div);
        });
    }

    function resolveSelectOptions(question, select) {
        if (Array.isArray(select.options)) return select.options;
        const optionKey = select.optionSet || select.options;
        if (typeof optionKey === 'string' && question.optionSets) {
            const optionSet = question.optionSets[optionKey];
            if (Array.isArray(optionSet)) return optionSet;
        }
        return [];
    }

    function initDropdown(question) {
        const selects = question.selects || [];
        const shuffleOptions = question.shuffleOptions !== false;
        selects.forEach((select) => {
            const element = document.getElementById(select.id);
            if (!element) return;
            const options = resolveSelectOptions(question, select);
            const ordered = select.shuffle === false || !shuffleOptions ? [...options] : shuffle(options);
            element.innerHTML = '';
            const placeholder = select.placeholder || question.placeholder || '---';
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = placeholder;
            element.appendChild(defaultOption);
            ordered.forEach((opt) => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                element.appendChild(option);
            });
        });
    }

    function resolveTFContainer(question) {
        if (question.containerId) {
            return document.getElementById(question.containerId);
        }
        const grid = document.getElementById(`${question.id}-grid`);
        if (grid) return grid;
        return document.getElementById(`${question.id}-tbody`);
    }

    function initTrueFalse(question) {
        const statements = question.statements || [];
        const container = resolveTFContainer(question);
        if (!container) return;
        const layout = normalizeType(question.layout || question.mode || question.variant);
        const isTable = layout === 'table' || container.tagName === 'TBODY';
        const ordered = question.shuffle === false ? [...statements] : shuffle(statements);
        const labels = question.optionLabels || ['True', 'False'];

        if (isTable) {
            container.innerHTML = '';
            ordered.forEach((statement) => {
                const tr = document.createElement('tr');
                tr.dataset.id = statement.id;
                tr.dataset.correct = String(statement.correct);
                tr.innerHTML = `
                    <td>${statement.text}</td>
                    <td><input type="radio" name="${statement.id}" value="true"></td>
                    <td><input type="radio" name="${statement.id}" value="false"></td>
                `;
                container.appendChild(tr);
            });
            return;
        }

        container.querySelectorAll('.tf-row').forEach((row) => row.remove());
        ordered.forEach((statement) => {
            const row = document.createElement('div');
            row.className = 'tf-row';
            row.dataset.id = statement.id;
            const statementDiv = document.createElement('div');
            statementDiv.className = 'tf-statement';
            statementDiv.textContent = statement.text;
            const trueOption = document.createElement('div');
            trueOption.className = 'tf-option';
            trueOption.textContent = labels[0] ?? 'True';
            trueOption.onclick = () => selectTF(question.id, statement.id, true, trueOption);
            const falseOption = document.createElement('div');
            falseOption.className = 'tf-option';
            falseOption.textContent = labels[1] ?? 'False';
            falseOption.onclick = () => selectTF(question.id, statement.id, false, falseOption);
            row.appendChild(statementDiv);
            row.appendChild(trueOption);
            row.appendChild(falseOption);
            container.appendChild(row);
        });
    }

    function startAssessment() {
        if (!ensureReady()) return;
        const teacherSelect = document.getElementById('teacherSelect');
        const teacher = teacherSelect ? teacherSelect.value : '';
        if (!teacher) {
            alert('Please select your teacher.');
            return;
        }
        teacherName = teacher;
        const overlay = document.getElementById('startOverlay');
        if (overlay) overlay.style.display = 'none';
        const main = document.querySelector('main');
        if (main) main.style.display = 'block';
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) timerDisplay.style.display = 'block';
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
        initQuestions();
    }

    function updateTimer() {
        const now = new Date();
        const diff = Math.floor((now - startTime) / 1000);
        const minutes = Math.floor(diff / 60).toString().padStart(2, '0');
        const seconds = (diff % 60).toString().padStart(2, '0');
        const timer = document.getElementById('timer');
        if (timer) timer.textContent = `${minutes}:${seconds}`;
        timeTakenStr = `${minutes}m ${seconds}s`;
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        event.dataTransfer.setData('text', event.target.id);
    }

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        const element = document.getElementById(data);
        if (!element) return;
        if (
            event.target.classList.contains('bucket') ||
            event.target.classList.contains('draggable-source')
        ) {
            event.target.appendChild(element);
        } else if (event.target.closest('.bucket')) {
            event.target.closest('.bucket').appendChild(element);
        }
    }

    function selectDef(element, qId) {
        if (element.classList.contains('match-solved')) return;
        if (selectedDef[qId]) selectedDef[qId].classList.remove('match-selected');
        selectedDef[qId] = element;
        element.classList.add('match-selected');
        checkMatch(qId);
    }

    function selectTerm(element, qId) {
        if (element.classList.contains('match-solved')) return;
        if (selectedTerm[qId]) selectedTerm[qId].classList.remove('match-selected');
        selectedTerm[qId] = element;
        element.classList.add('match-selected');
        checkMatch(qId);
    }

    function checkMatch(qId) {
        if (!matchedPairs[qId]) matchedPairs[qId] = [];
        if (selectedDef[qId] && selectedTerm[qId]) {
            selectedDef[qId].classList.remove('match-selected');
            selectedTerm[qId].classList.remove('match-selected');
            selectedDef[qId].classList.add('match-paired');
            selectedTerm[qId].classList.add('match-paired');
            matchedPairs[qId] = matchedPairs[qId].filter(
                (pair) => pair.def !== selectedDef[qId] && pair.term !== selectedTerm[qId]
            );
            matchedPairs[qId].push({
                def: selectedDef[qId],
                term: selectedTerm[qId],
                defId: selectedDef[qId].dataset.id,
                termId: selectedTerm[qId].dataset.id
            });
            selectedDef[qId] = null;
            selectedTerm[qId] = null;
        }
    }

    let draggedItem = null;
    function dragList() {
        draggedItem = this;
        setTimeout(() => {
            this.style.display = 'none';
        }, 0);
    }
    function allowDropList(event) {
        event.preventDefault();
    }
    function dropList(event) {
        event.preventDefault();
        if (this !== draggedItem) {
            const items = Array.from(
                document.querySelectorAll(`#${this.parentNode.id} .sortable-item`)
            );
            const draggedIndex = items.indexOf(draggedItem);
            const droppedIndex = items.indexOf(this);
            if (draggedIndex < droppedIndex) {
                this.parentNode.insertBefore(draggedItem, this.nextSibling);
            } else {
                this.parentNode.insertBefore(draggedItem, this);
            }
        }
        draggedItem.style.display = 'flex';
    }

    function selectMCQ(qId, value) {
        document.querySelectorAll(`#${qId}-options .mcq-option`).forEach((option) => {
            option.classList.remove('selected');
        });
        const selected = document.querySelector(
            `#${qId}-options .mcq-option[data-value="${value}"]`
        );
        if (selected) selected.classList.add('selected');
        selections[qId] = value;
    }

    function selectTF(qId, statementId, value, element) {
        if (completed[qId]) return;
        const row = element.closest('.tf-row');
        if (row) {
            row.querySelectorAll('.tf-option').forEach((opt) => {
                opt.classList.remove('selected', 'correct', 'wrong');
            });
        }
        element.classList.add('selected');
        if (!tfSelections[qId]) tfSelections[qId] = {};
        tfSelections[qId][statementId] = value;
    }

    function checkAnswers() {
        if (!ensureReady()) return;
        totalAttempts++;
        let allCorrect = true;

        questions.forEach((question) => {
            let isCorrect = true;
            const type = normalizeType(question.type);
            if (type === 'match') {
                isCorrect = checkMatchQuestion(question);
            } else if (type === 'drag') {
                isCorrect = checkDragQuestion(question);
            } else if (type === 'order' || type === 'sortable') {
                isCorrect = checkOrderQuestion(question);
            } else if (type === 'mcq') {
                isCorrect = checkMCQQuestion(question);
            } else if (type === 'dropdown' || type === 'select') {
                isCorrect = checkDropdownQuestion(question);
            } else if (type === 'truefalse' || type === 'true-false' || type === 'tf') {
                isCorrect = checkTrueFalseQuestion(question);
            } else if (type === 'numeric' || type === 'number') {
                isCorrect = checkNumericQuestion(question);
            }
            if (!isCorrect) allCorrect = false;
        });

        if (allCorrect && !assessmentFinished) {
            assessmentFinished = true;
            clearInterval(timerInterval);
            const btnSubmit = document.getElementById('btnSubmit');
            if (btnSubmit) btnSubmit.style.display = 'none';
            const btnReturn = document.getElementById('btnReturn');
            if (btnReturn) btnReturn.style.display = 'inline-block';
            const completionMessage = document.getElementById('completionMessage');
            if (completionMessage) completionMessage.style.display = 'block';
            const finalScore = document.getElementById('finalScore');
            if (finalScore) {
                finalScore.textContent = `Attempts: ${totalAttempts} | Time: ${timeTakenStr}`;
                finalScore.style.display = 'block';
            }
            generatePDF();
        }
    }

    function checkMatchQuestion(question) {
        let correct = true;
        const pairs = matchedPairs[question.id] || [];
        const expectedCount = question.defs ? question.defs.length : pairs.length;
        if (pairs.length !== expectedCount) {
            correct = false;
        } else {
            pairs.forEach((pair) => {
                if (pair.defId !== pair.termId) correct = false;
            });
        }
        if (correct) {
            markCorrect(question.id);
            pairs.forEach((pair) => {
                pair.def.classList.remove('match-paired');
                pair.term.classList.remove('match-paired');
                pair.def.classList.add('match-solved');
                pair.term.classList.add('match-solved');
            });
        } else {
            markWrong(question.id);
        }
        return correct;
    }

    function checkDragQuestion(question) {
        let correct = true;
        const items = question.items || [];
        const buckets = question.buckets || [...new Set(items.map((item) => item.correct))];
        const hasExpectedRemaining = Object.prototype.hasOwnProperty.call(
            question,
            'expectedRemaining'
        );

        buckets.forEach((bucketId) => {
            const bucket = document.getElementById(`bucket-${bucketId}`);
            if (!bucket) return;
            Array.from(bucket.children).forEach((child) => {
                if (child.classList.contains('drag-item') && child.dataset.correct !== bucketId) {
                    correct = false;
                }
            });
        });

        const source = document.getElementById(`${question.id}-source`);
        if (source) {
            const remaining = source.children.length;
            if (hasExpectedRemaining) {
                if (remaining !== question.expectedRemaining) correct = false;
            } else if (remaining > 0) {
                correct = false;
            }
        }

        if (correct) {
            markCorrect(question.id);
            const containers = buckets
                .map((bucketId) => document.getElementById(`bucket-${bucketId}`))
                .filter(Boolean);
            lockDragItems(containers);
        } else {
            markWrong(question.id);
        }
        return correct;
    }

    function checkOrderQuestion(question) {
        let correct = true;
        const steps = normalizeSteps(question.steps || []);
        const expectedOrder = question.correctOrder || steps.map((step) => step.id);
        const listId = question.listId || `${question.id}-list`;
        const items = document.querySelectorAll(`#${listId} .sortable-item`);
        items.forEach((item, index) => {
            if (item.dataset.id !== expectedOrder[index]) correct = false;
        });
        if (correct) {
            markCorrect(question.id);
            items.forEach((item) => {
                item.classList.remove('wrong');
                item.classList.add('correct');
            });
        } else {
            markWrong(question.id);
            items.forEach((item) => {
                item.classList.remove('correct');
                item.classList.add('wrong');
            });
        }
        return correct;
    }

    function checkMCQQuestion(question) {
        const selection = selections[question.id];
        const correctOption = (question.options || []).find((opt) => opt.correct);
        if (selection && correctOption && selection === correctOption.value) {
            const node = document.querySelector(
                `#${question.id}-options .mcq-option[data-value="${selection}"]`
            );
            if (node) node.classList.add('correct');
            markCorrect(question.id);
            return true;
        }
        if (selection) {
            const node = document.querySelector(
                `#${question.id}-options .mcq-option[data-value="${selection}"]`
            );
            if (node) node.classList.add('wrong');
        }
        markWrong(question.id);
        return false;
    }

    function checkDropdownQuestion(question) {
        const selects = question.selects || [];
        let correct = true;
        selects.forEach((select) => {
            const element = document.getElementById(select.id);
            if (!element) {
                console.warn('Assessment runtime: missing dropdown element.', question.id, select.id);
                correct = false;
                return;
            }
            const expected =
                select.answer ??
                (question.answers ? question.answers[select.id] : undefined) ??
                (element.dataset.answer || undefined);
            if (expected === undefined) {
                console.warn('Assessment runtime: missing dropdown answer.', question.id, select.id);
                correct = false;
                return;
            }
            if (element.value === expected) {
                element.classList.add('correct');
                element.classList.remove('wrong');
            } else {
                element.classList.add('wrong');
                element.classList.remove('correct');
                if (select.resetOnWrong || question.resetOnWrong) {
                    element.value = '';
                }
                correct = false;
            }
        });
        if (correct) {
            markCorrect(question.id);
        } else {
            markWrong(question.id);
        }
        return correct;
    }

    function checkTrueFalseQuestion(question) {
        const statements = question.statements || [];
        const container = resolveTFContainer(question);
        if (!container) {
            console.warn('Assessment runtime: missing true/false container.', question.id);
            markWrong(question.id);
            return false;
        }
        const layout = normalizeType(question.layout || question.mode || question.variant);
        const isTable = layout === 'table' || container.tagName === 'TBODY';
        let correct = true;

        if (isTable) {
            const answerMap = statements.reduce((acc, statement) => {
                acc[statement.id] = statement.correct;
                return acc;
            }, {});
            container.querySelectorAll('tr').forEach((row) => {
                row.classList.remove('correct-row', 'wrong-row');
                const rowId = row.dataset.id;
                let expected = answerMap[rowId];
                if (expected === undefined && row.dataset.correct !== undefined) {
                    expected = row.dataset.correct === 'true';
                }
                const selected = row.querySelector('input[type="radio"]:checked');
                const selectionValue = selected ? selected.value === 'true' : undefined;
                if (expected === undefined || selectionValue !== expected) {
                    correct = false;
                    row.classList.add('wrong-row');
                } else {
                    row.classList.add('correct-row');
                }
            });
        } else {
            const selectionsForQuestion = tfSelections[question.id] || {};
            const answerMap = statements.reduce((acc, statement) => {
                acc[statement.id] = statement.correct;
                return acc;
            }, {});
            statements.forEach((statement) => {
                const row = container.querySelector(`.tf-row[data-id="${statement.id}"]`);
                if (!row) {
                    correct = false;
                    return;
                }
                const options = row.querySelectorAll('.tf-option');
                options.forEach((opt) => opt.classList.remove('correct', 'wrong'));
                const selected = selectionsForQuestion[statement.id];
                const expected = answerMap[statement.id];
                if (selected === expected) {
                    if (selected !== undefined) {
                        options[selected ? 0 : 1].classList.add('correct');
                    }
                } else {
                    correct = false;
                    if (selected !== undefined) {
                        options[selected ? 0 : 1].classList.add('wrong');
                        if (question.resetOnWrong) {
                            options.forEach((opt) => opt.classList.remove('selected'));
                            delete selectionsForQuestion[statement.id];
                        }
                    }
                }
            });
        }

        if (correct) {
            markCorrect(question.id);
        } else {
            markWrong(question.id);
        }
        return correct;
    }

    function checkNumericQuestion(question) {
        const inputs = question.inputs || [];
        const answers = question.answers || {};
        const tolerance = question.tolerance || 0;
        let correct = true;

        inputs.forEach((input) => {
            const element = document.getElementById(input.id);
            if (!element) {
                console.warn('Assessment runtime: missing numeric input.', question.id, input.id);
                correct = false;
                return;
            }
            const expectedRaw =
                input.answer ??
                (answers ? answers[input.id] : undefined) ??
                (element.dataset.answer ? Number(element.dataset.answer) : undefined);
            if (expectedRaw === undefined) {
                console.warn('Assessment runtime: missing numeric answer.', question.id, input.id);
                correct = false;
                return;
            }
            const expected = Number(expectedRaw);
            const value = element.value === '' ? NaN : Number(element.value);
            if (Number.isNaN(value) || Math.abs(value - expected) > tolerance) {
                element.classList.add('wrong');
                element.classList.remove('correct');
                correct = false;
            } else {
                element.classList.add('correct');
                element.classList.remove('wrong');
            }
        });

        if (correct) {
            markCorrect(question.id);
        } else {
            markWrong(question.id);
        }
        return correct;
    }

    function markCorrect(qId) {
        if (!completed[qId]) {
            completed[qId] = true;
            const status = document.getElementById(`${qId}-status`);
            if (status) {
                status.textContent = 'Correct';
                status.className = 'q-status correct';
            }
            const block = document.getElementById(`${qId}-block`);
            if (block) block.style.borderLeftColor = 'var(--correct-green)';
        }
    }

    function markWrong(qId) {
        if (!completed[qId]) {
            mistakeCounts[qId]++;
            const status = document.getElementById(`${qId}-status`);
            if (status) {
                status.textContent = 'Incorrect';
                status.className = 'q-status wrong';
            }
        }
    }

    function lockDragItems(containers) {
        containers.forEach((container) => {
            Array.from(container.children).forEach((child) => {
                if (child.classList.contains('drag-item')) {
                    child.draggable = false;
                    child.classList.add('locked');
                }
            });
        });
    }

    function formatAnswer(question) {
        if (question.correctAnswer !== undefined) return question.correctAnswer;
        const type = normalizeType(question.type);
        if (type === 'mcq') {
            const correctOpt = (question.options || []).find((opt) => opt.correct);
            return correctOpt ? correctOpt.value : '';
        }
        if (type === 'order' || type === 'sortable') {
            return normalizeSteps(question.steps || []).map((step) => step.text);
        }
        if (type === 'match') {
            const terms = question.terms || [];
            const map = {};
            terms.forEach((term) => {
                map[term.id] = term.text;
            });
            return map;
        }
        if (type === 'dropdown' || type === 'select') {
            if (question.answers) return question.answers;
            const map = {};
            (question.selects || []).forEach((select) => {
                if (select.answer !== undefined) map[select.id] = select.answer;
            });
            return map;
        }
        if (type === 'numeric' || type === 'number') {
            if (question.answers) return question.answers;
            const map = {};
            (question.inputs || []).forEach((input) => {
                if (input.answer !== undefined) map[input.id] = input.answer;
            });
            return map;
        }
        if (type === 'truefalse' || type === 'true-false' || type === 'tf') {
            const map = {};
            (question.statements || []).forEach((statement) => {
                map[statement.id] = statement.correct;
            });
            return map;
        }
        return '';
    }

    async function generatePDF() {
        if (!window.jspdf || !window.jspdf.jsPDF) return;
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.setTextColor(0, 51, 102);
        doc.text(testName, 20, 20);
        doc.setFontSize(12);
        doc.setTextColor(50);
        doc.text(`Teacher: ${teacherName}`, 20, 30);
        doc.text(`Time Taken: ${timeTakenStr}`, 20, 36);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42);

        let y = 60;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Correct Answers', 20, 52);
        doc.setFontSize(10);
        questions.forEach((question) => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            doc.setFont(undefined, 'bold');
            doc.text(`${question.id.toUpperCase()}: ${question.title}`, 20, y);
            y += 5;
            doc.setFont(undefined, 'normal');
            const answer = formatAnswer(question);
            let answerStr =
                typeof answer === 'object'
                    ? JSON.stringify(answer).replace(/\"/g, '').replace(/,/g, ', ')
                    : answer;
            const splitAns = doc.splitTextToSize(`Answer: ${answerStr}`, 170);
            doc.text(splitAns, 20, y);
            y += (splitAns.length * 5) + 5;
        });

        doc.addPage();
        doc.setFontSize(16);
        doc.text('Feedback & Reflection', 20, 20);
        let ty = 40;
        doc.setFontSize(10);
        doc.setFillColor(240, 240, 240);
        doc.rect(20, ty - 5, 170, 8, 'F');
        doc.text('Question', 25, ty);
        doc.text('Attempts', 80, ty);
        doc.text('Feedback Code', 130, ty);
        ty += 10;

        Object.keys(mistakeCounts).forEach((key) => {
            doc.text(key.toUpperCase(), 25, ty);
            doc.text((mistakeCounts[key] + 1).toString(), 85, ty);
            doc.rect(130, ty - 4, 30, 6);
            ty += 10;
        });

        ty += 10;
        doc.setFont(undefined, 'bold');
        doc.text('Feedback Codes: C=Content, E=Exam Tech, L=Language, T=Time, M=Misread', 20, ty);
        ty += 15;
        doc.setDrawColor(40, 167, 69);
        doc.rect(20, ty, 170, 40);
        doc.setTextColor(40, 167, 69);
        doc.text('Student Reflection:', 25, ty + 8);
        ty += 50;
        doc.setDrawColor(111, 66, 193);
        doc.rect(20, ty, 170, 40);
        doc.setTextColor(111, 66, 193);
        doc.text('Teacher Comment:', 25, ty + 8);

        const fileName = (assessmentData.id || testName).replace(/\\s+/g, '_');
        doc.save(`${fileName}_Feedback.pdf`);
    }

    loadAssessmentData();
    window.startAssessment = startAssessment;
    window.checkAnswers = checkAnswers;
    window.allowDrop = allowDrop;
    window.drop = drop;
})();
