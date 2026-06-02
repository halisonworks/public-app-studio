# Halison App Studio

Turn AI chat artifacts into your own app.

This is the public library for App Studio. Here you can download completed
projects to load straight into App Studio, and browse prompt examples to help
you build your own.

> ⚠️ **Everything here is an example.** These projects (and anything an AI builds
> for you from them) are starting points and learning aids, generated to show
> what's possible. They may contain mistakes, simplified models, or inaccurate
> numbers. **Don't rely on any calculation, result, or piece of information for
> real decisions without checking it yourself.** Treat them as inspiration to
> adapt — not as a source of truth.

## Who it's for

Founders, investors, managers, sales people, marketers, teachers, presenters,
finance people, spreadsheet / Miro / graph / infographic makers, influencers,
and anyone who wants to make a quick prototype of an app idea — no coding needed.

## Build your own with AI — three ways to start

**1. One link (simplest).** Give your AI assistant **[`llms.txt`](llms.txt)** —
paste this URL into the chat:

```
https://github.com/halisonworks/public-app-studio/blob/main/llms.txt
```

It's a single, self-contained briefing. From it the assistant learns exactly what
App Studio can run, **asks you a couple of clarifying questions**, returns **one
self-contained file**, and **tells you how to load it**. If your assistant can't
browse the web, paste the contents of the file instead. It includes notes for
**Claude, ChatGPT, Gemini, and Grok**.

**2. Upload the guide.** Attach [`prompts/authoring-guide.md`](prompts/authoring-guide.md)
(plus a [category add-on](prompts/context/) if it fits — e.g. educational,
business, data, creative), then send a short prompt. See
[`docs/creating-your-own.md`](docs/creating-your-own.md).

**3. Copy a prompt.** Start from a [worked example](prompts/examples/) or a
[template](prompts/) and adapt it.

Either way, the goal is one thing App Studio can run: a single default-exported
React component, or a self-contained HTML page.

## What's inside

- [`llms.txt`](llms.txt) — one file to hand an AI assistant; it learns App Studio
  and helps you build
- [`projects/`](projects/) — 20+ ready-made projects you can download and load
- [`catalog.md`](catalog.md) — browse every project by category, with a
  screenshot **gallery**
- [`prompts/`](prompts/) — the authoring guide, **category add-ons**
  ([`context/`](prompts/context/)), templates, and worked examples (English +
  Norwegian)
- [`docs/`](docs/) — getting started and creating your own
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — conventions for adding a project, prompt,
  or category

Each project ships a **`.appstudio`** file (load it straight in) plus the **raw
source** (copy-paste and read), with a short header crediting and linking back to
this library.

## Load a project into App Studio

1. Open a project in [`projects/`](projects/) (or pick one from the
   [catalog](catalog.md)).
2. Either **load it straight in** — in App Studio choose **Share → Import** and
   select the project's `.appstudio` file (or drop it into your
   `App Studio Projects` folder) — or **copy-paste** the raw `.jsx` / `.html` via
   **New → paste → Run App**.
3. **Save** it, edit it, and package it as a desktop app if you like.

When you modify a project, keep the header comment and the source reference in
place. See the license below.

## Categories

Projects span use-case categories, each with a [context add-on](prompts/context/)
you can hand your AI: **educational**, **business**, **personal**,
**data / dashboard**, **creative**, **game / quiz**, and **prototype** — covering
founders, investors, managers, sales, marketers, teachers, presenters, finance,
infographic makers, influencers, and app prototypers.

There's also a **[math](projects/math/)** category: interactive learning tools
for the Norwegian curriculum (LK20), organized by level (1P and 2P) and written
in Norwegian.

Want to contribute a project, prompt, or category? See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

These materials are released under the Halison App Studio Examples License.
The short version:

- You may use and modify the materials for personal, educational, and other
  non-commercial purposes.
- You must keep all copyright notices, attribution references, and the
  introductory header comment intact in every file.
- You may not sell or commercialize the materials or anything built from them.
- You may not redistribute or republish the materials, original or modified,
  without written permission from Halison.

App Studio itself, its application and source code, is not part of these
materials and is not covered by this license.

Full terms are in the [LICENSE](LICENSE) file. For permissions beyond the
license, contact Halison.

## Questions and permissions

Open an issue for questions about a project or prompt. For anything involving
commercial use or redistribution, contact Halison directly.