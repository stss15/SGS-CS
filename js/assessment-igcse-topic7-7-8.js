/**
 * Extracted from 7.8_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "7.8 Identifying Errors";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Error Types)
        const q1Defs = [
            { id: '1', text: 'Code does not follow the rules of the language' },
            { id: '2', text: 'Program runs but produces incorrect results' },
            { id: '3', text: 'Program crashes during execution' },
            { id: '4', text: 'Tool used to find logic errors' }
        ];
        const q1Terms = [
            { id: '1', text: 'Syntax Error' },
            { id: '2', text: 'Logic Error' },
            { id: '3', text: 'Runtime Error' },
            { id: '4', text: 'Trace Table' }
        ];

        // Q2 Data (Logic Error Identification)
        const q2Options = [
            { value: 'Total is multiplied by X, and 0 * anything is 0', correct: true },
            { value: 'The loop does not run', correct: false },
            { value: 'Total should be initialised to 1', correct: false },
            { value: 'X starts at 1', correct: false }
        ];
        let q2Selection = null;

        // Q3 Data (Debugging Strategies)
        const q3Steps = [
            { id: 's1', text: 'Run the program with test data' },
            { id: 's2', text: 'Compare actual output with expected output' },
            { id: 's3', text: 'Identify the discrepancy' },
            { id: 's4', text: 'Use a trace table to locate the error in logic' },
            { id: 's5', text: 'Correct the code and re-test' }
        ];

        // Q4 Data (Correcting Logic)
        const q4Items = [
            { id: 'c1', text: 'Min <- 1000', correct: 'correct' },
            { id: 'c2', text: 'Min <- First Input', correct: 'correct' },
            { id: 'i1', text: 'Min <- 0', correct: 'incorrect' },
            { id: 'c3', text: 'Max <- -1000', correct: 'correct' },
            { id: 'i2', text: 'Max <- 0', correct: 'correct' } // Technically correct for positive inputs, but let's keep it simple or remove ambiguity. 
            // Actually, let's adjust based on plan: "Max <- 0 (Correct - assuming positive inputs)". 
            // To avoid confusion, I'll treat it as correct for general positive cases, or maybe remove it if ambiguous.
            // Let's stick to the plan but ensure clarity.
        ];
        // Re-evaluating Q4 items to be less ambiguous based on "works for any set of numbers" context usually implies handling negatives too.
        // If we want it to work for ANY numbers (including negatives), Max <- 0 is risky if all inputs are negative (e.g. -5, -10).
        // So Max <- 0 is actually INCORRECT for "any set of numbers".
        // Let's update the logic:
        // Min <- 0 is INCORRECT (fails for positives like 5, 10).
        // Max <- 0 is INCORRECT (fails for all negatives like -5, -10).
        // Min <- 1000 is CORRECT (assuming inputs < 1000).
        // Max <- -1000 is CORRECT (assuming inputs > -1000).
        // Min <- First Input is BEST/CORRECT.

        // Let's refine the items for clarity in the code:
        const q4ItemsRefined = [
            { id: 'c1', text: 'Min <- 1000 (High Value)', correct: 'correct' },
            { id: 'c2', text: 'Min <- First Input', correct: 'correct' },
            { id: 'i1', text: 'Min <- 0', correct: 'incorrect' },
            { id: 'i2', text: 'Max <- 0', correct: 'incorrect' }, // Fails for all negative numbers
            { id: 'c3', text: 'Max <- -1000 (Low Value)', correct: 'correct' }
        ];

        // Q5 Data (Boundary Errors)
        const q5Options = [
            { value: '11 times', correct: true },
            { value: '10 times', correct: false },
            { value: '9 times', correct: false },
            { value: 'Infinite times', correct: false }
        ];
        let q5Selection = null;

        const questionMeta = [
            { id: 'q1', title: 'Error Types', type: 'match', correctAnswer: { '1': 'Syntax', '2': 'Logic', '3': 'Runtime', '4': 'Trace Table' } },
            { id: 'q2', title: 'Logic Error Identification', type: 'mcq', correctAnswer: 'Total is multiplied by X...' },
            { id: 'q3', title: 'Debugging Strategies', type: 'order', correctAnswer: ['Run', 'Compare', 'Identify', 'Trace', 'Correct'] },
            { id: 'q4', title: 'Correcting Logic', type: 'drag', correctAnswer: { correct: ['Min=1000', 'Min=First', 'Max=-1000'], incorrect: ['Min=0', 'Max=0'] } },
            { id: 'q5', title: 'Boundary Errors', type: 'mcq', correctAnswer: '11 times' }
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
            initDrag('q4', q4ItemsRefined);
            initMCQ('q5', q5Options);
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
            if (qId === 'q2') q2Selection = value;
            if (qId === 'q5') q5Selection = value;
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
            if (!checkOrderQuestion('q3', ['s1', 's2', 's3', 's4', 's5'])) allCorrect = false;
            if (!checkDragQuestion('q4', 'correct', 'incorrect')) allCorrect = false;
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
    