(function () {
    'use strict';

    const escapeHtml = (value) => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const renderRegisterBoard = (registers) => {
        const rows = Object.entries(registers).map(([name, value]) => `
            <tr>
                <td>${escapeHtml(name)}</td>
                <td><span class="igcse-register-chip">${escapeHtml(value)}</span></td>
            </tr>
        `).join('');

        return `
            <table class="igcse-arch-table" role="table" aria-label="Register state table">
                <thead>
                    <tr>
                        <th>Register</th>
                        <th>Current value</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
    };

    const wireFdeStepper = () => {
        document.querySelectorAll('[data-igcse-fde-sim]').forEach((widget) => {
            const prevBtn = widget.querySelector('[data-fde-prev]');
            const nextBtn = widget.querySelector('[data-fde-next]');
            const resetBtn = widget.querySelector('[data-fde-reset]');
            const stageTitle = widget.querySelector('[data-fde-stage-title]');
            const board = widget.querySelector('[data-fde-register-board]');
            const explain = widget.querySelector('[data-fde-stage-explain]');
            if (!prevBtn || !nextBtn || !resetBtn || !stageTitle || !board || !explain) return;

            const steps = [
                {
                    title: 'Step 1 of 7: Program Counter already points to the next instruction',
                    registers: {
                        PC: '00101010',
                        MAR: '--------',
                        MDR: '--------',
                        CIR: '--------',
                        ACC: '00000000'
                    },
                    note: 'The cycle begins with PC holding the next instruction address.'
                },
                {
                    title: 'Step 2 of 7: Copy PC to MAR',
                    registers: {
                        PC: '00101010',
                        MAR: '00101010',
                        MDR: '--------',
                        CIR: '--------',
                        ACC: '00000000'
                    },
                    note: 'The address bus carries the next instruction location from PC into MAR.'
                },
                {
                    title: 'Step 3 of 7: Memory read into MDR',
                    registers: {
                        PC: '00101010',
                        MAR: '00101010',
                        MDR: 'LDA 1100',
                        CIR: '--------',
                        ACC: '00000000'
                    },
                    note: 'Control bus sends a read signal; data bus returns the instruction into MDR.'
                },
                {
                    title: 'Step 4 of 7: Copy MDR to CIR',
                    registers: {
                        PC: '00101010',
                        MAR: '00101010',
                        MDR: 'LDA 1100',
                        CIR: 'LDA 1100',
                        ACC: '00000000'
                    },
                    note: 'Current instruction is now in CIR and ready to decode.'
                },
                {
                    title: 'Step 5 of 7: Increment PC',
                    registers: {
                        PC: '00101011',
                        MAR: '00101010',
                        MDR: 'LDA 1100',
                        CIR: 'LDA 1100',
                        ACC: '00000000'
                    },
                    note: 'PC is increased by 1 so it already points to the following instruction.'
                },
                {
                    title: 'Step 6 of 7: Decode instruction in CU',
                    registers: {
                        PC: '00101011',
                        MAR: '00101010',
                        MDR: 'LDA 1100',
                        CIR: 'LDA 1100',
                        ACC: '00000000'
                    },
                    note: 'CU interprets opcode `LDA` and identifies operand `1100` as the data location.'
                },
                {
                    title: 'Step 7 of 7: Execute operation',
                    registers: {
                        PC: '00101011',
                        MAR: '00001100',
                        MDR: '00000101',
                        CIR: 'LDA 1100',
                        ACC: '00000101'
                    },
                    note: 'Execution loads data from address `1100`; result now sits in ACC. Cycle repeats.'
                }
            ];

            let stageIndex = 0;

            const renderStage = () => {
                const stage = steps[stageIndex];
                stageTitle.textContent = stage.title;
                board.innerHTML = renderRegisterBoard(stage.registers);
                explain.innerHTML = stage.note;
                prevBtn.disabled = stageIndex === 0;
                nextBtn.disabled = stageIndex === steps.length - 1;
            };

            prevBtn.addEventListener('click', () => {
                stageIndex = clamp(stageIndex - 1, 0, steps.length - 1);
                renderStage();
            });

            nextBtn.addEventListener('click', () => {
                stageIndex = clamp(stageIndex + 1, 0, steps.length - 1);
                renderStage();
            });

            resetBtn.addEventListener('click', () => {
                stageIndex = 0;
                renderStage();
            });

            renderStage();
        });
    };

    const wirePerformanceSandbox = () => {
        document.querySelectorAll('[data-igcse-cpu-performance]').forEach((widget) => {
            const clockInput = widget.querySelector('[data-cpu-clock]');
            const clockValue = widget.querySelector('[data-cpu-clock-value]');
            const busSelect = widget.querySelector('[data-cpu-bus]');
            const cacheSelect = widget.querySelector('[data-cpu-cache]');
            const coresSelect = widget.querySelector('[data-cpu-cores]');
            const overclockSelect = widget.querySelector('[data-cpu-overclock]');
            const metricCard = widget.querySelector('[data-cpu-metric-card]');
            const riskCard = widget.querySelector('[data-cpu-risk-card]');
            if (
                !clockInput ||
                !clockValue ||
                !busSelect ||
                !cacheSelect ||
                !coresSelect ||
                !overclockSelect ||
                !metricCard ||
                !riskCard
            ) {
                return;
            }

            const update = () => {
                const clock = Number.parseFloat(clockInput.value) || 3.5;
                const bus = Number.parseInt(busSelect.value, 10) || 32;
                const cache = Number.parseInt(cacheSelect.value, 10) || 4;
                const cores = Number.parseInt(coresSelect.value, 10) || 2;
                const isOverclocked = overclockSelect.value === 'on';

                clockValue.textContent = `${clock.toFixed(1)} GHz`;

                const clockFactor = clock / 3.0;
                const busFactor = bus / 32;
                const cacheFactor = 1 + (Math.log2(cache) - 1) * 0.16;
                const coreFactor = 1 + (cores - 1) * 0.28;
                const overclockFactor = isOverclocked ? 1.08 : 1;
                const throughputIndex = Math.round(clockFactor * busFactor * cacheFactor * coreFactor * overclockFactor * 100);

                let profile;
                if (throughputIndex >= 170) {
                    profile = 'High throughput profile';
                } else if (throughputIndex >= 120) {
                    profile = 'Balanced throughput profile';
                } else {
                    profile = 'Entry throughput profile';
                }

                metricCard.innerHTML = `
                    <h4>Throughput estimate</h4>
                    <p><strong>${throughputIndex}</strong> index points</p>
                    <p>${profile}</p>
                    <ul>
                        <li>Clock factor: ${clockFactor.toFixed(2)}x</li>
                        <li>Bus factor: ${busFactor.toFixed(2)}x</li>
                        <li>Cache factor: ${cacheFactor.toFixed(2)}x</li>
                        <li>Core factor: ${coreFactor.toFixed(2)}x</li>
                    </ul>
                `;

                const risks = [];
                if (isOverclocked) risks.push('Overclocking can cause timing instability and overheating.');
                if (clock >= 4.4) risks.push('Very high clock values increase thermal load and cooling demand.');
                if (cores >= 8) risks.push('More cores improve parallel workloads but add communication overhead.');
                if (bus === 16) risks.push('Narrow data bus can bottleneck high-speed CPU operations.');
                if (cache <= 2) risks.push('Small cache raises the chance of RAM fallbacks and latency spikes.');

                const riskBadgeClass = risks.length > 1 ? 'igcse-status--warn' : 'igcse-status--ok';
                const riskBadgeText = risks.length > 1 ? 'Watch limits carefully' : 'Stable classroom profile';

                riskCard.innerHTML = `
                    <h4>Stability and exam reasoning</h4>
                    <p><span class="igcse-status ${riskBadgeClass}">${riskBadgeText}</span></p>
                    <ul>
                        ${risks.length ? risks.map((risk) => `<li>${escapeHtml(risk)}</li>`).join('') : '<li>No major risk flags for this configuration.</li>'}
                    </ul>
                `;
            };

            [clockInput, busSelect, cacheSelect, coresSelect, overclockSelect].forEach((control) => {
                control.addEventListener('input', update);
                control.addEventListener('change', update);
            });

            update();
        });
    };

    const wireEmbeddedChecker = () => {
        const scenarios = {
            'car-abs': {
                isEmbedded: true,
                summary: 'Dedicated braking control with fixed safety purpose.',
                inputs: ['Wheel-speed sensor data', 'Brake pedal state'],
                outputs: ['Brake-pressure actuator signals', 'Dashboard warning indicator']
            },
            'set-top-box': {
                isEmbedded: true,
                summary: 'Device is built around media-recording and playback control tasks.',
                inputs: ['Remote-control commands', 'Broadcast/satellite stream'],
                outputs: ['Decoded video/audio output', 'Storage write/read control']
            },
            'gaming-pc': {
                isEmbedded: false,
                summary: 'General-purpose system capable of many unrelated applications.',
                inputs: ['Keyboard/mouse/controller events', 'Network/game data'],
                outputs: ['Display rendering', 'Audio and peripheral outputs']
            },
            'vending-machine': {
                isEmbedded: true,
                summary: 'Single-purpose control loop for payment, selection, and dispensing.',
                inputs: ['Coin/note sensor data', 'Item selection keypad'],
                outputs: ['Motor actuator control', 'Display and refund outputs']
            },
            smartphone: {
                isEmbedded: false,
                summary: 'Classified as general-purpose due to broad app/platform usage, despite embedded subsystems.',
                inputs: ['Touchscreen/sensor/network input', 'Camera and microphone data'],
                outputs: ['Screen/audio output', 'Wireless communications']
            }
        };

        document.querySelectorAll('[data-igcse-embedded-checker]').forEach((widget) => {
            const selector = widget.querySelector('[data-embedded-scenario]');
            const verdictBox = widget.querySelector('[data-embedded-verdict]');
            const ioBox = widget.querySelector('[data-embedded-io]');
            if (!selector || !verdictBox || !ioBox) return;

            const update = () => {
                const scenario = scenarios[selector.value] || scenarios['car-abs'];
                const verdictClass = scenario.isEmbedded ? 'igcse-status--ok' : 'igcse-status--warn';
                const verdictText = scenario.isEmbedded ? 'Embedded system' : 'General-purpose system';

                verdictBox.innerHTML = `
                    <h4>Verdict</h4>
                    <p><span class="igcse-status ${verdictClass}">${verdictText}</span></p>
                    <p>${escapeHtml(scenario.summary)}</p>
                `;

                ioBox.innerHTML = `
                    <h4>Likely I/O model</h4>
                    <p><strong>Inputs</strong></p>
                    <ul>${scenario.inputs.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
                    <p><strong>Outputs</strong></p>
                    <ul>${scenario.outputs.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
                `;
            };

            selector.addEventListener('input', update);
            selector.addEventListener('change', update);
            update();
        });
    };

    wireFdeStepper();
    wirePerformanceSandbox();
    wireEmbeddedChecker();
})();
