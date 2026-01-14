/**
 * Extracted from public/igcse/topic1/1.3_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "1.3 Data Storage & Compression";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data
        const q1Defs = [
            { id: '1', text: '1,024 bytes (2^10)' },
            { id: '2', text: '1,048,576 bytes (2^20)' },
            { id: '3', text: '1,073,741,824 bytes (2^30)' },
            { id: '4', text: '1,000 bytes (Decimal)' },
            { id: '5', text: 'Single 0 or 1' },
            { id: '6', text: '8 bits' }
        ];

        const q1Terms = [
            { id: '1', text: '1 KiB' },
            { id: '2', text: '1 MiB' },
            { id: '3', text: '1 GiB' },
            { id: '4', text: '1 KB' },
            { id: '5', text: 'Bit' },
            { id: '6', text: 'Byte' }
        ];

        // Q2 Data
        const q2Items = [
            { id: 'l1', text: 'Removes data permanently', correct: 'lossy' },
            { id: 'l2', text: 'Used for MP3 and JPEG', correct: 'lossy' },
            { id: 'l3', text: 'Higher compression ratio', correct: 'lossy' },
            { id: 'nl1', text: 'Original file reconstructed exactly', correct: 'lossless' },
            { id: 'nl2', text: 'Used for ZIP and text', correct: 'lossless' },
            { id: 'nl3', text: 'No quality loss', correct: 'lossless' }
        ];

        // Q5 Data
        const q5Items = [
            { id: 't1', text: 'Compression reduces file size', correct: 'true' },
            { id: 't2', text: 'RLE is lossless', correct: 'true' },
            { id: 't3', text: 'Lossy is bad for text', correct: 'true' },
            { id: 'f1', text: 'Lossless reduces quality', correct: 'false' },
            { id: 'f2', text: 'KB and KiB are same', correct: 'false' },
            { id: 'f3', text: 'Compression changes RAM usage', correct: 'false' }
        ];

        // Dropdown Options
        const dropdownOptions = {
            q3a: ['5,000', '500', '50,000'],
            q3b: ['4', '8', '16'],
            q3c: ['8', '10', '1024'],
            q3d: ['double', 'halve', 'quadruple'],
            q4a: ['80,000', '8,000', '800'],
            q4b: ['10,000', '1,000', '100'],
            q4c: ['20,000', '10,000', '40,000'],
            q6: ['Scan data for runs', 'Count repetitions', 'Store value and count', 'Repeat for next run']
        };

        // Q7 MCQ Data
        const q7Options = [
            { text: 'It reduces file size for faster transfer and saves storage space', correct: true },
            { text: 'It makes files easier to read by humans', correct: false },
            { text: 'It increases the quality of images and sound', correct: false },
            { text: 'It converts files to a different format automatically', correct: false }
        ];
        let q7Selected = null;

        // Q8 True/False Data
        const q8Statements = [
            { id: 'tf1', text: '1 KB (decimal) equals exactly 1024 bytes', correct: false },
            { id: 'tf2', text: 'JPEG uses lossy compression', correct: true },
            { id: 'tf3', text: 'PNG uses lossless compression', correct: true },
            { id: 'tf4', text: 'Doubling bit depth doubles file size', correct: true }
        ];

        // Q10 Sortable Data (smallest to largest)
        const q10Items = [
            { id: 'u1', text: 'Nibble (4 bits)', order: 1 },
            { id: 'u2', text: 'Byte (8 bits)', order: 2 },
            { id: 'u3', text: 'KiB (1024 bytes)', order: 3 },
            { id: 'u4', text: 'MiB (1024 KiB)', order: 4 },
            { id: 'u5', text: 'GiB (1024 MiB)', order: 5 }
        ];

        // Question Metadata
        const questionMeta = [
            { id: 'q1', title: 'Binary Prefixes', type: 'match', correctAnswer: { '1': '1 KiB', '2': '1 MiB', '3': '1 GiB', '4': '1 KB', '5': 'Bit', '6': 'Byte' } },
            { id: 'q2', title: 'Lossy vs Lossless', type: 'drag', correctAnswer: { lossy: ['Removes data permanently', 'Used for MP3 and JPEG', 'Higher compression ratio'], lossless: ['Original file reconstructed exactly', 'Used for ZIP and text', 'No quality loss'] } },
            { id: 'q3', title: 'Image Size Calc', type: 'dropdown', correctAnswer: { a: '5,000', b: '4', c: '8', d: 'double' } },
            { id: 'q4', title: 'Sound Size Calc', type: 'dropdown', correctAnswer: { a: '80,000', b: '10,000', c: '20,000' } },
            { id: 'q5', title: 'Compression Concepts', type: 'drag', correctAnswer: { true: ['Compression reduces file size', 'RLE is lossless', 'Lossy is bad for text'], false: ['Lossless reduces quality', 'KB and KiB are same', 'Compression changes RAM usage'] } },
            { id: 'q6', title: 'RLE Logic', type: 'order', correctAnswer: ['Scan data for runs', 'Count repetitions', 'Store value and count', 'Repeat for next run'] },
            { id: 'q7', title: 'Compression Purpose', type: 'mcq', correctAnswer: 'It reduces file size for faster transfer and saves storage space' },
            { id: 'q8', title: 'Storage Misconceptions', type: 'trueFalse', correctAnswer: { tf1: false, tf2: true, tf3: true, tf4: true } },
            { id: 'q9', title: 'Unit Conversions', type: 'numeric', correctAnswer: { a: 2048, b: 4, c: 1024 } },
            { id: 'q10', title: 'Storage Units Order', type: 'sortable', correctAnswer: ['Nibble (4 bits)', 'Byte (8 bits)', 'KiB (1024 bytes)', 'MiB (1024 KiB)', 'GiB (1024 MiB)'] }
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

            // Q2 Drag & Drop
            const q2S = shuffle(q2Items);
            const q2Source = document.getElementById('q2-source');
            q2S.forEach(item => {
                const div = document.createElement('div');
                div.className = 'drag-item';
                div.draggable = true;
                div.id = item.id;
                div.textContent = item.text;
                div.dataset.correct = item.correct;
                div.ondragstart = drag;
                q2Source.appendChild(div);
            });

            // Q5 Drag & Drop
            const q5S = shuffle(q5Items);
            const q5Source = document.getElementById('q5-source');
            q5S.forEach(item => {
                const div = document.createElement('div');
                div.className = 'drag-item';
                div.draggable = true;
                div.id = item.id;
                div.textContent = item.text;
                div.dataset.correct = item.correct;
                div.ondragstart = drag;
                q5Source.appendChild(div);
            });

            // Populate Dropdowns
            populateDropdown('q3a', dropdownOptions.q3a);
            populateDropdown('q3b', dropdownOptions.q3b);
            populateDropdown('q3c', dropdownOptions.q3c);
            populateDropdown('q3d', dropdownOptions.q3d);
            populateDropdown('q4a', dropdownOptions.q4a);
            populateDropdown('q4b', dropdownOptions.q4b);
            populateDropdown('q4c', dropdownOptions.q4c);

            populateDropdown('q6a', dropdownOptions.q6);
            populateDropdown('q6b', dropdownOptions.q6);
            populateDropdown('q6c', dropdownOptions.q6);
            populateDropdown('q6d', dropdownOptions.q6);

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
            if (q1Pairs.length !== 6) q1Correct = false;
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

            // Q2: Drag & Drop
            const bucketLossy = document.getElementById('bucket-lossy');
            const bucketLossless = document.getElementById('bucket-lossless');
            let q2Correct = true;

            Array.from(bucketLossy.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'lossy') q2Correct = false;
                }
            });
            Array.from(bucketLossless.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'lossless') q2Correct = false;
                }
            });
            if (document.getElementById('q2-source').children.length > 0) q2Correct = false;

            if (q2Correct) {
                markCorrect('q2');
                lockDragItems([bucketLossy, bucketLossless]);
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

            if (checkSelect(q4a) && checkSelect(q4b) && checkSelect(q4c)) {
                markCorrect('q4');
            } else {
                markWrong('q4');
                allCorrect = false;
            }

            // Q5: Drag & Drop
            const bucketTrue = document.getElementById('bucket-true');
            const bucketFalse = document.getElementById('bucket-false');
            let q5Correct = true;

            Array.from(bucketTrue.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'true') q5Correct = false;
                }
            });
            Array.from(bucketFalse.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'false') q5Correct = false;
                }
            });
            if (document.getElementById('q5-source').children.length > 0) q5Correct = false;

            if (q5Correct) {
                markCorrect('q5');
                lockDragItems([bucketTrue, bucketFalse]);
            } else {
                markWrong('q5');
                allCorrect = false;
            }

            // Q6: Ordering
            const q6a = document.getElementById('q6a');
            const q6b = document.getElementById('q6b');
            const q6c = document.getElementById('q6c');
            const q6d = document.getElementById('q6d');

            if (q6a.value === 'Scan data for runs' && q6b.value === 'Count repetitions' && q6c.value === 'Store value and count' && q6d.value === 'Repeat for next run') {
                markCorrect('q6');
                q6a.classList.add('correct');
                q6b.classList.add('correct');
                q6c.classList.add('correct');
                q6d.classList.add('correct');
            } else {
                markWrong('q6');
                allCorrect = false;
                if (q6a.value !== 'Scan data for runs') q6a.classList.add('wrong');
                if (q6b.value !== 'Count repetitions') q6b.classList.add('wrong');
                if (q6c.value !== 'Store value and count') q6c.classList.add('wrong');
                if (q6d.value !== 'Repeat for next run') q6d.classList.add('wrong');
            }

            // Q7: MCQ
            if (q7Selected === 'It reduces file size for faster transfer and saves storage space') {
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
    