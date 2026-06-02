# Shared cM Relationship Predictor

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes or simplified models — verify any result against trees and known relatives before relying on it.

Enter the **total shared centimorgans (cM)** for a DNA match and see which family
relationships are statistically plausible. Each candidate shows its average and
observed range with a bar that plots where your value falls, sorted with the most
likely first, and a headline "most likely" relationship. Relationships that share
the same statistical band (grandparent / aunt-uncle / half-sibling, for example)
are grouped together — because shared cM alone usually can't tell them apart.

A single self-contained HTML page (Tailwind via CDN). Category: **genealogy**.

## Load it into App Studio

- **Load it straight in** — use [`shared-cm-predictor.appstudio`](./shared-cm-predictor.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`shared-cm-predictor.html`](./shared-cm-predictor.html),
  copy it all, then **New → paste → Run App**.

## Notes

- Ranges are based on the publicly published **Shared cM Project** (v4, Blaine
  Bettinger / DNA Painter). They overlap heavily — cM is a clue, not proof. Use
  trees, X-DNA, segment data and known relatives to confirm. **0 cM does not rule
  out** a distant relationship.
- Runs fully offline; inputs persist in `localStorage`. Keep the header comment
  and source link intact. See the root [LICENSE](../../../LICENSE).
