# Getting started

App Studio turns a single block of code — a React component or a web page —
into something you can run, save, and package as a real desktop app. This
library gives you ready-made projects to load and prompts to make your own.

## 1. Get App Studio

Install the desktop app from the
[App Studio repository](https://github.com/halisonworks/app-studio-app). It
currently ships as a Windows app (macOS / Linux planned).

## 2. Load a project from this library

Open the [`projects/`](../projects/) folder, pick one, and load it one of two ways:

- **`.appstudio` file** (recommended) — App Studio's own share format. Import it
  into your library; it loads with its name and packaging ready to go.
  (Double-click / "Open with" support ships with the next desktop release.)
- **`.html` or `.jsx` file** — open the file, copy its contents, and in App Studio
  choose **New → paste → Run App**. The canvas renders live, no setup or build step.

Note: opening a file from disk accepts component source — `.jsx`, `.tsx`, `.js`,
`.ts`, `.txt`. A full **HTML page can't be opened from disk** — paste it instead,
or use the project's `.appstudio` file.

## 3. Save and reuse

- Click **Save** to keep the project in your local library with a name and a
  category. It survives across sessions.
- Open it any time from the library sidebar.

## 4. Package it as a desktop app (optional)

From a saved canvas you can build a standalone installer: App Studio writes a
small project, builds it, and produces a real installer that opens straight to
your component — no library, no editor, just your app.

## Next

- [Creating your own](./creating-your-own.md) — use an AI assistant to build a
  project from scratch.
- [`prompts/`](../prompts/) — copy-and-adapt prompt templates.
- [`projects/`](../projects/) — more examples to load.
