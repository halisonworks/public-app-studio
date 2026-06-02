# Source Citation Builder

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes or simplified models — check any citation against your house style before relying on it.

Build a tidy, consistent **source citation** for the record types genealogists
cite most: census, vital records (birth / marriage / death), church and parish
registers, gravestones, newspapers, books, online databases, and manuscripts.
Pick a record type, fill in the fields it needs, and it generates three forms
live — a **full first-reference note**, a **short subsequent note**, and a
**bibliography / source-list entry** — each with a copy button. A built-in
source log (saved in your browser) keeps the citations you've built.

A single self-contained HTML page (Tailwind via CDN). Category: **genealogy**.

## Load it into App Studio

- **Load it straight in** — use [`citation-builder.appstudio`](./citation-builder.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`citation-builder.html`](./citation-builder.html), copy
  it all, then **New → paste → Run App**.

## Notes

- The layered format is **inspired by** Elizabeth Shown Mills' *Evidence
  Explained* style, simplified. House and society styles vary — treat the output
  as a clean draft and adapt it.
- Runs fully offline; the source log persists in `localStorage`. Keep the header
  comment and source link intact. See the root [LICENSE](../../../LICENSE).
