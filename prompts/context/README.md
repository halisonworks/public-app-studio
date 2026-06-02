# Category context add-ons

Optional context documents that layer on top of
[`../authoring-guide.md`](../authoring-guide.md). The base guide sets the
universal App Studio rules; a category add-on adds the conventions that fit a
particular *kind* of app.

## How to use

1. Upload [`../authoring-guide.md`](../authoring-guide.md) to your AI.
2. Also upload the category add-on that fits (e.g. educational or business).
3. Send a short, simple prompt describing what you want.

Use only the add-on(s) that fit. They aren't mutually exclusive — a tool can be
both educational and business-oriented — but don't pile on context you don't
need.

## Categories

- [`educational.md`](./educational.md) — teaching / learning tools, organized
  into **Learn**, **Practice**, and **Present** modes
- [`business.md`](./business.md) — professional / operator tools; no teaching
  framing, focused on KPIs, scenarios, and dashboards

## Applies to every category

- Don't build **print**, **"Save as PDF"**, or **image / PNG export** buttons —
  App Studio already provides Print and PNG export.
- One self-contained file; no runtime backend, API keys, login, or LLM calls
  (static CDN assets like a CSS framework or fonts are fine).
