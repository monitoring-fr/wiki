---
layout: page
title: Boîte à outils Nagios
---

Vérifier la configuration {#verifier-la-configuration .sectionedit2}
-------------------------

Pour contrôler la configuration de Nagios, notamment afin de vérifier
que celle-ci ne comporte aucune erreur. Cette commande permet également
de détailler les erreurs éventuelles rencontrées, lors d’un démarrage de
Nagios :

~~~
$ /usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg
~~~