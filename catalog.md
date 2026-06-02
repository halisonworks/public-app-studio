# Catalog

Browse the library by category. Every project ships a native `.appstudio` file
(load straight into App Studio via **Share → Import**) plus the raw source for
copy-paste and reading.

## Who it's for

Founders, investors, managers, sales people, marketers, teachers, presenters,
finance people, spreadsheet / Miro / graph / infographic makers, influencers,
and anyone who wants to make a quick prototype of an app idea.

## Projects

| Project | Category | Shape | Languages | Prompt |
|---------|----------|-------|-----------|--------|
| [tip-calculator](projects/tip-calculator/) | Personal / utility | React | EN | — |
| [price-calculator](projects/price-calculator/) | Educational · Business | HTML | EN, NB | [prompt](prompts/examples/price-calculator.md) |
| [ux-retention-simulator](projects/ux-retention-simulator/) | Business · Data | HTML | EN | [prompt](prompts/examples/ux-retention-simulator.md) |
| [persona-developer](projects/persona-developer/) | Educational | HTML | EN, NB | [prompt](prompts/examples/persona-developer.md) |

## Categories (prompt add-ons)

Upload one of these to your AI alongside [`prompts/authoring-guide.md`](prompts/authoring-guide.md),
then write a short prompt. See [`prompts/context/`](prompts/context/).

| Add-on | For |
|--------|-----|
| `educational` | teachers, presenters — Learn / Practice / Present |
| `business` | founders, investors, managers, sales, finance |
| `personal` | private localStorage-first trackers and planners |
| `data-dashboard` | finance, analysts, spreadsheet / graph makers |
| `creative` | marketers, designers, influencers, infographic makers |
| `game-quiz` | teachers, marketers, presenters |
| `prototype` | founders, PMs, designers prototyping app ideas |

## Validating

Run `node scripts/validate.mjs` (or `npm run validate`) to check that every
project's `.appstudio`, source, and header are well-formed. See
[CONTRIBUTING.md](CONTRIBUTING.md).
