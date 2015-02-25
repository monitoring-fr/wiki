---
layout: page
---

[[[Net-SNMP OID MIB](oid-mib-net-snmp@do=backlink.html)]]

[wiki monitoring-fr.org](../../../start.html "[ALT+H]")

![Logo Monitoring](../../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../../start.html "start") »
[Supervision](../../start.html "supervision:start") »
[SNMP](../../snmp.html "supervision:snmp") »
[OID](start.html "supervision:snmp:oid:start") » [Net-SNMP OID
MIB](oid-mib-net-snmp.html "supervision:snmp:oid:oid-mib-net-snmp")

### Table des matières {.toggle}

-   [Net-SNMP OID MIB](oid-mib-net-snmp.html#net-snmp-oid-mib)

Net-SNMP OID MIB {#net-snmp-oid-mib .sectionedit1}
================

Le tableau ci-dessous fournit la liste des OID utiles issus de la MIB
Net-SNMP.

  ---------------------- -------------------------- --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Nom**                **OID**                    **Type**        **Description**

  dskPercentNode         1.3.6.1.4.1.2021.9.1.10    Integer32       Pourcentage d’inodes utilisés sur le disque

  dskPercent             1.3.6.1.4.1.2021.9.1.9     Integer32       Pourcentage d’espace utilisé sur le disque

  ssCpuRawIdle           1.3.6.1.4.1.2021.11.53.0   Counter32       idle CPU time.

  hrStorageSize          1.3.6.1.2.1.25.2.3.1.5     Integer32       The size of the storage represented by this entry, in units of hrStorageAllocationUnits. This object is writable to allow remote configuration of the size of the storage area in those cases where such an operation makes sense and is possible on the underlying system. For example, the amount of main memory allocated to a buffer pool might be modified or the amount of disk space allocated to virtual memory might be modified

  hrStorageUsed          1.3.6.1.2.1.25.2.3.1.6     Integer32       The amount of the storage represented by this entry that is allocated, in units of hrStorageAllocationUnits.

  memTotalFree           1.3.6.1.4.1.2021.4.11.0    Integer32       Mémoire totale disponible sur l’hôte

  memAvailSwap           1.3.6.1.4.1.2021.4.4.0                     Espace de swap disponible sur l’hôte.

  laLoad                 1.3.6.1.4.1.2021.10.1.3    DisplayString   La charge moyenne sur 1,5 et 10 minutes (une par ligne)

  hrSystemProcesses      1.3.6.1.2.1.25.1.6.0       Gauge32         The number of process contexts currently loaded or running on this system.

  hrSystemNumUsers       1.3.6.1.2.1.25.1.5.0       Gauge32         The number of user sessions for which this host is storing state information. A session is a collection of processes requiring a single act of user authentication and possibly subject to collective job control.

  hrSystemMaxProcesses   1.3.6.1.2.1.25.1.7.0       Integer32       The maximum number of process contexts this system can support. If there is no fixed maximum, the value should be zero. On systems that have a fixed maximum, this object can help diagnose failures that occur when this maximum is reached

  hrMemorySize           1.3.6.1.2.1.25.2.2.0       KBytes          The amount of physical read-write main memory, typically RAM, contained by the host.

  hrSystemUptime         1.3.6.1.2.1.25.1.1.0       TimeTicks       The amount of time since this host was last initialized. Note that this is different from sysUpTime in the SNMPv2-MIB [RFC1907] because sysUpTime is the uptime of the network management portion of the system.

  sysUpTime              1.3.6.1.2.1.1.3            TimeTicks       The time (in hundredths of a second) since the network management portion of the system was last re-initialized.

  ifInOctets             1.3.6.1.2.1.2.2.1.10       Counter32       The total number of octets received on the interface, including framing characters. Discontinuities in the value of this counter can occur at re-initialization of the management system, and at other times as indicated by the value of ifCounterDiscontinuityTime

  ifInErrors             1.3.6.1.2.1.2.2.1.14       Counter32       For packet-oriented interfaces, the number of inbound packets that contained errors preventing them from being deliverable to a higher-layer protocol. For character-oriented or fixed-length interfaces, the number of inbound transmission units that contained errors preventing them from being deliverable to a higher-layer protocol.\
                                                                     Discontinuities in the value of this counter can occur at re-initialization of the management system, and at other times as indicated by the value of ifCounterDiscontinuityTime

  ifOutOctets            1.3.6.1.2.1.2.2.1.16       Counter32       The total number of octets transmitted out of the interface, including framing characters.\
                                                                     Discontinuities in the value of this counter can occur at re-initialization of the management system, and at other times as indicated by the value of ifCounterDiscontinuityTime

  ifOutErrors            1.3.6.1.2.1.2.2.1.20       Counter32       Pour les interfaces orientées paquets, le nombre de paquets sortants non transmis pour cause d’erreurs. Pour les interfaces orientées caractères, le nombre d’unités de transmissions sortantes non transmises pour cause d’eereurs.\
                                                                     Discontinuities in the value of this counter can occur at re-initialization of the management system, and at other times as indicated by the value of ifCounterDiscontinuityTime.
  ---------------------- -------------------------- --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../../start.html "start")**

**[Supervision](../../start.html "supervision:start")**

-   [Nagios](../../../nagios/start.html "nagios:start")
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
-   [Ressenti utilisateur](../../eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../../canopsis/start.html "canopsis:start")

**[Sécurité](../../../securite/start.html "securite:start")**

**[Infrastructure](../../../infra/start.html "infra:start")**

**[Développement](../../../dev/start.html "dev:start")**

Supervision {#supervision .sectionedit1}
-----------

-   [Commandes pour la
    supervision](../../commands.html "supervision:commands")
-   [Dstat](../../dstat.html "supervision:dstat")
-   [Installer ou activer
    SNMP](../../snmp-install.html "supervision:snmp-install")
-   [Mode actif](../../actif.html "supervision:actif")
-   [Mode passif](../../passif.html "supervision:passif")
-   [Ntop](../../ntop/start.html "supervision:ntop:start")
-   [Panorama](../../links.html "supervision:links")
-   [RRDTool](../../rrdtool.html "supervision:rrdtool")
-   [SNMP](../../snmp.html "supervision:snmp")
-   [Supervision Hardware IPMI](../../ipmi.html "supervision:ipmi")
-   [Supervision du ressenti
    utilisateur](../../eue/start.html "supervision:eue:start")
-   [Tableaux récapitulatifs des différents fichiers
    importants](../../important-files.html "supervision:important-files")

-   [Afficher le texte
    source](oid-mib-net-snmp@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](oid-mib-net-snmp@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](oid-mib-net-snmp@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](oid-mib-net-snmp@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](oid-mib-net-snmp@do=media.html "Gestionnaire de médias")
-   [Index](oid-mib-net-snmp@do=index.html "Index [X]")
-   [Connexion](oid-mib-net-snmp@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](oid-mib-net-snmp.html#dokuwiki__top "Haut de page [T]")

supervision/snmp/oid/oid-mib-net-snmp.txt · Dernière modification:
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

![](../../../lib/exe/indexer.php@id=supervision%253Asnmp%253Aoid%253Aoid-mib-net-snmp&1424859549)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
