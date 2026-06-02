# Rubric Grader

![Rubric Grader screenshot](./screenshot.png)

Build a weighted rubric, pick a performance level per criterion, and get an
instant **weighted score**, percentage, and per-criterion breakdown — then print
a clean graded sheet.

A single self-contained HTML page (Tailwind via CDN). Category: **educational**
(teachers).

## Load it into App Studio

- **Load it straight in** — use [`rubric-grader.appstudio`](./rubric-grader.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`rubric-grader.html`](./rubric-grader.html), copy it
  all, then **New → paste → Run App**.

## Notes

- Edit criteria, weights, and level descriptors; comes with a sample essay
  rubric. No print button — it uses `@media print`, so App Studio's **Print**
  produces a clean graded sheet. **No runtime service dependency**; saved in
  `localStorage`.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../LICENSE) for the terms.
