# Saving data and sharing it with a team

Most examples in this library keep their data in your browser. When you want an
app that **saves real data** (a CRM, a tracker, a log) or **shares it with a
small team**, App Studio gives your app a tiny `window.appStudio` API. Everything
is local first: no account, no server, no cloud required.

You can paste this page into an AI assistant ("use `window.appStudio.shared` so
the team sees each other's changes") so the app it writes uses these directly.
The [Team CRM](../projects/business/team-crm/) project is a full worked example.

---

## 1. `localStorage` just works

You do not need anything special to use `localStorage`. App Studio namespaces it
per app automatically, so your data cannot collide with another app or with App
Studio itself, and it survives updates. Good for small, simple data.

**Limits:** about 5 MB, synchronous, strings only. For more (or for objects and
images), use `appStudio.storage`.

---

## 2. `window.appStudio.storage` (durable key/value)

An async store backed by IndexedDB. Larger quota, stores objects directly (no
`JSON.stringify`), namespaced per app, survives updates. Available in App Studio
previews **and** in packaged apps.

```js
await window.appStudio.storage.set('contact:1', { name: 'Ann', email: 'a@x.com' });
const c   = await window.appStudio.storage.get('contact:1');   // { name: 'Ann', ... }
const ids = await window.appStudio.storage.keys();             // ['contact:1', ...]
const all = await window.appStudio.storage.getAll();           // { 'contact:1': {...}, ... }
await window.appStudio.storage.remove('contact:1');
await window.appStudio.storage.clear();
```

| Method | Returns |
|--------|---------|
| `set(key, value)` | `true` |
| `get(key)` | the value, or `undefined` |
| `remove(key)` | `true` |
| `keys()` / `values()` | array of keys / values |
| `getAll()` | `{ [key]: value }` |
| `clear()` | `true` |

In a packaged app, the **Package** panel can *Export* / *Import* everything an
app saved as a JSON file, so you can back it up or move it between machines.

---

## 3. `window.appStudio.shared` (team data sharing)

Share an app's data across a small team over a **shared / synced folder**
(OneDrive, Dropbox, or a network share), with **no server and no login**.

How it works: each teammate's app appends to its own log file in the folder, and
the current state is the **conflict-free merge** of everyone's logs. Two people
can edit at once without overwriting each other; edits to the *same* record
resolve last writer wins.

> Available in **packaged apps only** (it needs filesystem access). In a preview
> inside App Studio, `appStudio.shared` is not present, so design your app to
> fall back to `localStorage` when it is missing (the Team CRM does this).

```js
// One time: point the app at a shared folder (opens a folder picker).
await window.appStudio.shared.chooseFolder();
const folder = await window.appStudio.shared.folder(); // the chosen path, or null

// Create / update / delete records in a named collection.
await window.appStudio.shared.put('contacts', 'c1', { name: 'Acme', owner: 'me' });
await window.appStudio.shared.del('contacts', 'c1');

// Read the merged team state.
const contacts = await window.appStudio.shared.list('contacts'); // [{ id:'c1', ... }, ...]

// Live updates as teammates change things (polls the folder).
const stop = window.appStudio.shared.subscribe((state) => render(state.contacts));
// stop()  // when done
```

| Method | Purpose |
|--------|---------|
| `chooseFolder()` | prompt for the shared folder (recommended) |
| `configure(path)` | set the shared folder by path |
| `folder()` | the currently configured folder, or `null` |
| `put(collection, id, record)` | create or replace a record |
| `del(collection, id)` | delete a record |
| `list(collection)` | merged records as an array (each includes its `id`) |
| `subscribe(cb)` | call `cb(state)` now and whenever the folder changes; returns a stop function |

---

## 4. Worked example: the Team CRM

[`projects/business/team-crm`](../projects/business/team-crm/) is a full CRM
(pipeline, contacts, activities, tasks, charts) that runs **single-user in a
preview** and **multi-user once packaged**, from one file. Only the storage layer
differs between the two modes; every screen is identical.

The pattern, condensed:

```js
// `shared` exists only in a packaged app. When it is absent (preview / browser)
// fall back to localStorage so the app still runs.
const shared = (window.appStudio && window.appStudio.shared) || null;

function CRM() {
  const [db, setDb] = useState(shared ? emptyDb() : loadLocal());
  const [folder, setFolder] = useState(null);

  // First run: reuse a saved folder, or ask the team to pick one.
  useEffect(() => {
    if (!shared) return;
    shared.folder().then((f) => (f ? setFolder(f) : null));
  }, []);

  // Live: every teammate's change lands here (subscribe returns its own stop fn).
  useEffect(() => {
    if (!shared || !folder) return;
    return shared.subscribe((state) => setDb(fromShared(state)));
  }, [folder]);

  // Every edit is a PER-RECORD write, not a whole-blob overwrite.
  const saveDeal = (deal) => {
    setDb((s) => ({ ...s, deals: upsert(s.deals, deal) })); // optimistic, instant UI
    if (shared) shared.put('deals', deal.id, deal);          // syncs to the team
  };
}

// Rebuild your view shape from the merged team state.
const fromShared = (state) => ({
  deals:    Object.values(state.deals    || {}),
  contacts: Object.values(state.contacts || {}),
  // ...one entry per collection
});
```

**Why per-record matters.** A single-user app that does
`localStorage.setItem('crm', JSON.stringify(everything))` is whole-blob last
writer wins: if two teammates synced that one file, each save would wipe the
other's edits. Splitting into `put('deals', id, ...)` / `put('contacts', id, ...)`
lets the shared store merge concurrent edits to *different* records with no
conflict, and resolve edits to the *same* record predictably.

Two touches the Team CRM adds for real teams:

- **Identity:** a per-install "I am [name]" picker (kept in `localStorage`), so
  new records attribute to the current teammate, and teammates self-register into
  a shared `owners` collection.
- **Explicit seed:** it starts empty and offers a "Load sample data" button, so
  opening a real team folder never auto-fills it with demo records.

---

## How many people can use it at once

There is no hard limit, but the two limits are very different:

- **Correctness is effectively unbounded.** Because no one ever co-writes a file
  (each person appends to their own log) and the merge is deterministic, you will
  not corrupt the data no matter how many join. At worst, two people editing the
  *same* record within one sync window means the newer edit wins and the older is
  dropped.
- **Practically, it suits a small team:** roughly 2 to 10 people over
  OneDrive / Dropbox, and comfortably more on a fast local network share where
  changes propagate almost instantly. As more people join, the sync provider's
  propagation delay (not the merge) is what makes updates feel slower.

For heavy simultaneous editing of the same records, or for dozens of concurrent
users, a real shared database is the better tool. This feature is the "small
team, no server, no login" tier.

---

## Good to know

- **Your app's identity is its Bundle ID.** Saved data lives under it, so keep
  the Bundle ID stable across updates (changing it starts a fresh, empty store).
- Everything here is **local**: your data never leaves your machine, or your
  team's shared folder. There is no App Studio account or server involved.
