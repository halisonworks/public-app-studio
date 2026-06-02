# Soundex Surname Coder

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes or simplified models — verify any result yourself before relying on it.

Compute the **American Soundex** code for a surname — the phonetic index the U.S.
National Archives used for the 1880–1920 censuses, and a staple for searching
immigration and naturalization records. Type a name to see its four-character code
(e.g. *Smith*, *Smyth* and *Smithe* all code as **S530**) with a step-by-step
breakdown of how each letter was coded. A **batch** mode codes a whole list of
spelling variants and highlights which ones share a code (so you know they'd sit
together in a Soundex index), and a **compare** mode checks two spellings.

A single self-contained HTML page (Tailwind via CDN). Category: **genealogy**.

## Load it into App Studio

- **Load it straight in** — use [`soundex-coder.appstudio`](./soundex-coder.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`soundex-coder.html`](./soundex-coder.html), copy it
  all, then **New → paste → Run App**.

## Notes

- Implements standard **American Soundex** (the NARA rules), verified against the
  canonical test cases (Robert → R163, Ashcraft → A261, Tymczak → T522, …). It is
  **not** Daitch-Mokotoff Soundex, which is better for Central/Eastern European
  surnames.
- Runs fully offline; inputs persist in `localStorage`. Keep the header comment
  and source link intact. See the root [LICENSE](../../../LICENSE).
