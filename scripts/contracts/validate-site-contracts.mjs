#!/usr/bin/env node

import { validateSiteContractManifests } from '../../packages/site-contracts/src/index.ts';

await validateSiteContractManifests();
console.log('Site contract manifests are up to date.');
