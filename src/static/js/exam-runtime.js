(() => {
    let examConfig = {};
    let configReady = false;
    let configError = null;

    let startTime;
    let timerInterval;
    let timeTakenStr = '';
    let studentDetails = {};

    function initConfig(data) {
        examConfig = data && typeof data === 'object' ? data : {};
        configReady = true;
    }

    function loadConfig() {
        const dataTag = document.getElementById('exam-config');
        if (dataTag) {
            try {
                initConfig(JSON.parse(dataTag.textContent));
            } catch (error) {
                console.error('Exam runtime: invalid config data.', error);
                configError = error;
                configReady = true;
            }
            return;
        }

        const dataUrl = document.body ? document.body.dataset.examJson : '';
        if (!dataUrl) {
            configReady = true;
            return;
        }

        fetch(dataUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load exam config (${response.status})`);
                }
                return response.json();
            })
            .then((data) => initConfig(data))
            .catch((error) => {
                console.error('Exam runtime: failed to load config.', error);
                configError = error;
                configReady = true;
            });
    }

    function ensureReady() {
        if (!configReady) {
            alert('Exam data is loading. Please try again.');
            return false;
        }
        if (configError) {
            console.warn('Exam runtime: continuing with default config after load failure.');
        }
        return true;
    }

    function resolveConfig() {
        const body = document.body || {};
        const header = document.querySelector('header');
        const headerTitle = header ? header.querySelector('h1') : null;
        const headerSubtitle = header ? header.querySelector('p') : null;

        const config = { ...examConfig };

        if (body.dataset.examTitle) config.title = body.dataset.examTitle;
        if (!config.title && headerTitle) config.title = headerTitle.textContent.trim();
        if (!config.title) config.title = document.title || 'Exam';

        if (body.dataset.examSubtitle) config.subtitle = body.dataset.examSubtitle;
        if (!config.subtitle && headerSubtitle) config.subtitle = headerSubtitle.textContent.trim();

        if (body.dataset.examLogo) config.logo = body.dataset.examLogo;
        if (!config.logo) config.logo = '/images/Logo.png';

        if (body.dataset.examFilePrefix) config.filePrefix = body.dataset.examFilePrefix;

        if (body.dataset.examOverlayId) config.overlayId = body.dataset.examOverlayId;
        if (!config.overlayId) config.overlayId = 'startModal';

        if (body.dataset.examMainSelector) config.mainSelector = body.dataset.examMainSelector;
        if (!config.mainSelector) config.mainSelector = 'main';

        if (body.dataset.examControlsId) config.controlsId = body.dataset.examControlsId;
        if (!config.controlsId) config.controlsId = 'controls';

        if (body.dataset.examTimerId) config.timerId = body.dataset.examTimerId;
        if (!config.timerId) config.timerId = 'timer';

        if (body.dataset.examStudentInfoId) config.studentInfoId = body.dataset.examStudentInfoId;
        if (!config.studentInfoId) config.studentInfoId = 'studentInfoDisplay';

        if (body.dataset.examSubmitId) config.submitId = body.dataset.examSubmitId;
        if (!config.submitId) config.submitId = 'btnSubmit';

        if (body.dataset.examDownloadId) config.downloadId = body.dataset.examDownloadId;
        if (!config.downloadId) config.downloadId = 'btnDownload';

        return config;
    }

    function resolveStudentFields(config) {
        if (Array.isArray(config.studentFields) && config.studentFields.length > 0) {
            return config.studentFields;
        }
        return [
            { id: 'firstName', label: 'First Name', required: true },
            { id: 'surname', label: 'Surname', required: true },
            { id: 'teacherName', label: 'Teacher Name', required: true }
        ];
    }

    function sanitizeFilePart(value) {
        return String(value || '')
            .trim()
            .replace(/[^A-Za-z0-9_-]+/g, '_')
            .replace(/^_+|_+$/g, '');
    }

    function buildCandidateName(details) {
        const first = details.firstName || details.first || '';
        const surname = details.surname || details.lastName || details.last || '';
        return [first, surname].filter(Boolean).join(' ').trim();
    }

    function buildStudentInfo(details, fields) {
        const parts = [];
        const candidateName = buildCandidateName(details);
        if (candidateName) parts.push(`Candidate: ${candidateName}`);
        const teacher = details.teacherName || details.teacher || '';
        if (teacher) parts.push(`Teacher: ${teacher}`);

        const usedKeys = new Set([
            'firstName',
            'surname',
            'lastName',
            'last',
            'first',
            'teacherName',
            'teacher'
        ]);
        fields.forEach((field) => {
            if (!field || !field.id || usedKeys.has(field.id)) return;
            const value = details[field.id];
            if (value) parts.push(`${field.label || field.id}: ${value}`);
        });

        return parts.join(' | ');
    }

    function updateTimer(timerId) {
        const now = Date.now();
        const diff = Math.floor((now - startTime) / 1000);
        const minutes = Math.floor(diff / 60).toString().padStart(2, '0');
        const seconds = (diff % 60).toString().padStart(2, '0');
        const timer = document.getElementById(timerId);
        if (timer) timer.textContent = `${minutes}:${seconds}`;
        timeTakenStr = `${minutes}:${seconds}`;
    }

    function startTest() {
        if (!ensureReady()) return;
        const config = resolveConfig();
        const fields = resolveStudentFields(config);
        const details = {};
        const missing = [];

        fields.forEach((field) => {
            if (!field || !field.id) return;
            const input = document.getElementById(field.id);
            if (!input) return;
            const value = input.value.trim();
            if (field.required !== false && !value) {
                missing.push(field.label || field.id);
            }
            details[field.id] = value;
        });

        if (missing.length > 0) {
            alert(`Please fill in: ${missing.join(', ')}.`);
            return;
        }

        studentDetails = details;

        const overlay = document.getElementById(config.overlayId) || document.getElementById('startOverlay');
        if (overlay) overlay.style.display = 'none';

        const main = document.querySelector(config.mainSelector);
        if (main) main.style.display = 'block';

        const controls = document.getElementById(config.controlsId);
        if (controls) controls.style.display = 'block';

        const studentInfo = document.getElementById(config.studentInfoId);
        if (studentInfo) {
            studentInfo.textContent = buildStudentInfo(details, fields);
            studentInfo.style.display = 'block';
        }

        startTime = Date.now();
        timerInterval = setInterval(() => updateTimer(config.timerId), 1000);
    }

    function submitTest() {
        clearInterval(timerInterval);

        document.querySelectorAll('input, textarea, select').forEach((el) => {
            el.disabled = true;
        });

        const submitButton = document.getElementById(resolveConfig().submitId);
        if (submitButton) submitButton.style.display = 'none';
        const downloadButton = document.getElementById(resolveConfig().downloadId);
        if (downloadButton) downloadButton.style.display = 'inline-flex';

        alert('Test Submitted. You may now download the PDF.');
    }

    async function generatePDF() {
        if (!ensureReady()) return;
        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert('PDF library unavailable.');
            return;
        }

        const config = resolveConfig();
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);
        let yPos = 20;

        function checkPageBreak(heightNeeded) {
            if (yPos + heightNeeded > pageHeight - margin) {
                doc.addPage();
                yPos = 20;
            }
        }

        function addWrappedText(text, fontSize, fontStyle, color = '#000000', indent = 0) {
            doc.setFontSize(fontSize);
            doc.setFont('helvetica', fontStyle);
            doc.setTextColor(color);

            const lines = doc.splitTextToSize(text, contentWidth - indent);
            const lineHeight = fontSize * 0.5;

            checkPageBreak(lines.length * lineHeight);
            doc.text(lines, margin + indent, yPos);
            yPos += (lines.length * lineHeight) + 2;
        }

        try {
            const logoData = await getBase64ImageFromUrl(config.logo);
            doc.addImage(logoData, 'PNG', pageWidth - 40, 10, 25, 25);
        } catch (error) {
            console.warn('Exam runtime: logo could not be loaded.', error);
        }

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#003366');
        doc.text(config.title, margin, yPos);
        yPos += 10;

        if (config.subtitle) {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor('#666666');
            doc.text(config.subtitle, margin, yPos);
            yPos += 15;
        } else {
            yPos += 8;
        }

        doc.setDrawColor(200);
        doc.setFillColor(245, 245, 245);
        doc.rect(margin, yPos, contentWidth, 25, 'FD');

        yPos += 7;
        doc.setFontSize(10);
        doc.setTextColor('#000000');
        const candidateName = buildCandidateName(studentDetails);
        const teacherName = studentDetails.teacherName || studentDetails.teacher || '';
        doc.text(`Candidate Name: ${candidateName || 'N/A'}`, margin + 5, yPos);
        doc.text(`Teacher: ${teacherName || 'N/A'}`, margin + 100, yPos);
        yPos += 8;
        doc.text(`Date: ${new Date().toLocaleDateString()}`, margin + 5, yPos);
        doc.text(`Time Taken: ${timeTakenStr || 'N/A'}`, margin + 100, yPos);
        yPos += 15;

        const questionBlocks = document.querySelectorAll('.question-block');

        questionBlocks.forEach((block) => {
            yPos += 5;
            checkPageBreak(30);

            const qNum = block.querySelector('.q-num')?.innerText || '';
            const qText = block.querySelector('.q-text')?.innerText || '';
            const marks = block.querySelector('.marks')?.innerText || '';

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor('#003366');
            doc.text(`${qNum} ${qText}`.trim(), margin, yPos);

            if (marks) {
                doc.setFont('helvetica', 'italic');
                doc.setTextColor('#666666');
                doc.text(marks, pageWidth - margin - doc.getTextWidth(marks), yPos);
            }
            yPos += 8;

            const matchRows = block.querySelectorAll('.match-row');
            if (matchRows.length > 0) {
                matchRows.forEach((row) => {
                    const itemText = row.querySelector('.match-item')?.innerText || '';
                    const select = row.querySelector('select');
                    const selectedText = select
                        ? (select.value || select.options[select.selectedIndex]?.textContent || '')
                        : '';
                    const selectVal = selectedText || '(No Answer)';

                    checkPageBreak(15);
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor('#000000');
                    doc.text(`• ${itemText}`, margin + 5, yPos);

                    doc.setTextColor('#D4AF37');
                    doc.text('->', margin + 90, yPos);

                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor('#003366');
                    doc.text(selectVal, margin + 100, yPos);
                    yPos += 7;
                });
            }

            const subQs = block.querySelectorAll('.sub-q');
            if (subQs.length > 0) {
                subQs.forEach((sub) => {
                    const label = sub.querySelector('.sub-label')?.innerText || '';
                    const textInput = sub.querySelector('input[type="text"], input[type="number"]');
                    const textarea = sub.querySelector('textarea');
                    const select = sub.querySelector('select');
                    const radios = sub.querySelectorAll('input[type="radio"]');
                    const checkboxes = sub.querySelectorAll('input[type="checkbox"]');

                    let answer = '';
                    if (textInput) {
                        answer = textInput.value;
                    } else if (textarea) {
                        answer = textarea.value;
                    } else if (select) {
                        answer = select.value;
                    } else if (radios.length > 0) {
                        radios.forEach((radio) => {
                            if (radio.checked) {
                                answer = radio.parentElement?.innerText.trim() || radio.value;
                            }
                        });
                    } else if (checkboxes.length > 0) {
                        const checked = [];
                        checkboxes.forEach((box) => {
                            if (box.checked) {
                                checked.push(box.parentElement?.innerText.trim() || box.value);
                            }
                        });
                        answer = checked.join(', ');
                    }

                    if (!answer) answer = '(No Answer Provided)';

                    checkPageBreak(20);
                    addWrappedText(label, 10, 'normal', '#333333', 5);

                    checkPageBreak(10);
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor('#003366');

                    const ansLines = doc.splitTextToSize(answer, contentWidth - 10);
                    doc.text(ansLines, margin + 10, yPos);
                    yPos += (ansLines.length * 5) + 5;
                });
            }

            doc.setDrawColor(230);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 5;
        });

        const filePrefix = sanitizeFilePart(config.filePrefix || config.title) || 'Exam';
        const fileParts = [filePrefix];
        if (studentDetails.surname) fileParts.push(studentDetails.surname);
        if (studentDetails.firstName) fileParts.push(studentDetails.firstName);
        const fileName = sanitizeFilePart(fileParts.join('_')) || filePrefix;
        doc.save(`${fileName}.pdf`);
    }

    function getBase64ImageFromUrl(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            };
            img.onerror = (error) => reject(error);
            img.src = url;
        });
    }

    loadConfig();
    window.startTest = startTest;
    window.submitTest = submitTest;
    window.generatePDF = generatePDF;
})();
