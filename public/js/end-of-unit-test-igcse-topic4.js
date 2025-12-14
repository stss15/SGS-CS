/**
 * Extracted from Topic4_End_of_unit_Test.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        let startTime;
        let timerInterval;
        let timeTakenStr = "";
        let studentDetails = {};

        function startTest() {
            const first = document.getElementById('firstName').value;
            const surname = document.getElementById('surname').value;
            const teacher = document.getElementById('teacherName').value;

            if (!first || !surname || !teacher) {
                alert("Please fill in all details.");
                return;
            }

            studentDetails = { first, surname, teacher };

            // Hide modal
            document.getElementById('startModal').style.display = 'none';

            // Show content
            document.querySelector('main').style.display = 'block';
            document.getElementById('controls').style.display = 'block';

            // Update header info
            document.getElementById('studentInfoDisplay').innerText = `Candidate: ${first} ${surname} | Teacher: ${teacher}`;
            document.getElementById('studentInfoDisplay').style.display = 'block';

            // Start Timer
            startTime = Date.now();
            timerInterval = setInterval(() => {
                let delta = Date.now() - startTime;
                let seconds = Math.floor((delta / 1000) % 60);
                let minutes = Math.floor((delta / (1000 * 60)) % 60);

                let timeStr = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
                document.getElementById('timer').innerText = timeStr;
                timeTakenStr = timeStr;
            }, 1000);
        }

        function submitTest() {
            clearInterval(timerInterval);

            // Disable inputs
            document.querySelectorAll('input, textarea, select').forEach(el => el.disabled = true);
            document.querySelectorAll('input[type="radio"]').forEach(el => el.disabled = true);

            document.getElementById('btnSubmit').style.display = 'none';
            document.getElementById('btnDownload').style.display = 'inline-flex';

            alert("Test Submitted. You may now download the PDF.");
        }

        async function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // PDF Config
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const contentWidth = pageWidth - (margin * 2);
            let yPos = 20;

            // Helper: Check Page Break
            function checkPageBreak(heightNeeded) {
                if (yPos + heightNeeded > pageHeight - margin) {
                    doc.addPage();
                    yPos = 20;
                }
            }

            // Helper: Add Text with Wrapping
            function addWrappedText(text, fontSize, fontStyle, color = '#000000', indent = 0) {
                doc.setFontSize(fontSize);
                doc.setFont("helvetica", fontStyle);
                doc.setTextColor(color);

                const lines = doc.splitTextToSize(text, contentWidth - indent);
                const lineHeight = fontSize * 0.5; // Approx mm

                checkPageBreak(lines.length * lineHeight);

                doc.text(lines, margin + indent, yPos);
                yPos += (lines.length * lineHeight) + 2;
            }

            // 1. Load Logo
            const logoUrl = '../../images/Logo.png';
            try {
                const logoData = await getBase64ImageFromUrl(logoUrl);
                doc.addImage(logoData, 'PNG', pageWidth - 40, 10, 25, 25); // Top Right
            } catch (e) {
                console.warn("Logo could not be loaded", e);
            }

            // 2. Header Info
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.setTextColor('#003366'); // SG Blue
            doc.text("Topic 4: End of Unit Test", margin, yPos);
            yPos += 10;

            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.setTextColor('#666666');
            doc.text("Cambridge IGCSE Computer Science (0478)", margin, yPos);
            yPos += 15;

            // Student Details Box
            doc.setDrawColor(200);
            doc.setFillColor(245, 245, 245);
            doc.rect(margin, yPos, contentWidth, 25, 'FD');

            yPos += 7;
            doc.setFontSize(10);
            doc.setTextColor('#000000');
            doc.text(`Candidate Name: ${studentDetails.first} ${studentDetails.surname}`, margin + 5, yPos);
            doc.text(`Teacher: ${studentDetails.teacher}`, margin + 100, yPos);
            yPos += 8;
            doc.text(`Date: ${new Date().toLocaleDateString()}`, margin + 5, yPos);
            doc.text(`Time Taken: ${timeTakenStr}`, margin + 100, yPos);
            yPos += 15; // Exit box

            // 3. Iterate Questions
            const questionBlocks = document.querySelectorAll('.question-block');

            questionBlocks.forEach((block, index) => {
                yPos += 5; // Spacing before question
                checkPageBreak(30); // Ensure at least header fits

                // Question Header
                const qNum = block.querySelector('.q-num').innerText;
                const qText = block.querySelector('.q-text').innerText;
                const marks = block.querySelector('.marks').innerText;

                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.setTextColor('#003366');
                doc.text(`${qNum} ${qText}`, margin, yPos);

                // Marks aligned right
                doc.setFont("helvetica", "italic");
                doc.setTextColor('#666666');
                doc.text(marks, pageWidth - margin - doc.getTextWidth(marks), yPos);
                yPos += 8;

                // Handle Question Content

                // Type 1: Matching (Q1)
                const matchRows = block.querySelectorAll('.match-row');
                if (matchRows.length > 0) {
                    matchRows.forEach(row => {
                        const itemText = row.querySelector('.match-item').innerText;
                        const selectVal = row.querySelector('select').value || "(No Answer)";

                        checkPageBreak(15);
                        doc.setFontSize(10);
                        doc.setFont("helvetica", "normal");
                        doc.setTextColor('#000000');
                        doc.text(`• ${itemText}`, margin + 5, yPos);

                        // Draw arrow
                        doc.setTextColor('#D4AF37'); // Gold
                        doc.text("->", margin + 90, yPos);

                        // Answer
                        doc.setFont("helvetica", "bold");
                        doc.setTextColor('#003366');
                        doc.text(selectVal, margin + 100, yPos);
                        yPos += 7;
                    });
                }

                // Type 2: Sub-questions (Q2, Q3, Q4, Q6, Q7)
                const subQs = block.querySelectorAll('.sub-q');
                if (subQs.length > 0) {
                    subQs.forEach(sub => {
                        const label = sub.querySelector('.sub-label').innerText;

                        // Get Answer based on input type
                        let answer = "";
                        const input = sub.querySelector('input[type="text"]');
                        const textarea = sub.querySelector('textarea');
                        const radios = sub.querySelectorAll('input[type="radio"]');

                        if (input) answer = input.value;
                        else if (textarea) answer = textarea.value;
                        else if (radios.length > 0) {
                            // MCQ
                            radios.forEach(r => {
                                if (r.checked) {
                                    // Find the label text for this radio
                                    answer = r.parentElement.innerText.trim();
                                }
                            });
                        }

                        if (!answer) answer = "(No Answer Provided)";

                        // Print Sub-label
                        checkPageBreak(20);
                        addWrappedText(label, 10, "normal", '#333333', 5);

                        // Print Answer
                        checkPageBreak(10);
                        doc.setFontSize(10);
                        doc.setFont("helvetica", "bold"); // Bold for student answer
                        doc.setTextColor('#003366'); // Blue for student answer

                        // Indent answer slightly
                        const ansLines = doc.splitTextToSize(answer, contentWidth - 10);
                        doc.text(ansLines, margin + 10, yPos);
                        yPos += (ansLines.length * 5) + 5; // Spacing after answer
                    });
                }

                // Divider line
                doc.setDrawColor(230);
                doc.line(margin, yPos, pageWidth - margin, yPos);
                yPos += 5;
            });

            // Save
            doc.save(`Topic4_Exam_${studentDetails.surname}_${studentDetails.first}.pdf`);
        }

        // Helper to load image
        function getBase64ImageFromUrl(url) {
            return new Promise((resolve, reject) => {
                var img = new Image();
                img.setAttribute('crossOrigin', 'anonymous');
                img.onload = () => {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    var dataURL = canvas.toDataURL("image/png");
                    resolve(dataURL);
                };
                img.onerror = error => reject(error);
                img.src = url;
            });
        }

    