# Løsningskandidater

Skitser til løsningskandidater for de problemtyper, der er identificeret i afsnittet "Risici ved standardiserede deklarationer" i hoveddokumentet.

## Begrænsede systemer vs. slutbrugerbehov

Eksempel: Indskolings-PC hos Aarhus Kommune:

```mermaid
flowchart LR
    Machine["Maskine"]
    subgraph ownerOS2Base ["OS2Base"]
        OS2BaseDecl["OS2Base\n(deklaration)"]
    end
    subgraph ownerOS2Skole ["OS2Skole"]
        OS2SkolePcDecl["OS2SkolePC\n(deklaration)"]
    end
    subgraph ownerAarhus ["Aarhus Kommune"]
        SkoleAtAarhusDecl["Skole@Aarhus\n(deklaration)"]
        IndskolingAtAarhusDecl["Indskoling@Aarhus\n(deklaration)"]
    end
    Machine -->|følger image stream fra| IndskolingAtAarhusDecl
    IndskolingAtAarhusDecl -->|arver fra| SkoleAtAarhusDecl
    SkoleAtAarhusDecl -->|arver fra| OS2SkolePcDecl
    OS2SkolePcDecl -->|arver fra| OS2BaseDecl
```

For at undgå at ende med én deklaration pr. maskine:

### Tilføjelsesmønster

```mermaid
flowchart LR
    subgraph Machine ["Maskine"]
        guaranteed["Konfigurationsafstemt tilstand"]
        compartment["Brugertilføjelser"]
    end
```

Administratoren kan tillade slutbrugeren at _udvide_ sit eksisterende softwaresystem. Slutbrugeren må imidlertid aldrig _fjerne_ eller _ændre_ dele af den konfigurationsafstemte tilstand.

Eksempel: Bruger: "Jeg vil gerne kunne installere software, der er relevant for mit brugsscenarie."
Løsning: Stil en liste over apps, der må installeres på systemet, til rådighed. Disse apps må ikke ændre nogen af de parametre, som administratoren er afhængig af (eksisterende sandbox-løsninger kan muliggøre dette).

### Referencemønster

```mermaid
flowchart LR
    subgraph Machine ["Maskine"]
        guaranteed["Konfigurationsafstemt tilstand"]
    end
    modifiableSystem["Modificerbart system\n(indeholder brugervalg)"]
    guaranteed -->|omdirigerer til| modifiableSystem
```

Et andet eksempel: Bruger: "Jeg vil gerne kunne bruge den rigtige printer på mit kontor."
Løsning: Gør systemet uafhængigt af, hvilken specifik printer en bruger anvender. Hver maskine har adgang til en lang liste af printere, og adgangsrettigheder håndhæves på printer- eller netværksniveau.

## Hvordan ved vi, hvilken tilstand flåden er i?

- Hver maskine stiller standardiserede observationsdata til rådighed.
- Et centralt observationssystem indsamler alle disse data.
- Observationsdata konverteres til et standardiseret format.

Informationsflowet bliver således:

```mermaid
flowchart LR
    Machine -->|sender standardiserede brugsdata til| ObservabilitySystem[Observationssystem]
    Machine -->|henter image stream-patches fra| ImageRegistry[Image Registry]
```

Påkrævede maskinkomponenter:

- Maskinedataindsamler (en komponent, der indsamler maskinadfærd, konverterer den til det standardiserede brugsdataformat og sender den til observationssystemet)
- Opdateringstjekker (en komponent, der regelmæssigt undersøger, om der findes nye image-patches, downloader dem og anvender dem på maskinen)

## Problemfri konfigurationsoplevelse

- Konfigurationsstyring er baseret på en eksisterende VCS-løsning som Git. **Hvorfor?** Det giver os sporbar historik, tilbagerulning samt gennemgang og godkendelse af ændringer uden yderligere omkostninger.
- Som en del af OS2fri oprettes et tyndt lag oven på Git, der gør konfiguration lettere for lokale administratorer.
- OS2Base leverer UI-logikken til konfigurationsgrænsefladen og undersøger det rette visuelle og oplevelsesmæssige designsprog.
- UI-logikken konverterer et standardiseret mellemformat til en brugergrænseflade.
- De enkelte OS2fri-produkter eksponerer konfigurationselementer i det standardiserede mellemformat.

```mermaid
flowchart LR
    admin["Admin"]
    configurationUI["Konfigurations-UI"]
    subgraph gitForge["Git Forge"]
        localConfiguration["Lokal konfiguration (Git Repo)"]
    end
    admin -->|bruger| configurationUI
    configurationUI -->|tilføjer til| localConfiguration
```

Sådan sikres et problemfrit konfigurations-UI på tværs af projektgrænser:

```mermaid
flowchart LR
    subgraph OS2Base["OS2Base"]
        uiDeclarationsBase["UI-paneldeklarationer"]
    end
    subgraph OS2BorgerPC["OS2BorgerPC"]
        uiDeclarationsBorgerPC["UI-paneldeklarationer"]
    end
    configurationUi["Konfigurations-UI"]
    configurationUi -->|indlæser UI-konfiguration fra| uiDeclarationsBase
    configurationUi -->|indlæser UI-konfiguration fra| uiDeclarationsBorgerPC
```

## Fjernstyrede ændringer af systemkonfiguration

**Vigtigt:** Hvis kravet om "fjernstyring" ikke er lige så strengt, er andre designs bedre end dette.

```mermaid
flowchart LR
subgraph machine["Maskine 01 (kører system-a)"]
    systemA["system-a (kørende)"]
end
subgraph systemAStream["system-a – seneste deklaration"]
    conf["System A-konfiguration"]
    reset["Logik, der får Maskine 01 til at nulstille til system-b-imaget"]
end
systemA -->|henter opdatering fra| systemAStream
```

De konkrete ændringsmekanismer skal undersøges på forhånd, hvorefter logikken for disse ændringer tilføjes systemet.

Fordi et bestemt system kun henter den konfiguration, som andre systemer også henter, kan problemerne løses således:

- De enkelte ændringsmekanismer er forudkonfigureret i imaget.
- Ved hver image-opdatering downloader alle maskiner en liste, der indeholder ID'erne på de maskiner, som ændringen skal anvendes på.
- Det betyder, at hver maskine har en unik og uforanderlig identifikation.

Maskinspecifikke ændringer flytter kun maskinen til den tilstand, der er defineret af en kendt, godkendt image stream.
