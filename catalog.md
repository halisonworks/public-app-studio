# Catalog

Browse the library by category. Every project ships a native `.appstudio` file
(load straight into App Studio via **Share → Import**) plus the raw source for
copy-paste and reading.

> ⚠️ **Everything here is an example** — a starting point, not a finished
> product. Projects may contain errors or simplified/inaccurate calculations.
> Verify anything important before relying on it.

## Who it's for

Founders, investors, managers, sales people, marketers, teachers, presenters,
finance people, spreadsheet / Miro / graph / infographic makers, influencers,
and anyone who wants to make a quick prototype of an app idea.

## Gallery

| | | |
|---|---|---|
| [![price-calculator](projects/educational/price-calculator/screenshot.png)](projects/educational/price-calculator/) **Price calculator** | [![ux-retention-simulator](projects/business/ux-retention-simulator/screenshot.png)](projects/business/ux-retention-simulator/) **UX retention simulator** | [![persona-developer](projects/educational/persona-developer/screenshot.png)](projects/educational/persona-developer/) **Persona developer** |
| [![habit-tracker](projects/personal/habit-tracker/screenshot.png)](projects/personal/habit-tracker/) **Habit tracker** | [![color-palette](projects/creative/color-palette/screenshot.png)](projects/creative/color-palette/) **Color palette** | [![quiz-game](projects/game/quiz-game/screenshot.png)](projects/game/quiz-game/) **Quiz game** |
| [![saas-prototype](projects/prototype/saas-prototype/screenshot.png)](projects/prototype/saas-prototype/) **SaaS prototype** | [![invoice-generator](projects/business/invoice-generator/screenshot.png)](projects/business/invoice-generator/) **Invoice generator** | [![pricing-page](projects/business/pricing-page/screenshot.png)](projects/business/pricing-page/) **Pricing page** |
| [![flashcards](projects/educational/flashcards/screenshot.png)](projects/educational/flashcards/) **Flashcards** | [![pomodoro-timer](projects/personal/pomodoro-timer/screenshot.png)](projects/personal/pomodoro-timer/) **Pomodoro timer** | [![infographic-stats](projects/creative/infographic-stats/screenshot.png)](projects/creative/infographic-stats/) **Infographic stats** |
| [![cap-table-simulator](projects/business/cap-table-simulator/screenshot.png)](projects/business/cap-table-simulator/) **Cap table simulator** | [![runway-forecaster](projects/business/runway-forecaster/screenshot.png)](projects/business/runway-forecaster/) **Runway forecaster** | [![loan-amortization](projects/business/loan-amortization/screenshot.png)](projects/business/loan-amortization/) **Loan amortization** |
| [![quote-builder](projects/business/quote-builder/screenshot.png)](projects/business/quote-builder/) **Quote builder** | [![commission-calculator](projects/business/commission-calculator/screenshot.png)](projects/business/commission-calculator/) **Commission calculator** | [![ab-test-calculator](projects/business/ab-test-calculator/screenshot.png)](projects/business/ab-test-calculator/) **A/B test calculator** |
| [![chart-maker](projects/data/chart-maker/screenshot.png)](projects/data/chart-maker/) **Chart maker** | [![gantt-chart](projects/business/gantt-chart/screenshot.png)](projects/business/gantt-chart/) **Gantt chart** | [![rubric-grader](projects/educational/rubric-grader/screenshot.png)](projects/educational/rubric-grader/) **Rubric grader** |
| [![link-in-bio](projects/creative/link-in-bio/screenshot.png)](projects/creative/link-in-bio/) **Link in bio** | | |

*(`tip-calculator` and `sales-dashboard` are React components — they render inside App Studio.)*

## Projects

| Project | Category | Shape | Languages | Prompt |
|---------|----------|-------|-----------|--------|
| [tip-calculator](projects/personal/tip-calculator/) | Personal / utility | React | EN | — |
| [price-calculator](projects/educational/price-calculator/) | Educational · Business | HTML | EN, NB | [prompt](prompts/examples/price-calculator.md) |
| [ux-retention-simulator](projects/business/ux-retention-simulator/) | Business · Data | HTML | EN | [prompt](prompts/examples/ux-retention-simulator.md) |
| [persona-developer](projects/educational/persona-developer/) | Educational | HTML | EN, NB | [prompt](prompts/examples/persona-developer.md) |
| [habit-tracker](projects/personal/habit-tracker/) | Personal | HTML | EN | [starter](prompts/context/personal.md) |
| [sales-dashboard](projects/data/sales-dashboard/) | Data / dashboard | React | EN | [starter](prompts/context/data-dashboard.md) |
| [color-palette](projects/creative/color-palette/) | Creative | HTML | EN | [starter](prompts/context/creative.md) |
| [quiz-game](projects/game/quiz-game/) | Game / quiz | HTML | EN | [starter](prompts/context/game-quiz.md) |
| [saas-prototype](projects/prototype/saas-prototype/) | Prototype | HTML | EN | [starter](prompts/context/prototype.md) |
| [invoice-generator](projects/business/invoice-generator/) | Business / finance | HTML | EN | — |
| [pricing-page](projects/business/pricing-page/) | Business / sales | HTML | EN | — |
| [flashcards](projects/educational/flashcards/) | Educational | HTML | EN | — |
| [pomodoro-timer](projects/personal/pomodoro-timer/) | Personal | HTML | EN | — |
| [infographic-stats](projects/creative/infographic-stats/) | Creative | HTML | EN | — |
| [cap-table-simulator](projects/business/cap-table-simulator/) | Business / finance | HTML | EN | — |
| [runway-forecaster](projects/business/runway-forecaster/) | Business / finance | HTML | EN | — |
| [loan-amortization](projects/business/loan-amortization/) | Business / finance | HTML | EN | — |
| [quote-builder](projects/business/quote-builder/) | Business / sales | HTML | EN | — |
| [commission-calculator](projects/business/commission-calculator/) | Business / sales | HTML | EN | — |
| [ab-test-calculator](projects/business/ab-test-calculator/) | Business / marketing | HTML | EN | — |
| [chart-maker](projects/data/chart-maker/) | Data / visual | HTML | EN | — |
| [gantt-chart](projects/business/gantt-chart/) | Business / managers | HTML | EN | — |
| [rubric-grader](projects/educational/rubric-grader/) | Educational | HTML | EN | — |
| [link-in-bio](projects/creative/link-in-bio/) | Creative | HTML | EN | — |

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
