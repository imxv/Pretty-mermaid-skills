# beautiful-mermaid 1.1 API Reference

Use this reference when extending the bundled CLI scripts or calling `beautiful-mermaid` directly. The Skill currently targets `beautiful-mermaid@^1.1.3`.

## Rendering API

```js
import {
  renderMermaidSVG,
  renderMermaidSVGAsync,
  renderMermaidASCII,
  THEMES,
} from 'beautiful-mermaid';
```

- `renderMermaidSVG(text, options?)` returns an SVG string synchronously.
- `renderMermaidSVGAsync(text, options?)` returns the same SVG as a promise.
- `renderMermaidASCII(text, options?)` returns Unicode or plain ASCII terminal output.
- `THEMES` contains the 15 built-in color themes.
- `parseMermaid(text)` parses source into a graph for custom processing.
- `fromShikiTheme(theme)` converts a Shiki theme to diagram colors.

Legacy aliases `renderMermaid` and `renderMermaidAscii` still exist in 1.1.3, but new code should use the canonical names above.

## SVG Options

| Option | Default | Purpose |
| --- | --- | --- |
| `bg`, `fg` | zinc light colors | Base background and foreground colors |
| `line`, `accent`, `muted`, `surface`, `border` | derived | Optional enriched theme colors |
| `font` | `Inter` | Font family |
| `transparent` | `false` | Transparent SVG background |
| `padding` | `40` | Canvas padding in pixels |
| `nodeSpacing` | `24` | Horizontal spacing between sibling nodes |
| `layerSpacing` | `40` | Vertical spacing between layers |
| `componentSpacing` | `24` | Spacing between disconnected components |
| `thoroughness` | `3` | Crossing-minimization trials from 1 to 7 |
| `interactive` | `false` | Hover tooltips for XY chart bars and points |

## ASCII Options

| Option | Default | Purpose |
| --- | --- | --- |
| `useAscii` | `false` | Use plain ASCII instead of Unicode box drawing |
| `paddingX` | `5` | Horizontal node spacing |
| `paddingY` | `5` | Vertical node spacing |
| `boxBorderPadding` | `1` | Inner box padding |
| `colorMode` | `auto` | `none`, `auto`, `ansi16`, `ansi256`, `truecolor`, or `html` |
| `theme` | none | Partial ASCII role-color overrides |

## Supported Inputs

The renderer auto-detects flowcharts, sequence diagrams, state diagrams, class diagrams, ER diagrams, and `xychart-beta`. Version 1.1 also supports `linkStyle`, CJK state names, multiline labels, disconnected components, and per-subgraph direction overrides.

For exact upstream behavior, consult the [beautiful-mermaid README](https://github.com/lukilabs/beautiful-mermaid#readme) and [v1.x releases](https://github.com/lukilabs/beautiful-mermaid/releases).
