#!/usr/bin/env node

import { buildSiteContractInventory, writeSiteContractManifests } from '../../packages/site-contracts/src/index.ts';

const inventory = await buildSiteContractInventory();
await writeSiteContractManifests(inventory);

console.log(`Wrote site contract manifests to meta/contracts`);
