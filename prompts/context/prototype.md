# Category context — Prototype / mockup

Layer this on top of [`../authoring-guide.md`](../authoring-guide.md): upload
both, then send a short prompt. This add-on shapes the app as an interactive
prototype of a product or feature — for founders, PMs, and designers demoing an
idea to stakeholders.

## Upload or paste this into your AI

```
This project is an interactive prototype / mockup of an app or feature, meant to
demo an idea — not a production system. Shape it accordingly:

- Build the key screen(s) and the main flow, and make the primary interactions
  actually work: navigation between views, forms that update local state,
  toggles, modals.
- Use realistic placeholder content and mock data (never lorem ipsum). Fake any
  backend with in-memory or localStorage data — no real API, auth, or payments.
- Make it look like a polished product UI: navigation, cards, lists, empty /
  loading / success states, so stakeholders can react to it.
- It's fine that data resets and some controls are illustrative, but there must
  be no dead primary actions — the core flow should click through end to end.
- One self-contained file; simulate servers and login rather than calling them.
```

## Good fits

SaaS dashboard mockup, mobile-app screen flow, onboarding wizard, settings page,
checkout flow, landing-page concept, CRM or admin-panel prototype.

## Try it (starter prompt)

With [`../authoring-guide.md`](../authoring-guide.md) and this add-on uploaded, a
few lines like this is enough:

```
Build an interactive prototype of a project-management SaaS. A sidebar switches
between Dashboard, Tasks, and Settings. The Tasks view is a board with To do /
Doing / Done columns where I can move tasks between columns. Use realistic mock
data, and make the navigation and task moves actually work.
```

## Built example

[`projects/saas-prototype/`](../../projects/saas-prototype/) — built with this add-on.

