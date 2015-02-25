---
layout: page
---

### Table des matières {.toggle}

-   [Panorama](links.html#panorama)
    -   -   [Supervision Open
            Source](links.html#supervision-open-source)
        -   [Gestion des inventaires et
            déploiement](links.html#gestion-des-inventaires-et-deploiement)
        -   [Gestion des
            configurations](links.html#gestion-des-configurations)
        -   [Ordonnanceurs](links.html#ordonnanceurs)
        -   [Processes et systèmes
            monitoring](links.html#processes-et-systemes-monitoring)
        -   [Sécurité monitoring](links.html#securite-monitoring)
        -   [Corrélation
            d'événements](links.html#correlation-d-evenements)
        -   [Centralisation et analyse de journaux
            (logs)](links.html#centralisation-et-analyse-de-journaux-logs)
        -   [Métrique & Graphes](links.html#metrique-graphes)
        -   [Analyse de trafic
            réseaux](links.html#analyse-de-trafic-reseaux)
        -   [Testing](links.html#testing)
        -   [Reporting](links.html#reporting)
        -   [Standards](links.html#standards)
        -   [Ressources en ligne](links.html#ressources-en-ligne)

Panorama {#panorama .sectionedit1}
========

Depuis une dizaine d’années déja, plusieurs projets de supervision ont
vu le jour au sein de la communauté du logiciel libre. Il suffit pour
cela d’aller faire un petit tour sur
[sourceforge.net](http://sourceforge.net/search/?type_of_search=soft&words=monitoring "http://sourceforge.net/search/?type_of_search=soft&words=monitoring")
pour se rendre compte de la multitude de projets émergeants autour de la
supervision système et réseau. En voici un panorama, florilège glané au
fil du temps et sans cesse remis à jour.

Pour le fun, il est même possible de superviser des services depuis
Dokuwiki comme le prouve les exemples ci-dessous
![8-)](../../../lib/images/smileys/icon_cool.gif). Pas de quoi encore se
passer de ceux présentés plus bas.

  Services testés
  ------------------------------------------------------------------------------------------------------
  ![(tcp\\80) www @ monitoring-fr.org](../../../lib/plugins/sos/images/on.png) www @ monitoring-fr.org
  ![(tcp\\80) www @ yahoo.com](../../../lib/plugins/sos/images/on.png) www @ yahoo.com

Une liste plutôt exhaustive existe aussi
[ici](http://www.slac.stanford.edu/xorg/nmtf/nmtf-tools.html "http://www.slac.stanford.edu/xorg/nmtf/nmtf-tools.html")
ou [ici](http://www.monitortools.com/ "http://www.monitortools.com/") et
vous trouverez quelques petites briques intéressantes
[ici](http://www.debianhelp.co.uk/adminutilities.htm "http://www.debianhelp.co.uk/adminutilities.htm").
Une [liste
intéressante](http://wikicompany.org/fs/system_management.html "http://wikicompany.org/fs/system_management.html")
sur les outils de management IT.

Un comparatif de ces principales solutions est disponible sur
[Wikipedia](http://en.wikipedia.org/wiki/Comparison_of_network_monitoring_systems "http://en.wikipedia.org/wiki/Comparison_of_network_monitoring_systems")

Un groupe de réflexion existe autour des outils de supervision sur
Github et publie un [répertoires des outils
disponibles](https://github.com/monitoringsucks/tool-repos "https://github.com/monitoringsucks/tool-repos").

### Supervision Open Source {#supervision-open-source .sectionedit3}

Solution

Commentaire

[Nagios](http://nagios.org "http://nagios.org")

[OpenQRM](http://www.openqrm.org/ "http://www.openqrm.org/")

Nagios en environnement virtuel

[Centreon](http://www.centreon.com/ "http://www.centreon.com/")

Développé en France par Merethis.

[Cacti](http://www.cacti.net "http://www.cacti.net")

Grapheur basé sur RRDTools

[MRTG](http://oss.oetiker.ch/mrtg/ "http://oss.oetiker.ch/mrtg/")

Grapheur de trafic pour les routeurs…

[OSSIM](http://www.ossim.net/ "http://www.ossim.net/")

plus orienté sécurité. Intègre Snort, Acid/Base, MRTG, NTOP, Nagios,
NMAP, Nessus and RRDTool

[Cricket](http://cricket.sourceforge.net/ "http://cricket.sourceforge.net/")

monitoring et grapheur.

[NetMRG](http://www.netmrg.net/ "http://www.netmrg.net/")

grapheur basé sur rrdtool

[Ganglia](http://ganglia.info/ "http://ganglia.info/")

monitoring de cluster et grid

[Ground
Works](http://www.groundworkopensource.com/ "http://www.groundworkopensource.com/")

Intègre Cacti, Nagios, NTOP…

[Hyperic HQ](http://www.hyperic.com/ "http://www.hyperic.com/")

solution de monitoring puissante en java

[Zenoss](http://www.zenoss.com/ "http://www.zenoss.com/")

solution basée sur zope

[Moodss](http://moodss.sourceforge.net/ "http://moodss.sourceforge.net/")

Récupère les plug Nagios

[Zabbix](http://www.zabbix.com "http://www.zabbix.com")

[OpenESM](http://www.openesm.com/ "http://www.openesm.com/")

basé sur zabbix

[Shinken](http://www.shinken-monitoring.org/ "http://www.shinken-monitoring.org/")

ré-implémentation multiplateforme (Windows,Unix) de Nagios avec
architecture distribuée

[OpenNMS](http://www.opennms.org/ "http://www.opennms.org/")

Java

[OpenNMS Sans
Effort](http://opennmsse.free.fr/ "http://opennmsse.free.fr/")

[JFFNMS](http://www.jffnms.org/ "http://www.jffnms.org/")

[RRDtool](http://oss.oetiker.ch/rrdtool/index.en.html "http://oss.oetiker.ch/rrdtool/index.en.html")

[OpsView](http://opsview.org/ "http://opsview.org/")

Construit sur Nagios avec une orientation architecture distribuée

[Argus](http://argus.tcp4me.com/ "http://argus.tcp4me.com/")

[NMIS](http://nmis.co.nz/drupal/ "http://nmis.co.nz/drupal/")

[DimStats : Pour
Solaris](http://dimitrik.free.fr/ "http://dimitrik.free.fr/")

[Snag View](http://www.snag-view.de/ "http://www.snag-view.de/")

construit sur Nagios

[Pandora
FMS](http://pandora.sourceforge.net/en/index.php "http://pandora.sourceforge.net/en/index.php")

[Babel
Enterprise](http://babel.sourceforge.net/ "http://babel.sourceforge.net/")

[Bartlby](http://www.bartlby.org "http://www.bartlby.org")

[Monitorix](http://www.monitorix.org/ "http://www.monitorix.org/")

[Ortro](http://www.ortro.net/ "http://www.ortro.net/")

[Akkada](http://akkada.tivi.net.pl/nms/?q=node/1 "http://akkada.tivi.net.pl/nms/?q=node/1")

[NetXMS](http://www.netxms.org/ "http://www.netxms.org/")

[Hobbit
Monitor](http://hobbitmon.sourceforge.net/ "http://hobbitmon.sourceforge.net/")

[Eddie Tool](http://eddie-tool.net/ "http://eddie-tool.net/")

[Vigilo](http://www.projet-vigilo.org/site/ "http://www.projet-vigilo.org/site/")

= Nagios + SEC+ RRDtool + Nagvis

[nmon : Par IBM pour AIX et
Linux](http://www.ibm.com/developerworks/aix/library/au-analyze_aix/index.html "http://www.ibm.com/developerworks/aix/library/au-analyze_aix/index.html")

[MonAlisa](http://monalisa.cacr.caltech.edu/monalisa.htm "http://monalisa.cacr.caltech.edu/monalisa.htm")

[Mon](http://mon.wiki.kernel.org/index.php/Main_Page "http://mon.wiki.kernel.org/index.php/Main_Page")

[GnetWatch](http://gnetwatch.sourceforge.net/ "http://gnetwatch.sourceforge.net/")

[AnduttEye](http://thundera.se/index.php?option=com_content&view=article&id=45&Itemid=54 "http://thundera.se/index.php?option=com_content&view=article&id=45&Itemid=54")

[Torrus](http://www.torrus.org/ "http://www.torrus.org/")

[PIKT](http://pikt.org/ "http://pikt.org/")

[KeyWatch](http://www.keywatch.org/ "http://www.keywatch.org/")

La version 1.2 supporte les plugins Nagios.

[NAV](http://metanav.uninett.no/ "http://metanav.uninett.no/")

Network Administration Visualized

[ClearSite](http://clearsite.sourceforge.net/ "http://clearsite.sourceforge.net/")

[SFIG](http://www.net-supervision.fr/ "http://www.net-supervision.fr/")

Basé sur Nagios 2

[Simon](http://www.dejal.com/simon/ "http://www.dejal.com/simon/")

Uniquement pour OS X

[StorageIM](http://www.storageim.com/ "http://www.storageim.com/")

Monitoring des solutions de stockage réseau.

[Centerity](http://www.centerity.com "http://www.centerity.com")

[Project
Observer](http://www.project-observer.org/ "http://www.project-observer.org/")

semble être devenu
[ObserverNMS](http://www.observernms.org/ "http://www.observernms.org/")

[NeDi](http://www.nedi.ch/doku.php "http://www.nedi.ch/doku.php")

[NetDot](https://netdot.uoregon.edu/trac/ "https://netdot.uoregon.edu/trac/")

[OpenNetAdmin](http://demo.opennetadmin.com/ "http://demo.opennetadmin.com/")

[Lambdaprobe](http://www.lambdaprobe.org/d/index.htm "http://www.lambdaprobe.org/d/index.htm")

supervision des serveurs Tomcat

[System Garden
Habitat](http://www.systemgarden.com/habitat.html "http://www.systemgarden.com/habitat.html")

[Spiceworks](http://www.spiceworks.com/ "http://www.spiceworks.com/")

[Osmius](http://www.osmius.com/en/product/ "http://www.osmius.com/en/product/")

[Eyes Of
Network](http://www.eyesofnetwork.com/ "http://www.eyesofnetwork.com/")

Intègre Nagios, Nagvis, Nagiosbp, Cacti, SNMPTT, Weathermap, Backup
Manager…

[N2](http://opensource.xlshosting.com/n2/ "http://opensource.xlshosting.com/n2/")

Framework de supervision, ou plus ?

[Ecostats](http://code.google.com/p/ecostats/ "http://code.google.com/p/ecostats/")

[BixData](http://www.bixdata.com/ "http://www.bixdata.com/")

[Eclipse
Cosmos](http://www.eclipse.org/cosmos/ "http://www.eclipse.org/cosmos/")

[Athene](http://athene.sourceforge.net/ "http://athene.sourceforge.net/")

[NOC](http://trac.nocproject.org/trac/ "http://trac.nocproject.org/trac/")

[Jopr](http://www.jboss.org/jopr/ "http://www.jboss.org/jopr/")

Orienté Middleware (jboss…)

[Uptime](http://www.uptimesoftware.com/ "http://www.uptimesoftware.com/")

[The
Dude](http://www.mikrotik.com/thedude.php "http://www.mikrotik.com/thedude.php")

Pour Windows

[Unnoc](http://unnoc.org/ "http://unnoc.org/")

[OpenSmart](http://opensmart.sourceforge.net/ "http://opensmart.sourceforge.net/")

[Reconnoiter](https://labs.omniti.com/trac/reconnoiter "https://labs.omniti.com/trac/reconnoiter")

[PastMon](http://pastmon.sourceforge.net/ "http://pastmon.sourceforge.net/")

[Flapjack](http://flapjack-project.com/ "http://flapjack-project.com/")

Supervision compatible Nagios par le créateur de cucumber-nagios.

[IP
Hawk](http://iphawk.sourceforge.net/ "http://iphawk.sourceforge.net/")

Supervision de la correspondance entre DNS et IP présentes sur le
réseau.

[ScopePort](http://www.scopeport.org/ "http://www.scopeport.org/")

[PHP Server
Monitor](http://freshmeat.net/projects/php-server-monitor "http://freshmeat.net/projects/php-server-monitor")

Supervision sites web

[Java Monitor](http://java-monitor.com/ "http://java-monitor.com/")

Supervision des JVM

[God](http://god.rubyforge.org/ "http://god.rubyforge.org/")

Process Monitoring Framework en Ruby

[Observium](http://www.observium.org "http://www.observium.org")

[OpenTSDB](http://opentsdb.net/ "http://opentsdb.net/")

[RHQ](http://rhq-project.org/display/RHQ/Home "http://rhq-project.org/display/RHQ/Home")

solution de supervision et d’inventaire en java (avec agent)

[AssimMon](http://linux-ha.org/source-doc/assimilation/html/index.html "http://linux-ha.org/source-doc/assimilation/html/index.html")

solution de supervision par l’équipe de linux-ha

[Sensu](https://github.com/sensu/sensu/ "https://github.com/sensu/sensu/")

solution de supervision architecturé autour de RabbitMQ

[Rieman](http://aphyr.github.com/riemann/ "http://aphyr.github.com/riemann/")

[Extreme Mon](https://extremon.org/ "https://extremon.org/")

[GNMS](http://gnms.rubyforge.org/ "http://gnms.rubyforge.org/")

[Z
Eye](http://z-eye.unix-experience.fr/ "http://z-eye.unix-experience.fr/")

[Heka](http://heka-docs.readthedocs.org/ "http://heka-docs.readthedocs.org/")

Un projet Mozilla

### Gestion des inventaires et déploiement {#gestion-des-inventaires-et-deploiement .sectionedit5}

-   [GLPI](http://glpi-project.org/ "http://glpi-project.org/") :
    Gestion libre de parc informatique
-   [OCS
    Inventory](http://ocsinventory.sourceforge.net/ "http://ocsinventory.sourceforge.net/")
    : Inventaire des machines automatique
-   [nVentory](http://opensource.vidavee.com/nVentory "http://opensource.vidavee.com/nVentory")
    : Inventaire de parc qui sait produire du XML en sortie
-   [OneCMDB](http://www.onecmdb.org/ "http://www.onecmdb.org/") : Une
    base d’inventaire ITIL compliant
-   [OpenRSM](http://openrsm.sourceforge.net/ "http://openrsm.sourceforge.net/")
    : Télé-déploiement, inventaire. Inclus OpenNMS.
-   [Spacewalk](http://www.redhat.com/spacewalk/ "http://www.redhat.com/spacewalk/")
    : Inventaire, télé-déploiement
-   [Linmin](http://www.linmin.com/ "http://www.linmin.com/") :
    Déploiement et image Linux, Solaris et Windows
-   [Tellu](http://tellu.berlios.de/index.html "http://tellu.berlios.de/index.html")
    : Inventaire de parc
-   [Pulse
    2](http://www.mandriva.com/fr/pro/pulse/ "http://www.mandriva.com/fr/pro/pulse/")
    : Gestion de parc, inventaire, déploiement, Mater, clonage,
    helpdesk, compatible GLPI

### Gestion des configurations {#gestion-des-configurations .sectionedit6}

-   [Rudder](http://www.rudder-project.org "http://www.rudder-project.org"):
    Gestion des serveurs depuis une console web avec Cfengine et
    FusionInventory comme agents
-   [IsiSetup](http://www.isisetup.ch/ "http://www.isisetup.ch/")
-   [Wayback](http://wayback.sourceforge.net/ "http://wayback.sourceforge.net/")
-   [CopyFS](http://invaders.mars-attacks.org/~boklm/copyfs/ "http://invaders.mars-attacks.org/~boklm/copyfs/")
-   [GIT](http://git.or.cz/ "http://git.or.cz/")
-   [Bazaar](http://bazaar-vcs.org/ "http://bazaar-vcs.org/")
-   [SVN](http://subversion.tigris.org/ "http://subversion.tigris.org/")
-   [Système de fichiers versionnés
    Ext3cow](http://www.ext3cow.com "http://www.ext3cow.com")
-   [RANCID](http://www.shrubbery.net/rancid/ "http://www.shrubbery.net/rancid/"):
    Configurations des switches et routeurs
-   [Radmin](http://rsug.itd.umich.edu/software/radmind/ "http://rsug.itd.umich.edu/software/radmind/")
-   [Puppet](http://reductivelabs.com/ "http://reductivelabs.com/")
-   [CFengine](http://www.cfengine.org/ "http://www.cfengine.org/")
-   [Quattor](http://quattor.web.cern.ch/quattor/ "http://quattor.web.cern.ch/quattor/")
-   [SCC](http://www.openeyet.nl/scc/index.html "http://www.openeyet.nl/scc/index.html")
-   [cfg2html](http://www.cfg2html.com/ "http://www.cfg2html.com/")
-   [NDCC](http://ndcc.totallygeek.com/ "http://ndcc.totallygeek.com/")
-   [Bcfg2](http://trac.mcs.anl.gov/projects/bcfg2 "http://trac.mcs.anl.gov/projects/bcfg2")
-   [Assimilator](http://assimilator.sourceforge.net/ "http://assimilator.sourceforge.net/")
-   [NS4](http://www.noodles.org.uk/ns4.html "http://www.noodles.org.uk/ns4.html")
-   [CrossSync](http://www.crossjibe.com/ "http://www.crossjibe.com/")
-   [Emu
    NetDirector](http://www.emusoftware.com/ "http://www.emusoftware.com/")
-   [AutomateIT](http://automateit.org/ "http://automateit.org/")
-   [Chef](http://wiki.opscode.com/display/chef/Home "http://wiki.opscode.com/display/chef/Home")

### Ordonnanceurs {#ordonnanceurs .sectionedit7}

-   [Jobscheduler](http://jobscheduler.sourceforge.net/ "http://jobscheduler.sourceforge.net/")
-   [TaskForest](http://www.taskforest.com/ "http://www.taskforest.com/")
-   [Ortro](http://www.ortro.net/ "http://www.ortro.net/")

### Processes et systèmes monitoring {#processes-et-systemes-monitoring .sectionedit8}

-   [Saidar](http://www.i-scream.org/libstatgrab/ "http://www.i-scream.org/libstatgrab/"):
    Utilise libstatgrab
-   [Glance](https://github.com/nicolargo/glances/downloads "https://github.com/nicolargo/glances/downloads"):
    Fork de Saidar par
    [Nicolargo](http://blog.nicolargo.com/ "http://blog.nicolargo.com/")
-   [Htop](http://htop.sourceforge.net/ "http://htop.sourceforge.net/")
-   [Sysstat](http://pagesperso-orange.fr/sebastien.godard/ "http://pagesperso-orange.fr/sebastien.godard/")
-   [Monit](http://www.tildeslash.com/monit/ "http://www.tildeslash.com/monit/")
-   [Tkwatcher](http://www.cs.umb.edu/~rouilj/tkwatcher/ "http://www.cs.umb.edu/~rouilj/tkwatcher/")
-   [Dstat](http://dag.wieers.com/home-made/dstat/ "http://dag.wieers.com/home-made/dstat/")
-   [Collectd](http://collectd.org "http://collectd.org") et une
    nouvelle interface pour celui-ci :
    [Visage](http://auxesis.github.com/visage/ "http://auxesis.github.com/visage/")
-   [Mon](http://mon.wiki.kernel.org/index.php/Main_Page "http://mon.wiki.kernel.org/index.php/Main_Page")
    et son complément
    [RRDmon](http://www.linux-france.org/prj/rrdmon/ "http://www.linux-france.org/prj/rrdmon/")
-   [OverCR](http://www.overcr.org/overcr/ "http://www.overcr.org/overcr/")
-   [Procinfo-ng](http://procinfo-ng.sourceforge.net/ "http://procinfo-ng.sourceforge.net/")
-   [ProcMeter
    3](http://www.gedanken.demon.co.uk/procmeter3/ "http://www.gedanken.demon.co.uk/procmeter3/")
-   [Atsar](http://freshmeat.net/projects/atsar/ "http://freshmeat.net/projects/atsar/")
-   [Loadavg](http://www.labradordata.ca/home/37 "http://www.labradordata.ca/home/37")
-   [Collectl](http://collectl.sourceforge.net/ "http://collectl.sourceforge.net/")
-   [Symon](http://www.xs4all.nl/~wpd/symon/index.html "http://www.xs4all.nl/~wpd/symon/index.html")
-   [SysUsage](http://www.samse.fr/GPL/sysusage/ "http://www.samse.fr/GPL/sysusage/")
    : capable d’utiliser nsca pour remonter des alertes
-   [SNM](http://snm.sourceforge.net/ "http://snm.sourceforge.net/") :
    Peut être utilisé sur Windows
-   [MonAMI](http://monami.sourceforge.net/ "http://monami.sourceforge.net/")
-   [Wtmptail](http://www.vanheusden.com/wtmptail/ "http://www.vanheusden.com/wtmptail/")
    : Pour voir qui est connecté/déconnecté.
-   [Sinfo](http://www.comm.uni-bremen.de/whomes/rinas/sinfo/#screen "http://www.comm.uni-bremen.de/whomes/rinas/sinfo/#screen")
    : infos centralisées des machines distantes.
-   [Iotop](http://guichaz.free.fr/iotop/ "http://guichaz.free.fr/iotop/")
    : Le “top” pour les entrées/sorties
-   [Smem](http://www.selenic.com/smem/ "http://www.selenic.com/smem/")
    : Supervision évoluée de la mémoire
-   [iWatch](http://iwatch.sourceforge.net/index.html "http://iwatch.sourceforge.net/index.html")
    : Intégrité du système de fichier

#### MySQL

-   [Mysqlar](http://gert.sos.be/en/projects/mysqlar/ "http://gert.sos.be/en/projects/mysqlar/")
-   [Mytop](http://jeremy.zawodny.com/mysql/mytop/ "http://jeremy.zawodny.com/mysql/mytop/")
-   [Kontrollbase](http://kontrollsoft.com/ "http://kontrollsoft.com/")

#### DNS

-   [dnsgraph](http://dnsgraph.sourceforge.net/ "http://dnsgraph.sourceforge.net/")
-   [dnstop](http://dns.measurement-factory.com/tools/dnstop/ "http://dns.measurement-factory.com/tools/dnstop/")

#### LDAP

-   [cnmonitor](http://sourceforge.net/projects/cnmonitor/ "http://sourceforge.net/projects/cnmonitor/")
    : Monitoring des serveurs LDAP.

#### Mail

-   [SendMail
    Analyzer](http://sareport.darold.net/ "http://sareport.darold.net/")
-   [MailGraph](http://wiki.monitoring-fr.org/mailgraph.schweikert.ch/start "mailgraph.schweikert.ch:start")

### Sécurité monitoring {#securite-monitoring .sectionedit9}

-   [Base](http://base.secureideas.net/ "http://base.secureideas.net/")
-   [Snort](http://www.snort.org/ "http://www.snort.org/")
-   [Nessus](http://www.nessus.org/ "http://www.nessus.org/")
-   [Monit](http://www.tildeslash.com/monit/ "http://www.tildeslash.com/monit/")
-   [ACID](http://www.andrew.cmu.edu/user/rdanyliw/snort/snortacid.html "http://www.andrew.cmu.edu/user/rdanyliw/snort/snortacid.html")
-   [Portsentry](http://sourceforge.net/projects/sentrytools/ "http://sourceforge.net/projects/sentrytools/")
-   [Nikto](http://www.cirt.net/code/nikto.shtml "http://www.cirt.net/code/nikto.shtml")
-   [Tripwire](http://www.tripwire.com/ "http://www.tripwire.com/")
-   [Fail2ban](http://www.fail2ban.org/wiki/index.php/Main_Page "http://www.fail2ban.org/wiki/index.php/Main_Page")
-   [Babel
    Enterprise](http://babel.sourceforge.net/en/index.php "http://babel.sourceforge.net/en/index.php")
-   [Prelude](http://www.prelude-ids.org/ "http://www.prelude-ids.org/")
-   [SamHain](http://www.la-samhna.de/samhain/ "http://www.la-samhna.de/samhain/")
-   [OSSEC](http://ossec.net "http://ossec.net")
-   [Bro](http://www.bro-ids.org/ "http://www.bro-ids.org/")
-   [ISCS](http://iscs.sourceforge.net/ "http://iscs.sourceforge.net/")
-   [Osiris](http://osiris.shmoo.com/ "http://osiris.shmoo.com/")
-   [EasyIDS](http://www.skynet-solutions.net/easyids/ "http://www.skynet-solutions.net/easyids/")

### Corrélation d'événements {#correlation-d-evenements .sectionedit10}

-   [SEC](http://www.estpak.ee/~risto/sec/ "http://www.estpak.ee/~risto/sec/")
-   [Swatch](http://swatch.sourceforge.net/ "http://swatch.sourceforge.net/")
-   [Aware](http://www.elegant-software.com/software/aware/ "http://www.elegant-software.com/software/aware/")
-   [Incron](http://inotify.aiken.cz/?section=incron&page=about&lang=en "http://inotify.aiken.cz/?section=incron&page=about&lang=en")
-   [Wots](http://www.e-dynamics.be/?section=programs "http://www.e-dynamics.be/?section=programs")
    : Présenté comme le successeur de Swatch

### Centralisation et analyse de journaux (logs) {#centralisation-et-analyse-de-journaux-logs .sectionedit11}

-   [Logsurfer](http://www.crypt.gen.nz/logsurfer/ "http://www.crypt.gen.nz/logsurfer/")
-   [Lire](http://logreport.org/lire.html "http://logreport.org/lire.html")
-   [Logwatch](http://www2.logwatch.org:81/ "http://www2.logwatch.org:81/")
-   [Syslog-ng](http://www.balabit.com/network-security/syslog-ng/ "http://www.balabit.com/network-security/syslog-ng/")
-   [Snare](http://www.intersectalliance.com/projects/Snare/ "http://www.intersectalliance.com/projects/Snare/")
-   [Octopussy](http://www.8pussy.org/dokuwiki/doku.php "http://www.8pussy.org/dokuwiki/doku.php")
-   [Splunk](http://www.splunk.com/ "http://www.splunk.com/")
-   [Metalog](http://metalog.sourceforge.net/ "http://metalog.sourceforge.net/")
-   [fwlogwatch](http://fwlogwatch.inside-security.de/ "http://fwlogwatch.inside-security.de/")
-   [Tenshi](http://dev.inversepath.com/trac/tenshi "http://dev.inversepath.com/trac/tenshi")
-   [Alerttail](http://alerttail.sourceforge.net/ "http://alerttail.sourceforge.net/")
-   [LMF](http://lmf.sourceforge.net/ "http://lmf.sourceforge.net/")
-   [gltail](http://www.fudgie.org/ "http://www.fudgie.org/") et
    [Logstalgia](http://code.google.com/p/logstalgia/ "http://code.google.com/p/logstalgia/")
-   [Loganalysis : un site regroupant les outils d'analyse de
    logs](http://www.loganalysis.org/ "http://www.loganalysis.org/")
-   [Rsyslog](http://www.rsyslog.com/ "http://www.rsyslog.com/")
-   [ProM
    Import](http://prom.win.tue.nl/tools/promimport/ "http://prom.win.tue.nl/tools/promimport/")
-   [Graylog2](http://www.graylog2.org/ "http://www.graylog2.org/")
-   [LogStash](http://code.google.com/p/logstash/ "http://code.google.com/p/logstash/")
-   [Logster](https://github.com/etsy/logster "https://github.com/etsy/logster")
-   [Fluentd](http://fluentd.org/ "http://fluentd.org/")
-   [Molog](http://wiki.smetj.net/wiki/Molog "http://wiki.smetj.net/wiki/Molog")

### Métrique & Graphes {#metrique-graphes .sectionedit12}

-   [Cacti](http://www.cacti.net "http://www.cacti.net")
-   [Cacinda](http://cacinda.sourceforge.net/ "http://cacinda.sourceforge.net/")
-   [Munin](http://munin.projects.linpro.no/ "http://munin.projects.linpro.no/")
-   [RRDTool](http://oss.oetiker.ch/rrdtool/ "http://oss.oetiker.ch/rrdtool/")
-   [MRTG](http://oss.oetiker.ch/mrtg/ "http://oss.oetiker.ch/mrtg/")
-   [Cricketgraph](http://cricket.sourceforge.net/ "http://cricket.sourceforge.net/")
-   [Ifgraph](http://ifgraph.sourceforge.net/ "http://ifgraph.sourceforge.net/")
-   [Vnstats](http://humdi.net/vnstat/ "http://humdi.net/vnstat/")
-   [StatsDawg](http://www.statsdawg.org/ "http://www.statsdawg.org/")
-   [Collectd](http://collectd.org "http://collectd.org")
-   [Stats
    Collector](http://stats-collector.sourceforge.net/ "http://stats-collector.sourceforge.net/")
-   [Xe
    Toolkit](http://www.captivemetrics.com/Captive_Metrics/Home.html "http://www.captivemetrics.com/Captive_Metrics/Home.html")
-   [Zero RRD
    Framework](http://zerod.sourceforge.net/ "http://zerod.sourceforge.net/")
-   [YaketyStats](http://yaketystats.org/ "http://yaketystats.org/")
-   [gbrrdgraphix](http://gbrrdgraphix.sourceforge.net/ "http://gbrrdgraphix.sourceforge.net/")
    : Interface à RRDTool
-   [Trend](http://www.thregr.org/~wavexx/software/trend/ "http://www.thregr.org/~wavexx/software/trend/")
-   [Graphite](http://graphite.wikidot.com/ "http://graphite.wikidot.com/")
-   [Host-Sflow](http://host-sflow.sourceforge.net/ "http://host-sflow.sourceforge.net/")
    : Métrique sur protocole Sflow
-   [Perfwatcher](http://perfwatcher.org/index.html "http://perfwatcher.org/index.html")
    : Interface pour la métrologie collectd

### Analyse de trafic réseaux {#analyse-de-trafic-reseaux .sectionedit13}

-   [Wireshark](http://www.wireshark.org/ "http://www.wireshark.org/")
-   [Etherape](http://etherape.sourceforge.net/ "http://etherape.sourceforge.net/")
-   [Darkstat](http://dmr.ath.cx/net/darkstat/ "http://dmr.ath.cx/net/darkstat/")
    : Darkstat capture l’ensemble des statistiques pour l’interface
    précisée et présente les résultats dans une interface web sur le
    port 666 par défaut.
-   [Ntop](http://www.ntop.org/ "http://www.ntop.org/") : Identique à
    Darkstat mais plus complet avec un serveur web démarré par défaut
    sur le port 3000.
-   [Smokeping](http://oss.oetiker.ch/smokeping/ "http://oss.oetiker.ch/smokeping/")
-   [Nmap](http://nmap.org/ "http://nmap.org/")
-   [Ettercap](http://ettercap.sourceforge.net/ "http://ettercap.sourceforge.net/")
-   [Bandwidthd](http://bandwidthd.sourceforge.net/ "http://bandwidthd.sourceforge.net/")
-   [Kismet](http://www.kismetwireless.net/ "http://www.kismetwireless.net/")
    : Pour les réseaux sans fil
-   [Cheops-ng](http://cheops-ng.sourceforge.net/ "http://cheops-ng.sourceforge.net/")
-   [Netwhistler](http://netwhistler.sourceforge.net/ "http://netwhistler.sourceforge.net/")
-   [IbMonitor](http://ibmonitor.sourceforge.net/ "http://ibmonitor.sourceforge.net/")
    : Programme en perl mais semble plus succint que ntop ou darkstat.
-   [PHPWeatherMap](http://www.network-weathermap.com/ "http://www.network-weathermap.com/")
-   [Project
    Observer](http://www.project-observer.org/ "http://www.project-observer.org/")
-   [Tcpstat](http://www.frenchfries.net/paul/tcpstat/ "http://www.frenchfries.net/paul/tcpstat/")
-   [Switchmap](http://switchmap.sourceforge.net/ "http://switchmap.sourceforge.net/")
    : Etat des ports sur les switches et routeurs.
-   [Trisul](http://www.unleashnetworks.com/trisul/doku.php "http://www.unleashnetworks.com/trisul/doku.php")
-   [Xplico](http://www.xplico.org/ "http://www.xplico.org/")
-   [pmacct](http://www.pmacct.net/ "http://www.pmacct.net/") et son
    interface
    [PMgraph](http://www.aptivate.org/Projects.BMOTools.pmGraph.html "http://www.aptivate.org/Projects.BMOTools.pmGraph.html")
-   [JustSniffer](http://justniffer.sourceforge.net/ "http://justniffer.sourceforge.net/")
-   [Stager](http://software.uninett.no/stager/ "http://software.uninett.no/stager/")
-   [Fing](http://www.over-look.org/site/ "http://www.over-look.org/site/")
    : Découverte réseau
-   [nfdump](http://nfdump.sourceforge.net/ "http://nfdump.sourceforge.net/")
    et son interface
    [nfsen](http://nfsen.sourceforge.net/#mozTocId301830 "http://nfsen.sourceforge.net/#mozTocId301830")
    : Pour les flux netflow.
-   [Scapy](https://www.secdev.org/projects/scapy/ "https://www.secdev.org/projects/scapy/")
-   [TNV](http://tnv.sourceforge.net/index.php "http://tnv.sourceforge.net/index.php")

### Testing {#testing .sectionedit14}

-   [Open Source
    testing](http://opensourcetesting.org/functional.php "http://opensourcetesting.org/functional.php")
    : Listing complet des applications pour tester les autres
    applications ![;-)](../../../lib/images/smileys/icon_wink.gif)
-   [WebInject](http://www.webinject.org/ "http://www.webinject.org/")
-   [Test
    Maker](http://www.pushtotest.com/ "http://www.pushtotest.com/")
-   [Netperf](http://www.netperf.org/netperf/ "http://www.netperf.org/netperf/")
-   [OpenSTA](http://opensta.org/ "http://opensta.org/")
-   [Selenium
    IDE](http://selenium-ide.openqa.org/ "http://selenium-ide.openqa.org/")
-   [TestGen4Web](http://developer.spikesource.com/wiki/index.php/Projects:TestGen4Web "http://developer.spikesource.com/wiki/index.php/Projects:TestGen4Web")
-   [Linux Test
    Project](http://ltp.sourceforge.net/ "http://ltp.sourceforge.net/")
-   [Funkload](http://funkload.nuxeo.org/ "http://funkload.nuxeo.org/")
    : test de load balancer et de site web
-   [LoadUI](http://www.loadui.org/ "http://www.loadui.org/") : Tests de
    montée en charge mettant l’accent sur l’ergonomie et la modification
    dynamique des tests
-   [Linux audit
    daemon](http://people.redhat.com/sgrubb/audit/ "http://people.redhat.com/sgrubb/audit/")
-   [Phoronix Test
    Suite](http://www.phoronix-test-suite.com/ "http://www.phoronix-test-suite.com/")
-   [Webunit](http://mechanicalcat.net/tech/webunit/ "http://mechanicalcat.net/tech/webunit/")
-   [Webtest](http://webtest.canoo.com/webtest/manual/WebTestHome.html "http://webtest.canoo.com/webtest/manual/WebTestHome.html")
-   [JMeter](http://jakarta.apache.org/jmeter/ "http://jakarta.apache.org/jmeter/")
-   [Expect](http://en.wikipedia.org/wiki/Expect "http://en.wikipedia.org/wiki/Expect")
    : pour scripter et donc tester des connexions ftp, ssh mais plus
    généralement tout ce qui tourne dans un terminal.
-   [Tsung](http://tsung.erlang-projects.org/ "http://tsung.erlang-projects.org/")
    : Tests de montée en charge multi protocoles (HTTP,HTTP, WebDAV,
    SOAP, PostgreSQL, MySQL, LDAP, SSL et XMPP/Jabber). Peut être
    utilisé en cluster pour simuler de grosses montées en charge.
-   [Salome](https://wiki.ow2.org/salome-tmf/ "https://wiki.ow2.org/salome-tmf/")
-   [Cucumber
    Nagios](http://auxesis.github.com/cucumber-nagios/ "http://auxesis.github.com/cucumber-nagios/")
    : Pour remplacer Webinject ?
-   [Webrat](http://gitrdoc.com/brynary/webrat/tree/master/ "http://gitrdoc.com/brynary/webrat/tree/master/")
-   [Siege](http://www.joedog.org/index/siege-home "http://www.joedog.org/index/siege-home")
    : Load testing pour serveur web.
-   [Gnu
    Xnee](http://www.gnu.org/software/xnee/ "http://www.gnu.org/software/xnee/")
    : Enregistrements des actions utilisateurs sur X11.
-   [Sikuli](http://groups.csail.mit.edu/uid/sikuli/ "http://groups.csail.mit.edu/uid/sikuli/")
    : Test de sites web mais que…
-   [Sahi](http://sahi.co.in/w/ "http://sahi.co.in/w/") : Test
    d’applications web
-   [Boomerang](http://yahoo.github.com/boomerang/doc/ "http://yahoo.github.com/boomerang/doc/")
    : Test de serveurs web du point de vue utilisateur par l’équipe de
    dev Yahoo.
-   [Watir](http://watir.com "http://watir.com") : Scénario pour le web.
-   [Cubictest](http://cubictest.seleniumhq.org/ "http://cubictest.seleniumhq.org/")
-   [Twill](http://twill.idyll.org/ "http://twill.idyll.org/")
-   [Grandma](http://code.google.com/p/grandma/ "http://code.google.com/p/grandma/")

### Reporting {#reporting .sectionedit15}

-   [Agatha
    Reports](http://www.agata.org.br/ "http://www.agata.org.br/")
-   [BIRT](http://www.eclipse.org/birt/phoenix/ "http://www.eclipse.org/birt/phoenix/")
-   [Jasper
    Reports](http://www.jasperforge.org/jaspersoft/opensource/business_intelligence/jasperreports/ "http://www.jasperforge.org/jaspersoft/opensource/business_intelligence/jasperreports/")
-   [R Project](http://www.r-project.org/ "http://www.r-project.org/")
-   [ORCA](http://www.orcaware.com/orca/ "http://www.orcaware.com/orca/")
-   [OpenReports](http://oreports.com/ "http://oreports.com/")

### Standards {#standards .sectionedit16}

-   [Scli](https://trac.eecs.iu-bremen.de/projects/scli/ "https://trac.eecs.iu-bremen.de/projects/scli/")
    : Pour les réticents à snmpwalk (SNMP)
-   [Open HPI](http://www.openhpi.org/ "http://www.openhpi.org/") :
    Hardware Platform Interface
-   [IPMI
    Tool](http://ipmitool.sourceforge.net/ "http://ipmitool.sourceforge.net/")
-   [Open
    IPMI](http://openipmi.sourceforge.net/ "http://openipmi.sourceforge.net/")
-   [Open wsman](http://www.openwsman.org/ "http://www.openwsman.org/")
-   [GNU Free
    IPMI](http://www.gnu.org/software/freeipmi/ "http://www.gnu.org/software/freeipmi/")
-   [Open WBEM](http://openwbem.org/ "http://openwbem.org/")
-   [Open
    Pegasus](http://www.openpegasus.org/ "http://www.openpegasus.org/")
-   [SMART](http://smartlinux.sourceforge.net/smart/index.php "http://smartlinux.sourceforge.net/smart/index.php")
-   [JMX](http://java.sun.com/javase/technologies/core/mntr-mgmt/javamanagement/ "http://java.sun.com/javase/technologies/core/mntr-mgmt/javamanagement/")

### Ressources en ligne {#ressources-en-ligne .sectionedit17}

-   [eventid.net](http://www.eventid.net/ "http://www.eventid.net/") :
    vous recherchez les identifiants d’événements d’un outil ou la
    signification d’un id d’événement ? ce site est fait pour vous !
-   [Computer Measurement
    Group](http://www.cmg.org/ "http://www.cmg.org/")
-   [MIB
    Dépôt](http://www.mibdepot.com/index.shtml "http://www.mibdepot.com/index.shtml")
-   [Open Source
    Testing](http://www.opensourcetesting.org/ "http://www.opensourcetesting.org/")

