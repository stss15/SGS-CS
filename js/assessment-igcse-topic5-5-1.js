/**
 * Extracted from public/igcse/topic5/5.1_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "5.1 Internet & WWW";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Internet vs WWW)
        const q1Items = [
            { id: 'i1', text: 'Worldwide collection of networks', correct: 'internet' },
            { id: 'i2', text: 'Physical infrastructure', correct: 'internet' },
            { id: 'i3', text: 'Uses TCP/IP', correct: 'internet' },
            { id: 'w1', text: 'Collection of web pages', correct: 'www' },
            { id: 'w2', text: 'Accessed via browsers', correct: 'www' },
            { id: 'w3', text: 'Uses HTTP/HTML', correct: 'www' }
        ];

        // Q2 Data (URL)
        const q2Defs = [
            { id: '1', text: 'https' },
            { id: '2', text: 'www.google.com' },
            { id: '3', text: '/images/logo.png' },
            { id: '4', text: '.com' }
        ];
        const q2Terms = [
            { id: '1', text: 'Protocol' },
            { id: '2', text: 'Domain Name' },
            { id: '3', text: 'Path/Filename' },
            { id: '4', text: 'Domain Type' }
        ];

        // Q5 Data (Cookies)
        const q5Defs = [
            { id: '1', text: 'Stored in temporary memory, deleted when browser closes' },
            { id: '2', text: 'Stored on hard drive, remembers login details' },
            { id: '3', text: 'Using cookies to monitor user browsing habits' },
            { id: '4', text: 'Used to protect personal data in cookies' }
        ];
        const q5Terms = [
            { id: '1', text: 'Session Cookie' },
            { id: '2', text: 'Persistent Cookie' },
            { id: '3', text: 'Tracking' },
            { id: '4', text: 'Encryption' }
        ];

        // Q6 Data (True/False)
        const q6Statements = [
            { id: 1, text: 'Browsers interpret HTML to display web pages.', answer: true },
            { id: 2, text: 'Browsers store the actual website files.', answer: false },
            { id: 3, text: 'History keeps a log of visited sites.', answer: true },
            { id: 4, text: 'Bookmarks allow quick access to favourite sites.', answer: true }
        ];
        let q6Selections = {};

        // Dropdown Options
        const dropdownOptions = {
            q3Proto: ['Hypertext Transfer Protocol', 'Hypertext Transport Protocol', 'High Transfer Protocol', 'HTML Protocol'],
            q3Enc: ['SSL/TLS', 'HTML/CSS', 'TCP/IP', 'DNS/URL'],
            q3Icon: ['padlock', 'key', 'shield', 'tick'],
            q3Use: ['online banking', 'reading news', 'watching videos', 'playing games'],
            q4: [
                'User types URL into browser',
                'Browser asks DNS server for IP address',
                'DNS server finds IP matching the domain',
                'DNS sends IP address back to browser',
                'Browser sends request to the web server IP'
            ]
        };

        const questionMeta = [
            { id: 'q1', title: 'Internet vs WWW', type: 'drag', correctAnswer: { internet: ['Networks', 'Infrastructure', 'TCP/IP'], www: ['Web pages', 'Browsers', 'HTTP/HTML'] } },
            { id: 'q2', title: 'URL Structure', type: 'match', correctAnswer: { '1': 'Protocol', '2': 'Domain', '3': 'Path', '4': 'Type' } },
            { id: 'q3', title: 'HTTP vs HTTPS', type: 'dropdown', correctAnswer: { a: 'Hypertext Transfer Protocol', b: 'SSL/TLS', c: 'padlock', d: 'online banking' } },
            { id: 'q4', title: 'DNS Process', type: 'order', correctAnswer: ['Type URL', 'Ask DNS', 'Find IP', 'Return IP', 'Request Server'] },
            { id: 'q5', title: 'Cookies', type: 'match', correctAnswer: { '1': 'Session', '2': 'Persistent', '3': 'Tracking', '4': 'Encryption' } },
            { id: 'q6', title: 'Browsers', type: 'tf', correctAnswer: { 1: true, 2: false, 3: true, 4: true } },
            { id: 'q7', title: 'Internet Services', type: 'mcq', correctAnswer: 'SMTP' },
            { id: 'q8', title: 'IP Facts', type: 'trueFalse', correctAnswer: { tf1: true, tf2: true, tf3: false, tf4: true } },
            { id: 'q9', title: 'Web Tech', type: 'sortable', correctAnswer: ['HTML', 'CSS', 'JavaScript'] },
            { id: 'q10', title: 'Browser Features', type: 'dropdown', correctAnswer: { a: 'rendering engine', b: 'Bookmarks', c: 'Extensions', d: 'Cache' } }
        ];

        // Q7 MCQ Data
        const q7Options = [
            { text: 'SMTP', correct: true },
            { text: 'HTTP', correct: false },
            { text: 'FTP', correct: false },
            { text: 'DNS', correct: false }
        ];
        let q7Selected = null;

        // Q8 True/False Data
        const q8Statements = [
            { id: 'tf1', text: 'Every device on the internet has a unique IP address', correct: true },
            { id: 'tf2', text: 'IPv6 addresses are longer than IPv4', correct: true },
            { id: 'tf3', text: 'IP addresses never change', correct: false },
            { id: 'tf4', text: 'DNS servers translate domain names to IP addresses', correct: true }
        ];

        // Q9 Sortable Data
        const q9Items = [
            { id: 'w1', text: 'HTML', order: 1 },
            { id: 'w2', text: 'CSS', order: 2 },
            { id: 'w3', text: 'JavaScript', order: 3 }
        ];

        // Q10 Dropdown Options
        const q10Opts = {
            q10a: ['rendering engine', 'compiler', 'database'],
            q10b: ['Bookmarks', 'Cookies', 'Extensions'],
            q10c: ['Extensions', 'Plugins', 'Bookmarks'],
            q10d: ['Cache', 'History', 'Cookies']
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
            populateDropdown('q3a', dropdownOptions.q3Proto);
            populateDropdown('q3b', dropdownOptions.q3Enc);
            populateDropdown('q3c', dropdownOptions.q3Icon);
            populateDropdown('q3d', dropdownOptions.q3Use);
            // Q4
            initOrder('q4', dropdownOptions.q4, 5);
            // Q5
            initMatch('q5', q5Defs, q5Terms);
            // Q6
            initTF('q6', q6Statements);
            // Q7: MCQ
            const q7Container = document.getElementById('q7-options');
            shuffle(q7Options).forEach(opt => {
                const div = document.createElement('div');
                div.className = 'mcq-option';
                div.dataset.correct = opt.correct;
                div.dataset.value = opt.text;
                div.textContent = opt.text;
                div.onclick = () => { if (!completed.q7) { q7Container.querySelectorAll('.mcq-option').forEach(o => o.classList.remove('selected')); div.classList.add('selected'); q7Selected = opt.text; } };
                q7Container.appendChild(div);
            });
            // Q8: True/False Table
            const q8Tbody = document.getElementById('q8-tbody');
            shuffle(q8Statements).forEach(stmt => {
                const tr = document.createElement('tr');
                tr.dataset.id = stmt.id;
                tr.dataset.correct = stmt.correct;
                tr.innerHTML = `<td>${stmt.text}</td><td><input type="radio" name="${stmt.id}" value="true"></td><td><input type="radio" name="${stmt.id}" value="false"></td>`;
                q8Tbody.appendChild(tr);
            });
            // Q9: Sortable List
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
            if (!q6Selections[qId]) q6Selections[qId] = {};
            document.getElementById(`${qId}-${rowId}-t`).classList.remove('selected');
            document.getElementById(`${qId}-${rowId}-f`).classList.remove('selected');

            if (val === true) document.getElementById(`${qId}-${rowId}-t`).classList.add('selected');
            else document.getElementById(`${qId}-${rowId}-f`).classList.add('selected');

            q6Selections[qId][rowId] = val;
        }

        // --- CHECK ---
        function checkAnswers() {
            totalAttempts++;
            let allCorrect = true;

            // Q1 Drag
            if (!checkDragQuestion('q1', 'internet', 'www')) allCorrect = false;
            // Q2 Match
            if (!checkMatchQuestion('q2', 4)) allCorrect = false;
            // Q3 Dropdown
            if (!checkDropdowns('q3', ['a', 'b', 'c', 'd'])) allCorrect = false;
            // Q4 Order
            if (!checkOrderQuestion('q4', ['User types URL into browser', 'Browser asks DNS server for IP address', 'DNS server finds IP matching the domain', 'DNS sends IP address back to browser', 'Browser sends request to the web server IP'])) allCorrect = false;
            // Q5 Match
            if (!checkMatchQuestion('q5', 4)) allCorrect = false;
            // Q6 TF
            if (!checkTFQuestion('q6', q6Statements)) allCorrect = false;

            // Q7: MCQ
            if (q7Selected === 'SMTP') {
                markCorrect('q7');
                document.querySelectorAll('#q7-options .mcq-option').forEach(opt => { if (opt.dataset.correct === 'true') opt.classList.add('correct'); });
            } else {
                markWrong('q7');
                allCorrect = false;
                document.querySelectorAll('#q7-options .mcq-option.selected').forEach(opt => opt.classList.add('wrong'));
            }

            // Q8: True/False Table
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
            if (q9Order.every((val, idx, arr) => idx === 0 || arr[idx - 1] < val) && q9Order.length === 3) {
                markCorrect('q9'); q9List.classList.add('correct');
            } else { markWrong('q9'); q9List.classList.add('wrong'); allCorrect = false; }

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
            const userSelections = q6Selections[qId] || {};

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
    