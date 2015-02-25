---
layout: page
title: 'OID'
---

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