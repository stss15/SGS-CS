/**
 * Extracted from logic-gate-simulator.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

    // --- CONFIGURATION ---
    const sensorIcons = {
        'switch': '🔘',
        'temperature': '🌡️',
        'moisture': '💧',
        'humidity': '🌫️',
        'light': '☀️',
        'ir_active': '🚨',
        'ir_passive': '📹',
        'pressure': '⏲️',
        'sound': '🎤',
        'gas': '💨',
        'ph': '🧪',
        'magnetic': '🧲',
        'accelerometer': '🏎️',
        'proximity': '🛑',
        'flow': '🚰',
        'level': '📶'
    };

    // --- STATE ---
    const state = {
        gates: [], // { id, type, x, y }
        connections: [], // { fromId, toId }  (Ids refer to port IDs)
        inputs: [null, null, null], // { type, value: bool }
        dragging: null,
        wiring: null, // { startPortId, startX, startY }
        nextId: 0
    };

    // --- DOM REFERENCES ---
    const playground = document.getElementById('playground');
    const wireLayer = document.getElementById('wire-layer');
    const inputSlots = document.querySelectorAll('.input-slot');
    const mainOutput = document.getElementById('main-output');
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');

    // --- SIDEBAR TOGGLE ---
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        document.body.classList.toggle('sidebar-closed');
        // Update toggle button icon/position
        if(sidebar.classList.contains('collapsed')) {
            toggleBtn.innerHTML = '☰';
        } else {
            toggleBtn.innerHTML = '✕';
        }
    }

    // --- DRAG AND DROP (Sidebar to Playground) ---
    const draggables = document.querySelectorAll('.draggable-item');
    
    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('type', item.dataset.type);
            e.dataTransfer.setData('subtype', item.dataset.subtype);
        });
    });

    playground.addEventListener('dragover', (e) => e.preventDefault());

    playground.addEventListener('drop', (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('type');
        const subtype = e.dataTransfer.getData('subtype');
        const rect = playground.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (type === 'gate') {
            createGate(subtype, x, y);
        } else if (type === 'sensor') {
            // Check if dropped near an input slot
            inputSlots.forEach((slot, index) => {
                const slotRect = slot.getBoundingClientRect();
                // Simple collision check with mouse coords
                if (e.clientX >= slotRect.left && e.clientX <= slotRect.right &&
                    e.clientY >= slotRect.top && e.clientY <= slotRect.bottom) {
                    assignSensor(index, subtype);
                }
            });
        }
    });

    // --- GATE CREATION ---
    function createGate(type, x, y) {
        const id = `gate-${state.nextId++}`;
        const el = document.createElement('div');
        el.className = 'gate-node';
        el.id = id;
        el.style.left = (x - 40) + 'px';
        el.style.top = (y - 25) + 'px';
        
        // SVG Icon based on type
        let svgContent = '';
        if(type === 'AND') svgContent = '<svg viewBox="0 0 40 40" width="40" height="40"><path d="M5,5 L20,5 C30,5 35,15 35,20 C35,25 30,35 20,35 L5,35 Z" fill="white" stroke="black" stroke-width="2"/></svg>';
        if(type === 'OR') svgContent = '<svg viewBox="0 0 40 40" width="40" height="40"><path d="M5,5 Q20,20 5,35 Q15,35 25,20 Q15,5 5,5" fill="white" stroke="black" stroke-width="2"/></svg>';
        if(type === 'NOT') svgContent = '<svg viewBox="0 0 40 40" width="40" height="40"><path d="M5,5 L30,20 L5,35 Z" fill="white" stroke="black" stroke-width="2"/><circle cx="34" cy="20" r="3" stroke="black" fill="white"/></svg>';
        if(type === 'XOR') svgContent = '<svg viewBox="0 0 40 40" width="40" height="40"><path d="M8,5 Q23,20 8,35 Q18,35 28,20 Q18,5 8,5" fill="white" stroke="black" stroke-width="2"/><path d="M2,5 Q17,20 2,35" fill="none" stroke="black" stroke-width="2"/></svg>';

        el.innerHTML = `
            ${svgContent}
            <div class="port output" id="${id}-out" data-id="${id}-out"></div>
        `;

        // Add Inputs
        if (type === 'NOT') {
            el.innerHTML += `<div class="port input input-single" id="${id}-in1" data-id="${id}-in1"></div>`;
        } else {
            el.innerHTML += `<div class="port input input-1" id="${id}-in1" data-id="${id}-in1"></div>`;
            el.innerHTML += `<div class="port input input-2" id="${id}-in2" data-id="${id}-in2"></div>`;
        }

        // Gate Dragging Logic
        el.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('port')) return; // Don't drag gate if clicking port
            e.stopPropagation(); // Stop wire creation
            state.dragging = { el, offsetX: e.offsetX, offsetY: e.offsetY };
        });

        // Context Menu (Delete)
        el.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            deleteGate(id);
        });

        playground.appendChild(el);
        state.gates.push({ id, type, el });
    }

    // --- SENSOR ASSIGNMENT & CLEARING ---
    function assignSensor(index, subtype) {
        const slot = inputSlots[index];
        const icon = sensorIcons[subtype] || '❓';

        slot.querySelector('.placeholder').style.display = 'none';
        
        // Remove existing icon if any
        const existingIcon = slot.querySelector('.sensor-icon');
        if (existingIcon) existingIcon.remove();

        const div = document.createElement('div');
        div.className = 'sensor-icon';
        div.style.fontSize = '2rem';
        div.innerText = icon;
        div.title = subtype; // Tooltip for clarity
        slot.insertBefore(div, slot.firstChild);

        slot.classList.add('occupied');
        state.inputs[index] = { type: subtype, value: false };
        updateSimulation();
    }

    function clearSensor(index) {
        const slot = inputSlots[index];
        const existingIcon = slot.querySelector('.sensor-icon');
        if (existingIcon) existingIcon.remove();
        
        slot.querySelector('.placeholder').style.display = 'block';
        slot.classList.remove('occupied');
        
        state.inputs[index] = null;
        updateSimulation();
    }

    // Toggle Sensors & Context Menu for Clearing
    inputSlots.forEach((slot, index) => {
        // Toggle
        slot.addEventListener('click', () => {
            if (state.inputs[index]) {
                state.inputs[index].value = !state.inputs[index].value;
                updateSimulation();
            }
        });

        // Clear (Right Click)
        slot.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (state.inputs[index]) {
                clearSensor(index);
            }
        });
    });

    // --- WIRING SYSTEM ---
    
    // Mouse Down on Port
    playground.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('port')) {
            const rect = e.target.getBoundingClientRect();
            const playgroundRect = playground.getBoundingClientRect();
            const x = rect.left + rect.width/2 - playgroundRect.left;
            const y = rect.top + rect.height/2 - playgroundRect.top;
            
            state.wiring = {
                startId: e.target.dataset.id,
                startX: x,
                startY: y,
                isOutput: e.target.classList.contains('output')
            };

            // Create temporary line
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("stroke", "black");
            path.setAttribute("stroke-width", "3");
            path.setAttribute("fill", "none");
            path.setAttribute("id", "temp-wire");
            path.style.pointerEvents = "none"; // CRITICAL FIX: Allows mouse events to pass through to ports underneath
            path.setAttribute("d", `M${x},${y} L${x},${y}`);
            wireLayer.appendChild(path);
            
            // Highlight valid targets visually
            document.querySelectorAll('.port').forEach(p => {
                const isTargetOutput = p.classList.contains('output');
                if (state.wiring.isOutput !== isTargetOutput) {
                    p.classList.add('wiring-target');
                }
            });
        }
    });

    // Mouse Move (Dragging Gates or Wires)
    window.addEventListener('mousemove', (e) => {
        const rect = playground.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Gate Dragging
        if (state.dragging) {
            let newX = x - state.dragging.offsetX;
            let newY = y - state.dragging.offsetY;
            // Bounds check
            if(newX < 0) newX = 0;
            if(newY < 0) newY = 0;
            
            state.dragging.el.style.left = newX + 'px';
            state.dragging.el.style.top = newY + 'px';
            drawWires(); // Redraw wires attached to this gate
        }

        // Wire Drawing
        if (state.wiring) {
            const tempWire = document.getElementById('temp-wire');
            if (tempWire) {
                // Bezier curve for smooth wire
                const sx = state.wiring.startX;
                const sy = state.wiring.startY;
                const cp1x = sx + (x - sx) / 2;
                const cp2x = x - (x - sx) / 2;
                tempWire.setAttribute("d", `M${sx},${sy} C${cp1x},${sy} ${cp2x},${y} ${x},${y}`);
            }
        }
    });

    // Mouse Up (Complete Wire or Drop Gate)
    window.addEventListener('mouseup', (e) => {
        state.dragging = null;

        if (state.wiring) {
            const tempWire = document.getElementById('temp-wire');
            if (tempWire) tempWire.remove();

            // Clear highlights
            document.querySelectorAll('.port').forEach(p => p.classList.remove('wiring-target'));

            if (e.target.classList.contains('port')) {
                const endId = e.target.dataset.id;
                const isOutput = e.target.classList.contains('output');
                
                // Validation: Cannot connect Output to Output or Input to Input
                if (state.wiring.isOutput !== isOutput) {
                    
                    const source = state.wiring.isOutput ? state.wiring.startId : endId;
                    const target = state.wiring.isOutput ? endId : state.wiring.startId;

                    // Remove existing connection to this specific Input (Inputs can only have 1 wire)
                    // NOTE: We do NOT filter 'from' here, allowing multiple wires from source (Fan-out)
                    state.connections = state.connections.filter(c => c.to !== target);

                    state.connections.push({ from: source, to: target });
                    drawWires();
                    updateSimulation();
                }
            }
            state.wiring = null;
        }
    });

    // --- DRAWING & SIMULATION ---

    function getPortPosition(portId) {
        // Handle input slots
        if (portId.startsWith('in-')) {
            const index = parseInt(portId.split('-')[1]);
            const slot = inputSlots[index];
            const port = slot.querySelector('.port');
            const r = port.getBoundingClientRect();
            const pr = playground.getBoundingClientRect();
            return { x: r.left + r.width/2 - pr.left, y: r.top + r.height/2 - pr.top };
        }
        // Handle Main Output
        if (portId === 'out-main') {
            const port = mainOutput.querySelector('.port');
            const r = port.getBoundingClientRect();
            const pr = playground.getBoundingClientRect();
            return { x: r.left + r.width/2 - pr.left, y: r.top + r.height/2 - pr.top };
        }
        // Handle Gates
        const el = document.getElementById(portId);
        if (!el) return {x:0, y:0}; // Gate might be deleted
        const r = el.getBoundingClientRect();
        const pr = playground.getBoundingClientRect();
        return { x: r.left + r.width/2 - pr.left, y: r.top + r.height/2 - pr.top };
    }

    function drawWires() {
        wireLayer.innerHTML = ''; // Clear lines
        
        state.connections.forEach(conn => {
            const start = getPortPosition(conn.from);
            const end = getPortPosition(conn.to);
            
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            
            // Bezier logic
            const cp1x = start.x + Math.abs(end.x - start.x) * 0.5;
            const cp2x = end.x - Math.abs(end.x - start.x) * 0.5;
            
            path.setAttribute("d", `M${start.x},${start.y} C${cp1x},${start.y} ${cp2x},${end.y} ${end.x},${end.y}`);
            path.setAttribute("stroke-width", "4");
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "var(--wire-grey)"); // Default grey
            path.id = `wire-${conn.from}-${conn.to}`;
            
            // Delete wire on right click
            path.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                state.connections = state.connections.filter(c => c !== conn);
                drawWires();
                updateSimulation();
            });

            wireLayer.appendChild(path);
        });
        updateWireColors();
    }

    function deleteGate(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
        
        state.gates = state.gates.filter(g => g.id !== id);
        // Remove connections attached to this gate
        state.connections = state.connections.filter(c => !c.from.includes(id) && !c.to.includes(id));
        drawWires();
        updateSimulation();
    }

    function updateSimulation() {
        // Map of portID -> value (null, true, false)
        const values = {};

        // 1. Set Input Sensor Values
        state.inputs.forEach((inp, idx) => {
            const dot = inputSlots[idx].querySelector('.status-dot');
            if (inp) {
                values[`in-${idx}`] = inp.value;
                dot.classList.toggle('on', inp.value);
            } else {
                values[`in-${idx}`] = null;
                dot.classList.remove('on');
            }
        });

        // 2. Propagate values
        // We need a loop to handle depth. A simple repeated pass works for acyclic graphs.
        // For 3 levels of gates, 10 passes is overkill but safe.
        for (let i = 0; i < 10; i++) {
            let changed = false;
            
            // Propagate through wires
            state.connections.forEach(conn => {
                if (values[conn.from] !== undefined) {
                    values[conn.to] = values[conn.from];
                }
            });

            // Calculate Gates
            state.gates.forEach(gate => {
                const in1 = values[`${gate.id}-in1`];
                const in2 = values[`${gate.id}-in2`]; // Undefined for NOT gate
                let outVal = null;

                if (gate.type === 'AND') {
                    if (in1 !== null && in2 !== null && in1 !== undefined && in2 !== undefined) {
                        outVal = in1 && in2;
                    }
                } else if (gate.type === 'OR') {
                    if (in1 !== null && in2 !== null && in1 !== undefined && in2 !== undefined) {
                        outVal = in1 || in2;
                    }
                } else if (gate.type === 'NOT') {
                    if (in1 !== null && in1 !== undefined) {
                        outVal = !in1;
                    }
                } else if (gate.type === 'XOR') {
                    if (in1 !== null && in2 !== null && in1 !== undefined && in2 !== undefined) {
                        outVal = (in1 && !in2) || (!in1 && in2);
                    }
                }

                if (values[`${gate.id}-out`] !== outVal) {
                    values[`${gate.id}-out`] = outVal;
                    changed = true;
                }
            });

            if (!changed) break;
        }

        // 3. Update UI (Wire Colors)
        state.values = values; // Store for wire drawing
        updateWireColors();

        // 4. Update Main Output
        const mainOutVal = values['out-main'];
        if (mainOutVal === true) {
            mainOutput.classList.add('on');
        } else {
            mainOutput.classList.remove('on');
        }
    }

    function updateWireColors() {
        if (!state.values) return;
        
        state.connections.forEach(conn => {
            const val = state.values[conn.from];
            const wire = document.getElementById(`wire-${conn.from}-${conn.to}`);
            if (wire) {
                if (val === true) {
                    wire.setAttribute('stroke', 'var(--wire-blue)');
                } else if (val === false) {
                    wire.setAttribute('stroke', 'var(--wire-red)');
                } else {
                    wire.setAttribute('stroke', 'var(--wire-grey)');
                }
            }
        });
    }

