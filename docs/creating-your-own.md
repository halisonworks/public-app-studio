# Creating your own project

You don't need to write code. Ask an AI assistant for a small app, paste what it
gives you into App Studio, and run it. This page shows the loop.

## What App Studio can run

Two shapes, both self-contained:

- **A single, default-exported React component** — React and its hooks are
  built in; any other import is fetched automatically from
  [esm.sh](https://esm.sh).
- **A self-contained HTML page** — all CSS and JavaScript inline. App Studio
  detects it and runs it as-is.

The golden rule: **everything in one file.** If something doesn't render, ask
the AI to "put everything in one file" and paste again.

## The loop

The simplest, most reliable way: **set the stage once with the App Studio
document, then keep your own prompts short.**

1. **Set the stage.** Give your AI the rules one of two ways: **upload**
   [`prompts/authoring-guide.md`](../prompts/authoring-guide.md) (or paste it
   once) at the start of the chat, **or** — if your assistant can browse the web
   — **point it at this repository**
   (`https://github.com/halisonworks/public-app-studio`) and ask it to read the
   authoring guide and a couple of examples. Either way it learns what App Studio
   runs and how the projects are built, so you don't have to repeat it.
2. **Ask, simply.** Send a short prompt — a sentence or two — like "a habit
   tracker for the week" or "an interactive tip calculator." The AI fills in the
   rest within the rules from step 1. (No guide uploaded? Use a template from
   [`prompts/`](../prompts/) instead.)
3. **Copy.** Grab the code block the AI returns.
4. **Run.** App Studio: **New → paste → Run App**.
5. **Refine.** Tell the AI what to change and paste the new version. Repeat
   until you like it. See [`prompts/refine-existing.md`](../prompts/refine-existing.md).
6. **Save.** Name it, categorize it, keep it in your library.

## Works with any assistant

Claude, ChatGPT, Gemini, and Grok all work. Gemini often returns a full HTML
page; ChatGPT and Claude return either a React component or an HTML page. All
three shapes load the same way.

## Tips

- Describe **behavior**, not just looks: "when I click Add, a row appears."
- Ask for **inline styles / inline CSS** so it runs with no setup.
- Start with one screen; add features in follow-up messages.
- Keep state local (`useState`, or `localStorage` in HTML) — there's no server.

## Saving data and sharing with a team

Want an app that saves real data, or that a small team shares over OneDrive or a
network folder? See [Saving data and sharing it with a team](./data-and-team-sharing.md)
for the `window.appStudio.storage` and `window.appStudio.shared` APIs, with the
[Team CRM](../projects/business/team-crm/) as a full worked example.

## Sharing what you made

If you contribute a project back to this library, add the standard header to its
main file — see [`projects/file-header.md`](../projects/file-header.md) — and a
short per-project `README.md`.
