---
layout: page
---

[[[Optimisations possibles](optimisation@do=backlink.html)]]

[wiki monitoring-fr.org](../start.html "[ALT+H]")

![Logo Monitoring](../lib/tpl/arctic/images/logo_monitoring.png)

-   [Accueil](../index.html "Cliquez pour revenir |  l'accueil")
-   [Blog](http://www.monitoring-fr.org "Blog & News")
-   [Forums](http://forums.monitoring-fr.org "Forums")
-   [Doc](http://doc.monitoring-fr.org "Doc")
-   [Forge](https://github.com/monitoring-fr "Forge")

Vous êtes ici: [Accueil](../start.html "start") »
[OpenNMS](start.html "opennms:start") » [Optimisations
possibles](optimisation.html "opennms:optimisation")

### Table des matières {.toggle}

-   [Optimisations possibles](optimisation.html#optimisations-possibles)
    -   [1. Optimisations
        matérielles](optimisation.html#optimisations-materielles)
    -   [2. Systèmes
        d’exploitation](optimisation.html#systemes-d-exploitation)
    -   [3. JVM](optimisation.html#jvm)
    -   [4. PostgreSQL](optimisation.html#postgresql)
        -   [4.1 PostgreSQL 8.1 et
            supérieur](optimisation.html#postgresql-81-et-superieur)
        -   [4.2 PostgreSQL 8.2 et un système avec beaucoup de
            mémoire](optimisation.html#postgresql-82-et-un-systeme-avec-beaucoup-de-memoire)
        -   [4.3 Paramétrage de la variable shmmax du
            kernel](optimisation.html#parametrage-de-la-variable-shmmax-du-kernel)
    -   [5. RRDTool/JRobin](optimisation.html#rrdtooljrobin)
        -   [5.1 Paramétrages
            disque](optimisation.html#parametrages-disque)
    -   [6. Fichiers de log](optimisation.html#fichiers-de-log)
    -   [7. Capsd service discovery /
        rescan](optimisation.html#capsd-service-discoveryrescan)
    -   [8. Poller threads](optimisation.html#poller-threads)
    -   [9. Event Handling](optimisation.html#event-handling)
    -   [10. Event Archiving](optimisation.html#event-archiving)
    -   [11. Data Collection](optimisation.html#data-collection)

Optimisations possibles {#optimisations-possibles .sectionedit1}
=======================

Cette page est une traduction de la page
[http://www.opennms.org/wiki/Performance\_tuning](http://www.opennms.org/wiki/Performance_tuning "http://www.opennms.org/wiki/Performance_tuning")

1. Optimisations matérielles {#optimisations-materielles .sectionedit2}
----------------------------

La première optimisation à réaliser pour augmenter les performances de
l’application OpenNMS est de déplacer la base de données sur un serveur
dédié.

Pour cela vous pouvez utilisez
[OSE](http://www.ose-distrib.org/fr/quest-ce-que-ose.html "http://www.ose-distrib.org/fr/quest-ce-que-ose.html")
et la documentation
[suivante](http://www.ose-distrib.org/fr/documentations/41-installation/63-installation-de-opennms-et-postgresql-sur-deux-serveurs-differents.html "http://www.ose-distrib.org/fr/documentations/41-installation/63-installation-de-opennms-et-postgresql-sur-deux-serveurs-differents.html").

2. Systèmes d’exploitation {#systemes-d-exploitation .sectionedit3}
--------------------------

Les optimisations possibles concernant le système d’exploitation sont
les suivantes :

-   **Éviter** d’utiliser une **machine virtuelle** ;
-   **Ne pas placer** la base de données ou les données RRD sur un
    système de fichiers géré par **LVM** ;
-   **Ne pas placer** la base de données ou les données RRD sur un
    système de fichiers en **RAID-5** ;
-   Placer les données RRD, les fichiers de log et la base de données
    sur une partition séparée ; (Voir les détails sur les données RRD et
    la base de données PostgreSQL plus bas)
-   Utiliser un système **Linux récent** (\>= Linux 2.6) ou un système
    **Solaris récent** (\>= 10) ;
-   Utiliser l’option **noatime** pour les systèmes de fichiers
    hébergeant les données RRD, la base de données et les fichiers de
    log ;

3. JVM {#jvm .sectionedit4}
------

Les paramètres de configuration Java doivent être ajoutés au fichier
*\$OPENNMS\_HOME/etc/opennms.conf* (le créer s’il n’existe pas). Le
paramètre **JAVA\_HEAP\_SIZE** est un des plus importants. Pour le
modifier, ajoutez la ligne suivante :

~~~
JAVA_HEAP_SIZE=size_in_MBytes
~~~

La valeur par défaut est de **256**. Pour connaître la valeur de la
variable **JAVA\_HEAP\_SIZE** adéquat, taper dans votre navigateur web
la ligne suivante :

~~~
http://<adresse IP du serveur opennms>:8980/opennms/event/list?limit=250
~~~

Il y a à présent 250 évènements dans la liste des évènements.

Appuyez sur **F5** pour recharger la page et calculer le temps pour que
la page s’affiche totalement.

Répétez cette opération plusieurs fois pour obtenir une valeur moyenne
correcte. Maintenant arrêter OpenNMS, changer la valeur du paramètre
**JAVA\_HEAP\_SIZE** tel que décrit ci-dessus, redémarrez OpenNMS et
attendez environ **10 minutes** après le démarrage. Répétez les mesures
et augmentez la variable **JAVA\_HEAP\_SIZE** progressivement.

*Vous obtiendrez un tableau comme ceci :*

~~~
heap refresh time
1536 5-7 sec.
2048 3-4 sec.
3072 1-2 sec.
~~~

Surveillez la **mémoire** et le **swap** du système (par exemple avec la
commande **top**) et décider de la meilleure valeur à utiliser pour le
paramètre **JAVA\_HEAP\_SIZE**.

Pour diminuer la phase de démarrage de la **JVM**, le paramètre suivant
peut-être utilisé en complément du précédent :

~~~
ADDITIONAL_MANAGER_OPTIONS="-Xms"$JAVA_HEAP_SIZE"m
~~~

Pour afficher des informations de temps sur la gestion du garbage
collector (JVM), vous pouvez utiliser le paramètre suivant :

~~~
ADDITIONAL_MANAGER_OPTIONS="-XX:+UseParallelGC \
-verbose:gc \
-XX:+PrintGCDetails \
-XX:+PrintTenuringDistribution \
-XX:+PrintGCTimeStamps"
~~~

Le garbage collector utilisé par défaut pas OpenNMS est **incgc** (e.g.
-XX:+incgc).

*Les autres garbage collecteur disponibles sont les suivants :*

-   ConcMarkSweepGC (-XX:+UseConcMarkSweepGC) ;
-   ParallelGC (-XX:+UseParallelGC) qui sera la meilleur si vous d’un
    grand nombre de cœurs / threads.

Pour ne conserver que les paramètres de dimensionnement et non ceux
concernant la verbosité, utiliser le paramètre comme ci-dessous :

~~~
ADDITIONAL_MANAGER_OPTIONS="-Xms"$JAVA_HEAP_SIZE"m -XX:+UseParallelGC"
~~~

4. PostgreSQL {#postgresql .sectionedit5}
-------------

La valeur par défaut du paramètre **shared\_buffers** dans
postgresql.conf est extrêmement conservateur, et dans la plupart des cas
avec des serveurs modernes, ce paramètre peut être modifié ce qui
entraîne un gain de performance significatif.

Ce changement dans les fichiers de configuration de PostgreSQL doit être
en ligne avec les changements de ce paramètre dans le noyau du système.

Voir la page
[suivante](http://www.revsys.com/writings/postgresql-performance.html "http://www.revsys.com/writings/postgresql-performance.html")
pour des recommandations sur l’optimisation de PostgreSQL.

Déplacer les fichiers de logs sur une autre partition (idéalement un
autre disk/controller/channel) permet également d’améliorer les
performances.

*Pour réaliser cette opération :*

-   Arrêter OpenNMS ;
-   Arrêter PostgreSQL ;
-   cd to \$PG\_DATA ;
-   mv pg\_xlog \<autre système de fichier\> ;
-   ln -s \<autre système de fichier\>/pg\_xlog pg\_xlog ;
-   redémarrer postgresql ;

### 4.1 PostgreSQL 8.1 et supérieur {#postgresql-81-et-superieur .sectionedit6}

Les paramètres du fichier *postgresql.conf* (par défaut dans
/var/lib/pgsql) ci-dessous vont augmenter les performances de la base de
données si vous disposez d’assez de mémoire (2GB installé pour un
serveur dédié).

L’attribut **shmmax** dans le noyau du système doit également être
changé.

~~~
shared_buffers = 20000
work_mem = 16348
maintenance_work_mem = 65536
vacuum_cost_delay = 50
checkpoint_segments = 20
checkpoint_timeout = 900
wal_buffers = 64
stats_start_collector = on
stats_row_level = on
autovacuum = on
~~~

Pour les plus gros serveurs, les paramètres suivants peuvent être
ajoutés :

~~~
wal_buffers = 256
work_mem = 32768
maintenance_work_mem = 524288
~~~

### 4.2 PostgreSQL 8.2 et un système avec beaucoup de mémoire {#postgresql-82-et-un-systeme-avec-beaucoup-de-memoire .sectionedit7}

La modification du paramètre **max\_fsm\_pages** et
**max\_fsm\_releations** peut augmenter les performances de façon
importante sur les systèmes avec beaucoup de mémoire (4GB et plus).

~~~
#max_fsm_pages = 204800 # min max_fsm_relations*16, 6 bytes each
max_fsm_pages = 2048000
#max_fsm_relations = 1000 # min 100, ~70 bytes each
max_fsm_relations = 10000

work_mem = 100MB
maintenance_work_mem = 128MB
~~~

### 4.3 Paramétrage de la variable shmmax du kernel {#parametrage-de-la-variable-shmmax-du-kernel .sectionedit8}

Pour ajuster la variable **shmmax**, procédez comme suit :

-   Démarrer PostgreSQL en ligne de commande :

~~~
sudo -u postgres pg_ctl -D /var/lib/pgsql/data start
~~~

-   Le message d’erreur suivant doit s’afficher :

~~~
# FATAL:could not create shared memory segment: Invalid argument
DETAIL:Failed system call was shmget (key=5432001, size=**170639360**, 03600).
HINT: This error usually means that PostgreSQL's request for a shared memory segment exceeded your kernel's SHMMAX parameter.  
You can either reduce the request size or reconfigure the kernel with larger SHMMAX. 
 To reduce the request size (currently 170639360 bytes), reduce PostgreSQL's shared_buffers parameter (currently 20000) 
and/or its max_connections parameter (currently 100).
~~~

Repérer la taille de la variable **shmmax** nécessaire par PostgreSQL
(en gras) et utiliser la commande suivante pour modifier le paramètre
**shmmax** du kernel :

~~~
sysctl -w kernel.shmmax=170639360
~~~

Et redémarrer PostgreSQL avec la commande */etc/init.d/postgresql
start*.

Pour finir, éditez le fichier */etc/sysctl.conf* et ajouter la ligne
suivante :

~~~
kernel.shmmax=170639360
~~~

5. RRDTool/JRobin {#rrdtooljrobin .sectionedit9}
-----------------

L’écriture des données du processus collectd ainsi que celles des
résultats du polling des services (temps de réponse) produit un grand
nombre d’I/O disque. Pour réduire ce phénomène, utilisez les pages
disponibles dans la documentation d’OpenNMS suivantes :

-   [RRD performance
    fundamentals](http://www.opennms.org/wiki/RRD_performance_fundamentals "http://www.opennms.org/wiki/RRD_performance_fundamentals")
-   [RRD\_store\_by\_group\_feature](http://www.opennms.org/wiki/RRD_store_by_group_feature "http://www.opennms.org/wiki/RRD_store_by_group_feature")
-   [Queueing\_RRD](http://www.opennms.org/wiki/Queueing_RRD "http://www.opennms.org/wiki/Queueing_RRD")

### 5.1 Paramétrages disque {#parametrages-disque .sectionedit10}

Pour améliorer la performance de lecture / écriture des disques,
effectuez la séparation des données (partition logique ou partition
physique) suivante :

-   Une partition pour les fichiers de données RRD (par défaut
    /opt/opennms/share/rrd/snmp) ;
-   Une partition pour les fichiers de réponse RRD (par défaut
    /opt/opennms/share/rrd/response) ;
-   Une partition pour les fichiers de logs d’OpenNMS (par défaut
    /opt/opennms/logs ou /var/log/opennms) ;
-   Une partition pour la base de données PostgreSQL ;
-   Une partition pour les fichiers de log PostgreSQL ;

Les performances peuvent également être accrues à l’aide de systèmes de
fichier comme XFS ou à l’aide d’un système SAN (FibreChannel + Netapp,
EMC, …).

Le point le plus important est que la queue des I/O soit gérée sur un
équipement autre que celui hébergeant OpenNMS.

6. Fichiers de log {#fichiers-de-log .sectionedit11}
------------------

Par défaut dans OpenNMS le niveau des logs est défini à DEBUG.

Ceci génère un grand nombre d’**I/O** disque. Pour réduire le nombre
d’**I/O**, vous devez réduire le niveau des logs à **WARN** dans le
fichier */opt/opennms/etc/log4j.properties* et
*/opt/opennms/webapps/opennms/WEB-INF/log4j.properties*.

7. Capsd service discovery / rescan {#capsd-service-discoveryrescan .sectionedit12}
-----------------------------------

Si la découverte ou le rescan d’un équipement prend beaucoup de temps,
vous pouvez augmenter le nombre maximum de threads pour la découverte
initiale des services (**max-suspect-thread-pool-size**) et des rescans
(**max-rescan-thread-pool-size**) au début du fichier
*capsd-configuration.xml*.

Modifiez le niveau des logs du processus capsd dans *log4j.properties*
de **WARN** à **DEBUG** et repérez le nombre après le champ
**Pool-fibern** dans le fichier *capsd.log*. Si n est dans la plupart
des cas égal au nombre maximum de threads configurés, vous devez
augmenter le nombre maximum des threads.

La plupart des serveurs pourra facilement faire tourner 50 threads, voir
plus, surtout que les threads sont la plupart du temps en attente d’un
service qui ne répond pas. N’oubliez pas de repositionner le niveau des
logs à **WARN**.

Capsd va tester à chaque rescan chaque service défini dans
*capsd-configuration.xml* pour chaque interface de l’équipement. Pour
chaque service un nombre de **retry** et un **timeout** est défini.

Prenons l’exemple d’un équipement avec beaucoup d’interface (100) et
OpenNMS configuré avec le fichier de configuration par défaut de capsd
qui contient environ 30 services. Pour chaque interface OpenNMS va
tester ces 30 services et cela même si l’interface ne contient aucun
service (ICMP uniquement) ce qui va générer un nombre conséquent de
**timeout**.

*Pour avoir une estimation du temps que cela peut prendre :*

~~~
temps = nombre d’interfaces * nombre de services * ((nombre de ré-essai)+1) * (timeout/1000)
~~~

Le timeout est défini en millisecondes.

*Par exemple :*

~~~
temps = 100 [interfaces] * 30 [services] * (1 [ré-essai] +1) *(2000 [timeout en ms]/1000)
     = 12.000 secondes
     = 200 minutes
     = 3.3 heures
~~~

L’amélioration consiste à réduire la plage d’adresse IP, le nombre de
services à tester, les valeurs des timeout et retry pour utiliser des
valeurs raisonnable et qui correspondent à votre environnement.

8. Poller threads {#poller-threads .sectionedit13}
-----------------

Si vous disposez d’un serveur puissant et que vous pensez que les
pollers ne se terminent pas à temps, vous pouvez augmenter le nombre de
threads au début du fichier *poller-configuration.xml*. Pour connaître
le nombre de threads actuellement utilisés, placez le niveau des logs du
fichier *daemon/poller.log* à **DEBUG** et exécuter la commande suivante
:

~~~
$ tail -f poller.log | egrep 'PollerScheduler.*adjust:'
   ...
   2007-09-05 10:30:32,755 DEBUG [PollerScheduler-45 Pool] RunnableConsumerThreadPool$SizingFifoQueue:
       adjust: started fiber PollerScheduler-45 Pool-fiber2 ratio = 1.0227273, **alive = 44** 
   ...
   2007-09-05 10:30:12,783 DEBUG [PollerScheduler-45 Pool-fiber29] RunnableConsumerThreadPool$SizingFifoQueue:
       adjust: calling stop on fiber PollerScheduler-45 Pool-fiber3
~~~

Après avoir attendu un certain temps après le démarrage d’OpenNMS,
repérez le champ **alive** dans la sortie de la commande précédente. Ce
champ correspond au nombre de thread actif. Si le nombre de threads
atteint continuellement le maximum (**30 par défaut**), vous devez
augmenter le nombre maximum de thread dans le fichier
*poller-configuration.xml*.

9. Event Handling {#event-handling .sectionedit14}
-----------------

Chaque trap SNMP qui est envoyé à OpenNMS est comparé à chaque évènement
configuré dans OpenNMS jusqu’à ce que qu’un évènement de la
configuration corresponde. De nombreux évènements sont déjà prédéfinis
dans OpenNMS. Si vous avez de nombreux évènements qui sont envoyés à
OpenNMS, les changements suivants peuvent être effectués :

-   Commenté les évènements des équipementiers dont vous n’avez pas
    besoin ;
-   Placer les évènements que vous recevez le plus en haut de fichier ;
-   Prenez garde à placer les évènements Standard, default et translator
    à la fin du fichier ;

10. Event Archiving {#event-archiving .sectionedit15}
-------------------

Dans le répertoire contrib d’OpenNMS, un script permet d’archiver les
évènements et par la même occasion d’augmenter les performances de
l’application. Ce script déplace les évènements à archiver dans une
table historique et met à jour les références vers le nouvel emplacement
de ces évènements.

Il est recommandé que vous exécutiez ce script en passant un timestamp
en argument. Pour commencer exécutez ce script avec la date à partir de
laquelle vous souhaitez archiver vos évènements (9 semaines par défaut).
Ensuite exécutez ce script sans timestamp, à partir des tâches
planifiées (cron) aussi souvent que vous le souhaitez.

~~~
./maint_events.sh "2008/01/01"
~~~

11. Data Collection {#data-collection .sectionedit16}
-------------------

Si vous collectez un flot important de données à partir des équipements
et qu’ils ne répondent pas en temps voulu, les threads de collecte de
données vont tomber en **timeout** ou générer des erreurs.

Si un équipement en particuliers pose problème, regardez dans le
répertoire *\$OPENNMS\_HOME/share/rrd/snmp/[nodeid]* et repérez les OIDs
actuellement collectés sur cet équipement.

Une autre possibilité est de changer le mode de verbosité pour le
processus **collectd** de **WARN** à **DEBUG** dans le fichier
*\$OPENNMS\_HOME/etc/log4j.properties* :

~~~
# Collectd
log4j.category.OpenNMS.Collectd=DEBUG, COLLECTD
~~~

Et d’utiliser ensuite la commande suivante pour repérer les variables
snmp collectées correctement et celles qui posent problème :

~~~
$ fgrep "node[nodeid]" collectd.log
~~~

Si le fichier comporte de nombreux essais infructueux, modifiez votre
fichier *datacollection-config.xml* pour supprimer la collecte des
variables qui posent problème sur l’ensemble des équipements ou sur un
équipement en particuliers.

Dans le fichier *collectd-configuration.xml*, définissez un package
spécifique pour les nœuds choisis et ajoutez la référence vers la partie
*snmp-collection* créée précédemment dans *datacollection-config.xml*.
Assurez-vous que ce nœud n’est que dans un seul package.

Après le débogage pensez à remettre le niveau des logs de **DEBUG** à
**WARN**.

SOMMAIRE {#sommaire .sectionedit1}
--------

**[Accueil](../start.html "start")**

**[Supervision](../supervision/start.html "supervision:start")**

-   [Nagios](../nagios/start.html "nagios:start")
-   [Centreon](../centreon/start.html "centreon:start")
-   [Shinken](../shinken/start.html "shinken:start")
-   [Zabbix](../zabbix/start.html "zabbix:start")
-   [OpenNMS](start.html "opennms:start")
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

OpenNMS {#opennms .sectionedit1}
-------

-   [Configuration des évènements et des
    alarmes](events-alarms.html "opennms:events-alarms")
-   [Découverte des équipements
    (discovery)](discovery.html "opennms:discovery")
-   [Découverte et supervision des services (capsd et
    pollerd)](services.html "opennms:services")
-   [Installation d'OpenNMS sur CentOS
    5.x](install-on-centos.html "opennms:install-on-centos")
-   [Installation d'OpenNMS sur Ubuntu 8.0.4
    LTS](install-on-ubuntu.html "opennms:install-on-ubuntu")
-   [Interface Web
    d'OpenNMS](opennms-interface.html "opennms:opennms-interface")
-   [Optimisations possibles](optimisation.html "opennms:optimisation")
-   [Personnalisation de
    l'interface](custom-ihm.html "opennms:custom-ihm")
-   [Redondance avec Heartbeat et
    Mon](redondance.html "opennms:redondance")

-   [Afficher le texte
    source](optimisation@do=edit&rev=0.html "Afficher le texte source [V]")
-   [Anciennes
    révisions](optimisation@do=revisions.html "Anciennes révisions [O]")
-   [Derniers
    changements](optimisation@do=recent.html "Derniers changements [R]")
-   [Liens vers cette
    page](optimisation@do=backlink.html "Liens vers cette page")
-   [Gestionnaire de
    médias](optimisation@do=media.html "Gestionnaire de médias")
-   [Index](optimisation@do=index.html "Index [X]")
-   [Connexion](optimisation@do=login&sectok=6bca6bdf16f8880de3d6d3649db89a26.html "Connexion")
-   [Haut de page](optimisation.html#dokuwiki__top "Haut de page [T]")

opennms/optimisation.txt · Dernière modification: 2013/03/29 09:39
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

![](../lib/exe/indexer.php@id=opennms%253Aoptimisation&1424859531)

![](http://analytics.monitoring-fr.org/piwik.php?idsite=2)
