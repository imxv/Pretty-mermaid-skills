# Releasing Pretty Mermaid

This process is for maintainers publishing a version from the default branch. Do not create a release from a feature branch.

## 1. Prepare the version

1. Confirm `package.json` contains the intended semantic version.
2. Move completed entries from `Unreleased` into a dated section in `CHANGELOG.md`.
3. Confirm the release notes describe user-visible behavior, compatibility, and important fixes.
4. Merge the release changes into `main` and wait for CI to pass.

## 2. Verify from `main`

```bash
git switch main
git pull --ff-only origin main
npm ci
npm test
npm run validate
npm run gallery
git diff --exit-code -- assets/theme_gallery
```

The working tree should remain clean after verification.

## 3. Tag and publish

For the first release:

```bash
git tag -a v1.0.0 -m "Pretty Mermaid v1.0.0"
git push origin v1.0.0
```

Pushing a `v*` tag starts the Release workflow. It reruns tests and documentation validation, then creates a GitHub Release with generated notes categorized by `.github/release.yml`.

If the workflow fails, fix the underlying problem on `main`, create a new version tag, and publish that tag. Do not move a public release tag after users may have fetched it.
