# Using KIT Apps with your AI

KIT Apps runs whatever an AI chatbot gives you: a single block of code, or a full HTML page. You do not need to know what any of it is. Ask the AI for "a small web app" or "an interactive HTML page", copy what it gives you, click **New** in KIT Apps, paste, and click **Run App**.

Below are quick prompts and copy steps for the popular assistants.

## Gemini

Gemini often returns a complete, self-contained HTML page (its "Canvas" / build view).

1. Ask for something like: *"Build me a single self-contained HTML page that is a habit tracker. Put all the CSS and JavaScript in the one file."*
2. Click the **Copy** button on the code block (or open the Canvas and copy its contents).
3. In KIT Apps: **New** -> paste -> **Run App**.

KIT Apps detects a full HTML page automatically and runs it as-is.

## ChatGPT

ChatGPT usually returns a code block.

1. Ask for: *"Write a small self-contained app as a single HTML file (HTML, CSS and JavaScript together)."* If you prefer a React component, ask for *"a single React component, default-exported."*
2. Click **Copy** on the code block.
3. In KIT Apps: **New** -> paste -> **Run App**.

## Grok

1. Ask for: *"Give me a single-file HTML app for X, everything in one file."*
2. Copy the code block.
3. In KIT Apps: **New** -> paste -> **Run App**.

## Claude

Claude returns either a React component or a full HTML document. Both work.

1. Ask for: *"a self-contained HTML page"* or *"a single default-exported React component."*
2. Copy the result.
3. In KIT Apps: **New** -> paste -> **Run App**.

## Tips

- If nothing renders, ask the AI to *"put everything in one file"* and paste again.
- If it errors, click **Copy a fix request for your AI** on the error screen and paste that straight back into the chat for a corrected version.
- Once it runs, click **Save** to keep it in your library, give it a name and a category, and pin it to a quick-launch tile.
- **Building something that saves data** (a CRM, a tracker)? Tell the AI to *"persist the data with `window.appStudio.storage`"*, or to share it across a team with `window.appStudio.shared`. See [canvas-app-apis.md](./canvas-app-apis.md).
- Everything stays on your computer. KIT Apps has no account and no cloud.
