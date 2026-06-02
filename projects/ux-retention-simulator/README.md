# UX Retention Simulator

An interactive sandbox that models a **90-day user cohort** — its retention and
cumulative revenue — under different UX / gamification strategies. Compare an
**extractive** design against an **empowering** one and watch the curves react
in real time.

A single self-contained HTML page (Tailwind + FontAwesome + Google Fonts via
CDN; all logic and the chart are hand-rolled, no JS chart library).

Features:

- **Octalysis core-drive sliders** (white-hat / mixed / black-hat) plus
  loss-aversion, Zeigarnik, and variable-reward toggles.
- Three **archetype presets** (Extractive / Empowering / Realist Hybrid) and a
  macro mode switch.
- A custom **SVG chart** of retention decay and cumulative revenue, with hover
  read-out and a **snapshot baseline** you can overlay for comparison.
- Live **KPIs**, a **milestone ledger** table, and rule-based **behavioral-health
  diagnostics** that change with your settings.

## Load it into App Studio

- **Load it straight in** — use [`ux-retention-simulator.appstudio`](./ux-retention-simulator.appstudio):
  **Share → Import** in App Studio, or drop it into your `App Studio Projects`
  folder.
- **Copy-paste** — open [`ux-retention-simulator.html`](./ux-retention-simulator.html),
  copy it all, then **New → paste → Run App**.

## Notes

- It loads Tailwind, FontAwesome, and Google Fonts from CDNs, so it needs a
  network on first load — but it has **no runtime service dependency** (no
  backend, API keys, login, or LLM), so it runs on its own.
- The retention/revenue model is an illustrative simulation for exploring
  trade-offs, not validated forecasting.
- The prompt that generated this is in
  [`prompts/examples/ux-retention-simulator.md`](../../prompts/examples/ux-retention-simulator.md).
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../LICENSE) for the terms.
