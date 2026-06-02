# Materialkalkulator

> ⚠️ **Eksempel, ikke et produkt.** Dette prosjektet er laget som utgangspunkt og læringshjelp. Det kan inneholde feil, forenklede modeller eller unøyaktige tall — ikke stol på beregninger eller resultater for reelle beslutninger uten å sjekke dem selv.

Tre kalkulatorer i én: **maling** (veggareal, liter og kostnad), **gulv / fliser** (pakker med svinnmargin) og **trelast** (bord fra kappliste). Dekker både oppussing og snekring. Skriv inn din egen dekkevne, svinnprosent og priser for et raskt kostnadsestimat i valgfri valuta.

En liten, selvinneholdt React-komponent. Ingen eksterne biblioteker, inget byggtrinn.

**Tilgjengelig på:** [English](../../) · Norsk (Bokmål)

## Last inn i App Studio

Åpne App Studio, velg **Ny**, lim inn innholdet fra `material-calculator.jsx` i editoren, og klikk **Kjør app**. Velg deretter **Lagre** for å beholde den i biblioteket ditt.

## Gjør den til din

- **Dekkevne / svinnverdier** — endre `malingDekkevne`, `gulvSvinn` og `trelastBordLengde` i `DEFAULT_STATE` til verdier som passer produktene du bruker.
- **Valutasymbol** — feltet er satt til `kr` som standard; endre `valuta: 'kr'` i `DEFAULT_STATE` til ønsket symbol (f.eks. `'$'`, `'€'`).
- **Aksentfarge** — finn `#2563eb` i `styles`-objektet og bytt den ut med en farge som passer oppsettet ditt.

Behold header-kommentaren og kildelenken øverst i kildekoden. Se [LICENSE](../../../../../LICENSE) for vilkårene.
