---
layout: page
---

[[[Fonctionnement de Canopsis](canopsis-work@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Canopsis](start.html "canopsis:start") » [Fonctionnement de
Canopsis](canopsis-work.html "canopsis:canopsis-work")

### Table des matières {.toggle}

-   [Fonctionnement de
    Canopsis](canopsis-work.html#fonctionnement-de-canopsis)
    -   [Composants](canopsis-work.html#composants)
        -   [AMQP](canopsis-work.html#amqp)
        -   [MongoDB](canopsis-work.html#mongodb)
        -   [ExtJS](canopsis-work.html#extjs)
        -   [Python](canopsis-work.html#python)
    -   [Interactions](canopsis-work.html#interactions)
    -   [Architecture](canopsis-work.html#architecture)

Fonctionnement de Canopsis {#fonctionnement-de-canopsis .sectionedit1}
==========================

En cours de rédaction…

Documentation rédigée pour une version stable de Canopsis.

Sur cette page, nous allons présenter et décrire comment Canopsis
fonctionne, avec ses différentes interactions et son architecture. Le
tout illustré par des schémas afin d’essayer d’en faciliter la
compréhension.

Cette page a été rédigée par :

  **Rôle**              **Nom**
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**         [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")
  **Contributeur(s)**   William PAIN, Olivier JAN, Romuald FRONTEAU

Composants {#composants .sectionedit3}
----------

### AMQP {#amqp .sectionedit4}

![](../assets/media/canopsis/amqp-logo.png@w=200)L’[AMQP](http://www.amqp.org/ "http://www.amqp.org/")
est un protocole de message inter-applicatifs qui a pour but de
standardiser les formats de messages entre les différentes applications
dans une couche de transport normalisée. Des éditeurs comme IBM qui
utilise déjà depuis quelques années cette technologie avec Websphere MQ,
ex-MQSeries se trouve aujourd’hui en concurrence avec ce protocole
ouvert. Il est beaucoup utilisé dans les projets de grandes envergures
où le nombre de messages transitant est pharamineux (ex : ERP,
transaction bancaire, …).

### MongoDB {#mongodb .sectionedit5}

![](../assets/media/canopsis/logo-mongodb.png@w=200)[MongoDB](http://www.mongodb.org "http://www.mongodb.org")
est une base NoSQL classée dans la catégorie des technologies Big Data.
Issues des problématiques du Web 2.0 (Moteur de recherche, réseaux
sociaux, …), les bases Big Data sont prévues pour stocker des Pétaoctets
de données sans problématique de restitution.

### ExtJS {#extjs .sectionedit6}

![](../assets/media/canopsis/selection_330.png@w=200)[ExtJS](http://www.sencha.com/products/extjs "http://www.sencha.com/products/extjs")
est une API de type REST beaucoup utilisée dans le cadre du web 2.0. Il
possède l’avantage de très bien s’associer dans la combinaison MongoDB
–\> JSON –\> EXTJS.

### Python {#python .sectionedit7}

![](../assets/media/canopsis/python-logo.gif@w=200)Le coeur de la solution est
développé en [Python](http://www.python.org/ "http://www.python.org/")
car ce langage de programmation a su faire ces preuves, il est simple à
prendre en main et il possède une multitude de librairies. Et ça tombe
bien, il y en a pour AMQP, json, Mongo ce qui permet de simplifier le
dialogue des différentes briques de l’architecture … On retrouve encore
ce désir de simplicité …

Interactions {#interactions .sectionedit8}
------------

Architecture {#architecture .sectionedit9}
------------

![](../assets/media/canopsis/schema_architecture_canopsis.png@w=700)

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
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

-   [Canopsis](start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

-   [Afficher le texte
    source](canopsis-work@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](canopsis-work@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](canopsis-work@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](canopsis-work@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](canopsis-work@do=media.html "Gestionnaire de médias")
-   [Index](canopsis-work@do=index.html "Index [X]")
-   [Connexion](canopsis-work@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](canopsis-work.html#dokuwiki__top "Haut de page [T]")

canopsis/canopsis-work.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=canopsis%253Acanopsis-work&1424859804)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
