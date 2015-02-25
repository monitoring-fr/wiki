---
layout: page
---

[[[Installation de NagVis](nagvis-install@do=backlink.html)]]

[wiki monitoring-fr.org](../../../start.html "[ALT+H]")

![Logo Monitoring](../../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../../start.html "start") »
[Nagios](../../start.html "nagios:start") » [Nagios
Addons](../start.html "nagios:addons:start") »
[NagVis](start.html "nagios:addons:nagvis:start") » [Installation de
NagVis](nagvis-install.html "nagios:addons:nagvis:nagvis-install")

### Table des matières {.toggle}

-   [Installation de NagVis](nagvis-install.html#installation-de-nagvis)
    -   [Pré-requis](nagvis-install.html#pre-requis)
    -   [Installation](nagvis-install.html#installation)
    -   [Configuration](nagvis-install.html#configuration)

Cette documentation n’est plus à jour.

Installation de NagVis {#installation-de-nagvis .sectionedit1}
======================

Pré-requis {#pre-requis .sectionedit2}
----------

Certains des pré-requis n’est plus utile si vous les avez déjà récupérer
pour l’installation d’un autre addons à Nagios. Graphviz a son
importance, il servira à la fonction “automap” implanté depuis la
version 1.3 de nagvis.

~~~~ {.code}
sudo apt-get install apache2 libapache2-mod-php5 php5-gd php5-mysql graphviz
~~~~

Il faut savoir aussi que nagvis s’appuie sur une base SQL comme NDO ou
tout récemment Merlin. Donc il est bon d’avoir assez au préalable une de
ces deux bases.

Pour Merlin :

[Installation
Merlin](../../../addons/merlin.html "http://wiki.monitoring-fr.org/addons/merlin")

Pour NDO (article sur NDOUtils par encore écrit par Nagios-fr) :

[Article Installation Centreon
NicoLargo](http://blog.nicolargo.com/2009/01/le-serveur-de-supervision-libre-part-3.html "http://blog.nicolargo.com/2009/01/le-serveur-de-supervision-libre-part-3.html")

Installation {#installation .sectionedit3}
------------

Nous allons récupérer la dernière version de nagvis puis exploiter les
sources pour les greffer à notre nagios.

~~~~ {.code}
wget http://kent.dl.sourceforge.net/sourceforge/nagvis/nagvis-1.4.1.tar.gz

tar -xvzf nagvis-1.4.1.tar.gz

mv nagvis-1.4.1 nagvis

cd /usr/local/nagios/share/nagvis

cp etc/nagvis.ini.php-sample etc/nagvis.ini.php
~~~~

Configuration {#configuration .sectionedit4}
-------------

Nous allons paramétrer nagvis pour pouvoir dialoguer avec la base de
données. Ce paramétrage se trouve dans le fichier
/usr/local/nagios/share/nagvis/etc/nagvis.ini.php.

**Pour Merlin :**

~~~~ {.code}
language="fr_FR"
backend="merlinmy_1"

[backend_merlinmy_1]
backendid="merlinmy_1"
; type of backend - MUST be set
backendtype="merlinmy"
; hostname for Merlin db
dbhost="localhost"
; portname for Merlin db
dbport=3306
; database name for Merlin db
dbname="nom_base_merlin"
; username for Merlin db
dbuser="user_merlin"
; password for Merlin db
dbpass="mot_de_passe_merlin"
; maximum delay of the Merlin Database in seconds
maxtimewithoutupdate=180
; path to the cgi-bin of this backend
htmlcgi="/nagios/cgi-bin"
~~~~

Pour NDO :

A venir ![;-)](../../../lib/images/smileys/icon_wink.gif)

Nous allons changer les droits sur les fichiers de NagVis pour que le
serveur Apache y accèdent comme il faut.

~~~~ {.code}
    chown -R www-data:www-data /usr/local/nagios/share/nagvis/

    chmod 664 /usr/local/nagios/share/nagvis/etc/nagvis.ini.php

    chmod 775 /usr/local/nagios/share/nagvis/nagvis/images/maps

    chmod 664 /usr/local/nagios/share/nagvis/nagvis/images/maps/*

    chmod 775 /usr/local/nagios/share/nagvis/etc/maps

    chmod 664 /usr/local/nagios/share/nagvis/etc/maps/*

    chmod 775 /usr/local/nagios/share/nagvis/var

    chmod 664 /usr/local/nagios/share/nagvis/var/*
~~~~

On peut enfin accéder à l’interface web de NagVis via l’adresse suivante
:

[http://ip\_votre\_serv\_nagios/nagios/nagvis/config.php](http://ip_votre_serv_nagios/nagios/nagvis/config.php "http://ip_votre_serv_nagios/nagios/nagvis/config.php")

[![](../../../assets/media/addons/addons/nagvis/nagvis-config.png)](../../../_detail/addons/addons/nagvis/nagvis-config.png@id=nagios%253Aaddons%253Anagvis%253Anagvis-install.html "addons:addons:nagvis:nagvis-config.png")

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../../start.html "start")**

**[Supervision](../../../supervision/start.html "supervision:start")**

-   [Nagios](../../start.html "nagios:start")
-   [Centreon](../../../centreon/start.html "centreon:start")
-   [Shinken](../../../shinken/start.html "shinken:start")
-   [Zabbix](../../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../../vigilo/start.html "vigilo:start")
-   [Icinga](../../../icinga/start.html "icinga:start")
-   [Cacti](../../../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../../canopsis/start.html "canopsis:start")

**[Sécurité](../../../securite/start.html "securite:start")**

**[Infrastructure](../../../infra/start.html "infra:start")**

**[Développement](../../../dev/start.html "dev:start")**

Nagios Addons {#nagios-addons .sectionedit1}
-------------

-   [Lilac
    Platform](../lilac-platform.html "nagios:addons:lilac-platform")
-   [Merlin](../../../addons/merlin.html "nagios:addons:merlin")
-   [NConf](../nconf.html "nagios:addons:nconf")
-   [NDOUtils](../ndoutils.html "nagios:addons:ndoutils")
-   [NSClient++](../nsclient.html "nagios:addons:nsclient")
-   [NagTrap](../../../addons/nagtrap.html "nagios:addons:nagtrap")
-   [NagVis](start.html "nagios:addons:nagvis:start")
-   [Nagios Business Process
    Addon](../nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [NagiosDigger](../nagiosdigger.html "nagios:addons:nagiosdigger")
-   [NagiosGrapher](../nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [NagiosQL](../nagiosql.html "nagios:addons:nagiosql")
-   [Netways Grapher
    V2](../netways-grapher-v2.html "nagios:addons:netways-grapher-v2")
-   [Ninja](../ninja.html "nagios:addons:ninja")
-   [PNP4Nagios](../pnp/start.html "nagios:addons:pnp:start")
-   [Protocole NRPE](../nrpe.html "nagios:addons:nrpe")
-   [Protocole NSCA](../nsca.html "nagios:addons:nsca")
-   [Setup distribué avec
    Mod\_Gearman](../mod_gearman.html "nagios:addons:mod_gearman")
-   [Vautour Style](../vautour-style.html "nagios:addons:vautour-style")
-   [check\_mk](../check_mk/start.html "nagios:addons:check_mk:start")
-   [omd Open Monitoring Distribution](../omd.html "nagios:addons:omd")

-   [Afficher le texte
    source](nagvis-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](nagvis-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](nagvis-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](nagvis-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](nagvis-install@do=media.html "Gestionnaire de médias")
-   [Index](nagvis-install@do=index.html "Index [X]")
-   [Connexion](nagvis-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](nagvis-install.html#dokuwiki__top "Haut de page [T]")

nagios/addons/nagvis/nagvis-install.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../../lib/tpl/arctic/images/button-rss.png)](../../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../../lib/exe/indexer.php@id=nagios%253Aaddons%253Anagvis%253Anagvis-install&1424859920)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
