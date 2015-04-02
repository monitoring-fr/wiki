---
layout: page
---

[[[Nagios Plugins](start@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Plugins](start.html "nagios:plugins:start")

### Table des matières {.toggle}

-   [Nagios Plugins](start.html#nagios-plugins)
    -   [Plugins distants](start.html#plugins-distants)
    -   [Plugins locaux](start.html#plugins-locaux)
    -   [By monitoring-fr.org](start.html#by-monitoring-frorg)
        -   [check\_uptime](start.html#check_uptime)
        -   [check\_lastuser](start.html#check_lastuser)
        -   [check\_dir\_size](start.html#check_dir_size)

Nagios Plugins {#nagios-plugins .sectionedit1}
==============

Point de départ de ce que j’espère être à terme une référence des
plugins officiels dans un premier temps. L’idée est de constituer une
page par plugin et de reprendre l’aide du plugin ainsi que des
définitions de commande génériques et spécialisées.

A la différence de beaucoup d’autres outils de supervision, Nagios ne
dispose pas de mécanisme interne pour vérifier l’état d’un service, d’un
hôte, etc. A la place, il utilise des programmes externes (appelés
plugins). Nagios exécute un plugin dès qu’il a besoin de tester un
service ou un hôte qui est supervisé. Les plugins font ce qu‘il faut
pour exécuter le contrôle et ensuite envoient simplement le résultat à
Nagios. Nagios analyse le résultat reçu du plugin et prend les mesures
nécessaires (déclenchements de notifications, d’actions…)

Les plugins sont des programmes bien séparés de Nagios, ils peuvent
contrôler une ressource ou un service local ou distant. Les plugins sont
des programmes exécutables ou scripts (perl, shell, etc..) qui peuvent
être lancés depuis une ligne de commande pour tester un hôte ou un
service. Nagios utilise le résultat de cette action pour déterminer le
statut des hôtes ou services sur le réseau. Pour Nagios peu importe ce
que fait un plugin, seul le résultat compte.

Grâce à cette architecture, vous pouvez contrôler n’importe quoi, du
moment que vous y pensez. Si vous pouvez automatiser le processus de
contrôle de quelque chose, vous pouvez le superviser avec Nagios. Nagios
ne peut rien faire sans plugin, toute les vérifications sont faites à
l‘aide d‘un plugin. Il existe déjà de nombreux plugins, mais aucun n‘est
fourni avec Nagios lorsqu‘on le télécharge.

Les plugins permettent aux utilisateurs de développer facilement leurs
propres vérifications de services. En effet, il est très facile de
développer un plugin qui surveille un service spécifique.

Les règles de développement des plugins Nagios sont disponibles à
l‘adresse suivante :
[http://nagiosplug.sourceforge.net/developer-guidelines.html](http://nagiosplug.sourceforge.net/developer-guidelines.html "http://nagiosplug.sourceforge.net/developer-guidelines.html").
Un plugin peut être développé dans n‘importe quel langage de
programmation (C, shell, perl, …).

Plugins distants {#plugins-distants .sectionedit2}
----------------

Les plugins distants permettent à Nagios d’interroger directement à
distance ^[1)](start.html#fn__1)^ des services exposées publiquement
comme HTTP, SSH, SMTP, TELNET … Appartiennent à cette catégorie:

-   [check\_http](check_http.html "nagios:plugins:check_http")
-   [check\_iseries](http://wiki.monitoring-fr.org/nagios/plugins/check_iseries "nagios:plugins:check_iseries")
-   [check\_esx3](check_esx3.html "nagios:plugins:check_esx3")
-   [check\_multi](check_multi.html "nagios:plugins:check_multi")
-   [check\_jmx](check_jmx.html "nagios:plugins:check_jmx")
-   [check\_prelude](check_prelude.html "nagios:plugins:check_prelude")
-   [check\_webpage.rb](check_webpage.rb.html "nagios:plugins:check_webpage.rb")

Parmi les plugins distants, trois sont à distinguer car ils ne
contrôlent pas directement de services comme les autres mais permettent
d’interroger à distance les ressources locales d’un hôte via NRPE,
[SNMP](../../supervision/snmp.html "supervision:snmp") ou SSH; ce sont:

-   [check\_nrpe](http://wiki.monitoring-fr.org/nagios/plugins/check_nrpe "nagios:plugins:check_nrpe")
-   [check\_by\_ssh](check_by_ssh.html "nagios:plugins:check_by_ssh")
-   [check\_snmp](http://wiki.monitoring-fr.org/nagios/plugins/check_snmp "nagios:plugins:check_snmp")

Plugins locaux {#plugins-locaux .sectionedit3}
--------------

Les plugins locaux, au contraire des plugins distants, sont des
contrôles qui doivent être faits localement et dont le résultat doit
être transporté à Nagios. Ils servent à contrôler les ressources
attachées à un hôte comme les disques durs, les processus, la mémoire,
la charge système… Appartiennent à cette catégorie de plugins:

-   [check\_disk](http://wiki.monitoring-fr.org/nagios/plugins/check_disk "nagios:plugins:check_disk")
-   [check\_procs](check_procs.html "nagios:plugins:check_procs")
-   [check\_procs2](check_procs2.html "nagios:plugins:check_procs2")
-   [check\_apt](check_apt.html "nagios:plugins:check_apt")
-   [check\_rrd](../../plugins/check_rrd.html "nagios:plugins:check_rrd")
-   [check\_dnsbl](check_dnsbl.html "nagios:plugins:check_dnsbl")

By monitoring-fr.org {#by-monitoring-frorg .sectionedit4}
--------------------

Quelques plugins basique et mal écrit pour le moment mais qui font le
job. Ces commandes ^[2)](start.html#fn__2)^ peuvent être facilement
transformés en plug-in “propre” grâce au plugin
[check\_generic](http://www.my-plugin.de/wiki/doku.php/projects:check_generic:start "http://www.my-plugin.de/wiki/doku.php/projects:check_generic:start").

### check\_uptime {#check_uptime .sectionedit5}

Vérifie depuis combien de temps une machine unix/linux est démarré.

~~~ {.code .bash}
#/bin/sh
 
# Version 0.4 du 2010-02-26 
# permet d'avoir les PerfsData sous PNP ( lorsque le pc est allumé au moins une journée...)
DayUp=`uptime |grep day | awk '{print $3}'`
 
echo "`uptime | awk -F " " '{print $2" "$3" "$4" "$5}'` |Day_Up=$DayUp"
exit 0
~~~

### check\_lastuser {#check_lastuser .sectionedit6}

Vérifie qui est le dernier utilisateur qui s’est connecté et son adresse
ip

~~~ {.code .bash}
#!/bin/sh
 
# Version 0.1 du 2007-06-30
 
last | tac | tail -n 1
exit 0
~~~

### check\_dir\_size {#check_dir_size .sectionedit7}

Vérifier la taille occupée par un répertoire sur un disque/partition
windows :
[check\_dir\_size](http://wiki.monitoring-fr.org/nagios/plugins/check_dir_size "nagios:plugins:check_dir_size")

^[1)](start.html#fnt__1)^ sans avoir d’agent à installer sur l’hôte

^[2)](start.html#fnt__2)^ ce sont plutôt des commandes que des plug-ins

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

nagios/plugins/start.txt · Dernière modification: 2013/03/29 09:39
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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Astart&1424859524)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
