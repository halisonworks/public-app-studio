# Quote Builder

![Quote Builder screenshot](./screenshot.png)

Build a clean sales quote / proposal: client details, line items with per-line
and overall discounts, tax and totals, and a scope/terms section. Saves to your
browser and prints to a tidy proposal.

A single self-contained HTML page (Tailwind via CDN). Category: **business /
sales**.

## Load it into App Studio

- **Load it straight in** — use [`quote-builder.appstudio`](./quote-builder.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`quote-builder.html`](./quote-builder.html), copy it
  all, then **New → paste → Run App**.

## Notes

- No print button: it uses `@media print`, so App Studio's built-in **Print**
  produces a clean proposal. **No runtime service dependency**; saved in
  `localStorage`.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../LICENSE) for the terms.
