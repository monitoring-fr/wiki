---
layout: page
---

[[[Cisco SNMP OID](oid-cisco@do=backlink.html)]]

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
[OID](start.html "supervision:snmp:oid:start") » [Cisco SNMP
OID](oid-cisco.html "supervision:snmp:oid:oid-cisco")

### Table des matières {.toggle}

-   [Cisco SNMP OID](oid-cisco.html#cisco-snmp-oid)
    -   [Cisco 55x0 ASA](oid-cisco.html#cisco-55x0-asa)
    -   [Cisco 6509 VSS](oid-cisco.html#cisco-6509-vss)
    -   [Cisco FWSM](oid-cisco.html#cisco-fwsm)

Cisco SNMP OID {#cisco-snmp-oid .sectionedit1}
==============

Cisco 55x0 ASA {#cisco-55x0-asa .sectionedit2}
--------------

-   **Alimentation status**

-   **Ventilateur**

-   **CPU (%)**

Moyenne sur 5 sec

~~~~ {.code}
.1.3.6.1.4.1.9.9.109.1.1.1.1.3.1
~~~~

Moyenne sur 1 min

~~~~ {.code}
.1.3.6.1.4.1.9.9.109.1.1.1.1.4.1
~~~~

Moyenne sur 5 min

~~~~ {.code}
.1.3.6.1.4.1.9.9.109.1.1.1.1.5.1
~~~~

-   **Utilisation mémoire (octet)**

~~~~ {.code}
.1.3.6.1.4.1.9.9.48.1.1.1.5.1
~~~~

Cisco 6509 VSS {#cisco-6509-vss .sectionedit3}
--------------

Le Cisco 6509 est composé de 2 chassis interne.

-   **Alimentation status**

Chassis 1 - Alim 1

~~~~ {.code}
1.3.6.1.4.1.9.9.13.1.5.1.3.11
~~~~

Chassis 1 - Alim 2

~~~~ {.code}
1.3.6.1.4.1.9.9.13.1.5.1.3.12
~~~~

Chassis 2 - Alim 1

~~~~ {.code}
1.3.6.1.4.1.9.9.13.1.5.1.3.201
~~~~

Chassis 2 - Alim 2

~~~~ {.code}
1.3.6.1.4.1.9.9.13.1.5.1.3.202
~~~~

-   **Ventilateur**

Chassis 1 - Bandeau

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.4.1.3.11
~~~~

Chassis 1 - Alim 1

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.4.1.3.12
~~~~

Chassis 1 - Alim 2

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.4.1.3.13
~~~~

Chassis 2 - Bandeau

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.4.1.3.201
~~~~

Chassis 2 - Alim 1

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.4.1.3.202
~~~~

Chassis 2 - Alim 2

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.4.1.3.203
~~~~

~~~~ {.code}
  
* **Temperature par module**
~~~~

Le cisco 6509 possède plusieurs modules (cartes) dont la température
peut-être supervisé. Dans mon cas, il s’agit du Module 5 / asicX

Chassis 1 - mod5/asic1

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.3.1.3.160214
~~~~

Chassis 1 - mod5/asic3

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.3.1.3.160215
~~~~

Chassis 1 - mod5/asic4

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.3.1.3.160216
~~~~

Chassis 2 - mod5/asic1

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.3.1.3.260374
~~~~

Chassis 2 - mod5/asic3

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.3.1.3.260375
~~~~

Chassis 2 - mod5/asic4

~~~~ {.code}
.1.3.6.1.4.1.9.9.13.1.3.1.3.260376
~~~~

-   **CPU VSS (%)**

Moyenne sur 5 secondes

~~~~ {.code}
.1.3.6.1.4.1.9.9.109.1.1.1.1.3.1
.1.3.6.1.4.1.9.9.109.1.1.1.1.3.2
~~~~

Moyenne sur 1 min

~~~~ {.code}
.1.3.6.1.4.1.9.9.109.1.1.1.1.4.1
.1.3.6.1.4.1.9.9.109.1.1.1.1.4.2
~~~~

Moyenne sur 5 min

~~~~ {.code}
.1.3.6.1.4.1.9.9.109.1.1.1.1.5.1
.1.3.6.1.4.1.9.9.109.1.1.1.1.5.2
~~~~

-   **Utilisation mémoire VSS (octet)**

Chassis 1

~~~~ {.code}
.1.3.6.1.4.1.9.9.48.1.1.1.5.1
~~~~

Chassis 2

~~~~ {.code}
.1.3.6.1.4.1.9.9.48.1.1.1.5.2
~~~~

Cisco FWSM {#cisco-fwsm .sectionedit4}
----------

-   **Alimentation status**

-   **Ventilateur**

-   **CPU (%)**

Moyenne sur 5 sec

~~~~ {.code}
.1.3.6.1.4.1.9.9.109.1.1.1.1.3.1
~~~~

Moyenne sur 1 min

~~~~ {.code}
.1.3.6.1.4.1.9.9.109.1.1.1.1.4.1
~~~~

Moyenne sur 5 min

~~~~ {.code}
.1.3.6.1.4.1.9.9.109.1.1.1.1.5.1
~~~~

-   **Utilisation mémoire (octet)**

~~~~ {.code}
.1.3.6.1.4.1.9.9.48.1.1.1.5.1
~~~~

-   **Nombre de connexion sur l’interface Firewall**

~~~~ {.code}
1.3.6.1.4.1.9.9.147.1.2.2.2.1.4.40.6
~~~~

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
    source](oid-cisco@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](oid-cisco@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](oid-cisco@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](oid-cisco@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](oid-cisco@do=media.html "Gestionnaire de médias")
-   [Index](oid-cisco@do=index.html "Index [X]")
-   [Connexion](oid-cisco@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](oid-cisco.html#dokuwiki__top "Haut de page [T]")

supervision/snmp/oid/oid-cisco.txt · Dernière modification: 2013/03/29
09:39 (modification externe)

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

![](../../../lib/exe/indexer.php@id=supervision%253Asnmp%253Aoid%253Aoid-cisco&1424859549)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
