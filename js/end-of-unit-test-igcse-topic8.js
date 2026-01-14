/**
 * Extracted from Topic8_End_of_unit_Test.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "Topic 8 End of Unit Test";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Variable vs Constant)
        const q1Items = [
            { id: 'v1', text: 'Score', correct: 'variable' },
            { id: 'v2', text: 'PlayerName', correct: 'variable' },
            { id: 'c1', text: 'PI', correct: 'constant' },
            { id: 'c2', text: 'TaxRate', correct: 'constant' }
        ];

        // Q2 Data (Data Types)
        const q2Defs = [
            { id: '1', text: '10' },
            { id: '2', text: '10.5' },
            { id: '3', text: '"Ten"' },
            { id: '4', text: 'TRUE' }
        ];
        const q2Terms = [
            { id: '1', text: 'Integer' },
            { id: '2', text: 'Real' },
            { id: '3', text: 'String' },
            { id: '4', text: 'Boolean' }
        ];

        // Q3 Data (Selection Logic)
        const q3Options = [
            { value: 'Small', correct: true },
            { value: 'Big', correct: false },
            { value: 'Error', correct: false },
            { value: 'Nothing', correct: false }
        ];
        let q3Selection = null;

        // Q4 Data (Loop Purpose)
        const q4Defs = [
            { id: '1', text: 'Fixed number of iterations' },
            { id: '2', text: 'Pre-condition check' },
            { id: '3', text: 'Post-condition check' }
        ];
        const q4Terms = [
            { id: '1', text: 'FOR Loop' },
            { id: '2', text: 'WHILE Loop' },
            { id: '3', text: 'REPEAT Loop' }
        ];

        // Q5 Data (Array Indexing)
        const q5Options = [
            { value: '20', correct: true },
            { value: '15', correct: false },
            { value: '10', correct: false },
            { value: '5', correct: false }
        ];
        let q5Selection = null;

        // Q6 Data (2D Array Concept)
        const q6Statements = [
            { id: 'st1', text: '2D arrays are like tables', correct: true },
            { id: 'st2', text: 'You need two indices to access an element', correct: true },
            { id: 'st3', text: 'All elements must be different types', correct: false }
        ];
        const q6State = { st1: null, st2: null, st3: null };

        // Q7 Data (Populating Array)
        const q7Steps = [
            { id: 's1', text: 'FOR i <- 0 TO 9' },
            { id: 's2', text: 'INPUT Arr[i]' },
            { id: 's3', text: 'NEXT i' }
        ];

        // Q8 Data (File Modes)
        const q8Options = [
            { value: 'WRITE', correct: true },
            { value: 'READ', correct: false },
            { value: 'APPEND', correct: false },
            { value: 'EDIT', correct: false }
        ];
        let q8Selection = null;

        // Q9 Data (File Operations)
        const q9Defs = [
            { id: '1', text: 'Start using a file' },
            { id: '2', text: 'Finish using a file' },
            { id: '3', text: 'Get data from file' },
            { id: '4', text: 'Save data to file' }
        ];
        const q9Terms = [
            { id: '1', text: 'OPEN' },
            { id: '2', text: 'CLOSE' },
            { id: '3', text: 'READ' },
            { id: '4', text: 'WRITE' }
        ];

        // Q10 Data (Algorithm Trace)
        const q10Options = [
            { value: '6', correct: true },
            { value: '3', correct: false },
            { value: '1', correct: false },
            { value: '0', correct: false }
        ];
        let q10Selection = null;

        const questionMeta = [
            { id: 'q1', title: 'Variable vs Constant', type: 'drag', correctAnswer: { variable: ['Score', 'PlayerName'], constant: ['PI', 'TaxRate'] } },
            { id: 'q2', title: 'Data Types', type: 'match', correctAnswer: { '1': 'Integer', '2': 'Real', '3': 'String', '4': 'Boolean' } },
            { id: 'q3', title: 'Selection Logic', type: 'mcq', correctAnswer: 'Small' },
            { id: 'q4', title: 'Loop Purpose', type: 'match', correctAnswer: { '1': 'FOR', '2': 'WHILE', '3': 'REPEAT' } },
            { id: 'q5', title: 'Array Indexing', type: 'mcq', correctAnswer: '20' },
            { id: 'q6', title: '2D Array Concept', type: 'tf', correctAnswer: { st1: true, st2: true, st3: false } },
            { id: 'q7', title: 'Populating Array', type: 'order', correctAnswer: ['For', 'Input', 'Next'] },
            { id: 'q8', title: 'File Modes', type: 'mcq', correctAnswer: 'WRITE' },
            { id: 'q9', title: 'File Operations', type: 'match', correctAnswer: { '1': 'OPEN', '2': 'CLOSE', '3': 'READ', '4': 'WRITE' } },
            { id: 'q10', title: 'Algorithm Trace', type: 'mcq', correctAnswer: '6' }
        ];

        // --- UTILITY ---
        function shuffle(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        // --- INIT ---
        function initQuestions() {
            initDrag('q1', q1Items);
            initMatch('q2', q2Defs, q2Terms);
            initMCQ('q3', q3Options);
            initMatch('q4', q4Defs, q4Terms);
            initMCQ('q5', q5Options);
            initTF('q6', q6Statements);
            initOrder('q7', q7Steps);
            initMCQ('q8', q8Options);
            initMatch('q9', q9Defs, q9Terms);
            initMCQ('q10', q10Options);
        }

        function initDrag(qId, items) {
            const source = document.getElementById(`${qId}-source`);
            shuffle(items).forEach(item => {
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

        function initMatch(qId, defs, terms) {
            const dContainer = document.getElementById(`col-defs-${qId}`);
            const tContainer = document.getElementById(`col-terms-${qId}`);
            shuffle(defs).forEach(d => {
                const div = document.createElement('div');
                div.className = 'match-def';
                div.dataset.id = d.id;
                div.textContent = d.text;
                div.onclick = () => selectDef(div, qId);
                dContainer.appendChild(div);
            });
            shuffle(terms).forEach(t => {
                const div = document.createElement('div');
                div.className = 'match-term';
                div.dataset.id = t.id;
                div.textContent = t.text;
                div.onclick = () => selectTerm(div, qId);
                tContainer.appendChild(div);
            });
        }

        function initOrder(qId, steps) {
            const list = document.getElementById(`${qId}-list`);
            shuffle(steps).forEach(step => {
                const li = document.createElement('li');
                li.className = 'sortable-item';
                li.draggable = true;
                li.dataset.id = step.id;
                li.innerHTML = `<i class="fa-solid fa-bars"></i> <span>${step.text}</span>`;
                li.ondragstart = dragList;
                li.ondragover = allowDropList;
                li.ondrop = dropList;
                list.appendChild(li);
            });
        }

        function initMCQ(qId, options) {
            const container = document.getElementById(`${qId}-options`);
            shuffle(options).forEach(opt => {
                const div = document.createElement('div');
                div.className = 'mcq-option';
                div.dataset.value = opt.value;
                div.dataset.correct = opt.correct;
                div.innerHTML = `<div class="mcq-radio"></div><span>${opt.value}</span>`;
                div.onclick = () => selectMCQ(qId, opt.value);
                container.appendChild(div);
            });
        }

        function initTF(qId, statements) {
            const grid = document.getElementById(`${qId}-grid`);
            statements.forEach(st => {
                const row = document.createElement('div');
                row.className = 'tf-row';
                row.innerHTML = `
                    <div class="tf-statement">${st.text}</div>
                    <div class="tf-option" onclick="selectTF('${qId}', '${st.id}', true, this)">True</div>
                    <div class="tf-option" onclick="selectTF('${qId}', '${st.id}', false, this)">False</div>
                `;
                grid.appendChild(row);
            });
        }

        // --- CORE LOGIC ---
        function startAssessment() {
            const teacher = document.getElementById('teacherSelect').value;
            if (!teacher) { alert("Please select your teacher."); return; }
            teacherName = teacher;
            document.getElementById('startOverlay').style.display = 'none';
            document.querySelector('main').style.display = 'block';
            document.getElementById('timerDisplay').style.display = 'block';
            startTime = new Date();
            timerInterval = setInterval(updateTimer, 1000);
            initQuestions();
        }

        function updateTimer() {
            const now = new Date();
            const diff = Math.floor((now - startTime) / 1000);
            const m = Math.floor(diff / 60).toString().padStart(2, '0');
            const s = (diff % 60).toString().padStart(2, '0');
            document.getElementById('timer').textContent = `${m}:${s}`;
            timeTakenStr = `${m}m ${s}s`;
        }

        // --- DRAG ---
        function allowDrop(ev) { ev.preventDefault(); }
        function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
        function drop(ev) {
            ev.preventDefault();
            const data = ev.dataTransfer.getData("text");
            const el = document.getElementById(data);
            if (ev.target.classList.contains('bucket') || ev.target.classList.contains('draggable-source')) {
                ev.target.appendChild(el);
            } else if (ev.target.closest('.bucket')) {
                ev.target.closest('.bucket').appendChild(el);
            }
        }

        // --- MATCHING ---
        let selectedDef = {};
        let selectedTerm = {};
        let matchedPairs = {};

        function selectDef(el, qId) {
            if (el.classList.contains('match-solved')) return;
            if (selectedDef[qId]) selectedDef[qId].classList.remove('match-selected');
            selectedDef[qId] = el;
            el.classList.add('match-selected');
            checkMatch(qId);
        }

        function selectTerm(el, qId) {
            if (el.classList.contains('match-solved')) return;
            if (selectedTerm[qId]) selectedTerm[qId].classList.remove('match-selected');
            selectedTerm[qId] = el;
            el.classList.add('match-selected');
            checkMatch(qId);
        }

        function checkMatch(qId) {
            if (!matchedPairs[qId]) matchedPairs[qId] = [];
            if (selectedDef[qId] && selectedTerm[qId]) {
                selectedDef[qId].classList.remove('match-selected');
                selectedTerm[qId].classList.remove('match-selected');
                selectedDef[qId].classList.add('match-paired');
                selectedTerm[qId].classList.add('match-paired');
                matchedPairs[qId] = matchedPairs[qId].filter(p => p.def !== selectedDef[qId] && p.term !== selectedTerm[qId]);
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

        // --- MCQ ---
        function selectMCQ(qId, value) {
            document.querySelectorAll(`#${qId}-options .mcq-option`).forEach(opt => {
                opt.classList.remove('selected');
            });
            const selected = document.querySelector(`#${qId}-options .mcq-option[data-value="${value}"]`);
            selected.classList.add('selected');
            if (qId === 'q3') q3Selection = value;
            if (qId === 'q5') q5Selection = value;
            if (qId === 'q8') q8Selection = value;
            if (qId === 'q10') q10Selection = value;
        }

        // --- TF ---
        function selectTF(qId, stId, val, el) {
            const row = el.parentNode;
            row.querySelectorAll('.tf-option').forEach(opt => opt.classList.remove('selected'));
            el.classList.add('selected');
            if (qId === 'q6') q6State[stId] = val;
        }

        // --- ORDERING ---
        let draggedItem = null;
        function dragList(e) { draggedItem = this; setTimeout(() => this.style.display = 'none', 0); }
        function allowDropList(e) { e.preventDefault(); }
        function dropList(e) {
            e.preventDefault();
            if (this !== draggedItem) {
                let allItems = Array.from(document.querySelectorAll(`#${this.parentNode.id} .sortable-item`));
                let draggedIdx = allItems.indexOf(draggedItem);
                let droppedIdx = allItems.indexOf(this);
                if (draggedIdx < droppedIdx) {
                    this.parentNode.insertBefore(draggedItem, this.nextSibling);
                } else {
                    this.parentNode.insertBefore(draggedItem, this);
                }
            }
            draggedItem.style.display = 'flex';
        }

        // --- CHECK ---
        function checkAnswers() {
            totalAttempts++;
            let allCorrect = true;

            if (!checkDragQuestion('q1', 'variable', 'constant')) allCorrect = false;
            if (!checkMatchQuestion('q2', 4)) allCorrect = false;
            if (!checkMCQQuestion('q3', q3Selection, q3Options)) allCorrect = false;
            if (!checkMatchQuestion('q4', 3)) allCorrect = false;
            if (!checkMCQQuestion('q5', q5Selection, q5Options)) allCorrect = false;
            if (!checkTFQuestion('q6', q6Statements)) allCorrect = false;
            if (!checkOrderQuestion('q7', ['s1', 's2', 's3'])) allCorrect = false;
            if (!checkMCQQuestion('q8', q8Selection, q8Options)) allCorrect = false;
            if (!checkMatchQuestion('q9', 4)) allCorrect = false;
            if (!checkMCQQuestion('q10', q10Selection, q10Options)) allCorrect = false;

            if (allCorrect && !assessmentFinished) {
                assessmentFinished = true;
                clearInterval(timerInterval);
                document.getElementById('btnSubmit').style.display = 'none';
                document.getElementById('btnReturn').style.display = 'inline-block';
                document.getElementById('completionMessage').style.display = 'block';
                document.getElementById('finalScore').textContent = `Attempts: ${totalAttempts} | Time: ${timeTakenStr}`;
                document.getElementById('finalScore').style.display = 'block';
                generatePDF();
            }
        }

        function checkDragQuestion(qId, ...buckets) {
            let correct = true;
            buckets.forEach(b => {
                const bucket = document.getElementById(`bucket-${b}`);
                Array.from(bucket.children).forEach(c => {
                    if (c.classList.contains('drag-item') && c.dataset.correct !== b) correct = false;
                });
            });
            if (document.getElementById(`${qId}-source`).children.length > 0) correct = false;

            if (correct) {
                markCorrect(qId);
                buckets.forEach(b => {
                    lockDragItems([document.getElementById(`bucket-${b}`)]);
                });
            } else {
                markWrong(qId);
            }
            return correct;
        }

        function checkMatchQuestion(qId, count) {
            let correct = true;
            const pairs = matchedPairs[qId] || [];
            if (pairs.length !== count) correct = false;
            else {
                pairs.forEach(p => { if (p.defId !== p.termId) correct = false; });
            }
            if (correct) {
                markCorrect(qId);
                pairs.forEach(p => {
                    p.def.classList.remove('match-paired');
                    p.term.classList.remove('match-paired');
                    p.def.classList.add('match-solved');
                    p.term.classList.add('match-solved');
                });
            } else {
                markWrong(qId);
            }
            return correct;
        }

        function checkMCQQuestion(qId, selection, options) {
            const correctOpt = options.find(o => o.correct);
            if (selection === correctOpt.value) {
                document.querySelector(`#${qId}-options .mcq-option[data-value="${selection}"]`).classList.add('correct');
                markCorrect(qId);
                return true;
            } else {
                if (selection) document.querySelector(`#${qId}-options .mcq-option[data-value="${selection}"]`).classList.add('wrong');
                markWrong(qId);
                return false;
            }
        }

        function checkOrderQuestion(qId, correctOrderIds) {
            let correct = true;
            const items = document.querySelectorAll(`#${qId}-list .sortable-item`);
            items.forEach((item, index) => {
                if (item.dataset.id !== correctOrderIds[index]) correct = false;
            });
            if (correct) {
                markCorrect(qId);
                items.forEach(i => i.classList.add('correct'));
            } else {
                markWrong(qId);
                items.forEach(i => i.classList.add('wrong'));
            }
            return correct;
        }

        function checkTFQuestion(qId, statements) {
            let correct = true;
            const rows = document.querySelectorAll(`#${qId}-grid .tf-row`);
            statements.forEach((st, idx) => {
                const row = rows[idx];
                const selected = q6State[st.id];
                if (selected !== st.correct) {
                    correct = false;
                    if (selected !== null) row.querySelectorAll('.tf-option')[selected ? 0 : 1].classList.add('wrong');
                } else {
                    row.querySelectorAll('.tf-option')[selected ? 0 : 1].classList.add('correct');
                }
            });
            if (correct) markCorrect(qId); else markWrong(qId);
            return correct;
        }

        function markCorrect(qId) {
            if (!completed[qId]) {
                completed[qId] = true;
                document.getElementById(`${qId}-status`).textContent = "Correct";
                document.getElementById(`${qId}-status`).className = "q-status correct";
                document.getElementById(`${qId}-block`).style.borderLeftColor = "var(--correct-green)";
            }
        }

        function markWrong(qId) {
            if (!completed[qId]) {
                mistakeCounts[qId]++;
                document.getElementById(`${qId}-status`).textContent = "Incorrect";
                document.getElementById(`${qId}-status`).className = "q-status wrong";
            }
        }

        function lockDragItems(containers) {
            containers.forEach(c => {
                Array.from(c.children).forEach(child => {
                    if (child.classList.contains('drag-item')) {
                        child.draggable = false;
                        child.classList.add('locked');
                    }
                });
            });
        }

        // --- PDF ---
        async function generatePDF() {
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
            doc.text("Correct Answers", 20, 52);
            doc.setFontSize(10);
            questionMeta.forEach(q => {
                if (y > 270) { doc.addPage(); y = 20; }
                doc.setFont(undefined, 'bold');
                doc.text(`${q.id.toUpperCase()}: ${q.title}`, 20, y);
                y += 5;
                doc.setFont(undefined, 'normal');
                let ansStr = typeof q.correctAnswer === 'object' ? JSON.stringify(q.correctAnswer).replace(/"/g, '').replace(/,/g, ', ') : q.correctAnswer;
                const splitAns = doc.splitTextToSize(`Answer: ${ansStr}`, 170);
                doc.text(splitAns, 20, y);
                y += (splitAns.length * 5) + 5;
            });

            doc.addPage();
            doc.setFontSize(16);
            doc.text("Feedback & Reflection", 20, 20);
            let ty = 40;
            doc.setFontSize(10);
            doc.setFillColor(240, 240, 240);
            doc.rect(20, ty - 5, 170, 8, 'F');
            doc.text("Question", 25, ty);
            doc.text("Attempts", 80, ty);
            doc.text("Feedback Code", 130, ty);
            ty += 10;

            Object.keys(mistakeCounts).forEach(q => {
                doc.text(q.toUpperCase(), 25, ty);
                doc.text((mistakeCounts[q] + 1).toString(), 85, ty);
                doc.rect(130, ty - 4, 30, 6);
                ty += 10;
            });

            ty += 10;
            doc.setFont(undefined, 'bold');
            doc.text("Feedback Codes: C=Content, E=Exam Tech, L=Language, T=Time, M=Misread", 20, ty);
            ty += 15;
            doc.setDrawColor(40, 167, 69);
            doc.rect(20, ty, 170, 40);
            doc.setTextColor(40, 167, 69);
            doc.text("Student Reflection:", 25, ty + 8);
            ty += 50;
            doc.setDrawColor(111, 66, 193);
            doc.rect(20, ty, 170, 40);
            doc.setTextColor(111, 66, 193);
            doc.text("Teacher Comment:", 25, ty + 8);

            doc.save(`${testName.replace(/ /g, '_')}_Feedback.pdf`);
        }
    