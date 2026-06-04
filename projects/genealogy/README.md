# Genealogy projects

Practical, self-contained tools for family-history research — the small
calculations and conversions genealogists reach for over and over, with no
account, no upload, and no internet connection required.

> ⚠️ **Examples, not products.** These tools were generated as starting points
> and learning aids. They may contain mistakes or simplified models — verify any
> date, code, or relationship against the original records before relying on it.

- [Relationship Calculator](./relationship-calculator/) — how two relatives are
  related (e.g. "second cousins once removed"), with the reciprocal and degree of
  kinship
- [Age & Birth-Date Calculator](./ancestor-birth-date/) — a birth date from a
  gravestone or death record ("aged 67 years 4 months 11 days"), exact age
  between two dates, and a census-age birth-year window
- [Soundex Surname Coder](./soundex-coder/) — American Soundex codes for
  searching census, immigration, and naturalization indexes; batch and compare
- [Shared cM Relationship Predictor](./shared-cm-predictor/) — which
  relationships are plausible for a DNA match's total shared centimorgans
- [Source Citation Builder](./citation-builder/) — tidy, consistent citations
  for census, vital records, parish registers, gravestones, newspapers, and more
- [Ahnentafel Number Tool](./ahnentafel-numbering/) — decode a Sosa-Stradonitz
  number into the exact ancestral path (and back), and generate a numbered chart
- [Old Style / New Style Date Converter](./old-style-date-converter/) — Julian ↔
  Gregorian dates, the day of the week for any historical date, and double dating

Every tool is a single self-contained HTML page (Tailwind via CDN), runs fully
offline, and keeps your inputs in `localStorage`.

## Norsk slektsforskning (Norwegian)

A dedicated set of tools for **Norwegian** family history, written in Norwegian
(Bokmål) — patronymics, the *menning* kinship system, the 1700 calendar reform,
old units and currency, historical county (*amt*) names, and a curated link
library of Norwegian sources. See [`norge/`](./norge/):

- [Ane-aldersestimator](./norge/ane-aldersestimator/) — probable birth-year windows for ancestors
- [Patronymikon](./norge/patronymikon/) — Olsen / Olsdatter builder and decoder
- [Slektskap (norske termer)](./norge/slektskap-norsk/) — søskenbarn, tremenning, firmenning …
- [Ressurser & datasett](./norge/ressurser-og-datasett/) — searchable Norwegian source library
- [Bayesiansk farskaps-sannsynlighet](./norge/biologisk-far-bayes/) — educational Bayesian paternity demo
- [Gamle mål & mynt](./norge/gamle-maal-og-mynt/) — old Norwegian units and coinage converter
- [Kirkeårskalender](./norge/kirkekalender/) — Easter computus, movable feasts, the 1700 switch
- [Amt ↔ fylke](./norge/amt-og-fylke/) — historical county names vs. today's fylker

See the full catalog with screenshots: [../../catalog.md](../../catalog.md).
