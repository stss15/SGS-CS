/**
 * Extracted from Topic7_End_of_unit_Test.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "Topic 7 End of Unit Test";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1: PDLC Stages
        const q1Steps = [
            { id: 's1', text: 'Analysis' },
            { id: 's2', text: 'Design' },
            { id: 's3', text: 'Coding' },
            { id: 's4', text: 'Testing' },
            { id: 's5', text: 'Maintenance' }
        ];

        // Q2: Decomposition
        const q2Defs = [
            { id: '1', text: 'Breaking down a complex problem' },
            { id: '2', text: 'Removing unnecessary details' },
            { id: '3', text: 'Identifying similarities' },
            { id: '4', text: 'Step-by-step solution' }
        ];
        const q2Terms = [
            { id: '1', text: 'Decomposition' },
            { id: '2', text: 'Abstraction' },
            { id: '3', text: 'Pattern Recognition' },
            { id: '4', text: 'Algorithm' }
        ];

        // Q3: Flowchart Symbols
        const q3Items = [
            { id: 'i1', text: 'Parallelogram', correct: 'io' },
            { id: 'i2', text: 'Rectangle', correct: 'process' },
            { id: 'i3', text: 'Diamond', correct: 'decision' }
        ];

        // Q4: Standard Algorithms
        const q4Defs = [
            { id: '1', text: 'Checks each item in order' },
            { id: '2', text: 'Swaps adjacent items if out of order' },
            { id: '3', text: 'Adding values to a running sum' },
            { id: '4', text: 'Incrementing by 1' }
        ];
        const q4Terms = [
            { id: '1', text: 'Linear Search' },
            { id: '2', text: 'Bubble Sort' },
            { id: '3', text: 'Totalling' },
            { id: '4', text: 'Counting' }
        ];

        // Q5: Validation Checks
        const q5Options = [
            { value: 'Length Check', correct: true },
            { value: 'Range Check', correct: false },
            { value: 'Type Check', correct: false },
            { value: 'Format Check', correct: false }
        ];
        let q5Selection = null;

        // Q6: Test Data Types
        const q6Defs = [
            { id: '1', text: '50' },
            { id: '2', text: '1' },
            { id: '3', text: '150' }
        ];
        const q6Terms = [
            { id: '1', text: 'Normal' },
            { id: '2', text: 'Boundary' },
            { id: '3', text: 'Abnormal' }
        ];

        // Q7: Trace Table Logic
        const q7Options = [
            { value: '10, 10', correct: true },
            { value: '5, 10', correct: false },
            { value: '10, 5', correct: false },
            { value: '5, 5', correct: false }
        ];
        let q7Selection = null;

        // Q8: Identifying Errors
        const q8Options = [
            { value: 'A number cannot be > 10 and < 5 at the same time', correct: true },
            { value: 'Syntax error', correct: false },
            { value: 'X is not defined', correct: false },
            { value: 'Needs an OR', correct: false } // Technically true, but the *reason* it won't run (body execute) is the logic.
        ];
        let q8Selection = null;

        // Q9: Algorithm Efficiency
        const q9Options = [
            { value: 'FOR Loop', correct: true },
            { value: 'WHILE Loop', correct: false },
            { value: 'REPEAT Loop', correct: false },
            { value: 'IF Statement', correct: false }
        ];
        let q9Selection = null;

        // Q10: Verification
        const q10Statements = [
            { id: 'st1', text: 'Double entry is a verification check', correct: true },
            { id: 'st2', text: 'Visual check is a verification check', correct: true },
            { id: 'st3', text: 'Verification checks if data is reasonable', correct: false },
            { id: 'st4', text: 'Verification ensures data matches the source', correct: true }
        ];
        const q10State = { st1: null, st2: null, st3: null, st4: null };

        const questionMeta = [
            { id: 'q1', title: 'PDLC Stages', type: 'order', correctAnswer: ['Analysis', 'Design', 'Coding', 'Testing', 'Maintenance'] },
            { id: 'q2', title: 'Decomposition', type: 'match', correctAnswer: { '1': 'Decomposition', '2': 'Abstraction', '3': 'Pattern Rec', '4': 'Algorithm' } },
            { id: 'q3', title: 'Flowchart Symbols', type: 'drag', correctAnswer: { io: ['Parallelogram'], process: ['Rectangle'], decision: ['Diamond'] } },
            { id: 'q4', title: 'Standard Algorithms', type: 'match', correctAnswer: { '1': 'Linear Search', '2': 'Bubble Sort', '3': 'Totalling', '4': 'Counting' } },
            { id: 'q5', title: 'Validation Checks', type: 'mcq', correctAnswer: 'Length Check' },
            { id: 'q6', title: 'Test Data Types', type: 'match', correctAnswer: { '1': 'Normal', '2': 'Boundary', '3': 'Abnormal' } },
            { id: 'q7', title: 'Trace Table Logic', type: 'mcq', correctAnswer: '10, 10' },
            { id: 'q8', title: 'Identifying Errors', type: 'mcq', correctAnswer: 'Logic impossible' },
            { id: 'q9', title: 'Algorithm Efficiency', type: 'mcq', correctAnswer: 'FOR Loop' },
            { id: 'q10', title: 'Verification', type: 'tf', correctAnswer: { st1: true, st2: true, st3: false, st4: true } }
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
            initOrder('q1', q1Steps);
            initMatch('q2', q2Defs, q2Terms);
            initDrag('q3', q3Items);
            initMatch('q4', q4Defs, q4Terms);
            initMCQ('q5', q5Options);
            initMatch('q6', q6Defs, q6Terms);
            initMCQ('q7', q7Options);
            initMCQ('q8', q8Options);
            initMCQ('q9', q9Options);
            initTF('q10', q10Statements);
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
            if (qId === 'q5') q5Selection = value;
            if (qId === 'q7') q7Selection = value;
            if (qId === 'q8') q8Selection = value;
            if (qId === 'q9') q9Selection = value;
        }

        // --- TF ---
        function selectTF(qId, stId, val, el) {
            const row = el.parentNode;
            row.querySelectorAll('.tf-option').forEach(opt => opt.classList.remove('selected'));
            el.classList.add('selected');
            if (qId === 'q10') q10State[stId] = val;
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

            if (!checkOrderQuestion('q1', ['s1', 's2', 's3', 's4', 's5'])) allCorrect = false;
            if (!checkMatchQuestion('q2', 4)) allCorrect = false;
            if (!checkDragQuestion('q3', 'io', 'process', 'decision')) allCorrect = false;
            if (!checkMatchQuestion('q4', 4)) allCorrect = false;
            if (!checkMCQQuestion('q5', q5Selection, q5Options)) allCorrect = false;
            if (!checkMatchQuestion('q6', 3)) allCorrect = false;
            if (!checkMCQQuestion('q7', q7Selection, q7Options)) allCorrect = false;
            if (!checkMCQQuestion('q8', q8Selection, q8Options)) allCorrect = false;
            if (!checkMCQQuestion('q9', q9Selection, q9Options)) allCorrect = false;
            if (!checkTFQuestion('q10', q10Statements)) allCorrect = false;

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

        function checkTFQuestion(qId, statements) {
            let correct = true;
            const rows = document.querySelectorAll(`#${qId}-grid .tf-row`);
            statements.forEach((st, idx) => {
                const row = rows[idx];
                const selected = q10State[st.id];
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
    