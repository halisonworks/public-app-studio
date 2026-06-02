# Statistikk

![Statistikk screenshot](./screenshot.png)

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

Enter a dataset and get the central measures and spread — **gjennomsnitt**,
**median**, **typetall**, **variasjonsbredde**, and **standardavvik** (with the
formula shown) — plus a histogram marking the mean and median.

Interactive learning tool for Norwegian **matematikk 2P** (LK20). **Norwegian UI.**
A single self-contained HTML page (Tailwind via CDN; hand-rolled SVG histogram).
Category: **Math · NO-2P**.

## Load it into App Studio

- **Load it straight in** — use [`statistikk.appstudio`](./statistikk.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`statistikk.html`](./statistikk.html), copy it all,
  then **New → paste → Run App**.

## Notes

- Uses the population standard deviation (divides by *n*), as is standard in 2P.
  **No runtime service dependency** — all maths is computed locally.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../../LICENSE) for the terms.
