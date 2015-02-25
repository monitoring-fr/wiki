---
layout: page
---

[[[Installation Shinken 0.8 sur Debian
Squeeze](shinken-debian-squeeze-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Shinken](start.html "shinken:start") » [Installation Shinken 0.8 sur
Debian
Squeeze](shinken-debian-squeeze-install.html "shinken:shinken-debian-squeeze-install")

### Table des matières {.toggle}

-   [Installation Shinken 0.8 sur Debian
    Squeeze](shinken-debian-squeeze-install.html#installation-shinken-08-sur-debian-squeeze)
    -   [Pré-Requis](shinken-debian-squeeze-install.html#pre-requis)
    -   [Installation
        Shinken](shinken-debian-squeeze-install.html#installation-shinken)

Installation Shinken 0.8 sur Debian Squeeze {#installation-shinken-08-sur-debian-squeeze .sectionedit1}
===========================================

En cours de rédaction

Pré-Requis {#pre-requis .sectionedit2}
----------

Nous n’allons pas couvrir en détail l’installation de la distribution
Linux. Il suffit de choisir une installation de serveur LAMP et de
suivre les indications. Pour que cette installation soit opérationnelle,
il convient d’exécuter les commandes suivantes :

~~~
apt-get update
apt-get upgrade
apt-get install openssh-server pyro python-paste git
~~~

Ces commandes mettent à jour l’ensemble de la distribution installée et
installe le serveur ssh pour la prise en main à distance.

Préparation des dépôts apt pour l’installation

~~~
vi /etc/apt/sources.list
~~~

Le contenu désiré est le suivant:

~~~
deb http://ftp.fr.debian.org/debian/ squeeze main
deb-src http://ftp.fr.debian.org/debian/ squeeze main

deb http://security.debian.org/ squeeze/updates main
deb-src http://security.debian.org/ squeeze/updates main

# squeeze-updates, previously known as 'volatile'
deb http://ftp.fr.debian.org/debian/ squeeze-updates main
deb-src http://ftp.fr.debian.org/debian/ squeeze-updates main
~~~

Installation Shinken {#installation-shinken .sectionedit3}
--------------------

Création de l’utilisateur nagios

~~~ {.code .bash}
cd /tmp
git clone git://github.com/naparuba/shinken.git
~~~

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
    source](shinken-debian-squeeze-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](shinken-debian-squeeze-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](shinken-debian-squeeze-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](shinken-debian-squeeze-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](shinken-debian-squeeze-install@do=media.html "Gestionnaire de médias")
-   [Index](shinken-debian-squeeze-install@do=index.html "Index [X]")
-   [Connexion](shinken-debian-squeeze-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](shinken-debian-squeeze-install.html#dokuwiki__top "Haut de page [T]")

shinken/shinken-debian-squeeze-install.txt · Dernière modification:
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

![](../lib/exe/indexer.php@id=shinken%253Ashinken-debian-squeeze-install&1424859529)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
