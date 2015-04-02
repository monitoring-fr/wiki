---
layout: page
title: Commandes de remontée de contrôle
---

En environnement distribué, Nagios remonte systématiquement le résultat
des contrôles de services et d’hôtes ^[1)](ocsp-ochp.html#fn__1)^ du
serveur réparti vers le serveur central en utilisant les commandes
obsessive compulsive service processor ^[2)](ocsp-ochp.html#fn__2)^ et
obsessive compulsive host processor ^[3)](ocsp-ochp.html#fn__3)^. Comme
les exemples fournis dans la doc pour ces commandes sont un peu datés,
voici les définitions de commandes et le script submit\_check\_result
que j’utilise dans ces cas là.

Dans les deux définitions de commandes suivantes, la macro \$USER2\$ est
renseigné dans le fichier de configuration resource.cfg avec la valeur
/usr/local/nagios/libexec/eventhandlers dans mon cas.

Méthode classique {#methode-classique .sectionedit2}
-----------------

C’est la méthode documenté dans la doc officielle Nagios.

### OCSP {#ocsp .sectionedit3}

~~~
# 'submit_service_check_result' command definition
define command{
        command_name    submit_service_check_result
        command_line    $USER2$/submit_check_result $HOSTNAME$ "$SERVICEDESC$" $SERVICESTATEID$ "$SERVICEOUTPUT$ | $SERVICEPERFDATA$"
        }
~~~

![:!:](../lib/images/smileys/icon_exclaim.gif) Noter le symbole du pipe
et la macro \$SERVICEPERFDATA\$ située après qui remonte vers le central
les données de performance. Peut être bien évidement omis si vous ne
souhaitez pas faire de traitement des données de performance.

### OCHP {#ochp .sectionedit4}

~~~
# 'submit_host_check_result' command definition
define command{
        command_name    submit_host_check_result
        command_line    $USER2$/submit_check_result $HOSTNAME$ $HOSTSTATEID$ "$HOSTOUTPUT$"
        }
~~~

### submit\_check\_result {#submit_check_result .sectionedit5}

Pour finir, ces deux définitions de commande passent l’ensemble de leurs
arguments au script submit\_check\_result suivant qui est une adaptation
du script original fourni dans le répertorie contrib des sources de
Nagios.

~~~
printfcmd="/usr/bin/printf"

NscaBin="/usr/local/nagios/libexec/send_nsca"
NscaCfg="/usr/local/nagios/etc/send_nsca.cfg"
NagiosHost="192.168.1.1"

# Fire the data off to the NSCA daemon using the send_nsca script
$printfcmd "%s\t%s\t%s\t%s\n" "$1" "$2" "$3" "$4" | $NscaBin -H $NagiosHost -c $NscaCfg
~~~

N’hésitez pas à adapter ces définitions et script à votre environnement
et à [me faire part des
améliorations](http://www.monitoring-fr.org/about/contact "http://www.monitoring-fr.org/about/contact")
en résultant.

### submit\_check\_result amélioré {#submit_check_result-ameliore .sectionedit6}

Le submit\_check\_result est habituellement le goulet d’étranglement
d’une solution distribuée en faisant grimper très haut la latence. Pour
revenir à des valeurs de latence raisonnables, il faut alors soit
utiliser un addon type OCP\_daemon ou modifier le script ci-dessus de la
façon suivante:

~~~
printfcmd="/usr/bin/printf"

NscaBin="/usr/local/nagios/libexec/send_nsca"
NscaCfg="/usr/local/nagios/etc/send_nsca.cfg"
NagiosHost="192.168.1.1"

# Fire the data off to the NSCA daemon using the send_nsca script
$printfcmd "%s\t%s\t%s\t%s\n" "$1" "$2" "$3" "$4" | $NscaBin -H $NagiosHost -c $NscaCfg > /dev/null &
~~~

La petite astuce, tirée de la liste de diffusion consiste simplement à
envoyer la commande en arrière-plan pour ne pas avoir à attendre la fin
d’exécution de celle-ci. D’après l’auteur de cette astuce
^[4)](ocsp-ochp.html#fn__4)^, les temps d’exécution de cette commande
passent de 0.7 seconde à 0.02 secondes; ce qui fait toute la différence
au final.

PNSCA, OCP\_daemon et OSCP Sweeper {#pnsca-ocp_daemon-et-oscp-sweeper .sectionedit7}
----------------------------------

Sur de très gros environnement de supervision comme celui que je gère en
ce moment ^[5)](ocsp-ochp.html#fn__5)^, les commandes ocsp et ochp
constitue un goulet d’étranglement qui amène une latence importante sur
les collecteurs ^[6)](ocsp-ochp.html#fn__6)^. Pour remédier à ce
problème, il existe plusieurs solutions comme
[OCP\_daemon](http://wiki.nagios.org/index.php/OCP_Daemon "http://wiki.nagios.org/index.php/OCP_Daemon")
ou pnsca. Il existe aussi [OCSP
Sweeper](http://www.nagiosexchange.org/cgi-bin/page.cgi?g=Detailed%2F1639.html;d=1 "http://www.nagiosexchange.org/cgi-bin/page.cgi?g=Detailed%2F1639.html;d=1")
qui a l’inconvénient de ne pas travailler en temps réel, ce qui est un
handicap quand vous souhaitez récupérer les données de performance sur
le serveur central. OCP\_daemon est un démon écrit en Perl alors que
pnsca est un module de courtage d’évènements (event broker module) pour
Nagios. Que ce soit avec pnsca ou OCP\_daemon, la latence redevient à un
niveau normal (moins de 1 seconde) dès que l’un des deux est installé.
En attendant que pnsca devienne un produit mature, c’est OCP\_daemon qui
semble la meilleure option pour le moment et c’est son installation que
nous allons voir maintenant.

### OCP\_daemon {#ocp_daemon .sectionedit8}

Vous pouvez trouver des instructions détaillées en anglais pour
[l'installation de OCP\_daemon sur le portail de la communauté
Nagios](http://www.nagioscommunity.org/wiki/index.php/OCP_Daemon "http://www.nagioscommunity.org/wiki/index.php/OCP_Daemon").
Il faut noter que OCP\_daemon utilise le circuit habituellement réservé
au traitement des performances sur le collecteur et qu’il ne peut donc
plus servir à cela. Ce n’est pas forcément un problème puisque ces
données peuvent quand même être remontées au central pour être stockées,
graphées sur celui-ci.

Voici un condensé de l’installation pour Debian et dérivés.
L’installation commence par les librairies et modules Perl nécessaires
au bon fonctionnement de OCP\_daemon.

~~~ {.code .bash}
sudo apt-get install libevent1 libevent-dev
wget http://search.cpan.org/CPAN/authors/id/V/VP/VPARSEVAL/Event-Lib-1.03.tar.gz
tar xzf Event-Lib-1.03.tar.gz
cd Event-Lib-1.03
perl Makefile.PL
make
sudo make install
~~~

Ensuite, il convient de préparer les deux fichiers pipe nécessaires au
traitement des hôtes et services.

~~~ {.code .bash}
sudo mkdir /usr/local/nagios/var/ocp
sudo mkfifo /usr/local/nagios/var/ocp/host-perfdata.fifo
sudo mkfifo /usr/local/nagios/var/ocp/service-perfdata.fifo
sudo chown -R nagios:nagcmd /usr/local/nagios/var/ocp
~~~

Il ne reste plus qu’à démarrer le démon en lui passant tous les
arguments nécessaires comme ci-dessous.

~~~
/usr/local/nagios/bin/OCP_daemon -f /usr/local/nagios/var/ocp/host-perfdata.fifo,/usr/local/nagios/var/ocp/service-perfdata.fifo -n /usr/local/nagios/libexec/send_nsca -H 10.176.3.45 -c /usr/local/nagios/etc/send_nsca.cfg -r 1
~~~

Il reste à configurer Nagios pour le faire utiliser ce nouveau circuit
de commandes de remontée de contrôle. Cela se passe au niveau du fichier
nagios.cfg.

~~~
process_performance_data=1

#performance data for ocp commands

# Files to which Nagios will write data. In this setup
# they will be named pipes.
host_perfdata_file=/usr/local/nagios/var/ocp/host-perfdata.fifo
service_perfdata_file=/usr/local/nagios/var/ocp/service-perfdata.fifo

# This is exactly what will be sent to send_NSCA. Do not change it.
host_perfdata_file_template=$HOSTNAME$\t$HOSTSTATEID$\t$HOSTOUTPUT$|$HOSTPERFDATA$
service_perfdata_file_template=$HOSTNAME$\t$SERVICEDESC$\t$SERVICESTATEID$\t$SERVICEOUTPUT$|$SERVICEPERFDATA$

# The write mode should be w, although append should have no effect on a named pipe.
host_perfdata_file_mode=w
service_perfdata_file_mode=w

# We don't want to process any command, so set this to 0
host_perfdata_file_processing_interval=0
service_perfdata_file_processing_interval=0
~~~

N’oubliez pas d’activer le traitement des performances au niveau des
définitions d’hôtes et de services et le tour est joué. Bye bye latence
![;-)](../lib/images/smileys/icon_wink.gif)

^[1)](ocsp-ochp.html#fnt__1)^ depuis la version 3

^[2)](ocsp-ochp.html#fnt__2)^ ocsp

^[3)](ocsp-ochp.html#fnt__3)^ ochp

^[4)](ocsp-ochp.html#fnt__4)^ beegie\_b

^[5)](ocsp-ochp.html#fnt__5)^ 1600 hôtes pour 25 000 services par
collecteur

^[6)](ocsp-ochp.html#fnt__6)^ j’ai observé jusquà 8000 secondes de
latence