# Contributing

This is the public library of example **projects** and **prompts** for
[App Studio](https://github.com/halisonworks/app-studio-app). Everything here is
made to be uploaded, copied, and learned from. These are the conventions.

## What goes where

```
projects/    ready-made App Studio projects (download and load)
prompts/     prompts for building your own — guides, templates, context, examples
docs/        user documentation
```

## Adding a project

1. Create a folder named after the project in kebab-case:
   `projects/<project-name>/`.
2. Add the **raw source** — either:
   - a single, default-exported React component (`<name>.jsx`), or
   - a self-contained HTML page (`<name>.html`) with all CSS and JS inline.
3. Put the **attribution header** at the top of the source — see
   [`projects/file-header.md`](projects/file-header.md). Keep the source link and
   license note intact.
4. Generate the matching **`<name>.appstudio`** — App Studio's native project
   file (JSON, `schema: "app-studio/canvas@1"`). Its `code` field must equal the
   raw source byte-for-byte; see the format spec in the app repo's
   `docs/project-file-format.md`. Ship both files.
5. Add a short per-project `README.md` (what it does, how to load, notes).
6. Register it in [`catalog.md`](catalog.md) and `projects/README.md`.

### The two artifacts

| File | Use |
|------|-----|
| `*.appstudio` | load straight in (**Share → Import**) — carries packaging metadata |
| `*.jsx` / `*.html` | copy-paste (**New → paste → Run App**), and the human-readable copy |

They're kept in lockstep: edit the source, then regenerate the `.appstudio`.

### Self-sustaining rule

A project must run on its own with **no runtime service dependency** — no
backend, API keys, login, or LLM calls. Static CDN assets (a CSS framework,
fonts, icons) are fine. Persist with `localStorage`; mock data inline. Don't
build print / PDF / image-export UI — App Studio already provides Print and PNG
export.

## Adding a translation

English is canonical and lives at the project root. A translation is a full,
standalone copy under `i18n/<lang>/` (BCP-47 codes, e.g. `nb`), with the same
filenames — its own `.html`/`.jsx` + `.appstudio` + `README.md`. The English
README links to available translations.

## Adding a prompt or category

- **Worked examples** go in `prompts/examples/` (with an `i18n/<lang>/` copy when
  translated). Include a short **simple** version and the full prompt, each in a
  fenced code block (so it copies cleanly, with no `>` prefix).
- **Category context add-ons** go in `prompts/context/` — a small document that
  layers category conventions on top of `prompts/authoring-guide.md`. Keep the
  paste block in a code fence and list it in `prompts/context/README.md`.
- Don't let categories proliferate; merge overlapping ones.

## Validate before submitting

```
node scripts/validate.mjs      # or: npm run validate
```

It checks every `.appstudio` (schema, fields, and that `code` matches the
source), that sources carry the header, that HTML is balanced and its inline
scripts parse, and that JSX/JS has an `export default`.

## License

By contributing you agree your contribution is released under the Halison App
Studio Examples License (see [LICENSE](LICENSE)). Keep all headers and
attribution intact.
