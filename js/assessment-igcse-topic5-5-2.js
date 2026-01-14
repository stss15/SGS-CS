/**
 * Extracted from public/igcse/topic5/5.2_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "5.2 Digital Currency";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Fiat vs Digital)
        const q1Items = [
            { id: 'f1', text: 'Physical form (coins/notes)', correct: 'fiat' },
            { id: 'f2', text: 'Backed by governments', correct: 'fiat' },
            { id: 'f3', text: 'Legal tender in physical stores', correct: 'fiat' },
            { id: 'd1', text: 'Exists purely as data', correct: 'digital' },
            { id: 'd2', text: 'Transferred via apps/online', correct: 'digital' },
            { id: 'd3', text: 'Can be cryptocurrency', correct: 'digital' }
        ];

        // Q2 Data (Blockchain Components)
        const q2Defs = [
            { id: '1', text: 'The first block in a chain' },
            { id: '2', text: 'Unique fingerprint of a block' },
            { id: '3', text: 'Network user who verifies transactions' },
            { id: '4', text: 'No central server or authority' }
        ];
        const q2Terms = [
            { id: '1', text: 'Genesis Block' },
            { id: '2', text: 'Hash Value' },
            { id: '3', text: 'Miner' },
            { id: '4', text: 'Decentralised' }
        ];

        // Q4 Data (Crypto Features)
        const q4Statements = [
            { id: 1, text: 'Cryptocurrency is regulated by a central bank.', answer: false },
            { id: 2, text: 'Transactions are public and trackable.', answer: true },
            { id: 3, text: 'It uses a blockchain network for security.', answer: true },
            { id: 4, text: 'It is impossible to hack a single block without invalidating the chain.', answer: true }
        ];
        let q4Selections = {};

        // Dropdown Options
        const dropdownOptions = {
            q3: [
                'Transaction takes place',
                'New block is created with data',
                'Hash value is generated',
                'Block is sent to network for checking',
                'Block is added to the chain'
            ],
            q5a: ['Data', 'Money', 'Pictures', 'Emails'],
            q5b: ['Hash', 'Code', 'Password', 'Key'],
            q5c: ['Previous Hash', 'Next Hash', 'Genesis Block', 'Miner'],
            q5d: ['Timestamp', 'Date', 'Time', 'Clock']
        };

        const questionMeta = [
            { id: 'q1', title: 'Fiat vs Digital', type: 'drag', correctAnswer: { fiat: ['Physical', 'Gov Backed'], digital: ['Data only', 'Apps', 'Crypto'] } },
            { id: 'q2', title: 'Blockchain Terms', type: 'match', correctAnswer: { '1': 'Genesis', '2': 'Hash', '3': 'Miner', '4': 'Decentralised' } },
            { id: 'q3', title: 'Blockchain Process', type: 'order', correctAnswer: ['Transaction', 'Create Block', 'Generate Hash', 'Verify', 'Add to Chain'] },
            { id: 'q4', title: 'Crypto Features', type: 'tf', correctAnswer: { 1: false, 2: true, 3: true, 4: true } },
            { id: 'q5', title: 'Block Structure', type: 'dropdown', correctAnswer: { a: 'Data', b: 'Hash', c: 'Previous Hash', d: 'Timestamp' } },
            { id: 'q6', title: 'Mining', type: 'mcq', correctAnswer: 'Validate transactions and create new blocks' },
            { id: 'q7', title: 'Security', type: 'trueFalse', correctAnswer: { tf1: true, tf2: true, tf3: false, tf4: true } },
            { id: 'q8', title: 'Transaction', type: 'sortable', correctAnswer: ['Initiate', 'Broadcast', 'Verify', 'Add'] },
            { id: 'q9', title: 'Benefits', type: 'match', correctAnswer: { '1': 'Transparency', '2': 'Security', '3': 'Traceability', '4': 'Efficiency' } },
            { id: 'q10', title: 'Crypto Terms', type: 'dropdown', correctAnswer: { a: 'wallet', b: '51% attack', c: 'Smart contracts', d: 'nonce' } }
        ];

        // Q6 MCQ Data
        const q6Options = [
            { text: 'Validate transactions and create new blocks', correct: true },
            { text: 'Delete old blocks', correct: false },
            { text: 'Create cryptocurrency logos', correct: false },
            { text: 'Store private keys', correct: false }
        ];
        let q6Selected = null;

        // Q7 True/False Data
        const q7Statements = [
            { id: 'tf1', text: 'Blockchain records cannot be easily modified', correct: true },
            { id: 'tf2', text: 'Transactions are verified by multiple nodes', correct: true },
            { id: 'tf3', text: 'A single entity controls the blockchain', correct: false },
            { id: 'tf4', text: 'Cryptographic hashing provides security', correct: true }
        ];

        // Q8 Sortable Data
        const q8Items = [
            { id: 't1', text: 'Initiate transaction', order: 1 },
            { id: 't2', text: 'Broadcast to network', order: 2 },
            { id: 't3', text: 'Verify by nodes', order: 3 },
            { id: 't4', text: 'Add to blockchain', order: 4 }
        ];

        // Q9 Matching Data
        const q9Defs = [
            { id: '1', text: 'All transactions are visible on the public ledger' },
            { id: '2', text: 'Cryptographic hashing protects data integrity' },
            { id: '3', text: 'Complete history of all transactions is maintained' },
            { id: '4', text: 'Removes need for intermediaries like banks' }
        ];
        const q9Terms = [
            { id: '1', text: 'Transparency' },
            { id: '2', text: 'Security' },
            { id: '3', text: 'Traceability' },
            { id: '4', text: 'Efficiency' }
        ];

        // Q10 Dropdown Options
        const q10Opts = {
            q10a: ['wallet', 'miner', 'node'],
            q10b: ['51% attack', '404 error', 'buffer overflow'],
            q10c: ['Smart contracts', 'Dumb scripts', 'Simple programs'],
            q10d: ['nonce', 'salt', 'pepper']
        };

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
            initMatch('q2', q2Defs, q2Terms);
            // Q3
            initOrder('q3', dropdownOptions.q3, 5);
            // Q4
            initTF('q4', q4Statements);
            // Q5
            populateDropdown('q5a', dropdownOptions.q5a);
            populateDropdown('q5b', dropdownOptions.q5b);
            populateDropdown('q5c', dropdownOptions.q5c);
            populateDropdown('q5d', dropdownOptions.q5d);
            // Q6: MCQ
            const q6Container = document.getElementById('q6-options');
            shuffle(q6Options).forEach(opt => {
                const div = document.createElement('div');
                div.className = 'mcq-option';
                div.dataset.correct = opt.correct;
                div.dataset.value = opt.text;
                div.textContent = opt.text;
                div.onclick = () => { if (!completed.q6) { q6Container.querySelectorAll('.mcq-option').forEach(o => o.classList.remove('selected')); div.classList.add('selected'); q6Selected = opt.text; } };
                q6Container.appendChild(div);
            });
            // Q7: True/False Table
            const q7Tbody = document.getElementById('q7-tbody');
            shuffle(q7Statements).forEach(stmt => {
                const tr = document.createElement('tr');
                tr.dataset.id = stmt.id;
                tr.dataset.correct = stmt.correct;
                tr.innerHTML = `<td>${stmt.text}</td><td><input type="radio" name="${stmt.id}" value="true"></td><td><input type="radio" name="${stmt.id}" value="false"></td>`;
                q7Tbody.appendChild(tr);
            });
            // Q8: Sortable List
            const q8List = document.getElementById('q8-list');
            shuffle(q8Items).forEach(item => {
                const li = document.createElement('li');
                li.className = 'sortable-item';
                li.draggable = true;
                li.dataset.order = item.order;
                li.innerHTML = `${item.text} <i class="fa-solid fa-grip-lines"></i>`;
                li.ondragstart = dragSortable;
                li.ondragover = dragOverSortable;
                li.ondrop = dropSortable;
                q8List.appendChild(li);
            });
            // Q9: Matching
            initMatch('q9', q9Defs, q9Terms);
            // Q10: Dropdowns
            populateDropdown('q10a', q10Opts.q10a);
            populateDropdown('q10b', q10Opts.q10b);
            populateDropdown('q10c', q10Opts.q10c);
            populateDropdown('q10d', q10Opts.q10d);
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

        // --- TRUE/FALSE ---
        function selectTF(rowId, val, qId) {
            if (!q4Selections[qId]) q4Selections[qId] = {};
            document.getElementById(`${qId}-${rowId}-t`).classList.remove('selected');
            document.getElementById(`${qId}-${rowId}-f`).classList.remove('selected');

            if (val === true) document.getElementById(`${qId}-${rowId}-t`).classList.add('selected');
            else document.getElementById(`${qId}-${rowId}-f`).classList.add('selected');

            q4Selections[qId][rowId] = val;
        }

        // --- CHECK ---
        function checkAnswers() {
            totalAttempts++;
            let allCorrect = true;

            // Q1 Drag
            if (!checkDragQuestion('q1', 'fiat', 'digital')) allCorrect = false;
            // Q2 Match
            if (!checkMatchQuestion('q2', 4)) allCorrect = false;
            // Q3 Order
            if (!checkOrderQuestion('q3', ['Transaction takes place', 'New block is created with data', 'Hash value is generated', 'Block is sent to network for checking', 'Block is added to the chain'])) allCorrect = false;
            // Q4 TF
            if (!checkTFQuestion('q4', q4Statements)) allCorrect = false;
            // Q5 Dropdown
            if (!checkDropdowns('q5', ['a', 'b', 'c', 'd'])) allCorrect = false;

            // Q6: MCQ
            if (q6Selected === 'Validate transactions and create new blocks') {
                markCorrect('q6');
                document.querySelectorAll('#q6-options .mcq-option').forEach(opt => { if (opt.dataset.correct === 'true') opt.classList.add('correct'); });
            } else {
                markWrong('q6');
                allCorrect = false;
                document.querySelectorAll('#q6-options .mcq-option.selected').forEach(opt => opt.classList.add('wrong'));
            }

            // Q7: True/False Table
            let q7Correct = true;
            document.querySelectorAll('#q7-tbody tr').forEach(row => {
                const selected = row.querySelector('input[type="radio"]:checked');
                if (!selected || selected.value !== row.dataset.correct) { q7Correct = false; row.classList.add('wrong-row'); }
                else row.classList.add('correct-row');
            });
            if (q7Correct) markCorrect('q7'); else { markWrong('q7'); allCorrect = false; }

            // Q8: Sortable List
            const q8List = document.getElementById('q8-list');
            const q8Order = Array.from(q8List.children).map(item => parseInt(item.dataset.order));
            if (q8Order.every((val, idx, arr) => idx === 0 || arr[idx - 1] < val) && q8Order.length === 4) {
                markCorrect('q8'); q8List.classList.add('correct');
            } else { markWrong('q8'); q8List.classList.add('wrong'); allCorrect = false; }

            // Q9: Matching
            if (!checkMatchQuestion('q9', 4)) allCorrect = false;

            // Q10: Dropdowns
            if (!checkDropdowns('q10', ['a', 'b', 'c', 'd'])) allCorrect = false;

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

        function checkTFQuestion(qId, statements) {
            let correct = true;
            const userSelections = q4Selections[qId] || {};

            statements.forEach(stmt => {
                const rowT = document.getElementById(`${qId}-${stmt.id}-t`);
                const rowF = document.getElementById(`${qId}-${stmt.id}-f`);

                // Reset visual state
                rowT.classList.remove('correct', 'wrong');
                rowF.classList.remove('correct', 'wrong');

                if (userSelections[stmt.id] === stmt.answer) {
                    // Correct
                    if (stmt.answer === true) rowT.classList.add('correct');
                    else rowF.classList.add('correct');
                } else {
                    // Wrong or unanswered
                    correct = false;
                    if (userSelections[stmt.id] !== undefined) {
                        if (userSelections[stmt.id] === true) rowT.classList.add('wrong');
                        else rowF.classList.add('wrong');
                    }
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
    