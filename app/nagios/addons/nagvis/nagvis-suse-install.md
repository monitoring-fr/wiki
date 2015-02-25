---
layout: page
---

[[[Installation NagVis sur SLES
10](nagvis-suse-install@do=backlink.html)]]

[wiki monitoring-fr.org](../../../start.html "[ALT+H]")

![Logo Monitoring](../../../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../../../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../../../start.html "start") »
[Nagios](../../start.html "nagios:start") » [Nagios
Addons](../start.html "nagios:addons:start") »
[NagVis](start.html "nagios:addons:nagvis:start") » [Installation NagVis
sur SLES
10](nagvis-suse-install.html "nagios:addons:nagvis:nagvis-suse-install")

### Table des matières {.toggle}

-   [Installation NagVis sur SLES
    10](nagvis-suse-install.html#installation-nagvis-sur-sles-10)
    -   [Pré-Requis](nagvis-suse-install.html#pre-requis)
        -   [Vérification](nagvis-suse-install.html#verification)
        -   [Compilation
            packages](nagvis-suse-install.html#compilation-packages)
    -   [Installation](nagvis-suse-install.html#installation)
    -   [Paramétrage
        Apache](nagvis-suse-install.html#parametrage-apache)
    -   [Paramétrage de
        NagVis](nagvis-suse-install.html#parametrage-de-nagvis)

Cette documentation n’est plus à jour

Installation NagVis sur SLES 10 {#installation-nagvis-sur-sles-10 .sectionedit1}
===============================

[![](../../../assets/media/addons/nagvis/suse.png@w=200)](../../../_detail/addons/nagvis/suse.png@id=nagios%253Aaddons%253Anagvis%253Anagvis-suse-install.html "addons:nagvis:suse.png")
[![](../../../assets/media/addons/addons/nagvis/nagvis.png@w=200)](../../../_detail/addons/addons/nagvis/nagvis.png@id=nagios%253Aaddons%253Anagvis%253Anagvis-suse-install.html "addons:addons:nagvis:nagvis.png")

Pré-Requis {#pre-requis .sectionedit2}
----------

Pour l’installation de NagVis, nous allons avoir besoin de :

-   apache2
-   libapache2-mod-php5
-   php5-gd
-   php5-mysql
-   php5-json
-   php5-sockets
-   graphviz

### Vérification {#verification .sectionedit3}

Nous allons vérifier si certains de nos dépendances ne sont pas déjà
installées.

~~~~ {.code .bash}
rpm -qa | grep php5*
 
 
php5-timezonedb-2008.2-0.3
php5-mbstring-5.2.5-9.5
php5-pdo-5.2.5-9.5
php5-gettext-5.2.5-9.5
php5-5.2.5-9.5
php5-devel-5.2.5-9.5
php5-ldap-5.2.5-9.5
php5-zlib-5.2.5-9.5
php5-gd-5.2.5-9.5
php5-mysql-5.2.5-9.5
apache2-mod_php5-5.2.5-9.5
php5-openssl-5.2.5-9.5
php5-pear-5.2.5-9.5
php5-posix-5.2.5-9.5
~~~~

### Compilation packages {#compilation-packages .sectionedit4}

-   **Compilation de Expat**

Nous allons d’abord aborder la compilation de expat-2.0.1 qui est un
pré-requis pour GraphViz, car la version que nous avons récupéré n’est
pas compatible avec celle installé par défaut
(expat-2.0.0-13.2.x86\_64.rpm)

~~~~ {.code .bash}
cd /tmp
wget http://switch.dl.sourceforge.net/project/expat/expat/2.0.1/expat-2.0.1.tar.gz
tar -xvzf expat-2.0.1.tar.gz
cd expat-2.0.1
~~~~

~~~~ {.code .bash}
./configure
~~~~

~~~~ {.code .bash}
make
~~~~

~~~~ {.code .bash}
make install
~~~~

-   **Compilation de GraphViz**

Nous vérifions si graphviz n’est pas déjà présent sur notre système.

~~~~ {.code .bash}
rpm -qa | graphviz*
~~~~

Graphviz a besoin de dépendances pour pouvoir être compilé. Voici
l’arbre de ces dépendances.

[![](../../../assets/media/powered/centreon/graphviz.png)](../../../_detail/powered/centreon/graphviz.png@id=nagios%253Aaddons%253Anagvis%253Anagvis-suse-install.html "powered:centreon:graphviz.png")

#### Installation des dépendances {#installation-des-dependances}

~~~~ {.code .bash}
yum install freetype2-devel fontconfig-devel xorg-x11-devel libpng-devel Mesa-devel pkgconfig glib2-devel glitz-devel cairo-devel php5-sockets php5-json
~~~~

Nous allons devoir installer GraphViz à la main sur notre SLES 10 vu
qu’il est recommandé une version supérieur à la 2.14.

~~~~ {.code .bash}
cd /tmp
tar -xvzf graphviz-2.26.3.tar.gz
cd graphviz-2.26.3
~~~~

~~~~ {.code .bash}
./configure
~~~~

~~~~ {.code .bash}
make
~~~~

~~~~ {.code .bash}
make install
~~~~

-   **Arbres des dépendances pour NagVis**

[![](../../../assets/media/powered/centreon/nagvis.png)](../../../_detail/powered/centreon/nagvis.png@id=nagios%253Aaddons%253Anagvis%253Anagvis-suse-install.html "powered:centreon:nagvis.png")

Installation {#installation .sectionedit5}
------------

-   **Les dépendances doivent être résolu**

-   **L’installation du Broker Module MKLiveStatus doit être installé.**

Nous allons tout d’abord décompresser l’archive de NagVis dans /tmp pour
pouvoir procéder à notre installation.

~~~~ {.code .bash}
cd /tmp
wget http://freefr.dl.sourceforge.net/project/nagvis/NagVis%201.4%20%28stable%29/nagvis-1.4.7.tar.gz
tar xvzf nagvis-1.4*.tar.gz
cd nagvis-1.4*
~~~~

Par mesure de sécurité, nous allons appliquer les droits d’exécution à
l’installeur si ce n’est pas déjà fait.

~~~~ {.code .bash}
chmod +x install.sh
~~~~

Lancer Installation

~~~~ {.code .bash}
./install.sh -n /usr/local/nagios/ -p /usr/local/nagvis -u wwwrun -g www
~~~~

Paramétrage Apache {#parametrage-apache .sectionedit6}
------------------

Créer un fichier nagvis.conf dans /etc/apache2/conf.d et y mettre le
contenu ci-dessous :

~~~~ {.code .bash}
cd /etc/apache2/conf.d
vi nagvis.conf
~~~~

~~~~ {.code}
Alias /nagvis "/applis/nagvis"

<Directory "/usr/local/nagvis">

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

Ensuite redémarrez Apache

~~~~ {.code .bash}
/etc/init.d/apache2 restart
~~~~

Maintenant NagVis est accessible via l’url suivante :
<http://SERV_CENTREON/nagvis>

En allant sur l’interface Web de NagVis, vous avez un message d’erreur
comme celui-ci :

**Error while connecting to MySQL server. Maybe wrong connection
properties in backend? MySQL-Error: Can’t connect to local MySQL server
through socket '/var/lib/mysql/mysql.sock’ (2). (Backend-ID: ndomy\_1)**

Normal, notre nagvis n’est pas encore paramétré à notre layout.

Paramétrage de NagVis {#parametrage-de-nagvis .sectionedit7}
---------------------

Tout d’abord, allez dans /usr/local/nagvis/etc/ et éditez le fichier
nagvis.ini.php

~~~~ {.code .bash}
cd /applis/nagvis/etc
vi nagvis.ini.php
~~~~

Modifiez les variables suivantes et retirer les ;

~~~~ {.code}
language="fr_FR"
refreshtime=60
base="/usr/local/nagvis/"
htmlbase="/nagvis"
backend="live_1"
backendtype="mklivestatus"
socket="unix:/usr/local/nagios/var/rw/live"
~~~~

Ensuite redémarrez Apache

~~~~ {.code .bash}
/etc/init.d/apache2 restart
~~~~

Lancez un navigateur Web, et allez sur votre Serveur Centreon à l’url
suivante :
[http://IP\_SERV\_NAGIOS/nagvis/nagvis/index.php](http://IP_SERV_NAGIOS/nagvis/nagvis/index.php "http://IP_SERV_NAGIOS/nagvis/nagvis/index.php")

[![](../../../assets/media/addons/nagvis/nagvis-vue-generale.png@w=700)](../../../_detail/addons/nagvis/nagvis-vue-generale.png@id=nagios%253Aaddons%253Anagvis%253Anagvis-suse-install.html "addons:nagvis:nagvis-vue-generale.png")

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../../../start.html "start")**

**[Supervision](../../../supervision/start.html "supervision:start")**

-   [Nagios](../../start.html "nagios:start")
-   [Centreon](../../../centreon/start.html "centreon:start")
-   [Shinken](../../../shinken/start.html "shinken:start")
-   [Zabbix](../../../zabbix/start.html "zabbix:start")
-   [OpenNMS](../../../opennms/start.html "opennms:start")
-   [EyesOfNetwork](../../../eyesofnetwork/start.html "eyesofnetwork:start")
-   [Groundwork](../../../groundwork/start.html "groundwork:start")
-   [Zenoss](../../../zenoss/start.html "zenoss:start")
-   [Vigilo](../../../vigilo/start.html "vigilo:start")
-   [Icinga](../../../icinga/start.html "icinga:start")
-   [Cacti](../../../cacti/start.html "cacti:start")
-   [Ressenti
    utilisateur](../../../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../../../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../../../hypervision/start.html "hypervision:start")**

-   [Canopsis](../../../canopsis/start.html "canopsis:start")

**[Sécurité](../../../securite/start.html "securite:start")**

**[Infrastructure](../../../infra/start.html "infra:start")**

**[Développement](../../../dev/start.html "dev:start")**

Nagios Addons {#nagios-addons .sectionedit1}
-------------

-   [Lilac
    Platform](../lilac-platform.html "nagios:addons:lilac-platform")
-   [Merlin](../../../addons/merlin.html "nagios:addons:merlin")
-   [NConf](../nconf.html "nagios:addons:nconf")
-   [NDOUtils](../ndoutils.html "nagios:addons:ndoutils")
-   [NSClient++](../nsclient.html "nagios:addons:nsclient")
-   [NagTrap](../../../addons/nagtrap.html "nagios:addons:nagtrap")
-   [NagVis](start.html "nagios:addons:nagvis:start")
-   [Nagios Business Process
    Addon](../nagios-business-process-addons.html "nagios:addons:nagios-business-process-addons")
-   [NagiosDigger](../nagiosdigger.html "nagios:addons:nagiosdigger")
-   [NagiosGrapher](../nagiosgrapher.html "nagios:addons:nagiosgrapher")
-   [NagiosQL](../nagiosql.html "nagios:addons:nagiosql")
-   [Netways Grapher
    V2](../netways-grapher-v2.html "nagios:addons:netways-grapher-v2")
-   [Ninja](../ninja.html "nagios:addons:ninja")
-   [PNP4Nagios](../pnp/start.html "nagios:addons:pnp:start")
-   [Protocole NRPE](../nrpe.html "nagios:addons:nrpe")
-   [Protocole NSCA](../nsca.html "nagios:addons:nsca")
-   [Setup distribué avec
    Mod\_Gearman](../mod_gearman.html "nagios:addons:mod_gearman")
-   [Vautour Style](../vautour-style.html "nagios:addons:vautour-style")
-   [check\_mk](../check_mk/start.html "nagios:addons:check_mk:start")
-   [omd Open Monitoring Distribution](../omd.html "nagios:addons:omd")

-   [Afficher le texte
    source](nagvis-suse-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](nagvis-suse-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](nagvis-suse-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](nagvis-suse-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](nagvis-suse-install@do=media.html "Gestionnaire de médias")
-   [Index](nagvis-suse-install@do=index.html "Index [X]")
-   [Connexion](nagvis-suse-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](nagvis-suse-install.html#dokuwiki__top "Haut de page [T]")

nagios/addons/nagvis/nagvis-suse-install.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

[![CC Attribution-Noncommercial-Share Alike 3.0
Unported](../../../lib/images/license/button/cc-by-nc-sa.png)](http://creativecommons.org/licenses/by-nc-sa/3.0/)

[![www.chimeric.de](../../../lib/tpl/arctic/images/button-chimeric-de.png)](http://www.chimeric.de "www.chimeric.de")
[![Valid
CSS](../../../lib/tpl/arctic/images/button-css.png)](http://jigsaw.w3.org/css-validator/check/referer "Valid CSS")
[![Driven by
DokuWiki](../../../lib/tpl/arctic/images/button-dw.png)](http://wiki.splitbrain.org/wiki:dokuwiki "Driven by DokuWiki")
[![do yourself a favour and use a real browser - get
firefox!!](../../../lib/tpl/arctic/images/button-firefox.png)](http://www.firefox-browser.de "do yourself a favour and use a real browser - get firefox")
[![Recent changes RSS
feed](../../../lib/tpl/arctic/images/button-rss.png)](../../../feed.php "Recent changes RSS feed")
[![Valid XHTML
1.0](../../../lib/tpl/arctic/images/button-xhtml.png)](http://validator.w3.org/check/referer "Valid XHTML 1.0")

![](../../../lib/exe/indexer.php@id=nagios%253Aaddons%253Anagvis%253Anagvis-suse-install&1424859921)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
