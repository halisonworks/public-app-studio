# Planting Calendar

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

A month-by-month sow, plant-out, and harvest timeline for 12 common vegetables,
designed for a temperate Northern European growing season. Pick a climate zone
(coastal, average, or inland) to shift dates earlier or later, toggle which
crops to show, and use the bed spacing planner to work out how many plants fit
in your raised bed or row. Dates are rough guides that vary by year, location,
and variety.

A small, self-contained React component. No external libraries, no build step.

**Available in:** English · [Norsk (Bokmål)](./i18n/nb/)

## Load it into App Studio

Two ways, pick whichever suits you:

- **Load it straight in** — use `planting-calendar.appstudio` via
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`planting-calendar.jsx`](./planting-calendar.jsx),
  copy its contents, then in App Studio: **New → paste → Run App**. Then **Save**.

## Make it yours

A few easy edits:

- **Edit crop data** — the `CROPS` array at the top of the file holds each
  vegetable's name, sow/plant/harvest month ranges, and spacing values. Adjust
  any of these to match your seeds and local climate.
- **Tweak region offsets** — the `REGION_OPTIONS` array maps each zone label to
  a month shift (`-1`, `0`, `+1`). Change the values or add more zones.
- **Accent colors** — swap `#16a34a` (green) in the `styles` object to change
  the calendar's color theme.

Keep the header comment and the source link at the top of the source. See the
root [LICENSE](../../../LICENSE) for the terms.
