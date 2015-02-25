---
layout: page
---

[[[Comment activer et utiliser le module
livestatus](enable_livestatus_module@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Shinken](start.html "shinken:start") » [Comment activer et utiliser le
module
livestatus](enable_livestatus_module.html "shinken:enable_livestatus_module")

### Table des matières {.toggle}

-   [Comment activer et utiliser le module
    livestatus](enable_livestatus_module.html#comment-activer-et-utiliser-le-module-livestatus)
    -   [Définir le module
        livestatus](enable_livestatus_module.html#definir-le-module-livestatus)
    -   [Activer le module
        livestatus](enable_livestatus_module.html#activer-le-module-livestatus)
    -   [Désactiver human readable
        logs](enable_livestatus_module.html#desactiver-human-readable-logs)

Comment activer et utiliser le module livestatus {#comment-activer-et-utiliser-le-module-livestatus .sectionedit1}
================================================

Définir le module livestatus {#definir-le-module-livestatus .sectionedit2}
----------------------------

Commencez par examiner le fichier /etc/shinken/shinken-specific.cfg pour
ce module:

~~~~ {.code}
define module{
       module_name      Livestatus
       module_type      livestatus
       host             *       ; * = listen on all configured IP addresses
       port             50000   ; port to listen on
       database_file    /var/lib/shinken/livestatus.db
}
~~~~

Avec ces paramètres:

-   module\_name: nom du module appelé par les brokers
-   module\_type: livestatus
-   host: interface IP à écouter. La valeur par défaut est \*, ce qui
    signifie « écouter sur toutes les interfaces. »
-   Port: le port TCP à écouter.
-   socket: socket Unix à écouter.
-   database\_file: le chemin vers le fichier de base de données SQLite
    qui est utilisé pour stocker les logs Broks/messages. La valeur par
    défaut est « var/livelogs.db »
-   max\_logs\_age: temps de rétention maximum des messages de log
    (avant qu’ils ne soient supprimés de la base de données). La valeur
    par défaut est de 1 an. L’argument de ce paramètre prend la forme
    \<numéro\> [\<period de temp\>], où \<period de temp\> peut être d
    pour les jours, w pour les semaines, m pour les mois et y les
    années.
-   allowed\_hosts: une liste séparée par des virgules des adresses IP
    qui sont autorisés à communiquer avec le port TCP. S’il vous plaît
    gardez à l’esprit que ceux-ci doivent être des adresses IP, PAS des
    noms d’hôte. Parce qu’une recherche DNS pour chaque requête entrante
    livestatus pourrait avoir de la latence et donc bloquer le module.

Activer le module livestatus {#activer-le-module-livestatus .sectionedit3}
----------------------------

Toujours dans le fichier /etc/shinken/shinken-specific.cfg , trouver le
broker objet et ajouter « livestatus » à ses «modules»:

~~~~ {.code}
define broker{
       broker_name      broker-1
[...]
       modules          Simple-log,Livestatus
}
~~~~

Désactiver human readable logs {#desactiver-human-readable-logs .sectionedit4}
------------------------------

Dans le fichier /etc/shinken/nagios.cfg, vérifiez que l’option
human\_timestamp\_log est réglé sur 0.

Dans la version 0.6.5, vous ne pouvez pas avoir en même temps un simple
fichier-journal avec horodatage lisible par un humain et une base de
données livestatus.

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](start.html "shinken:start")
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

Shinken {#shinken .sectionedit1}
-------

-   [Comment activer et utiliser le module
    livestatus](enable_livestatus_module.html "shinken:enable_livestatus_module")
-   [Configuration et
    lancement](shinken-architecture-config.html "shinken:shinken-architecture-config")
-   [Fonctionnement de
    Shinken](shinken-work.html "shinken:shinken-work")
-   [Instalation de shinken les yeux
    fermés](shinken-10min-start.html "shinken:shinken-10min-start")
-   [Installation Shinken 0.8 sur Debian
    Squeeze](shinken-debian-squeeze-install.html "shinken:shinken-debian-squeeze-install")
-   [Installation de Shinken par
    script](install-script.html "shinken:install-script")
-   [Installation de Shinken sur
    CentOS](shinken-centos-install.html "shinken:shinken-centos-install")
-   [Installation de Shinken sur Debian
    Lenny](shinken-debian-install.html "shinken:shinken-debian-install")
-   [Installation de Shinken sur Ubuntu
    server](shinken-ubuntu-install-with-nagios.html "shinken:shinken-ubuntu-install-with-nagios")
-   [Installation de Shinken sur Ubuntu server 10.04
    LTS](shinken-ubuntu-install.html "shinken:shinken-ubuntu-install")
-   [Interface Shinken](shinken-use-ui.html "shinken:shinken-use-ui")
-   [Introduction à
    Shinken](shinken-introduction.html "shinken:shinken-introduction")
-   [Les architectures avancées de
    Shinken](shinken-advanced-architecture.html "shinken:shinken-advanced-architecture")
-   [Ressources et Performances de
    Shinken](shinken-ressources.html "shinken:shinken-ressources")
-   [Shinken en haute disponiblité sur 2
    noeuds](shinken-ha-2noeuds.html "shinken:shinken-ha-2noeuds")

-   [Afficher le texte
    source](enable_livestatus_module@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](enable_livestatus_module@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](enable_livestatus_module@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](enable_livestatus_module@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](enable_livestatus_module@do=media.html "Gestionnaire de médias")
-   [Index](enable_livestatus_module@do=index.html "Index [X]")
-   [Connexion](enable_livestatus_module@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](enable_livestatus_module.html#dokuwiki__top "Haut de page [T]")

shinken/enable\_livestatus\_module.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=shinken%253Aenable_livestatus_module&1424859529)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
