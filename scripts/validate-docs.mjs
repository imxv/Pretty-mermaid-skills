#!/usr/bin/env node

import assert from 'node:assert/strict';
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { THEMES } from 'beautiful-mermaid';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const skillRoot = join(scriptsDir, '..');
const ignoredDirectories = new Set(['.git', 'node_modules']);

function collectMarkdownFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    if (ignoredDirectories.has(entry)) continue;
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) {
      files.push(...collectMarkdownFiles(path));
    } else if (entry.endsWith('.md')) {
      files.push(path);
    }
  }
  return files;
}

function localTargets(markdown) {
  const targets = [];
  const patterns = [
    /!?\[[^\]]*\]\(([^)]+)\)/g,
    /(?:src|href)="([^"]+)"/g,
  ];

  for (const pattern of patterns) {
    for (const match of markdown.matchAll(pattern)) {
      const target = match[1].trim().replace(/^<|>$/g, '');
      if (
        !target ||
        target.startsWith('#') ||
        /^[a-z][a-z0-9+.-]*:/i.test(target)
      ) {
        continue;
      }
      targets.push(decodeURIComponent(target.split('#')[0].split('?')[0]));
    }
  }
  return targets;
}

const skillPath = join(skillRoot, 'SKILL.md');
const skill = readFileSync(skillPath, 'utf8');
const skillLines = skill.split('\n').length;

assert.match(skill, /^---\nname: pretty-mermaid\ndescription: \|\n/);
assert.ok(skillLines < 500, `SKILL.md must stay below 500 lines; found ${skillLines}`);

const markdownFiles = collectMarkdownFiles(skillRoot);
for (const file of markdownFiles) {
  const markdown = readFileSync(file, 'utf8');
  for (const target of localTargets(markdown)) {
    const path = resolve(dirname(file), target);
    assert.ok(existsSync(path), `${file} links to missing local target: ${target}`);
  }
  assert.doesNotMatch(markdown, /(?:render_mermaid|batch_render)\.py/);
}

const expectedThemes = Object.keys(THEMES).sort();
const galleryDir = join(skillRoot, 'assets', 'theme_gallery');
const galleryThemes = readdirSync(galleryDir)
  .filter(file => file.endsWith('.svg'))
  .map(file => file.slice(0, -4))
  .sort();

assert.deepEqual(galleryThemes, expectedThemes, 'Theme gallery must match built-in themes');
assert.equal(expectedThemes.length, 15, 'Expected 15 built-in themes');

for (const name of ['README.md', 'README_CN.md', 'README_JA.md']) {
  assert.ok(existsSync(join(skillRoot, name)), `Missing ${name}`);
}

console.log(`Documentation valid: ${markdownFiles.length} Markdown files, ${skillLines} Skill lines, ${galleryThemes.length} theme previews.`);
