# Category context — Educational / teaching

Layer this on top of [`../authoring-guide.md`](../authoring-guide.md): upload
both, then send a short prompt. This add-on shapes the app for learners — and
for a teacher presenting to a class.

## Upload or paste this into your AI

```
This project is an educational / teaching tool for learners, and for a teacher
presenting to a class. Shape it accordingly:

- Organize the experience into clear modes or tabs:
  - Learn — explain the concept in plain language: the idea, the formulas
    (shown simply), and a worked example. Use progressive disclosure, not a wall
    of text.
  - Practice — hands-on, interactive use with immediate feedback; include a few
    realistic exercises or scenarios the learner can try.
  - Present — a clean full-screen view for a projector or smartboard: large,
    legible type, minimal chrome, just the key visuals and numbers. Give a clear
    way in and out (a button, plus the ESC key to exit).
- Use plain, encouraging language and realistic examples (never lorem ipsum).
- Make every control teach something: changing an input should visibly change
  the outcome in real time.
- Keep it self-contained — no accounts, grading servers, or logins.
- Do NOT add print, PDF, or export buttons — App Studio already provides Print
  and PNG export.
```

## Example

The [price calculator](../examples/price-calculator.md) follows this pattern: a
School mode (Learn + Practice — theory and student tasks) and a full-screen
Presentation mode.
