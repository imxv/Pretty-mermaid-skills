#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  renderMermaidASCII,
  renderMermaidSVG,
  THEMES,
} from 'beautiful-mermaid';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const examplesDir = join(scriptsDir, '..', 'assets', 'example_diagrams');
const files = readdirSync(examplesDir).filter(file => file.endsWith('.mmd')).sort();

assert.equal(files.length, 6, 'Expected six example diagrams');
assert.equal(Object.keys(THEMES).length, 15, 'Expected 15 built-in themes');

for (const file of files) {
  const source = readFileSync(join(examplesDir, file), 'utf8');
  const svg = renderMermaidSVG(source, THEMES['tokyo-night']);
  const ascii = renderMermaidASCII(source, { colorMode: 'none' });

  assert.ok(svg.startsWith('<svg'), `${file} did not render valid SVG`);
  assert.ok(ascii.trim().length > 0, `${file} did not render ASCII output`);
}

console.log(`Smoke tests passed: ${files.length} diagrams x 2 formats, 15 themes.`);
