workspace "Arkitekturkort" "Systemkontekst for platform med Image Factory, bootc computers, Keycloak, Inventory og Custom Web Console" {

    model {
        user = person "Anvender" "En almindelig bruger af systemet."
        admin = person "Administrator" "En administrator der administrerer platformen."
        computers = softwareSystem "Enheder" "Computere ude hos anvederne med det installerede bootc base image."
        imageFactory = softwareSystem "Image og konfig Fabrik" "Git Forge med iamge registry\nHåndterer kildekode, CI/CD pipelines og opbevaring af det bygger bootc base image." "StateStore" {
            ciCd = container "CI/CD Pipeline" "Bygger bootc base image automatisk." "Automation"
            registry = container "Image Registry" "Lager til det færdigbyggede bootc base image." "Registry"
        }
        webConsole = softwareSystem "Konfigurations App" "En samlet, forenklet web frontend der tilbyder Git commits for uerfarne brugere, samt overblik over inventory/asset data og logs." "Project Duplo" {
            properties {
                "owner" "Duplo"
            }
        }
        keycloak = softwareSystem "Identitets og Adgangsstyring" "Identitets- og adgangsstyring (IdP)." "Infrastruktur"
        inventory = softwareSystem "Inventory / Asset Management" "Backend-system til styring af aktiver og ressourcer." "Infrastruktur"
        newExternalSystem = softwareSystem "OS2AdmPC definition/beskrivelse" "" "Configuration"
        newSystem = softwareSystem "OS2BorgerPC definition/beskrivelse" "" "Configuration"
        newSystem2 = softwareSystem "OS2SkolePC definition/beskrivelse" "" "Configuration"
        newSystem3 = softwareSystem "New System" "" "StateStore"
        newSystem22 = softwareSystem "Overvågning" "Observability stack" "Infrastruktur"

        user -> computers "Bruger computerne med bootc image"
        admin -> webConsole "Administrerer via konsollen"
        admin -> keycloak "Administrerer identiteter og roller"
        computers -> registry "Henter og opdaterer bootc base image fra"
        ciCd -> registry "Publisher det bygger bootc image til"
        webConsole -> imageFactory "Foretager Git commits / interagerer med forge"
        webConsole -> inventory "Henter og viser indhold fra asset management"
        webConsole -> keycloak "Autentificerer brugere mod"
        imageFactory -> keycloak "Validerer identitet / tokens"
        computers -> imageFactory "Anvender pre-byggede images fra"
        newExternalSystem -> imageFactory {
            properties {
                "c4hero.lineStyle" "Curved"
                "c4hero.interactionStyle" "Asynchronous"
            }
        }
        newSystem2 -> imageFactory {
            properties {
                "c4hero.lineStyle" "Curved"
                "c4hero.interactionStyle" "Asynchronous"
            }
        }
        newSystem -> imageFactory {
            properties {
                "c4hero.interactionStyle" "Asynchronous"
            }
        }
        computers -> inventory "Indrapporterer til"
        computers -> newSystem22 "Logger til"
        computers -> keycloak "Kan anvende"
    }

    views {
        systemLandscape "OuojNzSQ" {
            title "Arkitekturkort"
            include user
            include admin
            include computers
            include imageFactory
            include webConsole
            include keycloak
            include inventory
            include newExternalSystem
            include newSystem
            include newSystem2
            include newSystem22
            autoLayout lr
        }

        systemContext SystemContext {
            include SystemContext
            autoLayout
        }

        styles {
            element "Person" {
                background #08427b
                color #ffffff
                shape Person
            }

            element "Software System" {
                background #1168bd
                color #ffffff
            }

            element "Container" {
                background #438dd5
                color #ffffff
            }

            element "Infrastruktur" {
                background #777777
                color #ffffff
            }

            element "Project Duplo" {
                shape WebBrowser
            }

            element "StateStore" {
                background #08427b
                color #ffffff
                shape Cylinder
                border Solid
            }

            element "Configuration" {
                background #114433
                shape Folder
            }
        }
    }

}
