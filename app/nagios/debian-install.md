---
layout: page
---

[[[Installation Nagios 3 sur Debian Squeeze
6.0.3](debian-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Nagios](start.html "nagios:start") » [Installation Nagios 3 sur Debian
Squeeze 6.0.3](debian-install.html "nagios:debian-install")

### Table des matières {.toggle}

-   [Installation Nagios 3 sur Debian Squeeze
    6.0.3](debian-install.html#installation-nagios-3-sur-debian-squeeze-603)
    -   [Pré-Requis](debian-install.html#pre-requis)
    -   [Installation Nagios](debian-install.html#installation-nagios)
    -   [Installation
        Nagios-Plugins](debian-install.html#installation-nagios-plugins)
        -   [Librairies
            complémentaires](debian-install.html#librairies-complementaires)
        -   [Compilation](debian-install.html#compilation)

Installation Nagios 3 sur Debian Squeeze 6.0.3 {#installation-nagios-3-sur-debian-squeeze-603 .sectionedit1}
==============================================

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
    source](debian-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](debian-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](debian-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](debian-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](debian-install@do=media.html "Gestionnaire de médias")
-   [Index](debian-install@do=index.html "Index [X]")
-   [Connexion](debian-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](debian-install.html#dokuwiki__top "Haut de page [T]")

nagios/debian-install.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=nagios%253Adebian-install&1424859525)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
