# Frontend Skill Curation Report

Date: 2026-02-06

## Selection Criteria

1. Repository trust: maintained, recognizable source, active commits.
2. Instruction depth: not just a stub `SKILL.md`; includes concrete workflows, examples, or rule packs.
3. Scalability coverage: architecture, performance, and maintainability guidance.
4. UI quality coverage: design direction, accessibility, responsiveness.
5. Testability: clear validation/testing workflows.

## Selected Skills

| Source | Skill | Why it was selected |
|---|---|---|
| anthropics/skills | `frontend-design` | Strong aesthetic direction that avoids generic UI output; useful for "beautiful" frontend outcomes. |
| anthropics/skills | `web-artifacts-builder` | Production-oriented React+TS scaffolding with reusable scripts for complex UI artifacts. |
| anthropics/skills | `webapp-testing` | Practical Playwright workflow with helper scripts and examples for reliable UI verification. |
| vercel-labs/agent-skills | `react-best-practices` | High-value, rule-driven performance/scalability guidance (`59` rule files). |
| vercel-labs/agent-skills | `composition-patterns` | Strong component architecture guidance that scales in large codebases (`10` rule files). |
| vercel-labs/agent-skills | `react-native-skills` | Useful for cross-stack frontend/mobile teams (`38` rule files). |
| vercel-labs/agent-skills | `web-design-guidelines` | Reputable design/a11y review workflow for validating UI implementation quality. |

## Rejected Skills

| Source | Skill | Why it was rejected |
|---|---|---|
| skillcreatorai/Ai-Agent-Skills | `react-best-practices`, `web-design-guidelines` | Thin wrapper files (~22 lines) that mostly point to Vercel sources without bundling the full rule content. |
| Hoodini/ai-agents-skills | frontend/UI skills | Useful examples, but weaker provenance and less evidence of broad production validation than Anthropic/Vercel packs. |
| anthropics/skills | `theme-factory` | Better for presentation/artifact theming than scalable application frontend engineering. |
| heilcheng/awesome-agent-skills | repo-wide | No usable `SKILL.md` implementation packs found in the cloned repo. |

## Folder Structure

Curated skills were copied into:

- `agent_skills/curated_frontend/anthropics`
- `agent_skills/curated_frontend/vercel-labs`

This curation keeps both the `SKILL.md` files and required supporting files (`rules/`, `scripts/`, examples) where applicable.
