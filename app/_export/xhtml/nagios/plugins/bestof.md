---
layout: page
---

### Table des matières {.toggle}

-   [Best of plugins compatibles
    Nagios](bestof.html#best-of-plugins-compatibles-nagios)
    -   [Comment participer à cette
        page](bestof.html#comment-participer-a-cette-page)
    -   [Plugins applicatifs](bestof.html#plugins-applicatifs)
        -   [MySQL](bestof.html#mysql)
        -   [Oracle](bestof.html#oracle)
    -   [Plugins systèmes](bestof.html#plugins-systemes)
    -   [Plugins réseaux](bestof.html#plugins-reseaux)
        -   [Interface Réseaux](bestof.html#interface-reseaux)
    -   [Plugins Hardware](bestof.html#plugins-hardware)
    -   [Plugins Divers](bestof.html#plugins-divers)

Best of plugins compatibles Nagios {#best-of-plugins-compatibles-nagios .sectionedit1}
==================================

L’idée basique est de faire un peu comme le [panorama de la
supervision](../../../../supervision/links.html "supervision:links")
mais pour les plugins compatibles Nagios (utilisables donc avec Nagios
mais aussi Centreon, Shinken…) et surtout en ne listant pas tous les
plugins (on ne fait pas un monitoringexchange supplémentaire) mais
seulement ceux que nous considérons les meilleurs pour MySQL, LDAP,
Apache…

Comment participer à cette page {#comment-participer-a-cette-page .sectionedit2}
-------------------------------

Un simple texte indiquant pourquoi ce plugin est l’un des meilleurs dans
son domaine avec le lien vers le source suffit dans un premier temps.
Nous verrons à partir de la liste générée ce que nous pourrons apporter
pour chacun de ceux-ci mais une première liste évidente pourrait
contenir : - Documentation complète en français sur l’utilisation du
plugin (simple, avancée, expert) - Des gabarits prêts à l’emploi pour
pnp4nagios (pour avoir de jolis graphes ;) - Des fichiers de
configuration pour ce plugin prêt à être déposé sur le serveur de
supervision - Un pack contenant le tout (configuration + gabarits +
plugin) prêt à installer

Plugins applicatifs {#plugins-applicatifs .sectionedit3}
-------------------

### MySQL {#mysql .sectionedit4}

-   Comme tous les plugins développés par Gerhard Lausser,
    [check\_mysql\_health](http://labs.consol.de/lang/en/nagios "http://labs.consol.de/lang/en/nagios")
    est bien écrit et complet.
-   Quand on a développé des templates MySQL pour Cacti et innotop comme
    c’est le cas de
    [Percona](http://www.percona.com/consulting/mysql-monitoring-graphing/ "http://www.percona.com/consulting/mysql-monitoring-graphing/"),
    il y a une certaine légitimité à proposer un bon plugin pour MySQL
    nommé
    [check-mysql-all](http://code.google.com/p/check-mysql-all/ "http://code.google.com/p/check-mysql-all/")

### Oracle {#oracle .sectionedit5}

De même que pour Mysql, le check de Gerhard sur
[[http://labs.consol.de/lang/en/nagios/]](http://labs.consol.de/lang/en/nagios/] "http://labs.consol.de/lang/en/nagios/]")
est ultra complet.

Plugins systèmes {#plugins-systemes .sectionedit6}
----------------

Plugins réseaux {#plugins-reseaux .sectionedit7}
---------------

### Interface Réseaux {#interface-reseaux .sectionedit8}

Concernant la supervision de l’état de vos ports réseaux sur vos
équipements, je ne connais pas mieux de la check\_interface\_table.pl.
Développez à l’origine par Werner Neunteufl de ITdesign Software
Projects & Consulting, ce plugin est sortie en version v2, il permet de
lister toutes les interfaces de votre équipements dans une page Web ;)

[Monitoring Exchange -
check\_interface\_table\_v2.pl](https://www.monitoringexchange.org/inventory/Check-Plugins/Network/check_interface_table_v2-pl "https://www.monitoringexchange.org/inventory/Check-Plugins/Network/check_interface_table_v2-pl")

[NetWays -
check\_interface\_table\_v2.pl](https://www.netways.org/projects/plugins/files "https://www.netways.org/projects/plugins/files")

[TBay - check\_interface\_table\_v3t (version mise à jour
récemment)](http://www.tontonitch.com/tiki/tiki-index.php?page=Nagios+plugins+-+interfacetable_v3t "http://www.tontonitch.com/tiki/tiki-index.php?page=Nagios+plugins+-+interfacetable_v3t")

Plugins Hardware {#plugins-hardware .sectionedit9}
----------------

[check\_hpasm](../../../../nagios/plugins/check_hpasm.html "nagios:plugins:check_hpasm")

Plugins Divers {#plugins-divers .sectionedit10}
--------------
