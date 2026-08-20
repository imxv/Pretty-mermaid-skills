#!/usr/bin/env node

import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillRoot = join(__dirname, '..');

async function loadBeautifulMermaid() {
  try {
    return await import('beautiful-mermaid');
  } catch {}

  console.error('[beautiful-mermaid] Dependency not found. Installing automatically...');
  try {
    execSync('npm install --no-fund --no-audit', {
      cwd: skillRoot,
      stdio: ['pipe', 'pipe', 'inherit'],
      timeout: 120000,
    });
    console.error('[beautiful-mermaid] Installed successfully.\n');
  } catch (e) {
    console.error(`[beautiful-mermaid] Auto-install failed: ${e.message}`);
    console.error(`Manual fix: cd ${skillRoot} && npm install`);
    process.exit(1);
  }

  try {
    const pkgPath = join(skillRoot, 'node_modules', 'beautiful-mermaid', 'dist', 'index.js');
    return await import(pkgPath);
  } catch (e) {
    console.error(`[beautiful-mermaid] Failed to load after install: ${e.message}`);
    process.exit(1);
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    input: null,
    output: null,
    format: 'svg',
    theme: null,
    bg: '#FFFFFF',
    fg: '#27272A',
    font: 'Inter',
    transparent: false,
    useAscii: false,
    paddingX: 5,
    paddingY: 5,
    boxBorderPadding: 1,
    colorMode: 'auto',
    padding: 40,
    nodeSpacing: 24,
    layerSpacing: 40,
    componentSpacing: 24,
    thoroughness: 3,
    interactive: false,
  };

  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    const val = args[i + 1];

    switch (key) {
      case '--input': case '-i': opts.input = val; i++; break;
      case '--output': case '-o': opts.output = val; i++; break;
      case '--format': case '-f': opts.format = val; i++; break;
      case '--theme': case '-t': opts.theme = val; i++; break;
      case '--bg': opts.bg = val; i++; break;
      case '--fg': opts.fg = val; i++; break;
      case '--line': opts.line = val; i++; break;
      case '--accent': opts.accent = val; i++; break;
      case '--muted': opts.muted = val; i++; break;
      case '--surface': opts.surface = val; i++; break;
      case '--border': opts.border = val; i++; break;
      case '--font': opts.font = val; i++; break;
      case '--transparent': opts.transparent = true; break;
      case '--use-ascii': opts.useAscii = true; break;
      case '--padding-x': opts.paddingX = parseInt(val); i++; break;
      case '--padding-y': opts.paddingY = parseInt(val); i++; break;
      case '--box-border-padding': opts.boxBorderPadding = parseInt(val); i++; break;
      case '--color-mode': opts.colorMode = val; i++; break;
      case '--padding': opts.padding = parseInt(val); i++; break;
      case '--node-spacing': opts.nodeSpacing = parseInt(val); i++; break;
      case '--layer-spacing': opts.layerSpacing = parseInt(val); i++; break;
      case '--component-spacing': opts.componentSpacing = parseInt(val); i++; break;
      case '--thoroughness': opts.thoroughness = parseInt(val); i++; break;
      case '--interactive': opts.interactive = true; break;
      case '--help': case '-h':
        console.log(`Usage: node render.mjs --input <file> [options]

Options:
  -i, --input <file>       Input Mermaid file (.mmd) [required]
  -o, --output <file>      Output file (default: stdout)
  -f, --format <fmt>       Output format: svg | ascii (default: svg)
  -t, --theme <name>       Theme name (e.g. tokyo-night, dracula)
      --bg <hex>           Background color
      --fg <hex>           Foreground color
      --line <hex>         Edge/connector color
      --accent <hex>       Arrow heads and highlights color
      --muted <hex>        Secondary text color
      --surface <hex>      Node fill tint color
      --border <hex>       Node stroke color
      --font <name>        Font family (default: Inter)
      --transparent        Transparent background (SVG only)
      --use-ascii          Pure ASCII instead of Unicode (ASCII only)
      --padding-x <n>      Horizontal spacing (ASCII only, default: 5)
      --padding-y <n>      Vertical spacing (ASCII only, default: 5)
      --box-border-padding <n>  Padding inside node boxes (ASCII only, default: 1)
      --color-mode <mode>  ASCII colors: none | auto | ansi16 | ansi256 | truecolor | html
      --padding <n>        SVG canvas padding in px (default: 40)
      --node-spacing <n>   SVG horizontal node spacing (default: 24)
      --layer-spacing <n>  SVG vertical layer spacing (default: 40)
      --component-spacing <n>  SVG disconnected component spacing (default: 24)
      --thoroughness <n>   SVG layout trials, 1-7 (default: 3)
      --interactive        Enable XY chart hover tooltips (SVG only)`);
        process.exit(0);
    }
  }

  if (!opts.input) {
    console.error('Error: --input is required. Use --help for usage.');
    process.exit(1);
  }

  if (!existsSync(opts.input)) {
    console.error(`Error: Input file not found: ${opts.input}`);
    process.exit(1);
  }

  return opts;
}

async function main() {
  const opts = parseArgs();
  const { renderMermaidSVG, renderMermaidASCII, THEMES } = await loadBeautifulMermaid();
  const input = readFileSync(opts.input, 'utf8');

  if (opts.theme && !Object.prototype.hasOwnProperty.call(THEMES, opts.theme)) {
    throw new Error(`Unknown theme: ${opts.theme}. Run node scripts/themes.mjs to list themes.`);
  }

  if (opts.format === 'ascii') {
    const ascii = renderMermaidASCII(input, {
      useAscii: opts.useAscii,
      paddingX: opts.paddingX,
      paddingY: opts.paddingY,
      boxBorderPadding: opts.boxBorderPadding,
      colorMode: opts.colorMode,
    });
    if (opts.output) {
      writeFileSync(opts.output, ascii);
      console.log(`ASCII diagram saved to ${opts.output}`);
    } else {
      console.log(ascii);
    }
  } else {
    const theme = opts.theme ? THEMES[opts.theme] : undefined;
    const colors = theme || {
      bg: opts.bg,
      fg: opts.fg,
      ...(opts.line && { line: opts.line }),
      ...(opts.accent && { accent: opts.accent }),
      ...(opts.muted && { muted: opts.muted }),
      ...(opts.surface && { surface: opts.surface }),
      ...(opts.border && { border: opts.border }),
    };

    const svg = renderMermaidSVG(input, {
      ...colors,
      font: opts.font,
      transparent: opts.transparent,
      padding: opts.padding,
      nodeSpacing: opts.nodeSpacing,
      layerSpacing: opts.layerSpacing,
      componentSpacing: opts.componentSpacing,
      thoroughness: opts.thoroughness,
      interactive: opts.interactive,
    });

    if (opts.output) {
      writeFileSync(opts.output, svg);
      console.log(`SVG diagram saved to ${opts.output}`);
    } else {
      console.log(svg);
    }
  }
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
