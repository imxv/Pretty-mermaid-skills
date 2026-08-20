# Pretty Mermaid Theme Gallery

Use this gallery to compare every built-in theme against the same flowchart. Light themes work well for print and white documentation surfaces; dark themes work well for developer tools, dark READMEs, and presentations. The shared Mermaid source is available in `assets/theme_gallery/source.mmd`.

Regenerate all previews after a theme or renderer change:

```bash
npm run gallery
```

## Light themes

| `zinc-light` | `tokyo-night-light` |
| --- | --- |
| ![zinc-light theme](../assets/theme_gallery/zinc-light.svg) | ![tokyo-night-light theme](../assets/theme_gallery/tokyo-night-light.svg) |

| `catppuccin-latte` | `nord-light` |
| --- | --- |
| ![catppuccin-latte theme](../assets/theme_gallery/catppuccin-latte.svg) | ![nord-light theme](../assets/theme_gallery/nord-light.svg) |

| `github-light` | `solarized-light` |
| --- | --- |
| ![github-light theme](../assets/theme_gallery/github-light.svg) | ![solarized-light theme](../assets/theme_gallery/solarized-light.svg) |

## Dark themes

| `zinc-dark` | `tokyo-night` |
| --- | --- |
| ![zinc-dark theme](../assets/theme_gallery/zinc-dark.svg) | ![tokyo-night theme](../assets/theme_gallery/tokyo-night.svg) |

| `tokyo-night-storm` | `catppuccin-mocha` |
| --- | --- |
| ![tokyo-night-storm theme](../assets/theme_gallery/tokyo-night-storm.svg) | ![catppuccin-mocha theme](../assets/theme_gallery/catppuccin-mocha.svg) |

| `nord` | `dracula` |
| --- | --- |
| ![nord theme](../assets/theme_gallery/nord.svg) | ![dracula theme](../assets/theme_gallery/dracula.svg) |

| `github-dark` | `solarized-dark` |
| --- | --- |
| ![github-dark theme](../assets/theme_gallery/github-dark.svg) | ![solarized-dark theme](../assets/theme_gallery/solarized-dark.svg) |

| `one-dark` | |
| --- | --- |
| ![one-dark theme](../assets/theme_gallery/one-dark.svg) | |

## Custom colors

Use a built-in theme as a starting point or supply explicit colors:

```bash
node scripts/render.mjs \
  --input diagram.mmd \
  --output custom.svg \
  --bg '#0f172a' \
  --fg '#e2e8f0' \
  --accent '#38bdf8' \
  --line '#818cf8'
```

See the [theme reference](../references/THEMES.md) for every color role and selection guidance.
