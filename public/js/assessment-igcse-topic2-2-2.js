/**
 * Extracted from public/igcse/topic2/2.2_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "2.2 Error Checking";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data
        const q1Defs = [
            { id: '1', text: 'Uses a bit to ensure even/odd number of 1s' },
            { id: '2', text: 'Calculates a value from data block to compare' },
            { id: '3', text: 'Sends data back to sender for comparison' },
            { id: '4', text: 'Uses acknowledgements and timeouts' },
            { id: '5', text: 'Final digit calculated from other digits' }
        ];

        const q1Terms = [
            { id: '1', text: 'Parity Check' },
            { id: '2', text: 'Checksum' },
            { id: '3', text: 'Echo Check' },
            { id: '4', text: 'ARQ' },
            { id: '5', text: 'Check Digit' }
        ];

        // Q4 Data
        const q4Items = [
            { id: 't1', text: 'Used for barcodes and ISBNs', correct: 'true' },
            { id: 't2', text: 'Detects incorrect digits entered', correct: 'true' },
            { id: 't3', text: 'Detects transposition errors', correct: 'true' },
            { id: 't4', text: 'Calculated from all other digits', correct: 'true' },
            { id: 'f1', text: 'Corrects the error automatically', correct: 'false' },
            { id: 'f2', text: 'Used to encrypt data', correct: 'false' },
            { id: 'f3', text: 'Prevents data from being intercepted', correct: 'false' }
        ];

        // Q6 Data
        const q6Items = [
            { id: 'c1', text: 'Electrical interference', correct: 'cause' },
            { id: 'c2', text: 'Packet switching problems', correct: 'cause' },
            { id: 'c3', text: 'Data skewing', correct: 'cause' },
            { id: 'p1', text: 'Shielding cables', correct: 'prevention' },
            { id: 'p2', text: 'Parity checking', correct: 'prevention' },
            { id: 'p3', text: 'ARQ', correct: 'prevention' }
        ];

        // Dropdown Options
        const dropdownOptions = {
            q2a: ['even', 'odd', 'random'],
            q2b: ['4', '3', '5'],
            q2c: ['0', '1', '2'],
            q2d: ['3', '4', '2'],
            q2e: ['1', '0', '2'],
            q3: ['Sender transmits data block', 'Receiver checks for errors', 'If error found, Receiver sends Negative Acknowledgement', 'Sender re-transmits data', 'If no error, Receiver sends Positive Acknowledgement', 'If timeout occurs, Sender automatically re-transmits'],
            q5a: ['Row 3', 'Row 2', 'Row 4'],
            q5b: ['Column 2', 'Column 3', 'Column 1'],
            q5c: ['error correction', 'encryption', 'compression'],
            q10a: ['incorrectly', 'slowly', 'backwards'],
            q10b: ['transposition', 'encryption', 'compression'],
            q10c: ['5307', '5370', '3507'],
            q10d: ['modulo-10', 'modulo-11', 'modulo-8']
        };

        // Q7 MCQ Data (1010110 has 4 ones, for ODD parity need 1)
        const q7Options = [
            { text: '1 (making total 1-bits odd)', correct: true },
            { text: '0 (keeping total 1-bits even)', correct: false },
            { text: '2 (doubling the check)', correct: false },
            { text: 'Cannot be determined', correct: false }
        ];
        let q7Selected = null;

        // Q8 True/False Data
        const q8Statements = [
            { id: 'tf1', text: 'Parity checks can detect when 2 bits are changed', correct: false },
            { id: 'tf2', text: 'Echo check sends data back to the sender', correct: true },
            { id: 'tf3', text: 'Checksum uses an agreed algorithm between sender and receiver', correct: true },
            { id: 'tf4', text: 'Parity blocks can locate and correct single-bit errors', correct: true }
        ];

        // Q9 Sortable Data (Checksum steps)
        const q9Items = [
            { id: 'cs1', text: 'Checksum calculated from data block', order: 1 },
            { id: 'cs2', text: 'Checksum sent with data block', order: 2 },
            { id: 'cs3', text: 'Receiver recalculates checksum', order: 3 },
            { id: 'cs4', text: 'Checksums compared for match', order: 4 },
            { id: 'cs5', text: 'Re-send requested if mismatch', order: 5 }
        ];

        // Question Metadata
        const questionMeta = [
            { id: 'q1', title: 'Error Detection Methods', type: 'match', correctAnswer: { '1': 'Parity Check', '2': 'Checksum', '3': 'Echo Check', '4': 'ARQ', '5': 'Check Digit' } },
            { id: 'q2', title: 'Parity Logic', type: 'dropdown', correctAnswer: { a: 'even', b: '4', c: '0', d: '3', e: '1' } },
            { id: 'q3', title: 'ARQ Process', type: 'order', correctAnswer: ['Sender transmits data block', 'Receiver checks for errors', 'If error found, Receiver sends Negative Acknowledgement', 'Sender re-transmits data', 'If no error, Receiver sends Positive Acknowledgement', 'If timeout occurs, Sender automatically re-transmits'] },
            { id: 'q4', title: 'Check Digits', type: 'drag', correctAnswer: { true: ['Used for barcodes and ISBNs', 'Detects incorrect digits entered', 'Detects transposition errors', 'Calculated from all other digits'], false: ['Corrects the error automatically', 'Used to encrypt data', 'Prevents data from being intercepted'] } },
            { id: 'q5', title: 'Parity Block', type: 'dropdown', correctAnswer: { a: 'Row 3', b: 'Column 2', c: 'error correction' } },
            { id: 'q6', title: 'Error Causes', type: 'drag', correctAnswer: { cause: ['Electrical interference', 'Packet switching problems', 'Data skewing'], prevention: ['Shielding cables', 'Parity checking', 'ARQ'] } },
            { id: 'q7', title: 'Parity Calculation', type: 'mcq', correctAnswer: '1 (making total 1-bits odd)' },
            { id: 'q8', title: 'Error Detection Facts', type: 'trueFalse', correctAnswer: { tf1: false, tf2: true, tf3: true, tf4: true } },
            { id: 'q9', title: 'Checksum Process', type: 'sortable', correctAnswer: ['Checksum calculated from data block', 'Checksum sent with data block', 'Receiver recalculates checksum', 'Checksums compared for match', 'Re-send requested if mismatch'] },
            { id: 'q10', title: 'Check Digit Errors', type: 'dropdown', correctAnswer: { a: 'incorrectly', b: 'transposition', c: '5307', d: 'modulo-10' } }
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
            // Q1 Matching
            const q1D = shuffle(q1Defs);
            const q1T = shuffle(q1Terms);
            const defsContainer = document.getElementById('col-defs');
            const termsContainer = document.getElementById('col-terms');

            q1D.forEach(d => {
                const div = document.createElement('div');
                div.className = 'match-def';
                div.dataset.id = d.id;
                div.textContent = d.text;
                div.onclick = () => selectDef(div, 'q1');
                defsContainer.appendChild(div);
            });

            q1T.forEach(t => {
                const div = document.createElement('div');
                div.className = 'match-term';
                div.dataset.id = t.id;
                div.textContent = t.text;
                div.onclick = () => selectTerm(div, 'q1');
                termsContainer.appendChild(div);
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

            // Q6 Drag & Drop
            const q6S = shuffle(q6Items);
            const q6Source = document.getElementById('q6-source');
            q6S.forEach(item => {
                const div = document.createElement('div');
                div.className = 'drag-item';
                div.draggable = true;
                div.id = item.id;
                div.textContent = item.text;
                div.dataset.correct = item.correct;
                div.ondragstart = drag;
                q6Source.appendChild(div);
            });

            // Populate Dropdowns
            populateDropdown('q2a', dropdownOptions.q2a);
            populateDropdown('q2b', dropdownOptions.q2b);
            populateDropdown('q2c', dropdownOptions.q2c);
            populateDropdown('q2d', dropdownOptions.q2d);
            populateDropdown('q2e', dropdownOptions.q2e);

            populateDropdown('q3a', dropdownOptions.q3);
            populateDropdown('q3b', dropdownOptions.q3);
            populateDropdown('q3c', dropdownOptions.q3);
            populateDropdown('q3d', dropdownOptions.q3);
            populateDropdown('q3e', dropdownOptions.q3);
            populateDropdown('q3f', dropdownOptions.q3);

            populateDropdown('q5a', dropdownOptions.q5a);
            populateDropdown('q5b', dropdownOptions.q5b);
            populateDropdown('q5c', dropdownOptions.q5c);

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
            populateDropdown('q10a', dropdownOptions.q10a);
            populateDropdown('q10b', dropdownOptions.q10b);
            populateDropdown('q10c', dropdownOptions.q10c);
            populateDropdown('q10d', dropdownOptions.q10d);
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
        let selectedDef = { q1: null };
        let selectedTerm = { q1: null };
        let matchedPairs = { q1: [] };

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

            // Q1: Matching
            let q1Correct = true;
            const q1Pairs = matchedPairs.q1;
            if (q1Pairs.length !== 5) q1Correct = false;
            else {
                q1Pairs.forEach(p => {
                    if (p.defId !== p.termId) q1Correct = false;
                });
            }

            if (q1Correct) {
                markCorrect('q1');
                q1Pairs.forEach(p => {
                    p.def.classList.remove('match-paired');
                    p.term.classList.remove('match-paired');
                    p.def.classList.add('match-solved');
                    p.term.classList.add('match-solved');
                });
            } else {
                markWrong('q1');
                allCorrect = false;
            }

            // Q2: Dropdowns
            const q2a = document.getElementById('q2a');
            const q2b = document.getElementById('q2b');
            const q2c = document.getElementById('q2c');
            const q2d = document.getElementById('q2d');
            const q2e = document.getElementById('q2e');

            if (checkSelect(q2a) && checkSelect(q2b) && checkSelect(q2c) && checkSelect(q2d) && checkSelect(q2e)) {
                markCorrect('q2');
            } else {
                markWrong('q2');
                allCorrect = false;
            }

            // Q3: Ordering
            const q3a = document.getElementById('q3a');
            const q3b = document.getElementById('q3b');
            const q3c = document.getElementById('q3c');
            const q3d = document.getElementById('q3d');
            const q3e = document.getElementById('q3e');
            const q3f = document.getElementById('q3f');

            if (q3a.value === 'Sender transmits data block' && q3b.value === 'Receiver checks for errors' && q3c.value === 'If error found, Receiver sends Negative Acknowledgement' && q3d.value === 'Sender re-transmits data' && q3e.value === 'If no error, Receiver sends Positive Acknowledgement' && q3f.value === 'If timeout occurs, Sender automatically re-transmits') {
                markCorrect('q3');
                q3a.classList.add('correct');
                q3b.classList.add('correct');
                q3c.classList.add('correct');
                q3d.classList.add('correct');
                q3e.classList.add('correct');
                q3f.classList.add('correct');
            } else {
                markWrong('q3');
                allCorrect = false;
                if (q3a.value !== 'Sender transmits data block') q3a.classList.add('wrong');
                if (q3b.value !== 'Receiver checks for errors') q3b.classList.add('wrong');
                if (q3c.value !== 'If error found, Receiver sends Negative Acknowledgement') q3c.classList.add('wrong');
                if (q3d.value !== 'Sender re-transmits data') q3d.classList.add('wrong');
                if (q3e.value !== 'If no error, Receiver sends Positive Acknowledgement') q3e.classList.add('wrong');
                if (q3f.value !== 'If timeout occurs, Sender automatically re-transmits') q3f.classList.add('wrong');
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

            // Q5: Dropdowns
            const q5a = document.getElementById('q5a');
            const q5b = document.getElementById('q5b');
            const q5c = document.getElementById('q5c');

            if (checkSelect(q5a) && checkSelect(q5b) && checkSelect(q5c)) {
                markCorrect('q5');
            } else {
                markWrong('q5');
                allCorrect = false;
            }

            // Q6: Drag & Drop
            const bucketCause = document.getElementById('bucket-cause');
            const bucketPrevention = document.getElementById('bucket-prevention');
            let q6Correct = true;

            Array.from(bucketCause.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'cause') q6Correct = false;
                }
            });
            Array.from(bucketPrevention.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'prevention') q6Correct = false;
                }
            });
            if (document.getElementById('q6-source').children.length > 0) q6Correct = false;

            if (q6Correct) {
                markCorrect('q6');
                lockDragItems([bucketCause, bucketPrevention]);
            } else {
                markWrong('q6');
                allCorrect = false;
            }

            // Q7: MCQ
            if (q7Selected === '1 (making total 1-bits odd)') {
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
            if (q9Order.every((val, idx, arr) => idx === 0 || arr[idx - 1] < val) && q9Order.length === 5) {
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
    