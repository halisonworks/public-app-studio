# Risk Assessment

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

![Risk Assessment screenshot](./screenshot.png)

An HMS-style risk-assessment tool for the **Sales, Service and Tourism**
classroom, built around the likelihood × consequence matrix. Rate each hazard,
see it land on a colour-coded 5×5 grid, add measures, and watch the **residual
risk** drop toward green. Hazards are saved to your browser.

A single self-contained HTML page (Tailwind via CDN), with **Learn**,
**Practice**, and a full-screen **Present** mode. Category: **Travel** (teaching · reiseliv). **English UI.**

## Load it into App Studio

- **Load it straight in** — use [`risk-assessment.appstudio`](./risk-assessment.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`risk-assessment.html`](./risk-assessment.html), copy
  it all, then **New → paste → Run App**.

## Notes

- A simplified model with one banding of the 5×5 matrix; real HMS assessment is
  more involved. **No runtime service dependency** — everything is computed
  locally and saved in `localStorage`.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../LICENSE) for the terms.
