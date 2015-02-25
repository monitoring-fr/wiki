---
layout: page
---

### Table des matières {.toggle}

-   [Introduction aux objets de
    configuration](configobjects.html#introduction-aux-objets-de-configuration)
    -   [Les hôtes](configobjects.html#les-hotes)
    -   [Les services](configobjects.html#les-services)
    -   [Les contacts](configobjects.html#les-contacts)
    -   [Les périodes de
        temps](configobjects.html#les-periodes-de-temps)
    -   [Les groupes](configobjects.html#les-groupes)
        -   [Groupe d'hôtes](configobjects.html#groupe-d-hotes)
        -   [Groupe de services](configobjects.html#groupe-de-services)
        -   [Groupe de contacts](configobjects.html#groupe-de-contacts)
    -   [Les dépendances](configobjects.html#les-dependances)
        -   [Les dépendances
            d’hôtes](configobjects.html#les-dependances-d-hotes)
        -   [Les dépendances de
            services](configobjects.html#les-dependances-de-services)
    -   [Les escalades](configobjects.html#les-escalades)
        -   [Les escalades
            d’hôtes](configobjects.html#les-escalades-d-hotes)
        -   [Les escalades de
            services](configobjects.html#les-escalades-de-services)
    -   [Les commandes](configobjects.html#les-commandes)
    -   [Les ressources &
        macros](configobjects.html#les-ressources-macros)
    -   [Les gabarits ou
        modèles](configobjects.html#les-gabarits-ou-modeles)

Introduction aux objets de configuration {#introduction-aux-objets-de-configuration .sectionedit1}
========================================

Nagios possède une configuration orientée objets. Cela permet entre des
fonctions d’héritage puissantes entre ceux-ci. Encore faut-il savoir
quels sont les différents types d’objets qu’il est possible de
manipuler. C’est l’objet de cette petite introduction aux objets de
configuration Nagios.

-   Chaque objet est défini par une série de caractéristiques.
-   L’héritage de caractéristiques est possible entre les objets.

Les hôtes {#les-hotes .sectionedit2}
---------

Une définition d’hôte s’applique à un serveur « physique », une station
de travail, un périphérique, un équipement, un serveur virtuel qui se
trouve sur votre réseau. Tout équipement possédant une adresse IP peut
être considéré comme hôte. Voici une définition d’objet de configuration
de type host.

~~~~ {.code}
define host{ 
    host_name   host_name 
    alias   alias 
    display_name    display_name 
    address address 
    parents host_names 
    hostgroups  hostgroup_names 
    check_command   command_name 
    initial_state   [o,d,u] 
    max_check_attempts  # 
    check_interval  # 
    retry_interval  # 
    active_checks_enabled   [0/1] 
    passive_checks_enabled  [0/1] 
    check_period    timeperiod_name 
    obsess_over_host    [0/1] 
    check_freshness [0/1] 
    freshness_threshold # 
    event_handler   command_name 
    event_handler_enabled   [0/1] 
    low_flap_threshold  # 
    high_flap_threshold # 
    flap_detection_enabled  [0/1] 
    flap_detection_options  [o,d,u] 
    process_perf_data   [0/1] 
    retain_status_information   [0/1] 
    retain_nonstatus_information    [0/1] 
    contacts    contacts 
    contact_groups  contact_groups 
    notification_interval   # 
    first_notification_delay    # 
    notification_period timeperiod_name 
    notification_options    [d,u,r,f,s] 
    notifications_enabled   [0/1] 
    stalking_options    [o,d,u] 
    notes   note_string 
    notes_url   url 
    action_url  url 
    icon_image  image_file 
    icon_image_alt  alt_string 
    vrml_image  image_file 
    statusmap_image image_file 
    2d_coords   x_coord,y_coord 
    3d_coords   x_coord,y_coord,z_coord 
    } 
~~~~

Les services {#les-services .sectionedit3}
------------

La définition d’un service identifie un service tournant sur un hôte. Le
terme service est très générique. Il peut s’appliquer à un service (
POP, SMTP, HTTP, etc.) ou bien tout autre type de mesures associé à
l’hôte (temps de réponse à un ping, nombre d’utilisateurs connectés,
usage des disques). En résumé, tout contrôle aboutit à un service.
Voyons les options acceptées par un objet de configuration de type
service.

~~~~ {.code}
define service{ 
    host_name   host_name 
    hostgroup_name  hostgroup_name 
    service_description service_description 
    display_name    display_name 
    servicegroups   servicegroup_names 
    is_volatile [0/1] 
    check_command   command_name 
    initial_state   [o,w,u,c] 
    max_check_attempts  # 
    check_interval  # 
    retry_interval  # 
    active_checks_enabled   [0/1] 
    passive_checks_enabled  [0/1] 
    check_period    timeperiod_name 
    obsess_over_service [0/1] 
    check_freshness [0/1] 
    freshness_threshold # 
    event_handler   command_name 
    event_handler_enabled   [0/1] 
    low_flap_threshold  # 
    high_flap_threshold # 
    flap_detection_enabled  [0/1] 
    flap_detection_options  [o,w,c,u] 
    process_perf_data   [0/1] 
    retain_status_information   [0/1] 
    retain_nonstatus_information    [0/1] 
    notification_interval   # 
    first_notification_delay    # 
    notification_period timeperiod_name 
    notification_options    [w,u,c,r,f,s] 
    notifications_enabled   [0/1] 
    contacts    contacts 
    contact_groups  contact_groups 
    stalking_options    [o,w,u,c] 
    notes   note_string 
    notes_url   url 
    action_url  url 
    icon_image  image_file 
    icon_image_alt  alt_string 
    }
~~~~

Les contacts {#les-contacts .sectionedit4}
------------

Une définition de contact s’applique à la personne physique qui doit
être contactée en cas de problèmes sur le système d’information
supervisé.

~~~~ {.code}
define contact{
    contact_name    contact_name
    alias   alias
    contactgroups   contactgroup_names
    host_notification_period    timeperiod_name
    service_notification_period timeperiod_name
    host_notification_options   [d,u,r,f,n]
    service_notification_options    [w,u,c,r,f,n]
    host_notification_commands  command_name
    service_notification_commands   command_name
    email   email_address
    pager   pager_number or pager_email_gateway
    addressx    additional_contact_address
    }
~~~~

Exemple de Définition:

~~~~ {.code}
define contact{
    contact_name                    jdoe
    alias                           John Doe
    service_notification_period     24x7
    host_notification_period        24x7
    service_notification_options    w,u,c,r
    host_notification_options       d,u,r
    service_notification_commands   notify-by-email
    host_notification_commands      host-notify-by-email
    email               [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
    pager               [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
    address1            [email protected]
/*  */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/*  */
    address2            555-555-5555
    }
~~~~

Les périodes de temps {#les-periodes-de-temps .sectionedit5}
---------------------

Une période est une liste de tranches horaires pour les différents jours
de la semaine, qui sont “valides” pour l’envoi des notifications et les
contrôles de service. Ces tranches sont elles-mêmes composées d’autres
tranches de temps pour chaque jour de la semaine, qui “tournent” une
fois que la semaine est terminée. Définition du Format:

~~~~ {.code}
define timeperiod{
    timeperiod_name timeperiod_name
    alias   alias
    sunday  timeranges
    monday  timeranges
    tuesday timeranges
    wednesday   timeranges
    thursday    timeranges
    friday  timeranges
    saturday    timeranges
    }
~~~~

Exemple de définition

~~~~ {.code}
define timeperiod{
    timeperiod_name     nonworkhours
    alias           Non-Work Hours
    sunday          00:00-24:00
    monday          00:00-09:00,17:00-24:00
    tuesday         00:00-09:00,17:00-24:00
    wednesday       00:00-09:00,17:00-24:00
    thursday        00:00-09:00,17:00-24:00
    friday          00:00-09:00,17:00-24:00
    saturday        00:00-24:00
    }
~~~~

Les groupes {#les-groupes .sectionedit6}
-----------

Les groupes permettent de rassembler en entités logiques différents
hôtes ou services. Il est par exemple d’usage de créer un groupe d’hôtes
par type de système d’exploitation pour que chaque équipe système puisse
avoir une vue globale du type de système dont elle s’occupe. Ainsi,
l’équipe système Linux peut savoir si les machines de type Linux sont ok
ou pas d’un seul coup d’œil.

### Groupe d'hôtes {#groupe-d-hotes .sectionedit7}

Une définition de groupe d’hôtes est utilisée pour regrouper un ou
plusieurs groupes ensemble pour les afficher sous une seule entité dans
la console. Ci-dessous un exemple de définition

~~~~ {.code}
define hostgroup{
        hostgroup_name          linux-servers
        alias                   Linux Servers
        members                 jeos,hardy,olivier-desktop
        }
~~~~

### Groupe de services {#groupe-de-services .sectionedit8}

Une définition de groupe de services est utilisée pour regrouper un ou
plusieurs services sous une seule entité dans la console. Ci-dessous un
exemple de définition.

~~~~ {.code}
define servicegroup{
        servicegroup_name       dbservices
        alias                   Database Services
        members                 ms1,SQL Server,ms1,SQL Server Agent,ms1,SQL DTC
        }
~~~~

### Groupe de contacts {#groupe-de-contacts .sectionedit9}

Une définition de groupe de contacts permet de regrouper un ou plusieurs
contacts pour émettre des notifications. Quand un hôte ou un service a
un problème ou se rétablit, Nagios recherche les groupes de contacts à
qui envoyer des notifications, et notifie tous les contacts de ces
groupes.

~~~~ {.code}
define contactgroup{
    contactgroup_name   contactgroup_name
    alias   alias
    members members
    }
~~~~

Exemple de définition

~~~~ {.code}
define contactgroup{
    contactgroup_name       novell-admins
    alias           Novell Administrators
    members         jdoe,rtobert,tzach
    }
~~~~

Les dépendances {#les-dependances .sectionedit10}
---------------

Les dépendances permettent à Nagios de tenir compte de la topologie
réseau pour distinguer si un hôte est injoignable (UNREACHABLE) ou
éteint (DOWN). Ceci est utilisé dans la logique de contrôle et de
notifications.

### Les dépendances d’hôtes {#les-dependances-d-hotes .sectionedit11}

Les définitions de dépendances d’hôte sont une fonctionnalité avancée de
Nagios qui permet de supprimer des notifications et des contrôles
actifs, à partir de l’état d’un ou plusieurs hôtes.

~~~~ {.code}
define hostdependency{
    dependent_host_name host_name
    host_name   host_name
    inherits_parent [0/1]
    execution_failure_criteria  [o,d,u,p,n]
    notification_failure_criteria   [o,d,u,p,n]
    }
~~~~

Exemple de définition

~~~~ {.code}
define hostdependency{
    host_name           WWW1
    dependent_host_name     DBASE1
    notification_failure_criteria   d,u
    }
~~~~

### Les dépendances de services {#les-dependances-de-services .sectionedit12}

Les définitions de dépendances du service sont une fonctionnalité
avancée de Nagios qui permet de supprimer des notifications et des
contrôles actifs, à partir de l’état d’un ou plusieurs services. Elles
sont optionnelles et sont principalement destinées aux utilisateurs
avertis qui ont des configurations de supervision complexes.

~~~~ {.code}
define servicedependency{
    dependent_host_name host_name
    dependent_service_description   service_description
    host_name   host_name
    service_description service_description
    execution_failure_criteria  [o,w,u,c,n]
    notification_failure_criteria   [o,w,u,c,n]
    }
~~~~

Exemple de définition

~~~~ {.code}
define servicedependency{
    host_name           WWW1
    service_description     Apache Web Server
    dependent_host_name     WWW1
    dependent_service_description   Main Web Site
    execution_failure_criteria  n
    notification_failure_criteria   w,u,c
    }
~~~~

Les escalades {#les-escalades .sectionedit13}
-------------

Les escalades permettent de notifier des personnes différentes suivant
la durée de résolution d’un incident. Le concept est similaire aux
escalades de support niveau 1,2 et 3.

### Les escalades d’hôtes {#les-escalades-d-hotes .sectionedit14}

Une définition d’escalade pour un hôte est complètement optionnelle et
est utilisée pour escalader les notifications liées à un hôte
particulier.

~~~~ {.code}
define hostescalation{
    host_name   host_name
    hostgroup_name  hostgroup_name
    contact_groups  contactgroup_name
    first_notification  #
    last_notification   #
    notification_interval   #
    escalation_period   timeperiod_name
    escalation_options  [d,u,r]
    }
~~~~

~~~~ {.code}
define hostescalation{
    host_name       router-34
    first_notification  5
    last_notification   8
    notification_interval   60
    contact_groups      all-router-admins
    }
~~~~

### Les escalades de services {#les-escalades-de-services .sectionedit15}

Une définition d’escalade pour un service est complètement optionnelle
et est utilisée pour escalader les notifications liées à un service
particulier.

~~~~ {.code}
define serviceescalation{
    host_name   host_name
    service_description service_description
    contact_groups  contactgroup_name
    first_notification  #
    last_notification   #
    notification_interval   #
    escalation_period   timeperiod_name
    escalation_options  [w,u,c,r]
    }
~~~~

Exemple de définition

~~~~ {.code}
define serviceescalation{
    host_name       nt-3
    service_description Processor Load
    first_notification  4
    last_notification   0
    notification_interval   30
    contact_groups      all-nt-admins,themanagers
    }
~~~~

Les commandes {#les-commandes .sectionedit16}
-------------

Une définition de commande est un appel depuis Nagios à un script ou à
un binaire exécuté à différentes fins. Les commandes qu’on peut définir
sont les contrôles de service, les notifications de service, les
gestionnaires d’événements de service, les contrôles d’hôte, les
notifications d’hôte et les gestionnaires d’événements d’hôte. Les
définitions de commande peuvent contenir des macros.

~~~~ {.code}
define command{
        command_name    check_pop
        command_line    /opt/nagios/libexec/check_pop -H $HOSTADDRESS$    
        }
Cet objet possède son écran de configuration correspondant dans Centreon
~~~~

Les ressources & macros {#les-ressources-macros .sectionedit17}
-----------------------

Une des fonctionnalités disponibles dans Nagios est la possibilité
d’utiliser des macros (lire macro-commandes) dans les définitions de
commandes. Avant d’exécuter une commande, Nagios remplace toutes les
macros dans celle-ci par les valeurs correspondantes. Avant qu’une
commande (contrôles d’hôte et de service, notifications, gestionnaires
d’évènements, etc.) soit exécutée, Nagios va remplacer toutes les macros
qu’il trouve dans la définition de la commande par les valeurs
correspondantes. Les macros d’hôte et de service dans les définitions de
commandes font référence aux valeurs de l’hôte ou du service pour lequel
s’exécute la commande.

Les gabarits ou modèles {#les-gabarits-ou-modeles .sectionedit18}
-----------------------

La configuration des objets par héritage est le moyen le plus commode
d’industrialiser la configuration de Nagios. L’héritage de propriétés
d’objets s’accomplit de manière récursive lors de la lecture des
fichiers de configurations par Nagios. Il y a trois variables concernant
le principe de récursion et d’héritage qui sont disponibles dans toutes
définitions d’objets.

~~~~ {.code}
        define someobjecttype{
                object-specific variables ...
                name            template_name
                use             name_of_template_to_use
                register        [0/1]
                }
~~~~

Voilà le tour du propriétaire des objets et directives de configuration
disponibles dans Nagios terminé.
