---
layout: page
---

### Table des matières {.toggle}

-   [Monit](monit.html#monit)
    -   [Installation](monit.html#installation)
    -   [Configuration](monit.html#configuration)
        -   [Intégration avec Nagios en mode
            passif](monit.html#integration-avec-nagios-en-mode-passif)
        -   [Intégration à Nagios en mode
            actif](monit.html#integration-a-nagios-en-mode-actif)

Monit {#monit .sectionedit1}
=====

Dans la série des clients possibles pour la supervision passive sur
Unix, après
[Dstat](../../../../supervision/dstat.html "supervision:dstat") et
[Collectd](../../../../nagios/integration/collectd.html "nagios:integration:collectd"),
voici venir
[Monit](http://www.tildeslash.com/monit/ "http://www.tildeslash.com/monit/").
Celui-ci n’est cependant pas à ranger dans la même catégorie que les
deux précédents. En effet, Monit ne renverra jamais de valeurs de
performance au serveur Nagios.

Monit est un utilitaire qui permet de gérer et monitorer les processus,
les fichiers, les répertoires et les systèmes de fichiers sur sytème
Unix. Monit est capable de déclencher des actions de maintenance
automatique et peut exécuter des procédures en cas d’erreurs. Par
exemple, Monit peut démarrer un processus qui ne l’est pas, redémarrer
un processus crashé ou stopper un processus parce qu’il devient trop
consommateur de CPU. Vous pouvez utiliser Monit pour monitorer les
changements sur les fichiers, les répertoires et les systèmes de
fichiers, comme par exemple les changements de timestamps, de checksums,
de permissions ou de taille.

Monit est contrôlé par un fichier de configuration facile à maintenir
avec une syntaxe orienté token. Monit peut garder trace des évènements
dans syslog ou son propre fichier d’historique et notifier qui vous
voulez par mail personnalisable. Monit peut exécuter différents
contrôles sur le protocole TCP/IP et peut utiliser SSL pour ces
contrôles. Monit fournit une interface htpp(s) et vous pouvez donc
utiliser un simple navigateur pour accéder à la console.

Dans un setup Nagios, il peut être utiliser pour remplacer les
check\_proc, check\_load, check\_files standards en tout genre. C’est
l’outil qui semble être le bon parce qu’il n’utilise pas le réseau pour
poller les processeurs, fichiers et autres services
^[1)](monit.html#fn__1)^ et surtout il permet une finesse de
comportement que n’ont pas les plugins standards. Voyons tout ça par le
menu.

![FIXME](../../../../lib/images/smileys/fixme.gif) A compléter par des
exemples d’envoi de trap snmp vers Nagios.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Olivier JAN

Installation {#installation .sectionedit3}
------------

Monit nécessite quelques librairies et autres joyeusetés pour pouvoir se
compiler facilement sur mon serveur Ubuntu 6.0.6 LTS

~~~
sudo apt-get install flex byacc bison
~~~

Pour être précis, vous pouvez installer soit bison soit byacc ou les
deux.

Le traditionnel configure, make et make install

~~~
wget http://www.tildeslash.com/monit/dist/monit-4.10.1.tar.gz
tar xzfv monit-4.10.1.tar.gz
pushd monit-4.10.1
./configure
make
sudo make install
~~~

l’ensemble est installé dans /usr/local.

Si vous souhaitez comme moi faire fonctionner l’interface web de Monit
sur le port 80 et non sur le port par défaut 2812, il faut configurer
apache en mode proxy html pour ce faire. Je suppose que le port 80 est
déjà occupé par Apache2. Sinon, rien n’empêche de mettre le serveur http
intégré de Monit en écoute sur le port 80. Il faut d’abord installer les
modules pour Apache2.

~~~
sudo apt-get install libapache2-mod-proxy-html
sudo a2enmod proxy 
sudo a2enmod proxy_http
sudo a2enmod proxy_html
sudo a2enmod headers
sudo /etc/init.d/apache2 reload
~~~

Et ajouter un bout de configuration à Apache2. Créer le fichier
monit.conf dans /etc/apache2/conf.d/ avec le contenu suivant :

~~~
#### MONIT (PROXY REVERSE) ########

ProxyHTMLLogVerbose On
LogLevel warn
ProxyHTMLExtended On

ProxyRequests Off
<Proxy *>
Order deny,allow
Allow from all
</Proxy>

ProxyPass /monit/  http://localhost:2812/
ProxyPassReverse /monit/  http://localhost:2812/

<Location /monit/>
SetOutputFilter  proxy-html
ProxyHTMLURLMap  /      /monit/
RequestHeader    unset  Accept-Encoding
</Location>
~~~

La configuration de Monit pour ce serveur devient alors :

~~~
set httpd port 2812 and
     use address localhost
     allow localhost       
     allow admin:monit     
~~~

Il est également possible pour arriver au même résultat d’utiliser le
script php fourni dans les [contributions
Monit](http://www.tildeslash.com/monit/dist/contrib/ "http://www.tildeslash.com/monit/dist/contrib/").

Après l’installation, il faut copier le fichier monitrc dans
/etc/monitrc. Ce fichier de configuration est particulièrement agréable
à éditer avec une syntaxe clair et des blocs faciles à manipuler. Il
faut au minimum rensigner les paramètres suivants.

~~~
# Nous faisons nos contrôles toutes les deux minutes
set daemon  120

# Nous loggons les évènements dans syslog
set logfile syslog facility log_daemon

# Nous définissons l'endroit où stocker les alertes au cas où le serveur de mail n'est pas dispo
set eventqueue
     basedir /var/monit  # set the base directory where events will be stored
     slots 100           # optionaly limit the queue size
~~~

Je n’ai pas renseigné la partie configuration du serveur/message de mail
puisque c’est Nagios qui sera chargé de notifier. Ces possibilités sont
beaucoup plus puissantes dans ce domaine que celles de Monit.

Monit peut être démarré et l’interface web accédé par
<http://localhost/monit/>

Configuration {#configuration .sectionedit4}
-------------

Maintenant que Monit tourne, il est intéressant de le nourrir en règle
de supervision. On commence bien sûr par renseigner correctement le bloc
de l’hôte supervisé.

~~~
  check system monitoring-fr.org
    if loadavg (1min) > 4 then exec "/path/to/binaire/a/executer"
    if loadavg (5min) > 2 then exec "/path/to/binaire/a/executer"
    if memory usage > 75% then exec "/path/to/binaire/a/executer"
    if cpu usage (user) > 70% then exec "/path/to/binaire/a/executer"
    if cpu usage (system) > 30% then exec "/path/to/binaire/a/executer"
    if cpu usage (wait) > 20% then exec "/path/to/binaire/a/executer"
~~~

Les règles sont plutôt simples à comprendre. Nous déclenchons l’action
”/path/to/binaire/a/executer” à chaque fois que le load average est
supérieur à 4 dans la dernière minute, 2 dans les 5 dernières minutes…
Le binaire en question sera soit un appel à send\_nsca soit un envoi de
trap snmp comme nous le verrons plus bas.

En avant pour la supervision des espaces disques. Mon serveur étant
installé avec un système de fichier séparé pour /boot, /tmp, /var, /,
/usr/, /home, je commmence par renseigner cette partie. A noter que seul
/boot et / sont en ext3, le reste en ReiserFS, donc on ne vérifie les
inodes que sur /boot et /

~~~
  check device rootfs with path /dev/mapper/Ubuntu-root
    start program  = "/bin/mount /"
    stop program  = "/bin/umount /"
    if failed uid root then unmonitor
    if failed gid root then unmonitor
    if space usage > 80% for 5 times within 15 cycles then alert
    if space usage > 99% then stop
    if inode usage > 30000 then exec "/path/to/binaire/a/executer"
    if inode usage > 99% then stop
    group server

  check device bootfs with path /dev/sda5
    start program  = "/bin/mount /boot"
    stop program  = "/bin/umount /boot"
    if failed permission 660 then unmonitor
    if failed uid root then unmonitor
    if failed gid disk then unmonitor
    if space usage > 80% for 5 times within 15 cycles then exec "/path/to/binaire/a/executer"
    if space usage > 99% then stop
    if inode usage > 30000 then exec "/path/to/binaire/a/executer"
    if inode usage > 99% then stop
    group server

 check device varfs with path /dev/mapper/Ubuntu-var
    start program  = "/bin/mount /var"
    stop program  = "/bin/umount /var"
    if failed uid root then unmonitor
    if failed gid root then unmonitor
    if space usage > 80% for 5 times within 15 cycles then exec "/path/to/binaire/a/executer"
    if space usage > 99% then stop
    group server

  check device tmpfs with path /dev/mapper/Ubuntu-tmp
    start program  = "/bin/mount /tmp"
    stop program  = "/bin/umount /tmp"
    if failed uid root then unmonitor
    if failed gid root then unmonitor
    if space usage > 80% for 5 times within 15 cycles then exec "/path/to/binaire/a/executer"
    if space usage > 99% then stop
    group server

  check device homefs with path /dev/mapper/Ubuntu-home
    start program  = "/bin/mount /home"
    stop program  = "/bin/umount /home"
    if failed uid root then unmonitor
    if failed gid root then unmonitor
    if space usage > 80% for 5 times within 15 cycles then exec "/path/to/binaire/a/executer"
    if space usage > 99% then stop
    group server

  check device usrfs with path /dev/mapper/Ubuntu-usr
    start program  = "/bin/mount /usr"
    stop program  = "/bin/umount /usr"
    if failed uid root then unmonitor
    if failed gid root then unmonitor
    if space usage > 80% for 5 times within 15 cycles then exec "/path/to/binaire/a/executer"
    if space usage > 99% then stop
    group server

check file apache_bin with path /usr/sbin/apache2
    if failed checksum then unmonitor
    if failed permission 755 then unmonitor
    if failed uid root then exec "/bin/bash -c '/bin/echo LOCALHOST,monit,2,Critical - Apache permissions UID >> /tmp/monit.log'"
    if failed gid root then exec "/bin/bash -c '/bin/echo LOCALHOST,monit,2,Critical - Apache permissions GID >> /tmp/monit.log'" 
    else if recovered then exec "/bin/bash -c '/bin/echo LOCALHOST,MONIT,0,OK - Apache permissions GID >> /tmp/monit.log'"
~~~

### Intégration avec Nagios en mode passif {#integration-avec-nagios-en-mode-passif .sectionedit5}

#### send\_nsca direct

Les deux modes classiques que sont send\_nsca et trapsnmp sont possibles
pour remonter les alertes dans Nagios. Pour utiliser send\_nsca, une
ligne de ce type pour exec fait parfaitement l’affaire.

~~~
then exec "/bin/bash -c '/bin/echo LOCALHOST,MONIT,1,Warning - Apache configuration modified | /usr/local/nagios/libexec/send_nsca -H 127.0.0.1 -d , -c /usr/local/nagios/etc/send_nsca.cfg'"
~~~

Où

-   LOCALHOST est la machine à impacter dans Nagios
-   MONIT est le service de type passif à impacter dans Nagios
-   1 est l’état remonté pour le service donc un WARNING dans ce cas
-   “Warning - Apache configuration modified” est le message qui
    s’affichera dans la colonne Status Information de Nagios

#### send\_nsca via script

Si vous êtes allergiques aux one line bash script comme utilisé dans
l’exemple précédent, vous pouver créer un joli submit\_monit\_result
comme ci-dessous

~~~ {.code .bash}
#!/bin/sh
 
printfcmd="/usr/bin/printf"
 
NscaBin="/usr/local/nagios/libexec/send_nsca"
NscaCfg="/usr/local/nagios/etc/send_nsca.cfg"
NagiosHost="127.0.0.1"
 
# Fire the data off to the NSCA daemon using the send_nsca script
$printfcmd "%s\t%s\t%s\t%s\n" "$1" "$2" "$3" "$4" | $NscaBin $NagiosHost -c $NscaCfg
 
# EOF
~~~

Il suffira d’appeler ce script et de lui passer les paramètres depuis le
fichier de configuration monitrc

~~~
then exec "/usr/local/nagios/libexec/eventhandlers/submit_monit_result HOST SERVICE 1 MESSAGE"
~~~

#### sec parsing via syslog-ng

Il est également possible d’utiliser
[SEC](../../../../nagios/integration/sec.html "nagios:integration:sec")
pour faire le pont entre Monit et Nagios. Cette méthode plus lourde à
mettre en œuvre est aussi plus puissante puisque’elle permet d’ajouter
une couche de corrélation sur les évènements remontés par Monit. Pour
cette méthode, nous utilisons la possibilité de Monit de journaliser
vers syslog en activant l’option adéquate dans monitrc.

~~~
set logfile syslog facility log_daemon
~~~

Voici un début de fichier de configuration monit.conf pour SEC. A chaque
fois est placé en commentaire la chaîne de caractères sur laquelle opère
la détection.

A chaque fois, l’heure est affecté à \$1, le nom de l’hôte
^[2)](monit.html#fn__2)^ en \$2 en \$3 le nom du processus et en \$4 le
numéro de pid.

~~~
# Apr  7 17:12:31 nagios3 monit[2502]: 'syslog-ng' process PID changed to 13324

type=Single
continue=DontCont
ptype=regexp
pattern=.*?((?:(?:[0-1][0-9])|(?:[2][0-3])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\s?(?:am|AM|pm|PM))?)\s+(.*)\s+monit.*?\'(.*)\'\s+process\s+PID\s+changed\s+to\s+([-+]?\d+)
desc=$0
action=shellcmd /bin/echo -e "$2\tMONIT\t1\t$3 process changed to $4\n" | /usr/local/nagios/bin/send_nsca -H 157.150.23.220 -c /usr/local/nagios/etc/send_nsca.cfg

# Apr  7 17:24:32 nagios3 monit[2502]: 'syslog-ng' PID has not changed

type=Single
continue=DontCont
ptype=regexp
pattern=.*?((?:(?:[0-1][0-9])|(?:[2][0-3])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\s?(?:am|AM|pm|PM))?)\s+(.*)\s+monit.*?\'(.*)\'\s+PID\s+has\s+not\s+changed
desc=$0
action=shellcmd /bin/echo -e "$2\tMONIT\t0\t$3 PID has not changed\n" | /usr/local/nagios/bin/send_nsca -H 157.150.23.220 -c /usr/local/nagios/etc/send_nsca.cfg

# Apr  8 09:57:05 nagios3 monit[15155]: Monit started
# Apr  8 09:58:05 nagios3 monit[15155]: Monit has not changed 

type=Pair
ptype=RegExp
pattern=Monit started
desc=$0
action=write - Monit started at %t. Start window of 70 seconds for Monit not to change ...
ptype2=RegExp
pattern2=.*?((?:(?:[0-1][0-9])|(?:[2][0-3])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\s?(?:am|AM|pm|PM))?)\s+(.*)\s+monit.*?Monit\s+has\s+not\s+changed
desc2=$0
action2=shellcmd /bin/echo -e "$2\tMONIT\t0\tMonit has been restarted one time sucessfully\n" | /usr/local/nagios/bin/send_nsca -H 157.150.23.220 -c /usr/local/nagios/etc/send_nsca.cfg
window=70

# Apr  8 10:01:25 nagios3 monit[15155]: unmonitor service 'nrpe' on user request

type=Single
continue=DontCont
ptype=regexp
pattern=.*?((?:(?:[0-1][0-9])|(?:[2][0-3])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\s?(?:am|AM|pm|PM))?)\s+(.*)\s+monit.*?unmonitor.*?\'(.*)\'\s+on\s+user\s+request
desc=$0
action=shellcmd /bin/echo -e "$2\tMONIT\t2\tunmonitor service $3 on user request\n" | /usr/local/nagios/bin/send_nsca -H 157.150.23.220 -c /usr/local/nagios/etc/send_nsca.cfg

# Apr  8 09:59:05 nagios3 monit[15155]: 'nrpe' process is not running

type=Single
continue=DontCont
ptype=regexp
pattern=.*?((?:(?:[0-1][0-9])|(?:[2][0-3])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\s?(?:am|AM|pm|PM))?)\s+(.*)\s+monit.*?\'(.*)\'\s+process\s+is\s+not\s+running
desc=$0
action=shellcmd /bin/echo -e "$2\tMONIT\t2\t$3 process is not running\n" | /usr/local/nagios/bin/send_nsca -H 157.150.23.220 -c /usr/local/nagios/etc/send_nsca.cfg

# Apr  8 10:00:05 nagios3 monit[15155]: 'nrpe' process is running with pid 15357

type=Single
continue=DontCont
ptype=regexp
pattern=.*?((?:(?:[0-1][0-9])|(?:[2][0-3])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\s?(?:am|AM|pm|PM))?)\s+(.*)\s+monit.*?\'(.*)\'\s+process\s+is\s+running\s+with\s+pid\s+([-+]?\d+)
desc=$0
action=shellcmd /bin/echo -e "$2\tMONIT\t0\t$3 process is running with pid $4\n" | /usr/local/nagios/bin/send_nsca -H 157.150.23.220 -c /usr/local/nagios/etc/send_nsca.cfg
~~~

L’ensemble des messages générés par ce fichier est envoyé dans un
service Nagios appelé MONIT. Il est possible d’envoyer chaque message
dans un service différent en employant par exemple la convention
suivante pour le nommage des services : proc\_nomduprocess. Dans ce cas,
remplacer MONIT dans les appels NSCA par proc\_\$3.

### Intégration à Nagios en mode actif {#integration-a-nagios-en-mode-actif .sectionedit6}

Dans certaines conditions, il peut etre impossible de paramétrer MONIT
de tel façon a ce qu’il communique lui même avec Nagios (Cf le mode
passif précédemment vue). Les raisons peuvent être variées :

-   trop de serveurs MONIT à modifier (une centaine de serveurs a
    monitorer dans la demie-heure…)
-   un script est deja présent, il ne faut pas toucher a la
    configuration, l’admin du serveur l’a bien precisé
-   et certainement encore beaucoup d’autres raisons.

Il est alors plus simple de paramétrer Nagios pour qu’il fasse un test
actif, sans “agent” à même le serveur MONIT.

Pour d’autres précision quand à choisir pourquoi faire des tests passif
ou actif concernant, lisez cela :
[Supervision](../../../../supervision/start.html "supervision:start")

Ci-joint, un script trés simple (avec évidement quelques limites)

-   Il n’accepte qu’un seul parametre : le nom ou l’ip de l’host
-   Il ne verifie pas si l’hote repond correctement (oui, il le devrait)
-   Il ne pourra se comporter reellement correctement si le nom d’un
    host commence par ‘Process’
-   L’erreur est humaine, sans cela nous ferions pas de supervision, il
    y a donc encore d’autres bugs

~~~
#!/usr/bin/perl -w

use strict;

my ($host)=@ARGV;
my $status="OK";
my $ret=0;
my $debug=0;

my $in=0;

my $proc_err=0;
my $proc_run=0;
my $proc_cha=0;

my $proc_tot=0;

my $chaine_ret;

open FD,"links -dump http://$host:2812 |" or $status="CRITICAL";
if($status eq "OK") {
    while(<FD>) {
        tr/\t / /s;
        s/^ //g;
        if($in) {
            chomp();
            if(/running/)       { $proc_run++; $proc_tot++; }
            elsif(/changed/)    { $proc_cha++; $proc_tot++; }
            elsif(/\] $/)       { $in=0; } # juste pour dropper une ligne
            elsif(/^$/)         { $in=0; }
            else                { $proc_err++; $proc_tot++; }

            if($debug) { print "$proc_tot $proc_run $proc_cha $proc_err $_ i\n"; }
            }
        elsif(/^Process/) { $in=1; }
            # BUG Si cette chaine fait partie du nom de la machine....
        }
    }

close(FD);

if($proc_err)       { $ret=2; $status="ERROR"; }
elsif($proc_cha)    { $ret=1; $status="WARNING"; }

$chaine_ret="$status - $proc_run running / $proc_cha changed / $proc_err error / $proc_tot total";

print $chaine_ret;
exit($ret);
~~~

^[1)](monit.html#fnt__1)^ il est donc installé sur l’hôte à superviser

^[2)](monit.html#fnt__2)^ nagios3 ici
