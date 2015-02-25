---
layout: page
---

[[[PNP 0.4](pnp-0.4@do=backlink.html)]]

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
[PNP4Nagios](start.html "nagios:addons:pnp:start") » [PNP
0.4](pnp-0.4.html "nagios:addons:pnp:pnp-0.4")

### Table des matières {.toggle}

-   [PNP 0.4](pnp-0.4.html#pnp-04)
    -   -   [Installation](pnp-0.4.html#installation)
    -   [Configuration](pnp-0.4.html#configuration)
    -   [Liaison avec l'interface
        Web](pnp-0.4.html#liaison-avec-l-interface-web)
    -   [Principe de
        fonctionnement](pnp-0.4.html#principe-de-fonctionnement)

PNP 0.4 {#pnp-04 .sectionedit1}
=======

[PNP](http://www.pnp4nagios.org/pnp/start "http://www.pnp4nagios.org/pnp/start")
est l’acronyme de PNP is NOT Perfparse. Il permet de récupérer la partie
performance de la sortie des plugins et d’injecter ces valeurs dans des
bases rrdtool puis de les grapher via un front-end écrit en PHP. Il est
en cela comparable à d’autres outils comme NagiosGraph, NagiosGrapher,
N2RRD voir dans une moindre mesure
[Cacti](../../../cacti/start.html "cacti:start").

### Installation {#installation .sectionedit2}

Il faut bien sur s’assurer que RRDtool soit installé

~~~ {.code .bash}
sudo apt-get install rrdtool librrds-perl
~~~

Ensuite, la compilation et l’installation proprement dite

~~~
wget http://kent.dl.sourceforge.net/sourceforge/pnp4nagios/pnp-0.4.14.tar.gz
tar -xzf pnp-0.4.14.tar.gz
pushd pnp-0.4.14
./configure --with-perfdata-dir=/usr/local/nagios/var/perfdata/ --with-init-dir=/etc/init.d/
make all
sudo make install
sudo make install-config
~~~

Ce qui nous intéresse est le Mode Bulk avec le NPCD. La raison de notre
choix c’est que ça allège considérablement Nagios vu que c’est le démon
NPCD qui fait tout le boulot. Nagios n’a juste qu’à écrire les perfdata
dans les fichiers.

~~~
*** Main program, Scripts and HTML files installed ***

Please run 'make install-init' if you want to use
BULK Mode with NPCD

make install-init
~~~

Les fichiers installés sont les suivants:

-   /usr/local/nagios/bin/npcd
-   /etc/init.d/npcd
-   /usr/local/nagios/libexec/process\_perfdata.pl
-   /usr/local/nagios/share/pnp/
-   /usr/local/nagios/etc/

Configuration {#configuration .sectionedit3}
-------------

Notre configuration sera orienté en Bulk Mode avec le démon NPCD, ce
système est un peu plus complexe à mettre en oeuvre mais sur de grosses
architectures, il est fortement recommandé.

Dans votre nagios.cfg

~~~
process_performance_data=1

#
# service performance data
#
service_perfdata_file=/usr/local/nagios/var/service-perfdata
service_perfdata_file_template=DATATYPE::SERVICEPERFDATA\tTIMET::$TIMET$\tHOSTNAME::$HOSTNAME$\tSERVICEDESC::$SERVICEDESC$\tSERVICEPERFDATA::$SERVICEPERFDATA$\tSERVICECHECKCOMMAND::$SERVICECHECKCOMMAND$\tHOSTSTATE::$HOSTSTATE$\tHOSTSTATETYPE::$HOSTSTATETYPE$\tSERVICESTATE::$SERVICESTATE$\tSERVICESTATETYPE::$SERVICESTATETYPE$\tSERVICEOUTPUT::$SERVICEOUTPUT$
service_perfdata_file_mode=a
service_perfdata_file_processing_interval=15
service_perfdata_file_processing_command=process-service-perfdata-file

#
# host performance data starting with Nagios 3.0
# 
host_perfdata_file=/usr/local/nagios/var/host-perfdata
host_perfdata_file_template=DATATYPE::HOSTPERFDATA\tTIMET::$TIMET$\tHOSTNAME::$HOSTNAME$\tHOSTPERFDATA::$HOSTPERFDATA$\tHOSTCHECKCOMMAND::$HOSTCHECKCOMMAND$\tHOSTSTATE::$HOSTSTATE$\tHOSTSTATETYPE::$HOSTSTATETYPE$\tHOSTOUTPUT::$HOSTOUTPUT$
host_perfdata_file_mode=a
host_perfdata_file_processing_interval=15
host_perfdata_file_processing_command=process-host-perfdata-file
~~~

Dans le commands.cfg, déclarez les 2 commandes suivantes :

~~~
define command{
        command_name    process-service-perfdata-file
        command_line    /bin/mv /usr/local/nagios/var/service-perfdata /usr/local/nagios/var/spool/perfdata/service-perfdata.$TIMET$
 }

define command{
        command_name    process-host-perfdata-file
        command_line    /bin/mv /usr/local/nagios/var/host-perfdata /usr/local/nagios/var/spool/perfdata/host-perfdata.$TIMET$
 }
~~~

Concernant les modifications à apporter à PNP :

~~~
cd /usr/local/nagios/etc/pnp

cp rra.cfg-sample rra.cfg
cp npcd.cfg-sample npcd.cfg
~~~

Liaison avec l'interface Web {#liaison-avec-l-interface-web .sectionedit4}
----------------------------

Pour votre hôte ou votre service, veuillez rajouter :

**Exemple :**

~~~
define host {
  name       host-pnp
  register   0
  action_url /nagios/pnp/index.php?host=$HOSTNAME$
}

define service {
  name       srv-pnp
  register   0
  action_url /nagios/pnp/index.php?host=$HOSTNAME$&srv=$SERVICEDESC$
}
~~~

Sur l’interface Web nagios vous verrez un icône apparaître

[![](../../../assets/media/addons/addons/pnp/icone_graph.png@w=700&h=100)](../../../_detail/addons/addons/pnp/icone_graph.png@id=nagios%253Aaddons%253Apnp%253Apnp-0.4.html "addons:addons:pnp:icone_graph.png")

[![](../../../assets/media/addons/addons/pnp/graph.png@w=700&h=370)](../../../_detail/addons/addons/pnp/graph.png@id=nagios%253Aaddons%253Apnp%253Apnp-0.4.html "addons:addons:pnp:graph.png")

**Attention si vous n’avez pas de remontée de performance dans votre
plugin, pnp ne pourra pas vous générer de graph.**

[![](../../../assets/media/addons/addons/pnp/srv_info.png)](../../../_detail/addons/addons/pnp/srv_info.png@id=nagios%253Aaddons%253Apnp%253Apnp-0.4.html "addons:addons:pnp:srv_info.png")

Principe de fonctionnement {#principe-de-fonctionnement .sectionedit5}
--------------------------

Comment fonctionne le Bulk Mode avec le démon npcd :

-   1) Nagios réalise un check de votre service
-   2) Nagios va aller écrire le résultat du check dans
    /usr/local/nagios/var/service-perfdata
-   3) En même temps, Nagios fait appelle aux commandes
    process-perfdata-file
-   4) Le démon npcd quand à lui va aller scruter toutes les 15 sec
    (variable “service\_perfdata\_file\_processing\_interval”) le
    répertoire /usr/local/nagios/var/spool/perfdata (emplacement où
    nagios a copié les fichiers perfdata et aussi définition dans le
    fichier /usr/local/nagios/etc/pnp/npcd.cfg) voir s’il y trouve des
    fichiers et les traite.

Voilà comment fonctionne en gros le Bulk Mode avec NPCD.

Pour voir si votre installation fonctionne bien, pensez à vérifier :

-   les fichiers de perfdata dans /usr/local/nagios/var pour voir si
    vous avez des données cohérentes dedans ou pas
-   Vous pouvez passer le démon npcd en mode debug pour savoir ce qu’il
    fait (dans le fichier npcd.cfg –\> variable debug=-1). Il ira écrire
    dans le fichier /usr/local/nagios/var/npcd.log

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
-   [NagVis](../nagvis/start.html "nagios:addons:nagvis:start")
-   [Nagios Business Process
    Addon](../nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [NagiosDigger](../nagiosdigger.html "nagios:addons:nagiosdigger")
-   [NagiosGrapher](../nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [NagiosQL](../nagiosql.html "nagios:addons:nagiosql")
-   [Netways Grapher
    V2](../netways-grapher-v2.html "nagios:addons:netways-grapher-v2")
-   [Ninja](../ninja.html "nagios:addons:ninja")
-   [PNP4Nagios](start.html "nagios:addons:pnp:start")
-   [Protocole NRPE](../nrpe.html "nagios:addons:nrpe")
-   [Protocole NSCA](../nsca.html "nagios:addons:nsca")
-   [Setup distribué avec
    Mod\_Gearman](../mod_gearman.html "nagios:addons:mod_gearman")
-   [Vautour Style](../vautour-style.html "nagios:addons:vautour-style")
-   [check\_mk](../check_mk/start.html "nagios:addons:check_mk:start")
-   [omd Open Monitoring Distribution](../omd.html "nagios:addons:omd")

-   [Afficher le texte
    source](pnp-0.4@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](pnp-0.4@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](pnp-0.4@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](pnp-0.4@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](pnp-0.4@do=media.html "Gestionnaire de médias")
-   [Index](pnp-0.4@do=index.html "Index [X]")
-   [Connexion](pnp-0.4@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](pnp-0.4.html#dokuwiki__top "Haut de page [T]")

nagios/addons/pnp/pnp-0.4.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

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

![](../../../lib/exe/indexer.php@id=nagios%253Aaddons%253Apnp%253Apnp-0.4&1424859917)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
