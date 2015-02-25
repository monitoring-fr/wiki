---
layout: page
---

[[[Merlin](merlin@do=backlink.html)]]

[wiki monitoring-fr.org](../../start.html "[ALT+H]")

![Logo Monitoring](../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../start.html "start") »
[Nagios](../start.html "nagios:start") » [Nagios
Addons](start.html "nagios:addons:start") »
[Merlin](../../addons/merlin.html "nagios:addons:merlin")

### Table des matières {.toggle}

-   [Merlin](../../addons/merlin.html#merlin)
    -   [Pré-requis](../../addons/merlin.html#pre-requis)
    -   [Installation](../../addons/merlin.html#installation)
        -   [Récupération des
            sources](../../addons/merlin.html#recuperation-des-sources)
        -   [Base de données](../../addons/merlin.html#base-de-donnees)
        -   [Installation de
            merlin](../../addons/merlin.html#installation-de-merlin)
    -   [Configuration](../../addons/merlin.html#configuration)

[![](../../assets/media/addons/addons/merlin/logo.png@w=200)](../../_detail/addons/addons/merlin/logo.png@id=nagios%253Aaddons%253Amerlin.html "addons:addons:merlin:logo.png")

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

Nagios Addons {#nagios-addons .sectionedit1}
-------------

-   [Lilac Platform](lilac-platform.html "nagios:addons:lilac-platform")
-   [Merlin](../../addons/merlin.html "nagios:addons:merlin")
-   [NConf](nconf.html "nagios:addons:nconf")
-   [NDOUtils](ndoutils.html "nagios:addons:ndoutils")
-   [NSClient++](nsclient.html "nagios:addons:nsclient")
-   [NagTrap](../../addons/nagtrap.html "nagios:addons:nagtrap")
-   [NagVis](nagvis/start.html "nagios:addons:nagvis:start")
-   [Nagios Business Process
    Addon](nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [NagiosDigger](nagiosdigger.html "nagios:addons:nagiosdigger")
-   [NagiosGrapher](nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [NagiosQL](nagiosql.html "nagios:addons:nagiosql")
-   [Netways Grapher
    V2](netways-grapher-v2.html "nagios:addons:netways-grapher-v2")
-   [Ninja](ninja.html "nagios:addons:ninja")
-   [PNP4Nagios](pnp/start.html "nagios:addons:pnp:start")
-   [Protocole NRPE](nrpe.html "nagios:addons:nrpe")
-   [Protocole NSCA](nsca.html "nagios:addons:nsca")
-   [Setup distribué avec
    Mod\_Gearman](mod_gearman.html "nagios:addons:mod_gearman")
-   [Vautour Style](vautour-style.html "nagios:addons:vautour-style")
-   [check\_mk](check_mk/start.html "nagios:addons:check_mk:start")
-   [omd Open Monitoring Distribution](omd.html "nagios:addons:omd")

-   [Afficher le texte
    source](merlin@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](merlin@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](merlin@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](merlin@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](merlin@do=media.html "Gestionnaire de médias")
-   [Index](merlin@do=index.html "Index [X]")
-   [Connexion](merlin@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](../../addons/merlin.html#dokuwiki__top "Haut de page [T]")

nagios/addons/merlin.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

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

![](../../lib/exe/indexer.php@id=nagios%253Aaddons%253Amerlin&1424859577)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
