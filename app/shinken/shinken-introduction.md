---
layout: page
---

[[[Introduction à Shinken](shinken-introduction@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Shinken](start.html "shinken:start") » [Introduction à
Shinken](shinken-introduction.html "shinken:shinken-introduction")

### Table des matières {.toggle}

-   [Introduction à
    Shinken](shinken-introduction.html#introduction-a-shinken)
    -   [Présentation](shinken-introduction.html#presentation)
    -   [Historique](shinken-introduction.html#historique)
    -   [Fonctionnalités](shinken-introduction.html#fonctionnalites)
    -   [Références](shinken-introduction.html#references)

Introduction à Shinken {#introduction-a-shinken .sectionedit1}
======================

Page rédigée pour une version de Shinken 0.4.

Sur cette page, nous allons présenter et décrire les principales
fonctionnalités de Shinken.

Sources : site et wiki officiels de
[Shinken](http://www.shinken-monitoring.org/ "http://www.shinken-monitoring.org/").

Cette page a été rédigée par :

  **Rôle**        **Nom**
  --------------- ------------------
  **Rédacteur**   Romuald FRONTEAU

Présentation {#presentation .sectionedit3}
------------

Le projet Shinken consiste en une refonte complète du cœur de Nagios en
Python, lui apportant une nouvelle architecture plus souple et plus
facile à maintenir que le daemon monolithique actuel. Se basant sur une
vue Unix, l’architecture se compose de daemons simples qui coopèrent
afin de proposer les mêmes fonctionnalités que Nagios, voir plus.

Ainsi en se basant sur la configuration actuelle de Nagios, ainsi que
ses innombrables sondes, Shinken est capable de remplacer Nagios dans la
supervision classique :

-   vérifications des états SOFT/HARD
-   gestion des dépendances réseaux et logiques (applicatives)
-   gestion des actions correctrices
-   supervision active et passive
-   vérification de la fraicheur des informations dans le cadre de la
    supervision passive

Mais il est également possible d’obtenir bien plus qu’un Nagios standard
:

-   supervision distribuée hautement disponible très facile à mettre en
    place, et de manière intégrée à la configuration globale
-   gestion des noms en UTF-8
-   presque 5 fois plus de performances que le Nagios classique
-   Multiplateforme : tourne nativement sur GNU/Linux et Windows. Il est
    même possible de mixer les deux dans une même architecture!

Le nom est inspiré des sabres Shinken japonais qui sont les armes les
plus coupantes des guerriers. Le programme permet en effet de couper
automatiquement la configuration des administrateurs et ce
intelligemment (enfin au moins il essaie).

Historique {#historique .sectionedit4}
----------

Au commencement, Jean Gabès travailla sur la publication de son livre
“Nagios pour la Supervision et la métrologie”. Lors de la publication de
son livre en Mai 2009, Jean a commencé à se poser la question de Nagios
et les performances ? Jean Gabès repris son livre et identifia les
points bloquants de Nagios dans les grands environnements. Il se lança
sur un principe de Proof of Concept codé en Python car il recherchait un
minimum d’effort pour un maximum de résultat.

Durant tout l’été 2009, Jean Gabès s’attela à coder ses idées et se rend
compte que ce qu’il a produit est plus facilement maintenable que le
code C de Nagios mais aussi qu’il a décuplé les performances.

En octobre 2009, Jean propose son POC sur la mailing-list du projet
Nagios mais le changement de langage n’emballe pas et Ethan Galstad ne
répond même pas à sa proposition. N’ayant aucun espoir que son POC soit
pris dans la roadmap du développement de Nagios, Jean décida de lancer
Shinken en tant que Projet à part entière.

En fin avril 2010, le projet Shinken sort sa première version 0.1 sous
le nom de “Anemic Alligator”.

En fin aout 2010, la version 0.2 sort sous le nom “Bold Badger”

En début octobre 2010, la version 0.3 sort sous le nom de “Crappy
Caribou”

Début décembre 2010, la version 0.4 sort sous le nom “Decadent
Dragonfly”, et est la première version à être installable en production.

Fonctionnalités {#fonctionnalites .sectionedit5}
---------------

**Répartition de charge**

Possibilité de pondérer le découpage de la configuration

**Haute disponibilité**

Minimise le temps d’indisponibilité en ne rattachant aucune
configuration à un hôte physique

**Multi plateforme**

Compatible sur toutes les plateformes où Python est installable
(Windows, Linux, Solaris, FreeBSD, Android, …

**Simple de migration Nagios vers Shinken**

La migration de Nagios vers Shinken ne prend que quelques minutes

**Compatible Nagios Configuration et plugins**

**Pas seulement Open Source, il est libre**

Shinken est sous licence [AGPL
v3](http://www.gnu.org/licenses/agpl.html "http://www.gnu.org/licenses/agpl.html")

Références {#references .sectionedit7}
----------

Voici une liste non-exhaustive des principales entreprises ayant recours
à Shinken :

  **Nom**   **Pays**
  --------- ----------
            

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
    source](shinken-introduction@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](shinken-introduction@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](shinken-introduction@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](shinken-introduction@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](shinken-introduction@do=media.html "Gestionnaire de médias")
-   [Index](shinken-introduction@do=index.html "Index [X]")
-   [Connexion](shinken-introduction@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](shinken-introduction.html#dokuwiki__top "Haut de page [T]")

shinken/shinken-introduction.txt · Dernière modification: 2013/03/29
09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=shinken%253Ashinken-introduction&1424859528)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
