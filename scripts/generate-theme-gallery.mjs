#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { THEMES } from 'beautiful-mermaid';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const skillRoot = join(scriptsDir, '..');
const outputDir = join(skillRoot, 'assets', 'theme_gallery');
const input = join(outputDir, 'source.mmd');
const renderer = join(scriptsDir, 'render.mjs');
const themes = Object.keys(THEMES);

mkdirSync(outputDir, { recursive: true });

for (const file of readdirSync(outputDir)) {
  if (file.endsWith('.svg')) {
    unlinkSync(join(outputDir, file));
  }
}

for (const theme of themes) {
  const output = join(outputDir, `${theme}.svg`);
  execFileSync(process.execPath, [
    renderer,
    '--input', input,
    '--output', output,
    '--theme', theme,
    '--padding', '28',
  ], { stdio: 'inherit' });

  if (!readFileSync(output, 'utf8').startsWith('<svg')) {
    throw new Error(`Gallery render did not produce SVG: ${theme}`);
  }
}

console.log(`Generated ${themes.length} theme previews in assets/theme_gallery/`);
