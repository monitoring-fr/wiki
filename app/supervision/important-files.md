---
layout: page
---

[[[Tableaux récapitulatifs des différents fichiers
importants](important-files@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Supervision](start.html "supervision:start") » [Tableaux récapitulatifs
des différents fichiers
importants](important-files.html "supervision:important-files")

### Table des matières {.toggle}

-   [Tableaux récapitulatifs des différents fichiers
    importants](important-files.html#tableaux-recapitulatifs-des-differents-fichiers-importants)
-   [Nagios](important-files.html#nagios)
-   [Centreon](important-files.html#centreon)
-   [NDOUtils](important-files.html#ndoutils)
-   [Nagvis](important-files.html#nagvis)
-   [Zabbix](important-files.html#zabbix)
-   [Shinken](important-files.html#shinken)

Tableaux récapitulatifs des différents fichiers importants {#tableaux-recapitulatifs-des-differents-fichiers-importants .sectionedit1}
==========================================================

Ici est décrit les fichiers importants en fonction du logiciel et la
description de leur utilité.

Ce tutoriel a été réalisé par :

  **Rôle**            **Nom**
  ------------------- ---------------------------------
  **Rédacteur**       Romain BERTHAUD
  **Contributeurs**   Ludovic VALENTIN, Romain FORLOT

Nagios {#nagios .sectionedit3}
======

  Fichier                            Description
  ---------------------------------- ----------------------------------------------------------------------
  /etc/nagios                        Dossier avec tous les fichiers de configurations.
  /etc/nagios/nagios.cfg             Fichier principal de configuration.
  /etc/httpd/conf.d/nagios.conf      Fichier de configuration Apache de la page web Nagios.
  /usr/share/nagios/                 Dossier de la page web Nagios.
  /etc/logrotate.d/services-nagios   Fichier de configuration de la rotation des fichiers de logs Nagios.
  /usr/lib/nagios/plugins/           Dossier qui contient tous les plugins (check\_…).
  /var/nagios/host-perfdata          Fichier qui liste les checks d’hôtes réalisés.
  /var/nagios/service-perfdata       Fichier qui liste les checks de services réalisés.
  /var/log/nagios/nagios.log         Fichier de log Nagios.

Centreon {#centreon .sectionedit5}
========

  Fichier                                            Description
  -------------------------------------------------- -------------------------------------------------------------------------------------------------
  /etc/centreon                                      Dossier de configuration de Centreon.
  /usr/local/centreon                                Dossier d’installation de Centreon.
  /var/lib/centreon                                  Dossier qui contient des informations pour l’utilisation de scripts.
  /var/lib/centreon/centplugins/                     Contient les informations du plugin check\_centreon\_snmp\_traffic pour les interfaces réseaux.
  /tmp/tmp\_Nagios\_int.172.20.50.126.Ethernet1\_1   Successions de fichiers utilisés par le plugin `check_snmp_netint.pl`.
  /var/log/centreon                                  Différents logs concernant les multiples services.
  /usr/local/centreon/filesGeneration/nagiosCFG/1/   Dossier des fichiers générés par Centreon qui sont ensuite copiés vers `/etc/nagios`.
  /etc/httpd/conf.d/centreon.conf                    Fichier de configuration Apache de l’interface web.
  /etc/cron.d/centreon                               Exécution plannifié d’outils centreon.
  /etc/cron.d/centstorage                            Exécution de travaux en lien avec les graphiques.

NDOUtils {#ndoutils .sectionedit7}
========

  Fichier                    Description
  -------------------------- -------------------------------------------------------------
  /etc/nagios/ndo2db.cfg     Fichier de configuration pour l’accès à la base de données.
  /etc/nagios/ndomod.cfg     Fichier de configuration de NDOMOD.
  /usr/libexec/ndomod-3x.o   Librairie utilisée pour lier NDOUtils à Nagios.

Nagvis {#nagvis .sectionedit9}
======

  Fichier                                               Description
  ----------------------------------------------------- -------------------------------------------------
  /usr/share/nagios/nagvis                              Dossier qui contient tout le contenu de Nagvis.
  /usr/share/nagios/nagvis/etc/nagvis.ini.php           Fichier de configuration principal.
  /usr/share/nagios/nagvis/etc/maps/carte-routeur.cfg   Configuration de la carte des routeurs.
  /usr/share/nagios/nagvis/nagvis/images/maps/          Dossier des images par défaut.

Zabbix {#zabbix .sectionedit11}
======

Pour une installation de Zabbix via les sources :

  Fichier                                     Description
  ------------------------------------------- ------------------------------------------------
  /usr/local/zabbix                           Dossier racine avec tout le contenu de Zabbix.
  /usr/local/zabbix/etc/zabbix\_server.conf   Fichier de configuration du serveur.
  /usr/local/zabbix/etc/zabbix\_agentd.conf   Fichier de configuration de l’agent.
  /usr/local/zabbix/etc/zabbix\_proxy.conf    Fichier de configuration du proxy.

Shinken {#shinken .sectionedit13}
=======

Pour une installation de Shinken via les sources :

  Fichier                             Description
  ----------------------------------- --------------------------------------------------------------
  /etc/shinken/                       Dossier racine avec la configuration de shinken.
  /etc/shinken/objects                Dossier de configuration des objets nagios.
  /etc/shinken/certs                  Dossier des certificats SSL pour shinken.
  /etc/shinken/nagios.cfg             Fichier de configuration de la partie monitoring de shinken.
  /etc/shinken/discovery.cfg          Fichier de configuration du module discovery.
  /etc/shinken/discovery\_rules.cfg   Fichier de règles de découvertes
  /etc/shinken/discovery\_runs.cfg    Fichier de configuration des moteurs de découverte.
  /etc/shinken/brokerd.ini            Fichier de configuration du broker.
  /etc/shinken/pollerd.ini            Fichier de configuration du poller.
  /etc/shinken/reactionnerd.ini       Fichier de configuration du reactionnerd.
  /etc/shinken/receiverd.ini          Fichier de configuration du receiver.
  /etc/shinken/schedulerd.ini         Fichier de configuration du scheduler.
  /etc/shinken/shinken-specific.cfg   Fichier de configuration de l’architecture shinken.

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
    source](important-files@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](important-files@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](important-files@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](important-files@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](important-files@do=media.html "Gestionnaire de médias")
-   [Index](important-files@do=index.html "Index [X]")
-   [Connexion](important-files@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](important-files.html#dokuwiki__top "Haut de page [T]")

supervision/important-files.txt · Dernière modification: 2013/03/29
09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=supervision%253Aimportant-files&1424859522)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
