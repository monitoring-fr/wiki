---
layout: page
title: Collectd
---

[![](..//assets/media/integration/logo.full200.png)](..//_detail/integration/logo.full200.png@id=nagios%253Aintegration%253Acollectd.html "integration:logo.full200.png")

[Collectd](http://collectd.org/ "http://collectd.org/") est un démon qui
collecte à intervalles réguliers des statistiques sur les performances
d’un système et qui offre les mécanismes pour stocker les valeurs
récupérées de plusieurs façons, comme par exemple des fichiers RRD.

A mon sens, la grande force de Collectd est qu’il permet d’effectuer du
polling de performance à intervalles très court
^[1)](collectd.html#fn__1)^ tout en restant très léger sur la jauge cpu
de la machine sur laquelle il est installé. Les fichiers RRD générés
peuvent être facilement centralisés grâce à un mécanisme client-serveur
configurable. C’est le client qui pousse les données au serveur.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- -------------
  **Rédacteur**   Olivier JAN

Installation {#installation .sectionedit3}
------------

Je documenterais de façon plus exhaustive les librairies nécessaires à
la compilation de Collectd plus tard car elles peuvent être très
nombreuses en fonction des plugins que l’on souhaite activer.

### Ubuntu 6.0.6 {#ubuntu-606 .sectionedit4}

Une fois les librairies installées à coup de apt-get, il ne reste plus
qu’à compiler.

Installation des librairies nécessaires

~~~
sudo apt-get install libvirt-dev libxml2-dev libcurl3-dev iproute-dev libsnmp-dev libpcap0.8-dev libmysqlclient15-dev  apache2-threaded-dev iptables-dev rrdtool librrd2-dev libpcre3-dev libdbi0-dev libesmtp-dev
~~~

### Ubuntu 8.0.4 {#ubuntu-804 .sectionedit5}

~~~ {.code .bash}
sudo apt-get install gawk build-essential libcurl4-gnutls-dev rrdtool libvirt-dev libxml2-dev iproute-dev \
libsnmp-dev libpcap0.8-dev libmysqlclient15-dev  apache2-threaded-dev iptables-dev rrdtool librrd2-dev libpcre3-dev \
libdbi0-dev libesmtp-dev libperl-dev linux-headers-`uname -r` byacc flex bison liboping-dev
~~~

Il y a comme souvent quelques librairies qu’il faut aider à trouver.

~~~ {.code .bash}
sudo ln -s /usr/src/linux-headers-2.6.24-23/include/net/ip_vs.h /usr/include/
~~~

Cela vous donne la configuration comme décrite dans [ce
fichier](..//assets/media/integration/collectd-configuration.txt.zip "integration:collectd-configuration.txt.zip")
^[2)](collectd.html#fn__2)^

### Commun Ubuntu {#commun-ubuntu .sectionedit6}

Compilation

~~~
./configure
make 
sudo make install
~~~

L’ensemble est installé dans /opt/collectd

Il est également possible et recommandé d’installer le cgi
collection.cgi qui permet de visualiser les graphes produits par
Collectd. Ce programme ne remplace pas un frontend RRDtool plus complet
comme Drraw, Cricket ou Cacti mais est beaucoup plus rapide à mettre en
oeuvre comme décrit ci-dessous.

Deux petite librairies à installer pour que le front-end fourni
fonctionne correctement.

~~~ {.code .bash}
sudo apt-get install libhtml-parser-perl librrds-perl
~~~

Une fois placé dans le répertoire du source de Collectd, il suffit
d’exécuter

~~~
sudo cp contrib/collection.cgi /usr/lib/cgi-bin
sudo cp contrib/collection.conf /etc/
~~~

Il faut ensuite créer le fichier de configuration pour collection.cgi

~~~
sudo nano /etc/collection.conf
~~~

Ce fichier contient les répertoires de données à examiner pour grapher

~~~
datadir: "/opt/collectd/var/lib/collectd/rrd/"
libdir: "/opt/collectd/var/lib/collectd/"
~~~

Ci-dessous un exemple de graphe généré par collection.cgi qui permet de
se rendre compte du niveau de détail qu’il est possible d’avoir avec
Collectd. Le graphique est en effet un graphique sur une heure avec
prise de mesure toutes les 10 secondes. Essayez donc de faire ça en
polling actif depuis Nagios sans manger toute la bande passante du
réseau. ![LOL](../../lib/images/smileys/icon_lol.gif)

[![](..//assets/media/collectd-load.png)](..//_detail/collectd-load.png@id=nagios%253Aintegration%253Acollectd.html "collectd-load.png")

Depuis la version 4.3 de collectd, il est possible de lancer collectd
sous la protection de son watchdog particulier comme suit :

~~~
sudo /opt/collectd/sbin/collectdmon -c /opt/collectd/sbin/collectd
~~~

Interfaces alternatives pour les graphes {#interfaces-alternatives-pour-les-graphes .sectionedit7}
----------------------------------------

Vu les limitations de collection.cgi fourni en standard par Collectd
pour la visualisation des graphes, il vaut mieux se tourner vers
[drraw](http://web.taranis.org/drraw/ "http://web.taranis.org/drraw/")
ou [Cacti](../../cacti/start.html "cacti:start") si l’on souhaite plus
de souplesse pour visualiser les graphes obtenus. Vu que Cacti est
traité comme un cas à part, on va parler de drraw pour le moment. Le
côté simple et léger de la chose va bien avec collectd. Et puis, c’est
juste un cgi à installer. Alors après avoir téléchargé les sources et se
rendre dans le répertoire ainsi obtenu, il suffit de faire les actions
suivantes.

~~~
sudo  cp drraw.c* /usr/local/nagios/sbin/
sudo chmod 755 /usr/local/nagios/sbin/drraw.cgi
~~~

Le minimum vital dans le fichier de configuration drraw.conf pour
commencer. Je créé d’abord les répertoires de travail de drraw dans
/usr/local/.

~~~
sudo mkdir -p /usr/local/drraw/tmp
sudo mkdir -p /usr/local/drraw/saved
sudo chown -R www-data:www-data /usr/local/drraw/
~~~

La configuration qui en résulte

~~~
%datadirs = ('/usr/local/nagios/var/rrd'  => '[Collectd] ',
            );
$saved_dir = '/usr/local/drraw/saved';
$tmp_dir = '/usr/local/drraw/tmp';
~~~

Rendez-vous sur
[http://mon.nagios.com/nagios/cg-bin/drraw.cgi](http://mon.nagios.com/nagios/cg-bin/drraw.cgi "http://mon.nagios.com/nagios/cg-bin/drraw.cgi")
et tout devrait être fonctionnel.

Intégration avec Nagios {#integration-avec-nagios .sectionedit8}
-----------------------

Collectd est fourni avec un plug-in pour Nagios situé dans
/opt/collectd/bin/collectd-nagios. Il permet d’interroger les données
récoltées par le démon et stocké dans des fichiers RRD. Sans l’avoir
testé pour le moment, on peut dire que ce plugin pourrait tout à fait
être un plugin générique d’interrogation de fichiers RRD pour Nagios.

### Utilisation & configuration de collectd-nagios {#utilisation-configuration-de-collectd-nagios .sectionedit9}

~~~
./collectd-nagios -s /opt/collectd/var/run/collectd-unixsock -n  load/load -H localhost -d midterm -w 1 -c 5 -g none
~~~

Cette commande me renvoie

~~~
0 critical, 0 warning, 1 okay | midterm=0.000000;;;;
~~~

-   L’option -s permet de définir le chemin du socket unix créé par
    collectd après activation du plugin correspondant.
-   L’option -n permet de définir le fichier rrd à examiner; ici le load
    de la machine.
-   L’option -H héritée de Nagios permet de définir l’hôte à interroger.
-   L’option -d permet de préciser le datasource à interroger.
-   L’option -g est une option de consolidation pouvant recevoir none,
    average et sum comme valeur.
-   Les options -w et -c sont les seuils habituels de WARNING et
    CRITICAL pour Nagios.

On peut constater que le plugin renvoie bien les valeurs de performance
pour Nagios ^[3)](collectd.html#fn__3)^ et il reste à noter que l’on
peut interroger plusieurs datasources simultanément.

Définition de la commande pour Nagios

~~~
# 'check_collectd' command definition
define command{
        command_name    check_collectd
        command_line    /opt/collectd/bin/collectd-nagios -s /opt/collectd/var/run/collectd-unixsock -n $ARG1$ -H $HOSTNAME$ -d $ARG2$ -w $ARG3$ -c $ARG$4 -g $ARG5$
        }
~~~

Et pour finir la définition de service

~~~
define service{
        use                             local-service         ; Name of service template to use
        host_name                       localhost
        service_description             Collectd Load
        check_command                   check_collectd!processes-nagios/ps_count!processes!1!2!average
        }
~~~

Ce service va chercher le nombre de processes tournant sur la machine
avec le nom nagios.

~~La limitation de la configuration que je viens de décrire pour Nagios
réside dans le passage de la macro \$HOSTADDRESS\$ qui correspond
souvent à une adresse ip. Il faut donc modifier le fichier de
configuration de Collectd pour spécifier cette adresse comme nom d’hôte
ou utiliser des FQDN dans les fichiers de configuration des hôtes
Nagios.~~

Il suffit d’utiliser la variable \$HOSTNAME\$ à la place de
\$HOSTADDRESS\$

Je pense continuer à expérimenter autour de collectd, cett brique me
semblant avoir un bon potentiel combiné à Nagios pour les performances
et le capacity planning.

\# ‘check\_rrd’ command definition define command{

~~~
      command_name    check_rrd
      command_line    $USER1$/check_rrd -F $USER4$/$HOSTNAME$/$ARG1$ -D $ARG2$ -w $ARG3$ -c $ARG4$ $ARG5$
~~~

\# command\_line /usr/bin/perl \$USER1\$/check\_rrd.pl \$ARG1

~~~
      }
~~~

### Utilisation & configuration avec check\_rrd {#utilisation-configuration-avec-check_rrd .sectionedit10}

[check\_rrd](../../plugins/check_rrd.html "nagios:plugins:check_rrd")
est un plugin en Perl d’interrogation générique de bases RRD que j’ai
écrit et qui utilise les modules CPAN Nagios::Plugin et RRD::Query.

Par exemple , pour interroger le nombre de de scoreboard Apache ouverts,
il faut écrire

~~~
./check_rrd -F /opt/collectd/var/lib/collectd/rrd/nagios3/apache/apache_scoreboard-open.rrd -D count -l "Apache2 Scoreboards open" -u Processes
~~~

qui renvoie

~~~
RRD OK - Apache2 Scoreboards open: 246 Processes
~~~

ce qui se traduit par la commande Nagios suivante

~~~
# 'check_rrd' command definition
define command{
        command_name    check_rrd
        command_line    $USER1$/check_rrd -F $USER4$/$HOSTNAME$/$ARG1$ -D $ARG2$ $ARG3$
        }
~~~

Je n’ai spécialisé dans cette commande que les deux arguments
obligatoires. A \$USER4\$ correspond
/opt/collectd/var/lib/collectd/rrd/nagios3/ dans le fichier
resource.cfg. Le reste est passé tel quel en troisième argument. Ce qui
nous donne la définition de service suivante

~~~
define service{
        use                             actif-generic
        hostgroup_name                  LINUX
        service_description             HTTP_BOARDS_OPEN
        check_command                   check_rrd!apache/apache_scoreboard-open.rrd!count! -w 300 -c 350 -l "Apache2 Scoreboard Open" -u "Processes"
        servicegroups                   +RRD,HTTP
        }
~~~

Configuration collectd {#configuration-collectd .sectionedit11}
----------------------

Quelques blocs intéressants pour superviser un serveur Nagios avec
Collectd. Le bloc plugin processes regarde par exemple l’ensemble des
processus à surveiller sur un serveur Nagios complet.

~~~
<Plugin processes>
        Process "nagios"
        Process "snmpd"
        Process "snmptrapd"
        Process "syslog-ng"
        Process "nsca"
        Process "nrpe"
        Process "ndo2db"
        Process "apache2"
        Process "mysqld"
</Plugin>

<Plugin rrdtool>
        DataDir "/usr/local/nagios/var/rrd/collectd"
        CacheTimeout 120
        CacheFlush   900
</Plugin>

<Plugin network>
        Listen "192.168.1.1" "25826"
        TimeToLive "128"
        Forward false
        CacheFlush 1800
</Plugin>
~~~

Si status activé dans apache2.conf comme suit

~~~
ExtendedStatus On

<Location /server-status>
    SetHandler server-status
    Order deny,allow
    Deny from all
    Allow from localhost
</Location>

# Allow remote server configuration reports, with the URL of
#  http://servername/server-info (requires that mod_info.c be loaded).
# Change the ".your_domain.com" to match your domain to enable.
#
<Location /server-info>
    SetHandler server-info
    Order deny,allow
    Deny from all
    Allow from localhost
</Location>
~~~

activer le bloc suivant dans collectd

~~~
<Plugin apache>
        URL "http://localhost/server-status?auto"
#       User "www-user"
#       Password "secret"
#       CACert "/etc/ssl/ca.crt"
</Plugin>
~~~

Si vous souhaitez utiliser le plugin Nagios fourni avec collectd,
activer le bloc ci-dessous

~~~
<Plugin unixsock>
        SocketFile "/usr/local/nagios/var/run/collectd-unixsock"
        SocketGroup "nagcmd"
        SocketPerms "0660"
</Plugin>
~~~

^[1)](collectd.html#fnt__1)^ toutes les de 5 secondes si votre machine
le supporte

^[2)](collectd.html#fnt__2)^ trop gros pour être coller tel que

^[3)](collectd.html#fnt__3)^ après le symbole du pipe