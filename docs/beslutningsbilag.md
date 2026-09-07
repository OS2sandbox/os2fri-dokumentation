# Brugervenlighed på skrivebordet for ikke-tekniske slutbrugere

**Problemgruppe:** Brugeroplevelse som arkitekturhensyn

## Hvilket behov ser vi?

Skrivebordsmiljøet for ikke-tekniske slutbrugere skal være brugervenligt

## Hvad anbefaler vi som udgangspunkt?

Det konkrete design af slutbrugergrænsefladen behøver ikke særlig meget opmærksomhed; det er tilstrækkeligt at vælge noget, der ligner "Windows 10", for at brugerne bliver tilfredse.

## Hvordan kan man følge op?

Produktledelsesrollen foretager en behovsvurdering

# Brugervenlig administrationsplatform for administratorer

**Problemgruppe:** IT-medarbejdernes arbejdsgang

## Hvilket behov ser vi?

Administratorer har brug for en brugervenlig administrationsplatform.

## Hvad anbefaler vi som udgangspunkt?

Udvikle et letvægtslag oven på Git, der specifikt imødekommer administratorens arbejdsgang, som den er undersøgt.

## Hvad kan det betyde i praksis?

- Dette er en skræddersyet komponent, hvis udvikling skal styres via en produktledelsesproces.
- Nogle konfigurationsindstillinger vil være under OS2bases ansvar, mens andre vil være under et underprojekts ansvar. Alligevel skal vi sikre, at konfigurationsplatformen opfattes som ét samlet produkt.
- Konfigurationen på Git-niveau fungerer i det væsentlige som en datamodel for denne konfigurationsgrænseflade, hvilket betyder, at den bør baseres på de behov, der er afdækket under udviklingen af denne komponent. Det vil være mindre produktivt at designe konfigurationen på Git-niveau uafhængigt af administratorernes behov.

## Hvordan kan man følge op?

Produktledelsesrollen undersøger administratorernes behov, støttet af Frontend- og GitOps-rollen

# Support til opsætning af Raspberry Pi-kiosker

**Problemgruppe:** Funktionalitet som arkitekturhensyn

## Hvilket behov ser vi?

Kommunerne ønsker at fortsætte med at bruge deres Raspberry Pi-baserede kioskopstillinger.

## Hvad anbefaler vi som udgangspunkt?

Med henblik på fremtidige implementeringsbeslutninger bør teknologierne vælges således, at både x86- og arm64-arkitekturer understøttes (for arm64 er funktionaliteten i kiosk-anvendelsesscenariet tilstrækkelig).

## Hvordan kan man følge op?

Produktledelsesrollen undersøger kommunernes behov, støttet af systemingeniørrollen

# Liste over kompatibel hardware til os2fri

**Problemgruppe:** Funktionalitet som arkitekturhensyn

## Hvilket behov ser vi?

Forskellige enheder understøtter OS2fri-systemerne med varierende pålidelighed.

## Hvad anbefaler vi som udgangspunkt?

En liste over kompatibel hardware skal indgå i OS2fri-projektet. Kun specifikke enheder understøttes officielt.

## Hvordan kan man følge op?

Produktledelsesrollen undersøger forventningerne til hardware, støttet af Linux-hardwarerollen

# Cloud-løsninger til enheder, der ikke opfylder kravene

**Problemgruppe:** Fælles arkitektur

## Hvilket behov ser vi?

Hvis der udarbejdes en liste over kompatibel hardware, vil nogle kommuner eller brugere muligvis ikke være villige til eller i stand til at begrænse sig til de enheder, der står på listen.

## Hvad anbefaler vi som udgangspunkt?

Prioritere cloud- og webbaserede løsninger, så enheder, der ikke overholder kravene, stadig kan drage fordel af visse dele af OS2fri-økosystemet.

## Hvordan kan man følge op?

Produktledelsesrollen undersøger kommunernes behov, støttet af systemingeniørrollen

# Risikobaseret proces til vurdering af brugerbehov

**Problemgruppe:** Funktionalitet som arkitekturhensyn

## Hvilket behov ser vi?

Den nødvendige behovsafdækning kræver betydelige økonomiske ressourcer.

## Hvad anbefaler vi som udgangspunkt?

Udviklingsprocessen for OS2fri-projekterne bør være sådan, at der ved risikofyldte beslutninger først indhentes oplysninger om brugernes behov, inden der træffes beslutninger om implementering. Ved beslutninger med lav risiko er det acceptabelt at gætte på brugernes behov. Der skal lægges særlig vægt på administratorernes oplevelse.

## Hvordan kan man følge op?

Under indsamlingen af brugerfeedback undersøger produktledelsesrollen, om den udførte behovsvurdering var tilstrækkelig, og justerer i overensstemmelse hermed.

# Overvågning af kørende system og pipeline

**Problemgruppe:** Fælles arkitektur

## Hvilket behov ser vi?

Af hensyn til compliance og sikkerhed er der behov for overvågning af det kørende system og leveringspipeline.

## Hvad anbefaler vi som udgangspunkt?

Enhver løsning, der indgår i OS2fri-projekterne, skal levere standardiserede dataendepunkter, der muliggør al nødvendig overvågning. Valg og konfiguration af et overvågningsværktøj falder uden for OS2fris anvendelsesområde.

## Hvordan kan man følge op?

"Compliance & Security"-Rollen hjælper med at identificere de nødvendige dataendpunkter.

# Suveræn Git Forge, build-pipeline, image-register

**Problemgruppe:** Fælles arkitektur

## Hvilket behov ser vi?

Den eksisterende, ikke-suveræne softwareudleveringsinfrastruktur fra "big tech"-virksomhederne opfylder ikke OS2fris strategiske behov.

## Hvad anbefaler vi som udgangspunkt?

Alle OS2fri-projekter skal have adgang til en suveræn og driftsstabil Git-forge, build-pipeline og image-register.

## Hvordan kan man følge op?

Systemingeniørrollen vurderer de specifikke tekniske behov med strategisk input fra produktledelsen

# Browser- og desktopmiljø i os2base

**Problemgruppe:** OS2base

## Hvilket behov ser vi?

De fleste OS2fri-projekter har behov for et skrivebordsmiljø og en webbrowser, men dette gælder ikke for alle projekter.

## Hvad anbefaler vi som udgangspunkt?

En webbrowser og alle de komponenter, den er afhængig af, vil indgå i OS2base — for projekter, der har brug for en mindre basis, vil fjernelsen af disse komponenter være deres eget anliggende.

## Hvad kan det betyde i praksis?

- Underprojekter bliver nødt til at tilføje deklarationer, der fjerner de komponenter, de ikke ønsker. OS2base bliver nødt til at give vejledning i, hvordan man gør det.
- De enkelte projekter behøver ikke at træffe beslutninger vedrørende operativsystemets brugergrænseflade eller browseren.
- Sandsynligvis vil alle OS2fri-projekterne dele den samme UX-logik — hvis man ved, hvordan man navigerer rundt i borgerpc-operativsystemet, vil man også vide, hvordan man bruger admpc.
- Beslutningerne om DE og browser vil sandsynligvis bestå gennem hele OS2fri-livscyklussen, da OS2base vil have ringe incitament til at ændre disse komponenter.

## Hvordan kan man følge op?

Produktledelsen i OS2base vurderer løbende, om ansvarsfordelingen er hensigtsmæssig

# Deklarativt operativsystem baseret på bootc

**Problemgruppe:** Fælles arkitektur

## Hvilket behov ser vi?

En flåde af maskiner skal bringes i en ønsket tilstand.

## Hvad anbefaler vi som udgangspunkt?

Operativsystemerne vil være fuldt deklarative og baseret på bootc.

## Hvad kan det betyde i praksis?

- En pipeline til opbygning og signering af images bliver et must for kunderne at have adgang til, ligesom et image-register.
- bootc tilskynder til et design, hvor ændringer på systemet ikke foretages under kørsel, men på deklarationsniveau, hvilket betyder, at der skal lægges ekstra kræfter i løsningsdesignet (fordi den gængse måde at tænke på brugen af et operativsystem ikke finder anvendelse).
- Det vil være langt nemmere at opnå "compliance by design" og undgå konfigurationsafvigelser.
- Der er en risiko for, at brug af et andet operativsystem end et rpm-baseret (Fedora, CentOS osv.) vil medføre udfordringer.
- Brugere kan ikke installere software under kørsel, hvilket betyder, at denne mulighed for visse systemer skal tilvejebringes via et eksternt, sandboxet softwaremiljø som f.eks. flatpak.

## Hvilke andre muligheder er der?

nix, mkosi

## Hvordan kan man følge op?

Dette er den tekniske beslutning med den højeste risiko i OS2fri-programmet. For at mindske risikoen kan specialister inden for de respektive teknologier udvikle demoer for hver alternativ tilgang. For at holde omkostningerne nede kan demoerne starte meget enkelt og gradvist øges i kompleksitet, indtil der træffes en beslutning.

# OCI-lagsdesign efter ændringsfrekvens

**Problemgruppe:** Fælles arkitektur

## Hvilket behov ser vi?

Nye image builds efter deklaration eller upstream-opdateringer medfører mærkbar ressourceforbrug.

## Hvad anbefaler vi som udgangspunkt?

Under designet af OCI (bootc)-lag skal man tage højde for ændringsfrekvensen: komponenter, der sjældent ændres, bør placeres nederst, mens komponenter, der ofte ændres, bør placeres øverst (så lagene kan genbruges under opbygning og installation af images).

## Hvordan kan man følge op?

Systemingeniørrollen bør inddrages i drøftelser om kommunernes ressourceforbrug og have adgang til faktiske målinger af ressourceforbruget.

# Transaktionelle, signerede systemdeklarationer

**Problemgruppe:** Fælles arkitektur

## Hvilket behov ser vi?

Det er ønskeligt, at gældende regler overholdes.

## Hvad anbefaler vi som udgangspunkt?

Alle ændringer af systemdeklarationer (både OS2fri-deklarationer og konfigurationer på brugerniveau) skal være transaktionsbaserede, tilskrevne, signerede og gennemgået (hvis brugerne ikke kan arbejde med gennemgange, skal de kunne deaktivere dette krav, men på egen risiko).

## Hvad kan det betyde i praksis?

- Forbrugerne kan verificere den software, de installerer.
- Ændringer, der berører et stort antal brugere, skal nødvendigvis indgå i et kontrolleret arbejdsforløb.
- For enhver konfiguration, der er deklareret i et OS2fri-system, ved vi, hvem der har tilføjet den, hvorfor den blev tilføjet, samt ændringshistorikken.
- Det bliver nemt at rulle tilbage til en tidligere konfiguration, hvis det er nødvendigt.
- Denne arbejdsgang medfører ekstra arbejdsbyrde for leverandørerne.
- For nogle brugere vil kravet om gennemgang være svært at opfylde, hvilket betyder, at de bliver nødt til at vælge at deaktivere denne sikkerhedsforanstaltning.

## Hvordan kan man følge op?

"Compliance & Security"-Rollen gennemgår løbende designændringer i udrulningsforløbet.

# App-butik til løsningsskabeloner

**Problemgruppe:** IT-medarbejdernes arbejdsgang

## Hvilket behov ser vi?

Implementerende kommuner ønsker en enkel måde at anvende konfigurationsmønstre på, som også bruges i andre kommuner.

## Hvad anbefaler vi som udgangspunkt?

En "app store" er en del af OS2fri-økosystemet, hvor implementører kan tilføje løsningsskabeloner til deres system.

## Hvordan kan man følge op?

Produktledelsesrollen undersøger, hvor meget tilpasning de kommuner, der implementerer løsningen, har brug for for at kunne anvende produktet med succes.

# Dokumentation som supportgrænseflade for os2base

**Problemgruppe:** OS2base

## Hvilket behov ser vi?

Kommunerne ønsker support til funktionalitet leveret af OS2base.

## Hvad anbefaler vi som udgangspunkt?

Grænsefladen for support til OS2base er dokumentationen. Dokumentationen skal være tilstrækkelig, så tredjeparter kan yde support til et system, hvis det er nødvendigt.

## Hvordan kan man følge op?

Sammen med kommuner og leverandører undersøger produktledelsen, om kvaliteten af supporten er tilstrækkelig.

# Designeksempler og dokumentation til leverandører

**Problemgruppe:** Funktionalitet som arkitekturhensyn

## Hvilket behov ser vi?

Leverandører vil undertiden misforstå designmålene og skabe implementeringer, der strider mod OS2fri-designstrategien.

## Hvad anbefaler vi som udgangspunkt?

Leverandører skal have adgang til design- og kodeeksempler samt detaljeret dokumentation, så de leverer løsninger, der følger de krav, der er beskrevet i dette design.

## Hvordan kan man følge op?

OS2fri-arkitektrollen gennemgår regelmæssigt, om leverandørernes implementeringer er tilstrækkelige, og identificerer årsagerne til eventuelle mangler.

# Underprojekter bærer byrden ved tilpasning

**Problemgruppe:** OS2base

## Hvilket behov ser vi?

OS2fri-projekter støder på situationer, hvor de ikke er tilfredse med standardimplementeringen, der er arvet fra OS2base.

## Hvad anbefaler vi som udgangspunkt?

Når det drejer sig om tilpasninger, der afviger fra OS2base-standardindstillingerne, bør de implementerende projekter bære byrden. OS2base vil træffe designvalg for at gøre tilpasninger mulige, men vil ikke skabe skræddersyede systemer til at hjælpe med dem.

## Hvad kan det betyde i praksis?

- Dette sparer OS2base for potentielt unødvendigt arbejde, da de ellers ville blive bedt om at gætte på, hvad deres underprojekter har brug for at tilpasse.
- Underprojekterne tilskyndes til at holde sig til standarderne, når det er muligt.
- Underprojektet har en øget byrde med at teste de komponenter, de ændrer, da OS2base-projektet ikke kan give garantier for, hvordan opdateringer af OS2base vil påvirke underprojektets system.

## Hvordan kan man følge op?

Produktledelsen i OS2base vurderer løbende, om ansvarsfordelingen er hensigtsmæssig
