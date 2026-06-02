# Prompt — self-contained HTML page

Use this when you want a complete web page rather than a React component. App
Studio detects a full HTML page and runs it as-is. Fill in the
`{{placeholders}}` and paste it into your AI assistant.

---

```
Build me **a single self-contained HTML file** that is
**{{a short description — e.g. "a habit tracker for the week"}}**.

Requirements:
- One `.html` file. Put **all CSS and JavaScript inline** in the same file.
- Do not link to external stylesheets or scripts; no build step, no
  dependencies to install.
- Make it interactive: {{list the behaviors you want}}.
- It should look good filling a desktop window.

Return only the HTML, in one block.
```

---

## Then

1. Copy the code block.
2. App Studio: **New → paste → Run App**.
3. To change it, reply to the AI with what you want different and paste again.

## Example fill-in

```
Build me a single self-contained HTML file that is **a weekly habit tracker**.
All CSS and JS inline, no external links. It should: let me add habits, show a
7-day grid, let me tick each day, and remember my habits using
`localStorage`. Return only the HTML.
```
