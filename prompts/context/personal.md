# Category context — Personal / productivity

Layer this on top of [`../authoring-guide.md`](../authoring-guide.md): upload
both, then send a short prompt. This add-on shapes the app as a private,
single-user tool that remembers your data.

## Upload or paste this into your AI

```
This project is a personal / productivity tool for a single user on their own
device. Shape it accordingly:

- It is private and single-user: no accounts, no login, no sharing, no server.
- Persist everything to localStorage automatically and restore it on reload, so
  the user's data survives across sessions. Saving should feel invisible.
- Optimize for fast entry: add / edit / delete items inline, keyboard-friendly,
  with sensible defaults.
- Show the user's own data clearly — lists, totals, streaks, a calendar or
  progress, whatever fits the task.
- Include a clear way to reset or clear data, behind a confirmation.
- Do NOT build cloud sync, export, or print buttons — there is no cloud, and App
  Studio already provides Print and PNG export.
```

## Good fits

Habit tracker, weekly planner, budget / expense tracker, pomodoro timer,
packing list, decision matrix, reading log.

## Try it (starter prompt)

With [`../authoring-guide.md`](../authoring-guide.md) and this add-on uploaded, a
few lines like this is enough:

```
Build a weekly habit tracker. Let me add and remove habits, show a 7-day grid
where I tick each day, and display a current streak and a weekly completion %
per habit. Remember everything across reloads.
```

## Built example

[`projects/personal/habit-tracker/`](../../projects/personal/habit-tracker/) — built with this add-on.

