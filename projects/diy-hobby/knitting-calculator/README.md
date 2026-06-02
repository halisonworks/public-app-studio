# Knitting Calculator

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

A yarn and gauge helper for knitters. Enter your swatch gauge (stitches and rows
per 10 cm) and a target garment size to get the cast-on stitch count and total
row count. Paste in a pattern's gauge and stitch count to get the adjusted count
that keeps the same finished size on your own gauge. A yarn estimator lets you
pick a yarn weight and calculates roughly how many grams and skeins you need.

A small, self-contained React component. No external libraries, no build step.

**Available in:** English · [Norsk (Bokmål)](./i18n/nb/)

## Load it into App Studio

Two ways, pick whichever suits you:

- **Load it straight in** — use [`knitting-calculator.appstudio`](./knitting-calculator.appstudio):
  in App Studio choose **Share → Import** and select the file, or drop it into
  your `App Studio Projects` folder. It arrives with its name and packaging
  metadata already set.
- **Copy-paste** — open [`knitting-calculator.jsx`](./knitting-calculator.jsx), copy its
  contents, then in App Studio: **New → paste → Run App**.

Click **Save** to keep it in your library, then package it as a desktop app if
you like.

## Make it yours

A few easy edits:

- Adjust the yarn weight consumption factors in the `YARN_WEIGHTS` array at the
  top of `knitting-calculator.jsx` — the defaults are rough industry estimates.
- Change the accent color by replacing `#e11d48` in the `styles` object
  (search for it — it appears in several places).
- Change the default skein size by editing `skeinSize: '50'` in `DEFAULT_STATE`.

Edit `knitting-calculator.jsx` and re-import, or edit the `code` field inside
`knitting-calculator.appstudio` directly (it's plain JSON). Keep the header
comment and the source link at the top of the source. See the
root [LICENSE](../../../LICENSE) for the terms.
