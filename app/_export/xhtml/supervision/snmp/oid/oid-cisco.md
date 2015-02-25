---
layout: page
---

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
