# Behov for flådestyring
_Da der ikke er indsamlet og dokumenteret behov for OS2fri endnu, samler dokumentet de behov og metoder, der er opskrevet på baggrund af akkumulerede erfaringer i myndighederne gennem det sidste årti._

## Behovsafdækning

Administratorer og driftsafdelinger formulerer sjældent nedskrevne tekniske krav — de oplever dem gennem hverdagens friktion: mange enheder, få hænder. Dokumentet beskriver derfor primært **administratorers og driftsafdelingernes behov** og fastlægger de højniveau-krav (R1–R6), flådestyringen bør opfylde, og de metoder (M1–M4), der kan levere på dem. Kravene og metoderne er formuleret teknologineutralt, så dokumentet er gyldigt uanset teknologi; hvilke **teknologier** der kan anvendes til at implementere metoderne, vurderes i [bootc-reference.md](bootc-reference.md).

### Højniveau-krav

```mermaid
flowchart LR
    r1["✓ Pålidelighed"]
    r2["◎ Forudsigelighed"]
    r3["⛨︎ Sikkerhed"]
    r4["⚙︎ Effektiv drift"]
    r5["⚖︎ Efterlevelse af lovgivnhed"]
    r6["∞ Driftskontinuitet"]
    r1 --> r2 --> r3 r4 --> r5 --> r6
  
```

---

##### R1
## ✓ **Pålidelighed**
_"Enhederne skal bare virke."_

> Elever, borgere og medarbejdere forventer, at enhederne er tændte, opdaterede og velfungerende hver eneste dag, ideelt set uden at nogen skal røre dem.

**Operationelle krav**

> Flådestyringen skal vedligeholde enhederne af sig selv. Enhederne skal ikke kræve løbende manuel opmærksomhed.

### Metoder der leverer

| ✓ | ✓ |  ✓ |
| :--- | :--- | :--   |
|   **M1 Godkendt tilstand beskrevet ét sted** — ensartede enheder uden afvigelser |   **M2 Automatisk afstemning** — automatiske og kontrollerede opdateringer; ensartet overvågning |  **M3 Sporbar historik og tilbagerulning** — hurtig gendannelse og tilbagerulning af fejl |


##### R2
## ◎ **Forudsigelighed** 
_"Hvorfor fejler maskinen? Hvem har pillet ved konfigurationen sidst?"_

> Ændringer laves traditionelt direkte på enkelte enheder eller grupper og bliver sjældent dokumenteret eller gennemgået før idriftsættelse. Så når en enhed fejler, kan ingen svare på, hvem der ændrede hvad eller hvornår. I nogle tilfælde udbredes rettelser fejlagtigt ikke til alle enheder i hele flåden.

> Flådens tilstand bliver dermed **uforudsigelig.**

**Operationelle krav**

> Flådens tilstand skal til enhver tid kunne forklares og forudsiges: kun godkendte og dokumenterede ændringer udrulles, og hver ændring kan knyttes til en bestilling eller en beslutning.

### Metoder der leverer

| ✓ | ✓ |
| :--- | :--- |
| **M3 Sporbar historik og tilbagerulning** — sporbar historik, så hver ændring kan føres tilbage til en beslutn | **M4 Gennemgang og godkendelse af ændringer** — ændringsstyring efter det klassiske ITIL-rammeværk: en ændring foreslås, gennemgås, godkendes og flettes ind, før den udrulles til flåden, så ændringer aldrig kommer uventet |

---
##### R3
## ⛨︎ **Sikkerhed**
_"Hvis en enhed angribes, skal vi kunne håndtere det — hurtigt og effektivt. Optimalt uden at skulle være fysisk til stede ved maskinen."_

> Sårbarheder skal håndteres tidligt og gerne proaktivt. Det skal undgås, at de påvirker hele flåden, men hvis en enhed alligevel rammes, skal enheden hurtigt og automatisk kunne bringes tilbage i en sikker, godkendt standardtilstand.

**Operationelle krav**

> Enhederne skal opdatere sig selv hurtigt og ensartet, så kendte sårbarheder lukkes proaktivt — og det skal være tæt på umuligt at ændre på selve systemet, også hvis en ondsindet aktør får adgang til en enhed.

### Metoder der leverer

| ✓ | ✓ | ✓ |
| :--- | :--- | :--- |
| **M1 Godkendt tilstand beskrevet ét sted** — systemkerne, der i praksis ikke kan manipuleres fra enheden | **M2 Automatisk afstemning** — hurtig og ensartet opdatering af hele flåden; løbende sikkerhedsrapportering | **M3 Sporbar historik og tilbagerulning** — hurtig gendannelse af ramte enheder til den godkendte standardtilstand |

---
##### R4
## ⚙︎ **Effektiv drift**
_"Vi er få mennesker til mange maskiner."_

> Manuelt arbejde per enhed skalerer ikke, hvis flåden vokser. Driften har brug for, at rutineopgaverne klares automatisk uden manuel indgriben, så de sparsomme menneskelige ressourcer bruges på at levere ny værdi mere effektivt.

**Operationelle krav**

> Rutineopgaver (konfiguration, opdatering, overvågning) skal klares automatisk uden krav om manuelt per-enhed-arbejde.

### Metoder der leverer

| ✓ | ✓ |
| :--- | :--- |
| **M1 Godkendt tilstand beskrevet ét sted** — ændringer forankres i godkendte tilstande for hele flåden | **M2 Automatisk afstemning** — automatiseret og centralt styret vedligehold |

---
##### R5
## ⚖︎ **Lovgivningsmæssig efterlevelse**
_"Vi skal kunne redegøre for vores systemer."_

> NIS2, GDPR og it-revision kræver, at man kan vise, hvad der er ændret, hvornår og af hvem — og at ændringerne er afprøvet, før de rammer enhederne i drift.

**Operationelle krav**

> Sporbarhed og revisionsdata skal være et naturligt biprodukt af al administration, så efterlevelse bliver billig og enkel.

### Metoder der leverer

| ✓ | ✓ | ✓ |
| :--- | :--- | :--- |
| **M1 Godkendt tilstand beskrevet ét sted** — konsistent dokumentation | **M3 Sporbar historik og tilbagerulning** — sporbar historik og revision som et naturligt biprodukt af al administration | **M4 Gennemgang og godkendelse af ændringer** — godkendelse, før en ændring rammer flåden |

---
##### R6
## ∞ **Driftskontinuitet**
_"Vi er afhængige af kontinuerlig drift — også ved uventede eksterne hændelser: aftaleophør, opkøb, licensændringer eller nye ejere af platformen."_

> Flådestyringen skal kunne fortsætte, uanset hvad der sker omkring den: leverandøren kan ophøre, blive opkøbt, ændre licenser eller priser, og hosting kan skifte hænder. Løsningen må derfor ikke afhænge af én leverandør eller ét lukket system — kommunerne skal beholde kontrollen over egne systemer og data.

**Operationelle krav**

> Systemet skal kunne fortsætte og skifte hænder uden afbrydelse: hele stacken skal kunne genskabes og flyttes til en ny leverandør eller hosting uden at miste data, konfiguration eller funktionalitet.

### Metoder der leverer

| ✓ | ✓ |
| :--- | :--- |
| **M1 Godkendt tilstand beskrevet ét sted** — hele stacken (kode, deployments, konfiguration) beskrevet åbent og versionsstyret i git, så systemet kan genopbygges og flyttes | **M3 Sporbar historik og tilbagerulning** — leverandøruafhængighed: åbne standarder og formater uden proprietære bindinger |

## Metoder der leverer på krav

På tværs af kravene går fire metoder igen, der tilsammen kan håndtere de opstillede scenarier og behov:

#### Oversigt over krav og metoder

| Krav | M1<br/>Godkendt tilstand | M2<br/>Automatisk afstemning | M3<br/>Sporbar historik og tilbagerulning | M4<br/>Gennemgang og godkendelse |
| :--- | :-: | :-: | :-: | :-: |
| **R1** Pålidelighed | ✓ | ✓ | ✓ | – |
| **R2** Forudsigelighed | – | – | ✓ | ✓ |
| **R3** Sikkerhed | ✓ | ✓ | ✓ | – |
| **R4** Effektiv drift | ✓ | ✓ | – | – |
| **R5** Lovgivningsmæssig efterlevelse | ✓ | – | ✓ | ✓ |
| **R6** Driftskontinuitet | ✓ | – | ✓ | – |

_✓ = metoden kan levere på kravet · – = ingen direkte kobling_

#### M1 Godkendt tilstand beskrevet ét sted

Fladens godkendte tilstand ligger som tekst i et versionsstyret depot.

- **Leverer på:** R1 Pålidelighed · R3 Sikkerhed · R4 Effektiv drift · R5 Lovgivningsmæssig efterlevelse · R6 Driftskontinuitet.

#### M2 Automatisk afstemning

Enhederne føres automatisk til den beskrevne tilstand og holdes der.

- **Leverer på:** R1 Pålidelighed · R3 Sikkerhed · R4 Effektiv drift.

#### M3 Sporbar historik og tilbagerulning

Alle ændringer føres i historik, kan føres tilbage til en beslutning og rulles tilbage.

- **Leverer på:** R1 Pålidelighed · R2 Forudsigelighed · R3 Sikkerhed · R5 Lovgivningsmæssig efterlevelse · R6 Driftskontinuitet.

#### M4 Gennemgang og godkendelse af ændringer

Ingen ændring rammer flåden uventet; alt foreslås, gennemgås og godkendes først.

- **Leverer på:** R2 Forudsigelighed · R5 Lovgivningsmæssig efterlevelse.

Set samlet leveres alle fire metoder af de standardiserede best practices, der er samlet under [OpenGitOps](https://www.cncf.io/projects/opengitops/).

Én metode er særlig krævende: ændringsstyringen (R2 Forudsigelighed) lever kun fuldt ud, hvis den også gælder selve styresystemet — at OS'et kun kan ændres gennem den godkendte pipeline. Om en teknologi kan levere det, vurderes i [bootc-reference.md](bootc-reference.md).

##### R7
## ∞ **Genbrug af standardkomponenter**
_"Vi skal maksimere ressourcerne der anvendes til at levere værdi til myndighederne, ikke på at vedligeholde egenopfundne infrastruktur løsninger når der findes en international standard"_
> Følg anerkendte arkitektur standarder for genbrug som "Don't t roll your own _infratructure_" og "Upstream first". Genbrug anderkendte standard metrikker for levedygtighed og sikkerhed før valg om genbgrug træffes.

##### R8
## ፠ **Digital Suverænitet og ejerskab by design**
_"Vi skal som myndigheder selv eje 100% af løsningen, så vi er rustede til eksterne forandringer der kan påvirke vores driftskontinuitet"_
> Alle dele af løsningen lige fra dokumentation, kildekode, udrulningsmanifester, skabeloner og den opgavestyring der tegner leverancen skal været transparent, styret og ejet af os2 myndighederne selv.

##### R9
## ༄ **Byg til fremtiden efter anerkendte principper**
_"For at spare tid og penge, skal vi genanvende de rette nationale og internationale arktieturprincipper istedet for at lade en leverandør eller en stærk enkeltaktør styre udviklingen og skævvride værdileverancen til fællesskabet"_
> For at levere en fair og solidarisk bred værdi til myndighederne i os2 fælleskabet skal vi lade os guide af den kollektive massive erfaring i at udvikle og levere software der ligger frit tilgængeligt i den internationale litteratur om Enterprise Arkitektur mønstre. OS2 er sat i verden for at levere værdi til det offentlige Danmark ikke opfinde ny infrastruktur.


---
## Bilag A — Terminologi

Begreber anvendes i overensstemmelse med den fælles begrebsfil **`docs/begreber.md`**, der etableres via [issue #14](https://github.com/OS2sandbox/os2fri-dokumentation/issues/14) ("Afgrænsning af flertydige begreber").

Begrebsfilen fastlægger et fælles, teknologineutralt begrebssæt, så begreber som fx _enhed_, _flåde_, _base image_ og _opdatering_ betyder det samme på tværs af OS2fri-projekterne, uanset teknologivalg.