---
layout: page
---

[[[Configuration et
lancement](shinken-architecture-config@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[Shinken](start.html "shinken:start") » [Configuration et
lancement](shinken-architecture-config.html "shinken:shinken-architecture-config")

### Table des matières {.toggle}

-   [Configuration et
    lancement](shinken-architecture-config.html#configuration-et-lancement)
    -   [Les modules
        disponibles](shinken-architecture-config.html#les-modules-disponibles)
        -   [ndodb\_mysql](shinken-architecture-config.html#ndodb_mysql)
        -   [ndodb\_oracle](shinken-architecture-config.html#ndodb_oracle)
        -   [merlindb](shinken-architecture-config.html#merlindb)
        -   [CouchDB](shinken-architecture-config.html#couchdb)
        -   [service\_perfdata](shinken-architecture-config.html#service_perfdata)
        -   [host\_perfdata](shinken-architecture-config.html#host_perfdata)
        -   [Live Status](shinken-architecture-config.html#live-status)
        -   [Simple-log](shinken-architecture-config.html#simple-log)
        -   [Syslog](shinken-architecture-config.html#syslog)
        -   [Status.dat](shinken-architecture-config.html#statusdat)
        -   [NPCD](shinken-architecture-config.html#npcd)
        -   [Modules de
            Rétention](shinken-architecture-config.html#modules-de-retention)
        -   [CommandFile](shinken-architecture-config.html#commandfile)
    -   [Exemple de
        configuration](shinken-architecture-config.html#exemple-de-configuration)
    -   [Exécution de Shinken avec les fichiers de
        configuration](shinken-architecture-config.html#execution-de-shinken-avec-les-fichiers-de-configuration)

Configuration et lancement {#configuration-et-lancement .sectionedit1}
==========================

Les modules disponibles {#les-modules-disponibles .sectionedit2}
-----------------------

L’architecture de Shinken se veut beaucoup plus modulaire. Nombreux sont
les paramètres présents dans nagios.cfg de Nagios qui sont passés sous
des modules. Et tout ceci pour nous simplifier la vie!! :) La
configuration sera simple pour une personne qui utilise déjà Nagios :
c’est la même, mais avec quelques petits ajouts pour nos différents
éléments. Un exemple de configuration est déjà disponible dans le path
d’installation. Le fichier définissant les éléments de l’architecture
est shinken-specific.cfg. Comme ça vous pouvez garder votre générateur
de configuration de style Centreon tout en utilisant Shinken avec une
architecture distribuée. Magique.

Les différents éléments sont définis suivant un modèle commun :

-   \*\_name : nom de l’élément
-   address : adresse réseau où on peut le trouver
-   port : à votre avis?
-   [spare] : 1 ou 0, est un spare ou non.
-   [realm] : nom du realm auquel est associé l’élément. Sera approfondi
    dans une partie suivante.
-   [manage\_sub\_realms] : gère ou non les sous-realms. Sera approfondi
    dans une partie suivante.
-   [modules] : liste des modules qui seront chargés par le satellite.
    Pour l’instant, seul les Broker en ont.

Certains éléments possèdent des options particulières :

-   host\_name : nom du serveur (donné par hostname par exemple) utilisé
    par l’Arbiter pour savoir où il fonctionne. Sera expliqué dans la
    partie haute disponibilité.
-   poller\_tags : “tags” pris en compte par le poller. Sera expliqué
    dans la partie architecture mixe.

Les modules ont comme propriétés :

-   module\_name : nom du module utilisé dans la configuration des
    satellites
-   module\_type : type du module chargé. Cette valeur est spécifique à
    chaque fichier module chargé.
-   [Autres options] : l’administrateur peut placer les
    paramètres/valeurs qu’il souhaite. Elles seront fournies au module
    lors de son initialisation.

Ci dessous une liste non exhaustive des modules, ainsi que leur
paramètres.

### ndodb\_mysql {#ndodb_mysql .sectionedit3}

Chargé par le Broker. Export en base Ndo sous Mysql. Nécessite le module
Python MySQLdb (apt-get install python-mysqldb).

Prends les paramètres :

-   module\_name : nom donné au module pour l’appeler dans le Broker
-   module\_type : fixe à ndodb\_mysql
-   database : database name (ex ndo)
-   user : user de base utilisé (ex root … mais non, faut pas utiliser
    root voyons!)
-   password : pass du compte (ex : root … ah bah bravo, ça c’est du mot
    de passe sécure…)
-   host : host de la base (bien souvent localhost)
-   character\_set utf8
-   nagios\_mix\_offset : Si l’on désire faire écrire dans la même base
    Shinken avec Nagios / Icigna.

### ndodb\_oracle {#ndodb_oracle .sectionedit4}

Chargé par le Broker. Export en base Ndo sous Oracle. Nécessite un
client Oracle sur le serveur et que le répertoire ORACLE\_HOME/lib soit
dans le ld.config.cfg (ou bien alors que le daemon broker soit lancé
avec LD\_LIBRARY\_PATH qui pointe vers ce même répertoire). Il demande
également le module Python Cx\_Oracle disponible sur
[http://cx-oracle.sourceforge.net/](http://cx-oracle.sourceforge.net/ "http://cx-oracle.sourceforge.net/").
Ah oui, ceci nécessite bien sûr une base Oracle avec le schémas de base
déjà inséré (cf icinga pour le fichier oracle.sql).

Il prends en compte les paramètres suivants :

-   module\_name : nom donné au module pour l’appeler dans le Broker
-   module\_type : fixe à ndodb\_oracle
-   database : nom de la base (ex: XE)
-   user : user de base (ex: system)
-   password : A votre avis?
-   oracle\_home : optionnel. Sert à setter la variable d’environnement
    ORACLE\_HOME, ceci évite de modifier le .bashrc du compte qui lance
    le broker.

### merlindb {#merlindb .sectionedit5}

Chargé par le Broker. Export en base Merlin sous Mysql ou sqlite.
Nécessite le module Python MySQLdb ou Sqlite. (apt-get install
python-mysqldb).

-   module\_name : nom donné au module pour l’appeler dans le Broker
-   module\_type : fixe à merlindb
-   backend : mysql ou sqlite suivant ce que vous voulez utiliser
-   database : pour Mysql, nom de la base
-   user : utilisateur pour mysql
-   password : password pour mysql
-   host : hôte du serveur mysql, généralement localhost
-   character\_set : jeu de caractère, habituellement utf8
-   database\_path : pour sqlite, chemin complet vers la base sqlite

### CouchDB {#couchdb .sectionedit6}

Chargé par le Broker. Export dans une base CouchDB (ouai, ultra utile :)
)

-   module\_name : nom donné au module pour l’appeler dans le Broker
-   module\_type : couchdb
-   user : utilisateur pour la connexion couchdb
-   password : mot de passe
-   host : adresse du serveur couchdb

### service\_perfdata {#service_perfdata .sectionedit7}

Chargé par le Broker. Export des informations de perfdata des services.
Prends le paramètre :

-   module\_name : nom donné au module pour l’appeler dans le Broker
-   module\_type : service\_perfdata
-   path : chemin vers le fichier service-perfdata souhaité
-   mode : optionnel. a = append, w = overwrite, p =pipe
-   template : pour indiquer la forme des lignes dans le ficher perfdata

exemple :
\$LASTSERVICECHECK\$\\t\$HOSTNAME\$\\t\$SERVICEDESC\$\\t\$SERVICEOUTPUT\$\\t\$SERVICEPERFDATA\$\\t\$SERVICESTATE\$\\n

### host\_perfdata {#host_perfdata .sectionedit8}

Chargé par le Broker. Export des informations de perfdata des hôtes.
Prends le paramètre :

-   module\_name : nom donné au module pour l’appeler dans le Broker
-   module\_type : host\_perfdata
-   path : chemin vers le fichier host-perfdata souhaité
-   mode : optionnel. a = append, w = overwrite, p =pipe
-   template : pour indiquer la forme des lignes dans le ficher perfdata

exemple :
\$LASTHOSTCHECK\$\\t\$HOSTNAME\$\\t\$HOSTOUTPUT\$\\t\$HOSTSTATE\$\\t\$HOSTPERFDATA\$\\n

### Live Status {#live-status .sectionedit9}

Chargé par le Broker. Présentation des données comme le module
Livestatus de Nagios

-   module\_name : nom donné au module pour l’appeler dans le Broker
-   module\_type : livestatus
-   host : adresse d’acoute pour le port, \* signifie toute les IP du
    serveur
-   port 50000
-   debug\_queries : A utiliser que si l’on a des problèmes. Le fichier
    créé sera /tmp/ls.debug. Attention : Verbeux.

### Simple-log {#simple-log .sectionedit10}

Chargé par le Broker. Module permettant d’avoir tout les logs dans le
même fichier. (Sauf si on lance le mode debug)

-   module\_name : Simple-log
-   module\_type : simple\_log
-   path : nagios.log . Chemin absolu ou relatif. Le nom peut être autre
    chose que nagios.log
-   archive\_path archives/ . Chemin absolu ou relatif. Ne pas oublier
    de créer ce dossier et donner les droits!

### Syslog {#syslog .sectionedit11}

Chargé par le Broker. Envoie tout les logs logs vers le syslog. Ne peut
pas être chargé en même temps que Simple-log

-   module\_name Syslog
-   module\_type syslog

### Status.dat {#statusdat .sectionedit12}

Chargé par le Broker. Module utilisée pour les vieilles interface
Nagios. Utile pour le nagiostats.

-   module\_name Status-Dat
-   module\_type status\_dat
-   status\_file status.dat
-   object\_cache\_file objects.cache
-   status\_update\_interval 15 ; met à jour status.dat tout les 15s

### NPCD {#npcd .sectionedit13}

A utiliser avec l’interface PNP.

-   module\_name NPCD
-   module\_type npcdmod
-   config\_file /usr/local/pnp4nagios/etc/npcd.cfg

### Modules de Rétention {#modules-de-retention .sectionedit14}

![FIXME](../lib/images/smileys/fixme.gif) : Detailler les différences

define module{

~~~~ {.code}
     module_name      PickleRetention
     module_type      pickle_retention_file_generic
     path             /tmp/retention.dat
~~~~

}

define module{

~~~~ {.code}
     module_name      PickleRetentionBroker
     module_type      pickle_retention_file_generic
     path             /tmp/retention_broker.dat
~~~~

}

define module{

~~~~ {.code}
     module_name      PickleRetentionArbiter
     module_type      pickle_retention_file_generic
     path             /tmp/retention_arbiter.dat
~~~~

}

define module{

~~~~ {.code}
     module_name      NagiosRetention
     module_type      nagios_retention_file
     path             /tmp/retention-nagios.dat
~~~~

}

define module{

~~~~ {.code}
     module_name      MemcacheRetention
     module_type      memcache_retention
     server           127.0.0.1
     port             11211
~~~~

}

define module{

~~~~ {.code}
     module_name      RedisRetention
     module_type      redis_retention
     server           127.0.0.1
~~~~

### CommandFile {#commandfile .sectionedit15}

-   module\_name CommandFile
-   module\_type named\_pipe
-   command\_file rw/nagios.cmd : Ne pas oublier de créer le dossier rw
    avec les bons droits.

Exemple de configuration {#exemple-de-configuration .sectionedit16}
------------------------

Ceci donne par exemple pour une configuration simple (sans distribuée,
ni hautement disponible) sur la machine qui se nomme serveur-maitre et
qui a comme IP 192.168.0.1. Le Broker aura deux modules : un export vers
la base Merlin, un autre pour la création d’un fichier de log unique
pour toute l’architecture (équivalent de nagios.log, mais pour tous les
daemons à la fois) :

~~~~ {.code}
define arbiter{
       arbiter_name  arbiter-1
       host_name     serveur-maitre
       address       192.168.0.1
       port          7770
       spare         0
       }

define scheduler{
       scheduler_name   scheduler-1
       address  192.168.0.1
       port 7768
       spare    0
       }

define reactionner{
       reactionner_name     reactionner-1
       address  192.168.0.1
       port 7769
       spare    0
       }

define poller{
       poller_name     poller-1
       address  192.168.0.1
       port     7771
       spare    0
}

define broker{
       broker_name  broker-1
       address  192.168.0.1
       port 7772
       spare    0
       modules  Export_Merlin,Simple-log
       }

define module{
       module_name      Export_Merlin
       module_type      merlindb
       backend          mysql
       database         merlin
       user             root
       password         root
       host             localhost
       character_set    utf8     ;optionnel, UTF-8 par défaut
}

define module{
       module_name      Simple-log
       module_type      simple_log
       path             /usr/local/shinken/src/var/shinken.log
}
~~~~

Pour être compatible Nagios, un pack (un arbiter, un scheduler, un
poller, un reactionner et un broker) est défini si l’administrateur n’en
utilise pas avec toutes les valeurs par défauts.

Les daemons utilisent une configuration locale qui est présente juste
pour définir les paramètres d’écoute et de définition de répertorie de
travail. Il est possible de démarrer un daemon sans configuration, et
dans ce cas il prendra simplement ses paramètres par défaut. Un exemple
de configuration de daemon pour le scheduler : etc/schedulerd.ini

~~~~ {.code}
$cat etc/schedulerd.ini

[daemon]
workdir=/usr/local/shinken/src/var
pidfile=%(workdir)s/schedulerd.pid
port=7768
host=0.0.0.0
user=shinken
group=shinken
idontcareaboutsecurity=0
~~~~

Cette configuration est au format Python (RFC
jenemesouviensplusdunumero). Les paramètres sont simples:

-   workdir : pwd du daemon. N’a pas trop d’importance, mais il lui en
    faut bien un.
-   pidfile : fichier pid pour retrouver le daemon. Fait ici appel au
    workdir défini ci-dessus mais ce n’est pas obligatoire.
-   port : port découte du daemon
-   host : IP de l’interface sur laquelle écouter. 0.0.0.0=Toutes les
    interfaces.
-   user : user utilisé pour le daemon
-   group : groupe utilisé pour le daemon
-   idontcareaboutsecurity : si mis à 1, c’est que vous vous fichez
    royalement de la sécurité et ce n’est qu’a cette condition que le
    user/group peut être root. (Bon au passage le daemon vous insulte
    hein, mais vous le méritez bien si vous utilisez root…)

Exécution de Shinken avec les fichiers de configuration {#execution-de-shinken-avec-les-fichiers-de-configuration .sectionedit17}
-------------------------------------------------------

Pour le lancement, ouvrez un shell sur la machine avec le user shinken.
Dans un soucis de simplicité pour commencer, ici nous allons lancer tous
les daemons sur la même machine nommée serveur-maitre.

~~~~ {.code}
cd shinken
python bin/shinken-scheduler.py -d -c etc/schedulerd.ini
python bin/shinken-poller.py -d  -c etc/pollerd.ini
python bin/shinken-reactionner.py -d  -c etc/reactionnerd.ini
python bin/shinken-broker.py -d  -c etc/brokerd.ini

#on vérifie tout d'abord la conf
python bin/shinken-arbiter.py -v -c etc/nagios.cfg -c etc/shinken-specific.cfg

#si c'est bon, on lance réellement :
python bin/shinken-arbiter.py -d -c etc/nagios.cfg -c etc/shinken-specific.cfg
~~~~

~~~~ {.code}
#Autre solution plus rapide qui lance tout les démons et vérifie la configuration
/etc/init.d/shinken start
#ou
/etc/init.d/shinken restart
~~~~

Pour lancer en debug l’un des démons, il suffit d’ajouter l’option
–debug [nom-de-fichier]. Par défaut c’est \<nomdumodule\>-debug.log

Vous pouvez alors vous ruer sur votre
[Ninja](../nagios/addons/ninja.html "nagios:addons:ninja") pour voir les
informations qui vous intéresse.

Ninja ne gère qu’un ordonnanceur à la fois, c’est pourquoi Shinken
envoie toutes les informatisons en base comme si elles provenaient de
l’instance\_id 0, mais il gère bien le multiple instance.

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
    source](shinken-architecture-config@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](shinken-architecture-config@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](shinken-architecture-config@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](shinken-architecture-config@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](shinken-architecture-config@do=media.html "Gestionnaire de médias")
-   [Index](shinken-architecture-config@do=index.html "Index [X]")
-   [Connexion](shinken-architecture-config@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de
    page](shinken-architecture-config.html#dokuwiki__top "Haut de page [T]")

shinken/shinken-architecture-config.txt · Dernière modification:
2013/03/29 09:39 (modification externe)

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

![](../lib/exe/indexer.php@id=shinken%253Ashinken-architecture-config&1424859529)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
