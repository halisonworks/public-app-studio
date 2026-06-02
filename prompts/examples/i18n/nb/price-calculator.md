# Eksempel-prompt — Interaktiv priskalkulator

Et gjennomarbeidet eksempel på en omfattende, produksjonsklar prompt: en
interaktiv priskalkulator i én HTML-fil for videregående (Salg, service og
reiseliv) som også fungerer som verktøy for småbedrifter.

Dette er et **HTML-side**-eksempel.

> **App Studio-merknad.** Denne prompten laster Tailwind fra CDN. Det er greit
> for et App Studio-prosjekt — å hente statiske frontend-ressurser (et
> CSS-rammeverk, skrifter, bilder) er tillatt; det et prosjekt *ikke* skal være
> avhengig av, er en kjøretidstjeneste (backend, API-nøkler, innlogging eller en
> LLM). Se [`../../authoring-guide.md`](../../authoring-guide.md).
>
> En ferdig build av dette eksempelet ligger i
> [`projects/price-calculator/`](../../../../projects/price-calculator/).

---

## Enkel versjon

Last opp [`../../authoring-guide.md`](../../authoring-guide.md) og tillegget
[`../../context/educational.md`](../../context/educational.md) til KI-en først
(de bærer App Studio-reglene og lærings-formen), så holder noen få linjer som
dette — dette er nær slik eksempelet faktisk ble laget. KI-en (f.eks. Google
Gemini) fyller inn stil og detaljer. Bruk den detaljerte prompten under bare når
du vil ha presis kontroll.

```
Lag en enkelt, selvstendig HTML-side: en interaktiv priskalkulator for
varehandel i norsk kontekst (valuta `kr`). La meg skrive inn innkjøpspris,
velge MVA-sats (25 / 15 / 12 / 0 %) og sette en avanse % som holdes koblet til
dekningsgrad %. Vis utsalgspris eks. og inkl. MVA, dekningsbidraget og
MVA-beløpet, med en visuell prisoppbygning. Legg til en rabattsimulator og en
nullpunktsvisning. Gjør den ren og responsiv, alt i én fil.
```

## Prompten

````
Du er en senior frontend-utvikler og pedagogisk designer. Du skal kode en
komplett, selvstendig, og produksjonsklar interaktiv priskalkulator i én enkelt
HTML-fil.

Applikasjonen skal brukes både som et interaktivt læremiddel for elever på
videregående skole (Salg, service og reiseliv) og som et profesjonelt verktøy
for småbedrifter/gründere. Den må fungere feilfritt når den legges inn i en
iframe i et LMS som Canvas.

## KRITISKE DESIGNREGLER
1. **ABSOLUTT INGEN EKSTERNE/INTERNE IKONER:** Det er strengt forbudt å bruke
   FontAwesome, Lucide, Google Icons, SVG-ikoner eller emojier som ikoner.
   Grensesnittet skal være ekstremt rent, ryddig og profesjonelt, utelukkende
   styrt av elegant typografi (Inter-lignende sans-serif), fargekontraster,
   rammer og enkle CSS-prikker (f.eks. `rounded-full`) for fargekoding.
2. **RESPONSIVITET:** Layouten må skalere sømløst fra små mobilskjermer til
   store projektorer/smart-boards. Ingen horisontal scrolling.
3. **DESIGNTOKENS:** Bruk Tailwind CSS via CDN. Fargepaletten skal være rolig
   og moderne: Slate (gråblå) som grunntema, Emerald (smaragdgrønn) for marginer
   og dekningsbidrag, og Indigo (mørkeblå/lilla) for MVA-relaterte elementer.

---

## FUNKSJONELLE KRAV OG FORMLER

### 1. Inndatapanel (Venstre side)
* **Innkjøpspris (kr):** Et nummerfelt (`type="number"`) med standardverdi
  `100` kr.
* **MVA-sats:** Fire store, lettbrikkelige knapper (25% for varer, 15% for mat,
  12% for reiseliv, 0% for fritatt).
* **Avanse % (Skyveknapp 0-300% + Nummerfelt):** Regnes av innkjøpspris.
  * Formel: `Utsalgspris eks. MVA = Innkjøpspris * (1 + Avanse / 100)`
* **Dekningsgrad % (Skyveknapp 0-95% + Nummerfelt):** Regnes av salgspris eks
  MVA.
  * Formel: `Utsalgspris eks. MVA = Innkjøpspris / (1 - Dekningsgrad / 100)`
* **Toveis-kobling (Bi-directional binding):** Hvis brukeren endrer
  Avanse-slideren eller tallfeltet, skal dekningsgraden umiddelbart regnes ut på
  nytt og oppdateres i grensesnittet, og omvendt. Alt skal skje i sanntid uten
  forsinkelse.

### 2. Resultatpanel og Visualisering (Høyre side)
* **Fire store tallkort:**
  * Utsalgspris eks. MVA
  * Dekningsbidrag i kroner (Utsalgspris eks MVA minus Innkjøpspris)
  * MVA-beløp i kroner
  * Utsalgspris inkl. MVA (Det kunden betaler i kassen)
* **Visuell prisoppbygning (Dynamisk søyle):** En liggende, fargekodet stolpe
  som viser fordelingen av kasseprisen i prosent.
  * Innkjøp (Grå)
  * Dekningsbidrag (Smaragdgrønn)
  * MVA (Indigo)
  * Prosentene skal oppdateres dynamisk og vise andelen av *totalprisen kunden
    faktisk betaler* (altsammen skal summere seg to 100%).

---

### 3. Rabattsimulator (Nedre del)
* Vis tre kort for priskutt på hhv. 10%, 20% og 30%.
* For hver rabattsats, regn ut:
  * Ny utsalgspris kunden betaler.
  * Nytt dekningsbidrag i kroner.
  * Prosentvis reduksjon i dekningsbidraget. Formel:
    `((Originalt DB - Nytt DB) / Originalt DB) * 100`.
  * *Merk:* Hvis nytt DB blir negativt, skal det markeres tydelig med
    `(UNDER SELVKOST)` og farges rødt.
* Inkluder en pedagogisk advarsel som forklarer at rabatter spiser utelukkende
  av marginen, siden leverandøren skal ha nøyaktig det samme for varen uansett.

### 4. Modusstyring (Skole vs Bedrift)
* Knapper på toppen lar brukeren bytte mellom "Skolemodus" og "Bedriftsmodus".
* **I Skolemodus:** Vis en teoriseksjon som forklarer de økonomiske formlene,
  samt en seksjon med 3 praktiske og tverrfaglige elevutfordringer (klesbutikk,
  hotell, kafé).
* **I Bedriftsmodus:** Skjul skoleoppgavene og vis en **Nullpunktsanalyse
  (Break-even)**.
  * Brukeren kan skrive inn sine månedlige faste kostnader (standard: 50 000 kr).
  * Systemet regner ut **Nullpunktsvolum** (`Faste kostnader / Dekningsbidrag
    pr. enhet`) og **Nullpunktsomsetning** (`Faste kostnader / (Dekningsgrad i %
    / 100)`) i sanntid.

---

### 5. Presentasjonsmodus (Heldekkende 1-siders visning)
* En iøynefallende knapp merket "Start presentasjonsmodus".
* Ved aktivering åpnes et heldekkende, mørkt overlay
  (`fixed inset-0 bg-slate-950 z-50 overflow-hidden`) som **fjerner alt av
  input-felter, sliders, navigasjon, footere, hjelpetekster og innstillinger**.
* **Denne 1-siders visningen skal utelukkende inneholde:**
  * En ren topplinje med status på gjeldende MVA-sats og dekningsgrad.
  * De 4 store resultat-tallene i gigantiske, lettleselige fonter tilpasset
    projektor-visning.
  * Det fargekodede søylediagrammet i en forstørret utgave midt på skjermen med
    store, hvite prosentsatser for hver andel.
* **Flytende Info-toast:** En diskret og moderne infoboks på toppen av skjermen
  med teksten: `"Presentasjonsmodus aktiv | Trykk ESC-tasten for å gå tilbake"`.
  Denne boksen skal ha en CSS-transition og automatisk fade helt ut
  (`opacity-0`) etter nøyaktig **5 sekunder**.
* **Tastatur-event:** JavaScript må lytte globalt etter `Escape`-tasten. Når den
  trykkes, skal presentasjonsmoduset lukkes umiddelbart og returnere brukeren
  til kalkulatoren.

---

## TEKNISK STRUKTUR (Kildekodemal)

Bygg applikasjonen med følgende struktur. Sørg for at all CSS-styling,
Tailwind-konfigurasjon og JavaScript er bakt inn i denne ene filen:

```html
<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interaktiv Priskalkulator: Avanse, Bidrag og MVA</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        input[type="range"]::-webkit-slider-thumb { background: #4f46e5; cursor: pointer; }
        input[type="range"]::-moz-range-thumb { background: #4f46e5; cursor: pointer; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen font-sans">
    <!-- HOVEDVISNING -->
    <div id="main-calculator-view" class="block">
         <!-- Topplinje, Knapper for modus, kontrollere, diagrammer, simulator og skole/bedrifts-seksjoner -->
    </div>

    <!-- PRESENTASJONSMODUS OVERLAY -->
    <div id="presentation-overlay" class="hidden">
         <!-- Kun store tall og det gigantiske diagrammet, ingen input-felter -->
    </div>

    <script>
         // JavaScript-logikk for toveissynkronisering av sliders,
         // beregning av rabatter, break-even volum og styring av presentasjonsmodus (ESC-tast + 5 sek toast)
    </script>
</body>
</html>
```
````
