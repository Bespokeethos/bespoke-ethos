#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: 'inherit', cwd: resolve(root, '..'), shell: process.platform === 'win32', ...opts });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

// Check build environment and warn about missing API keys
run('node', ['scripts/check-build-env.mjs']);

// Pre-build image prep steps (non-fatal in their own scripts if assets missing)
run('node', ['scripts/prepare-logo.cjs']);
run('node', ['scripts/prepare-hero-webp.cjs']);
run('node', ['scripts/copy-guides-assets.cjs']);

// Force local fallbacks unless explicitly disabled in env
const env = { ...process.env };
if (typeof env.SKIP_REMOTE_DATA === 'string') {
  env.SKIP_REMOTE_DATA = env.SKIP_REMOTE_DATA.trim();
}
if (!env.SKIP_REMOTE_DATA) env.SKIP_REMOTE_DATA = '1';
const workspaceRoot = resolve(root, '..');
env.TURBOPACK_ROOT = workspaceRoot;
env.NEXT_TURBOPACK_ROOT = workspaceRoot;
env.NEXT_TURBOPACK = '0';
env.NEXT_PRIVATE_TURBOPACK = '0';
if (!env.NEXT_TURBOPACK) env.NEXT_TURBOPACK = '0';
if (!env.NEXT_PRIVATE_TURBOPACK) env.NEXT_PRIVATE_TURBOPACK = '0';

// Build with Next via local bin to avoid PATH issues
const nextBin = process.platform === 'win32'
  ? resolve(root, '..', 'node_modules', '.bin', 'next.cmd')
  : resolve(root, '..', 'node_modules', '.bin', 'next');
run(nextBin, ['build', '--webpack'], { env });
