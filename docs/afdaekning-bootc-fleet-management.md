# Afdækning: bootc i OS2fri's fleet management

> **Status:** skelet (`[plan]`). Arbejdspakker fyldes ud enkeltvis i rækkefølgen
> §2 → §3 → §4 → §5 → §6 → §7 → §1, og godkendes separat før næste påbegyndes.

## Status-overblik

| WP | Sektion | Emne | Status |
|----|---------|------|--------|
| 1.1 | §1 | Formål, afgrænsning & læsevejledning | `[plan]` |
| 2.1 | §2 | Terminologi | `[godkendt]` |
| 2.2 | §2 | Enhedstyper & livscyklus | `[godkendt]` |
| 2.3 | §2 | Krav til flådestyring | `[udkast]` |
| 3.1 | §3 | Metode & vurderingsniveau | `[plan]` |
| 3.2 | §3 | Kriterie-matrix | `[plan]` |
| 4.1 | §4 | Teknologiens kerne | `[plan]` |
| 4.2 | §4 | Provisionering & arkitekturer | `[plan]` |
| 4.3 | §4 | Økosystem & modenhed | `[plan]` |
| 5.1 | §5 | Image-pipeline, GitOps & provisionering | `[plan]` |
| 5.2 | §5 | Opdatering, rollback & fleet-orchestrering | `[plan]` |
| 5.3 | §5 | Sikkerhed, suverænitet, observability, kompetencer & app-lag | `[plan]` |
| 6.1 | §6 | Risikoregister-tabel | `[plan]` |
| 6.2 | §6 | Prioriterede åbne punkter | `[plan]` |
| 7.1 | §7 | Konklusion & vejen videre | `[plan]` |

---

## §1 Formål & læsevejledning *(skrives sidst)*

### WP 1.1 — Formål, afgrænsning & læsevejledning

- **Rationale:** Skrives sidst, fordi det skal afspejle det færdige dokument præcist. Afgrænser hvad dokumentet afdækker (ren evaluering af bootc mod OS2fri's fleet-behov — ikke en beslutning og ikke en sammenligning), hvem det er skrevet for, og hvordan det hænger sammen med issue 11 og en kommende ADR, der kan bygge på dokumentet.
- **Indhold (når færdigt):** formål; afgrænsning (hvad er in/out of scope); målgruppe; læsevejledning; status; relation til beslutningsloggen.

---

## §2 Fleet management-scope

### WP 2.1 — Terminologi

Begreber anvendes i overensstemmelse med den fælles begrebsfil **`docs/begreber.md`**, der etableres via [issue #14](https://github.com/OS2sandbox/os2fri-dokumentation/issues/14) ("Afgrænsning af flertydige begreber").

Begrebsfilen fastlægger et fælles, teknologineutralt begrebssæt, så begreber som fx *enhed*, *flåde*, *base image* og *opdatering* betyder det samme på tværs af OS2fri-projekterne, uanset teknologivalg.

### WP 2.2 — Enhedstyper & livscyklus

Afdækningen dækker de enhedstyper, OS2fri forventes at administrere, og de livscyklusfaser en flådeadministreret enhed gennemgår. Evalueringen vurderer bootc mod hele livscyklussen — ikke kun en enkelt fase.

**Enhedstyper**

| Type | Beskrivelse | 
|------|-------------|
| Informationsskærm | Fastmonteret, specialiseret enhed uden brugerinteraktion, ofte drevet af en minimal maskine som f.eks en lille arm-enhed eller en nuc. |
| Skolecomputer | Undervisningscomputer til elever og lærere i folkeskolen (OS2skolepc) |
| Let administrativ pc | Kontorcomputer til offentligt ansatte i en myndighed, fx administrative medarbejdere der behandler dokumenter og sager (OS2admPC) |
| Offentlig selvbetjenings PC | Computer i det offentlige rum, fx på bibliotek eller i borgerservice, som borgere bruger til selvbetjening, fx digital post og blanketter (OS2borgerPC) |

**Livscyklusfaser**

1. **Initialisering** — enheden initialiseres til klargøringsfasen (minimalt initialiserings OS-image installeres)
2. **Klargøring** — enheden navngives og peges op imod det ønskede image.
3. **Løbende opdateringer** — OS og konfigurationer holdes opdateret sikkert og kontrolleret
4. **Overvågning** — enhedens tilstand og compliance overvåges løbende
5. **Afvikling** — enheden tages ud af drift med en simpel nulstilling af den interne disk.

Faserne initialisering, løbende opdateringer og overvågning er de mest kritiske for en flådeadministreret enhed og får tilsvarende vægt i vurderingen.

### WP 2.3 — Krav til flådestyring

**Afdækning af højniveau-kravene**

_Driftsafdelinger formulerer sjældent nedskrevne tekniske krav — de oplever hvad de har brug for gennem hverdagens friktion. Afdækket og samlet stiller myndighedernes drift reelt et lille antal **højniveau-krav** til et flådestyringssystem. For hvert krav angives herunder de **metoder**, der kan levere på disse.
Hvilke **teknologier** der kan aktivere metoderne, vurderes senere i dokumentet._

1. **Driftskontinuitet** — _"Enhederne skal bare virke"_ 
Elever, borgere og medarbejdere forventer, at enhederne er tændte, opdaterede og velfungerende hver eneste dag, ideelt set uden at nogen skal røre dem. 
    - **Operationelle krav:** Flådestyringen skal vedligeholde enhederne af sig selv; maskinerne skal ideelt set ikke kræve løbende manuel opmærksomhed.
    - **Metoder der leverer:** Automatiske og kontrollerede opdateringer; hurtig gendannelse og tilbagerulning af fejl; ensartede enheder uden afvigelser; overvågning på afstand.

2. **Styr på ændringerne** — _"Hvem har pillet ved konfigurationen sidst?"_
Ændringer laves tit direkte på en enkelt maskine for at løse et problem hurtigt, men de er hverken set af andre, dokumenteret eller overført til resten af flåden. Når en enhed så fejler, kan ingen svare på, hvem der ændrede hvad — og samme fejl dukker op igen andre steder. Formel ændringsstyring (ITIL) ville løse det, men opleves som et tungt ekstra lag, der omgås i hverdagen. Her bliver gennemgang, godkendelse og dokumentation ét og samme trin — næsten gratis.
    - **Operationelle krav:** Alle ændringer til flåden skal gennemgåes og godkendes, før de udrulles — og hver ændring skal kunne knyttes til en bestilling eller en beslutning.
    - **Metoder der leverer:** Ændrings-anmodninger, hvor en ændring foreslås, gennemgås, godkendes og flettes ind, før den udrulles til flåden.

3. **Sikkerhed** — _"Hvis en maskine bliver angrebet, skal vi kunne håndtere det — hurtigt og effektivt, uden at skulle være fysisk til stede ved maskinen."_
En trussel skal kunne lukkes ned, før den når resten af flåden, og en ramt enhed skal hurtigt kunne bringes tilbage i en sikker, godkendt standard tilstand.
    - **Operationelle krav:** Enhederne skal opdatere sig selv hurtigt og ensartet, så kendte sårbarheder lukkes — og det skal være tæt på umuligt at ændre på selve systemet, også hvis en ondsindet aktør får adgang til en enhed.
    - **Metoder der leverer:** Hurtig og ensartet opdatering af hele flåden; systemkerne der i praksis ikke kan manipuleres fra enheden; løbende sikkerhedsrapportering.

4. **Effektiv drift** — _"Vi er få mennesker til mange maskiner."_
Manuelt arbejde per enhed skalerer ikke, hvis flåden af enheder vokser. Driften har brug for, at rutineopgaverne klares automatisk uden manuel indgriben, så ressourcerne bruges på det, der kræver mennesker.
    - **Operationelle krav:** Rutineopgaverne (installation, konfiguration, opdatering) skal klares automatisk uden krav om manuelt per-enhed arbejde.
    - **Metoder der leverer:** Automatiseret vedligehold styret af en beskrivelse af den godkendte tilstand for flåden; central administration af denne tilstand, uden manuelle tildelinger direkte til enhederne.

5. **Lovgivningsmæssig efterlevelse (NIS2, GDPR, CRA)** — _"Vi skal kunne redegøre for vores systemer."_
NIS2, GDPR og revisioner kræver, at man kan vise, hvad der er ændret, hvornår og af hvem — og at ændringerne er afprøvet, før de rammer enhederne i drift.
    - **Operationelle krav:** Sporbarhed og revisionsdata skal være et naturligt biprodukt af al administration, så efterlevelse bliver billig og enkel.
    - **Metoder der leverer:** Sporbar historik og revision som et naturligt biprodukt af al administration; konsistent dokumentation.

6. **Digital suverænitet og leverandørfrihed** — _"Vi må ikke blive bundet til én leverandør."_
Kommunerne skal kunne skifte leverandør uden at miste kontrollen over egne systemer — hverken teknisk eller aftalemæssigt.
    - **Operationelle krav:** Åbne standarder og formater uden proprietære bindinger.
    - **Metoder der leverer:** Åbne standarder og formater; ingen proprietære bindinger.

7. **Dækning af hele flådens hardware** — _"Flåden indeholder forskellig hardware."_
Flåden omfatter både x86-enheder og arm-baserede enheder (fx informationsskærme), og ingen af dem må falde uden for forvaltningen.
    - **Operationelle krav:** Hele flåden skal kunne administreres efter samme metode, uanset hardwarearkitektur.
    - **Metoder der leverer:** Hardwareuafhængig beskrivelse af ønsket tilstand.

**Metoderne samlet — GitOps**

På tværs af kravene går fire metoder igen, og de samles under betegnelsen GitOps:

1. **Ønsket tilstand beskrevet ét sted** — enhedernes ønskede tilstand ligger som tekst i et versionsstyret depot (krav 1, 4, 5, 7).
2. **Automatisk afstemning** — enhederne føres automatisk til den beskrevne tilstand og holdes der (krav 1, 4, 5).
3. **Sporbar historik og tilbagerulning** — alle ændringer føres i historik, kan føres tilbage til en beslutning og rulles tilbage (krav 2, 3, 5).
4. **Gennemgang og godkendelse af ændringer** — ingen ændring rammer flåden, før den er foreslået, gennemgået og godkendt (krav 2).

**Teknologier der enabler metoderne**

Hvilke teknologier der konkret kan enablere disse metoder — herunder image-baseret OS-distribution (bootc) — er genstanden for §4 (faktagrundlag) og [§5](#5-bootc-mod-fladebehovet), hvor bootc vurderes som fordele og ulemper mod de afdækkede krav.

---

## §3 Metode & vurderingskriterier

### WP 3.1 — Metode & vurderingsniveau

- **Rationale:** Gør evalueringen efterprøvbar og transparent: kildedrevet, pr. kriterie, med eksplicit konsekvens i fleet-termer — så beslutningstagere kan følge ræsonnementet.
- **Indhold (når færdigt):** hvordan vurderinger laves, kildemateriale, og vurderingsniveau pr. kriterie.

### WP 3.2 — Kriterie-matrix

- **Rationale:** Fastlægger de 11 kriterier samt formål/vægt bag hvert — rammen §5 vurderes mod. Godkendes én gang og bruges derefter uændret.
- **Indhold (når færdigt):** tabel over de 11 kriterier (GitOps & image-pipeline; provisionering; opdateringsdistribution; rollback & resiliens; fleet-orchestrering; sikkerhed & compliance; suverænitet & lock-in; observability; kompetencer & drift; modenhed & support; app-lag/override) med formål og vægt.

---

## §4 Faktagrundlag — bootc

### WP 4.1 — Teknologiens kerne

- **Rationale:** Etablerer det tekniske fundament som §5 refererer til, kildenært og kun i det omfang det er fleet-relevant.
- **Indhold (når færdigt):** OCI som transportformat, transactionelle in-place opdateringer, immutable fs-layout, rollback og download-only-opdatering.

### WP 4.2 — Provisionering & arkitekturer

- **Rationale:** Dokumenterer understøttelsen af fleet-provisionering og arm64-behovet (fx informationsskærme).
- **Indhold (når færdigt):** bootc-image-builder (ISO/raw/qcow2), understøttede arkitekturer (x86_64, aarch64) og informationsskærm-scenariet.

### WP 4.3 — Økosystem & modenhed

- **Rationale:** Fastlægger hvilken driftsunderstøttelse og support der findes, og hvor teknologien står i modenhed.
- **Indhold (når færdigt):** base images (Fedora, CentOS Stream, RHEL image mode), Forgejo som suveræn OCI-registry, bootc-fleet-controller, CNCF-status og semver-stabilitet.

---

## §5 Bootc mod fleet-behovet

### WP 5.1 — Image-pipeline, GitOps & provisionering (kriterie 1–2)

- **Rationale:** Besvarer kernespørgsmålet om fleet'et kan provisionseres og styres via git/OCI.
- **Indhold (når færdigt):** pros/cons pr. kriterie med konkret konsekvens for provisionering og GitOps-styring af OS2fri-fleet'en.

### WP 5.2 — Opdatering, rollback & fleet-orchestrering (kriterie 3–5)

- **Rationale:** Dækker det mest kritiske fleet-behov: sikker udrulning med kontrol og rollback.
- **Indhold (når færdigt):** pros/cons for opdateringsdistribution, rollback/resiliens og fleet-orchestrering, udtrykt i fleet-termer (fx bandwidth, maintenance windows, rollback uden onsite).

### WP 5.3 — Sikkerhed, suverænitet, observability, kompetencer & app-lag (kriterie 6–11)

- **Rationale:** Dækker de øvrige krav bag compliance, drift og child-projekternes fleksibilitet.
- **Indhold (når færdigt):** pros/cons for sikkerhed & compliance, suverænitet & lock-in, observability, kompetencer & drift, modenhed & support samt app-lag/override.

---

## §6 Risikovurdering

### WP 6.1 — Risikoregister-tabel

- **Rationale:** Struktureret vurdering af åbne punkter, så risici er sammenlignelige og prioriterbare.
- **Indhold (når færdigt):** tabel med Risiko | Beskrivelse | Sandsynlighed (H/M/L) | Påvirkning (H/M/L) | Afhjælpning for modenhed, base-image = de facto distro-binding, manglende package layering, reboot pr. opdatering, orchestrator-afhængighed og aarch64/RPi-modning.

### WP 6.2 — Prioriterede åbne punkter

- **Rationale:** Destillerer de risici en kommende ADR skal forholde sig til — gør dokumentet decision-ready.
- **Indhold (når færdigt):** kort prioriteret liste over åbne punkter med hvad der kræves, før en beslutning kan træffes.

---

## §7 Anbefaling & vejen videre

### WP 7.1 — Konklusion & vejen videre

- **Rationale:** Samler konklusionen i få linjer og peger på, hvad en ADR skal adressere — gør dokumentet til et springbræt frem for et slutpunkt.
- **Indhold (når færdigt):** entydig konklusion på, om bootc dækker OS2fri's fleet-behov, samt hvilke punkter en kommende ADR skal forholde sig til.
