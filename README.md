<div align="center">

# Pretty-Mermaid Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/imxv/Pretty-mermaid-skills?style=social)](https://github.com/imxv/Pretty-mermaid-skills)

**English** ｜ [中文](README_CN.md)

</div>

## Introduction
A Mermaid diagram rendering skill for AI, supporting both SVG and ASCII output formats to make your documentation more vivid.

## ✨ Features

- 📊 **Multi-format Support**: SVG and ASCII rendering export
- 🎨 **Rich Themes**: 15 built-in themes for different scenarios
- 📈 **Full Diagram Support**: Flowchart, Sequence, State, Class, ER and more
- ⚡ **High Performance**: Batch parallel rendering
- 📚 **Ready to Use**: Complete templates and detailed documentation

### Supported Themes
| Light Themes | Dark Themes | Other |
| :--- | :--- | :--- |
| zinc-light | zinc-dark | nord |
| tokyo-night-light | tokyo-night | nord-light |
| cappuccin-latte | tokyo-night-storm | dracula |
| github-light | cappuccin-mocha | one-dark |
| solarized-light | github-dark | |
| | solarized-dark | |

## 🤖 AI Assistant Integration

Seamlessly integrates with the following AI coding environments:

- **Claude Code**
- **Cursor**
- **Gemini CLI**
- **Antigravity**
- **OpenCode**
- **Codex**
- **qoder**

## 🚀 Installation

### One-click Install
```bash
npx skills add https://github.com/imxv/Preety-mermaid-skills
```

### Verify Installation
```bash
cd Pretty-mermaid
node scripts/themes.mjs
```
> **Note**: Dependencies will be auto-installed on first run. Just ensure Node.js is available.

## 📖 Quick Start

### List Available Themes
```bash
node scripts/themes.mjs
```

### Render Single Diagram
```bash
node scripts/render.mjs \
  --input diagram.mmd \
  --output output.svg \
  --theme tokyo-night
```

### Batch Render
```bash
node scripts/batch.mjs \
  --input-dir ./diagrams \
  --output-dir ./output \
  --theme dracula
```

## 📂 Examples

Check the 5 template files in `assets/example_diagrams/`:
- `flowchart.mmd` - Flowchart
- `sequence.mmd` - Sequence Diagram
- `state.mmd` - State Diagram
- `class.mmd` - Class Diagram
- `er.mmd` - ER Diagram

## 📚 Documentation
See [SKILL.md](SKILL.md) for detailed usage guide.

## ⚙️ Requirements
- Node.js 14+

## 📄 License
MIT License

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=imxv/Pretty-mermaid-skills&type=date&legend=top-left)](https://www.star-history.com/#imxv/Pretty-mermaid-skills&type=date&legend=top-left)

## 🙏 Acknowledgments
Based on [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid)
