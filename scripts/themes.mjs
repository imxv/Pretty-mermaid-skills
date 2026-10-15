#!/usr/bin/env node

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillRoot = join(__dirname, '..');

async function loadBeautifulMermaid() {
  try {
    return await import('beautiful-mermaid');
  } catch {}

  // Never auto-install dependencies at runtime: an unattended `npm install` inside an
  // agent/embedded runtime is a supply-chain risk (network fetch + lifecycle scripts).
  // Fail loud with a manual fix instead.
  console.error('[beautiful-mermaid] Dependency not found. Automatic installation is disabled; install manually.');
  console.error(`Manual fix: cd ${skillRoot} && npm install`);
  process.exit(1);
}

async function main() {
  const { THEMES } = await loadBeautifulMermaid();
  const themes = Object.keys(THEMES);

  console.log('Available Beautiful-Mermaid Themes:\n');
  themes.forEach((theme, i) => {
    console.log(`${String(i + 1).padStart(2)}. ${theme}`);
  });

  console.log(`\nTotal: ${themes.length} themes`);
  console.log('\nUsage:');
  console.log('  node scripts/render.mjs --input diagram.mmd --theme <theme-name> --output output.svg');
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
