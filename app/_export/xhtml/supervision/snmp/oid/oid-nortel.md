---
layout: page
---

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
