/**
 * Quiz Utilities - Shared functions for IGCSE assessments
 * Created: 2026-01-15
 * 
 * This module provides shared utility functions used across all assessment files.
 * Import this before the individual assessment script.
 */

const QuizUtils = {
    // ========================
    // Utility Functions
    // ========================

    /**
     * Shuffle an array using Fisher-Yates algorithm
     */
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    /**
     * Populate a dropdown select element with shuffled options
     */
    populateDropdown(id, options) {
        const select = document.getElementById(id);
        if (!select) return;

        const shuffled = this.shuffle(options);
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
    },

    // ========================
    // Validation Functions
    // ========================

    /**
     * Check if a select element has the correct answer
     */
    checkSelect(el) {
        if (el.value === el.dataset.answer) {
            el.classList.add('correct');
            el.classList.remove('wrong');
            return true;
        } else {
            el.classList.add('wrong');
            return false;
        }
    },

    /**
     * Check if a numeric input has the correct answer
     */
    checkNumeric(el) {
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
    },

    // ========================
    // UI Update Functions
    // ========================

    /**
     * Mark a question as correct
     */
    markCorrect(qId, completed) {
        if (!completed[qId]) {
            completed[qId] = true;
            const status = document.getElementById(`${qId}-status`);
            const block = document.getElementById(`${qId}-block`);
            if (status) {
                status.textContent = "Correct";
                status.className = "q-status correct";
            }
            if (block) {
                block.style.borderLeftColor = "var(--correct-green)";
            }
        }
    },

    /**
     * Mark a question as wrong
     */
    markWrong(qId, completed, mistakeCounts) {
        if (!completed[qId]) {
            mistakeCounts[qId]++;
            const status = document.getElementById(`${qId}-status`);
            if (status) {
                status.textContent = "Incorrect";
                status.className = "q-status wrong";
            }
        }
    },

    /**
     * Lock drag items after correct answer
     */
    lockDragItems(containers) {
        containers.forEach(c => {
            Array.from(c.children).forEach(child => {
                if (child.classList.contains('drag-item')) {
                    child.draggable = false;
                    child.classList.add('locked');
                }
            });
        });
    },

    // ========================
    // Timer Functions
    // ========================

    /**
     * Format seconds into MM:SS string
     */
    formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return { display: `${m}:${s}`, readable: `${m}m ${s}s` };
    },

    // ========================
    // Drag & Drop Helpers
    // ========================

    /**
     * Allow drop event handler
     */
    allowDrop(ev) {
        ev.preventDefault();
    },

    /**
     * Drag start event handler
     */
    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    },

    /**
     * Drop event handler for buckets
     */
    drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const el = document.getElementById(data);
        if (ev.target.classList.contains('bucket') || ev.target.classList.contains('draggable-source')) {
            ev.target.appendChild(el);
        } else if (ev.target.closest('.bucket')) {
            ev.target.closest('.bucket').appendChild(el);
        }
    },

    // ========================
    // Sortable List Helpers
    // ========================

    draggedSortable: null,

    dragSortable(ev) {
        QuizUtils.draggedSortable = ev.target;
        ev.target.style.opacity = '0.5';
    },

    dragOverSortable(ev) {
        ev.preventDefault();
    },

    dropSortable(ev) {
        ev.preventDefault();
        if (ev.target.classList.contains('sortable-item') && QuizUtils.draggedSortable !== ev.target) {
            const list = ev.target.parentElement;
            const items = Array.from(list.children);
            const draggedIdx = items.indexOf(QuizUtils.draggedSortable);
            const targetIdx = items.indexOf(ev.target);
            if (draggedIdx < targetIdx) {
                ev.target.after(QuizUtils.draggedSortable);
            } else {
                ev.target.before(QuizUtils.draggedSortable);
            }
        }
        QuizUtils.draggedSortable.style.opacity = '1';
        QuizUtils.draggedSortable = null;
    },

    // ========================
    // PDF Generation
    // ========================

    /**
     * Generate feedback PDF
     */
    generatePDF(config) {
        const { testName, teacherName, timeTakenStr, questionMeta, mistakeCounts } = config;
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
        doc.text("Feedback Codes:", 20, ty);
        ty += 6;
        doc.setFont(undefined, 'normal');
        doc.text("C: Content gap", 20, ty); ty += 5;
        doc.text("E: Exam technique", 20, ty); ty += 5;
        doc.text("L: Language/clarity", 20, ty); ty += 5;
        doc.text("T: Time/effort", 20, ty); ty += 5;
        doc.text("M: Misread/misapplied", 20, ty);

        ty += 15;
        doc.setDrawColor(40, 167, 69);
        doc.setLineWidth(1);
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
};

// Make functions available globally for inline handlers
window.allowDrop = QuizUtils.allowDrop;
window.drag = QuizUtils.drag;
window.drop = QuizUtils.drop;
