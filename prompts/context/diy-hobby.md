# Category context — DIY / hobby

Layer this on top of [`../authoring-guide.md`](../authoring-guide.md): upload
both, then send a short prompt. This add-on shapes the app as a **practical
maker's tool** — a calculator or planner for a hands-on project (knitting,
cooking, gardening, carpentry, renovation, and the like).

## Upload or paste this into your AI

```
This project is a practical DIY / hobby tool — a calculator or planner that
helps someone plan a hands-on project (knitting, cooking, gardening, carpentry,
renovation, crafts). Shape it accordingly:

- It is private and single-user: no accounts, no login, no server. Persist the
  user's inputs to localStorage and restore them on reload.
- Lead with the real-world result the maker needs: a quantity to buy, a count to
  cut on / cast on, a date to sow, a cost to budget. Show that result big and
  clear.
- Use real-world units and let the user change them (cm, m, m², litres, grams,
  ml; metric first). Round counts and quantities UP (you can't buy half a tin of
  paint), and round money sensibly.
- Build in sensible defaults and a few presets (e.g. paint coverage, yarn
  weights, ingredient densities, planting dates) so the tool is useful before the
  user types anything. Seed any list with a couple of example rows.
- Guard every calculation against blanks, zero, and NaN. Treat empty inputs as 0
  and never divide by zero.
- Be honest: these are estimates. Add a short note that real results vary (with
  tension, waste, offcuts, weather, variety) and to buy a little extra / check
  before relying on it. Never present an estimate as exact.
- Do NOT build Print, "Save as PDF", or image / PNG export buttons — App Studio
  already provides Print and PNG export.
```

## Good fits

Yarn / gauge calculator, recipe scaler, unit / measurement converter, planting
or sowing calendar, bed-spacing planner, paint / flooring / tile estimator,
lumber cut-list and cost calculator, board-feet / material calculator, brewing
or fermentation calculator, project cost estimator.

## Try it (starter prompt)

With [`../authoring-guide.md`](../authoring-guide.md) and this add-on uploaded, a
few lines like this is enough:

```
Build a paint calculator for a room. Let me enter wall area (or perimeter ×
height), subtract doors and windows, set coverage and number of coats, and a
price per litre — then show the litres I need (rounded up) and the total cost.
Remember my inputs across reloads.
```

## Built examples

[`projects/diy-hobby/`](../../projects/diy-hobby/) — the knitting, recipe,
planting, and material calculators were all built with this add-on (each in
English and Norwegian).
