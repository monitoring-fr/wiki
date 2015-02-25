---
layout: page
---

[[[Introduction à Nagios](nagios-introduction@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start") » [Introduction à
Nagios](nagios-introduction.html "nagios:nagios-introduction")

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

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../groundwork/start.html "groundwork:start")
-   [Zenoss](../zenoss/start.html "zenoss:start")
-   [Vigilo](../vigilo/start.html "vigilo:start")
-   [Icinga](../icinga/start.html "icinga:start")
-   [Cacti](../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Nagios {#nagios .sectionedit1}
------

-   [Arborescence des
    fichiers](installation-layout.html "nagios:installation-layout")
-   [Commandes de remontée de
    contrôle](ocsp-ochp.html "nagios:ocsp-ochp")
-   [Données Nagios dans un ramdisk](ramdisk.html "nagios:ramdisk")
-   [Event Handlers](event_handlers.html "nagios:event_handlers")
-   [Gabarits d'objets de
    configuration](templates.html "nagios:templates")
-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](ubuntu-install.html "nagios:ubuntu-install")
-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](debian-install.html "nagios:debian-install")
-   [Installation de Nagios 3.x sur CentOS
    5.3](nagios-centos-install.html "nagios:nagios-centos-install")
-   [Introduction aux objets de
    configuration](configobjects.html "nagios:configobjects")
-   [Introduction à
    Nagios](nagios-introduction.html "nagios:nagios-introduction")
-   [Liens Nagios](links.html "nagios:links")
-   [Mise en place complète de Nagios sur RHEL
    5.4](mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")
-   [NAGIOS - Guide de démarrage pour
    débutant](nagios-debutant/start.html "nagios:nagios-debutant:start")
-   [Nagios Addons](addons/start.html "nagios:addons:start")
-   [Nagios
    Integration](integration/start.html "nagios:integration:start")
-   [Nagios Plugins](plugins/start.html "nagios:plugins:start")
-   [Nagios et les
    notifications](notifications.html "nagios:notifications")
-   [Outils de supervision d'un hôte
    Windows](windows-client.html "nagios:windows-client")
-   [Référence des objets de
    configuration](objects-reference.html "nagios:objects-reference")
-   [Superviser un hôte Windows avec
    NSClient++](nagios-nsclient-host.html "nagios:nagios-nsclient-host")
-   [Supervision Windows en mode
    passif](supervision-windows-passif.html "nagios:supervision-windows-passif")
-   [Supervision vmware esx](vmware_esx.html "nagios:vmware_esx")
-   [check-list de diagnostic](debug.html "nagios:debug")

-   [Afficher le texte
    source](nagios-introduction@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](nagios-introduction@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](nagios-introduction@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](nagios-introduction@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](nagios-introduction@do=media.html "Gestionnaire de médias")
-   [Index](nagios-introduction@do=index.html "Index [X]")
-   [Connexion](nagios-introduction@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](nagios-introduction.html#dokuwiki__top "Haut de page [T]")

nagios/nagios-introduction.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../lib/tpl/arctic/images/button-rss.png)](../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../lib/exe/indexer.php@id=nagios%253Anagios-introduction&1424859523)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
