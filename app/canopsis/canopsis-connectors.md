---
layout: page
---

[[[Liste des connecteurs
Canopsis](canopsis-connectors@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Canopsis](start.html "canopsis:start") » [Liste des connecteurs
Canopsis](canopsis-connectors.html "canopsis:canopsis-connectors")

### Table des matières {.toggle}

-   [Liste des connecteurs
    Canopsis](canopsis-connectors.html#liste-des-connecteurs-canopsis)
    -   [Connecteur Nagios /
        Icinga](canopsis-connectors.html#connecteur-nagiosicinga)
    -   [Connecteur
        Shinken](canopsis-connectors.html#connecteur-shinken)
    -   [Connecteur
        SNMPTraps](canopsis-connectors.html#connecteur-snmptraps)
    -   [Connecteur
        Collectd](canopsis-connectors.html#connecteur-collectd)

Liste des connecteurs Canopsis {#liste-des-connecteurs-canopsis .sectionedit1}
==============================

Panorama des connecteurs disponibles pour Canopsis.

Par défaut, Canopsis est capable de traiter toutes les données remontées
par AMQP. Néanmoins, certaines applications ne sont pas compatibles avec
le protocole AMQP, c’est pourquoi il existe certains connecteurs qui
permettent de réaliser une conversion des données et de les envoyer vers
Canopsis au bon format.

Vous possèdez une application qui ne possède pas encore d’un connecteur
? Selon les applications, il est parfois simple de réaliser un
connecteur pour Canopsis par vous même, grâce à la documentaton présente
sur la
[forge](http://forge.canopsis.org/projects/canopsis/issues "http://forge.canopsis.org/projects/canopsis/issues")
Canopsis. Vous pouvez également vous rendre sur le
[forum](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/")
de Monitoring-fr ou sinon sur le
[ideascale](http://canopsis.ideascale.com/ideascale "http://canopsis.ideascale.com/ideascale")
du projet Canopsis, pour respectivement discuter et/ou soumettre vos
besoins.

Connecteur Nagios / Icinga {#connecteur-nagiosicinga .sectionedit2}
--------------------------

Si vous posséder un serveur (ou plusieurs) de supervision de type
Nagios, vous pouvez installer un connecteur sous la forme d’un “Event
broker” (c’est-à-dire un NEB ⇒ Nagios Event Broker) afin de remonter les
données de votre supervision vers l’hyperviseur Canopsis. Ce NEB permet
tout simplement d’envoyer un flux AMQP des évènements remontés par
Nagios.

Connecteur Shinken {#connecteur-shinken .sectionedit3}
------------------

Connecteur en cours de développement

Connecteur SNMPTraps {#connecteur-snmptraps .sectionedit4}
--------------------

Si vous avez des éléments de votre SI vous remontent des traps SNMP
(réussite de sauvegarde, jobs d’ordonnancement, alerte sur les
équipements de stockage, …), avec le connecteur de Traps SNMP. Ce
connecteur permet d’envoyer un flux AMQP pour chaque Traps SNMP
interceptées par le démon snmptrapd .

**[Installation du connecteur
SNMPTraps](http://wiki.monitoring-fr.org/canopsis/canopsis-snmptrap-connector "canopsis:canopsis-snmptrap-connector")**

Connecteur Collectd {#connecteur-collectd .sectionedit5}
-------------------

Connecteur en cours de développement

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
    source](canopsis-connectors@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](canopsis-connectors@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](canopsis-connectors@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](canopsis-connectors@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](canopsis-connectors@do=media.html "Gestionnaire de médias")
-   [Index](canopsis-connectors@do=index.html "Index [X]")
-   [Connexion](canopsis-connectors@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](canopsis-connectors.html#dokuwiki__top "Haut de page [T]")

canopsis/canopsis-connectors.txt · Dernière modification: 2013/03/29
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

![](../lib/exe/indexer.php@id=canopsis%253Acanopsis-connectors&1424859804)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
