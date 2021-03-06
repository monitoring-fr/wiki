---
layout: page
title: check\_procs
---

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