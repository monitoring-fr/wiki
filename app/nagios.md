---
layout: page
title: Nagios
permalink: /nagios/index.html
---

Dans ce dossier, figure une présentation des fonctionnalités de Nagios,
ainsi qu’un ensemble de documentations et de tutoriels sur la mise en
place d’une architecture de supervision Nagios.

Pour toutes questions, informations complémentaires sur Nagios,
rendez-vous sur le
[forum](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/")
du site.

monitoring-fr.org héberge le [projet de traduction française de la
documentation de Nagios version
3.x](http://www.monitoring-fr.org/2008/10/doc-fr-roadmap "http://www.monitoring-fr.org/2008/10/doc-fr-roadmap").

Vous pouvez toujours trouver la dernière version en ligne ainsi que le
pdf sur le [site de la
documentation](http://doc.monitoring-fr.org "http://doc.monitoring-fr.org").

L’ensemble des travaux en cours liés à la traduction de la documentation
de Nagios version 3.x se trouve pour le moment sur [le dépôt du
projet](https://github.com/monitoring-fr/Documentation-Nagios-3.x-French "https://github.com/monitoring-fr/Documentation-Nagios-3.x-French").

Présentation {#presentation .sectionedit2}
------------

Nagios est un logiciel de supervision destiné à vous informer de
problèmes éventuels dans votre système d’informations avant que vos
clients, utilisateurs ou managers ne le fassent. Il est prévu pour
fonctionner sur système d’exploitation Linux mais fonctionne également
sans problème sur la plupart des variantes \*NIX. Le démon de
supervision effectue des contrôles intermittents sur les hôtes et
services que vous spécifiez en utilisant des plugins externes qui
retournent un status d’état à Nagios. Quand des problèmes surviennent,
il peut envoyer des notifications à des contacts administratifs de
façons différentes (email, SMS, messagerie instantanée, etc…). Les
informations d’états courants, les historiques et les rapports peuvent
être consultés à partir d’un simple navigateur.

Documentation {#documentation .sectionedit3}
-------------

### I - Nagios {#i-nagios .sectionedit4}

**[Introduction à
Nagios](nagios-introduction.html "nagios:nagios-introduction")**

**[Introduction aux objets de
configuration](configobjects.html "nagios:configobjects")**

### II - Installation {#ii-installation .sectionedit5}

**[Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
LTS](ubuntu-install.html "nagios:ubuntu-install")**

**[Installation de Nagios 3.x sur CentOS
5.3](nagios-centos-install.html "nagios:nagios-centos-install")**

### III - Guide du débutant {#iii-guide-du-debutant .sectionedit6}

**[NAGIOS - Guide de démarrage pour
débutant](nagios-debutant/start.html "nagios:nagios-debutant:start")**

-   [Boîte à outils
    Nagios](nagios-debutant/boite-a-outils.html "nagios:nagios-debutant:boite-a-outils")
-   [Ce qu'il faut savoir sur
    Nagios](nagios-debutant/ce-qu-il-faut-savoir.html "nagios:nagios-debutant:ce-qu-il-faut-savoir")
-   [Création du premier groupe
    d'hôte](nagios-debutant/creer-son-premier-hostgroup.html "nagios:nagios-debutant:creer-son-premier-hostgroup")
-   [Créer son premier contact et groupe de
    contacts](nagios-debutant/creer-son-premier-contact.html "nagios:nagios-debutant:creer-son-premier-contact")
-   [Créer son premier
    hôte](nagios-debutant/creer-son-premier-hote.html "nagios:nagios-debutant:creer-son-premier-hote")
-   [Créer son premier
    service](nagios-debutant/creer-son-premier-service.html "nagios:nagios-debutant:creer-son-premier-service")
-   [Créer une nouvelle
    commande](nagios-debutant/creer-sa-premiere-commande.html "nagios:nagios-debutant:creer-sa-premiere-commande")
-   [Les templates et les "pivots" de
    configuration](nagios-debutant/templates-hostgroups-pivots.html "nagios:nagios-debutant:templates-hostgroups-pivots")
-   [Nettoyage de la configuration
    post-install](nagios-debutant/nettoyage-de-la-configuration.html "nagios:nagios-debutant:nettoyage-de-la-configuration")

### IV - Liste des Plugins Nagios {#iv-liste-des-plugins-nagios .sectionedit7}

**[Nagios Plugins](plugins/start.html "nagios:plugins:start")**

-   [check\_procs](plugins/check_procs.html "nagios:plugins:check_procs")
-   [check\_prelude](plugins/check_prelude.html "nagios:plugins:check_prelude")
-   [check\_multi](plugins/check_multi.html "nagios:plugins:check_multi")
-   [check\_procs2](plugins/check_procs2.html "nagios:plugins:check_procs2")
-   [check\_rrd](../plugins/check_rrd.html "nagios:plugins:check_rrd")
-   [Cucumber
    Nagios](plugins/cucumber-nagios.html "nagios:plugins:cucumber-nagios")
-   [Supervision de type End User Experience avec Cucumber &
    Watir](plugins/cucumber-nagios-watir.html "nagios:plugins:cucumber-nagios-watir")
-   [check\_webpage.rb](plugins/check_webpage.rb.html "nagios:plugins:check_webpage.rb")
-   [check\_jmx](plugins/check_jmx.html "nagios:plugins:check_jmx")
-   [check\_http](plugins/check_http.html "nagios:plugins:check_http")
-   [check\_citrix\_lic](plugins/check_citrix_lic.html "nagios:plugins:check_citrix_lic")
-   [check\_by\_ssh](plugins/check_by_ssh.html "nagios:plugins:check_by_ssh")
-   [check\_apt](plugins/check_apt.html "nagios:plugins:check_apt")
-   [check\_dnsbl](plugins/check_dnsbl.html "nagios:plugins:check_dnsbl")
-   [check\_esx3](plugins/check_esx3.html "nagios:plugins:check_esx3")
-   [check\_hpasm](plugins/check_hpasm.html "nagios:plugins:check_hpasm")
-   [check\_esx3\_dp](plugins/check_esx3_dp.html "nagios:plugins:check_esx3_dp")
-   [Best of plugins compatibles
    Nagios](plugins/bestof.html "nagios:plugins:bestof")

### V - Liste des Addons Nagios {#v-liste-des-addons-nagios .sectionedit8}

**[Nagios Addons](addons/start.html "nagios:addons:start")**

-   [Ninja](addons/ninja.html "nagios:addons:ninja")
-   [Netways Grapher
    V2](addons/netways-grapher-v2.html "nagios:addons:netways-grapher-v2")
-   [NConf](addons/nconf.html "nagios:addons:nconf")
-   [NagTrap](../addons/nagtrap.html "nagios:addons:nagtrap")
-   [Protocole NRPE](addons/nrpe.html "nagios:addons:nrpe")
-   [Protocole NSCA](addons/nsca.html "nagios:addons:nsca")
-   [Vautour
    Style](addons/vautour-style.html "nagios:addons:vautour-style")
-   [omd Open Monitoring
    Distribution](addons/omd.html "nagios:addons:omd")
-   [NSClient++](addons/nsclient.html "nagios:addons:nsclient")
-   [NagiosQL](addons/nagiosql.html "nagios:addons:nagiosql")
-   [NagiosGrapher](addons/nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [PNP4Nagios](addons/pnp/start.html "nagios:addons:pnp:start")
-   [NDOUtils](addons/ndoutils.html "nagios:addons:ndoutils")
-   [NagVis](addons/nagvis/start.html "nagios:addons:nagvis:start")
-   [Lilac
    Platform](addons/lilac-platform.html "nagios:addons:lilac-platform")
-   [Merlin](../addons/merlin.html "nagios:addons:merlin")
-   [NagiosDigger](addons/nagiosdigger.html "nagios:addons:nagiosdigger")
-   [Nagios Business Process
    Addon](addons/nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [Setup distribué avec
    Mod\_Gearman](addons/mod_gearman.html "nagios:addons:mod_gearman")
-   [check\_mk](addons/check_mk/start.html "nagios:addons:check_mk:start")

### VI - Liste des Intégrations Nagios {#vi-liste-des-integrations-nagios .sectionedit9}

**[Nagios
Integration](integration/start.html "nagios:integration:start")**

-   [Rsyslog](integration/rsyslog.html "nagios:integration:rsyslog")
-   [Intégration de Prelude-IDS à
    Nagios](integration/prelude.html "nagios:integration:prelude")
-   [SEC](integration/sec.html "nagios:integration:sec")
-   [SmokePing](integration/smokeping.html "nagios:integration:smokeping")
-   [Wordpress4nagios](../integration/wordpress.html "nagios:integration:wordpress")
-   [Webinject](integration/webinject.html "nagios:integration:webinject")
-   [OSSEC](integration/ossec.html "nagios:integration:ossec")
-   [Nagios Plugin for
    Cacti](integration/npc.html "nagios:integration:npc")
-   [Collectd](integration/collectd.html "nagios:integration:collectd")
-   [Blosxom4nagios](../integration/blosxom4nagios.html "nagios:integration:blosxom4nagios")
-   [Incron &
    LoggedFS](integration/incron.html "nagios:integration:incron")
-   [Intégrer Job Scheduler à
    Nagios](integration/jobscheduler.html "nagios:integration:jobscheduler")
-   [Nmon](integration/nmon.html "nagios:integration:nmon")
-   [Monit](integration/monit.html "nagios:integration:monit")
-   [Octopussy](integration/8pussy.html "nagios:integration:8pussy")

### VII - Expertise {#vii-expertise .sectionedit10}

**[Arborescence des
fichiers](installation-layout.html "nagios:installation-layout")**

**[Données Nagios dans un ramdisk](ramdisk.html "nagios:ramdisk")**

**[Nagios et les
notifications](notifications.html "nagios:notifications")**

**[Commandes de remontée de
contrôle](ocsp-ochp.html "nagios:ocsp-ochp")**

**[Référence des objets de
configuration](objects-reference.html "nagios:objects-reference")**

**[Outils de supervision d'un hôte
Windows](windows-client.html "nagios:windows-client")**

### VIII - Trucs & Astuces {#viii-trucs-astuces .sectionedit11}

**[check-list de diagnostic](debug.html "nagios:debug")**

**[Event Handlers](event_handlers.html "nagios:event_handlers")**

**[Superviser un hôte Windows avec
NSClient++](nagios-nsclient-host.html "nagios:nagios-nsclient-host")**

**[Liens Nagios](links.html "nagios:links")**

**[Gabarits d'objets de
configuration](templates.html "nagios:templates")**

**[Supervision vmware esx](vmware_esx.html "nagios:vmware_esx")**

**[Supervision Windows en mode
passif](supervision-windows-passif.html "nagios:supervision-windows-passif")**

**[Mise en place complète de Nagios sur RHEL
5.4](mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")**

-   [Supervision Nagios
    SNMP](mise-en-place-complete-nagios-sur-rhel-5.4/supervision-nagios-snmp.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:supervision-nagios-snmp")
-   [Supervision Nagios
    Agent](mise-en-place-complete-nagios-sur-rhel-5.4/supervision-nagios-agent.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:supervision-nagios-agent")
-   [Nagios complet avec NDOUtils et
    Nagvis](mise-en-place-complete-nagios-sur-rhel-5.4/nagios-infrastructure-complete.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:nagios-infrastructure-complete")
-   [Extension Mozilla Firefox : Nagios
    Checker](mise-en-place-complete-nagios-sur-rhel-5.4/nagios-checker.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:nagios-checker")

### IX - Suppléments {#ix-supplements .sectionedit12}

**[La supervision en général sur le wiki
Monitoring-fr](../supervision/start.html "supervision:start")**

-   [Panorama](../supervision/links.html "supervision:links")
-   [Supervision Hardware
    IPMI](../supervision/ipmi.html "supervision:ipmi")
-   [Mode passif](../supervision/passif.html "supervision:passif")
-   [RRDTool](../supervision/rrdtool.html "supervision:rrdtool")
-   [Installer ou activer
    SNMP](../supervision/snmp-install.html "supervision:snmp-install")
-   [Tableaux récapitulatifs des différents fichiers
    importants](../supervision/important-files.html "supervision:important-files")
-   [Dstat](../supervision/dstat.html "supervision:dstat")
-   [Ntop](../supervision/ntop/start.html "supervision:ntop:start")
-   [SNMP](../supervision/snmp.html "supervision:snmp")
-   [Mode actif](../supervision/actif.html "supervision:actif")
-   [Commandes pour la
    supervision](../supervision/commands.html "supervision:commands")
-   [Supervision du ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")