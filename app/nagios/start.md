---
layout: page
---

[[[Nagios](start@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start")

### Table des matières {.toggle}

-   [Nagios](start.html#nagios)
    -   [Présentation](start.html#presentation)
    -   [Documentation](start.html#documentation)
        -   [I - Nagios](start.html#i-nagios)
        -   [II - Installation](start.html#ii-installation)
        -   [III - Guide du débutant](start.html#iii-guide-du-debutant)
        -   [IV - Liste des Plugins
            Nagios](start.html#iv-liste-des-plugins-nagios)
        -   [V - Liste des Addons
            Nagios](start.html#v-liste-des-addons-nagios)
        -   [VI - Liste des Intégrations
            Nagios](start.html#vi-liste-des-integrations-nagios)
        -   [VII - Expertise](start.html#vii-expertise)
        -   [VIII - Trucs & Astuces](start.html#viii-trucs-astuces)
        -   [IX - Suppléments](start.html#ix-supplements)

[![](../assets/media/nagios/nagios_logo.png@w=200)](../_detail/nagios/nagios_logo.png@id=nagios%253Astart.html "nagios:nagios_logo.png")

Nagios {#nagios .sectionedit1}
======

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

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](start.html "nagios:start")
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

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Nagios {#nagios .sectionedit1}
------

-   [Arborescence des
    fichiers](installation-layout.html "nagios:installation-layout")
-   [Commandes de remontée de
    contrôle](ocsp-ochp.html "nagios:ocsp-ochp")
-   [Données Nagios dans un ramdisk](ramdisk.html "nagios:ramdisk")
-   [Event Handlers](event_handlers.html "nagios:event_handlers")
-   [Gabarits d'objets de
    configuration](templates.html "nagios:templates")
-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](ubuntu-install.html "nagios:ubuntu-install")
-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](debian-install.html "nagios:debian-install")
-   [Installation de Nagios 3.x sur CentOS
    5.3](nagios-centos-install.html "nagios:nagios-centos-install")
-   [Introduction aux objets de
    configuration](configobjects.html "nagios:configobjects")
-   [Introduction à
    Nagios](nagios-introduction.html "nagios:nagios-introduction")
-   [Liens Nagios](links.html "nagios:links")
-   [Mise en place complète de Nagios sur RHEL
    5.4](mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")
-   [NAGIOS - Guide de démarrage pour
    débutant](nagios-debutant/start.html "nagios:nagios-debutant:start")
-   [Nagios Addons](addons/start.html "nagios:addons:start")
-   [Nagios
    Integration](integration/start.html "nagios:integration:start")
-   [Nagios Plugins](plugins/start.html "nagios:plugins:start")
-   [Nagios et les
    notifications](notifications.html "nagios:notifications")
-   [Outils de supervision d'un hôte
    Windows](windows-client.html "nagios:windows-client")
-   [Référence des objets de
    configuration](objects-reference.html "nagios:objects-reference")
-   [Superviser un hôte Windows avec
    NSClient++](nagios-nsclient-host.html "nagios:nagios-nsclient-host")
-   [Supervision Windows en mode
    passif](supervision-windows-passif.html "nagios:supervision-windows-passif")
-   [Supervision vmware esx](vmware_esx.html "nagios:vmware_esx")
-   [check-list de diagnostic](debug.html "nagios:debug")

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

nagios/start.txt · Dernière modification: 2013/03/29 09:39 (modification
externe)

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

![](../lib/exe/indexer.php@id=nagios%253Astart&1424859522)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
