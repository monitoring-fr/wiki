---
layout: page
title: Installation de Zabbix sur Ubuntu
---

Tutoriel rédigé pour une version Ubuntu 8.04/10.04 LTS et Zabbix 1.8.x
(ou 1.4.2).

Dans ce tutoriel, l’installation de Zabbix sur la distribution Linux
Ubuntu est divisée en deux parties. La première partie, à savoir
l’**Installation depuis les dépôts** correspond à la mise en place de
Zabbix simplement par l’installation de paquets, elle est donc plus
simple, et plus rapide, mais ne correspond pas forcément à la dernière
version de Zabbix, c’est pourquoi elle est plutôt conseillée pour les
débutants … ou les plus pressés. Quant à la deuxième partie
**Installation depuis les sources**, elle recommande une certaine
maîtrise de l’utilisation du système Ubuntu, mais permet notamment de
personnaliser l’installation de Zabbix selon ses préférences/besoins, et
surtout de disposer de la version la plus récente de Zabbix.

Ceci dit, il est tout à fait envisageable de combiner les deux types
d’installation. En effet, il est par exemple intéressant d’installer le
serveur Zabbix en suivant la procédure **Installation depuis les
sources**, et ensuite pour plus de simplicité ou de rapidité, d’utiliser
**Installation depuis les dépôts**, pour l’installation des agents sur
les hôtes (sous Linux) à superviser, ce qui peut être très utile lorsque
l’on dispose d’un nombre assez conséquent d’hôtes à surveiller.

Ce tutoriel a été réalisé par :

  **Rôle**              **Nom**
  --------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Rédacteur(s)**      [Ludovic VALENTIN](http://www.monitoring-fr.org/community/members/ludovic-valentin/ "http://www.monitoring-fr.org/community/members/ludovic-valentin/")
  **Contributeur(s)**   [Romuald FRONTEAU](http://www.monitoring-fr.org/community/members/romuald-fronteau/ "http://www.monitoring-fr.org/community/members/romuald-fronteau/")

Installation depuis les dépôts {#installation-depuis-les-depots .sectionedit3}
------------------------------

Tutoriel rédigé pour une version Ubuntu 8.04 LTS et Zabbix 1.4.2.

### Pré-requis {#pre-requis .sectionedit4}

Installation des paquets communs requis à la mise en place d’un
composant Zabbix :

~~~
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install ssh wget man vim build-essential checkinstall
~~~

#### Création d’un utilisateur zabbix {#creation-d-un-utilisateur-zabbix}

L’utilisateur zabbix sert à exécuter les composants Zabbix (démons),
sans avoir recours à un utilisateur avec des privilèges (root,
sudo-users), ce qui est bien sûr plus sécurisé.

**Rappel :** l’utilisateur zabbix ne doit pas être un super-utilisateur
(sudo-user).

~~~
$ sudo groupadd -g 9000 zabbix
$ sudo useradd -u 9000 -g zabbix -d /usr/local/zabbix -c "Zabbix User" zabbix
$ sudo passwd zabbix
~~~

### Zabbix Server {#zabbix-server .sectionedit5}

Mise en place de Zabbix Server sur un poste serveur.

#### Pré-requis {#pre-requis1}

Le paquet Zabbix Server nécessite au préalable l’installation de
quelques paquets supplémentaires :

~~~
$ sudo apt-get install mysql-server libmysqlclient15-dev
~~~

#### Installation

Maintenant, nous pouvons passer à l’installation de Zabbix Server :

~~~
$ sudo apt-get install zabbix-server-mysql
~~~

Le paquet zabbix-server-mysql installe automatiquement les paquets
nécessaires pour l’activation de monitoring SNMP et Web (les
notifications Jabber sont désactivés par défaut).

Lors de l’installation, Zabbix propose de créer la base de données MySQL
:

[![](/assets/media/supervision/zabbix/zabbix-server_depot_install1.png@w=400)](/_detail/supervision/zabbix/zabbix-server_depot_install1.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-server_depot_install1.png")

Ensuite, il faut renseigner le mot-de-passe de l’utilisateur de bases de
données “root” (défini durant l’installation du serveur MySQL), ce
dernier va être utilisé pour créer la base de données de Zabbix :

[![](/assets/media/supervision/zabbix/zabbix-server_depot_install2.png@w=400)](/_detail/supervision/zabbix/zabbix-server_depot_install2.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-server_depot_install2.png")

Dans l’étape suivante, il est demandé d’attribuer un mot-de-passe pour
l’utilisateur zabbix pour l’accès à la base de données de Zabbix. En
effet, il est n’est pas recommandé d’utiliser le compte “root” de MySQL
pour administrer la base de données, c’est pourquoi, par défaut, c’est
l’utilisateur zabbix qui sera utilisé pour s’y connecter :

[![](/assets/media/supervision/zabbix/zabbix-server_depot_install3.png@w=400)](/_detail/supervision/zabbix/zabbix-server_depot_install3.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-server_depot_install3.png")
\

[![](/assets/media/supervision/zabbix/zabbix-server_depot_install4.png@w=400)](/_detail/supervision/zabbix/zabbix-server_depot_install4.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-server_depot_install4.png")

Une fois l’installation terminée, Zabbix Server est automatiquement
démarré.

#### Configuration

La configuration du serveur se fait par l’intermédiaire du fichier de
configuration zabbix\_server.conf présent dans notre architecture
d’installation :

~~~
$ sudo vim /etc/zabbix/zabbix_server.conf
~~~

Mais, normalement le fichier de configuration est automatiquement
remplis lors de l’installation de Zabbix, et de la création de la base
de données (paramètres de connexion à la base notamment).

### Zabbix Frontend {#zabbix-frontend .sectionedit6}

Maintenant nous allons installer Zabbix Frontend sur la même machine que
Zabbix Server.

Zabbix Frontend peut très bien être installé sur un autre poste, à
condition que les composants Zabbix Server et Zabbix Frontend communique
correctement entre-eux (au niveau ip et dns), afin que l’interface
puisse notamment interroger la base de données du serveur.

#### Installation {#installation1}

Ensuite, l’interface Web de Zabbix pour notre serveur peut être
installée :

~~~
$ sudo apt-get install zabbix-frontend-php
~~~

L’ensemble des pré-requis nécessaires sont installés automatiquement
lors de l’installation de zabbix-frontend-php.

#### Configuration {#configuration1}

Ensuite, il faut éditer le fichier php.ini :

~~~
$ sudo vim /etc/php5/apache2/php.ini
~~~

Et y renseigner le timezone (après avoir retirer le ”;” devant la ligne)
:

~~~ {.file}
date.timezone= “Europe/Paris”
~~~

Puis il est nécessaire de relancer Apache pour prendre en compte la
modification :

~~~
$ sudo /etc/init.d/apache2 restart 
~~~

#### Interface Web

Pour se connecter à l’interface, il faut utiliser cette adresse dans
votre navigateur internet :

[http://127.0.0.1/zabbix](http://127.0.0.1/zabbix "http://127.0.0.1/zabbix")

Une page d’authentification doit s’afficher, par défaut il faut utiliser
**Admin** comme login, et **zabbix** comme mot de passe.

### Zabbix Proxy {#zabbix-proxy .sectionedit7}

L’installation de Zabbix Proxy n’est pas disponible via les dépôts, il
faut utiliser l’installation depuis les sources.

### Zabbix Agent {#zabbix-agent .sectionedit8}

L’installation de Zabbix Agent peut se faire aussi bien sur un serveur
Zabbix Server ou Zabbix Proxy que sur un simple hôte (en général un
serveur) à surveiller.

Bien que la mise en place d’un agent est optionnel, ne pas l’installer
serait se priver de la remontée d’un grand nombre de données sur les
performances, les capacités de stockage, …etc, d’un hôte à superviser.
L’installation de l’agent Zabbix est donc plus que conseillée, afin de
garantir une surveillance plus accrue des hôtes.

#### Ubuntu

##### Installation {#installation2}

Installation de l’agent Zabbix :

~~~
$ sudo apt-get install zabbix-agent
~~~

##### Configuration {#configuration2}

Pour configurer l’agent Zabbix, il suffit d’éditer un seul fichier :

~~~
$ sudo vim /etc/zabbix/zabbix_agentd.conf
~~~

Dans ce fichier, il faut y renseigner l’adresse ip du serveur Zabbix
afin de permettre à l’agent d’envoyer ses informations :

~~~ {.file}
Server=192.168.1.200
~~~

Dans le cadre de l’utilisation d’un Zabbix Proxy, il faut indiquer
l’adresse ip du proxy au lieu de celle du serveur Zabbix.

Puis il faut également remplir le champ du **Hostname**, ce dernier est
nécessaire pour le serveur Zabbix lors des “actives checks” :

~~~ {.file}
Hostname=Serveur Ubuntu
~~~

Le **Hostname** ne correspond pas au non dns de la machine sur lequel le
Zabbix Agent est installé, c’est tout simplement le nom que vous allez
donner dans l’interface (Zabbix Frontend) pour cette machine durant son
ajout (création d’un hôte). \
 **Il est très important que le Hostname défini pour l’agent corresponde
respectivement à son nom (hôte supervisé) affiché dans l’interface**

Ensuite, il faut redémarrer l’agent pour la prise en compte de la
modification :

~~~
$ sudo /etc/init.d/zabbix-agent restart
~~~

#### Windows

##### Installation {#installation3}

Pour installer l’agent Zabbix sur un système Windows, il faut
premièrement télécharger l’agent sur le site :
[http://www.zabbix.com/download.php](http://www.zabbix.com/download.php "http://www.zabbix.com/download.php")

Ensuite, il faut extraire l’archive téléchargée et créer un fichier
texte de configuration pour l’agent, intitulé “zabbix\_agentd.conf” et
le placer à la racine (C:\\zabbix\_agentd.conf). Dans ce fichier, il
suffit de copier le contenu du même fichier de la version Linux.

A ce stade, il reste à installer l’agent. Pour cela, dans le dossier
décompressé (extraction de l’archive téléchargée) il y a un fichier
“zabbix\_agentd.exe”. Pour l’installer, il ne suffit pas de
double-cliquer dessus comme on pourrait le croire, il faut en fait
ouvrir une invite de commande (cmd). Une fois le terminal ouvert :

~~~
> cd \...\zabbix_agents_1.8.2.win.zip\win32
> zabbix_agentd.exe --install
~~~

##### Configuration {#configuration3}

La configuration de l’agent Zabbix sur Windows est similaire à celle
d’Ubuntu.

#### Autres

Pour d’autres systèmes d’exploitation, les systèmes Linux ont la même
démarche que pour Ubuntu. Pour l’installation d’un agent, il faut
télécharger le bon paquet correspondant à votre système sur le site de
Zabbix
([http://www.zabbix.com/download.php](http://www.zabbix.com/download.php "http://www.zabbix.com/download.php")).

Installation depuis les sources {#installation-depuis-les-sources .sectionedit9}
-------------------------------

Tutoriel rédigé pour une version Ubuntu 8.04/10.04 LTS et Zabbix 1.8.2.

### Pré-requis {#pre-requis2 .sectionedit10}

Pour commencer, il faut installer quelques paquets essentiels au bon
fonctionnement de n’importe quel composant Zabbix :

~~~
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install ssh wget man vim build-essential checkinstall
~~~

#### Création d’un utilisateur zabbix {#creation-d-un-utilisateur-zabbix1}

L’utilisateur zabbix sert à exécuter les composants Zabbix (démons),
sans avoir recours à un utilisateur avec des privilèges (root,
sudo-users), ce qui est bien sûr plus sécurisé.

**Rappel :** l’utilisateur zabbix ne doit pas être un super-utilisateur
(sudo-user).

~~~
$ sudo groupadd -g 9000 zabbix
$ sudo useradd -u 9000 -g zabbix -d /usr/local/zabbix -c "Zabbix User" zabbix
$ sudo passwd zabbix
~~~

#### Téléchargement {#telechargement}

Dans un premier temps, il faut récupérer la dernière version de
l’application sur le site
([http://www.zabbix.com/download.php](http://www.zabbix.com/download.php "http://www.zabbix.com/download.php"))
:

~~~
$ sudo wget http://prdownloads.sourceforge.net/zabbix/zabbix-1.8.2.tar.gz 
~~~

Ensuite, on peut lancer l’extraction de l’archive téléchargée :

~~~
$ sudo tar -zxf zabbix-1.8.2.tar.gz
$ cd zabbix-1.8.2
~~~

#### Préparation de l’environnement Zabbix {#preparation-de-l-environnement-zabbix}

Avant de compiler puis d’installer Zabbix à proprement parlé, il faut
tout d’abord préparer notre architecture, c’est-à-dire créer et
organiser nos dossiers d’installation :

~~~
$ sudo mkdir /usr/local/zabbix
$ sudo mkdir /usr/local/zabbix/etc
$ sudo mkdir /usr/local/zabbix/var
$ sudo mkdir /usr/local/zabbix/var/run
$ sudo mkdir /usr/local/zabbix/var/log
~~~

### Zabbix Server {#zabbix-server1 .sectionedit11}

Mise en place de Zabbix Server sur un poste serveur.

#### Pré-requis {#pre-requis3}

L’installation de Zabbix Server requiert des paquets supplémentaires :

~~~
$ sudo apt-get install libssl-dev libssh-dev libgnutls-dev libopenipmi-dev libiksemel-dev snmp libsnmp-dev libnet-snmp-perl libcurl4-gnutls-dev fping
~~~

Puis, il faut ajouter un serveur de base de données :

~~~
$ sudo apt-get install mysql-server libmysqlclient15-dev
~~~

#### Création de la base de données {#creation-de-la-base-de-donnees}

~~~
$ mysql -u root -p
> create database zabbixdb character set utf8;
> grant all privileges on zabbixdb.* to zabbix@localhost identified by 'zabbix';
> exit
$ mysql -u zabbix -p zabbixdb < /.../zabbix-1.8.2/create/schema/mysql.sql
$ mysql -u zabbix -p zabbixdb < /.../zabbix-1.8.2/create/data/data.sql
$ mysql -u zabbix -p zabbixdb < /.../zabbix-1.8.2/create/data/images_mysql.sql
~~~

#### Installation {#installation4}

Maintenant, dans notre dossier zabbix-1.8.2 extrait, nous pouvons lancer
l’installation avec prise en charge du SNMP, de l’IPMI, de Jabber, et de
CURL :

~~~
$ sudo ./configure --enable-server --with-mysql --with-net-snmp --with-libcurl --with-openipmi --with-jabber --prefix=/usr/local/zabbix
~~~

Une fois la compilation terminée (sans erreur), un résumé de la
configuration doit alors s’afficher dans le terminal, afin de vérifier
les paramètres avant l’installation :

~~~ {.file}
Configuration:

  Detected OS:           linux-gnu
  Install path:          /usr/local/zabbix
  Compilation arch:      linux
...
  Enable server:         yes
  With database:         MySQL
  WEB Monitoring via:    cURL
  Native Jabber:         yes
  SNMP:                  net-snmp
  IPMI:                  openipmi
...
~~~

Ensuite, on peut installer Zabbix Server :

~~~
$ sudo make install
~~~

A ce stade, s’il n’y a eu aucune erreur, Zabbix Server est installé dans
le dossier /usr/local/zabbix. Pour vérifier :

~~~
$ sudo dir /usr/local/zabbix
~~~

Les répertoires sbin et share doivent être présents en plus de ceux déjà
créés auparavant. Pour terminer l’installation, il reste à copier
quelques fichiers dans notre dossier zabbix depuis notre répertoire
extrait, à savoir zabbix-1.8.2 :

~~~
$ sudo cp /…/zabbix-1.8.2/misc/conf/zabbix_server.conf /usr/local/zabbix/etc
~~~

Et enfin, il n’y a plus qu’à créer un script init.d pour pouvoir
démarrer/stopper Zabbix Server en toute simplicité :

~~~
$ sudo vim /etc/init.d/zabbix-server
~~~

Voici le contenu du script :

~~~ {.file}
#!/bin/sh -e
#
# Zabbix Server init.d script.
#
# Written by Ludovic Valentin.
# Monitoring-fr.org.

PATH="/bin:/sbin:/usr/bin:/usr/sbin"

CONF_NAME=zabbix_server.conf
CONF=/usr/local/zabbix/etc/$CONF_NAME

DAEMON_NAME=zabbix_server
DAEMON=/usr/local/zabbix/sbin/$DAEMON_NAME
DAEMON_ARGS="-c $CONF"

SCRIPT_NAME=zabbix-server
SCRIPT=/etc/init.d/$SCRIPT_NAME
DESC="$DAEMON_NAME init.d script"
PID=/usr/local/zabbix/var/run/$DAEMON_NAME.pid

test -e $DAEMON || exit 0

. /lib/lsb/init-functions

zabbix_start () {
    log_daemon_msg "Starting $DAEMON_NAME"
    start-stop-daemon --start --pidfile $PID \
        --exec $DAEMON -- $DAEMON_ARGS
        log_end_msg $?
}

zabbix_stop () {
    log_daemon_msg "Stopping $DAEMON_NAME"
    start-stop-daemon --stop --pidfile $PID --name $DAEMON_NAME
    log_end_msg $?
}


case "$1" in

    start|stop)
        zabbix_${1}
    ;;

    restart)
        zabbix_stop
        sleep 2
        zabbix_start
    ;;

    force-stop)
        log_daemon_msg "Stopping $DAEMON_NAME"
                if [ -e $PID ]; then
                        killall -q $DAEMON_NAME
                        if [ -e $PID ]; then
                                rm -R $PID
                        fi
                        log_end_msg $?
                else
                        echo "No $PID found; none $DAEMON_NAME killed."
                fi
    ;;

    status)
        log_daemon_msg "Checking $DAEMON_NAME status"
                if [ -e $PID ]; then
                        echo "Status: $DAEMON_NAME is running."
                else
                        echo "Status: $DAEMON_NAME is not running."
                fi
    ;;

    *)
        log_daemon_msg $DESC
        echo "Usage: $SCRIPT {start/stop/restart/force-stop/status}"
        exit 1
    ;;

esac

exit 0
~~~

Ne pas oublier d’ajouter le droit d’exécution au script :

~~~
$ sudo chmod +x /etc/init.d/zabbix-server
~~~

Pour terminer, on applique les bons droits et permissions sur le fichier
de configuration de Zabbix Server (ce qui permet de protèger l’accès à
ce fichier, le mot-de-passe d’accès de la base de données apparaissant
notamment en clair dans ce dernier), puis on place notre utilisateur
zabbix comme propriétaire de toute l’architecture d’installation de
Zabbix :

~~~
$ sudo chmod 640 /usr/local/zabbix/etc/zabbix_server.conf
$ sudo chown -R zabbix:zabbix /usr/local/zabbix*
~~~

#### Configuration {#configuration4}

La configuration du serveur se fait par l’intermédiaire du fichier de
configuration zabbix\_server.conf présent dans notre architecture
d’installation :

~~~
$ sudo vim /usr/local/zabbix/etc/zabbix_server.conf
~~~

Dans ce fichier, nous allons pouvoir renseigner les paramètres
nécessaires au bon fonctionnement de notre solution Zabbix Server.

Tout d’abord, il faut commencer par renseigner les chemins d’accès aux
fichiers pid et logs nécessaires au démarrage du serveur Zabbix, ces
derniers étant utilisés par notre script init.d précédemment créé :

~~~ {.file}
LogFile=/usr/local/zabbix/var/log/zabbix_server.log
PidFile=/usr/local/zabbix/var/run/zabbix_server.pid
~~~

Ensuite, nous devons indiquer les paramètres de la base de données créée
auparavant :

~~~ {.file}
DBName=zabbixdb
DBUser=zabbix
DBPassword=zabbix
DBSocket=/var/run/mysqld/mysqld.sock
~~~

#### Démarrage de Zabbix Server {#demarrage-de-zabbix-server}

Pour démarrer Zabbix, il faut utiliser de préférence le script init.d
fourni précédemment dans ce tutoriel d’installation. Ce script est
adapter à l’architecture mise en place, à savoir /usr/local/zabbix dans
notre procédure d’installation.

Un script officiel est disponible dans le paquet des sources Zabbix
téléchargé auparavant, mais il correspond avant tout à une installation
par défaut (sur Debian).

Le script officiel se trouve dans /…/zabbix-1.8.2/misc/init.d

Dans ce tutoriel, c’est donc notre script qui est utilisé pour démarrer
Zabbix:

~~~
$ sudo /etc/init.d/zabbix-server start
~~~

### Zabbix Frontend {#zabbix-frontend1 .sectionedit12}

Maintenant nous allons installer Zabbix Frontend sur la même machine que
Zabbix Server.

Zabbix Frontend peut très bien être installé sur un autre poste, à
condition que les composants Zabbix Server et Zabbix Frontend communique
correctement entre-eux (au niveau ip et dns), afin que l’interface
puisse notamment interroger la base de données du serveur.

#### Pré-requis {#pre-requis4}

Pour Zabbix Frontend, voici les paquets à installer :

~~~
$ sudo apt-get install apache2 php5 php5-gd
~~~

En fonction du serveur de base de données utilisé, il faut installer un
paquet de support PHP correspondant, dans notre cas il s’agit de MySQL :

~~~
$ sudo apt-get install php5-mysql
~~~

#### Installation {#installation5}

Préparation de l’environnement Zabbix Frontend :

~~~
$ sudo mkdir /usr/local/zabbix/frontend
$ sudo cp -R /…/zabbix-1.8.2/frontends/php/* /usr/local/zabbix/frontend
~~~

Ensuite, l’installation de Zabbix Frontend se faisant depuis le
navigateur internet, il faut configurer notre serveur Web, à savoir
Apache pour pouvoir accéder au frontend :

~~~
$ sudo vim /etc/apache2/sites-enabled/000-default
~~~

Voici le contenu à ajouter dans le fichier :

~~~ {.file}
Alias /zabbix /usr/local/zabbix/frontend/
<Directory /usr/local/zabbix/frontend>
    AllowOverride FileInfo AuthConfig Limit Indexes
    Options MultiViews Indexes SymLinksIfOwnerMatch IncludesNoExec
    <Limit GET POST OPTIONS PROPFIND>
        Order allow,deny
        Allow from all
    </Limit>
    <LimitExcept GET POST OPTIONS PROPFIND>
        Order deny,allow
        Deny from all
    </LimitExcept>
</Directory>
~~~

Ne pas oublier de redémarrer le serveur Apache :

~~~
$ sudo /etc/init.d/apache2 restart
~~~

Maintenant, l’installation de Zabbix Frontend depuis le navigateur
internet (Firefox par exemple) va pouvoir débuter. Dans la barre
d’adresse url du navigateur, il faut entrer l’adresse ip du serveur où
Zabbix Frontend est installé :

[http://127.0.0.1/zabbix/](http://127.0.0.1/zabbix/ "http://127.0.0.1/zabbix/")

Il ne reste alors plus qu’à suivre les étapes :

[![](/assets/media/supervision/zabbix/zabbix-frontend_source_install01.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_source_install01.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_source_install01.png")

Dans la fenêtre suivante, il faut accepter les termes d’utilisation :

[![](/assets/media/supervision/zabbix/zabbix-frontend_source_install02.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_source_install02.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_source_install02.png")

Ensuite, la phase de paramétrage de Zabbix Frontend commence. Tout
d’abord, il y a une étape de vérification de la présence des pré-requis
nécessaires au fonctionnement de l’interface :

[![](/assets/media/supervision/zabbix/zabbix-frontend_source_install03.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_source_install03.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_source_install03.png")

En cas d’échec de validation des pré-requis, à moins d’avoir oublié
d’installer certains paquets, il suffit juste de configurer quelques
paramètres dans le fichier php.ini :

~~~
$ sudo vim /etc/php5/apache2/php.ini
~~~

Voici les champs à éditer dans le fichier (d’après la capture d’écran
précédente) pour les faire correspondre aux critères :

~~~ {.file}
max_execution_time = 600
max_input_time = 600
memory_limit = 256M
post_max_size = 32M
upload_max_filesize = 16M
date.timezone = “Europe/Paris”
~~~

Ensuite, il ne faut pas oublier de relancer le serveur Apache :

~~~
$ sudo /etc/init.d/apache2 restart
~~~

Normalement, en réessayant de tester les pré-requis (**Retry**), l’étape
doit être à présent validée :

[![](/assets/media/supervision/zabbix/zabbix-frontend_source_install04.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_source_install04.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_source_install04.png")

Dans l’étape suivante, il faut renseigner les paramètres de connexion de
la base de données créée durant l’installation de Zabbix Server. Une
fois le test de connexion réussi, on peut valider cette partie en
cliquant sur **Next** :

[![](/assets/media/supervision/zabbix/zabbix-frontend_source_install05.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_source_install05.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_source_install05.png")

La page suivante de l’installation concerne les paramètres du serveur
Zabbix, à savoir son nom dns ou bien son adresse ip, par défaut c’est
localhost. De plus, il faut indiquer également le port utilisé par
Zabbix Server, normalement le port utilisé est 10051 :

[![](/assets/media/supervision/zabbix/zabbix-frontend_source_install07.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_source_install07.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_source_install07.png")

Puis un résumé de l’installation de Zabbix Frontend est affiché, afin de
vérifier une dernière fois les paramètres entrés :

[![](/assets/media/supervision/zabbix/zabbix-frontend_source_install08.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_source_install08.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_source_install08.png")

Pour finir, la dernière étape concerne le fichier de configuration
généré par notre installation de Zabbix Frontend, normalement cette
étape se fait automatiquement, c’est-à-dire qu’elle va copier le fichier
dans le dossier d’installation de notre architecture Zabbix :

[![](/assets/media/supervision/zabbix/zabbix-frontend_source_install09.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_source_install09.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_source_install09.png")

Mais comme nous avions spécifié un chemin d’installation différent de
celui par défaut (voir Zabbix Server), à savoir
/usr/local/zabbix/frontend, et qu’il peut exister certains problèmes de
droits pour l’installation, il faut donc, après l’avoir téléchargé,
copier manuellement le fichier de configuration généré par le Zabbix
Frontend, dans le dossier d’installation :

~~~
$ sudo cp /…/zabbix.conf.php /usr/local/zabbix/frontend/conf
~~~

On vérifie ensuite que le fichier de configuration est bien détecté en
cliquant sur **Retry**. Le fichier doit normalement être validé,
l’installation peut alors se terminer :

[![](/assets/media/supervision/zabbix/zabbix-frontend_source_install10.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_source_install10.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_source_install10.png")

Et enfin, il ne reste plus qu’à cliquer sur **Finish** :

[![](/assets/media/supervision/zabbix/zabbix-frontend_source_install11.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_source_install11.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_source_install11.png")

Une fois l’installation terminée, le navigateur internet redirige
automatiquement sur la page de login de l’interface de Zabbix (Zabbix
Frontend) :

[![](/assets/media/supervision/zabbix/zabbix-frontend_login.png@w=600)](/_detail/supervision/zabbix/zabbix-frontend_login.png@id=zabbix%253Azabbix-ubuntu-install.html "supervision:zabbix:zabbix-frontend_login.png")

Il faut alors utiliser l’utilisateur **Admin** avec pour mot-de-passe
**zabbix**.

Pour terminer, on applique les bons droits et permissions sur toute
l’architecture d’installation de Zabbix, à notre utilisateur zabbix :

~~~
$ sudo chown -R zabbix:zabbix /usr/local/zabbix*
~~~

L’installation de Zabbix Frontend est maintenant terminée.

### Zabbix Proxy {#zabbix-proxy1 .sectionedit13}

Installation de Zabbix Proxy sur un serveur dédié.

#### Pré-requis {#pre-requis5}

Tout d’abord voici les paquets à installer :

~~~
$ sudo apt-get install libssl-dev libssh-dev libgnutls-dev libopenipmi-dev libiksemel-dev snmp libsnmp-dev libnet-snmp-perl libcurl4-gnutls-dev
~~~

Puis, il faut ajouter un serveur de base de données :

~~~
$ sudo apt-get install mysql-server libmysqlclient15-dev
~~~

#### Création de la base de données {#creation-de-la-base-de-donnees1}

~~~
$ mysql -u root -p
> create database zabbixdb character set utf8;
> grant all privileges on zabbixdb.* to zabbix@localhost identified by 'zabbix';
> exit
$ mysql -u zabbix -p zabbixdb < /.../zabbix-1.8.2/create/schema/mysql.sql
$ mysql -u zabbix -p zabbixdb < /.../zabbix-1.8.2/create/data/data.sql
$ mysql -u zabbix -p zabbixdb < /.../zabbix-1.8.2/create/data/images_mysql.sql
~~~

#### Installation {#installation6}

~~~
$ sudo ./configure --enable-proxy --with-mysql --with-net-snmp --with-libcurl --with-openipmi --with-jabber --prefix=/usr/local/zabbix
$ sudo make install
~~~

A ce stade, s’il n’y a eu aucune erreur, Zabbix Proxy est installé dans
le dossier /usr/local/zabbix. Pour vérifier :

~~~
$ sudo dir /usr/local/zabbix
~~~

Les répertoires sbin et share doivent être présents en plus de ceux déjà
créés auparavant. Pour terminer l’installation, il reste à copier
quelques fichiers dans notre dossier zabbix depuis notre répertoire
extrait, à savoir zabbix-1.8.2 :

~~~
$ sudo cp /…/zabbix-1.8.2/misc/conf/zabbix_proxy.conf /usr/local/zabbix/etc
~~~

Et enfin, il n’y a plus qu’à créer un script init.d pour pouvoir
démarrer/stopper Zabbix Proxy en toute simplicité :

~~~
$ sudo vim /etc/init.d/zabbix-proxy
~~~

Le contenu du script est le même que pour le script init.d du Zabbix
Server, il n’y a qu’à modifier les variables pour l’adapter à
l’installation du proxy :

~~~ {.file}
#!/bin/sh -e
#
# Zabbix Proxy init.d script.
#
# Written by Ludovic Valentin.
# Monitoring-fr.org.

PATH="/bin:/sbin:/usr/bin:/usr/sbin"

CONF_NAME=zabbix_proxy.conf
CONF=/usr/local/zabbix/etc/$CONF_NAME

DAEMON_NAME=zabbix_proxy
DAEMON=/usr/local/zabbix/sbin/$DAEMON_NAME
DAEMON_ARGS="-c $CONF"

SCRIPT_NAME=zabbix-proxy
SCRIPT=/etc/init.d/$SCRIPT_NAME
DESC="$DAEMON_NAME init.d script"
PID=/usr/local/zabbix/var/run/$DAEMON_NAME.pid
...
~~~

Ne pas oublier d’ajouter le droit d’exécution au script :

~~~
$ sudo chmod +x /etc/init.d/zabbix-proxy
~~~

Et enfin, on applique les bons droits et permissions sur le fichier de
configuration de Zabbix Proxy (ce qui permet de protèger l’accès à ce
fichier, le mot-de-passe d’accès de la base de données apparaissant
notamment en clair dans ce dernier), puis on place notre utilisateur
zabbix comme propriétaire de toute l’architecture d’installation de
Zabbix :

~~~
$ sudo chmod 700 /usr/local/zabbix/etc/zabbix_proxy.conf
$ sudo chown -R zabbix:zabbix /usr/local/zabbix*
~~~

#### Configuration {#configuration5}

Zabbix Proxy se configure de la même manière que les autres composants
Zabbix, c’est-à-dire en éditant le fichier de configuration lui
correspondant, à savoir zabbix\_proxy.conf :

~~~
$ sudo vim /usr/local/zabbix/etc/zabbix_proxy.conf
~~~

De la même manière que pour la configuration de Zabbix Server, il faut
préciser les répertoires que le proxy doit utiliser pour ses fichiers de
logs et de pid :

~~~ {.file}
LogFile=/usr/local/zabbix/var/log/zabbix_proxy.log
PidFile=/usr/local/zabbix/var/run/zabbix_proxy.pid
~~~

Sur ce fichier, le proxy fonctionnant d’une certaine manière comme un
agent, il faut lui indiquer l’adresse ip du serveur Zabbix auquel il
doit transmettre ses données :

~~~ {.file}
Server=192.168.1.200
~~~

Il est également important de remplir le champ du **Hostname**, ce
dernier est nécessaire pour le serveur Zabbix lors des “actives checks”
:

~~~ {.file}
Hostname=Proxy
~~~

Le **Hostname** ne correspond pas au non dns de la machine sur lequel le
Zabbix Proxy est installé, c’est tout simplement le nom que vous allez
donner dans l’interface (Zabbix Frontend) pour cet hôte durant l’ajout
(création) d’un proxy. \
 **Il est très important que le Hostname défini pour le proxy
corresponde respectivement à son nom affiché dans l’interface**

Puis, il reste à renseigner les paramètres de la base de données :

~~~ {.file}
DBName=zabbixdb
DBUser=zabbix
DBPassword=zabbix
DBSocket=/var/run/mysqld/mysqld.sock
~~~

### Zabbix Agent {#zabbix-agent1 .sectionedit14}

L’installation de Zabbix Agent peut se faire aussi bien sur un serveur
Zabbix Server ou Zabbix Proxy que sur un simple hôte (en général un
serveur) à surveiller.

Bien que la mise en place d’un agent est optionnel, ne pas l’installer
serait se priver de la remontée d’un grand nombre de données sur les
performances, les capacités de stockage, …etc, d’un hôte à superviser.
L’installation de l’agent Zabbix est donc plus que conseillée, afin de
garantir une surveillance plus accrue des hôtes.

#### Ubuntu {#ubuntu1}

##### Installation {#installation7}

Dans le dossier extrait zabbix-1.8.2, on peut lancer l’installation de
l’agent :

~~~
$ sudo ./configure --enable-agent --prefix=/usr/local/zabbix
$ sudo make install
~~~

Lorsque l’installation de l’agent est finie, il faut copier les fichiers
de configuration de Zabbix Agent dans notre répertoire d’installation :

~~~
$ sudo cp /…/zabbix-1.8.2/misc/conf/zabbix_agentd.conf /usr/local/zabbix/etc
~~~

Pour simplifier la gestion du démon zabbix\_agentd présent dans le
répertoire /usr/local/zabbix/sbin, voici un script init.d à créer :

~~~
$ sudo vim /etc/init.d/zabbix-agentd
~~~

Le contenu du script est le même que pour le script init.d du Zabbix
Server, il n’y a qu’à modifier les variables pour l’adapter à
l’installation de l’agent :

~~~ {.file}
#!/bin/sh -e
#
# Zabbix Agent init.d script.
#
# Written by Ludovic Valentin.
# Monitoring-fr.org.

PATH="/bin:/sbin:/usr/bin:/usr/sbin"

CONF_NAME=zabbix_agentd.conf
CONF=/usr/local/zabbix/etc/$CONF_NAME

DAEMON_NAME=zabbix_agentd
DAEMON=/usr/local/zabbix/sbin/$DAEMON_NAME
DAEMON_ARGS="-c $CONF"

SCRIPT_NAME=zabbix-agentd
SCRIPT=/etc/init.d/$SCRIPT_NAME
DESC="$DAEMON_NAME init.d script"
PID=/usr/local/zabbix/var/run/$DAEMON_NAME.pid
...
~~~

Ne pas oublier d’ajouter le droit d’exécution au script :

~~~
$ sudo chmod +x /etc/init.d/zabbix-agentd
~~~

Pour terminer, on applique les bons droits et permissions sur toute
l’architecture d’installation de Zabbix, à notre utilisateur zabbix,
avec une limitation de l’accès au fichier de configuration :

~~~
$ sudo chmod 400 /usr/local/zabbix/etc/zabbix_agentd.conf
$ sudo chown -R zabbix:zabbix /usr/local/zabbix*
~~~

##### Configuration {#configuration6}

Pour configurer l’agent Zabbix, il suffit d’éditer un seul fichier :

~~~
$ sudo vim /usr/local/zabbix/etc/zabbix_agentd.conf
~~~

Comme pour la configuration de Zabbix Server, il faut préciser les
répertoires que l’agent doit utiliser pour ses fichiers de logs et de
pid :

~~~ {.file}
LogFile=/usr/local/zabbix/var/log/zabbix_agentd.log
PidFile=/usr/local/zabbix/var/run/zabbix_agentd.pid
~~~

Maintenant, il est important de renseigner l’adresse ip du serveur
Zabbix afin de permettre à l’agent d’envoyer ses informations :

~~~ {.file}
Server=192.168.1.200
~~~

Dans le cadre de l’utilisation d’un Zabbix Proxy, il faut indiquer
l’adresse ip du proxy au lieu de celle du serveur Zabbix.

Puis il faut également remplir le champ du **Hostname**, ce dernier est
nécessaire pour le serveur Zabbix lors des “actives checks” :

~~~ {.file}
Hostname=Serveur Ubuntu
~~~

Le **Hostname** ne correspond pas au non dns de la machine sur lequel le
Zabbix Agent est installé, c’est tout simplement le nom que vous allez
donner dans l’interface (Zabbix Frontend) pour cette machine durant son
ajout (création d’un hôte). \
 **Il est très important que le Hostname défini pour l’agent corresponde
respectivement à son nom (hôte supervisé) affiché dans l’interface**

#### Windows {#windows1}

##### Installation {#installation8}

Pour installer l’agent Zabbix sur un système Windows, il faut
premièrement télécharger l’agent sur le site :
[http://www.zabbix.com/download.php](http://www.zabbix.com/download.php "http://www.zabbix.com/download.php")

Il est également possible de récupérer les fichiers présents dans les
sources Zabbix (Linux). En effet, dans le répertoire extrait
zabbix-1.8.2 (voir précédemment) sur le serveur Linux, il y a dans le
dossier bin les exécutables de l’agent pour Windows :

~~~
$ sudo dir /…/zabbix-1.8.2/bin/win32
~~~

De même, le fichier de configuration de l’agent Windows est aussi fourni
dans les sources :

~~~
$ sudo dir /…/zabbix-1.8.2/misc/conf
~~~

Ensuite, il faut extraire l’archive téléchargée et créer un fichier
texte de configuration pour l’agent, intitulé “zabbix\_agentd.conf” et
le placer à la racine (C:\\zabbix\_agentd.conf). Dans ce fichier, il
suffit de copier le contenu du même fichier de la version Linux.

A ce stade, il reste à installer l’agent. Pour cela, dans le dossier
décompressé (extraction de l’archive téléchargée) il y a un fichier
“zabbix\_agentd.exe”. Pour l’installer, il ne suffit pas de
double-cliquer dessus comme on pourrait le croire, il faut en fait
ouvrir une invite de commande (cmd). Une fois le terminal ouvert :

~~~
> cd \...\zabbix_agents_1.8.2.win.zip\win32
> zabbix_agentd.exe --install
~~~

##### Configuration {#configuration7}

La configuration de l’agent Zabbix sur Windows est très similaire à
celle de Linux.

#### Autres {#autres1}

Pour d’autres systèmes d’exploitation, les systèmes Linux ont la même
démarche que pour Ubuntu. Pour l’installation d’un agent, il faut
télécharger le bon paquet correspondant à votre système sur le site de
Zabbix
([http://www.zabbix.com/download.php](http://www.zabbix.com/download.php "http://www.zabbix.com/download.php")).