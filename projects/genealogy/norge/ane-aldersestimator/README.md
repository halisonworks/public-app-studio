# Ane-aldersestimator

> ⚠️ **Eksempel, ikke et produkt.** Laget som utgangspunkt og læringshjelp. Det kan inneholde feil eller forenklinger — kontroller mot kildene før du stoler på et resultat.

Skriv inn fødselsåret til en kjent person, så estimerer verktøyet **sannsynlige
fødselsår** for foreldre, besteforeldre, oldeforeldre og videre bakover — som et
**søkefilter** når du leter i Digitalarkivet og andre kilder. Du justerer fars og
mors typiske alder ved barnefødsel (med ferdige innstillinger for 1700-tallet,
1800-tallet og moderne tid), og hver ane får både et mest sannsynlig fødselsår og
et fødselsårs-vindu som vokser naturlig oppover i generasjonene.

En selvstendig HTML-side (Tailwind via CDN). Kategori: **slektsforskning (norsk)**.

## Last inn i App Studio

- **Last rett inn** — bruk [`ane-aldersestimator.appstudio`](./ane-aldersestimator.appstudio):
  **Share → Import**, eller slipp den i mappa `App Studio Projects`.
- **Kopier–lim** — åpne [`ane-aldersestimator.html`](./ane-aldersestimator.html),
  kopier alt, og **New → paste → Run App**.

## Merknader

- Tallene er et **statistisk hjelpemiddel**, ikke fakta. Folk fikk barn i vidt
  spenn av aldre; bruk vinduet til å sette dato-filtre, ikke som en fasit.
- Kjører helt uten nett; inndata lagres i `localStorage`. Behold header-kommentaren
  og kildelenken. Se [LICENSE](../../../../LICENSE) for vilkår.
