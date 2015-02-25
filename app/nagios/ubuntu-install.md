---
layout: page
---

[[[Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
LTS](ubuntu-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start") » [Installation Nagios 2 & 3 sur
Ubuntu 6.0.6, 8.0.4 et 10.0.4
LTS](ubuntu-install.html "nagios:ubuntu-install")

### Table des matières {.toggle}

-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](ubuntu-install.html#installation-nagios-2-3-sur-ubuntu-606-804-et-1004-lts)
    -   [Préambule](ubuntu-install.html#preambule)
    -   [Installation Ubuntu Server 6.0.6, 8.0.4 et 10.0.4
        LTS](ubuntu-install.html#installation-ubuntu-server-606-804-et-1004-lts)
    -   [Installation Nagios](ubuntu-install.html#installation-nagios)
    -   [Installation plugins](ubuntu-install.html#installation-plugins)
    -   [Installation NRPE](ubuntu-install.html#installation-nrpe)
    -   [Installation NSCA](ubuntu-install.html#installation-nsca)
    -   [Installation
        NDOUtils](ubuntu-install.html#installation-ndoutils)
    -   [Installation SNMPTT](ubuntu-install.html#installation-snmptt)
    -   [Installation Nagtrap](ubuntu-install.html#installation-nagtrap)
-   [Contrôle installation](ubuntu-install.html#controle-installation)

Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4 LTS {#installation-nagios-2-3-sur-ubuntu-606-804-et-1004-lts .sectionedit1}
---------------------------------------------------------------

L’ensemble de cette installation reste valable pour Ubuntu 8.0.4 L.T.S
Hardy Heron et Ubuntu 10.04 Lucid Lynx.

### Préambule {#preambule .sectionedit2}

Ce document couvre l’installation d’un serveur Nagios version 2 ou 3 sur
Linux Ubuntu 6.0.6 LTS, Ubuntu 8.04 LTS et 10.0.4 LTS. Il doit être
possible de suivre ces instructions pour d’autres distributions avec
quelques modifications. Néanmoins, l’ Ubuntu Server LTS est intéressante
pour sa dimension “Entreprise Ready” et son suppport gratuit assuré par
Canonical pour une durée de 5 ans. Cette distribution représente un bon
compromis paquets récents, sécurité (le compte root est désactivé) et
stabilité.

A la fin de l’installation, le serveur doit contenir l’ensemble des
programmes et librairies nécessaires au fonctionnement de Nagios en
production. Ne sera pas abordé l’installation des programmes satellites
de la supervision comme la gestion des configurations, des changements,
ntop, smokeping…) Par contre, pour nos besoins, nous couvrirons
l’installation à partir des sources de :

-   Nagios
-   Nagios plugins officiels
-   Nagios NRPE pour la surveillance active
-   Nagios NSCA pour la surveillance passive
-   Nagios NDOutils pour stocker les données de Nagios dans MySQL

Notre serveur comprendra un mix de programmes installés par la commande
apt-get mais aussi de paquets compilés à partir des sources de façon à
contrôler les paramètres d’installation de ces programmes et de pouvoir
les mettre à jour plus rapidement (patches et correctifs mineurs)

### Installation Ubuntu Server 6.0.6, 8.0.4 et 10.0.4 LTS {#installation-ubuntu-server-606-804-et-1004-lts .sectionedit3}

Nous n’allons pas couvrir en détail l’installation de la distribution
Linux. Il suffit de choisir une installation de serveur LAMP et de
suivre les indications. Pour que cette installation soit opérationnelle,
il convient d’exécuter les commandes suivantes :

~~~~ {.code}
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install openssh-server
~~~~

Ces commandes mettent à jour l’ensemble de la distribution installée et
installe le serveur ssh pour la prise en main à distance.

Préparation des dépôts apt pour l’installation

~~~~ {.code}
sudo nano /etc/apt/sources.list
~~~~

Le contenu désiré est le suivant:

~~~~ {.code}
deb http://fr.archive.ubuntu.com/ubuntu/ dapper main universe restricted
deb-src http://fr.archive.ubuntu.com/ubuntu/ dapper main universe restricted
deb http://fr.archive.ubuntu.com/ubuntu/ dapper-updates main universe restricted
deb-src http://fr.archive.ubuntu.com/ubuntu/ dapper-updates universe restricted
deb http://security.ubuntu.com/ubuntu dapper-security main universe restricted
deb-src http://security.ubuntu.com/ubuntu dapper-security main universe restricted
~~~~

Nous installons quelques utilitaires de base pour notre serveur de
supervision

~~~~ {.code}
sudo apt-get install php5-gd mailx fping snmp ntp smbclient nmap saidar traceroute php5-snmp curl gettext
~~~~

Installation de l’environnement de compilation

~~~~ {.code}
sudo apt-get install build-essential
~~~~

### Installation Nagios {#installation-nagios .sectionedit4}

Création de l’utilisateur nagios

~~~~ {.code .bash}
sudo groupadd -g 9000 nagios
sudo groupadd -g 9001 nagcmd
sudo useradd -u 9000 -g nagios -G nagcmd -d /usr/local/nagios -c "Nagios Admin" nagios
~~~~

Avant de pouvoir compiler Nagios le plus complètement possible, il faut
installer quelques librairies de développement. Les en-têtes du noyau
sont facultatifs :

~~~~ {.code .bash}
sudo apt-get install libperl-dev libgd2-xpm-dev libltdl3-dev linux-headers-`uname -r`
~~~~

Pour la version 3 de Nagios, ajouter la librairie libglib2

~~~~ {.code .bash}
sudo apt-get install  libglib2.0-dev
~~~~

Quelques corrections pour que Nagios trouve les librairies que le
configure a du mal à détecter

~~~~ {.code .bash}
sudo ln -s /usr/include/sys/uio.h /usr/include/
sudo ln -s /usr/include/sys/socket.h /usr/include/
~~~~

Ensuite compilation de Nagios, des plugins, de NRPE et NSCA.

~~~~ {.code .bash}
wget http://prdownloads.sourceforge.net/sourceforge/nagios/nagios-3.2.3.tar.gz
tar -xzf nagios-3.2.3.tar.gz
pushd nagios-3.2.3
./configure --prefix=/usr/local/nagios --with-nagios-user=nagios --with-nagios-group=nagios --with-command-user=nagios --with-command-group=nagcmd --enable-event-broker --enable-nanosleep --enable-embedded-perl --with-perlcache
make all
sudo make install
sudo make install-init
sudo make install-commandmode
sudo make install-config
popd
~~~~

**Nagios 3.3.1 :** Si vous rencontrez une erreur lors de la compilation,
du style :

~~~~ {.code}
/usr/bin/install: omitting directory `includes/rss/extlib'
/usr/bin/install: omitting directory `includes/rss/htdocs'
/usr/bin/install: omitting directory `includes/rss/scripts'
make[1]: *** [install] Error 1
make[1]: Leaving directory `/srv/d_bilbo/install/nagios/nagios/html'
make: *** [install] Error 2
~~~~

Surtout pas de panique ! Il suffit d’apporter quelques corrections de
bugs avant la compilation, c’est-à-dire juste après notre `./configure`
(voir précédemment) :

~~~~ {.code}
$ sed -i 's/for file in includes\/rss\/\*\;/for file in includes\/rss\/\*\.\*\;/g' ./html/Makefile
$ sed -i 's/for file in includes\/rss\/extlib\/\*\;/for file in includes\/rss\/extlib\/\*\.\*\;/g' ./html/Makefile
~~~~

Ensuite vous pouvez poursuivre le tutoriel avec la compilation :).

Configurer apache2 pour Nagios

~~~~ {.code}
sudo nano /etc/apache2/conf.d/nagios.conf
~~~~

Coller dans le fichier ouvert la configuration suivante :

~~~~ {.code}
ScriptAlias /nagios/cgi-bin "/usr/local/nagios/sbin"

<Directory "/usr/local/nagios/sbin">
#  SSLRequireSSL
   Options ExecCGI
   AllowOverride None
   Order allow,deny
   Allow from all
#  Order deny,allow
#  Deny from all
#  Allow from 127.0.0.1
   AuthName "Nagios Access"
   AuthType Basic
   AuthUserFile /usr/local/nagios/etc/htpasswd.users
   Require valid-user
</Directory>

Alias /nagios "/usr/local/nagios/share"

<Directory "/usr/local/nagios/share">
#  SSLRequireSSL
   Options None
   AllowOverride None
   Order allow,deny
   Allow from all
#  Order deny,allow
#  Deny from all
#  Allow from 127.0.0.1
   AuthName "Nagios Access"
   AuthType Basic
   AuthUserFile /usr/local/nagios/etc/htpasswd.users
   Require valid-user
</Directory>
~~~~

Avec Nagios 3, un simple install-webconf suffit

~~~~ {.code}
sudo make install-webconf
~~~~

Création du fichier d’utilisateur

~~~~ {.code}
sudo htpasswd -c /usr/local/nagios/etc/htpasswd.users nagiosadmin
sudo chown nagios:nagcmd /usr/local/nagios/etc/htpasswd.users
~~~~

Ajouter l’utilisateur apache au groupe nagcmd pour pouvoir exécuter les
commandes externes de Nagios depuis l’interface (ex :
nagcmd:x:9001:www-data)

~~~~ {.code}
sudo adduser www-data nagcmd
sudo /etc/init.d/apache2 restart
~~~~

Pour que Nagios démarre automatiquement au boot de la machine

~~~~ {.code}
sudo chmod +x /etc/init.d/nagios
sudo update-rc.d nagios defaults
~~~~

### Installation plugins {#installation-plugins .sectionedit5}

#### Librairies complémentaires {#librairies-complementaires}

~~~~ {.code}
sudo apt-get install libgnutls-dev libmysqlclient15-dev libssl-dev libsnmp-perl libkrb5-dev libldap2-dev libsnmp-dev libnet-snmp-perl gawk libwrap0-dev libmcrypt-dev fping snmp gettext smbclient dnsutils
~~~~

Quelques corrections pour que le configure trouve les librairies qu’il a
du mal à détecter

~~~~ {.code}
sudo ln -s /usr/include/inttypes.h /usr/include/sys/
sudo ln -s /usr/include/mntent.h /usr/include/sys/
~~~~

#### Compilation

~~~~ {.code}
wget http://prdownloads.sourceforge.net/sourceforge/nagiosplug/nagios-plugins-1.4.15.tar.gz
tar -xzf nagios-plugins-1.4.15.tar.gz
pushd nagios-plugins-1.4.15/
./configure --with-nagios-user=nagios --with-nagios-group=nagios --enable-libtap --enable-extra-opts --enable-perl-modules
make
sudo make install
~~~~

### Installation NRPE {#installation-nrpe .sectionedit6}

Installation de openssl

~~~~ {.code .bash}
sudo apt-get install openssl
~~~~

~~~~ {.code .bash}
wget http://downloads.sourceforge.net/project/nagios/nrpe-2.x/nrpe-2.12/nrpe-2.12.tar.gz
tar -xzf nrpe-2.12.tar.gz
pushd nrpe-2.12/
./configure --enable-ssl --with-log-facility --enable-command-args --enable-threads=posix --with-trusted-path=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/nagios/bin:/usr/local/nagios/libexec
make
sudo make install
sudo cp sample-config/nrpe.cfg /usr/local/nagios/etc/
~~~~

Pas de script de démarrage fourni, aussi en voici un minimal

~~~~ {.code .bash}
#!/bin/sh
 
start()
{
                rm -f /var/run/nrpe.pid
                /usr/local/nagios/bin/nrpe -c /usr/local/nagios/etc/nrpe.cfg -d
}
 
stop()
{
                nrpe=`pgrep nrpe`
                kill -9 $nrpe
}
 
if [ -f /etc/rc.d/init.d/functions ]; then
        . /etc/rc.d/init.d/functions
fi
 
case "$1" in
 start)
  echo 'Le service nrpe est demarrer'
  start
  exit 0
  ;;
 stop)
  echo 'Le serviec nrpe est arreter'
  stop
  exit 0
  ;;
 restart)
  echo 'Le serviec nrpe est arreter'
  stop
  echo 'Le service nrpe est demarrer'
  start
  exit 0
  ;;
 *)
  echo 'Usage: nrpe {start|stop|restart}'
  exit 1
  ;;
esac
~~~~

Pour l’activer

~~~~ {.code .bash}
sudo chmod +x /etc/init.d/nrpe
sudo update-rc.d nrpe defaults
~~~~

### Installation NSCA {#installation-nsca .sectionedit7}

Quelques fichiers mal linkés

~~~~ {.code}
sudo apt-get install libbind-dev libdb-dev
sudo ln -s /usr/include/linux/config.h /usr/include/sys/
sudo ln -s /usr/include/dns/db.h /usr/include/
~~~~

Compilation

~~~~ {.code}
wget http://downloads.sourceforge.net/project/nagios/nsca-2.x/nsca-2.7.2/nsca-2.7.2.tar.gz
tar -xzf nsca-2.7.2.tar.gz
pushd nsca-2.7.2/
./configure
make
~~~~

copier les exécutables et le fichier de configuration pour finir
l’installation

~~~~ {.code}
sudo cp src/nsca /usr/local/nagios/bin/
sudo cp src/send_nsca /usr/local/nagios/libexec/
sudo cp sample-config/nsca.cfg /usr/local/nagios/etc/
~~~~

Le script de démarrage fourni fonctionnant, nous avons utilisé le code
ci-dessous qui est un dérivé du script nrpe comme script de démarrage

~~~~ {.code}
#!/bin/sh
# Start/stop the nsca daemon.
#
# Contributed by Andrew Ryder 06-22-02
# Slight mods by Ethan Galstad 07-09-02

NscaBin=/usr/local/nagios/bin/nsca
NscaCfg=/usr/local/nagios/etc/nsca.cfg

test -f $NscaBin || exit 0

case "$1" in
start)  echo -n "Starting nagios service check acceptator daemon: nsca"
        start-stop-daemon --start --quiet --exec $NscaBin -- -c $NscaCfg --daemon
        echo "."
        ;;
stop)   echo -n "Stopping nagios service check acceptator daemon: nsca"
        start-stop-daemon --stop --quiet --exec $NscaBin
        echo "."
        ;;
restart) echo -n "Restarting nagios service check acceptator daemon: nsca"
        start-stop-daemon --stop --quiet --exec $NscaBin
        start-stop-daemon --start --quiet --exec $NscaBin -- -c $NscaCfg --daemon
        echo "."
        ;;
reload|force-reload) echo -n "Reloading configuration files for nagios service check acceptator daemon: nsca"
        # nsca reloads automatically
        echo "."
        ;;
*)      echo "Usage: /etc/init.d/nsca start|stop|restart|reload|force-reload"
        exit 1
        ;;
esac
exit 0
~~~~

Pour l’activer

~~~~ {.code}
sudo chmod +x /etc/init.d/nsca
sudo update-rc.d nsca defaults
~~~~

### Installation NDOUtils {#installation-ndoutils .sectionedit8}

Compilation et installation de NDOUtils

~~~~ {.code .bash}
wget http://puzzle.dl.sourceforge.net/sourceforge/nagios/ndoutils-1.4b7.tar.gz
tar -xzf ndoutils-1.4b7.tar.gz
pushd ndoutils-1.4b7/
./configure --enable-mysql
make
cd src
sudo cp log2ndo file2sock sockdebug /usr/local/nagios/bin
sudo cp ndomod-3x.o /usr/local/nagios/bin/ndomod.o
sudo cp ndo2db-3x /usr/local/nagios/bin/ndo2db
cd ../config/
sudo cp ndomod.cfg ndo2db.cfg /usr/local/nagios/etc
~~~~

Ne reste plus qu’à créer une base de données “nagios”, un utilisateur
possédant les droits SELECT, INSERT, UPDATE, et DELETE sur cette base et
à y insérer le fichier de structure fourni.

~~~~ {.code .sql}
CREATE USER 'nagios'@'localhost' IDENTIFIED BY '****';
 
GRANT USAGE ON * . * TO 'nagios'@'localhost' IDENTIFIED BY '****' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;
 
CREATE DATABASE IF NOT EXISTS `nagios` ;
 
GRANT SELECT , INSERT , UPDATE , DELETE ON `nagios` . * TO 'nagios'@'localhost';
~~~~

Insertion du fichier de structure

~~~~ {.code}
cd ../
mysql -uroot -ppaswd nagios < db/mysql.sql
~~~~

Modifier le fichier de configuration /usr/local/nagios/etc/nagios.cfg

~~~~ {.code}
event_broker_options=-1
broker_module=/usr/local/nagios/bin/ndomod.o config_file=/usr/local/nagios/etc/ndomod.cfg
~~~~

Démarrage du démon

~~~~ {.code}
/usr/local/nagios/bin/ndo2db -c /usr/local/nagios/etc/ndo2db.cfg
~~~~

ndo2db étant fourni sans script de démarrage, le suivant a été utilisé

~~~~ {.code}
#!/bin/sh
# Start/stop the nsca daemon.
#
# Contributed by Andrew Ryder 06-22-02
# Slight mods by Ethan Galstad 07-09-02

Ndo2dbBin=/usr/local/nagios/bin/ndo2db
Ndo2dbCfg=/usr/local/nagios/etc/ndo2db.cfg

test -f $Ndo2dbBin || exit 0

case "$1" in
start)  echo -n "Starting ndo2db daemon: ndo2db"
        start-stop-daemon --start --quiet --exec $Ndo2dbBin -- -c $Ndo2dbCfg
        echo "."
        ;;
stop)   echo -n "Stopping ndo2db daemon: ndo2db"
        start-stop-daemon --stop --quiet --exec $Ndo2dbBin
        echo "."
        ;;
restart) echo -n "Restarting ndo2db daemon: ndo2db"
        start-stop-daemon --stop --quiet --exec $Ndo2dbBin
        start-stop-daemon --start --quiet --exec $Ndo2dbBin -- -c $Ndo2dbCfg --daemon
        echo "."
        ;;
reload|force-reload) echo -n "Reloading configuration files for ndo2db daemon: ndo2db"
        # ndo2db reloads automatically
        echo "."
        ;;
*)      echo "Usage: /etc/init.d/ndo2db start|stop|restart|reload|force-reload"
        exit 1
        ;;
esac
exit 0
~~~~

Pour l’activer

~~~~ {.code}
sudo chmod +x /etc/init.d/ndo2db
sudo update-rc.d ndo2db defaults
~~~~

Il y a certains cas où il n’est pas nécessaire d’envoyer toutes les
données gérées par Nagios dans la base NDOUtil. Il existe une [petite
calculette](http://www.consol.com/opensource/nagios/ndo-data-processing-options/ "http://www.consol.com/opensource/nagios/ndo-data-processing-options/")
en ligne pour aider à déterminer quoi envoyer et surtout avoir la valeur
à renseigner dans ndomod.cfg.

### Installation SNMPTT {#installation-snmptt .sectionedit9}

Commençons par compléter notre couche SNMP et librairie perl pour faire
fonctionner SNMPTT

~~~~ {.code}
sudo apt-get install snmpd libconfig-inifiles-perl
~~~~

Installation SNMPTT

~~~~ {.code}
wget http://switch.dl.sourceforge.net/sourceforge/snmptt/snmptt_1.2.tgz
tar -xzf snmptt_1.2.tgz
pushd snmptt_1.2/
sudo mv snmpttconvert snmpttconvertmib snmptt-net-snmp-test /usr/local/bin/
sudo mv snmptt snmptthandler /usr/local/sbin/
sudo mkdir -p /usr/local/etc/snmptt.d
sudo cp snmptt.ini /usr/local/etc/
sudo cp examples/snmptt.conf.generic /usr/local/etc/snmptt.d/
~~~~

Il faut ensuite convertir les MIBS dont on a besoin. Afin de tester la
validité de notre installation SNMPTT, nous générons une trap SNMP que
nous lui passons

~~~~ {.code}
sudo snmptt < /home/system/src/snmptt_1.2/examples/sample-trap.generic
~~~~

Modifier le fichier /etc/default/snmpd pour activer le démon trap

~~~~ {.code}
TRAPDRUN=yes

# snmptrapd options (use syslog).
TRAPDOPTS='-Lsd -On -p /var/run/snmptrapd.pid'
~~~~

Modifier le fichier de configuration /etc/snmp/snmptrapd.conf

~~~~ {.code}
traphandle default /usr/local/sbin/snmptt
disableAuthorization yes
donotlogtraps  yes
~~~~

Pour convertir au format snmptt des MIB, il faut utiliser
snmpttconvertmib et c’est long. Voilà une moulinette qui accepte en
entrée un répertoire et qui convertit chacun des fichiers qui s’y
trouvent au format snmptt.

~~~~ {.code .bash}
#!/bin/bash
 
ls $1 > /tmp/mibs.txt
 
while read enreg; do
 
/usr/local/snmptt/bin/snmpttconvertmib --in=/usr/share/snmp/mibs/$enreg --out=/etc/snmp/snmptt.d/$enreg
echo "processing $enreg..."
 
done < /tmp/mibs.txt
rm /tmp/mibs.txt
 
 
exit 0
~~~~

Il suffit de l’appeler ensuite avec le répertoire en argument

~~~~ {.code}
mibs-directory-convert.sh /usr/share/snmp/mibs/
~~~~

### Installation Nagtrap {#installation-nagtrap .sectionedit10}

NagTrap est une interface bien pratique pour voir les traps snmp reçus
et injectés dans une base de données MySQL. Il fournit également un
plugin Nagios pour requêter cette base.

Installation

~~~~ {.code .bash}
wget http://surfnet.dl.sourceforge.net/sourceforge/nagtrap/nagtrap-0.1.2.tar.gz
tar xzf nagtrap-0.1.2.tar.gz
cd nagtrap
mysql -u root -p snmptt < db/snmptt-1.2.sql
~~~~

Création d’une nouvelle table pour stocker les traps reçues mais
inconnues

~~~~ {.code .sql}
CREATE TABLE `snmptt`.`snmptt_unknown` (
`id` mediumint( 9 ) NOT NULL AUTO_INCREMENT ,
`eventname` varchar( 50 ) DEFAULT NULL ,
`eventid` varchar( 50 ) DEFAULT NULL ,
`trapoid` varchar( 100 ) DEFAULT NULL ,
`enterprise` varchar( 100 ) DEFAULT NULL ,
`community` varchar( 20 ) DEFAULT NULL ,
`hostname` varchar( 100 ) DEFAULT NULL ,
`agentip` varchar( 16 ) DEFAULT NULL ,
`category` varchar( 20 ) DEFAULT NULL ,
`severity` varchar( 20 ) DEFAULT NULL ,
`uptime` varchar( 20 ) DEFAULT NULL ,
`traptime` varchar( 30 ) DEFAULT NULL ,
`formatline` varchar( 255 ) DEFAULT NULL ,
`trapread` int( 11 ) DEFAULT '0',
PRIMARY KEY ( `id` )
) ENGINE = MYISAM DEFAULT CHARSET = latin1;
 
INSERT INTO `snmptt`.`snmptt_unknown`
SELECT *
FROM `snmptt`.`snmptt` ;
~~~~

Mise en place des fichiers pour l’interface PHP

~~~~ {.code .bash}
sudo mv nagtrap/ /usr/local/nagios/share/
sudo chown -R www-data:www-data /usr/local/nagios/share/nagtrap/
sudo cp -p /usr/local/nagios/share/nagtrap/etc/config.ini.php-dist /usr/local/nagios/share/nagtrap/etc/config.ini.php
~~~~

Editer le fichier config.ini.php et renseigner les valeurs pour la
connexion MySQL. C’est prêt !

Contrôle installation {#controle-installation .sectionedit11}
---------------------

Une fois l’installation de l’ensemble des composants terminés, il ne
reste qu’à vérifier que les processes ont bien été démarré.

~~~~ {.code .bash}
ps aux | grep nagios
~~~~

~~~~ {.code}
nagios    3679  0.0  0.3  20820  1848 ?        Ssl  Jul11   1:55 /usr/local/nagios/bin/nagios -d /usr/local/nagios/etc/nagios.cfg
nagios   10670  0.0  0.1   1984   744 ?        Ss   Jul11   0:00 /usr/local/nagios/bin/nsca -c /usr/local/nagios/etc/nsca.cfg --daemon
nagios     309  0.0  0.0   3604   320 ?        Ss   13:39   0:00 /usr/local/nagios/bin/ndo2db -c /usr/local/nagios/etc/ndo2db.cfg
nagios    3683  0.0  0.1   3348   968 ?        Ss   Jul11   0:17 /usr/local/nagios/bin/nrpe -c /usr/local/nagios/etc/nrpe.cfg -d
~~~~

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../groundwork/start.html "groundwork:start")
-   [Zenoss](../zenoss/start.html "zenoss:start")
-   [Vigilo](../vigilo/start.html "vigilo:start")
-   [Icinga](../icinga/start.html "icinga:start")
-   [Cacti](../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Nagios {#nagios .sectionedit1}
------

-   [Arborescence des
    fichiers](installation-layout.html "nagios:installation-layout")
-   [Commandes de remontée de
    contrôle](ocsp-ochp.html "nagios:ocsp-ochp")
-   [Données Nagios dans un ramdisk](ramdisk.html "nagios:ramdisk")
-   [Event Handlers](event_handlers.html "nagios:event_handlers")
-   [Gabarits d'objets de
    configuration](templates.html "nagios:templates")
-   [Installation Nagios 2 & 3 sur Ubuntu 6.0.6, 8.0.4 et 10.0.4
    LTS](ubuntu-install.html "nagios:ubuntu-install")
-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](debian-install.html "nagios:debian-install")
-   [Installation de Nagios 3.x sur CentOS
    5.3](nagios-centos-install.html "nagios:nagios-centos-install")
-   [Introduction aux objets de
    configuration](configobjects.html "nagios:configobjects")
-   [Introduction à
    Nagios](nagios-introduction.html "nagios:nagios-introduction")
-   [Liens Nagios](links.html "nagios:links")
-   [Mise en place complète de Nagios sur RHEL
    5.4](mise-en-place-complete-nagios-sur-rhel-5.4/start.html "nagios:mise-en-place-complete-nagios-sur-rhel-5.4:start")
-   [NAGIOS - Guide de démarrage pour
    débutant](nagios-debutant/start.html "nagios:nagios-debutant:start")
-   [Nagios Addons](addons/start.html "nagios:addons:start")
-   [Nagios
    Integration](integration/start.html "nagios:integration:start")
-   [Nagios Plugins](plugins/start.html "nagios:plugins:start")
-   [Nagios et les
    notifications](notifications.html "nagios:notifications")
-   [Outils de supervision d'un hôte
    Windows](windows-client.html "nagios:windows-client")
-   [Référence des objets de
    configuration](objects-reference.html "nagios:objects-reference")
-   [Superviser un hôte Windows avec
    NSClient++](nagios-nsclient-host.html "nagios:nagios-nsclient-host")
-   [Supervision Windows en mode
    passif](supervision-windows-passif.html "nagios:supervision-windows-passif")
-   [Supervision vmware esx](vmware_esx.html "nagios:vmware_esx")
-   [check-list de diagnostic](debug.html "nagios:debug")

-   [Afficher le texte
    source](ubuntu-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](ubuntu-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](ubuntu-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](ubuntu-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](ubuntu-install@do=media.html "Gestionnaire de médias")
-   [Index](ubuntu-install@do=index.html "Index [X]")
-   [Connexion](ubuntu-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](ubuntu-install.html#dokuwiki__top "Haut de page [T]")

nagios/ubuntu-install.txt · Dernière modification: 2013/03/29 09:39
(modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../lib/tpl/arctic/images/button-rss.png)](../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../lib/exe/indexer.php@id=nagios%253Aubuntu-install&1424859523)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
