/**
 * Extracted from public/igcse/topic2/2.3_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "2.3 Encryption";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data
        const q1Defs = [
            { id: '1', text: 'The original message before encryption' },
            { id: '2', text: 'The scrambled message after encryption' },
            { id: '3', text: 'The formula used to scramble the data' },
            { id: '4', text: 'A secret value used to encrypt/decrypt' },
            { id: '5', text: 'Uses the same key for encryption and decryption' },
            { id: '6', text: 'Uses a public key and a private key' }
        ];

        const q1Terms = [
            { id: '1', text: 'Plaintext' },
            { id: '2', text: 'Ciphertext' },
            { id: '3', text: 'Encryption Algorithm' },
            { id: '4', text: 'Key' },
            { id: '5', text: 'Symmetric Encryption' },
            { id: '6', text: 'Asymmetric Encryption' }
        ];

        // Q2 Data
        const q2Items = [
            { id: 's1', text: 'Uses a single key', correct: 'symmetric' },
            { id: 's2', text: 'Faster to process', correct: 'symmetric' },
            { id: 's3', text: 'Key distribution is a security risk', correct: 'symmetric' },
            { id: 'a1', text: 'Uses a public and private key pair', correct: 'asymmetric' },
            { id: 'a2', text: 'Public key can be shared with anyone', correct: 'asymmetric' },
            { id: 'a3', text: 'More secure for key exchange', correct: 'asymmetric' }
        ];

        // Q6 Data
        const q6Items = [
            { id: 't1', text: 'A public key can be given to anyone', correct: 'true' },
            { id: 't2', text: 'A private key must be kept secret', correct: 'true' },
            { id: 't3', text: 'Data encrypted with a public key can only be decrypted by the matching private key', correct: 'true' },
            { id: 'f1', text: 'A public key can decrypt messages created with the public key', correct: 'false' },
            { id: 'f2', text: 'Private keys are shared with the sender', correct: 'false' },
            { id: 'f3', text: 'Symmetric encryption uses two different keys', correct: 'false' }
        ];

        // Dropdown Options
        const dropdownOptions = {
            q3: ['Jane generates a public/private key pair', 'Jane sends her public key to Tom', 'Tom encrypts the message using Jane\'s public key', 'Tom sends the ciphertext to Jane', 'Jane decrypts the message using her private key'],
            q4a: ['eavesdroppers', 'viruses', 'bugs'],
            q4b: ['plaintext', 'simpletext', 'rawtext'],
            q4c: ['ciphertext', 'codedtext', 'secrettext'],
            q4d: ['unreadable', 'deleted', 'invisible'],
            q4e: ['credit card details', 'public news', 'weather reports'],
            q4f: ['SSL/TLS', 'HTML', 'FTP'],
            q5a: ['FDW', 'DBU', 'XZQ'],
            q5b: ['AME', 'BND', 'ZKD'],
            q5c: ['decrypted', 'deleted', 'copied'],
            q5d: ['symmetric', 'asymmetric', 'hashing'],
            q10a: ['financial transactions', 'weather data', 'public records'],
            q10b: ['HTTPS', 'HTTP', 'FTP'],
            q10c: ['intended recipient', 'anyone', 'server'],
            q10d: ['tunnel', 'bridge', 'gateway']
        };

        // Q7 MCQ Data
        const q7Options = [
            { text: 'No need to share secret keys over insecure channels', correct: true },
            { text: 'Faster processing speed', correct: false },
            { text: 'Uses less computing power', correct: false },
            { text: 'Simpler to implement', correct: false }
        ];
        let q7Selected = null;

        // Q8 True/False Data
        const q8Statements = [
            { id: 'tf1', text: 'The private key should never be shared with anyone', correct: true },
            { id: 'tf2', text: 'Symmetric encryption uses two different keys', correct: false },
            { id: 'tf3', text: 'HTTPS websites use encryption', correct: true },
            { id: 'tf4', text: 'Asymmetric encryption is slower than symmetric', correct: true }
        ];

        // Q9 Sortable Data (Symmetric steps)
        const q9Items = [
            { id: 'se1', text: 'Both parties agree on a secret key', order: 1 },
            { id: 'se2', text: 'Key is shared securely', order: 2 },
            { id: 'se3', text: 'Sender encrypts plaintext with the key', order: 3 },
            { id: 'se4', text: 'Ciphertext is sent to receiver', order: 4 },
            { id: 'se5', text: 'Receiver decrypts with the same key', order: 5 }
        ];

        // Question Metadata
        const questionMeta = [
            { id: 'q1', title: 'Encryption Terminology', type: 'match', correctAnswer: { '1': 'Plaintext', '2': 'Ciphertext', '3': 'Encryption Algorithm', '4': 'Key', '5': 'Symmetric Encryption', '6': 'Asymmetric Encryption' } },
            { id: 'q2', title: 'Symmetric vs Asymmetric', type: 'drag', correctAnswer: { symmetric: ['Uses a single key', 'Faster to process', 'Key distribution is a security risk'], asymmetric: ['Uses a public and private key pair', 'Public key can be shared with anyone', 'More secure for key exchange'] } },
            { id: 'q3', title: 'Asymmetric Process', type: 'order', correctAnswer: ['Jane generates a public/private key pair', 'Jane sends her public key to Tom', 'Tom encrypts the message using Jane\'s public key', 'Tom sends the ciphertext to Jane', 'Jane decrypts the message using her private key'] },
            { id: 'q4', title: 'Purpose of Encryption', type: 'dropdown', correctAnswer: { a: 'eavesdroppers', b: 'plaintext', c: 'ciphertext', d: 'unreadable', e: 'credit card details', f: 'SSL/TLS' } },
            { id: 'q5', title: 'Caesar Cipher', type: 'dropdown', correctAnswer: { a: 'FDW', b: 'AME', c: 'decrypted', d: 'symmetric' } },
            { id: 'q7', title: 'Asymmetric Benefit', type: 'mcq', correctAnswer: 'No need to share secret keys over insecure channels' },
            { id: 'q8', title: 'Encryption Facts', type: 'trueFalse', correctAnswer: { tf1: true, tf2: false, tf3: true, tf4: true } },
            { id: 'q9', title: 'Symmetric Process', type: 'sortable', correctAnswer: ['Both parties agree on a secret key', 'Key is shared securely', 'Sender encrypts plaintext with the key', 'Ciphertext is sent to receiver', 'Receiver decrypts with the same key'] },
            { id: 'q10', title: 'Encryption Applications', type: 'dropdown', correctAnswer: { a: 'financial transactions', b: 'HTTPS', c: 'intended recipient', d: 'tunnel' } },
            { id: 'q6', title: 'Key Roles', type: 'drag', correctAnswer: { true: ['A public key can be given to anyone', 'A private key must be kept secret', 'Data encrypted with a public key can only be decrypted by the matching private key'], false: ['A public key can decrypt messages created with the public key', 'Private keys are shared with the sender', 'Symmetric encryption uses two different keys'] } }
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
            populateDropdown('q3a', dropdownOptions.q3);
            populateDropdown('q3b', dropdownOptions.q3);
            populateDropdown('q3c', dropdownOptions.q3);
            populateDropdown('q3d', dropdownOptions.q3);
            populateDropdown('q3e', dropdownOptions.q3);

            populateDropdown('q4a', dropdownOptions.q4a);
            populateDropdown('q4b', dropdownOptions.q4b);
            populateDropdown('q4c', dropdownOptions.q4c);
            populateDropdown('q4d', dropdownOptions.q4d);
            populateDropdown('q4e', dropdownOptions.q4e);
            populateDropdown('q4f', dropdownOptions.q4f);

            populateDropdown('q5a', dropdownOptions.q5a);
            populateDropdown('q5b', dropdownOptions.q5b);
            populateDropdown('q5c', dropdownOptions.q5c);
            populateDropdown('q5d', dropdownOptions.q5d);

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
            const bucketSym = document.getElementById('bucket-symmetric');
            const bucketAsym = document.getElementById('bucket-asymmetric');
            let q2Correct = true;

            Array.from(bucketSym.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'symmetric') q2Correct = false;
                }
            });
            Array.from(bucketAsym.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'asymmetric') q2Correct = false;
                }
            });
            if (document.getElementById('q2-source').children.length > 0) q2Correct = false;

            if (q2Correct) {
                markCorrect('q2');
                lockDragItems([bucketSym, bucketAsym]);
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

            if (q3a.value === 'Jane generates a public/private key pair' && q3b.value === 'Jane sends her public key to Tom' && q3c.value === 'Tom encrypts the message using Jane\'s public key' && q3d.value === 'Tom sends the ciphertext to Jane' && q3e.value === 'Jane decrypts the message using her private key') {
                markCorrect('q3');
                q3a.classList.add('correct');
                q3b.classList.add('correct');
                q3c.classList.add('correct');
                q3d.classList.add('correct');
                q3e.classList.add('correct');
            } else {
                markWrong('q3');
                allCorrect = false;
                if (q3a.value !== 'Jane generates a public/private key pair') q3a.classList.add('wrong');
                if (q3b.value !== 'Jane sends her public key to Tom') q3b.classList.add('wrong');
                if (q3c.value !== 'Tom encrypts the message using Jane\'s public key') q3c.classList.add('wrong');
                if (q3d.value !== 'Tom sends the ciphertext to Jane') q3d.classList.add('wrong');
                if (q3e.value !== 'Jane decrypts the message using her private key') q3e.classList.add('wrong');
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

            // Q5: Dropdowns
            const q5a = document.getElementById('q5a');
            const q5b = document.getElementById('q5b');
            const q5c = document.getElementById('q5c');
            const q5d = document.getElementById('q5d');

            if (checkSelect(q5a) && checkSelect(q5b) && checkSelect(q5c) && checkSelect(q5d)) {
                markCorrect('q5');
            } else {
                markWrong('q5');
                allCorrect = false;
            }

            // Q6: Drag & Drop
            const bucketTrue = document.getElementById('bucket-true');
            const bucketFalse = document.getElementById('bucket-false');
            let q6Correct = true;

            Array.from(bucketTrue.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'true') q6Correct = false;
                }
            });
            Array.from(bucketFalse.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'false') q6Correct = false;
                }
            });
            if (document.getElementById('q6-source').children.length > 0) q6Correct = false;

            if (q6Correct) {
                markCorrect('q6');
                lockDragItems([bucketTrue, bucketFalse]);
            } else {
                markWrong('q6');
                allCorrect = false;
            }

            // Q7: MCQ
            if (q7Selected === 'No need to share secret keys over insecure channels') {
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
    