# Flashcards

![Flashcards screenshot](./screenshot.png)

A flashcard study tool: flip cards, shuffle, **mark what you know**, and track
progress. Comes with a sample deck — edit it inline to study any topic.

A single self-contained HTML page (Tailwind via CDN). Category: **educational**
(also a good fit for game/quiz).

## Load it into App Studio

- **Load it straight in** — use [`flashcards.appstudio`](./flashcards.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`flashcards.html`](./flashcards.html), copy it all,
  then **New → paste → Run App**.

## Make it yours

The deck is a list near the top of the script — each card has a `front` (term)
and `back` (definition). Swap in your own to study anything.

## Notes

- **No runtime service dependency**; your "known" cards and position are kept in
  `localStorage`. Flip with click/Space, navigate with arrow keys.
- Made with the [educational](../../prompts/context/educational.md) add-on.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../LICENSE) for the terms.
