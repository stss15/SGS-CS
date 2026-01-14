/**
 * Extracted from public/igcse/topic1/1.1_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "1.1 Number Systems";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data
        const q1Defs = [
            { id: '1', text: 'Single 0 or 1' },
            { id: '2', text: '4 bits' },
            { id: '3', text: '8 bits' },
            { id: '4', text: 'Base 2 number system' },
            { id: '5', text: 'Base 16 number system' },
            { id: '6', text: 'Base 10 number system' }
        ];

        const q1Terms = [
            { id: '1', text: 'Bit' },
            { id: '2', text: 'Nibble' },
            { id: '3', text: 'Byte' },
            { id: '4', text: 'Binary' },
            { id: '5', text: 'Hexadecimal' },
            { id: '6', text: 'Denary' }
        ];

        // Q3 Data
        const q3Items = [
            { id: 's1', text: 'Left shift multiplies by 2', correct: 'true' },
            { id: 's2', text: 'Right shift divides by 2', correct: 'true' },
            { id: 's3', text: 'Overflow occurs when result is too big', correct: 'true' },
            { id: 's4', text: 'Left shift divides by 2', correct: 'false' },
            { id: 's5', text: 'Hexadecimal is understood by computers directly', correct: 'false' },
            { id: 's6', text: 'Two\'s complement is for unsigned numbers', correct: 'false' }
        ];

        // Q6 Data
        const q6Defs = [
            { id: '1', text: '10 (Denary)' },
            { id: '2', text: '15 (Denary)' },
            { id: '3', text: '1111 (Binary)' },
            { id: '4', text: '1010 (Binary)' },
            { id: '5', text: '255 (Denary)' }
        ];

        const q6Terms = [
            { id: '1', text: 'A' },
            { id: '2', text: 'F' },
            { id: '3', text: 'F' },
            { id: '4', text: 'A' },
            { id: '5', text: 'FF' }
        ];

        // Dropdown Options
        const dropdownOptions = {
            q2a: ['ON/OFF', 'High/Low', 'True/False'],
            q2b: ['shorter', 'longer', 'complex'],
            q2c: ['4', '8', '16'],
            q2d: ['A', 'B', 'C'],
            q2e: ['E', 'F', 'G'],
            q4a: ['106', '26', '530'],
            q4b: ['multiplies', 'divides', 'adds'],
            q4c: ['44', '88', '352'],
            q4d: ['lost', 'saved', 'wrapped'],
            q5: ['Write positive binary', 'Invert bits', 'Add 1', 'Subtract 1', 'Convert to Hex']
        };

        // Q7 MCQ Data
        const q7Options = [
            { text: '10100000', correct: true },
            { text: '10010000', correct: false },
            { text: '01100000', correct: false },
            { text: '11000000', correct: false }
        ];
        let q7Selected = null;

        // Q8 True/False Data
        const q8Statements = [
            { id: 'tf1', text: 'After 9 in hexadecimal comes A', correct: true },
            { id: 'tf2', text: 'An 8-bit unsigned integer can store values from 0 to 256', correct: false },
            { id: 'tf3', text: 'Two\'s complement requires inverting bits then adding 1', correct: true },
            { id: 'tf4', text: 'Right shift always preserves remainders exactly', correct: false }
        ];

        // Q10 Sortable Data (smallest to largest)
        const q10Items = [
            { id: 'u1', text: 'Bit', order: 1 },
            { id: 'u2', text: 'Nibble', order: 2 },
            { id: 'u3', text: 'Byte', order: 3 },
            { id: 'u4', text: 'Kilobyte', order: 4 },
            { id: 'u5', text: 'Megabyte', order: 5 }
        ];

        // Question Metadata
        const questionMeta = [
            { id: 'q1', title: 'Terminology Match', type: 'match', correctAnswer: { '1': 'Bit', '2': 'Nibble', '3': 'Byte', '4': 'Binary', '5': 'Hexadecimal', '6': 'Denary' } },
            { id: 'q2', title: 'Binary & Hex Concepts', type: 'dropdown', correctAnswer: { a: 'ON/OFF', b: 'shorter', c: '4', d: 'A', e: 'F' } },
            { id: 'q3', title: 'Binary Properties', type: 'drag', correctAnswer: { true: ['Left shift multiplies by 2', 'Right shift divides by 2', 'Overflow occurs when result is too big'], false: ['Left shift divides by 2', 'Hexadecimal is understood by computers directly', 'Two\'s complement is for unsigned numbers'] } },
            { id: 'q4', title: 'Logical Shifts', type: 'dropdown', correctAnswer: { a: '106', b: 'multiplies', c: '44', d: 'lost' } },
            { id: 'q5', title: 'Two\'s Complement', type: 'order', correctAnswer: ['Write positive binary', 'Invert bits', 'Add 1'] },
            { id: 'q6', title: 'Hex Conversions', type: 'match', correctAnswer: { '1': 'A', '2': 'F', '3': 'F', '4': 'A', '5': 'FF' } },
            { id: 'q7', title: 'Binary Addition', type: 'mcq', correctAnswer: '10100000' },
            { id: 'q8', title: 'Common Misconceptions', type: 'trueFalse', correctAnswer: { tf1: true, tf2: false, tf3: true, tf4: false } },
            { id: 'q9', title: 'Binary to Denary', type: 'numeric', correctAnswer: { a: 181, b: 90, c: 204 } },
            { id: 'q10', title: 'Data Units Order', type: 'sortable', correctAnswer: ['Bit', 'Nibble', 'Byte', 'Kilobyte', 'Megabyte'] }
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

            // Q6 Matching
            const q6D = shuffle(q6Defs);
            const q6T = shuffle(q6Terms);
            const q6DefsContainer = document.getElementById('col-defs-q6');
            const q6TermsContainer = document.getElementById('col-terms-q6');

            q6D.forEach(d => {
                const div = document.createElement('div');
                div.className = 'match-def';
                div.dataset.id = d.id;
                div.textContent = d.text;
                div.onclick = () => selectDef(div, 'q6');
                q6DefsContainer.appendChild(div);
            });

            q6T.forEach(t => {
                const div = document.createElement('div');
                div.className = 'match-term';
                div.dataset.id = t.id;
                div.textContent = t.text;
                div.onclick = () => selectTerm(div, 'q6');
                q6TermsContainer.appendChild(div);
            });

            // Populate Dropdowns
            populateDropdown('q2a', dropdownOptions.q2a);
            populateDropdown('q2b', dropdownOptions.q2b);
            populateDropdown('q2c', dropdownOptions.q2c);
            populateDropdown('q2d', dropdownOptions.q2d);
            populateDropdown('q2e', dropdownOptions.q2e);
            populateDropdown('q4a', dropdownOptions.q4a);
            populateDropdown('q4b', dropdownOptions.q4b);
            populateDropdown('q4c', dropdownOptions.q4c);
            populateDropdown('q4d', dropdownOptions.q4d);

            populateDropdown('q5a', dropdownOptions.q5);
            populateDropdown('q5b', dropdownOptions.q5);
            populateDropdown('q5c', dropdownOptions.q5);

            // Q7 MCQ
            const q7Container = document.getElementById('q7-options');
            const q7Shuffled = shuffle(q7Options);
            q7Shuffled.forEach((opt, idx) => {
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
        let selectedDef = { q1: null, q6: null };
        let selectedTerm = { q1: null, q6: null };
        let matchedPairs = { q1: [], q6: [] }; // Stores {defId, termId}

        function selectDef(el, qId) {
            if (el.classList.contains('match-solved')) return;

            // Deselect previous
            if (selectedDef[qId]) selectedDef[qId].classList.remove('match-selected');

            selectedDef[qId] = el;
            el.classList.add('match-selected');
            checkMatch(qId);
        }

        function selectTerm(el, qId) {
            if (el.classList.contains('match-solved')) return;

            // Deselect previous
            if (selectedTerm[qId]) selectedTerm[qId].classList.remove('match-selected');

            selectedTerm[qId] = el;
            el.classList.add('match-selected');
            checkMatch(qId);
        }

        function checkMatch(qId) {
            if (selectedDef[qId] && selectedTerm[qId]) {
                // Pair them visually
                selectedDef[qId].classList.remove('match-selected');
                selectedTerm[qId].classList.remove('match-selected');

                selectedDef[qId].classList.add('match-paired');
                selectedTerm[qId].classList.add('match-paired');

                // Store the pair
                // Remove any existing pair with these elements if re-pairing
                matchedPairs[qId] = matchedPairs[qId].filter(p => p.def !== selectedDef[qId] && p.term !== selectedTerm[qId]);

                matchedPairs[qId].push({
                    def: selectedDef[qId],
                    term: selectedTerm[qId],
                    defId: selectedDef[qId].dataset.id,
                    termId: selectedTerm[qId].dataset.id
                });

                // Reset selection
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
            // Check if all defs are paired correctly
            // Correct pairs: 1-1, 2-2, 3-3, 4-4, 5-5, 6-6
            // We need to check the matchedPairs array
            const q1Pairs = matchedPairs.q1;
            if (q1Pairs.length !== 6) q1Correct = false;
            else {
                q1Pairs.forEach(p => {
                    if (p.defId !== p.termId) q1Correct = false;
                });
            }

            if (q1Correct) {
                markCorrect('q1');
                // Lock pairs
                q1Pairs.forEach(p => {
                    p.def.classList.remove('match-paired');
                    p.term.classList.remove('match-paired');
                    p.def.classList.add('match-solved');
                    p.term.classList.add('match-solved');
                });
            } else {
                markWrong('q1');
                allCorrect = false;
                // Reset paired state for wrong ones? Or keep them?
                // For now, keep them paired so user can see what they did, but they are not locked.
                // Actually, standard behavior is usually to reset wrong pairs or just show red.
                // Let's leave them paired but user can click to change.
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

            // Q3: Drag & Drop (Categorisation)
            const bucketTrue = document.getElementById('bucket-true');
            const bucketFalse = document.getElementById('bucket-false');
            let q3Correct = true;

            // Check True Bucket
            Array.from(bucketTrue.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'true') q3Correct = false;
                }
            });
            // Check False Bucket
            Array.from(bucketFalse.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'false') q3Correct = false;
                }
            });
            // Ensure all items are placed
            if (document.getElementById('q3-source').children.length > 0) q3Correct = false;

            if (q3Correct) {
                markCorrect('q3');
                lockDragItems([bucketTrue, bucketFalse]);
            } else {
                markWrong('q3');
                allCorrect = false;
            }

            // Q4: Dropdowns
            const q4a = document.getElementById('q4a');
            const q4b = document.getElementById('q4b');
            const q4c = document.getElementById('q4c');
            const q4d = document.getElementById('q4d');

            if (checkSelect(q4a) && checkSelect(q4b) && checkSelect(q4c) && checkSelect(q4d)) {
                markCorrect('q4');
            } else {
                markWrong('q4');
                allCorrect = false;
            }

            // Q5: Ordering
            const q5a = document.getElementById('q5a');
            const q5b = document.getElementById('q5b');
            const q5c = document.getElementById('q5c');

            if (q5a.value === 'Write positive binary' && q5b.value === 'Invert bits' && q5c.value === 'Add 1') {
                markCorrect('q5');
                q5a.classList.add('correct');
                q5b.classList.add('correct');
                q5c.classList.add('correct');
            } else {
                markWrong('q5');
                allCorrect = false;
                if (q5a.value !== 'Write positive binary') q5a.classList.add('wrong');
                if (q5b.value !== 'Invert bits') q5b.classList.add('wrong');
                if (q5c.value !== 'Add 1') q5c.classList.add('wrong');
            }

            // Q6: Matching
            let q6Correct = true;
            const q6Pairs = matchedPairs.q6;
            // Correct pairs: 1-1, 2-2, 3-3, 4-4, 5-5
            if (q6Pairs.length !== 5) q6Correct = false;
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
            if (q7Selected === '10100000') {
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

            // Q9: Numeric Input
            const q9a = document.getElementById('q9a');
            const q9b = document.getElementById('q9b');
            const q9c = document.getElementById('q9c');
            if (checkNumeric(q9a) && checkNumeric(q9b) && checkNumeric(q9c)) {
                markCorrect('q9');
            } else {
                markWrong('q9');
                allCorrect = false;
            }

            // Q10: Sortable List
            const q10List = document.getElementById('q10-list');
            const q10Items = Array.from(q10List.children);
            const q10Order = q10Items.map(item => parseInt(item.dataset.order));
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

        function checkNumeric(el) {
            const correct = parseInt(el.dataset.answer);
            const value = parseInt(el.value);
            if (value === correct) {
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
                // Simple string representation of answer
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
                doc.text((mistakeCounts[q] + 1).toString(), 85, ty); // +1 because 0 mistakes = 1 attempt
                doc.rect(130, ty - 4, 30, 6); // Empty box for code
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
    