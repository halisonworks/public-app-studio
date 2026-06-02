# Pomodoro Timer

> ⚠️ **Example, not a product.** This project was generated as a starting point and learning aid. It may contain mistakes, simplified models, or inaccurate numbers — do not rely on any calculation or result for real decisions without checking it yourself.

![Pomodoro Timer screenshot](./screenshot.png)

A focus timer with **work and break cycles**, a circular countdown, adjustable
durations, and a count of focus sessions completed today. The remaining time
shows in the browser tab title.

A single self-contained HTML page (Tailwind via CDN). Category: **personal /
productivity**.

## Load it into App Studio

- **Load it straight in** — use [`pomodoro-timer.appstudio`](./pomodoro-timer.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`pomodoro-timer.html`](./pomodoro-timer.html), copy it
  all, then **New → paste → Run App**.

## Notes

- **No runtime service dependency**; your durations and today's session count are
  saved in `localStorage`. The end-of-phase beep uses the Web Audio API (no audio
  files).
- Made with the [personal](../../../prompts/context/personal.md) category add-on.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../LICENSE) for the terms.
