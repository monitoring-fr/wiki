---
layout: page
---

[[[Nagios Addons](start@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Addons](start.html "nagios:addons:start")

### Table des matières {.toggle}

-   [Nagios Addons](start.html#nagios-addons)
    -   [Addons officiels](start.html#addons-officiels)
    -   [Pour la collecte et le transport des
        données](start.html#pour-la-collecte-et-le-transport-des-donnees)
    -   [Pour la métrologie](start.html#pour-la-metrologie)
        -   [Qu'est-ce que les données de performance
            ?](start.html#qu-est-ce-que-les-donnees-de-performance)
    -   [Amélioration des
        interfaces](start.html#amelioration-des-interfaces)
        -   [Interfaces
            d'administration](start.html#interfaces-d-administration)
        -   [Interfaces
            d'exploitation](start.html#interfaces-d-exploitation)
    -   [Reporting](start.html#reporting)

Nagios Addons {#nagios-addons .sectionedit1}
=============

Un addon dans le jargon Nagios est un programme complémentaire prévu
pour fonctionner avec Nagios qui ajoute ou complète les fonctionnalités
existantes de Nagios. La différence fondamentale avec les logiciels qui
peuvent s’intégrer avec Nagios mais qui ont une “existence” autonome
^[1)](start.html#fn__1)^ en dehors de celui-ci est que le addon ne sert
à rien sans Nagios.

Parmi les addons les plus connus, recommandés, utilisés, il est possible
de noter:

Addons officiels {#addons-officiels .sectionedit2}
----------------

-   [Protocole NSCA](nsca.html "nagios:addons:nsca")
-   [Protocole NRPE](nrpe.html "nagios:addons:nrpe")
-   [NDOUtils](ndoutils.html "nagios:addons:ndoutils")
    -   [Requêtage SQL de la base
        NDO](ndoutils/sql-request.html "nagios:addons:ndoutils:sql-request")

Pour la collecte et le transport des données {#pour-la-collecte-et-le-transport-des-donnees .sectionedit3}
--------------------------------------------

-   [NSClient++](nsclient.html "nagios:addons:nsclient")
-   [Nagios Event
    Log](http://wiki.monitoring-fr.org/nagios/addons/nagios-event-log "nagios:addons:nagios-event-log")
-   [check\_mk](check_mk/start.html "nagios:addons:check_mk:start")
-   [Merlin](../../addons/merlin.html "nagios:addons:merlin")
-   [NDOUtils](ndoutils.html "nagios:addons:ndoutils")
-   [Setup distribué avec
    Mod\_Gearman](mod_gearman.html "nagios:addons:mod_gearman")

Pour la métrologie {#pour-la-metrologie .sectionedit4}
------------------

Ces addons permettent la génération de graphiques à partir des données
de performance de Nagios.

### Qu'est-ce que les données de performance ? {#qu-est-ce-que-les-donnees-de-performance .sectionedit5}

Les données de performance sont les valeurs que renvoient un [plugin
bien
écrit](http://nagiosplug.sourceforge.net/developer-guidelines.html#AEN201 "http://nagiosplug.sourceforge.net/developer-guidelines.html#AEN201")
après le symbole du pipe “|”. Prenons l’exemple de check\_icmp et de la
sortie du plugin

~~~
 OK - 127.0.0.1: rta 2.687ms, lost 0% | rta=2.687ms;3000.000;5000.000;0; pl=0%;80;100;;
~~~

Ce qui donne la sortie qui sera affichée dans l’interface web de Nagios
à gauche du pipe

~~~
 OK - 127.0.0.1: rta 2.687ms, lost 0%
~~~

et la sortie des données de performance à la droite du pipe

~~~
  rta=2.687ms;3000.000;5000.000;0; pl=0%;80;100;;
~~~

Ces valeurs sont organisées de la façon suivante :

~~~
  rta=2.687ms;3000.000;5000.000;0;
   |    |  |    |         |     | |
   |----|--|----|---------|-----|-|----- * Libellé 
        |--|----|---------|-----|-|----- * Valeur courante
           |----|---------|-----|-|----- Unité de mesure 
                |---------|-----|-|----- Seuil d'attention
                          |-----|-|----- Seuil critique 
                                |-|----- Valeur minimum
                                  |----- Valeur maximum
~~~

Les valeurs précédées du signe “\*” sont obligatoires alors que les
autres sont optionnelles.

-   [NagiosGrapher](nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [PNP4Nagios](pnp/start.html "nagios:addons:pnp:start")
-   [N2RRD](http://wiki.monitoring-fr.org/nagios/addons/n2rrd "nagios:addons:n2rrd")
-   [NagiosGraph](http://wiki.monitoring-fr.org/nagios/addons/nagiosgraph "nagios:addons:nagiosgraph")
-   [Netways Grapher
    V2](netways-grapher-v2.html "nagios:addons:netways-grapher-v2")

Amélioration des interfaces {#amelioration-des-interfaces .sectionedit6}
---------------------------

Ces addons améliorent les interfaces existantes de Nagios ou y rajoutent
certaines fonctionnalités.

-   [Nagios Business Process
    Addon](nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [NagTrap](../../addons/nagtrap.html "nagios:addons:nagtrap")
-   [EventDB](http://wiki.monitoring-fr.org/nagios/addons/eventdb "nagios:addons:eventdb")

### Interfaces d'administration {#interfaces-d-administration .sectionedit7}

-   [Lilac Platform](lilac-platform.html "nagios:addons:lilac-platform")
-   [NagiosQL](nagiosql.html "nagios:addons:nagiosql")
-   [NConf](nconf.html "nagios:addons:nconf")

### Interfaces d'exploitation {#interfaces-d-exploitation .sectionedit8}

Les projets présentés sont une couche web ajoutée à l’interface
d’origine de nagios (qui commence à dater).

-   [Ninja](ninja.html "nagios:addons:ninja")
-   [NagVis](nagvis/start.html "nagios:addons:nagvis:start")
-   [Vautour Style](vautour-style.html "nagios:addons:vautour-style")
-   [Thruk](http://wiki.monitoring-fr.org/nagios/addons/thruk "nagios:addons:thruk")

Les liens en rouge indiquent des pages qui n’ont pas encore été
rédigées. Si le cœur vous en dit, n’hésitez pas
![8-)](../../lib/images/smileys/icon_cool.gif)

Reporting {#reporting .sectionedit9}
---------

-   [NagiosDigger](nagiosdigger.html "nagios:addons:nagiosdigger")

^[1)](start.html#fnt__1)^ [Cacti](../../cacti/start.html "cacti:start"),
[Collectd](../../collectd.html "collectd"),
[SEC](../integration/sec.html "nagios:integration:sec")…

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../../supervision/start.html "supervision:start")**

-   [Nagios](../start.html "nagios:start")
-   [Centreon](../../centreon/start.html "centreon:start")
-   [Shinken](../../shinken/start.html "shinken:start")
-   [Zabbix](../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../vigilo/start.html "vigilo:start")
-   [Icinga](../../icinga/start.html "icinga:start")
-   [Cacti](../../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../canopsis/start.html "canopsis:start")

**[Sécurité](../../securite/start.html "securite:start")**

**[Infrastructure](../../infra/start.html "infra:start")**

**[Développement](../../dev/start.html "dev:start")**

Nagios Addons {#nagios-addons .sectionedit1}
-------------

-   [Lilac Platform](lilac-platform.html "nagios:addons:lilac-platform")
-   [Merlin](../../addons/merlin.html "nagios:addons:merlin")
-   [NConf](nconf.html "nagios:addons:nconf")
-   [NDOUtils](ndoutils.html "nagios:addons:ndoutils")
-   [NSClient++](nsclient.html "nagios:addons:nsclient")
-   [NagTrap](../../addons/nagtrap.html "nagios:addons:nagtrap")
-   [NagVis](nagvis/start.html "nagios:addons:nagvis:start")
-   [Nagios Business Process
    Addon](nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [NagiosDigger](nagiosdigger.html "nagios:addons:nagiosdigger")
-   [NagiosGrapher](nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [NagiosQL](nagiosql.html "nagios:addons:nagiosql")
-   [Netways Grapher
    V2](netways-grapher-v2.html "nagios:addons:netways-grapher-v2")
-   [Ninja](ninja.html "nagios:addons:ninja")
-   [PNP4Nagios](pnp/start.html "nagios:addons:pnp:start")
-   [Protocole NRPE](nrpe.html "nagios:addons:nrpe")
-   [Protocole NSCA](nsca.html "nagios:addons:nsca")
-   [Setup distribué avec
    Mod\_Gearman](mod_gearman.html "nagios:addons:mod_gearman")
-   [Vautour Style](vautour-style.html "nagios:addons:vautour-style")
-   [check\_mk](check_mk/start.html "nagios:addons:check_mk:start")
-   [omd Open Monitoring Distribution](omd.html "nagios:addons:omd")

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

nagios/addons/start.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../lib/tpl/arctic/images/button-rss.png)](../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../lib/exe/indexer.php@id=nagios%253Aaddons%253Astart&1424859526)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
