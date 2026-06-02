# Eksempel-prompt — Persona-utvikler

Et gjennomarbeidet eksempel på et læremiddel: en persona-bygger i tre moduser
(Lære, Praksis, Presentasjon) med målgruppe-maler, en tilfeldig generator,
localStorage og et rent presentasjonskort.

Dette er et **HTML-side**-eksempel.

> **App Studio-merknad.** Denne prompten laster Tailwind og Google Fonts fra
> CDN — greit for et App Studio-prosjekt (statiske ressurser); det et prosjekt
> *ikke* skal være avhengig av, er en kjøretidstjeneste (backend, API-nøkler,
> innlogging eller en LLM). Se
> [`../../authoring-guide.md`](../../authoring-guide.md).
>
> En ferdig build av dette eksempelet ligger i
> [`projects/persona-developer/`](../../../../projects/persona-developer/).

## Enkel versjon

Last opp [`../../authoring-guide.md`](../../authoring-guide.md) og tillegget
[`../../context/educational.md`](../../context/educational.md) først, så holder
noen få linjer som dette — KI-en fyller inn resten:

```
Lag en enkelt, selvstendig HTML-side: en "Persona-utvikler" for elever, gründere
og markedsførere. Tre faner — Læremodus (felt med kort teori om demografi,
geografi, psykografi og atferd), Praksismodus (et kompakt skjema uten teorien)
og Presentasjon (et rent, skrivebeskyttet persona-kort; ESC for å gå ut). Felt:
navn, alder, sivilstatus, yrke, inntekt, bosted, urbanitet, verdier, motivasjon,
pain points. Synkroniser feltene på tvers av fanene, lagre til localStorage, og
legg til hurtigstart-maler pluss en tilfeldig "inspirasjons-generator". Rolig
skandinavisk design (slate / indigo / emerald, avrundede hjørner, myke skygger).
Alt i én fil.
```

## Prompten

```
Opprett en komplett, interaktiv og profesjonell webapplikasjon kalt
"Persona-utvikler" kodet i én enkelt, selvstendig HTML-fil (index.html). Appen
skal hjelpe elever, entreprenører og markedsførere med å lære, utarbeide og
presentere målgrupper/personas.

1. Teknisk Stakk & Arkitektur
- Enkeltfil-mandat: All HTML, CSS og JS må ligge i denne ene filen. Ingen
  eksterne CSS- eller JS-filer er tillatt.
- Stil og rammeverk: Bruk Tailwind CSS (via CDN:
  <script src="https://cdn.tailwindcss.com"></script>) og skrifttypen Inter fra
  Google Fonts.
- Universell Utforming (UU): Bruk kontrastfarger som tilfredsstiller WCAG 2.1 AA
  (f.eks. dyp slate, indigo og hvit bakgrunn).
- Responsivitet: Layouten må fungere sømløst på mobil, nettbrett og desktop.

2. Tre-faset Modus-kontroll (Fane-system)
Appen skal ha en global fane-meny øverst for å veksle mellom tre moduser:
- Læremodus: Viser detaljerte inputfelter. Inkluderer faglige infobokser (teori
  om demografi, geografi, psykografi og atferd) og ledende hjelpespørsmål ved
  hvert felt.
- Praksismodus: Et kompakt og strømlinjeformet dashboard. Skjuler alle
  teoribokser og hjelpetekster for rask inntasting.
- Presentasjonsmodus: 100 % rent visningskort (read-only): skjul global header,
  navigasjon, handlingsknapper, hjelpetekster og inputs. Vis dataene utelukkende
  som et profesjonelt, vakkert designet "persona-kort" (grafisk ramme med venstre
  og høyre kolonne). Tastatur-snarvei: når brukeren er i presentasjonsmodus, skal
  appen lytte etter Esc-tasten for å bringe tilbake menyene og navigasjonen.
  Diskré toast-varsel: vis en mørk, stilren beskjed nederst på skjermen ("Trykk
  ESC for å gå ut av presentasjon") som automatisk tones ut og slettes etter 3
  sekunder.

3. Funksjonelle Krav & Dataflyt
- Datainnhold (felt): Demografi/Geografi — navn, alder, sivilstatus, yrke,
  inntekt, bosted, urbanitet (storby/bygd). Profilering — verdier & livsstil,
  kjøpsmål & motivasjon, utfordringer (pain points).
- Toveis synkronisering: endringer i ett felt (f.eks. Navn i Læremodus) må
  umiddelbart oppdatere tilsvarende felt i Praksismodus, og speiles på
  presentasjonskortet.
- LocalStorage: lagre alle feltverdier automatisk i nettleseren. Når siden lastes
  på nytt, skal brukerens progresjon gjenopprettes.
- Utskriftsoptimalisering (@media print): hvis brukeren velger utskrift
  (Ctrl + P), skal utskriften isolere kun selve persona-kortet. Skjul alt av
  menyer og tomrom.

4. Hurtigstart-funksjoner (maler & generator)
Legg til en "Hurtigstart"-seksjon øverst (kun synlig i Lære- og Praksismodus) med:
- Maler: fire knapper som fyller ut skjemaet med troverdige demografiske og
  psykografiske data: UB/Skoleelev (ungdomsbedrift, studentøkonomi, trender);
  Miljø-forelder (bærekraft, tidsklemma, familie); Digital Senior (forenkling,
  personlig service, pensjonist); Bedriftsleder (B2B) (ROI, effektivitet,
  beslutningstaker).
- Inspirasjons-generator: en knapp ("🎲 Inspirasjons-generator") som setter
  sammen tilfeldige navn, yrker, bosteder, verdier, motivasjoner og utfordringer
  fra et forhåndsdefinert bibliotek (bassenget med data må være variert og
  realistisk).

5. Estetiske Retningslinjer (Skandinavisk design)
- Bruk en rolig og minimalistisk fargepalett (slate, indigo, emerald, hvit).
- Gjør flittig bruk av avrundede hjørner (rounded-xl / rounded-2xl).
- Gi elementene visuell dybde med myke skygger (shadow-sm og shadow-md).
- I presentasjonskortet, generer en profil-avatar automatisk basert på
  forbokstaven i personaens navn (vis et spørsmålstegn "?" dersom feltet er tomt).
```
