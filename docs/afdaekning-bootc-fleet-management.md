# Afdækning: bootc i OS2fri's fleet management

> **Status:** skelet (`[plan]`). Arbejdspakker fyldes ud enkeltvis i rækkefølgen
> §2 → §3 → §4 → §5 → §6 → §7 → §1, og godkendes separat før næste påbegyndes.

## Status-overblik

| WP | Sektion | Emne | Status |
|----|---------|------|--------|
| 1.1 | §1 | Formål, afgrænsning & læsevejledning | `[plan]` |
| 2.1 | §2 | Terminologi | `[plan]` |
| 2.2 | §2 | Enhedsklasser & livscyklus | `[plan]` |
| 2.3 | §2 | Krav til fleet-management | `[plan]` |
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

- **Rationale:** Dokumentet anvender de fælles OS2fri-begreber, der fastlægges i en kommende begrebsfil (`docs/begreber.md`, etableres via issue #14). Denne pakke består alene af en henvisning til den fil samt en kort forklaring af henvisningen — dokumentet definerer selv ingen begreber og fastlåser ingen definitioner.
- **Indhold (når færdigt):** henvisning til `docs/begreber.md` og en kort forklaring af, at dokumentet anvender de fælles, teknologineutrale begreber der fastlægges der, og vil blive afstemt mod dem når filen foreligger.

### WP 2.2 — Enhedsklasser & livscyklus

- **Rationale:** Afgrænser hvilke enhedstyper og livscyklusfaser evalueringen dækker, så kriterierne i §3 og vurderingerne i §5 målrettes korrekt.
- **Indhold (når færdigt):** enhedsklasser (kiosk/RPi-arm64, skole-pc/x86, adm-pc/x86) og livscyklusfaser (provision → konfigurer → opdatér → monitorér → afvikl).

### WP 2.3 — Krav til fleet-management

- **Rationale:** Lister de krav §5 og §6 skal svare på — det er kravgrundlaget for hele evalueringen, hentet fra workshop-noter og mindmap.
- **Indhold (når færdigt):** krav som GitOps-styring, ingen configuration drift, ingen leverandør-lock-in, indbygget management-agent, NIS2/GDPR/CRA, supply-chain-sikkerhed, digital suverænitet og observability (OTel).

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

- **Rationale:** Dokumenterer understøttelsen af fleet-provisionering og arm64-behovet (kiosk/RPi).
- **Indhold (når færdigt):** bootc-image-builder (ISO/raw/qcow2), understøttede arkitekturer (x86_64, aarch64) og kiosk/RPi-scenariet.

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
