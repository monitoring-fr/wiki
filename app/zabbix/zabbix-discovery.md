---
layout: page
---

[[[Découverte d'équipements dans
Zabbix](zabbix-discovery@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Zabbix](start.html "zabbix:start") » [Découverte d'équipements dans
Zabbix](zabbix-discovery.html "zabbix:zabbix-discovery")

### Table des matières {.toggle}

-   [Découverte d'équipements dans
    Zabbix](zabbix-discovery.html#decouverte-d-equipements-dans-zabbix)
    -   [Présentation](zabbix-discovery.html#presentation)
    -   [Fonctionnement](zabbix-discovery.html#fonctionnement)
    -   [Définition d'une règle de
        découverte](zabbix-discovery.html#definition-d-une-regle-de-decouverte)

Découverte d'équipements dans Zabbix {#decouverte-d-equipements-dans-zabbix .sectionedit1}
====================================

Tutoriel rédigé pour une version Ubuntu 10.04 LTS et Zabbix 1.8.3.

Dans ce tutoriel, nous allons décrire et présenter le fonctionnement et
l’utilisation de la fonction d’auto-découverte (discovery) d’équipements
de Zabbix.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

en cours

Présentation {#presentation .sectionedit3}
------------

Fonctionnement {#fonctionnement .sectionedit4}
--------------

Définition d'une règle de découverte {#definition-d-une-regle-de-decouverte .sectionedit5}
------------------------------------

Liste des principaux paramètres (ou attributs) composant une règle de
découverte :

  **Paramètre**                      **Description**
  ---------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **`Name`**                         Correspond au nom de la règle
  **`IP range`**                     Plage des adresses IP pour la découverte peut être : une adresse IP unique, une plage d’adresses (ex: 192.168.1.1-254), une liste (ex: 192.168.4.1-254,192.168.2.1-100,192.168.2.200,192.168.1.0/24) ou bien une adresse de réseau avec son masque (ex: 192.168.1.0/24)
  **`Delay (in sec)`**               Ce champs indique le délai entre chaque exécution de la règle
  **`Checks`**                       Précise les checks réalisés pour la découverte (ex: ICMP Ping, SNMP, …)
  **`Device uniqueness criteria`**   Définit le critère d’unicité des périphériques
  **`Status`**                       Indique si la règle est active ou pas

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
    source](zabbix-discovery@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](zabbix-discovery@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](zabbix-discovery@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](zabbix-discovery@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](zabbix-discovery@do=media.html "Gestionnaire de médias")
-   [Index](zabbix-discovery@do=index.html "Index [X]")
-   [Connexion](zabbix-discovery@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](zabbix-discovery.html#dokuwiki__top "Haut de page [T]")

zabbix/zabbix-discovery.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=zabbix%253Azabbix-discovery&1424859530)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
