# Material Calculator

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

Three calculators in one: **paint** (wall area, litres, and cost), **flooring / tiles** (packs needed with waste allowance), and **lumber** (boards from a cut list). Covers both renovation and carpentry jobs. Enter your own coverage, waste percentage, and prices to get a quick cost estimate in any currency.

A small, self-contained React component. No external libraries, no build step.

**Available in:** English · [Norsk (Bokmål)](./i18n/nb/)

## Load it into App Studio

Open App Studio, choose **New**, paste the contents of `material-calculator.jsx` into the editor, and click **Run App**. Then **Save** to keep it in your library.

## Make it yours

- **Coverage / waste defaults** — change `paintCoverage`, `floorWaste`, and `lumberStockLength` in `DEFAULT_STATE` to match the products you use most.
- **Currency symbol** — the field defaults to `$`; change `currency: '$'` in `DEFAULT_STATE` to any symbol or prefix you prefer (e.g. `'kr'`, `'€'`).
- **Accent color** — find `#2563eb` in the `styles` object and replace it with any color to match your setup.

Keep the header comment and the source link at the top of the source. See the root [LICENSE](../../../LICENSE) for the terms.
