# Interaktiv Priskalkulator

En interaktiv kalkulator for **avanse**, **dekningsbidrag** og **MVA** — laget
som læremiddel for programfaget *Salg, service og reiseliv* på videregående, og
som et raskt verktøy for småbedrifter.

Én selvstendig HTML-side (Tailwind via CDN). Funksjoner:

- Toveiskoblede skyveknapper for **avanse %** og **dekningsgrad %**.
- Fire resultatkort i sanntid (pris eks. MVA, dekningsbidrag, MVA-beløp, pris
  inkl. MVA) og en fargekodet stolpe for prisoppbygning.
- En **rabattsimulator** (10/20/30 %) som viser hvordan kutt spiser av marginen,
  med «under selvkost»-varsel når dekningsbidraget blir negativt.
- **Skolemodus** (teori + elevoppgaver) og **Bedriftsmodus** (nullpunktsanalyse
  i sanntid).
- **Presentasjonsmodus** i fullskjerm (projektorvennlig, ESC for å avslutte).

**Tilgjengelig på:** [English](../../) · Norsk (Bokmål)

## Last den inn i App Studio

- **Last den rett inn** — bruk [`price-calculator.appstudio`](./price-calculator.appstudio):
  **Share → Import** i App Studio, eller slipp den i `App Studio Projects`-mappen.
- **Kopier/lim inn** — åpne [`price-calculator.html`](./price-calculator.html),
  kopier alt, og **New → paste → Run App**.

## Merknader

- Den laster Tailwind fra CDN, så den trenger nett ved første lasting — men den
  har **ingen avhengighet til en kjøretidstjeneste** (ingen backend, API-nøkler,
  innlogging eller LLM), og fungerer dermed på egen hånd.
- Behold headeren og kildelenken øverst i filen. Se [LICENSE](../../../../LICENSE)
  i rota for vilkårene.
