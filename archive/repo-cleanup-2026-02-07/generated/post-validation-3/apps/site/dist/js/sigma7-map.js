/**
 * SIGMA-7 STATION MAP - Fullscreen Modal with Fog of War
 * One map, different reveals per level
 */

(function() {
    'use strict';

    // Level reveal configuration - which rooms are visible at each level
    const LEVEL_REVEALS = {
        'a': ['airlock'],
        'b': ['airlock', 'main_corridor'],
        'c': ['airlock', 'main_corridor', 'storage'],
        'd': ['airlock', 'main_corridor', 'storage', 'lab'],
        'e': ['airlock', 'main_corridor', 'storage', 'lab', 'engineering', 'crew_quarters', 'control_hub', 'archive', 'medical', 'command'],
        'f': ['airlock', 'main_corridor', 'storage', 'lab', 'engineering', 'crew_quarters', 'control_hub', 'archive', 'medical', 'command'],
        'g': ['airlock', 'main_corridor', 'storage', 'lab', 'engineering', 'crew_quarters', 'control_hub', 'archive', 'medical', 'command'],
        'h': ['airlock', 'main_corridor', 'storage', 'lab', 'engineering', 'crew_quarters', 'control_hub', 'archive', 'medical', 'command'],
        'i': ['airlock', 'main_corridor', 'storage', 'lab', 'engineering', 'crew_quarters', 'control_hub', 'archive', 'medical', 'command']
    };

    // Room data for zoom panels (full names for detail view)
    const ROOM_DATA = {
        airlock: { name: 'Emergency Airlock', desc: 'Starting point. Escape pod offline.', items: [], npcs: [], enemies: ['Sentry Droid (on exit)'] },
        main_corridor: { name: 'Main Corridor', desc: 'Central hub connecting all areas.', items: ['Crowbar'], npcs: ['M-Unit 7'], enemies: [] },
        storage: { name: 'Storage Cage', desc: 'Supply storage with locked chest.', items: ['Keycard', 'Torch*', 'Shield Plate*'], npcs: [], enemies: [] },
        lab: { name: 'Research Lab', desc: 'Locked door requires keycard.', items: ['Med Patch', 'Access Code', 'Data Chip'], npcs: [], enemies: [] },
        engineering: { name: 'Engineering Bay', desc: 'Power systems and reactor.', items: ['Battery'], npcs: [], enemies: ['Repair Bot'] },
        crew_quarters: { name: 'Crew Quarters', desc: 'Living quarters for station crew.', items: ['Personal Log'], npcs: ['Dr. Aria Chen'], enemies: [] },
        control_hub: { name: 'Control Hub', desc: 'Station control and save terminal.', items: ['Power Cell', 'Med Kit'], npcs: ['SIGMA (AI)'], enemies: [] },
        archive: { name: 'Research Archive', desc: 'Data storage and records.', items: ['Override Key'], npcs: [], enemies: [] },
        medical: { name: 'Medical Bay', desc: 'Medical supplies and treatment.', items: ['Med Kit', 'Stim Pack'], npcs: [], enemies: ['Medical Bot'] },
        command: { name: 'Command Deck', desc: 'Final destination. Boss encounter.', items: ['Signal Beacon'], npcs: [], enemies: ['Security Chief'] }
    };

    // Short labels for map display (fit inside boxes)
    const MAP_LABELS = {
        airlock: 'AIRLOCK',
        main_corridor: 'CORRIDOR',
        storage: 'STORAGE',
        lab: 'LAB',
        engineering: 'ENGINEERING',
        crew_quarters: 'CREW QTR',
        control_hub: 'CONTROL',
        archive: 'ARCHIVE',
        medical: 'MEDICAL',
        command: 'COMMAND'
    };

    // Rooms with only vertical connections (labels can go outside)
    const BRANCH_ROOMS = ['archive', 'engineering', 'medical', 'lab'];

    let modal = null;
    let currentLevel = 'a';
    let currentZoom = null;

    // Detect current level from URL
    function detectLevel() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('level-a')) return 'a';
        if (path.includes('level-b')) return 'b';
        if (path.includes('level-c')) return 'c';
        if (path.includes('level-d')) return 'd';
        if (path.includes('level-e')) return 'e';
        if (path.includes('level-f')) return 'f';
        if (path.includes('level-g')) return 'g';
        if (path.includes('level-h')) return 'h';
        if (path.includes('level-i')) return 'i';
        return 'i'; // Default to full map
    }

    // Create the fullscreen modal
    function createModal() {
        const overlay = document.createElement('div');
        overlay.id = 'sigma7-map-modal';
        overlay.innerHTML = `
            <div class="map-modal-backdrop"></div>
            <div class="map-modal-content">
                <button class="map-modal-close" aria-label="Close map">&times;</button>
                <div class="map-modal-header">
                    <h2>SIGMA-7 RESEARCH STATION</h2>
                    <span class="map-modal-level">Level ${currentLevel.toUpperCase()}</span>
                </div>
                <div class="map-modal-body">
                    <div class="map-svg-container" id="map-svg-container"></div>
                </div>
                <div class="map-modal-legend">
                    <span><i class="legend-dot you"></i> Start</span>
                    <span><i class="legend-dot item"></i> Items</span>
                    <span><i class="legend-dot npc"></i> NPCs</span>
                    <span><i class="legend-dot enemy"></i> Enemies</span>
                    <span class="legend-hint">Click rooms to zoom</span>
                </div>
                <div class="map-room-panel" id="map-room-panel">
                    <button class="room-panel-close">&times;</button>
                    <h3 id="room-panel-title">Room Name</h3>
                    <p id="room-panel-desc">Description</p>
                    <div id="room-panel-contents"></div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Add event listeners
        overlay.querySelector('.map-modal-backdrop').addEventListener('click', closeModal);
        overlay.querySelector('.map-modal-close').addEventListener('click', closeModal);
        overlay.querySelector('.room-panel-close').addEventListener('click', closeRoomPanel);
        overlay.querySelector('#map-svg-container').addEventListener('click', handleMapClick);
        document.addEventListener('keydown', handleKeydown);
        
        return overlay;
    }

    // Generate the SVG map
    function generateMapSVG() {
        const revealed = LEVEL_REVEALS[currentLevel] || [];
        
        return `
        <svg viewBox="0 0 900 500" class="sigma7-fullmap" preserveAspectRatio="xMidYMid meet">
            <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="#12121a"/>
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,200,255,0.03)" stroke-width="0.5"/>
                </pattern>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>
            
            <rect width="900" height="500" fill="#0a0a0f"/>
            
            <!-- HORIZONTAL LAYOUT: NORTH (left) to SOUTH (right) -->
            
            <!-- ROW 1: Command, Control Hub area, Crew, Main Corridor area, Storage, Airlock -->
            
            <!-- COMMAND DECK (Far North/Left) - BOSS -->
            ${renderRoom('command', 30, 180, 100, 80, revealed, '#ff6b35', true)}
            
            <!-- Connection -->
            <line x1="130" y1="220" x2="160" y2="220" stroke="${revealed.includes('command') && revealed.includes('control_hub') ? 'rgba(0,200,255,0.4)' : 'rgba(50,50,60,0.3)'}" stroke-width="3"/>
            
            <!-- CONTROL HUB -->
            ${renderRoom('control_hub', 160, 160, 110, 120, revealed, '#00c8ff', false)}
            
            <!-- Archive branch (above) -->
            <line x1="215" y1="160" x2="215" y2="100" stroke="${revealed.includes('archive') ? 'rgba(0,200,255,0.3)' : 'rgba(50,50,60,0.2)'}" stroke-width="2"/>
            ${renderRoom('archive', 165, 30, 100, 65, revealed, '#6c757d', false)}
            
            <!-- Medical branch (below) -->
            <line x1="215" y1="280" x2="215" y2="340" stroke="${revealed.includes('medical') ? 'rgba(0,200,255,0.3)' : 'rgba(50,50,60,0.2)'}" stroke-width="2"/>
            ${renderRoom('medical', 165, 345, 100, 65, revealed, '#e63946', false)}
            
            <!-- Connection to Crew -->
            <line x1="270" y1="220" x2="310" y2="220" stroke="${revealed.includes('control_hub') && revealed.includes('crew_quarters') ? 'rgba(0,200,255,0.4)' : 'rgba(50,50,60,0.3)'}" stroke-width="3"/>
            
            <!-- CREW QUARTERS -->
            ${renderRoom('crew_quarters', 310, 170, 100, 100, revealed, '#ffd166', false)}
            
            <!-- Connection to Main Corridor -->
            <line x1="410" y1="220" x2="450" y2="220" stroke="${revealed.includes('crew_quarters') && revealed.includes('main_corridor') ? 'rgba(0,200,255,0.4)' : 'rgba(50,50,60,0.3)'}" stroke-width="3"/>
            
            <!-- MAIN CORRIDOR (Central Hub) -->
            ${renderRoom('main_corridor', 450, 150, 140, 140, revealed, '#ffd166', false)}
            
            <!-- Engineering branch (above) -->
            <line x1="520" y1="150" x2="520" y2="90" stroke="${revealed.includes('engineering') ? 'rgba(0,200,255,0.3)' : 'rgba(50,50,60,0.2)'}" stroke-width="2"/>
            ${renderRoom('engineering', 470, 20, 100, 65, revealed, '#00c8ff', false)}
            
            <!-- Lab branch (below) - locked indicator -->
            <line x1="520" y1="290" x2="520" y2="350" stroke="${revealed.includes('lab') ? 'rgba(255,150,100,0.4)' : 'rgba(50,50,60,0.2)'}" stroke-width="2" ${!revealed.includes('lab') ? 'stroke-dasharray="5 3"' : ''}/>
            ${renderRoom('lab', 470, 355, 100, 65, revealed, '#ff9f43', false)}
            
            <!-- Connection to Storage -->
            <line x1="590" y1="220" x2="630" y2="220" stroke="${revealed.includes('main_corridor') && revealed.includes('storage') ? 'rgba(0,200,255,0.4)' : 'rgba(50,50,60,0.3)'}" stroke-width="3"/>
            
            <!-- STORAGE CAGE -->
            ${renderRoom('storage', 630, 175, 100, 90, revealed, '#06d6a0', false)}
            
            <!-- Connection to Airlock -->
            <line x1="730" y1="220" x2="770" y2="220" stroke="${revealed.includes('storage') && revealed.includes('airlock') ? 'rgba(0,200,255,0.4)' : 'rgba(50,50,60,0.3)'}" stroke-width="3"/>
            
            <!-- AIRLOCK (Start - Far South/Right) -->
            ${renderRoom('airlock', 770, 165, 100, 110, revealed, '#00ff88', true)}
            
            <!-- Direction Indicator -->
            <g transform="translate(450, 470)">
                <text x="-200" y="0" fill="#00c8ff" font-size="12" font-weight="bold">← NORTH (Goal)</text>
                <text x="120" y="0" fill="#00ff88" font-size="12" font-weight="bold">SOUTH (Start) →</text>
            </g>
        </svg>
        `;
    }

    // Render a single room
    function renderRoom(id, x, y, w, h, revealed, color, highlight) {
        const isRevealed = revealed.includes(id);
        const data = ROOM_DATA[id];
        const label = MAP_LABELS[id] || data.name.toUpperCase();
        const isBranch = BRANCH_ROOMS.includes(id);
        
        if (!isRevealed) {
            // Fog of war - hidden room
            return `
                <g class="room fog" data-room="${id}">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0c0c12" stroke="rgba(50,50,60,0.3)" stroke-width="1" rx="4"/>
                    <text x="${x + w/2}" y="${y + h/2}" fill="rgba(100,100,120,0.3)" font-size="10" text-anchor="middle" dominant-baseline="middle">???</text>
                </g>
            `;
        }
        
        // Revealed room
        const hasEnemy = data.enemies && data.enemies.length > 0;
        const hasNPC = data.npcs && data.npcs.length > 0;
        const hasItems = data.items && data.items.length > 0;
        const isStart = id === 'airlock';
        
        // Determine label position for branch rooms (above/below to avoid connection lines)
        const isTopBranch = (id === 'archive' || id === 'engineering');
        const isBottomBranch = (id === 'medical' || id === 'lab');
        
        let labelElement;
        if (isBranch) {
            // Position label outside the box
            if (isTopBranch) {
                // Label below the box for top branches
                labelElement = `<text x="${x + w/2}" y="${y + h + 14}" fill="${color}" font-size="9" font-weight="bold" text-anchor="middle">${label}</text>`;
            } else {
                // Label above the box for bottom branches
                labelElement = `<text x="${x + w/2}" y="${y - 6}" fill="${color}" font-size="9" font-weight="bold" text-anchor="middle">${label}</text>`;
            }
        } else {
            // Label inside the box for main row rooms
            labelElement = `<text x="${x + w/2}" y="${y + 18}" fill="${color}" font-size="10" font-weight="bold" text-anchor="middle">${label}</text>`;
        }
        
        return `
            <g class="room revealed ${highlight ? 'highlight' : ''}" data-room="${id}" style="cursor: pointer;">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#grid)" stroke="${color}" stroke-width="${highlight ? 2 : 1}" rx="4"/>
                ${highlight ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="6 3" rx="4" opacity="0.5"/>` : ''}
                
                <!-- Room name -->
                ${labelElement}
                
                <!-- Icons row -->
                <g transform="translate(${x + w/2}, ${y + h/2 + (isBranch ? 0 : 5)})">
                    ${isStart ? `<circle cx="0" cy="0" r="10" fill="#ff6b6b"/><ellipse cx="0" cy="-2" rx="4" ry="1.5" fill="#00c8ff"/>` : ''}
                    ${hasItems && !isStart ? `<circle cx="${hasNPC ? -15 : (hasEnemy ? -8 : 0)}" cy="0" r="6" fill="#06d6a0"/>` : ''}
                    ${hasNPC ? `<circle cx="${hasItems && hasEnemy ? 0 : (hasItems ? 8 : (hasEnemy ? -8 : 0))}" cy="0" r="6" fill="#ffd166"/>` : ''}
                    ${hasEnemy ? `<circle cx="${hasItems || hasNPC ? 15 : 8}" cy="0" r="6" fill="#e63946"/>` : ''}
                </g>
                
                ${isStart ? `<text x="${x + w/2}" y="${y + h - 8}" fill="#00ff88" font-size="8" text-anchor="middle">START</text>` : ''}
                ${id === 'command' ? `<text x="${x + w/2}" y="${y + h - 8}" fill="#ff6b35" font-size="8" text-anchor="middle">GOAL</text>` : ''}
            </g>
        `;
    }

    // Open the modal
    function openModal() {
        currentLevel = detectLevel();
        
        if (!modal) {
            modal = createModal();
            injectStyles();
        }
        
        // Update level indicator
        modal.querySelector('.map-modal-level').textContent = `Level ${currentLevel.toUpperCase()}`;
        
        // Generate and insert SVG
        document.getElementById('map-svg-container').innerHTML = generateMapSVG();
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close the modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            closeRoomPanel();
        }
    }

    // Zoom into a room
    function zoomRoom(roomId) {
        const data = ROOM_DATA[roomId];
        if (!data) return;
        
        const panel = document.getElementById('map-room-panel');
        document.getElementById('room-panel-title').textContent = data.name;
        document.getElementById('room-panel-desc').textContent = data.desc;
        
        let contents = '';
        if (data.items.length) {
            contents += `<div class="room-info-row"><span class="label item">Items:</span> ${data.items.join(', ')}</div>`;
        }
        if (data.npcs.length) {
            contents += `<div class="room-info-row"><span class="label npc">NPCs:</span> ${data.npcs.join(', ')}</div>`;
        }
        if (data.enemies.length) {
            contents += `<div class="room-info-row"><span class="label enemy">Enemies:</span> ${data.enemies.join(', ')}</div>`;
        }
        if (!data.items.length && !data.npcs.length && !data.enemies.length) {
            contents = '<div class="room-info-row">No notable contents</div>';
        }
        
        document.getElementById('room-panel-contents').innerHTML = contents;
        panel.classList.add('active');
        currentZoom = roomId;
    }

    function handleMapClick(event) {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const room = target.closest('.room.revealed[data-room]');
        if (!room) return;
        const roomId = room.getAttribute('data-room');
        if (roomId) {
            zoomRoom(roomId);
        }
    }

    // Close room panel
    function closeRoomPanel() {
        const panel = document.getElementById('map-room-panel');
        if (panel) {
            panel.classList.remove('active');
            currentZoom = null;
        }
    }

    // Handle keyboard
    function handleKeydown(e) {
        if (e.key === 'Escape') {
            if (currentZoom) {
                closeRoomPanel();
            } else {
                closeModal();
            }
        }
    }

    // Inject CSS styles
    function injectStyles() {
        if (document.getElementById('sigma7-map-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'sigma7-map-styles';
        style.textContent = `
            #sigma7-map-modal {
                display: none;
                position: fixed;
                inset: 0;
                z-index: 99999;
            }
            #sigma7-map-modal.active {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .map-modal-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(8px);
            }
            .map-modal-content {
                position: relative;
                width: 95vw;
                height: 95vh;
                max-width: 1400px;
                background: linear-gradient(180deg, #0a0a12 0%, #0f0f18 100%);
                border-radius: 16px;
                border: 1px solid rgba(0, 200, 255, 0.3);
                box-shadow: 0 0 60px rgba(0, 200, 255, 0.15);
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            .map-modal-close {
                position: absolute;
                top: 16px;
                right: 16px;
                width: 44px;
                height: 44px;
                border: 1px solid rgba(255,255,255,0.2);
                background: rgba(0,0,0,0.5);
                color: #fff;
                font-size: 28px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
            }
            .map-modal-close:hover {
                background: rgba(255, 100, 100, 0.3);
                border-color: #ff6b6b;
                color: #ff6b6b;
            }
            .map-modal-header {
                padding: 20px 60px 15px 24px;
                border-bottom: 1px solid rgba(0, 200, 255, 0.2);
                display: flex;
                align-items: center;
                gap: 16px;
            }
            .map-modal-header h2 {
                margin: 0;
                font-family: 'Inter', sans-serif;
                font-size: 18px;
                font-weight: 700;
                letter-spacing: 2px;
                color: #00c8ff;
            }
            .map-modal-level {
                background: rgba(0, 200, 255, 0.15);
                color: #00c8ff;
                padding: 4px 12px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
            }
            .map-modal-body {
                flex: 1;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            .map-svg-container {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .sigma7-fullmap {
                width: 100%;
                height: 100%;
                max-height: calc(95vh - 160px);
            }
            .map-modal-legend {
                padding: 12px 24px;
                border-top: 1px solid rgba(0, 200, 255, 0.2);
                display: flex;
                align-items: center;
                gap: 24px;
                font-size: 13px;
                color: rgba(255,255,255,0.7);
            }
            .legend-dot {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 6px;
                vertical-align: middle;
            }
            .legend-dot.you { background: #ff6b6b; }
            .legend-dot.item { background: #06d6a0; }
            .legend-dot.npc { background: #ffd166; }
            .legend-dot.enemy { background: #e63946; }
            .legend-hint {
                margin-left: auto;
                color: rgba(0, 200, 255, 0.5);
                font-size: 12px;
            }
            
            /* Room panel */
            .map-room-panel {
                position: absolute;
                top: 80px;
                right: 20px;
                width: 280px;
                background: rgba(10, 10, 18, 0.95);
                border: 1px solid rgba(0, 200, 255, 0.4);
                border-radius: 12px;
                padding: 16px;
                transform: translateX(120%);
                transition: transform 0.3s ease;
                z-index: 20;
            }
            .map-room-panel.active {
                transform: translateX(0);
            }
            .room-panel-close {
                position: absolute;
                top: 8px;
                right: 8px;
                width: 28px;
                height: 28px;
                border: none;
                background: transparent;
                color: rgba(255,255,255,0.5);
                font-size: 20px;
                cursor: pointer;
                border-radius: 50%;
            }
            .room-panel-close:hover {
                color: #ff6b6b;
                background: rgba(255,100,100,0.1);
            }
            .map-room-panel h3 {
                margin: 0 0 8px;
                color: #00c8ff;
                font-size: 16px;
                font-weight: 700;
            }
            .map-room-panel p {
                margin: 0 0 12px;
                color: rgba(255,255,255,0.7);
                font-size: 13px;
            }
            .room-info-row {
                padding: 6px 0;
                border-top: 1px solid rgba(255,255,255,0.1);
                font-size: 12px;
                color: rgba(255,255,255,0.8);
            }
            .room-info-row .label {
                font-weight: 600;
                margin-right: 6px;
            }
            .room-info-row .label.item { color: #06d6a0; }
            .room-info-row .label.npc { color: #ffd166; }
            .room-info-row .label.enemy { color: #e63946; }
            
            /* Room hover effects */
            .sigma7-fullmap .room.revealed:hover rect:first-child {
                filter: brightness(1.3);
            }
            
            /* Show Map Button */
            .show-map-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 12px 24px;
                background: linear-gradient(135deg, rgba(0, 200, 255, 0.15) 0%, rgba(0, 150, 200, 0.1) 100%);
                border: 1px solid rgba(0, 200, 255, 0.4);
                border-radius: 8px;
                color: #00c8ff;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .show-map-btn:hover {
                background: linear-gradient(135deg, rgba(0, 200, 255, 0.25) 0%, rgba(0, 150, 200, 0.15) 100%);
                border-color: #00c8ff;
                transform: translateY(-1px);
                box-shadow: 0 4px 20px rgba(0, 200, 255, 0.2);
            }
            .show-map-btn i {
                font-size: 16px;
            }
        `;
        document.head.appendChild(style);
    }

    // Public API
    window.sigma7Map = {
        open: openModal,
        close: closeModal,
        zoomRoom: zoomRoom
    };

    // Auto-init: Connect existing buttons or create new ones
    document.addEventListener('DOMContentLoaded', function() {
        // Connect any existing show-map-btn buttons
        document.querySelectorAll('.show-map-btn').forEach(btn => {
            btn.addEventListener('click', openModal);
        });
        
        // Also handle old placeholder divs (backwards compatibility)
        const placeholder = document.querySelector('[data-sigma7-map]:not(.show-map-btn)');
        if (placeholder) {
            const btn = document.createElement('button');
            btn.className = 'show-map-btn';
            btn.innerHTML = '<i class="fa-solid fa-map"></i> Show Station Map';
            btn.addEventListener('click', openModal);
            placeholder.parentNode.insertBefore(btn, placeholder);
            placeholder.remove();
        }
    });
})();
