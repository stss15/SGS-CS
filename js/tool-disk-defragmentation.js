/**
 * Extracted from disk_defragmentation.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- Simulation State Management ---

        let diskState = Array(3).fill().map(() => Array(12).fill(0));
        let bufferState = [];
        let defragCursor = 0; // Tracks where the next contiguous file should start (linear index 0-35)

        // Helper to convert linear index to [track, sector]
        function getPos(linearIdx) {
            return { t: Math.floor(linearIdx / 12), s: linearIdx % 12 };
        }

        // Helper to move conflicting blocks to end of disk
        function moveConflict(targetT, targetS) {
            const conflictId = diskState[targetT][targetS];
            if (conflictId === 0) return; // No conflict

            // Find free space at END of disk working backwards or forwards
            // Simple approach: Find first empty spot starting from end of Track 3
            let freeT = -1, freeS = -1;

            // Search for free space
            for (let t = 2; t >= 0; t--) {
                for (let s = 11; s >= 0; s--) {
                    if (diskState[t][s] === 0) {
                        freeT = t; freeS = s;
                        break; // found one
                    }
                }
                if (freeT !== -1) break;
            }

            if (freeT !== -1) {
                diskState[freeT][freeS] = conflictId; // Move conflict there
                diskState[targetT][targetS] = 0;      // Clear original spot
            }
        }

        function defragOneFile(fileId, fileLength) {
            // 1. Identify and clear current blocks of fileId
            let count = 0;
            for (let t = 0; t < 3; t++) {
                for (let s = 0; s < 12; s++) {
                    if (diskState[t][s] === fileId) {
                        diskState[t][s] = 0; // Pick it up
                        count++;
                    }
                }
            }

            // 2. Put in Buffer (Visual only)
            bufferState = Array(count).fill(fileId);
            render(); // Trigger visual update of buffer before writing back (simulated delay via logic split?)
            // For simplicity in this discrete step engine, we update buffer state but the write happens immediately in logic
            // To make it feel like "Move out, then Move In", we rely on the timeline description, or we could split steps.

            // 3. Write back contiguously starting at defragCursor
            for (let i = 0; i < fileLength; i++) {
                const pos = getPos(defragCursor + i);

                // CHECK COLLISION: Is there something else here?
                if (diskState[pos.t][pos.s] !== 0 && diskState[pos.t][pos.s] !== fileId) {
                    // Move the obstacle to free space
                    moveConflict(pos.t, pos.s);
                }

                diskState[pos.t][pos.s] = fileId;
            }

            // Advance cursor
            defragCursor += fileLength;
        }

        // Simulation Timeline
        const timeline = [
            {
                tag: "Initialisation",
                title: "Empty Disk",
                desc: "The disk is formatted and empty. All sectors are available for data storage.",
                action: () => {
                    resetDisk();
                    defragCursor = 0;
                }
            },
            {
                tag: "Usage",
                title: "Files Saved Contiguously",
                desc: "Files 1, 2, and 3 are saved. They sit perfectly next to each other.",
                action: () => {
                    resetDisk();
                    addFile(1, 4); addFile(2, 5); addFile(3, 4);
                }
            },
            {
                tag: "Usage",
                title: "Delete File 2",
                desc: "File 2 (Orange) is deleted, leaving a gap.",
                action: () => {
                    removeFile(2);
                }
            },
            {
                tag: "Usage",
                title: "Fragmenting File 4",
                desc: "File 4 (Green) is saved. It's too big for the gap, so it splits between the gap and the next available space.",
                action: () => {
                    resetDisk(); addFile(1, 4); addFile(3, 4);
                    addFile(4, 6);
                }
            },
            {
                tag: "Heavy Usage",
                title: "Messy Disk State",
                desc: "After much use (deleting F1, adding F5, F6), the disk is a mess. Notice how File 5 (Blue) blocks the start of the disk, and File 3 is scattered.",
                action: () => {
                    // Hardcoded messy state
                    // F1 deleted. 
                    // Track 1: F5(3 blocks), F6(1), F4(5), F3(3)
                    // Track 2: F3(1), F4(1), F5(5)...
                    diskState = [
                        [5, 5, 5, 6, 4, 4, 4, 4, 4, 3, 3, 3],
                        [3, 4, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ];
                    bufferState = [];
                    defragCursor = 0; // Reset for defrag start
                }
            },
            // DEFRAG STEPS
            {
                tag: "Defrag: File 3",
                title: "Processing File 3 (Yellow)",
                desc: "The OS wants to put File 3 first. But File 5 (Blue) is in the way! The OS moves the Blue blocks to the end of the disk to make space, then writes File 3 at the start.",
                action: () => {
                    // Reset to messy state first to ensure consistency if rewinding
                    diskState = [
                        [5, 5, 5, 6, 4, 4, 4, 4, 4, 3, 3, 3],
                        [3, 4, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ];
                    defragCursor = 0;

                    defragOneFile(3, 4); // Length 4
                }
            },
            {
                tag: "Defrag: File 4",
                title: "Processing File 4 (Green)",
                desc: "File 3 is safe. Now the OS grabs scattered chunks of File 4. It places them immediately after File 3. If anything blocks the way, it gets moved to the end.",
                action: () => {
                    // Re-run previous steps to ensure state
                    diskState = [
                        [5, 5, 5, 6, 4, 4, 4, 4, 4, 3, 3, 3],
                        [3, 4, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ];
                    defragCursor = 0;
                    defragOneFile(3, 4); // Do prev
                    defragOneFile(4, 6); // Do current
                }
            },
            {
                tag: "Defrag: File 5",
                title: "Processing File 5 (Blue)",
                desc: "File 5 was moved around earlier to make space. Now it is gathered up and placed neatly after File 4.",
                action: () => {
                    diskState = [
                        [5, 5, 5, 6, 4, 4, 4, 4, 4, 3, 3, 3],
                        [3, 4, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ];
                    defragCursor = 0;
                    defragOneFile(3, 4);
                    defragOneFile(4, 6);
                    defragOneFile(5, 8); // Length 8
                }
            },
            {
                tag: "Defrag: File 6",
                title: "Processing File 6 (Purple)",
                desc: "Finally, the tiny File 6 is moved into place. The disk is now perfectly ordered, and all free space is at the end.",
                action: () => {
                    diskState = [
                        [5, 5, 5, 6, 4, 4, 4, 4, 4, 3, 3, 3],
                        [3, 4, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ];
                    defragCursor = 0;
                    defragOneFile(3, 4);
                    defragOneFile(4, 6);
                    defragOneFile(5, 8);
                    defragOneFile(6, 1); // Length 1
                    bufferState = []; // Clear buffer at end
                }
            }
        ];

        // --- Helpers ---

        function resetDisk() {
            diskState = Array(3).fill().map(() => Array(12).fill(0));
            bufferState = [];
        }

        function addFile(id, length) {
            let remaining = length;
            for (let t = 0; t < 3; t++) {
                for (let s = 0; s < 12; s++) {
                    if (diskState[t][s] === 0 && remaining > 0) {
                        diskState[t][s] = id;
                        remaining--;
                    }
                }
            }
        }

        function removeFile(id) {
            for (let t = 0; t < 3; t++) {
                for (let s = 0; s < 12; s++) {
                    if (diskState[t][s] === id) diskState[t][s] = 0;
                }
            }
        }

        // --- Rendering ---
        let currentStepIndex = 0;

        function render() {
            for (let t = 0; t < 3; t++) {
                const trackEl = document.getElementById(`track-${t}`);
                trackEl.innerHTML = '';
                diskState[t].forEach((cellVal, idx) => {
                    const div = document.createElement('div');
                    div.className = `sector ${cellVal === 0 ? 'empty' : 'file-' + cellVal}`;
                    div.innerText = cellVal === 0 ? idx : `F${cellVal}`;
                    // Wave animation delay
                    // div.style.animationDelay = `${(t * 12 + idx) * 10}ms`;
                    trackEl.appendChild(div);
                });
            }

            const bufferEl = document.getElementById('buffer');
            bufferEl.innerHTML = '';
            if (bufferState.length === 0) {
                bufferEl.innerHTML = '<span class="text-slate-400 text-sm italic w-full text-center">Buffer Empty</span>';
            } else {
                bufferState.forEach(cellVal => {
                    const div = document.createElement('div');
                    div.className = `sector file-${cellVal} w-10 h-10 shrink-0`;
                    div.innerText = `F${cellVal}`;
                    bufferEl.appendChild(div);
                });
            }

            const step = timeline[currentStepIndex];
            document.getElementById('step-tag').innerText = step.tag;
            document.getElementById('step-title').innerText = step.title;
            document.getElementById('step-desc').innerText = step.desc;
            document.getElementById('step-counter').innerText = `${currentStepIndex + 1} / ${timeline.length}`;

            document.getElementById('btn-prev').disabled = currentStepIndex === 0;
            const nextBtn = document.getElementById('btn-next');
            if (currentStepIndex === timeline.length - 1) {
                nextBtn.innerText = "Simulation Complete";
                nextBtn.disabled = true;
                nextBtn.classList.add('bg-slate-400');
                nextBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
            } else {
                nextBtn.innerText = "Next Action →";
                nextBtn.disabled = false;
                nextBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
                nextBtn.classList.remove('bg-slate-400');
            }
        }

        function changeStep(delta) {
            const newIndex = currentStepIndex + delta;
            if (newIndex >= 0 && newIndex < timeline.length) {
                currentStepIndex = newIndex;
                timeline[currentStepIndex].action();
                render();
            }
        }

        timeline[0].action();
        render();

    