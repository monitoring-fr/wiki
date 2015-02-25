---
layout: page
---

### Table des matières {.toggle}

-   [Introduction à
    Nagios](nagios-introduction.html#introduction-a-nagios)
    -   [Présentation](nagios-introduction.html#presentation)
    -   [Possibilités](nagios-introduction.html#possibilites)
    -   [Architecture](nagios-introduction.html#architecture)
    -   [Références](nagios-introduction.html#references)
        -   [Monde](nagios-introduction.html#monde)
        -   [En France](nagios-introduction.html#en-france)
    -   [Support
        francophone](nagios-introduction.html#support-francophone)

Introduction à Nagios {#introduction-a-nagios .sectionedit1}
=====================

Sur cette page, nous allons présenter et décrire les principales
possibilités de Nagios.

Cette page a été rédigée par :

  **Rôle**         **Nom**
  ---------------- -----------------------------------------------
  **Rédacteurs**   Olivier JAN, David GUENAULT, Romuald FRONTEAU

Présentation {#presentation .sectionedit3}
------------

#### Moniteur de supervision :

-   vérification des services réseau (SMTP, HTTP, …etc.).
-   surveillance des ressources des hôtes (charge CPU, espace disque,
    …etc.).
-   contrôle des équipements réseau (CPU, ventilateurs, …etc.).

#### Ordonnanceur et analyseur gérant les actions : {#ordonnanceur-et-analyseur-gerant-les-actions}

-   système complet de notification fonction du service, de l’heure et
    de la date.
-   gestion des escalades.
-   possibilité de paramétrer des réactions automatisées.
-   possibilité de définir des gestionnaires d’événements.
-   Système de modules/plugins de vérification
-   fonctionne tels des programmes externes.
-   permet de développer ses propres modules.
-   Possibilité de définir la hiérarchie du réseau en utilisant des
    hôtes parents.
-   Une interface Web avec gestion des droits pour la consultation.
-   Génération de rapports de surveillance.
-   N’est pas destiné à faire de la métrologie.

Possibilités {#possibilites .sectionedit4}
------------

**Nagios** (anciennement appelé Netsaint) est un logiciel qui permet de
superviser un système d’information complet. C’est un logiciel libre, il
est sous licence GPL.

C’est un programme modulaire qui se décompose en trois parties:

1.  Le moteur de l’application qui vient ordonnancer les tâches de
    supervision.
2.  L’interface web, qui permet d’avoir une vue d’ensemble du système
    d’information et des possibles anomalies.
3.  Les *plugins*, une centaine de mini programmes que l’on peut
    compléter en fonction de nos besoins pour superviser chaque service
    ou ressource disponible sur l’ensemble des ordinateurs ou éléments
    réseaux de notre SI.

-   Superviser des services réseaux : (SMTP, POP3, HTTP, NNTP, ICMP,
    SNMP, LDAP , etc.)
-   Superviser les ressources des serveurs (charge du processeur,
    occupation du disque dur, utilisation de la mémoire paginée) et ceci
    sur les systèmes d’exploitations les plus répandus.
-   La supervision à distance peut utiliser SSH ou un tunnel SSL.
-   Les *plugins* sont écrits dans les langages de programmation les
    plus adaptés à leur tâche (Bash, C++, Python, Perl, PHP, C, etc.)
-   La vérification des services se fait en parallèle.
-   Possibilité de définir une hiérarchie dans le réseau pour pouvoir
    faire la différence entre un serveur en panne et un serveur
    injoignable.
-   La remontée des alertes est entièrement paramétrable grâce à
    l’utilisation de plugins (alerte par email, SMS, etc.)
-   Chaque test renvoi un état particulier:
    1.  \# OK *(tout va bien)*
    2.  \# WARNING *(le seuil d’alerte est dépassé)*
    3.  \# CRITICAL *(le service a un problème)*
    4.  \# UNKNOWN *(impossible de connaître l’état du service)*

Architecture {#architecture .sectionedit5}
------------

-   un ordonnanceur qui gère :
    -   l’ordonnancement et les dépendances des vérifications.
    -   les actions à entreprendre suite à des incidents (alertes,
        escalades, corrections automatiques).

-   une interface graphique de type client Web.
-   des modules/sondes dont un grand nombre sont fournis de base. (ex :
    check\_mailq, check\_http, check\_imap).
-   Nagios est un noyau
-   ordonnanceur et analyseur.
-   système de modules pour les vérifications.
-   rassemblement et analyse d’informations.
-   réaction, prévention et réparation.
-   souplesse et finesse de configuration.

Références {#references .sectionedit6}
----------

### Monde {#monde .sectionedit7}

### En France {#en-france .sectionedit8}

-   RATP – 50 hôtes et 150 services
-   CNRS – 150 hôtes
-   Institut Pasteur – 140 hôtes et 143 services
-   Lastminute.com – 104 hôtes et 604 services
-   Regional (Air France) – 18 serveurs et 45 services
-   Inter Mutuelle Assistance – 66 hôtes et 189 services
-   ARKEA – 330 hôtes et 1400 services
-   [Kelkoo](http://www.journaldunet.com/solutions/systemes-reseaux/interview/alain-delafosse-dt-kelkoo-urbaniser-pour-eviter-d-avoir-une-grosse-plateforme-statique.shtml "http://www.journaldunet.com/solutions/systemes-reseaux/interview/alain-delafosse-dt-kelkoo-urbaniser-pour-eviter-d-avoir-une-grosse-plateforme-statique.shtml")

-   [LDLC](http://www.journaldunet.com/solutions/systemes-reseaux/interview/denis-mennesson-ldlc-avec-l-informatique-verte-les-constructeurs-adoptent-un-discours-en-contradiction-avec-leur-pratique-commerciale.shtml "http://www.journaldunet.com/solutions/systemes-reseaux/interview/denis-mennesson-ldlc-avec-l-informatique-verte-les-constructeurs-adoptent-un-discours-en-contradiction-avec-leur-pratique-commerciale.shtml")
-   [Crédit Mutuel
    Arkea](http://www.lemondeinformatique.fr/actualites/lire-le-credit-mutel-arkea-ameliore-ses-outils-de-supervision-metiers-29596.html "http://www.lemondeinformatique.fr/actualites/lire-le-credit-mutel-arkea-ameliore-ses-outils-de-supervision-metiers-29596.html")

Support francophone {#support-francophone .sectionedit9}
-------------------

-   [Forums non officiels de support
    francophone](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/")
-   [bfl-solutions](http://forums.bfl-solutions.eu/ "http://forums.bfl-solutions.eu/")
-   [Forums
    Nicolargo](http://blog.nicolargo.com/ "http://blog.nicolargo.com/")
-   [Xavier
    Dusart](http://xavier.dusart.free.fr/forums "http://xavier.dusart.free.fr/forums")
-   [Centreon](http://forum.centreon.com/ "http://forum.centreon.com/")

