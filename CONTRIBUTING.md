# Contributing to Pretty Mermaid

Thanks for helping improve Pretty Mermaid. Contributions are welcome for renderer behavior, diagram compatibility, documentation, themes, examples, and developer experience.

## Before you start

- Search existing issues and pull requests to avoid duplicate work.
- Open a feature request before a large behavioral change so the approach can be discussed.
- Keep changes focused. Unrelated fixes are easier to review as separate pull requests.

## Local setup

Pretty Mermaid requires Node.js 16 or newer.

```bash
git clone https://github.com/imxv/Pretty-mermaid-skills.git
cd Pretty-mermaid-skills
npm ci
npm test
```

Render an example while developing:

```bash
node scripts/render.mjs \
  --input assets/example_diagrams/flowchart.mmd \
  --output /tmp/pretty-mermaid-preview.svg \
  --theme tokyo-night
```

## Making changes

1. Create a branch with a descriptive name.
2. Add or update a smoke-test case when behavior changes.
3. Update the relevant README, Skill instructions, or reference document.
4. Run `npm run gallery` when themes or SVG rendering affect the committed previews.
5. Run the checks below before opening a pull request.

```bash
npm test
npm run validate
npm run gallery
git diff --check
git diff --exit-code -- assets/theme_gallery
```

`git diff --exit-code -- assets/theme_gallery` should produce no output. If it reports changes, commit the regenerated previews.

## Pull requests

A useful pull request includes:

- a concise problem statement;
- the behavior before and after the change;
- tests or reproduction steps;
- rendered examples for visual changes;
- documentation updates when commands or supported syntax change.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
