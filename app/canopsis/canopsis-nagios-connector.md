---
layout: page
---

[[[Connecteur Nagios / Icinga pour
Canopsis](canopsis-nagios-connector@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Canopsis](start.html "canopsis:start") » [Connecteur Nagios / Icinga
pour
Canopsis](canopsis-nagios-connector.html "canopsis:canopsis-nagios-connector")

### Table des matières {.toggle}

-   [Connecteur Nagios / Icinga pour
    Canopsis](canopsis-nagios-connector.html#connecteur-nagiosicinga-pour-canopsis)
    -   [Pré-requis](canopsis-nagios-connector.html#pre-requis)
    -   [Installation](canopsis-nagios-connector.html#installation)
    -   [Configuration](canopsis-nagios-connector.html#configuration)

Connecteur Nagios / Icinga pour Canopsis {#connecteur-nagiosicinga-pour-canopsis .sectionedit1}
========================================

Tutoriel rédigé pour une version Ubuntu 10.04 LTS et Canopsis (stable).

Cette documentation permet d’installer et configurer un connecteur
Canopsis pour Nagios et Icinga. Ce connecteur est sous la forme d’un
“Event broker” (c’est-à-dire un NEB ⇒ Nagios Event Broker) afin de
remonter les données de votre supervision vers l’hyperviseur Canopsis.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur**   [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")

Pré-requis {#pre-requis .sectionedit3}
----------

Quelques paquets essentiels doivent être installés afin de pouvoir
installer le connecteur :

~~~
$ apt-get install build-essential git-core
~~~

Installation {#installation .sectionedit4}
------------

Une fois les pré-requis installés, il est possible de commencer
l’installation du NEB. Tout d’abord il faut télécharger puis compiler le
connecteur :

~~~
$ git clone git://forge.canopsis.org/neb2amqp.git
$ cd neb2amqp
$ make
~~~

Pour finir, il ne reste plus qu’à copier l’exécutable dans votre
installation Nagios :

~~~
$ sudo cp src/neb2amqp.o /usr/local/nagios/bin/
~~~

Configuration {#configuration .sectionedit5}
-------------

Ensuite, après avoir terminé l’installation du connecteur, il faut
configurer Nagios de manière à ce qu’il charge le NEB. Pour cela, vous
devez éditer votre fichier de configuration **nagios.cfg** :

~~~
$ sudo vi /usr/local/nagios/etc/nagios.cfg
~~~

Dans le fichier, il faut y renseigner les informations suivantes :

~~~ {.file}
...
event_broker_options=-1
broker_module=/usr/local/nagios/bin/neb2amqp.o name=Central x.x.x.x
...
~~~

*`x.x.x.x` ⇒ adresse ip de votre serveur Canopsis*

On redémarre ensuite Nagios :

~~~
$ sudo service nagios restart
~~~

Les évènements Nagios sont maintenant visibles depuis l’interface
Canopsis.

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
    source](canopsis-nagios-connector@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](canopsis-nagios-connector@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](canopsis-nagios-connector@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](canopsis-nagios-connector@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](canopsis-nagios-connector@do=media.html "Gestionnaire de médias")
-   [Index](canopsis-nagios-connector@do=index.html "Index [X]")
-   [Connexion](canopsis-nagios-connector@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](canopsis-nagios-connector.html#dokuwiki__top "Haut de page [T]")

canopsis/canopsis-nagios-connector.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=canopsis%253Acanopsis-nagios-connector&1424859804)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
