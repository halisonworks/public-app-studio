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
