# Category context — Business / professional

Layer this on top of [`../authoring-guide.md`](../authoring-guide.md): upload
both, then send a short prompt. This add-on shapes the app as a professional
tool, not a lesson.

## Upload or paste this into your AI

```
This project is a business / professional tool for someone who already knows the
domain. Shape it accordingly:

- Skip teaching framing — no theory tab, no tutorials, no "what is X" explainers.
  Assume the user understands the terms.
- Focus on getting work done: clear inputs with sensible defaults, live KPIs,
  scenario comparison, and tables or charts that update in real time.
- Aim for a professional, calm, information-dense but uncluttered dashboard look.
- Persist the user's inputs with localStorage where it helps.
- Optionally include a clean full-screen "Present" view for sharing results in a
  meeting — but no learning or tutorial content.
- Do NOT add print, PDF, or export buttons — App Studio already provides Print
  and PNG export.
```

## Example

The [UX retention simulator](../examples/ux-retention-simulator.md) follows this
pattern: presets, live KPIs, an interactive chart, a milestone ledger, and
scenario snapshots — no teaching framing.
