# Cap Table Simulator

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

![Cap Table Simulator screenshot](./screenshot.png)

Model funding rounds and option pools and watch ownership dilute across Seed,
Series A, and beyond — the kind of thing usually locked behind Carta or Pulley.
Add shareholders and rounds; see each stakeholder's % before and after every
round, plus an ownership-composition chart.

A single self-contained HTML page (Tailwind via CDN). Category: **business /
finance** (founders, investors).

## Load it into App Studio

- **Load it straight in** — use [`cap-table-simulator.appstudio`](./cap-table-simulator.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`cap-table-simulator.html`](./cap-table-simulator.html),
  copy it all, then **New → paste → Run App**.

## Notes

- A simplified standard pre/post-money dilution model — for planning, not legal
  record-keeping. **No runtime service dependency**; data is saved in
  `localStorage`.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../LICENSE) for the terms.
