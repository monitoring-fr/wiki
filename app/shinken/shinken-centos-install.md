---
layout: page
---

[[[Installation de Shinken sur
CentOS](shinken-centos-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Shinken](start.html "shinken:start") » [Installation de Shinken sur
CentOS](shinken-centos-install.html "shinken:shinken-centos-install")

### Table des matières {.toggle}

-   [Installation de Shinken sur
    CentOS](shinken-centos-install.html#installation-de-shinken-sur-centos)
    -   -   [TÉLÉCHARGEMENT DES
            SOURCES](shinken-centos-install.html#telechargement-des-sources)
        -   [INSTALLATION DES
            PREREQUIS](shinken-centos-install.html#installation-des-prerequis)
        -   [AJOUT DE L'UTILISATEUR &
            GROUPE](shinken-centos-install.html#ajout-de-l-utilisateur-groupe)
        -   [CONFIGURATION AVANT
            INSTALLATION](shinken-centos-install.html#configuration-avant-installation)
        -   [INSTALLATION DE
            SHINKEN](shinken-centos-install.html#installation-de-shinken)
        -   [INSTALLATION
            PLUGINS](shinken-centos-install.html#installation-plugins)
        -   [TEST DE LANCEMENT / FONCTIONNEMENT
            SHINKEN](shinken-centos-install.html#test-de-lancementfonctionnement-shinken)
        -   [INSTALLATION DE L'INTERFACE WEB
            THRUK](shinken-centos-install.html#installation-de-l-interface-web-thruk)

Installation de Shinken sur CentOS {#installation-de-shinken-sur-centos .sectionedit1}
==================================

Voici la procédure pour mettre en place un serveur de supervision
Shinken sur CentOS (avec LiveStatus et Thruk).

**Cette page a été rédigée par :**

  **Rôle**        **Nom**
  --------------- -----------------
  **Rédacteur**   Thibaut LAGORCE
  **Rédacteur**   Jean Gabès

### TÉLÉCHARGEMENT DES SOURCES {#telechargement-des-sources .sectionedit3}

~~~~ {.code}
wget http://shinken-monitoring.org/pub/shinken-0.5.1.tar.gz
tar zxvf shinken-0.5.1.tar.gz
~~~~

### INSTALLATION DES PREREQUIS {#installation-des-prerequis .sectionedit4}

~~~~ {.code}
yum install python-setuptools python-devel MySQL-python libffi python-simplejson python-sqlite2
~~~~

***Installation de Pyro***

~~~~ {.code}
wget http://pypi.python.org/packages/source/P/Pyro/Pyro-3.10.tar.gz
tar zxvf Pyro-3.10.tar.gz
cd Pyro-3.10
python setup.py install
~~~~

### AJOUT DE L'UTILISATEUR & GROUPE {#ajout-de-l-utilisateur-groupe .sectionedit5}

~~~~ {.code}
groupadd shinken
useradd -g shinken -G apache -d /usr/local/shinken/ shinken
passwd shinken
passwd -x -1 shinken
~~~~

### CONFIGURATION AVANT INSTALLATION {#configuration-avant-installation .sectionedit6}

~~~~ {.code}
mkdir /usr/local/shinken
chown -R shinken:shinken /usr/local/shinken/
~~~~

~~~~ {.code}
vi /images/shinken-0.5.1/setup_parameters.cfg
~~~~

~~~~ {.code}
[etc]
path=/usr/local/shinken/etc
owner=shinken
group=shinken

[var]
path=/usr/local/shinken/var
owner=shinken
group=shinken

[libexec]
path=/usr/local/shinken/libexec
owner=shinken
group=shinken
~~~~

### INSTALLATION DE SHINKEN {#installation-de-shinken .sectionedit7}

~~~~ {.code}
python setup.py install --install-scripts=/usr/local/shinken/bin
~~~~

**=⇒ Avant de lancer Shinken nous allons installer les plugins**

### INSTALLATION PLUGINS {#installation-plugins .sectionedit8}

~~~~ {.code}
wget http://sourceforge.net/projects/nagiosplug/files/nagiosplug/1.4.15/nagios-plugins-1.4.15.tar.gz
tar xvf nagios-plugins-1.4.15.tar.gz
cd nagios-plugins-1.4.15
~~~~

~~~~ {.code}
./configure --prefix=/usr/local/shinken --with-nagios-user=shinken --with-nagios-group=shinken --enable-libtap --enable-extra-opts --enable-perl-modules
make
make install
~~~~

### TEST DE LANCEMENT / FONCTIONNEMENT SHINKEN {#test-de-lancementfonctionnement-shinken .sectionedit9}

~~~~ {.code}
/etc/init.d/shinken-scheduler start
/etc/init.d/shinken-poller start
/etc/init.d/shinken-broker start
/etc/init.d/shinken-reactionner start
/etc/init.d/shinken-arbiter start
~~~~

***Vérification des LOGS :***

~~~~ {.code}
ps -fu shinken
tail -f /usr/local/shinken/var/nagios.log
~~~~

### INSTALLATION DE L'INTERFACE WEB THRUK {#installation-de-l-interface-web-thruk .sectionedit10}

~~~~ {.code}
arch=$(perl -e 'use Config; print $Config{archname}')
vers=$(perl -e 'use Config; print $Config{version}')
wget http://www.thruk.org/files/Thruk-0.82-$arch-$vers.tar.gz
tar zxf Thruk-0.82-$arch-$vers.tar.gz
cd Thruk-0.82
mkdir /usr/local/shinken/Thruk/
cp -R /images/Thruk-0.82/* /usr/local/shinken/Thruk/
chown -R shinken:shinken /usr/local/shinken/Thruk
~~~~

~~~~ {.code}
vi /usr/local/shinken/Thruk/thruk.conf
~~~~

~~~~ {.code}
<peer>
    name   = SHINKEN
    type   = livestatus
    <options>
        peer    = 127.0.0.1:50000
    </options>
</peer>
~~~~

***Lancement de thruk***

~~~~ {.code}
/usr/local/shinken/Thruk/script/thruk_server.pl
~~~~

***Accès à l’interface Thruk***

~~~~ {.code}
http://@IP_SERVEUR:3000/
~~~~

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](start.html "shinken:start")
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

Shinken {#shinken .sectionedit1}
-------

-   [Comment activer et utiliser le module
    livestatus](enable_livestatus_module.html "shinken:enable_livestatus_module")
-   [Configuration et
    lancement](shinken-architecture-config.html "shinken:shinken-architecture-config")
-   [Fonctionnement de
    Shinken](shinken-work.html "shinken:shinken-work")
-   [Instalation de shinken les yeux
    fermés](shinken-10min-start.html "shinken:shinken-10min-start")
-   [Installation Shinken 0.8 sur Debian
    Squeeze](shinken-debian-squeeze-install.html "shinken:shinken-debian-squeeze-install")
-   [Installation de Shinken par
    script](install-script.html "shinken:install-script")
-   [Installation de Shinken sur
    CentOS](shinken-centos-install.html "shinken:shinken-centos-install")
-   [Installation de Shinken sur Debian
    Lenny](shinken-debian-install.html "shinken:shinken-debian-install")
-   [Installation de Shinken sur Ubuntu
    server](shinken-ubuntu-install-with-nagios.html "shinken:shinken-ubuntu-install-with-nagios")
-   [Installation de Shinken sur Ubuntu server 10.04
    LTS](shinken-ubuntu-install.html "shinken:shinken-ubuntu-install")
-   [Interface Shinken](shinken-use-ui.html "shinken:shinken-use-ui")
-   [Introduction à
    Shinken](shinken-introduction.html "shinken:shinken-introduction")
-   [Les architectures avancées de
    Shinken](shinken-advanced-architecture.html "shinken:shinken-advanced-architecture")
-   [Ressources et Performances de
    Shinken](shinken-ressources.html "shinken:shinken-ressources")
-   [Shinken en haute disponiblité sur 2
    noeuds](shinken-ha-2noeuds.html "shinken:shinken-ha-2noeuds")

-   [Afficher le texte
    source](shinken-centos-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](shinken-centos-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](shinken-centos-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](shinken-centos-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](shinken-centos-install@do=media.html "Gestionnaire de médias")
-   [Index](shinken-centos-install@do=index.html "Index [X]")
-   [Connexion](shinken-centos-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](shinken-centos-install.html#dokuwiki__top "Haut de page [T]")

shinken/shinken-centos-install.txt · Dernière modification: 2013/03/29
09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=shinken%253Ashinken-centos-install&1424859529)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
