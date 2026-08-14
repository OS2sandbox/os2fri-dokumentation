1: # Teknologiafdækning
2: _Afdækning og rationale for valg af bootc teknologien til at understøtte OS2fri's programmets flådestyring._
3: 
4: ## Introduktion
5: 
6: Afdækningen viser hvilket teknologivalg der er det bedste strategiske valg til at understøtte OS2fri's programmets flådestyring. Valget favoriserer den teknologi, der leverer bedst på de fire identificerede metoder der løser de opstillede generelle myndigheds og drifts krav.
7: 
8: Det giver et flådestyringssystem, der opfylder de generelle højniveau-krav, majoriteten af driftsafdelinger opstiller. 
9: 
10: |  |  |  |
11: |:---:|:---:|:---:|
12: |   |   |   |
13: | ✓ Pålidelighed | ◎ Forudsigelighed | ⛨︎ Sikkerhed |
14: |   |   |   |
15: | ⚙︎ Effektiv drift | ⚖︎ Efterlevelse af lovgivning | ∞ Driftskontinuitet |
16: 
17: ## Behovsafdækning
18: _Driftsafdelinger formulerer sjældent nedskrevne tekniske krav — de oplever hvad de har brug for gennem hverdagens friktion. Samlet set stiller myndighedernes drift erfaringsmæssigt et lille antal **højniveau-krav** til et flådestyringssystem._
19: 
20: _For hvert krav angives de **metoder**, der kan levere på disse. Hvilke **teknologier** der kan anvendes til at implementere metoderne, vurderes i afsnittene om fordele og ulemper._
21: 
22: ### Højniveau-krav
23: ---
24: 
25: #### ✓ **Pålidelighed** — _"Enhederne skal bare virke"_
26: 
27: Elever, borgere og medarbejdere forventer, at enhederne er tændte, opdaterede og velfungerende hver eneste dag, ideelt set uden at nogen skal røre dem.
28: 
29:   - **Operationelle krav:** Flådestyringen skal vedligeholde enhederne af sig selv; maskinerne skal ikke kræve løbende manuel opmærksomhed.
30:   - **Metoder der leverer:** Automatiske og kontrollerede opdateringer; hurtig gendannelse og tilbagerulning af fejl; ensartede enheder uden afvigelser; ensartet overvågning.
31: 
32: ---
33: 
34: #### ◎ **Forudsigelighed** — _"Hvorfor fejler maskinen? Hvem har pillet ved konfigurationen sidst?"_
35: 
36: Ændringer laves i fag ofte fejlagtigt direkte på enkelte enheder og bliver sjældent dokumenteret, gennemgået eller udbredt til resten af flåden — så når en enhed fejler, kan ingen svare på, hvem der ændrede hvad eller hvornår. Flådens tilstand bliver dermed uforudsigelig.
37: 
38:   - **Operationelle krav:** Flådens tilstand skal til enhver tid kunne forklares og forudsiges: kun godkendte og dokumenterede ændringer udrulles, og hver ændring kan knyttes til en bestilling eller en beslutning.
39:   - **Metoder der leverer:** Ændringsstyring efter det klassiske ITIL-rammeværk — ændrings-anmodninger, hvor en ændring foreslås, gennemgås, godkendes og flettes ind, før den udrulles til flåden, så ændringer aldrig kommer uventet.
40: 
41: ---
42: 
43: #### ⛨︎ **Sikkerhed** — _"Hvis en enhed angribes, skal vi kunne håndtere det — hurtigt og effektivt! Optimalt uden at skulle være fysisk til stede ved maskinen."_
44: 
45: Sårbarheder skal håndteres proaktivt, og det skal undgåes at de påvirker hele flåden. Hvis en enhed alligevel rammes skal enheden hurtigt hurtigt og automatisk bringes tilbage i en sikker, godkendt standard tilstand.
46: 
47:   - **Operationelle krav:** Enhederne skal opdatere sig selv hurtigt og ensartet, så kendte sårbarheder lukkes proaktivt — og det skal være tæt på umuligt at ændre på selve systemet, også hvis en ondsindet aktør får adgang til en enhed.
48:   - **Metoder der leverer:** Hurtig og ensartet opdatering af hele flåden; systemkerne der i praksis ikke kan manipuleres fra enheden; løbende sikkerhedsrapportering.
49: 
50: ---
51: 
52: #### ⚙︎ **Effektiv drift** — _"Vi er få mennesker til mange maskiner."_
53: 
54: Manuelt arbejde per enhed skalerer ikke, hvis flåden vokser. Driften har brug for, at rutineopgaverne klares automatisk uden manuel indgriben, så de sparsomme menneskelige ressourcer bruges, på at levere ny værdi mere effektivt.
55: 
56:   - **Operationelle krav:** Rutineopgaver (konfiguration, opdatering, overvågning) skal klares automatisk uden krav om manuelt per-enhed arbejde.
57:   - **Metoder der leverer:** Automatiseret og centralt styret vedligehold; Ændringer forankres i godkendte tilstande for hele flåden;
58: ---
59: 
60: #### ⚖︎ **Lovgivningsmæssig efterlevelse** — _"Vi skal kunne redegøre for vores systemer."_
61: 
62: NIS2, GDPR og it-revision kræver, at man kan vise, hvad der er ændret, hvornår og af hvem — og at ændringerne er afprøvet, før de rammer enhederne i drift.
63: 
64:   - **Operationelle krav:** Sporbarhed og revisionsdata skal være et naturligt biprodukt af al administration, så efterlevelse bliver billig og enkel.
65:   - **Metoder der leverer:** Sporbar historik og revision som et naturligt biprodukt af al administration; konsistent dokumentation.
66: 
67: ---
68: 
69: #### ∞ **Driftskontinuitet** — _"Vi er afhængige af kontinuerlig drift — også ved uventede eksterne hændelser: aftaleophør, opkøb, licensændringer eller nye ejere af platformen."_
70: 
71: Flådestyringen skal kunne fortsætte, uanset hvad der sker omkring den: leverandøren kan ophøre, blive opkøbt, ændre licenser eller priser, og hosting kan skifte hænder. Løsningen må derfor ikke afhænge af én leverandør eller ét lukket system — kommunerne skal beholde kontrollen over egne systemer og data.
72: 
73:   - **Operationelle krav:** Systemet skal kunne fortsætte og skifte hænder uden afbrydelse: hele stacken skal kunne genskabes og flyttes til en ny leverandør eller hosting uden at miste data, konfiguration eller funktionalitet.
74:   - **Metoder der leverer:** Leverandøruafhængighed: åbne standarder og formater; ingen proprietære bindinger. Hele stacken (kode, deployments, konfiguration) beskrevet åbent og versionsstyret i git, så systemet kan genopbygges og flyttes.
75: 
76: ---
77: 
78: ### **Metoder der leverer på krav**
79: 
80: På tværs af kravene går fire metoder igen, der tilsammen kan håndtere dem:
81: 
82: 1. **Godkendt tilstand beskrevet ét sted** — flådens godkendte tilstand ligger som tekst i et versionsstyret depot (Pålidelighed, Effektiv drift, Lovgivningsmæssig efterlevelse, Driftskontinuitet).
83: 2. **Automatisk afstemning** — enhederne føres automatisk til den beskrevne tilstand og holdes der (Pålidelighed, Effektiv drift, Lovgivningsmæssig efterlevelse, Driftskontinuitet).
84: 3. **Sporbar historik og tilbagerulning** — alle ændringer føres i historik, kan føres tilbage til en beslutning og rulles tilbage (Forudsigelighed, Sikkerhed, Lovgivningsmæssig efterlevelse, Driftskontinuitet).
85: 4. **Gennemgang og godkendelse af ændringer** — ingen ændring rammer flåden uventet; alt foreslås, gennemgås og godkendes først (Forudsigelighed).
86: 
87: Set samlet leveres alle fire metoder af de standardiserede best practices, der er samlet under [OpenGitOps](https://www.cncf.io/projects/opengitops/).
88: 
89: Én metode er særlig krævende: ændringsstyringen (Forudsigelighed) lever kun fuldt ud, hvis den også gælder selve styresystemet — at OS'et kun kan ændres gennem den godkendte pipeline. Det er netop her, bootc skiller sig ud, som de følgende afsnit viser.
90: 
91: ## Fordele — hvorfor bootc er det bedste strategiske fit
92: 
93: For hver af de fire metoder beskrives her, hvordan bootc leverer på den — og dermed på de krav, metoden er knyttet til.
94: 
95: ### Godkendt tilstand beskrevet ét sted
96: 
97: _leverer på: Pålidelighed, Effektiv drift, Lovgivningsmæssig efterlevelse, Driftskontinuitet_
98: 
99: Flådens godkendte OS-tilstand er ét billede i et OCI-registry. Billedet bygges fra en tekstbeskrivelse i et versionsstyret depot — ét sted at se den godkendte tilstand, og ét sted at ændre den. Enhederne booter billedet; der er ingen anden "sandhed" om, hvordan OS'et skal se ud, end det, der ligger i registryet. Afvigelser kan opdages, fordi enheden kan sammenlignes med billedet.
100: 
101: ### Automatisk afstemning
102: 
103: _leverer på: Pålidelighed, Effektiv drift, Lovgivningsmæssig efterlevelse, Driftskontinuitet_
104: 
105: Enhederne føres automatisk mod det godkendte billede og holdes der — også efter fejl, geninstallering eller manuel indgriben. Driften kan lade rutineopgaverne køre af sig selv: hvis en enhed falder ud af den godkendte tilstand, bringes den tilbage til den, uden at nogen skal på besøg.
106: 
107: ### Sporbar historik og tilbagerulning
108: 
109: _leverer på: Forudsigelighed, Sikkerhed, Lovgivningsmæssig efterlevelse, Driftskontinuitet_
110: 
111: Hvert billede er uforanderligt og har en historik: hvad der er ændret, hvornår og af hvem. Rollback er et billede-skift — enheden peges tilbage på et tidligere, kendt billede og genstartes. Det giver hurtig gendannelse og nulstilling af en ramt enhed, uden at nogen skal være fysisk til stede, og revisionsdata bliver et naturligt biprodukt.
112: 
113: ### Gennemgang og godkendelse af ændringer
114: 
115: _leverer på: Forudsigelighed_
116: 
117: Et nyt billede produceres gennem en kontrolleret pipeline: forslag (pull request) → byg → signer → godkendelse → udrulning. Og afgørende: fordi bootc gør selve systemkernen i praksis umulig at ændre fra enheden, gælder ændringsstyringen også OS'et selv. Ingen kan pille ved konfigurationen på en enkelt maskine — det svarer direkte på spørgsmålet "hvem har pillet ved konfigurationen sidst?"
118: 
119: ### Derudover leverer bootc på de øvrige krav
120: 
121: **Driftskontinuitet** — hele stacken er åben og versionsstyret i git, og billederne ligger i et selv-hostet registry (fx Forgejo) efter en åben standard (OCI). Systemet kan derfor genopbygges, flyttes og skifte leverandør eller hosting uden at miste data, konfiguration eller funktionalitet — uanset aftaleophør, opkøb eller licensændringer.
122: 
123: **Sikkerhed** — opdateringer trækkes af enheden (download-only) og kan signeres; et indbrud i én enhed kan ikke bruges til at ændre systemet, og en ramt enhed genoprettes ved at pege på et godkendt billede.
124: 
125: **Effektiv drift** — billedet erstatter manuel installation og konfiguration pr. enhed; en ny version udrulles til hele flåden på én gang.
126: 
127: **Modenhed og økosystem** — bootc understøttes af Red Hat (RHEL image mode), CentOS Stream og Fedora, og der findes open source-fleet-controllere (fx bootc-fleet-controller) i det bredere GitOps-økosystem under CNCF.
128: 
129: **Kompetencer** — metoden bygger på git, pull requests og billede-/container-kendskab, som i forvejen findes i OS2fri-projekterne, frem for en proprietær konsol eller agent-teknologi.
130: 
131: ## Ulemper og risici
132: 
133: En grundig vurdering skal også forholde sig til, hvor bootc ikke leverer gratis:
134: 
135: - **Opdateringer aktiveres ved genstart.** En enhed skal genstartes, før et nyt billede tages i brug. Det kræver en policy for, hvornår og hvordan genstart sker (fx uden for arbejdstid) — særligt for informationsskærme.
136: - **Afhængighed af en orchestrator.** Afstemningen mod billedet leveres af en fleet-controller eller anden orchestrator. bootc beskriver _hvad_ tilstanden skal være; et eksternt lag sørger for, at den bliver det. Valg og drift af dette lag bliver en del af løsningen.
137: - **Base image er en de facto distro-binding.** Billeder bygges i praksis på RHEL image mode, CentOS Stream eller Fedora — man binder sig til en distro-familie og dens release-rytme.
138: - **App-laget.** Programmer og lokale pakker skal bygges ind i billedet eller køre containeriseret; klassisk "installer pakken på enheden" passer ikke med modellen.
139: - **Modenhed på arm.** Understøttelse og test på arm (fx Raspberry Pi) er yngre og mindre udbredt end på x86.
140: - **Omstillingsomkostning.** Driften skifter fra "enhed pr. enhed" til "billede og versioner" — en metodeomstilling, ikke kun et værktøjsskift.
141: 
142: ## Hvorfor ikke alternativerne
143: 
144: **Klassisk konfigurationsstyring (fx Ansible + traditionel pakkehåndtering)** kan udrulle konfiguration og pakker pr. enhed, men enhederne forbliver individuelle: der er ingen samlet godkendt tilstand for selve OS'et, ingen billed-historik og ingen hurtig rollback af hele systemet. Ændringsstyringen gælder ikke systemkernen, og en afvigende enhed kan kun bringes tilbage ved geninstallering.
145: 
146: **Tyndt billede + konfigurationsstyring ovenpå** er bedre, men afvigelser akkumuleres over tid ("snowflake-enheder"), og både forudsigelighed og rollback svækkes i forhold til et samlet billede.
147: 
148: De fire metoder leveres derfor kun fuldt ud af en image-baseret model, hvor selve OS'et er ændringsartefaktet — og det er netop bootc's model.
149: 
150: ## Konklusion og vejen videre
151: 
152: Bootc leverer de fire metoder, som afdækningen viser dækker kravene til flådestyring — og styrker samtidig de krav, der er sværest at opfylde i dag: forudsigelighed, sikkerhed og driftskontinuitet. Anbefalingen er at gå videre med bootc som grundlag for OS2fri's fleet management.
153: 
154: 
155: 
156: 
157: 
158: ---
159: 
160: ## Bilag A — Terminologi
161: 
162: Begreber anvendes i overensstemmelse med den fælles begrebsfil **`docs/begreber.md`**, der etableres via [issue #14](https://github.com/OS2sandbox/os2fri-dokumentation/issues/14) ("Afgrænsning af flertydige begreber").
163: 
164: Begrebsfilen fastlægger et fælles, teknologineutralt begrebssæt, så begreber som fx _enhed_, _flåde_, _base image_ og _opdatering_ betyder det samme på tværs af OS2fri-projekterne, uanset teknologivalg.
165: 
166: ## Bilag B — Enhedstyper og livscyklus
167: 
168: Afdækningen dækker de enhedstyper, OS2fri forventes at administrere, og de livscyklusfaser en flådeadministreret enhed gennemgår. Evalueringen vurderer bootc mod hele livscyklussen — ikke kun en enkelt fase.
169: 
170: **Enhedstyper**
171: 
172: ```mermaid
173: flowchart LR
174:     F["OS2fri-flåden"]
175:     A["Informationsskærm<br/>fastmonteret enhed uden brugerinteraktion, ofte en lille arm-enhed"]
176:     B["Skolecomputer<br/>undervisningscomputer (OS2skolepc)"]
177:     C["Let administrativ pc<br/>kontorcomputer (OS2admPC)"]
178:     D["Offentlig selvbetjenings PC<br/>computer i det offentlige rum (OS2borgerPC)"]
179:     F --> A
180:     F --> B
181:     F --> C
182:     F --> D
183: ```
184: 
185: **Livscyklusfaser**
186: 
187: ```mermaid
188: stateDiagram-v2
189:     direction LR
190:     [*] --> Initialisering
191:     Initialisering --> Klargøring
192:     Klargøring --> "Løbende opdateringer"
193:     "Løbende opdateringer" --> Overvågning
194:     Overvågning --> Afvikling
195:     Afvikling --> [*]
196: ```
197: 
198: Faserne initialisering, løbende opdateringer og overvågning er de mest kritiske for en flådeadministreret enhed og får tilsvarende vægt i vurderingen.
