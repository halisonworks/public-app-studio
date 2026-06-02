# Loan Amortization

![Loan Amortization screenshot](./screenshot.png)

A loan / mortgage calculator: **monthly payment**, total interest, and payoff
time (including the effect of extra payments), with a full amortization schedule
and a balance chart.

A single self-contained HTML page (Tailwind via CDN). Category: **business /
finance** (finance, personal).

## Load it into App Studio

- **Load it straight in** — use [`loan-amortization.appstudio`](./loan-amortization.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`loan-amortization.html`](./loan-amortization.html),
  copy it all, then **New → paste → Run App**.

## Notes

- Standard amortization math with a currency selector (kr / $ / €). **No runtime
  service dependency**; inputs saved in `localStorage`.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../LICENSE) for the terms.
