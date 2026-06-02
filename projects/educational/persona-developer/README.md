# Persona Developer

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

![Persona Developer screenshot](./screenshot.png)

A method tool for building customer **personas** — for students, entrepreneurs,
and marketers. Capture demographics, geography, psychographics, and behavior,
then present the result as a clean persona card.

A single self-contained HTML page (Tailwind + Inter via CDN). Three modes:

- **Learn** — detailed fields with short theory boxes (demographics, geography,
  psychographics, behavior) and leading helper questions.
- **Practice** — a compact, streamlined form with the theory hidden.
- **Present** — a read-only, projector-ready persona card (ESC to exit; a
  discreet toast reminds you how).

Plus four **audience templates**, a random **inspiration generator**, automatic
**localStorage** save/restore, and print-optimized CSS that isolates just the
card.

> Uses a Norwegian-market framing (`kr`, Norwegian place names).

**Available in:** English · [Norsk (Bokmål)](./i18n/nb/)

## Load it into App Studio

- **Load it straight in** — use [`persona-developer.appstudio`](./persona-developer.appstudio):
  **Share → Import** in App Studio, or drop it into your `App Studio Projects`
  folder.
- **Copy-paste** — open [`persona-developer.html`](./persona-developer.html),
  copy it all, then **New → paste → Run App**.

## Notes

- Loads Tailwind and the Inter font from CDNs (needs a network on first load),
  but has **no runtime service dependency** — no backend, API keys, login, or
  LLM — so it runs on its own.
- There's no print button: the Present card just carries `@media print` styles,
  so App Studio's built-in **Print** produces a clean, isolated card.
- The prompt that generated this is in
  [`prompts/examples/persona-developer.md`](../../../prompts/examples/persona-developer.md).
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../LICENSE) for the terms.
