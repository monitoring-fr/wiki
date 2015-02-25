---
layout: page
---

[[[OID](start@do=backlink.html)]]

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
[OID](start.html "supervision:snmp:oid:start")

### Table des matières {.toggle}

-   [OID](start.html#oid)
    -   [Standard](start.html#standard)
    -   [Réseau (Switch / router / Firewall, etc
        ...)](start.html#reseau-switchrouterfirewall-etc)
    -   [Constructeurs](start.html#constructeurs)
    -   [OS](start.html#os)
    -   [Application](start.html#application)
    -   [Divers](start.html#divers)

OID {#oid .sectionedit1}
===

Cette page née de l’envie de moins avoir à peiner pour trouver les OIDs
pour un maximum de matériels possibles. J’invite donc une majorité de
personnes à venir compléter cette page pour en faire une bibliothèque
d’OIDs.

**Merci de bien vouloir tester vos OID avant de les poster ici. Ces
valeurs doivent être certifiés opérationnelles. Si tout OIDs se trouvent
incorrects avec le temps merci de bien vouloir le signaler.**

Standard {#standard .sectionedit2}
--------

**[Net-SNMP OID
MIB](oid-mib-net-snmp.html "supervision:snmp:oid:oid-mib-net-snmp")**

**[oid-mib-snmpv2](http://wiki.monitoring-fr.org/supervision/snmp/oid/oid-mib-snmpv2 "supervision:snmp:oid:oid-mib-snmpv2")**

Réseau (Switch / router / Firewall, etc ...) {#reseau-switchrouterfirewall-etc .sectionedit3}
--------------------------------------------

**[Nortel SNMP OID](oid-nortel.html "supervision:snmp:oid:oid-nortel")**

**[Cisco SNMP OID](oid-cisco.html "supervision:snmp:oid:oid-cisco")**

Constructeurs {#constructeurs .sectionedit4}
-------------

**[oid-dell](http://wiki.monitoring-fr.org/supervision/snmp/oid/oid-dell "supervision:snmp:oid:oid-dell")**

**[oid-hp](http://wiki.monitoring-fr.org/supervision/snmp/oid/oid-hp "supervision:snmp:oid:oid-hp")**

OS {#os .sectionedit5}
--

**[oid-linux](http://wiki.monitoring-fr.org/supervision/snmp/oid/oid-linux "supervision:snmp:oid:oid-linux")**

**[oid-windows](http://wiki.monitoring-fr.org/supervision/snmp/oid/oid-windows "supervision:snmp:oid:oid-windows")**

**[oid-unix](http://wiki.monitoring-fr.org/supervision/snmp/oid/oid-unix "supervision:snmp:oid:oid-unix")**

Application {#application .sectionedit6}
-----------

**[oid-citrix](http://wiki.monitoring-fr.org/supervision/snmp/oid/oid-citrix "supervision:snmp:oid:oid-citrix")**

Divers {#divers .sectionedit7}
------

Contrôle du nombre de clients connectés sur une borne Apple Airport

~~~~ {.code}
snmpwalk 192.168.44.253 -v2C -c community .1.3.6.1.4.1.63.501.3.2.1.0
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

supervision/snmp/oid/start.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

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

![](../../../lib/exe/indexer.php@id=supervision%253Asnmp%253Aoid%253Astart&1424859549)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
