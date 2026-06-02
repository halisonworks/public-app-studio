# Interactive Price Calculator

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

![Interactive Price Calculator screenshot](./screenshot.png)

An interactive calculator for **markup**, **contribution margin**, and **VAT** —
built as a teaching aid for an upper-secondary *Sales, Service and Tourism*
course and as a quick tool for small businesses.

A single self-contained HTML page (Tailwind via CDN). Features:

- Bi-directionally bound **markup %** and **contribution margin %** sliders.
- Four live result cards (price excl. VAT, contribution margin, VAT amount,
  price incl. VAT) and a color-coded price-breakdown bar.
- A **discount simulator** (10/20/30%) showing how cuts eat the margin, with a
  "below cost" warning when the margin goes negative.
- **School mode** (theory + student tasks) and **Business mode** (a real-time
  break-even analysis).
- A full-screen **presentation mode** (projector-friendly, ESC to exit).

> Uses a Norwegian VAT model (25 / 15 / 12 / 0%) and `kr` as the currency.

**Available in:** English · [Norsk (Bokmål)](./i18n/nb/)

## Load it into App Studio

- **Load it straight in** — use [`price-calculator.appstudio`](./price-calculator.appstudio):
  **Share → Import** in App Studio, or drop it into your `App Studio Projects`
  folder.
- **Copy-paste** — open [`price-calculator.html`](./price-calculator.html), copy
  it all, then **New → paste → Run App**.

## Notes

- It loads Tailwind from a CDN, so it needs a network on first load — but it has
  **no runtime service dependency** (no backend, API keys, login, or LLM), so it
  keeps working on its own.
- The prompt that generated this is in
  [`prompts/examples/price-calculator.md`](../../../prompts/examples/price-calculator.md).
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../LICENSE) for the terms.
