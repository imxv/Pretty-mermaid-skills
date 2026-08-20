#!/usr/bin/env node

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
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
const inheritedThemeNames = ['toString', 'constructor', '__proto__'];

assert.equal(files.length, 6, 'Expected six example diagrams');
assert.equal(Object.keys(THEMES).length, 15, 'Expected 15 built-in themes');

for (const file of files) {
  const source = readFileSync(join(examplesDir, file), 'utf8');
  const svg = renderMermaidSVG(source, THEMES['tokyo-night']);
  const ascii = renderMermaidASCII(source, { colorMode: 'none' });

  assert.ok(svg.startsWith('<svg'), `${file} did not render valid SVG`);
  assert.ok(ascii.trim().length > 0, `${file} did not render ASCII output`);
}

const cliTestDir = mkdtempSync(join(tmpdir(), 'pretty-mermaid-smoke-'));
const flowchartPath = join(examplesDir, 'flowchart.mmd');

try {
  for (const themeName of inheritedThemeNames) {
    const renderResult = spawnSync(process.execPath, [
      join(scriptsDir, 'render.mjs'),
      '--input', flowchartPath,
      '--theme', themeName,
    ], { encoding: 'utf8' });
    assert.notEqual(renderResult.status, 0, `render.mjs accepted inherited theme: ${themeName}`);
    assert.match(renderResult.stderr, /Unknown theme:/);

    const batchResult = spawnSync(process.execPath, [
      join(scriptsDir, 'batch.mjs'),
      '--input-dir', examplesDir,
      '--output-dir', join(cliTestDir, themeName),
      '--theme', themeName,
    ], { encoding: 'utf8' });
    assert.notEqual(batchResult.status, 0, `batch.mjs accepted inherited theme: ${themeName}`);
    assert.match(batchResult.stderr, /Unknown theme:/);
  }
} finally {
  rmSync(cliTestDir, { recursive: true, force: true });
}

console.log(`Smoke tests passed: ${files.length} diagrams x 2 formats, 15 themes, inherited theme rejection.`);
