# OS2fri-dokumentation

Dette repo indeholder dokumentation for OS2fri-projektet.

## Formål

Dokumentationen her beskriver projektets governance, processer og beslutninger.

## Beslutningslog

For at skabe gennemsigtighed og sporbarhed føres der en beslutningslog over væsentlige beslutninger i projektet.

### Sådan registrerer du en beslutning

1. **Opret et issue** — vælg skabelonen *Beslutning*, udfyld felterne (Beslutningstagere, Kontekst, Beslutning, Konsekvenser)
2. **Sæt label** — sæt `Beslutning` på issuet
3. **Luk issuet** — når I er enige om beskrivelsen, lukkes det som løst (completed)
4. **Godkend pull requesten** — der oprettes automatisk et udkast; en anden end dig selv kigger igennem og godkender
5. **Beslutningen er officiel** — efter godkendelse og merge står den i `DECISION_LOG.md`

Processen sikrer at alle beslutninger diskuteres før de tages, at der er en tydelig beslutningstager, og at dokumentationen er gennemgået før den bliver officiel.

### Hvad indeholder loggen?

Loggen indeholder **udelukkende accepterede beslutninger**. Hver entry dokumenterer:

- **Beslutningstagere** — hvem traf beslutningen
- **Kontekst** — hvorfor beslutningen var nødvendig
- **Beslutning** — hvad der blev besluttet
- **Konsekvenser** — hvad beslutningen betyder fremadrettet

### Sådan læser du loggen

Beslutningsloggen ligger som en almindelig fil (`DECISION_LOG.md`) og kan læses direkte på Codeberg eller GitHub. Du behøver ikke at kende til git eller andre værktøjer for at læse den — det er ren tekst formateret med overskrifter og afsnit.

## Opsætning (for administratorer)

Før første brug skal disse to trin udføres én gang:

1. **Opret label `Beslutning`** — gå til Settings → Labels → New label, skriv `Beslutning` (skabelonen sætter den automatisk på nye issues)
2. **Aktivér PR-oprettelse** — GitHub: Settings → Actions → General → sæt flueben ved "Allow GitHub Actions to create and approve pull requests". Uden dette kan workflowet ikke oprette pull requests.

## Bidrag

Vi byder alle bidrag velkommen — både rettelser til dokumentationen og forbedringer af selve beslutningslog-værktøjet. Se [CONTRIBUTING.md](CONTRIBUTING.md) for retningslinjer.
