---
layout: page
---

### Table des matières {.toggle}

-   [Nettoyage de la configuration
    post-install](nettoyage-de-la-configuration.html#nettoyage-de-la-configuration-post-install)
    -   -   [Modification de la configuration
            générale](nettoyage-de-la-configuration.html#modification-de-la-configuration-generale)
        -   [Nettoyage de la
            configuration](nettoyage-de-la-configuration.html#nettoyage-de-la-configuration)
        -   [Modification du fichier
            localhost](nettoyage-de-la-configuration.html#modification-du-fichier-localhost)

Nettoyage de la configuration post-install {#nettoyage-de-la-configuration-post-install .sectionedit1}
==========================================

Juste après une installation de nagios basique, votre répertoire etc
ressemble à ça :

~~~
-rw-rw-r-- 1 nagios nagcmd 11408 déc  8 20:27 cgi.cfg
-rw-r--r-- 1 nagios nagcmd    26 déc  8 22:46 htpasswd.users
-rw-rw-r-- 1 nagios nagcmd 43858 déc  9 11:45 nagios.cfg
drwxrwsr-x 2 nagios nagcmd  4096 déc  9 11:48 objects
-rw-rw---- 1 nagios nagcmd  1340 déc  8 20:27 resource.cfg
~~~

et dans le répertoire *objects* (qui au passage doit contenir tous vos
fichiers de configuration nagios), ça doit ressembler à ça :

~~~
-rw-rw-r-- 1 nagios nagcmd  7722 déc  8 20:27 commands.cfg
-rw-rw-r-- 1 nagios nagcmd  2166 déc  8 20:27 contacts.cfg
-rw-rw-r-- 1 nagios nagcmd  5430 déc  9 11:48 localhost.cfg
-rw-rw-r-- 1 nagios nagcmd  3124 déc  8 20:27 printer.cfg
-rw-rw-r-- 1 nagios nagcmd  3293 déc  8 20:27 switch.cfg
-rw-rw-r-- 1 nagios nagcmd 10812 déc  8 20:27 templates.cfg
-rw-rw-r-- 1 nagios nagcmd  3209 déc  8 20:27 timeperiods.cfg
-rw-rw-r-- 1 nagios nagcmd  4019 déc  8 20:27 windows.cfg
~~~

Voilà à quoi doit ressembler un serveur post-install.

### Modification de la configuration générale {#modification-de-la-configuration-generale .sectionedit2}

Dans le nagios.cfg, pour être tranquille et être sur que le moindre
fichier .cfg que vous allez rajouter va être pris en compte, il faut
modifier ceci :

~~~
# OBJECT CONFIGURATION FILE(S)
# These are the object configuration files in which you define hosts,
# host groups, contacts, contact groups, services, etc.
# You can split your object definitions across several config files
# if you wish (as shown below), or keep them all in a single config file.

# You can specify individual object config files as shown below:
#cfg_file=/usr/local/nagios/etc/objects/commands.cfg
#cfg_file=/usr/local/nagios/etc/objects/contacts.cfg
#cfg_file=/usr/local/nagios/etc/objects/timeperiods.cfg
#cfg_file=/usr/local/nagios/etc/objects/templates.cfg

# Definitions for monitoring the local (Linux) host
#cfg_file=/usr/local/nagios/etc/objects/localhost.cfg

# Definitions for monitoring a Windows machine
#cfg_file=/usr/local/nagios/etc/objects/windows.cfg

# Definitions for monitoring a router/switch
#cfg_file=/usr/local/nagios/etc/objects/switch.cfg

# Definitions for monitoring a network printer
#cfg_file=/usr/local/nagios/etc/objects/printer.cfg

# You can also tell Nagios to process all config files (with a .cfg
# extension) in a particular directory by using the cfg_dir
# directive as shown below:

#cfg_dir=/usr/local/nagios/etc/servers
#cfg_dir=/usr/local/nagios/etc/printers
#cfg_dir=/usr/local/nagios/etc/switches
cfg_dir=/usr/local/nagios/etc/objects
~~~

Effectivement, ce qui nous intéresse, c’est que nagios parcours tout le
répertoire objects sans crainte d’avoir oublier un fichier xxxx.cfg
(lourdeur de l’option cfg\_file).

### Nettoyage de la configuration {#nettoyage-de-la-configuration .sectionedit3}

Dans un premier temps, nous allons nettoyer un peu la configuration
post-install car ce n’est pas ce qu’il y a de plus simple par défaut.

Vous allez effacer les fichiers suivants :

~~~
rm -f printer.cfg
rm -f switch.cfg
rm -f windows.cfg
~~~

Nous n’allons pas effacer localhost.cfg car il va nous servir de modèle
pour la définition de vos hôtes.

ATTENTION : la définition de l’hôte dans localhost.cfg utilise
majoritairement des commandes à usage local (local\_disk, etc …) donc
pour vos hôtes distant il faudra bien penser à utiliser NRPE.

Votre répertoire *objects* ne doit plus contenir que :

~~~
-rw-rw-r-- 1 nagios nagcmd  7722 déc  8 20:27 commands.cfg
-rw-rw-r-- 1 nagios nagcmd  2166 déc  8 20:27 contacts.cfg
-rw-rw-r-- 1 nagios nagcmd  5430 déc  9 11:48 localhost.cfg
-rw-rw-r-- 1 nagios nagcmd 10812 déc  8 20:27 templates.cfg
-rw-rw-r-- 1 nagios nagcmd  3209 déc  8 20:27 timeperiods.cfg
~~~

Maintenant, nous allons nous intéresser aux templates. Vous allez vider
le contenu du fichier *templates.cfg* et y insérer le contenu qui suit :

Le template generic-host complet :

~~~
# All default values are set by this generic-host template

define host{
        name                            generic-host
        initial_state                   o
        active_checks_enabled           1
        passive_checks_enabled          1
        notifications_enabled           1
        event_handler_enabled           0
        check_command                   check-host-alive
        flap_detection_enabled          1
        failure_prediction_enabled      1
        failure_prediction_options      d,u,r
        process_perf_data               1
        check_freshness                 0
        obsess_over_host                0
        check_period                    24x7
        check_interval                  0
        retry_interval                  1
        stalking_options                u,d
        max_check_attempts              10
        retain_status_information       1
        retain_nonstatus_information    1
        notification_period             24x7
        first_notification_delay        0
        contact_groups                  admins
        notification_options            d,u,r
        notification_interval           0
        register                        0
        notes                           generic-host
        }
~~~

Le template generic-service complet :

~~~
# All default values are set by this generic-host template

define service{
        name                            generic-service
        active_checks_enabled           1
        passive_checks_enabled          1
        initial_state                   o
        parallelize_check               1
        obsess_over_service             0
        check_freshness                 0
        notifications_enabled           1
        event_handler_enabled           0
        flap_detection_enabled          1
        failure_prediction_enabled      1
        failure_prediction_options      w,c,u
        process_perf_data               1
        retain_status_information       1
        retain_nonstatus_information    1
        is_volatile                     0
        check_period                    24x7
        flap_detection_options          o,u,c,w
        max_check_attempts              5
        normal_check_interval           5
        retry_check_interval            2
        contact_groups                  admins
        notification_options            w,u,c,r
        notification_interval           0
        notification_period             24x7
        first_notification_delay        0
        notes                           generic-service
        register                        0
        }
~~~

Le template generic-contact complet :

~~~
define contact{
        name                            generic-contact
        service_notification_period     24x7
        host_notification_period        24x7
        service_notification_options    w,u,c,r,f,s
        host_notification_options       d,u,r,f,s
        service_notification_commands   notify-service-by-email
        host_notification_commands      notify-host-by-email
        register                        0
        }
~~~

### Modification du fichier localhost {#modification-du-fichier-localhost .sectionedit4}

Nous allons devoir modifier le fichier localhost.cfg suite à nos
modifications de templates. Le plus simple, effacer le contenu du
localhost.cfg et coller le contenu ci-dessous :

~~~
###############################################################################
###############################################################################
#
# HOST DEFINITION
#
###############################################################################
###############################################################################

# Define a host for the local machine

define host{
        use                     generic-host
        host_name               localhost
        alias                   localhost
        address                 127.0.0.1
        }

###############################################################################
###############################################################################
#
# SERVICE DEFINITIONS
#
###############################################################################
###############################################################################


# Define a service to "ping" the local machine

define service{
        use                             generic-service
        host_name                       localhost
        service_description             PING
        check_command                   check_ping!100.0,20%!500.0,60%
        }


# Define a service to check the disk space of the root partition
# on the local machine.  Warning if < 20% free, critical if
# < 10% free space on partition.

define service{
        use                             generic-service
        host_name                       localhost
        service_description             Root Partition
        check_command                   check_local_disk!20%!10%!/
        }

# Define a service to check the number of currently logged in
# users on the local machine.  Warning if > 20 users, critical
# if > 50 users.

define service{
        use                             generic-service
        host_name                       localhost
        service_description             Current Users
        check_command                   check_local_users!20!50
        }


# Define a service to check the number of currently running procs
# on the local machine.  Warning if > 250 processes, critical if
# > 400 users.

define service{
        use                             generic-service
        host_name                       localhost
        service_description             Total Processes
        check_command                   check_local_procs!250!400!RSZDT
        }

# Define a service to check the load on the local machine.

define service{
        use                             generic-service
        host_name                       localhost
        service_description             Current Load
        check_command                   check_local_load!5.0,4.0,3.0!10.0,6.0,4.0
        }



# Define a service to check the swap usage the local machine.
# Critical if less than 10% of swap is free, warning if less than 20% is free

define service{
        use                             generic-service
        host_name                       localhost
        service_description             Swap Usage
        check_command                   check_local_swap!20!10
        }

# Define a service to check SSH on the local machine.
# Disable notifications for this service by default, as not all users may have SSH enabled.

define service{
        use                             generic-service
        host_name                       localhost
        service_description             SSH
        check_command                   check_ssh
        notifications_enabled           0
        }



# Define a service to check HTTP on the local machine.
# Disable notifications for this service by default, as not all users may have HTTP enabled.

define service{
        use                             generic-service
        host_name                       localhost
        service_description             HTTP
        check_command                   check_http
        notifications_enabled           0
        }
~~~

Maintenant, vous avez des templates et un localhost tout propre et
simple pour débuter. Maintenant, il faut passer à la création d’un hôte.
