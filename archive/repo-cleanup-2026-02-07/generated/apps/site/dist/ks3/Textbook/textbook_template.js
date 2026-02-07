/*
  TEXTBOOK TEMPLATE LOGIC
  - Handles parsing #rawContent into pages.
  - Floating controls for Reader Mode, Ruler, and Settings.
  - Settings:
    - Reader mode toggles html.reader-mode.
    - Size changes --font-size-base.
    - Colour modes apply html.cb-* classes.
  - Interactives:
    - toggleBit(), toggleTransistor(), binary conversion, practice checking.
  - Translation via MyMemory API.
*/

const rawContent = document.getElementById("rawContent");
const viewport = document.getElementById("bookViewport");
// Sidebar navigation elements
const sidebarNav = document.getElementById("sidebarNav");
const sidebarMenu = document.getElementById("sidebarMenu");
const unitBadge = document.getElementById("unitBadge");
const unitTitleEl = document.getElementById("unitTitle");
const a11yPanel = document.getElementById("a11yPanel");
const progressBar = document.getElementById("readingProgress");
const minimapContainer = document.getElementById("minimap");
let pages = [];
let currentPageIndex = 0;
let currentSize = "normal";
let isReaderMode = false;
let previousSize = null;
let isPanelOpen = false;
let sectionIndex = [];
let isSpreadMode = false;
let bookData = null; // Store loaded textbook data for sidebar generation
let lastRulerY = null;
let lastRulerTime = null;

const CONCEPT_ICON = `<svg class="icon" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
</svg>`;

const SKILLS_ICON = `<svg class="icon" viewBox="0 0 24 24">
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
</svg>`;

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function appendHtml(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    rawContent.appendChild(template.content);
}

function renderList(items, className) {
    if (!items || items.length === 0) return "";
    const listClass = className || "list-arrow";
    const rows = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    return `<ul class="${listClass}">${rows}</ul>`;
}

function renderParagraphs(paragraphs) {
    if (!paragraphs || paragraphs.length === 0) return "";
    return paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
}

function renderKeywordsTable(keywords) {
    if (!keywords || keywords.length === 0) return "";
    const rows = keywords
        .map(
            (item) =>
                `<tr><td class="term">${escapeHtml(item.term)}</td><td>${escapeHtml(
                    item.definition,
                )}</td></tr>`,
        )
        .join("");
    return `<div class="keywords-title">Keywords</div>
<table class="keywords-table">
    <tr><th>Keyword</th><th>Definition</th></tr>
    ${rows}
</table>`;
}

function renderFigures(lesson, fallbackSrc) {
    if (!lesson) return "";
    if (lesson.images && lesson.images.length) {
        return lesson.images
            .map((img) => {
                const src = img.src || fallbackSrc;
                const alt = escapeHtml(img.alt || img.caption || "Image");
                const caption = img.caption ? escapeHtml(img.caption) : "";
                return `<figure>
    <img src="${escapeHtml(src)}" alt="${alt}">
    ${caption ? `<figcaption>${caption}</figcaption>` : ""}
</figure>`;
            })
            .join("");
    }

    if (!lesson.imageBriefs || lesson.imageBriefs.length === 0) return "";
    return lesson.imageBriefs
        .map((brief) => {
            const caption = escapeHtml(brief);
            return `<figure>
    <img src="${escapeHtml(fallbackSrc)}" alt="${caption}">
    <figcaption>${caption}</figcaption>
</figure>`;
        })
        .join("");
}

function renderBox(title, innerHtml, className) {
    const boxClass = className || "box-key";
    return `<div class="${boxClass}">
    <div class="box-header">${escapeHtml(title)}</div>
    ${innerHtml}
</div>`;
}

function getTopicId(unitNumber, topicNumber) {
    const parts = String(topicNumber).split(".");
    const section = parts[1] || parts[0];
    return `unit-${unitNumber}-section-${section}`;
}

function getLessonId(unitNumber, lessonNumber) {
    const parts = String(lessonNumber).split(".");
    const section = parts[1] || parts[0];
    const sub = parts[2] || "1";
    return `unit-${unitNumber}-section-${section}-${sub}`;
}

function collectTopicKeywords(topic) {
    const seen = new Map();
    (topic.lessons || []).forEach((lesson) => {
        (lesson.keywords || []).forEach((keyword) => {
            const key = String(keyword.term || "").toLowerCase();
            if (!key || seen.has(key)) return;
            seen.set(key, keyword);
        });
    });
    return Array.from(seen.values());
}

function slugifyHeading(text) {
    return String(text || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function getUniqueId(base, usedIds) {
    let candidate = base || "section";
    let suffix = 1;
    while (usedIds.has(candidate)) {
        candidate = `${base}-${suffix}`;
        suffix += 1;
    }
    usedIds.add(candidate);
    return candidate;
}

function ensureSectionIds() {
    if (!rawContent) return;

    const usedIds = new Set();
    rawContent.querySelectorAll("[id]").forEach((el) => {
        if (el.id) usedIds.add(el.id);
    });

    const cover = rawContent.querySelector(".cover-page");
    if (cover && !cover.id) {
        cover.id = getUniqueId("book-cover", usedIds);
    }

    const headings = rawContent.querySelectorAll("h2, h3, h4");
    headings.forEach((heading, index) => {
        if (heading.id) return;
        const base = slugifyHeading(heading.textContent);
        const fallback = base || `section-${index + 1}`;
        heading.id = getUniqueId(fallback, usedIds);
    });
}

function buildRawContentFromData(data) {
    if (!data || !data.units) return;
    rawContent.innerHTML = "";

    const book = data.book || {};
    const units = data.units || [];
    const coverImage = book.coverImage || "/images/chapter-cover-placeholder.png";
    const logo = book.logo || "/images/Logo.png";

    appendHtml(`<div class="cover-page" id="book-cover">
    <img src="${escapeHtml(coverImage)}" alt="${escapeHtml(
        book.title || "Textbook cover image",
    )}" class="cover-image">
    <div class="cover-title-block">
        <div class="cover-chapter-number">${escapeHtml(
        book.coverLabel || "Textbook",
    )}</div>
        <h1 class="cover-title">${escapeHtml(book.title || "")}</h1>
        <div class="page-footer-brand-block">
            <div class="page-footer-brand">${escapeHtml(book.subtitle || "")}</div>
            <div class="page-footer-subtitle">${escapeHtml(
        book.subtitleLine2 || "",
    )}</div>
        </div>
    </div>
    <img src="${escapeHtml(logo)}" alt="St George's Logo" class="cover-logo">
</div>
<div class="page-break" data-sizes="all"></div>`);

    units.forEach((unit) => {
        const unitCover = unit.coverImage || coverImage;
        appendHtml(`<div class="cover-page" id="unit-${unit.number}-cover">
    <img src="${escapeHtml(unitCover)}" alt="Unit ${escapeHtml(
            unit.number,
        )} cover image" class="cover-image">
    <div class="cover-title-block">
        <div class="cover-chapter-number">Unit ${escapeHtml(unit.number)}</div>
        <h1 class="cover-title">${escapeHtml(unit.title || "")}</h1>
    </div>
    <img src="${escapeHtml(logo)}" alt="St George's Logo" class="cover-logo">
</div>
<div class="page-break" data-sizes="all"></div>`);

        appendHtml(`<div class="chapter-page-header" id="unit-${unit.number}">
    <div class="chapter-number-badge">${escapeHtml(unit.number)}</div>
    <h1 class="chapter-page-title">${escapeHtml(unit.title || "")}</h1>
</div>`);

        if (unit.overview) {
            appendHtml(renderBox("Unit overview", renderParagraphs([unit.overview])));
        }

        if (unit.objectives && unit.objectives.length) {
            appendHtml(
                renderBox("Unit objectives", renderList(unit.objectives, "list-arrow")),
            );
        }

        if (unit.concepts && unit.concepts.length) {
            let conceptHtml = `<div class="intro-section-title">${CONCEPT_ICON}Concepts Covered</div>`;
            conceptHtml += `<div class="intro-grid">`;
            unit.concepts.forEach((concept) => {
                conceptHtml += `<div class="concept-card">
    <div class="card-header">${escapeHtml(concept.name)}</div>
    <div class="card-context">${escapeHtml(concept.description || "")}</div>
    <div class="card-application"><strong>In this unit:</strong> ${escapeHtml(
                    concept.inUnit || "",
                )}</div>
</div>`;
            });
            conceptHtml += `</div>`;
            appendHtml(conceptHtml);
        }

        if (unit.skills && unit.skills.length) {
            let skillsHtml = `<div class="intro-section-title">${SKILLS_ICON}Skills Developed</div>`;
            skillsHtml += `<div class="skills-grid">`;
            unit.skills.forEach((skill) => {
                skillsHtml += `<div class="skill-card"><div class="skill-title">${escapeHtml(
                    skill,
                )}</div></div>`;
            });
            skillsHtml += `</div>`;
            appendHtml(skillsHtml);
        }

        if (unit.howToUse && unit.howToUse.length) {
            appendHtml(renderBox("How to use this book", renderList(unit.howToUse)));
        }

        if (unit.quickStart && unit.quickStart.length) {
            appendHtml(renderBox("Quick start checklist", renderList(unit.quickStart)));
        }

        if (unit.topics && unit.topics.length) {
            let learnHtml = `<div class="box-key">
    <div class="box-header">What you will learn</div>
    <div class="learning-objectives">`;
            unit.topics.forEach((topic) => {
                if (!topic.learningGoals || topic.learningGoals.length === 0) return;
                learnHtml += `<div class="learning-topic">${escapeHtml(
                    topic.number,
                )} ${escapeHtml(topic.title)}</div>`;
                learnHtml += `<ul class="learning-sublist">`;
                topic.learningGoals.forEach((goal) => {
                    learnHtml += `<li>${escapeHtml(goal)}</li>`;
                });
                learnHtml += `</ul>`;
            });
            learnHtml += `</div></div>`;
            appendHtml(learnHtml);
        }

        appendHtml(`<div class="page-break" data-sizes="all"></div>`);

        (unit.topics || []).forEach((topic) => {
            const topicId = getTopicId(unit.number, topic.number);
            appendHtml(`<h2 id="${topicId}">${escapeHtml(
                topic.number,
            )} ${escapeHtml(topic.title)}</h2>`);

            if (topic.summary) {
                appendHtml(renderParagraphs([topic.summary]));
            }

            if (topic.learningGoals && topic.learningGoals.length) {
                appendHtml(`<h4>Learning goals</h4>`);
                appendHtml(renderList(topic.learningGoals, "list-arrow"));
            }

            const topicKeywords = collectTopicKeywords(topic);
            if (topicKeywords.length) {
                appendHtml(renderKeywordsTable(topicKeywords));
            }

            (topic.lessons || []).forEach((lesson) => {
                const lessonId = getLessonId(unit.number, lesson.number);
                appendHtml(`<h3 id="${lessonId}">${escapeHtml(
                    lesson.number,
                )} ${escapeHtml(lesson.title)}</h3>`);

                if (lesson.coreContent && lesson.coreContent.length) {
                    appendHtml(renderParagraphs(lesson.coreContent));
                }

                if (lesson.keyReminders && lesson.keyReminders.length) {
                    appendHtml(`<h4>Key reminders</h4>`);
                    appendHtml(renderList(lesson.keyReminders, "list-arrow"));
                }

                if (lesson.tryIt && lesson.tryIt.length) {
                    appendHtml(`<h4>Try it</h4>`);
                    appendHtml(renderList(lesson.tryIt, "list-arrow"));
                }

                if (lesson.quickCheck && lesson.quickCheck.length) {
                    appendHtml(`<h4>Quick check</h4>`);
                    appendHtml(renderList(lesson.quickCheck, "list-arrow"));
                }

                if (
                    (lesson.images && lesson.images.length) ||
                    (lesson.imageBriefs && lesson.imageBriefs.length)
                ) {
                    appendHtml(`<h4>Images</h4>`);
                    appendHtml(renderFigures(lesson, coverImage));
                }

                if (lesson.didYouKnow) {
                    appendHtml(
                        renderBox(
                            "Did You Know?",
                            `<p>${escapeHtml(lesson.didYouKnow)}</p>`,
                            "box-did-you-know",
                        ),
                    );
                }

                if (lesson.commonPitfalls && lesson.commonPitfalls.length) {
                    appendHtml(
                        renderBox(
                            "Common Pitfalls",
                            renderList(lesson.commonPitfalls, "list-arrow"),
                            "box-common-mistake",
                        ),
                    );
                }

                if (lesson.examTip) {
                    appendHtml(
                        renderBox(
                            "Exam Tip",
                            `<p>${escapeHtml(lesson.examTip)}</p>`,
                            "box-exam-tip",
                        ),
                    );
                }

                if (lesson.svgBriefs && lesson.svgBriefs.length) {
                    appendHtml(`<!-- SVG briefs: ${lesson.svgBriefs
                        .map((item) => escapeHtml(item))
                        .join(" | ")} -->`);
                }

                if (lesson.interactiveIdea) {
                    appendHtml(
                        `<!-- Interactive idea: ${escapeHtml(
                            lesson.interactiveIdea,
                        )} -->`,
                    );
                }

                appendHtml(`<div class="page-break" data-sizes="all"></div>`);
            });
        });

        if (unit.summary && unit.summary.whatYouLearned) {
            const summaryItems = unit.summary.whatYouLearned.map(
                (item) => `<li><strong>Key takeaway:</strong> ${escapeHtml(item)}</li>`,
            );
            appendHtml(
                `<div class="box-key">
    <div class="box-header">Chapter Summary</div>
    <ul class="list-arrow">${summaryItems.join("")}</ul>
</div>`,
            );
        }

        if (unit.summary && unit.summary.keyHabits && unit.summary.keyHabits.length) {
            appendHtml(
                renderBox(
                    "Key habits to maintain",
                    renderList(unit.summary.keyHabits, "list-arrow"),
                ),
            );
        }

        if (unit.summary && unit.summary.lookingAhead) {
            appendHtml(renderBox("Looking ahead", renderParagraphs([unit.summary.lookingAhead])));
        }

        if (unit.summary && unit.summary.revisionChecklist && unit.summary.revisionChecklist.length) {
            appendHtml(
                renderBox(
                    "Revision checklist",
                    renderList(unit.summary.revisionChecklist, "list-arrow"),
                ),
            );
        }

        if (unit.summary && unit.summary.finalExamTips && unit.summary.finalExamTips.length) {
            appendHtml(
                renderBox(
                    "Final exam tips",
                    renderList(unit.summary.finalExamTips, "list-arrow"),
                    "box-exam-tip",
                ),
            );
        }

        appendHtml(`<div class="page-break" data-sizes="all"></div>`);
    });
}

async function loadTextbookContent() {
    const dataSrc = document.documentElement.dataset.textbookContent;
    if (!dataSrc) return;
    try {
        const response = await fetch(dataSrc);
        if (!response.ok) {
            throw new Error(`Failed to load ${dataSrc}`);
        }
        const data = await response.json();
        bookData = data; // Store for sidebar generation
        buildRawContentFromData(data);
        ensureSectionIds();
        generateSidebarNav(); // Build sidebar after content is loaded
    } catch (err) {
        console.warn("Textbook content load failed:", err);
    }
}

// Spread Mode Function
function setSpreadMode(enabled, btn) {
    isSpreadMode = enabled;
    if (btn) {
        btn.parentElement
            .querySelectorAll(".option-btn")
            .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
    }

    // Manage spread-active class on body for sidebar auto-collapse
    if (enabled) {
        document.body.classList.add("spread-active");
        document.body.classList.remove("sidebar-expanded");
    } else {
        document.body.classList.remove("spread-active");
        document.body.classList.remove("sidebar-expanded");
    }

    updateView();
}

// Toggle sidebar visibility in spread mode
function toggleSidebar() {
    if (document.body.classList.contains("spread-active")) {
        document.body.classList.toggle("sidebar-expanded");
    } else {
        // In normal mode, toggle manual collapse
        document.body.classList.toggle("sidebar-collapsed");
    }
}

// Manually collapse the sidebar (from sidebar button)
function collapseSidebar() {
    if (document.body.classList.contains("spread-active")) {
        // In spread mode, just remove expanded state
        document.body.classList.remove("sidebar-expanded");
    } else {
        // In normal mode, add collapsed state
        document.body.classList.add("sidebar-collapsed");
    }
}

function shouldBreakHere(breakElement) {
    const sizes = breakElement.dataset.sizes || "";
    if (sizes === "all") return true;
    const sizeList = sizes.split(/\s+/);
    if (sizeList.includes(currentSize)) return true;
    if (isReaderMode && sizeList.includes("reader")) return true;
    return false;
}

function renderPages() {
    viewport.innerHTML = "";
    pages = [];

    const allElements = Array.from(rawContent.children);
    if (allElements.length === 0) return;

    let currentPageElements = [];
    let pageNumber = 0; // Start at 0, will be adjusted for front matter
    let contentPageNumber = 0; // Actual numbered pages start after front matter

    allElements.forEach((el, index) => {
        if (el.classList.contains("page-break")) {
            if (shouldBreakHere(el) && currentPageElements.length > 0) {
                // Smart page break: check for orphaned headings
                // If the last element(s) are headings with no content after, push to next page
                let elementsToMove = [];
                for (let i = currentPageElements.length - 1; i >= 0; i--) {
                    const lastEl = currentPageElements[i];
                    const tagName = lastEl.tagName;
                    if (tagName === "H2" || tagName === "H3" || tagName === "H4") {
                        // This heading is orphaned - move it to next page
                        elementsToMove.unshift(currentPageElements.pop());
                    } else if (lastEl.hasAttribute && lastEl.hasAttribute("data-keep-with-next")) {
                        // This element should stay with the next - move it
                        elementsToMove.unshift(currentPageElements.pop());
                    } else {
                        break; // Stop checking once we hit a non-heading content element
                    }
                }

                // Only create page if there's content left
                if (currentPageElements.length > 0) {
                    const isCover = currentPageElements.some(e => e.classList && e.classList.contains("cover-page"));
                    const isContents = currentPageElements.some(e => e.classList && e.classList.contains("contents-page"));

                    if (isCover) {
                        createPage(currentPageElements, null, "cover");
                    } else if (isContents) {
                        createPage(currentPageElements, null, "contents");
                    } else {
                        contentPageNumber++;
                        createPage(currentPageElements, contentPageNumber, "content");
                    }
                    pageNumber++;
                }

                // Start next page with moved elements
                currentPageElements = elementsToMove;
            }
        } else {
            currentPageElements.push(el.cloneNode(true));
        }
    });

    if (currentPageElements.length > 0) {
        const isCover = currentPageElements.some(e => e.classList && e.classList.contains("cover-page"));
        const isContents = currentPageElements.some(e => e.classList && e.classList.contains("contents-page"));

        if (isCover) {
            createPage(currentPageElements, null, "cover");
        } else if (isContents) {
            createPage(currentPageElements, null, "contents");
        } else {
            contentPageNumber++;
            createPage(currentPageElements, contentPageNumber, "content");
        }
    }

    if (currentPageIndex >= pages.length) {
        currentPageIndex = Math.max(0, pages.length - 1);
    }

    updateView();
    reattachInteractiveHandlers();
}

function createPage(elements, pageNumber, pageType) {
    const page = document.createElement("div");
    page.className = "page";
    page.dataset.pageType = pageType;

    if (pageNumber) {
        page.id = `page-${pageNumber}`;
    } else {
        page.id = `page-${pageType}`;
    }

    // Add content elements
    elements.forEach((el) => page.appendChild(el));

    // Add footer to content pages (not cover or contents)
    if (pageType === "content") {
        const footer = document.createElement("div");
        footer.className = "page-footer";

        // Center section: line - brand block - line
        const center = document.createElement("div");
        center.className = "page-footer-center";

        const leftLine = document.createElement("div");
        leftLine.className = "page-footer-line";

        const brandBlock = document.createElement("div");
        brandBlock.className = "page-footer-brand-block";

        const brand = document.createElement("div");
        brand.className = "page-footer-brand";
        brand.textContent = "ST.GEORGE'S";

        const subtitle = document.createElement("div");
        subtitle.className = "page-footer-subtitle";
        subtitle.textContent = "The British International School";

        brandBlock.appendChild(brand);
        brandBlock.appendChild(subtitle);

        const rightLine = document.createElement("div");
        rightLine.className = "page-footer-line";

        center.appendChild(leftLine);
        center.appendChild(brandBlock);
        center.appendChild(rightLine);

        // Left section: unit number and name
        const unitNum = document.documentElement.dataset.unitNumber || "X";
        const unitName = document.documentElement.dataset.unitName || "Unit Title";

        const left = document.createElement("div");
        left.className = "page-footer-left";

        const unitBox = document.createElement("div");
        unitBox.className = "page-footer-unit-box";
        unitBox.textContent = unitNum;
        left.appendChild(unitBox);

        const unitTitle = document.createElement("div");
        unitTitle.className = "page-footer-unit-title";
        unitTitle.textContent = unitName;
        left.appendChild(unitTitle);

        // Right section: logo + page number
        const right = document.createElement("div");
        right.className = "page-footer-right";

        const logo = document.createElement("img");
        const logoSrc = document.documentElement.dataset.logoSrc || "/images/Logo.png";
        logo.src = logoSrc;
        logo.alt = "St George's";
        logo.className = "page-footer-logo";

        const pageNum = document.createElement("span");
        pageNum.className = "page-footer-page-num";
        pageNum.textContent = pageNumber;

        right.appendChild(logo);
        right.appendChild(pageNum);

        footer.appendChild(left);
        footer.appendChild(center);
        footer.appendChild(right);
        page.appendChild(footer);
    }

    viewport.appendChild(page);
    pages.push({
        element: page,
        pageNumber: pageNumber,
        pageType: pageType,
    });
}

function updateView() {
    pages.forEach((p) => {
        p.element.style.display = "none";
        p.element.classList.remove("active");
    });

    if (isSpreadMode) {
        viewport.classList.add("spread-mode");
        const activeDisplay = "flex";
        // Ensure even start index for spreads if > 0? No, just render i and i+1
        // Usually cover is 0. Spread 1-2, 3-4.
        // If we are at 0 (cover), show 0.
        // If we are at 1, show 1 and 2.

        // Simple logic: show current and next
        if (pages[currentPageIndex]) {
            pages[currentPageIndex].element.style.display = activeDisplay;
            pages[currentPageIndex].element.classList.add("active");
        }
        if (pages[currentPageIndex + 1]) {
            pages[currentPageIndex + 1].element.style.display = activeDisplay;
            pages[currentPageIndex + 1].element.classList.add("active");
        }
    } else {
        viewport.classList.remove("spread-mode");
        if (pages[currentPageIndex]) {
            pages[currentPageIndex].element.style.display = "block";
            pages[currentPageIndex].element.classList.add("active");
        }
    }

    syncSpreadHeights();

    // Update reading progress bar
    if (progressBar && pages.length > 0) {
        const progress = ((currentPageIndex + 1) / pages.length) * 100;
        progressBar.style.width = progress + "%";
    }

    generateNav();
    generateMinimap();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function syncSpreadHeights() {
    const pageNodes = viewport.querySelectorAll(".page");
    pageNodes.forEach((page) => {
        page.style.minHeight = "";
    });

    if (!isSpreadMode) return;

    const activePages = Array.from(
        viewport.querySelectorAll(".page.active"),
    );
    if (activePages.length < 2) return;

    requestAnimationFrame(() => {
        activePages.forEach((page) => {
            page.style.minHeight = "";
        });

        const heights = activePages.map(
            (page) => page.getBoundingClientRect().height,
        );
        const maxHeight = Math.max(...heights);
        activePages.forEach((page) => {
            page.style.minHeight = `${maxHeight}px`;
        });
    });
}

function generateNav() {
    // Bottom nav removed - navigation now in sidebar
    // This function kept for compatibility but does nothing
}

function createSidebarTopic({ title, number, targetId, expanded }) {
    const topicDiv = document.createElement('div');
    topicDiv.className = 'sidebar-topic';
    if (expanded) topicDiv.classList.add('expanded');

    const header = document.createElement('div');
    header.className = 'sidebar-topic-header';

    const label = document.createElement('span');
    if (number) {
        const numberSpan = document.createElement('span');
        numberSpan.className = 'topic-number';
        numberSpan.textContent = number;
        label.appendChild(numberSpan);
    }

    const titleSpan = document.createElement('span');
    titleSpan.className = 'topic-title';
    titleSpan.textContent = title;
    label.appendChild(titleSpan);

    const arrow = document.createElement('span');
    arrow.className = 'topic-arrow';
    arrow.textContent = '▶';

    header.appendChild(label);
    header.appendChild(arrow);

    header.addEventListener('click', () => {
        topicDiv.classList.toggle('expanded');
    });

    arrow.addEventListener('click', (event) => {
        event.stopPropagation();
        topicDiv.classList.toggle('expanded');
    });

    if (targetId) {
        label.addEventListener('click', (event) => {
            event.stopPropagation();
            navigateToSection(targetId);
        });
    }

    const lessonsDiv = document.createElement('div');
    lessonsDiv.className = 'sidebar-lessons';

    topicDiv.appendChild(header);
    topicDiv.appendChild(lessonsDiv);

    return { topicDiv, lessonsDiv };
}

// Generate collapsible sidebar navigation from bookData (JSON-based)
function generateSidebarNav() {
    if (!sidebarMenu || !bookData) return;

    sidebarMenu.innerHTML = '';
    const units = bookData.units || [];
    if (units.length === 0) return;

    // For now, use first unit (single unit textbook)
    const unit = units[0];

    // Update unit header
    if (unitBadge) unitBadge.textContent = unit.number || '1';
    if (unitTitleEl) unitTitleEl.textContent = unit.title || 'Unit Title';

    const cover = rawContent ? rawContent.querySelector('.cover-page') : null;
    if (cover && cover.id) {
        const coverTitle = (bookData.book && bookData.book.title) || 'Cover';
        const coverTopic = createSidebarTopic({
            title: 'Title Slide',
            targetId: cover.id,
            expanded: true,
        });
        const coverLink = document.createElement('div');
        coverLink.className = 'sidebar-lesson';
        coverLink.textContent = coverTitle;
        coverLink.onclick = () => {
            navigateToSection(cover.id);
            document.querySelectorAll('.sidebar-lesson').forEach(l => l.classList.remove('active'));
            coverLink.classList.add('active');
        };
        coverTopic.lessonsDiv.appendChild(coverLink);
        sidebarMenu.appendChild(coverTopic.topicDiv);
    }

    // Build collapsible topic menu
    (unit.topics || []).forEach((topic, topicIndex) => {
        const topicId = getTopicId(unit.number, topic.number);
        const topicGroup = createSidebarTopic({
            title: String(topic.title || ''),
            number: String(topic.number || ''),
            targetId: topicId,
            expanded: topicIndex === 0,
        });

        (topic.lessons || []).forEach((lesson, lessonIndex) => {
            const lessonLink = document.createElement('div');
            lessonLink.className = 'sidebar-lesson';
            lessonLink.innerHTML = `<span class="lesson-number">${escapeHtml(lesson.number)}</span> ${escapeHtml(lesson.title)}`;
            lessonLink.onclick = () => {
                // Find the page containing this lesson and navigate to it
                const lessonId = getLessonId(unit.number, lesson.number);
                navigateToSection(lessonId);
                // Mark this lesson as active
                document.querySelectorAll('.sidebar-lesson').forEach(l => l.classList.remove('active'));
                lessonLink.classList.add('active');
            };
            topicGroup.lessonsDiv.appendChild(lessonLink);
        });

        sidebarMenu.appendChild(topicGroup.topicDiv);
    });
}

// Generate sidebar navigation from HTML heading hierarchy in #rawContent
// H2 = Topics, H3 = Lessons/Sub-sections
function generateSidebarFromHTML() {
    if (!sidebarMenu || !rawContent) return;

    sidebarMenu.innerHTML = '';

    // Get unit info from data attributes
    const unitNum = document.documentElement.dataset.unitNumber || 'X';
    const unitName = document.documentElement.dataset.unitName || 'Unit Title';

    // Update sidebar header
    if (unitBadge) unitBadge.textContent = unitNum;
    if (unitTitleEl) unitTitleEl.textContent = unitName;

    const cover = rawContent.querySelector('.cover-page');
    if (cover && cover.id) {
        const coverTopic = createSidebarTopic({
            title: 'Title Slide',
            targetId: cover.id,
            expanded: true,
        });
        const coverLink = document.createElement('div');
        coverLink.className = 'sidebar-lesson';
        coverLink.textContent = 'Cover';
        coverLink.onclick = () => {
            navigateToSection(cover.id);
            document.querySelectorAll('.sidebar-lesson').forEach(l => l.classList.remove('active'));
            coverLink.classList.add('active');
        };
        coverTopic.lessonsDiv.appendChild(coverLink);
        sidebarMenu.appendChild(coverTopic.topicDiv);
    }

    // Find all headings in rawContent
    const allHeadings = rawContent.querySelectorAll('h2, h3, h4');
    if (allHeadings.length === 0) return;

    // Build topic/lesson structure from headings
    // H2 = Topics (collapsible sections)
    // H3 = Lessons (clickable items within topics)
    // H4 = Sub-lessons (optional, nested within lessons)

    let currentTopicDiv = null;
    let currentLessonsDiv = null;
    let topicCount = 0;

    allHeadings.forEach((heading) => {
        const headingText = heading.textContent.trim();
        const headingId = heading.id || '';

        // Skip empty headings
        if (!headingText) return;

        // Parse section number if present (e.g., "X.1 Topic Title" or "1.1 Topic Title")
        const numberMatch = headingText.match(/^(\d+\.?\d*\.?\d*)\s+(.*)$/);
        const sectionNumber = numberMatch ? numberMatch[1] : '';
        const sectionTitle = numberMatch ? numberMatch[2] : headingText;

        if (heading.tagName === 'H2') {
            // New topic (collapsible section)
            topicCount++;
            const topicGroup = createSidebarTopic({
                title: sectionTitle,
                number: sectionNumber,
                targetId: headingId,
                expanded: topicCount === 1,
            });
            currentTopicDiv = topicGroup.topicDiv;
            currentLessonsDiv = topicGroup.lessonsDiv;
            sidebarMenu.appendChild(currentTopicDiv);
        } else if (heading.tagName === 'H3') {
            // Lesson/sub-section within current topic
            if (!currentLessonsDiv) {
                // No parent topic yet - create a default container
                const topicGroup = createSidebarTopic({
                    title: 'Sections',
                    expanded: true,
                });
                currentTopicDiv = topicGroup.topicDiv;
                currentLessonsDiv = topicGroup.lessonsDiv;
                sidebarMenu.appendChild(currentTopicDiv);
            }

            const lessonLink = document.createElement('div');
            lessonLink.className = 'sidebar-lesson';
            lessonLink.innerHTML = `
                ${sectionNumber ? `<span class="lesson-number">${escapeHtml(sectionNumber)}</span>` : ''}
                ${escapeHtml(sectionTitle)}
            `;

            if (headingId) {
                lessonLink.onclick = () => {
                    navigateToSection(headingId);
                    // Mark as active
                    document.querySelectorAll('.sidebar-lesson').forEach(l => l.classList.remove('active'));
                    lessonLink.classList.add('active');
                };
            }

            currentLessonsDiv.appendChild(lessonLink);
        } else if (heading.tagName === 'H4') {
            // Sub-lesson (indented within lessons)
            if (!currentLessonsDiv) return;

            const subLessonLink = document.createElement('div');
            subLessonLink.className = 'sidebar-lesson sidebar-sublesson';
            subLessonLink.innerHTML = `
                ${sectionNumber ? `<span class="lesson-number">${escapeHtml(sectionNumber)}</span>` : ''}
                ${escapeHtml(sectionTitle)}
            `;

            if (headingId) {
                subLessonLink.onclick = () => {
                    navigateToSection(headingId);
                    document.querySelectorAll('.sidebar-lesson').forEach(l => l.classList.remove('active'));
                    subLessonLink.classList.add('active');
                };
            }

            currentLessonsDiv.appendChild(subLessonLink);
        }
    });
}

// Navigate to a section by ID
function navigateToSection(sectionId) {
    // Find the page containing this section
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i].element;
        if (page.querySelector('#' + sectionId)) {
            goToPage(i);
            // Scroll to the element within the page after navigation
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
            return;
        }
    }
}

function generateMinimap() {
    if (!minimapContainer) return;
    minimapContainer.innerHTML = "";

    // Only show minimap if we have content pages
    const contentPages = pages.filter(p => p.pageType === "content");
    if (contentPages.length === 0) return;

    pages.forEach((page, i) => {
        const thumb = document.createElement("div");
        thumb.className = "minimap-page";
        if (i === currentPageIndex) {
            thumb.classList.add("current");
        }

        // Show page number (or type indicator for cover/contents)
        if (page.pageType === "cover") {
            thumb.textContent = "C";
        } else if (page.pageType === "contents") {
            thumb.textContent = "T";
        } else {
            thumb.textContent = page.pageNumber || "";
        }

        thumb.onclick = () => goToPage(i);
        minimapContainer.appendChild(thumb);
    });
}

function goToPage(index) {
    if (index < 0) index = 0;
    if (index >= pages.length) index = pages.length - 1;

    // If spread mode, try to align to covers? 
    // If we want cover alone (0), then 1-2, 3-4.
    // If index is 1, it's fine. If index is 2, it should be 1-2? Or 3-4?
    // Let's stick to simple "starts at index" for now to avoid complexity unless user complains.
    // Actually, widespread convention: 0 is cover. 1 is left, 2 is right (in physical book 1 is usually right).
    // Let's just allow free navigation for now.

    currentPageIndex = index;
    updateView();
}

function toggleReaderMode() {
    isReaderMode = !isReaderMode;
    document.documentElement.classList.toggle("reader-mode", isReaderMode);

    if (isReaderMode && currentSize === "normal") {
        const computedFontSize = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
                "--font-size-base",
            ),
        );
        if (computedFontSize <= 18.5) {
            previousSize = currentSize;
            setSize("large");
            return;
        }
    }

    if (!isReaderMode && previousSize) {
        const restoreSize = previousSize;
        previousSize = null;
        setSize(restoreSize);
        return;
    }

    updateRulerHeight();
    renderPages();
}

function setActiveSizeButton(size) {
    if (!a11yPanel) return;
    const buttons = a11yPanel.querySelectorAll(
        ".panel-section .option-btn[data-size]",
    );
    buttons.forEach((button) => {
        button.classList.toggle("active", button.dataset.size === size);
    });
}

function setSize(size, btn) {
    setActiveSizeButton(size);

    currentSize = size;

    let val = "18px";
    if (size === "large") val = "22px";
    if (size === "xl") val = "26px";

    document.documentElement.style.setProperty("--font-size-base", val);
    updateRulerHeight();
    renderPages();
}

function updateRulerHeight() {
    const root = document.documentElement;
    const fontSize = getComputedStyle(root).getPropertyValue(
        "--font-size-base",
    );
    const lineHeight = getComputedStyle(root).getPropertyValue(
        "--line-height",
    );

    const fontSizePx = parseFloat(fontSize);
    const lineHeightNum = parseFloat(lineHeight);
    const rulerHeight = fontSizePx * lineHeightNum * 1.25;

    root.style.setProperty("--ruler-height", rulerHeight + "px");
}





function togglePanel() {
    // Legacy function - calls new toggleSettingsPanel
    toggleSettingsPanel();
}

function toggleSettingsPanel() {
    isPanelOpen = !isPanelOpen;
    a11yPanel.classList.toggle("expanded", isPanelOpen);
    document.body.classList.toggle("panel-open", isPanelOpen);
}

function toggleRuler() {
    const ruler = document.getElementById("readingRuler");
    const isActive = ruler.classList.toggle("active");
    viewport.classList.toggle("ruler-active", isActive);
    if (isActive) {
        updateRulerHeight();
        resetRulerMotion();
        const viewportRect = updateRulerBounds(ruler);
        if (viewportRect) {
            const rulerHeight = ruler.offsetHeight;
            const centerY = viewportRect.top + viewportRect.height / 2;
            ruler.style.top = centerY - rulerHeight / 2 + "px";
        }
        viewport.addEventListener("mousemove", moveRuler);
        viewport.addEventListener("mouseleave", resetRulerMotion);
    } else {
        viewport.removeEventListener("mousemove", moveRuler);
        viewport.removeEventListener("mouseleave", resetRulerMotion);
    }
}

function resetRulerMotion() {
    lastRulerY = null;
    lastRulerTime = null;
}

function updateRulerBounds(ruler) {
    if (!viewport) return null;
    const viewportRect = viewport.getBoundingClientRect();
    ruler.style.left = `${viewportRect.left}px`;
    ruler.style.width = `${viewportRect.width}px`;
    return viewportRect;
}

function moveRuler(e) {
    const ruler = document.getElementById("readingRuler");
    const viewportRect = updateRulerBounds(ruler);
    if (!viewportRect) return;

    const rulerHeight = ruler.offsetHeight;
    const minY = viewportRect.top + rulerHeight / 2;
    const maxY = viewportRect.bottom - rulerHeight / 2;
    const rawY = e.clientY;
    const clampedY = Math.min(Math.max(rawY, minY), maxY);
    ruler.style.top = clampedY - rulerHeight / 2 + "px";

    const now = performance.now();
    if (lastRulerY !== null && lastRulerTime !== null) {
        const dy = rawY - lastRulerY;
        const dt = now - lastRulerTime;
        if (dt > 0) {
            const velocity = dy / dt;
            const baseDelta = velocity * 30;
            const speed = Math.abs(velocity);
            const boostThreshold = 1.2;
            const maxBase = 35;
            let maxDelta = maxBase;

            if (speed > boostThreshold) {
                const extra = Math.min(200, (speed - boostThreshold) * 120);
                maxDelta = maxBase + extra;
            }

            const scrollDelta = Math.max(
                -maxDelta,
                Math.min(maxDelta, baseDelta),
            );
            if (Math.abs(scrollDelta) > 0.5) {
                window.scrollBy({ top: scrollDelta, behavior: "auto" });
            }
        }
    }

    lastRulerY = rawY;
    lastRulerTime = now;
}

function setColourMode(mode, btn) {
    document.documentElement.classList.remove(
        "cb-red-green",
        "cb-blue-yellow",
        "cb-mono",
    );
    btn.parentElement
        .querySelectorAll(".option-btn")
        .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    if (mode !== "none") {
        document.documentElement.classList.add("cb-" + mode);
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
});

async function translateText(text, targetLang) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text,
    )}&langpair=en|${targetLang}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.responseStatus === 200
            ? data.responseData.translatedText
            : null;
    } catch (e) {
        return null;
    }
}

document.addEventListener("mouseup", function (e) {
    setTimeout(() => {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        const bubble = document.getElementById("translateBubble");

        if (text.length > 0 && !e.target.closest("#translateBubble")) {
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            bubble.style.top = rect.top + window.scrollY - 60 + "px";
            bubble.style.left = rect.left + rect.width / 2 + "px";
            bubble.classList.add("visible");
            bubble.dataset.text = text;
            document.getElementById("bubbleText").textContent = "Translate";
            document.getElementById("bubbleResult").classList.remove("visible");
        } else if (!e.target.closest("#translateBubble")) {
            bubble.classList.remove("visible");
        }
    }, 10);
});

async function translateSelection() {
    const text = document.getElementById("translateBubble").dataset.text;
    const lang = document.getElementById("globalLangSelect").value;
    document.getElementById("bubbleText").textContent = "...";
    const res = await translateText(text, lang);
    const resultDiv = document.getElementById("bubbleResult");
    resultDiv.textContent = res || "Error";
    resultDiv.classList.add("visible");
    document.getElementById("bubbleText").textContent = "Translate";
}

function openDef(term, def) {
    document.getElementById("modalTerm").innerText = term;
    document.getElementById("modalDef").innerText = def;
    document.getElementById("defModal").style.display = "flex";
}

function closeModal(e) {
    if (e.target.id === "defModal") {
        document.getElementById("defModal").style.display = "none";
    }
}

function closeModalBtn() {
    document.getElementById("defModal").style.display = "none";
}



document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

    const step = isSpreadMode ? 2 : 1;

    if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPage(currentPageIndex - step);
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToPage(currentPageIndex + step);
    } else if (e.key === "Home") {
        e.preventDefault();
        goToPage(0);
    } else if (e.key === "End") {
        e.preventDefault();
        goToPage(pages.length - 1);
    } else if (e.key === "Escape" && isPanelOpen) {
        togglePanel();
    }
});

// Interactive Binary Functions
function reattachInteractiveHandlers() {
    // Reattach click handlers for clickable bits
    document.querySelectorAll(".binary-cell--clickable").forEach((cell) => {
        cell.onclick = function () {
            toggleBit(this);
        };
    });

    // Reattach transistor switch
    const transistorSwitch = document.getElementById("transistorSwitch");
    if (transistorSwitch) {
        transistorSwitch.onclick = toggleTransistor;
    }

    // Reattach box-extend handlers
    document.querySelectorAll(".box-extend__header").forEach((header) => {
        header.onclick = function () {
            this.parentElement.classList.toggle("open");
        };
    });

    // Reattach keyword link handlers
    document.querySelectorAll(".keyword-link").forEach((link) => {
        const term = link.textContent;
        const onclick = link.getAttribute("onclick");
        if (onclick) {
            // Extract the openDef call parameters
            const match = onclick.match(/openDef\('([^']+)',\s*'([^']+)'\)/);
            if (match) {
                link.onclick = function () {
                    openDef(match[1], match[2]);
                };
            }
        }
    });

}

function toggleBit(cell) {
    const isOn = cell.classList.contains("binary-cell--on");

    if (isOn) {
        cell.classList.remove("binary-cell--on");
        cell.classList.add("binary-cell--off");
        cell.textContent = "0";
    } else {
        cell.classList.remove("binary-cell--off");
        cell.classList.add("binary-cell--on");
        cell.textContent = "1";
    }

    updateBinaryResult();
}

function updateBinaryResult() {
    const cells = document.querySelectorAll(
        "#clickableBits .binary-cell--clickable",
    );
    let total = 0;

    cells.forEach((cell) => {
        if (cell.classList.contains("binary-cell--on")) {
            total += parseInt(cell.dataset.value);
        }
    });

    const resultEl = document.getElementById("binaryResult");
    if (resultEl) {
        resultEl.innerHTML = `Denary value: <strong>${total}</strong>`;
    }
}

function toggleTransistor() {
    const switchEl = document.getElementById("transistorSwitch");
    const valueEl = document.getElementById("transistorValue");
    const descEl = document.getElementById("transistorDesc");

    if (!switchEl || !valueEl || !descEl) return;

    const isOn = switchEl.classList.contains("on");

    if (isOn) {
        switchEl.classList.remove("on");
        valueEl.textContent = "0";
        descEl.innerHTML =
            "<strong>OFF state:</strong> No electricity is flowing. The transistor represents the binary digit <strong>0</strong>.";
    } else {
        switchEl.classList.add("on");
        valueEl.textContent = "1";
        descEl.innerHTML =
            "<strong>ON state:</strong> Electricity is flowing! The transistor represents the binary digit <strong>1</strong>.";
    }
}

function convertToBinary() {
    const input = document.getElementById("denaryInput");
    const output = document.getElementById("binaryOutput");
    const stepsEl = document.getElementById("conversionSteps");

    if (!input || !output) return;

    const num = parseInt(input.value);

    if (isNaN(num) || num < 0 || num > 255) {
        output.textContent = "Binary: Please enter a number between 0 and 255";
        if (stepsEl) stepsEl.style.display = "none";
        return;
    }

    const binary = num.toString(2).padStart(8, "0");
    output.innerHTML = `Binary: <strong>${binary}</strong>`;

    // Show steps
    if (stepsEl) {
        let remaining = num;
        const placeValues = [128, 64, 32, 16, 8, 4, 2, 1];
        let stepsHtml =
            '<div class="step-breakdown-title">Step-by-step breakdown:</div>';

        placeValues.forEach((val) => {
            if (val <= remaining) {
                stepsHtml += `<div class="step-item">${val} ≤ ${remaining}? <strong>Yes</strong> → Write 1, remaining: ${remaining} - ${val} = <strong>${remaining - val}</strong></div>`;
                remaining -= val;
            } else {
                stepsHtml += `<div class="step-item">${val} ≤ ${remaining}? <strong>No</strong> → Write 0</div>`;
            }
        });

        stepsEl.innerHTML = stepsHtml;
        stepsEl.style.display = "block";
    }
}

function convertToDenary() {
    const input = document.getElementById("binaryInput");
    const output = document.getElementById("denaryOutput");

    if (!input || !output) return;

    const binary = input.value.replace(/\s/g, "");

    if (!/^[01]+$/.test(binary) || binary.length > 8) {
        output.textContent =
            "Denary: Please enter a valid binary number (up to 8 digits)";
        return;
    }

    const denary = parseInt(binary, 2);

    // Show calculation
    const paddedBinary = binary.padStart(8, "0");
    const placeValues = [128, 64, 32, 16, 8, 4, 2, 1];
    let calculation = [];

    for (let i = 0; i < 8; i++) {
        if (paddedBinary[i] === "1") {
            calculation.push(placeValues[i]);
        }
    }

    const calcStr = calculation.length > 0 ? calculation.join(" + ") + " = " : "";
    output.innerHTML = `Denary: ${calcStr}<strong>${denary}</strong>`;
}

function checkAnswer(questionNum, correctAnswer) {
    const input = document.getElementById("practice" + questionNum);
    const feedback = document.getElementById("feedback" + questionNum);

    if (!input || !feedback) return;

    const userAnswer = parseInt(input.value);

    if (userAnswer === correctAnswer) {
        feedback.className = "practice-feedback correct";
        feedback.textContent = "✓ Correct! Well done!";
    } else {
        feedback.className = "practice-feedback incorrect";
        feedback.textContent = `✗ Not quite. The correct answer is ${correctAnswer}. Try working through the place values again.`;
    }
}

function checkBinaryAnswer(questionNum, correctAnswer) {
    const input = document.getElementById("practice" + questionNum);
    const feedback = document.getElementById("feedback" + questionNum);

    if (!input || !feedback) return;

    const userAnswer = input.value.replace(/\s/g, "").padStart(8, "0");
    const normalizedCorrect = correctAnswer.replace(/\s/g, "");

    if (userAnswer === normalizedCorrect) {
        feedback.className = "practice-feedback correct";
        feedback.textContent = "✓ Correct! Well done!";
    } else {
        feedback.className = "practice-feedback incorrect";
        feedback.textContent = `✗ Not quite. The correct answer is ${correctAnswer}. Remember to include leading zeros!`;
    }
}

window.addEventListener("load", () => {
    const fontsReady =
        document.fonts && document.fonts.ready
            ? document.fonts.ready
            : Promise.resolve();

    fontsReady
        .then(async () => {
            updateRulerHeight();
            await loadTextbookContent();
            ensureSectionIds();
            renderPages();
            // Generate sidebar from HTML if JSON-based sidebar wasn't populated
            if (sidebarMenu && sidebarMenu.children.length === 0) {
                generateSidebarFromHTML();
            }
        })
        .catch(() => {
            updateRulerHeight();
            ensureSectionIds();
            renderPages();
            // Generate sidebar from HTML if JSON-based sidebar wasn't populated
            if (sidebarMenu && sidebarMenu.children.length === 0) {
                generateSidebarFromHTML();
            }
        });
});

// Handle resize
window.addEventListener("resize", () => {
    syncSpreadHeights();
    const ruler = document.getElementById("readingRuler");
    if (ruler && ruler.classList.contains("active")) {
        updateRulerBounds(ruler);
        resetRulerMotion();
    }
});
