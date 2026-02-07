# Framework Rollback Playbook

Date: 2026-02-06
Scope: Emergency rollback from framework-first deploy artifact to legacy build artifact.

## Trigger Conditions

- Framework CI gate fails after deploy or post-deploy regression is confirmed on production routes.
- Critical user journeys fail (homepage, curriculum index routes, interactive lesson pages).
- Hosting path regression affects route availability.

## Fast Rollback Procedure

1. Build the legacy artifact:
   - `npm run build:legacy`
2. Stage legacy output into the framework deploy target directory:
   - `npm run framework:stage-legacy-rollback`
3. Deploy to production hosting:
   - `firebase deploy --only hosting`

Equivalent one-command rollback:
- `npm run deploy:rollback-legacy`

## Rollback Validation Checklist

Run immediately after rollback deploy:

1. Load and verify:
   - `/index.html`
   - `/igcse/index.html`
   - `/ib/index.html`
   - `/ks3/index.html`
   - `/ib-2027/sl/index.html`
   - `/ib-2027/hl/index.html`
2. Confirm one interactive page per family:
   - `/igcse/topic1/binary-addition-game.html`
   - `/ib-2027/sl/unit-5/oop-project/level-a-player.html`
3. Confirm no 404s for CSS/JS static assets in browser network panel.

## Return-To-Framework Procedure

After the incident root cause is fixed:

1. Re-run full framework production gate locally:
   - `npm run migration:production-gate`
2. Merge fix and allow CI deploy workflows to publish framework dist.
3. Re-validate critical routes and interactives.

## Notes

- Firebase hosting now deploys from `apps/site/dist` (configured in `firebase.json`).
- Rollback uses artifact replacement, not branch rewrite, so Git history remains unchanged.
