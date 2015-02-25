---
layout: page
---

[[[NDOUtils](ndoutils@do=backlink.html)]]

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
[NDOUtils](ndoutils.html "nagios:addons:ndoutils")

### Table des matières {.toggle}

-   [NDOUtils](ndoutils.html#ndoutils)
-   [Pré Requis](ndoutils.html#pre-requis)
-   [Installation de NDO](ndoutils.html#installation-de-ndo)
    -   [Récupération &
        Compilation](ndoutils.html#recuperation-compilation)
    -   [Installation des
        binaires](ndoutils.html#installation-des-binaires)
-   [Création de la base NDO](ndoutils.html#creation-de-la-base-ndo)
-   [Création d'un script
    d'init](ndoutils.html#creation-d-un-script-d-init)
-   [Comment être sûr que ça fonctionne
    ?](ndoutils.html#comment-etre-sur-que-ca-fonctionne)

NDOUtils {#ndoutils .sectionedit1}
========

Pré Requis {#pre-requis .sectionedit2}
==========

Pour l’installation de NDO, il nous faut quelques dépendances que l’on
installera avec aptitude.

~~~
sudo aptitude install mysql-server-5.0 mysql-client libmysql++-dev php5-mysql libmysqlclient15-dev
~~~

Installation de NDO {#installation-de-ndo .sectionedit3}
===================

Récupération & Compilation {#recuperation-compilation .sectionedit4}
--------------------------

Pour cela, il faut les télécharger directement du sourceforge de
[http://www.nagios.org](http://www.nagios.org "http://www.nagios.org")

~~~
wget http://prdownloads.sourceforge.net/sourceforge/nagios/ndoutils-1.4b7.tar.gz<code>

Décompresser la source

<code>
tar xzf ndoutils-1.4b7.tar.gz

cd ndoutils-1.4b7/
~~~

Nous allons compiler NDO avec quelques pré requis pour notre
installation.

~~~
./configure --disable-pgsql --with-mysql-lib=/usr/lib/mysql --with-ndo2db-user=nagios --with-ndo2db-group=nagcmd

make
~~~

Installation des binaires {#installation-des-binaires .sectionedit5}
-------------------------

Nous allons installé les fichiers de NDO dans l’arborescence de Nagios

~~~
cp src/ndomod-3x.o /usr/local/nagios/bin/ndomod.o

cp src/ndo2db-3x /usr/local/nagios/bin/ndo2db

chown nagios:nagcmd /usr/local/nagios/bin/ndo*

chmod 774 /usr/local/nagios/bin/ndo*
~~~

Création de la base NDO {#creation-de-la-base-ndo .sectionedit6}
=======================

Nous allons créer la base NDO avec le compte root de mysql.

~~~
mysqladmin -u root -p create ndo
~~~

Nous créons l’utilisateur et mot de passe qui aura le droit
d’administrer la base

~~~
mysql -u root -p mysql

GRANT ALL ON ndo.* TO ndouser@localhost IDENTIFIED BY 'ndopassword';

FLUSH PRIVILEGES;

exit
~~~

Écriture des tables dans la base et rattrapage des fichiers de
configurations

~~~
cd db/

./installdb -u ndouser -p ndopassword -h localhost -d ndo
~~~

Copie des fichiers de configuration dans l’arborescence Nagios

~~~
cd ..

cp config/ndomod.cfg /usr/local/nagios/etc/

cp config/ndo2db.cfg /usr/local/nagios/etc/

chown nagios:nagcmd /usr/local/nagios/etc/ndo*
~~~

Édition de la configuration du module NDO

~~~
nano /usr/local/nagios/etc/ndomod.cfg
~~~

Vérification des paramètres de configuration. On choisira le
**output\_type** de type *unixsocket* pour des questions de performances
et en cas de rupture réseau, on est sur que nos données ne sont pas
perdues.

~~~
instance_name=Central
output_type=unixsocket
output=/usr/local/nagios/var/ndo.sock
tcp_port=5668
output_buffer_items=5000
buffer_file=/usr/local/nagios/var/ndomod.tmp
~~~

Édition de la configuration de la base de données NDO

~~~
nano /usr/local/nagios/etc/ndo2db.cfg
~~~

Vérification des paramètres de configuration

~~~
ndo2db_user=nagios
ndo2db_group=nagcmd
socket_type=unix
socket_port=5668
db_servertype=mysql
db_host=localhost
db_name=ndo
db_port=3306
db_prefix=nagios_
db_user=ndouser
db_pass=ndopassword
~~~

On redirige les sorties de nagios dans la base de données grâce à la
déclaration du module broker dans nagios.cfg

~~~
nano /usr/local/nagios/etc/nagios.cfg
~~~

~~~
event_broker_options=-1

broker_module=/usr/local/nagios/bin/ndomod.o config_file=/usr/local/nagios/etc/ndomod.cfg
~~~

Création d'un script d'init {#creation-d-un-script-d-init .sectionedit7}
===========================

~~~
#!/bin/sh
#
#
# chkconfig: 345 99 01
# description: Nagios to mysql
#
# Author : GaÃ«tan Lucas
# Realase : 07/02/08
# Version : 0.1 b
# File : ndo2db
# Description: Starts and stops the Ndo2db daemon
#              used to provide network services status in a database.
#

status_ndo ()
{
    if ps -p $NdoPID > /dev/null 2>&1; then
            return 0
    else
        return 1
    fi

    return 1
}

printstatus_ndo()
{
    if status_ndo $1 $2; then
        echo "ndo (pid $NdoPID) is running..."
    else
        echo "ndo is not running"
    fi
}

killproc_ndo ()
{
    echo "kill $2 $NdoPID"
    kill $2 $NdoPID
}

pid_ndo ()
{
    if test ! -f $NdoRunFile; then
        echo "No lock file found in $NdoRunFile"
        echo -n "         checking runing process..."
        NdoPID=`ps h -C ndo2db -o pid`
        if [ -z "$NdoPID" ]; then
            echo "     No ndo2db process found"
            exit 1
        else
            echo "     found process pid: $NdoPID"
            echo -n "         reinit $NdoRunFile ..."
            touch $NdoRunFile
            chown $NdoUser:$NdoGroup $NdoRunFile
            echo "$NdoPID" > $NdoRunFile
            echo "     done"
        fi
    fi

    NdoPID=`head $NdoRunFile`
}

# Source function library
# Solaris doesn't have an rc.d directory, so do a test first
if [ -f /etc/rc.d/init.d/functions ]; then
    . /etc/rc.d/init.d/functions
elif [ -f /etc/init.d/functions ]; then
    . /etc/init.d/functions
fi

prefix=/usr/local/nagios
exec_prefix=${prefix}
NdoBin=${exec_prefix}/bin/ndo2db
NdoCfgFile=${prefix}/etc/ndo2db.cfg
NdoRunFile=${prefix}/var/ndo2db.run
NdoLockDir=/var/lock/subsys
NdoLockFile=ndo2db.lock
NdoUser=nagios
NdoGroup=nagcmd

# Check that ndo exists.
if [ ! -f $NdoBin ]; then
   echo "Executable file $NdoBin not found.  Exiting."
   exit 1
fi

# Check that ndo.cfg exists.
if [ ! -f $NdoCfgFile ]; then
   echo "Configuration file $NdoCfgFile not found.  Exiting."
   exit 1
fi

# See how we were called.
case "$1" in

    start)
        echo -n "Starting ndo:"
        touch $NdoRunFile
        chown $NdoUser:$NdoGroup $NdoRunFile
        $NdoBin -c $NdoCfgFile
        if [ -d $NdoLockDir ]; then
            touch $NdoLockDir/$NdoLockFile;
               fi
        ps h -C ndo2db -o pid > $NdoRunFile
        if [ $? -eq 0 ]; then
            echo " done."
            exit 0
        else
            echo " failed."
            $0 stop
            exit 1
        fi
        ;;

    stop)
        echo -n "Stopping ndo: "

        pid_ndo
        killproc_ndo

        # now we have to wait for ndo to exit and remove its
        # own NdoRunFile, otherwise a following "start" could
        # happen, and then the exiting ndo will remove the
        # new NdoRunFile, allowing multiple ndo daemons
        # to (sooner or later) run
        #echo -n 'Waiting for ndo to exit .'
        for i in 1 2 3 4 5 6 7 8 9 10 ; do
            if status_ndo > /dev/null; then
            echo -n '.'
            sleep 1
            else
            break
            fi
        done
        if status_ndo > /dev/null; then
            echo
            echo 'Warning - ndo did not exit in a timely manner'
        else
            echo 'done.'
        fi

        rm -f $NdoRunFile $NdoLockDir/$NdoLockFile
        ;;

    status)
        pid_ndo
        printstatus_ndo ndo
        ;;

    restart)
        $0 stop
        $0 start
        ;;

    *)
        echo "Usage: ndo {start|stop|restart|status}"
        exit 1
        ;;

esac

# End of this script
~~~

Au besoin on rattrape les droits de ndo2db

~~~
chown root:root /etc/init.d/ndo2db

chmod 755 /etc/init.d/ndo2db
~~~

Inscription de ndo2db au démarrage et on lance les services

~~~
update-rc.d ndo2db defaults

/etc/init.d/ndo2db start

/etc/init.d/nagios restart
~~~

Comment être sûr que ça fonctionne ? {#comment-etre-sur-que-ca-fonctionne .sectionedit8}
====================================

Deux options se présente à vous soit vous vous munissez d’un phpMyAdmin
(pour les plus fainéants ou ceux qui préfère le graphique à la ligne de
commande) ou alors vous interrogez votre base NDO comme ceci :

~~~
mysql -h localhost -u ndouser -pndopasswd -d ndo -e "SELECT * FROM nagios_hosts"
~~~

ou alors via le fichier nagios.log

~~~
tail -f /usr/local/nagios/var/nagios.log
~~~

En cas de bonne connection à la base vous aurez ce message :

***ndomod: Successfully connected to data sink. 0 queued items to
flush.***\*

en cas d’erreur, tu auras un message du genre :

***ndomod: Successfully flushed 80 queued items to data sink. ndomod:
Error writing to data sink! Some output may get lost…***

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
    source](ndoutils@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](ndoutils@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](ndoutils@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](ndoutils@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](ndoutils@do=media.html "Gestionnaire de médias")
-   [Index](ndoutils@do=index.html "Index [X]")
-   [Connexion](ndoutils@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](ndoutils.html#dokuwiki__top "Haut de page [T]")

nagios/addons/ndoutils.txt · Dernière modification: 2013/03/29 09:39
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

![](../../lib/exe/indexer.php@id=nagios%253Aaddons%253Andoutils&1424859577)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
