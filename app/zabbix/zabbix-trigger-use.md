---
layout: page
---

[[[Gestion des triggers dans
Zabbix](zabbix-trigger-use@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Zabbix](start.html "zabbix:start") » [Gestion des triggers dans
Zabbix](zabbix-trigger-use.html "zabbix:zabbix-trigger-use")

### Table des matières {.toggle}

-   [Gestion des triggers dans
    Zabbix](zabbix-trigger-use.html#gestion-des-triggers-dans-zabbix)
    -   [Présentation](zabbix-trigger-use.html#presentation)
    -   [Définition d'un
        trigger](zabbix-trigger-use.html#definition-d-un-trigger)
    -   [Création d'un
        trigger](zabbix-trigger-use.html#creation-d-un-trigger)
    -   [Edition d'un
        trigger](zabbix-trigger-use.html#edition-d-un-trigger)
    -   [Suppression d'un
        trigger](zabbix-trigger-use.html#suppression-d-un-trigger)

Gestion des triggers dans Zabbix {#gestion-des-triggers-dans-zabbix .sectionedit1}
================================

Tutoriel rédigé pour une version Ubuntu 8.04/10.04 LTS et Zabbix 1.8.2.

Dans ce tutoriel, nous allons décrire et présenter l’utilisation et la
gestion des triggers dans Zabbix.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

en cours

Présentation {#presentation .sectionedit3}
------------

Dans Zabbix, les triggers (ou déclencheurs en français) ont pour rôle de
générer (déclencher) des évènements en réaction à une certaine valeur ou
donnée remontée par un item.

Les évènements dans Zabbix ne sont pas des alertes à proprement parlé,
en fait, ce sont des éléments indiquant le statut d’un item (selon les
conditions choisies) sous le forme d’un état de type WARNING (=
problème), UNKNOW (= inconnu) ou OK (= tout va bien). Pour les alertes,
Zabbix utilise les éléments actions pour générer des notifications à
partir du statut d’un trigger (évènement).

On peut donc résumer ces deux notions de la manière suivante :

-   pour les triggers (à partir d’un item) :

**trigger = évènement = statut**

-   pour les actions (à partir d’un trigger) :

**action = alerte = notification**

Un trigger est donc une fonction importante du processus d’alerte de
Zabbix, car sans évènement et donc le statut d’un item, il n’y aurait
pas d’alerte (ou notification).

Pour plus d’information sur le **[système
d'alerte](zabbix-work.html#systeme-d-alerte "zabbix:zabbix-work")** de
Zabbix.

Définition d'un trigger {#definition-d-un-trigger .sectionedit4}
-----------------------

Liste des principaux paramètres (ou attributs) définissant un trigger :

  **Paramètre**                  **Description**
  ------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **`Name`**                     Correspond au nom du trigger. Le nom peut contenir des macros, généralement il est similaire à l’item auquel il est rattaché
  **`Expression`**               `Expression` permet de renseigner l’expression logique utilisée pour le calcul de l’état du trigger. C’est en quelque sorte la condition qui doit permettre au trigger de déclencher un évènement
  **`The trigger depends on`**   Ce champs est utilisé pour lister les dépendances éventuelles avec d’autres triggers
  **`New dependency`**           Permet d’ajouter une dépendance avec un trigger
  **`Event generation`**         L’option Normal du champs `Event generation` permet de générer des évènements normallement, c’est-à-dire à chaque changement de statuts (PROBLEM/UNKNOW/OK). Quant à l’option Normal + Multiple PROBLEM events, elle est utilisée pour générer des évènements sur tous les statuts de type PROBLEM d’un trigger
  **`Severity`**                 Indique la sévérité (criticité) du trigger
  **`Comments`**                 Le champs `Comments` est utile pour préciser certaines informations sur le trigger comme sa fonction, les diverses solutions pour résoudre les problèmes le concernant, …etc
  **`URL`**                      Si ce champs n’est pas vide, cet `URL` est alors utilisé dans l’écran Status of Triggers
  **`Disabled`**                 Permet de désactiver un trigger

Création d'un trigger {#creation-d-un-trigger .sectionedit6}
---------------------

Edition d'un trigger {#edition-d-un-trigger .sectionedit7}
--------------------

Suppression d'un trigger {#suppression-d-un-trigger .sectionedit8}
------------------------

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
    source](zabbix-trigger-use@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](zabbix-trigger-use@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](zabbix-trigger-use@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](zabbix-trigger-use@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](zabbix-trigger-use@do=media.html "Gestionnaire de médias")
-   [Index](zabbix-trigger-use@do=index.html "Index [X]")
-   [Connexion](zabbix-trigger-use@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](zabbix-trigger-use.html#dokuwiki__top "Haut de page [T]")

zabbix/zabbix-trigger-use.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=zabbix%253Azabbix-trigger-use&1424859530)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
