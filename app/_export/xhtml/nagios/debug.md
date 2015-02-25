---
layout: page
---

### Table des matières {.toggle}

-   [check-list de diagnostic](debug.html#check-list-de-diagnostic)
    -   [Commandes](debug.html#commandes)
        -   [Processus](debug.html#processus)
        -   [Connexions réseaux](debug.html#connexions-reseaux)
        -   [Fichiers ouverts](debug.html#fichiers-ouverts)
        -   [Utilisateurs et
            groupes](debug.html#utilisateurs-et-groupes)
        -   [Droits sur les
            fichiers](debug.html#droits-sur-les-fichiers)
        -   [Consommation ressources de
            Nagios](debug.html#consommation-ressources-de-nagios)
        -   [Surveiller en profondeur l'activité de
            nagios](debug.html#surveiller-en-profondeur-l-activite-de-nagios)
    -   [Débug exécution de plugin de
        check](debug.html#debug-execution-de-plugin-de-check)
        -   [Introduction](debug.html#introduction)
        -   [Principe](debug.html#principe)
        -   [Mise en œuvre](debug.html#mise-en-œuvre)

check-list de diagnostic {#check-list-de-diagnostic .sectionedit1}
========================

Cette page a été inspiré par un [fil de
discussion](http://forums.monitoring-fr.org/index.php/topic,88.0.html "http://forums.monitoring-fr.org/index.php/topic,88.0.html")
dans les forums monitoring-fr.org. Il est paru intéressant de reprendre
les commandes fournies par david.guenault à cette occasion et d’en faire
le point de départ d’une démarche de diagnostic général sur les
problèmes rencontrés avec Nagios.

Commandes {#commandes .sectionedit2}
---------

Voici donc une série de commandes permettant de voir le contexte
d’exécution de Nagios et de ses compléments.

### Processus {#processus .sectionedit3}

Commande permettant de lister les processus fonctionnant pour le compte
de l’utilisateur Nagios ou contenant le mot nagios.

~~~~ {.code}
ps -aef | grep nagios
~~~~

~~~~ {.code}
nagios    1776     1  0 20:38 ?        00:00:00 /usr/local/nagios/bin/nagios -d /usr/local/nagios/etc/nagios.cfg
root      2343  2300  0 20:42 pts/0    00:00:00 grep nagios
~~~~

### Connexions réseaux {#connexions-reseaux .sectionedit4}

~~~~ {.code}
netstat -taupen | grep -i listen:
~~~~

~~~~ {.code}
tcp        0      0 0.0.0.0:58592               0.0.0.0:*                   LISTEN      0          3432       1366/rpc.statd     
tcp        0      0 0.0.0.0:111                 0.0.0.0:*                   LISTEN      0          3349       1347/rpcbind       
tcp        0      0 0.0.0.0:22                  0.0.0.0:*                   LISTEN      0          4499       1662/sshd           
tcp        0      0 127.0.0.1:631               0.0.0.0:*                   LISTEN      0          4834       1733/cupsd         
tcp        0      0 127.0.0.1:25                0.0.0.0:*                   LISTEN      0          4662       1682/sendmail: acce
tcp        0      0 :::22                       :::*                        LISTEN      0          4497       1662/sshd           
~~~~

### Fichiers ouverts {#fichiers-ouverts .sectionedit5}

~~~~ {.code}
lsof | grep ^nagios :
~~~~

~~~~ {.code}
nagios    1776    nagios  cwd       DIR      253,0     4096          2 /
nagios    1776    nagios  rtd       DIR      253,0     4096          2 /
nagios    1776    nagios  txt       REG      253,0   573648     348281 /usr/local/nagios/bin/nagios
nagios    1776    nagios  mem       REG      253,0   135940     450658 /lib/ld-2.8.so
nagios    1776    nagios  mem       REG      253,0   208196     450673 /lib/libm-2.8.so
nagios    1776    nagios  mem       REG      253,0   129276     450689 /lib/libpthread-2.8.so
nagios    1776    nagios  mem       REG      253,0    18568     450671 /lib/libdl-2.8.so
nagios    1776    nagios  mem       REG      253,0  1755052     450665 /lib/libc-2.8.so
nagios    1776    nagios  mem       REG      253,0    54828     450681 /lib/libnss_files-2.8.so
nagios    1776    nagios    0r      CHR        1,3                 509 /dev/null
nagios    1776    nagios    1w      CHR        1,3                 509 /dev/null
nagios    1776    nagios    2w      CHR        1,3                 509 /dev/null
nagios    1776    nagios    3u     unix 0xcfbc3380                4956 socket
nagios    1776    nagios    4uW     REG      253,0        5     378237 /usr/local/nagios/var/nagios.lock
nagios    1776    nagios    5u     FIFO      253,0              378239 /usr/local/nagios/var/rw/nagios.cmd
~~~~

### Utilisateurs et groupes {#utilisateurs-et-groupes .sectionedit6}

~~~~ {.code}
grep nagios /etc/passwd:
~~~~

~~~~ {.code}
nagios:x:501:501::/home/nagios:/bin/bash
~~~~

~~~~ {.code}
grep nagios /etc/group :
~~~~

~~~~ {.code}
nagios:x:501:
nagcmd:x:502:nagios,apache
~~~~

### Droits sur les fichiers {#droits-sur-les-fichiers .sectionedit7}

~~~~ {.code}
ls -l /usr/local/nagios/sbin  :
~~~~

~~~~ {.code}
total 2544
-rwxrwxr-x 1 nagios nagios 221856 mar 29 13:31 avail.cgi
-rwxrwxr-x 1 nagios nagios 221196 mar 29 13:31 cmd.cgi
-rwxrwxr-x 1 nagios nagios 189024 mar 29 13:31 config.cgi
-rwxrwxr-x 1 nagios nagios 242272 mar 29 13:31 extinfo.cgi
-rwxrwxr-x 1 nagios nagios 172672 mar 29 13:31 history.cgi
-rwxrwxr-x 1 nagios nagios 168544 mar 29 13:31 notifications.cgi
-rwxrwxr-x 1 nagios nagios 164448 mar 29 13:31 outages.cgi
-rwxrwxr-x 1 nagios nagios 168832 mar 29 13:31 showlog.cgi
-rwxrwxr-x 1 nagios nagios 234112 mar 29 13:31 status.cgi
-rwxrwxr-x 1 nagios nagios 184928 mar 29 13:31 statuswml.cgi
-rwxrwxr-x 1 nagios nagios 168576 mar 29 13:31 statuswrl.cgi
-rwxrwxr-x 1 nagios nagios 189120 mar 29 13:31 summary.cgi
-rwxrwxr-x 1 nagios nagios 180960 mar 29 13:31 tac.cgi
~~~~

~~~~ {.code}
 
ls -l /usr/local/nagios
~~~~

~~~~ {.code}
total 24
drwxrwxr-x  2 nagios nagios 4096 mar 29 13:31 bin
drwxrwxr-x  3 nagios nagios 4096 mar 29 13:42 etc
drwxrwxr-x  2 nagios nagios 4096 mar 29 14:09 libexec
drwxrwxr-x  2 nagios nagios 4096 mar 29 17:21 sbin
drwxrwxr-x 10 nagios nagios 4096 mar 29 14:09 share
drwxrwxr-x  5 nagios nagios 4096 mar 29 20:48 var
~~~~

### Consommation ressources de Nagios {#consommation-ressources-de-nagios .sectionedit8}

Le plus simple pour voir la consomation de ressources de Nagios est
d’utiliser la commande top

~~~~ {.code}
top
~~~~

Une fois lancée, il suffit de faire *u* et de rentrer le nom
d’utilisateur : nagios. Il est possible de trier par utilisation cpu
(tri par défaut, ou *P*) ou bien par mémoire (*M*). Il est possible de
sauvegarder cette configuration de top avec *W*.

### Surveiller en profondeur l'activité de nagios {#surveiller-en-profondeur-l-activite-de-nagios .sectionedit9}

Activer le mode debug dans nagios. Pour cela editer le fichier
/opt/nagios/etc/nagios.cfg et rajouter les lignes suivantes :

~~~~ {.code}
debug_level=16
debug_file=/opt/nagios/var/nagios.debug
debug_verbosity=2
~~~~

la directive debug level permet de spécifier le type d’information
voulue.

-   -1 = Log everything
-   0 = Log nothing (default)
-   1 = Function enter/exit information
-   2 = Config information
-   4 = Process information
-   8 = Scheduled event information
-   16 = Host/service check information
-   32 = Notification information
-   64 = Event broker information

Tout cela est cumulatif en appliquant une opération booléenne OR. par
exemple si l’on veut ‘Scheduled event information’ et ‘Host/service
check information’. On applique 8|16=24.

Débug exécution de plugin de check {#debug-execution-de-plugin-de-check .sectionedit10}
----------------------------------

### Introduction {#introduction .sectionedit11}

Une des choses les plus frustrantes dans nagios est l’impossibilité de
voir dans les logs l’intégralité de la commande de check exécutée par
l’ordonnanceur. On peut ainsi passer des heures à chercher pourquoi
**“ce foutu plugin fonctionne en ligne de commande et pas dans
l’ordonnanceur !”**. Je suis tombé (un peu par hasard) sur un article
exposant une manière de journaliser les appels aux commandes de check.
L’article en anglais se trouve à cette adresse :
[http://www.waggy.at/nagios/capture\_plugin.htm](http://www.waggy.at/nagios/capture_plugin.htm "http://www.waggy.at/nagios/capture_plugin.htm").
Je me propose ici de faire un petit résumé de cette méthode.

### Principe {#principe .sectionedit12}

Le principe, comme toutes les solutions géniales, et d’une simplicité
proprement désarmante. Il suffit d’intercaler entre l’ordonnanceur et la
commande de check une nouvelle commande qui récupère les paramètres en
entrée, les transmet au plugin devant être analysé puis récupère le
résultat et le renvoie sur les sorties standard et d’erreur. Ni vu, ni
connu, je t’embrouille. Les paramètres et les résultats sont inscrits
dans un fichier journal pouvant être consulté par la suite.

### Mise en œuvre {#mise-en-œuvre .sectionedit13}

Le plugin de check permettant cela est disponible sur la page de
l’article original. Voici le code source.

~~~~ {.code .perl}
#!/usr/bin/perl -w
#
# Written 2007-03-24 by Wolfgang Wagner (aka wolle)
#
# $id: capture_plugin.pl v1.0
#
# Captures stdout&stderr in a file and returns orginial results to Nagios (http://www.nagios.org)
#
# Copyright 2007 by Wolfgang Wagner. All rights reserved.
#
# This software is licensed under the terms of the GNU General Public License Version 2 
# as published by the Free Software Foundation.
# It is provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE WARRANTY OF DESIGN, 
# MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE.
#
# Check out http://www.waggy.at for possible future versions.
#
 
use strict;
 
# This plugin does not need any nagios utils. It just interfaces the original plugin.
 
my $LOG_FILE = "/tmp/captured-plugins.log";
 
my ($cmd, $ret_code, $output);
# First display all arguments
my ($numArgs, $argnum);
$numArgs = $#ARGV + 1;
 
# create the command-line
 
$cmd = $ARGV[0];
foreach $argnum (1 .. $#ARGV) {
  $cmd = $cmd . " '" . $ARGV[$argnum] . "'"
}
 
# prepare debug-output
# ($second, $minute, $hour, $dayOfMonth, $month, $yearOffset, $dayOfWeek, $dayOfYear, $daylightSavings) = localtime(time);
my ($second, $minute, $hour, $dayOfMonth, $month, $yearOffset) = localtime(time);
my $year = 1900 + $yearOffset;
my $theTime = " $year-$month-$dayOfMonth $hour:$minute:$second";
# now execute the command
 
$output = `$cmd 2>&1`;
$ret_code = $?>>8;
 
# log the start, output, retcode & end
 
my $LogFile;
# open could be better: check success later; if unsuccessful return UNKNWON to Nagios
open (LogFile, ">>$LOG_FILE") || die ("Cannot open logfile");
print LogFile "$theTime ------ debugging\ncmd=[$cmd]\noutput=[$output]\nretcode=$ret_code\n-------\n";
close(LogFile);
# avoid access problems for others.
chmod 0777, $LOG_FILE;
 
# now return the original resutlt to Nagios
print $output;
exit "$ret_code";
~~~~

Placer le plugin (capture\_plugin.pl) dans le répertoire libexec de
nagios (par exemple : /opt/nagios/libexec)

Éventuellement changer le chemin et le nom du fichier de log en
modifiant la ligne suivante :

~~~~ {.code .perl}
my $LOG_FILE = "/tmp/captured-plugins.log";
~~~~

Maintenant place à la mise en oeuvre.

Je cherche à tracer les appels à la commande suivante :

~~~~ {.code}
define command {
        command_name    check_lamp_apachestatus
        command_line    /opt/local/bin/perl5.8.8  /opt/nagios/libexec/check_apachestatus_auto.pl -H $HOSTADDRESS$
}
~~~~

nous allons transformer notre commande de la façon suivante :

~~~~ {.code}
define command {
        command_name    check_lamp_apachestatus
        command_line    /opt/nagios/libexec/capture_plugin.pl /opt/nagios/libexec/check_apachestatus_auto.pl -H $HOSTADDRESS$
}
~~~~
