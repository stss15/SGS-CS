/**
 * Extracted from Topic5_End_of_unit_Test.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "Topic 5 End of Unit Test";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA ---

        // Q1 (Internet vs WWW)
        const q1Items = [
            { id: 'i1', text: 'Infrastructure', correct: 'internet' },
            { id: 'i2', text: 'TCP/IP', correct: 'internet' },
            { id: 'w1', text: 'Web Pages', correct: 'www' },
            { id: 'w2', text: 'Browsers', correct: 'www' }
        ];

        // Q2 (URL)
        const q2Defs = [{ id: '1', text: 'https' }, { id: '2', text: 'www.google.com' }, { id: '3', text: '/images/logo.png' }];
        const q2Terms = [{ id: '1', text: 'Protocol' }, { id: '2', text: 'Domain' }, { id: '3', text: 'Path' }];

        // Q4 (Digital Currency)
        const q4Statements = [
            { id: 1, text: 'Fiat currency is physical money backed by governments.', answer: true },
            { id: 2, text: 'Cryptocurrency is controlled by a central bank.', answer: false },
            { id: 3, text: 'Blockchain is a decentralised database.', answer: true }
        ];
        let q4Selections = {};

        // Q6 (Malware)
        const q6Defs = [{ id: '1', text: 'Self-replicating standalone malware' }, { id: '2', text: 'Disguised as legitimate software' }, { id: '3', text: 'Encrypts data for ransom' }];
        const q6Terms = [{ id: '1', text: 'Worm' }, { id: '2', text: 'Trojan' }, { id: '3', text: 'Ransomware' }];

        // Q7 (Phishing vs Pharming)
        const q7Items = [
            { id: 'ph1', text: 'Email with link', correct: 'phishing' },
            { id: 'pm1', text: 'Malicious code redirect', correct: 'pharming' },
            { id: 'pm2', text: 'DNS poisoning', correct: 'pharming' }
        ];

        // Q9 (Security)
        const q9Defs = [{ id: '1', text: 'Uses physical characteristics for ID' }, { id: '2', text: 'Monitors traffic to block threats' }, { id: '3', text: 'Scrambles data into unreadable format' }];
        const q9Terms = [{ id: '1', text: 'Biometrics' }, { id: '2', text: 'Firewall' }, { id: '3', text: 'Encryption' }];

        // Q10 (MCQ)
        const q10Options = [
            { value: 'Sending fake emails to trick users', correct: false },
            { value: 'Creating a fake scenario to get data', correct: true },
            { value: 'Leaving infected USB sticks', correct: false },
            { value: 'Flooding a server with traffic', correct: false }
        ];
        let q10Selection = null;

        // Dropdowns
        const dropdownOptions = {
            q3a: ['SSL/TLS', 'HTML', 'DNS'],
            q3b: ['padlock', 'key', 'shield'],
            q3c: ['Hypertext Transfer Protocol', 'High Tech Protocol', 'Hyper Text Page'],
            q3d: ['online banking', 'gaming', 'streaming'],
            q5: ['Transaction takes place', 'New block created', 'Hash generated', 'Block verified by network', 'Block added to chain'],
            q8a: ['DDoS', 'Virus', 'Phishing'],
            q8b: ['Brute Force', 'Hacking', 'Spyware'],
            q8c: ['Data Interception', 'Pharming', 'Adware'],
            q8d: ['Spyware', 'Ransomware', 'Worm']
        };

        const questionMeta = [
            { id: 'q1', title: 'Internet vs WWW', type: 'drag', correctAnswer: { internet: ['Infrastructure', 'TCP/IP'], www: ['Web Pages', 'Browsers'] } },
            { id: 'q2', title: 'URL Structure', type: 'match', correctAnswer: { '1': 'Protocol', '2': 'Domain', '3': 'Path' } },
            { id: 'q3', title: 'HTTP vs HTTPS', type: 'dropdown', correctAnswer: { a: 'SSL/TLS', b: 'padlock', c: 'Hypertext Transfer Protocol', d: 'online banking' } },
            { id: 'q4', title: 'Digital Currency', type: 'tf', correctAnswer: { 1: true, 2: false, 3: true } },
            { id: 'q5', title: 'Blockchain', type: 'order', correctAnswer: ['Transaction', 'Create', 'Hash', 'Verify', 'Add'] },
            { id: 'q6', title: 'Malware', type: 'match', correctAnswer: { '1': 'Worm', '2': 'Trojan', '3': 'Ransomware' } },
            { id: 'q7', title: 'Phishing vs Pharming', type: 'drag', correctAnswer: { phishing: ['Email'], pharming: ['Code', 'DNS'] } },
            { id: 'q8', title: 'Cyber Threats', type: 'dropdown', correctAnswer: { a: 'DDoS', b: 'Brute Force', c: 'Data Interception', d: 'Spyware' } },
            { id: 'q9', title: 'Security', type: 'match', correctAnswer: { '1': 'Biometrics', '2': 'Firewall', '3': 'Encryption' } },
            { id: 'q10', title: 'Social Engineering', type: 'mcq', correctAnswer: 'Creating a fake scenario to get data' }
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
            initMatch('q2', q2Defs, q2Terms);
            populateDropdown('q3a', dropdownOptions.q3a);
            populateDropdown('q3b', dropdownOptions.q3b);
            populateDropdown('q3c', dropdownOptions.q3c);
            populateDropdown('q3d', dropdownOptions.q3d);
            initTF('q4', q4Statements);
            initOrder('q5', dropdownOptions.q5, 5);
            initMatch('q6', q6Defs, q6Terms);
            initDrag('q7', q7Items);
            populateDropdown('q8a', dropdownOptions.q8a);
            populateDropdown('q8b', dropdownOptions.q8b);
            populateDropdown('q8c', dropdownOptions.q8c);
            populateDropdown('q8d', dropdownOptions.q8d);
            initMatch('q9', q9Defs, q9Terms);
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

        // --- LOGIC ---
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

        function selectTF(rowId, val, qId) {
            if (!q4Selections[qId]) q4Selections[qId] = {};
            document.getElementById(`${qId}-${rowId}-t`).classList.remove('selected');
            document.getElementById(`${qId}-${rowId}-f`).classList.remove('selected');
            if (val === true) document.getElementById(`${qId}-${rowId}-t`).classList.add('selected');
            else document.getElementById(`${qId}-${rowId}-f`).classList.add('selected');
            q4Selections[qId][rowId] = val;
        }

        function selectMCQ(qId, value) {
            document.querySelectorAll(`#${qId}-options .mcq-option`).forEach(opt => {
                opt.classList.remove('selected');
            });
            const selected = document.querySelector(`#${qId}-options .mcq-option[data-value="${value}"]`);
            selected.classList.add('selected');
            q10Selection = value;
        }

        function checkAnswers() {
            totalAttempts++;
            let allCorrect = true;

            if (!checkDragQuestion('q1', 'internet', 'www')) allCorrect = false;
            if (!checkMatchQuestion('q2', 3)) allCorrect = false;
            if (!checkDropdowns('q3', ['a', 'b', 'c', 'd'])) allCorrect = false;
            if (!checkTFQuestion('q4', q4Statements)) allCorrect = false;
            if (!checkOrderQuestion('q5', ['Transaction takes place', 'New block created', 'Hash generated', 'Block verified by network', 'Block added to chain'])) allCorrect = false;
            if (!checkMatchQuestion('q6', 3)) allCorrect = false;
            if (!checkDragQuestion('q7', 'phishing', 'pharming')) allCorrect = false;
            if (!checkDropdowns('q8', ['a', 'b', 'c', 'd'])) allCorrect = false;
            if (!checkMatchQuestion('q9', 3)) allCorrect = false;
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
            if (correct) { markCorrect(qId); lockDragItems([b1, b2]); } else { markWrong(qId); }
            return correct;
        }

        function checkDropdowns(qId, suffixes) {
            let correct = true;
            suffixes.forEach(s => {
                const el = document.getElementById(`${qId}${s}`);
                if (el.value === el.dataset.answer) { el.classList.add('correct'); el.classList.remove('wrong'); }
                else { el.classList.add('wrong'); correct = false; }
            });
            if (correct) markCorrect(qId); else markWrong(qId);
            return correct;
        }

        function checkOrderQuestion(qId, correctOrder) {
            let correct = true;
            const letters = ['a', 'b', 'c', 'd', 'e'];
            for (let i = 0; i < correctOrder.length; i++) {
                const el = document.getElementById(`${qId}${letters[i]}`);
                if (el.value !== correctOrder[i]) { correct = false; el.classList.add('wrong'); }
                else { el.classList.add('correct'); el.classList.remove('wrong'); }
            }
            if (correct) markCorrect(qId); else markWrong(qId);
            return correct;
        }

        function checkTFQuestion(qId, statements) {
            let correct = true;
            const userSelections = q4Selections[qId] || {};
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
                    if (child.classList.contains('drag-item')) { child.draggable = false; child.classList.add('locked'); }
                });
            });
        }

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
    