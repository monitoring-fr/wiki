---
layout: page
---

[[[NagiosDigger](nagiosdigger@do=backlink.html)]]

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
[NagiosDigger](nagiosdigger.html "nagios:addons:nagiosdigger")

### Table des matières {.toggle}

-   [NagiosDigger](nagiosdigger.html#nagiosdigger)
    -   [Pré-requis](nagiosdigger.html#pre-requis)
    -   [Installation](nagiosdigger.html#installation)
    -   [Configuration](nagiosdigger.html#configuration)
        -   [Configuration
            apache](nagiosdigger.html#configuration-apache)
        -   [Configuration de la base
            Mysql](nagiosdigger.html#configuration-de-la-base-mysql)
        -   [Configuration
            NagiosDigger](nagiosdigger.html#configuration-nagiosdigger)
        -   [Configuration
            nagios](nagiosdigger.html#configuration-nagios)
    -   [Récupération des
        archives](nagiosdigger.html#recuperation-des-archives)

NagiosDigger {#nagiosdigger .sectionedit1}
============

NagiosDigger est une interface web permettant d’exploiter les différents
évènements se trouvant dans le fichier nagios.log. Vous pourrez donc
établir des statistiques et garder un historique sur de très longue
périodes.

Pré-requis {#pre-requis .sectionedit2}
----------

Pour faire fonctionner NagiosDigger, il vous faudra une base mysql et le
plugin php jpgraph.

~~~~ {.code}
sudo apt-get install libphp-jpgraph
~~~~

Installation {#installation .sectionedit3}
------------

-   **Récupération des sources**

~~~~ {.code}
wget http://www.vanheusden.com/nagiosdigger/nagiosdigger-0.9.tgz

tar -xvzf nagiosdigger-0.9.tgz

mv nagiosdigger-0.9 nagiosdigger
~~~~

Une fois les sources récupérées, nous allons copier le répertoire
NagiosDigger à un emplacement de votre serveur web. Pour notre exemple
nous déposerons ça dans /usr/local et nous nous appuierons des accès
apache de Nagios.

~~~~ {.code}
cp -R nagiosdigger/ /usr/local/
~~~~

Configuration {#configuration .sectionedit4}
-------------

### Configuration apache {#configuration-apache .sectionedit5}

Nous allons créer un fichier de configuration pour déclarer un alias au
serveur Web et un accès sécurisé.

~~~~ {.code}
cd /etc/apache2/conf.d

vi nagiosdigger.conf



Alias /nagiosdigger "/usr/local/nagiosdigger"

<Directory "/usr/local/nagiosdigger">
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

### Configuration de la base Mysql {#configuration-de-la-base-mysql .sectionedit6}

-   **Création de la base NagiosDigger :**

~~~~ {.code}
mysql -h mysqlhost -uroot -p --execute="CREATE DATABASE nagiosdigger;"
~~~~

-   **Attribution des privilèges :**

~~~~ {.code}
mysql -h mysqlhost -uroot -p --execute="GRANT INSERT,SELECT ON nagiosdigger.* TO nagiosdigger_user@localhost IDENTIFIED BY 'nagiosdigger_pw';"

mysql -h mysqlhost -uroot -p --execute="flush privileges;"
~~~~

-   **Importation du schéma de base :**

~~~~ {.code}
mysql -h mysqlhost -uroot -p nagiosdigger_db < /path/to/nagiosdigger/create_tables.sql
~~~~

### Configuration NagiosDigger {#configuration-nagiosdigger .sectionedit7}

Il faut aller modifier les 2 fichiers suivants :

Dans import\_nagios\_logging,

~~~~ {.code}
$dbi_type="mysql";              
$dbi_host="localhost";          
$dbi_user="nagiosdigger_user";                
$dbi_pass="nagiosdigger_pw";    
$dbi_name="nagiosdigger";               
$dbi_table="logs";
~~~~

Dans config.ini.php,

~~~~ {.code}
$db_hostname = 'localhost';
$db_user='nagiosdigger_user';         
$db_pass='nagiosdigger_pw';     
$db_db='nagiosdigger';
$db_table='logs';
~~~~

### Configuration nagios {#configuration-nagios .sectionedit8}

Il est impératif de modifier la méthode de rotation des logs

Dans nagios.cfg,

~~~~ {.code}
log_rotation_method=n
~~~~

Ensuite, il y a 2 méthodes possible pour importer le log nagios dans
NagiosDigger

-   **Par crontab**

J’ai plus une préférence pour celle-ci. Elle permet que nagios se
concentre sur son rôle et évite surtout une chute de performance sur les
grosses architectures.

Insérer cette commande dans votre crontab,

~~~~ {.code}
30 * * * * cat /usr/local/nagios/var/nagios.log | /usr/local/nagiosdigger/import_nagios_logging 2>&1 >> /var/log/nagiosdigger.log
~~~~

Redémarrage de la crontab,

~~~~ {.code}
/etc/init.d/cron restart
~~~~

\* **Par Eventhandler**

Dans nagios.cfg,

~~~~ {.code}
global_service_event_handler=global_service_event_handler
~~~~

Nous allons copier l’eventhandler fournit par NagiosDigger dans le
répertoire /usr/local/nagios/libexec/eventhandlers

~~~~ {.code}
cp /usr/local/nagiosdigger/global_service_event_handler /usr/local/nagios/libexec/eventhandlers
~~~~

Dans commands.cfg, Nous allons définir la commande faisant appelle à cet
eventhandler

~~~~ {.code}
define command {
          command_name    global_service_event_handler
          command_line    /usr/local/nagios/libexec/eventhandlers/global_service_event_handler "$TIMET$" "$HOSTNAME$" "$SERVICEDESC$" "$SERVICESTATE$" "$SERVICESTATETYPE$" "$SERVICEATTEMPT$" "$SERVICEOUTPUT$"
          }
~~~~

Récupération des archives {#recuperation-des-archives .sectionedit9}
-------------------------

**Pour l’importation des données archivées, lancer la commande suivante
: cat /usr/local/nagios/var/archives/\* | sort |
/path/to/import\_nagios\_logging**

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
    source](nagiosdigger@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](nagiosdigger@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](nagiosdigger@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](nagiosdigger@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](nagiosdigger@do=media.html "Gestionnaire de médias")
-   [Index](nagiosdigger@do=index.html "Index [X]")
-   [Connexion](nagiosdigger@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](nagiosdigger.html#dokuwiki__top "Haut de page [T]")

nagios/addons/nagiosdigger.txt · Dernière modification: 2013/03/29 09:39
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

![](../../lib/exe/indexer.php@id=nagios%253Aaddons%253Anagiosdigger&1424859577)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
