/**
 * Extracted from Topic2_End_of_unit_Test.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "Topic 2 End of Unit Assessment";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data
        const q1Defs = [
            { id: '1', text: 'Data flows in one direction only' },
            { id: '2', text: 'Data flows in both directions, but not at the same time' },
            { id: '3', text: 'Data flows in both directions simultaneously' },
            { id: '4', text: 'Data is sent one bit at a time over a single wire' },
            { id: '5', text: 'Data is sent multiple bits at a time over multiple wires' }
        ];

        const q1Terms = [
            { id: '1', text: 'Simplex' },
            { id: '2', text: 'Half-Duplex' },
            { id: '3', text: 'Full-Duplex' },
            { id: '4', text: 'Serial' },
            { id: '5', text: 'Parallel' }
        ];

        // Q3 Data
        const q3Items = [
            { id: 't1', text: 'It is an industry standard', correct: 'true' },
            { id: 't2', text: 'Devices are automatically detected (plug and play)', correct: 'true' },
            { id: 't3', text: 'Connectors fit only one way', correct: 'true' },
            { id: 't4', text: 'Can power devices as well as transmit data', correct: 'true' },
            { id: 'f1', text: 'It uses parallel data transmission', correct: 'false' },
            { id: 'f2', text: 'It is only used for printers', correct: 'false' },
            { id: 'f3', text: 'It allows data to travel faster than fibre optic cables', correct: 'false' }
        ];

        // Q4 Data
        const q4Items = [
            { id: 'p1', text: 'Uses an extra bit to make 1s even or odd', correct: 'parity' },
            { id: 'p2', text: 'Can be horizontal and vertical', correct: 'parity' },
            { id: 'c1', text: 'Calculated value sent at end of data block', correct: 'checksum' },
            { id: 'c2', text: 'Uses an algorithm agreed by sender and receiver', correct: 'checksum' },
            { id: 'd1', text: 'Final digit calculated from other digits', correct: 'checkdigit' },
            { id: 'd2', text: 'Used for ISBNs and barcodes', correct: 'checkdigit' }
        ];

        // Dropdown Options
        const dropdownOptions = {
            q2: ['Data is broken down into packets', 'Each packet is given a header with IP addresses and sequence number', 'Packets are sent independently via different routes', 'Routers control the path of each packet', 'Packets arrive at the destination and are reordered', 'Corrupt or missing packets are requested again'],
            q5a: ['Symmetric', 'Asymmetric', 'Hashing'],
            q5b: ['Asymmetric', 'Symmetric', 'Hashing'],
            q5c: ['Public', 'Private', 'Secret'],
            q5d: ['Private', 'Public', 'Shared'],
            q5e: ['Plaintext', 'Ciphertext', 'Rawtext'],
            q5f: ['Ciphertext', 'Plaintext', 'Codedtext'],
            q6a: ['Check Digit', 'Parity Check', 'Checksum'],
            q6b: ['Checksum', 'Parity Check', 'Echo Check'],
            q6c: ['Parity Check', 'Checksum', 'Check Digit'],
            q6d: ['Echo Check', 'ARQ', 'Parity Check']
        };

        // Question Metadata
        const questionMeta = [
            { id: 'q1', title: 'Transmission Terminology', type: 'match', correctAnswer: { '1': 'Simplex', '2': 'Half-Duplex', '3': 'Full-Duplex', '4': 'Serial', '5': 'Parallel' } },
            { id: 'q2', title: 'Packet Switching', type: 'order', correctAnswer: ['Data is broken down into packets', 'Each packet is given a header with IP addresses and sequence number', 'Packets are sent independently via different routes', 'Routers control the path of each packet', 'Packets arrive at the destination and are reordered', 'Corrupt or missing packets are requested again'] },
            { id: 'q3', title: 'USB Features', type: 'drag', correctAnswer: { true: ['It is an industry standard', 'Devices are automatically detected (plug and play)', 'Connectors fit only one way', 'Can power devices as well as transmit data'], false: ['It uses parallel data transmission', 'It is only used for printers', 'It allows data to travel faster than fibre optic cables'] } },
            { id: 'q4', title: 'Error Checking Methods', type: 'drag', correctAnswer: { parity: ['Uses an extra bit to make 1s even or odd', 'Can be horizontal and vertical'], checksum: ['Calculated value sent at end of data block', 'Uses an algorithm agreed by sender and receiver'], checkdigit: ['Final digit calculated from other digits', 'Used for ISBNs and barcodes'] } },
            { id: 'q5', title: 'Encryption', type: 'dropdown', correctAnswer: { a: 'Symmetric', b: 'Asymmetric', c: 'Public', d: 'Private', e: 'Plaintext', f: 'Ciphertext' } },
            { id: 'q6', title: 'Error Scenarios', type: 'dropdown', correctAnswer: { a: 'Check Digit', b: 'Checksum', c: 'Parity Check', d: 'Echo Check' } }
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
            populateDropdown('q2a', dropdownOptions.q2);
            populateDropdown('q2b', dropdownOptions.q2);
            populateDropdown('q2c', dropdownOptions.q2);
            populateDropdown('q2d', dropdownOptions.q2);
            populateDropdown('q2e', dropdownOptions.q2);
            populateDropdown('q2f', dropdownOptions.q2);

            populateDropdown('q5a', dropdownOptions.q5a);
            populateDropdown('q5b', dropdownOptions.q5b);
            populateDropdown('q5c', dropdownOptions.q5c);
            populateDropdown('q5d', dropdownOptions.q5d);
            populateDropdown('q5e', dropdownOptions.q5e);
            populateDropdown('q5f', dropdownOptions.q5f);

            populateDropdown('q6a', dropdownOptions.q6a);
            populateDropdown('q6b', dropdownOptions.q6b);
            populateDropdown('q6c', dropdownOptions.q6c);
            populateDropdown('q6d', dropdownOptions.q6d);
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

            // Q2: Ordering
            const q2a = document.getElementById('q2a');
            const q2b = document.getElementById('q2b');
            const q2c = document.getElementById('q2c');
            const q2d = document.getElementById('q2d');
            const q2e = document.getElementById('q2e');
            const q2f = document.getElementById('q2f');

            if (q2a.value === 'Data is broken down into packets' && q2b.value === 'Each packet is given a header with IP addresses and sequence number' && q2c.value === 'Packets are sent independently via different routes' && q2d.value === 'Routers control the path of each packet' && q2e.value === 'Packets arrive at the destination and are reordered' && q2f.value === 'Corrupt or missing packets are requested again') {
                markCorrect('q2');
                q2a.classList.add('correct');
                q2b.classList.add('correct');
                q2c.classList.add('correct');
                q2d.classList.add('correct');
                q2e.classList.add('correct');
                q2f.classList.add('correct');
            } else {
                markWrong('q2');
                allCorrect = false;
                if (q2a.value !== 'Data is broken down into packets') q2a.classList.add('wrong');
                if (q2b.value !== 'Each packet is given a header with IP addresses and sequence number') q2b.classList.add('wrong');
                if (q2c.value !== 'Packets are sent independently via different routes') q2c.classList.add('wrong');
                if (q2d.value !== 'Routers control the path of each packet') q2d.classList.add('wrong');
                if (q2e.value !== 'Packets arrive at the destination and are reordered') q2e.classList.add('wrong');
                if (q2f.value !== 'Corrupt or missing packets are requested again') q2f.classList.add('wrong');
            }

            // Q3: Drag & Drop
            const bucketTrue = document.getElementById('bucket-true');
            const bucketFalse = document.getElementById('bucket-false');
            let q3Correct = true;

            Array.from(bucketTrue.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'true') q3Correct = false;
                }
            });
            Array.from(bucketFalse.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'false') q3Correct = false;
                }
            });
            if (document.getElementById('q3-source').children.length > 0) q3Correct = false;

            if (q3Correct) {
                markCorrect('q3');
                lockDragItems([bucketTrue, bucketFalse]);
            } else {
                markWrong('q3');
                allCorrect = false;
            }

            // Q4: Drag & Drop
            const bucketParity = document.getElementById('bucket-parity');
            const bucketChecksum = document.getElementById('bucket-checksum');
            const bucketCheckdigit = document.getElementById('bucket-checkdigit');
            let q4Correct = true;

            Array.from(bucketParity.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'parity') q4Correct = false;
                }
            });
            Array.from(bucketChecksum.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'checksum') q4Correct = false;
                }
            });
            Array.from(bucketCheckdigit.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'checkdigit') q4Correct = false;
                }
            });
            if (document.getElementById('q4-source').children.length > 0) q4Correct = false;

            if (q4Correct) {
                markCorrect('q4');
                lockDragItems([bucketParity, bucketChecksum, bucketCheckdigit]);
            } else {
                markWrong('q4');
                allCorrect = false;
            }

            // Q5: Dropdowns
            const q5a = document.getElementById('q5a');
            const q5b = document.getElementById('q5b');
            const q5c = document.getElementById('q5c');
            const q5d = document.getElementById('q5d');
            const q5e = document.getElementById('q5e');
            const q5f = document.getElementById('q5f');

            if (checkSelect(q5a) && checkSelect(q5b) && checkSelect(q5c) && checkSelect(q5d) && checkSelect(q5e) && checkSelect(q5f)) {
                markCorrect('q5');
            } else {
                markWrong('q5');
                allCorrect = false;
            }

            // Q6: Dropdowns
            const q6a = document.getElementById('q6a');
            const q6b = document.getElementById('q6b');
            const q6c = document.getElementById('q6c');
            const q6d = document.getElementById('q6d');

            if (checkSelect(q6a) && checkSelect(q6b) && checkSelect(q6c) && checkSelect(q6d)) {
                markCorrect('q6');
            } else {
                markWrong('q6');
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
    