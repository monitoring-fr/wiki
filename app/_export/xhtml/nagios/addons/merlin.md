---
layout: page
---

### Table des matières {.toggle}

-   [Merlin](merlin.html#merlin)
    -   [Pré-requis](merlin.html#pre-requis)
    -   [Installation](merlin.html#installation)
        -   [Récupération des
            sources](merlin.html#recuperation-des-sources)
        -   [Base de données](merlin.html#base-de-donnees)
        -   [Installation de merlin](merlin.html#installation-de-merlin)
    -   [Configuration](merlin.html#configuration)

[![](../../../../assets/media/addons/addons/merlin/logo.png@w=200)](../../../../_detail/addons/addons/merlin/logo.png@id=nagios%253Aaddons%253Amerlin.html "addons:addons:merlin:logo.png")

Merlin {#merlin .sectionedit1}
======

Le projet
[Merlin](http://www.op5.org/community/projects/ "http://www.op5.org/community/projects/")
(Module d’Effort et de Redondance Loadbalancing En Nagios), a
initialement été lancé pour créer un moyen facile à mettre en place
Nagios en architecture distribuées. Ce qui permet au processus Nagios
d’échanger directement des informations le présentant comme une
alternative à NSCA.

Merlin a été conçu pour se lier parfaitement à l’interface Ninja. C’est
un nouveau projet très prometteur qui à pour but de détrôner NDO (plus
performant et se rapproche mieux du core de nagios).

Les auteurs de cette petite merveille est la société Op5. Le projet est
suivi par Andreas Ericsson.

Pré-requis {#pre-requis .sectionedit2}
----------

Pour le bon fonctionnement de Merlin, il vous faudra un certains nombres
de packages :

~~~
apt-get install git-core libdbi0-dev unzip lynx ncftp ftp mysql-server libmysql++-dev less libdbd-mysql php5-cli php5-mysql
~~~

Installation {#installation .sectionedit3}
------------

### Récupération des sources {#recuperation-des-sources .sectionedit4}

Pour récupérer les sources de merlin, nous allons utiliser “git” pour
pour le moment op5 ne propose pas encore de release.

~~~
wget http://www.op5.org/op5media/op5.org/downloads/merlin-0.9.0.tar.gz
~~~

### Base de données {#base-de-donnees .sectionedit5}

**Obsolète :(mais toujours fonctionnelle)**

Création de la base merlin :

~~~
mysql -h mysqlhost -uroot -p --execute="CREATE DATABASE mysqlmerlindb;"
~~~

Attribution des privilèges :

~~~
mysql -h mysqlhost -uroot -p --execute="grant all privileges on mysqlmerlindb.* to 'mysqlmerlinuser'@'mysqlhost' identified by 'mysqlmerlinpasswd';"

mysql -h mysqlhost -uroot -p --execute="flush privileges;"
~~~

Importation du schéma de la base merlin :

~~~
mysql -h mysqlhost -uroot -p mysqlmerlindb < /path/to/merlin/db.sql
~~~

Ne reste plus qu’à compiler le code

~~~ {.code .bash}
make
~~~

### Installation de merlin {#installation-de-merlin .sectionedit6}

Dans un premier temps, arrêtez le processus Nagios pour éviter toutes
sources d’erreurs

~~~
/etc/init.d/nagios stop
~~~

Avant de lancer l’installeur, il faut modifier un peu son code pour la
partie mysql et la localisation de nagios.

~~~
#!/bin/sh

src_dir=$(dirname $0)
pushd "$src_dir" >/dev/null 2>&1
src_dir=$(pwd)
popd >/dev/null 2>&1

nagios_cfg=/usr/local/nagios/etc/nagios.cfg
dest_dir=/usr/local/nagios/bin/merlin
root_path=
db_type=mysql
db_name=merlin
db_user=merlin
db_pass=merlin
batch=
install=db,files,config,init
~~~

La deuxième modification concerne l’accès pour passer les commandes
mysql. Dans le script d’origine, ça doit être prévu pour un utilisateur
mysql root sans mot de passe mais pour nous, ce n’est pas le cas. Donc
toutes les requêtes sont à modifier en y renseignant :

-   Le serveur de base de données mysql –\> localhost ou
    \<serv\_bdd\_mysql\>
-   l’option -u pour le nom d’utilisateur –\> -uroot
-   l’option -p pour le mot de passe –\> -p (suivi d’un espace comme le
    code ci-dessous)

~~~
db_setup ()
{
        case "$db_type" in
                mysql)
                        # Create database if it do not exist
                        if [[ ! $(mysql -h localhost -uroot -p -e "SHOW DATABASES LIKE '$db_name'") ]]; then
                                echo "Creating database $db_name"
                                mysql -h localhost -uroot -p -e "CREATE DATABASE IF NOT EXISTS $db_name"
                        fi
                        # Always set privileges (to be on the extra safe side)
                        mysql -h localhost -uroot -p -e \
                          "GRANT ALL ON $db_name.* TO $db_user@localhost IDENTIFIED BY '$db_pass'"
                        mysql -h localhost -uroot -p -e 'FLUSH PRIVILEGES'
                        # Fetch db_version and do upgrade stuff if/when needed
                        query="SELECT version FROM db_version"
                        db_version=$(mysql -h localhost -uroot -p $db_name -BNe "$query" 2>/dev/null)
                        case "$db_version" in
                                "")
                                        # No db installed
                                        mysql -h localhost -uroot -p $db_name < $src_dir/db.sql
                                        ;;
                                "1")
                                        # DB Version is 1 and db should be re-installed (According to AE)
                                        mysql -h localhost -uroot -p $db_name < $src_dir/db.sql
~~~

Maintenant nous pouvons lancer l’install avec ***l’aide de bash***

~~~
cd /path/to/merlin/
sudo bash ./install-merlin.sh
~~~

~~Ensuite lancer le fichier import.php qui permet d’actualiser la base
de données avec la configuration nagios actuel.~~ Ceci est fait
automatiquement pour vous depuis la version 0.6 de Merlin.

~~~
php ./import.php
~~~

Pour finir, redémarrer les services :

~~~
/etc/init.d/merlind start
/etc/init.d/nagios start
~~~

Configuration {#configuration .sectionedit7}
-------------

Pour une architecture en mode solo, il n’y a rien d’autres à faire. Vous
pourrez vérifier avec un phpmyadmin, vous aurez des données de vos hôtes
etc …

Nous allons vous présenter merlin en mode distribué. Dans ce mode de
fonctionnement, il y a une première règle à savoir : Il faut que vos
nagios en mode collecteur synchronise leurs date et heure via ntp (avec
pour référence le nagios en mode moniteur).

**Nagios Collecteur ⇒ Merlin en mode POLLER**

**Nagios Moniteur ⇒ Merlin en mode NOC**

Cette définition doit se faire des deux côtés dans le merlin.conf. La
définition marche comme le principe de nagios donc en mode balise.

***Côté Nagios Monitor :***

Dans votre conf de nagios, créez un hostgroup qui aura comme membres
le(s) nagios collecteur(s).

Dans hostgroup.cfg ou endroit où vous déclarez vos hostgroups :

~~~
define hostgroup{
        hostgroup_name  Merlin_hosts
        alias           Hostgroup Merlin
        members         Nagios_Collect1
        }
~~~

Ensuite, dans votre fichier merlin.conf, déclarer votre collecteur de la
manière suivante :

~~~
#
# Sample configuration file for merlin
#
# Default options have been commented out
#
ipc_socket = /opt/nagios/merlin/ipc.sock;

# address to listen to. 0.0.0.0 is default
#address = 0.0.0.0;

poller Nagios_Collect1 {
    address = xx.xx.xx.xx
    hostgroup = Merlin_hosts
}
~~~

Ensuite, redémarrer les services :

~~~
/etc/init.d/merlind restart
/etc/init.d/nagios restart
~~~

***Côté Nagios Collector :***

Dans le fichier merlin.conf

~~~
#
# Sample configuration file for merlin
#
# Default options have been commented out
#
ipc_socket = /opt/nagios/merlin/ipc.sock;

# address to listen to. 0.0.0.0 is default
#address = 0.0.0.0;

noc Nagios_Monitor {
    address = yy.yy.yy.yy
    port = 15551
}
~~~

Ensuite, redémarrer les services :

~~~
/etc/init.d/merlind restart
/etc/init.d/nagios restart
~~~

Pour finir, vous pouvez contrôler sur vos deux machines
path/to/merlin/log/daemon.log et les connections sockets doivent
réussir.
