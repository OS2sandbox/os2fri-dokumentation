# Bootc til flådestyring — reference og vurdering

_Denne fil vurderer teknologien bootc op imod behovene i [behov.md](behov.md). Kravene (R1–R6) og metoderne (M1–M4) er defineret der._

## Introduktion

[behov.md](behov.md) fastlægger de højniveau-krav, administratorer og driftsafdelinger stiller til et flådestyringssystem, og de metoder, der kan levere på dem. Denne fil vurderer, hvordan bootc leverer på de fire metoder og dermed på kravene — med tekniske kilder, eksplicitte ulemper og en gennemgang af, hvorfor alternativerne ikke leverer lige så godt.

Konklusionen er en anbefaling om at gå videre med bootc som grundlag for OS2fri's fleet management.

## Vurdering op imod metoderne

### M1 Godkendt tilstand beskrevet ét sted

[Behov](behov.md#m1-godkendt-tilstand-beskrevet-ét-sted): Flådens godkendte tilstand opbevares ét sted, versionsstyret som klar læsbar tekst.

Ud fra denne den godkendte tilstandsbeskrivelse bygges, verificeres og udgives et versioneret image i standard OCI format. Flådens ønskede tilstand ligger og vedligeholds dermed ét sted!

Enhederne booter den officielt godkendte image; der eksisterer ingen anden "sandhed" om, hvordan OS'et skal se ud, end det, der ligger i registryet. Afvigelser kan opdages, fordi enheden kan sammenlignes med billedet.

Billedet gemmes som komprimerede lag efter OCI-standarden ([OCI Image Format Specification](https://github.com/opencontainers/image-spec), [container-lag forklaret](https://depot.dev/blog/building-container-layers-from-scratch)). Vi bygger ovenpå officielle, færdigtestede base-images og deklarerer kun de få pakker, vores desktop kræver ([Fedoras base-images](https://docs.fedoraproject.org/en-US/bootc/base-images/), [Bootcrew på tværs af distributioner](https://github.com/bootcrew/mono), [CentOS Stream bootc](https://quay.io/centos-bootc/centos-bootc)).

### M2 Automatisk afstemning

[Behov](behov.md#m2-automatisk-afstemning): enhederne føres automatisk til den beskrevne tilstand og holdes der.

Enhederne føres automatisk mod det godkendte billede og holdes der — også efter fejl, geninstallering eller manuel indgriben. Driften kan lade rutineopgaverne køre af sig selv: hvis en enhed falder ud af den godkendte tilstand, bringes den tilbage til den, uden at nogen skal på besøg.

Opdateringerne hentes effektivt: enhederne henter kun de lag, der er ændrede. Hvis fx kun kernen ændres, henter enheden kun det lag, der indeholder kernen — ikke hele billedet ([rpm-ostree: chunked images](https://github.com/coreos/rpm-ostree/blob/main/docs/container.md), [Red Hat: faster container image pulls](https://www.redhat.com/en/blog/faster-container-image-pulls)). Afstemningen mod billedet leveres af en fleet-controller eller anden orchestrator, se [Ulemper og risici](#ulemper-og-risici).

### M3 Sporbar historik og tilbagerulning

[Behov](behov.md#m3-sporbar-historik-og-tilbagerulning): alle ændringer føres i historik, kan føres tilbage til en beslutning og rulles tilbage.

Hvert billede er uforanderligt og har en historik: hvad der er ændret, hvornår og af hvem. Rollback er et billede-skift — enheden peges tilbage på et tidligere, kendt billede og genstartes. Det giver hurtig gendannelse og nulstilling af en ramt enhed, uden at nogen skal være fysisk til stede, og revisionsdata bliver et naturligt biprodukt ([baggrunden for bootc](https://fedorapeople.org/~walters/2023-containerplumbing-bootc.html)).

### M4 Gennemgang og godkendelse af ændringer

[Behov](behov.md#m4-gennemgang-og-godkendelse-af-ændringer): ingen ændring rammer flåden uventet; alt foreslås, gennemgås og godkendes først.

Et nyt billede produceres gennem en kontrolleret pipeline: forslag (pull request) → byg → signer → godkendelse → udrulning. Og afgørende: fordi bootc gør selve systemkernen i praksis umulig at ændre fra enheden, gælder ændringsstyringen også OS'et selv. Ingen kan pille ved konfigurationen på en enkelt maskine — det svarer direkte på spørgsmålet "hvem har pillet ved konfigurationen sidst?" fra [behov.md](behov.md#r2).

## Kortlægning op imod kravene

### R1 Pålidelighed

Bootc leverer på [Pålidelighed](behov.md#r1) gennem M1–M3: den godkendte tilstand er ét billede (M1), enhederne afstemmer sig selv mod det (M2), og fejl rulles hurtigt tilbage som et billede-skift (M3). Delta-opdateringer holder båndbredde og genstartstid nede, så enhederne hurtigt kommer tilbage i den godkendte tilstand.

### R2 Forudsigelighed

Bootc leverer på [Forudsigelighed](behov.md#r2) gennem M3 og M4. Særligt M4: fordi selve OS'et kun kan ændres gennem den godkendte pipeline, gælder ændringsstyringen også systemkernen — flådens tilstand kan til enhver tid forklares og forudsiges, og hver ændring kan knyttes til en beslutning.

### R3 Sikkerhed

Bootc leverer på [Sikkerhed](behov.md#r3): opdateringer trækkes af enheden (download-only) og kan signeres; et indbrud i én enhed kan ikke bruges til at ændre systemet, og en ramt enhed genoprettes ved at pege på et godkendt billede (M3). Håndtering af adgangskoder og nøgler behandles i [Håndtering af secrets](#håndtering-af-secrets).

### R4 Effektiv drift

Bootc leverer på [Effektiv drift](behov.md#r4): billedet erstatter manuel installation og konfiguration pr. enhed; en ny version udrulles til hele flåden på én gang (M1, M2). En bootc-registry er en standardkomponent, der kan køre på alt fra en lille edge-enhed til en central server — vi kan starte småt og skalere efter behov ([Zot](https://github.com/project-zot/zot), [Forgejo container packages](https://forgejo.org/docs/latest/user/packages/container/)). Infrastruktur og omkostning behandles nedenfor.

### R5 Lovgivningsmæssig efterlevelse

Bootc leverer på [Lovgivningsmæssig efterlevelse](behov.md#r5) gennem M3: revisionsdata er et naturligt biprodukt af billed-historikken (hvad, hvornår, af hvem), og godkendelsen sker, før en ændring rammer flåden (M4). Sporbarhed bliver dermed billig og enkel at redegøre for.

### R6 Driftskontinuitet

Bootc leverer på [Driftskontinuitet](behov.md#r6): hele stacken er åben og versionsstyret i git, og billederne ligger i et selv-hostet registry (fx Forgejo) efter en åben standard (OCI). Systemet kan derfor genopbygges, flyttes og skifte leverandør eller hosting uden at miste data, konfiguration eller funktionalitet — uanset aftaleophør, opkøb eller licensændringer ([OCI Distribution Specification](https://github.com/opencontainers/distribution-spec), [conformance](https://specs.opencontainers.org/distribution-spec/conformance/), [Fedora bootc-dokumentation](https://docs.fedoraproject.org/en-US/bootc/)).

## Infrastruktur og omkostning

Lagerplads og båndbredde er en universel forudsætning for enhver teknologi, der skal rulle operativsystemer, konfiguration og applikationer ud til en flåde og holde dem opdateret. Spørgsmålet er derfor effektiv udnyttelse og delte omkostninger — ikke om der overhovedet er udgifter.

- **Delt lager:** OS, apps og konfiguration gemmes som komprimerede lag i containerimages. Selvom fx 100 images bruger samme base, gemmes basen kun én gang ([container-lag forklaret](https://depot.dev/blog/building-container-layers-from-scratch), [OCI Image Format Specification](https://github.com/opencontainers/image-spec)).
- **Delta-opdateringer:** Enhederne henter kun de ændrede lag, hvilket minimerer både netværksbelastning og diskplads ([rpm-ostree-dokumentation](https://github.com/coreos/rpm-ostree/blob/main/docs/container.md), [Red Hat-blog](https://www.redhat.com/en/blog/faster-container-image-pulls)).
- **Upstream genbrug:** Vi bygger ovenpå officielle, færdigtestede base-images og deklarerer kun de få pakker, vores desktop kræver ([Fedoras base-images](https://docs.fedoraproject.org/en-US/bootc/base-images/), [Bootcrew](https://github.com/bootcrew/mono), [CentOS Stream bootc](https://quay.io/centos-bootc/centos-bootc)).
- **Implementeringsfrihed:** Et bootc-image kan uploades til og hentes fra ethvert OCI-kompatibelt registry; der er ingen hård afhængighed af én udbyder ([Distribution Spec conformance](https://specs.opencontainers.org/distribution-spec/conformance/)).
- **Skalerbarhed:** En bootc-registry er en standardkomponent, der kan køre på alt fra en lille edge-enhed til en central server eller en kommerciel cloud-udbyder ([Zot](https://github.com/project-zot/zot), [Zot som CNCF-projekt](https://www.cncf.io/projects/zot/)).
- **Digital suverænitet:** Vi hoster os2base selv, fordi vi vil eje infrastrukturen, koden, byggepipeline og alt indimellem. Digital suverænitet er ikke noget, man kan købe som et færdigt produkt, men handler om ejerskab af processer og alle artefakter. Placeringen bestemmer vi selv ud fra vores krav — ikke ud fra teknologivalget.

## Installation og provisioning

Bootc's byggeværktøj understøtter officielt netværksinstallation, så en enhed kan installeres over netværket i stedet for via et USB-stik. Der findes flere installationstyper at vælge imellem (fx et installationsbillede eller en netværksinstaller), og i 2026 kom der også en `bootc`-kommando i RHEL 10's installeringsværktøj ([understøttede installationstyper](https://osbuild.org/docs/bootc), [RHEL 10 Image Mode-guide](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html-single/image_mode_guide/index)).

Én ærlig advarsel: Red Hat markerer selv netværksinstallations-flowet som **"Technology Preview"** — altså funktionelt, men ikke endeligt garanteret. Fedora leverer officielle bootc-baserede desktop-udgaver (fx Silverblue på [quay.io](https://quay.io/repository/fedora/fedora-silverblue)), og Fedora arbejder på at gøre bootc til standard for sine desktop-udgaver med [Fedora 45](https://fedoramagazine.org/fedora-43-brings-the-bootc-transition/) (december 2026) — så det er en teknologi, Fedora selv investerer i.

Der vil være et stykke tilpasningsarbejde til vores konkrete maskiner, men det er et afgrænset, kendt stykke arbejde — ikke noget, der vælter hele udviklingen.

## Håndtering af secrets

Håndtering af adgangskoder og nøgler er en udfordring i al moderne it-drift — ikke noget, der er særligt for bootc. Der findes modne, standardiserede løsninger, vi kan vælge imellem: [SOPS](https://github.com/getsops/sops) (krypterede filer i versionsstyring) og [Vault](https://www.vaultproject.io/) (central nøgleservice). Vores forslag er at lægge en klar plan tidligt i projektet — sammen med login og adgangskontrol, som allerede er peget på som prioritet.

## Modenhed på ARM og Raspberry Pi

Bootc understøttes på arm, men understøttelse og test er yngre og mindre udbredt end på x86. Fedora IoT dokumenterer et [bootc-eksempel med Raspberry Pi](https://docs.fedoraproject.org/en-US/iot/fedora-iot-bootc-raspberry-pi-example/), og der er et [åbent issue om bootc-raw-image og RPi](https://github.com/fedora-iot/iot-distro/issues/82). For OS2fri er ARM/RPi planlagt til en senere fase, når behovet i kommunerne er afdækket — det er ikke en blokering for os nu.

## Ulemper og risici

En grundig vurdering skal også forholde sig til, hvor bootc ikke leverer gratis:

- **Opdateringer aktiveres ved genstart.** En enhed skal genstartes, før et nyt billede tages i brug. Det kræver en policy for, hvornår og hvordan genstart sker (fx uden for arbejdstid) — særligt for informationsskærme.
- **Afhængighed af en orchestrator.** Afstemningen mod billedet leveres af en fleet-controller eller anden orchestrator. bootc beskriver _hvad_ tilstanden skal være; et eksternt lag sørger for, at den bliver det (fx [bootc-fleet-controller](https://github.com/bootc-dev/bootc-fleet-controller)). Valg og drift af dette lag bliver en del af løsningen.
- **Base image er en de facto distro-binding.** Billeder bygges i praksis på RHEL image mode, CentOS Stream eller Fedora — man binder sig til en distro-familie og dens release-rytme.
- **App-laget.** Programmer og lokale pakker skal bygges ind i billedet eller køre containeriseret; klassisk "installer pakken på enheden" passer ikke med modellen.
- **Modenhed på arm.** Understøttelse og test på arm (fx Raspberry Pi) er yngre og mindre udbredt end på x86.
- **Omstillingsomkostning.** Driften skifter fra "enhed pr. enhed" til "billede og versioner" — en metodeomstilling, ikke kun et værktøjsskift.

## Hvorfor ikke alternativerne

**Klassisk konfigurationsstyring (fx Ansible + traditionel pakkehåndtering)** kan udrulle konfiguration og pakker pr. enhed, men enhederne forbliver individuelle: der er ingen samlet godkendt tilstand for selve OS'et, ingen billed-historik og ingen hurtig rollback af hele systemet. Ændringsstyringen gælder ikke systemkernen, og en afvigende enhed kan kun bringes tilbage ved geninstallering.

**Tyndt billede + konfigurationsstyring ovenpå** er bedre, men afvigelser akkumuleres over tid ("snowflake-enheder"), og både forudsigelighed og rollback svækkes i forhold til et samlet billede.

De fire metoder leveres derfor kun fuldt ud af en image-baseret model, hvor selve OS'et er ændringsartefaktet — og det er netop bootc's model.

## Konklusion og vejen videre

Bootc leverer de fire metoder, som afdækningen i [behov.md](behov.md) viser dækker kravene til flådestyring — og styrker samtidig de krav, der er sværest at opfylde i dag: forudsigelighed, sikkerhed og driftskontinuitet. Anbefalingen er at gå videre med bootc som grundlag for OS2fri's fleet management.






- [Sådan henter bootc kun ændringerne](https://www.redhat.com/en/blog/faster-container-image-pulls) — delta-opdateringer (lag) i container-images.
- [Chunked images: hvorfor kun ændrede lag hentes](https://github.com/coreos/rpm-ostree/blob/main/docs/container.md) — rpm-ostree-dokumentation; "if just the kernel changes, one only downloads the layer containing the kernel".
- [Baggrunden for bootc](https://fedorapeople.org/~walters/2023-containerplumbing-bootc.html) — Colin Walters' introduktion til bootc og billedlagsmodellen.
- [Fedoras officielle base-images](https://docs.fedoraproject.org/en-US/bootc/base-images/) — officielle, færdigtestede base-images (standard/minimal-tier).
- [Bootcrew: community-base-images på tværs af distributioner](https://github.com/bootcrew/mono) — base-images til bl.a. Arch, Debian, openSUSE og Ubuntu.
- [CentOS Stream bootc base image](https://quay.io/centos-bootc/centos-bootc) — Red Hat-bakket, officielt base-image (upstream for RHEL).
- [Fedora/CentOS bootc-dokumentation](https://docs.fedoraproject.org/en-US/bootc/) — bootc-images kan ligge på enhver registry, også intern.
- [Understøttede installationstyper i bootc's byggeværktøj](https://osbuild.org/docs/bootc) — netværksinstallation.
- [Fedoras desktop-udgaver på bootc](https://quay.io/repository/fedora/fedora-silverblue) — officielle bootc-baserede desktop-udgaver.
- [Fedora Image Mode: bootc-overgangen](https://fedoramagazine.org/fedora-43-brings-the-bootc-transition/) — Fedora Magazine; fase 2 sigter mod produktionsklar med Fedora 45 (dec 2026).
- [RHEL 10 Image Mode-guide](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html-single/image_mode_guide/index) — bootc-installer, kickstart og rechunk (Technology Preview-noter).
- [SOPS](https://github.com/getsops/sops) og [Vault](https://www.vaultproject.io/) — håndtering af hemmeligheder.
- [Fedora IoT med Raspberry Pi](https://docs.fedoraproject.org/en-US/iot/fedora-iot-bootc-raspberry-pi-example/) — bootc på RPi.
- [Åbent issue: bootc-raw-image og RPi](https://github.com/fedora-iot/iot-distro/issues/82) — fedora-iot/iot-distro#82.
- [bootc-fleet-controller](https://github.com/bootc-dev/bootc-fleet-controller) — open source-fleet-controller i GitOps-økosystemet.
- [Container-lag forklaret (tar-arkiver, deling af base-lag)](https://depot.dev/blog/building-container-layers-from-scratch) — Depot; konkrete eksempler på lagopdeling og genbrug af lag mellem images.
- [OCI Image Format Specification](https://github.com/opencontainers/image-spec) — billed- og lag-format.
- [OCI Distribution Specification](https://github.com/opencontainers/distribution-spec) — registry-protokollen.
- [OCI Distribution Spec: conformance](https://specs.opencontainers.org/distribution-spec/conformance/) — alle OCI-registries skal understøtte pull ("All OCI registries MUST support pulling OCI container images").
- [Zot Registry: A cloud-native OCI registry](https://zotregistry.io/) og [Zot som CNCF-projekt](https://www.cncf.io/projects/zot/) — skalerbar, selv-hostet registry.
- [Forgejo container packages](https://forgejo.org/docs/latest/user/packages/container/) — registry-funktion indbygget i Forgejo.
- [OpenGitOps](https://www.cncf.io/projects/opengitops/) — de best practices, metoderne M1–M4 bygger på.
