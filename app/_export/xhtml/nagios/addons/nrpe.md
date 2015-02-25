---
layout: page
---

### Table des matières {.toggle}

-   [Protocole NRPE](nrpe.html#protocole-nrpe)
    -   [Installation](nrpe.html#installation)
        -   [Côté serveur Nagios](nrpe.html#cote-serveur-nagios)
        -   [Côté système à
            superviser](nrpe.html#cote-systeme-a-superviser)
    -   [Configuration](nrpe.html#configuration)
    -   [Fonctionnement](nrpe.html#fonctionnement)
    -   [Erreurs et cas spéciaux](nrpe.html#erreurs-et-cas-speciaux)

Protocole NRPE {#protocole-nrpe .sectionedit1}
==============

**Un remerciement tout spécialement à Julien Toscano, rédacteur de la
documentation sur laquelle je me suis basé pour rédiger cet article**

NRPE est un agent de supervision qui vous permet de récupérer les
informations à distance. Son principe de fonctionnement est simple : il
suffit d’installer le démon sur la machine distante et de l’interroger
à partir du serveur Nagios.

-   **Principe de fonctionnement**

1.  le plugin installé sur le serveur Nagios initie une connexion sur le
    démon distant
2.  le démon exécute le plugin demandé
3.  le démon retourne au serveur Nagios le code de retour de l’exécution
    du plugin ainsi que la sortie standard.

Le gros avantage de cet agent est qu’il permet de réduire les charges
sur le serveur Nagios. De plus certains greffons sont à exécuter
obligatoirement en local.

Installation {#installation .sectionedit2}
------------

### Côté serveur Nagios {#cote-serveur-nagios .sectionedit3}

Une fois téléchargée, décompressez l’archive récupérée puis lancer la
compilation et l’installation.

~~~
wget http://freefr.dl.sourceforge.net/sourceforge/nagios/nrpe-2.12.tar.gz
tar zxvf nrpe-2.12.tar.gz
cd nrpe-2.12
./configure --prefix=/usr/local/nagios/ --enable-ssl --with-log-facility --enable-command-args --enable-threads=posix --with-trusted-path=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/nagios/bin:/usr/local/nagios/libexec
make
make install
cp sample-config/nrpe.cfg /usr/local/nagios/etc/
~~~

Ensuite ce qui nous intéresse c’est que nrpe soit gérer comme un démon
et qu’il démarre automatique au démarrage de la machine. Voici un
exemple de démon pour nrpe (modèle fourni par le package nrpe d’Ubuntu).

~~~
#!/bin/bash
### BEGIN INIT INFO
# Provides:             nrpe
# Required-Start:       $remote_fs $syslog nagios
# Required-Stop:        $remote_fs $syslog nagios
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description:    Start nrpe daemon at boot time
# Description:          Contributed by Andrew Ryder 06-22-02
#                       Slight mods by Ethan Galstad 07-09-02
#                       LSB compliance by david GUENAULT 15-03-09
### END INIT INFO

prefix=/opt/nagios
NrpeBin=$prefix/bin/nrpe
NrpeCfg=$prefix/etc/nrpe.cfg

test -f $NrpeBin || exit 0

case "$1" in
start)  echo -n "Starting nagios remote plugin daemon: nrpe"
        start-stop-daemon --start --quiet --exec $NrpeBin -- -c $NrpeCfg -d -n
        echo "."
        ;;
stop)   echo -n "Stopping nagios remote plugin daemon: nrpe"
        start-stop-daemon --stop --quiet --exec $NrpeBin
        echo "."
        ;;
restart) echo -n "Restarting nagios remote plugin daemon: nrpe"
        start-stop-daemon --stop --quiet --exec $NrpeBin
        start-stop-daemon --start --quiet --exec $NrpeBin -- -c $NrpeCfg -d -n
        echo "."
        ;;
reload|force-reload) echo -n "Reloading configuration files for nagios remote plugin daemon: nrpe"
        # nrpe reloads automatically
        echo "."
        ;;
*)      echo "Usage: /etc/init.d/nrpe start|stop|restart|reload|force-reload"
        exit 1
        ;;
esac
exit 0
~~~

~~~
cp nrpe /etc/init.d/nrpe
chmod +x /etc/init.d/nrpe
update-rc.d nrpe defaults
/etc/init.d/nagios stop
/etc/init.d/nagios start
~~~

### Côté système à superviser {#cote-systeme-a-superviser .sectionedit4}

-   **Pré-requis**

Vous devez avoir installé au préalable les plugins Nagios sur le système
à superviser. NRPE n’est en effet qu’un démon de transport sans plugin.

Pour NRPE, c’est la même procédure que pour le serveur :

Une fois téléchargée, décompressez l’archive récupérée puis lancer la
compilation et l’installation.

~~~
wget http://freefr.dl.sourceforge.net/sourceforge/nagios/nrpe-2.12.tar.gz
tar zxvf nrpe-2.12.tar.gz
cd nrpe-2.12
./configure --prefix=/usr/local/nagios/ --enable-ssl --with-log-facility --enable-command-args --enable-threads=posix --with-trusted-path=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/nagios/bin:/usr/local/nagios/libexec
make
make install
cp sample-config/nrpe.cfg /usr/local/nagios/etc/
~~~

Ensuite il faut que NRPE soit démarré comme démon au démarrage de la
machine. Voici un exemple de fichier de démarrage pour nrpe (modèle
fourni par le package nrpe d’Ubuntu).

~~~
#!/bin/bash
### BEGIN INIT INFO
# Provides:             nrpe
# Required-Start:       $remote_fs $syslog nagios
# Required-Stop:        $remote_fs $syslog nagios
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description:    Start nrpe daemon at boot time
# Description:          Contributed by Andrew Ryder 06-22-02
#                       Slight mods by Ethan Galstad 07-09-02
#                       LSB compliance by david GUENAULT 15-03-09
### END INIT INFO

prefix=/opt/nagios
NrpeBin=$prefix/bin/nrpe
NrpeCfg=$prefix/etc/nrpe.cfg

test -f $NrpeBin || exit 0

case "$1" in
start)  echo -n "Starting nagios remote plugin daemon: nrpe"
        start-stop-daemon --start --quiet --exec $NrpeBin -- -c $NrpeCfg -d -n
        echo "."
        ;;
stop)   echo -n "Stopping nagios remote plugin daemon: nrpe"
        start-stop-daemon --stop --quiet --exec $NrpeBin
        echo "."
        ;;
restart) echo -n "Restarting nagios remote plugin daemon: nrpe"
        start-stop-daemon --stop --quiet --exec $NrpeBin
        start-stop-daemon --start --quiet --exec $NrpeBin -- -c $NrpeCfg -d -n
        echo "."
        ;;
reload|force-reload) echo -n "Reloading configuration files for nagios remote plugin daemon: nrpe"
        # nrpe reloads automatically
        echo "."
        ;;
*)      echo "Usage: /etc/init.d/nrpe start|stop|restart|reload|force-reload"
        exit 1
        ;;
esac
exit 0
~~~

~~~
cp nrpe /etc/init.d/nrpe
chmod +x /etc/init.d/nrpe
update-rc.d nrpe defaults
~~~

-   **Création de l’utilisateur Nagios**

~~~
groupadd -g 9000 nagios
groupadd -g 9001 nagcmd
useradd -u 9000 -g nagios -G nagcmd -d /usr/local/nagios -c "Nagios Admin" nagios
adduser www-data nagcmd
~~~

Configuration {#configuration .sectionedit5}
-------------

Quelques explications sur la configuration du nrpe.cfg :

~~~
# Adresse IP de votre machine
server_address=xx.xx.xx.xx

# Adresse autorisant NRPE (yy.yy.yy.yy --> IP du serveur Nagios)
allowed_hosts=127.0.0.1,yy.yy.yy.yy

# Autorisation du passage d'argument durant les checks dans NRPE
dont_blame_nrpe=1
~~~

Une fois ces modifications faite, pensez à bien redémarrer nrpe des 2
côtés.

Fonctionnement {#fonctionnement .sectionedit6}
--------------

-   **Côté machine à superviser**

Par exemple, on définit une commande dans le fichier de configuration
de NRPE (nrpe.cfg) sur la machine à superviser (ce n’est qu’une ligne).

~~~
command[check_monhome]=/usr/local/nagios/libexec/check_disk -w 20 -c 10 -p /home
~~~

*Explication de cette ligne :*

**command[check\_monhome] –\>** check\_monhome désignera un alias qui
permet de reconnaitre et d’écourter côté serveur nagios la commande
concernée.

**/usr/local/nagios/libexec/check\_disk –\>** Plugin nagios se trouvant
sur la machine à superviser

**-w 20 -c 10 -p /home –\>** Argument du plugin (généralement -w seuil
de Warning / -c seuil de Critique)

-   **Côté serveur Nagios**

Sur le serveur Nagios, il faut définir une commande pour utiliser le
greffon check\_nrpe.

Dans commands.cfg :

~~~
# nrpe avec ssl
define command{
       command_name       check_nrpe
       command_line       $USER1$/check_nrpe -H $HOSTADDRESS$ -c $ARG1$
}
# nrpe sans ssl
define command{
        command_name check_nrpe_no_ssl
        command_line $USER1$/check_nrpe -H $HOSTADDRESS$ -n -c $ARG1$
}
~~~

Il ne reste plus qu’à définir le service correspondant.

~~~
define service{
       use                          generic-service
       host_name                    Server2
       service_description          Espace FileSystem /home
       check_command                check_nrpe!check_monhome
       contact_groups               AdminNagiosGroup
}
~~~

Pour la variable check\_command, nous retrouvons :

check\_command check\_nrpe!**check\_monhome**

check\_monhome est l’alias déclaré sur la machine à superviser.

Erreurs et cas spéciaux {#erreurs-et-cas-speciaux .sectionedit7}
-----------------------

Ayant été confronté à des erreurs provenant de l’utilisation de nrpe
dans des architectures réseau spécifiques, je propose cette section
d’erreurs.

##### Préambule {#preambule}

Si le problème ne trouve pas sa solution ici, c’est peut être qu’il
n’est pas si spécifique que ça. Dans ce cas, une recherche sur votre
moteur de recherche préféré peut être utile. (Dans le fichier
[NRPE.pdf](http://nagios.sourceforge.net/docs/nrpe/NRPE.pdf "http://nagios.sourceforge.net/docs/nrpe/NRPE.pdf")
vers la fin, il y a quelques aides). Si vous ne trouvez rien, le forum
pourra peut être vous aider, et vous pourrez ajouter une solution ici.

##### Problèmes {#problemes}

-   CHECK\_NRPE: Error - Could not complete SSL handshake.

Ce problème est bien connu sur les différents forums. La solution *en
général* est simple : vérifier les droits du fichier de conf, que le
serveur effectuant le test est bien autorisé à discuter avec le daemon
nrpe (dans nrpe.cfg ou dans xinetd.d/nrpe suivant le mode de lancement
du daemon), ouvrir le port 5666, etc…

Dans mon cas, c’était simple aussi, encore faut-il savoir. Mes machines
supervisées sont des [machines
virtuelles](http://fr.wikipedia.org/wiki/Virtualisation "http://fr.wikipedia.org/wiki/Virtualisation").
Elles tournent sur un serveur kvm, dans une salle blanche.

Le serveur physique est connecté sur internet et a une ip publique
toussa toussa. Les machines virtuelles sont dans un (plusieurs)
réseau(x) NAT.

Pour certaines raisons, j’ai configuré l’iptables de la machine hôte
pour gérer le NAT assez spécifiquement. Sans faire plus de détail, au
niveau de la passerelle NAT, l’IP de source de la requête nrpe est
transformée de nagiosIP en passerelleIP. Il ne faut donc plus accepter
les requêtes depuis nagiosIP mais bien depuis passerelleIP.

Voilà, c’est effectivement un problème très très spécifique, mais on ne
sait jamais, si quelqu’un se trouve dans une situation similaire (avec
ou sans virtualisation), il aura peut être moins à fouiller pendant 4h
(oui, j’y ai passé 4h… Et j’ai trouvé la solution tout seul au final).

-   L’affichage du retour du plugin est “tronqué”

Par défaut nrpe ne remonte que les 1024 premiers caractères de la sortie
(output) d’un plugin. En général, c’est suffisant mais si votre plugin
remonte plus d’informations avec les données de performance, cela peut
ne pas suffire. Pour augmenter cette limite, il va falloir
malheureusement recompilé nrpe en changeant un paramètre dans un fichier
“include”.

Rendez-vous dans le fichier “common.h” qui se trouve dans le répertoire
“include” dans les sources de nrpe. Modifiez la ligne suivante:

~~~
 
#define MAX_PACKETBUFFER_LENGTH 1024            /* max amount of data we'll send in one query/response */
~~~

Il suffit ensuite de mettre la valeur souhaitée, 2048, 3072…
