# Changelog

All notable changes to Pretty Mermaid are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Native Node.js PNG output for single-file and batch rendering, with configurable width and no external converter requirement.

## [1.0.0] - 2026-08-20

### Added

- SVG and ASCII/Unicode rendering for flowcharts, sequence diagrams, state diagrams, class diagrams, ER diagrams, and XY charts.
- Fifteen built-in themes, custom colors, transparent SVGs, layout controls, and interactive XY chart tooltips.
- Single-file and parallel batch CLIs with automatic first-run dependency installation.
- Example diagrams, detailed references, a generated theme gallery, and English, Chinese, and Japanese documentation.
- Node.js compatibility CI, contribution guidance, issue forms, and security and conduct policies.

### Fixed

- Reject inherited object properties such as `constructor` and `toString` as theme names.
- Apply named themes and custom colors consistently to SVG and terminal output.
- Replace stale documentation commands with the bundled Node.js CLIs.

[Unreleased]: https://github.com/imxv/Pretty-mermaid-skills/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/imxv/Pretty-mermaid-skills/releases/tag/v1.0.0
