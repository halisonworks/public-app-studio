# Oppskrift-skalerer

> ⚠️ **Eksempel, ikke et produkt.** Dette prosjektet er laget som utgangspunkt og læringshjelp. Det kan inneholde feil, forenklede modeller eller unøyaktige tall — ikke stol på beregninger eller resultater for reelle beslutninger uten å sjekke dem selv.

Skaler en oppskrift opp eller ned ved å endre antall porsjoner. Alle ingredienser
regnes om i sanntid, og skaleringsfaktoren vises tydelig. En liten enhetsomregner
lar deg konvertere mellom volum og vekt (ved hjelp av tetthetsverdier for vanlige
kjøkkenvarer) slik at du kan bruke den enheten du har tilgjengelig.

En liten, selvstendig React-komponent. Ingen eksterne biblioteker, ingen byggesteg.

**Tilgjengelig på:** [English](../../) · Norsk (Bokmål)

## Last inn i App Studio

To måter, velg den som passer:

- **Kopier/lim inn** — åpne [`recipe-scaler.jsx`](./recipe-scaler.jsx), kopier
  innholdet, og velg **New → paste → Run App** i App Studio.
- **Eller åpne filen fra disk** hvis din versjon av App Studio støtter det.

Klikk **Save** for å lagre den i biblioteket ditt.

## Gjør den til din

Noen enkle endringer i `recipe-scaler.jsx`:

- **Tetthetsverdier** — rediger `TETTHET_PRESETS`-arrayen for å legge til egne
  ingredienser (f.eks. melk på 1,03 g/ml, olivenolje på 0,91 g/ml).
- **Enhetsliste** — legg til eller fjern oppføringer i `ENHET_ML` og
  `<option>`-listene i omregner-seksjonen. Norsk mat bruker dl, ss og ts.
- **Aksentfarge** — bytt ut `#d97706` i `stiler`-objektet med en farge du liker;
  den brukes på overskrifter, skaleringsbadgen og omregningsresultatet.

Behold headeren og kildelenken øverst i kildefilen. Se
[LICENSE](../../../../../LICENSE) i rota for vilkårene.
