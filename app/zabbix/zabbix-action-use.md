---
layout: page
---

[[[Gestion des actions dans
Zabbix](zabbix-action-use@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Zabbix](start.html "zabbix:start") » [Gestion des actions dans
Zabbix](zabbix-action-use.html "zabbix:zabbix-action-use")

### Table des matières {.toggle}

-   [Gestion des actions dans
    Zabbix](zabbix-action-use.html#gestion-des-actions-dans-zabbix)
    -   [Présentation](zabbix-action-use.html#presentation)
    -   [Définition d'une
        action](zabbix-action-use.html#definition-d-une-action)
    -   [Création d'une
        action](zabbix-action-use.html#creation-d-une-action)
    -   [Edition d'une
        action](zabbix-action-use.html#edition-d-une-action)
    -   [Suppression d'une
        action](zabbix-action-use.html#suppression-d-une-action)

Gestion des actions dans Zabbix {#gestion-des-actions-dans-zabbix .sectionedit1}
===============================

Tutoriel rédigé pour une version Ubuntu 8.04/10.04 LTS et Zabbix 1.8.2.

Dans ce tutoriel, nous allons décrire et présenter l’utilisation et la
gestion des actions dans Zabbix.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

en cours

Présentation {#presentation .sectionedit3}
------------

Pour les alertes, Zabbix utilise les éléments actions pour générer des
notifications. On peut donc dire que pour Zabbix : action = alerte =
notification.

Définition d'une action {#definition-d-une-action .sectionedit4}
-----------------------

Liste des principaux paramètres (ou attributs) composant une action :

  **Paramètre**              **Description**
  -------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **`Name`**                 Correspond au nom du trigger. Le nom peut contenir des macros, généralement il est similaire à l’item auquel il est rattaché
  **`Event source`**         `Expression` permet de renseigner l’expression logique utilisée pour le calcul de l’état du trigger. C’est en quelque sorte la condition qui doit permettre au trigger de déclencher un évènement
  **`Enable escalations`**   Ce champs est utilisé pour lister les dépendances éventuelles avec d’autres triggers
  **`Period (seconds)`**     Permet d’ajouter une dépendance avec un trigger
  **`Default subject`**      L’option Normal du champs `Event generation` permet de générer des évènements normallement, c’est-à-dire à chaque changement de statuts (PROBLEM/UNKNOW/OK). Quant à l’option Normal + Multiple PROBLEM events, elle est utilisée pour générer des évènements sur tous les statuts de type PROBLEM d’un trigger
  **`Default message`**      Indique la sévérité (criticité) du trigger
  **`Recovery message`**     Le champs `Comments` est utile pour préciser certaines informations sur le trigger comme sa fonction, les diverses solutions pour résoudre les problèmes le concernant, …etc
  **`Recovery subject`**     Si ce champs n’est pas vide, cet `URL` est alors utilisé dans l’écran Status of Triggers
  **`Recovery message`**     Permet de désactiver un trigger
  **`Status`**               Indique si l’action est activée

Création d'une action {#creation-d-une-action .sectionedit6}
---------------------

Edition d'une action {#edition-d-une-action .sectionedit7}
--------------------

Suppression d'une action {#suppression-d-une-action .sectionedit8}
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
    source](zabbix-action-use@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](zabbix-action-use@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](zabbix-action-use@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](zabbix-action-use@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](zabbix-action-use@do=media.html "Gestionnaire de médias")
-   [Index](zabbix-action-use@do=index.html "Index [X]")
-   [Connexion](zabbix-action-use@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](zabbix-action-use.html#dokuwiki__top "Haut de page [T]")

zabbix/zabbix-action-use.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=zabbix%253Azabbix-action-use&1424859531)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
