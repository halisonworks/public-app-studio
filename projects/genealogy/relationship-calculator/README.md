# Relationship Calculator

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes or simplified models — verify any result yourself before relying on it.

Work out how two relatives are related. Tell it how many generations each person
is below their **most recent common ancestor**, and it names the relationship —
"second cousins once removed", "great-aunt", "first cousins" — with the
reciprocal term and the civil / canon-law **degree of kinship**. Quick presets
cover the common cases, and a small descent diagram shows the two lines meeting
at the shared ancestor.

A single self-contained HTML page (Tailwind via CDN). Category: **genealogy**.

## Load it into App Studio

- **Load it straight in** — use [`relationship-calculator.appstudio`](./relationship-calculator.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`relationship-calculator.html`](./relationship-calculator.html),
  copy it all, then **New → paste → Run App**.

## Notes

- The hard part of any relationship question is identifying the *most recent
  common ancestor* — once you know how many generations down each person sits,
  the naming is mechanical. This tool does the naming.
- Runs fully offline; inputs persist in `localStorage`. Keep the header comment
  and source link at the top of the file. See the root [LICENSE](../../../LICENSE).
