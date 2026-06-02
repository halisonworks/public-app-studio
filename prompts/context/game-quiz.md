# Category context — Game / quiz

Layer this on top of [`../authoring-guide.md`](../authoring-guide.md): upload
both, then send a short prompt. This add-on shapes the app as a small game or
quiz — useful for teachers, presenters, and marketers making engaging content.

## Upload or paste this into your AI

```
This project is a small game or quiz. Shape it accordingly:

- Build a clear game loop: start → play → win/lose → restart. Always offer a
  restart.
- Track score, and time where relevant. Support keyboard input where it feels
  natural, and always keep it usable by tap/click on mobile.
- Give immediate feedback on each action, and a visible end state showing the
  result.
- Define the content (questions, cards, levels) inline as data that's easy to
  edit.
- Persist high score or progress with localStorage if it adds value.
- No backend, no accounts, no leaderboard server — everything runs locally.
```

## Good fits

Flashcards, multiple-choice quiz with scoring, memory match, typing-speed test,
"guess the number / word", category-sorting game.

## Try it (starter prompt)

With [`../authoring-guide.md`](../authoring-guide.md) and this add-on uploaded, a
few lines like this is enough:

```
Build a multiple-choice quiz game. Define 8 questions inline (each with 4 options
and one correct answer). Show one question at a time with instant right/wrong
feedback, track the score, and end on a results screen with a "Play again"
button. Let me answer with keys 1–4 or by clicking.
```

## Built example

[`projects/game/quiz-game/`](../../projects/game/quiz-game/) — built with this add-on.

