---
layout: page
title: Incron & LoggedFS
---

La supervision des fichiers et répertoires consiste à surveiller les
fichiers (date, taille, permissions) pour y détecter des changements. Il
est de coutume de réaliser cette opération avec l’un des plugins
disponibles sur
[MonitoringExchange](http://www.monitoringexchange.org/ "http://www.monitoringexchange.org/").
Il est également possible d’utiliser
[Monit](monit.html "nagios:integration:monit") ou
[Collectd](collectd.html "nagios:integration:collectd")
^[1)](incron.html#fn__1)^ qui ont l’avantage de le faire en passif.

Nous allons voir maintenant deux nouvelles méthodes qui peuvent
complétées avantageusement l’arsenal à notre disposition pour ce genre
de choses.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Olivier JAN

Inotify & Incron {#inotify-incron .sectionedit3}
----------------

Inotify est un système de notification pour les systèmes de fichiers. Il
permet de superviser différents événements pouvant survenir sur ceux-ci.
Il peut être utilisé pour ce genre de choses:

-   détecter des changements sur les fichiers et dans les répertoires
    (ex. fichiers de configuration, répertoires de mail).
-   surveiller les fichiers critiques et leur restauration automatique
    éventuel.
-   statistiques d’usage des fichiers.
-   gestion automatique d’action après transfert
-   backup automatique en cas de changements.

Normalement, inotify est un module pour le noyau Linux intégré depuis la
version 2.6.13.

Incron permet quant à lui de déclencher des scripts et tout autres
actions en fonction des événements survenus, à la façon de cron pour le
temps.

Il existe un démon appelé
[kfsmd](http://freshmeat.net/projects/kfsmd/ "http://freshmeat.net/projects/kfsmd/")
fonctionnant de pair avec Inotify qui permet de journaliser les
modifications apportées au système de fichiers.

### Installation {#installation .sectionedit4}

Incron dépend du fait que votre noyau ait été compilé avec l’option
inotify, ce qui est le cas de tous les noyaux récents. Il faut récupérer
les fichiers d’entête du noyau de votre machine

~~~
sudo apt-get install linux-headers-`uname -r`
~~~

Sur mon habituel Ubuntu, le fichier inotify.h se trouve dans
/usr/src/linux-headers-2.6.24-19/include/linux.

Une fois cette condition remplie, L’installation ne pose aucun problème.

~~~
make all
sudo make install
~~~

### Utilisation {#utilisation .sectionedit5}

~~~
incrontab -t
IN_ACCESS,IN_MODIFY,IN_ATTRIB,IN_CLOSE_WRITE,IN_CLOSE_NOWRITE,\
IN_OPEN,IN_MOVED_FROM,IN_MOVED_TO,IN_CREATE,IN_DELETE,IN_DELETE_SELF,\
IN_CLOSE,IN_MOVE,IN_ONESHOT,IN_ALL_EVENTS,IN_DONT_FOLLOW,IN_ONLYDIR,IN_MOVE_SELF
~~~

Signification des attributs ci-dessus

~~~
IN_ACCESS - File was accessed (read) (*)
IN_ATTRIB - Metadata changed (permissions, timestamps, extended attributes, etc.) (*)
IN_CLOSE_WRITE - File opened for writing was closed (*)
IN_CLOSE_NOWRITE - File not opened for writing was closed (*)
IN_CLOSE - Covers IN_CLOSE_WRITE and IN_CLOSE_NOWRITE
IN_CREATE - File/directory created in watched directory (*)
IN_DELETE - File/directory deleted from watched directory (*)
IN_DELETE_SELF - Watched file/directory was itself deleted
IN_MODIFY - File was modified (*)
IN_MOVE_SELF - Watched file/directory was itself moved
IN_MOVED_FROM - File moved out of watched directory (*)
IN_MOVED_TO - File moved into watched directory (*)
IN_MOVE - Covers IN_MOVED_FROM and IN_MOVED_TO
IN_OPEN - File was opened (*)
IN_ALL_EVENTS - All of the above

IN_DONT_FOLLOW - Don't dereference pathname if it is a symbolic link
IN_ONESHOT - Monitor pathname for only one event
IN_ONLYDIR - Only watch pathname if it is a directory
~~~

par exemple, pour recharger la configuration de bind (/etc/named.conf)
quand celle-ci est modifiée

~~~
/etc/named.conf IN_MODIFY /etc/init.d/bind reload
~~~

The incron table manipulator may be run under any regular user since it
SUIDs. For manipulation with the tables use basically the same syntax as
for the crontab program. You can import a table, remove and edit the
current table.

La syntaxe de la configuration est la suivante (un ou plusieurs espaces
entre chaque éléments):

\<path\> \<mask\> \<command\>

Where:

-   \<path\> is a filesystem path (each whitespace must be prepended by
    a backslash)
-   \<mask\> is a symbolic (see inotify.h; use commas for separating
    symbols) or numeric mask for events
-   \<command\> is an application or script to run on the events

La commande peut contenir ces “variables”:

~~~
    * $$ - le signe dollar
    * $@ - le chemin du système de fichiers surveillé
    * $# - the event-related file name
    * $% - the event flags (textually)
    * $& - the event flags (numerically)
~~~

The mask may additionaly contain a special symbol IN\_NO\_LOOP which
disables events occurred during processing the event (to avoid loops).

Example: You need to run program ‘abc’ with the full file path as an
argument every time a file is changed in /var/mail. One of the solutions
follows:

~~~
/var/mail IN_CLOSE_WRITE abc $@/$#
~~~

Since 0.4.0 also system tables are supported. They are located in
/etc/incron.d and their commands use root privileges. System tables are
intended to be changed directly (without incrontab).

### Intégration avec Nagios {#integration-avec-nagios .sectionedit6}

La capacité de incron d’exécuter un script rend l’intégration on ne peut
plus classique avec l’appel à un script avec argument comme l’exemple de
fichier nagios.conf à mettre dans /etc/incron.d/.

~~~
/tmp IN_CLOSE_WRITE /usr/local/nagios/libexec/incron2external.sh files;;1;;$@/$#
~~~

Cet exemple de configuration surveille le répertoire /tmp et notifie
toutes les fermetures de fichier après écriture.

-   files est le nom du service à impacter dans nagios.
-   1 correspond à un WARNING
-   \$@/\$\# récupère le chemin et le nom du fichier écrit séparé par un
    slash.

dans le script appelé, il faut un contenu de ce type

~~~ {.code .bash}
#!/bin/bash
# Shell script to submit incron messages to the PROCESS_SERVICE_CHECK_RESULT command
# Copyright 2008 - Olivier Jan <ojan_at_monitoring-fr_dot_org>
# Version 1.0 du 2008-12-27
 
commandfile='/usr/local/nagios/var/rw/nagios.cmd'
 
incron_data=$1
 
hostname=`echo $HOSTNAME`
service=`echo $incron_data | awk -F ";;" '{print $1}'`
state=`echo $incron_data | awk -F ";;" '{print $2}'`
message=`echo $incron_data | awk -F ";;" '{print $3}'`
 
now=`date --date="$date" +%s`
 
/usr/bin/printf "[%lu] PROCESS_SERVICE_CHECK_RESULT;$hostname;$service;$state;$message\n" $now > $commandfile
 
exit 0;
~~~

### Intégration avec Syslog {#integration-avec-syslog .sectionedit7}

Ce n’est pas directement incron mais inotifywait, fourni avec les
inotify-tools sur Debian/Ubuntu que je vais intégrer pour contourner une
limitation sévère de incron. En effet, il n’est pas récursif sur les
dossiers, obligeant à les indiquer un à un… Fastidieux.

Voici donc un script bash nommé inotify2syslog.sh dont l’inspiration et
le crédit reviennent à [cet
auteur](http://kerlinux.org/2010/08/utilisation-de-inotifywait-dans-des-scripts-shell/ "http://kerlinux.org/2010/08/utilisation-de-inotifywait-dans-des-scripts-shell/")
et que j’ai modifié pour envoyer les événements vers un serveur syslog
distant. Il peut être adapté à plein de situations différentes comme de
la notification vers Nagios ou autres.

~~~ {.code .bash}
#!/bin/sh
 
# inotifywait -qrm --format %w%f %:e @ld.so.cache -e modify /etc/
 
# CONFIGURATION
DIR="/etc"
EVENTS="modify"
EXCLUDED_FILES="ld.so.cache"
INOTIFY_BIN=`which inotifywait`
FIFO="/tmp/inotify2.fifo"
LOGGER_BIN=`which logger`
SYSLOG_SERVER="10.10.20.6"
SYSLOG_PORT="514"
SYSLOG_FACILITY="local0.info"
 
# FUNCTIONS
on_exit() {
    kill $INOTIFY_PID
    rm $FIFO
    exit
}
 
on_event() {
    local date=$1
    local time=$2
    local file=$3
 
    sleep 5
 
    $LOGGER_BIN -d -n $SYSLOG_SERVER -P $SYSLOG_PORT -p $SYSLOG_FACILITY "file $file modified"
}
 
# MAIN
if [ ! -e "$FIFO" ]
then
    mkfifo "$FIFO"
fi
 
$INOTIFY_BIN -qrm @$EXCLUDED_FILES -e "$EVENTS" --timefmt '%Y-%m-%d %H:%M:%S' --format '%T %w%f' "$DIR" > "$FIFO" &
INOTIFY_PID=$!
 
trap "on_exit" 2 3 15
 
while read date time file
do
    on_event $date $time $file 
done < "$FIFO"
 
on_exit
~~~

LoggedFS {#loggedfs .sectionedit8}
--------

[Loggedfs](http://loggedfs.sourceforge.net/ "http://loggedfs.sourceforge.net/")
est un système de fichiers de type fuse qui permet de jounaliser toutes
les opérations faîtes sur celui-ci.

Version testée : 0.5

### Installation {#installation1 .sectionedit9}

~~~
sudo apt-get install libxml2-dev libpcre3-dev librlog-dev libfuse-dev
make
gunzip loggedfs.1.gz
sudo make install
~~~

Retour terminal

~~~
gzip loggedfs.1
cp loggedfs.1.gz /usr/share/man/man1/
cp loggedfs /usr/bin/
cp loggedfs.xml /etc/
~~~

Fichier de configuration fourni par défaut

~~~
<?xml version="1.0" encoding="UTF-8"?>

<!-- This is a sample configuration file for loggedfs. -->
<!-- This file is not used by default, you need to use the -c option to use it. -->
<loggedFS logEnabled="true" printProcessName="true">
        <includes>
                <include extension=".*" uid="*" action=".*" retname=".*"/>
        </includes>
        <excludes>
                <!-- Do not log getattr operations -->
                <exclude extension=".*" uid="*" action="getattr" retname=".*"/>
        </excludes>
</loggedFS>
~~~

démarrer loggedfs

~~~
sudo /usr/bin/loggedfs -c /etc/loggedfs.xml -p /var
~~~

exemple de sortie dans syslog

~~~
Sep  4 00:16:28 worker3 loggedfs: 4096 bytes read from /var/log/syslog at offset 180224 {SUCCESS} [ pid = 8537 tail uid = 1000 ]
Sep  4 00:16:28 worker3 loggedfs: read 4096 bytes from /var/log/syslog at offset 184320 {SUCCESS} [ pid = 8537 tail uid = 1000 ]
Sep  4 00:16:28 worker3 loggedfs: 312 bytes read from /var/log/syslog at offset 184320 {SUCCESS} [ pid = 8537 tail uid = 1000 ]
Sep  4 00:16:28 worker3 loggedfs: read 4096 bytes from /var/log/syslog at offset 184320 {SUCCESS} [ pid = 8537 tail uid = 1000 ]
Sep  4 00:16:28 worker3 loggedfs: 569 bytes read from /var/log/syslog at offset 184320 {SUCCESS} [ pid = 8537 tail uid = 1000 ]
Sep  4 00:16:28 worker3 loggedfs: read 4096 bytes from /var/log/syslog at offset 184320 {SUCCESS} [ pid = 8537 tail uid = 1000 ]
Sep  4 00:16:28 worker3 loggedfs: 826 bytes read from /var/log/syslog at offset 184320 {SUCCESS} [ pid = 8537 tail uid = 1000 ]
Sep  4 00:16:28 worker3 loggedfs: read 4096 bytes from /var/log/syslog at offset 184320 {SUCCESS} [ pid = 8537 tail uid = 1000 ]
Sep  4 00:16:28 worker3 loggedfs: 1083 bytes read from /var/log/syslog at offset 184320 {SUCCESS} [ pid = 8537 tail uid = 1000 ]
Sep  4 00:16:28 worker3 loggedfs: read 4096 bytes from /var/log/syslog at offset 184320 {SUCCESS} [ pid = 8537 tail uid = 1000 ]
~~~

Une fois que c’est syslogé, détection par motif avec sec.

^[1)](incron.html#fnt__1)^ depuis la version 4.5