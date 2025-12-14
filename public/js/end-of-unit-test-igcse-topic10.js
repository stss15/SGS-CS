/**
 * Extracted from Topic10_End_of_unit_Test.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "Topic 10 End of Unit Test";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Symbols)
        const q1Defs = [
            { id: '1', text: 'Triangle with circle' },
            { id: '2', text: 'D-shape' },
            { id: '3', text: 'Curved D-shape' },
            { id: '4', text: 'Curved D-shape with line' }
        ];
        const q1Terms = [
            { id: '1', text: 'NOT' },
            { id: '2', text: 'AND' },
            { id: '3', text: 'OR' },
            { id: '4', text: 'XOR' }
        ];

        // Q2 Data (AND Logic)
        const q2Options = [
            { value: 'Only when both inputs are 1', correct: true },
            { value: 'When any input is 1', correct: false },
            { value: 'When inputs are different', correct: false },
            { value: 'Never', correct: false }
        ];
        let q2Selection = null;

        // Q3 Data (OR Table)
        const q3Steps = [
            { id: 's1', text: '0, 0 -> 0' },
            { id: 's2', text: '0, 1 -> 1' },
            { id: 's3', text: '1, 0 -> 1' },
            { id: 's4', text: '1, 1 -> 1' }
        ];

        // Q4 Data (NAND Logic)
        const q4Options = [
            { value: 'NAND', correct: true },
            { value: 'NOR', correct: false },
            { value: 'XOR', correct: false },
            { value: 'OR', correct: false }
        ];
        let q4Selection = null;

        // Q5 Data (Logic Expression)
        const q5Options = [
            { value: 'F = T OR (S AND NOT Ti)', correct: true },
            { value: 'F = T AND (S OR Ti)', correct: false },
            { value: 'F = (T OR S) AND NOT Ti', correct: false },
            { value: 'F = T OR S OR Ti', correct: false }
        ];
        let q5Selection = null;

        // Q6 Data (Circuit Analysis)
        const q6Options = [
            { value: '1', correct: true },
            { value: '0', correct: false }
        ];
        let q6Selection = null;

        // Q7 Data (XOR Table)
        const q7Statements = [
            { id: 'st1', text: '0, 0 -> 0', correct: true },
            { id: 'st2', text: '0, 1 -> 1', correct: true },
            { id: 'st3', text: '1, 1 -> 1', correct: false }
        ];
        const q7State = { st1: null, st2: null, st3: null };

        // Q8 Data (Notation)
        const q8Defs = [
            { id: '1', text: 'A . B' },
            { id: '2', text: 'A + B' },
            { id: '3', text: 'NOT A' },
            { id: '4', text: 'A XOR B' }
        ];
        const q8Terms = [
            { id: '1', text: 'AND' },
            { id: '2', text: 'OR' },
            { id: '3', text: 'NOT' },
            { id: '4', text: 'XOR' }
        ];

        // Q9 Data (Problem Solving)
        const q9Options = [
            { value: 'XOR', correct: true },
            { value: 'OR', correct: false },
            { value: 'AND', correct: false },
            { value: 'NAND', correct: false }
        ];
        let q9Selection = null;

        // Q10 Data (Complex Expression)
        const q10Steps = [
            { id: 's1', text: 'Take inputs A and B' },
            { id: 's2', text: 'Apply OR gate' },
            { id: 's3', text: 'Apply NOT gate to result' },
            { id: 's4', text: 'Output final value' }
        ];

        const questionMeta = [
            { id: 'q1', title: 'Gate Symbols', type: 'match', correctAnswer: { '1': 'NOT', '2': 'AND', '3': 'OR', '4': 'XOR' } },
            { id: 'q2', title: 'AND Gate Logic', type: 'mcq', correctAnswer: 'Only when both inputs are 1' },
            { id: 'q3', title: 'Truth Table - OR', type: 'order', correctAnswer: ['0,0->0', '0,1->1', '1,0->1', '1,1->1'] },
            { id: 'q4', title: 'NAND Logic', type: 'mcq', correctAnswer: 'NAND' },
            { id: 'q5', title: 'Logic Expression', type: 'mcq', correctAnswer: 'F = T OR (S AND NOT Ti)' },
            { id: 'q6', title: 'Circuit Analysis', type: 'mcq', correctAnswer: '1' },
            { id: 'q7', title: 'XOR Truth Table', type: 'tf', correctAnswer: { st1: true, st2: true, st3: false } },
            { id: 'q8', title: 'Logic Notation', type: 'match', correctAnswer: { '1': 'AND', '2': 'OR', '3': 'NOT', '4': 'XOR' } },
            { id: 'q9', title: 'Problem Solving', type: 'mcq', correctAnswer: 'XOR' },
            { id: 'q10', title: 'Complex Expression', type: 'order', correctAnswer: ['Take inputs', 'Apply OR', 'Apply NOT', 'Output'] }
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
            initMatch('q1', q1Defs, q1Terms);
            initMCQ('q2', q2Options);
            initOrder('q3', q3Steps);
            initMCQ('q4', q4Options);
            initMCQ('q5', q5Options);
            initMCQ('q6', q6Options);
            initTF('q7', q7Statements);
            initMatch('q8', q8Defs, q8Terms);
            initMCQ('q9', q9Options);
            initOrder('q10', q10Steps);
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
            if (qId === 'q2') q2Selection = value;
            if (qId === 'q4') q4Selection = value;
            if (qId === 'q5') q5Selection = value;
            if (qId === 'q6') q6Selection = value;
            if (qId === 'q9') q9Selection = value;
        }

        // --- TF ---
        function selectTF(qId, stId, val, el) {
            const row = el.parentNode;
            row.querySelectorAll('.tf-option').forEach(opt => opt.classList.remove('selected'));
            el.classList.add('selected');
            if (qId === 'q7') q7State[stId] = val;
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

            if (!checkMatchQuestion('q1', 4)) allCorrect = false;
            if (!checkMCQQuestion('q2', q2Selection, q2Options)) allCorrect = false;
            if (!checkOrderQuestion('q3', ['s1', 's2', 's3', 's4'])) allCorrect = false;
            if (!checkMCQQuestion('q4', q4Selection, q4Options)) allCorrect = false;
            if (!checkMCQQuestion('q5', q5Selection, q5Options)) allCorrect = false;
            if (!checkMCQQuestion('q6', q6Selection, q6Options)) allCorrect = false;
            if (!checkTFQuestion('q7', q7Statements)) allCorrect = false;
            if (!checkMatchQuestion('q8', 4)) allCorrect = false;
            if (!checkMCQQuestion('q9', q9Selection, q9Options)) allCorrect = false;
            if (!checkOrderQuestion('q10', ['s1', 's2', 's3', 's4'])) allCorrect = false;

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
                const selected = q7State[st.id];
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
    