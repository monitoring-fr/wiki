---
layout: page
---

[[[Zabbix](start@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Zabbix](start.html "zabbix:start")

### Table des matières {.toggle}

-   [Zabbix](start.html#zabbix)
    -   [Présentation](start.html#presentation)
    -   [Documentation](start.html#documentation)
        -   [I - Zabbix](start.html#i-zabbix)
        -   [II - Installation](start.html#ii-installation)
        -   [III - Interface Web](start.html#iii-interface-web)
        -   [IV - Prise en main](start.html#iv-prise-en-main)
        -   [V - Expertise](start.html#v-expertise)
        -   [VI - Trucs & Astuces](start.html#vi-trucs-astuces)
        -   [VII - Suppléments](start.html#vii-supplements)

[![](../assets/media/supervision/zabbix_logo.png@w=200)](../_detail/supervision/zabbix_logo.png@id=zabbix%253Astart.html "supervision:zabbix_logo.png")

Zabbix {#zabbix .sectionedit1}
======

Dans ce dossier, figure une présentation des fonctionnalités de Zabbix,
ainsi qu’un ensemble de documentations et de tutoriels sur la mise en
place d’une architecture de supervision Zabbix.

Pour toutes questions, informations complémentaires sur Zabbix,
rendez-vous sur le
[forum](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/")
du site.

Présentation {#presentation .sectionedit2}
------------

Zabbix
([http://www.zabbix.com](http://www.zabbix.com "http://www.zabbix.com"))
est une solution de supervision open source. Ce logiciel permet de
superviser des réseaux, et de surveiller les statuts de différents
services, systèmes et réseaux.

Un peu similaire à Nagios, Zabbix utilise un système de templates pour
définir des hôtes à superviser, ce qui le rend très pratique pour la
définition de grosses infrastructures.

La partie serveur s’installe exclusivement sur Linux, quant à la partie
agent, elle est disponible sur de nombreux systèmes d’exploitation
(Windows, Linux, Solaris, FreeBSD, …etc, pour une liste plus complète
voir ‘lien’), offrant ainsi une solution adaptive. Comme beaucoup de
logiciels de supervision, Zabbix permet la notification par mail, et
offre un panel d’outils graphiques et même sonores (graphiques, alarmes,
…etc) pour une meilleure surveillance.

Un serveur Zabbix peut être décomposée en trois parties, tout d’abord,
l’application est composée d’une partie données, avec notamment l’usage
d’un serveur de base de données tels que MySQL, PostgreSQL, SQLite et
Oracle, permettant de stocker les informations sur les paramètres des
hôtes, des évènements, …etc. Ensuite, il y a un serveur de traitement,
soit Zabbix Server, gérant les différents outils de supervision et de
surveillance. Et pour finir, l’interface web pour configurer et
administrer Zabbix, c’est-à-dire Zabbix Frontend.

Documentation {#documentation .sectionedit3}
-------------

Cette documentation est découpée en plusieurs chapitres, suivant une
certaine logique de découverte et de compréhension de la solution
Zabbix.

### I - Zabbix {#i-zabbix .sectionedit4}

**[Introduction](zabbix-introduction.html "zabbix:zabbix-introduction")**

**[Fonctionnement](zabbix-work.html "zabbix:zabbix-work")**

**[Ressources et
performances](zabbix-resources.html "zabbix:zabbix-resources")**

### II - Installation {#ii-installation .sectionedit5}

**[Installation sur
Ubuntu](zabbix-ubuntu-install.html "zabbix:zabbix-ubuntu-install")**

1.  **[Installation depuis les
    dépôts](zabbix-ubuntu-install.html#installation-depuis-les-depots "zabbix:zabbix-ubuntu-install")**
2.  **[Installation depuis les
    sources](zabbix-ubuntu-install.html#installation-depuis-les-sources "zabbix:zabbix-ubuntu-install")**

**[Installation sur
Centos](zabbix-centos-install.html "zabbix:zabbix-centos-install")**

### III - Interface Web {#iii-interface-web .sectionedit6}

**[Interface Web](zabbix-interface.html "zabbix:zabbix-interface")**

1.  **[Monitoring](zabbix-interface.html#monitoring "zabbix:zabbix-interface")**
2.  **[Inventory](zabbix-interface.html#inventory "zabbix:zabbix-interface")**
3.  **[Reports](zabbix-interface.html#reports "zabbix:zabbix-interface")**
4.  **[Configuration](zabbix-interface.html#configuration "zabbix:zabbix-interface")**
5.  **[Administration](zabbix-interface.html#administration "zabbix:zabbix-interface")**

### IV - Prise en main {#iv-prise-en-main .sectionedit7}

**[Prise en main](zabbix-use.html "zabbix:zabbix-use")**

1.  **[Ajout d'un
    hôte](zabbix-use.html#ajout-d-un-hote "zabbix:zabbix-use")**
2.  **[Ajout d'un groupe
    d'hôtes](zabbix-use.html#ajout-d-un-groupe-d-hotes "zabbix:zabbix-use")**
3.  **[Ajout d'un
    template](zabbix-use.html#ajout-d-un-template "zabbix:zabbix-use")**
4.  **[Ajout d'un
    item](zabbix-use.html#ajout-d-un-item "zabbix:zabbix-use")**
5.  **[Ajout d'un
    trigger](zabbix-use.html#ajout-d-un-trigger "zabbix:zabbix-use")**
6.  **[Ajout d'une
    action](zabbix-use.html#ajout-d-une-action "zabbix:zabbix-use")**
7.  **[Ajout d'une période de
    maintenance](zabbix-use.html#ajout-d-une-periode-de-maintenance "zabbix:zabbix-use")**
8.  **[Ajout d'un scénario de surveillance
    Web](zabbix-use.html#ajout-d-un-scenario-de-surveillance-web "zabbix:zabbix-use")**
9.  **[Ajout d'un
    écran](zabbix-use.html#ajout-d-un-ecran "zabbix:zabbix-use")**
10. **[Ajout d'une
    carte](zabbix-use.html#ajout-d-un-carte "zabbix:zabbix-use")**
11. **[Ajout d'une règle de découverte
    d'équipements](zabbix-use.html#ajout-d-une-regle-de-decouverte-d-equipements "zabbix:zabbix-use")**
12. **[Ajout d'un
    utilisateur](zabbix-use.html#ajout-d-un-utilisateur "zabbix:zabbix-use")**
13. **[Ajout d'un groupe
    d'utilisateurs](zabbix-use.html#ajout-d-un-groupe-d-utilisateurs "zabbix:zabbix-use")**
14. **[Ajout d'un
    média](zabbix-use.html#ajout-d-un-media "zabbix:zabbix-use")**
15. **[Ajout d'un
    script](zabbix-use.html#ajout-d-un-script "zabbix:zabbix-use")**
16. **[Choix de la langue de
    l'interface](zabbix-use.html#choix-de-la-langue-de-l-interface "zabbix:zabbix-use")**

### V - Expertise {#v-expertise .sectionedit8}

**[Gestion des items](zabbix-item-use.html "zabbix:zabbix-item-use")**

**[Gestion des
triggers](zabbix-trigger-use.html "zabbix:zabbix-trigger-use")**

**[Gestion des
actions](zabbix-action-use.html "zabbix:zabbix-action-use")**

**[Optimisation](zabbix-optimization.html "zabbix:zabbix-optimization")**

**[Architectures
distribuées](zabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture")**

**[Découverte
d'équipements](zabbix-discovery.html "zabbix:zabbix-discovery")**

### VI - Trucs & Astuces {#vi-trucs-astuces .sectionedit9}

**[Notification par
sms](zabbix-sms-notification.html "zabbix:zabbix-sms-notification")**

**[Notification par
email](zabbix-email-notification.html "zabbix:zabbix-email-notification")**

**[Superviser un hôte
SNMP](zabbix-snmp-host.html "zabbix:zabbix-snmp-host")**

**[Installation Zabbix 1.4.2 sur Ubuntu
8.04](zabbix-ubuntu-install-old.html "zabbix:zabbix-ubuntu-install-old")**

**[Catalogue des erreurs](zabbix-errors.html "zabbix:zabbix-errors")**

### VII - Suppléments {#vii-supplements .sectionedit10}

**[La supervision en général sur le wiki
Monitoring-fr](../supervision/start.html "supervision:start")**

-   [Commandes pour la
    supervision](../supervision/commands.html "supervision:commands")
-   [Dstat](../supervision/dstat.html "supervision:dstat")
-   [Installer ou activer
    SNMP](../supervision/snmp-install.html "supervision:snmp-install")
-   [Mode actif](../supervision/actif.html "supervision:actif")
-   [Mode passif](../supervision/passif.html "supervision:passif")
-   [Ntop](../supervision/ntop/start.html "supervision:ntop:start")
-   [Panorama](../supervision/links.html "supervision:links")
-   [RRDTool](../supervision/rrdtool.html "supervision:rrdtool")
-   [SNMP](../supervision/snmp.html "supervision:snmp")
-   [Supervision Hardware
    IPMI](../supervision/ipmi.html "supervision:ipmi")
-   [Supervision du ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Tableaux récapitulatifs des différents fichiers
    importants](../supervision/important-files.html "supervision:important-files")

**[Le wiki officiel de
Zabbix](http://www.zabbix.com/wiki/start "http://www.zabbix.com/wiki/start")**

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](start.html "zabbix:start")
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

Zabbix {#zabbix .sectionedit1}
------

-   [Introduction](zabbix-introduction.html "zabbix:zabbix-introduction")
-   [Fonctionnement](zabbix-work.html "zabbix:zabbix-work")
-   [Ressources et
    performances](zabbix-resources.html "zabbix:zabbix-resources")
-   [Installation sur
    Ubuntu](zabbix-ubuntu-install.html "zabbix:zabbix-ubuntu-install")
-   [Interface Web](zabbix-interface.html "zabbix:zabbix-interface")
-   [Prise en main](zabbix-use.html "zabbix:zabbix-use")
-   [Gestion des items](zabbix-item-use.html "zabbix:zabbix-item-use")
-   [Gestion des
    triggers](zabbix-trigger-use.html "zabbix:zabbix-trigger-use")
-   [Gestion des
    actions](zabbix-action-use.html "zabbix:zabbix-action-use")
-   [Optimisation](zabbix-optimization.html "zabbix:zabbix-optimization")
-   [Architectures
    distribuées](zabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture")
-   [Découverte
    d'équipements](zabbix-discovery.html "zabbix:zabbix-discovery")
-   [Notification par
    email](zabbix-email-notification.html "zabbix:zabbix-email-notification")
-   [Superviser un hôte
    SNMP](zabbix-snmp-host.html "zabbix:zabbix-snmp-host")
-   [Catalogue des erreurs](zabbix-errors.html "zabbix:zabbix-errors")

-   [Afficher le texte
    source](start@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](start@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](start@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](start@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](start@do=media.html "Gestionnaire de médias")
-   [Index](start@do=index.html "Index [X]")
-   [Connexion](start@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](start.html#dokuwiki__top "Haut de page [T]")

zabbix/start.txt · Dernière modification: 2013/03/29 09:39 (modification
externe)

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

![](../lib/exe/indexer.php@id=zabbix%253Astart&1424859529)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
