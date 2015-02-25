---
layout: page
---

[[[Supervision](start@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Supervision](start.html "supervision:start")

### Table des matières {.toggle}

-   [Supervision](start.html#supervision)
    -   [Superviser : quoi ?](start.html#superviserquoi)
-   [Les niveaux de supervision](start.html#les-niveaux-de-supervision)
    -   [supervision
        environnementale](start.html#supervision-environnementale)
    -   [supervision réseau et
        matérielle](start.html#supervision-reseau-et-materielle)
    -   [supervision des systèmes](start.html#supervision-des-systemes)
    -   [supervision des applications et
        services](start.html#supervision-des-applications-et-services)
    -   [Superviser : pourquoi ?](start.html#superviserpourquoi)
    -   [Superviser : comment ?](start.html#supervisercomment)
-   [Supervision sur le wiki
    monitoring-fr](start.html#supervision-sur-le-wiki-monitoring-fr)
    -   [Documentation Nagios](start.html#documentation-nagios)
    -   [Documentation Centreon](start.html#documentation-centreon)
    -   [Documentation Shinken](start.html#documentation-shinken)
    -   [Documentation Zabbix](start.html#documentation-zabbix)
    -   [Documentation OpenNMS](start.html#documentation-opennms)
    -   [Documentation
        EyesOfNetwork](start.html#documentation-eyesofnetwork)
    -   [Documentation Groundwork](start.html#documentation-groundwork)
    -   [Documentation Zenoss](start.html#documentation-zenoss)
    -   [Documentation Vigilo](start.html#documentation-vigilo)
    -   [Documentations diverses](start.html#documentations-diverses)
-   [Supervision sur le web
    francophone](start.html#supervision-sur-le-web-francophone)
    -   [Nicolargo](start.html#nicolargo)
    -   [Dusart](start.html#dusart)
    -   [Minitux](start.html#minitux)
    -   [Lolokai](start.html#lolokai)
    -   [Alexnogard](start.html#alexnogard)

Supervision {#supervision .sectionedit1}
-----------

Fonction qui consiste à indiquer et à commander l’état d’un appel, d’un
système ou d’un réseau. Les solutions de supervision permettent de
remonter des informations techniques et fonctionnelles du système
d’information.

L’informatique étant devenue l’épine dorsale de l’entreprise quel que
soit son secteur d’activité, le système d’information est au centre de
l’activité de différentes entités métiers et doit fonctionner pleinement
et en permanence pour garantir l’efficacité de l’entreprise. A tous les
niveaux, les réseaux, les terminaux utilisateurs, les serveurs
d’applications et les données constituent autant de maillons sensibles
dont la disponibilité et la qualité de service conditionnent le bon
fonctionnement de l’entreprise.

Les problèmes liés à l’informatique doivent donc être réduits au
minimum, car une indisponibilité du système d’information a des impacts
très préjudiciables sur l’activité et sur la notoriété d’une entreprise.

Il existe deux enjeux majeurs pour les directions informatiques. Le
premier est de garantir la disponibilité et les niveaux de service du
système en cas de panne ou de dégradation des performances (par des
mécanismes de redondance et d’équilibrage…). Le second est de tenter de
prévenir en cas de problème et, le cas échéant, garantir une remontée
d’information rapide et une durée d’intervention minimale. C’est le rôle
de la supervision.

  Si disponible…   A.K.A…       Indisponibilité annuelle
  ---------------- ------------ -----------------------------------
  90%              n/a          876 heures
  95%              n/a          438 heures
  99%              deux 9’s     87 heures, 36 minutes
  99.9%            trois 9’s    8 heures, 45 minutes, 36 secondes
  99.99%           quatre 9’s   52 minutes, 33.6 secondes
  99.999%          cinq 9’s     5 minutes, 15.36 secondes
  99.9999%         six 9’s      31.68 secondes

La supervision, domaine vaste de l’informatique, inclut donc plusieurs
activités :

-   Surveiller
-   Visualiser
-   Analyser
-   Piloter
-   Agir
-   Alerter
-   …

### Superviser : quoi ? {#superviserquoi .sectionedit3}

La supervision informatique permet de superviser l’ensemble du système
d’Information de l’entreprise :

-   Le réseau et ses équipements
-   Les serveurs
-   Les périphériques
-   Les applications
-   Le workflow
-   Surveiller les systèmes d’information
-   assurer la disponibilité des services.
-   prévenir les défaillances.
-   détecter les anomalies (sécurité, système).
-   fédérer l’information d’équipements hétérogénes en un portail
    unique.
-   Automatiser les téches
-   alerter en cas d’interruption d’un service.
-   relancer des services interrompus.
-   …

Les niveaux de supervision {#les-niveaux-de-supervision .sectionedit4}
--------------------------

### supervision environnementale {#supervision-environnementale .sectionedit5}

-   température de la pièce
-   humidité de la pièce

### supervision réseau et matérielle {#supervision-reseau-et-materielle .sectionedit6}

-   commutateurs et routeurs : disponibilité, interrogation des sondes,
    alertes.
-   serveurs : disponibilité, interrogation des sondes matérielles,
    alertes.
-   onduleurs : disponibilité, charge, état.
-   imprimantes : disponibilité, état de l’imprimante et des
    consommables.

### supervision des systèmes {#supervision-des-systemes .sectionedit7}

-   commutateurs : utilisation des ressources, métrologie.
-   serveurs : utilisation des ressources.

### supervision des applications et services {#supervision-des-applications-et-services .sectionedit8}

-   disponibilité.
-   cohérence des réponses aux interrogations.
-   performances.

### Superviser : pourquoi ? {#superviserpourquoi .sectionedit9}

L’informatique est au coeur de l’entreprise, quelle que soit son secteur
d’activité. On peut facilement comparer la place que joue l’informatique
au sein d’une entreprise é celle que joue le système nerveux chez l’étre
humain. En effet, il est au centre de l’activité, et doit fonctionner
pleinement et en permanence pour garantir l’activité. Certaines
ramifications méme comme le réseau et les terminaux utilisateurs doivent
aussi fonctionner, à l’instar des nerfs du système dans le corps humain.

Les problèmes liés à l’informatique doivent donc étre réduits au
minimum, car une indisponibilité du système d’information peut étre la
cause de plusieurs millions d’euros de pertes.

Deux phases sont donc importantes pour les directeurs informatiques :
garantir la disponibilité du système en cas de panne (par des mécanismes
de redondance…) mais aussi tenter de prévenir en cas de problème et, le
cas échéant, garantir une remontée d’information rapide et une durée
d’intervention minimale : c’est le rôle de la supervision.

### Superviser : comment ? {#supervisercomment .sectionedit10}

Il existe plusieurs méthodes pour superviser le système d’information :

-   Analyser les fichiers de log
-   Récupérer des résultats de commandes et de scripts locaux ou
    distants
-   [Supervision en mode actif](actif.html "supervision:actif")
-   [Supervision en mode passif](passif.html "supervision:passif")

Supervision sur le wiki monitoring-fr {#supervision-sur-le-wiki-monitoring-fr .sectionedit11}
-------------------------------------

-   [Commandes pour la
    supervision](commands.html "supervision:commands")
-   [Dstat](dstat.html "supervision:dstat")
-   [Installer ou activer
    SNMP](snmp-install.html "supervision:snmp-install")
-   [Mode actif](actif.html "supervision:actif")
-   [Mode passif](passif.html "supervision:passif")
-   [Ntop](ntop/start.html "supervision:ntop:start")
-   [Panorama](links.html "supervision:links")
-   [RRDTool](rrdtool.html "supervision:rrdtool")
-   [SNMP](snmp.html "supervision:snmp")
-   [Supervision Hardware IPMI](ipmi.html "supervision:ipmi")
-   [Supervision du ressenti
    utilisateur](eue/start.html "supervision:eue:start")
-   [Tableaux récapitulatifs des différents fichiers
    importants](important-files.html "supervision:important-files")

### Documentation Nagios {#documentation-nagios .sectionedit12}

-   [Référence des objets de
    configuration](../nagios/objects-reference.html "nagios:objects-reference")
-   [Nagios et les
    notifications](../nagios/notifications.html "nagios:notifications")
-   [Superviser un hôte Windows avec
    NSClient++](../nagios/nagios-nsclient-host.html "nagios:nagios-nsclient-host")
-   [Introduction à
    Nagios](../nagios/nagios-introduction.html "nagios:nagios-introduction")
-   [Commandes de remontée de
    contrôle](../nagios/ocsp-ochp.html "nagios:ocsp-ochp")
-   [Données Nagios dans un
    ramdisk](../nagios/ramdisk.html "nagios:ramdisk")
-   [Supervision vmware
    esx](../nagios/vmware_esx.html "nagios:vmware_esx")
-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](../nagios/ubuntu-install.html "nagios:ubuntu-install")
-   [Gabarits d'objets de
    configuration](../nagios/templates.html "nagios:templates")
-   [Supervision Windows en mode
    passif](../nagios/supervision-windows-passif.html "nagios:supervision-windows-passif")
-   [Installation de Nagios 3.x sur CentOS
    5.3](../nagios/nagios-centos-install.html "nagios:nagios-centos-install")
-   [Liens Nagios](../nagios/links.html "nagios:links")
-   [Nagios
    Plugins](../nagios/plugins/start.html "nagios:plugins:start")
-   [NAGIOS - Guide de démarrage pour
    débutant](../nagios/nagios-debutant/start.html "nagios:nagios-debutant:start")
-   [Mise en place complète de Nagios sur RHEL
    5.4](../nagios/mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")
-   [Nagios
    Integration](../nagios/integration/start.html "nagios:integration:start")
-   [Outils de supervision d'un hôte
    Windows](../nagios/windows-client.html "nagios:windows-client")
-   [Introduction aux objets de
    configuration](../nagios/configobjects.html "nagios:configobjects")
-   [Arborescence des
    fichiers](../nagios/installation-layout.html "nagios:installation-layout")
-   [Event
    Handlers](../nagios/event_handlers.html "nagios:event_handlers")
-   [check-list de diagnostic](../nagios/debug.html "nagios:debug")
-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](../nagios/debian-install.html "nagios:debian-install")
-   [Nagios Addons](../nagios/addons/start.html "nagios:addons:start")

### Documentation Centreon {#documentation-centreon .sectionedit13}

-   [Nagios Centreon
    part1](../centreon/nagios-centreon-part1.html "centreon:nagios-centreon-part1")
-   [Installation du patch multi-broker pour
    Centreon](../centreon/multi-broker-patch-install.html "centreon:multi-broker-patch-install")
-   [Installation MKLivestatus & Intégration dans
    Centreon](../centreon/mklivestatus-install-integration-centreon.html "centreon:mklivestatus-install-integration-centreon")
-   [Nagios Centreon
    part2](../centreon/nagios-centreon-part2.html "centreon:nagios-centreon-part2")
-   [Superviser un Autocom OXE V9.x Alcatel-Lucent sous
    Centreon/Nagios](../centreon/superviser-oxe-alcatel.html "centreon:superviser-oxe-alcatel")
-   [Tableau de correspondance des
    plugins](../centreon/tableau-correspondance-plugins.html "centreon:tableau-correspondance-plugins")
-   [Superviser le spanning-tree sous
    Centreon/Nagios](../centreon/superviser-spanning-tree.html "centreon:superviser-spanning-tree")
-   [Intégrer Nagvis dans
    Centreon](../centreon/integration-nagvis.html "centreon:integration-nagvis")
-   [Installation de Centreon 2.2 sur Ubuntu Server
    10.04](../centreon/centreon-ubuntu-install.html "centreon:centreon-ubuntu-install")
-   [Documentation Technique sur
    Centreon](../centreon/centreon-doc-technique.html "centreon:centreon-doc-technique")
-   [Installation de Centreon 2.1 sur CentOS
    5.3](../centreon/centreon-centos-install.html "centreon:centreon-centos-install")
-   [Installation de Shinken sur Centreon Enterprise
    Server](../centreon/centreon-enterprise-server-shinken.html "centreon:centreon-enterprise-server-shinken")
-   [Installation de Centreon Enterprise
    Server](../centreon/centreon-enterprise-server.html "centreon:centreon-enterprise-server")
-   [Installation Nagios / Centreon sur RedHat
    EL](../centreon/centreon-redhat-install.html "centreon:centreon-redhat-install")
-   [Présentation de l'interface Centreon 2.1 et de son
    utilisation](../centreon/centreon-interface-utilisation.html "centreon:centreon-interface-utilisation")
-   [Manuel d'utilisation
    Centreon](../centreon/manuel-utilisation/start.html "centreon:manuel-utilisation:start")

### Documentation Shinken {#documentation-shinken .sectionedit14}

-   [Introduction à
    Shinken](../shinken/shinken-introduction.html "shinken:shinken-introduction")
-   [Shinken en haute disponiblité sur 2
    noeuds](../shinken/shinken-ha-2noeuds.html "shinken:shinken-ha-2noeuds")
-   [Ressources et Performances de
    Shinken](../shinken/shinken-ressources.html "shinken:shinken-ressources")
-   [Installation de Shinken sur Ubuntu
    server](../shinken/shinken-ubuntu-install-with-nagios.html "shinken:shinken-ubuntu-install-with-nagios")
-   [Fonctionnement de
    Shinken](../shinken/shinken-work.html "shinken:shinken-work")
-   [Installation de Shinken sur Ubuntu server 10.04
    LTS](../shinken/shinken-ubuntu-install.html "shinken:shinken-ubuntu-install")
-   [Installation Shinken 0.8 sur Debian
    Squeeze](../shinken/shinken-debian-squeeze-install.html "shinken:shinken-debian-squeeze-install")
-   [Installation de Shinken sur Debian
    Lenny](../shinken/shinken-debian-install.html "shinken:shinken-debian-install")
-   [Installation de Shinken par
    script](../shinken/install-script.html "shinken:install-script")
-   [Comment activer et utiliser le module
    livestatus](../shinken/enable_livestatus_module.html "shinken:enable_livestatus_module")
-   [Instalation de shinken les yeux
    fermés](../shinken/shinken-10min-start.html "shinken:shinken-10min-start")
-   [Les architectures avancées de
    Shinken](../shinken/shinken-advanced-architecture.html "shinken:shinken-advanced-architecture")
-   [Installation de Shinken sur
    CentOS](../shinken/shinken-centos-install.html "shinken:shinken-centos-install")
-   [Configuration et
    lancement](../shinken/shinken-architecture-config.html "shinken:shinken-architecture-config")
-   [Interface
    Shinken](../shinken/shinken-use-ui.html "shinken:shinken-use-ui")

### Documentation Zabbix {#documentation-zabbix .sectionedit15}

-   [Superviser un hôte SNMP avec
    Zabbix](../zabbix/zabbix-snmp-host.html "zabbix:zabbix-snmp-host")
-   [Notification par sms dans
    Zabbix](../zabbix/zabbix-sms-notification.html "zabbix:zabbix-sms-notification")
-   [Ressources et performances de
    Zabbix](../zabbix/zabbix-resources.html "zabbix:zabbix-resources")
-   [Gestion des triggers dans
    Zabbix](../zabbix/zabbix-trigger-use.html "zabbix:zabbix-trigger-use")
-   [Installation Zabbix 1.4.2 sur Ubuntu
    8.04](../zabbix/zabbix-ubuntu-install-old.html "zabbix:zabbix-ubuntu-install-old")
-   [Fonctionnement de
    Zabbix](../zabbix/zabbix-work.html "zabbix:zabbix-work")
-   [Prise en main de
    Zabbix](../zabbix/zabbix-use.html "zabbix:zabbix-use")
-   [Installation de Zabbix sur
    Ubuntu](../zabbix/zabbix-ubuntu-install.html "zabbix:zabbix-ubuntu-install")
-   [Optimisation de
    Zabbix](../zabbix/zabbix-optimization.html "zabbix:zabbix-optimization")
-   [Gestion des items dans
    Zabbix](../zabbix/zabbix-item-use.html "zabbix:zabbix-item-use")
-   [Architectures distribuées de
    Zabbix](../zabbix/zabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture")
-   [Découverte d'équipements dans
    Zabbix](../zabbix/zabbix-discovery.html "zabbix:zabbix-discovery")
-   [Installation de Zabbix sur
    Centos](../zabbix/zabbix-centos-install.html "zabbix:zabbix-centos-install")
-   [Notification par email dans
    Zabbix](../zabbix/zabbix-email-notification.html "zabbix:zabbix-email-notification")
-   [Catalogues des erreurs dans
    Zabbix](../zabbix/zabbix-errors.html "zabbix:zabbix-errors")
-   [Introduction à
    Zabbix](../zabbix/zabbix-introduction.html "zabbix:zabbix-introduction")
-   [Interface Web de
    Zabbix](../zabbix/zabbix-interface.html "zabbix:zabbix-interface")
-   [Gestion des actions dans
    Zabbix](../zabbix/zabbix-action-use.html "zabbix:zabbix-action-use")

### Documentation OpenNMS {#documentation-opennms .sectionedit16}

-   [Optimisations
    possibles](../opennms/optimisation.html "opennms:optimisation")
-   [Redondance avec Heartbeat et
    Mon](../opennms/redondance.html "opennms:redondance")
-   [Découverte et supervision des services (capsd et
    pollerd)](../opennms/services.html "opennms:services")
-   [Interface Web
    d'OpenNMS](../opennms/opennms-interface.html "opennms:opennms-interface")
-   [Installation d'OpenNMS sur Ubuntu 8.0.4
    LTS](../opennms/install-on-ubuntu.html "opennms:install-on-ubuntu")
-   [Découverte des équipements
    (discovery)](../opennms/discovery.html "opennms:discovery")
-   [Configuration des évènements et des
    alarmes](../opennms/events-alarms.html "opennms:events-alarms")
-   [Installation d'OpenNMS sur CentOS
    5.x](../opennms/install-on-centos.html "opennms:install-on-centos")
-   [Personnalisation de
    l'interface](../opennms/custom-ihm.html "opennms:custom-ihm")

### Documentation EyesOfNetwork {#documentation-eyesofnetwork .sectionedit17}

-   [Installation de
    EyesOfNetwork](../eyesofnetwork/eyesofnetwork-iso-install.html "eyesofnetwork:eyesofnetwork-iso-install")
-   [Interface Web de
    EyesOfNetwork](../eyesofnetwork/eyesofnetwork-interface.html "eyesofnetwork:eyesofnetwork-interface")

### Documentation Groundwork {#documentation-groundwork .sectionedit18}

-   [Installation de Groundwork Bêta 6.0 sur Ubuntu 8.0.4
    LTS](../groundwork/groundwork6.0-install-ubuntu.html "groundwork:groundwork6.0-install-ubuntu")
-   [Installation GroundWork sur Ubuntu 8.0.4
    LTS](../groundwork/groundwork-ubuntu-install.html "groundwork:groundwork-ubuntu-install")

### Documentation Zenoss {#documentation-zenoss .sectionedit19}

-   [Installation de Zenoss sur
    Ubuntu](../zenoss/zenoss-ubuntu-install.html "zenoss:zenoss-ubuntu-install")
-   [Interface Web de
    Zenoss](../zenoss/zenoss-interface.html "zenoss:zenoss-interface")

### Documentation Vigilo {#documentation-vigilo .sectionedit20}

-   [Installation Vigilo sur Ubuntu 8.0.4
    LTS](../vigilo/vigilo-ubuntu-install.html "vigilo:vigilo-ubuntu-install")

### Documentations diverses {#documentations-diverses .sectionedit21}

-   [Installation de Hyperic HQ sur Ubuntu 8.0.4
    LTS](../various/hyperic-ubuntu-install.html "various:hyperic-ubuntu-install")
-   [Installation de Ganglia sur Ubuntu 8.0.4
    LTS](../various/ganglia-ubuntu-install.html "various:ganglia-ubuntu-install")

Supervision sur le web francophone {#supervision-sur-le-web-francophone .sectionedit22}
----------------------------------

### Nicolargo {#nicolargo .sectionedit23}

-   [Nagios 4: Résoudre l’erreur “Can’t open
    /etc/rc.d/init.d/functions”](http://blog.nicolargo.com/2013/10/nagios-4-resoudre-lerreur-cant-open-etcrc-dinit-dfunctions.html "http://blog.nicolargo.com/2013/10/nagios-4-resoudre-lerreur-cant-open-etcrc-dinit-dfunctions.html")
    (2013/10/25 13:37)
-   [Supervision d’un NAS NetApp avec Nagios ou
    Shinken](http://blog.nicolargo.com/2013/09/supervision-dun-nas-netapp-nagios-shinken.html "http://blog.nicolargo.com/2013/09/supervision-dun-nas-netapp-nagios-shinken.html")
    (2013/09/11 08:00)
-   [CheckGlances ou la rencontre de Glances et de
    Nagios](http://blog.nicolargo.com/2012/12/checkglances-ou-la-rencontre-de-glances-et-de-nagios.html "http://blog.nicolargo.com/2012/12/checkglances-ou-la-rencontre-de-glances-et-de-nagios.html")
    (2012/12/05 09:30)
-   [Installation pas à pas d’un serveur de supervision
    Shinken](http://blog.nicolargo.com/2012/11/installation-pas-a-pas-dun-serveur-de-supervision-shinken.html "http://blog.nicolargo.com/2012/11/installation-pas-a-pas-dun-serveur-de-supervision-shinken.html")
    (2012/11/06 14:27)
-   [Interview de Jean Gabes pour la sortie de Shinken
    1.2](http://blog.nicolargo.com/2012/09/interview-de-jean-gabes-pour-la-sortie-de-shinken-1-2.html "http://blog.nicolargo.com/2012/09/interview-de-jean-gabes-pour-la-sortie-de-shinken-1-2.html")
    (2012/09/06 10:00)
-   [Superviser PHP-FPM avec Nagios ou
    Shinken](http://blog.nicolargo.com/2012/05/superviser-php-fpm-avec-nagios-ou-shinken.html "http://blog.nicolargo.com/2012/05/superviser-php-fpm-avec-nagios-ou-shinken.html")
    (2012/05/30 07:30)
-   [Supervision d’un serveur Web/WordPress avec
    Shinken](http://blog.nicolargo.com/2011/09/supervision-dun-serveur-webwordpress-avec-shinken.html "http://blog.nicolargo.com/2011/09/supervision-dun-serveur-webwordpress-avec-shinken.html")
    (2011/09/16 07:58)
-   [Interview de Jean Gabes, le créateur de
    Shinken](http://blog.nicolargo.com/2011/08/interview-de-jean-gabes-le-createur-de-shinken.html "http://blog.nicolargo.com/2011/08/interview-de-jean-gabes-le-createur-de-shinken.html")
    (2011/08/30 07:30)
-   [Participez à la prochaine interview de Jean
    Gabes](http://blog.nicolargo.com/2011/08/participez-a-la-prochaine-interview-de-jean-gabes.html "http://blog.nicolargo.com/2011/08/participez-a-la-prochaine-interview-de-jean-gabes.html")
    (2011/08/22 10:34)
-   [Problème dans l’installeur de la version 3.3.1 de
    Nagios](http://blog.nicolargo.com/2011/07/probleme-dans-linstalleur-de-la-version-3-3-1-de-nagios.html "http://blog.nicolargo.com/2011/07/probleme-dans-linstalleur-de-la-version-3-3-1-de-nagios.html")
    (2011/07/27 21:17)

### Dusart {#dusart .sectionedit24}

-   *Une erreur s'est produite en récupérant ce flux
    :*[http://xavier.dusart.free.fr/joomla/index.php/fr/nagios?format=feed&type=rss](http://xavier.dusart.free.fr/joomla/index.php/fr/nagios?format=feed&type=rss "http://xavier.dusart.free.fr/joomla/index.php/fr/nagios?format=feed&type=rss")

### Minitux {#minitux .sectionedit25}

-   [Test http webinject sur
    Nagios](http://minitux.blog.free.fr/index.php?post/2009/10/03/Test-http-webinject-sur-Nagios "http://minitux.blog.free.fr/index.php?post/2009/10/03/Test-http-webinject-sur-Nagios")
    (2009/10/03 15:36)
-   [Mise à jour
    Nagios](http://minitux.blog.free.fr/index.php?post/2009/08/07/Mise-à-jour-Nagios "http://minitux.blog.free.fr/index.php?post/2009/08/07/Mise-à-jour-Nagios")
    (2009/08/07 15:54)
-   [Check blacklist ip avec
    Nagios](http://minitux.blog.free.fr/index.php?post/2009/07/23/Check-blacklist-ip-avec-Nagios "http://minitux.blog.free.fr/index.php?post/2009/07/23/Check-blacklist-ip-avec-Nagios")
    (2009/07/23 16:08)

### Lolokai {#lolokai .sectionedit26}

-   *Une erreur s'est produite en récupérant ce flux
    :*[http://www.lolokai.com/category/supervision/feed/](http://www.lolokai.com/category/supervision/feed/ "http://www.lolokai.com/category/supervision/feed/")

### Alexnogard {#alexnogard .sectionedit27}

-   [Centreon : Migration de votre base
    MySQL](http://alexnogard.com/centreon-migration-base-mysql-sql/ "http://alexnogard.com/centreon-migration-base-mysql-sql/")
    (2014/02/24 22:01)
-   [Centreon : Update 2.3.X vers 2.4.5 sur Centos
    6.X](http://alexnogard.com/centreon-update-2-3-x-2-4-5-ndo2db-nagios-centos-6/ "http://alexnogard.com/centreon-update-2-3-x-2-4-5-ndo2db-nagios-centos-6/")
    (2013/12/19 21:57)
-   [Optimisation / tuning de
    Centreon](http://alexnogard.com/optimisation-tweak-tuning-de-centreon/ "http://alexnogard.com/optimisation-tweak-tuning-de-centreon/")
    (2013/01/11 12:47)
-   [Argument “v6.0.1″ isn’t numeric in numeric lt
    (](http://alexnogard.com/argument-v6-0-1-isnt-numeric-in-numeric-lt/ "http://alexnogard.com/argument-v6-0-1-isnt-numeric-in-numeric-lt/")
    (2012/11/27 21:31)
-   [Error: Could not open command file
    ‘/usr/local/nagios/var/rw/nagios.cmd’ for
    update!](http://alexnogard.com/error-could-not-open-command-file-usrlocalnagiosvarrwnagios-cmd-for-update/ "http://alexnogard.com/error-could-not-open-command-file-usrlocalnagiosvarrwnagios-cmd-for-update/")
    (2012/07/27 10:32)
-   [Tuto: Installation de PHPWeatherMap pour Centreon
    2.3.8](http://alexnogard.com/tuto-installation-de-phpweathermap-centreon-2-3-8/ "http://alexnogard.com/tuto-installation-de-phpweathermap-centreon-2-3-8/")
    (2012/06/24 08:05)
-   [Update de Centreon 2.3.3 vers
    2.3.8](http://alexnogard.com/update-upgrade-de-centreon-2-3-3-vers-2-3-8-centos-6/ "http://alexnogard.com/update-upgrade-de-centreon-2-3-3-vers-2-3-8-centos-6/")
    (2012/06/22 17:56)
-   [Update de Nagios 3.3.1 vers Nagios
    3.4.1.](http://alexnogard.com/update-upgrade-de-nagios-3-3-1-vers-3-4-1-centos-6/ "http://alexnogard.com/update-upgrade-de-nagios-3-3-1-vers-3-4-1-centos-6/")
    (2012/06/22 17:36)
-   [Script Backup Nagios + Centreon
    FAN](http://alexnogard.com/script-backup-nagios-centreon-fan-fully-automated-nagios/ "http://alexnogard.com/script-backup-nagios-centreon-fan-fully-automated-nagios/")
    (2012/06/08 10:11)
-   [Installer Centreon 2.3.8 sur CentOs
    6.2](http://alexnogard.com/installer-centreon-2-3-8-sur-centos-6-2/ "http://alexnogard.com/installer-centreon-2-3-8-sur-centos-6-2/")
    (2012/06/06 19:33)

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](start.html "supervision:start")**

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
-   [Ressenti utilisateur](eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Supervision {#supervision .sectionedit1}
-----------

-   [Commandes pour la
    supervision](commands.html "supervision:commands")
-   [Dstat](dstat.html "supervision:dstat")
-   [Installer ou activer
    SNMP](snmp-install.html "supervision:snmp-install")
-   [Mode actif](actif.html "supervision:actif")
-   [Mode passif](passif.html "supervision:passif")
-   [Ntop](ntop/start.html "supervision:ntop:start")
-   [Panorama](links.html "supervision:links")
-   [RRDTool](rrdtool.html "supervision:rrdtool")
-   [SNMP](snmp.html "supervision:snmp")
-   [Supervision Hardware IPMI](ipmi.html "supervision:ipmi")
-   [Supervision du ressenti
    utilisateur](eue/start.html "supervision:eue:start")
-   [Tableaux récapitulatifs des différents fichiers
    importants](important-files.html "supervision:important-files")

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

supervision/start.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

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

![](../lib/exe/indexer.php@id=supervision%253Astart&1424859520)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
