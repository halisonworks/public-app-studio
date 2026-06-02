# A/B Test Calculator

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

![A/B Test Calculator screenshot](./screenshot.png)

Check whether an A/B test result is statistically significant: conversion rates,
absolute and relative uplift, a two-proportion **z-test** p-value, a confidence
interval, and a clear verdict at your chosen threshold (90 / 95 / 99%).

A single self-contained HTML page (Tailwind via CDN). Category: **business /
marketing** (data).

## Load it into App Studio

- **Load it straight in** — use [`ab-test-calculator.appstudio`](./ab-test-calculator.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`ab-test-calculator.html`](./ab-test-calculator.html),
  copy it all, then **New → paste → Run App**.

## Notes

- Correct two-proportion z-test with a normal-CDF approximation for the p-value.
  **No runtime service dependency** — pure client-side stats.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../LICENSE) for the terms.
