(function () {
    'use strict';

    const BIT_WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];
    const numberFmt = new Intl.NumberFormat('en-GB');

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const cleanBinary = (raw, length = 8) => {
        const digits = String(raw || '').replace(/[^01]/g, '').slice(0, length);
        return digits.padStart(length, '0');
    };

    const escapeHtml = (value) => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const toBits8 = (value) => (value & 255).toString(2).padStart(8, '0');

    const bitsToDecimal = (bits) => parseInt(bits, 2);

    const toHex = (value, size = 2) => value.toString(16).toUpperCase().padStart(size, '0');

    const utf16ByteLength = (text) => Array.from(text || '')
        .reduce((total, char) => total + (char.codePointAt(0) > 0xFFFF ? 4 : 2), 0);

    const formatBytes = (bytes) => {
        const kib = bytes / 1024;
        const mib = bytes / 1048576;
        return {
            bytes,
            kib,
            mib
        };
    };

    const renderBitMatrix = (rows) => {
        const header = BIT_WEIGHTS.map((weight) => `<th>${weight}</th>`).join('');
        const body = rows.map((row) => {
            const bits = String(row.bits).split('').map((bit) => `<td><span class="igcse-bit-chip">${bit}</span></td>`).join('');
            return `<tr><td>${row.label}</td>${bits}</tr>`;
        }).join('');

        return `
            <table class="igcse-bit-matrix" role="table">
                <thead>
                    <tr><th>Column value</th>${header}</tr>
                </thead>
                <tbody>${body}</tbody>
            </table>
        `;
    };

    const wireBinaryAdder = () => {
        document.querySelectorAll('[data-igcse-binary-adder]').forEach((widget) => {
            const inputA = widget.querySelector('[data-adder-a]');
            const inputB = widget.querySelector('[data-adder-b]');
            const board = widget.querySelector('[data-adder-board]');
            const result = widget.querySelector('[data-adder-result]');
            if (!inputA || !inputB || !board || !result) return;

            const update = () => {
                const aBits = cleanBinary(inputA.value);
                const bBits = cleanBinary(inputB.value);
                inputA.value = aBits;
                inputB.value = bBits;

                const aDec = bitsToDecimal(aBits);
                const bDec = bitsToDecimal(bBits);
                const total = aDec + bDec;
                const sumBits = toBits8(total);

                let carry = 0;
                const carryInto = Array(8).fill(0);
                for (let i = 7; i >= 0; i -= 1) {
                    carryInto[i] = carry;
                    const bitTotal = Number(aBits[i]) + Number(bBits[i]) + carry;
                    carry = bitTotal >= 2 ? 1 : 0;
                }
                const overflow = carry === 1;
                const storedDec = bitsToDecimal(sumBits);

                board.innerHTML = renderBitMatrix([
                    { label: 'Carry into column', bits: carryInto.join('') },
                    { label: 'First value (A)', bits: aBits },
                    { label: 'Second value (B)', bits: bBits },
                    { label: 'Stored 8-bit sum', bits: sumBits }
                ]);

                result.innerHTML = `
                    Denary check: A = <strong>${aDec}</strong>, B = <strong>${bDec}</strong>, true total = <strong>${total}</strong>,
                    stored 8-bit value = <strong>${storedDec}</strong> (${sumBits}).
                    <span class="igcse-status ${overflow ? 'igcse-status--warn' : 'igcse-status--ok'}">
                        Overflow: ${overflow ? 'Yes' : 'No'}
                    </span>
                `;
            };

            ['input', 'change'].forEach((eventName) => {
                inputA.addEventListener(eventName, update);
                inputB.addEventListener(eventName, update);
            });
            update();
        });
    };

    const wireShiftDemo = () => {
        document.querySelectorAll('[data-igcse-shift-demo]').forEach((widget) => {
            const bitsInput = widget.querySelector('[data-shift-bits]');
            const directionSelect = widget.querySelector('[data-shift-direction]');
            const placesInput = widget.querySelector('[data-shift-places]');
            const board = widget.querySelector('[data-shift-board]');
            const result = widget.querySelector('[data-shift-result]');
            if (!bitsInput || !directionSelect || !placesInput || !board || !result) return;

            const update = () => {
                const bits = cleanBinary(bitsInput.value);
                bitsInput.value = bits;
                const direction = directionSelect.value === 'right' ? 'right' : 'left';
                const places = clamp(Number.parseInt(placesInput.value, 10) || 1, 1, 4);
                placesInput.value = String(places);

                const beforeDec = bitsToDecimal(bits);
                let shiftedBits;
                let lostBits;
                let afterDec;
                if (direction === 'left') {
                    shiftedBits = bits.slice(places) + '0'.repeat(places);
                    lostBits = bits.slice(0, places);
                    afterDec = bitsToDecimal(shiftedBits);
                } else {
                    shiftedBits = '0'.repeat(places) + bits.slice(0, 8 - places);
                    lostBits = bits.slice(8 - places);
                    afterDec = bitsToDecimal(shiftedBits);
                }

                board.innerHTML = renderBitMatrix([
                    { label: 'Starting value', bits },
                    { label: `After ${direction} shift by ${places}`, bits: shiftedBits }
                ]);

                result.innerHTML = `
                    Decimal: <strong>${beforeDec}</strong> ${direction === 'left' ? '&times;' : '&divide;'} 2<sup>${places}</sup>
                    = <strong>${afterDec}</strong> (positive unsigned rule).
                    Shifted-out bits: <strong>${lostBits || '0'}</strong>.
                `;
            };

            ['input', 'change'].forEach((eventName) => {
                bitsInput.addEventListener(eventName, update);
                directionSelect.addEventListener(eventName, update);
                placesInput.addEventListener(eventName, update);
            });
            update();
        });
    };

    const wireTwosComplementHelper = () => {
        document.querySelectorAll('[data-igcse-twos-complement]').forEach((widget) => {
            const denaryInput = widget.querySelector('[data-tc-denary]');
            const binaryInput = widget.querySelector('[data-tc-binary]');
            const encodeBox = widget.querySelector('[data-tc-encode]');
            const decodeBox = widget.querySelector('[data-tc-decode]');
            if (!denaryInput || !binaryInput || !encodeBox || !decodeBox) return;

            const updateFromDenary = () => {
                const denary = clamp(Number.parseInt(denaryInput.value, 10) || 0, -128, 127);
                denaryInput.value = String(denary);

                let encoded;
                let stepsHtml;
                if (denary >= 0) {
                    encoded = toBits8(denary);
                    stepsHtml = `
                        <ol>
                            <li>Value is non-negative, so encode directly in 8-bit binary.</li>
                            <li>${denary} -> <code>${encoded}</code></li>
                        </ol>
                    `;
                } else {
                    const magnitude = Math.abs(denary);
                    const positiveBits = toBits8(magnitude);
                    const inverted = positiveBits.split('').map((bit) => (bit === '0' ? '1' : '0')).join('');
                    const plusOne = toBits8(bitsToDecimal(inverted) + 1);
                    encoded = plusOne;
                    stepsHtml = `
                        <ol>
                            <li>Write +${magnitude} in 8-bit binary: <code>${positiveBits}</code></li>
                            <li>Invert all bits: <code>${inverted}</code></li>
                            <li>Add 1: <code>${plusOne}</code></li>
                            <li>Final two's complement form for ${denary}: <code>${plusOne}</code></li>
                        </ol>
                    `;
                }

                encodeBox.innerHTML = `
                    <section class="igcse-step-card">
                        <h4>Denary -> 8-bit two's complement</h4>
                        ${stepsHtml}
                        <p><strong>Result:</strong> <code>${encoded}</code></p>
                    </section>
                `;
                binaryInput.value = encoded;
                updateFromBinary();
            };

            const updateFromBinary = () => {
                const bits = cleanBinary(binaryInput.value);
                binaryInput.value = bits;

                let decoded;
                let stepsHtml;
                if (bits[0] === '0') {
                    decoded = bitsToDecimal(bits);
                    stepsHtml = `
                        <ol>
                            <li>Most significant bit is 0, so the value is non-negative.</li>
                            <li>Convert directly to denary: <code>${bits}</code> -> ${decoded}</li>
                        </ol>
                    `;
                } else {
                    const inverted = bits.split('').map((bit) => (bit === '0' ? '1' : '0')).join('');
                    const magnitudeBits = toBits8(bitsToDecimal(inverted) + 1);
                    const magnitude = bitsToDecimal(magnitudeBits);
                    decoded = -magnitude;
                    stepsHtml = `
                        <ol>
                            <li>Most significant bit is 1, so the value is negative.</li>
                            <li>Invert bits: <code>${inverted}</code></li>
                            <li>Add 1: <code>${magnitudeBits}</code> -> magnitude ${magnitude}</li>
                            <li>Apply negative sign: ${decoded}</li>
                        </ol>
                    `;
                }

                decodeBox.innerHTML = `
                    <section class="igcse-step-card">
                        <h4>8-bit two's complement -> denary</h4>
                        ${stepsHtml}
                        <p><strong>Result:</strong> <code>${bits}</code> represents <strong>${decoded}</strong></p>
                    </section>
                `;
            };

            denaryInput.addEventListener('input', updateFromDenary);
            denaryInput.addEventListener('change', updateFromDenary);
            binaryInput.addEventListener('input', updateFromBinary);
            binaryInput.addEventListener('change', updateFromBinary);

            updateFromDenary();
        });
    };

    const wireAsciiExplorer = () => {
        document.querySelectorAll('[data-igcse-ascii-explorer]').forEach((widget) => {
            const charInput = widget.querySelector('[data-ascii-char]');
            const decimalInput = widget.querySelector('[data-ascii-decimal]');
            const board = widget.querySelector('[data-ascii-board]');
            const result = widget.querySelector('[data-ascii-result]');
            if (!charInput || !decimalInput || !board || !result) return;

            const render = (code) => {
                const inAscii = code >= 0 && code <= 127;
                const char = String.fromCharCode(code);
                const displayChar = char === ' ' ? 'Space' : escapeHtml(char);
                const binary = code.toString(2).padStart(7, '0');
                const hex = toHex(code);

                board.innerHTML = `
                    <table class="igcse-bit-matrix" role="table">
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Character</td><td>${displayChar}</td></tr>
                            <tr><td>Denary code</td><td>${code}</td></tr>
                            <tr><td>Binary</td><td><span class="igcse-bit-chip">${binary}</span></td></tr>
                            <tr><td>Hex</td><td><span class="igcse-bit-chip">${hex}</span></td></tr>
                        </tbody>
                    </table>
                `;

                result.innerHTML = inAscii
                    ? `ASCII range check: <span class="igcse-status igcse-status--ok">In ASCII (0-127)</span>`
                    : `ASCII range check: <span class="igcse-status igcse-status--warn">Outside ASCII</span> This is Unicode-only.`;
            };

            const updateFromChar = () => {
                const raw = String(charInput.value || '');
                const char = raw.length > 0 ? raw[0] : 'A';
                charInput.value = char;
                const code = char.charCodeAt(0);
                decimalInput.value = String(code);
                render(code);
            };

            const updateFromDecimal = () => {
                const code = clamp(Number.parseInt(decimalInput.value, 10) || 0, 0, 127);
                decimalInput.value = String(code);
                const char = String.fromCharCode(code);
                charInput.value = char;
                render(code);
            };

            charInput.addEventListener('input', updateFromChar);
            decimalInput.addEventListener('input', updateFromDecimal);
            updateFromChar();
        });
    };

    const wireEncodingComparison = () => {
        document.querySelectorAll('[data-igcse-encoding-compare]').forEach((widget) => {
            const textInput = widget.querySelector('[data-encoding-text]');
            const board = widget.querySelector('[data-encoding-board]');
            const result = widget.querySelector('[data-encoding-result]');
            if (!textInput || !board || !result) return;

            const update = () => {
                const text = String(textInput.value || 'A');
                textInput.value = text.slice(0, 40);
                const chars = Array.from(textInput.value);

                const asciiRepresentable = chars.every((char) => char.codePointAt(0) <= 127);
                const asciiBytes = asciiRepresentable ? chars.length : null;
                const utf8Bytes = new TextEncoder().encode(textInput.value).length;
                const utf16Bytes = utf16ByteLength(textInput.value);
                const utf32Bytes = chars.length * 4;

                const encodingRows = [
                    { name: 'ASCII', representable: asciiRepresentable, bytes: asciiBytes },
                    { name: 'UTF-8', representable: true, bytes: utf8Bytes },
                    { name: 'UTF-16', representable: true, bytes: utf16Bytes },
                    { name: 'UTF-32', representable: true, bytes: utf32Bytes }
                ];

                const codeRows = chars.slice(0, 10).map((char, index) => {
                    const cp = char.codePointAt(0);
                    const label = char === ' ' ? 'Space' : escapeHtml(char);
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${label}</td>
                            <td>U+${toHex(cp, cp > 0xFFFF ? 6 : 4)}</td>
                            <td>${cp}</td>
                        </tr>
                    `;
                }).join('');

                board.innerHTML = `
                    <table class="igcse-bit-matrix" role="table">
                        <thead>
                            <tr><th>Encoding</th><th>Representable?</th><th>Total bytes</th></tr>
                        </thead>
                        <tbody>
                            ${encodingRows.map((row) => `
                                <tr>
                                    <td>${row.name}</td>
                                    <td>${row.representable ? 'Yes' : 'No'}</td>
                                    <td>${row.bytes === null ? 'N/A' : numberFmt.format(row.bytes)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <table class="igcse-bit-matrix" role="table">
                        <thead>
                            <tr><th>#</th><th>Character</th><th>Unicode code point</th><th>Denary</th></tr>
                        </thead>
                        <tbody>
                            ${codeRows || '<tr><td colspan="4">Enter text to inspect code points.</td></tr>'}
                        </tbody>
                    </table>
                `;

                const smallest = encodingRows
                    .filter((row) => row.bytes !== null)
                    .sort((a, b) => a.bytes - b.bytes)[0];

                result.innerHTML = `
                    Characters: <strong>${chars.length}</strong>.
                    Smallest valid encoding for this input: <strong>${smallest.name}</strong> (${numberFmt.format(smallest.bytes)} bytes).
                    ${asciiRepresentable
                        ? '<span class="igcse-status igcse-status--ok">ASCII-compatible text</span>'
                        : '<span class="igcse-status igcse-status--warn">Contains non-ASCII characters</span>'}
                `;
            };

            textInput.addEventListener('input', update);
            update();
        });
    };

    const wireSoundCalculator = () => {
        document.querySelectorAll('[data-igcse-sound-calc]').forEach((widget) => {
            const rateInput = widget.querySelector('[data-sound-rate]');
            const depthInput = widget.querySelector('[data-sound-depth]');
            const channelsInput = widget.querySelector('[data-sound-channels]');
            const durationInput = widget.querySelector('[data-sound-duration]');
            const board = widget.querySelector('[data-sound-board]');
            const result = widget.querySelector('[data-sound-result]');
            if (!rateInput || !depthInput || !channelsInput || !durationInput || !board || !result) return;

            const update = () => {
                const rate = clamp(Number.parseInt(rateInput.value, 10) || 1, 1, 384000);
                const depth = clamp(Number.parseInt(depthInput.value, 10) || 1, 1, 32);
                const channels = clamp(Number.parseInt(channelsInput.value, 10) || 1, 1, 8);
                const duration = clamp(Number.parseInt(durationInput.value, 10) || 1, 1, 86400);

                rateInput.value = String(rate);
                depthInput.value = String(depth);
                channelsInput.value = String(channels);
                durationInput.value = String(duration);

                const bits = rate * depth * channels * duration;
                const bytes = bits / 8;
                const sizes = formatBytes(bytes);

                board.innerHTML = `
                    <table class="igcse-bit-matrix" role="table">
                        <thead>
                            <tr><th>Component</th><th>Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Sample rate</td><td>${numberFmt.format(rate)} Hz</td></tr>
                            <tr><td>Sample resolution</td><td>${depth} bits</td></tr>
                            <tr><td>Channels</td><td>${channels}</td></tr>
                            <tr><td>Duration</td><td>${numberFmt.format(duration)} s</td></tr>
                        </tbody>
                    </table>
                `;

                result.innerHTML = `
                    Formula: ${numberFmt.format(rate)} x ${depth} x ${channels} x ${numberFmt.format(duration)} = <strong>${numberFmt.format(bits)}</strong> bits.<br>
                    Size: <strong>${numberFmt.format(bytes)}</strong> bytes = <strong>${sizes.kib.toFixed(2)}</strong> KiB = <strong>${sizes.mib.toFixed(2)}</strong> MiB.
                `;
            };

            ['input', 'change'].forEach((eventName) => {
                rateInput.addEventListener(eventName, update);
                depthInput.addEventListener(eventName, update);
                channelsInput.addEventListener(eventName, update);
                durationInput.addEventListener(eventName, update);
            });
            update();
        });
    };

    const wireSamplingDemo = () => {
        document.querySelectorAll('[data-igcse-sampling-demo]').forEach((widget) => {
            const signalInput = widget.querySelector('[data-sampling-signal]');
            const sampleInput = widget.querySelector('[data-sampling-rate]');
            const board = widget.querySelector('[data-sampling-board]');
            const result = widget.querySelector('[data-sampling-result]');
            if (!signalInput || !sampleInput || !board || !result) return;

            const update = () => {
                const signalHz = clamp(Number.parseInt(signalInput.value, 10) || 1000, 100, 5000);
                const sampleHz = clamp(Number.parseInt(sampleInput.value, 10) || 8000, 500, 48000);
                signalInput.value = String(signalHz);
                sampleInput.value = String(sampleHz);

                const width = 680;
                const height = 220;
                const padX = 16;
                const centerY = height / 2;
                const amplitude = 72;
                const duration = 0.004;
                const analoguePoints = 260;
                const sampleCount = Math.max(4, Math.floor(sampleHz * duration));
                const nyquistSafe = sampleHz >= signalHz * 2;

                const analoguePath = Array.from({ length: analoguePoints }, (_, i) => {
                    const ratio = i / (analoguePoints - 1);
                    const t = ratio * duration;
                    const x = padX + ratio * (width - padX * 2);
                    const y = centerY - Math.sin(2 * Math.PI * signalHz * t) * amplitude;
                    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
                }).join(' ');

                const samplePoints = Array.from({ length: sampleCount }, (_, i) => {
                    const t = i / sampleHz;
                    const ratio = t / duration;
                    const x = padX + ratio * (width - padX * 2);
                    const y = centerY - Math.sin(2 * Math.PI * signalHz * t) * amplitude;
                    return { x, y };
                });

                const sampledPolyline = samplePoints.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ');

                board.innerHTML = `
                    <svg class="igcse-wave" viewBox="0 0 ${width} ${height}" role="img" aria-label="Signal and sample points visualisation">
                        <line x1="${padX}" y1="${centerY}" x2="${width - padX}" y2="${centerY}" class="igcse-wave__axis"></line>
                        <path d="${analoguePath}" class="igcse-wave__analogue"></path>
                        <polyline points="${sampledPolyline}" class="igcse-wave__sampled"></polyline>
                        ${samplePoints.map((point) => `<circle cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="3.1" class="igcse-wave__dot"></circle>`).join('')}
                    </svg>
                `;

                result.innerHTML = `
                    Signal frequency: <strong>${numberFmt.format(signalHz)} Hz</strong>,
                    sample rate: <strong>${numberFmt.format(sampleHz)} Hz</strong>.
                    <span class="igcse-status ${nyquistSafe ? 'igcse-status--ok' : 'igcse-status--warn'}">
                        ${nyquistSafe ? 'Meets Nyquist (sample rate >= 2 x signal)' : 'Below Nyquist: distortion/aliasing risk'}
                    </span>
                `;
            };

            ['input', 'change'].forEach((eventName) => {
                signalInput.addEventListener(eventName, update);
                sampleInput.addEventListener(eventName, update);
            });

            update();
        });
    };

    const wireBitmapDemo = () => {
        document.querySelectorAll('[data-igcse-bitmap-demo]').forEach((widget) => {
            const widthInput = widget.querySelector('[data-bitmap-width]');
            const heightInput = widget.querySelector('[data-bitmap-height]');
            const depthInput = widget.querySelector('[data-bitmap-depth]');
            const grid = widget.querySelector('[data-bitmap-grid]');
            const stats = widget.querySelector('[data-bitmap-stats]');
            const result = widget.querySelector('[data-bitmap-result]');
            if (!widthInput || !heightInput || !depthInput || !grid || !stats || !result) return;

            const swatchColour = (index, depth) => {
                if (depth === 24) {
                    const r = (index * 53) % 256;
                    const g = (index * 97) % 256;
                    const b = (index * 193) % 256;
                    return `rgb(${r}, ${g}, ${b})`;
                }
                const levels = Math.pow(2, Math.min(depth, 8));
                const levelIndex = index % levels;
                const shade = levels <= 1 ? 0 : Math.round((levelIndex / (levels - 1)) * 255);
                return `rgb(${shade}, ${shade}, ${shade})`;
            };

            const renderGrid = (depth) => {
                const cols = 8;
                const rows = 8;
                grid.innerHTML = '';
                grid.style.setProperty('--igcse-grid-cols', String(cols));
                for (let i = 0; i < cols * rows; i += 1) {
                    const cell = document.createElement('span');
                    cell.className = 'igcse-pixel-cell';
                    const colour = swatchColour(i, depth);
                    cell.style.background = colour;
                    cell.title = depth === 24 ? colour : `Pixel level ${i % Math.pow(2, Math.min(depth, 8))}`;
                    grid.appendChild(cell);
                }
            };

            const update = () => {
                const width = clamp(Number.parseInt(widthInput.value, 10) || 1, 1, 8192);
                const height = clamp(Number.parseInt(heightInput.value, 10) || 1, 1, 8192);
                const depth = clamp(Number.parseInt(depthInput.value, 10) || 1, 1, 24);

                widthInput.value = String(width);
                heightInput.value = String(height);
                depthInput.value = String(depth);

                const colours = Math.pow(2, depth);
                const bits = width * height * depth;
                const bytes = bits / 8;
                const sizes = formatBytes(bytes);

                renderGrid(depth);
                stats.innerHTML = `
                    <section class="igcse-step-card">
                        <h4>Colour depth summary</h4>
                        <ul>
                            <li>Depth: <strong>${depth}-bit</strong></li>
                            <li>Possible colours: <strong>${numberFmt.format(colours)}</strong></li>
                            <li>${depth === 24 ? '24-bit uses RGB (8 bits per channel): example R=63, G=167, B=214 -> #3FA7D6.' : 'Lower depth means fewer colour choices per pixel.'}</li>
                        </ul>
                    </section>
                `;

                result.innerHTML = `
                    Bitmap formula: ${numberFmt.format(width)} x ${numberFmt.format(height)} x ${depth} = <strong>${numberFmt.format(bits)}</strong> bits.<br>
                    Size: <strong>${numberFmt.format(bytes)}</strong> bytes = <strong>${sizes.kib.toFixed(2)}</strong> KiB = <strong>${sizes.mib.toFixed(2)}</strong> MiB.
                `;
            };

            ['input', 'change'].forEach((eventName) => {
                widthInput.addEventListener(eventName, update);
                heightInput.addEventListener(eventName, update);
                depthInput.addEventListener(eventName, update);
            });
            update();
        });
    };

    const wireRleDemo = () => {
        document.querySelectorAll('[data-igcse-rle-demo]').forEach((widget) => {
            const input = widget.querySelector('[data-rle-input]');
            const board = widget.querySelector('[data-rle-board]');
            const result = widget.querySelector('[data-rle-result]');
            if (!input || !board || !result) return;

            const update = () => {
                const text = String(input.value || '');
                if (text.length === 0) {
                    board.innerHTML = '';
                    result.textContent = 'Enter a pattern to see RLE output.';
                    return;
                }

                const runs = [];
                let count = 1;
                for (let i = 1; i <= text.length; i += 1) {
                    if (text[i] === text[i - 1]) {
                        count += 1;
                    } else {
                        runs.push({ char: text[i - 1], count });
                        count = 1;
                    }
                }

                const encoded = runs.map((run) => `${run.count}${run.char === ' ' ? '␠' : run.char}`).join('');
                const encodedLength = runs.reduce((total, run) => total + String(run.count).length + 1, 0);
                const ratio = text.length / encodedLength;

                board.innerHTML = `
                    <table class="igcse-bit-matrix" role="table">
                        <thead>
                            <tr><th>Run</th><th>Character</th><th>Count</th></tr>
                        </thead>
                        <tbody>
                            ${runs.map((run, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${run.char === ' ' ? 'Space (␠)' : escapeHtml(run.char)}</td>
                                    <td>${run.count}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                result.innerHTML = `
                    Encoded form: <strong>${escapeHtml(encoded)}</strong><br>
                    Original symbols: ${text.length}, encoded symbols: ${encodedLength}, ratio: <strong>${ratio.toFixed(2)}:1</strong>.
                `;
            };

            input.addEventListener('input', update);
            update();
        });
    };

    const init = () => {
        wireBinaryAdder();
        wireShiftDemo();
        wireTwosComplementHelper();
        wireAsciiExplorer();
        wireEncodingComparison();
        wireSoundCalculator();
        wireSamplingDemo();
        wireBitmapDemo();
        wireRleDemo();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
