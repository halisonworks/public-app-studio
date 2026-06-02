# Time Zones & Flight

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

![Time Zones & Flight screenshot](./screenshot.png)

A world clock and a flight-arrival calculator in one. Track several cities'
local times at a glance, then enter a departure time and a flight duration and
see exactly when you land in the destination's local time — layovers and the
+/− day difference included.

A single self-contained HTML page (Tailwind via CDN). Category: **Travel** (personal). **English UI.**

## Load it into App Studio

- **Load it straight in** — use [`timezones-flight.appstudio`](./timezones-flight.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`timezones-flight.html`](./timezones-flight.html), copy
  it all, then **New → paste → Run App**.

## Notes

- Uses fixed UTC offsets and ignores daylight saving time, so treat the times as
  approximate. **No runtime service dependency** — offsets are a built-in table
  and the clock reads your device. Saved cities persist in `localStorage`.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../LICENSE) for the terms.
