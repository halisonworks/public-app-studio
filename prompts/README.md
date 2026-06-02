# Prompts

Example prompts for creating your own App Studio projects from scratch with an
AI assistant (Claude, ChatGPT, Gemini, Grok, …).

The point is to get the AI to return something App Studio can run directly: a
single default-exported React component, or a self-contained HTML page.

## The best, simplest workflow

1. **Upload [`authoring-guide.md`](./authoring-guide.md) to your AI** (or paste
   it once) at the start of the chat — it carries all the App Studio rules and
   constraints. For a particular *kind* of app, also upload a category add-on
   from [`context/`](./context/) (e.g. educational or business).
2. **Then send a short, simple prompt** — a sentence or two saying what you want.
   The AI fills in the rest within those rules.

Everything below — templates and worked examples — supports that flow. The
templates are handy when you'd rather not upload the guide; the worked examples
each pair a one-paragraph "simple" prompt with the guide.

## Category context

Optional add-ons in [`context/`](./context/) that shape the result for a kind of
app. Upload one alongside `authoring-guide.md`, then write your short prompt:

- [`context/educational.md`](./context/educational.md) — teaching / learning
  tools (Learn, Practice, and Present modes)
- [`context/business.md`](./context/business.md) — professional / operator tools
  (no teaching framing; KPIs, scenarios, dashboards)
- [`context/personal.md`](./context/personal.md) — private, localStorage-first
  productivity tools
- [`context/data-dashboard.md`](./context/data-dashboard.md) — KPI grids and
  charts from mocked or pasted data
- [`context/creative.md`](./context/creative.md) — SVG/canvas makers and
  generators
- [`context/game-quiz.md`](./context/game-quiz.md) — small games and quizzes
- [`context/prototype.md`](./context/prototype.md) — interactive product/feature
  mockups

## The two shapes App Studio runs

| Shape | Ask the AI for… | Notes |
|-------|-----------------|-------|
| React component | "a single, default-exported React component" | React + hooks are built in; other imports load from esm.sh |
| HTML page | "a single self-contained HTML file with all CSS and JS inline" | Detected and run as-is |

If nothing renders, the fix is almost always the same: ask the AI to
**"put everything in one file"** and paste again.

## How to use a prompt

1. Open the prompt template that matches what you want to build.
2. Replace the **`{{placeholders}}`** with your own idea.
3. Paste it into your AI assistant.
4. Copy the result into App Studio: **New → paste → Run App**.
5. Not quite right? Tell the AI what to change and paste the new version.

## Templates

- [`authoring-guide.md`](./authoring-guide.md) — **upload this first**: the
  document of rules/constraints that lets your own prompt stay short
- [`react-component.md`](./react-component.md) — a single React component
- [`html-page.md`](./html-page.md) — a self-contained HTML page
- [`refine-existing.md`](./refine-existing.md) — improve something you already have

## Worked examples

Full, real prompts (with a ready-to-run build in `projects/`):

- [`examples/price-calculator.md`](./examples/price-calculator.md) — an
  interactive markup / margin / VAT calculator
  ([Norsk](./examples/i18n/nb/price-calculator.md))
- [`examples/ux-retention-simulator.md`](./examples/ux-retention-simulator.md) —
  a dark-pattern vs empowering-design cohort retention dashboard
- [`examples/persona-developer.md`](./examples/persona-developer.md) — a
  Learn / Practice / Present persona builder
  ([Norsk](./examples/i18n/nb/persona-developer.md))

## Tips

- Be specific about behavior ("when I click X, Y happens") rather than looks.
- Ask for **inline styles or inline CSS** so it renders anywhere with no setup.
- Keep it to one screen to start; add features in follow-up messages.
