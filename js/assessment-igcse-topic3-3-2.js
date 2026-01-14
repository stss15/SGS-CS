/**
 * Extracted from public/igcse/topic3/3.2_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "3.2 Input & Output Devices";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Input vs Output)
        const q1Items = [
            { id: 'i1', text: 'Barcode Scanner', correct: 'input' },
            { id: 'i2', text: 'Microphone', correct: 'input' },
            { id: 'i3', text: 'Webcam', correct: 'input' },
            { id: 'i4', text: 'Sensor', correct: 'input' },
            { id: 'o1', text: 'Actuator', correct: 'output' },
            { id: 'o2', text: 'Projector', correct: 'output' },
            { id: 'o3', text: 'Laser Printer', correct: 'output' },
            { id: 'o4', text: 'Speaker', correct: 'output' }
        ];

        // Q2 Data (Touch Screens)
        const q2Defs = [
            { id: '1', text: 'Uses two layers that touch when pressed; works with gloves' },
            { id: '2', text: 'Uses the body\'s electrical current; supports multi-touch' },
            { id: '3', text: 'Uses a grid of light beams; expensive but durable' }
        ];

        const q2Terms = [
            { id: '1', text: 'Resistive' },
            { id: '2', text: 'Capacitive' },
            { id: '3', text: 'Infrared' }
        ];

        // Q6 Data (Screens)
        const q6Defs = [
            { id: '1', text: 'Uses liquid crystals and requires separate backlighting' },
            { id: '2', text: 'LCD screen backlit by LEDs; thinner and brighter' },
            { id: '3', text: 'Organic material emits its own light; no backlight needed' },
            { id: '4', text: 'Uses millions of tiny mirrors to project an image' }
        ];

        const q6Terms = [
            { id: '1', text: 'LCD Monitor' },
            { id: '2', text: 'LED Screen' },
            { id: '3', text: 'OLED' },
            { id: '4', text: 'DLP Projector' }
        ];

        // Dropdown Options
        const dropdownOptions = {
            q3Type: ['Inkjet', 'Laser', '3D', 'Dot Matrix'],
            q3Mech: ['static electricity', 'heat', 'impact', 'magnetism'],
            q4Dim: ['1D', '2D', '3D'],
            q4Cap: ['more', 'less', 'same'],
            q4Read: ['smartphones', 'radios', 'microwaves'],
            q4Scan: ['laser', 'magnetic', 'thermal'],
            q4Feat: ['error correction', 'encryption', 'compression'],
            q5: [
                'Light passes through the lens',
                'Light hits the sensor (CCD)',
                'Sensor converts light into analogue electric currents',
                'ADC converts analogue signals to digital data',
                'Image is stored as a file (e.g., JPEG)'
            ]
        };

        // Q7 MCQ Data
        const q7Options = [
            { text: 'Infrared (PIR) sensor', correct: true },
            { text: 'Temperature sensor', correct: false },
            { text: 'pH sensor', correct: false },
            { text: 'Light sensor', correct: false }
        ];
        let q7Selected = null;

        // Q8 True/False Data
        const q8Statements = [
            { id: 'tf1', text: 'Capacitive touchscreens work with gloves', correct: false },
            { id: 'tf2', text: 'Laser printers are better for high-volume printing', correct: true },
            { id: 'tf3', text: 'QR codes can store more data than traditional barcodes', correct: true },
            { id: 'tf4', text: 'OLED screens require a separate backlight', correct: false }
        ];

        // Q9 Sortable Data (printer speed slowest to fastest)
        const q9Items = [
            { id: 'p1', text: 'Inkjet Printer (slowest)', order: 1 },
            { id: 'p2', text: '3D Printer', order: 2 },
            { id: 'p3', text: 'Dot Matrix Printer', order: 3 },
            { id: 'p4', text: 'Laser Printer (fastest)', order: 4 }
        ];

        // Q10 Dropdown Options
        const q10Options = {
            q10a: ['sound waves', 'light waves', 'radio waves'],
            q10b: ['electrical signals', 'light signals', 'sound waves'],
            q10c: ['ADC/DAC', 'CPU', 'RAM'],
            q10d: ['input', 'output', 'storage']
        };

        // Question Metadata
        const questionMeta = [
            { id: 'q1', title: 'Input vs Output', type: 'drag', correctAnswer: { input: ['Barcode Scanner', 'Microphone', 'Webcam', 'Sensor'], output: ['Actuator', 'Projector', 'Laser Printer', 'Speaker'] } },
            { id: 'q2', title: 'Touch Screens', type: 'match', correctAnswer: { '1': 'Resistive', '2': 'Capacitive', '3': 'Infrared' } },
            { id: 'q3', title: 'Printers', type: 'dropdown', correctAnswer: { a: 'Inkjet', b: 'Laser', c: '3D', d: 'static electricity' } },
            { id: 'q4', title: 'QR vs Barcodes', type: 'dropdown', correctAnswer: { a: '2D', b: '1D', c: 'more', d: 'smartphones', e: 'laser', f: 'error correction' } },
            { id: 'q5', title: 'Digital Camera', type: 'order', correctAnswer: ['Light passes through the lens', 'Light hits the sensor (CCD)', 'Sensor converts light into analogue electric currents', 'ADC converts analogue signals to digital data', 'Image is stored as a file (e.g., JPEG)'] },
            { id: 'q6', title: 'Screen Tech', type: 'match', correctAnswer: { '1': 'LCD Monitor', '2': 'LED Screen', '3': 'OLED', '4': 'DLP Projector' } },
            { id: 'q7', title: 'Sensor Types', type: 'mcq', correctAnswer: 'Infrared (PIR) sensor' },
            { id: 'q8', title: 'I/O Facts', type: 'trueFalse', correctAnswer: { tf1: false, tf2: true, tf3: true, tf4: false } },
            { id: 'q9', title: 'Printer Speed', type: 'sortable', correctAnswer: ['Inkjet Printer (slowest)', '3D Printer', 'Dot Matrix Printer', 'Laser Printer (fastest)'] },
            { id: 'q10', title: 'Audio Devices', type: 'dropdown', correctAnswer: { a: 'sound waves', b: 'electrical signals', c: 'ADC/DAC', d: 'input' } }
        ];

        // --- UTILITY: Shuffle Array ---
        function shuffle(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        // --- INITIALIZE ALL SHUFFLED CONTENT ---
        function initQuestions() {
            // Q1 Drag & Drop
            const q1S = shuffle(q1Items);
            const q1Source = document.getElementById('q1-source');
            q1S.forEach(item => {
                const div = document.createElement('div');
                div.className = 'drag-item';
                div.draggable = true;
                div.id = item.id;
                div.textContent = item.text;
                div.dataset.correct = item.correct;
                div.ondragstart = drag;
                q1Source.appendChild(div);
            });

            // Q2 Matching
            const q2D = shuffle(q2Defs);
            const q2T = shuffle(q2Terms);
            const defsContainerQ2 = document.getElementById('col-defs-q2');
            const termsContainerQ2 = document.getElementById('col-terms-q2');

            q2D.forEach(d => {
                const div = document.createElement('div');
                div.className = 'match-def';
                div.dataset.id = d.id;
                div.textContent = d.text;
                div.onclick = () => selectDef(div, 'q2');
                defsContainerQ2.appendChild(div);
            });

            q2T.forEach(t => {
                const div = document.createElement('div');
                div.className = 'match-term';
                div.dataset.id = t.id;
                div.textContent = t.text;
                div.onclick = () => selectTerm(div, 'q2');
                termsContainerQ2.appendChild(div);
            });

            // Q3 Dropdowns
            populateDropdown('q3a', dropdownOptions.q3Type);
            populateDropdown('q3b', dropdownOptions.q3Type);
            populateDropdown('q3c', dropdownOptions.q3Type);
            populateDropdown('q3d', dropdownOptions.q3Mech);

            // Q4 Dropdowns
            populateDropdown('q4a', dropdownOptions.q4Dim);
            populateDropdown('q4b', dropdownOptions.q4Dim);
            populateDropdown('q4c', dropdownOptions.q4Cap);
            populateDropdown('q4d', dropdownOptions.q4Read);
            populateDropdown('q4e', dropdownOptions.q4Scan);
            populateDropdown('q4f', dropdownOptions.q4Feat);

            // Q5 Ordering
            populateDropdown('q5a', dropdownOptions.q5);
            populateDropdown('q5b', dropdownOptions.q5);
            populateDropdown('q5c', dropdownOptions.q5);
            populateDropdown('q5d', dropdownOptions.q5);
            populateDropdown('q5e', dropdownOptions.q5);

            // Q6 Matching
            const q6D = shuffle(q6Defs);
            const q6T = shuffle(q6Terms);
            const defsContainerQ6 = document.getElementById('col-defs-q6');
            const termsContainerQ6 = document.getElementById('col-terms-q6');

            q6D.forEach(d => {
                const div = document.createElement('div');
                div.className = 'match-def';
                div.dataset.id = d.id;
                div.textContent = d.text;
                div.onclick = () => selectDef(div, 'q6');
                defsContainerQ6.appendChild(div);
            });

            q6T.forEach(t => {
                const div = document.createElement('div');
                div.className = 'match-term';
                div.dataset.id = t.id;
                div.textContent = t.text;
                div.onclick = () => selectTerm(div, 'q6');
                termsContainerQ6.appendChild(div);
            });

            // Q7 MCQ
            const q7Container = document.getElementById('q7-options');
            shuffle(q7Options).forEach(opt => {
                const div = document.createElement('div');
                div.className = 'mcq-option';
                div.dataset.correct = opt.correct;
                div.dataset.value = opt.text;
                div.textContent = opt.text;
                div.onclick = () => selectMCQ(div, 'q7');
                q7Container.appendChild(div);
            });

            // Q8 True/False Grid
            const q8Tbody = document.getElementById('q8-tbody');
            shuffle(q8Statements).forEach(stmt => {
                const tr = document.createElement('tr');
                tr.dataset.id = stmt.id;
                tr.dataset.correct = stmt.correct;
                tr.innerHTML = `<td>${stmt.text}</td><td><input type="radio" name="${stmt.id}" value="true"></td><td><input type="radio" name="${stmt.id}" value="false"></td>`;
                q8Tbody.appendChild(tr);
            });

            // Q9 Sortable List
            const q9List = document.getElementById('q9-list');
            shuffle(q9Items).forEach(item => {
                const li = document.createElement('li');
                li.className = 'sortable-item';
                li.draggable = true;
                li.dataset.order = item.order;
                li.innerHTML = `${item.text} <i class="fa-solid fa-grip-lines"></i>`;
                li.ondragstart = dragSortable;
                li.ondragover = dragOverSortable;
                li.ondrop = dropSortable;
                q9List.appendChild(li);
            });

            // Q10 Dropdowns
            populateDropdown('q10a', q10Options.q10a);
            populateDropdown('q10b', q10Options.q10b);
            populateDropdown('q10c', q10Options.q10c);
            populateDropdown('q10d', q10Options.q10d);
        }

        function selectMCQ(el, qId) {
            if (completed[qId]) return;
            el.parentElement.querySelectorAll('.mcq-option').forEach(opt => opt.classList.remove('selected'));
            el.classList.add('selected');
            if (qId === 'q7') q7Selected = el.dataset.value;
        }

        let draggedSortable = null;
        function dragSortable(ev) { draggedSortable = ev.target; ev.target.style.opacity = '0.5'; }
        function dragOverSortable(ev) { ev.preventDefault(); }
        function dropSortable(ev) {
            ev.preventDefault();
            if (ev.target.classList.contains('sortable-item') && draggedSortable !== ev.target) {
                const items = Array.from(ev.target.parentElement.children);
                if (items.indexOf(draggedSortable) < items.indexOf(ev.target)) ev.target.after(draggedSortable);
                else ev.target.before(draggedSortable);
            }
            draggedSortable.style.opacity = '1';
            draggedSortable = null;
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
            if (!teacher) {
                alert("Please select your teacher.");
                return;
            }
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

        // --- DRAG & DROP ---
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

        // --- MATCHING LOGIC (Generic) ---
        let selectedDef = { q2: null, q6: null };
        let selectedTerm = { q2: null, q6: null };
        let matchedPairs = { q2: [], q6: [] };

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

        // --- CHECK ANSWERS ---
        function checkAnswers() {
            totalAttempts++;
            let allCorrect = true;

            // Q1: Drag & Drop
            const bucketInput = document.getElementById('bucket-input');
            const bucketOutput = document.getElementById('bucket-output');
            let q1Correct = true;

            Array.from(bucketInput.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'input') q1Correct = false;
                }
            });
            Array.from(bucketOutput.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'output') q1Correct = false;
                }
            });
            if (document.getElementById('q1-source').children.length > 0) q1Correct = false;

            if (q1Correct) {
                markCorrect('q1');
                lockDragItems([bucketInput, bucketOutput]);
            } else {
                markWrong('q1');
                allCorrect = false;
            }

            // Q2: Matching
            let q2Correct = true;
            const q2Pairs = matchedPairs.q2;
            if (q2Pairs.length !== 3) q2Correct = false;
            else {
                q2Pairs.forEach(p => {
                    if (p.defId !== p.termId) q2Correct = false;
                });
            }

            if (q2Correct) {
                markCorrect('q2');
                q2Pairs.forEach(p => {
                    p.def.classList.remove('match-paired');
                    p.term.classList.remove('match-paired');
                    p.def.classList.add('match-solved');
                    p.term.classList.add('match-solved');
                });
            } else {
                markWrong('q2');
                allCorrect = false;
            }

            // Q3: Dropdowns
            const q3a = document.getElementById('q3a');
            const q3b = document.getElementById('q3b');
            const q3c = document.getElementById('q3c');
            const q3d = document.getElementById('q3d');

            if (checkSelect(q3a) && checkSelect(q3b) && checkSelect(q3c) && checkSelect(q3d)) {
                markCorrect('q3');
            } else {
                markWrong('q3');
                allCorrect = false;
            }

            // Q4: Dropdowns
            const q4a = document.getElementById('q4a');
            const q4b = document.getElementById('q4b');
            const q4c = document.getElementById('q4c');
            const q4d = document.getElementById('q4d');
            const q4e = document.getElementById('q4e');
            const q4f = document.getElementById('q4f');

            if (checkSelect(q4a) && checkSelect(q4b) && checkSelect(q4c) && checkSelect(q4d) && checkSelect(q4e) && checkSelect(q4f)) {
                markCorrect('q4');
            } else {
                markWrong('q4');
                allCorrect = false;
            }

            // Q5: Ordering
            const q5a = document.getElementById('q5a');
            const q5b = document.getElementById('q5b');
            const q5c = document.getElementById('q5c');
            const q5d = document.getElementById('q5d');
            const q5e = document.getElementById('q5e');

            if (q5a.value === 'Light passes through the lens' &&
                q5b.value === 'Light hits the sensor (CCD)' &&
                q5c.value === 'Sensor converts light into analogue electric currents' &&
                q5d.value === 'ADC converts analogue signals to digital data' &&
                q5e.value === 'Image is stored as a file (e.g., JPEG)') {
                markCorrect('q5');
                q5a.classList.add('correct');
                q5b.classList.add('correct');
                q5c.classList.add('correct');
                q5d.classList.add('correct');
                q5e.classList.add('correct');
            } else {
                markWrong('q5');
                allCorrect = false;
                if (q5a.value !== 'Light passes through the lens') q5a.classList.add('wrong');
                if (q5b.value !== 'Light hits the sensor (CCD)') q5b.classList.add('wrong');
                if (q5c.value !== 'Sensor converts light into analogue electric currents') q5c.classList.add('wrong');
                if (q5d.value !== 'ADC converts analogue signals to digital data') q5d.classList.add('wrong');
                if (q5e.value !== 'Image is stored as a file (e.g., JPEG)') q5e.classList.add('wrong');
            }

            // Q6: Matching
            let q6Correct = true;
            const q6Pairs = matchedPairs.q6;
            if (q6Pairs.length !== 4) q6Correct = false;
            else {
                q6Pairs.forEach(p => {
                    if (p.defId !== p.termId) q6Correct = false;
                });
            }

            if (q6Correct) {
                markCorrect('q6');
                q6Pairs.forEach(p => {
                    p.def.classList.remove('match-paired');
                    p.term.classList.remove('match-paired');
                    p.def.classList.add('match-solved');
                    p.term.classList.add('match-solved');
                });
            } else {
                markWrong('q6');
                allCorrect = false;
            }

            // Q7: MCQ
            if (q7Selected === 'Infrared (PIR) sensor') {
                markCorrect('q7');
                document.querySelectorAll('#q7-options .mcq-option').forEach(opt => { if (opt.dataset.correct === 'true') opt.classList.add('correct'); });
            } else {
                markWrong('q7');
                allCorrect = false;
                document.querySelectorAll('#q7-options .mcq-option.selected').forEach(opt => opt.classList.add('wrong'));
            }

            // Q8: True/False Grid
            let q8Correct = true;
            document.querySelectorAll('#q8-tbody tr').forEach(row => {
                const selected = row.querySelector('input[type="radio"]:checked');
                if (!selected || selected.value !== row.dataset.correct) { q8Correct = false; row.classList.add('wrong-row'); }
                else row.classList.add('correct-row');
            });
            if (q8Correct) markCorrect('q8'); else { markWrong('q8'); allCorrect = false; }

            // Q9: Sortable List
            const q9List = document.getElementById('q9-list');
            const q9Order = Array.from(q9List.children).map(item => parseInt(item.dataset.order));
            if (q9Order.every((val, idx, arr) => idx === 0 || arr[idx - 1] < val) && q9Order.length === 4) {
                markCorrect('q9'); q9List.classList.add('correct');
            } else { markWrong('q9'); q9List.classList.add('wrong'); allCorrect = false; }

            // Q10: Dropdowns
            const q10a = document.getElementById('q10a'), q10b = document.getElementById('q10b');
            const q10c = document.getElementById('q10c'), q10d = document.getElementById('q10d');
            if (checkSelect(q10a) && checkSelect(q10b) && checkSelect(q10c) && checkSelect(q10d)) markCorrect('q10');
            else { markWrong('q10'); allCorrect = false; }

            // Final Completion
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

        function checkSelect(el) {
            if (el.value === el.dataset.answer) {
                el.classList.add('correct');
                el.classList.remove('wrong');
                return true;
            } else {
                el.classList.add('wrong');
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

        // --- PDF GENERATION ---
        async function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Page 1: Answers
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
            doc.text("Correct Answers & Justifications", 20, 52);

            doc.setFontSize(10);
            questionMeta.forEach(q => {
                if (y > 270) { doc.addPage(); y = 20; }

                doc.setFont(undefined, 'bold');
                doc.text(`${q.id.toUpperCase()}: ${q.title}`, 20, y);
                y += 5;

                doc.setFont(undefined, 'normal');
                let ansStr = "";
                if (typeof q.correctAnswer === 'object') {
                    ansStr = JSON.stringify(q.correctAnswer).replace(/"/g, '').replace(/,/g, ', ');
                } else {
                    ansStr = q.correctAnswer;
                }

                const splitAns = doc.splitTextToSize(`Answer: ${ansStr}`, 170);
                doc.text(splitAns, 20, y);
                y += (splitAns.length * 5) + 5;
            });

            // Page 2: Feedback
            doc.addPage();
            doc.setFontSize(16);
            doc.text("Feedback & Reflection", 20, 20);

            // Table Header
            let ty = 40;
            doc.setFontSize(10);
            doc.setFillColor(240, 240, 240);
            doc.rect(20, ty - 5, 170, 8, 'F');
            doc.text("Question", 25, ty);
            doc.text("Attempts", 80, ty);
            doc.text("Feedback Code", 130, ty);
            ty += 10;

            // Table Rows
            Object.keys(mistakeCounts).forEach(q => {
                doc.text(q.toUpperCase(), 25, ty);
                doc.text((mistakeCounts[q] + 1).toString(), 85, ty);
                doc.rect(130, ty - 4, 30, 6);
                ty += 10;
            });

            // Key
            ty += 10;
            doc.setFont(undefined, 'bold');
            doc.text("Feedback Codes:", 20, ty);
            ty += 6;
            doc.setFont(undefined, 'normal');
            doc.text("C: Content gap", 20, ty); ty += 5;
            doc.text("E: Exam technique", 20, ty); ty += 5;
            doc.text("L: Language/clarity", 20, ty); ty += 5;
            doc.text("T: Time/effort", 20, ty); ty += 5;
            doc.text("M: Misread/misapplied", 20, ty);

            // Reflection Boxes
            ty += 15;
            doc.setDrawColor(40, 167, 69); // Green
            doc.setLineWidth(1);
            doc.rect(20, ty, 170, 40);
            doc.setTextColor(40, 167, 69);
            doc.text("Student Reflection:", 25, ty + 8);

            ty += 50;
            doc.setDrawColor(111, 66, 193); // Purple
            doc.rect(20, ty, 170, 40);
            doc.setTextColor(111, 66, 193);
            doc.text("Teacher Comment:", 25, ty + 8);

            doc.save(`${testName.replace(/ /g, '_')}_Feedback.pdf`);
        }
    