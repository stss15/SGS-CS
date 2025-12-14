/**
 * Extracted from 6.1_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "6.1 Automated Systems";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Sensors vs Actuators)
        const q1Items = [
            { id: 's1', text: 'Temperature Sensor', correct: 'sensor' },
            { id: 's2', text: 'Pressure Sensor', correct: 'sensor' },
            { id: 's3', text: 'Light Sensor', correct: 'sensor' },
            { id: 's4', text: 'Infrared Sensor', correct: 'sensor' },
            { id: 'a1', text: 'Motor', correct: 'actuator' },
            { id: 'a2', text: 'Pump', correct: 'actuator' },
            { id: 'a3', text: 'Valve', correct: 'actuator' },
            { id: 'a4', text: 'Heater', correct: 'actuator' }
        ];

        // Q3 Data (Pros vs Cons)
        const q3Items = [
            { id: 'adv1', text: 'Faster response than humans', correct: 'advantage' },
            { id: 'adv2', text: 'Safer in dangerous environments', correct: 'advantage' },
            { id: 'adv3', text: 'Consistent results', correct: 'advantage' },
            { id: 'dis1', text: 'Expensive setup costs', correct: 'disadvantage' },
            { id: 'dis2', text: 'Susceptible to hacking', correct: 'disadvantage' },
            { id: 'dis3', text: 'High maintenance costs', correct: 'disadvantage' }
        ];

        // Q4 Data (Applications)
        const q4Defs = [
            { id: '1', text: 'Keeps humans away from radiation' },
            { id: '2', text: 'Maintains safe distance from car in front' },
            { id: '3', text: 'Efficient use of water in large fields' },
            { id: '4', text: 'Collects data from remote locations 24/7' }
        ];
        const q4Terms = [
            { id: '1', text: 'Nuclear Power Station' },
            { id: '2', text: 'Adaptive Cruise Control' },
            { id: '3', text: 'Automated Irrigation' },
            { id: '4', text: 'Weather Station' }
        ];

        // Dropdown Options
        const dropdownOptions = {
            q2: [
                'Sensors take readings from environment',
                'Data converted from Analogue to Digital (ADC)',
                'Microprocessor compares data to pre-set values',
                'Signal sent to Actuators if action needed',
                'Actuators perform the physical task'
            ],
            q5a: ['Thermometer', 'Barometer', 'Speedometer', 'Ruler'],
            q5b: ['Anemometer', 'Wind Vane', 'Fan', 'Turbine'],
            q5c: ['Hygrometer', 'Hydrometer', 'Thermometer', 'Rain Gauge'],
            q5d: ['Barometer', 'Pressure Gauge', 'Pump', 'Compressor'],
            q5e: ['Accelerometer', 'Gyroscope', 'GPS', 'Camera']
        };

        const questionMeta = [
            { id: 'q1', title: 'Sensors vs Actuators', type: 'drag', correctAnswer: { sensor: ['Temp', 'Pressure', 'Light', 'IR'], actuator: ['Motor', 'Pump', 'Valve', 'Heater'] } },
            { id: 'q2', title: 'Automation Loop', type: 'order', correctAnswer: ['Sensors', 'ADC', 'Microprocessor', 'Signal', 'Actuators'] },
            { id: 'q3', title: 'Pros vs Cons', type: 'drag', correctAnswer: { advantage: ['Faster', 'Safer', 'Consistent'], disadvantage: ['Expensive', 'Hacking', 'Maintenance'] } },
            { id: 'q4', title: 'Applications', type: 'match', correctAnswer: { '1': 'Nuclear', '2': 'Cruise Control', '3': 'Irrigation', '4': 'Weather Station' } },
            { id: 'q5', title: 'Sensor Selection', type: 'dropdown', correctAnswer: { a: 'Thermometer', b: 'Anemometer', c: 'Hygrometer', d: 'Barometer', e: 'Accelerometer' } }
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
            initDrag('q1', q1Items);
            // Q2
            initOrder('q2', dropdownOptions.q2, 5);
            // Q3
            initDrag('q3', q3Items);
            // Q4
            initMatch('q4', q4Defs, q4Terms);
            // Q5
            populateDropdown('q5a', dropdownOptions.q5a);
            populateDropdown('q5b', dropdownOptions.q5b);
            populateDropdown('q5c', dropdownOptions.q5c);
            populateDropdown('q5d', dropdownOptions.q5d);
            populateDropdown('q5e', dropdownOptions.q5e);
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

        function initOrder(qId, options, count) {
            const letters = ['a', 'b', 'c', 'd', 'e'];
            for (let i = 0; i < count; i++) {
                populateDropdown(`${qId}${letters[i]}`, options);
            }
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

        // --- CHECK ---
        function checkAnswers() {
            totalAttempts++;
            let allCorrect = true;

            // Q1 Drag
            if (!checkDragQuestion('q1', 'sensor', 'actuator')) allCorrect = false;
            // Q2 Order
            if (!checkOrderQuestion('q2', ['Sensors take readings from environment', 'Data converted from Analogue to Digital (ADC)', 'Microprocessor compares data to pre-set values', 'Signal sent to Actuators if action needed', 'Actuators perform the physical task'])) allCorrect = false;
            // Q3 Drag
            if (!checkDragQuestion('q3', 'advantage', 'disadvantage')) allCorrect = false;
            // Q4 Match
            if (!checkMatchQuestion('q4', 4)) allCorrect = false;
            // Q5 Dropdown
            if (!checkDropdowns('q5', ['a', 'b', 'c', 'd', 'e'])) allCorrect = false;

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

        function checkOrderQuestion(qId, correctOrder) {
            let correct = true;
            const letters = ['a', 'b', 'c', 'd', 'e'];
            for (let i = 0; i < correctOrder.length; i++) {
                const el = document.getElementById(`${qId}${letters[i]}`);
                if (el.value !== correctOrder[i]) {
                    correct = false;
                    el.classList.add('wrong');
                } else {
                    el.classList.add('correct');
                    el.classList.remove('wrong');
                }
            }
            if (correct) markCorrect(qId); else markWrong(qId);
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
    