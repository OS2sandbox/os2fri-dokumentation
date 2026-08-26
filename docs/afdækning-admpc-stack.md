# Anbefalinger for OS2admPC
_Mulige komponenter, risikovurderinger og pilotbeskrivelser_

## Sammenfatning og anbefaling

OS2admPC foreslås som et digitalt suverænt alternativ til den nuværende BigTech-baserede arbejdsplads — bygget med genbrug og åbne standarder vha. open source. Myndighederne får igennem OS2 mulighed for at skabe den ønskede handlefrihed i deres digitale løsninger hele vejen fra kravspec til drift. Det handler derfor ikke kun om teknik, men om de ressourcer der afsættes til at kontrollere kommunernes digitale redskaber og leverancekæder.

Dokumentet beskriver forudsætninger og antagelser, præsenterer **foreløbige kandidatkomponenter**, rejser **væsentlige risici** og foreslår **pilot og succeskriterier**.
Komponentvalg kan først endeligt foretages i et senere trin, når brugerbehovene er afdækket.

## Forudsætninger

> _For at kunne sikre ejerskabet og levere på målene er der en række nødvendige forudsætninger, det er vigtigt at beslutte sig for._

### Ejerskab kræver nye investeringer og kompetencesæt

At eje en leverancekæde og kildekoden til et stykke software kræver noget helt andet end et traditionelt kundeforhold, hvor man køber et færdigt produkt. Da det ikke vurderes realistisk at finde eller tiltrække de rette kompetencesæt internt i myndighederne på kort sigt, vil en strategi der laver aftaler med flere uafhængige specialistleverandører være den mest realistiske inden for tidsrammen.
OS2-sekretariatet er gennem den professionaliseringsindsats, bestyrelsen igangsatte i den forrige strategiperiode rustet til at bistå med at vurdere og anbefale danske og evt. internationale EU-leverandører, der besidder de rette kompetencesæt.

### Open Source Steward-leverandør

En forudsætning er en neutral, uafhængig specialistleverandør, der løbende vedligeholder og fremtidssikrer projektets leverancekæde. Standarden for en sådan leverandør — der står uafhængig af udviklingsleverandøren — beskrives som en nødvendig rolle bl.a. i EU's Cyber Resilience Act, og man fremtidssikrer dermed ligeledes sit projekt ved at investere i en sådan rolle.

### Digital suveræn kode- og samarbejdsplatform
Digital suverænitet og handlefrihed handler bl.a. om at give myndighederne et værn imod de risici, der er ved at have hele sin leverancekæde og løsningskompleks placeret hos samme store enkeltleverandør. OS2 vil med os2fri tilbyde alternativer, så vores myndigheder ikke pludseligt uden varsel mister adgang til deres OS2-løsninger og den leverancekæde, der sikrer, bygger og udgiver dem. Projektets kildekode, dokumentation og leverancekæde kan som følge heraf ikke være isoleret på den amerikanske Microsoft-ejede GitHub-platform. Ved at etableres en git-baseret samarbejdsplatform ejet og kontrolleret af OS2 fjernes disse risici for vores medlemsmyndigheder. Det er en af fundamentstenene i at kunne garantere ejerskab og digital suverænitet.

### Farvel til Big Bang og Big Tech
Vaner der kommer naturligt ud af at være kunde i et leveranceforhold, skal afløses og erstattes med en for myndighederne mere værdifuld proces. I os2fri må det accepteres at give slip på vanetænkningen om store "Big Bang"-leverancer og istedet, via de rette kompetencer og leverandører, begynde at høste de værdier moderne best practise for softwareudvikling kan levere. De fleste moderne leverandører er i forvejen gearet til at arbejde med disse metodesæt, men os2fri bør via stærk leverandørstyring begynde at tage del i den værdi der skabes og ikke lade det være op til enkelte store leverandører at høste effektivitets- og besparelsespotentialerne. Ved at modtage små, brugbare leverancer med løbende værdi og hurtig læring, bliver dette muligt, men det kræver som nævnt et moderne rammeværk for leverandørstyring der styres og ejes af os2-projektets tilknyttede myndigheder og organer.

Med et så ambitiøst projekt som os2fri og OS2admPC og et så begrænset budget vil en enkelt vandfaldsleverance med blot et eller to tilbageløb kunne fuldstændigt tømme budgettet og efterlade et projekt, der reelt har mistet hele sin handlefrihed. 
Uden et solidt og fornuftigt forvaltet leverancebudget har projektet ikke de krævede frie midler til selv at kunne bestemme retning og sin egen fremtid.

### Et opgør med 1:1 krav

Et af de mest risikofyldte mønstre, der erfaringsmæssigt konsekvent fører til tilbageløb, nedbrud, konstante tilretninger og store frustrationer, er et misforstået fokus på, at nye løsninger SKAL levere 1:1 set i forhold til "den gamle løsning". Det er en forståelig tankekæde set ud fra et kundesynspunkt, hvor man frygter at "blive snydt" og miste funktionalitet.

Os2fri projektet anbefales derfor at leverancer ikke bliver en 1:1-kopier af eksisterende Big-Tech brugerflader og arbejdsgange, som man er vant til i dag — men at den iterativt vil kunne udvikles til at løse de samme opgaver under hensyntagen til handlefrihed og ejerskab. Succeskriteriet er derfor: **"Kan man udfære sit arbejde?"** — ikke identisk 1:1 funktionalitet og udseende.

I resten af dokumentet uddybes komponenter, risici og pilotforslag bag disse forudsætninger.

## Antagelser og uafklarede brugerbehov

Projektets målbilleder hviler i dag på nogle eksplicitte antagelser, ikke på målte brugerbehov eller data:

- Vi kender endnu ikke 100% de administrative medarbejderes faktiske arbejdsgange, prioriteringer og vaner. Funktionslisten for en "let administrativ bruger" kan derfor først fastlægges efter en behovsafklaring med deltager-myndighederne.
- De eksisterende afhængigheder til Microsoft, Google, fagsystemer etc. skal deles op i, hvad der er **teknisk nødvendigt**, og hvad der er afledt af nuværende **arbejdsgange, skabeloner eller vaner** — først denne opdeling viser, hvad der reelt bør genskabes.
- Komponentvalg i løsningen skal prioritere beviselig sikkerhed, compliance, interoperabilitet, skalerbarhed og digital suverænitet/dataejerskab. Disse rammer er med til at perspektivere målbilledet og sætte et stærkt rækværk op imod risikable beslutninger baseret på antagelser om "To-Be" løsningen.

## Målarkitektur: Kapabiliteter før produkter

Arkitekturen beskrives først som kapabiliteter — Beslutninger om hvilke teknologi og komponent kandidater der er "best-fit" tages på et oplyst grundlag, når behove er afdækkede og dokumenterede transparent i OS2Fri dokumentationen:

| Kapabilitet | Dækker |
|---|---|
| Identitet & adgang | Login, roller, fælleskommunal adgangsstyring |
| Samarbejde & dokumenter | Mail, kalender, kontakter, fildeling, web-kontorpakke |
| Klientlivscyklus | Installation, opdatering, konfiguration og overvågning af PC-flåden |
| Integration & sameksistens | Samarbejde med Microsoft-miljøet via åbne standarder |

**Hybrid sameksistens med Microsoft-platformen** — principper:

- Anvendelse af digitalt suverænt dokumentformat uden leverandørbindinger
- Anvendelse af standardprotokoller; priotering af transparente, åbne protokoller som byggesten.
- Undgå ultimative 1:1-krav som succeskriterium; investér i stedet i afdækning af "kan man lave det samme stykke arbejde"
- Forberedelse til digital suverænintet sikres bedst v.h.a. en fuldstændig parralel groupware-platform der synkroniseres med Microsoft-afhængihederne, ikke via dyre, tætkoblede integrationer til hver enkelt applikation.

## Foreløbige kandidatkomponenter

> **Teknologien findes — afdækningen mangler.** Tabelen nedenfor bekræfter, at der findes modne open source-kandidater til samtlige kapabiliteter. Men det kan på dette grundlag **ikke afgøres**, om de enkelte kandidater 100% er det rette fit — kun at teknologier der kan opfylde de generelle kapabiliteter eksisterer. Valg imellem kandidaterne sker efter behovsafklaringen (trin 2).

| Kapabilitet | Primær kandidat | Alternativ | Status/bemærkning |
|---|---|---|---|
| Groupware-backend | **Stalwart** | **Dovecot + Postfix** | Moderne all-in-one vs. moden klassiker (kræver supplerende CalDAV/CardDAV) |
| Groupware & filer | **Nextcloud (vanilla)** | **Seafile** | Fuld groupware vs. hurtigere ren fildeling |
| Identitet | **Keycloak / os2adgang** | **Authentik** | Detaljer i bilag-identitetsmodel.md |
| Adgangsstyring | **FKA** (+ STIL) | **Ingen reel alternativ** | Fælleskommunal infrastruktur |
| Klientlivscyklus | **OS2Base med bootc** | **NixOS fleet management** | Red Hat/IBM-backing vs. fragmenteret økosystem |

**Os2Base vs. OS2admPC-specifikt** — beslutningskriterium: En komponent anbefales placeret i OS2Base, når den betjener flere OS2-produkter (browservalg, identitetsstyring, klientstyring, drift/overvågning); komponenter der alene betjener den administrative arbejdsplads (groupware, kontorpakke) holdes i OS2admPC.

## Væsentlige risici og afbødninger

| Risiko | Konsekvens | Afbødning |
|---|---|---|
| Målbillede-aftaler indeholder antagelser om direkte 1:1-funktionalitet med "As-is" | Fejlprioriterede ressourcer, manglende leverance | Opgavebaseret succeskriterium: "kan man lave det samme stykke arbejde?" |
| Midlerne bruges kun på brugervendt funktionalitet uden suveræn infrastruktur | Binding til en ny enkeltleverandør uden exit-strategi | Steward-kontrakt, suveræn forge og opgavebaseret succeskriterium fra start |
| Troen på at suverænitet kun handler om leverandørens nationalitet | Kontrol med hverken kode, byggekæde eller drift ("black box"-drift) | Ejerskab til __hele__ leverancekæden: kildekode, dokumentation og infrastruktur under OS2 |
| Alt placeres på GitHub (BigTech-ejet platform) | "Red button"-risiko: adgangen til projektets samlede leverance kan begrænses uden varsel | OS2-ejet, digital suveræn forge |
| Ukendte brugerbehov styrer komponentvalg | Forkerte prioriteringer og dyre omvalg | Behovsafklaring som obligatorisk trin 1, før kandidater vælges |
| Præ-piloter er manuelle og personbundne | Ingen driftskontinuitet eller skalerbarhed | Automatiseret udrulning og overvågning via OS2Base |

## Forslag til pilot og succeskriterier

**Pilot:** OS2Base-styret PC-flåde med browseradgang til simpelt konfigureret groupware, der kun sameksisterer med proprietære platforme via åbne standarder — _et åbent Linux-baseret OS, en åben groupware, adgang via åbne standarder_.

- Digitale suveræne operationelle strategier, der sikrer transparens og giver OS2 ejerskab til alle bestanddele
- Driftskontinuitet via ensartethed og automatisering
- En åben, suveræn infrastruktur til automatiseret udrulning og overvågning, så person- og leverandørbindinger kan løsnes (OS2Base + bæredygtig finansiering af vedligehold og drift)
- Udskiftning af leverandørbundne groupware-komponenter (fildeling, mail, kalender, kontakter, web-kontorpakke) med udgaver, hvor myndighederne via OS2 ejer hele leverancekæden: applikations-, leverancekæde-, dokumentations- og infrastrukturkode (IaC)

**Målbare succeskriterier** (antal og varighed aftales ved godkendelse):

1. Et aftalt antal administrative brugere løser deres kerneopgaver (mail, kalender, dokumenter, fildeling) udelukkende på OS2admPC gennem hele pilotperioden
2. Samarbejde med brugere på Microsoft-platformen fungerer via åbne standarder uden manuelle omveje
3. IT-drift udruller og opdaterer alle piloteenheder centralt og automatiseret via OS2Base — ingen enhedsspecifikke manuelle trin
4. Andelen af brugere, der kan udføre "det samme stykke arbejde" som før, måles før/efter piloten
5. Projektets samlede kode, dokumentation og infrastruktur er tilgængelig på en OS2-ejet forge ved pilotens afslutning

## Næste skridt

| Trin | Indhold | Beslutning |
|---|---|---|
| **Trin 0 — nu** | Forudsætninger og planlægning | Godkend retning og rammer |
| **Trin 1 — behovsafklaring** | Workshops med deltagerkommuner: arbejdsgange, funktioner, tekniske vs. vanebaserede Microsoft-afhængigheder | Krav og prioriteter fastlægges |
| **Trin 2 — kandidatvalg** | Afdækning og sammenligning af kandidatkomponenter pr. kapabilitet | Vælg komponenter og steward-leverandør |
| **Trin 3 — pilot & skalering** | Gennemfør pilot mod succeskriterierne | Evaluer og beslut skalering |
