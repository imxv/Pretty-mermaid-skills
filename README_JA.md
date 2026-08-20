<div align="center">

# Pretty Mermaid

**AI エージェントのための美しい Mermaid ダイアグラム**

Mermaid ソースを洗練された SVG とターミナル向け ASCII に変換します。ローカルで動作し、ブラウザーは不要です。

![Pretty Mermaid が Mermaid ソースをテーマ付き SVG とターミナル ASCII に変換する例](assets/social-preview.png)

[![skills.sh](https://skills.sh/b/imxv/pretty-mermaid-skills)](https://www.skills.sh/imxv/pretty-mermaid-skills/pretty-mermaid)
[![CI](https://github.com/imxv/Pretty-mermaid-skills/actions/workflows/ci.yml/badge.svg)](https://github.com/imxv/Pretty-mermaid-skills/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/imxv/Pretty-mermaid-skills?style=social)](https://github.com/imxv/Pretty-mermaid-skills)

**日本語** ｜ [English](README.md) ｜ [中文](README_CN.md)

</div>

## 🚀 インストール

```bash
npx skills add imxv/pretty-mermaid-skills@pretty-mermaid -g -y
```

[skills.sh でインストール数とセキュリティ監査を確認 →](https://www.skills.sh/imxv/pretty-mermaid-skills/pretty-mermaid)

## Pretty Mermaid を選ぶ理由

- **AI エージェント向け**：Claude Code、Cursor、Codex、Gemini CLI などに対応
- **1 つのソースから 2 形式**：ドキュメント向け SVG とターミナル向け ASCII/Unicode
- **ブラウザー不要**：Chromium、Puppeteer、DOM に依存せずローカルでレンダリング
- **柔軟な設定**：15 テーマ、カスタムカラー、6 種類のダイアグラム、バッチ処理

## ✨ 主な機能

- 📊 **複数形式**：SVG と ASCII/Unicode を出力
- 🎨 **豊富なテーマ**：用途に合わせた 15 の組み込みテーマ
- 📈 **6 種類のダイアグラム**：Flowchart、Sequence、State、Class、ER、XY Chart
- ⚡ **高速処理**：複数ファイルを並列でバッチレンダリング
- 📚 **すぐに使える**：テンプレートと詳細なリファレンスを同梱

### 対応テーマ

| Light Themes | Dark Themes | Other |
| :--- | :--- | :--- |
| zinc-light | zinc-dark | nord |
| tokyo-night-light | tokyo-night | nord-light |
| catppuccin-latte | tokyo-night-storm | dracula |
| github-light | catppuccin-mocha | one-dark |
| solarized-light | github-dark | |
| | solarized-dark | |

## 🎨 テーマギャラリー

[15 テーマの完全なギャラリー](docs/THEME_GALLERY.md)で、同じフローチャートの見た目を比較できます。

<p align="center">
  <img src="assets/theme_gallery/tokyo-night.svg" alt="Tokyo Night テーマのプレビュー" width="49%">
  <img src="assets/theme_gallery/github-light.svg" alt="GitHub Light テーマのプレビュー" width="49%">
</p>

## 🤖 AI アシスタント連携

次の AI コーディング環境から自然言語で利用できます。

- **Claude Code**
- **Cursor**
- **Gemini CLI**
- **Antigravity**
- **OpenCode**
- **Codex**
- **qoder**

## インストールの確認

```bash
npx skills list -g
```

グローバル Skill 一覧に `pretty-mermaid` が表示されることを確認してください。Node.js 16 以上が必要です。

## 📖 クイックスタート

### テーマ一覧

```bash
node scripts/themes.mjs
```

### 1 つのダイアグラムをレンダリング

```bash
node scripts/render.mjs \
  --input diagram.mmd \
  --output output.svg \
  --theme tokyo-night
```

### ディレクトリをバッチレンダリング

```bash
node scripts/batch.mjs \
  --input-dir ./diagrams \
  --output-dir ./output \
  --theme dracula
```

## 📂 サンプル

`assets/example_diagrams/` に 6 種類のテンプレートがあります。

- `flowchart.mmd` - フローチャート
- `sequence.mmd` - シーケンス図
- `state.mmd` - 状態遷移図
- `class.mmd` - クラス図
- `er.mmd` - ER 図
- `xychart.mmd` - XY チャート（棒グラフと折れ線グラフ）

CJK の状態名、複数行ラベル、`linkStyle`、ELK レイアウト間隔、XY チャートのツールチップ、ANSI カラーのターミナル出力にも対応します。

## 📚 ドキュメント

- [Skill 利用ガイド](SKILL.md)
- [テーマギャラリー](docs/THEME_GALLERY.md)
- [ダイアグラム構文リファレンス](references/DIAGRAM_TYPES.md)
- [テーマとカスタムカラー](references/THEMES.md)
- [beautiful-mermaid API リファレンス](references/api_reference.md)
- [リリース手順](RELEASING.md)

## 🤝 コミュニティ

参加する前に[コントリビューションガイド](CONTRIBUTING.md)を確認してください。機密性のある問題を共有する前に[セキュリティポリシー](SECURITY.md)をお読みください。リリース履歴は[変更履歴](CHANGELOG.md)にあります。

## ⚙️ 動作要件

- Node.js 16 以上

## 📄 ライセンス

MIT License

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=imxv/Pretty-mermaid-skills&type=timeline&legend=top-left)](https://www.star-history.com/?repos=imxv%2FPretty-mermaid-skills&type=timeline&legend=bottom-right)

## 🙏 謝辞

[beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) を利用しています。
