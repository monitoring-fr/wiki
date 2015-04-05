---
layout: page
title: OpenNMS
permalink: /opennms/index.html
---

Dans ce dossier, figure une présentation des fonctionnalités d’OpenNMS,
ainsi qu’un ensemble de documentations et de tutoriels sur la mise en
place d’une architecture de supervision OpenNMS.

Pour toutes questions, informations complémentaires sur OpenNMS,
rendez-vous sur le
[forum](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/")
du site.

Ce dossier a été réalisé par :

  **Rôle**        **Nom**
  --------------- --------------
  **Rédacteur**   Samuel MUTEL

Présentation {#presentation .sectionedit3}
------------

OpenNMS est un outil de supervision / hypervision de réseau Open Source.
Il est développé en Java et s’appuie sur le moteur applicatif Jetty et
la base de données PostgreSQL pour fonctionner.

Les principales fonctionnalités d’OpenNMS sont les suivantes :

-   Découvrir les équipements réseaux à superviser (ping) ;
-   Découvrir les services présents sur un équipement et en mesurer la
    disponibilité ;
-   Identifier et lister les interruptions de services réseaux (outages)
    ;
-   Collecter les informations et recevoir les alarmes provenant des
    équipements supervisés via le protocole SNMP ;
-   D’enrichir les informations d’un évènement par des données stockées
    dans la base de données ;
-   D’effectuer une corrélation entre les alarmes afin de présenter un
    affichage clair des problèmes en cours ;
-   De corréler, notifier et escalader ces évènements sous forme
    d’alarmes ;
-   De disposer d’une interface Web permettant d’administrer et de
    superviser ;
-   De réaliser des graphiques à partir de polling SNMP ;
-   De représenter graphiquement les équipements supervisés.

Schéma Fonctionnel {#schema-fonctionnel .sectionedit4}
------------------

[![](../assets/media/supervision/opennms/archi_logicielle-01.png)](../_detail/supervision/opennms/archi_logicielle-01.png@id=opennms%253Astart.html "supervision:opennms:archi_logicielle-01.png")

Documentation {#documentation .sectionedit5}
-------------

-   [Personnalisation de
    l'interface](custom-ihm.html "opennms:custom-ihm")
-   [Découverte des équipements
    (discovery)](discovery.html "opennms:discovery")
-   [Configuration des évènements et des
    alarmes](events-alarms.html "opennms:events-alarms")
-   [Installation d'OpenNMS sur CentOS
    5.x](install-on-centos.html "opennms:install-on-centos")
-   [Installation d'OpenNMS sur Ubuntu 8.0.4
    LTS](install-on-ubuntu.html "opennms:install-on-ubuntu")
-   [Interface Web
    d'OpenNMS](opennms-interface.html "opennms:opennms-interface")
-   [Optimisations possibles](optimisation.html "opennms:optimisation")
-   [Redondance avec Heartbeat et
    Mon](redondance.html "opennms:redondance")
-   [Découverte et supervision des services (capsd et
    pollerd)](services.html "opennms:services")

-   [Installation automatique d'OpenNMS avec
    OSE](http://www.ose-distrib.org/fr/documentations/41-installation/62-installation-en-mode-standalone.html "http://www.ose-distrib.org/fr/documentations/41-installation/62-installation-en-mode-standalone.html")
-   [Réception des alarmes de Nagios avec
    OSE](http://www.ose-distrib.org/fr/documentations/37-configuration/64-reception-des-alarmes-de-nagios-avec-ose-2.html "http://www.ose-distrib.org/fr/documentations/37-configuration/64-reception-des-alarmes-de-nagios-avec-ose-2.html")