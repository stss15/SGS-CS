/**
 * Extracted from public/igcse/topic5/5.3_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "5.3 Cyber Security";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (Malware)
        const q1Defs = [
            { id: '1', text: 'Replicates by attaching to a host program' },
            { id: '2', text: 'Standalone malware that self-replicates across networks' },
            { id: '3', text: 'Disguised as legitimate software' },
            { id: '4', text: 'Monitors user activity and key presses' },
            { id: '5', text: 'Encrypts data and demands payment' },
            { id: '6', text: 'Floods user with unwanted pop-up ads' }
        ];
        const q1Terms = [
            { id: '1', text: 'Virus' },
            { id: '2', text: 'Worm' },
            { id: '3', text: 'Trojan Horse' },
            { id: '4', text: 'Spyware' },
            { id: '5', text: 'Ransomware' },
            { id: '6', text: 'Adware' }
        ];

        // Q2 Data (Phishing vs Pharming)
        const q2Items = [
            { id: 'ph1', text: 'Sent via email', correct: 'phishing' },
            { id: 'ph2', text: 'Requires user to click a link', correct: 'phishing' },
            { id: 'ph3', text: '"Dear Customer" generic greeting', correct: 'phishing' },
            { id: 'pm1', text: 'Malicious code on web server/computer', correct: 'pharming' },
            { id: 'pm2', text: 'Redirects to fake site automatically', correct: 'pharming' },
            { id: 'pm3', text: 'DNS cache poisoning', correct: 'pharming' }
        ];

        // Q4 Data (Social Engineering)
        const q4Defs = [
            { id: '1', text: 'Leaving an infected USB stick for someone to find' },
            { id: '2', text: 'Offering a service in exchange for information' },
            { id: '3', text: 'Creating a fake scenario to get data' },
            { id: '4', text: 'Sending fake emails to trick users' }
        ];
        const q4Terms = [
            { id: '1', text: 'Baiting' },
            { id: '2', text: 'Quid Pro Quo' },
            { id: '3', text: 'Pretexting' },
            { id: '4', text: 'Phishing' }
        ];

        // Q5 Data (Biometrics)
        const q5Statements = [
            { id: 1, text: 'Fingerprints are unique to every individual.', answer: true },
            { id: 2, text: 'Retina scans are quick and non-intrusive.', answer: false },
            { id: 3, text: 'Biometrics can be lost or forgotten like passwords.', answer: false },
            { id: 4, text: 'Voice recognition can be tricked by a recording.', answer: true }
        ];
        let q5Selections = {};

        // Q6 Data (MCQ)
        const q6Options = [
            { value: 'password123', correct: false },
            { value: 'MyNameIsJohn', correct: false },
            { value: 'Xy9#mP$2', correct: true },
            { value: '12345678', correct: false }
        ];
        let q6Selection = null;

        // Dropdown Options
        const dropdownOptions = {
            q3a: ['Brute Force', 'Hacking', 'Phishing', 'Spyware'],
            q3b: ['DDoS', 'Virus', 'Worm', 'Adware'],
            q3c: ['Data Interception', 'Data Theft', 'Data Loss', 'Data Corruption'],
            q3d: ['Hacking', 'Cracking', 'Phishing', 'Pharming']
        };

        const questionMeta = [
            { id: 'q1', title: 'Malware Types', type: 'match', correctAnswer: { '1': 'Virus', '2': 'Worm', '3': 'Trojan', '4': 'Spyware', '5': 'Ransomware', '6': 'Adware' } },
            { id: 'q2', title: 'Phishing vs Pharming', type: 'drag', correctAnswer: { phishing: ['Email', 'Link', 'Generic'], pharming: ['Code', 'Redirect', 'DNS'] } },
            { id: 'q3', title: 'Cyber Threats', type: 'dropdown', correctAnswer: { a: 'Brute Force', b: 'DDoS', c: 'Data Interception', d: 'Hacking' } },
            { id: 'q4', title: 'Social Engineering', type: 'match', correctAnswer: { '1': 'Baiting', '2': 'Quid Pro Quo', '3': 'Pretexting', '4': 'Phishing' } },
            { id: 'q5', title: 'Biometrics', type: 'tf', correctAnswer: { 1: true, 2: false, 3: false, 4: true } },
            { id: 'q6', title: 'Password Security', type: 'mcq', correctAnswer: 'Xy9#mP$2' },
            { id: 'q7', title: 'Attack Types', type: 'match', correctAnswer: { '1': 'SQL Injection', '2': 'Man-in-Middle', '3': 'DDoS', '4': 'Keylogger' } },
            { id: 'q8', title: 'Security Measures', type: 'trueFalse', correctAnswer: { tf1: true, tf2: false, tf3: true, tf4: true } },
            { id: 'q9', title: 'Firewall Types', type: 'sortable', correctAnswer: ['Packet Filter', 'Stateful', 'Application'] },
            { id: 'q10', title: 'Authentication', type: 'dropdown', correctAnswer: { a: 'Two-factor authentication', b: 'CAPTCHA', c: 'Single Sign-On', d: 'Biometric' } }
        ];

        // Q7 Matching Data
        const q7Defs = [
            { id: '1', text: 'Inserts malicious code into database queries' },
            { id: '2', text: 'Intercepts communication between two parties' },
            { id: '3', text: 'Floods servers with traffic to crash them' },
            { id: '4', text: 'Records keystrokes to steal passwords' }
        ];
        const q7Terms = [
            { id: '1', text: 'SQL Injection' },
            { id: '2', text: 'Man-in-Middle' },
            { id: '3', text: 'DDoS' },
            { id: '4', text: 'Keylogger' }
        ];

        // Q8 True/False Data
        const q8Statements = [
            { id: 'tf1', text: 'Firewalls can block unauthorized network access', correct: true },
            { id: 'tf2', text: 'Antivirus software prevents all types of malware', correct: false },
            { id: 'tf3', text: 'Regular software updates help prevent vulnerabilities', correct: true },
            { id: 'tf4', text: 'HTTPS encrypts data during transmission', correct: true }
        ];

        // Q9 Sortable Data
        const q9Items = [
            { id: 'f1', text: 'Packet Filter Firewall', order: 1 },
            { id: 'f2', text: 'Stateful Inspection Firewall', order: 2 },
            { id: 'f3', text: 'Application Level Firewall', order: 3 }
        ];

        // Q10 Dropdown Options
        const q10Opts = {
            q10a: ['Two-factor authentication', 'Single authentication', 'No authentication'],
            q10b: ['CAPTCHA', 'PASSWORD', 'USERNAME'],
            q10c: ['Single Sign-On', 'Multiple Logins', 'Guest Access'],
            q10d: ['Biometric', 'Keyword', 'Pattern']
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
            initMatch('q1', q1Defs, q1Terms);
            // Q2
            initDrag('q2', q2Items);
            // Q3
            populateDropdown('q3a', dropdownOptions.q3a);
            populateDropdown('q3b', dropdownOptions.q3b);
            populateDropdown('q3c', dropdownOptions.q3c);
            populateDropdown('q3d', dropdownOptions.q3d);
            // Q4
            initMatch('q4', q4Defs, q4Terms);
            // Q5
            initTF('q5', q5Statements);
            // Q6
            initMCQ('q6', q6Options);
            // Q7: Matching
            initMatch('q7', q7Defs, q7Terms);
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

        // --- TRUE/FALSE ---
        function selectTF(rowId, val, qId) {
            if (!q5Selections[qId]) q5Selections[qId] = {};
            document.getElementById(`${qId}-${rowId}-t`).classList.remove('selected');
            document.getElementById(`${qId}-${rowId}-f`).classList.remove('selected');

            if (val === true) document.getElementById(`${qId}-${rowId}-t`).classList.add('selected');
            else document.getElementById(`${qId}-${rowId}-f`).classList.add('selected');

            q5Selections[qId][rowId] = val;
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

            // Q1 Match
            if (!checkMatchQuestion('q1', 6)) allCorrect = false;
            // Q2 Drag
            if (!checkDragQuestion('q2', 'phishing', 'pharming')) allCorrect = false;
            // Q3 Dropdown
            if (!checkDropdowns('q3', ['a', 'b', 'c', 'd'])) allCorrect = false;
            // Q4 Match
            if (!checkMatchQuestion('q4', 4)) allCorrect = false;
            // Q5 TF
            if (!checkTFQuestion('q5', q5Statements)) allCorrect = false;
            // Q6 MCQ
            if (!checkMCQQuestion('q6')) allCorrect = false;

            // Q7: Matching
            if (!checkMatchQuestion('q7', 4)) allCorrect = false;

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
            const userSelections = q5Selections[qId] || {};

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

        function checkMCQQuestion(qId) {
            const correctOpt = q6Options.find(o => o.correct);
            if (q6Selection === correctOpt.value) {
                document.querySelector(`#${qId}-options .mcq-option[data-value="${q6Selection}"]`).classList.add('correct');
                markCorrect(qId);
                return true;
            } else {
                if (q6Selection) {
                    document.querySelector(`#${qId}-options .mcq-option[data-value="${q6Selection}"]`).classList.add('wrong');
                }
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
    