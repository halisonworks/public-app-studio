# Ahnentafel Number Tool

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes or simplified models — verify any result yourself before relying on it.

Work with **ahnentafel** (Sosa-Stradonitz) ancestor numbers — the numbering where
the subject is #1, and any person *n* has father *2n* and mother *2n+1*.

- **Decode** a number into the exact ancestral path ("father's mother's father"),
  its generation, sex, and relationship label — with the number shown in binary,
  each bit annotated F/M.
- **Encode** by clicking Father / Mother to build a path and watch the number add
  up.
- **Chart** — generate a clean numbered ancestor list for a chosen number of
  generations.

A single self-contained HTML page (Tailwind via CDN). Category: **genealogy**.

## Load it into App Studio

- **Load it straight in** — use [`ahnentafel-numbering.appstudio`](./ahnentafel-numbering.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`ahnentafel-numbering.html`](./ahnentafel-numbering.html),
  copy it all, then **New → paste → Run App**.

## Notes

- Ahnentafel numbers are the backbone of pedigree charts and many genealogy
  programs: every man is even, every woman odd (except #1), and a generation
  starts at 2^(g−1). This tool makes the mapping concrete in both directions.
- Runs fully offline; inputs persist in `localStorage`. Keep the header comment
  and source link intact. See the root [LICENSE](../../../LICENSE).
