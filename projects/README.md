# Projects

Ready-made App Studio projects you can download and load.

## In this library

- [`tip-calculator/`](./tip-calculator/) — split a bill and add a tip (React component)
- [`price-calculator/`](./price-calculator/) — markup / margin / VAT calculator with school & business modes (HTML · also [Norsk](./price-calculator/i18n/nb/))
- [`ux-retention-simulator/`](./ux-retention-simulator/) — extractive vs empowering UX cohort-retention dashboard (HTML)
- [`persona-developer/`](./persona-developer/) — build customer personas with Learn / Practice / Present modes (HTML · also [Norsk](./persona-developer/i18n/nb/))
- [`habit-tracker/`](./habit-tracker/) — weekly habit tracker with streaks, saved locally (HTML)
- [`sales-dashboard/`](./sales-dashboard/) — SaaS KPI dashboard, React + recharts (JSX)
- [`color-palette/`](./color-palette/) — harmonious palette generator with lock & copy (HTML)
- [`quiz-game/`](./quiz-game/) — 8-question multiple-choice quiz with score (HTML)
- [`saas-prototype/`](./saas-prototype/) — clickable project-management app mockup (HTML)

See [`catalog.md`](../catalog.md) for the full table by category.

## What a project looks like

Each project lives in its own folder and ships **two files** — the same project
in two forms, one for each way you might use it:

```
projects/
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

1. Create a folder named after the project (kebab-case).
2. Add the raw source (`.jsx` / `.html`) with the header comment at the top.
3. Generate the matching `.appstudio` file (JSON with `schema`,
   `name`, the source in `code`, and `packaging`). See
   [`docs/project-file-format`](https://github.com/halisonworks/app-studio-app/blob/main/docs/project-file-format.md)
   in the app repo for the exact shape.
4. Add a short `README.md` describing what it does and how to load it.
