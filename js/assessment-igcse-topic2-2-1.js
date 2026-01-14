/**
 * Extracted from public/igcse/topic2/2.1_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "2.1 Data Transmission";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data
        const q1Items = [
            { id: 'h1', text: 'Sender IP Address', correct: 'header' },
            { id: 'h2', text: 'Receiver IP Address', correct: 'header' },
            { id: 'h3', text: 'Sequence Number', correct: 'header' },
            { id: 'p1', text: 'Actual Data (~64 KiB)', correct: 'payload' },
            { id: 't1', text: 'End of Packet Marker', correct: 'trailer' },
            { id: 't2', text: 'Error Check / CRC', correct: 'trailer' }
        ];

        // Q2 Data
        const q2Defs = [
            { id: '1', text: 'One direction only' },
            { id: '2', text: 'Both directions but not at same time' },
            { id: '3', text: 'Both directions simultaneously' },
            { id: '4', text: 'One bit at a time over single wire' },
            { id: '5', text: 'Multiple bits at a time over multiple wires' }
        ];

        const q2Terms = [
            { id: '1', text: 'Simplex' },
            { id: '2', text: 'Half-Duplex' },
            { id: '3', text: 'Full-Duplex' },
            { id: '4', text: 'Serial' },
            { id: '5', text: 'Parallel' }
        ];

        // Q3 Data
        const q3Items = [
            { id: 's1', text: 'Slower transmission rate', correct: 'serial' },
            { id: 's2', text: 'Good for long distances', correct: 'serial' },
            { id: 's3', text: 'No data skewing', correct: 'serial' },
            { id: 'p1', text: 'Faster transmission rate', correct: 'parallel' },
            { id: 'p2', text: 'Good for short distances', correct: 'parallel' },
            { id: 'p3', text: 'Prone to data skewing', correct: 'parallel' }
        ];

        // Q4 Data
        const q4Items = [
            { id: 't1', text: 'USB uses serial data transmission', correct: 'true' },
            { id: 't2', text: 'Devices are automatically detected', correct: 'true' },
            { id: 't3', text: 'Cable supplies power (+5V)', correct: 'true' },
            { id: 't4', text: 'Connectors fit only one way', correct: 'true' },
            { id: 'f1', text: 'USB uses parallel data transmission', correct: 'false' },
            { id: 'f2', text: 'USB cables can be unlimited length', correct: 'false' },
            { id: 'f3', text: 'USB only supports simplex', correct: 'false' }
        ];

        // Dropdown Options
        const dropdownOptions = {
            q5: ['Data is broken into packets', 'Packets travel independently via routers', 'Routers decide the path for each packet', 'Packets arrive (possibly out of order)', 'Packets are reassembled using sequence numbers'],
            q6a: ['parallel', 'serial', 'simplex'],
            q6b: ['skewed', 'lost', 'encrypted'],
            q6c: ['serial', 'parallel', 'duplex'],
            q9a: ['Serial', 'Parallel', 'Simple'],
            q9b: ['5', '10', '20'],
            q9c: ['+5V', '+12V', '+3.3V'],
            q9d: ['backward compatible', 'forward compatible', 'not compatible']
        };

        // Q7 MCQ Data (which is NOT a benefit)
        const q7Options = [
            { text: 'Packets may arrive out of order causing delay', correct: true },
            { text: 'Can re-route around failed lines', correct: false },
            { text: 'No need to tie up a single line', correct: false },
            { text: 'High data transmission rate is possible', correct: false }
        ];
        let q7Selected = null;

        // Q8 True/False Data
        const q8Statements = [
            { id: 'tf1', text: 'Packets contain error checking in the trailer', correct: true },
            { id: 'tf2', text: 'Simplex allows data to flow in both directions', correct: false },
            { id: 'tf3', text: 'USB-C connector can be inserted either way round', correct: true },
            { id: 'tf4', text: 'Parallel transmission is better for long distances', correct: false }
        ];

        // Q10 Sortable Data (CRC steps)
        const q10Items = [
            { id: 'crc1', text: 'Sender counts all 1-bits in payload', order: 1 },
            { id: 'crc2', text: 'Count is stored as hex in trailer', order: 2 },
            { id: 'crc3', text: 'Packet is sent to receiver', order: 3 },
            { id: 'crc4', text: 'Receiver recalculates the 1-bit count', order: 4 },
            { id: 'crc5', text: 'Values are compared for errors', order: 5 }
        ];

        // Question Metadata
        const questionMeta = [
            { id: 'q1', title: 'Packet Structure', type: 'drag', correctAnswer: { header: ['Sender IP Address', 'Receiver IP Address', 'Sequence Number'], payload: ['Actual Data (~64 KiB)'], trailer: ['End of Packet Marker', 'Error Check / CRC'] } },
            { id: 'q2', title: 'Transmission Modes', type: 'match', correctAnswer: { '1': 'Simplex', '2': 'Half-Duplex', '3': 'Full-Duplex', '4': 'Serial', '5': 'Parallel' } },
            { id: 'q3', title: 'Serial vs Parallel', type: 'drag', correctAnswer: { serial: ['Slower transmission rate', 'Good for long distances', 'No data skewing'], parallel: ['Faster transmission rate', 'Good for short distances', 'Prone to data skewing'] } },
            { id: 'q4', title: 'USB Features', type: 'drag', correctAnswer: { true: ['USB uses serial data transmission', 'Devices are automatically detected', 'Cable supplies power (+5V)', 'Connectors fit only one way'], false: ['USB uses parallel data transmission', 'USB cables can be unlimited length', 'USB only supports simplex'] } },
            { id: 'q5', title: 'Packet Switching', type: 'order', correctAnswer: ['Data is broken into packets', 'Packets travel independently via routers', 'Routers decide the path for each packet', 'Packets arrive (possibly out of order)', 'Packets are reassembled using sequence numbers'] },
            { id: 'q6', title: 'Data Skewing', type: 'dropdown', correctAnswer: { a: 'parallel', b: 'skewed', c: 'serial' } },
            { id: 'q7', title: 'Packet Switching Benefits', type: 'mcq', correctAnswer: 'Packets may arrive out of order causing delay' },
            { id: 'q8', title: 'Transmission Concepts', type: 'trueFalse', correctAnswer: { tf1: true, tf2: false, tf3: true, tf4: false } },
            { id: 'q9', title: 'USB Specifications', type: 'dropdown', correctAnswer: { a: 'Serial', b: '5', c: '+5V', d: 'backward compatible' } },
            { id: 'q10', title: 'CRC Error Checking', type: 'sortable', correctAnswer: ['Sender counts all 1-bits in payload', 'Count is stored as hex in trailer', 'Packet is sent to receiver', 'Receiver recalculates the 1-bit count', 'Values are compared for errors'] }
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
            const defsContainer = document.getElementById('col-defs');
            const termsContainer = document.getElementById('col-terms');

            q2D.forEach(d => {
                const div = document.createElement('div');
                div.className = 'match-def';
                div.dataset.id = d.id;
                div.textContent = d.text;
                div.onclick = () => selectDef(div, 'q2');
                defsContainer.appendChild(div);
            });

            q2T.forEach(t => {
                const div = document.createElement('div');
                div.className = 'match-term';
                div.dataset.id = t.id;
                div.textContent = t.text;
                div.onclick = () => selectTerm(div, 'q2');
                termsContainer.appendChild(div);
            });

            // Q3 Drag & Drop
            const q3S = shuffle(q3Items);
            const q3Source = document.getElementById('q3-source');
            q3S.forEach(item => {
                const div = document.createElement('div');
                div.className = 'drag-item';
                div.draggable = true;
                div.id = item.id;
                div.textContent = item.text;
                div.dataset.correct = item.correct;
                div.ondragstart = drag;
                q3Source.appendChild(div);
            });

            // Q4 Drag & Drop
            const q4S = shuffle(q4Items);
            const q4Source = document.getElementById('q4-source');
            q4S.forEach(item => {
                const div = document.createElement('div');
                div.className = 'drag-item';
                div.draggable = true;
                div.id = item.id;
                div.textContent = item.text;
                div.dataset.correct = item.correct;
                div.ondragstart = drag;
                q4Source.appendChild(div);
            });

            // Populate Dropdowns
            populateDropdown('q5a', dropdownOptions.q5);
            populateDropdown('q5b', dropdownOptions.q5);
            populateDropdown('q5c', dropdownOptions.q5);
            populateDropdown('q5d', dropdownOptions.q5);
            populateDropdown('q5e', dropdownOptions.q5);

            populateDropdown('q6a', dropdownOptions.q6a);
            populateDropdown('q6b', dropdownOptions.q6b);
            populateDropdown('q6c', dropdownOptions.q6c);

            // Q7 MCQ
            const q7Container = document.getElementById('q7-options');
            const q7Shuffled = shuffle(q7Options);
            q7Shuffled.forEach(opt => {
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
            const q8Shuffled = shuffle(q8Statements);
            q8Shuffled.forEach(stmt => {
                const tr = document.createElement('tr');
                tr.dataset.id = stmt.id;
                tr.dataset.correct = stmt.correct;
                tr.innerHTML = `
                    <td>${stmt.text}</td>
                    <td><input type="radio" name="${stmt.id}" value="true"></td>
                    <td><input type="radio" name="${stmt.id}" value="false"></td>
                `;
                q8Tbody.appendChild(tr);
            });

            // Q9 Dropdowns
            populateDropdown('q9a', dropdownOptions.q9a);
            populateDropdown('q9b', dropdownOptions.q9b);
            populateDropdown('q9c', dropdownOptions.q9c);
            populateDropdown('q9d', dropdownOptions.q9d);

            // Q10 Sortable List
            const q10List = document.getElementById('q10-list');
            const q10Shuffled = shuffle(q10Items);
            q10Shuffled.forEach(item => {
                const li = document.createElement('li');
                li.className = 'sortable-item';
                li.draggable = true;
                li.dataset.order = item.order;
                li.innerHTML = `${item.text} <i class="fa-solid fa-grip-lines"></i>`;
                li.ondragstart = dragSortable;
                li.ondragover = dragOverSortable;
                li.ondrop = dropSortable;
                q10List.appendChild(li);
            });
        }

        // MCQ Selection
        function selectMCQ(el, qId) {
            if (completed[qId]) return;
            const container = el.parentElement;
            container.querySelectorAll('.mcq-option').forEach(opt => opt.classList.remove('selected'));
            el.classList.add('selected');
            if (qId === 'q7') q7Selected = el.dataset.value;
        }

        // Sortable List Functions
        let draggedSortable = null;
        function dragSortable(ev) {
            draggedSortable = ev.target;
            ev.target.style.opacity = '0.5';
        }
        function dragOverSortable(ev) {
            ev.preventDefault();
        }
        function dropSortable(ev) {
            ev.preventDefault();
            if (ev.target.classList.contains('sortable-item') && draggedSortable !== ev.target) {
                const list = ev.target.parentElement;
                const items = Array.from(list.children);
                const draggedIdx = items.indexOf(draggedSortable);
                const targetIdx = items.indexOf(ev.target);
                if (draggedIdx < targetIdx) {
                    ev.target.after(draggedSortable);
                } else {
                    ev.target.before(draggedSortable);
                }
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
        let selectedDef = { q2: null };
        let selectedTerm = { q2: null };
        let matchedPairs = { q2: [] };

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
            const bucketHeader = document.getElementById('bucket-header');
            const bucketPayload = document.getElementById('bucket-payload');
            const bucketTrailer = document.getElementById('bucket-trailer');
            let q1Correct = true;

            Array.from(bucketHeader.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'header') q1Correct = false;
                }
            });
            Array.from(bucketPayload.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'payload') q1Correct = false;
                }
            });
            Array.from(bucketTrailer.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'trailer') q1Correct = false;
                }
            });
            if (document.getElementById('q1-source').children.length > 0) q1Correct = false;

            if (q1Correct) {
                markCorrect('q1');
                lockDragItems([bucketHeader, bucketPayload, bucketTrailer]);
            } else {
                markWrong('q1');
                allCorrect = false;
            }

            // Q2: Matching
            let q2Correct = true;
            const q2Pairs = matchedPairs.q2;
            if (q2Pairs.length !== 5) q2Correct = false;
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

            // Q3: Drag & Drop
            const bucketSerial = document.getElementById('bucket-serial');
            const bucketParallel = document.getElementById('bucket-parallel');
            let q3Correct = true;

            Array.from(bucketSerial.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'serial') q3Correct = false;
                }
            });
            Array.from(bucketParallel.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'parallel') q3Correct = false;
                }
            });
            if (document.getElementById('q3-source').children.length > 0) q3Correct = false;

            if (q3Correct) {
                markCorrect('q3');
                lockDragItems([bucketSerial, bucketParallel]);
            } else {
                markWrong('q3');
                allCorrect = false;
            }

            // Q4: Drag & Drop
            const bucketTrue = document.getElementById('bucket-true');
            const bucketFalse = document.getElementById('bucket-false');
            let q4Correct = true;

            Array.from(bucketTrue.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'true') q4Correct = false;
                }
            });
            Array.from(bucketFalse.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'false') q4Correct = false;
                }
            });
            if (document.getElementById('q4-source').children.length > 0) q4Correct = false;

            if (q4Correct) {
                markCorrect('q4');
                lockDragItems([bucketTrue, bucketFalse]);
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

            if (q5a.value === 'Data is broken into packets' && q5b.value === 'Packets travel independently via routers' && q5c.value === 'Routers decide the path for each packet' && q5d.value === 'Packets arrive (possibly out of order)' && q5e.value === 'Packets are reassembled using sequence numbers') {
                markCorrect('q5');
                q5a.classList.add('correct');
                q5b.classList.add('correct');
                q5c.classList.add('correct');
                q5d.classList.add('correct');
                q5e.classList.add('correct');
            } else {
                markWrong('q5');
                allCorrect = false;
                if (q5a.value !== 'Data is broken into packets') q5a.classList.add('wrong');
                if (q5b.value !== 'Packets travel independently via routers') q5b.classList.add('wrong');
                if (q5c.value !== 'Routers decide the path for each packet') q5c.classList.add('wrong');
                if (q5d.value !== 'Packets arrive (possibly out of order)') q5d.classList.add('wrong');
                if (q5e.value !== 'Packets are reassembled using sequence numbers') q5e.classList.add('wrong');
            }

            // Q6: Dropdowns
            const q6a = document.getElementById('q6a');
            const q6b = document.getElementById('q6b');
            const q6c = document.getElementById('q6c');

            if (checkSelect(q6a) && checkSelect(q6b) && checkSelect(q6c)) {
                markCorrect('q6');
            } else {
                markWrong('q6');
                allCorrect = false;
            }

            // Q7: MCQ
            if (q7Selected === 'Packets may arrive out of order causing delay') {
                markCorrect('q7');
                document.querySelectorAll('#q7-options .mcq-option').forEach(opt => {
                    if (opt.dataset.correct === 'true') {
                        opt.classList.add('correct');
                    }
                });
            } else {
                markWrong('q7');
                allCorrect = false;
                document.querySelectorAll('#q7-options .mcq-option.selected').forEach(opt => {
                    opt.classList.add('wrong');
                });
            }

            // Q8: True/False Grid
            let q8Correct = true;
            const q8Rows = document.querySelectorAll('#q8-tbody tr');
            q8Rows.forEach(row => {
                const correctAnswer = row.dataset.correct;
                const selected = row.querySelector('input[type="radio"]:checked');
                if (!selected || selected.value !== correctAnswer) {
                    q8Correct = false;
                    row.classList.add('wrong-row');
                } else {
                    row.classList.add('correct-row');
                }
            });
            if (q8Correct) {
                markCorrect('q8');
            } else {
                markWrong('q8');
                allCorrect = false;
            }

            // Q9: Dropdowns
            const q9a = document.getElementById('q9a');
            const q9b = document.getElementById('q9b');
            const q9c = document.getElementById('q9c');
            const q9d = document.getElementById('q9d');

            if (checkSelect(q9a) && checkSelect(q9b) && checkSelect(q9c) && checkSelect(q9d)) {
                markCorrect('q9');
            } else {
                markWrong('q9');
                allCorrect = false;
            }

            // Q10: Sortable List
            const q10List = document.getElementById('q10-list');
            const q10ListItems = Array.from(q10List.children);
            const q10Order = q10ListItems.map(item => parseInt(item.dataset.order));
            const isCorrectOrder = q10Order.every((val, idx, arr) => idx === 0 || arr[idx - 1] < val);
            if (isCorrectOrder && q10Order.length === 5) {
                markCorrect('q10');
                q10List.classList.add('correct');
            } else {
                markWrong('q10');
                q10List.classList.add('wrong');
                allCorrect = false;
            }

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
    