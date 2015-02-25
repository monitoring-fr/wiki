---
layout: page
---

[[[omd Open Monitoring Distribution](omd@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Addons](start.html "nagios:addons:start") » [omd Open Monitoring
Distribution](omd.html "nagios:addons:omd")

### Table des matières {.toggle}

-   [omd Open Monitoring
    Distribution](omd.html#omd-open-monitoring-distribution)

omd Open Monitoring Distribution {#omd-open-monitoring-distribution .sectionedit1}
================================

  **Rôle**            **Nom**
  ------------------- ----------------
  **Créateur**        Charles JUDITH
  **Contributeurs**   Charles JUDITH

Au lieu d’un long discours sur la présentation de omd, je vous invite à
lire l’article de Romuald FRONTEAU en cliquant sur le lien suivant
[présentation
omd](http://www.monitoring-fr.org/2011/02/omd-open-monitoring-distribution/ "http://www.monitoring-fr.org/2011/02/omd-open-monitoring-distribution/").

Ce tutoriel a été réalisé sur une Ubuntu 11.04.

**Téléchargement de la dernière version d’omd**

~~~
root@charles-eeepc:~# wget http://omdistro.org/attachments/download/90/omd-0.48_0.natty_i386.deb
~~~

**Pré-requis**

Une Ubuntu 11.04 fraichement installé

~~~
root@charles-eeepc:~# apt-get install apache2 fping curl dialog dnsutils fping graphviz libapache2-mod-fcgid libapache2-mod-proxy-html libapache2-mod-python libdbi0 libevent-1.4-2 libgd2-xpm libltdl7 libnet-snmp-perl libpango1.0-0 libreadline5 libsnmp-perl libuuid1 mysql-server patch php5 php5-cli php5-cgi php5-gd php5-mcrypt php5-sqlite php-pear pyro rsync smbclient snmp unzip xinetd
~~~

**Installation d’omd**

~~~
root@charles-eeepc:~# dpkg -i omd-0.48_0.natty_i386.deb
~~~

En Contruction!

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
    source](omd@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](omd@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](omd@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](omd@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de médias](omd@do=media.html "Gestionnaire de médias")
-   [Index](omd@do=index.html "Index [X]")
-   [Connexion](omd@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](omd.html#dokuwiki__top "Haut de page [T]")

nagios/addons/omd.txt · Dernière modification: 2013/03/29 09:39
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

![](../../lib/exe/indexer.php@id=nagios%253Aaddons%253Aomd&1424859576)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
