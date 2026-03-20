const U="feedback",S={planning:{label:"Planning and narrowing",helper:"Use this when you already have ideas and need help organising or narrowing them."},feedback:{label:"Draft feedback",helper:"Use this when you want issues identified in your own draft without rewriting."},spag:{label:"SPAG diagnosis",helper:"Use this when you want grammar, spelling, punctuation, and clarity issues flagged only."},viva:{label:"Viva preparation",helper:"Use this when you want questions that test whether you can explain your own choices."}},X={planning:"planning",feedback:"in progress",spag:"in progress",viva:"in progress"},V={planning:"Paste your rough notes, bullet points, possible direction, and questions here. Keep it to the section you actually want help with.",feedback:"Paste the section of your draft you want checked. Do not paste the whole assignment unless you genuinely need the whole thing reviewed.",spag:"Paste the paragraph or section you want checked for grammar, spelling, punctuation, and clarity.",viva:"Paste the section you want to practise explaining and defending."},Q="Runs entirely in this browser tab. What you paste is not sent, saved, or stored in cookies or local storage.",E="If there is not enough information, ask brief clarifying questions instead of guessing.",Y=s=>Object.hasOwn(S,s),K=s=>X[s],z=({type:s,subject:i,taskType:o})=>`I am an IB or BTEC student aged 16-18 working on ${i||"[subject + course]"} for ${o||"[task type]"}. My current stage is ${K(s)}. Keep all feedback suitable for this level. Do not make it childish, and do not move beyond upper-secondary level into undergraduate-level concepts, phrasing, or expectations unless I have already used them myself.`,J=({type:s,subject:i,taskType:o,work:r})=>{const a=z({type:s,subject:i,taskType:o});return s==="planning"?`ROLE:
Act as a planning coach for academic work. Support my thinking process without generating ideas for me.

CONTEXT:
${a} I need help turning my own rough thoughts into a plan I can explain and defend myself.

MY CURRENT IDEAS:
${r||"[Paste your rough notes, bullet points, possible direction, and questions here.]"}

OUTCOME:
Help me organise, narrow, and test my own ideas. I want to leave with a clearer plan, not with AI-generated content.

NON-NEGOTIABLE CONSTRAINTS:
Do not invent topic ideas for me from scratch.
Do not suggest new arguments, themes, case studies, or angles unless they already appear in my notes.
Do not produce a thesis statement for me.
Do not produce research questions for me unless I first draft my own attempts.
Do not choose the best idea for me.
Do not create an outline I could directly submit.
Do not give me content to copy into my coursework.
${E}

ALLOWED HELP:
You may:
- ask me narrowing questions
- compare the ideas I have already listed
- point out where one idea seems too broad, too vague, too descriptive, or too difficult
- help me identify what I already seem most interested in
- help me turn my own notes into a decision structure
- help me spot practical issues such as scope, access to evidence, feasibility, and clarity

RESPONSE FORMAT:
A. List the ideas I already mentioned in neutral language only.
B. For each idea, give:
   - scope risk
   - evidence or research risk
   - clarity risk
   - feasibility risk
C. Ask me 5 narrowing questions based only on my own notes.
D. Suggest a planning structure using placeholders only, not filled content.
E. Do not add any new content knowledge or new angles.

REFUSAL RULE:
If I ask you to give me a research question, argument, or angle directly, refuse and instead ask me to draft 2 or 3 of my own attempts first.

SELF-CHECK:
Do not output any idea that did not come from me first.
Do not output any sentence that could function as part of my final coursework.`:s==="feedback"?`ROLE:
Act as an academic integrity feedback checker. Identify issues in my draft without rewriting it or adding new content.

CONTEXT:
${a} I need help spotting problems while keeping full ownership of the writing, argument, and ideas.

TASK:
Read my draft and identify problems only. Do not fix them for me.

MY DRAFT:
${r||"[Paste draft here]"}

NON-NEGOTIABLE CONSTRAINTS:
Do not rewrite any sentence.
Do not rewrite any paragraph.
Do not provide an improved version.
Do not suggest better phrasing.
Do not make it sound more academic.
Do not add evidence, examples, theory, interpretations, counterarguments, or angles.
Do not tell me what to say instead.
Do not produce a model paragraph, model introduction, model conclusion, or model topic sentence.
Do not complete missing sections for me.
${E}

ALLOWED HELP:
You may:
- identify where something is unclear
- identify where reasoning jumps too quickly
- identify where a claim seems unsupported
- identify repetition
- identify where the paragraph focus is muddled
- identify where the structure does not flow logically
- identify where analysis becomes descriptive
- identify where I may struggle to explain my thinking in a viva or discussion

RESPONSE FORMAT:
1. Give a one-sentence overview of the main strengths and risks.
2. Create a table with these columns:
   - Location
   - Issue type
   - What the problem is
   - Why it matters
   - Question for me to answer
3. Allowed issue types:
   - unclear claim
   - weak link
   - unsupported point
   - over-description
   - repetition
   - structure problem
   - unclear terminology
   - off-task section
   - explain-this-better
4. In the Question for me to answer column, ask a question instead of giving a solution.
5. End with:
   - 3 places I should explain aloud to test authorship
   - 3 questions a teacher might ask me about my own reasoning

REFUSAL RULE:
If I ask you to show me how to rewrite any section, refuse and instead identify the issue and ask me a question I must answer myself.

SELF-CHECK:
Remove any sentence that could be copied into my submission.
Remove any new idea that did not appear in my original draft.`:s==="spag"?`ROLE:
Act as a SPAG diagnostic checker only. Identify language issues without correcting them.

CONTEXT:
${a} I want to improve grammar, spelling, punctuation, sentence control, and clarity without having any wording rewritten for me.

TEXT:
${r||"[Paste text here]"}

NON-NEGOTIABLE CONSTRAINTS:
Do not rewrite anything.
Do not provide corrected sentences.
Do not suggest replacement words.
Do not improve my style, tone, or register.
Do not combine or split sentences for me.
Do not make my writing more formal or academic.
Do not change wording even if it sounds awkward.
Only diagnose.
${E}

ALLOWED HELP:
You may:
- identify spelling issues
- identify punctuation issues
- identify grammar issues
- identify sentence-boundary issues
- identify agreement problems
- identify pronoun-reference problems
- identify awkward or confusing phrasing
- identify overly long or hard-to-follow sentences
- identify repetition at word or phrase level

RESPONSE FORMAT:
For each issue, use this structure only:
- Location: [sentence number / paragraph number / quoted short fragment]
- Issue category: [spelling / punctuation / grammar / sentence clarity / repetition / word form / agreement / reference]
- What seems wrong: [brief diagnosis only]
- Why it may confuse the reader: [brief explanation only]

Then finish with:
- Top 3 recurring patterns I need to look for myself
- 3 self-editing checks I should apply before resubmitting

REFUSAL RULE:
If I ask you to correct the sentences, refuse and remind me that you can only diagnose the issue, not repair the wording.

SELF-CHECK:
Do not output corrected wording.
Do not output an improved sentence.
Do not output a polished version of any phrase from my text.`:`ROLE:
Act as a viva preparation coach. Test whether I can explain my own thinking clearly.

CONTEXT:
${a} I have written this work myself and I need to be able to explain and defend it in discussion with a teacher.

WORK OR EXCERPT:
${r||"[Paste section here]"}

NON-NEGOTIABLE CONSTRAINTS:
Do not improve the writing.
Do not suggest better arguments.
Do not provide ideal answers for me to memorise.
Do not put words in my mouth.
Only ask questions and identify places where I may struggle to explain myself.
${E}

OUTCOME:
Help me discover whether I really understand what I wrote.

RESPONSE FORMAT:
1. Ask me 8 short viva-style questions about:
   - why I chose this focus
   - what I meant by specific terms
   - why I included specific evidence or examples
   - how one paragraph links to the next
   - what my reasoning is at key points
2. Then list:
   - 3 places where I may not fully understand my own wording
   - 3 places where I should be ready to justify a decision
3. Do not answer the questions for me.

SELF-CHECK:
Do not provide model answers.
Do not provide a script.
Do not add any argument not already present in my work.`},Z=({subject:s,taskType:i,work:o,type:r})=>{const a=[];s.trim()||a.push("Add the subject and course, for example 'IB Biology HL' or 'BTEC Business'."),i.trim()||a.push("Add the task type, for example 'IA', 'EE', 'essay', or 'report'."),o.trim()||a.push("Paste the section you want help with. The generator is only as good as the material you give it.");const l=o.trim().length;return r==="planning"&&l>0&&l<60&&a.push("Your planning notes are very short. Add a few bullet points or questions of your own first."),(r==="feedback"||r==="spag"||r==="viva")&&l>0&&l<120&&a.push("This extract may be too short for useful feedback. Paste a full paragraph or a short section."),l>5e3&&a.push("This is quite long. In most cases, paste only the section you actually want checked."),a},t=document.querySelector("[data-ai-prompt-app]");if(t){const s=Array.from(t.querySelectorAll("[data-ai-open-modal]")),i=t.querySelector("[data-ai-overlay]"),o=t.querySelector("[data-ai-modal]"),r=Array.from(t.querySelectorAll("[data-ai-close-modal]")),a=t.querySelector('[data-ai-view="form"]'),l=t.querySelector('[data-ai-view="result"]'),h=t.querySelector("[data-ai-form]"),m=t.querySelector("[data-ai-type-select]"),I=t.querySelector("[data-ai-type-helper]"),L=t.querySelector("[data-ai-stage-note]"),p=t.querySelector("[data-ai-work-input]"),D=t.querySelector("[data-ai-character-count]"),A=t.querySelector("[data-ai-soft-checks]"),C=t.querySelector("[data-ai-soft-checks-list]"),O=t.querySelector("[data-ai-result-checks]"),q=t.querySelector("[data-ai-result-checks-list]"),x=t.querySelector("[data-ai-output]"),y=t.querySelector("[data-ai-output-text]"),R=t.querySelector("[data-ai-result-summary]"),N=t.querySelector("[data-ai-edit-form]"),P=t.querySelector("[data-ai-copy-prompt]"),f=t.querySelector("[data-ai-copy-status]");if(i&&o&&a&&l&&h&&m&&I&&L&&p&&D&&A&&C&&O&&q&&x&&y&&R&&N&&P&&f){const g=h.elements.namedItem("subject"),b=h.elements.namedItem("taskType");if(g instanceof HTMLInputElement&&b instanceof HTMLInputElement){let w=null,F=!1;const _=e=>Array.from(e.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>!n.hasAttribute("hidden")),j=()=>{const e=m.value;return Y(e)?e:U},$=e=>{m.value=e,I.textContent=S[e].helper,L.textContent=`Added automatically: ${K(e)}.`,p.placeholder=V[e],u()},B=()=>({type:j(),subject:g.value,taskType:b.value,work:p.value}),H=(e,n,c,d)=>{if(n.innerHTML="",!d||c.length===0){e.hidden=!0;return}c.forEach(v=>{const M=document.createElement("li");M.textContent=v,n.appendChild(M)}),e.hidden=!1},u=()=>{D.textContent=`${p.value.length} characters`;const e=B(),n=Z(e),c=e.subject.trim().length>0||e.taskType.trim().length>0||e.work.trim().length>0;H(A,C,n,F||c),H(O,q,n,n.length>0)},k=e=>{const n=e==="form";if(a.hidden=!n,l.hidden=n,n){requestAnimationFrame(()=>g.focus());return}requestAnimationFrame(()=>x.focus())},W=e=>{w=e,i.hidden=!1,o.hidden=!1,requestAnimationFrame(()=>{i.classList.add("is-active"),o.classList.add("is-active")}),o.setAttribute("aria-hidden","false"),document.body.classList.add("modal-open"),k(y.textContent?"result":"form")},T=()=>{i.classList.remove("is-active"),o.classList.remove("is-active"),o.setAttribute("aria-hidden","true"),window.setTimeout(()=>{i.hidden=!0,o.hidden=!0},180),document.body.classList.remove("modal-open"),f.textContent="",w&&w.focus(),w=null},G=async()=>{const e=y.textContent||"";if(e)try{await navigator.clipboard.writeText(e),f.textContent="Prompt copied."}catch{const c=window.getSelection(),d=document.createRange();d.selectNodeContents(y),c?.removeAllRanges(),c?.addRange(d),f.textContent="Select the prompt and copy it manually."}};m.addEventListener("change",()=>{const e=m.value;Y(e)&&$(e)}),[g,b,p].forEach(e=>{e.addEventListener("input",u),e.addEventListener("change",u)}),s.forEach(e=>{e.addEventListener("click",()=>W(e))}),r.forEach(e=>{e.addEventListener("click",T)}),i.addEventListener("click",T),N.addEventListener("click",()=>k("form")),P.addEventListener("click",G),h.addEventListener("submit",e=>{if(e.preventDefault(),F=!0,!h.reportValidity()){u();return}const n=B();y.textContent=J(n),R.textContent=`${S[n.type].label} prompt ready. ${Q}`,f.textContent="",u(),k("result")}),document.addEventListener("keydown",e=>{if(o.hidden)return;if(e.key==="Escape"){T();return}if(e.key!=="Tab")return;const n=_(o);if(n.length===0)return;const c=n[0],d=n[n.length-1],v=document.activeElement;e.shiftKey&&v===c?(e.preventDefault(),d.focus()):!e.shiftKey&&v===d&&(e.preventDefault(),c.focus())}),$(U),u()}}}
