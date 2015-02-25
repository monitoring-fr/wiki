---
layout: page
---

### Table des matières {.toggle}

-   [Créer son premier
    service](creer-son-premier-service.html#creer-son-premier-service)
    -   [Création du/des
        services](creer-son-premier-service.html#creation-dudes-services)

Créer son premier service {#creer-son-premier-service .sectionedit1}
=========================

Ce chapitre va montrer pas par pas comment ajouter un service à notre
hôte Rainette.

Création du/des services {#creation-dudes-services .sectionedit2}
------------------------

Pour notre hôte “Rainette”, nous allons lui ajouter 2 services. Un
service de Load Average et un autre pour le test d’apache (Serveur Web)

Pour ajouter nos 2 services, éditez le fichier *rainette.cfg* et ajouter
le code ci-dessous.

~~~~ {.code}
# Definition du service de Load Average
define service{
        use                             generic-service
        host_name                       Rainette
        service_description             Load Average
        check_command                   check_load!5.0,4.0,3.0!10.0,8.0,6.0
        }

# Definition du service de controle d'url Web
define service{
        use                             generic-service
        host_name                       Rainette
        service_description             Reponse interface Web Nagios
        check_command                   check_http!"http://xx.xx.xx.xx/nagios"
        notifications_enabled           0
        }
~~~~

J’explique un peu les définitions ci-dessus. Concernant le “Load
Average”, nous avons précisé 4 variables.

-   **use** → sert à appeler le template précisé
-   **host\_name** → permet de créer le lien entre le service “Load
    Average” et notre hôte “Rainette”
-   **service\_description** → est le nom que vous allez donner à votre
    service
-   **check\_command** → cette variable fait appel à une commande qui
    est déjà paramétrée ou que vous avez paramétré dans le fichier
    commands.cfg.

***Explication syntaxique :***

check\_load!5.0,4.0,3.0!10.0,8.0,6.0

-   **check\_load** → est l’alias (command\_name dans la définition de
    commandes, regarder le commands.cfg pour y voir plus clair)
-   **!** → le ! est un séparateur pour délimiter les arguments
    (\$ARG1\$, \$ARG2\$ …)
-   **5.0,4.0,3.0** → c’est l’argument numéro 1 (\$ARG1\$). Pour le
    plugin check\_load ceci correspond aux seuils de WARNING
-   **10.0,8.0,6.0** → c’est l’argument numéro 2 (\$ARG2\$). Pour le
    plugin check\_load ceci correspond aux seuils de CRITICAL

Concernant, la réponse de l’interface Nagios, le check\_http, vous
pouvez voir une variable supplémentaire. Vu que vos services héritent du
“generic-service”, comme tout principe d’héritage, la valeur la plus
proche de votre définition de service sera prioritaire sur le template.

Vous allez me dire, il est pourri son cours quand je redémarre Nagios,
il est en erreur … je vous dis c’est normal, car la check\_command
“check\_load” pour la définition du Load Average n’existe pas dans le
fichier commands.cfg. Je vous invite donc à suivre le **[chapitre
suivant](../../../../nagios/nagios-debutant/creer-sa-premiere-commande.html "nagios:nagios-debutant:creer-sa-premiere-commande")**
pour se sortir de ce mauvais pas et voir notre hôte Rainette muni de 2
beaux services.
