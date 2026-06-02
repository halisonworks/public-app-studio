# Strikkekalkulator

> ⚠️ **Eksempel, ikke et produkt.** Dette prosjektet er laget som utgangspunkt og læringshjelp. Det kan inneholde feil, forenklede modeller eller unøyaktige tall — ikke stol på beregninger eller resultater for reelle beslutninger uten å sjekke dem selv.

Et garnhjelpeprogram for strikkere. Skriv inn din strikkefasthet (masker og
omganger per 10 cm fra en prøvelapp) og ønsket plaggstørrelse for å få antall
oppslag og totalt antall omganger. Lim inn strikkefastheten og maskeantallet fra
en oppskrift for å beregne det justerte maskeantallet som gir samme ferdige
størrelse med din fasthet. En garnkalkulator lar deg velge garntykkelse og
beregner omtrent hvor mange gram og nøster du trenger.

En liten, selvstendig React-komponent. Ingen eksterne biblioteker, inget byggesteg.

**Tilgjengelig på:** [English](../../) · Norsk (Bokmål)

## Last inn i App Studio

To måter å velge mellom:

- **Last inn direkte** — bruk [`knitting-calculator.appstudio`](./knitting-calculator.appstudio):
  velg **Del → Importer** i App Studio og velg filen, eller slipp den i
  mappen `App Studio Projects`. Den åpnes med navn og metadata ferdig satt.
- **Lim inn koden** — åpne [`knitting-calculator.jsx`](./knitting-calculator.jsx),
  kopier innholdet, og velg **Ny → lim inn → Kjør app** i App Studio.

Klikk **Lagre** for å beholde den i biblioteket ditt, og pakk den gjerne som
en skrivebordsapp etterpå.

## Gjør den til din

Noen enkle justeringer:

- Endre forbruksfaktorene for garntykkelse i `GARNTYKKELSER`-arrayen øverst
  i `knitting-calculator.jsx` — standardverdiene er grove bransjeestimater.
- Bytt aksentfargen ved å erstatte `#e11d48` i `stiler`-objektet
  (søk etter den — den finnes flere steder).
- Endre standard nøstestørrelse ved å redigere `noesteStoerrelse: '50'`
  i `STANDARD_TILSTAND`.

Rediger `knitting-calculator.jsx` og importer på nytt, eller rediger
`code`-feltet i `knitting-calculator.appstudio` direkte (det er ren JSON).
Behold headerkommentaren og kildelenken øverst i filen. Se
[LICENSE](../../../../../LICENSE) for vilkårene.
