# Bayesiansk farskaps-sannsynlighet

> ⚠️ **Eksempel, ikke et produkt — og ikke en farskapstest.** Dette er en pedagogisk demonstrasjon av Bayes' teorem. Ekte farskapstesting gjøres ved akkrediterte laboratorier. Ikke bruk dette til juridiske eller medisinske avgjørelser.

Et lite verktøy som viser hvordan **Bayes' teorem** oppdaterer en antakelse. Sett
en **prior** (antatt feilfar-rate per generasjon, historisk ofte ~1–2 %), legg
eventuelt til **DNA-bevis** (autosomalt delt cM på forelder–barn-nivå, nær-slekt-nivå
eller ~0, eller Y-DNA-match/-bom), og se den oppdaterte sannsynligheten for at den
dokumenterte faren faktisk er biologisk far. Alle likelihood-forhold kan justeres.

En selvstendig HTML-side (Tailwind via CDN). Kategori: **slektsforskning (norsk)**.

## Last inn i App Studio

- **Last rett inn** — bruk [`biologisk-far-bayes.appstudio`](./biologisk-far-bayes.appstudio):
  **Share → Import**, eller slipp den i mappa `App Studio Projects`.
- **Kopier–lim** — åpne [`biologisk-far-bayes.html`](./biologisk-far-bayes.html),
  kopier alt, og **New → paste → Run App**.

## Merknader

- Regner i odds-form: `posterior-odds = prior-odds × LR`. Tallene er **illustrative**
  og ment for å bygge intuisjon om bevisstyrke — ikke et reelt testresultat.
- Kjører helt uten nett; inndata lagres i `localStorage`. Behold header-kommentaren
  og kildelenken. Se [LICENSE](../../../../LICENSE) for vilkår.
