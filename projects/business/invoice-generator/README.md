# Invoice Generator

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

![Invoice Generator screenshot](./screenshot.png)

Build a clean invoice: your business details, the client's, line items with live
totals, a tax rate, and a currency. Saves to your browser, and prints to a tidy
one-page invoice.

A single self-contained HTML page (Tailwind via CDN). Category: **business /
finance** — handy for freelancers and small businesses.

## Load it into App Studio

- **Load it straight in** — use [`invoice-generator.appstudio`](./invoice-generator.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`invoice-generator.html`](./invoice-generator.html),
  copy it all, then **New → paste → Run App**.

## Notes

- Everything is saved in `localStorage`; there's **no backend, account, or login**.
- No print button: it uses `@media print`, so App Studio's built-in **Print**
  produces a clean invoice (editing controls are hidden on print).
- Made with the [business](../../../prompts/context/business.md) category add-on.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../LICENSE) for the terms.
