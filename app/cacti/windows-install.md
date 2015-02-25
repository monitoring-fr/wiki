---
layout: page
---

[[[Installation de Cacti Windows](windows-install@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Cacti](start.html "cacti:start") » [Installation de Cacti
Windows](windows-install.html "cacti:windows-install")

### Table des matières {.toggle}

-   [Installation de Cacti
    Windows](windows-install.html#installation-de-cacti-windows)
    -   [Versions des logiciels
        utilisées](windows-install.html#versions-des-logiciels-utilisees)
    -   [Installation de
        WAMP](windows-install.html#installation-de-wamp)
    -   [Installation de
        Cygwin](windows-install.html#installation-de-cygwin)
    -   [Installation de
        Cacti](windows-install.html#installation-de-cacti)
        -   [Configuration Apache 2 pour
            Cacti](windows-install.html#configuration-apache-2-pour-cacti)
        -   [Configuration MySQL 5 pour
            Cacti](windows-install.html#configuration-mysql-5-pour-cacti)
        -   [Configuration PHP 5 pour
            Cacti](windows-install.html#configuration-php-5-pour-cacti)
        -   [Configuration
            Cacti](windows-install.html#configuration-cacti)
    -   [Crédits - Révisions](windows-install.html#credits-revisions)

Installation de Cacti Windows {#installation-de-cacti-windows .sectionedit1}
=============================

Versions des logiciels utilisées {#versions-des-logiciels-utilisees .sectionedit2}
--------------------------------

-   wamp5\_1.6.4a
-   cygwin\_1.5.21-1
-   cacti-0.8.6h + patches officiels
-   cacti-cactid-0.8.6g-cygwin-1.5.20
-   rrdtool-1.2.15-cygwin-1.5.20

Installation de WAMP {#installation-de-wamp .sectionedit3}
--------------------

WAMP est l’acronyme de Windows Apache MySQL PHP. Il permet d’installer
de façon graphique en une seule opération l’ensemble des logiciels
nécessaires à faire fonctionner cacti. Il est de plus régulièrement mis
à jour et installe des versions récentes de chacun des composants.

-   [Télécharger](http://www.wampserver.com/download.php "http://www.wampserver.com/download.php")
    la dernière version de WAMP
-   Lancer l’installeur et choisir le répertoire par défaut *c:\\wamp*
    pour l’installation.

[![setup-wamp5.jpg](../assets/media/cacti/setup-wamp5.jpg@w=500 "setup-wamp5.jpg")](../_detail/cacti/setup-wamp5.jpg@id=cacti%253Awindows-install.html "cacti:setup-wamp5.jpg")

-   Lancer wamp et [se connecter](http://localhost "http://localhost")
    sur l’interface d’administration pour tester l’installation

[![accueil\_wamp5.jpg](../assets/media/cacti/accueil_wamp5.jpg@w=500 "accueil_wamp5.jpg")](../_detail/cacti/accueil_wamp5.jpg@id=cacti%253Awindows-install.html "cacti:accueil_wamp5.jpg")

Installation de Cygwin {#installation-de-cygwin .sectionedit4}
----------------------

-   [Télécharger](http://www.cygwin.com "http://www.cygwin.com") la
    dernière version de Cygwin
-   Lancer setup.exe et choisir le répertoire par défaut *c:\\cygwin*
    pour l’installation
-   Choisissez un mirroir proche de votre lieu et sélectionner les
    paquets suivants dans l’écran de sélection

~~~~ {.code}
Base (tout)
Libs
   libart_lgpl
   libfreetype26
   libpng12
   zlib
Perl (tout)
Utils
   patch
Web
   wget
~~~~

[![cygwin-setup.jpg](../assets/media/cacti/cygwin-setup.jpg@w=500 "cygwin-setup.jpg")](../_detail/cacti/cygwin-setup.jpg@id=cacti%253Awindows-install.html "cacti:cygwin-setup.jpg")

-   Dans panneau de configuration –\> Système –\> Onglet Avancé –\>,
    ajouter *c:\\cygwin\\bin* comme variable d’environnement

[![cygwin-path.jpg](../assets/media/cacti/cygwin-path.jpg "cygwin-path.jpg")](../_detail/cacti/cygwin-path.jpg@id=cacti%253Awindows-install.html "cacti:cygwin-path.jpg")

Installation de Cacti {#installation-de-cacti .sectionedit5}
---------------------

-   [Télécharger](http://cacti.net/download_cacti.php "http://cacti.net/download_cacti.php")
    la dernière version de Cacti
-   [Télécharger](http://cacti.net/download_patches.php "http://cacti.net/download_patches.php")
    les derniers patches officiels pour cacti
-   [Télécharger](http://cacti.net/cactid_download.php "http://cacti.net/cactid_download.php")
    la dernière version de Cacti-Cactid
-   [Télécharger](http://www.cacti.net/downloads/rrdtool/win32/ "http://www.cacti.net/downloads/rrdtool/win32/")
    la dernière version de RRDTools pour Cygwin
-   Décompresser cacti.zip dans *c:\\cacti*
-   Appliquer les patches aux sources en utilisant cygwin. Les commandes
    ci-dessous sont celles pour notre version; elles peuvent différer
    suivant la version de cacti installée.

~~~~ {.code}
cd c:/cacti
wget http://www.cacti.net/downloads/patches/0.8.6h/fix_search_session_clear_issue.patch
wget http://www.cacti.net/downloads/patches/0.8.6h/fix_sql_syntax_related_to_default_rra_id.patch
wget http://www.cacti.net/downloads/patches/0.8.6h/nth_percentile_empty_return_set_issue.patch
wget http://www.cacti.net/downloads/patches/0.8.6h/mysql_5x_strict.patch
wget http://www.cacti.net/downloads/patches/0.8.6h/database_autoincrement_corruption.patch
patch -p1 -N < fix_search_session_clear_issue.patch
patch -p1 -N < fix_sql_syntax_related_to_default_rra_id.patch
patch -p1 -N < nth_percentile_empty_return_set_issue.patch
patch -p1 -N < mysql_5x_strict.patch
patch -p1 -N < database_autoincrement_corruption.patch
chmod -R 755 c:/cacti
~~~~

-   Décompresser Cacti-cactid.zip dans *c:\\cacti*
-   Décompresser RRDTools.zip dans *c:\\cacti\\rrdt*
-   Supprimer les dll présents dans ces deux répertoires puisque nous
    utilisons Cygwin.

### Configuration Apache 2 pour Cacti {#configuration-apache-2-pour-cacti .sectionedit6}

-   Editer le fichier *c:\\wamp\\Apache2\\conf\\httpd.conf* et ajouter
    en bas

~~~~ {.code}
Alias "/cacti" "c:/cacti/"
<directory "c:/cacti">
AllowOverride All
#Order allow,deny
Allow from all
</directory>
~~~~

### Configuration MySQL 5 pour Cacti {#configuration-mysql-5-pour-cacti .sectionedit7}

-   Dans un shell Cygwin, définir un mot de passe pour l’utilisateur
    root

~~~~ {.code}
cd c:/wamp/mysql/bin
mysqladmin --user=root password somepassword
mysqladmin --user=root --password reload
~~~~

-   Créer la base de données MySQL:

~~~~ {.code}
mysqladmin --user=root --password create cacti
~~~~

-   Importer la base par défaut de cacti:

~~~~ {.code}
mysql --user=root --password cacti < c:\cacti\cacti.sql
~~~~

-   Créer un utilisateur cactiuser et un mot de passe MySQL.

~~~~ {.code .sql}
mysql --user=root --password mysql
GRANT ALL ON cacti.* TO cactiuser@localhost IDENTIFIED BY 'cactipw';
FLUSH privileges;
~~~~

### Configuration PHP 5 pour Cacti {#configuration-php-5-pour-cacti .sectionedit8}

-   Editer le fichier *C:\\wamp\\Apache2\\bin\\php.ini* et décommenter,
    modifier les lignes suivantes au besoin :

~~~~ {.code .php}
extension_dir = "c:\wamp\php\ext"
extension=php_mysql.dll
extension=php_snmp.dll
extension=php_sockets.dll
cgi.force_redirect = 0
file_uploads = On
~~~~

-   Dans panneau de configuration –\> Système –\> Onglet Avancé –\>
    Variables d’environnement, éditer et/ou ajouter les variables
    d’environnement suivantes:

~~~~ {.code}
MIBS=ALL
MIBSDIR=C:\wamp\php\extras\mibs
PHPRC=c:\wamp\php
Path=c:\wamp\php;
~~~~

[![mibsdir.jpg](../assets/media/cacti/mibsdir.jpg "mibsdir.jpg")](../_detail/cacti/mibsdir.jpg@id=cacti%253Awindows-install.html "cacti:mibsdir.jpg")

Le chemin d’accès à PHP dans la variable Path est à ajouter aux valeurs
déjà définies. Les valeurs existantes sont conservées.

### Configuration Cacti {#configuration-cacti .sectionedit9}

-   Editer le fichier *c:\\cacti\\include\\config.php* et spécifier les
    paramètres de connexion à la base MySQL

~~~~ {.code .php}
$database_default = "cacti";
$database_hostname = "localhost";
$database_username = "cactiuser";
$database_password = "pwd";
~~~~

-   Se connecter à
    [Cacti](http://localhost/cacti "http://localhost/cacti") avec un
    navigateur pour terminer la configuration
-   Renseigner les chemins d’accès pour refleter l’installation
    effectuée

[![cacti-conf.jpg](../assets/media/cacti/cacti-conf.jpg "cacti-conf.jpg")](../_detail/cacti/cacti-conf.jpg@id=cacti%253Awindows-install.html "cacti:cacti-conf.jpg")

-   Dans l’interface de Cacti, aller sur Console –\> Settings –\> Paths
    et renseigner le champ RRDTool Default Font Path avec la valeur
    *c:/WINDOWS/Fonts/ARIAL.TTF*
-   Dans panneau de configuration –\> Tâches planifiées –\> Créer une
    tâche planifiée, créer une tâche s’exécutant toutes les 5 mn 24/24h
    7/7j avec la commande *C:\\wamp\\php\\php.exe c:\\cacti\\poller.php*
-   Tester cette commande dans l’invite de commandes. La sortie devrait
    ressembler à ce qui suit:

~~~~ {.code}
OK u:0.00 s:0.06 r:1.32
OK u:0.00 s:0.06 r:1.32
OK u:0.00 s:0.16 r:2.59
OK u:0.00 s:0.17 r:2.62
09/04/2006 04:57:12 PM - SYSTEM STATS: Time:4.7272 Method:cmd.php Processes:1 Threads:N/A Hosts:1 HostsPerProcess:2 DataSources:4 RRDsProcessed:2
~~~~

Cacti est désormais prêt à fonctionner
![:-P](../lib/images/smileys/icon_razz.gif)

Crédits - Révisions {#credits-revisions .sectionedit10}
-------------------

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
-   [Icinga](../icinga/start.html "icinga:start")
-   [Cacti](start.html "cacti:start")
-   [Ressenti
    utilisateur](../supervision/eue/start.html "supervision:eue:start")
-   [Ressenti utilisateur avec
    sikuli](../sikuli/eue/start.html "sikuli:eue:start")

**[Hypervision](../hypervision/start.html "hypervision:start")**

-   [Canopsis](../canopsis/start.html "canopsis:start")

**[Sécurité](../securite/start.html "securite:start")**

**[Infrastructure](../infra/start.html "infra:start")**

**[Développement](../dev/start.html "dev:start")**

Cacti {#cacti .sectionedit1}
-----

-   [Configuration de Cacti](configuration.html "cacti:configuration")
-   [Installation Cacti sur RedHat
    9](redhat-install.html "cacti:redhat-install")
-   [Installation de Cacti
    Windows](windows-install.html "cacti:windows-install")
-   [Installation de Cacti sur
    Ubuntu](ubuntu-install.html "cacti:ubuntu-install")

-   [Afficher le texte
    source](windows-install@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](windows-install@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](windows-install@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](windows-install@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](windows-install@do=media.html "Gestionnaire de médias")
-   [Index](windows-install@do=index.html "Index [X]")
-   [Connexion](windows-install@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](windows-install.html#dokuwiki__top "Haut de page [T]")

cacti/windows-install.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=cacti%253Awindows-install&1424859533)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
