---
layout: page
---

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

-   [Protocole
    NSCA](../../../../nagios/addons/nsca.html "nagios:addons:nsca")
-   [Protocole
    NRPE](../../../../nagios/addons/nrpe.html "nagios:addons:nrpe")
-   [NDOUtils](../../../../nagios/addons/ndoutils.html "nagios:addons:ndoutils")
    -   [Requêtage SQL de la base
        NDO](../../../../nagios/addons/ndoutils/sql-request.html "nagios:addons:ndoutils:sql-request")

Pour la collecte et le transport des données {#pour-la-collecte-et-le-transport-des-donnees .sectionedit3}
--------------------------------------------

-   [NSClient++](../../../../nagios/addons/nsclient.html "nagios:addons:nsclient")
-   [Nagios Event
    Log](http://wiki.monitoring-fr.org/nagios/addons/nagios-event-log "nagios:addons:nagios-event-log")
-   [check\_mk](../../../../nagios/addons/check_mk/start.html "nagios:addons:check_mk:start")
-   [Merlin](../../../../addons/merlin.html "nagios:addons:merlin")
-   [NDOUtils](../../../../nagios/addons/ndoutils.html "nagios:addons:ndoutils")
-   [Setup distribué avec
    Mod\_Gearman](../../../../nagios/addons/mod_gearman.html "nagios:addons:mod_gearman")

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

-   [NagiosGrapher](../../../../nagios/addons/nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [PNP4Nagios](../../../../nagios/addons/pnp/start.html "nagios:addons:pnp:start")
-   [N2RRD](http://wiki.monitoring-fr.org/nagios/addons/n2rrd "nagios:addons:n2rrd")
-   [NagiosGraph](http://wiki.monitoring-fr.org/nagios/addons/nagiosgraph "nagios:addons:nagiosgraph")
-   [Netways Grapher
    V2](../../../../nagios/addons/netways-grapher-v2.html "nagios:addons:netways-grapher-v2")

Amélioration des interfaces {#amelioration-des-interfaces .sectionedit6}
---------------------------

Ces addons améliorent les interfaces existantes de Nagios ou y rajoutent
certaines fonctionnalités.

-   [Nagios Business Process
    Addon](../../../../nagios/addons/nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [NagTrap](../../../../addons/nagtrap.html "nagios:addons:nagtrap")
-   [EventDB](http://wiki.monitoring-fr.org/nagios/addons/eventdb "nagios:addons:eventdb")

### Interfaces d'administration {#interfaces-d-administration .sectionedit7}

-   [Lilac
    Platform](../../../../nagios/addons/lilac-platform.html "nagios:addons:lilac-platform")
-   [NagiosQL](../../../../nagios/addons/nagiosql.html "nagios:addons:nagiosql")
-   [NConf](../../../../nagios/addons/nconf.html "nagios:addons:nconf")

### Interfaces d'exploitation {#interfaces-d-exploitation .sectionedit8}

Les projets présentés sont une couche web ajoutée à l’interface
d’origine de nagios (qui commence à dater).

-   [Ninja](../../../../nagios/addons/ninja.html "nagios:addons:ninja")
-   [NagVis](../../../../nagios/addons/nagvis/start.html "nagios:addons:nagvis:start")
-   [Vautour
    Style](../../../../nagios/addons/vautour-style.html "nagios:addons:vautour-style")
-   [Thruk](http://wiki.monitoring-fr.org/nagios/addons/thruk "nagios:addons:thruk")

Les liens en rouge indiquent des pages qui n’ont pas encore été
rédigées. Si le cœur vous en dit, n’hésitez pas
![8-)](../../../../lib/images/smileys/icon_cool.gif)

Reporting {#reporting .sectionedit9}
---------

-   [NagiosDigger](../../../../nagios/addons/nagiosdigger.html "nagios:addons:nagiosdigger")

^[1)](start.html#fnt__1)^
[Cacti](../../../../cacti/start.html "cacti:start"),
[Collectd](../../../../collectd.html "collectd"),
[SEC](../../../../nagios/integration/sec.html "nagios:integration:sec")…
