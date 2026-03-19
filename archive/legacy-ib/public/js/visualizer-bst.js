/**
 * Extracted from BST_Visualisation.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        /**
         * DATA STRUCTURES
         */
        class Node {
            constructor(value) {
                this.value = value;
                this.left = null;
                this.right = null;
                this.x = 0;
                this.y = 0;
                this.offset = 0; // Stored during calculation for connecting phantom children
            }
        }

        // Global State
        let root = null;
        let animationQueue = [];
        let currentStepIndex = -1;
        let isRunning = false;
        let runTimeout = null;

        // Scenario State
        let batchValues = [];

        const CODE_SNIPPETS = {
            insert: [
                "def insert(node, value):",
                "    if node is None:",
                "        return Node(value)",
                "    ",
                "    if value < node.value:",
                "        node.left = insert(node.left, value)",
                "    elif value > node.value:",
                "        node.right = insert(node.right, value)",
                "    ",
                "    return node"
            ],
            delete: [
                "def delete(node, value):",
                "    if node is None: return node",
                "    ",
                "    if value < node.value:",
                "        node.left = delete(node.left, value)",
                "    elif value > node.value:",
                "        node.right = delete(node.right, value)",
                "    else:",
                "        # Node found",
                "        if node.left is None: return node.right",
                "        if node.right is None: return node.left",
                "        ",
                "        # Two children: Successor strategy",
                "        temp = min_value_node(node.right)",
                "        node.value = temp.value",
                "        node.right = delete(node.right, temp.value)",
                "    return node"
            ],
            inorder: [
                "def inorder(node):",
                "    if node:",
                "        inorder(node.left)",
                "        print(node.value)",
                "        inorder(node.right)"
            ],
            preorder: [
                "def preorder(node):",
                "    if node:",
                "        print(node.value)",
                "        preorder(node.left)",
                "        preorder(node.right)"
            ],
            postorder: [
                "def postorder(node):",
                "    if node:",
                "        postorder(node.left)",
                "        postorder(node.right)",
                "        print(node.value)"
            ]
        };

        /**
         * LOGIC RECORDING
         */
        function serializeTree(node) {
            return JSON.stringify(node, (key, value) => {
                if (key === 'x' || key === 'y' || key === 'offset') return undefined;
                return value;
            });
        }

        function addStep(lineIdx, activeNodeId, message, highlights = [], secondaryNodeId = null, tempNode = null, batchIndex = -1) {
            animationQueue.push({
                line: lineIdx,
                activeId: activeNodeId,
                secondaryId: secondaryNodeId,
                msg: message,
                highlights: highlights,
                treeSnapshot: serializeTree(root),
                tempNode: tempNode,
                batchIndex: batchIndex
            });
        }

        // --- Insert ---
        function recordInsert(node, value, batchIndex = -1, parentId = null, side = null) {
            // Check None step (visualise phantom node if parent exists)
            let phantom = null;
            if (node === null && parentId !== null) {
                phantom = { value: "None", parentId: parentId, side: side, isPlaceholder: true };
            }

            // Line 1: Check if node is None
            addStep(1, node ? node.value : "None", `Checking if ${node ? 'node ' + node.value : 'node'} is None`, [], null, phantom, batchIndex);

            if (node === null) {
                const newNode = new Node(value);
                addStep(2, value, `Found None. Creating Node(${value}).`, [], value, newNode, batchIndex);
                return newNode;
            }

            addStep(4, node.value, `Comparing: Is ${value} < ${node.value}?`, [], null, null, batchIndex);
            if (value < node.value) {
                addStep(5, node.value, `${value} < ${node.value}. Recursing Left.`, [], null, null, batchIndex);
                node.left = recordInsert(node.left, value, batchIndex, node.value, 'left');
            } else if (value > node.value) {
                addStep(7, node.value, `Comparing: Is ${value} > ${node.value}?`, [], null, null, batchIndex);
                addStep(8, node.value, `${value} > ${node.value}. Recursing Right.`, [], null, null, batchIndex);
                node.right = recordInsert(node.right, value, batchIndex, node.value, 'right');
            } else {
                addStep(4, node.value, `Value ${value} already exists. Duplicate ignored.`, [], null, null, batchIndex);
            }

            addStep(9, node.value, `Returned to node ${node.value}. Update complete.`, [], null, null, batchIndex);
            return node;
        }

        // --- Delete ---
        function recordDelete(node, value, parentId = null, side = null) {
            // Check None step
            let phantom = null;
            if (node === null && parentId !== null) {
                phantom = { value: "None", parentId: parentId, side: side, isPlaceholder: true };
            }

            addStep(1, node ? node.value : "None", `Checking if node is None`, [], null, phantom);
            if (node === null) return node;

            addStep(3, node.value, `Comparing ${value} vs ${node.value}`);

            if (value < node.value) {
                addStep(4, node.value, `Go Left`);
                node.left = recordDelete(node.left, value, node.value, 'left');
            } else if (value > node.value) {
                addStep(6, node.value, `Go Right`);
                node.right = recordDelete(node.right, value, node.value, 'right');
            } else {
                addStep(8, node.value, `Found node ${value} to delete!`, [], node.value);

                if (node.left === null) {
                    addStep(9, node.value, `Left is None. Replacing with Right child.`);
                    return node.right;
                } else if (node.right === null) {
                    addStep(10, node.value, `Right is None. Replacing with Left child.`);
                    return node.left;
                }

                addStep(13, node.value, `Two children. Finding Successor.`);
                let temp = minValueNode(node.right);
                addStep(14, node.value, `Successor found: ${temp.value}. Copying value.`, [], temp.value);
                node.value = temp.value;

                addStep(15, node.value, `Deleting successor ${temp.value} from right subtree.`);
                node.right = recordDelete(node.right, temp.value, node.value, 'right');
            }

            // Capture the final state after structure update
            addStep(17, node.value, `Update complete. Returning ${node.value}.`, [], null, null);
            return node;
        }

        function minValueNode(node) {
            let current = node;
            while (current.left !== null) {
                current = current.left;
            }
            return current;
        }

        // --- Traversals ---
        function recordInorder(node) {
            addStep(1, node ? node.value : null, "Checking node");
            if (node) {
                addStep(2, node.value, "Recurse Left");
                recordInorder(node.left);
                addStep(3, node.value, `PRINT ${node.value}`, [], node.value);
                recordInorder(node.right);
            }
        }

        function recordPreorder(node) {
            addStep(1, node ? node.value : null, "Checking node");
            if (node) {
                addStep(2, node.value, `PRINT ${node.value}`, [], node.value);
                recordPreorder(node.left);
                recordPreorder(node.right);
            }
        }

        function recordPostorder(node) {
            addStep(1, node ? node.value : null, "Checking node");
            if (node) {
                recordPostorder(node.left);
                recordPostorder(node.right);
                addStep(4, node.value, `PRINT ${node.value}`, [], node.value);
            }
        }

        /**
         * VISUALIZATION
         */
        const canvas = document.getElementById('treeCanvas');
        const ctx = canvas.getContext('2d');
        const vizArea = document.getElementById('viz-area');

        function resizeCanvas() {
            canvas.width = vizArea.offsetWidth;
            canvas.height = vizArea.offsetHeight;
            drawTree();
        }
        window.addEventListener('resize', resizeCanvas);

        function calculatePositions(node, depth, x, availableWidth) {
            if (!node) return;
            node.x = x;
            node.y = 40 + (depth * 60);
            node.offset = availableWidth / 2; // Store for ghost children positioning

            calculatePositions(node.left, depth + 1, x - node.offset, node.offset);
            calculatePositions(node.right, depth + 1, x + node.offset, node.offset);
        }

        // Helper to find a node object in the current tree snapshot to get its coords
        function findNode(root, val) {
            if (!root) return null;
            if (root.value === val) return root;
            let left = findNode(root.left, val);
            if (left) return left;
            return findNode(root.right, val);
        }

        function drawTree() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let drawRoot = root;
            let tempNode = null;

            if (currentStepIndex >= 0 && currentStepIndex < animationQueue.length) {
                const step = animationQueue[currentStepIndex];
                if (step.treeSnapshot) drawRoot = JSON.parse(step.treeSnapshot);
                tempNode = step.tempNode;
            }

            if (!drawRoot && !tempNode) {
                ctx.fillStyle = "#888";
                ctx.font = "16px Arial";
                ctx.fillText("Tree is empty", canvas.width / 2 - 45, 50);
                return;
            }

            if (drawRoot) {
                calculatePositions(drawRoot, 0, canvas.width / 2, canvas.width / 4);
                drawConnections(drawRoot);
                drawNodes(drawRoot);
            }

            // Draw Temp Node (New Node OR Phantom None)
            if (tempNode) {
                let parentX, parentY;

                // If it is a placeholder "None", we try to attach it to parent
                if (tempNode.isPlaceholder && tempNode.parentId !== undefined && drawRoot) {
                    const parent = findNode(drawRoot, tempNode.parentId);
                    if (parent) {
                        // Determine coords based on side
                        if (tempNode.side === 'left') {
                            tempNode.x = parent.x - parent.offset;
                        } else {
                            tempNode.x = parent.x + parent.offset;
                        }
                        tempNode.y = parent.y + 60; // Standard vertical spacing

                        // Draw connection to parent
                        ctx.beginPath();
                        ctx.moveTo(parent.x, parent.y);
                        ctx.lineTo(tempNode.x, tempNode.y);
                        ctx.strokeStyle = "#444";
                        ctx.setLineDash([5, 5]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                }
                else if (!tempNode.isPlaceholder) {
                    // New Node creation (floating)
                    if (!drawRoot) {
                        tempNode.x = canvas.width / 2;
                        tempNode.y = 50;
                    } else {
                        tempNode.x = canvas.width / 2;
                        tempNode.y = canvas.height - 80;
                        ctx.fillStyle = "#aaa";
                        ctx.font = "12px Arial";
                        ctx.fillText("Creating Node...", tempNode.x, tempNode.y + 35);
                    }
                }

                // Draw the node itself
                if (tempNode.isPlaceholder) {
                    // Draw Ghost Node Style
                    drawSingleNode(tempNode, "#1e1e1e", "#666", true);
                } else {
                    // Draw New Node Style
                    ctx.save();
                    ctx.setLineDash([5, 5]);
                    drawSingleNode(tempNode, "#22c55e", "#fff", true);
                    ctx.restore();
                }
            }
        }

        function drawConnections(node) {
            if (!node) return;

            ctx.strokeStyle = "#666";
            ctx.lineWidth = 2;

            if (node.left) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(node.left.x, node.left.y);
                ctx.stroke();
                drawConnections(node.left);
            }
            if (node.right) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(node.right.x, node.right.y);
                ctx.stroke();
                drawConnections(node.right);
            }
        }

        function drawNodes(node) {
            if (!node) return;
            drawSingleNode(node);
            drawNodes(node.left);
            drawNodes(node.right);
        }

        function drawSingleNode(node, overrideFill, overrideStroke, isTemp = false) {
            let step = animationQueue[currentStepIndex];

            let fillColor = overrideFill || "#333";
            let strokeColor = overrideStroke || "#aaa";
            let textColor = "#fff";
            let radius = 20;

            // Logic for Highlights
            if (step) {
                // Highlight logic for REAL nodes
                if (!isTemp || !node.isPlaceholder) {
                    if (node.value === step.activeId) {
                        strokeColor = "#eab308";
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = "#eab308";
                    }
                    if (node.value === step.secondaryId) {
                        fillColor = "#166534";
                        if (document.getElementById('op-select').value === 'delete' && step.msg.includes('Found')) {
                            fillColor = "#991b1b";
                        }
                    }
                }

                // Highlight logic for PHANTOM (None) nodes
                if (node.isPlaceholder && step.activeId === "None") {
                    strokeColor = "#eab308";
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = "#eab308";
                    textColor = "#888"; // Dimmer text for None
                }
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = strokeColor;
            ctx.stroke();

            ctx.shadowBlur = 0;

            ctx.fillStyle = textColor;
            ctx.font = "bold 13px Arial"; // Slightly smaller for fit
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.value, node.x, node.y);
        }

        /**
         * CONTROLLER
         */
        function updateCodeView() {
            const op = document.getElementById('op-select').value;
            const lines = CODE_SNIPPETS[op];
            const container = document.getElementById('code-panel');
            container.innerHTML = "";

            lines.forEach((text, index) => {
                const div = document.createElement('div');
                div.className = 'code-line';
                div.id = `line-${index}`;

                let html = text
                    .replace(/def |return |if |else:|elif |is /g, m => `<span class="keyword">${m}</span>`)
                    .replace(/print/g, '<span class="def">print</span>')
                    .replace(/#.*/g, m => `<span class="comment">${m}</span>`);

                div.innerHTML = `<span style="display:inline-block; width:20px; color:#555; user-select:none;">${index + 1}</span> ${html}`;
                container.appendChild(div);
            });

            const inputGroup = document.getElementById('input-group');
            if (['inorder', 'preorder', 'postorder'].includes(op)) {
                inputGroup.style.display = 'none';
            } else {
                inputGroup.style.display = 'flex';
            }
        }

        function updateUI() {
            const step = animationQueue[currentStepIndex];
            const descEl = document.getElementById('step-desc');
            const codeEl = document.getElementById('step-code');
            const op = document.getElementById('op-select').value;

            if (step) {
                descEl.innerText = step.msg;

                let lineText = "";
                if (CODE_SNIPPETS[op] && CODE_SNIPPETS[op][step.line]) {
                    lineText = CODE_SNIPPETS[op][step.line].trim();
                }
                codeEl.innerText = lineText || "--";

                // Update Batch Highlight
                if (step.batchIndex > -1) {
                    updateBatchUI(step.batchIndex);
                }
            } else {
                descEl.innerText = currentStepIndex >= 0 ? "Sequence Complete." : "Ready.";
                codeEl.innerText = "--";
                if (currentStepIndex >= 0 && batchValues.length > 0) updateBatchUI(batchValues.length); // Mark all done
            }

            // Highlight Code
            document.querySelectorAll('.code-line').forEach(el => el.classList.remove('active'));
            if (step && step.line !== undefined) {
                const activeLine = document.getElementById(`line-${step.line}`);
                if (activeLine) {
                    activeLine.classList.add('active');
                    activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }

            document.getElementById('step-count').innerText =
                `${currentStepIndex + 1} / ${animationQueue.length}`;

            // Controls State
            document.getElementById('btn-run').innerHTML = isRunning ? "&#10074;&#10074; Pause" : "&#9658; Run Simulation";

            drawTree();
        }

        function updateBatchUI(currentIndex) {
            const container = document.getElementById('batch-sequence');
            if (batchValues.length === 0) {
                document.getElementById('batch-row').style.display = 'none';
                return;
            }

            document.getElementById('batch-row').style.display = 'flex';
            container.innerHTML = "";

            batchValues.forEach((val, idx) => {
                const span = document.createElement('span');
                span.className = 'batch-item';
                span.innerText = val;

                if (idx === currentIndex) span.classList.add('current');
                else if (idx < currentIndex) span.classList.add('done');

                container.appendChild(span);
            });
        }

        function loadAction() {
            stopRun();
            animationQueue = [];
            currentStepIndex = -1;
            batchValues = []; // Clear batch if manual action
            updateBatchUI(-1);

            const op = document.getElementById('op-select').value;
            const val = parseInt(document.getElementById('node-value').value);

            if (isNaN(val) && !['inorder', 'preorder', 'postorder'].includes(op)) return;

            if (op === 'insert') root = recordInsert(root, val);
            else if (op === 'delete') root = recordDelete(root, val);
            else if (op === 'inorder') recordInorder(root);
            else if (op === 'preorder') recordPreorder(root);
            else if (op === 'postorder') recordPostorder(root);

            currentStepIndex = -1;
            updateUI();
            // Default to stepped mode: Go to first step, but don't run
            step(1);
        }

        function playScenario(type) {
            stopRun();
            document.getElementById('op-select').value = 'insert';
            updateCodeView();
            resetTree(false);

            if (type === 'balanced') {
                batchValues = [50, 30, 70, 20, 40, 60, 80];
            } else if (type === 'unbalanced') {
                batchValues = [10, 20, 30, 40, 50];
            }

            updateBatchUI(-1); // Show list

            // Chain operations
            batchValues.forEach((val, idx) => {
                root = recordInsert(root, val, idx); // Pass index for highlighting
            });

            currentStepIndex = -1;
            updateUI();

            // Auto start first step (paused)
            step(1);
        }

        function step(direction) {
            if (animationQueue.length === 0) return;
            currentStepIndex += direction;
            if (currentStepIndex < -1) currentStepIndex = -1;
            if (currentStepIndex >= animationQueue.length) {
                currentStepIndex = animationQueue.length - 1;
                stopRun();
            }
            updateUI();
        }

        // Dynamic speed handling using recursive timeout
        function runLoop() {
            if (!isRunning) return;

            step(1);

            if (currentStepIndex < animationQueue.length - 1) {
                // UPDATED SPEED LOGIC
                // Slider 1 (left) to 100 (right).
                // Delay 2000 (slow) to 50 (fast).
                // 1 -> 2000
                // 100 -> 50
                const sliderVal = parseInt(document.getElementById('speed-slider').value);
                // Formula: MaxDelay - (SliderRatio * Range)
                // 2000 - ((val-1) * (1950/99)) roughly
                const speedFactor = (sliderVal - 1) / 99;
                const delay = 2000 - (speedFactor * 1950);

                runTimeout = setTimeout(runLoop, delay);
            } else {
                stopRun();
            }
        }

        function toggleRun() {
            if (isRunning) {
                stopRun();
            } else {
                if (currentStepIndex === animationQueue.length - 1) currentStepIndex = -1;
                isRunning = true;
                updateUI(); // Update button text
                runLoop(); // Start loop
            }
        }

        function stopRun() {
            isRunning = false;
            if (runTimeout) clearTimeout(runTimeout);
            updateUI();
        }

        function resetTree(refresh = true) {
            root = null;
            animationQueue = [];
            currentStepIndex = -1;
            batchValues = [];
            stopRun();
            if (refresh) updateUI();
        }

        /**
         * THEORY MODAL LOGIC
         */
        function toggleTheory() {
            const modal = document.getElementById('theory-modal');
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            } else {
                modal.style.display = 'block';
            }
        }

        function switchTab(tabId) {
            // Hide all sections
            document.querySelectorAll('.theory-section').forEach(el => el.classList.remove('active'));
            // Deactivate all buttons
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

            // Activate target
            document.getElementById('tab-' + tabId).classList.add('active');
            // Find button (simple traversal matches text content or onclick index, keeping it simple)
            // Actually, buttons invoke switchTab('basics'). Let's just re-render classes based on arg.
            const btns = document.querySelectorAll('.tab-btn');
            if (tabId === 'basics') btns[0].classList.add('active');
            if (tabId === 'balance') btns[1].classList.add('active');
            if (tabId === 'ops') btns[2].classList.add('active');
        }

        // Init
        resizeCanvas();
        updateCodeView();

    