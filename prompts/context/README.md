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
  into **Learn**, **Practice**, and **Present** modes *(teachers, presenters)*
- [`business.md`](./business.md) — professional / operator tools; KPIs,
  scenarios, dashboards *(founders, investors, managers, sales, finance)*
- [`personal.md`](./personal.md) — private, single-user, localStorage-first tools
  *(trackers, planners, budgets)*
- [`data-dashboard.md`](./data-dashboard.md) — KPI grids and charts from mocked
  or pasted data *(finance, analysts, spreadsheet/graph makers)*
- [`creative.md`](./creative.md) — SVG/canvas makers and generators *(marketers,
  designers, influencers, infographic makers)*
- [`game-quiz.md`](./game-quiz.md) — small games and quizzes with score and
  restart *(teachers, marketers, presenters)*
- [`prototype.md`](./prototype.md) — interactive product/feature mockups
  *(founders, PMs, designers prototyping app ideas)*
- [`travel.md`](./travel.md) — travel / tourism tools, for a personal traveller
  **and** the *Sales, Service and Tourism* (reiseliv) classroom *(travellers,
  teachers, students)*
- [`diy-hobby.md`](./diy-hobby.md) — practical maker's calculators and planners
  *(knitting, cooking, gardening, carpentry, renovation)*

These map to who App Studio is for: founders, investors, managers, sales people,
marketers, teachers, presenters, finance people, spreadsheet / Miro / graph /
infographic makers, influencers, and anyone making a quick app prototype. Pick
the add-on closest to your use; combine two if a tool genuinely spans both.

## Applies to every category

- Don't build **print**, **"Save as PDF"**, or **image / PNG export** buttons —
  App Studio already provides Print and PNG export.
- One self-contained file; no runtime backend, API keys, login, or LLM calls
  (static CDN assets like a CSS framework or fonts are fine).
