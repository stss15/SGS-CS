/**
 * Extracted from public/igcse/topic3/3.4_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "3.4 Network Hardware";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA FOR QUESTIONS ---

        // Q1 Data (MAC vs IP)
        const q1Items = [
            { id: 'm1', text: 'Physical Address', correct: 'mac' },
            { id: 'm2', text: 'Set by Manufacturer', correct: 'mac' },
            { id: 'm3', text: '48-bit Hexadecimal', correct: 'mac' },
            { id: 'm4', text: 'Stored on NIC', correct: 'mac' },
            { id: 'i1', text: 'Logical Address', correct: 'ip' },
            { id: 'i2', text: 'Assigned by Network/ISP', correct: 'ip' },
            { id: 'i3', text: '32-bit or 128-bit', correct: 'ip' },
            { id: 'i4', text: 'Can be Dynamic', correct: 'ip' }
        ];

        // Q2 Data (Hardware)
        const q2Defs = [
            { id: '1', text: 'Hardware that allows a device to connect to a network' },
            { id: '2', text: 'Connects different networks and directs data' },
            { id: '3', text: 'Automatically assigns dynamic IP addresses to devices' },
            { id: '4', text: 'Company that provides internet access and public IP addresses' }
        ];

        const q2Terms = [
            { id: '1', text: 'NIC' },
            { id: '2', text: 'Router' },
            { id: '3', text: 'DHCP Server' },
            { id: '4', text: 'ISP' }
        ];

        // Q5 Data (Static vs Dynamic)
        const q5Defs = [
            { id: '1', text: 'Permanent address, useful for web servers' },
            { id: '2', text: 'Temporary address assigned by DHCP, changes on reconnection' },
            { id: '3', text: 'Unique global address used on the internet' },
            { id: '4', text: 'Address used only within a local network (LAN)' }
        ];

        const q5Terms = [
            { id: '1', text: 'Static IP' },
            { id: '2', text: 'Dynamic IP' },
            { id: '3', text: 'Public IP' },
            { id: '4', text: 'Private IP' }
        ];

        // Dropdown Options
        const dropdownOptions = {
            q3Bits: ['32', '64', '128', '256'],
            q3Base: ['denary', 'binary', 'hexadecimal', 'octal'],
            q3Reason: ['IPv4 addresses', 'electricity', 'cables', 'routers'],
            q3Feat: ['collisions', 'explosions', 'delays', 'errors'],
            q4Bits: ['48', '32', '64', '128'],
            q4Base: ['hexadecimal', 'binary', 'denary', 'text'],
            q4Part1: ['manufacturer', 'user', 'ISP', 'country'],
            q4Part2: ['serial number', 'model number', 'date code', 'price'],
            q4Loc: ['NIC', 'CPU', 'HDD', 'RAM'],
            q6: [
                'Data packet arrives at the router',
                'Router inspects the destination IP address',
                'Router checks its routing table for the best path',
                'Packet is forwarded to the next network or switch',
                'Packet is delivered to the destination device'
            ]
        };

        // Q7 MCQ Data
        const q7Options = [
            { text: 'To automatically assign IP addresses to devices', correct: true },
            { text: 'To encrypt network traffic', correct: false },
            { text: 'To connect different networks together', correct: false },
            { text: 'To store MAC addresses', correct: false }
        ];
        let q7Selected = null;

        // Q8 True/False Data
        const q8Statements = [
            { id: 'tf1', text: 'A MAC address can be changed by the user', correct: false },
            { id: 'tf2', text: 'IPv6 uses 128 bits for addresses', correct: true },
            { id: 'tf3', text: 'Dynamic IP addresses are permanently assigned', correct: false },
            { id: 'tf4', text: 'Routers connect different networks together', correct: true }
        ];

        // Q9 Sortable Data (address space smallest to largest)
        const q9Items = [
            { id: 'a1', text: 'IPv4 (4.3 billion addresses)', order: 1 },
            { id: 'a2', text: 'IPv6 (trillions of addresses)', order: 2 }
        ];

        // Q10 Dropdown Options
        const q10Options = {
            q10a: ['hardware', 'software', 'protocol'],
            q10b: ['MAC address', 'IP address', 'domain name'],
            q10c: ['wired or wireless', 'only wired', 'only wireless'],
            q10d: ['framing and transmission', 'encryption', 'storage']
        };

        // Question Metadata
        const questionMeta = [
            { id: 'q1', title: 'MAC vs IP', type: 'drag', correctAnswer: { mac: ['Physical Address', 'Set by Manufacturer', '48-bit Hexadecimal', 'Stored on NIC'], ip: ['Logical Address', 'Assigned by Network/ISP', '32-bit or 128-bit', 'Can be Dynamic'] } },
            { id: 'q2', title: 'Hardware', type: 'match', correctAnswer: { '1': 'NIC', '2': 'Router', '3': 'DHCP Server', '4': 'ISP' } },
            { id: 'q3', title: 'IP Versions', type: 'dropdown', correctAnswer: { a: '32', b: 'denary', c: '128', d: 'hexadecimal', e: 'IPv4 addresses', f: 'collisions' } },
            { id: 'q4', title: 'MAC Format', type: 'dropdown', correctAnswer: { a: '48', b: 'hexadecimal', c: 'manufacturer', d: 'serial number', e: 'NIC' } },
            { id: 'q5', title: 'IP Types', type: 'match', correctAnswer: { '1': 'Static IP', '2': 'Dynamic IP', '3': 'Public IP', '4': 'Private IP' } },
            { id: 'q6', title: 'Router Ops', type: 'order', correctAnswer: ['Data packet arrives at the router', 'Router inspects the destination IP address', 'Router checks its routing table for the best path', 'Packet is forwarded to the next network or switch', 'Packet is delivered to the destination device'] },
            { id: 'q7', title: 'DHCP', type: 'mcq', correctAnswer: 'To automatically assign IP addresses to devices' },
            { id: 'q8', title: 'Network Facts', type: 'trueFalse', correctAnswer: { tf1: false, tf2: true, tf3: false, tf4: true } },
            { id: 'q9', title: 'IP Versions', type: 'sortable', correctAnswer: ['IPv4 (4.3 billion addresses)', 'IPv6 (trillions of addresses)'] },
            { id: 'q10', title: 'NIC Functions', type: 'dropdown', correctAnswer: { a: 'hardware', b: 'MAC address', c: 'wired or wireless', d: 'framing and transmission' } }
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
            const defsContainerQ2 = document.getElementById('col-defs-q2');
            const termsContainerQ2 = document.getElementById('col-terms-q2');

            q2D.forEach(d => {
                const div = document.createElement('div');
                div.className = 'match-def';
                div.dataset.id = d.id;
                div.textContent = d.text;
                div.onclick = () => selectDef(div, 'q2');
                defsContainerQ2.appendChild(div);
            });

            q2T.forEach(t => {
                const div = document.createElement('div');
                div.className = 'match-term';
                div.dataset.id = t.id;
                div.textContent = t.text;
                div.onclick = () => selectTerm(div, 'q2');
                termsContainerQ2.appendChild(div);
            });

            // Q3 Dropdowns
            populateDropdown('q3a', dropdownOptions.q3Bits);
            populateDropdown('q3b', dropdownOptions.q3Base);
            populateDropdown('q3c', dropdownOptions.q3Bits);
            populateDropdown('q3d', dropdownOptions.q3Base);
            populateDropdown('q3e', dropdownOptions.q3Reason);
            populateDropdown('q3f', dropdownOptions.q3Feat);

            // Q4 Dropdowns
            populateDropdown('q4a', dropdownOptions.q4Bits);
            populateDropdown('q4b', dropdownOptions.q4Base);
            populateDropdown('q4c', dropdownOptions.q4Part1);
            populateDropdown('q4d', dropdownOptions.q4Part2);
            populateDropdown('q4e', dropdownOptions.q4Loc);

            // Q5 Matching
            const q5D = shuffle(q5Defs);
            const q5T = shuffle(q5Terms);
            const defsContainerQ5 = document.getElementById('col-defs-q5');
            const termsContainerQ5 = document.getElementById('col-terms-q5');

            q5D.forEach(d => {
                const div = document.createElement('div');
                div.className = 'match-def';
                div.dataset.id = d.id;
                div.textContent = d.text;
                div.onclick = () => selectDef(div, 'q5');
                defsContainerQ5.appendChild(div);
            });

            q5T.forEach(t => {
                const div = document.createElement('div');
                div.className = 'match-term';
                div.dataset.id = t.id;
                div.textContent = t.text;
                div.onclick = () => selectTerm(div, 'q5');
                termsContainerQ5.appendChild(div);
            });

            // Q6 Ordering
            populateDropdown('q6a', dropdownOptions.q6);
            populateDropdown('q6b', dropdownOptions.q6);
            populateDropdown('q6c', dropdownOptions.q6);
            populateDropdown('q6d', dropdownOptions.q6);
            populateDropdown('q6e', dropdownOptions.q6);

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
            populateDropdown('q10a', q10Options.q10a);
            populateDropdown('q10b', q10Options.q10b);
            populateDropdown('q10c', q10Options.q10c);
            populateDropdown('q10d', q10Options.q10d);
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
        let selectedDef = { q2: null, q5: null };
        let selectedTerm = { q2: null, q5: null };
        let matchedPairs = { q2: [], q5: [] };

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
            const bucketMac = document.getElementById('bucket-mac');
            const bucketIp = document.getElementById('bucket-ip');
            let q1Correct = true;

            Array.from(bucketMac.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'mac') q1Correct = false;
                }
            });
            Array.from(bucketIp.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    if (child.dataset.correct !== 'ip') q1Correct = false;
                }
            });
            if (document.getElementById('q1-source').children.length > 0) q1Correct = false;

            if (q1Correct) {
                markCorrect('q1');
                lockDragItems([bucketMac, bucketIp]);
            } else {
                markWrong('q1');
                allCorrect = false;
            }

            // Q2: Matching
            let q2Correct = true;
            const q2Pairs = matchedPairs.q2;
            if (q2Pairs.length !== 4) q2Correct = false;
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

            // Q3: Dropdowns
            const q3a = document.getElementById('q3a');
            const q3b = document.getElementById('q3b');
            const q3c = document.getElementById('q3c');
            const q3d = document.getElementById('q3d');
            const q3e = document.getElementById('q3e');
            const q3f = document.getElementById('q3f');

            if (checkSelect(q3a) && checkSelect(q3b) && checkSelect(q3c) && checkSelect(q3d) && checkSelect(q3e) && checkSelect(q3f)) {
                markCorrect('q3');
            } else {
                markWrong('q3');
                allCorrect = false;
            }

            // Q4: Dropdowns
            const q4a = document.getElementById('q4a');
            const q4b = document.getElementById('q4b');
            const q4c = document.getElementById('q4c');
            const q4d = document.getElementById('q4d');
            const q4e = document.getElementById('q4e');

            if (checkSelect(q4a) && checkSelect(q4b) && checkSelect(q4c) && checkSelect(q4d) && checkSelect(q4e)) {
                markCorrect('q4');
            } else {
                markWrong('q4');
                allCorrect = false;
            }

            // Q5: Matching
            let q5Correct = true;
            const q5Pairs = matchedPairs.q5;
            if (q5Pairs.length !== 4) q5Correct = false;
            else {
                q5Pairs.forEach(p => {
                    if (p.defId !== p.termId) q5Correct = false;
                });
            }

            if (q5Correct) {
                markCorrect('q5');
                q5Pairs.forEach(p => {
                    p.def.classList.remove('match-paired');
                    p.term.classList.remove('match-paired');
                    p.def.classList.add('match-solved');
                    p.term.classList.add('match-solved');
                });
            } else {
                markWrong('q5');
                allCorrect = false;
            }

            // Q6: Ordering
            const q6a = document.getElementById('q6a');
            const q6b = document.getElementById('q6b');
            const q6c = document.getElementById('q6c');
            const q6d = document.getElementById('q6d');
            const q6e = document.getElementById('q6e');

            if (q6a.value === 'Data packet arrives at the router' &&
                q6b.value === 'Router inspects the destination IP address' &&
                q6c.value === 'Router checks its routing table for the best path' &&
                q6d.value === 'Packet is forwarded to the next network or switch' &&
                q6e.value === 'Packet is delivered to the destination device') {
                markCorrect('q6');
                q6a.classList.add('correct');
                q6b.classList.add('correct');
                q6c.classList.add('correct');
                q6d.classList.add('correct');
                q6e.classList.add('correct');
            } else {
                markWrong('q6');
                allCorrect = false;
                if (q6a.value !== 'Data packet arrives at the router') q6a.classList.add('wrong');
                if (q6b.value !== 'Router inspects the destination IP address') q6b.classList.add('wrong');
                if (q6c.value !== 'Router checks its routing table for the best path') q6c.classList.add('wrong');
                if (q6d.value !== 'Packet is forwarded to the next network or switch') q6d.classList.add('wrong');
                if (q6e.value !== 'Packet is delivered to the destination device') q6e.classList.add('wrong');
            }

            // Q7: MCQ
            if (q7Selected === 'To automatically assign IP addresses to devices') {
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
            if (q9Order.every((val, idx, arr) => idx === 0 || arr[idx - 1] < val) && q9Order.length === 2) {
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
    