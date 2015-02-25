---
layout: page
---

[[[check\_procs](check_procs@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Plugins](start.html "nagios:plugins:start") »
[check\_procs](check_procs.html "nagios:plugins:check_procs")

### Table des matières {.toggle}

-   [check\_procs](check_procs.html#check_procs)
    -   [Exemples check\_procs](check_procs.html#exemples-check_procs)
        -   [Nombre total de
            processus](check_procs.html#nombre-total-de-processus)
        -   [Nombre total de processus
            nommé](check_procs.html#nombre-total-de-processus-nomme)
    -   [Intégration check\_procs dans
        Nagios](check_procs.html#integration-check_procs-dans-nagios)
    -   [Aide check\_procs](check_procs.html#aide-check_procs)

check\_procs {#check_procs .sectionedit1}
============

check\_proc fait partie des plugins officiels distribués sur
nagiosplugins.org.

Cette une commande de base pour monitorer des processus qui n’a qu’un
défaut dans sa version 1.4.11 actuelle, celui de ne pas proposer de
données perfdata.

Exemples check\_procs {#exemples-check_procs .sectionedit2}
---------------------

Des exemples d’utilisation de la commande check\_procs.

### Nombre total de processus {#nombre-total-de-processus .sectionedit3}

Sans seuil, le plugin renverra **toujours** un état ok.

~~~
./check_procs
PROCS OK: 63 processes
~~~

Nombre total de processus avec seuil de warning à 50 et critical à 80

~~~
./check_procs -w 50 -c 80
PROCS WARNING: 63 processes
~~~

### Nombre total de processus nommé {#nombre-total-de-processus-nomme .sectionedit4}

Nombre de processus du nom de \$nom avec argument -C. Le seuil passé
indique qu’il faut au minimum un processus du nom.

~~~
./check_procs -C nagios -w 1:20 -c 1:50
PROCS OK: 1 process with command name 'nagios'
~~~

Il sortent d’ou tes chiffres 20 et 50 (“1:20 -c 1:50”) ?!? -\_-

Ce sont des intervalles Warning \> 1 à \< 20 et Critical \> 20 à 50 et
plus

Intégration check\_procs dans Nagios {#integration-check_procs-dans-nagios .sectionedit5}
------------------------------------

de l’exemple ci-dessus on peut écrire plusieurs définitions de commandes
Nagios, suivant que l’on souhaite on non spécialiser la commande.

~~~
# 'check_procs' command definition
define command{
        command_name    check_procs
        command_line    $USER1$/check_procs -C $ARG1$ -w $ARG2$ -c $ARG3$
        }
~~~

La définition de la commande dans le service l’utilisant est dans ce cas

~~~
        check_command                   check_procs!nagios!1:20!1:50
~~~

Mais on peut aussi spécialiser la commande comme suit :

~~~
# 'check_nagios_procs' command definition
define command{
        command_name    check_nagios_procs
        command_line    $USER1$/check_procs -C nagios -w $ARG1$ -c $ARG2$
        }
~~~

pour la définition de commande de service suivante :

~~~
        check_command                   check_nagios_procs!1:20!1:50
~~~

Aide check\_procs {#aide-check_procs .sectionedit6}
-----------------

~~~
Usage:check_procs -w <range> -c <range> [-m metric] [-s state] [-p ppid]
 [-u user] [-r rss] [-z vsz] [-P %cpu] [-a argument-array]
 [-C command] [-t timeout] [-v]
Required Arguments:
 -w, --warning=RANGE
   Generate warning state if metric is outside this range
 -c, --critical=RANGE
   Generate critical state if metric is outside this range
Optional Arguments:
 -m, --metric=TYPE
  Check thresholds against metric. Valid types:
  PROCS   - number of processes (default)
  VSZ     - virtual memory size
  RSS     - resident set memory size
  CPU     - percentage cpu
  ELAPSED - time elapsed in seconds
 -t, --timeout=INTEGER
    Seconds before connection times out (default: 10)
 -v, --verbose
    Extra information. Up to 3 verbosity levels
Optional Filters:
 -s, --state=STATUSFLAGS
   Only scan for processes that have, in the output of `ps`, one or
   more of the status flags you specify (for example R, Z, S, RS,
   RSZDT, plus others based on the output of your 'ps' command).
 -p, --ppid=PPID
   Only scan for children of the parent process ID indicated.
 -z, --vsz=VSZ
   Only scan for processes with vsz higher than indicated.
 -r, --rss=RSS
   Only scan for processes with rss higher than indicated.
 -P, --pcpu=PCPU
   Only scan for processes with pcpu higher than indicated.
 -u, --user=USER
   Only scan for processes with user name or ID indicated.
 -a, --argument-array=STRING
   Only scan for processes with args that contain STRING.
 -C, --command=COMMAND
   Only scan for exact matches of COMMAND (without path).

RANGEs are specified 'min:max' or 'min:' or ':max' (or 'max'). If
specified 'max:min', a warning status will be generated if the
count is inside the specified range

This plugin checks the number of currently running processes and
generates WARNING or CRITICAL states if the process count is outside
the specified threshold ranges. The process count can be filtered by
process owner, parent process PID, current state (e.g., 'Z'), or may
be the total number of running processes

Examples:
 check_procs -w 2:2 -c 2:1024 -C portsentry
  Warning if not two processes with command name portsentry.
  Critical if < 2 or > 1024 processes

 check_procs -w 10 -a '/usr/local/bin/perl' -u root
  Warning alert if > 10 processes with command arguments containing
  '/usr/local/bin/perl' and owned by root

 check_procs -w 50000 -c 100000 --metric=VSZ
  Alert if vsz of any processes over 50K or 100K

 check_procs -w 10 -c 20 --metric=CPU
  Alert if cpu of any processes over 10%% or 20%%
~~~

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
    source](check_procs@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](check_procs@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](check_procs@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](check_procs@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](check_procs@do=media.html "Gestionnaire de médias")
-   [Index](check_procs@do=index.html "Index [X]")
-   [Connexion](check_procs@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](check_procs.html#dokuwiki__top "Haut de page [T]")

nagios/plugins/check\_procs.txt · Dernière modification: 2013/03/29
09:39 (modification externe)

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

![](../../lib/exe/indexer.php@id=nagios%253Aplugins%253Acheck_procs&1424859574)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
