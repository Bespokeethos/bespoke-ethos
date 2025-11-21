#!/usr/bin/env node
const { spawnSync } = require('node:child_process');

if (!process.env.BASEHUB_TOKEN) {
  console.log('[build] BASEHUB_TOKEN not set; skipping `basehub` step.');
  process.exit(0);
}

const res = spawnSync('basehub', { stdio: 'inherit', shell: true });
if (res.status !== 0) {
  console.warn('[build] `basehub` exited non-zero; continuing build.');
  process.exit(0);
}
process.exit(0);

