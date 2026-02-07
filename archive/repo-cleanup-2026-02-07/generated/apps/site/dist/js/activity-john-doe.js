/**
 * Extracted from john-doe.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

        // Evidence data with captions and filenames
        const evidenceData = [
            { id: 1, src: "images/evidence1.png", caption: "Subject photographed at Grand Central Station - 03/15/2024" },
            { id: 2, src: "images/evidence2.png", caption: "Vehicle registered to subject - License plate redacted" },
            { id: 3, src: "images/Evidence3.png", caption: "Known associate meeting at undisclosed location" },
            { id: 4, src: "images/Evidence 4.png", caption: "Surveillance photo - Downtown district" },
            { id: 5, src: "images/Evidence5.png", caption: "Document fragment recovered from subject's residence" },
            { id: 6, src: "images/Evidence6.png", caption: "Subject entering warehouse - Industrial zone" },
            { id: 7, src: "images/Evidence7.png", caption: "Communication device found at drop point" },
            { id: 8, src: "images/Evidence8.png", caption: "Secondary location under surveillance" },
            { id: 9, src: "images/Evidence9.png", caption: "Financial transaction evidence" },
            { id: 10, src: "images/Evidence10.png", caption: "Subject with unidentified individual" },
            { id: 11, src: "images/Evidence11.png", caption: "Aerial surveillance - Property of interest" },
            { id: 12, src: "images/Evidence12.png", caption: "Evidence item recovered from scene" },
            { id: 13, src: "images/Evidence13.png", caption: "Timeline documentation - Key event" },
            { id: 14, src: "images/Evidence 14.png", caption: "Background investigation photo" },
            { id: 15, src: "images/Evidence15.png", caption: "Final surveillance capture - Current status: UNKNOWN" }
        ];

        // DOM elements
        const dossier = document.getElementById('dossier');
        const closeBtn = document.getElementById('closeBtn');
        const evidenceContainer = document.getElementById('evidenceContainer');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const lightboxClose = document.getElementById('lightboxClose');

        let isOpen = false;
        let photos = [];
        let activePhoto = null;
        let offsetX, offsetY;
        let highestZ = 1;

        // Generate random positions for photos
        function generatePhotoPositions() {
            const positions = [];
            const containerRect = evidenceContainer.getBoundingClientRect();
            const padding = 80;

            for (let i = 0; i < 15; i++) {
                positions.push({
                    x: padding + Math.random() * (containerRect.width - 200 - padding * 2),
                    y: padding + Math.random() * (containerRect.height - 200 - padding * 2),
                    rotation: (Math.random() - 0.5) * 30
                });
            }
            return positions;
        }

        // Create photo elements
        function createPhotos() {
            evidenceContainer.innerHTML = '';
            const positions = generatePhotoPositions();

            evidenceData.forEach((evidence, index) => {
                const photo = document.createElement('div');
                photo.className = 'photo';

                // Add random decorations
                if (Math.random() > 0.7) photo.classList.add('pinned');
                else if (Math.random() > 0.5) photo.classList.add('taped');

                photo.style.left = `${positions[index].x}px`;
                photo.style.top = `${positions[index].y}px`;
                photo.style.transform = `rotate(${positions[index].rotation}deg)`;
                photo.style.zIndex = index + 1;

                photo.innerHTML = `
          <div class="photo-inner">
            <img src="${evidence.src}" alt="Evidence ${evidence.id}" draggable="false">
          </div>
          <div class="photo-label">EVIDENCE #${evidence.id}</div>
        `;

                photo.dataset.id = evidence.id;
                photo.dataset.caption = evidence.caption;
                photo.dataset.src = evidence.src;
                photo.dataset.rotation = positions[index].rotation;

                evidenceContainer.appendChild(photo);
                photos.push(photo);

                // Event listeners
                photo.addEventListener('mousedown', startDrag);
                photo.addEventListener('click', handlePhotoClick);
            });
        }

        // Open/Close dossier
        function toggleDossier(e) {
            if (isOpen) return;

            isOpen = true;
            dossier.classList.add('open');

            setTimeout(() => {
                if (photos.length === 0) {
                    createPhotos();
                }
                animatePhotosIn();
            }, 300);
        }

        function closeDossier() {
            isOpen = false;
            dossier.classList.remove('open');
        }

        // Animate photos scattering in
        function animatePhotosIn() {
            photos.forEach((photo, index) => {
                photo.style.opacity = '0';
                photo.style.transform = `rotate(0deg) scale(0.5)`;

                setTimeout(() => {
                    photo.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    photo.style.opacity = '1';
                    photo.style.transform = `rotate(${photo.dataset.rotation}deg) scale(1)`;

                    setTimeout(() => {
                        photo.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
                    }, 400);
                }, index * 50);
            });
        }

        // Drag functionality
        let isDragging = false;
        let hasDragged = false;

        function startDrag(e) {
            if (e.button !== 0) return;

            activePhoto = e.currentTarget;
            isDragging = true;
            hasDragged = false;

            const rect = activePhoto.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            highestZ++;
            activePhoto.style.zIndex = highestZ;
            activePhoto.classList.add('dragging');

            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);

            e.preventDefault();
        }

        function drag(e) {
            if (!isDragging || !activePhoto) return;

            hasDragged = true;

            const containerRect = evidenceContainer.getBoundingClientRect();
            let newX = e.clientX - containerRect.left - offsetX;
            let newY = e.clientY - containerRect.top - offsetY;

            // Boundary constraints
            newX = Math.max(0, Math.min(newX, containerRect.width - 150));
            newY = Math.max(0, Math.min(newY, containerRect.height - 180));

            activePhoto.style.left = `${newX}px`;
            activePhoto.style.top = `${newY}px`;
        }

        function stopDrag(e) {
            if (activePhoto) {
                activePhoto.classList.remove('dragging');
                activePhoto.style.transform = `rotate(${activePhoto.dataset.rotation}deg)`;
            }

            isDragging = false;
            activePhoto = null;

            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }

        // Photo click to open lightbox
        function handlePhotoClick(e) {
            if (hasDragged) {
                hasDragged = false;
                return;
            }

            const photo = e.currentTarget;
            const caption = photo.dataset.caption;
            const src = photo.dataset.src;

            lightboxImage.innerHTML = `<img src="${src}" alt="Evidence">`;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
        }

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
        }

        // Event listeners
        dossier.querySelector('.folder-front').addEventListener('click', toggleDossier);
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDossier();
        });
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (lightbox.classList.contains('active')) {
                    closeLightbox();
                } else if (isOpen) {
                    closeDossier();
                }
            }
        });

        // Mission Sidebar Logic
        const missionSidebar = document.getElementById('missionSidebar');
        const missionTab = document.getElementById('missionTab');

        missionTab.addEventListener('click', () => {
            missionSidebar.classList.toggle('visible');
        });

        // Auto-open sidebar when dossier opens
        const originalToggleDossier = toggleDossier;
        toggleDossier = function (e) {
            originalToggleDossier(e);
            setTimeout(() => {
                missionSidebar.classList.add('visible');
            }, 800);
        };

        // Mission Data
        const missionDetails = {
            'st1-1': {
                title: 'FIND NAME',
                content: 'Search the evidence for any mention of the subject\'s full name. Look at documents, ID cards, or correspondence.'
            },
            'st1-2': {
                title: 'FIND DATE OF BIRTH',
                content: 'Locate a document that lists the subject\'s Date of Birth (Day and Month required). Check official records or personal notes.'
            },
            'st1-3': {
                title: 'FIND CITY',
                content: 'Identify the city where the subject currently resides. Look for addresses on mail, receipts, or location tags.'
            },
            'st2-1': {
                title: 'GATHER INTEL',
                content: 'Find at least 7 more pieces of information. Look for:<br>- Hobbies<br>- Daily Routine<br>- Places Visited<br>- Likes/Dislikes<br>- Family Members<br>- Financial Habits'
            },
            'st3-1': {
                title: 'RECORD EVIDENCE',
                content: 'Create a table in your exercise book with the following columns:<br>1. Image Number<br>2. What information does this image reveal?<br>3. Should this be public or private? Why?'
            },
            'st4-1': {
                title: 'BUILD PROFILE',
                content: 'Write 4-5 bullet points describing what kind of person John appears to be based ONLY on the information you found.'
            },
            'st4-2': {
                title: 'IDENTIFY RISKS',
                content: 'Choose three items from your table that should have stayed private. For each one, write one sentence explaining the risk.'
            }
        };

        // Modal Logic
        const missionModal = document.getElementById('missionModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        function openMissionModal(subtaskId) {
            const data = missionDetails[subtaskId];
            if (data) {
                modalTitle.textContent = data.title;
                modalBody.innerHTML = data.content;
                missionModal.classList.add('active');
            }
        }

        function closeMissionModal() {
            missionModal.classList.remove('active');
        }

        // Subtask Logic
        const taskDependencies = {
            'task1': ['st1-1', 'st1-2', 'st1-3'],
            'task2': ['st2-1'],
            'task3': ['st3-1'],
            'task4': ['st4-1', 'st4-2']
        };

        const taskOrder = ['task1', 'task2', 'task3', 'task4'];

        function toggleSubtask(taskId, subtaskId) {
            const subtask = document.getElementById(subtaskId);
            subtask.classList.toggle('completed');

            checkTaskProgress();
        }

        function checkTaskProgress() {
            let locked = false;

            taskOrder.forEach((taskId, index) => {
                const taskEl = document.getElementById(taskId);

                if (locked) {
                    taskEl.classList.add('locked');
                    taskEl.classList.remove('active');
                    return;
                }

                // Unlock this task
                taskEl.classList.remove('locked');
                taskEl.classList.add('active');

                // Check if this task is fully complete
                const subtasks = taskDependencies[taskId];
                const allComplete = subtasks.every(stId => document.getElementById(stId).classList.contains('completed'));

                if (!allComplete) {
                    locked = true; // Lock subsequent tasks
                }
            });
        }

    