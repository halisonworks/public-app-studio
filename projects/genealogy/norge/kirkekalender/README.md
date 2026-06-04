# Kirkeårskalender

> ⚠️ **Eksempel, ikke et produkt.** Laget som utgangspunkt og læringshjelp. Det kan inneholde feil — kontroller datoer mot kilden din.

Mange norske kirkebøker daterte hendelser etter **kirkeåret**. Dette verktøyet
regner ut **påsken** og de bevegelige helligdagene for et hvilket som helst år, og
oversetter referanser som «**3. søndag etter påske 1763**» eller «**20. søndag
etter trinitatis**» til faktiske datoer — med riktig kalender før og etter
**kalenderreformen i 1700** (juliansk før, gregoriansk etter).

En selvstendig HTML-side (Tailwind via CDN). Kategori: **slektsforskning (norsk)**.

## Last inn i App Studio

- **Last rett inn** — bruk [`kirkekalender.appstudio`](./kirkekalender.appstudio):
  **Share → Import**, eller slipp den i mappa `App Studio Projects`.
- **Kopier–lim** — åpne [`kirkekalender.html`](./kirkekalender.html), kopier alt, og
  **New → paste → Run App**.

## Merknader

- Påskeregningen er verifisert (2000 → 23. april, 2024 → 31. mars, 1700 → 11.
  april). Danmark-Norge gikk over til gregoriansk kalender i 1700: søndag 18.
  februar (j.) ble fulgt av torsdag 1. mars (g.) — 11 dager hoppet over.
- Kjører helt uten nett; inndata lagres i `localStorage`. Behold header-kommentaren
  og kildelenken. Se [LICENSE](../../../../LICENSE) for vilkår.
