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
const xychartPath = join(examplesDir, 'xychart.mmd');
const customColorArgs = [
  '--bg', '#ffffff',
  '--fg', '#123456',
  '--line', '#abcdef',
  '--accent', '#fedcba',
  '--border', '#0f0f0f',
];
const customColorCodes = [
  '\u001b[38;2;18;52;86m',
  '\u001b[38;2;171;205;239m',
  '\u001b[38;2;254;220;186m',
  '\u001b[38;2;15;15;15m',
];

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

  const interactiveSvgPath = join(cliTestDir, 'interactive.svg');
  const renderInteractiveResult = spawnSync(process.execPath, [
    join(scriptsDir, 'render.mjs'),
    '--input', xychartPath,
    '--output', interactiveSvgPath,
    '--interactive',
  ], { encoding: 'utf8' });
  assert.equal(renderInteractiveResult.status, 0, renderInteractiveResult.stderr);
  assert.match(readFileSync(interactiveSvgPath, 'utf8'), /class="xychart-tip/);

  const batchInteractiveDir = join(cliTestDir, 'batch-interactive');
  const batchInteractiveResult = spawnSync(process.execPath, [
    join(scriptsDir, 'batch.mjs'),
    '--input-dir', examplesDir,
    '--output-dir', batchInteractiveDir,
    '--interactive',
  ], { encoding: 'utf8' });
  assert.equal(batchInteractiveResult.status, 0, batchInteractiveResult.stderr);
  assert.match(batchInteractiveResult.stdout, /xychart\.mmd/);
  assert.match(readFileSync(join(batchInteractiveDir, 'xychart.svg'), 'utf8'), /class="xychart-tip/);

  const themedAsciiPath = join(cliTestDir, 'dracula.txt');
  const renderThemedAsciiResult = spawnSync(process.execPath, [
    join(scriptsDir, 'render.mjs'),
    '--input', flowchartPath,
    '--output', themedAsciiPath,
    '--format', 'ascii',
    '--color-mode', 'truecolor',
    '--theme', 'dracula',
  ], { encoding: 'utf8' });
  assert.equal(renderThemedAsciiResult.status, 0, renderThemedAsciiResult.stderr);
  assert.match(readFileSync(themedAsciiPath, 'utf8'), /\u001b\[38;2;248;248;242m/);

  const batchThemedAsciiDir = join(cliTestDir, 'batch-dracula');
  const batchThemedAsciiResult = spawnSync(process.execPath, [
    join(scriptsDir, 'batch.mjs'),
    '--input-dir', examplesDir,
    '--output-dir', batchThemedAsciiDir,
    '--format', 'ascii',
    '--color-mode', 'truecolor',
    '--theme', 'dracula',
  ], { encoding: 'utf8' });
  assert.equal(batchThemedAsciiResult.status, 0, batchThemedAsciiResult.stderr);
  assert.match(
    readFileSync(join(batchThemedAsciiDir, 'flowchart.txt'), 'utf8'),
    /\u001b\[38;2;248;248;242m/,
  );

  const customAsciiPath = join(cliTestDir, 'custom.txt');
  const renderCustomAsciiResult = spawnSync(process.execPath, [
    join(scriptsDir, 'render.mjs'),
    '--input', flowchartPath,
    '--output', customAsciiPath,
    '--format', 'ascii',
    '--color-mode', 'truecolor',
    ...customColorArgs,
  ], { encoding: 'utf8' });
  assert.equal(renderCustomAsciiResult.status, 0, renderCustomAsciiResult.stderr);
  const customAscii = readFileSync(customAsciiPath, 'utf8');
  for (const colorCode of customColorCodes) {
    assert.ok(customAscii.includes(colorCode), `render.mjs omitted custom ASCII color ${colorCode}`);
  }

  const batchCustomAsciiDir = join(cliTestDir, 'batch-custom');
  const batchCustomAsciiResult = spawnSync(process.execPath, [
    join(scriptsDir, 'batch.mjs'),
    '--input-dir', examplesDir,
    '--output-dir', batchCustomAsciiDir,
    '--format', 'ascii',
    '--color-mode', 'truecolor',
    ...customColorArgs,
  ], { encoding: 'utf8' });
  assert.equal(batchCustomAsciiResult.status, 0, batchCustomAsciiResult.stderr);
  const batchCustomAscii = readFileSync(join(batchCustomAsciiDir, 'flowchart.txt'), 'utf8');
  for (const colorCode of customColorCodes) {
    assert.ok(batchCustomAscii.includes(colorCode), `batch.mjs omitted custom ASCII color ${colorCode}`);
  }
} finally {
  rmSync(cliTestDir, { recursive: true, force: true });
}

console.log(`Smoke tests passed: ${files.length} diagrams x 2 formats, 15 themes, CLI named/custom colors and interactive coverage.`);
