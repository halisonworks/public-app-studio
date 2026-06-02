# Old Style / New Style Date Converter

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes or simplified models — verify any date yourself before relying on it.

Make sense of pre-modern dates in old records:

- **Convert** between the **Julian (Old Style)** and **Gregorian (New Style)**
  calendars in either direction, with the day-count difference for that date.
- **Day of the week** for any historical date (pick the right calendar — Britain
  and its colonies used Julian until 14 September 1752).
- **Double dating** — under the old English civil calendar the year began on
  25 March, so a date like 11 February 1731 is often written **1731/32**; this
  helper shows the double-dated form for dates between 1 January and 24 March.

A single self-contained HTML page (Tailwind via CDN). Category: **genealogy**.

## Load it into App Studio

- **Load it straight in** — use [`old-style-date-converter.appstudio`](./old-style-date-converter.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`old-style-date-converter.html`](./old-style-date-converter.html),
  copy it all, then **New → paste → Run App**.

## Notes

- Built on a Julian Day Number engine; the day of the week is the same physical
  day in both calendars. Britain dropped 11 days in 1752 (Wed 2 Sep → Thu 14 Sep);
  Catholic countries switched in 1582. Proleptic-calendar caveats apply to very
  early dates.
- Runs fully offline; inputs persist in `localStorage`. Keep the header comment
  and source link intact. See the root [LICENSE](../../../LICENSE).
