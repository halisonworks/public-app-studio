# Category context — Travel / tourism & service

Layer this on top of [`../authoring-guide.md`](../authoring-guide.md): upload
both, then send a short prompt. This add-on shapes the app for **travel** — both
a personal traveller planning a trip, and the **Sales, Service and Tourism**
classroom (Norwegian *salg, service og reiseliv*), where the same domain shows up
as currency, service, risk, and hospitality skills.

## Upload or paste this into your AI

```
This project is a travel / tourism tool. It serves one of two audiences — say
which when you prompt:

PERSONAL TRAVELLER (a private planning tool on the user's own device):
- Private and single-user: no accounts, no login, no sharing, no server.
- Persist everything to localStorage automatically and restore on reload, so the
  trip survives across sessions. Saving should feel invisible.
- Optimize for fast entry: add / edit / delete inline, sensible defaults,
  keyboard-friendly. Show clear running totals (per trip, per person, per day).
- Include a clear way to reset or clear the trip, behind a confirmation.

TEACHING TOOL (Sales, Service and Tourism / reiseliv classroom — learners and a
teacher presenting to a class):
- Organize into clear modes or tabs:
  - Learn — explain the concept in plain language: the idea, any formula shown
    simply, and a worked example. Progressive disclosure, not a wall of text.
  - Practice — hands-on and interactive, with immediate feedback; realistic
    scenarios the learner can try and change.
  - Present — a clean full-screen view for a projector or smartboard: large
    legible type, minimal chrome, ESC to exit.
- Make every control teach something: changing an input visibly changes the
  outcome in real time. Use realistic examples, never lorem ipsum.

FOR BOTH:
- Self-sustaining: no backend, accounts, API keys, or LLM calls. Anything that
  would be "live" (currency rates, flight times, weather) must use editable or
  mock data and teach the concept — never fetch it. Make rates/offsets editable
  so the tool keeps working forever and the user sees how the number is built.
- Do NOT add print, PDF, or export buttons — App Studio already provides Print
  and PNG export.
```

## Good fits

**Personal:** trip budget planner, shared-cost splitter ("who owes whom"),
day-by-day itinerary, packing list, world clock + flight-arrival calculator,
trip countdown.

**Teaching (reiseliv / service):** currency exchange and the buy/sell *spread*,
complaint- and conflict-handling trainer (service recovery), risk assessment
(HMS likelihood × consequence matrix), the host role and event planning,
destination / target-group profiling.

## Why this category exists

In *Sales, Service and Tourism* the genuinely hard, poorly-served topics aren't
the definitions — they're the things you only grasp by moving a slider or
walking a scenario: why you get less money back than you changed (the spread),
how a complaint either de-escalates or blows up depending on your first
sentence, and why a "small" risk with a huge consequence still lands in the red
zone. These tools target exactly those gaps. (Markup, contribution margin, and
VAT are already covered by the [price calculator](../../projects/educational/price-calculator/).)

## Try it (starter prompt)

With [`../authoring-guide.md`](../authoring-guide.md) and this add-on uploaded:

```
Build a trip budget planner for a personal traveller. Let me add expenses in
categories (flights, stay, food, transport, activities), mark each as per-person
and/or per-day, set the number of travellers and days, and see the total, the
cost per person, and the cost per person per day, with a breakdown by category.
Remember everything across reloads.
```

## Built examples

[`projects/travel/`](../../projects/travel/) — personal planners (budget, split,
itinerary, time zones) and reiseliv teaching tools (currency spread, complaint
handling, risk assessment), all built with this add-on.
