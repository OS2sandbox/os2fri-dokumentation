/**
 * OS2fri mindmap-data
 * -------------------
 * The tree rendered by mindmap.html — there is NO build step.
 * Edit this file, save, and reload mindmap.html.
 *
 * FORM:
 *   { name: "...", children: [ ... ] }
 *   { name: "...", desc: "..." }          // leaf node with a pop-up article
 *
 * CONVENTIONS:
 *   - `name` is the label shown on the node. Keep it a short phrase,
 *     not a full sentence.
 *   - `desc` is the "thoughts behind this node" text shown in a pop-up
 *     when a leaf node is clicked. Write 2-4 short sentences, plain text
 *     (blank lines separate paragraphs). Optional; without it the pop-up
 *     does not open.
 *   - The root's children are the main branches. Each branch gets its own
 *     color automatically, so keep branch names stable if you want colors
 *     to stay consistent.
 *   - Nodes with exactly one level of children below them (all leaves)
 *     start collapsed as a ring; nodes with deeper structure stay expanded.
 *     Reserve one-level groups for detail — they collapse by default.
 *   - Content is curated from the workshop notes (see noter.md and
 *     mindmap.mermaid, issues #9 / #10), condensed for readability.
 */
window.MINDMAP_DATA = {
  name: "os2base",
  children: [
    {
      name: "Standarder & Compliance",
      children: [
        {
          name: "Digital Suverænitet",
          children: [
            {
              name: "Indbygget forsyningskæde sikkerhed",
              desc: "Sikkerhed mod angreb i forsyningskæden skal være indbygget fra bunden — frem for at blive et ekstra lag ovenpå bagefter. Signerede commits og sporbarhed i hele kæden, fra kildekode til færdigt image, er fundamentet.",
            },
            {
              name: "Transparens aktiverer politikstyring og automatiseret audit",
              desc: "Når al adfærd i kode og system er åben og sporbar, bliver styring via politikker et biprodukt. Reguleringerne kræver specifikke processer og handlinger; vores løsning designes, så de processer bliver nemme og kan revideres automatisk.",
            },
          ],
        },
        {
          name: "Compliance by Design",
          children: [
            {
              name: "Forberedt til GDPR",
              desc: "Løsningen er designet, så GDPR-compliance bliver et billigt biprodukt frem for en separat komponent, der skal håndteres manuelt. Databeskyttelse er tænkt ind i arkitekturen fra dag ét.",
            },
            {
              name: "Forberedt til NIS2",
              desc: "NIS2-compliance er indbygget i designet, så løsningen lever op til kravene uden en tung, ekstern proces. Revisionsvenlige endpoints og sporbarhed gør overholdelsen nem.",
            },
            {
              name: "Forberedt til CRA",
              desc: "Cyber Resilience Act-kravene er tænkt ind i udviklingen, så løsningen kan dokumentere og levere de nødvendige sikkerheds- og revisionskrav, når lovgivningen træder i kraft.",
            },
          ],
        },
      ],
    },
    {
      name: "Brugeroplevelse & Betjening",
      children: [
        {
          name: "Anvendere",
          children: [
            {
              name: "OS grænseflade der minder om Win10",
              desc: "Målgruppen — lærere og elever — kender Windows-grænsefladen. En velkendt grænseflade reducerer behovet for oplæring. Vi forventer, at selve OS-grænsefladen giver få problemer; feedback bør rettes mod de mere udfordrende komponenter.",
            },
            {
              name: "Tilgængelighed via EU-regler og danske designstandarder",
              desc: "Vi overholder EU-regler og danske designstandarder for tilgængelighed. Det kan påvirke valget af skrivebordsmiljø og skal vurderes tidligt, så alle — også brugere med særlige behov — kan benytte løsningen.",
            },
          ],
        },
        {
          name: "Administratorer",
          children: [
            {
              name: "Tag ved lære af Google-grænsefladerne",
              desc: "Administratorer er meget tilfredse med Google-/Chromebook-grænsefladen. Den er en vigtig kilde til inspiration for, hvordan vores admin-UI skal opleves — selvom vi ikke kopierer den 1:1.",
            },
            {
              name: "Tag udgangspunkt i behov, fremfor 1:1 kopier af det kendte",
              desc: "Vi spørger ind til administratorernes ideelle admin-UI, uafhængigt af backend-arkitekturen. Vi bygger efter behov frem for at kopiere al funktionalitet fra en Windows-løsning — enkelte beslutninger må vi dog træffe selv af effektivitetshensyn.",
            },
            {
              name: "Invester i en målrettet skræddersyet administrator brugerflade",
              desc: "Administratorer vil ikke føle sig hjemme i en Git-grænseflade. En målrettet, egenudviklet admin-UI er en investering i dagligdagen for dem, der drifter løsningen — bygget specifikt til målgruppen.",
            },
          ],
        },
      ],
    },
    {
      name: "Genbrug af Bæredygtig Open Source",
      children: [
        {
          name: "Vælg etableret standardløsning til identitet",
          desc: "Kritisk infrastruktur som identitetsstyring (IAM) skal ikke bygges fra bunden. Best practice er at vælge en etableret, moden standardløsning — fx Keycloak — der er gennemtestet af et stort fællesskab og leverer de sikkerhedskrav, vi har brug for.",
        },
        {
          name: "Vælg digital suveræn versionsstyring",
          desc: "Versionsstyring er en runtime-afhængighed, hvor suverænitet er afgørende. Vi vælger en løsning, vi selv kan drive og kontrollere — så koden og processerne ikke er bundet op på en ekstern tjeneste.",
        },
        {
          name: "Invester i moden standard til observability/metrics agent og opsamling",
          desc: "Observability er en del af driftsfundamentet. Frem for at bygge vores egen agent og opsamling investerer vi i en moden standard, der kan integreres på tværs af OS2fri — og som vi kan stole på i produktion.",
        },
        {
          name: "Vælg OS med indbygget management agent",
          desc: "Vi vælger et OS, der leverer management-agenten indbygget. Det giver fjernstyring og overvågning uden at åbne ekstra sikkerhedshuller — og undgår leverandør-lock-in, fordi agenten er en del af platformen.",
        },
      ],
    },
    {
      name: "Fælles Processer",
      children: [
        {
          name: "Dokumentation",
          desc: "Ved at levere relevant dokumentation gør vi det muligt for leverandører at yde support og service. Dokumentation er snitfladen for brugersupport i OS2base — og den skal være handlingsorienteret, fx med flowdiagrammer over administrative handlinger.",
        },
        {
          name: "Skabeloner",
          desc: "Vi hjælper administratorer og leverandører med at opretholde vores designmønstre ved at levere brugervenlige skabeloner. Skabelonerne hører til under child-projekterne, men strukturen leveres af OS2base.",
        },
        {
          name: "Ændringsstyring",
          children: [
            {
              name: "Indbygget via git",
              desc: "Ændringsstyring er indbygget via git — alle ændringer er sporbar, kan rulles tilbage og kan gennemgås, før de træder i kraft. Et GitOps-mandat gør det til en naturlig del af arbejdsgangen.",
            },
          ],
        },
      ],
    },
    {
      name: "Fælles Driftsmodel",
      children: [
        {
          name: "Undgå afvigelser mellem leverandør-opsætninger",
          desc: "Et mål for driftsmodellen er, at der ikke opstår afvigelser mellem leverandørernes opsætninger. Når alle kører fra samme deklarerende basis, undgår vi configuration drift og uforudsigelige miljøer.",
        },
        {
          name: "Undgå leverandør-lock-in",
          desc: "Vi vælger teknologier og aftaler, der ikke binder kommunerne til en enkelt leverandør. Suverænitet og frihed til at skifte er en bevidst del af driftsmodellen.",
        },
        {
          name: "Delte vs. individuelle leverandører",
          desc: "Nogle kommuner vil (måske) dele leverandører, andre ikke. Modellen skal rumme begge scenarier — uden at det giver tekniske eller organisatoriske knaster.",
        },
        {
          name: "Admin vs. leverandør opgavetilknytning",
          desc: "Det skal stå klart, hvilke administrationsopgaver der ejes af kommunens administratorer, og hvilke der ligger hos leverandøren. Administratorer bør ikke skulle bede leverandører om hjælp hele tiden.",
        },
      ],
    },
  ],
};
