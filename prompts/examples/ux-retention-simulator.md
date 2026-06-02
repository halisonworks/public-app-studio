# Example prompt — UX Retention Simulator

A worked example of a long, highly-specified prompt: a premium dark-theme
dashboard that simulates a 90-day user cohort and contrasts **extractive** vs
**empowering** UX design, with a hand-rolled SVG chart, a live simulation
engine, a milestone ledger, and rule-based diagnostics.

This is a **full HTML page** example (English UI).

> **App Studio note.** This prompt loads Tailwind, FontAwesome, and Google Fonts
> from CDNs. That's fine for an App Studio project — pulling static front-end
> assets is allowed; what a project must *not* depend on is a runtime service
> (backend, API keys, login, or an LLM). See
> [`../authoring-guide.md`](../authoring-guide.md).
>
> A ready-to-run build of this example lives in
> [`projects/ux-retention-simulator/`](../../projects/ux-retention-simulator/).

It's also a good illustration of giving the model **explicit formulas** and a
**precise visual spec** when you want a deterministic, reproducible result.

---

## Simple version

Upload [`../authoring-guide.md`](../authoring-guide.md) and the
[`../context/business.md`](../context/business.md) add-on to your AI first (they
carry the App Studio rules and the professional-tool shape), then a few lines
like this is enough — this is close to how the example was actually made. The AI
(e.g. Google Gemini) fills in the styling, formulas, and details. Use the
detailed prompt below only when you want precise control.

```
Build a single self-contained HTML page: a premium dark-themed "UX Retention
Simulator" dashboard. Let me switch between an extractive (dark-pattern) and an
empowering design, and adjust sliders for motivational drives (meaning,
accomplishment, empowerment, scarcity, unpredictability, loss aversion, …).
Simulate a 10,000-user cohort over 90 days and plot retention and cumulative
revenue on a custom SVG chart (no chart library) — empowering design should
retain users and earn more over time, while extractive spikes early then
collapses. Add KPIs, a milestone table, and dynamic "health" diagnostic cards
that react to the sliders, plus a button to snapshot the current curves as a
dashed baseline to compare against. Make it responsive, everything in one file.
```

## The prompt

```
You are an expert Frontend Architect and Behavioral Economist. Your task is to
generate a fully interactive, production-grade, single-file HTML/JS web
application titled "UX Retention Simulator - Sandbox Dashboard".

This application must serve as a premium visual tool to demonstrate the
long-term trade-offs between Extractive Design (Dark Patterns) and Empowering
Design (Useful Patterns).

### 1. Core Visual Design & Aesthetics
- **Theme:** High-end dark developer dashboard. Use a rich, deep color palette:
  background `slate-950`, surfaces `slate-900/80` with fine `slate-880`
  borders, primary typography in high-contrast `slate-100` and `slate-300`.
- **Accent Colors:** Use `indigo-500` (core interactive UI elements and
  retention curves), `emerald-500` (value metrics and empowering states), and
  `rose-500` (risk warnings and extractive states).
- **Typography:** Clean sans-serif system font (Inter via Google Fonts) paired
  with a precise monospace font (JetBrains Mono via Google Fonts) for digital
  readouts, metric tables, and simulator ticks.
- **Layout:** A responsive grid for desktop, tablet, and mobile. Left column
  (40% on large screens) holds interactive controls; right column (60%) holds
  the dynamic KPIs, interactive chart, cohort ledger, and diagnostic panels.

### 2. Interactive Controls & UI State Requirements
Maintain an integrated JavaScript global state object tracking:
- **Master Preset Archetypes:**
  - Extractive Archetype: high Scarcity/Loss/Unpredictability drives, dark micro-triggers.
  - Empowering Archetype: high Meaning/Accomplishment/Empowerment drives, useful micro-triggers.
  - Realist Hybrid: a balanced mix of intrinsic and extrinsic drive sliders.
- **Cognitive Bias Micro-Triggers (binary toggles):**
  - Loss Aversion: "Artificial Streak" (Dark) ↔ "Grace Period / Safety Net" (Useful).
  - Zeigarnik Effect (Incompletion): "Infinite Loops" (Dark) ↔ "Mastery Milestones" (Useful).
  - Variable Rewards Hook: "Casino Lootbox" (Dark) ↔ "Aha! Discovery" (Useful).
- **Octalysis 8 Core Drives matrix (sliders 0–10):**
  - White Hat: Meaning & Calling, Accomplishment, Empowerment.
  - Neutral: Ownership, Social Influence.
  - Black Hat: Scarcity, Unpredictability, Loss Avoidance.

### 3. Mathematical Simulation Engine
Runs on window load and recalculates on any input change. Models a cohort of
10,000 starting users (U₀) over a 90-day trajectory.

Normalized behavioral balances:
- **White Hat Score (W):** from Meaning, Accomplishment, Empowerment sliders,
  boosted by active Useful micro-triggers (+2.5 per trigger).
- **Black Hat Score (B):** from Scarcity, Unpredictability, Loss Avoidance
  sliders, boosted by active Dark micro-triggers (+3.5 per trigger).
- **Burnout Risk Index (R_burn):** `B - (W × 0.3)`, clamped to min 0.
- **Boredom Risk Index (R_bore):** `10 - (W × 0.65 + B × 0.35)`, clamped to min 0.

Retention curve modeling — retained cohort percentage R(t) for each day t ∈ [0, 90]:
- Permanent user plateau ("Plateau Moat" M):
  `M = (0.05 + W × 0.055) × max(0.1, 1.0 - R_burn × 0.12)`
- Base decay from boredom-driven early churn and burnout-driven late fatigue:
  `earlyRate = 0.015 + R_bore × 0.0075`
  `fatigueRate = (R_burn × 0.006) × (t / 90.0)`
  `baseDecay = e^(-(earlyRate × t + fatigueRate × t))`
- Short-term dopamine spikes if Black Hat is high (extractive engagement that crashes):
  `D_spike = 1.0 + (0.02 × B × sin(t / 6.0) × e^(-t / 25.0))`  (if B > 3.0)
- Final Retention: `R(t) = (M + (1.0 - M) × baseDecay) × D_spike` (clamped 1%–100%).

Cumulative financial LTV modeling:
- Extractive revenue (high early, degrades fast): `rev_ext = 0.65 × e^(-t/20.0) × (B / 5.0)`
- Ethical/empowerment value revenue (grows over time): `rev_val = (0.08 + 0.0045 × t × W) × (W / 5.0)`
- Cumulative cohort revenue (LTV): summed daily as active cohort size
  (U₀ × R(t)) × daily revenue per user (rev_ext + rev_val).

### 4. Visual Components & Interactivity
- **Interactive charts (SVG-based):** plot Day-by-Day Retention (Y-axis 1) and
  Cumulative Revenue (Y-axis 2) on a single responsive dual-line chart. Do NOT
  use external chart libraries (Chart.js, D3). Write custom, performant inline
  SVG coordinate paths that dynamically resize. Include grid line overlays for
  Days 15, 30, 45, 60, 75, and 90.
- **Snapshot comparison baseline overlay:** a "Snapshot Baseline" button that
  clones the current paths and renders them as dashed violet/green companion
  lines, so users can adjust sliders and see live visual deltas against the
  saved model.
- **Cohort milestone ledger (table):** a responsive monospace table for Days 0,
  1, 7, 15, 30, 60, 90. Rows: Day, Retention Rate (%), Active Cohort, Average
  Daily Revenue / User ($), Cumulative Value ($).
- **Behavioral health diagnostics panel:** evaluate slider inputs in real time
  to generate dynamic cards. Hazards: Overjustification Trap, Extreme Streak
  Burnout, Casino-Type Decay Loop, Under-Motivation. Strengths: Intrinsic Value
  Moat, Resilience Streak, High-Momentum Mastery, Balanced Discovery Loop.

### 5. Technical Delivery Requirements
- **Single-file architecture:** one well-structured, semantic `.html` file with
  all HTML, CSS (Tailwind via CDN), and vanilla JS. No bundlers or external
  assets.
- **Responsive visuals:** SVG charts scale fluidly on resize, updating
  viewports and redrawing paths automatically to avoid clipped lines or
  overlapping typography.
- **Unified UI render loop:** a single state object flowing downward; a unified
  recalculation and redraw function runs on any change (no split states).
- **Clean code & performance:** highly performant, well-commented JS that
  completes in real time (< 16ms frame target); robust fallback values to
  guard metrics against `NaN`.
```
