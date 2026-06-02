# SaaS Prototype

An interactive **prototype** of a project-management app: a sidebar that switches
between **Dashboard**, **Tasks**, and **Settings**; a **task board** with movable
cards across To do / Doing / Done; and a working settings view. Mock data, no
backend — a clickable demo of an idea.

A single self-contained HTML page (Tailwind via CDN). Category: **prototype /
mockup**.

## Load it into App Studio

- **Load it straight in** — use [`saas-prototype.appstudio`](./saas-prototype.appstudio):
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste** — open [`saas-prototype.html`](./saas-prototype.html), copy it
  all, then **New → paste → Run App**.

## Notes

- A demo, not a product: the backend is faked with in-memory state, so data
  resets on reload. The navigation and task moves actually work. **No runtime
  service dependency** (no API, auth, or payments).
- Made with the [prototype](../../prompts/context/prototype.md) category add-on.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../LICENSE) for the terms.
