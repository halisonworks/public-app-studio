# Projects

Ready-made App Studio projects you can download and load. Projects are organized
into **category folders** — open one to browse just those, or see
[`catalog.md`](../catalog.md) for the full table with a screenshot gallery.

## Categories

- [`educational/`](./educational/) — price-calculator, persona-developer, flashcards, rubric-grader
- [`business/`](./business/) — cap-table-simulator, runway-forecaster, loan-amortization, quote-builder, commission-calculator, ab-test-calculator, gantt-chart, invoice-generator, pricing-page, ux-retention-simulator
- [`data/`](./data/) — sales-dashboard (React + recharts), chart-maker
- [`personal/`](./personal/) — habit-tracker, pomodoro-timer, tip-calculator
- [`creative/`](./creative/) — color-palette, infographic-stats, link-in-bio
- [`game/`](./game/) — quiz-game
- [`prototype/`](./prototype/) — saas-prototype

`price-calculator` and `persona-developer` also include a Norwegian (`i18n/nb/`)
version.

## What a project looks like

Each project lives in a folder **inside its category** and ships **two files** —
the same project in two forms, one for each way you might use it:

```
projects/
└─ personal/
   └─ tip-calculator/
      ├─ tip-calculator.appstudio   ← load straight into App Studio (Import)
      ├─ tip-calculator.jsx         ← the raw source (copy-paste, read, review)
      └─ README.md                  ← what it is and how to use it
```

| File | What it is | How you use it |
|------|------------|----------------|
| `*.appstudio` | App Studio's native project file (JSON, `schema: app-studio/canvas@1`) — carries the code plus packaging metadata | **Share → Import**, or drop it into your `App Studio Projects` folder. This is the "loads straight in" path. |
| `*.jsx` / `*.html` | The raw source on its own | **New → paste → Run App**. Also the human-readable, diff-friendly copy. |

The two are kept in lockstep: the `.appstudio` file's `code` field **is** the
contents of the raw source file. Edit the raw source, then regenerate the
`.appstudio`.

### The source itself

App Studio runs one of two self-contained shapes:

- a **single, default-exported React component** (`.jsx`), or
- a **self-contained HTML page** (`.html`) with its CSS and JavaScript inline.

No build step, no project setup. React and its hooks are always available; any
other import is fetched automatically from [esm.sh](https://esm.sh) at render
time. Examples in this library stick to React + inline styles so they render
identically everywhere.

## The header comment

The attribution / permitted-use header lives **inside the source code** — a
comment at the top of the `.jsx` / `.html` file. Because the `.appstudio`
`code` field contains that same source, the header rides along automatically; a
`.appstudio` file is JSON, so it gets **no** top-of-file comment of its own.
Copy-paste header templates are in [`file-header.md`](./file-header.md).

**Keep this header and the source link in place when you modify a project.**
See the root [LICENSE](../LICENSE) for the terms.

## Adding a project

1. Create a folder for the project inside its category folder
   (`projects/<category>/<project>/`, kebab-case).
2. Add the raw source (`.jsx` / `.html`) with the header comment at the top.
3. Generate the matching `.appstudio` file (JSON with `schema`,
   `name`, the source in `code`, and `packaging`). See
   [`docs/project-file-format`](https://github.com/halisonworks/app-studio-app/blob/main/docs/project-file-format.md)
   in the app repo for the exact shape.
4. Add a short `README.md` describing what it does and how to load it.
