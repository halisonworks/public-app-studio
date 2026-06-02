# App Studio authoring guide (feed this to your AI)

This document sets the stage for any AI assistant (Claude, ChatGPT, Google
Gemini, Grok): what App Studio can run, and the rules and constraints to follow.

## The best, simplest way to use it

1. **Give your AI the rules — two easy ways:**
   - **Upload this document** (`authoring-guide.md`), or paste the block below,
     at the start of a new chat; **or**
   - **Point your AI at this repository** — if your assistant can browse the web,
     give it the link **https://github.com/halisonworks/public-app-studio** and
     ask it to *read the authoring guide and a couple of examples* so it learns
     what App Studio runs and how the projects are built. (Claude, ChatGPT, and
     Gemini can read a public repo this way.)
2. **Then send a short, simple prompt** — a sentence or two describing what you
   want. The AI fills in the rest *within the rules above*. For example:
   *"Build a weekly habit tracker."* or *"Make an interactive tip calculator."*

That's the whole trick: the heavy, reusable rules live in the uploaded document,
so your prompt stays short. The worked examples in [`examples/`](./examples/)
each pair a one-paragraph "simple" prompt with this guide — that combination is
how they were made.

**For a specific kind of app**, also upload a category add-on from
[`context/`](./context/) (e.g. [educational](./context/educational.md) or
[business](./context/business.md)) — it layers category conventions on top of
this guide. Then keep your prompt just as short.

Keep it as a reference, too, for what makes a good App Studio project.

---

## The document — upload or paste this into your AI

```
You are generating a project to run in **App Studio**, a workbench that renders
a single file with no build step. Follow these rules exactly.

### Output
- Produce **one self-contained file**, and return **only the code**, in a
  single block, with no explanation, setup notes, or install steps.
- It must be **either**:
  - a **single, default-exported React component** (JSX, not TypeScript) ending
    with `export default <ComponentName>;`, **or**
  - a **complete, self-contained HTML page** with all CSS and JavaScript inline.
- Everything lives in that one file. No `package.json`, no separate local
  files, no build step, and no terminal commands. (Linking static assets from a
  CDN — a CSS framework, web fonts, icons — is fine.) The user will never run a
  build or install anything.

### Self-sustaining (this is the most important rule)
- The result must run **on its own, forever, with no further AI help** and with
  **no service it depends on to function**.
- **No backend, no server you must run, no API keys, no environment variables,
  no login, and no calls to an AI/LLM at runtime.** The app must keep working
  even if those would be unreachable.
- Loading **static front-end assets from a CDN is fine** — a CSS framework,
  web fonts, images, icon sets. These are not runtime dependencies in the
  forbidden sense; they just need a network on first load.
- If the app needs data, **mock it inline** or persist with `localStorage`
  (it survives restarts but can be wiped, so don't rely on it for anything
  precious). Calling a public, key-less API is acceptable **only** when live
  data is the whole point — and then handle loading and error states so the app
  still behaves when offline.

### Styling and libraries
- **Tailwind CSS** is fully available (JIT, including arbitrary values like
  `text-[10px]` and `bg-[#1a73e8]`) and bundled. Use it as the default. Plain
  inline styles, or pulling Tailwind / another CSS framework from a CDN, are
  also fine.
- These libraries auto-load and need no setup: **`react`** (+ hooks),
  **`recharts`** (charts), **`lucide-react`** (icons), **`prop-types`**.
- Anything else is fetched from `esm.sh` at runtime — if you use one, **pin its
  version** (e.g. `import { LineChart } from 'recharts@2.12.7'`) so it resolves
  predictably.
- Do not use Next.js, routers, state libraries (Redux/Zustand), UI kits
  (Material UI, Chakra), or CSS-in-JS libraries.

### Do NOT build things App Studio already provides
Adding these is wasted effort and clutters the UI — leave them out:
- **PNG / image export** — App Studio has built-in PNG export.
- **Print / Save-as-PDF** — App Studio has built-in Print via the OS.
- **App packaging**, installer, window title, or app icon — set at packaging
  time, not in the code.
- **Saving / loading / file management / a project library** — App Studio
  manages saved canvases.
- So: no "Download as image", "Export", "Print", "Save file", "Open file"
  buttons, and no fake window chrome or title bar.

### Quality bar
- One screen that **fills the window** and is responsive; no horizontal scroll.
- Everything that looks interactive must work — **no dead buttons**.
- Include sensible **empty, loading, and error states** where relevant.
- Use realistic mock data, not `lorem ipsum`.
- Make it look finished and intentional, not a generic template.

Confirm nothing — just output the single file when I describe what I want next.
```

---

## Quick checklist (for reviewing what the AI returns)

- [ ] One file; React component is `export default`, or HTML is fully self-contained.
- [ ] No external `<script>` / `<link>` / CDN, no `package.json`, no setup steps.
- [ ] No runtime service dependency: no backend / API keys / login / LLM calls. (Static CDN assets — CSS framework, fonts, images — are fine.)
- [ ] Data is mocked inline or in `localStorage`; any `esm.sh` lib is version-pinned.
- [ ] No built-in export / print / save / packaging UI (App Studio provides those).
- [ ] Fills the window, no dead buttons, has empty/error states, looks finished.

## See also

- [`react-component.md`](./react-component.md) / [`html-page.md`](./html-page.md) — short starter prompts.
- [`refine-existing.md`](./refine-existing.md) — prompts to iterate on what you have.
