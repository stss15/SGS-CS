/**
 * Extracted from Big_0_notation.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // --- Configuration & State ---
        const colors = {
            default: 'rgb(99, 102, 241)', // Indigo 500
            compare: 'rgb(239, 68, 68)',   // Red 500
            sorted: 'rgb(34, 197, 94)',    // Green 500
            pivot: 'rgb(234, 179, 8)',     // Yellow 500
            inactive: 'rgb(229, 231, 235)' // Gray 200
        };

        let arrayData = [];
        let arraySize = 50;
        let baseDelay = 30; // Default Normal Speed
        let currentDelay = 30;
        let isRunning = false;
        let isPaused = false;
        let abortController = new AbortController();
        let chartInstance = null;
        let operations = 0;

        // Modal State
        let currentStepIndex = 0;
        let currentAlgoSteps = [];

        // --- DOM Elements ---
        const barContainer = document.getElementById('barContainer');
        const keyContainer = document.getElementById('keyContainer');
        const algoSelect = document.getElementById('algoSelect');
        const caseSelect = document.getElementById('caseSelect');
        const sizeSlider = document.getElementById('sizeSlider');
        const nValue = document.getElementById('nValue');

        const btnStart = document.getElementById('btnStart');
        const btnTutorial = document.getElementById('btnTutorial');
        const btnPause = document.getElementById('btnPause');
        const btnReset = document.getElementById('btnReset');
        const opCounter = document.getElementById('opCounter');
        const speedBtns = document.querySelectorAll('.speed-btn');

        // Modal DOM
        const modal = document.getElementById('tutorialModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const btnPrevStep = document.getElementById('btnPrevStep');
        const btnNextStep = document.getElementById('btnNextStep');
        const btnRunAlgo = document.getElementById('btnRunAlgo');
        const modalClose = document.getElementById('modalClose');

        // Tabs
        const tabGraph = document.getElementById('tabGraph');
        const tabCode = document.getElementById('tabCode');
        const tabTheory = document.getElementById('tabTheory');
        const viewGraph = document.getElementById('viewGraph');
        const viewCode = document.getElementById('viewCode');
        const viewTheory = document.getElementById('viewTheory');

        // Badges & Text
        const timeBadge = document.getElementById('timeBadge');
        const spaceBadge = document.getElementById('spaceBadge');
        const codeDisplay = document.getElementById('codeDisplay');
        const theoryTitle = document.getElementById('theoryTitle');
        const theoryDesc = document.getElementById('theoryDesc');
        const complexityJustification = document.getElementById('complexityJustification');

        // --- Algorithm Data ---
        const algoData = {
            linearSearch: {
                time: "O(N)",
                space: "O(1)",
                desc: "Sequential Search. Checks each element one by one from start to end.",
                code: `def linear_search(arr, target):
    # Time: O(N) | Space: O(1)
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
                keys: ['value', 'compare', 'sorted'],
                steps: [
                    "Start at the first element (Index 0).",
                    "Compare the current element with the target value.",
                    "If they match, stop. We found it!",
                    "If not, move to the next element and repeat.",
                    "If we reach the end without finding it, the item isn't there."
                ],
                complexityNotes: `
                    <p><strong>Time: O(N)</strong><br>
                    Justification: In the worst-case scenario (target is at the very end or not present), the algorithm must check every single element exactly once. Therefore, if there are N elements, there are N comparisons.</p>
                    <p class="mt-2"><strong>Space: O(1)</strong><br>
                    Justification: The algorithm only needs a single variable (the iterator 'i') to track its position. It does not create any new data structures or use recursion stack memory, regardless of input size.</p>
                `
            },
            binarySearch: {
                time: "O(log N)",
                space: "O(1)",
                desc: "Repeatedly checks the middle element and discards half the list. Requires sorted data.",
                code: `def binary_search(arr, target):
    # Time: O(log N) | Space: O(1)
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
                keys: ['value', 'pivot', 'inactive', 'sorted'],
                steps: [
                    "Calculate the middle index of the active range (Yellow bar).",
                    "Compare the middle value with your target.",
                    "If the target is smaller, discard the right half (Grey bars).",
                    "If the target is larger, discard the left half (Grey bars).",
                    "Repeat with the new, smaller range until found."
                ],
                complexityNotes: `
                    <p><strong>Time: O(log N)</strong><br>
                    Justification: With every comparison, the search range is divided by 2. The number of times you can divide N by 2 until you reach 1 is log2(N). This is exponentially faster than checking every item.</p>
                    <p class="mt-2"><strong>Space: O(1)</strong><br>
                    Justification: An iterative binary search only requires three pointers: 'low', 'high', and 'mid'. It does not copy the array or use recursive stack space.</p>
                `
            },
            bubbleSort: {
                time: "O(N²)",
                space: "O(1)",
                desc: "Repeatedly swaps adjacent elements if they are in the wrong order.",
                code: `def bubble_sort(arr):
    # Time: O(N^2) | Space: O(1)
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
                keys: ['value', 'compare', 'sorted'],
                steps: [
                    "Compare the first two adjacent items (Red bars).",
                    "If they are in the wrong order, swap them.",
                    "Move to the next pair and repeat.",
                    "After one full pass, the largest item 'bubbles' to the end (Green).",
                    "Repeat until all items are sorted."
                ],
                complexityNotes: `
                    <p><strong>Time: O(N²)</strong><br>
                    Justification: The algorithm uses two nested loops. The outer loop runs N times. The inner loop runs approximately N times (N-i). This results in roughly N * N comparisons.</p>
                    <p class="mt-2"><strong>Space: O(1)</strong><br>
                    Justification: This is an 'in-place' sort. It only requires a single temporary variable to perform the swap. It does not create a copy of the list.</p>
                `
            },
            selectionSort: {
                time: "O(N²)",
                space: "O(1)",
                desc: "Repeatedly finds the smallest element in the unsorted part and moves it to the sorted part.",
                code: `def selection_sort(arr):
    # Time: O(N^2) | Space: O(1)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
                keys: ['value', 'compare', 'pivot', 'sorted'], // pivot used for min here
                steps: [
                    "Mark the current item as the scan start.",
                    "Scan the rest of the list (Red) to find the smallest number (Yellow).",
                    "Swap that smallest number with the start item.",
                    "Mark the start item as sorted (Green).",
                    "Repeat for the next position."
                ],
                complexityNotes: `
                    <p><strong>Time: O(N²)</strong><br>
                    Justification: Like Bubble Sort, it requires nested loops. We must scan the remaining unsorted portion of the list (N-i elements) for every single position (i) we want to fill.</p>
                    <p class="mt-2"><strong>Space: O(1)</strong><br>
                    Justification: It is an in-place sort. We only need variables to store the current 'minimum index' and the iterator.</p>
                `
            },
            quickSort: {
                time: "O(N log N)",
                space: "O(log N)",
                desc: "Selects a pivot and partitions array into smaller/larger elements. Recursively sorts.",
                code: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)`,
                keys: ['value', 'compare', 'pivot', 'sorted'],
                steps: [
                    "Pick a 'pivot' element (Yellow bar).",
                    "Partition: Move smaller items to the left, larger items to the right.",
                    "Place the pivot in its correct final position.",
                    "Recursively apply the same steps to the left and right sides."
                ],
                complexityNotes: `
                    <p><strong>Time: O(N log N)</strong><br>
                    Justification: Average case. The partition step takes linear time O(N). Because we divide the problem roughly in half each time, the recursion depth is log N. Total time is N * log N. (Worst case is O(N²) if sorted).</p>
                    <p class="mt-2"><strong>Space: O(log N)</strong><br>
                    Justification: Although it sorts in-place (no new array), it uses recursion. The computer must store the state of each recursive call on the 'Stack'. The stack depth is proportional to log N.</p>
                `
            }
        };

        const keyDefinitions = {
            'value': { color: 'bg-indigo-500', label: 'Value' },
            'compare': { color: 'bg-red-500', label: 'Compare/Scan' },
            'sorted': { color: 'bg-green-500', label: 'Sorted/Found' },
            'pivot': { color: 'bg-yellow-500', label: 'Pivot/Target/Min' },
            'inactive': { color: 'bg-gray-200', label: 'Inactive Range' }
        };

        // --- UI Update Functions ---

        function updateKey() {
            const algo = algoSelect.value;
            const keysToShow = algoData[algo].keys;
            keyContainer.innerHTML = '';

            keysToShow.forEach(key => {
                const def = keyDefinitions[key];
                const item = document.createElement('div');
                item.className = 'flex items-center gap-2';
                item.innerHTML = `<div class="w-3 h-3 ${def.color}"></div> ${def.label}`;
                keyContainer.appendChild(item);
            });
        }

        function updateInfo() {
            const algo = algoSelect.value;
            const data = algoData[algo];

            timeBadge.textContent = `Time: ${data.time}`;
            spaceBadge.textContent = `Space: ${data.space}`;
            codeDisplay.textContent = data.code;
            theoryTitle.textContent = algoSelect.options[algoSelect.selectedIndex].text;
            theoryDesc.textContent = data.desc;
            complexityJustification.innerHTML = data.complexityNotes;

            updateKey();
            updateChart();
        }

        function resetArray() {
            stopExecution();
            arraySize = parseInt(sizeSlider.value);
            nValue.innerText = arraySize;
            arrayData = [];

            const algo = algoSelect.value;
            const scenario = caseSelect.value;
            const isSort = algo.includes('Sort');

            if (isSort) {
                if (scenario === 'worst' && (algo === 'bubbleSort' || algo === 'selectionSort' || algo === 'quickSort')) {
                    for (let i = arraySize; i >= 1; i--) arrayData.push(i);
                } else {
                    for (let i = 0; i < arraySize; i++) arrayData.push(Math.floor(Math.random() * 100) + 1);
                }
            } else {
                if (algo === 'binarySearch') {
                    for (let i = 1; i <= arraySize; i++) arrayData.push(i);
                } else {
                    for (let i = 0; i < arraySize; i++) arrayData.push(Math.floor(Math.random() * 100) + 1);
                }
            }

            operations = 0;
            updateOpCounter();
            drawArray();
            if (chartInstance) {
                chartInstance.data.datasets[5].data = [];
                chartInstance.update();
            }
        }

        function drawArray(state = {}) {
            barContainer.innerHTML = '';
            const maxVal = Math.max(...arrayData, Math.max(arraySize, 100));

            arrayData.forEach((val, idx) => {
                const bar = document.createElement('div');
                bar.style.height = `${(val / maxVal) * 100}%`;
                bar.style.width = `${100 / arraySize}%`;
                bar.style.margin = '0 1px';
                bar.className = 'transition-colors duration-75 rounded-t-sm';

                let bgColor = colors.default;

                if (state.range && (idx < state.range[0] || idx > state.range[1])) {
                    bgColor = colors.inactive;
                }

                if (state.sorted && state.sorted.includes(idx)) {
                    bgColor = colors.sorted;
                } else if (state.compare && state.compare.includes(idx)) {
                    bgColor = colors.compare;
                } else if (state.pivot === idx || state.min === idx) {
                    bgColor = colors.pivot;
                } else if (state.range && (idx < state.range[0] || idx > state.range[1])) {
                    bgColor = colors.inactive;
                }

                bar.style.backgroundColor = bgColor;
                barContainer.appendChild(bar);
            });
        }

        function updateOpCounter() {
            opCounter.innerText = operations.toLocaleString();
        }

        // --- Modal Logic ---
        function toggleModal() {
            const body = document.querySelector('body');
            modal.classList.toggle('opacity-0');
            modal.classList.toggle('pointer-events-none');
            body.classList.toggle('modal-active');
        }

        function startTutorial() {
            const algo = algoSelect.value;
            currentAlgoSteps = [...algoData[algo].steps];
            // Add code review step
            currentAlgoSteps.push("Review the Python code below to understand the implementation.");
            currentStepIndex = 0;
            updateModalContent();
            toggleModal();
        }

        function updateModalContent() {
            const totalSteps = currentAlgoSteps.length;
            modalTitle.innerText = `Step ${currentStepIndex + 1} of ${totalSteps}`;

            if (currentStepIndex === totalSteps - 1) {
                // Last step: Show Code
                modalBody.innerHTML = `
                    <p class="mb-4 text-gray-700 font-semibold">Review the Implementation:</p>
                    <div class="bg-gray-800 text-gray-100 p-3 rounded text-sm font-mono overflow-auto max-h-48">
                        <pre>${algoData[algoSelect.value].code}</pre>
                    </div>`;
                btnNextStep.classList.add('hidden');
                btnRunAlgo.classList.remove('hidden');
            } else {
                // Text step
                modalBody.innerHTML = `<p>${currentAlgoSteps[currentStepIndex]}</p>`;
                btnNextStep.classList.remove('hidden');
                btnRunAlgo.classList.add('hidden');
            }

            if (currentStepIndex === 0) btnPrevStep.classList.add('hidden');
            else btnPrevStep.classList.remove('hidden');
        }

        btnNextStep.addEventListener('click', () => {
            if (currentStepIndex < currentAlgoSteps.length - 1) {
                currentStepIndex++;
                updateModalContent();
            }
        });

        btnPrevStep.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                updateModalContent();
            }
        });

        btnRunAlgo.addEventListener('click', () => {
            toggleModal();
            runVisualisation();
        });

        modalClose.addEventListener('click', toggleModal);


        // --- Simulation Execution (Same logic as before) ---
        async function checkPaused(signal) {
            while (isPaused) {
                if (signal.aborted) throw new Error('Aborted');
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }

        async function sleep(ms, signal) {
            await checkPaused(signal);
            if (signal && signal.aborted) throw new Error('Aborted');
            return new Promise(resolve => setTimeout(resolve, currentDelay));
        }

        function stopExecution() {
            abortController.abort();
            abortController = new AbortController();
            isRunning = false;
            isPaused = false;
            btnStart.disabled = false;
            // Removed Start button text changes as we have dedicated buttons
            algoSelect.disabled = false;
            caseSelect.disabled = false;
            sizeSlider.disabled = false;
        }

        async function runVisualisation() {
            if (isRunning) return;
            resetArray();
            isRunning = true;
            btnStart.disabled = true;
            btnPause.disabled = false;
            btnReset.disabled = false;
            algoSelect.disabled = true;
            caseSelect.disabled = true;
            sizeSlider.disabled = true;

            const algo = algoSelect.value;
            const scenario = caseSelect.value;
            const signal = abortController.signal;

            let target = -1;
            if (algo.includes('Search')) {
                if (scenario === 'average') {
                    const exists = Math.random() > 0.1;
                    if (exists) target = arrayData[Math.floor(Math.random() * arraySize)];
                    else target = 999;
                } else if (scenario === 'worst') {
                    target = 999;
                }
            }

            try {
                if (algo === 'linearSearch') await runLinearSearch(signal, target);
                else if (algo === 'binarySearch') await runBinarySearch(signal, target);
                else if (algo === 'bubbleSort') await runBubbleSort(signal);
                else if (algo === 'selectionSort') await runSelectionSort(signal);
                else if (algo === 'quickSort') await runQuickSort(signal);
                plotResultOnChart();
            } catch (e) {
                if (e.message !== 'Aborted') console.error(e);
            }
            stopExecution();
        }

        // --- Algos (Same as previous, using dynamic delays) ---
        async function runLinearSearch(signal, target) {
            for (let i = 0; i < arraySize; i++) {
                if (signal.aborted) throw new Error('Aborted');
                await checkPaused(signal);
                operations++; updateOpCounter();
                drawArray({ compare: [i], pivot: -1 });
                await sleep(1, signal);
                if (arrayData[i] === target) { drawArray({ sorted: [i] }); return; }
            }
        }
        async function runBinarySearch(signal, target) {
            let low = 0;
            let high = arraySize - 1;
            while (low <= high) {
                if (signal.aborted) throw new Error('Aborted');
                await checkPaused(signal);
                let mid = Math.floor((low + high) / 2);
                operations++; updateOpCounter();
                drawArray({ range: [low, high], pivot: mid });
                await sleep(1, signal);
                if (arrayData[mid] === target) { drawArray({ range: [low, high], sorted: [mid] }); return; }
                else if (arrayData[mid] < target) low = mid + 1;
                else high = mid - 1;
            }
        }
        async function runBubbleSort(signal) {
            let n = arraySize;
            let sortedIndices = [];
            for (let i = 0; i < n; i++) {
                let swapped = false;
                for (let j = 0; j < n - i - 1; j++) {
                    if (signal.aborted) throw new Error('Aborted');
                    await checkPaused(signal);
                    operations++; updateOpCounter();
                    drawArray({ compare: [j, j + 1], sorted: sortedIndices });
                    await sleep(1, signal);
                    if (arrayData[j] > arrayData[j + 1]) {
                        [arrayData[j], arrayData[j + 1]] = [arrayData[j + 1], arrayData[j]];
                        swapped = true;
                        drawArray({ compare: [j, j + 1], sorted: sortedIndices });
                        await sleep(1, signal);
                    }
                }
                sortedIndices.push(n - i - 1);
                if (!swapped) {
                    for (let k = 0; k < n - i - 1; k++) sortedIndices.push(k);
                    break;
                }
            }
            drawArray({ sorted: Array.from({ length: n }, (_, k) => k) });
        }
        async function runSelectionSort(signal) {
            let n = arraySize;
            let sortedIndices = [];
            for (let i = 0; i < n; i++) {
                let min_idx = i;
                for (let j = i + 1; j < n; j++) {
                    if (signal.aborted) throw new Error('Aborted');
                    await checkPaused(signal);
                    operations++; updateOpCounter();
                    drawArray({ compare: [j], min: min_idx, sorted: sortedIndices });
                    await sleep(1, signal);
                    if (arrayData[j] < arrayData[min_idx]) min_idx = j;
                }
                if (min_idx !== i) [arrayData[i], arrayData[min_idx]] = [arrayData[min_idx], arrayData[i]];
                sortedIndices.push(i);
                drawArray({ sorted: sortedIndices });
                await sleep(1, signal);
            }
            drawArray({ sorted: Array.from({ length: n }, (_, k) => k) });
        }
        async function runQuickSort(signal) {
            await quickSortHelper(0, arraySize - 1, signal);
            drawArray({ sorted: Array.from({ length: arraySize }, (_, k) => k) });
        }
        async function quickSortHelper(low, high, signal) {
            if (low < high) {
                if (signal.aborted) throw new Error('Aborted');
                let pi = await partition(low, high, signal);
                await quickSortHelper(low, pi - 1, signal);
                await quickSortHelper(pi + 1, high, signal);
            }
        }
        async function partition(low, high, signal) {
            let pivot = arrayData[high];
            let i = (low - 1);
            for (let j = low; j <= high - 1; j++) {
                if (signal.aborted) throw new Error('Aborted');
                await checkPaused(signal);
                operations++; updateOpCounter();
                drawArray({ compare: [j], pivot: high });
                await sleep(1, signal);
                if (arrayData[j] < pivot) {
                    i++;
                    [arrayData[i], arrayData[j]] = [arrayData[j], arrayData[i]];
                    drawArray({ compare: [i, j], pivot: high });
                    await sleep(1, signal);
                }
            }
            [arrayData[i + 1], arrayData[high]] = [arrayData[high], arrayData[i + 1]];
            drawArray({ compare: [i + 1, high] });
            await sleep(1, signal);
            return (i + 1);
        }

        // --- Chart & Events ---
        function initChart() {
            const ctx = document.getElementById('complexityChart').getContext('2d');
            const labels = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
            const dataO1 = labels.map(() => 1);
            const dataLogN = labels.map(n => Math.log2(n));
            const dataN = labels.map(n => n);
            const dataNLogN = labels.map(n => n * Math.log2(n));
            const dataN2 = labels.map(n => n * n);

            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'O(1)', data: dataO1, borderColor: '#10b981', hidden: true, tension: 0.4 },
                        { label: 'O(log N)', data: dataLogN, borderColor: '#06b6d4', hidden: true, tension: 0.4 },
                        { label: 'O(N)', data: dataN, borderColor: '#f59e0b', hidden: true, tension: 0.4 },
                        { label: 'O(N log N)', data: dataNLogN, borderColor: '#8b5cf6', hidden: true, tension: 0.4 },
                        { label: 'O(N²)', data: dataN2, borderColor: '#ef4444', hidden: true, tension: 0.4 },
                        { label: 'Your Run', data: [], backgroundColor: 'red', borderColor: 'red', borderWidth: 2, pointStyle: 'crossRot', pointRadius: 10, pointHoverRadius: 12, type: 'scatter', showLine: false }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true, title: { display: true, text: 'Operations' }, type: 'logarithmic' }, x: { title: { display: true, text: 'Input Size (N)' } } },
                    plugins: { legend: { display: true } }
                }
            });
        }
        function updateChart() {
            if (!chartInstance) return;
            for (let i = 0; i < 5; i++) { chartInstance.data.datasets[i].hidden = true; chartInstance.data.datasets[i].borderWidth = 2; }
            const algo = algoSelect.value;
            let targetLabel = '';
            if (algo === 'linearSearch') targetLabel = 'O(N)';
            else if (algo === 'binarySearch') targetLabel = 'O(log N)';
            else if (algo === 'bubbleSort') targetLabel = 'O(N²)';
            else if (algo === 'selectionSort') targetLabel = 'O(N²)';
            else if (algo === 'quickSort') targetLabel = 'O(N log N)';
            const activeDataset = chartInstance.data.datasets.find(ds => ds.label === targetLabel);
            if (activeDataset) { activeDataset.hidden = false; activeDataset.borderWidth = 4; }
            chartInstance.update();
        }
        function plotResultOnChart() {
            if (!chartInstance) return;
            const safeOps = Math.max(1, operations);
            chartInstance.data.datasets[5].data = [{ x: arraySize, y: safeOps }];
            chartInstance.update();
        }

        sizeSlider.addEventListener('input', (e) => { nValue.innerText = e.target.value; if (!isRunning) resetArray(); });
        algoSelect.addEventListener('change', () => { updateInfo(); resetArray(); });
        caseSelect.addEventListener('change', () => { resetArray(); });
        btnReset.addEventListener('click', () => { stopExecution(); resetArray(); });

        btnStart.addEventListener('click', runVisualisation);
        btnTutorial.addEventListener('click', startTutorial);

        btnPause.addEventListener('click', () => {
            if (!isRunning) return;
            isPaused = !isPaused;
            if (isPaused) {
                btnPause.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg> Resume`;
                btnPause.classList.replace('bg-yellow-500', 'bg-green-500');
                btnPause.classList.replace('hover:bg-yellow-600', 'hover:bg-green-600');
            } else {
                btnPause.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg> Pause`;
                btnPause.classList.replace('bg-green-500', 'bg-yellow-500');
                btnPause.classList.replace('hover:bg-green-600', 'hover:bg-yellow-600');
            }
        });
        speedBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                speedBtns.forEach(b => b.classList.remove('speed-btn-active'));
                btn.classList.add('speed-btn-active');
                currentDelay = parseInt(btn.dataset.speed);
            });
        });

        // Tab logic
        function switchTab(tabId) {
            [tabGraph, tabCode, tabTheory].forEach(t => { t.className = "px-4 py-2 text-sm tab-inactive focus:outline-none"; });
            [viewGraph, viewCode, viewTheory].forEach(v => v.classList.add('hidden'));
            if (tabId === 'graph') { tabGraph.className = "px-4 py-2 text-sm tab-active focus:outline-none"; viewGraph.classList.remove('hidden'); }
            else if (tabId === 'code') { tabCode.className = "px-4 py-2 text-sm tab-active focus:outline-none"; viewCode.classList.remove('hidden'); }
            else { tabTheory.className = "px-4 py-2 text-sm tab-active focus:outline-none"; viewTheory.classList.remove('hidden'); }
        }
        tabGraph.onclick = () => switchTab('graph');
        tabCode.onclick = () => switchTab('code');
        tabTheory.onclick = () => switchTab('theory');

        // Added Init Function Here
        function init() {
            updateInfo();
            resetArray();
            initChart();
            updateChart();
        }

        window.onload = init;
    