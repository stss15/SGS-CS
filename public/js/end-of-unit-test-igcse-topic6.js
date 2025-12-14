/**
 * Extracted from Topic6_End_of_unit_Test.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "Topic 6 End of Unit Test";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Sensors vs Actuators)
        const q1Items = [
            { id: 's1', text: 'Temperature Sensor', correct: 'sensor' },
            { id: 's2', text: 'pH Sensor', correct: 'sensor' },
            { id: 's3', text: 'Light Sensor', correct: 'sensor' },
            { id: 'a1', text: 'Motor', correct: 'actuator' },
            { id: 'a2', text: 'Heater', correct: 'actuator' },
            { id: 'a3', text: 'Pump', correct: 'actuator' }
        ];

        // Q2 Data (Automation Loop)
        const q2Steps = [
            { id: 'st1', text: 'Sensors take reading' },
            { id: 'st2', text: 'Data sent to Microprocessor' },
            { id: 'st3', text: 'Data compared to pre-set values' },
            { id: 'st4', text: 'Signal sent to Actuator' },
            { id: 'st5', text: 'Actuator alters physical condition' }
        ];

        // Q3 Data (Robot Characteristics)
        const q3Statements = [
            { id: 1, text: 'Ability to sense surroundings', answer: true },
            { id: 2, text: 'Ability to move', answer: true },
            { id: 3, text: 'Programmable', answer: true },
            { id: 4, text: 'Must be humanoid', answer: false }
        ];
        let q3Selections = {};

        // Q4 Data (Independent vs Dependent)
        const q4Items = [
            { id: 'i1', text: 'Mars Rover', correct: 'independent' },
            { id: 'i2', text: 'Autonomous Vacuum', correct: 'independent' },
            { id: 'd1', text: 'Surgical Robot', correct: 'dependent' },
            { id: 'd2', text: 'Factory Arm with Operator', correct: 'dependent' }
        ];

        // Q5 Data (Robot Components)
        const q5Defs = [
            { id: '1', text: 'Input device to sense environment' },
            { id: '2', text: 'The brain that processes data' },
            { id: '3', text: 'Creates movement (motors, pistons)' },
            { id: '4', text: 'Tool attached to arm (gripper, spray gun)' }
        ];
        const q5Terms = [
            { id: '1', text: 'Sensor' },
            { id: '2', text: 'Microprocessor' },
            { id: '3', text: 'Actuator' },
            { id: '4', text: 'End-effector' }
        ];

        // Q6 Data (AI Categories)
        const q6Defs = [
            { id: '1', text: 'Superior to humans in one specific task' },
            { id: '2', text: 'Similar performance to humans in a specific task' },
            { id: '3', text: 'Superior to humans in many tasks' }
        ];
        const q6Terms = [
            { id: '1', text: 'Narrow AI' },
            { id: '2', text: 'General AI' },
            { id: '3', text: 'Strong AI' }
        ];

        // Q7 Data (Expert System Components)
        const q7Defs = [
            { id: '1', text: 'Repository of facts and objects' },
            { id: '2', text: 'Set of inference rules (IF-THEN)' },
            { id: '3', text: 'Search engine that applies rules to facts' },
            { id: '4', text: 'Allows interaction with the system' }
        ];
        const q7Terms = [
            { id: '1', text: 'Knowledge Base' },
            { id: '2', text: 'Rules Base' },
            { id: '3', text: 'Inference Engine' },
            { id: '4', text: 'User Interface' }
        ];

        // Q8 Data (AI vs ML)
        const q8Items = [
            { id: 'ai1', text: 'Simulates human intelligence', correct: 'ai' },
            { id: 'ml1', text: 'Uses training data to learn', correct: 'ml' },
            { id: 'ml2', text: 'Makes predictions on unseen data', correct: 'ml' }
        ];

        // Q9 Data (Expert System Process)
        const q9Steps = [
            { id: 's1', text: 'User enters data via User Interface' },
            { id: 's2', text: 'Inference Engine interrogates Knowledge Base' },
            { id: 's3', text: 'Inference Rules applied to facts' },
            { id: 's4', text: 'System generates a conclusion/diagnosis' }
        ];

        // Q10 Data (MCQ)
        const q10Options = [
            { value: 'It requires constant human supervision', correct: true },
            { value: 'It uses sensors to monitor the environment', correct: false },
            { value: 'It uses a microprocessor to process data', correct: false },
            { value: 'It uses actuators to control equipment', correct: false }
        ];
        let q10Selection = null;

        const questionMeta = [
            { id: 'q1', title: 'Sensors vs Actuators', type: 'drag', correctAnswer: { sensor: ['Temp', 'pH', 'Light'], actuator: ['Motor', 'Heater', 'Pump'] } },
            { id: 'q2', title: 'Automation Loop', type: 'order', correctAnswer: ['Sensors', 'Microprocessor', 'Compare', 'Signal', 'Actuator'] },
            { id: 'q3', title: 'Robot Characteristics', type: 'tf', correctAnswer: { 1: true, 2: true, 3: true, 4: false } },
            { id: 'q4', title: 'Ind vs Dep Robots', type: 'drag', correctAnswer: { independent: ['Rover', 'Vacuum'], dependent: ['Surgery', 'Arm'] } },
            { id: 'q5', title: 'Robot Components', type: 'match', correctAnswer: { '1': 'Sensor', '2': 'Microprocessor', '3': 'Actuator', '4': 'End-effector' } },
            { id: 'q6', title: 'AI Categories', type: 'match', correctAnswer: { '1': 'Narrow AI', '2': 'General AI', '3': 'Strong AI' } },
            { id: 'q7', title: 'Expert System Components', type: 'match', correctAnswer: { '1': 'Knowledge Base', '2': 'Rules Base', '3': 'Inference Engine', '4': 'User Interface' } },
            { id: 'q8', title: 'AI vs ML', type: 'drag', correctAnswer: { ai: ['Simulates Intelligence'], ml: ['Training Data', 'Predictions'] } },
            { id: 'q9', title: 'Expert System Process', type: 'order', correctAnswer: ['User Input', 'Engine Interrogates', 'Rules Applied', 'Conclusion'] },
            { id: 'q10', title: 'Terminology', type: 'mcq', correctAnswer: 'It requires constant human supervision' }
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
            initOrder('q2', q2Steps);
            initTF('q3', q3Statements);
            initDrag('q4', q4Items);
            initMatch('q5', q5Defs, q5Terms);
            initMatch('q6', q6Defs, q6Terms);
            initMatch('q7', q7Defs, q7Terms);
            initDrag('q8', q8Items);
            initOrder('q9', q9Steps);
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
            if (!q3Selections[qId]) q3Selections[qId] = {};
            document.getElementById(`${qId}-${rowId}-t`).classList.remove('selected');
            document.getElementById(`${qId}-${rowId}-f`).classList.remove('selected');
            if (val === true) document.getElementById(`${qId}-${rowId}-t`).classList.add('selected');
            else document.getElementById(`${qId}-${rowId}-f`).classList.add('selected');
            q3Selections[qId][rowId] = val;
        }

        // --- MCQ ---
        function selectMCQ(qId, value) {
            document.querySelectorAll(`#${qId}-options .mcq-option`).forEach(opt => {
                opt.classList.remove('selected');
            });
            const selected = document.querySelector(`#${qId}-options .mcq-option[data-value="${value}"]`);
            selected.classList.add('selected');
            q10Selection = value;
        }

        // --- CHECK ---
        function checkAnswers() {
            totalAttempts++;
            let allCorrect = true;

            if (!checkDragQuestion('q1', 'sensor', 'actuator')) allCorrect = false;
            if (!checkOrderQuestion('q2', ['st1', 'st2', 'st3', 'st4', 'st5'])) allCorrect = false;
            if (!checkTFQuestion('q3', q3Statements)) allCorrect = false;
            if (!checkDragQuestion('q4', 'independent', 'dependent')) allCorrect = false;
            if (!checkMatchQuestion('q5', 4)) allCorrect = false;
            if (!checkMatchQuestion('q6', 3)) allCorrect = false;
            if (!checkMatchQuestion('q7', 4)) allCorrect = false;
            if (!checkDragQuestion('q8', 'ai', 'ml')) allCorrect = false;
            if (!checkOrderQuestion('q9', ['s1', 's2', 's3', 's4'])) allCorrect = false;
            if (!checkMCQQuestion('q10')) allCorrect = false;

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
            const userSelections = q3Selections[qId] || {};
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

        function checkMCQQuestion(qId) {
            const correctOpt = q10Options.find(o => o.correct);
            if (q10Selection === correctOpt.value) {
                document.querySelector(`#${qId}-options .mcq-option[data-value="${q10Selection}"]`).classList.add('correct');
                markCorrect(qId);
                return true;
            } else {
                if (q10Selection) document.querySelector(`#${qId}-options .mcq-option[data-value="${q10Selection}"]`).classList.add('wrong');
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
    