import { Resvg } from '@resvg/resvg-js';

export const DEFAULT_PNG_WIDTH = 800;
export const MIN_PNG_WIDTH = 100;
export const MAX_PNG_WIDTH = 10000;

const CUSTOM_PROPERTY = /(--[\w-]+)\s*:\s*([^;}]+);?/g;
const CSS_RULE = /([^{}]+)\{([^{}]*)\}/g;
const HEX_COLOR = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;

export function parsePngWidth(value = DEFAULT_PNG_WIDTH) {
  const text = String(value);
  if (!/^\d+$/.test(text)) {
    throw new Error(`PNG width must be an integer from ${MIN_PNG_WIDTH} to ${MAX_PNG_WIDTH}.`);
  }

  const width = Number(text);
  if (width < MIN_PNG_WIDTH || width > MAX_PNG_WIDTH) {
    throw new Error(`PNG width must be an integer from ${MIN_PNG_WIDTH} to ${MAX_PNG_WIDTH}.`);
  }

  return width;
}

export function prepareSvgForPng(svg) {
  const rootTag = svg.match(/<svg\b[^>]*>/i)?.[0];
  if (!rootTag) {
    throw new Error('PNG conversion requires a valid SVG document.');
  }

  const stylesheets = [...svg.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)]
    .map(match => stripCssImports(match[1]));
  const rootDeclarations = new Map();
  let declarationOrder = 0;
  for (const css of stylesheets) {
    declarationOrder = collectRootCustomProperties(css, rootDeclarations, declarationOrder);
  }
  const rootVariables = new Map(
    [...rootDeclarations].map(([name, declaration]) => [name, declaration.value]),
  );
  const rootStyle = rootTag.match(/\sstyle=(['"])(.*?)\1/i)?.[2] ?? '';
  collectCustomProperties(rootStyle, rootVariables);
  rejectScopedInlineCustomProperties(svg);
  const resolveRootVariable = createVariableResolver(rootVariables);

  const prepared = mapCssContexts(
    svg,
    css => resolveCssValue(stripCssImports(css), resolveRootVariable).replace(CUSTOM_PROPERTY, ''),
    (_, value) => resolveCssValue(value, resolveRootVariable).replace(CUSTOM_PROPERTY, ''),
  );

  let unresolved;
  forEachCssContext(prepared, context => {
    unresolved ||= context.match(/(?:^|[^-\w])((?:var|color-mix)\s*\()/i)?.[1];
  });
  if (unresolved) {
    throw new Error(`PNG conversion cannot resolve CSS expression ${unresolved}`);
  }

  const backgroundValue = rootStyle.match(/(?:^|;)\s*background(?:-color)?\s*:\s*([^;]+)/i)?.[1];
  const background = backgroundValue
    ? resolveCssValue(backgroundValue, resolveRootVariable)
    : undefined;

  return { svg: prepared, background };
}

export function renderSvgForPng(svg, width = DEFAULT_PNG_WIDTH) {
  const validWidth = parsePngWidth(width);
  const prepared = prepareSvgForPng(svg);
  const renderer = new Resvg(prepared.svg, {
    fitTo: { mode: 'width', value: validWidth },
    ...(prepared.background && { background: prepared.background }),
    font: { loadSystemFonts: true },
  });

  return renderer.render();
}

export function renderSvgToPng(svg, width = DEFAULT_PNG_WIDTH) {
  return Buffer.from(renderSvgForPng(svg, width).asPng());
}

function collectCustomProperties(source, variables) {
  for (const match of source.matchAll(CUSTOM_PROPERTY)) {
    variables.set(match[1], match[2].trim());
  }
}

function collectRootCustomProperties(css, declarations, startOrder) {
  let order = startOrder;
  for (const match of css.matchAll(CSS_RULE)) {
    const selectors = match[1].split(',').map(selector => selector.trim());
    const customProperties = [...match[2].matchAll(CUSTOM_PROPERTY)];
    if (customProperties.length === 0) continue;

    const specificity = Math.max(...selectors.map(rootSelectorSpecificity));
    if (specificity < 0) {
      throw new Error('PNG conversion supports CSS custom properties only on the root svg element.');
    }

    for (const property of customProperties) {
      const candidate = { value: property[2].trim(), specificity, order: order++ };
      const current = declarations.get(property[1]);
      if (
        !current ||
        candidate.specificity > current.specificity ||
        (candidate.specificity === current.specificity && candidate.order > current.order)
      ) {
        declarations.set(property[1], candidate);
      }
    }
  }
  return order;
}

function rootSelectorSpecificity(selector) {
  if (selector === ':root') return 10;
  if (selector === 'svg') return 1;
  return -1;
}

function rejectScopedInlineCustomProperties(svg) {
  for (const match of svg.matchAll(/<([a-z][\w:-]*)\b[^>]*\sstyle=(['"])(.*?)\2[^>]*>/gi)) {
    if (match[1].toLowerCase() !== 'svg' && [...match[3].matchAll(CUSTOM_PROPERTY)].length > 0) {
      throw new Error('PNG conversion supports CSS custom properties only on the root svg element.');
    }
  }
}

function createVariableResolver(variables) {
  const resolved = new Map();

  return function resolveVariable(name, stack = []) {
    if (resolved.has(name)) return resolved.get(name);
    if (stack.includes(name)) {
      throw new Error(`Circular CSS variable reference: ${[...stack, name].join(' -> ')}`);
    }
    if (!variables.has(name)) {
      throw new Error(`PNG conversion cannot resolve CSS variable ${name}. Use concrete color values.`);
    }

    const value = resolveCssValue(variables.get(name), resolveVariable, [...stack, name]);
    resolved.set(name, value);
    return value;
  };
}

function stripCssImports(css) {
  return css.replace(/@import\s+url\([^;]*\);?/gi, '');
}

function forEachCssContext(svg, visit) {
  for (const match of svg.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    visit(match[1]);
  }
  for (const match of svg.matchAll(/\s(?:style|fill|stroke|filter)=(['"])(.*?)\1/gi)) {
    visit(match[2]);
  }
}

function mapCssContexts(svg, transformStylesheet, transformAttribute) {
  return svg
    .replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi, (_, open, css, close) => (
      `${open}${transformStylesheet(css)}${close}`
    ))
    .replace(/(\s)(style|fill|stroke|filter)=(['"])(.*?)\3/gi, (_, space, name, quote, value) => (
      `${space}${name}=${quote}${transformAttribute(name, value)}${quote}`
    ));
}

function resolveCssValue(value, resolveVariable, stack = []) {
  let resolved = replaceCssFunctions(value, 'var', inner => {
    const [name, fallback] = splitTopLevel(inner, ',');
    const variableName = name.trim();

    try {
      return resolveVariable(variableName, stack);
    } catch (error) {
      if (fallback === undefined || !error.message.startsWith('PNG conversion cannot resolve CSS variable')) {
        throw error;
      }
      return resolveCssValue(fallback.trim(), resolveVariable, stack);
    }
  });

  resolved = replaceCssFunctions(resolved, 'color-mix', mixCssColors);
  return resolved.trim();
}

function replaceCssFunctions(source, functionName, replace) {
  const prefix = `${functionName.toLowerCase()}(`;
  const lowerSource = source.toLowerCase();
  let cursor = 0;
  let output = '';

  while (cursor < source.length) {
    let start = lowerSource.indexOf(prefix, cursor);
    while (start !== -1 && start > 0 && /[-_a-z0-9]/i.test(source[start - 1])) {
      start = lowerSource.indexOf(prefix, start + prefix.length);
    }
    if (start === -1) {
      output += source.slice(cursor);
      break;
    }

    output += source.slice(cursor, start);
    let depth = 1;
    let end = start + prefix.length;
    while (end < source.length && depth > 0) {
      if (source[end] === '(') depth++;
      if (source[end] === ')') depth--;
      end++;
    }

    if (depth !== 0) {
      throw new Error(`Unclosed CSS function ${functionName}().`);
    }

    const inner = source.slice(start + prefix.length, end - 1);
    output += replace(inner);
    cursor = end;
  }

  return output;
}

function mixCssColors(expression) {
  const parts = splitTopLevel(expression, ',').map(part => part.trim());
  if (parts.length !== 3 || parts[0].toLowerCase() !== 'in srgb') {
    throw new Error(`Unsupported CSS color mix: color-mix(${expression})`);
  }

  const first = parseWeightedColor(parts[1]);
  const second = parseWeightedColor(parts[2]);
  if (first.weight === undefined && second.weight === undefined) {
    first.weight = 50;
    second.weight = 50;
  } else if (first.weight === undefined) {
    first.weight = 100 - second.weight;
  } else if (second.weight === undefined) {
    second.weight = 100 - first.weight;
  }

  if (first.weight < 0 || second.weight < 0) {
    throw new Error(`Invalid CSS color mix: color-mix(${expression})`);
  }

  const total = first.weight + second.weight;
  if (total <= 0) {
    throw new Error(`Invalid CSS color mix: color-mix(${expression})`);
  }

  const firstWeight = first.weight / total;
  const secondWeight = second.weight / total;
  const mixedAlpha = first.color.a * firstWeight + second.color.a * secondWeight;
  if (mixedAlpha === 0) return 'transparent';

  const channel = key => Math.round(
    (first.color[key] * first.color.a * firstWeight + second.color[key] * second.color.a * secondWeight) / mixedAlpha,
  );
  const alpha = mixedAlpha * Math.min(1, total / 100);
  const color = { r: channel('r'), g: channel('g'), b: channel('b'), a: alpha };
  return formatColor(color);
}

function parseWeightedColor(value) {
  const match = value.match(/^(.*?)\s+([\d.]+)%$/);
  const colorText = match ? match[1].trim() : value.trim();
  const weight = match ? Number(match[2]) : undefined;
  if (weight !== undefined && (!Number.isFinite(weight) || weight < 0 || weight > 100)) {
    throw new Error(`Invalid CSS color weight: ${value}`);
  }

  return { color: parseColor(colorText), weight };
}

function parseColor(value) {
  if (value.toLowerCase() === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0 };
  }

  const match = value.match(HEX_COLOR);
  if (!match) {
    throw new Error(`PNG conversion supports hex colors, but received: ${value}`);
  }

  let hex = match[1];
  if (hex.length === 3 || hex.length === 4) {
    hex = [...hex].map(character => character.repeat(2)).join('');
  }
  if (hex.length === 6) hex += 'ff';

  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
    a: Number.parseInt(hex.slice(6, 8), 16) / 255,
  };
}

function formatColor({ r, g, b, a }) {
  if (a >= 1) {
    return `#${[r, g, b].map(channel => channel.toString(16).padStart(2, '0')).join('')}`;
  }
  return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(4))})`;
}

function splitTopLevel(source, delimiter) {
  const parts = [];
  let depth = 0;
  let start = 0;

  for (let index = 0; index < source.length; index++) {
    if (source[index] === '(') depth++;
    if (source[index] === ')') depth--;
    if (source[index] === delimiter && depth === 0) {
      parts.push(source.slice(start, index));
      start = index + 1;
    }
  }

  parts.push(source.slice(start));
  return parts;
}
