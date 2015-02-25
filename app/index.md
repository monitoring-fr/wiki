---
layout: page
title: Accueil
---

Ce wiki contient l’ensemble des docs, how-to, tutoriaux rédigés par l’équipe de monitoring-fr et ses contributeurs réguliers et/ou occasionnels sur la supervision et plus généralement sur la gestion des infrastructures informatiques à partir de logiciels Open Source.

Pour participer, il suffit de [créer un compte](start@do=register.html "http://wiki.monitoring-fr.org/start?do=register") sur ce wiki et de [se connecter](start@do=login.html "http://wiki.monitoring-fr.org/start?do=login"). Un guide d’écriture pour le wiki est [disponible](http://wiki.monitoring-fr.org/wiki/syntax "wiki:syntax").

Du fait de l’augmentation du nombre de spams sur le wiki, nous sommes dans l’obligation de vérifier les adresses des personnes qui s’enregistrent avant de leur accorder les droits en écriture. Désolé pour la gêne occasionnée.

## Documentation Supervision

Des documents plus “génériques” sur la [supervision](supervision/start.html "supervision:start") Windows, VMware, avec IPMI, [SNMP](supervision/snmp.html "supervision:snmp")… avec Nagios bien sûr… mais pas que Nagios ![=)](lib/images/smileys/icon_smile2.gif)

<ul>
{% for page in site.pages %}
{% if page.url contains '/supervision/' %}
<li><a href="{{ page.url }}">{{ page.title }}</a></li>
{% endif %}
{% endfor %}
</ul>

-   [Commandes pour la supervision](supervision/commands.html "supervision:commands")
-   [Dstat](supervision/dstat.html "supervision:dstat")
-   [Installer ou activer SNMP](supervision/snmp-install.html "supervision:snmp-install")
-   [Mode actif](supervision/actif.html "supervision:actif")
-   [Mode passif](supervision/passif.html "supervision:passif")
-   [Ntop](supervision/ntop/start.html "supervision:ntop:start")
-   [Panorama](supervision/links.html "supervision:links")
-   [RRDTool](supervision/rrdtool.html "supervision:rrdtool")
-   [SNMP](supervision/snmp.html "supervision:snmp")
-   [Supervision Hardware
    IPMI](supervision/ipmi.html "supervision:ipmi")
-   [Supervision du ressenti
    utilisateur](supervision/eue/start.html "supervision:eue:start")
-   [Tableaux récapitulatifs des différents fichiers
    importants](supervision/important-files.html "supervision:important-files")

Sans oublier le désormais célèbre
[Panorama](supervision/links.html "supervision:links")
![:-P](lib/images/smileys/icon_razz.gif)

### Documentation Nagios

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [Nagios](nagios/start.html "nagios:start").

-   [Référence des objets de
    configuration](nagios/objects-reference.html "nagios:objects-reference")
-   [Nagios et les
    notifications](nagios/notifications.html "nagios:notifications")
-   [Superviser un hôte Windows avec
    NSClient++](nagios/nagios-nsclient-host.html "nagios:nagios-nsclient-host")
-   [Introduction à
    Nagios](nagios/nagios-introduction.html "nagios:nagios-introduction")
-   [Commandes de remontée de
    contrôle](nagios/ocsp-ochp.html "nagios:ocsp-ochp")
-   [Données Nagios dans un
    ramdisk](nagios/ramdisk.html "nagios:ramdisk")
-   [Supervision vmware esx](nagios/vmware_esx.html "nagios:vmware_esx")
-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](nagios/ubuntu-install.html "nagios:ubuntu-install")
-   [Gabarits d'objets de
    configuration](nagios/templates.html "nagios:templates")
-   [Supervision Windows en mode
    passif](nagios/supervision-windows-passif.html "nagios:supervision-windows-passif")
-   [Installation de Nagios 3.x sur CentOS
    5.3](nagios/nagios-centos-install.html "nagios:nagios-centos-install")
-   [Liens Nagios](nagios/links.html "nagios:links")
-   [Nagios Plugins](nagios/plugins/start.html "nagios:plugins:start")
-   [NAGIOS - Guide de démarrage pour
    débutant](nagios/nagios-debutant/start.html "nagios:nagios-debutant:start")
-   [Mise en place complète de Nagios sur RHEL
    5.4](nagios/mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")
-   [Nagios
    Integration](nagios/integration/start.html "nagios:integration:start")
-   [Outils de supervision d'un hôte
    Windows](nagios/windows-client.html "nagios:windows-client")
-   [Introduction aux objets de
    configuration](nagios/configobjects.html "nagios:configobjects")
-   [Arborescence des
    fichiers](nagios/installation-layout.html "nagios:installation-layout")
-   [Event Handlers](nagios/event_handlers.html "nagios:event_handlers")
-   [check-list de diagnostic](nagios/debug.html "nagios:debug")
-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](nagios/debian-install.html "nagios:debian-install")
-   [Nagios Addons](nagios/addons/start.html "nagios:addons:start")

### Documentation Centreon

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [Centreon](centreon/start.html "centreon:start").

-   [Nagios Centreon
    part1](centreon/nagios-centreon-part1.html "centreon:nagios-centreon-part1")
-   [Installation du patch multi-broker pour
    Centreon](centreon/multi-broker-patch-install.html "centreon:multi-broker-patch-install")
-   [Installation MKLivestatus & Intégration dans
    Centreon](centreon/mklivestatus-install-integration-centreon.html "centreon:mklivestatus-install-integration-centreon")
-   [Nagios Centreon
    part2](centreon/nagios-centreon-part2.html "centreon:nagios-centreon-part2")
-   [Superviser un Autocom OXE V9.x Alcatel-Lucent sous
    Centreon/Nagios](centreon/superviser-oxe-alcatel.html "centreon:superviser-oxe-alcatel")
-   [Tableau de correspondance des
    plugins](centreon/tableau-correspondance-plugins.html "centreon:tableau-correspondance-plugins")
-   [Superviser le spanning-tree sous
    Centreon/Nagios](centreon/superviser-spanning-tree.html "centreon:superviser-spanning-tree")
-   [Intégrer Nagvis dans
    Centreon](centreon/integration-nagvis.html "centreon:integration-nagvis")
-   [Installation de Centreon 2.2 sur Ubuntu Server
    10.04](centreon/centreon-ubuntu-install.html "centreon:centreon-ubuntu-install")
-   [Documentation Technique sur
    Centreon](centreon/centreon-doc-technique.html "centreon:centreon-doc-technique")
-   [Installation de Centreon 2.1 sur CentOS
    5.3](centreon/centreon-centos-install.html "centreon:centreon-centos-install")
-   [Installation de Shinken sur Centreon Enterprise
    Server](centreon/centreon-enterprise-server-shinken.html "centreon:centreon-enterprise-server-shinken")
-   [Installation de Centreon Enterprise
    Server](centreon/centreon-enterprise-server.html "centreon:centreon-enterprise-server")
-   [Installation Nagios / Centreon sur RedHat
    EL](centreon/centreon-redhat-install.html "centreon:centreon-redhat-install")
-   [Présentation de l'interface Centreon 2.1 et de son
    utilisation](centreon/centreon-interface-utilisation.html "centreon:centreon-interface-utilisation")
-   [Manuel d'utilisation
    Centreon](centreon/manuel-utilisation/start.html "centreon:manuel-utilisation:start")

### Documentation Shinken

Le wiki héberge également le projet de Jean Gabès; [Shinken](shinken/start.html "shinken:start") qui est un Proof Of Concept pour le moment de ce que pourrait donner Nagios pour les très grosses installations. ~~100 000~~ 250 000 (nouveau record ![:-P](lib/images/smileys/icon_razz.gif)) contrôles toutes les 5 minutes, ça force le respect ![;-)](lib/images/smileys/icon_wink.gif)

-   [Introduction à
    Shinken](shinken/shinken-introduction.html "shinken:shinken-introduction")
-   [Shinken en haute disponiblité sur 2
    noeuds](shinken/shinken-ha-2noeuds.html "shinken:shinken-ha-2noeuds")
-   [Ressources et Performances de
    Shinken](shinken/shinken-ressources.html "shinken:shinken-ressources")
-   [Installation de Shinken sur Ubuntu
    server](shinken/shinken-ubuntu-install-with-nagios.html "shinken:shinken-ubuntu-install-with-nagios")
-   [Fonctionnement de
    Shinken](shinken/shinken-work.html "shinken:shinken-work")
-   [Installation de Shinken sur Ubuntu server 10.04
    LTS](shinken/shinken-ubuntu-install.html "shinken:shinken-ubuntu-install")
-   [Installation Shinken 0.8 sur Debian
    Squeeze](shinken/shinken-debian-squeeze-install.html "shinken:shinken-debian-squeeze-install")
-   [Installation de Shinken sur Debian
    Lenny](shinken/shinken-debian-install.html "shinken:shinken-debian-install")
-   [Installation de Shinken par
    script](shinken/install-script.html "shinken:install-script")
-   [Comment activer et utiliser le module
    livestatus](shinken/enable_livestatus_module.html "shinken:enable_livestatus_module")
-   [Instalation de shinken les yeux
    fermés](shinken/shinken-10min-start.html "shinken:shinken-10min-start")
-   [Les architectures avancées de
    Shinken](shinken/shinken-advanced-architecture.html "shinken:shinken-advanced-architecture")
-   [Installation de Shinken sur
    CentOS](shinken/shinken-centos-install.html "shinken:shinken-centos-install")
-   [Configuration et
    lancement](shinken/shinken-architecture-config.html "shinken:shinken-architecture-config")
-   [Interface
    Shinken](shinken/shinken-use-ui.html "shinken:shinken-use-ui")

### Documentation Zabbix

Cette section contient l’ensemble de la documentation sur [Zabbix](zabbix/start.html "zabbix:start").

-   [Superviser un hôte SNMP avec
    Zabbix](zabbix/zabbix-snmp-host.html "zabbix:zabbix-snmp-host")
-   [Notification par sms dans
    Zabbix](zabbix/zabbix-sms-notification.html "zabbix:zabbix-sms-notification")
-   [Ressources et performances de
    Zabbix](zabbix/zabbix-resources.html "zabbix:zabbix-resources")
-   [Gestion des triggers dans
    Zabbix](zabbix/zabbix-trigger-use.html "zabbix:zabbix-trigger-use")
-   [Installation Zabbix 1.4.2 sur Ubuntu
    8.04](zabbix/zabbix-ubuntu-install-old.html "zabbix:zabbix-ubuntu-install-old")
-   [Fonctionnement de
    Zabbix](zabbix/zabbix-work.html "zabbix:zabbix-work")
-   [Prise en main de
    Zabbix](zabbix/zabbix-use.html "zabbix:zabbix-use")
-   [Installation de Zabbix sur
    Ubuntu](zabbix/zabbix-ubuntu-install.html "zabbix:zabbix-ubuntu-install")
-   [Optimisation de
    Zabbix](zabbix/zabbix-optimization.html "zabbix:zabbix-optimization")
-   [Gestion des items dans
    Zabbix](zabbix/zabbix-item-use.html "zabbix:zabbix-item-use")
-   [Architectures distribuées de
    Zabbix](zabbix/zabbix-distributed-architecture.html "zabbix:zabbix-distributed-architecture")
-   [Découverte d'équipements dans
    Zabbix](zabbix/zabbix-discovery.html "zabbix:zabbix-discovery")
-   [Installation de Zabbix sur
    Centos](zabbix/zabbix-centos-install.html "zabbix:zabbix-centos-install")
-   [Notification par email dans
    Zabbix](zabbix/zabbix-email-notification.html "zabbix:zabbix-email-notification")
-   [Catalogues des erreurs dans
    Zabbix](zabbix/zabbix-errors.html "zabbix:zabbix-errors")
-   [Introduction à
    Zabbix](zabbix/zabbix-introduction.html "zabbix:zabbix-introduction")
-   [Interface Web de
    Zabbix](zabbix/zabbix-interface.html "zabbix:zabbix-interface")
-   [Gestion des actions dans
    Zabbix](zabbix/zabbix-action-use.html "zabbix:zabbix-action-use")

### Documentation OpenNMS

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration d’[OpenNMS](opennms/start.html "opennms:start").

-   [Optimisations
    possibles](opennms/optimisation.html "opennms:optimisation")
-   [Redondance avec Heartbeat et
    Mon](opennms/redondance.html "opennms:redondance")
-   [Découverte et supervision des services (capsd et
    pollerd)](opennms/services.html "opennms:services")
-   [Interface Web
    d'OpenNMS](opennms/opennms-interface.html "opennms:opennms-interface")
-   [Installation d'OpenNMS sur Ubuntu 8.0.4
    LTS](opennms/install-on-ubuntu.html "opennms:install-on-ubuntu")
-   [Découverte des équipements (discovery)](opennms/discovery.html "opennms:discovery")
-   [Configuration des évènements et des alarmes](opennms/events-alarms.html "opennms:events-alarms")
-   [Installation d'OpenNMS sur CentOS
    5.x](opennms/install-on-centos.html "opennms:install-on-centos")
-   [Personnalisation de
    l'interface](opennms/custom-ihm.html "opennms:custom-ihm")
-   [Installation automatique d'OpenNMS avec OSE](http://www.ose-distrib.org/fr/documentations/41-installation/62-installation-en-mode-standalone.html "http://www.ose-distrib.org/fr/documentations/41-installation/62-installation-en-mode-standalone.html")
-   [Réception des alarmes de Nagios avec OSE](http://www.ose-distrib.org/fr/documentations/37-configuration/64-reception-des-alarmes-de-nagios-avec-ose-2.html "http://www.ose-distrib.org/fr/documentations/37-configuration/64-reception-des-alarmes-de-nagios-avec-ose-2.html")

### Documentation EyesOfNetwork

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [EyesOfNetwork](eyesofnetwork/start.html "eyesofnetwork:start").

-   [Installation de
    EyesOfNetwork](eyesofnetwork/eyesofnetwork-iso-install.html "eyesofnetwork:eyesofnetwork-iso-install")
-   [Interface Web de
    EyesOfNetwork](eyesofnetwork/eyesofnetwork-interface.html "eyesofnetwork:eyesofnetwork-interface")

### Documentation Groundwork

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [Groundwork](groundwork/start.html "groundwork:start").

-   [Installation de Groundwork Bêta 6.0 sur Ubuntu 8.0.4
    LTS](groundwork/groundwork6.0-install-ubuntu.html "groundwork:groundwork6.0-install-ubuntu")
-   [Installation GroundWork sur Ubuntu 8.0.4
    LTS](groundwork/groundwork-ubuntu-install.html "groundwork:groundwork-ubuntu-install")

### Documentation Vigilo

Doit accueillir l’ensemble des documentations d’installation, de
configuration et d’administration de
[Vigilo](vigilo/start.html "vigilo:start").

-   [Installation Vigilo sur Ubuntu 8.0.4
    LTS](vigilo/vigilo-ubuntu-install.html "vigilo:vigilo-ubuntu-install")

### Documentation Cacti

Doit accueillir l’ensemble des documentations d’installation, de configuration et d’administration de [Cacti](cacti/start.html "cacti:start").

-   [Installation de Cacti
    Windows](cacti/windows-install.html "cacti:windows-install")
-   [Installation de Cacti sur
    Ubuntu](cacti/ubuntu-install.html "cacti:ubuntu-install")
-   [Installation Cacti sur RedHat
    9](cacti/redhat-install.html "cacti:redhat-install")
-   [Configuration de
    Cacti](cacti/configuration.html "cacti:configuration")

## Documentation Hypervision

Un ensemble de documentations sur l’installation, la configuration et l’utilisation d’applications pour l’[hypervision](hypervision/start.html "hypervision:start") d’un système d’information :

-   [Canopsis](canopsis/start.html "canopsis:start")

## Documentation Sécurité

Un ensemble de documentations sur l’installation, la configuration et l’utilisation d’applications pour la [sécurité](securite/start.html "securite:start") d’un système/réseau, ou bien encore, sur la mise en place d’une architecture combinant la sécurité et la supervision (Sécurité OSS).

-   [Snort](securite/snort/start.html "securite:snort:start")
-   [Prelude-IDS](securite/prelude/start.html "securite:prelude:start")
-   [Ossec](securite/ossec/start.html "securite:ossec:start")
-   [Architecture d'une solution Sécurité
    OSS](securite/architecture-oss/start.html "securite:architecture-oss:start")

## Documentation Infrastructure

<ul>
{% for page in site.pages %}
{% if page.url contains '/infra/' %}
<li><a href="{{ page.permalink }}">{{ page.url }}</a></li>
{% endif %}
{% endfor %}
</ul>

La gestion des [infrastructures informatiques](infra/start.html "infra:start") à base de logiciels Open Source

-   [Logstash](infra/logstash.html "infra:logstash")
-   [Knockd](infra/knockd.html "infra:knockd")
-   [Postfix](infra/postfix.html "infra:postfix")
-   [Partage de session terminal avec
    Screen](infra/screen.html "infra:screen")
-   [Zimbra](infra/zimbra.html "infra:zimbra")
-   [Installation de sikuli IDE sous Ubuntu
    10.10](infra/sikuli.html "infra:sikuli")
-   [Installation de Job
    Scheduler](infra/jobscheduler.html "infra:jobscheduler")
-   [Graylog2](infra/graylog2.html "infra:graylog2")
-   [Installation de archipel sous ubuntu
    10.10](infra/archipel.html "infra:archipel")
-   [Chef](infra/chef.html "infra:chef")
-   [Mise en place d'un système de contrôle de version GIT sous unbuntu
    server 10.10](infra/git.html "infra:git")
-   [GLPI](infra/glpi/start.html "infra:glpi:start")
-   [Procédures rapides pour le module assistance](infra/glpi/procedures-rapides.html "infra:glpi:procedures-rapides")
-   [Installation de GLPI sur Ubuntu](infra/glpi/glpi-ubuntu-install.html "infra:glpi:glpi-ubuntu-install")