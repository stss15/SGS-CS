/**
 * Extracted from Topic3_End_of_unit_Test.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "Topic 3 End of Unit Test";

        // Attempt tracking
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA ---
        // Q1 Matching
        const q1Defs = [
            { id: '1', text: 'Holds the address of the next instruction' },
            { id: '2', text: 'Holds the address of the memory location currently being accessed' },
            { id: '3', text: 'Holds the data fetched from or to be written to memory' },
            { id: '4', text: 'Holds the results of calculations' }
        ];
        const q1Terms = [
            { id: '1', text: 'PC' },
            { id: '2', text: 'MAR' },
            { id: '3', text: 'MDR' },
            { id: '4', text: 'ACC' }
        ];

        // Q3 Drag
        const q3Items = [
            { id: 'i1', text: 'Barcode Scanner', correct: 'input' },
            { id: 'i2', text: 'Sensor', correct: 'input' },
            { id: 'i3', text: 'Microphone', correct: 'input' },
            { id: 'o1', text: 'Actuator', correct: 'output' },
            { id: 'o2', text: '3D Printer', correct: 'output' },
            { id: 'o3', text: 'Projector', correct: 'output' }
        ];

        // Q5 Drag
        const q5Items = [
            { id: 'r1', text: 'Volatile', correct: 'ram' },
            { id: 'r2', text: 'Read/Write', correct: 'ram' },
            { id: 'r3', text: 'Larger Capacity', correct: 'ram' },
            { id: 'm1', text: 'Non-Volatile', correct: 'rom' },
            { id: 'm2', text: 'Read Only', correct: 'rom' },
            { id: 'm3', text: 'Stores BIOS', correct: 'rom' }
        ];

        // Q7 Matching
        const q7Defs = [
            { id: '1', text: 'Red laser, ~700MB capacity' },
            { id: '2', text: 'Red laser, ~4.7GB capacity' },
            { id: '3', text: 'Blue laser, ~25GB+ capacity' }
        ];
        const q7Terms = [
            { id: '1', text: 'CD' },
            { id: '2', text: 'DVD' },
            { id: '3', text: 'Blu-ray' }
        ];

        // Q9 Matching
        const q9Defs = [
            { id: '1', text: 'Connects LAN to WAN and directs packets' },
            { id: '2', text: 'Connects a device to a network' },
            { id: '3', text: 'Connects devices within a LAN' },
            { id: '4', text: 'Provides wireless connectivity' }
        ];
        const q9Terms = [
            { id: '1', text: 'Router' },
            { id: '2', text: 'NIC' },
            { id: '3', text: 'Switch' },
            { id: '4', text: 'WAP' }
        ];

        // Dropdown Options
        const dropdownOptions = {
            q2: ['PC address is copied to MAR', 'Instruction is fetched to MDR', 'Instruction is copied to CIR', 'Instruction is decoded by the CU', 'Instruction is executed'],
            q4Type: ['Inkjet', 'Laser', '3D', 'Dot Matrix'],
            q6: ['CPU Cache', 'RAM', 'SSD', 'HDD', 'Optical Disc'],
            q8Type: ['Physical', 'Logical', 'Virtual', 'Static'],
            q8Bits: ['48', '32', '128', '64'],
            q8Base: ['Hexadecimal', 'Denary', 'Binary', 'Octal'],
            q10Dev: ['HDD/SSD', 'CPU', 'Monitor', 'Keyboard'],
            q10Prob: ['Thrashing', 'Crashing', 'Paging', 'Swapping'],
            q10Cloud: ['Public', 'Private', 'Hybrid', 'Cumulus']
        };

        const questionMeta = [
            { id: 'q1', title: 'CPU Registers', type: 'match', correctAnswer: { '1': 'PC', '2': 'MAR', '3': 'MDR', '4': 'ACC' } },
            { id: 'q2', title: 'F-D-E Cycle', type: 'order', correctAnswer: ['PC->MAR', 'MDR', 'CIR', 'Decode', 'Execute'] },
            { id: 'q3', title: 'Input/Output', type: 'drag', correctAnswer: { input: ['Scanner', 'Sensor', 'Mic'], output: ['Actuator', '3D Printer', 'Projector'] } },
            { id: 'q4', title: 'Printers', type: 'dropdown', correctAnswer: { a: 'Inkjet', b: 'Laser', c: '3D', d: 'Dot Matrix' } },
            { id: 'q5', title: 'RAM/ROM', type: 'drag', correctAnswer: { ram: ['Volatile', 'R/W', 'Capacity'], rom: ['Non-Volatile', 'Read Only', 'BIOS'] } },
            { id: 'q6', title: 'Storage Speed', type: 'order', correctAnswer: ['Cache', 'RAM', 'SSD', 'HDD', 'Optical'] },
            { id: 'q7', title: 'Optical Media', type: 'match', correctAnswer: { '1': 'CD', '2': 'DVD', '3': 'Blu-ray' } },
            { id: 'q8', title: 'MAC/IP', type: 'dropdown', correctAnswer: { a: 'Physical', b: 'Logical', c: '48', d: 'Hexadecimal', e: '32', f: 'Denary' } },
            { id: 'q9', title: 'Network HW', type: 'match', correctAnswer: { '1': 'Router', '2': 'NIC', '3': 'Switch', '4': 'WAP' } },
            { id: 'q10', title: 'Cloud/VM', type: 'dropdown', correctAnswer: { a: 'HDD/SSD', b: 'Thrashing', c: 'Public', d: 'Private' } }
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
            // Q1
            initMatch('q1', q1Defs, q1Terms);
            // Q2
            initOrder('q2', dropdownOptions.q2, 5);
            // Q3
            initDrag('q3', q3Items);
            // Q4
            initDropdowns('q4', ['a', 'b', 'c', 'd'], dropdownOptions.q4Type);
            // Q5
            initDrag('q5', q5Items);
            // Q6
            initOrder('q6', dropdownOptions.q6, 5);
            // Q7
            initMatch('q7', q7Defs, q7Terms);
            // Q8
            populateDropdown('q8a', dropdownOptions.q8Type);
            populateDropdown('q8b', dropdownOptions.q8Type);
            populateDropdown('q8c', dropdownOptions.q8Bits);
            populateDropdown('q8d', dropdownOptions.q8Base);
            populateDropdown('q8e', dropdownOptions.q8Bits);
            populateDropdown('q8f', dropdownOptions.q8Base);
            // Q9
            initMatch('q9', q9Defs, q9Terms);
            // Q10
            populateDropdown('q10a', dropdownOptions.q10Dev);
            populateDropdown('q10b', dropdownOptions.q10Prob);
            populateDropdown('q10c', dropdownOptions.q10Cloud);
            populateDropdown('q10d', dropdownOptions.q10Cloud);
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

        function initOrder(qId, options, count) {
            const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
            for (let i = 0; i < count; i++) {
                populateDropdown(`${qId}${letters[i]}`, options);
            }
        }

        function initDropdowns(qId, suffixes, options) {
            suffixes.forEach(s => populateDropdown(`${qId}${s}`, options));
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

        // --- CHECK ---
        function checkAnswers() {
            totalAttempts++;
            let allCorrect = true;

            // Q1 Match
            if (!checkMatchQuestion('q1', 4)) allCorrect = false;
            // Q2 Order
            if (!checkOrderQuestion('q2', ['PC address is copied to MAR', 'Instruction is fetched to MDR', 'Instruction is copied to CIR', 'Instruction is decoded by the CU', 'Instruction is executed'])) allCorrect = false;
            // Q3 Drag
            if (!checkDragQuestion('q3', 'input', 'output')) allCorrect = false;
            // Q4 Dropdown
            if (!checkDropdowns('q4', ['a', 'b', 'c', 'd'])) allCorrect = false;
            // Q5 Drag
            if (!checkDragQuestion('q5', 'ram', 'rom')) allCorrect = false;
            // Q6 Order
            if (!checkOrderQuestion('q6', ['CPU Cache', 'RAM', 'SSD', 'HDD', 'Optical Disc'])) allCorrect = false;
            // Q7 Match
            if (!checkMatchQuestion('q7', 3)) allCorrect = false;
            // Q8 Dropdown
            if (!checkDropdowns('q8', ['a', 'b', 'c', 'd', 'e', 'f'])) allCorrect = false;
            // Q9 Match
            if (!checkMatchQuestion('q9', 4)) allCorrect = false;
            // Q10 Dropdown
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
    