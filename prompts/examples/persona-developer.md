# Example prompt — Persona Developer

A worked example of an educational tool: a three-mode persona builder (Learn,
Practice, Present) with audience templates, a random generator, localStorage,
and a clean presentation card.

This is a **full HTML page** example (English UI); a Norwegian version is in
[`i18n/nb/persona-developer.md`](./i18n/nb/persona-developer.md).

> **App Studio note.** This prompt loads Tailwind and Google Fonts from CDNs —
> fine for an App Studio project (static assets); what a project must *not*
> depend on is a runtime service (backend, API keys, login, or an LLM). See
> [`../authoring-guide.md`](../authoring-guide.md).
>
> A ready-to-run build of this example lives in
> [`projects/educational/persona-developer/`](../../projects/educational/persona-developer/).

## Simple version

Upload [`../authoring-guide.md`](../authoring-guide.md) and the
[`../context/educational.md`](../context/educational.md) add-on first, then a few
lines like this is enough — the AI fills in the rest:

```
Build a single self-contained HTML page: a "Persona Developer" for students,
entrepreneurs, and marketers. Three tabs — Learn (input fields with short theory
on demographics, geography, psychographics, behavior), Practice (a compact form
with the theory hidden), and Present (a clean, read-only persona card; ESC to
exit). Fields: name, age, marital status, occupation, income, location,
urbanity, values, motivation, pain points. Sync the fields across tabs, save to
localStorage, and add quick-start audience templates plus a random "inspiration
generator". Calm Scandinavian design (slate / indigo / emerald, rounded corners,
soft shadows). Everything in one file.
```

## The prompt

```
Create a complete, interactive, professional web application called "Persona
Developer" coded in a single, self-contained HTML file (index.html). The app
should help students, entrepreneurs, and marketers learn, build, and present
target audiences / personas.

1. Technical stack & architecture
- Single-file mandate: all HTML, CSS, and JS must live in this one file. No
  external CSS or JS files are allowed.
- Style and framework: use Tailwind CSS (via CDN:
  <script src="https://cdn.tailwindcss.com"></script>) and the Inter font from
  Google Fonts.
- Accessibility: use contrast colors that meet WCAG 2.1 AA (e.g. deep slate,
  indigo, and a white background).
- Responsiveness: the layout must work seamlessly on mobile, tablet, and desktop.

2. Three-phase mode control (tab system)
A global tab menu at the top switches between three modes:
- Learn mode: shows detailed input fields. Includes subject info boxes (theory on
  demographics, geography, psychographics, and behavior) and leading helper
  questions at each field.
- Practice mode: a compact, streamlined dashboard. Hides all theory boxes and
  helper text for fast entry.
- Presentation mode: a 100% clean, read-only view: hide the global header,
  navigation, action buttons, helper text, and inputs. Show the data solely as a
  professional, beautifully designed "persona card" (a graphic frame with a left
  and a right column). Keyboard shortcut: in presentation mode, listen for the
  Esc key to bring back the menus and navigation. Discreet toast: show a dark,
  sleek message at the bottom of the screen ("Press ESC to exit presentation")
  that automatically fades out and is removed after 3 seconds.

3. Functional requirements & data flow
- Data fields: Demographics/Geography — name, age, marital status, occupation,
  income, location, urbanity (city/rural). Profiling — values & lifestyle,
  buying goals & motivation, challenges (pain points).
- Two-way sync: changing one field (e.g. Name in Learn mode) must immediately
  update the matching field in Practice mode and mirror onto the presentation
  card.
- LocalStorage: save all field values automatically in the browser; restore the
  user's progress when the page reloads.
- Print optimization (@media print): if the user prints (Ctrl + P), isolate only
  the persona card; hide all menus and whitespace.

4. Quick-start features (templates & generator)
Add a "Quick start" section at the top (visible only in Learn and Practice modes)
with:
- Templates: four buttons that fill the form with believable demographic and
  psychographic data: Student / youth enterprise (student economy, trends); Eco
  parent (sustainability, time squeeze, family); Digital senior (simplicity,
  personal service, retiree); Business leader (B2B) (ROI, efficiency,
  decision-maker).
- Inspiration generator: a button ("🎲 Inspiration generator") that assembles
  random names, occupations, locations, values, motivations, and challenges from
  a predefined library (the data pool must be varied and realistic).

5. Aesthetic guidelines (Scandinavian design)
- Use a calm, minimalist palette (slate, indigo, emerald, white).
- Make liberal use of rounded corners (rounded-xl / rounded-2xl).
- Give elements visual depth with soft shadows (shadow-sm and shadow-md).
- In the presentation card, generate a profile avatar automatically based on the
  first letter of the persona's name (show a question mark "?" if the field is
  empty).
```
