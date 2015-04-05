---
layout: page
title: check\_mk
---

[![](../..//assets/media/addons/check_mk/check_mk.200.png)](../..//_detail/addons/check_mk/check_mk.200.png@id=nagios%253Aaddons%253Acheck_mk%253Astart.html "addons:check_mk:check_mk.200.png")

L’approche habituelle pour intégrer des contrôles d’hôtes et de services
à Nagios est d’appeler des petits programmes externes (“plugins”) à
intervalles réguliers. Dans le cas de la supervision d’un système
d’exploitation, le plugin contacte un démon distant qui tourne sur la
machine cible pour récupérer un indicateur. Cet indicateur peut donner
la valeur d’une partition spécifique, d’une interface réseau ou
simplement la quantité de mémoire utilisée. Les démons de supervision
les plus utilisés pour surveiller un hôte Linux/UNIX avec Nagios sont
NRPE et dans une moindre mesure SSH et SNMP.

[check\_mk](http://mathias-kettner.de/check_mk.html "http://mathias-kettner.de/check_mk.html")
utilise une approche différente; avec quelques avantages cruciaux.
L’idée de base de check\_mk est de récupérer **toutes** les informations
d’un hôte en **une seule fois**. Pour chaque hôte à surveiller,
check\_mk est appelé par Nagios une seule fois par période de temps (une
minute par exemple). Il contacte un démon appelé mknagios sur la machine
cible. Celui-ci expose toutes les informations pertinentes pour cet
hôte, indépendamment de ce qu’il a à contrôler et des indicateurs
demandés. **Ce démon n’a pas besoin de paramètre et ne requiert aucune
configuration**.

check\_mk traite alors ces informations et extrait tous les indicateurs
qui ont été configurés pour la supervision, les compare aux seuils
configurés (la configuration est faite dans un fichier check\_mk.cfg sur
le serveur Nagios). Il envoie ensuite les résultats (OK/WARNING/CRITICAL
et les performance data si applicable) à Nagios via un contrôle passif
de service. Nagios traite ces résultats passifs comme si c’étaient des
résultats actifs.

[![](../..//assets/media/addons/overview_600.trans.png)](../..//_detail/addons/overview_600.trans.png@id=nagios%253Aaddons%253Acheck_mk%253Astart.html "addons:overview_600.trans.png")

Documentation {#documentation .sectionedit2}
-------------

A construire

**[Installation de
check\_mk](../../../addons/check_mk/check_mk-install.html "addons:check_mk:check_mk-install")**

**[mk\_livestatus](../../../addons/check_mk/livestatus.html "addons:check_mk:livestatus")**