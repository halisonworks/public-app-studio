# Quiz Game

An 8-question multiple-choice quiz: one question at a time, **instant feedback**,
**score tracking**, a **best score** saved to your browser, keyboard answers
(1–4), and a results screen with **Play again**.

A single self-contained HTML page (Tailwind via CDN). Category: **game / quiz**.

## Load it into App Studio

- **Load it straight in** — use [`quiz-game.appstudio`](./quiz-game.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`quiz-game.html`](./quiz-game.html), copy it all, then
  **New → paste → Run App**.

## Make it yours

The questions are defined inline as a list near the top of the script — swap in
your own (4 options each, with the index of the correct answer) to make a quiz on
any topic.

## Notes

- **No runtime service dependency**; the best score lives in `localStorage`.
- Made with the [game-quiz](../../prompts/context/game-quiz.md) category add-on.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../LICENSE) for the terms.
