# Persona-utvikler

> ⚠️ **Eksempel, ikke et produkt.** Dette prosjektet er laget som utgangspunkt og læringshjelp. Det kan inneholde feil, forenklede modeller eller unøyaktige tall — ikke stol på beregninger eller resultater for reelle beslutninger uten å sjekke dem selv.

Et metodeverktøy for å bygge kunde-**personas** — for elever, gründere og
markedsførere. Kartlegg demografi, geografi, psykografi og atferd, og presenter
resultatet som et rent persona-kort.

Én selvstendig HTML-side (Tailwind + Inter via CDN). Tre moduser:

- **Læremodus** — detaljerte felt med korte teoribokser (demografi, geografi,
  psykografi, atferd) og ledende hjelpespørsmål.
- **Praksismodus** — et kompakt, strømlinjeformet skjema uten teorien.
- **Presentasjon** — et skrivebeskyttet, projektorvennlig persona-kort (ESC for
  å gå ut; en diskré toast minner deg på hvordan).

I tillegg fire **målgruppe-maler**, en **inspirasjons-generator**, automatisk
lagring/gjenoppretting via **localStorage**, og print-optimalisert CSS som
isolerer kun kortet.

**Tilgjengelig på:** [English](../../) · Norsk (Bokmål)

## Last den inn i App Studio

- **Last den rett inn** — bruk [`persona-developer.appstudio`](./persona-developer.appstudio):
  **Share → Import** i App Studio, eller slipp den i `App Studio Projects`-mappen.
- **Kopier/lim inn** — åpne [`persona-developer.html`](./persona-developer.html),
  kopier alt, og **New → paste → Run App**.

## Merknader

- Laster Tailwind og Inter-skriften fra CDN (trenger nett ved første lasting),
  men har **ingen avhengighet til en kjøretidstjeneste** — ingen backend,
  API-nøkler, innlogging eller LLM — så den fungerer på egen hånd.
- Det finnes ingen utskriftsknapp: Presentasjon-kortet har bare `@media print`-
  stiler, så App Studios innebygde **Print** gir et rent, isolert kort.
- Behold headeren og kildelenken øverst i filen. Se [LICENSE](../../../../../LICENSE)
  i rota for vilkårene.
