---
layout: page
---

[[[Nortel SNMP OID](oid-nortel@do=backlink.html)]]

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
[OID](start.html "supervision:snmp:oid:start") » [Nortel SNMP
OID](oid-nortel.html "supervision:snmp:oid:oid-nortel")

### Table des matières {.toggle}

-   [Nortel SNMP OID](oid-nortel.html#nortel-snmp-oid)
    -   [Switch 5510](oid-nortel.html#switch-5510)
    -   [BayStack 5510](oid-nortel.html#baystack-5510)

Nortel SNMP OID {#nortel-snmp-oid .sectionedit1}
===============

Switch 5510 {#switch-5510 .sectionedit2}
-----------

-   Alimentation status

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.4.10.0 
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.4.11.0
~~~~

-   Ventilateur

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.10.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.11.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.12.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.13.0
~~~~

-   CPU (%)

Total

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.8.1.1.4.3.10.0
~~~~

Moyenne sur 1 min

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.8.1.1.5.3.10.0
~~~~

Moyenne sur 10 min

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.8.1.1.6.3.10.0
~~~~

-   Pourcentage mémoire disponible (%)

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.8.1.1.9.3.10.0
~~~~

BayStack 5510 {#baystack-5510 .sectionedit3}
-------------

Un baystack est un ensemble de 2 switches Nortel. D’où le terme de
Chassis que nous allons retrouver ci-dessous.

Ce que j’ai remarqué c’est que l’avant dernière valeur dans l’OID change
en fonction du chassis.

OID.10.0 –\> Chassis 1

OID.20.0 –\> Chassis 2

-   Alimentation status

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.4.10.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.4.11.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.4.20.0 
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.4.21.0
~~~~

-   Ventilateur

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.10.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.11.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.12.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.13.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.20.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.21.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.22.0
.1.3.6.1.4.1.45.1.6.3.3.1.1.10.6.23.0
~~~~

-   CPU (%)

Total

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.8.1.1.4.3.10.0
.1.3.6.1.4.1.45.1.6.3.8.1.1.4.3.20.0
~~~~

Moyenne sur 1 min

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.8.1.1.5.3.10.0
.1.3.6.1.4.1.45.1.6.3.8.1.1.5.3.20.0
~~~~

Moyenne sur 10 min

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.8.1.1.6.3.10.0
.1.3.6.1.4.1.45.1.6.3.8.1.1.6.3.20.0
~~~~

-   Pourcentage mémoire disponible (%)

~~~~ {.code}
.1.3.6.1.4.1.45.1.6.3.8.1.1.9.3.10.0
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
    source](oid-nortel@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](oid-nortel@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](oid-nortel@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](oid-nortel@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](oid-nortel@do=media.html "Gestionnaire de médias")
-   [Index](oid-nortel@do=index.html "Index [X]")
-   [Connexion](oid-nortel@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](oid-nortel.html#dokuwiki__top "Haut de page [T]")

supervision/snmp/oid/oid-nortel.txt · Dernière modification: 2013/03/29
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

![](../../../lib/exe/indexer.php@id=supervision%253Asnmp%253Aoid%253Aoid-nortel&1424859549)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
