/**
 * Extracted from 6.2_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "6.2 Robotics";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Characteristics)
        const q1Statements = [
            { id: 1, text: 'Ability to sense surroundings', answer: true },
            { id: 2, text: 'Ability to move', answer: true },
            { id: 3, text: 'Programmable', answer: true },
            { id: 4, text: 'Must look like a human', answer: false },
            { id: 5, text: 'Must have Artificial Intelligence', answer: false }
        ];
        let q1Selections = {};

        // Q2 Data (Independent vs Dependent)
        const q2Items = [
            { id: 'i1', text: 'Driverless Car', correct: 'independent' },
            { id: 'i2', text: 'Mars Rover', correct: 'independent' },
            { id: 'i3', text: 'Autonomous Vacuum', correct: 'independent' },
            { id: 'd1', text: 'Surgical Robot', correct: 'dependent' },
            { id: 'd2', text: 'Factory Arm with Operator', correct: 'dependent' }
        ];

        // Q3 Data (Components)
        const q3Defs = [
            { id: '1', text: 'Input device to sense environment' },
            { id: '2', text: 'The brain that processes data' },
            { id: '3', text: 'Creates movement (motors, pistons)' },
            { id: '4', text: 'Tool attached to arm (gripper, spray gun)' }
        ];
        const q3Terms = [
            { id: '1', text: 'Sensor' },
            { id: '2', text: 'Microprocessor' },
            { id: '3', text: 'Actuator' },
            { id: '4', text: 'End-effector' }
        ];

        // Q5 Data (Pros vs Cons)
        const q5Items = [
            { id: 'adv1', text: 'Higher productivity', correct: 'advantage' },
            { id: 'adv2', text: 'Consistent quality', correct: 'advantage' },
            { id: 'adv3', text: 'Can work in dangerous places', correct: 'advantage' },
            { id: 'dis1', text: 'Loss of jobs/unemployment', correct: 'disadvantage' },
            { id: 'dis2', text: 'Deskilling of workforce', correct: 'disadvantage' },
            { id: 'dis3', text: 'High initial cost', correct: 'disadvantage' }
        ];

        // Q6 Data (MCQ)
        const q6Options = [
            { value: 'Unmanned Aerial Vehicle', correct: true },
            { value: 'A robot that cleans floors', correct: false },
            { value: 'A type of sensor', correct: false },
            { value: 'A robot controller', correct: false }
        ];
        let q6Selection = null;

        // Dropdown Options
        const dropdownOptions = {
            q4a: ['repetitive', 'creative', 'emotional', 'random'],
            q4b: ['24/7', '9 to 5', 'occasionally', 'never'],
            q4c: ['hazardous', 'safe', 'comfortable', 'office'],
            q4d: ['expensive', 'cheap', 'free', 'easy']
        };

        const questionMeta = [
            { id: 'q1', title: 'Characteristics', type: 'tf', correctAnswer: { 1: true, 2: true, 3: true, 4: false, 5: false } },
            { id: 'q2', title: 'Independent vs Dependent', type: 'drag', correctAnswer: { independent: ['Car', 'Rover', 'Vacuum'], dependent: ['Surgery', 'Factory Arm'] } },
            { id: 'q3', title: 'Components', type: 'match', correctAnswer: { '1': 'Sensor', '2': 'Microprocessor', '3': 'Actuator', '4': 'End-effector' } },
            { id: 'q4', title: 'Industry', type: 'dropdown', correctAnswer: { a: 'repetitive', b: '24/7', c: 'hazardous', d: 'expensive' } },
            { id: 'q5', title: 'Pros vs Cons', type: 'drag', correctAnswer: { advantage: ['Productivity', 'Quality', 'Dangerous'], disadvantage: ['Jobs', 'Deskilling', 'Cost'] } },
            { id: 'q6', title: 'Terminology', type: 'mcq', correctAnswer: 'Unmanned Aerial Vehicle' }
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
            // Q1
            initTF('q1', q1Statements);
            // Q2
            initDrag('q2', q2Items);
            // Q3
            initMatch('q3', q3Defs, q3Terms);
            // Q4
            populateDropdown('q4a', dropdownOptions.q4a);
            populateDropdown('q4b', dropdownOptions.q4b);
            populateDropdown('q4c', dropdownOptions.q4c);
            populateDropdown('q4d', dropdownOptions.q4d);
            // Q5
            initDrag('q5', q5Items);
            // Q6
            initMCQ('q6', q6Options);
        }

        function initTF(qId, statements) {
            const grid = document.getElementById(`tf-grid-${qId}`);
            shuffle(statements).forEach(stmt => {
                const row = document.createElement('div');
                row.className = 'tf-row';
                row.innerHTML = `
                    <div class="tf-statement">${stmt.text}</div>
                    <div class="tf-option" onclick="selectTF(${stmt.id}, true, '${qId}')" id="${qId}-${stmt.id}-t"><i class="fa-solid fa-check"></i></div>
                    <div class="tf-option" onclick="selectTF(${stmt.id}, false, '${qId}')" id="${qId}-${stmt.id}-f"><i class="fa-solid fa-xmark"></i></div>
                `;
                grid.appendChild(row);
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

        function populateDropdown(id, options) {
            const select = document.getElementById(id);
            const shuffled = shuffle(options);
            const defaultOpt = document.createElement('option');
            defaultOpt.value = "";
            defaultOpt.textContent = "---";
            select.appendChild(defaultOpt);
            shuffled.forEach(opt => {
                const el = document.createElement('option');
                el.value = opt;
                el.textContent = opt;
                select.appendChild(el);
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

        // --- TF ---
        function selectTF(rowId, val, qId) {
            if (!q1Selections[qId]) q1Selections[qId] = {};
            document.getElementById(`${qId}-${rowId}-t`).classList.remove('selected');
            document.getElementById(`${qId}-${rowId}-f`).classList.remove('selected');
            if (val === true) document.getElementById(`${qId}-${rowId}-t`).classList.add('selected');
            else document.getElementById(`${qId}-${rowId}-f`).classList.add('selected');
            q1Selections[qId][rowId] = val;
        }

        // --- MCQ ---
        function selectMCQ(qId, value) {
            document.querySelectorAll(`#${qId}-options .mcq-option`).forEach(opt => {
                opt.classList.remove('selected');
            });
            const selected = document.querySelector(`#${qId}-options .mcq-option[data-value="${value}"]`);
            selected.classList.add('selected');
            q6Selection = value;
        }

        // --- CHECK ---
        function checkAnswers() {
            totalAttempts++;
            let allCorrect = true;

            // Q1 TF
            if (!checkTFQuestion('q1', q1Statements)) allCorrect = false;
            // Q2 Drag
            if (!checkDragQuestion('q2', 'independent', 'dependent')) allCorrect = false;
            // Q3 Match
            if (!checkMatchQuestion('q3', 4)) allCorrect = false;
            // Q4 Dropdown
            if (!checkDropdowns('q4', ['a', 'b', 'c', 'd'])) allCorrect = false;
            // Q5 Drag
            if (!checkDragQuestion('q5', 'advantage', 'disadvantage')) allCorrect = false;
            // Q6 MCQ
            if (!checkMCQQuestion('q6')) allCorrect = false;

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

        function checkTFQuestion(qId, statements) {
            let correct = true;
            const userSelections = q1Selections[qId] || {};
            statements.forEach(stmt => {
                const rowT = document.getElementById(`${qId}-${stmt.id}-t`);
                const rowF = document.getElementById(`${qId}-${stmt.id}-f`);
                rowT.classList.remove('correct', 'wrong');
                rowF.classList.remove('correct', 'wrong');
                if (userSelections[stmt.id] === stmt.answer) {
                    if (stmt.answer === true) rowT.classList.add('correct'); else rowF.classList.add('correct');
                } else {
                    correct = false;
                    if (userSelections[stmt.id] !== undefined) {
                        if (userSelections[stmt.id] === true) rowT.classList.add('wrong'); else rowF.classList.add('wrong');
                    }
                }
            });
            if (correct) markCorrect(qId); else markWrong(qId);
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

        function checkDragQuestion(qId, bucket1Type, bucket2Type) {
            const b1 = document.getElementById(`bucket-${bucket1Type}`);
            const b2 = document.getElementById(`bucket-${bucket2Type}`);
            let correct = true;
            Array.from(b1.children).forEach(c => { if (c.classList.contains('drag-item') && c.dataset.correct !== bucket1Type) correct = false; });
            Array.from(b2.children).forEach(c => { if (c.classList.contains('drag-item') && c.dataset.correct !== bucket2Type) correct = false; });
            if (document.getElementById(`${qId}-source`).children.length > 0) correct = false;

            if (correct) {
                markCorrect(qId);
                lockDragItems([b1, b2]);
            } else {
                markWrong(qId);
            }
            return correct;
        }

        function checkDropdowns(qId, suffixes) {
            let correct = true;
            suffixes.forEach(s => {
                const el = document.getElementById(`${qId}${s}`);
                if (el.value === el.dataset.answer) {
                    el.classList.add('correct');
                    el.classList.remove('wrong');
                } else {
                    el.classList.add('wrong');
                    correct = false;
                }
            });
            if (correct) markCorrect(qId); else markWrong(qId);
            return correct;
        }

        function checkMCQQuestion(qId) {
            const correctOpt = q6Options.find(o => o.correct);
            if (q6Selection === correctOpt.value) {
                document.querySelector(`#${qId}-options .mcq-option[data-value="${q6Selection}"]`).classList.add('correct');
                markCorrect(qId);
                return true;
            } else {
                if (q6Selection) document.querySelector(`#${qId}-options .mcq-option[data-value="${q6Selection}"]`).classList.add('wrong');
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
    