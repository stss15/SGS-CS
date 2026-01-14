/**
 * Extracted from 8.1_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "8.1 Programming Concepts";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Variable vs Constant)
        const q1Items = [
            { id: 'v1', text: 'Value can change during execution', correct: 'variable' },
            { id: 'c1', text: 'Named data store for a fixed value', correct: 'constant' },
            { id: 'c2', text: 'PI = 3.142', correct: 'constant' },
            { id: 'v2', text: 'Score = Score + 1', correct: 'variable' },
            { id: 'c3', text: 'TaxRate = 0.2', correct: 'constant' },
            { id: 'v3', text: 'PlayerName', correct: 'variable' }
        ];

        // Q2 Data (Data Types)
        const q2Defs = [
            { id: '1', text: '42' },
            { id: '2', text: '3.14' },
            { id: '3', text: '\'A\'' },
            { id: '4', text: '"Hello World"' },
            { id: '5', text: 'TRUE' }
        ];
        const q2Terms = [
            { id: '1', text: 'Integer' },
            { id: '2', text: 'Real' },
            { id: '3', text: 'Char' },
            { id: '4', text: 'String' },
            { id: '5', text: 'Boolean' }
        ];

        // Q3 Data (Input/Output)
        const q3Steps = [
            { id: 's1', text: 'OUTPUT "Enter your name"' },
            { id: 's2', text: 'INPUT Name' },
            { id: 's3', text: 'OUTPUT "Enter your age"' },
            { id: 's4', text: 'INPUT Age' },
            { id: 's5', text: 'OUTPUT "Hello " + Name + ", you are " + Age' }
        ];

        // Q4 Data (Loop Types)
        const q4Options = [
            { value: 'FOR Loop', correct: true },
            { value: 'WHILE Loop', correct: false },
            { value: 'REPEAT...UNTIL Loop', correct: false },
            { value: 'IF Statement', correct: false }
        ];
        let q4Selection = null;

        // Q5 Data (Operator Logic)
        const q5Options = [
            { value: 'Only if both Age is > 18 AND HasLicense is TRUE', correct: true },
            { value: 'If Age is > 18 OR HasLicense is TRUE', correct: false },
            { value: 'If Age is 18 AND HasLicense is FALSE', correct: false },
            { value: 'If Age is < 18', correct: false }
        ];
        let q5Selection = null;

        const questionMeta = [
            { id: 'q1', title: 'Variable vs Constant', type: 'drag', correctAnswer: { variable: ['Changeable', 'Score', 'PlayerName'], constant: ['Fixed', 'PI', 'TaxRate'] } },
            { id: 'q2', title: 'Data Types', type: 'match', correctAnswer: { '1': 'Integer', '2': 'Real', '3': 'Char', '4': 'String', '5': 'Boolean' } },
            { id: 'q3', title: 'Input/Output', type: 'order', correctAnswer: ['Out Name', 'In Name', 'Out Age', 'In Age', 'Out Greeting'] },
            { id: 'q4', title: 'Loop Types', type: 'mcq', correctAnswer: 'FOR Loop' },
            { id: 'q5', title: 'Operator Logic', type: 'mcq', correctAnswer: 'Both Conditions True' }
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
            initOrder('q3', q3Steps);
            initMCQ('q4', q4Options);
            initMCQ('q5', q5Options);
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

        // --- MCQ ---
        function selectMCQ(qId, value) {
            document.querySelectorAll(`#${qId}-options .mcq-option`).forEach(opt => {
                opt.classList.remove('selected');
            });
            const selected = document.querySelector(`#${qId}-options .mcq-option[data-value="${value}"]`);
            selected.classList.add('selected');
            if (qId === 'q4') q4Selection = value;
            if (qId === 'q5') q5Selection = value;
        }

        // --- CHECK ---
        function checkAnswers() {
            totalAttempts++;
            let allCorrect = true;

            if (!checkDragQuestion('q1', 'variable', 'constant')) allCorrect = false;
            if (!checkMatchQuestion('q2', 5)) allCorrect = false;
            if (!checkOrderQuestion('q3', ['s1', 's2', 's3', 's4', 's5'])) allCorrect = false;
            if (!checkMCQQuestion('q4', q4Selection, q4Options)) allCorrect = false;
            if (!checkMCQQuestion('q5', q5Selection, q5Options)) allCorrect = false;

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
    