---
layout: page
---

### Table des matières {.toggle}

-   [Boîte à outils Nagios](boite-a-outils.html#boite-a-outils-nagios)
    -   [Vérifier la
        configuration](boite-a-outils.html#verifier-la-configuration)

Boîte à outils Nagios {#boite-a-outils-nagios .sectionedit1}
=====================

Vérifier la configuration {#verifier-la-configuration .sectionedit2}
-------------------------

Pour contrôler la configuration de Nagios, notamment afin de vérifier
que celle-ci ne comporte aucune erreur. Cette commande permet également
de détailler les erreurs éventuelles rencontrées, lors d’un démarrage de
Nagios :

~~~~ {.code}
$ /usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg
~~~~
