/**
 * OS2fri DSL data
 * ----------------
 * The Structurizr DSL for systemkontekst.html.
 * Edit this file, save, and reload systemkontekst.html.
 *
 * CONVENTIONS:
 *   - This file contains the raw DSL content that is loaded and parsed by systemkontekst.html
 *   - The DSL defines the entire programkontekst with models, views, and styles
 *   - Edit in the original .dsl file for documentation, then regenerate this file
 *   - This file is the single source of truth for systemkontekst.html
 */

window.OS2FRI_DSL = `workspace "OS2fri" "C4 arkitekturdiagram for OS2fri" {

    model {
        properties {
            "structurizr.groupSeparator" "/"
            "structurizr.locale" "da-DK"
        }

        // =====================================================================
        // Level 1 — OS2fri programkontekst
        // =====================================================================

        group "Niveau 3" {
            os2base = softwareSystem "OS2base Image" "Fælles kodebase: bootc-base-image + IaC (Helm)" {
                tags "Base"

                bootcImage    = container "Bootc base image" "Containerfile der definerer bootc-base-image" "" "Base Image"
                forgejoHelm   = container "Forgejo (Helm)" "Git + CI/CD + container registry" "" "Helm IaC"
                keycloakHelm  = container "Keycloak (Helm)" "Identity provider" "" "Helm IaC"
                otelHelm      = container "OpenTelemetry (Helm)" "Observability collector" "" "Helm IaC"
                pipelines     = container "CI/CD pipeline definitions" "Bygger bootc-images i Forgejo" "" "CI/CD"

                pipelines -> bootcImage  "bygger"
                pipelines -> forgejoHelm "udløses af og publicerer til"
            }

            enhedsKonsol = softwareSystem "Enhedsstyrings konsol" "Web-ui til GitOps-administration af alle tre projekter" {
                tags "Console"
            }
        }

        os2base -> enhedsKonsol "leverer"

        group "Projekter" {
            os2skolepc  = softwareSystem "OS2skolePC" "Arver fra OS2base" { tags "Project" }
            os2borgerpc = softwareSystem "OS2borgerPC" "Arver fra OS2base" { tags "Project" }
            os2admpc    = softwareSystem "OS2admPC" "Arver fra OS2base" { tags "Project" }
        }

        elev           = person "Elev" "Bruger OS2skolepc"
        laerer         = person "Lærer" "Bruger OS2skolepc"
        borger         = person "Borger" "Bruger OS2borgerPC"
        itMedarbejder  = person "Kommunal IT-medarbejder" "Administrerer alle projekter via Enhedsstyrings konsol"
        admMedarbejder = person "Kommunal adm. medarbejder" "Bruger OS2admPC"

        os2base        -> os2skolepc  "arves af"
        os2base        -> os2borgerpc "arves af"
        os2base        -> os2admpc    "arves af"
        enhedsKonsol   -> os2skolepc  "administrerer"
        enhedsKonsol   -> os2borgerpc "administrerer"
        enhedsKonsol   -> os2admpc    "administrerer"
        elev           -> os2skolepc  "bruger"
        laerer         -> os2skolepc  "bruger"
        borger         -> os2borgerpc "bruger"
        itMedarbejder  -> enhedsKonsol "administrerer enheder via" "GitOps"
        admMedarbejder -> os2admpc    "bruger"

        // =====================================================================
        // OS2admPC — Detaljeret containerarkitektur (bevaret)
        // =====================================================================

        group "OS2 Adm (intern)" {
            user   = person "Kontorbruger" ""
            admin  = person "Enhedsadministrator" ""
            access = person "Adgangsstyringsansvarlig" ""

            group "Infrastruktur" {
                forgejo = softwareSystem "Samarbejdsplatform" "Selvhostet Git-forge" {
                    tags "Git"
                    web      = container "Webgrænseflade" "Brugergrænseflade og API til administration af platformen" "" "Web"
                    repos    = container "Kodedepot" "Git-repositories med enhedskonfiguration som kildekode" "" "Repository"
                    registry = container "Containerregister" "OCI-image register til bootc-images" "" "Database"
                    cicd     = container "Bygge- og release-motor" "CI/CD der bygger images fra kodedepot og publicerer til containerregister" "" "CI/CD"

                    web   -> repos    "styrer repositories via"
                    web   -> cicd     "udløser pipelines via"
                    cicd  -> repos    "henter konfiguration og kildekode fra"
                    cicd  -> registry "publicerer byggede images til"
                }
                opentelemetry = softwareSystem "Overvågningsplatform" "Observabilitets- og overvågningsplatform" {
                    tags "Monitoring"
                }
                keycloak = softwareSystem "Identitetsbroker" "Forbinder til ekstern SAML IdP og leverer SSO til interne systemer" {
                    tags "Identity"
                }
            }

            group "Kontorplatform" {
                groupware = softwareSystem "Kontorplatform" "Mail, kalender og booking af lokaler/udstyr" {
                    tags "Mail"
                    webapp    = container "Webfrontend" "Brugergrænseflade til mail, kalender og booking"
                    mail      = container "Mailtjeneste" "Aflevering, lagring og hentning af e-mail"
                    calendar  = container "Kalendertjeneste" "Planlægning og deling af begivenheder"
                    resources = container "Booking af ressourcer" "Booking af lokaler og udstyr"
                    db        = container "Database" "Persistent lagring af al gruppevaredata" "" "Database"

                    webapp -> mail      "sender og modtager e-mail via" "IMAP/SMTP"
                    webapp -> calendar  "læser og skriver kalenderdata via" "HTTP API"
                    webapp -> resources "håndterer booking af ressourcer via" "HTTP API"
                    webapp -> db        "gemmer data i" "JDBC"
                    mail    -> db       "gemmer e-maildata i"
                    calendar -> db      "gemmer kalenderbegivenheder i"
                    resources -> db     "gemmer bookinger af ressourcer i"
                }
            }

            group "Enhedsstyring" {
                desktops  = softwareSystem "Administrerede Linux-enheder" "GitOps-styrede enheder — konfigurationsfiler i Git" {
                    tags "Device"
                }
                dashboard = softwareSystem "Administrationspanel" "Brugerflade der interfacer med Samarbejdsplatform og Overvågningsplatform API'er"
            }
        }

        group "Eksterne systemer" {
            m365 = softwareSystem "Microsoft 365" "Ekstern Exchange Online med mail og ressourcebooking (udvalgt tenant)" {
                tags "Exchange"
            }
            saml = softwareSystem "SAML IdP" "Ekstern SAML-identitetsudbyder" {
                tags "Saml"
            }
        }

        // OS2adm detaljerede relationer
        user      -> desktops   "bruger webbrowser på"
        desktops  -> groupware  "tilgår kontorplatform-webfrontend fra"
        groupware -> m365       "sender e-mail til og booker ressourcer hos"
        admin     -> dashboard  "overvåger compliance- og deploymentsstatus via"
        admin     -> forgejo    "committer enhedskonfiguration til"
        dashboard -> forgejo       "henter repository-status og compliance-data via"
        dashboard -> opentelemetry "henter observabilitetsmetrikker via"
        desktops  -> opentelemetry "sender enhedstelemetri via VM-klient til"
        desktops  -> forgejo       "henter administrerede enheder og konfig fra"
        cicd      -> desktops      "bygger og publicerer administrerede enheder til"
        groupware -> keycloak "anvender SSO via"
        desktops  -> keycloak "anvender SSO via"
        keycloak  -> saml     "viderestiller SAML-autentificering til"
        access    -> keycloak "administrerer adgangsstyring i"
    }

    // =========================================================================
    // Views
    // =========================================================================

    views {
        properties {
            "structurizr.locale" "da-DK"
            "structurizr.timezone" "Europe/Copenhagen"
        }

        theme os2

        // --- Level 1: OS2fri programkontekst ---
        systemLandscape "OS2fri" "OS2fri — programkontekst" {
            include elev laerer borger itMedarbejder admMedarbejder os2base enhedsKonsol os2skolepc os2borgerpc os2admpc
            autoLayout "tb"
        }

        // --- Level 2: OS2base kodebaseindhold ---
        container os2base "OS2base — kodebaseindhold" {
            include *
            autoLayout
        }

        // --- OS2admPC detaljerede visninger (bevaret) ---
        container groupware "Groupware" {
            include *
            autoLayout
        }

        container forgejo "Forgejo" {
            include *
            autoLayout
        }

        systemLandscape "os2adm" "OS2admPC — detaljeret arkitektur" {
            include user admin access groupware desktops dashboard forgejo opentelemetry keycloak m365 saml
            autoLayout "tb"
        }

        // =====================================================================
        // Styles
        // =====================================================================

        styles {
            element "Software System" {
                shape RoundedBox
            }
            element "Person" {
                shape Person
            }
            element "Base" {
                background #2E86AB
                color #FFFFFF
            }
            element "Console" {
                background #D4A017
                color #FFFFFF
            }
            element "Project" {
                background #50B86C
                color #FFFFFF
            }
            element "Helm IaC" {
                shape Hexagon
                background #7B68EE
                color #FFFFFF
            }
            element "Base Image" {
                shape Cylinder
                background #F5A623
                color #FFFFFF
            }
            element "Git" {
                background #D94F4F
                color #FFFFFF
            }
            element "Monitoring" {
                background #6B5B95
                color #FFFFFF
            }
            element "Identity" {
                background #3B8E8E
                color #FFFFFF
            }
            element "Mail" {
                background #C97B3A
                color #FFFFFF
            }
            element "Device" {
                shape RoundedBox
                background #4A4A4A
                color #FFFFFF
            }
            element "Database" {
                shape Cylinder
                background #5A7A9A
                color #FFFFFF
            }
            element "Repository" {
                shape Folder
                background #6B8E4E
                color #FFFFFF
            }
        }
    }
}

workspace "OS2fri" "C4 arkitekturdiagram for OS2fri" {

    model {
        properties {
            "structurizr.groupSeparator" "/"
            "structurizr.locale" "da-DK"
        }

        // =====================================================================
        // Level 1 — OS2fri programkontekst
        // =====================================================================

        group "Niveau 3" {
            os2base = softwareSystem "OS2base image" "Fælles kodebase: bootc-base-image + IaC (Helm)" "Base" {
                bootcImage    = container "Bootc base image" "Containerfile der definerer bootc-base-image" "" "Base Image"

                forgejoHelm   = container "Forgejo (Helm)" "Git + CI/CD + container registry" "" "Helm IaC"

                keycloakHelm  = container "Keycloak (Helm)" "Identity provider" "" "Helm IaC"

                otelHelm      = container "OpenTelemetry (Helm)" "Observability collector" "" "Helm IaC"

                pipelines     = container "CI/CD pipeline definitions" "Bygger bootc-images i Forgejo" "" "CI/CD"
            }

            enhedsKonsol = softwareSystem "Enhedsstyrings konsol" "Web-ui til GitOps-administration af alle tre projekter" "Console"
        }

        os2base -> enhedsKonsol "leverer"

        os2skolepc = softwareSystem "OS2skolepc" "Arver fra OS2base" "Project"

        os2borgerpc = softwareSystem "OS2borgerPC" "Arver fra OS2base" "Project"

        os2admpc = softwareSystem "OS2admPC" "Arver fra OS2base" "Project"

        elev = person "Elev" "Bruger OS2skolepc" {
            location External
        }

        laerer = person "Lærer" "Bruger og kan administrere OS2skolepc"

        borger = person "Borger" "Bruger OS2borgerPC" {
            location External
        }

        itMedarbejder = person "IT-administrator" "Administrerer alle projekter via Enhedsstyrings konsol"

        admMedarbejder = person "Medarbejder" "Bruger OS2admPC"

        user = person "Kontorbruger"

        admin = person "Enhedsadministrator"

        access = person "Adgangsstyringsansvarlig"

        FZfoqugj = person "IT-ansvarlig" "Administrerer OS2BorgerPC\n"

        forgejo = softwareSystem "Samarbejdsplatform" "Selvhostet Git-forge" "Git" {
            web = container "Webgrænseflade" "Brugergrænseflade og API til administration af platformen" "" "Web"

            repos = container "Kodedepot" "Git-repositories med enhedskonfiguration som kildekode" "" "Repository"

            registry = container "Containerregister" "OCI-image register til bootc-images" "" "Database"

            cicd = container "Bygge- og release-motor" "CI/CD der bygger images fra kodedepot og publicerer til containerregister" "" "CI/CD"
        }

        opentelemetry = softwareSystem "Overvågningsplatform" "Observabilitets- og overvågningsplatform" "Monitoring"

        keycloak = softwareSystem "Identitetsbroker" "Forbinder til ekstern SAML IdP og leverer SSO til interne systemer" "Identity"

        groupware = softwareSystem "Kontorplatform" "Mail, kalender og booking af lokaler/udstyr" "Mail" {
            webapp = container "Webfrontend" "Brugergrænseflade til mail, kalender og booking"

            mail = container "Mailtjeneste" "Aflevering, lagring og hentning af e-mail"

            calendar = container "Kalendertjeneste" "Planlægning og deling af begivenheder"

            resources = container "Booking af ressourcer" "Booking af lokaler og udstyr"

            db = container "Database" "Persistent lagring af al gruppevaredata" "" "Database"
        }

        desktops = softwareSystem "Administrerede Linux-enheder" "GitOps-styrede enheder — konfigurationsfiler i Git" "Device"

        dashboard = softwareSystem "Administrationspanel" "Brugerflade der interfacer med Samarbejdsplatform og Overvågningsplatform API'er"

        m365 = softwareSystem "Microsoft 365" "Ekstern Exchange Online med mail og ressourcebooking (udvalgt tenant)" "Exchange"

        saml = softwareSystem "SAML IdP" "Ekstern SAML-identitetsudbyder" "Saml"

        acFDhUHD = softwareSystem "New External System" {
            location External
        }

        group "Os2Base" {
            os2base
            enhedsKonsol
        }

        group "OS2skole" {
            os2skolepc
        }

        group "Infrastruktur" {
            forgejo
            opentelemetry
            keycloak
        }

        group "Kontorplatform" {
            groupware
        }

        group "Enhedsstyring" {
            desktops
            dashboard
        }

        group "OS2 Adm (intern)" {
            user
            admin
            access
            forgejo
            opentelemetry
            keycloak
            groupware
            desktops
            dashboard
        }

        group "Eksterne systemer" {
            m365
            saml
        }

        pipelines -> bootcImage "bygger"
        pipelines -> forgejoHelm "udløses af og publicerer til"
        os2base -> enhedsKonsol "leverer"
        os2base -> os2skolepc "arves af"
        os2base -> os2admpc "arver baseimage og konsol"
        elev -> os2skolepc "bruger"
        laerer -> os2skolepc "bruger"
        borger -> os2borgerpc "bruger"
        admMedarbejder -> os2admpc "bruger"
        web -> repos "styrer repositories via"
        web -> cicd "udløser pipelines via"
        cicd -> repos "henter konfiguration og kildekode fra"
        cicd -> registry "publicerer byggede images til"
        webapp -> mail "sender og modtager e-mail via" "IMAP/SMTP"
        webapp -> calendar "læser og skriver kalenderdata via" "HTTP API"
        webapp -> resources "håndterer booking af ressourcer via" "HTTP API"
        webapp -> db "gemmer data i" "JDBC"
        mail -> db "gemmer e-maildata i"
        calendar -> db "gemmer kalenderbegivenheder i"
        resources -> db "gemmer bookinger af ressourcer i"
        user -> desktops "bruger webbrowser på"
        desktops -> groupware "tilgår kontorplatform-webfrontend fra"
        groupware -> m365 "sender e-mail til og booker ressourcer hos"
        admin -> dashboard "overvåger compliance- og deploymentsstatus via"
        admin -> forgejo "committer enhedskonfiguration til"
        dashboard -> forgejo "henter repository-status og compliance-data via"
        dashboard -> opentelemetry "henter observabilitetsmetrikker via"
        desktops -> opentelemetry "sender enhedstelemetri via VM-klient til"
        desktops -> forgejo "henter administrerede enheder og konfig fra"
        cicd -> desktops "bygger og publicerer administrerede enheder til"
        groupware -> keycloak "anvender SSO via"
        desktops -> keycloak "anvender SSO via"
        keycloak -> saml "viderestiller SAML-autentificering til"
        access -> keycloak "administrerer adgangsstyring i"
        itMedarbejder -> os2admpc
        os2base -> os2borgerpc "Arver baseimage og konsol"
        FZfoqugj -> os2borgerpc
    }

    views {
        systemLandscape "OS2fri" {
            title "OS2fri — programkontekst"
            description "OS2fri — programkontekst"
            include elev
            include laerer
            include borger
            include itMedarbejder
            include admMedarbejder
            include os2base
            include enhedsKonsol
            include os2skolepc
            include os2borgerpc
            include os2admpc
            include FZfoqugj
            autoLayout BT
        }

        systemLandscape "os2adm" {
            title "OS2admPC — detaljeret arkitektur"
            description "OS2admPC — detaljeret arkitektur"
            include user
            include admin
            include access
            include groupware
            include desktops
            include dashboard
            include forgejo
            include opentelemetry
            include keycloak
            include m365
            include saml
            include FZfoqugj
            include acFDhUHD
            autoLayout
        }

        container os2base "OS2base — kodebaseindhold" {
            include bootcImage
            include forgejoHelm
            include keycloakHelm
            include otelHelm
            include pipelines
            autoLayout
        }

        container groupware "Groupware" {
            include webapp
            include mail
            include calendar
            include resources
            include db
            autoLayout
        }

        container forgejo "Forgejo" {
            include web
            include repos
            include registry
            include cicd
            include desktops
            autoLayout
        }

        styles {
            element "Software System" {
                shape RoundedBox
            }

            element "Person" {
                shape Person
            }

            element "Base" {
                background #2E86AB
                color #FFFFFF
            }

            element "Console" {
                background #D4A017
                color #FFFFFF
            }

            element "Project" {
                background #50B86C
                color #FFFFFF
            }

            element "Helm IaC" {
                background #7B68EE
                color #FFFFFF
                shape Hexagon
            }

            element "Base Image" {
                background #F5A623
                color #FFFFFF
                shape Cylinder
            }

            element "Git" {
                background #D94F4F
                color #FFFFFF
            }

            element "Monitoring" {
                background #6B5B95
                color #FFFFFF
            }

            element "Identity" {
                background #3B8E8E
                color #FFFFFF
            }

            element "Mail" {
                background #C97B3A
                color #FFFFFF
            }

            element "Device" {
                background #4A4A4A
                color #FFFFFF
                shape RoundedBox
            }

            element "Database" {
                background #5A7A9A
                color #FFFFFF
                shape Cylinder
            }

            element "Repository" {
                background #6B8E4E
                color #FFFFFF
                shape Folder
            }
        }

        themes "os2"
    }
}
`;
