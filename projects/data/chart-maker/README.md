# Chart Maker

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

![Chart Maker screenshot](./screenshot.png)

Paste data (or fill a table), pick **bar / line / donut**, set a title and accent
color, and get a clean chart — drawn with hand-rolled SVG, no chart library.

A single self-contained HTML page (Tailwind via CDN). Category: **data /
visual** (spreadsheet, infographic, and graph makers).

## Load it into App Studio

- **Load it straight in** — use [`chart-maker.appstudio`](./chart-maker.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`chart-maker.html`](./chart-maker.html), copy it all,
  then **New → paste → Run App**.

## Notes

- Parses pasted CSV / "label, value" lines forgivingly. **No runtime service
  dependency**; saved in `localStorage`. No export button — capture with App
  Studio's **PNG export**.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../LICENSE) for the terms.
