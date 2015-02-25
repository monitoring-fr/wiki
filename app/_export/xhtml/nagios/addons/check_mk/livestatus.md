---
layout: page
---

### Table des matières {.toggle}

-   [mk\_livestatus](livestatus.html#mk_livestatus)
    -   [Introduction](livestatus.html#introduction)
    -   [Mais comment ça marche
        ?](livestatus.html#mais-comment-ca-marche)
    -   [Installation de
        livestatus](livestatus.html#installation-de-livestatus)
        -   [Prérequis](livestatus.html#prerequis)
        -   [Téléchargement des
            sources](livestatus.html#telechargement-des-sources)
        -   [Compilation](livestatus.html#compilation)
        -   [Déploiement](livestatus.html#deploiement)
        -   [Configuration](livestatus.html#configuration)
        -   [Prise en compte de la
            configuration](livestatus.html#prise-en-compte-de-la-configuration)
        -   [Activer l'écoute sur le réseau via
            xinetd](livestatus.html#activer-l-ecoute-sur-le-reseau-via-xinetd)
        -   [Tests](livestatus.html#tests)
        -   [Cabler un poller distant avec
            multisite](livestatus.html#cabler-un-poller-distant-avec-multisite)

mk\_livestatus {#mk_livestatus .sectionedit1}
==============

Introduction {#introduction .sectionedit2}
------------

Depuis la version 1.1.0rc1 check\_mk embarque un nouvel élément qui
mérite à lui seul le détour. Cet élément se nomme **livestatus** et
vient combler à lui seul les derniers manques de Nagios, pouvoir enfin
**dialoguer avec nagios sans middleware type ndo ou merlin**. L’avantage
de cette méthode est un accès aux données (comme celles du status.dat)
immédiat et sans IO disque ! La performance est au rendez vous : **50000
services récupérés en moins de 2 secondes** !!!. Autre avantage,
l’installation de livestatus est enfantine et se limite à configurer un
broker d’événement dans le fichier de configuration principal de nagios.

Mais comment ça marche ? {#mais-comment-ca-marche .sectionedit3}
------------------------

Au démarrage de Nagios livestatus créé un socket unix et se met en
écoute de celui ci. Il suffit alors d’écrire des requêtes dans ce socket
pour obtenir les informations de nagios (services, hôtes, groupes,
contact, downtime …). Les requêtes sont formatées selon un langage
spécifiquement créé pour l’occasion : **LQL**. Il présente une
philosophie assez proche de SQL (accés aux données dans des “tables”,
filtre correspondant aux clauses where, possibilité de regroupement….).

-   La documentation avance plutôt bien et est disponible
    [ici](http://mathias-kettner.de/checkmk_livestatus.html "http://mathias-kettner.de/checkmk_livestatus.html")
-   Vous pouvez le télécharger directement [depuis cette
    page](http://mathias-kettner.de/check_mk_download.html "http://mathias-kettner.de/check_mk_download.html")

Installation de livestatus {#installation-de-livestatus .sectionedit4}
--------------------------

### Prérequis {#prerequis .sectionedit5}

#### RedHat/Centos

Nous aurons besoins des outils de compilation pour réaliser cette
opération :

~~~~ {.code}
yum install gcc gcc-c++ make automake autoconf libtool m4
~~~~

#### Debian/Ubuntu

![FIXME](../../../../../lib/images/smileys/fixme.gif) : A rédiger

### Téléchargement des sources {#telechargement-des-sources .sectionedit6}

-   Récupérer livestatus sur le site de check\_mk :
    [http://mathias-kettner.de/check\_mk\_download.html](http://mathias-kettner.de/check_mk_download.html "http://mathias-kettner.de/check_mk_download.html")
-   Extraire le contenu de l’archive

~~~~ {.code}
tar zxvf mk-livestatus-1.1.12p7.tar.gz
~~~~

### Compilation {#compilation .sectionedit7}

~~~~ {.code}
cd mk-livestatus-1.1.12p7
./configure
make
~~~~

### Déploiement {#deploiement .sectionedit8}

-   Recopier le broker d’événement dans le répertoire bin de nagios

~~~~ {.code}
cp src/livestatus.o /usr/local/nagios/bin/
~~~~

-   Recopier l’utilitaire unixcat dans le repertoire bin de nagios

~~~~ {.code}
cp src/unixcat /usr/local/nagios/bin/
~~~~

### Configuration {#configuration .sectionedit9}

-   Editer le fichier nagios.cfg et ajouter la ligne suivante

~~~~ {.code}
broker_module=/usr/local/nagios/bin/livestatus.o /usr/local/nagios/var/rw/live event_broker_options=-1
~~~~

### Prise en compte de la configuration {#prise-en-compte-de-la-configuration .sectionedit10}

-   relancer nagios

~~~~ {.code}
/etc/init.d/nagios restart
~~~~

### Activer l'écoute sur le réseau via xinetd {#activer-l-ecoute-sur-le-reseau-via-xinetd .sectionedit11}

De par sa conception livestatus ne peut être interrogé que localement.
Il existe une possibilité de le rendre accéssible via le réseau au
travers de xinetd. Xinetd n’est pas installé par défaut :

#### Prérequis {#prerequis1}

-   Sous Redhat/Centos :

~~~~ {.code}
yum install xinetd
~~~~

-   Sous Debian/Ubuntu :

![FIXME](../../../../../lib/images/smileys/fixme.gif) : à rédiger

#### Configuration {#configuration1}

Créer un fichier /etc/xinetd.d/livestatus et copier le contenu suivant :

~~~~ {.code}
service livestatus
{
    type                = UNLISTED
    port                = 6557
    socket_type         = stream
    protocol            = tcp
    wait                = no
    # limit to 100 connections per second. Disable 3 secs if above.
    cps                     = 100 3
    # Disable TCP delay, makes connection more responsive
    flags                   = NODELAY
    user                = nagios
    server              = /usr/local/nagios/bin/unixcat
    server_args             = /usr/local/nagios/var/rw/live
    # configure the IP address(es) of your Nagios server here:
    # only_from             = localhost 192.168.0.254
    disable             = no
}
~~~~

Pour des raisons de sécurité il faut limiter les connexions à livestatus
à des hôtes autorisés. C’est le rôle de la directive only\_from.

### Tests {#tests .sectionedit12}

-   Vérifier tout d’habord la présence du socket live dans
    /usr/local/nagios/var/rw

-   Vérifier que les requêtes sont prisent en compte sur le socket unix

~~~~ {.code}
# echo "GET hosts" | /usr/local/nagios/bin/unixcat /usr/local/nagios/var/rw/live 

accept_passive_checks;acknowledged;acknowledgement_type;action_url;action_url_expanded;active_checks_enabled;address;alias;check_command;check_flapping_recovery_notification;check_freshness;check_interval;check_options;check_period;check_type;checks_enabled;childs;comments;comments_with_info;contact_groups;contacts;current_attempt;current_notification_number;custom_variable_names;custom_variable_values;custom_variables;display_name;downtimes;downtimes_with_info;event_handler_enabled;execution_time;filename;first_notification_delay;flap_detection_enabled;groups;hard_state;has_been_checked;high_flap_threshold;icon_image;icon_image_alt;icon_image_expanded;in_check_period;in_notification_period;initial_state;is_executing;is_flapping;last_check;last_hard_state;last_hard_state_change;last_notification;last_state;last_state_change;last_time_down;last_time_unreachable;last_time_up;latency;long_plugin_output;low_flap_threshold;max_check_attempts;modified_attributes;modified_attributes_list;name;next_check;next_notification;no_more_notifications;notes;notes_expanded;notes_url;notes_url_expanded;notification_interval;notification_period;notifications_enabled;num_services;num_services_crit;num_services_hard_crit;num_services_hard_ok;num_services_hard_unknown;num_services_hard_warn;num_services_ok;num_services_pending;num_services_unknown;num_services_warn;obsess_over_host;parents;pending_flex_downtime;percent_state_change;perf_data;plugin_output;pnpgraph_present;process_performance_data;retry_interval;scheduled_downtime_depth;services;services_with_info;services_with_state;state;state_type;statusmap_image;total_services;worst_service_hard_state;worst_service_state;x_3d;y_3d;z_3d
1;0;0;;;1;127.0.0.1;localhost;check-host-alive;0;0;5.0000000000e+00;0;24x7;0;1;;;;admins;nagiosadmin;5;0;;;;localhost;;;1;1.2804000000e-02;;0.0000000000e+00;1;linux-servers;0;1;0.0000000000e+00;;;;1;1;0;1;0;1338285655;0;1338284997;0;1;1338285665;1338285665;0;0;1.6000000000e-02;;0.0000000000e+00;10;0;;localhost;1338285725;0;0;;;;;1.2000000000e+02;workhours;1;8;8;8;0;0;0;0;0;0;0;1;;0;4.9342105263e+00;;(Return code of 127 is out of bounds - plugin may be missing);-1;1;1.0000000000e+00;0;Total Processes,Swap Usage,SSH,Root Partition,PING,HTTP,Current Users,Current Load;Total Processes|2|1|(Return code of 127 is out of bounds - plugin may be missing),Swap Usage|2|1|(Return code of 127 is out of bounds - plugin may be missing),SSH|2|1|(Return code of 127 is out of bounds - plugin may be missing),Root Partition|2|1|(Return code of 127 is out of bounds - plugin may be missing),PING|2|1|(Return code of 127 is out of bounds - plugin may be missing),HTTP|2|1|(Return code of 127 is out of bounds - plugin may be missing),Current Users|2|1|(Return code of 127 is out of bounds - plugin may be missing),Current Load|2|1|(Return code of 127 is out of bounds - plugin may be missing);Total Processes|2|1,Swap Usage|2|1,SSH|2|1,Root Partition|2|1,PING|2|1,HTTP|2|1,Current Users|2|1,Current Load|2|1;1;0;;8;2;2;0.0000000000e+00;0.0000000000e+00;0.0000000000e+00
~~~~

-   vérifier également que les requètes passent au travers de xinetd.
    Nous utiliseront netcat (ou nc) afin de réaliser ce test. Le
    résultat doit être le même que précédemment.

~~~~ {.code}
echo "GET hosts" > hosts.lql
nc 127.0.0.1 6557 < hosts.lql
~~~~

### Cabler un poller distant avec multisite {#cabler-un-poller-distant-avec-multisite .sectionedit13}

Multisite est la console de supervision du projet check\_mk. Elle permet
d’agréger plusieurs collecteurs nagios/shinken indépendant en son sein
grâce à livestatus. Cette agrégation peut être configurée dans le
fichier **multisite.mk** de multisite. Vous pourrez trouver ce fichier
dans /usr/local/check\_mk/etc/

La déclaration d’un nouveau collecteur se fait de la manière suivante :

~~~~ {.code}
sites = {
  "nagios1" : {
    "alias" : "nagios1",
    "socket" : "tcp:192.168.122.128:6557"
  }
}
~~~~

Si nous voulons rajouter le collecteur local à la machine exécutant
multisite, cela se fait en rajoutant une entrée de la manière suivante :

~~~~ {.code}
sites = {
  "nagios1" : {
    "alias" : "nagios1",
    "socket" : "tcp:192.168.122.128:6557"
  },
  "local" : {
    "alias" : "local",
  }
}
~~~~
