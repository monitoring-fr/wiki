---
layout: page
title: Installation Nagios 3 sur Debian Squeeze 6.0.3
---

L’installation sur un serveur Debian est très similaire à celui d’une
Ubuntu … Normal puisque Ubuntu s’appuie sur Debian. Mais on peut
s’apercevoir que d’appliquer un tutorial d’installation Nagios 3
d’Ubuntu sur une Debian n’est pas exactement pareille. Le tutorial
suivant est éxécuté avec l’utilisateur système root.

En cours de rédaction

Pré-Requis {#pre-requis .sectionedit2}
----------

Nous n’allons pas couvrir en détail l’installation de la distribution
Linux. Il suffit de choisir une installation de serveur LAMP et de
suivre les indications. Pour que cette installation soit opérationnelle,
il convient d’exécuter les commandes suivantes :

~~~
apt-get update
apt-get upgrade
apt-get install openssh-server
~~~

Ces commandes mettent à jour l’ensemble de la distribution installée et
installe le serveur ssh pour la prise en main à distance.

Préparation des dépôts apt pour l’installation

~~~
vi /etc/apt/sources.list
~~~

Le contenu désiré est le suivant:

~~~
deb http://ftp.fr.debian.org/debian/ squeeze main
deb-src http://ftp.fr.debian.org/debian/ squeeze main

deb http://security.debian.org/ squeeze/updates main
deb-src http://security.debian.org/ squeeze/updates main

# squeeze-updates, previously known as 'volatile'
deb http://ftp.fr.debian.org/debian/ squeeze-updates main
deb-src http://ftp.fr.debian.org/debian/ squeeze-updates main
~~~

Nous installons quelques utilitaires de base pour notre serveur de
supervision

~~~
apt-get install php5-gd postfix fping snmp ntp smbclient nmap saidar traceroute php5-snmp curl gettext
~~~

Installation de l’environnement de compilation

~~~
apt-get install build-essential
~~~

Installation Nagios {#installation-nagios .sectionedit3}
-------------------

Création de l’utilisateur nagios

~~~ {.code .bash}
groupadd -g 9000 nagios
groupadd -g 9001 nagcmd
useradd -u 9000 -g nagios -G nagcmd -d /usr/local/nagios -c "Nagios Admin" nagios
~~~

Avant de pouvoir compiler Nagios le plus complètement possible, il faut
installer quelques librairies de développement. Les en-têtes du noyau
sont facultatifs :

~~~ {.code .bash}
apt-get install libperl-dev libgd2-xpm-dev libltdl3-dev linux-headers-`uname -r`
~~~

Pour la version 3 de Nagios, ajouter la librairie libglib2

~~~ {.code .bash}
apt-get install  libglib2.0-dev
~~~

Ensuite compilation de Nagios, des plugins, de NRPE et NSCA.

~~~ {.code .bash}
wget http://prdownloads.sourceforge.net/sourceforge/nagios/nagios-3.3.1.tar.gz
tar -xzf nagios-3.3.1.tar.gz
cd nagios-3.3.1
./configure --prefix=/usr/local/nagios --with-nagios-user=nagios --with-nagios-group=nagios --with-command-user=nagios --with-command-group=nagcmd --enable-event-broker --enable-nanosleep --enable-embedded-perl --with-perlcache
~~~

**Nagios 3.3.1 :** Si vous rencontrez une erreur lors de la compilation,
du style :

~~~
/usr/bin/install: omitting directory `includes/rss/extlib'
/usr/bin/install: omitting directory `includes/rss/htdocs'
/usr/bin/install: omitting directory `includes/rss/scripts'
make[1]: *** [install] Error 1
make[1]: Leaving directory `/srv/d_bilbo/install/nagios/nagios/html'
make: *** [install] Error 2
~~~

Surtout pas de panique ! Il suffit d’apporter quelques corrections de
bugs avant la compilation, c’est-à-dire juste après notre `./configure`
(voir précédemment) :

~~~
$ sed -i 's/for file in includes\/rss\/\*\;/for file in includes\/rss\/\*\.\*\;/g' ./html/Makefile
$ sed -i 's/for file in includes\/rss\/extlib\/\*\;/for file in includes\/rss\/extlib\/\*\.\*\;/g' ./html/Makefile
~~~

Ensuite vous pouvez poursuivre le tutoriel avec la compilation :).

~~~
make all
make install
make install-init
make install-commandmode
make install-config
make install-webconf
~~~

Création du fichier d’utilisateur

~~~
htpasswd -c /usr/local/nagios/etc/htpasswd.users nagiosadmin
chown nagios:nagcmd /usr/local/nagios/etc/htpasswd.users
~~~

Ajouter l’utilisateur apache au groupe nagcmd pour pouvoir exécuter les
commandes externes de Nagios depuis l’interface (ex :
nagcmd:x:9001:www-data)

~~~
adduser www-data nagcmd
/etc/init.d/apache2 restart
~~~

Pour que Nagios démarre automatiquement au boot de la machine

~~~
chmod +x /etc/init.d/nagios
update-rc.d nagios defaults
~~~

Vous n’avez plus qu’à démarrer Nagios

~~~
/etc/init.d/nagios start
~~~

Installation Nagios-Plugins {#installation-nagios-plugins .sectionedit4}
---------------------------

### Librairies complémentaires {#librairies-complementaires .sectionedit5}

~~~
apt-get install libgnutls-dev libmysqlclient15-dev libssl-dev libsnmp-perl libkrb5-dev libldap2-dev libsnmp-dev libnet-snmp-perl gawk libwrap0-dev libmcrypt-dev fping snmp gettext smbclient dnsutils
~~~

### Compilation {#compilation .sectionedit6}

~~~
wget http://prdownloads.sourceforge.net/sourceforge/nagiosplug/nagios-plugins-1.4.15.tar.gz
tar -xzf nagios-plugins-1.4.15.tar.gz
cd nagios-plugins-1.4.15/
./configure --with-nagios-user=nagios --with-nagios-group=nagios --enable-libtap --enable-extra-opts --enable-perl-modules
make
make install
~~~