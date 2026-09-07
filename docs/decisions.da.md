**Problemhypotese:** Brugervenligheden af skrivebordsmiljøet for ikke-tekniske slutbrugere
**Problemgruppe:** Brugeroplevelse som arkitekturhensyn
**Udgangspunkt:** Det konkrete design af slutbrugergrænsefladen behøver ikke særlig meget opmærksomhed; det er tilstrækkeligt at vælge noget, der ligner "Windows 10", for at brugerne bliver tilfredse.
**Undersøgelsesforløb:** Produktledelsesrollen foretager en behovsvurdering

---

**Problemhypotese:** Administratorer har brug for en brugervenlig administrationsplatform.
**Problemgruppe:** IT-medarbejdernes arbejdsgang
**Udgangspunkt:** Udvikle et letvægtslag oven på Git, der specifikt imødekommer administratorens arbejdsgang, som den er undersøgt.
**Konsekvenser:**

- Dette er en skræddersyet komponent, hvis udvikling skal styres via en produktledelsesproces.
- Nogle konfigurationsindstillinger vil være under OS2bases ansvar, mens andre vil være under et underprojekts ansvar. Alligevel skal vi sikre, at konfigurationsplatformen opfattes som ét samlet produkt.
- Konfigurationen på Git-niveau fungerer i det væsentlige som en datamodel for denne konfigurationsgrænseflade, hvilket betyder, at den bør baseres på de behov, der er afdækket under udviklingen af denne komponent. Det vil være mindre produktivt at designe konfigurationen på Git-niveau uafhængigt af administratorernes behov.
**Undersøgelsesforløb:** Produktledelsesrollen undersøger administratorernes behov, støttet af Frontend- og GitOps-rollen

---

**Problemhypotese:** Kommunerne ønsker at fortsætte med at bruge deres Raspberry Pi-baserede kioskopstillinger.
**Problemgruppe:** Funktionalitet som arkitekturhensyn
**Udgangspunkt:** Med henblik på fremtidige implementeringsbeslutninger bør teknologierne vælges således, at både x86- og arm64-arkitekturer understøttes (for arm64 er funktionaliteten i kiosk-anvendelsesscenariet tilstrækkelig).
**Undersøgelsesforløb:** Produktledelsesrollen undersøger kommunernes behov, støttet af systemingeniørrollen

---

**Problemhypotese:** Forskellige enheder understøtter OS2fri-systemerne med varierende pålidelighed.
**Problemgruppe:** Funktionalitet som arkitekturhensyn
**Udgangspunkt:** En liste over kompatibel hardware skal indgå i OS2fri-projektet. Kun specifikke enheder understøttes officielt.
**Undersøgelsesforløb:** Produktledelsesrollen undersøger forventningerne til hardware, støttet af Linux-hardwarerollen

---

**Problemhypotese:** Hvis der udarbejdes en liste over kompatibel hardware, vil nogle kommuner eller brugere muligvis ikke være villige til eller i stand til at begrænse sig til de enheder, der står på listen.
**Problemgruppe:** Fælles arkitektur
**Udgangspunkt:** Prioritere cloud- og webbaserede løsninger, så enheder, der ikke overholder kravene, stadig kan drage fordel af visse dele af OS2fri-økosystemet.
**Undersøgelsesforløb:** Produktledelsesrollen undersøger kommunernes behov, støttet af systemingeniørrollen

---

**Problemhypotese:** Den nødvendige behovsafdækning kræver betydelige økonomiske ressourcer.
**Problemgruppe:** Funktionalitet som arkitekturhensyn
**Udgangspunkt:** Udviklingsprocessen for OS2fri-projekterne bør være sådan, at der ved risikofyldte beslutninger først indhentes oplysninger om brugernes behov, inden der træffes beslutninger om implementering. Ved beslutninger med lav risiko er det acceptabelt at gætte på brugernes behov. Der skal lægges særlig vægt på administratorernes oplevelse.
**Undersøgelsesforløb:** Under indsamlingen af brugerfeedback undersøger produktledelsesrollen, om den udførte behovsvurdering var tilstrækkelig, og justerer i overensstemmelse hermed.

---

**Problemhypotese:** Af hensyn til compliance og sikkerhed er der behov for overvågning af det kørende system og leveringspipeline.
**Problemgruppe:** Fælles arkitektur
**Udgangspunkt:** Enhver løsning, der indgår i OS2fri-projekterne, skal levere standardiserede dataendepunkter, der muliggør al nødvendig overvågning. Valg og konfiguration af et overvågningsværktøj falder uden for OS2fris anvendelsesområde.
**Undersøgelsesforløb:** "Compliance & Security"-Rollen hjælper med at identificere de nødvendige dataendpunkter.

---

**Problemhypotese:** Den eksisterende, ikke-suveræne softwareudleveringsinfrastruktur fra "big tech"-virksomhederne opfylder ikke OS2fris strategiske behov.
**Problemgruppe:** Fælles arkitektur
**Udgangspunkt:** Alle OS2fri-projekter skal have adgang til en suveræn og driftsstabil Git-forge, build-pipeline og image-register.
**Undersøgelsesforløb:** Systemingeniørrollen vurderer de specifikke tekniske behov med strategisk input fra produktledelsen

---

**Problemhypotese:** De fleste OS2fri-projekter har behov for et skrivebordsmiljø og en webbrowser, men dette gælder ikke for alle projekter.
**Problemgruppe:** OS2base
**Udgangspunkt:** En webbrowser og alle de komponenter, den er afhængig af, vil indgå i OS2base — for projekter, der har brug for en mindre basis, vil fjernelsen af disse komponenter være deres eget anliggende.
**Konsekvenser:**

- Underprojekter bliver nødt til at tilføje deklarationer, der fjerner de komponenter, de ikke ønsker. OS2base bliver nødt til at give vejledning i, hvordan man gør det.
- De enkelte projekter behøver ikke at træffe beslutninger vedrørende operativsystemets brugergrænseflade eller browseren.
- Sandsynligvis vil alle OS2fri-projekterne dele den samme UX-logik — hvis man ved, hvordan man navigerer rundt i borgerpc-operativsystemet, vil man også vide, hvordan man bruger admpc.
- Beslutningerne om DE og browser vil sandsynligvis bestå gennem hele OS2fri-livscyklussen, da OS2base vil have ringe incitament til at ændre disse komponenter.
**Undersøgelsesforløb:** Produktledelsen i OS2base vurderer løbende, om ansvarsfordelingen er hensigtsmæssig

---

**Problemhypotese:** En flåde af maskiner skal bringes i en ønsket tilstand.
**Problemgruppe:** Fælles arkitektur
**Udgangspunkt:** Operativsystemerne vil være fuldt deklarative og baseret på bootc.
**Konsekvenser:**

- En pipeline til opbygning og signering af images bliver et must for kunderne at have adgang til, ligesom et image-register.
- bootc tilskynder til et design, hvor ændringer på systemet ikke foretages under kørsel, men på deklarationsniveau, hvilket betyder, at der skal lægges ekstra kræfter i løsningsdesignet (fordi den gængse måde at tænke på brugen af et operativsystem ikke finder anvendelse).
- Det vil være langt nemmere at opnå "compliance by design" og undgå konfigurationsafvigelser.
- Der er en risiko for, at brug af et andet operativsystem end et rpm-baseret (Fedora, CentOS osv.) vil medføre udfordringer.
- Brugere kan ikke installere software under kørsel, hvilket betyder, at denne mulighed for visse systemer skal tilvejebringes via et eksternt, sandboxet softwaremiljø som f.eks. flatpak.
**Alternativer:** nix, mkosi
**Undersøgelsesforløb:** Dette er den tekniske beslutning med den højeste risiko i OS2fri-programmet. For at mindske risikoen for fiasko kan specialister inden for de respektive teknologier udvikle demoer for hver alternativ tilgang. For at holde omkostningerne nede kan demoerne starte meget enkelt og gradvist øges i kompleksitet, indtil der træffes en beslutning.

---

**Problemhypotese:** Genopbygning af images efter deklaration eller opdateringer fra upstream medfører mærkbar ressourceforbrug.
**Problemgruppe:** Fælles arkitektur
**Udgangspunkt:** Under designet af OCI (bootc)-lag skal man tage højde for ændringsfrekvensen: komponenter, der sjældent ændres, bør placeres nederst, mens komponenter, der ofte ændres, bør placeres øverst (så lagene kan genbruges under opbygning og installation af images).
**Undersøgelsesforløb:** Systemingeniørrollen bør inddrages i drøftelser om kommunernes ressourceforbrug og have adgang til faktiske målinger af ressourceforbruget.

---

**Problemhypotese:** Det er ønskeligt, at gældende regler overholdes.
**Problemgruppe:** Fælles arkitektur
**Udgangspunkt:** Alle ændringer af systemdeklarationer (både OS2fri-deklarationer og konfigurationer på brugerniveau) skal være transaktionsbaserede, tilskrevne, signerede og gennemgået (hvis brugerne ikke kan arbejde med gennemgange, skal de kunne deaktivere dette krav, men på egen risiko).
**Konsekvenser:**

- Forbrugerne kan verificere den software, de installerer.
- Ændringer, der berører et stort antal brugere, skal nødvendigvis indgå i et kontrolleret arbejdsforløb.
- For enhver konfiguration, der er deklareret i et OS2fri-system, ved vi, hvem der har tilføjet den, hvorfor den blev tilføjet, samt ændringshistorikken.
- Det bliver nemt at rulle tilbage til en tidligere konfiguration, hvis det er nødvendigt.
- Denne arbejdsgang medfører ekstra arbejdsbyrde for leverandørerne.
- For nogle brugere vil kravet om gennemgang være svært at opfylde, hvilket betyder, at de bliver nødt til at vælge at deaktivere denne sikkerhedsforanstaltning.
**Undersøgelsesforløb:** "Compliance & Security"-Rollen gennemgår løbende designændringer i udrulningsforløbet.

---

**Problemhypotese:** Implementerende kommuner ønsker en enkel måde at anvende konfigurationsmønstre på, som også bruges i andre kommuner.
**Problemgruppe:** IT-medarbejdernes arbejdsgang
**Udgangspunkt:** En "app store" er en del af OS2fri-økosystemet, hvor implementører kan tilføje løsningsskabeloner til deres system.
**Undersøgelsesforløb:** Produktledelsesrollen undersøger, hvor meget tilpasning de kommuner, der implementerer løsningen, har brug for for at kunne anvende produktet med succes.

---

**Problemhypotese:** Kommunerne ønsker support til funktionalitet leveret af OS2base.
**Problemgruppe:** OS2base
**Udgangspunkt:** Grænsefladen for support til OS2base er dokumentationen. Dokumentationen skal være tilstrækkelig, så tredjeparter kan yde support til et system, hvis det er nødvendigt.
**Undersøgelsesforløb:** Sammen med kommuner og leverandører undersøger produktledelsen, om kvaliteten af supporten er tilstrækkelig.

---

**Problemhypotese:** Leverandører vil undertiden misforstå designmålene og skabe implementeringer, der strider mod OS2fri-designstrategien.
**Problemgruppe:** Funktionalitet som arkitekturhensyn
**Udgangspunkt:** Leverandører skal have adgang til design- og kodeeksempler samt detaljeret dokumentation, så de leverer løsninger, der følger de krav, der er beskrevet i dette design.
**Undersøgelsesforløb:** OS2fri-arkitektrollen gennemgår regelmæssigt, om leverandørernes implementeringer er tilstrækkelige, og identificerer årsagerne til eventuelle mangler.

---

**Problemhypotese:** OS2fri-projekter støder på situationer, hvor de ikke er tilfredse med standardimplementeringen, der er arvet fra OS2base.
**Problemgruppe:** OS2base
**Udgangspunkt:** Når det drejer sig om tilpasninger, der afviger fra OS2base-standardindstillingerne, bør de implementerende projekter bære byrden. OS2base vil træffe designvalg for at gøre tilpasninger mulige, men vil ikke skabe skræddersyede systemer til at hjælpe med dem.
**Konsekvenser:**

- Dette sparer OS2base for potentielt unødvendigt arbejde, da de ellers ville blive bedt om at gætte på, hvad deres underprojekter har brug for at tilpasse.
- Underprojekterne tilskyndes til at holde sig til standarderne, når det er muligt.
- Underprojektet har en øget byrde med at teste de komponenter, de ændrer, da OS2base-projektet ikke kan give garantier for, hvordan opdateringer af OS2base vil påvirke underprojektets system.
**Undersøgelsesforløb:** Produktledelsen i OS2base vurderer løbende, om ansvarsfordelingen er hensigtsmæssig

---
