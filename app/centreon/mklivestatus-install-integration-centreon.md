---
layout: page
---

[[[Installation MKLivestatus & Intégration dans
Centreon](mklivestatus-install-integration-centreon@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Centreon](start.html "centreon:start") » [Installation MKLivestatus &
Intégration dans
Centreon](mklivestatus-install-integration-centreon.html "centreon:mklivestatus-install-integration-centreon")

### Table des matières {.toggle}

-   [Installation MKLivestatus & Intégration dans
    Centreon](mklivestatus-install-integration-centreon.html#installation-mklivestatus-integration-dans-centreon)
    -   -   [Installation](mklivestatus-install-integration-centreon.html#installation)
        -   [Intégration dans
            Centreon](mklivestatus-install-integration-centreon.html#integration-dans-centreon)

Installation MKLivestatus & Intégration dans Centreon {#installation-mklivestatus-integration-dans-centreon .sectionedit1}
=====================================================

### Installation {#installation .sectionedit2}

Nous allons installer MKLiveStatus via les sources.

~~~ {.code .bash}
cd /tmp
wget http://mathias-kettner.de/download/mk-livestatus-1.1.3.tar.gz
tar -xvzf mk-livestatus-1.1.3.tar.gz
cd mk-livestatus-1.1.3
~~~

~~~ {.code .bash}
./configure
~~~

~~~ {.code .bash}
make
~~~

On copie le fichier livestatus.o dans le répertoire bin de Nagios.

~~~ {.code .bash}
cp src/livestatus.o /usr/local/nagios/bin/
~~~

### Intégration dans Centreon {#integration-dans-centreon .sectionedit3}

-   **Le module de courtage MKLiveStatus doit être installé. (cf
    procédure [Installation MKLivestatus & Intégration dans
    Centreon](mklivestatus-install-integration-centreon.html "centreon:mklivestatus-install-integration-centreon")**
    )

-   **Le patch Multi Broker pour Centreon doit être installé pour les
    versions de Centreon inférieures à 2.2. (cf procédure [Installation
    du patch Multi Broker pour
    Centreon](multi-broker-patch-install.html "centreon:multi-broker-patch-install")**
    )

Dans Centreon, allez dans **Configuration –\> Nagios –\> nagios.cfg**,
éditer le *Nagios CFG 1* et ajoutez le broker module livestatus comme
ci-dessous :

[![](../assets/media/powered/centreon/config_centreon_multi-broker1-1.png@w=700)](../_detail/powered/centreon/config_centreon_multi-broker1-1.png@id=centreon%253Amklivestatus-install-integration-centreon.html "powered:centreon:config_centreon_multi-broker1-1.png")

[![](../assets/media/powered/centreon/fleche_bas_vert.png@w=100)](../_detail/powered/centreon/fleche_bas_vert.png@id=centreon%253Amklivestatus-install-integration-centreon.html "powered:centreon:fleche_bas_vert.png")

[![](../assets/media/powered/centreon/config_centreon_multi-broker3-1.png@w=700)](../_detail/powered/centreon/config_centreon_multi-broker3-1.png@id=centreon%253Amklivestatus-install-integration-centreon.html "powered:centreon:config_centreon_multi-broker3-1.png")

*\* /usr/local/nagios/bin/livestatus.o /usr/local/nagios/var/rw/live*

Et Sauvegardez.

Pour finir, Repoussez la configuration à l’aide de l’interface Centreon.

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](start.html "centreon:start")
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

Centreon {#centreon .sectionedit1}
--------

-   [Documentation Technique sur
    Centreon](centreon-doc-technique.html "centreon:centreon-doc-technique")
-   [Installation MKLivestatus & Intégration dans
    Centreon](mklivestatus-install-integration-centreon.html "centreon:mklivestatus-install-integration-centreon")
-   [Installation Nagios / Centreon sur RedHat
    EL](centreon-redhat-install.html "centreon:centreon-redhat-install")
-   [Installation de Centreon 2.1 sur CentOS
    5.3](centreon-centos-install.html "centreon:centreon-centos-install")
-   [Installation de Centreon 2.2 sur Ubuntu Server
    10.04](centreon-ubuntu-install.html "centreon:centreon-ubuntu-install")
-   [Installation de Centreon Enterprise
    Server](centreon-enterprise-server.html "centreon:centreon-enterprise-server")
-   [Installation de Shinken sur Centreon Enterprise
    Server](centreon-enterprise-server-shinken.html "centreon:centreon-enterprise-server-shinken")
-   [Installation du patch multi-broker pour
    Centreon](multi-broker-patch-install.html "centreon:multi-broker-patch-install")
-   [Intégrer Nagvis dans
    Centreon](integration-nagvis.html "centreon:integration-nagvis")
-   [Manuel d'utilisation
    Centreon](manuel-utilisation/start.html "centreon:manuel-utilisation:start")
-   [Nagios Centreon
    part1](nagios-centreon-part1.html "centreon:nagios-centreon-part1")
-   [Nagios Centreon
    part2](nagios-centreon-part2.html "centreon:nagios-centreon-part2")
-   [Présentation de l'interface Centreon 2.1 et de son
    utilisation](centreon-interface-utilisation.html "centreon:centreon-interface-utilisation")
-   [Superviser le spanning-tree sous
    Centreon/Nagios](superviser-spanning-tree.html "centreon:superviser-spanning-tree")
-   [Superviser un Autocom OXE V9.x Alcatel-Lucent sous
    Centreon/Nagios](superviser-oxe-alcatel.html "centreon:superviser-oxe-alcatel")
-   [Tableau de correspondance des
    plugins](tableau-correspondance-plugins.html "centreon:tableau-correspondance-plugins")

-   [Afficher le texte
    source](mklivestatus-install-integration-centreon@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](mklivestatus-install-integration-centreon@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](mklivestatus-install-integration-centreon@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](mklivestatus-install-integration-centreon@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](mklivestatus-install-integration-centreon@do=media.html "Gestionnaire de médias")
-   [Index](mklivestatus-install-integration-centreon@do=index.html "Index [X]")
-   [Connexion](mklivestatus-install-integration-centreon@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](mklivestatus-install-integration-centreon.html#dokuwiki__top "Haut de page [T]")

centreon/mklivestatus-install-integration-centreon.txt · Dernière
modification: 2013/03/29 09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=centreon%253Amklivestatus-install-integration-centreon&1424859526)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
