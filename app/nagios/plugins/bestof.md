---
layout: page
---

[[[Best of plugins compatibles Nagios](bestof@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Plugins](start.html "nagios:plugins:start") » [Best of plugins
compatibles Nagios](bestof.html "nagios:plugins:bestof")

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
supervision](../../supervision/links.html "supervision:links") mais pour
les plugins compatibles Nagios (utilisables donc avec Nagios mais aussi
Centreon, Shinken…) et surtout en ne listant pas tous les plugins (on ne
fait pas un monitoringexchange supplémentaire) mais seulement ceux que
nous considérons les meilleurs pour MySQL, LDAP, Apache…

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

[check\_hpasm](check_hpasm.html "nagios:plugins:check_hpasm")

Plugins Divers {#plugins-divers .sectionedit10}
--------------

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../start.html "start")**

**[Supervision](../../supervision/start.html "supervision:start")**

-   [Nagios](../start.html "nagios:start")
-   [Centreon](../../centreon/start.html "centreon:start")
-   [Shinken](../../shinken/start.html "shinken:start")
-   [Zabbix](../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../vigilo/start.html "vigilo:start")
-   [Icinga](../../icinga/start.html "icinga:start")
-   [Cacti](../../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../canopsis/start.html "canopsis:start")

**[Sécurité](../../securite/start.html "securite:start")**

**[Infrastructure](../../infra/start.html "infra:start")**

**[Développement](../../dev/start.html "dev:start")**

Nagios Plugins {#nagios-plugins .sectionedit1}
--------------

-   [Best of plugins compatibles
    Nagios](bestof.html "nagios:plugins:bestof")
-   [Cucumber
    Nagios](cucumber-nagios.html "nagios:plugins:cucumber-nagios")
-   [Supervision de type End User Experience avec Cucumber &
    Watir](cucumber-nagios-watir.html "nagios:plugins:cucumber-nagios-watir")
-   [check\_apt](check_apt.html "nagios:plugins:check_apt")
-   [check\_by\_ssh](check_by_ssh.html "nagios:plugins:check_by_ssh")
-   [check\_citrix\_lic](check_citrix_lic.html "nagios:plugins:check_citrix_lic")
-   [check\_dnsbl](check_dnsbl.html "nagios:plugins:check_dnsbl")
-   [check\_esx3](check_esx3.html "nagios:plugins:check_esx3")
-   [check\_esx3\_dp](check_esx3_dp.html "nagios:plugins:check_esx3_dp")
-   [check\_hpasm](check_hpasm.html "nagios:plugins:check_hpasm")
-   [check\_http](check_http.html "nagios:plugins:check_http")
-   [check\_jmx](check_jmx.html "nagios:plugins:check_jmx")
-   [check\_multi](check_multi.html "nagios:plugins:check_multi")
-   [check\_prelude](check_prelude.html "nagios:plugins:check_prelude")
-   [check\_procs](check_procs.html "nagios:plugins:check_procs")
-   [check\_procs2](check_procs2.html "nagios:plugins:check_procs2")
-   [check\_rrd](../../plugins/check_rrd.html "nagios:plugins:check_rrd")
-   [check\_webpage.rb](check_webpage.rb.html "nagios:plugins:check_webpage.rb")

-   [Afficher le texte
    source](bestof@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](bestof@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](bestof@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](bestof@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](bestof@do=media.html "Gestionnaire de médias")
-   [Index](bestof@do=index.html "Index [X]")
-   [Connexion](bestof@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](bestof.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/bestof.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../lib/tpl/arctic/images/button-rss.png)](../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Abestof&1424859575)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
