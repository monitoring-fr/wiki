---
layout: page
---

[[[Installation d'Icinga sur
Ubuntu](icinga-ubuntu-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Présentation](start.html "icinga:start") » [Installation d'Icinga sur
Ubuntu](icinga-ubuntu-install.html "icinga:icinga-ubuntu-install")

### Table des matières {.toggle}

-   [Installation d'Icinga sur
    Ubuntu](icinga-ubuntu-install.html#installation-d-icinga-sur-ubuntu)
    -   [Installation depuis les
        sources](icinga-ubuntu-install.html#installation-depuis-les-sources)
        -   [Pré-requis](icinga-ubuntu-install.html#pre-requis)
        -   [Installation](icinga-ubuntu-install.html#installation)

Installation d'Icinga sur Ubuntu {#installation-d-icinga-sur-ubuntu .sectionedit1}
================================

Tutoriel rédigé pour une version Ubuntu 10.10 et Icinga 1.3.0.

Dans ce tutoriel, l’installation d’Icinga 1.3.0 depuis les sources sera
abordé.. Cette méthode d’installation recommande une certaine maîtrise
de l’utilisation du système Ubuntu, mais permet notamment de
personnaliser l’installation d’Icinga selon ses préférences/besoins, et
surtout de disposer de la version la plus récente d’Icinga.

Ce tutoriel a été réalisé par :

  **Rôle**        **Nom**
  --------------- ----------------
  **Rédacteur**   Charles JUDITH

Installation depuis les sources {#installation-depuis-les-sources .sectionedit3}
-------------------------------

### Pré-requis {#pre-requis .sectionedit4}

Installation des dépendances requises à la mise en place d’Icinga :

~~~
$ sudo apt-get install apache2 build-essential libgd2-xpm-dev
$ sudo apt-get install libjpeg62 libjpeg62-dev libpng12-0 libpng12-dev
$ sudo apt-get install snmp libsnmp5-dev
$ sudo apt-get install git 
~~~

#### Création d’un utilisateur icinga {#creation-d-un-utilisateur-icinga}

L’utilisateur icinga sert à exécuter les composants Icinga (démons),
sans avoir recours à un utilisateur avec des privilèges (root,
sudo-users).

**Rappel :** l’utilisateur icinga ne doit pas être un super-utilisateur
(sudo-user).

~~~
$ sudo groupadd -g 6000 icinga
$ sudo useradd -u 6000 -g icinga -d /usr/local/icinga -c "Icinga User" icinga
$ sudo passwd icinga
$ sudo groupadd icinga-cmd
$ sudo usermod -a -G icinga-cmd icinga
$ sudo usermod -a -G icinga-cmd www-data
~~~

### Installation {#installation .sectionedit5}

#### Téléchargement d'Icinga et des Plugins {#telechargement-d-icinga-et-des-plugins}

Téléchargement de Nagios::Plugins:

~~~
$ cd /usr/src
$ wget http://downloads.sourceforge.net/project/nagiosplug/nagiosplug/1.4.15/nagios-plugins-1.4.15.tar.gz
$ sudo tar -zxvf nagios-plugins-1.4.15.tar.gz
$ cd nagios-plugins-1.4.15
$ sudo ./configure --prefix=/usr/local/icinga --with-cgiurl=/icinga/cgi-bin \
--with-htmurl=/icinga --with-nagios-user=icinga --with-nagios-group=icinga
$ sudo make all
$ sudo make install
~~~

Téléchargement d’Icinga:

~~~
$ sudo git clone git://git.icinga.org/icinga-core.git
$ wget http://downloads.sourceforge.net/project/icinga/icinga/1.3.0/icinga-1.3.0.tar.gz
$ tar -zxvf icinga-1.3.0.tar.gz
$ cd icinga-1.3.0
~~~

Compilation d’Icinga:

~~~
$ sudo ./configure --with-command-group=icinga-cmd
$ sudo make all
$ sudo make install
$ sudo make install-init
$ sudo make install-config
$ sudo make install-commandmode
$ sudo make fullinstall
$ sudo make install-config
$ sudo make cgis
$ sudo make install-cgis
$ sudo make install-html
$ sudo make install-webconf
~~~

Création du mot de passe de la console web pour l’utilisateur
icingaadmin.

~~~
$ sudo htpasswd -c /usr/local/icinga/etc/htpasswd.users icingaadmin
~~~

#### Finalisation de l'installation {#finalisation-de-l-installation}

Redémarrage ou reload d’apache afin qu’il relise son fichier de
configuration:

~~~
$ sudo /etc/init.d/apache2 restart
ou
$ sudo /etc/init.d/apache2 reload
~~~

Activation d’icinga au démarrage de la machine:

~~~
$ sudo update-rc.d icinga defaults
~~~

Verification de la configuration d’icinga:

~~~
$ sudo /usr/local/icinga/bin/icinga -v /usr/local/icinga/etc/icinga.cfg
ou
$ sudo /etc/init.d/icinga show-errors
~~~

Si tout est correct, vous pouvez lancer Icinga, au sinon vous devez
corriger l’erreur dans vos fichiers de configuration.

Démarrage d’icinga:

~~~
$ sudo /etc/init.d/icinga start
~~~

#### Installation terminée {#installation-terminee}

Vous pouvez dès à present vous connecter a la console web d’icinga avec
votre navigateur:

<http://adresse_ip_de_votre_serveur/icinga>”

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../groundwork/start.html "groundwork:start")
-   [Zenoss](../zenoss/start.html "zenoss:start")
-   [Vigilo](../vigilo/start.html "vigilo:start")
-   [Icinga](start.html "icinga:start")
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

-   [Afficher le texte
    source](icinga-ubuntu-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](icinga-ubuntu-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](icinga-ubuntu-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](icinga-ubuntu-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](icinga-ubuntu-install@do=media.html "Gestionnaire de médias")
-   [Index](icinga-ubuntu-install@do=index.html "Index [X]")
-   [Connexion](icinga-ubuntu-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](icinga-ubuntu-install.html#dokuwiki__top "Haut de page [T]")

icinga/icinga-ubuntu-install.txt · Dernière modification: 2013/03/29
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

![](../lib/exe/indexer.php@id=icinga%253Aicinga-ubuntu-install&1424859834)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
