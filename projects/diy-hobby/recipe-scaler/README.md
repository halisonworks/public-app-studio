# Recipe Scaler

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

Scale a recipe up or down by changing the number of servings. It recalculates
every ingredient in real time, shows the scale factor, and includes a small
unit converter (volume ↔ weight, using ingredient density presets) so you can
work in whatever unit your scales or cups measure.

A small, self-contained React component. No external libraries, no build step.

**Available in:** English · [Norsk (Bokmål)](./i18n/nb/)

## Load it into App Studio

Two ways, pick whichever suits you:

- **Load it straight in** — copy the contents of
  [`recipe-scaler.jsx`](./recipe-scaler.jsx) and in App Studio choose
  **New → paste → Run App**.
- **Or open the file from disk** if your App Studio version supports it.

Click **Save** to keep it in your library.

## Make it yours

A few easy edits inside `recipe-scaler.jsx`:

- **Density presets** — edit the `DENSITY_PRESETS` array to add your own
  ingredients (e.g. milk at 1.03 g/ml, olive oil at 0.91 g/ml).
- **Unit list** — add or remove entries from `UNIT_ML` and the `<option>`
  lists in the converter section.
- **Accent color** — change `#d97706` in the `styles` object to any color you
  like; it appears on headings, the scale badge, and the converted result.

Keep the header comment and the source link at the top of the source. See the
root [LICENSE](../../../LICENSE) for the terms.
