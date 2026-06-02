# Prompt — single React component

Use this to get a component App Studio can run directly. Fill in the
`{{placeholders}}` and paste it into your AI assistant.

---

```
Write me **a single, default-exported React component** that is
**{{a short description of what you want — e.g. "a Pomodoro timer with start, pause, and reset"}}**.

Requirements:
- One file, one `export default` component. No separate files.
- Use only React and its hooks (`useState`, `useEffect`, etc.). Do not import
  any UI or styling libraries.
- Style it with **inline styles** so it works with no setup.
- Make it self-contained and interactive: {{list the behaviors you want}}.
- Keep it to a single screen that looks good centered in a window.

Return only the code, in one block.
```

---

## Then

1. Copy the code block.
2. App Studio: **New → paste → Run App**.
3. To change it, reply to the AI with what you want different and paste the new
   version.

## Example fill-in

```
Write me a single, default-exported React component that is **a Pomodoro
timer**. One file, `export default`, React hooks only, inline styles. It
should: count down from 25 minutes, have **Start / Pause / Reset** buttons,
and switch to a 5-minute break when the timer hits zero. Return only the code.
```
