# Category context — Math (learning tools)

Layer this on top of [`../authoring-guide.md`](../authoring-guide.md) (and, if
you like, the [educational](./educational.md) add-on): upload them, then send a
short prompt. This add-on shapes the app as an interactive maths learning tool —
well suited to the Norwegian curriculum (LK20: 1P, 2P, …).

## Upload or paste this into your AI

```
This project is an interactive maths learning tool for students. Shape it
accordingly:

- Pick ONE topic and teach it well. Open with a short, plain-language forklaring
  and the relevant formula(s).
- Make it interactive: sliders/inputs that update an SVG figure, a graph, or a
  worked calculation live, so the student sees cause and effect.
- Always show the worked steps, not just the answer
  (e.g. "A = s² = 5² = 25 cm²" or "vekstfaktor = 1 + 3,5/100 = 1,035").
- The maths must be correct: exact formulas, sensible rounding, labelled units,
  and guards against division by zero / NaN.
- If it targets the Norwegian curriculum, write the UI in Norwegian (Bokmål),
  use the right terms (stigningstall, vekstfaktor, sentralmål, prosentpoeng, …)
  and state the level (1P / 2P).
- No backend or LLM at runtime — everything is computed locally. localStorage
  for the last inputs is fine.
```

## Built examples

[`projects/math/`](../../projects/math/) — Norwegian **1P** and **2P** sets
(areal & Pytagoras, lineære funksjoner, vekstfaktor, statistikk, sannsynlighet,
prosent, enheter, and more).
