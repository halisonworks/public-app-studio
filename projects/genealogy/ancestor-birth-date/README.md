# Age & Birth-Date Calculator

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes or simplified models — verify any date yourself before relying on it.

The date arithmetic family historians do constantly, in one place:

- **Birth date from death + age** — a gravestone or death record says "died
  14 March 1888, aged 67 years 4 months 11 days"; this gives you the birth date
  (3 November 1820), by exact calendar borrowing with real month lengths and leap
  years — and flags when the result is approximate.
- **Exact age between two dates** — completed years, months and days, plus total
  days and weeks.
- **Census age → birth-year window** — a stated age on an enumeration date gives
  a birth range, not a single year; this shows the window.

A single self-contained HTML page (Tailwind via CDN). Category: **genealogy**.

## Load it into App Studio

- **Load it straight in** — use [`ancestor-birth-date.appstudio`](./ancestor-birth-date.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`ancestor-birth-date.html`](./ancestor-birth-date.html),
  copy it all, then **New → paste → Run App**.

## Notes

- Carved ages are often rounded or wrong; treat a computed birth date as a strong
  lead, not proof. For records before **14 September 1752**, remember the calendar
  change (see the *Old Style / New Style Date Converter* in this category).
- Runs fully offline; inputs persist in `localStorage`. Keep the header comment
  and source link intact. See the root [LICENSE](../../../LICENSE).
