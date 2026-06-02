# Plantekalender

> ⚠️ **Eksempel, ikke et produkt.** Dette prosjektet er laget som utgangspunkt og læringshjelp. Det kan inneholde feil, forenklede modeller eller unøyaktige tall — ikke stol på beregninger eller resultater for reelle beslutninger uten å sjekke dem selv.

En måned-for-måned guide for såing, utplanting og høsting av 12 vanlige grønnsaker,
beregnet på et temperert nordeuropeisk klima. Velg klimasone (kyst, gjennomsnitt
eller innland) for å forskyve datoene tidligere eller senere, velg hvilke grønnsaker
som vises, og bruk avstandsplanleggeren til å beregne hvor mange planter som får
plass i bedet ditt. Datoene er omtrentlige veiledninger som varierer med år, sted og sort.

En liten, selvstendig React-komponent. Ingen eksterne biblioteker, inget byggsteg.

**Tilgjengelig på:** [English](../../) · Norsk (Bokmål)

## Last inn i App Studio

To måter, velg den som passer deg:

- **Last inn direkte** — bruk `planting-calendar.appstudio` via
  **Del → Importer**, eller dra filen inn i mappen `App Studio Projects`.
- **Kopier og lim inn** — åpne [`planting-calendar.jsx`](./planting-calendar.jsx),
  kopier innholdet, og i App Studio: **Ny → lim inn → Kjør app**. Trykk deretter **Lagre**.

## Gjør den til din

Noen enkle endringer:

- **Rediger grønnsaksdata** — tabellen `GRØNNSAKER` øverst i filen inneholder navn,
  månedsspenner for såing/planting/høsting og avstandsverdier for hver grønnsak.
  Juster disse etter egne frø og lokalt klima.
- **Endre soneforskyvning** — tabellen `SONE_VALG` kobler soneetiketter til
  månedsforskyving (`-1`, `0`, `+1`). Endre verdiene eller legg til flere soner.
- **Aksentfarger** — bytt ut `#16a34a` (grønn) i `stiler`-objektet for å endre fargetemaet.

Behold headerkommentaren og kildelenken øverst i kildefilen. Se
[LICENSE](../../../../../LICENSE) i rotmappen for vilkårene.
