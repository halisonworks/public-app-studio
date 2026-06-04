# Team CRM

> ⚠️ **Example, not a product.** This project is a starting point and a learning
> aid. It may contain mistakes or simplified models, so verify anything important
> before relying on it.

A small-team sales CRM: a deal **pipeline**, **contacts and companies**, an
**activity log**, **tasks**, and a weighted-forecast dashboard with charts. It is
a single default-exported React component (recharts + lucide icons). Category:
**business / sales**.

What makes it interesting is that it runs two ways from one file:

- **Solo (Studio preview or any browser):** data is saved on your device with
  `localStorage`, exactly like the other examples.
- **As a team (once packaged):** point it at a shared OneDrive, Dropbox, or
  network folder, and everyone who opens it against the same folder shares one
  live pipeline, with no server and no login. Edits merge per record, so two
  people can work at once.

## Load it into App Studio

- **Load it straight in:** use [`team-crm.appstudio`](./team-crm.appstudio) via
  **Share → Import**, or drop it into your `App Studio Projects` folder.
- **Copy-paste:** open [`team-crm.jsx`](./team-crm.jsx), copy it all, then
  **New → paste → Run App**.

## Using it as a team

1. **Package** the canvas (App Studio's Package panel) so it becomes a desktop
   app. The shared-folder features exist only in a packaged app.
2. The **first** person opens it, picks an **empty** folder inside OneDrive (the
   app asks on first run), and clicks **Load sample data**, or just starts adding
   real deals.
3. **Teammates** install the same packaged app and pick the **same** folder.
   Changes appear for everyone within a couple of seconds.
4. Each person sets **who they are** (the *Set you* button) so new deals, tasks,
   and activities are attributed to them.

It is best for a small team (a handful of people) and is eventually consistent:
a teammate's change shows up shortly rather than instantly, and two edits to the
*same* record resolve last writer wins.

## How it was made (single-user to multi-user)

The only thing that changed from an ordinary single-user CRM is the **storage
layer**; every screen is identical. The pattern:

- Detect `window.appStudio.shared` (present only in a packaged app). When it is
  absent, fall back to `localStorage` so the preview still runs.
- Make each entity a **record in a collection** (`deals`, `contacts`, `tasks`,
  and so on) and write each edit as a targeted `shared.put(collection, id,
  record)` or `shared.del(...)`, never a whole-blob overwrite. That is what lets
  concurrent edits to different records merge with no conflict.
- Rebuild the on-screen state from `shared.subscribe(state => ...)`, which fires
  whenever any teammate changes the folder.

The full walkthrough and API reference is in
[`docs/data-and-team-sharing.md`](../../../docs/data-and-team-sharing.md).

## Notes

- **No runtime service dependency** in the solo path (saved in `localStorage`);
  the team path uses only a shared folder you choose. No backend, API key, or
  login.
- Keep the header comment and the source link at the top of the file. See the
  root [LICENSE](../../../LICENSE) for the terms.
