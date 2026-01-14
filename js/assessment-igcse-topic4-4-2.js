/**
 * Extracted from public/igcse/topic4/4.2_assessment.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- SESSION / TRACKING ---
        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let teacherName = "";
        const testName = "4.2 Programming Languages, Translators & IDEs";

        // Attempt tracking (internal)
        const mistakeCounts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
        const completed = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false, q8: false, q9: false, q10: false };
        let totalAttempts = 0;
        let assessmentFinished = false;

        // --- DATA ---
        const tfStatements = [
            { id: 1, text: 'An assembler translates high-level language programs.', answer: false },
            { id: 2, text: 'It is more difficult to write a program in a low-level language.', answer: true },
            { id: 3, text: 'Java is an assembly language.', answer: false },
            { id: 4, text: 'It is quicker to develop a program using a high-level language.', answer: true },
            { id: 5, text: 'You always need a compiler to run a compiled program.', answer: false },
            { id: 6, text: 'An interpreted program runs slower than a compiled program.', answer: true },
            { id: 7, text: 'Low-level languages are machine dependent.', answer: true }
        ];

        const q3Items = [
            { id: 'c1', text: 'Creates an .exe file', correct: 'comp' },
            { id: 'i1', text: 'Stops at first error', correct: 'int' },
            { id: 'i2', text: 'Good for development', correct: 'int' },
            { id: 'c2', text: 'Translates all at once', correct: 'comp' },
            { id: 'c3', text: 'User doesn\'t need translator installed', correct: 'comp' },
            { id: 'i3', text: 'Runs slower', correct: 'int' }
        ];

        const q4Items = [
            { id: 'lbl-editor', text: 'Code Editor', target: 'target-editor' },
            { id: 'lbl-debug', text: 'Debugger/Vars', target: 'target-debug' },
            { id: 'lbl-explorer', text: 'Project Explorer', target: 'target-explorer' },
            { id: 'lbl-output', text: 'Output Window', target: 'target-output' }
        ];

        const transItems = [
            { id: 't-source', text: 'Source Code (High-Level)' },
            { id: 't-trans', text: 'Translator (Compiler)' },
            { id: 't-obj', text: 'Object Code (Machine Code)' },
            { id: 't-exe', text: 'Executable File (.exe)' }
        ];

        const dropdownOptions = {
            q2a: ['auto-completion', 'error diagnostics', 'compiler'],
            q2b: ['prettyprinting', 'debugging', 'runtime'],
            q2cd: ['compiler', 'interpreter', 'assembler'],
            q5: ['High-Level', 'Low-Level (Assembly)'],
            q7: ['High-Level', 'Assembly', 'Machine Code']
        };

        const questionMeta = [
            { id: 'q1', title: 'Translator Truths', correctAnswer: 'F, T, F, T, F, T, T' },
            { id: 'q2', title: 'IDE & Translation', correctAnswer: 'error diagnostics, prettyprinting, compiler, interpreter' },
            { id: 'q3', title: 'Compiler vs Interpreter', correctAnswer: 'Compiler: .exe, all at once, no translator. Interpreter: first error, dev, slower' },
            { id: 'q4', title: 'IDE Layout', correctAnswer: 'Editor → main, Explorer → files, Output → results, Debug → vars' },
            { id: 'q5', title: 'Language Choice', correctAnswer: 'Low-Level, High-Level, Low-Level' },
            { id: 'q6', title: 'Translation Process', correctAnswer: 'Source → Translator → Object → Executable' },
            { id: 'q7', title: 'Code Identification', correctAnswer: 'Assembly, Machine Code, High-Level' },
            { id: 'q8', title: 'Compiler Advantages', correctAnswer: 'Protects source code from being seen or copied' },
            { id: 'q9', title: 'IDE Debugging', correctAnswer: 'T, T, F, T' },
            { id: 'q10', title: 'The Assembler', correctAnswer: 'assembly language, one machine code instruction, mnemonics, low-level' }
        ];

        // Q8 MCQ Data
        const q8Options = [
            { text: 'Protects source code from being seen or copied', correct: true },
            { text: 'Makes the program easier to debug', correct: false },
            { text: 'Allows the program to run on any operating system', correct: false },
            { text: 'Reduces the file size of the program', correct: false }
        ];
        let q8Selected = null;

        // Q9 True/False Data
        const q9Statements = [
            { id: 'tf9-1', text: 'Breakpoints allow you to pause execution at specific lines', correct: true },
            { id: 'tf9-2', text: 'Variable watch windows show current values during execution', correct: true },
            { id: 'tf9-3', text: 'Single-stepping executes the entire program at once', correct: false },
            { id: 'tf9-4', text: 'Debuggers can help locate logic errors', correct: true }
        ];

        // Q10 Dropdown Options
        const q10Options = {
            q10a: ['assembly language', 'machine code', 'high-level language'],
            q10b: ['one machine code instruction', 'multiple instructions', 'no instructions'],
            q10c: ['mnemonics', 'binary numbers', 'English sentences'],
            q10d: ['low-level', 'high-level', 'markup']
        };

        let tfSelections = {};

        // --- UTILITY ---
        function shuffle(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        function populateDropdown(id, options) {
            const select = document.getElementById(id);
            select.innerHTML = '<option value="">---</option>';
            shuffle(options).forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                select.appendChild(option);
            });
        }

        // --- INITIALIZE ---
        function initializeShuffledContent() {
            // Q1: True/False - shuffle statements
            const tfGrid = document.getElementById('tf-grid');
            shuffle(tfStatements).forEach(stmt => {
                const row = document.createElement('div');
                row.className = 'tf-row';
                row.innerHTML = `
                    <div class="tf-statement">${stmt.text}</div>
                    <div class="tf-option" onclick="selectTF(${stmt.id}, true)" id="q1-${stmt.id}-t"></div>
                    <div class="tf-option" onclick="selectTF(${stmt.id}, false)" id="q1-${stmt.id}-f"></div>
                `;
                tfGrid.appendChild(row);
            });

            // Q2 Dropdowns
            populateDropdown('q2a', dropdownOptions.q2a);
            populateDropdown('q2b', dropdownOptions.q2b);
            populateDropdown('q2c', dropdownOptions.q2cd);
            populateDropdown('q2d', dropdownOptions.q2cd);

            // Q3: Drag items
            const q3Source = document.getElementById('q3-source');
            shuffle(q3Items).forEach(item => {
                const div = document.createElement('div');
                div.className = 'drag-item';
                div.draggable = true;
                div.id = item.id;
                div.textContent = item.text;
                div.ondragstart = drag;
                q3Source.appendChild(div);
            });

            // Q4: IDE labels
            const q4Source = document.getElementById('q4-source');
            shuffle(q4Items).forEach(item => {
                const div = document.createElement('div');
                div.className = 'drag-item';
                div.draggable = true;
                div.id = item.id;
                div.textContent = item.text;
                div.ondragstart = drag;
                q4Source.appendChild(div);
            });

            // Q5 Dropdowns
            populateDropdown('q5a', dropdownOptions.q5);
            populateDropdown('q5b', dropdownOptions.q5);
            populateDropdown('q5c', dropdownOptions.q5);

            // Q6: Sortable
            initSortable();

            // Q7 Dropdowns
            populateDropdown('q7a', dropdownOptions.q7);
            populateDropdown('q7b', dropdownOptions.q7);
            populateDropdown('q7c', dropdownOptions.q7);

            // Q8: MCQ
            const q8Container = document.getElementById('q8-options');
            shuffle(q8Options).forEach(opt => {
                const div = document.createElement('div');
                div.className = 'mcq-option';
                div.dataset.correct = opt.correct;
                div.dataset.value = opt.text;
                div.textContent = opt.text;
                div.onclick = () => {
                    if (completed.q8) return;
                    q8Container.querySelectorAll('.mcq-option').forEach(o => o.classList.remove('selected'));
                    div.classList.add('selected');
                    q8Selected = opt.text;
                };
                q8Container.appendChild(div);
            });

            // Q9: True/False Table
            const q9Tbody = document.getElementById('q9-tbody');
            shuffle(q9Statements).forEach(stmt => {
                const tr = document.createElement('tr');
                tr.dataset.id = stmt.id;
                tr.dataset.correct = stmt.correct;
                tr.innerHTML = `<td>${stmt.text}</td><td><input type="radio" name="${stmt.id}" value="true"></td><td><input type="radio" name="${stmt.id}" value="false"></td>`;
                q9Tbody.appendChild(tr);
            });

            // Q10: Dropdowns
            populateDropdown('q10a', q10Options.q10a);
            populateDropdown('q10b', q10Options.q10b);
            populateDropdown('q10c', q10Options.q10c);
            populateDropdown('q10d', q10Options.q10d);
        }

        function startAssessment() {
            const teacher = document.getElementById('teacherSelect').value;
            if (!teacher) {
                alert("Please select your teacher.");
                return;
            }
            teacherName = teacher;

            initializeShuffledContent();

            document.getElementById('startOverlay').style.display = 'none';
            document.querySelector('main').style.display = 'block';
            document.getElementById('timerDisplay').style.display = 'block';
            startTime = Date.now();
            timerInterval = setInterval(() => {
                const delta = Date.now() - startTime;
                const seconds = Math.floor((delta / 1000) % 60);
                const minutes = Math.floor((delta / (1000 * 60)) % 60);
                const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                document.getElementById('timer').innerText = timeStr;
                timeTakenStr = timeStr;
            }, 1000);
        }

        // --- DRAG & DROP ---
        function allowDrop(ev) { ev.preventDefault(); }
        function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

        function drop(ev) {
            ev.preventDefault();
            if (ev.target.classList.contains('bucket') || ev.target.classList.contains('draggable-source')) {
                var data = ev.dataTransfer.getData("text");
                ev.target.appendChild(document.getElementById(data));
            }
            if (ev.target.parentNode && ev.target.parentNode.classList.contains('bucket')) {
                var data = ev.dataTransfer.getData("text");
                ev.target.parentNode.appendChild(document.getElementById(data));
            }
        }

        // --- SORTABLE LIST (Q6) ---
        function initSortable() {
            const list = document.getElementById('trans-list');
            let items = shuffle([...transItems]);

            items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'sortable-item';
                li.draggable = true;
                li.id = item.id;
                li.innerHTML = `<span>${item.text}</span><i class="fa-solid fa-grip-lines"></i>`;

                li.addEventListener('dragstart', () => li.classList.add('dragging'));
                li.addEventListener('dragend', () => li.classList.remove('dragging'));

                list.appendChild(li);
            });

            list.addEventListener('dragover', initSortableDragOver);
        }

        function initSortableDragOver(e) {
            e.preventDefault();
            const list = document.getElementById('trans-list');
            const afterElement = getDragAfterElement(list, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                list.appendChild(draggable);
            } else {
                list.insertBefore(draggable, afterElement);
            }
        }

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];
            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }

        // --- TRUE/FALSE ---
        function selectTF(row, val) {
            document.getElementById(`q1-${row}-t`).classList.remove('selected');
            document.getElementById(`q1-${row}-f`).classList.remove('selected');

            if (val === true) document.getElementById(`q1-${row}-t`).classList.add('selected');
            else document.getElementById(`q1-${row}-f`).classList.add('selected');

            tfSelections[row] = val;
        }

        // --- MARKING ---
        function checkAnswers() {
            totalAttempts++;
            let totalQuestions = 7;
            let correctCount = 0;

            // Q1 True/False
            let q1Correct = true;
            tfStatements.forEach(stmt => {
                let tBtn = document.getElementById(`q1-${stmt.id}-t`);
                let fBtn = document.getElementById(`q1-${stmt.id}-f`);

                tBtn.classList.remove('correct', 'wrong');
                fBtn.classList.remove('correct', 'wrong');

                if (tfSelections[stmt.id] === stmt.answer) {
                    if (stmt.answer === true) tBtn.classList.add('correct');
                    else fBtn.classList.add('correct');
                } else {
                    q1Correct = false;
                    tBtn.classList.remove('selected');
                    fBtn.classList.remove('selected');
                    delete tfSelections[stmt.id];
                }
            });
            updateStatus('q1', q1Correct);
            if (q1Correct) correctCount++;

            // Helper
            function checkSelect(id) {
                let el = document.getElementById(id);
                let ans = el.dataset.answer;
                if (el.value === ans) {
                    el.classList.add('correct');
                    el.classList.remove('wrong');
                    return 1;
                } else {
                    el.classList.add('wrong');
                    el.value = "";
                    return 0;
                }
            }

            // Q2
            let s2 = checkSelect('q2a') + checkSelect('q2b') + checkSelect('q2c') + checkSelect('q2d');
            updateStatus('q2', s2 === 4);
            if (s2 === 4) correctCount++;

            // Q3 Drag Drop
            const compAns = ['c1', 'c2', 'c3'];
            const intAns = ['i1', 'i2', 'i3'];
            let q3Correct = true;

            Array.from(document.getElementById('bucket-comp').children).forEach(child => {
                if (child.tagName === 'DIV' && !child.classList.contains('ide-target')) {
                    if (compAns.includes(child.id)) { child.classList.add('locked'); }
                    else { q3Correct = false; document.getElementById('q3-source').appendChild(child); }
                }
            });
            Array.from(document.getElementById('bucket-int').children).forEach(child => {
                if (child.tagName === 'DIV') {
                    if (intAns.includes(child.id)) { child.classList.add('locked'); }
                    else { q3Correct = false; document.getElementById('q3-source').appendChild(child); }
                }
            });
            updateStatus('q3', q3Correct);
            if (q3Correct) correctCount++;

            // Q4 Diagram
            function checkTarget(targetId, itemId) {
                const target = document.getElementById(targetId);
                const item = document.getElementById(itemId);
                if (target.contains(item)) {
                    item.classList.add('locked');
                    return true;
                } else if (item && item.parentNode.id !== 'q4-source') {
                    document.getElementById('q4-source').appendChild(item);
                    return false;
                }
                return false;
            }

            let c4a = checkTarget('target-editor', 'lbl-editor');
            let c4b = checkTarget('target-debug', 'lbl-debug');
            let c4c = checkTarget('target-explorer', 'lbl-explorer');
            let c4d = checkTarget('target-output', 'lbl-output');
            let q4Correct = c4a && c4b && c4c && c4d;
            updateStatus('q4', q4Correct);
            if (q4Correct) correctCount++;

            // Q5
            let s5 = checkSelect('q5a') + checkSelect('q5b') + checkSelect('q5c');
            updateStatus('q5', s5 === 3);
            if (s5 === 3) correctCount++;

            // Q6 Sortable
            const listItems = document.querySelectorAll('#trans-list li');
            const correctOrder = ['t-source', 't-trans', 't-obj', 't-exe'];
            let currentOrder = Array.from(listItems).map(li => li.id);
            let q6Correct = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);

            const listEl = document.getElementById('trans-list');
            if (q6Correct) {
                listEl.classList.add('correct');
                listEl.classList.remove('wrong');
                listItems.forEach(li => li.draggable = false);
            } else {
                listEl.classList.add('wrong');
                setTimeout(() => {
                    listEl.classList.remove('wrong');
                    for (let i = listEl.children.length; i >= 0; i--) {
                        listEl.appendChild(listEl.children[Math.random() * i | 0]);
                    }
                }, 1000);
            }
            updateStatus('q6', q6Correct);
            if (q6Correct) correctCount++;

            // Q7
            let s7 = checkSelect('q7a') + checkSelect('q7b') + checkSelect('q7c');
            updateStatus('q7', s7 === 3);
            if (s7 === 3) correctCount++;

            // Q8: MCQ
            const q8Correct = q8Selected === 'Protects source code from being seen or copied';
            if (q8Correct) {
                document.querySelectorAll('#q8-options .mcq-option').forEach(opt => { if (opt.dataset.correct === 'true') opt.classList.add('correct'); });
            } else {
                document.querySelectorAll('#q8-options .mcq-option.selected').forEach(opt => opt.classList.add('wrong'));
            }
            updateStatus('q8', q8Correct);
            if (q8Correct) correctCount++;

            // Q9: True/False Table
            let q9Correct = true;
            document.querySelectorAll('#q9-tbody tr').forEach(row => {
                const selected = row.querySelector('input[type="radio"]:checked');
                if (!selected || selected.value !== row.dataset.correct) { q9Correct = false; row.classList.add('wrong-row'); }
                else row.classList.add('correct-row');
            });
            updateStatus('q9', q9Correct);
            if (q9Correct) correctCount++;

            // Q10: Dropdowns
            let s10 = checkSelect('q10a') + checkSelect('q10b') + checkSelect('q10c') + checkSelect('q10d');
            updateStatus('q10', s10 === 4);
            if (s10 === 4) correctCount++;

            totalQuestions = 10;

            // Track mistakes
            const correctness = { q1: q1Correct, q2: s2 === 4, q3: q3Correct, q4: q4Correct, q5: s5 === 3, q6: q6Correct, q7: s7 === 3, q8: q8Correct, q9: q9Correct, q10: s10 === 4 };
            Object.keys(correctness).forEach(key => {
                if (!correctness[key] && !completed[key]) {
                    mistakeCounts[key] += 1;
                }
                if (correctness[key]) {
                    completed[key] = true;
                }
            });

            // Show Score
            const finalDiv = document.getElementById('finalScore');
            finalDiv.style.display = 'block';
            finalDiv.innerText = `Score: ${correctCount} / ${totalQuestions} — ${correctCount < totalQuestions ? 'Keep trying!' : ''}`;

            if (correctCount === totalQuestions && !assessmentFinished) {
                assessmentFinished = true;
                clearInterval(timerInterval);
                document.getElementById('completionMessage').style.display = 'block';
                document.getElementById('btnSubmit').style.display = 'none';
                generatePDF();
            }
        }

        function updateStatus(id, isCorrect) {
            const el = document.getElementById(id + '-status');
            if (isCorrect) {
                el.innerText = "Correct";
                el.className = "q-status correct";
            } else {
                el.innerText = "Incorrect";
                el.className = "q-status wrong";
            }
        }

        async function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 15;
            const contentWidth = pageWidth - margin * 2;
            let yPos = 20;

            function checkPageBreak(heightNeeded) {
                if (yPos + heightNeeded > pageHeight - margin) {
                    doc.addPage();
                    yPos = 20;
                }
            }

            // --- PAGE 1: TEST WITH CORRECT ANSWERS ---
            try {
                const logo = await getBase64ImageFromUrl('../../images/Logo.png');
                doc.addImage(logo, 'PNG', pageWidth - 35, 8, 22, 22);
            } catch (e) { console.warn('Logo load failed', e); }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.setTextColor('#003366');
            doc.text(testName, margin, yPos); yPos += 8;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor('#666666');
            doc.text(`Teacher: ${teacherName}  |  Time: ${timeTakenStr}  |  Date: ${new Date().toLocaleDateString()}`, margin, yPos);
            yPos += 12;

            doc.setDrawColor(200);
            doc.setLineWidth(0.5);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 10;

            // Helper for Section Headers
            function addSectionHeader(title) {
                checkPageBreak(15);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(12);
                doc.setTextColor('#003366');
                doc.text(title, margin, yPos);
                yPos += 7;
            }

            // Helper for Question Text
            function addQuestionText(text) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                doc.setTextColor('#333333');
                const splitText = doc.splitTextToSize(text, contentWidth);
                checkPageBreak(splitText.length * 5);
                doc.text(splitText, margin, yPos);
                yPos += (splitText.length * 5) + 3;
            }

            // Helper for Answer Box
            function addAnswerBox(label, items, color = '#e6f0fa') {
                const boxWidth = (contentWidth / 2) - 5;
                const startY = yPos;

                doc.setFillColor(color);
                doc.roundedRect(margin + (label === 'Interpreter' ? boxWidth + 10 : 0), startY, boxWidth, 40, 3, 3, 'F');

                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.setTextColor('#003366');

                const xOffset = margin + (label === 'Interpreter' ? boxWidth + 10 : 0) + 5;
                doc.text(label, xOffset, startY + 8);

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor('#333');

                let itemY = startY + 15;
                items.forEach(item => {
                    // Handle long text in boxes
                    const splitItem = doc.splitTextToSize(`• ${item}`, boxWidth - 10);
                    doc.text(splitItem, xOffset, itemY);
                    itemY += (splitItem.length * 4) + 2;
                });

                return 45; // Fixed height for consistency
            }

            // Q1: True/False
            addSectionHeader('Q1. Translator Truths (True/False)');
            const q1Data = [
                { t: 'An assembler translates high-level language programs.', a: 'FALSE' },
                { t: 'It is more difficult to write a program in a low-level language.', a: 'TRUE' },
                { t: 'Java is an assembly language.', a: 'FALSE' },
                { t: 'It is quicker to develop a program using a high-level language.', a: 'TRUE' },
                { t: 'You always need a compiler to run a compiled program.', a: 'FALSE' },
                { t: 'An interpreted program runs slower than a compiled program.', a: 'TRUE' },
                { t: 'Low-level languages are machine dependent.', a: 'TRUE' }
            ];
            checkPageBreak(q1Data.length * 6);
            q1Data.forEach((item, i) => {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.text(`${i + 1}. ${item.t}`, margin, yPos);
                doc.setFont('helvetica', 'bold');
                doc.text(`→ ${item.a}`, margin + 130, yPos);
                yPos += 5;
            });
            yPos += 8;

            // Q2: Cloze
            addSectionHeader('Q2. IDEs & Translation Concepts');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const q2Text = `(a) Suki uses an IDE. To check for syntax errors while typing, she relies on error diagnostics. To make the code easier to read with colour-coding, the IDE uses prettyprinting.
(b) She wants to distribute the software without giving away the source code. She should use a compiler to create an executable file.
(c) While testing, she wants to run the code line-by-line to find a logic error. She should use an interpreter.`;
            const splitQ2 = doc.splitTextToSize(q2Text, contentWidth);
            checkPageBreak(splitQ2.length * 6);
            doc.text(splitQ2, margin, yPos);
            yPos += (splitQ2.length * 6) + 10;

            // Q3: Drag & Drop
            addSectionHeader('Q3. Categorise the Translator');
            checkPageBreak(50);
            const q3Height = Math.max(
                addAnswerBox('Compiler', ['Creates an .exe file', 'Translates all at once', 'User doesn\'t need translator installed']),
                addAnswerBox('Interpreter', ['Stops at first error', 'Good for development', 'Runs slower'])
            );
            yPos += q3Height + 10;

            // Q4: Diagram
            addSectionHeader('Q4. Label the IDE');
            const q4Data = [
                'Main Area → Code Editor',
                'Files List → Project Explorer',
                'Results/Errors → Output Window',
                'Variable Watch → Debugger/Vars'
            ];
            checkPageBreak(q4Data.length * 7);
            q4Data.forEach(item => {
                doc.setFont('helvetica', 'normal');
                doc.text(item, margin + 10, yPos);
                yPos += 6;
            });
            yPos += 8;

            // Q5: Scenarios
            addSectionHeader('Q5. Choose the Language');
            const q5Data = [
                '1. Writing a device driver for a new graphics card to ensure maximum speed: Low-Level (Assembly)',
                '2. Writing a cross-platform mobile app for Android and iOS: High-Level',
                '3. Programming a microcontroller with very limited memory: Low-Level (Assembly)'
            ];
            checkPageBreak(q5Data.length * 8);
            q5Data.forEach(item => {
                const splitItem = doc.splitTextToSize(item, contentWidth);
                doc.text(splitItem, margin, yPos);
                yPos += (splitItem.length * 5) + 3;
            });
            yPos += 5;

            // Q6: Order
            addSectionHeader('Q6. The Translation Process');
            const q6Steps = [
                '1. Source Code (High-Level)',
                '2. Translator (Compiler)',
                '3. Object Code (Machine Code)',
                '4. Executable File (.exe)'
            ];
            checkPageBreak(q6Steps.length * 7);
            q6Steps.forEach(step => {
                doc.setFont('helvetica', 'bold');
                doc.text(step, margin + 20, yPos);
                yPos += 7;
            });
            yPos += 8;

            // Q7: Code ID
            addSectionHeader('Q7. Identify the Code');
            const q7Data = [
                { c: 'LDA #25 / ADD #10', t: 'Assembly' },
                { c: '10101100 00110101', t: 'Machine Code' },
                { c: 'if x > 10: print("Hello")', t: 'High-Level' }
            ];
            checkPageBreak(q7Data.length * 8);
            q7Data.forEach(item => {
                doc.setFont('courier', 'normal');
                doc.text(item.c, margin, yPos);
                doc.setFont('helvetica', 'bold');
                doc.text(`→  ${item.t}`, margin + 80, yPos);
                yPos += 7;
            });
            yPos += 8;

            // Q8: MCQ
            addSectionHeader('Q8. Compiler Advantages');
            addQuestionText('Why might a software company prefer to distribute compiled code rather than interpreted source code?');
            doc.setFont('helvetica', 'bold');
            doc.setTextColor('#28a745');
            doc.text('✔ Protects source code from being seen or copied', margin + 5, yPos);
            yPos += 10;

            // Q9: True/False Table
            addSectionHeader('Q9. IDE Debugging Features');
            const q9Data = [
                { t: 'Breakpoints allow you to pause execution at specific lines', a: 'TRUE' },
                { t: 'Variable watch windows show current values during execution', a: 'TRUE' },
                { t: 'Single-stepping executes the entire program at once', a: 'FALSE' },
                { t: 'Debuggers can help locate logic errors', a: 'TRUE' }
            ];
            checkPageBreak(q9Data.length * 6);
            q9Data.forEach(item => {
                doc.setFont('helvetica', 'normal');
                doc.setTextColor('#333');
                doc.text(item.t, margin, yPos);
                doc.setFont('helvetica', 'bold');
                doc.text(`→ ${item.a}`, margin + 140, yPos);
                yPos += 6;
            });
            yPos += 8;

            // Q10: Cloze
            addSectionHeader('Q10. The Assembler');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const q10Text = `An assembler translates assembly language into machine code.
Each assembly instruction corresponds to one machine code instruction.
Assembly language uses mnemonics like LDA, ADD, and STO.
Assembly is considered a low-level language.`;
            const splitQ10 = doc.splitTextToSize(q10Text, contentWidth);
            checkPageBreak(splitQ10.length * 6);
            doc.text(splitQ10, margin, yPos);
            yPos += (splitQ10.length * 6) + 10;


            // --- PAGE 2: FEEDBACK ---
            doc.addPage();
            yPos = 20;

            try {
                const logo = await getBase64ImageFromUrl('../../images/Logo.png');
                doc.addImage(logo, 'PNG', pageWidth - 35, 8, 22, 22);
            } catch (e) { }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor('#003366');
            doc.text('Feedback & Reflection', margin, yPos); yPos += 10;

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor('#666');
            doc.text('Key: C = Content gap | E = Exam technique | L = Language/clarity | T = Time/effort | M = Misread/misapplied', margin, yPos);
            yPos += 8;

            // Table
            const colWidths = [12, 70, 25, 30];
            const rowHeight = 8;
            const tableX = margin;

            // Header
            doc.setFillColor(0, 51, 102);
            doc.rect(tableX, yPos, contentWidth, rowHeight, 'F');
            doc.setTextColor('#FFFFFF');
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');

            doc.text('Q', tableX + colWidths[0] / 2, yPos + 5.5, { align: 'center' });
            doc.text('Topic', tableX + colWidths[0] + colWidths[1] / 2, yPos + 5.5, { align: 'center' });
            doc.text('Attempts', tableX + colWidths[0] + colWidths[1] + colWidths[2] / 2, yPos + 5.5, { align: 'center' });
            doc.text('Code', tableX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] / 2, yPos + 5.5, { align: 'center' });
            yPos += rowHeight;

            doc.setTextColor('#000');
            doc.setFont('helvetica', 'normal');

            questionMeta.forEach((q, idx) => {
                const attempts = (mistakeCounts[q.id] || 0) + 1;

                if (idx % 2 === 0) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(tableX, yPos, contentWidth, rowHeight, 'F');
                }

                doc.setDrawColor(200);
                doc.rect(tableX, yPos, colWidths[0], rowHeight, 'S');
                doc.rect(tableX + colWidths[0], yPos, colWidths[1], rowHeight, 'S');
                doc.rect(tableX + colWidths[0] + colWidths[1], yPos, colWidths[2], rowHeight, 'S');
                doc.rect(tableX + colWidths[0] + colWidths[1] + colWidths[2], yPos, colWidths[3], rowHeight, 'S');

                doc.setFontSize(9);
                doc.text(`${idx + 1}`, tableX + colWidths[0] / 2, yPos + 5.5, { align: 'center' });
                doc.text(q.title, tableX + colWidths[0] + 3, yPos + 5.5);
                doc.text(`${attempts}`, tableX + colWidths[0] + colWidths[1] + colWidths[2] / 2, yPos + 5.5, { align: 'center' });

                // Editable text field for Code
                const codeFieldX = tableX + colWidths[0] + colWidths[1] + colWidths[2] + 2;
                const codeFieldY = yPos + 1;
                const codeFieldW = colWidths[3] - 4;
                const codeFieldH = rowHeight - 2;

                const codeField = new doc.AcroFormTextField();
                codeField.Rect = [codeFieldX, codeFieldY, codeFieldW, codeFieldH];
                codeField.fieldName = `code_q${idx + 1}`;
                codeField.maxFontSize = 9;
                codeField.textAlign = 'center';
                doc.addField(codeField);

                yPos += rowHeight;
            });

            yPos += 8;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text(`Total Submission Attempts: ${totalAttempts}`, margin, yPos);
            yPos += 12;

            // --- STUDENT REFLECTION BOX (editable) ---
            checkPageBreak(50);
            const reflectionHeight = 45;
            doc.setDrawColor(40, 167, 69);
            doc.setLineWidth(1.5);
            doc.rect(margin, yPos, contentWidth, reflectionHeight, 'S');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor('#28a745');
            doc.text('Student Reflection', margin + 4, yPos + 8);

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(8);
            doc.setTextColor('#666');
            doc.text('Using the codes above, identify your main problem area(s) and explain what you will focus on to improve.', margin + 4, yPos + 14);

            // Editable text field for reflection
            const reflectionField = new doc.AcroFormTextField();
            reflectionField.Rect = [margin + 2, yPos + 17, contentWidth - 4, reflectionHeight - 20];
            reflectionField.fieldName = 'student_reflection';
            reflectionField.multiline = true;
            reflectionField.maxFontSize = 10;
            doc.addField(reflectionField);

            yPos += reflectionHeight + 8;

            // --- TEACHER COMMENT BOX (editable) ---
            checkPageBreak(40);
            const teacherHeight = 45;
            doc.setDrawColor(111, 66, 193);
            doc.setLineWidth(1.5);
            doc.rect(margin, yPos, contentWidth, teacherHeight, 'S');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor('#6f42c1');
            doc.text('Teacher Comment', margin + 4, yPos + 8);

            // NEW: Editable Teacher Comment Field
            const teacherField = new doc.AcroFormTextField();
            teacherField.Rect = [margin + 2, yPos + 12, contentWidth - 4, teacherHeight - 16];
            teacherField.fieldName = 'teacher_comment';
            teacherField.multiline = true;
            teacherField.maxFontSize = 10;
            doc.addField(teacherField);

            doc.save(`${testName.replace(/[^a-zA-Z0-9]/g, '_')}_Feedback.pdf`);
        }

        function getBase64ImageFromUrl(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = err => reject(err);
                img.src = url;
            });
        }
    