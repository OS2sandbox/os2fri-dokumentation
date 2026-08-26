# Bilag: Login-, identitets- og adgangsmodel
_Detaljeret afdækning af identitets- og adgangsmodel for OS2admPC_

## Anbefaling på principniveau

**FKA-først.** Som primær IDP bruges fælleskommunal adgangsstyrings person-ID'er. Jobfunktionsroller, der modtages sammen med person-ID'et, mappes til eksisterende brugersystemroller defineret i applikationerne. Dette valg er lav-risiko, da det bygger videre på etableret fælleskommunal infrastruktur.

På OS2skole kan samme infrastruktur anvendes og blot suppleres eller erstattes med en enkelt STIL-integration.

## Komponentlag

**Keycloak** er den mest udbredte open source IAM-komponent og danner fundamentet for os2adgang.

**os2adgang** (https://github.com/os2ai/adgangskomponent) anvendes af os2ai og står p.t. alene med vedligehold og videreudvikling af kildekoden. Komponenten er bundet til én leverandør og ét OS2-produkt, og en central del er ikke frigivet som åben kildekode, der kan leve op til OS2-governance, men distribueres som en lukket kompileret .jar-fil uden byggekæde eller historik.

## Næste trin

Anmod leverandøren om at levere kildekode og historik op i en selvstændig os2fri-ejet organisation på en OS2-ejet samarbejdsplatform til kildekode og dokumentation (git-baseret). Afsæt løbende midler til en [Open Source Steward](https://orcwg.org/blog/stewards-cra-wp/)-leverandør, der kan vedligeholde og sikre koden for fremtiden.
