# Pomodoro Timer

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
- Made with the [personal](../../prompts/context/personal.md) category add-on.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../LICENSE) for the terms.
