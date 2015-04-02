---
layout: page
title: Liste des connecteurs Canopsis
---

Panorama des connecteurs disponibles pour Canopsis.

Par défaut, Canopsis est capable de traiter toutes les données remontées
par AMQP. Néanmoins, certaines applications ne sont pas compatibles avec
le protocole AMQP, c’est pourquoi il existe certains connecteurs qui
permettent de réaliser une conversion des données et de les envoyer vers
Canopsis au bon format.

Vous possèdez une application qui ne possède pas encore d’un connecteur
? Selon les applications, il est parfois simple de réaliser un
connecteur pour Canopsis par vous même, grâce à la documentaton présente
sur la
[forge](http://forge.canopsis.org/projects/canopsis/issues "http://forge.canopsis.org/projects/canopsis/issues")
Canopsis. Vous pouvez également vous rendre sur le
[forum](http://forums.monitoring-fr.org/ "http://forums.monitoring-fr.org/")
de Monitoring-fr ou sinon sur le
[ideascale](http://canopsis.ideascale.com/ideascale "http://canopsis.ideascale.com/ideascale")
du projet Canopsis, pour respectivement discuter et/ou soumettre vos
besoins.

Connecteur Nagios / Icinga {#connecteur-nagiosicinga .sectionedit2}
--------------------------

Si vous posséder un serveur (ou plusieurs) de supervision de type
Nagios, vous pouvez installer un connecteur sous la forme d’un “Event
broker” (c’est-à-dire un NEB ⇒ Nagios Event Broker) afin de remonter les
données de votre supervision vers l’hyperviseur Canopsis. Ce NEB permet
tout simplement d’envoyer un flux AMQP des évènements remontés par
Nagios.

Connecteur Shinken {#connecteur-shinken .sectionedit3}
------------------

Connecteur en cours de développement

Connecteur SNMPTraps {#connecteur-snmptraps .sectionedit4}
--------------------

Si vous avez des éléments de votre SI vous remontent des traps SNMP
(réussite de sauvegarde, jobs d’ordonnancement, alerte sur les
équipements de stockage, …), avec le connecteur de Traps SNMP. Ce
connecteur permet d’envoyer un flux AMQP pour chaque Traps SNMP
interceptées par le démon snmptrapd .

**[Installation du connecteur
SNMPTraps](http://wiki.monitoring-fr.org/canopsis/canopsis-snmptrap-connector "canopsis:canopsis-snmptrap-connector")**

Connecteur Collectd {#connecteur-collectd .sectionedit5}
-------------------

Connecteur en cours de développement